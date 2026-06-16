import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

// GET /api/contacts — list all contacts with sent campaign count
export async function GET(): Promise<NextResponse> {
  const result = await db.execute(`
    SELECT c.*,
      (SELECT COUNT(DISTINCT campaign_id) FROM campaign_recipients WHERE email = c.email) AS campaigns_sent
    FROM contacts c
    ORDER BY c.created_at DESC
  `);
  return NextResponse.json(result.rows);
}

// POST /api/contacts — add one or multiple contacts (skips suppressed emails)
export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = await req.json();
  const entries: { email: string; name?: string }[] = Array.isArray(body) ? body : [body];

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

// PATCH /api/contacts — update name, email, and/or status
export async function PATCH(req: NextRequest): Promise<NextResponse> {
  const body = await req.json() as { id: number; status?: string; name?: string; email?: string };
  const { id, status, name, email } = body;

  // Handle name and/or email correction
  if (name !== undefined || email !== undefined) {
    const updates: string[] = [];
    const args: (string | number)[] = [];

    if (name !== undefined) {
      updates.push("name = ?");
      args.push(name.trim());
    }
    if (email !== undefined) {
      const normalized = email.trim().toLowerCase();
      // Check uniqueness against other contacts
      const conflict = await db.execute({
        sql: "SELECT id FROM contacts WHERE email = ? AND id != ?",
        args: [normalized, id],
      });
      if (conflict.rows.length > 0) {
        return NextResponse.json({ error: "Email already in use by another contact" }, { status: 409 });
      }
      updates.push("email = ?");
      args.push(normalized);
    }

    if (updates.length > 0) {
      args.push(id);
      await db.execute({ sql: `UPDATE contacts SET ${updates.join(", ")} WHERE id = ?`, args });
    }
  }

  // Handle status change
  if (status !== undefined) {
    if (!["active", "unsubscribed", "invalid"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }
    await db.execute({ sql: "UPDATE contacts SET status = ? WHERE id = ?", args: [status, id] });

    const emailResult = await db.execute({ sql: "SELECT email FROM contacts WHERE id = ?", args: [id] });
    const contactEmail = emailResult.rows[0]?.email as string | undefined;
    if (contactEmail) {
      if (status === "unsubscribed") {
        await db.execute({
          sql: "INSERT OR IGNORE INTO suppression_list (email, reason) VALUES (?, 'unsubscribed')",
          args: [contactEmail],
        });
      } else if (status === "active") {
        await db.execute({ sql: "DELETE FROM suppression_list WHERE email = ?", args: [contactEmail] });
      }
    }
  }

  return NextResponse.json({ success: true });
}

// DELETE /api/contacts — delete by id and add to suppression list
export async function DELETE(req: NextRequest): Promise<NextResponse> {
  const { id } = await req.json() as { id: number };

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
