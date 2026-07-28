import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { sendCampaignNow, type CampaignSendParams } from "@/lib/campaignSend";

export const dynamic = "force-dynamic";
export const revalidate = 0;
// Give the worker room to dispatch a batch of due sends.
export const maxDuration = 300;

// Process at most this many due campaigns per invocation (keeps each run within
// the function time budget; the next cron tick picks up the rest).
const MAX_PER_RUN = 5;

interface ScheduledRow {
  id: number;
  subject: string;
  body: string;
  is_html: number;
  list_id: number | null;
  exclude_recent_days: number | null;
  daily_limit: number | null;
  send_offset: number;
  reply_to: string | null;
  attach_postcard: number;
}

function authorized(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false; // fail closed if not configured
  const auth = req.headers.get("authorization");
  if (auth === `Bearer ${secret}`) return true; // Vercel Cron sends this
  if (req.nextUrl.searchParams.get("key") === secret) return true; // manual trigger
  return false;
}

async function processDue(): Promise<{ processed: number; results: Array<Record<string, unknown>> }> {
  const now = Math.floor(Date.now() / 1000);

  const due = await db.execute({
    sql: `SELECT id, subject, body, is_html, list_id, exclude_recent_days,
                 daily_limit, send_offset, reply_to, attach_postcard
          FROM scheduled_campaigns
          WHERE status = 'pending' AND scheduled_at <= ?
          ORDER BY scheduled_at ASC
          LIMIT ?`,
    args: [now, MAX_PER_RUN],
  });

  const rows = due.rows as unknown as ScheduledRow[];
  const results: Array<Record<string, unknown>> = [];

  for (const row of rows) {
    // Atomically claim the row so overlapping cron runs never double-send it.
    const claim = await db.execute({
      sql: "UPDATE scheduled_campaigns SET status = 'processing' WHERE id = ? AND status = 'pending'",
      args: [row.id],
    });
    if (claim.rowsAffected === 0) continue; // another run got it first

    const params: CampaignSendParams = {
      subject: row.subject,
      body: row.body,
      isHtml: !!row.is_html,
      listId: row.list_id,
      excludeRecentDays: row.exclude_recent_days,
      dailyLimit: row.daily_limit,
      offset: row.send_offset,
      replyTo: row.reply_to,
      attachPostcard: !!row.attach_postcard,
    };

    try {
      const result = await sendCampaignNow(params);
      if (result.ok) {
        await db.execute({
          sql: "UPDATE scheduled_campaigns SET status = 'sent', result_campaign_id = ?, recipient_count = ?, error = NULL WHERE id = ?",
          args: [result.campaignId ?? null, result.recipients, row.id],
        });
        results.push({ id: row.id, status: "sent", recipients: result.recipients });
      } else {
        await db.execute({
          sql: "UPDATE scheduled_campaigns SET status = 'failed', error = ? WHERE id = ?",
          args: [result.error ?? "Send failed", row.id],
        });
        results.push({ id: row.id, status: "failed", error: result.error });
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unexpected error";
      await db.execute({
        sql: "UPDATE scheduled_campaigns SET status = 'failed', error = ? WHERE id = ?",
        args: [message, row.id],
      });
      results.push({ id: row.id, status: "failed", error: message });
    }
  }

  return { processed: results.length, results };
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  if (!authorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const out = await processDue();
  return NextResponse.json({ ok: true, ...out });
}

// Allow manual/POST triggering too.
export async function POST(req: NextRequest): Promise<NextResponse> {
  return GET(req);
}
