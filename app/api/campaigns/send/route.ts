import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { sendCampaignEmail, getBouncedEmails } from "@/lib/brevo";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";
export const revalidate = 0;


interface ContactRow {
  id: number;
  email: string;
  name: string;
  title?: string;
  company?: string;
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
    .replace(/\{\{email\}\}/gi, contact.email as string)
    .replace(/\{\{title\}\}/gi, contact.title || "")
    .replace(/\{\{company\}\}/gi, contact.company || "");
}

function wrapInHtmlTemplate(bodyText: string, email: string, campaignId: number, isHtml = false): string {
  // Plain text: convert newlines to <br>. HTML: use the author's markup verbatim.
  const formattedBody = isHtml ? bodyText : bodyText.trim().replace(/\n/g, "<br />");
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
  const {
    subject,
    body,
    isHtml,
    listId,
    excludeRecentDays,
    dailyLimit,
    offset,
    replyTo,
    isTestSend,
    testEmail,
    attachPostcard,
    customAttachment,
  } = await req.json() as {
    subject: string;
    body: string;
    isHtml?: boolean;
    listId?: number | null;
    excludeRecentDays?: number | null;
    dailyLimit?: number | null;
    offset?: number | null;
    replyTo?: string | null;
    isTestSend?: boolean;
    testEmail?: string | null;
    attachPostcard?: boolean;
    customAttachment?: { name: string; content: string } | null;
  };

  if (!subject?.trim() || !body?.trim()) {
    return NextResponse.json({ error: "Subject and body are required" }, { status: 400 });
  }

  // Construct attachments array
  const finalAttachments: { name: string; content?: string; url?: string }[] = [];

  if (attachPostcard) {
    try {
      const postcardPath = path.join(process.cwd(), "public", "postcard.pdf");
      if (fs.existsSync(postcardPath)) {
        finalAttachments.push({
          name: "postcard.pdf",
          content: fs.readFileSync(postcardPath).toString("base64"),
        });
      } else {
        console.warn("Postcard file not found in public directory:", postcardPath);
      }
    } catch (err) {
      console.error("Failed to read postcard file:", err);
    }
  }

  if (customAttachment?.content) {
    finalAttachments.push({
      name: customAttachment.name,
      content: customAttachment.content,
    });
  }

  const attachmentsOption = finalAttachments.length > 0 ? finalAttachments : undefined;

  // Handle Test Send logic (does not write to campaigns logs)
  if (isTestSend) {
    if (!testEmail?.trim()) {
      return NextResponse.json({ error: "Test email address is required" }, { status: 400 });
    }
    try {
      const testContact = { id: 0, email: testEmail.trim(), name: "Test Recipient", title: "Senior Engineer", company: "Big Company" };
      const personalizedBody = personalize(body, testContact);
      const personalizedSubject = `[TEST] ${personalize(subject, testContact)}`;
      const wrappedHtml = wrapInHtmlTemplate(personalizedBody, testEmail.trim(), 0, !!isHtml);

      const result = await sendCampaignEmail({
        subject: personalizedSubject,
        htmlContent: wrappedHtml,
        replyTo: replyTo ?? undefined,
        attachments: attachmentsOption,
        recipients: [{
          email: testEmail.trim(),
          name: "Test Recipient",
          personalizedHtml: wrappedHtml
        }]
      });
      if (result.sent.length === 0) {
        const reason = result.failed[0]?.error ?? "Send failed";
        return NextResponse.json({ error: `Test send failed: ${reason}` }, { status: 500 });
      }
      return NextResponse.json({ success: true, isTest: true, recipients: 1, messageId: result.messageId });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Test send failed";
      return NextResponse.json({ error: message }, { status: 500 });
    }
  }

  // Feedback loop: before targeting, pull every address Brevo has marked as a
  // hard bounce / block / invalid and add it to our suppression list. The
  // targeting query below excludes suppression_list, so these bad addresses are
  // skipped automatically — this is what keeps the bounce rate near zero over time.
  try {
    const bounced = await getBouncedEmails(90);
    if (bounced.size > 0) {
      await db.batch(
        [...bounced].map((email) => ({
          sql: "INSERT OR IGNORE INTO suppression_list (email, reason) VALUES (?, 'bounced')",
          args: [email],
        })),
        "write"
      );
    }
  } catch {
    // a failed sync must never block a send — worst case we skip a few bad addresses this round
  }

  // Build targeting query
  let sql: string;
  const args: (string | number)[] = [];

  if (listId) {
    sql = `SELECT c.id, c.email, c.name, c.title, c.company
           FROM contacts c
           JOIN contact_list_members m ON c.id = m.contact_id
           WHERE m.list_id = ? AND c.status = 'active'
           AND c.email NOT IN (SELECT email FROM suppression_list)`;
    args.push(listId);
  } else {
    sql = `SELECT id, email, name, title, company FROM contacts WHERE status = 'active'
           AND email NOT IN (SELECT email FROM suppression_list)`;
  }

  if (excludeRecentDays && excludeRecentDays > 0) {
    const cutoff = Math.floor(Date.now() / 1000) - excludeRecentDays * 86400;
    const emailCol = listId ? "c.email" : "email";
    sql += ` AND ${emailCol} NOT IN (SELECT DISTINCT email FROM campaign_recipients WHERE sent_at > ?)`;
    args.push(cutoff);
  }

  // Stable ordering so "skip first N" refers to the same positions across sends.
  sql += ` ORDER BY ${listId ? "c.id" : "id"}`;

  const limit = dailyLimit && dailyLimit > 0 ? dailyLimit : 500;
  sql += ` LIMIT ?`;
  args.push(limit);

  // Skip the first N eligible recipients (batch sending: 1–25, then 26–50, …)
  const skip = offset && offset > 0 ? Math.floor(offset) : 0;
  if (skip > 0) {
    sql += ` OFFSET ?`;
    args.push(skip);
  }

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
    sql: `INSERT INTO campaigns (subject, body, recipient_count, status, target_list, list_id, sent_at)
          VALUES (?, ?, 0, 'sending', ?, ?, unixepoch())`,
    args: [subject, body, targetListName, listId ?? null],
  });
  const campaignId = Number(campaignInsert.lastInsertRowid);

  let result;
  try {
    result = await sendCampaignEmail({
      subject,
      htmlContent: body,
      replyTo: replyTo ?? undefined,
      attachments: attachmentsOption,
      recipients: contacts.map((c) => {
        const personalizedText = personalize(body, c);
        const wrappedHtml = wrapInHtmlTemplate(personalizedText, c.email as string, campaignId, !!isHtml);
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

  // If nothing actually sent, mark the campaign failed and report why.
  if (result.sent.length === 0) {
    await db.execute({ sql: "UPDATE campaigns SET status = 'failed' WHERE id = ?", args: [campaignId] });
    const reason = result.failed[0]?.error ?? "no emails were accepted";
    return NextResponse.json({ error: `Send failed — ${reason}` }, { status: 500 });
  }

  // Mark campaign sent with the ACTUAL number delivered to Brevo (not the target
  // count) so a partial send is recorded accurately.
  await db.execute({
    sql: "UPDATE campaigns SET status = 'sent', recipient_count = ?, brevo_msg_id = ? WHERE id = ?",
    args: [result.sent.length, result.messageId ?? null, campaignId],
  });

  // Track ONLY the recipients that were actually sent — so a mid-batch failure
  // can be safely retried without duplicating the ones already emailed.
  await db.batch(
    result.sent.map((email) => ({
      sql: "INSERT OR IGNORE INTO campaign_recipients (campaign_id, email) VALUES (?, ?)",
      args: [campaignId, email],
    })),
    "write"
  );

  return NextResponse.json({
    success: true,
    recipients: result.sent.length,
    failed: result.failed.length,
    campaignId,
    messageId: result.messageId,
  });
}

// GET /api/campaigns/send — campaign history with open counts.
// Optional ?listId=N filters to campaigns sent to that list.
export async function GET(req: NextRequest): Promise<NextResponse> {
  const listIdParam = req.nextUrl.searchParams.get("listId");
  const listId = listIdParam ? Number(listIdParam) : null;

  const where = listId ? "WHERE c.list_id = ?" : "";
  const args = listId ? [listId] : [];

  const result = await db.execute({
    sql: `
      SELECT c.id, c.subject, c.recipient_count, c.status, c.target_list, c.list_id, c.sent_at,
             (SELECT COUNT(*) FROM email_opens WHERE campaign_id = c.id) AS total_opens,
             (SELECT COUNT(DISTINCT email) FROM email_opens WHERE campaign_id = c.id) AS unique_opens
      FROM campaigns c
      ${where}
      ORDER BY c.sent_at DESC
      LIMIT 50
    `,
    args,
  });
  return NextResponse.json(result.rows);
}

// DELETE /api/campaigns/send — delete campaign record
export async function DELETE(req: NextRequest): Promise<NextResponse> {
  try {
    const { id } = await req.json() as { id: number };
    if (!id) {
      return NextResponse.json({ error: "Campaign ID is required" }, { status: 400 });
    }
    await db.execute({ sql: "DELETE FROM campaigns WHERE id = ?", args: [id] });
    await db.execute({ sql: "DELETE FROM campaign_recipients WHERE campaign_id = ?", args: [id] });
    await db.execute({ sql: "DELETE FROM email_opens WHERE campaign_id = ?", args: [id] });
    return NextResponse.json({ success: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Failed to delete campaign";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
