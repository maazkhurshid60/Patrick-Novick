import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { sendCampaignEmail } from "@/lib/mailer";

interface ContactRow {
  id: number;
  email: string;
  name: string;
}

// POST /api/campaigns/send
export async function POST(req: NextRequest): Promise<NextResponse> {
  const { subject, body } = await req.json() as { subject: string; body: string };

  if (!subject?.trim() || !body?.trim()) {
    return NextResponse.json({ error: "Subject and body are required" }, { status: 400 });
  }

  const contacts = db.prepare("SELECT * FROM contacts").all() as ContactRow[];
  if (contacts.length === 0) {
    return NextResponse.json({ error: "No contacts to send to" }, { status: 400 });
  }

  let result;
  try {
    result = await sendCampaignEmail({
      subject,
      htmlContent: body,
      recipients: contacts.map((c) => ({ email: c.email, name: c.name || undefined })),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Send failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }

  // Log campaign to DB
  db.prepare(`
    INSERT INTO campaigns (subject, body, recipient_count, status, brevo_msg_id, sent_at)
    VALUES (?, ?, ?, 'sent', ?, unixepoch())
  `).run(subject, body, contacts.length, result.messageId ?? null);

  return NextResponse.json({ success: true, recipients: contacts.length, messageId: result.messageId });
}

// GET /api/campaigns/send — list campaign history
export async function GET(): Promise<NextResponse> {
  const campaigns = db.prepare(
    "SELECT id, subject, recipient_count, status, sent_at FROM campaigns ORDER BY sent_at DESC LIMIT 50"
  ).all();
  return NextResponse.json(campaigns);
}
