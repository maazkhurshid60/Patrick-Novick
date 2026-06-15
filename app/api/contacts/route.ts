import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

// GET /api/contacts — list all contacts
export async function GET(): Promise<NextResponse> {
  const result = await db.execute("SELECT * FROM contacts ORDER BY created_at DESC");
  return NextResponse.json(result.rows);
}

// POST /api/contacts — add one or multiple contacts (skips suppressed emails)
export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = await req.json();
  const entries: { email: string; name?: string }[] = Array.isArray(body) ? body : [body];

  // Fetch all suppressed emails once for fast lookup
  const suppressedResult = await db.execute("SELECT email FROM suppression_list");
  const suppressed = new Set(suppressedResult.rows.map((r) => (r.email as string).toLowerCase()));

  let added = 0;
  let skipped = 0;
  for (const row of entries) {
    const email = (row.email ?? "").trim().toLowerCase();
    if (!email || !email.includes("@")) continue;
    if (suppressed.has(email)) { skipped++; continue; }
    const res = await db.execute({
      sql: "INSERT OR IGNORE INTO contacts (email, name) VALUES (?, ?)",
      args: [email, (row.name ?? "").trim()],
    });
    added += res.rowsAffected;
  }

  return NextResponse.json({ added, skipped });
}

// PATCH /api/contacts — update status (active | unsubscribed | invalid)
export async function PATCH(req: NextRequest): Promise<NextResponse> {
  const { id, status } = await req.json() as { id: number; status: string };
  if (!["active", "unsubscribed", "invalid"].includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }
  await db.execute({ sql: "UPDATE contacts SET status = ? WHERE id = ?", args: [status, id] });

  const emailResult = await db.execute({ sql: "SELECT email FROM contacts WHERE id = ?", args: [id] });
  const email = emailResult.rows[0]?.email as string | undefined;
  if (email) {
    if (status === "unsubscribed") {
      await db.execute({
        sql: "INSERT OR IGNORE INTO suppression_list (email, reason) VALUES (?, 'unsubscribed')",
        args: [email],
      });
    } else if (status === "active") {
      await db.execute({ sql: "DELETE FROM suppression_list WHERE email = ?", args: [email] });
    }
  }
  return NextResponse.json({ success: true });
}

// DELETE /api/contacts — delete by id and add to suppression list
export async function DELETE(req: NextRequest): Promise<NextResponse> {
  const { id } = await req.json() as { id: number };

  // Get email before deleting so we can suppress it
  const emailResult = await db.execute({ sql: "SELECT email FROM contacts WHERE id = ?", args: [id] });
  const email = emailResult.rows[0]?.email as string | undefined;

  await db.execute({ sql: "DELETE FROM contacts WHERE id = ?", args: [id] });

  if (email) {
    await db.execute({
      sql: "INSERT OR IGNORE INTO suppression_list (email, reason) VALUES (?, 'removed')",
      args: [email],
    });
  }

  return NextResponse.json({ success: true });
}
