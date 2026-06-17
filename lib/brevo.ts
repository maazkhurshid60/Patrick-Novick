const BREVO_API_URL = "https://api.brevo.com/v3";

function getApiKey(): string {
  const key = process.env.BREVO_API_KEY;
  if (!key) throw new Error("BREVO_API_KEY is not set");
  return key;
}

export interface Recipient {
  email: string;
  name?: string;
  personalizedHtml?: string;
  personalizedSubject?: string;
}

export interface SendEmailOptions {
  subject: string;
  htmlContent: string;
  recipients: Recipient[];
  replyTo?: string;
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
  const replyToEmail = opts.replyTo ?? process.env.BREVO_REPLY_TO_EMAIL ?? "patrick@metroassoc.com";

  if (!senderEmail) throw new Error("BREVO_SENDER_EMAIL is not set");

  // Send individually so each recipient gets personalized content
  let lastMessageId: string | undefined;
  for (const recipient of opts.recipients) {
    const html = recipient.personalizedHtml ?? opts.htmlContent;
    const payload: Record<string, unknown> = {
      sender: { email: senderEmail, name: senderName },
      to: [{ email: recipient.email, name: recipient.name ?? recipient.email }],
      subject: recipient.personalizedSubject ?? opts.subject,
      htmlContent: html,
    };
    if (replyToEmail) payload.replyTo = { email: replyToEmail };

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
      const errText = await res.text();
      if (res.status === 401) {
        let msg = "Brevo authentication failed.";
        try {
          const parsed = JSON.parse(errText);
          if (parsed.message?.includes("unrecognised IP")) {
            msg = "Brevo blocked this request — your current IP is not whitelisted. Go to app.brevo.com → Security → Authorised IPs and add your IP, or remove the restriction entirely.";
          } else if (parsed.message?.includes("Key not found") || parsed.code === "unauthorized") {
            msg = "Brevo API key is invalid. Check BREVO_API_KEY in your environment variables.";
          }
        } catch { /* ignore */ }
        throw new Error(msg);
      }
      throw new Error(`Email send failed (${res.status}). Please try again.`);
    }

    const data = await res.json() as { messageId?: string };
    lastMessageId = data.messageId;
  }

  return { messageId: lastMessageId };
}

