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

function wrapInHtmlTemplate(bodyText: string, email: string, campaignId: number): string {
  const formattedBody = bodyText.trim().replace(/\n/g, "<br />");
  const unsubscribeUrl = `https://patricknovick.com/unsubscribe?email=${encodeURIComponent(email)}`;
  // base64-encode email for tracking pixel — decoded server-side on open
  const eid = encodeURIComponent(Buffer.from(email.toLowerCase()).toString("base64"));
  const trackingPixel = `https://patricknovick.com/api/track/open?cid=${campaignId}&eid=${eid}`;

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
      <td style="padding:40px 30px;font-size:15px;line-height:1.7;color:#1a1a1a;max-width:600px;">
        ${formattedBody}
      </td>
    </tr>
    <tr>
      <td style="height:400px;font-size:0;line-height:0;">&nbsp;</td>
    </tr>
    <tr>
      <td style="padding:30px;border-top:1px solid #eeeeee;text-align:center;">
        <p style="margin:0 0 6px 0;font-size:12px;color:#999999;">Metro Associates, LLC &nbsp;&bull;&nbsp; 1317 Edgewater Drive #4452, Orlando, FL 32804</p>
        <p style="margin:0;">
          <a href="${unsubscribeUrl}" style="font-size:11px;color:#999999;text-decoration:underline;">Unsubscribe</a>
        </p>
      </td>
    </tr>
  </table>
  <img src="${trackingPixel}" width="1" height="1" style="display:none;width:1px;height:1px;position:absolute;opacity:0;" alt="" />
</body>
</html>`.trim();
}

// POST /api/campaigns/send
export async function POST(req: NextRequest): Promise<NextResponse> {
  const { subject, body, listId, excludeRecentDays, dailyLimit, replyTo } = await req.json() as {
    subject: string;
    body: string;
    listId?: number | null;
    excludeRecentDays?: number | null;
    dailyLimit?: number | null;
    replyTo?: string | null;
  };

  if (!subject?.trim() || !body?.trim()) {
    return NextResponse.json({ error: "Subject and body are required" }, { status: 400 });
  }

  // Build targeting query
  let sql: string;
  const args: (string | number)[] = [];

  if (listId) {
    sql = `SELECT c.id, c.email, c.name
           FROM contacts c
           JOIN contact_list_members m ON c.id = m.contact_id
           WHERE m.list_id = ? AND c.status = 'active'
           AND c.email NOT IN (SELECT email FROM suppression_list)`;
    args.push(listId);
  } else {
    sql = `SELECT id, email, name FROM contacts WHERE status = 'active'
           AND email NOT IN (SELECT email FROM suppression_list)`;
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

  // Resolve list name for logging
  let targetListName: string | null = null;
  if (listId) {
    const listResult = await db.execute({ sql: "SELECT name FROM contact_lists WHERE id = ?", args: [listId] });
    targetListName = (listResult.rows[0]?.name as string) ?? null;
  }

  // Create campaign record FIRST to get ID for tracking pixel
  const campaignInsert = await db.execute({
    sql: `INSERT INTO campaigns (subject, body, recipient_count, status, target_list, sent_at)
          VALUES (?, ?, 0, 'sending', ?, unixepoch())`,
    args: [subject, body, targetListName],
  });
  const campaignId = Number(campaignInsert.lastInsertRowid);

  let result;
  try {
    result = await sendCampaignEmail({
      subject,
      htmlContent: body,
      replyTo: replyTo ?? undefined,
      recipients: contacts.map((c) => {
        const personalizedText = personalize(body, c);
        const wrappedHtml = wrapInHtmlTemplate(personalizedText, c.email as string, campaignId);
        return {
          email: c.email as string,
          name: (c.name as string) || undefined,
          personalizedHtml: wrappedHtml,
          personalizedSubject: personalize(subject, c),
        };
      }),
    });
  } catch (err) {
    await db.execute({ sql: "UPDATE campaigns SET status = 'failed' WHERE id = ?", args: [campaignId] });
    const message = err instanceof Error ? err.message : "Send failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }

  // Mark campaign sent with final recipient count
  await db.execute({
    sql: "UPDATE campaigns SET status = 'sent', recipient_count = ?, brevo_msg_id = ? WHERE id = ?",
    args: [contacts.length, result.messageId ?? null, campaignId],
  });

  // Track recipients for future exclude-recent logic
  await db.batch(
    contacts.map((c) => ({
      sql: "INSERT OR IGNORE INTO campaign_recipients (campaign_id, email) VALUES (?, ?)",
      args: [campaignId, c.email as string],
    })),
    "write"
  );

  return NextResponse.json({ success: true, recipients: contacts.length, campaignId, messageId: result.messageId });
}

// GET /api/campaigns/send — campaign history with open counts
export async function GET(): Promise<NextResponse> {
  const result = await db.execute(`
    SELECT c.id, c.subject, c.recipient_count, c.status, c.target_list, c.sent_at,
           (SELECT COUNT(*) FROM email_opens WHERE campaign_id = c.id) AS total_opens,
           (SELECT COUNT(DISTINCT email) FROM email_opens WHERE campaign_id = c.id) AS unique_opens
    FROM campaigns c
    ORDER BY c.sent_at DESC
    LIMIT 50
  `);
  return NextResponse.json(result.rows);
}
