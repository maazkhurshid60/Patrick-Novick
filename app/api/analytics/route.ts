import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { getBrevoStats, getBrevoEvents, BrevoEvent, BrevoStats } from "@/lib/brevo";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// When a list is selected, Brevo's aggregated report can't be filtered by list
// (Brevo doesn't know our lists), so we derive the deliverability numbers from the
// event feed restricted to that list's member emails.
function deriveBrevoFromEvents(events: BrevoEvent[], days: number): BrevoStats {
  const lc = (s: string) => (s || "").toLowerCase();
  const ofType = (t: string) => events.filter((e) => e.event === t);
  const uniq = (t: string) => new Set(ofType(t).map((e) => lc(e.email))).size;
  const delivered = ofType("delivered").length;
  const hardBounces = ofType("hardBounces").length;
  const softBounces = ofType("softBounces").length;
  const blocked = ofType("blocked").length;
  const requests = ofType("requests").length || delivered + hardBounces + softBounces + blocked;
  return {
    range: `last ${days} days`,
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

  // Member emails for the selected list (used to scope Brevo events)
  let memberEmails: Set<string> | null = null;
  if (listId) {
    const m = await db.execute({
      sql: `SELECT LOWER(c.email) AS e FROM contact_list_members m JOIN contacts c ON c.id = m.contact_id WHERE m.list_id = ?`,
      args: [listId],
    });
    memberEmails = new Set(m.rows.map((r) => String(r.e)));
  }

  // Brevo events — fetch more when scoping so the filtered/derived numbers are meaningful
  const rawEvents = await getBrevoEvents(days, listId ? 1000 : 100);
  const events = memberEmails
    ? rawEvents.filter((e) => memberEmails!.has((e.email || "").toLowerCase()))
    : rawEvents;

  // Deliverability: account-wide aggregated report normally; derived from the
  // list's events when a list is selected.
  const brevo = listId ? deriveBrevoFromEvents(events, days) : await getBrevoStats(days);

  // Audience totals — scoped to the list (accurate, from our own send logs)
  const totalsRes = listId
    ? await db.execute({
        sql: `
          SELECT
            (SELECT COUNT(*) FROM contact_list_members WHERE list_id = ?) AS total_contacts,
            (SELECT COUNT(*) FROM campaign_recipients WHERE campaign_id IN (SELECT id FROM campaigns WHERE list_id = ?)) AS total_sends,
            (SELECT COUNT(*) FROM (
               SELECT DISTINCT eo.campaign_id, eo.email FROM email_opens eo
               WHERE eo.campaign_id IN (SELECT id FROM campaigns WHERE list_id = ?)
            )) AS total_opens,
            (SELECT COUNT(*) FROM contact_list_members m
               JOIN contacts c ON c.id = m.contact_id
               JOIN suppression_list s ON s.email = c.email
               WHERE m.list_id = ?) AS total_suppressed
        `,
        args: [listId, listId, listId, listId],
      })
    : await db.execute(`
        SELECT
          (SELECT COUNT(*) FROM contacts) AS total_contacts,
          (SELECT COUNT(*) FROM campaign_recipients) AS total_sends,
          (SELECT COUNT(*) FROM (
             SELECT DISTINCT eo.campaign_id, eo.email FROM email_opens eo
             WHERE eo.campaign_id IN (SELECT id FROM campaigns)
          )) AS total_opens,
          (SELECT COUNT(*) FROM suppression_list) AS total_suppressed
      `);

  const t = totalsRes.rows[0] ?? {};
  const totals = {
    total_contacts: Number(t.total_contacts ?? 0),
    total_sends: Number(t.total_sends ?? 0),
    total_opens: Number(t.total_opens ?? 0),
    total_suppressed: Number(t.total_suppressed ?? 0),
  };

  return NextResponse.json({ brevo, events, contacts: [] as ContactEngagement[], totals });
}
