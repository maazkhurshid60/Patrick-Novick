import { NextResponse } from "next/server";
import db from "@/lib/db";

// GET /api/export/contacts — download full contact list as CSV
// ?filter=removed  → only contacts in suppression_list with reason='removed'
// ?filter=all      → all contacts (default)
export async function GET(req: Request): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const filter = searchParams.get("filter") ?? "all";

  let rows: { name: string; email: string; title: string; company: string; status: string; tags: string; created_at: string }[];

  if (filter === "removed") {
    // Contacts removed via the Remove button — in suppression_list with reason='removed'
    // Also include any that still exist in contacts with unsubscribed/invalid status
    const result = await db.execute(`
      SELECT
        COALESCE(c.name, '') AS name,
        s.email,
        COALESCE(c.status, 'removed') AS status,
        COALESCE(c.title, '') AS title,
        COALESCE(c.company, '') AS company,
        s.reason,
        datetime(s.created_at, 'unixepoch') AS removed_at
      FROM suppression_list s
      LEFT JOIN contacts c ON c.email = s.email
      ORDER BY s.created_at DESC
    `);
    const date = new Date().toISOString().slice(0, 10);
    const lines = [
      "name,email,title,company,status,reason,removed_at",
      ...(result.rows as unknown as { name: string; email: string; title: string; company: string; status: string; reason: string; removed_at: string }[])
        .map((r) => `"${r.name}","${r.email}","${r.title}","${r.company}","${r.status}","${r.reason}","${r.removed_at}"`),
    ];
    return new NextResponse(lines.join("\r\n"), {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="removed-contacts-${date}.csv"`,
        "Cache-Control": "no-store",
      },
    });
  }

  // All contacts
  const result = await db.execute(`
    SELECT
      name,
      email,
      COALESCE(status, 'active') AS status,
      COALESCE(title, '') AS title,
      COALESCE(company, '') AS company,
      COALESCE(tags, '') AS tags,
      datetime(created_at, 'unixepoch') AS created_at
    FROM contacts
    ORDER BY created_at DESC
  `);
  rows = result.rows as unknown as typeof rows;

  const date = new Date().toISOString().slice(0, 10);
  const lines = [
    "name,email,title,company,status,tags,created_at",
    ...rows.map((r) => `"${r.name}","${r.email}","${r.title}","${r.company}","${r.status}","${r.tags}","${r.created_at}"`),
  ];

  return new NextResponse(lines.join("\r\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="all-contacts-${date}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
