import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

interface TemplateRow {
  id: number;
  name: string;
  subject: string;
  body: string;
  created_at: number;
  updated_at: number;
}

export async function GET(): Promise<NextResponse> {
  const result = await db.execute("SELECT * FROM email_templates ORDER BY updated_at DESC");
  return NextResponse.json(result.rows);
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { name, subject, body } = await req.json();
  if (!name?.trim() || !subject?.trim() || !body?.trim()) {
    return NextResponse.json({ error: "Name, subject and body required" }, { status: 400 });
  }
  const result = await db.execute({
    sql: "INSERT INTO email_templates (name, subject, body) VALUES (?, ?, ?)",
    args: [name.trim(), subject.trim(), body.trim()],
  });
  return NextResponse.json({ id: Number(result.lastInsertRowid) });
}

export async function PUT(req: NextRequest): Promise<NextResponse> {
  const { id, name, subject, body } = await req.json();
  await db.execute({
    sql: "UPDATE email_templates SET name=?, subject=?, body=?, updated_at=unixepoch() WHERE id=?",
    args: [name, subject, body, id],
  });
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  const { id } = await req.json();
  await db.execute({ sql: "DELETE FROM email_templates WHERE id=?", args: [id] });
  return NextResponse.json({ success: true });
}
