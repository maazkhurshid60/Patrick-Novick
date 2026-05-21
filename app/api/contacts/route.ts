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
  const contacts = db.prepare(
    "SELECT * FROM contacts ORDER BY created_at DESC"
  ).all() as ContactRow[];
  return NextResponse.json(contacts);
}

// POST /api/contacts — add one or multiple contacts
export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = await req.json();

  // Accept single {email, name} or array [{email, name}]
  const entries: { email: string; name?: string }[] = Array.isArray(body)
    ? body
    : [body];

  const insert = db.prepare(
    "INSERT OR IGNORE INTO contacts (email, name) VALUES (?, ?)"
  );

  const insertMany = db.transaction((rows: typeof entries) => {
    let added = 0;
    for (const row of rows) {
      const email = (row.email ?? "").trim().toLowerCase();
      if (!email || !email.includes("@")) continue;
      const info = insert.run(email, (row.name ?? "").trim());
      added += info.changes;
    }
    return added;
  });

  const added = insertMany(entries);
  return NextResponse.json({ added });
}

// DELETE /api/contacts — delete by id
export async function DELETE(req: NextRequest): Promise<NextResponse> {
  const { id } = await req.json();
  db.prepare("DELETE FROM contacts WHERE id = ?").run(id);
  return NextResponse.json({ success: true });
}
