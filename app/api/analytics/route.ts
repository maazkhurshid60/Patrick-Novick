import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { getBrevoStats } from "@/lib/brevo";

interface ContactEngagement {
  email: string;
  name: string;
  status: string;
  sends: number;       // how many campaigns this person has been emailed
  opens: number;       // how many of those they opened
  last_sent: number | null;
  suppressed: number;  // 1 if on the suppression list (unsubscribed/bounced)
}

// GET /api/analytics — deliverability stats (Brevo) + per-contact engagement (local DB)
export async function GET(req: NextRequest): Promise<NextResponse> {
  const days = Math.max(1, Math.min(90, Number(req.nextUrl.searchParams.get("days")) || 30));

  const [brevo, contactsRes, totalsRes] = await Promise.all([
    getBrevoStats(days),
    db.execute(`
      SELECT
        c.email,
        c.name,
        c.status,
        COUNT(cr.campaign_id) AS sends,
        MAX(cr.sent_at) AS last_sent,
        (SELECT COUNT(DISTINCT eo.campaign_id) FROM email_opens eo WHERE eo.email = c.email) AS opens,
        (SELECT COUNT(*) FROM suppression_list s WHERE s.email = c.email) AS suppressed
      FROM contacts c
      LEFT JOIN campaign_recipients cr ON cr.email = c.email
      GROUP BY c.email
      ORDER BY sends DESC, last_sent DESC
    `),
    db.execute(`
      SELECT
        (SELECT COUNT(*) FROM contacts) AS total_contacts,
        (SELECT COUNT(*) FROM campaign_recipients) AS total_sends,
        (SELECT COUNT(*) FROM email_opens) AS total_opens,
        (SELECT COUNT(*) FROM suppression_list) AS total_suppressed
    `),
  ]);

  const contacts = (contactsRes.rows as unknown as ContactEngagement[]).map((c) => ({
    email: c.email,
    name: c.name || "",
    status: c.status || "active",
    sends: Number(c.sends ?? 0),
    opens: Number(c.opens ?? 0),
    last_sent: c.last_sent ? Number(c.last_sent) : null,
    suppressed: Number(c.suppressed ?? 0) > 0 ? 1 : 0,
  }));

  const t = totalsRes.rows[0] ?? {};
  const totals = {
    total_contacts: Number(t.total_contacts ?? 0),
    total_sends: Number(t.total_sends ?? 0),
    total_opens: Number(t.total_opens ?? 0),
    total_suppressed: Number(t.total_suppressed ?? 0),
  };

  return NextResponse.json({ brevo, contacts, totals });
}
