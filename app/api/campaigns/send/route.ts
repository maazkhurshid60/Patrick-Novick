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
  const { subject, body } = await req.json() as { subject: string; body: string };

  if (!subject?.trim() || !body?.trim()) {
    return NextResponse.json({ error: "Subject and body are required" }, { status: 400 });
  }

  const contactsResult = await db.execute("SELECT * FROM contacts");
  const contacts = contactsResult.rows as unknown as ContactRow[];
  if (contacts.length === 0) {
    return NextResponse.json({ error: "No contacts to send to" }, { status: 400 });
  }

  let result;
  try {
    result = await sendCampaignEmail({
      subject,
      htmlContent: body,
      recipients: contacts.map((c) => ({
        email: c.email as string,
        name: (c.name as string) || undefined,
        personalizedHtml: personalize(body, c),
        personalizedSubject: personalize(subject, c),
      })),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Send failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }

  // Log campaign to DB
  await db.execute({
    sql: `INSERT INTO campaigns (subject, body, recipient_count, status, brevo_msg_id, sent_at)
      VALUES (?, ?, ?, 'sent', ?, unixepoch())`,
    args: [subject, body, contacts.length, result.messageId ?? null],
  });

  return NextResponse.json({ success: true, recipients: contacts.length, messageId: result.messageId });
}

// GET /api/campaigns/send — list campaign history
export async function GET(): Promise<NextResponse> {
  const result = await db.execute(
    "SELECT id, subject, recipient_count, status, sent_at FROM campaigns ORDER BY sent_at DESC LIMIT 50"
  );
  return NextResponse.json(result.rows);
}
