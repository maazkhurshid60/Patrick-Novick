import { NextResponse } from "next/server";
import db from "@/lib/db";
import { csvRow } from "@/lib/csv";

// GET /api/export/contacts — download full contact list as CSV
// ?filter=removed  → only contacts in suppression_list with reason='removed'
// ?filter=all      → all contacts (default)
// ?list=<id>       → only contacts that belong to the given contact list
export async function GET(req: Request): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const filter = searchParams.get("filter") ?? "all";
  const listId = searchParams.get("list");

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
        .map((r) => csvRow([r.name, r.email, r.title, r.company, r.status, r.reason, r.removed_at])),
    ];
    return new NextResponse(lines.join("\r\n"), {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="removed-contacts-${date}.csv"`,
        "Cache-Control": "no-store",
      },
    });
  }

  // All contacts, optionally scoped to a single list via ?list=<id>
  let scopeLabel = "all"; // used for the download filename

  if (listId && /^\d+$/.test(listId)) {
    const nameRes = await db.execute({ sql: "SELECT name FROM contact_lists WHERE id = ?", args: [Number(listId)] });
    const listName = (nameRes.rows[0]?.name as string | undefined) ?? `list-${listId}`;
    // Slugify the list name for the filename (fall back to list-<id>)
    scopeLabel = listName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || `list-${listId}`;

    const result = await db.execute({
      sql: `
        SELECT
          c.name,
          c.email,
          COALESCE(c.status, 'active') AS status,
          COALESCE(c.title, '') AS title,
          COALESCE(c.company, '') AS company,
          COALESCE(c.tags, '') AS tags,
          datetime(c.created_at, 'unixepoch') AS created_at
        FROM contacts c
        JOIN contact_list_members clm ON clm.contact_id = c.id
        WHERE clm.list_id = ?
        ORDER BY c.created_at DESC
      `,
      args: [Number(listId)],
    });
    rows = result.rows as unknown as typeof rows;
  } else {
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
  }

  const date = new Date().toISOString().slice(0, 10);
  const lines = [
    "name,email,title,company,status,tags,created_at",
    ...rows.map((r) => csvRow([r.name, r.email, r.title, r.company, r.status, r.tags, r.created_at])),
  ];

  return new NextResponse(lines.join("\r\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${scopeLabel}-contacts-${date}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
