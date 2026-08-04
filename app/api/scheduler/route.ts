import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { zonedWallTimeToUtcEpoch, isRepeatEvery } from "@/lib/schedule";

export const dynamic = "force-dynamic";
export const revalidate = 0;

/**
 * Size of the audience a send is aimed at, measured now. Stored on the row as
 * `total_target` purely so the UI can render "350 of 3,472" — the drip decides
 * when to stop from the send itself running out of eligible contacts, never
 * from this number, so later churn in the list cannot strand a campaign.
 */
async function audienceSize(listId: number | null): Promise<number> {
  const sql = listId
    ? `SELECT COUNT(*) AS n FROM contact_list_members m
       JOIN contacts c ON c.id = m.contact_id
       WHERE m.list_id = ? AND (c.status = 'active' OR c.status IS NULL)`
    : "SELECT COUNT(*) AS n FROM contacts WHERE status = 'active' OR status IS NULL";
  const res = await db.execute({ sql, args: listId ? [listId] : [] });
  return Number(res.rows[0]?.n ?? 0);
}

// GET /api/scheduler — list scheduled sends (newest first) with the list name.
export async function GET(): Promise<NextResponse> {
  const result = await db.execute(`
    SELECT s.*, cl.name AS list_name
    FROM scheduled_campaigns s
    LEFT JOIN contact_lists cl ON cl.id = s.list_id
    ORDER BY
      CASE s.status WHEN 'pending' THEN 0 WHEN 'processing' THEN 1 ELSE 2 END,
      s.scheduled_at ASC,
      s.id DESC
    LIMIT 200
  `);
  return NextResponse.json(result.rows);
}

// POST /api/scheduler — create a scheduled send.
export async function POST(req: NextRequest): Promise<NextResponse> {
  const b = await req.json() as {
    subject?: string;
    body?: string;
    isHtml?: boolean;
    listId?: number | null;
    excludeRecentDays?: number | null;
    dailyLimit?: number | null;
    offset?: number | null;
    replyTo?: string | null;
    attachPostcard?: boolean;
    localDateTime?: string; // "YYYY-MM-DDTHH:mm" in the chosen timezone
    timezone?: string;      // IANA tz, e.g. "America/New_York"
    batchIntervalMinutes?: number | null; // null/0 = send once, don't drip
    repeatEvery?: string | null;          // 'daily' | 'weekly' | 'monthly'
  };

  if (!b.subject?.trim() || !b.body?.trim()) {
    return NextResponse.json({ error: "Subject and body are required" }, { status: 400 });
  }
  if (!b.localDateTime || !b.timezone) {
    return NextResponse.json({ error: "A send date, time and timezone are required" }, { status: 400 });
  }

  let scheduledAt: number | null;
  try {
    scheduledAt = zonedWallTimeToUtcEpoch(b.localDateTime, b.timezone);
  } catch {
    return NextResponse.json({ error: "Invalid timezone" }, { status: 400 });
  }
  if (scheduledAt === null) {
    return NextResponse.json({ error: "Invalid date/time" }, { status: 400 });
  }
  // Must be at least ~1 minute in the future.
  if (scheduledAt < Math.floor(Date.now() / 1000) + 30) {
    return NextResponse.json({ error: "Scheduled time must be in the future" }, { status: 400 });
  }

  if (b.repeatEvery != null && b.repeatEvery !== "" && !isRepeatEvery(b.repeatEvery)) {
    return NextResponse.json({ error: "Repeat must be daily, weekly or monthly" }, { status: 400 });
  }
  const repeatEvery = isRepeatEvery(b.repeatEvery) ? b.repeatEvery : null;

  // A drip needs a positive gap between batches. The cron ticks every 5 minutes,
  // so anything smaller than that just lands on the next tick anyway.
  let batchInterval: number | null = null;
  if (b.batchIntervalMinutes != null && Number(b.batchIntervalMinutes) > 0) {
    batchInterval = Math.max(5, Math.floor(Number(b.batchIntervalMinutes)));
  }

  const listId = b.listId ?? null;
  const totalTarget = await audienceSize(listId);

  const result = await db.execute({
    sql: `INSERT INTO scheduled_campaigns
            (subject, body, is_html, list_id, exclude_recent_days, daily_limit,
             send_offset, reply_to, attach_postcard, scheduled_at, timezone, status,
             batch_interval_minutes, total_target, repeat_every)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?, ?)`,
    args: [
      b.subject.trim(),
      b.body,
      b.isHtml ? 1 : 0,
      listId,
      b.excludeRecentDays ?? null,
      b.dailyLimit ?? null,
      b.offset && b.offset > 0 ? Math.floor(b.offset) : 0,
      b.replyTo?.trim() || null,
      b.attachPostcard ? 1 : 0,
      scheduledAt,
      b.timezone,
      batchInterval,
      totalTarget,
      repeatEvery,
    ],
  });

  return NextResponse.json({
    success: true,
    id: Number(result.lastInsertRowid),
    scheduledAt,
    totalTarget,
  });
}

// DELETE /api/scheduler — cancel/remove a scheduled send by id.
// Pending/failed/sent rows are deleted; a row mid-send ('processing') is left alone.
export async function DELETE(req: NextRequest): Promise<NextResponse> {
  const { id } = await req.json() as { id?: number };
  if (!id) return NextResponse.json({ error: "id is required" }, { status: 400 });

  const res = await db.execute({
    sql: "DELETE FROM scheduled_campaigns WHERE id = ? AND status != 'processing'",
    args: [id],
  });
  if (res.rowsAffected === 0) {
    return NextResponse.json({ error: "Cannot cancel — it is currently sending or does not exist" }, { status: 409 });
  }
  return NextResponse.json({ success: true });
}
