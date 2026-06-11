import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { sendCampaignEmail } from "@/lib/brevo";

interface ContactRow {
  id: number;
  email: string;
  name: string;
}

function personalize(template: string, contact: ContactRow): string {
  const fullName = (contact.name as string) || "";
  const firstName = fullName.split(" ")[0] || fullName || "there";
  const lastName = fullName.split(" ").slice(1).join(" ") || "";
  return template
    .replace(/\{\{first_name\}\}/gi, firstName)
    .replace(/\{\{last_name\}\}/gi, lastName)
    .replace(/\{\{full_name\}\}/gi, fullName)
    .replace(/\{\{name\}\}/gi, fullName)
    .replace(/\{\{email\}\}/gi, contact.email as string);
}

// POST /api/campaigns/send
export async function POST(req: NextRequest): Promise<NextResponse> {
  const { subject, body, listId, excludeRecentDays, dailyLimit } = await req.json() as {
    subject: string;
    body: string;
    listId?: number | null;
    excludeRecentDays?: number | null;
    dailyLimit?: number | null;
  };

  if (!subject?.trim() || !body?.trim()) {
    return NextResponse.json({ error: "Subject and body are required" }, { status: 400 });
  }

  // Build query based on targeting
  let sql: string;
  const args: (string | number)[] = [];

  if (listId) {
    sql = `SELECT c.id, c.email, c.name
           FROM contacts c
           JOIN contact_list_members m ON c.id = m.contact_id
           WHERE m.list_id = ? AND c.status = 'active'`;
    args.push(listId);
  } else {
    sql = `SELECT id, email, name FROM contacts WHERE status = 'active'`;
  }

  if (excludeRecentDays && excludeRecentDays > 0) {
    const cutoff = Math.floor(Date.now() / 1000) - excludeRecentDays * 86400;
    const emailCol = listId ? "c.email" : "email";
    sql += ` AND ${emailCol} NOT IN (SELECT DISTINCT email FROM campaign_recipients WHERE sent_at > ?)`;
    args.push(cutoff);
  }

  const limit = dailyLimit && dailyLimit > 0 ? dailyLimit : 500;
  sql += ` LIMIT ?`;
  args.push(limit);

  const contactsResult = await db.execute({ sql, args });
  const contacts = contactsResult.rows as unknown as ContactRow[];

  if (contacts.length === 0) {
    return NextResponse.json({ error: "No eligible contacts to send to" }, { status: 400 });
  }

  // Get list name for logging
  let targetListName: string | null = null;
  if (listId) {
    const listResult = await db.execute({ sql: "SELECT name FROM contact_lists WHERE id = ?", args: [listId] });
    targetListName = (listResult.rows[0]?.name as string) ?? null;
  }

  let result;
  try {
    const emailFooter = "\n\n---\nMetro Associates\nTo unsubscribe from future mailings, click here: https://patricknovick.com/unsubscribe?email={{email}}";
    const bodyWithFooter = body.trim() + emailFooter;

    result = await sendCampaignEmail({
      subject,
      htmlContent: bodyWithFooter,
      recipients: contacts.map((c) => ({
        email: c.email as string,
        name: (c.name as string) || undefined,
        personalizedHtml: personalize(bodyWithFooter, c),
        personalizedSubject: personalize(subject, c),
      })),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Send failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }

  // Log campaign
  const campaignResult = await db.execute({
    sql: `INSERT INTO campaigns (subject, body, recipient_count, status, brevo_msg_id, target_list, sent_at)
          VALUES (?, ?, ?, 'sent', ?, ?, unixepoch())`,
    args: [subject, body, contacts.length, result.messageId ?? null, targetListName],
  });
  const campaignId = Number(campaignResult.lastInsertRowid);

  // Track recipients so future sends can exclude them
  if (contacts.length > 0) {
    await db.batch(
      contacts.map((c) => ({
        sql: "INSERT OR IGNORE INTO campaign_recipients (campaign_id, email) VALUES (?, ?)",
        args: [campaignId, c.email as string],
      })),
      "write"
    );
  }

  return NextResponse.json({ success: true, recipients: contacts.length, messageId: result.messageId });
}

// GET /api/campaigns/send — list campaign history
export async function GET(): Promise<NextResponse> {
  const result = await db.execute(
    "SELECT id, subject, recipient_count, status, target_list, sent_at FROM campaigns ORDER BY sent_at DESC LIMIT 50"
  );
  return NextResponse.json(result.rows);
}
