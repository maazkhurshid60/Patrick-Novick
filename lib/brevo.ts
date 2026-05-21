const BREVO_API_URL = "https://api.brevo.com/v3";

function getApiKey(): string {
  const key = process.env.BREVO_API_KEY;
  if (!key) throw new Error("BREVO_API_KEY is not set");
  return key;
}

export interface Recipient {
  email: string;
  name?: string;
}

export interface SendEmailOptions {
  subject: string;
  htmlContent: string;
  recipients: Recipient[];
}

export interface SendResult {
  messageId?: string;
}

/**
 * Sends a transactional email to multiple recipients via Brevo API.
 * Each recipient gets an individual email (BCC-safe — no address leaking).
 */
export async function sendCampaignEmail(
  opts: SendEmailOptions
): Promise<SendResult> {
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const senderName = process.env.BREVO_SENDER_NAME ?? "Patrick Novick";

  if (!senderEmail) throw new Error("BREVO_SENDER_EMAIL is not set");

  const payload = {
    sender: { email: senderEmail, name: senderName },
    to: opts.recipients.map((r) => ({ email: r.email, name: r.name ?? r.email })),
    subject: opts.subject,
    htmlContent: opts.htmlContent,
  };

  const res = await fetch(`${BREVO_API_URL}/smtp/email`, {
    method: "POST",
    headers: {
      "api-key": getApiKey(),
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Brevo API error ${res.status}: ${err}`);
  }

  const data = await res.json() as { messageId?: string };
  return { messageId: data.messageId };
}
