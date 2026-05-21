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
  const templates = db.prepare("SELECT * FROM email_templates ORDER BY updated_at DESC").all() as TemplateRow[];
  return NextResponse.json(templates);
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { name, subject, body } = await req.json();
  if (!name?.trim() || !subject?.trim() || !body?.trim()) {
    return NextResponse.json({ error: "Name, subject and body required" }, { status: 400 });
  }
  const result = db.prepare(
    "INSERT INTO email_templates (name, subject, body) VALUES (?, ?, ?)"
  ).run(name.trim(), subject.trim(), body.trim());
  return NextResponse.json({ id: result.lastInsertRowid });
}

export async function PUT(req: NextRequest): Promise<NextResponse> {
  const { id, name, subject, body } = await req.json();
  db.prepare(
    "UPDATE email_templates SET name=?, subject=?, body=?, updated_at=unixepoch() WHERE id=?"
  ).run(name, subject, body, id);
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  const { id } = await req.json();
  db.prepare("DELETE FROM email_templates WHERE id=?").run(id);
  return NextResponse.json({ success: true });
}
