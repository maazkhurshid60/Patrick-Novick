import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

// GET /api/unsubscribe?email=... — called when recipient clicks the link in email
export async function GET(req: NextRequest): Promise<NextResponse> {
  const email = req.nextUrl.searchParams.get("email")?.toLowerCase().trim();
  if (!email || !email.includes("@")) {
    return NextResponse.redirect(new URL("/unsubscribe?status=invalid", req.url));
  }
  await db.batch([
    { sql: "INSERT OR IGNORE INTO suppression_list (email, reason) VALUES (?, 'unsubscribed')", args: [email] },
    { sql: "UPDATE contacts SET status = 'unsubscribed' WHERE LOWER(email) = ?", args: [email] },
  ], "write");
  return NextResponse.redirect(new URL(`/unsubscribe?status=done&email=${encodeURIComponent(email)}`, req.url));
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
