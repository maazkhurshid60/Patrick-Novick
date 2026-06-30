import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// GET /api/contacts/bounced — addresses that bounced/were blocked/invalid,
// joined to the contact record so we can show who they are and fix the email.
export async function GET(): Promise<NextResponse> {
  try {
    const result = await db.execute(`
      SELECT s.email, s.reason, s.created_at,
             c.id AS contact_id, c.name, c.company, c.title, c.status
      FROM suppression_list s
      LEFT JOIN contacts c ON LOWER(c.email) = LOWER(s.email)
      WHERE s.reason IN ('bounced', 'invalid') OR s.reason LIKE '%bounce%'
      ORDER BY s.created_at DESC
    `);
    const rows = result.rows.map((r) => ({
      email: r.email,
      reason: r.reason,
      created_at: Number(r.created_at),
      contact_id: r.contact_id != null ? Number(r.contact_id) : null,
      name: r.name ?? null,
      company: r.company ?? null,
      title: r.title ?? null,
      status: r.status ?? null,
    }));
    return NextResponse.json(rows);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Failed to fetch bounced contacts";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// PATCH /api/contacts/bounced — correct a wrong email and release it back to sendable.
// Updates the contact's email to the new address, removes the old (bad) address
// from the suppression list, and reactivates the contact.
export async function PATCH(req: NextRequest): Promise<NextResponse> {
  try {
    const { oldEmail, newEmail } = await req.json() as { oldEmail?: string; newEmail?: string };
    const oldClean = (oldEmail ?? "").trim().toLowerCase();
    const newClean = (newEmail ?? "").trim().toLowerCase();

    if (!oldClean) {
      return NextResponse.json({ error: "Original email is required" }, { status: 400 });
    }
    if (!isValidEmail(newClean)) {
      return NextResponse.json({ error: "Please enter a valid new email address" }, { status: 400 });
    }
    if (oldClean === newClean) {
      return NextResponse.json({ error: "The new email is the same as the old one" }, { status: 400 });
    }

    // Don't let the new address collide with a different existing contact
    const collision = await db.execute({
      sql: "SELECT id FROM contacts WHERE LOWER(email) = ? LIMIT 1",
      args: [newClean],
    });
    if (collision.rows.length > 0) {
      return NextResponse.json(
        { error: `Another contact already uses ${newClean}` },
        { status: 409 }
      );
    }

    await db.batch([
      // Point the contact at the corrected address and reactivate them
      { sql: "UPDATE contacts SET email = ?, status = 'active' WHERE LOWER(email) = ?", args: [newClean, oldClean] },
      // Remove the bad address from suppression so it stops blocking sends
      { sql: "DELETE FROM suppression_list WHERE LOWER(email) = ?", args: [oldClean] },
      // If the corrected address was itself suppressed before, clear it too so we can send
      { sql: "DELETE FROM suppression_list WHERE LOWER(email) = ?", args: [newClean] },
    ], "write");

    return NextResponse.json({ success: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Failed to update email";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// DELETE /api/contacts/bounced — release as-is (remove from suppression, reactivate)
// without changing the email. Use when you believe the bounce was temporary.
export async function DELETE(req: NextRequest): Promise<NextResponse> {
  try {
    const { email } = await req.json() as { email?: string };
    const clean = (email ?? "").trim().toLowerCase();
    if (!clean || !clean.includes("@")) {
      return NextResponse.json({ error: "A valid email address is required" }, { status: 400 });
    }
    await db.batch([
      { sql: "DELETE FROM suppression_list WHERE LOWER(email) = ?", args: [clean] },
      { sql: "UPDATE contacts SET status = 'active' WHERE LOWER(email) = ?", args: [clean] },
    ], "write");
    return NextResponse.json({ success: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Failed to release contact";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
