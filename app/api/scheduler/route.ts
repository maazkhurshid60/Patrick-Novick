import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

/**
 * Convert a wall-clock local time ("2026-07-30T14:30") in an IANA timezone to a
 * UTC epoch (seconds). Uses Intl to measure the zone's offset at that instant —
 * accurate except within the ~1h DST-transition window, which is acceptable here.
 */
function zonedWallTimeToUtcEpoch(localDateTime: string, timeZone: string): number | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(localDateTime);
  if (!m) return null;
  const [, y, mo, d, hh, mm] = m.map(Number) as unknown as number[];
  const utcGuess = Date.UTC(y, mo - 1, d, hh, mm);
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
  }).formatToParts(new Date(utcGuess));
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  let hour = get("hour");
  if (hour === 24) hour = 0; // some engines emit "24" for midnight
  const asUTC = Date.UTC(get("year"), get("month") - 1, get("day"), hour, get("minute"), get("second"));
  const offset = asUTC - utcGuess; // ms the zone is ahead of UTC at that instant
  return Math.floor((utcGuess - offset) / 1000);
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

  const result = await db.execute({
    sql: `INSERT INTO scheduled_campaigns
            (subject, body, is_html, list_id, exclude_recent_days, daily_limit,
             send_offset, reply_to, attach_postcard, scheduled_at, timezone, status)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
    args: [
      b.subject.trim(),
      b.body,
      b.isHtml ? 1 : 0,
      b.listId ?? null,
      b.excludeRecentDays ?? null,
      b.dailyLimit ?? null,
      b.offset && b.offset > 0 ? Math.floor(b.offset) : 0,
      b.replyTo?.trim() || null,
      b.attachPostcard ? 1 : 0,
      scheduledAt,
      b.timezone,
    ],
  });

  return NextResponse.json({ success: true, id: Number(result.lastInsertRowid), scheduledAt });
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
