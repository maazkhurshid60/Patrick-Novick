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

// DELETE /api/contacts — delete by id
export async function DELETE(req: NextRequest): Promise<NextResponse> {
  const { id } = await req.json();
  await db.execute({ sql: "DELETE FROM contacts WHERE id = ?", args: [id] });
  return NextResponse.json({ success: true });
}
