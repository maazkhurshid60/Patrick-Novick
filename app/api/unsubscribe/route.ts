import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

// GET /api/unsubscribe?email=... — do NOT suppress on a bare GET. Email security
// scanners and inbox link-prefetchers fetch links automatically, which would
// unsubscribe people who never clicked. Instead, send them to the confirmation
// page where an explicit button click (POST) performs the unsubscribe.
export async function GET(req: NextRequest): Promise<NextResponse> {
  const email = req.nextUrl.searchParams.get("email")?.toLowerCase().trim();
  const target = email && email.includes("@")
    ? `/unsubscribe?email=${encodeURIComponent(email)}`
    : "/unsubscribe?status=invalid";
  return NextResponse.redirect(new URL(target, req.url));
}

// POST /api/unsubscribe — called from the unsubscribe page form
export async function POST(req: NextRequest): Promise<NextResponse> {
  const { email } = await req.json() as { email?: string };
  const cleanEmail = (email ?? "").trim().toLowerCase();
  if (!cleanEmail || !cleanEmail.includes("@")) {
    return NextResponse.json({ error: "A valid email address is required" }, { status: 400 });
  }
  await db.batch([
    { sql: "INSERT OR IGNORE INTO suppression_list (email, reason) VALUES (?, 'unsubscribed')", args: [cleanEmail] },
    {
      sql: `INSERT INTO contacts (email, status) VALUES (?, 'unsubscribed')
            ON CONFLICT(email) DO UPDATE SET status = 'unsubscribed'`,
      args: [cleanEmail],
    },
  ], "write");
  return NextResponse.json({ success: true });
}

// PATCH /api/unsubscribe — update unsubscribe reason / feedback
export async function PATCH(req: NextRequest): Promise<NextResponse> {
  try {
    const { email, reason } = await req.json() as { email?: string; reason?: string };
    const cleanEmail = (email ?? "").trim().toLowerCase();
    const cleanReason = (reason ?? "").trim();
    if (!cleanEmail || !cleanReason) {
      return NextResponse.json({ error: "Email and reason are required" }, { status: 400 });
    }

    await db.execute({
      sql: "UPDATE suppression_list SET reason = ? WHERE LOWER(email) = ?",
      args: [cleanReason, cleanEmail],
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Failed to update reason";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
