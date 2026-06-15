import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

interface ContactRow {
  id: number;
  email: string;
  name: string;
  created_at: number;
}

// GET /api/contacts — list all contacts
export async function GET(): Promise<NextResponse> {
  const result = await db.execute("SELECT * FROM contacts ORDER BY created_at DESC");
  return NextResponse.json(result.rows);
}

// POST /api/contacts — add one or multiple contacts
export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = await req.json();

  const entries: { email: string; name?: string }[] = Array.isArray(body) ? body : [body];

  let added = 0;
  for (const row of entries) {
    const email = (row.email ?? "").trim().toLowerCase();
    if (!email || !email.includes("@")) continue;
    const res = await db.execute({
      sql: "INSERT OR IGNORE INTO contacts (email, name) VALUES (?, ?)",
      args: [email, (row.name ?? "").trim()],
    });
    added += res.rowsAffected;
  }

  return NextResponse.json({ added });
}

// PATCH /api/contacts — update status (active | unsubscribed)
export async function PATCH(req: NextRequest): Promise<NextResponse> {
  const { id, status } = await req.json() as { id: number; status: string };
  if (!["active", "unsubscribed"].includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }
  await db.execute({ sql: "UPDATE contacts SET status = ? WHERE id = ?", args: [status, id] });

  // Keep suppression list in sync
  const emailResult = await db.execute({ sql: "SELECT email FROM contacts WHERE id = ?", args: [id] });
  const email = emailResult.rows[0]?.email as string | undefined;
  if (email) {
    if (status === "unsubscribed") {
      await db.execute({
        sql: "INSERT OR IGNORE INTO suppression_list (email, reason) VALUES (?, 'unsubscribed')",
        args: [email],
      });
    } else {
      await db.execute({ sql: "DELETE FROM suppression_list WHERE email = ?", args: [email] });
    }
  }
  return NextResponse.json({ success: true });
}

// DELETE /api/contacts — delete by id
export async function DELETE(req: NextRequest): Promise<NextResponse> {
  const { id } = await req.json();
  await db.execute({ sql: "DELETE FROM contacts WHERE id = ?", args: [id] });
  return NextResponse.json({ success: true });
}
