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

function wrapInHtmlTemplate(bodyText: string, email: string): string {
  // Convert newlines to breaks for HTML email clients
  const formattedBody = bodyText.trim().replace(/\n/g, "<br />");
  const unsubscribeUrl = `https://patricknovick.com/unsubscribe?email=${encodeURIComponent(email)}`;
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Patrick Novick</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f9f9f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f9f9f9; padding: 20px 0;">
    <tr>
      <td align="center">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; border: 1px solid #eef0f3; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.03);">
          <tr>
            <td style="padding: 40px 30px; font-size: 16px; line-height: 1.6; color: #2d3748;">
              ${formattedBody}
            </td>
          </tr>
          <tr>
            <td style="padding: 30px; background-color: #f7fafc; border-top: 1px solid #edf2f7; text-align: center;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="font-size: 12px; line-height: 1.5; color: #718096; text-align: center;">
                    <p style="margin: 0 0 10px 0; font-weight: 600; color: #4a5568; font-size: 13px;">
                      Metro Associates, LLC
                    </p>
                    <p style="margin: 0 0 20px 0; font-style: normal; color: #a0aec0;">
                      1317 Edgewater Drive #4452<br>
                      Orlando, FL 32804, United States
                    </p>
                    <p style="margin: 0;">
                      <a href="${unsubscribeUrl}" target="_blank" style="display: inline-block; background-color: #e63946; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 9999px; font-weight: 600; font-size: 12px; box-shadow: 0 4px 12px rgba(230, 57, 70, 0.25); text-align: center;">
                        Unsubscribe
                      </a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
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
    result = await sendCampaignEmail({
      subject,
      htmlContent: body, // Fallback
      recipients: contacts.map((c) => {
        const personalizedText = personalize(body, c);
        const wrappedHtml = wrapInHtmlTemplate(personalizedText, c.email as string);
        return {
          email: c.email as string,
          name: (c.name as string) || undefined,
          personalizedHtml: wrappedHtml,
          personalizedSubject: personalize(subject, c),
        };
      }),
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
