import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { getBrevoStats, getBrevoEvents, BrevoEvent, BrevoStats, DateRange } from "@/lib/brevo";
import { dayRangeToUnix, isValidDateStr, rangeLabel } from "@/lib/dateRange";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// When a list is selected, Brevo's aggregated report can't be filtered by list
// (Brevo doesn't know our lists), so we derive the deliverability numbers from the
// event feed restricted to that list's member emails.
function deriveBrevoFromEvents(events: BrevoEvent[], label: string): BrevoStats {
  const lc = (s: string) => (s || "").toLowerCase();
  const ofType = (t: string) => events.filter((e) => e.event === t);
  const uniq = (t: string) => new Set(ofType(t).map((e) => lc(e.email))).size;
  const delivered = ofType("delivered").length;
  const hardBounces = ofType("hardBounces").length;
  const softBounces = ofType("softBounces").length;
  const blocked = ofType("blocked").length;
  const requests = ofType("requests").length || delivered + hardBounces + softBounces + blocked;
  return {
    range: label,
    requests,
    delivered,
    hardBounces,
    softBounces,
    blocked,
    invalid: ofType("invalid").length,
    spamReports: ofType("spam").length,
    unsubscribed: ofType("unsubscribed").length,
    opens: ofType("opened").length,
    uniqueOpens: uniq("opened"),
    clicks: ofType("clicks").length,
    uniqueClicks: uniq("clicks"),
  };
}

interface ContactEngagement {
  email: string;
  name: string;
  status: string;
  title: string;
  company: string;
  sends: number;       // how many campaigns this person has been emailed
  opens: number;       // how many of those they opened
  last_sent: number | null;
  suppressed: number;  // 1 if on the suppression list (unsubscribed/bounced)
}

// GET /api/analytics — deliverability stats (Brevo) + per-contact engagement (local DB)
export async function GET(req: NextRequest): Promise<NextResponse> {
  const days = Math.max(1, Math.min(90, Number(req.nextUrl.searchParams.get("days")) || 30));
  const listIdParam = req.nextUrl.searchParams.get("listId");
  const listId = listIdParam ? Number(listIdParam) : null;

  // Optional explicit date range (from/to as YYYY-MM-DD). When present it overrides
  // the rolling `days` window. We use a half-open unix interval [start, endExclusive)
  // so the entire `to` day is included — the classic "BETWEEN drops the last day" bug.
  const fromParam = req.nextUrl.searchParams.get("from");
  const toParam = req.nextUrl.searchParams.get("to");
  const hasRange = isValidDateStr(fromParam) && isValidDateStr(toParam);
  const brevoRange: DateRange | undefined = hasRange
    ? { startDate: fromParam, endDate: toParam }
    : undefined;
  const unixRange = hasRange ? dayRangeToUnix(fromParam, toParam) : null;
  const label = hasRange ? rangeLabel(fromParam, toParam) : `last ${days} days`;

  // Member emails for the selected list (used to scope Brevo events)
  let memberEmails: Set<string> | null = null;
  if (listId) {
    const m = await db.execute({
      sql: `SELECT LOWER(c.email) AS e FROM contact_list_members m JOIN contacts c ON c.id = m.contact_id WHERE m.list_id = ?`,
      args: [listId],
    });
    memberEmails = new Set(m.rows.map((r) => String(r.e)));
  }

  // Deliverability: account-wide aggregated report normally; derived from the
  // list's events when a list is selected. (The recent-activity feed is served
  // separately by /api/analytics/events with proper offset pagination.)
  let brevo: BrevoStats;
  if (listId) {
    const rawEvents = await getBrevoEvents(days, 2500, brevoRange);
    const events = memberEmails
      ? rawEvents.filter((e) => memberEmails!.has((e.email || "").toLowerCase()))
      : rawEvents;
    brevo = deriveBrevoFromEvents(events, label);
  } else {
    brevo = await getBrevoStats(days, brevoRange);
  }

  // Audience totals from our own send logs. Sends & opens honour the date range
  // (half-open [start, endExclusive) so the whole end day counts); contacts &
  // suppression are current-state counts, not time-scoped.
  const sendConds: string[] = [];
  const sendArgs: number[] = [];
  if (listId) { sendConds.push("campaign_id IN (SELECT id FROM campaigns WHERE list_id = ?)"); sendArgs.push(listId); }
  if (unixRange) { sendConds.push("sent_at >= ? AND sent_at < ?"); sendArgs.push(unixRange.start, unixRange.endExclusive); }
  const sendWhere = sendConds.length ? `WHERE ${sendConds.join(" AND ")}` : "";

  const openConds: string[] = [
    `eo.campaign_id ${listId ? "IN (SELECT id FROM campaigns WHERE list_id = ?)" : "IN (SELECT id FROM campaigns)"}`,
  ];
  const openArgs: number[] = [];
  if (listId) openArgs.push(listId);
  if (unixRange) { openConds.push("eo.opened_at >= ? AND eo.opened_at < ?"); openArgs.push(unixRange.start, unixRange.endExclusive); }

  const contactsSel = listId
    ? "(SELECT COUNT(*) FROM contact_list_members WHERE list_id = ?)"
    : "(SELECT COUNT(*) FROM contacts)";
  // "Unsubscribed / Suppressed" counts genuine opt-outs only — bounces/invalids
  // have their own Bounced page (and Bounces stat), so exclude them here to match
  // the Opt-Outs page.
  const notBounce = "s.reason NOT IN ('bounced','invalid') AND s.reason NOT LIKE '%bounce%'";
  const suppressedSel = listId
    ? `(SELECT COUNT(*) FROM contact_list_members m JOIN contacts c ON c.id = m.contact_id JOIN suppression_list s ON s.email = c.email WHERE m.list_id = ? AND ${notBounce})`
    : `(SELECT COUNT(*) FROM suppression_list s WHERE ${notBounce})`;

  const totalsRes = await db.execute({
    sql: `
      SELECT
        ${contactsSel} AS total_contacts,
        (SELECT COUNT(*) FROM campaign_recipients ${sendWhere}) AS total_sends,
        (SELECT COUNT(*) FROM (
           SELECT DISTINCT eo.campaign_id, eo.email FROM email_opens eo WHERE ${openConds.join(" AND ")}
        )) AS total_opens,
        ${suppressedSel} AS total_suppressed
    `,
    args: [
      ...(listId ? [listId] : []), // total_contacts
      ...sendArgs,                 // total_sends
      ...openArgs,                 // total_opens
      ...(listId ? [listId] : []), // total_suppressed
    ],
  });

  const t = totalsRes.rows[0] ?? {};
  const totals = {
    total_contacts: Number(t.total_contacts ?? 0),
    total_sends: Number(t.total_sends ?? 0),
    total_opens: Number(t.total_opens ?? 0),
    total_suppressed: Number(t.total_suppressed ?? 0),
  };

  return NextResponse.json({ brevo, events: [] as BrevoEvent[], contacts: [] as ContactEngagement[], totals });
}
