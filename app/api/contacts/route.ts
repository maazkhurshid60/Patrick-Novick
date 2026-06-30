import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// A real single email address — no spaces/tabs, exactly one @, and a dotted domain.
// Rejects whole spreadsheet rows accidentally pasted into the email field.
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


// GET /api/contacts — list all contacts with sent campaign count
export async function GET(): Promise<NextResponse> {
  const result = await db.execute(`
    SELECT c.*,
      (SELECT COUNT(DISTINCT campaign_id) FROM campaign_recipients WHERE email = c.email) AS campaigns_sent,
      (SELECT GROUP_CONCAT(cl.name, ', ')
       FROM contact_list_members clm
       JOIN contact_lists cl ON clm.list_id = cl.id
       WHERE clm.contact_id = c.id) AS lists
    FROM contacts c
    ORDER BY c.created_at DESC
  `);
  return NextResponse.json(result.rows);
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = await req.json();
  let entries: {
    email: string;
    name?: string;
    first_name?: string;
    last_name?: string;
    title?: string;
    company?: string;
    phone?: string;
    phone_2?: string;
    street_address?: string;
    city?: string;
    state?: string;
    zip_code?: string;
    country?: string;
    notes?: string;
    segments?: string;
    custom_fields?: string;
    business_email?: string;
    email_2?: string;
    personal_email_2?: string;
    work_phone_2?: string;
    mobile_phone_2?: string;
    linkedin?: string;
    website?: string;
    county?: string;
    region?: string;
  }[];
  let listId: number | null = null;
  let newListName: string | null = null;

  if (body && !Array.isArray(body) && Array.isArray(body.contacts)) {
    entries = body.contacts;
    listId = body.listId ?? null;
    newListName = body.newListName ?? null;
  } else {
    entries = Array.isArray(body) ? body : [body];
  }

  // Create list if newListName is provided
  if (newListName && newListName.trim()) {
    try {
      const listNameClean = newListName.trim();
      await db.execute({
        sql: "INSERT OR IGNORE INTO contact_lists (name) VALUES (?)",
        args: [listNameClean],
      });
      const listFetch = await db.execute({
        sql: "SELECT id FROM contact_lists WHERE name = ?",
        args: [listNameClean],
      });
      if (listFetch.rows[0]) {
        listId = Number(listFetch.rows[0].id);
      }
    } catch (err) {
      console.error("Failed to create list: ", err);
    }
  }

  const suppressedResult = await db.execute("SELECT email FROM suppression_list");
  const suppressed = new Set(suppressedResult.rows.map((r) => (r.email as string).toLowerCase()));

  const existingResult = await db.execute("SELECT email FROM contacts");
  const existing = new Set(existingResult.rows.map((r) => (r.email as string).toLowerCase()));

  let added = 0;
  let updated = 0;
  let skipped = 0;
  let invalid = 0;
  for (const row of entries) {
    const email = (row.email ?? "").trim().toLowerCase();
    if (!isValidEmail(email)) { invalid++; continue; }
    if (suppressed.has(email)) { skipped++; continue; }
    const wasExisting = existing.has(email);

    // Resolve first/last from split fields or from full name fallback
    const firstName = (row.first_name ?? "").trim();
    const lastName  = (row.last_name  ?? "").trim();
    let fullName = (row.name ?? "").trim();
    if (!fullName && (firstName || lastName)) {
      fullName = [firstName, lastName].filter(Boolean).join(" ");
    }
    // Auto-split full name if first/last not provided
    const derivedFirst = firstName || (fullName.split(" ")[0] ?? "");
    const derivedLast  = lastName  || (fullName.split(" ").slice(1).join(" ") ?? "");

    // Upsert: insert new contacts, and for existing ones (matched by email) fill
    // in / refresh fields — the incoming value wins when it's non-empty, otherwise
    // the existing value is kept (so we never blank out data already on file).
    // status, custom_fields, country and created_at are intentionally left as-is.
    await db.execute({
      sql: `INSERT INTO contacts
        (email, name, first_name, last_name, title, company,
         phone, phone_2, street_address, city, state, zip_code, country,
         notes, segments, custom_fields,
         business_email, email_2, linkedin, website, county, region,
         work_phone_2, mobile_phone_2, personal_email_2)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(email) DO UPDATE SET
          name           = COALESCE(NULLIF(TRIM(excluded.name),''),           contacts.name),
          first_name     = COALESCE(NULLIF(TRIM(excluded.first_name),''),     contacts.first_name),
          last_name      = COALESCE(NULLIF(TRIM(excluded.last_name),''),      contacts.last_name),
          title          = COALESCE(NULLIF(TRIM(excluded.title),''),          contacts.title),
          company        = COALESCE(NULLIF(TRIM(excluded.company),''),        contacts.company),
          phone          = COALESCE(NULLIF(TRIM(excluded.phone),''),          contacts.phone),
          phone_2        = COALESCE(NULLIF(TRIM(excluded.phone_2),''),        contacts.phone_2),
          street_address = COALESCE(NULLIF(TRIM(excluded.street_address),''), contacts.street_address),
          city           = COALESCE(NULLIF(TRIM(excluded.city),''),           contacts.city),
          state          = COALESCE(NULLIF(TRIM(excluded.state),''),          contacts.state),
          zip_code       = COALESCE(NULLIF(TRIM(excluded.zip_code),''),       contacts.zip_code),
          notes          = COALESCE(NULLIF(TRIM(excluded.notes),''),          contacts.notes),
          segments       = COALESCE(NULLIF(TRIM(excluded.segments),''),       contacts.segments),
          business_email = COALESCE(NULLIF(TRIM(excluded.business_email),''), contacts.business_email),
          email_2        = COALESCE(NULLIF(TRIM(excluded.email_2),''),        contacts.email_2),
          linkedin       = COALESCE(NULLIF(TRIM(excluded.linkedin),''),       contacts.linkedin),
          website        = COALESCE(NULLIF(TRIM(excluded.website),''),        contacts.website),
          county         = COALESCE(NULLIF(TRIM(excluded.county),''),         contacts.county),
          region         = COALESCE(NULLIF(TRIM(excluded.region),''),         contacts.region),
          work_phone_2     = COALESCE(NULLIF(TRIM(excluded.work_phone_2),''),     contacts.work_phone_2),
          mobile_phone_2   = COALESCE(NULLIF(TRIM(excluded.mobile_phone_2),''),   contacts.mobile_phone_2),
          personal_email_2 = COALESCE(NULLIF(TRIM(excluded.personal_email_2),''), contacts.personal_email_2)`,
      args: [
        email,
        fullName || derivedFirst + (derivedLast ? " " + derivedLast : ""),
        derivedFirst,
        derivedLast,
        (row.title ?? "").trim(),
        (row.company ?? "").trim(),
        (row.phone ?? "").trim(),
        (row.phone_2 ?? "").trim(),
        (row.street_address ?? "").trim(),
        (row.city ?? "").trim(),
        (row.state ?? "").trim(),
        (row.zip_code ?? "").trim(),
        (row.country ?? "US").trim(),
        (row.notes ?? "").trim(),
        (row.segments ?? "").trim(),
        (row.custom_fields ?? "{}").trim(),
        (row.business_email ?? "").trim(),
        (row.email_2 ?? "").trim(),
        (row.linkedin ?? "").trim(),
        (row.website ?? "").trim(),
        (row.county ?? "").trim(),
        (row.region ?? "").trim(),
        (row.work_phone_2 ?? "").trim(),
        (row.mobile_phone_2 ?? "").trim(),
        (row.personal_email_2 ?? "").trim(),
      ],
    });
    if (wasExisting) { updated++; } else { added++; existing.add(email); }

    // Link contact to list if listId is set
    if (listId) {
      try {
        const contactFetch = await db.execute({
          sql: "SELECT id FROM contacts WHERE email = ?",
          args: [email],
        });
        const contactId = contactFetch.rows[0]?.id;
        if (contactId) {
          await db.execute({
            sql: "INSERT OR IGNORE INTO contact_list_members (list_id, contact_id) VALUES (?, ?)",
            args: [listId, Number(contactId)],
          });
        }
      } catch (err) {
        console.error("Failed to associate contact with list:", err);
      }
    }
  }

  return NextResponse.json({ added, updated, skipped, invalid });
}

// PATCH /api/contacts — update any contact field
export async function PATCH(req: NextRequest): Promise<NextResponse> {
  const body = await req.json() as {
    id: number;
    status?: string;
    name?: string;
    email?: string;
    first_name?: string;
    last_name?: string;
    title?: string;
    company?: string;
    phone?: string;
    phone_2?: string;
    street_address?: string;
    city?: string;
    state?: string;
    zip_code?: string;
    country?: string;
    notes?: string;
    segments?: string;
    custom_fields?: string;
    business_email?: string;
    email_2?: string;
    personal_email_2?: string;
    work_phone_2?: string;
    mobile_phone_2?: string;
    linkedin?: string;
    website?: string;
    county?: string;
    region?: string;
  };
  const { id, status, ...fields } = body;

  const scalarFields = [
    "name", "email", "first_name", "last_name", "title", "company",
    "phone", "phone_2", "street_address", "city", "state", "zip_code",
    "country", "notes", "segments", "custom_fields",
    "business_email", "email_2", "linkedin", "website", "county", "region",
    "work_phone_2", "mobile_phone_2", "personal_email_2",
  ] as const;

  const updates: string[] = [];
  const args: (string | number)[] = [];

  for (const key of scalarFields) {
    const val = (fields as Record<string, string | undefined>)[key];
    if (val === undefined) continue;

    if (key === "email") {
      const normalized = val.trim().toLowerCase();
      const conflict = await db.execute({
        sql: "SELECT id FROM contacts WHERE email = ? AND id != ?",
        args: [normalized, id],
      });
      if (conflict.rows.length > 0) {
        return NextResponse.json({ error: "Email already in use by another contact" }, { status: 409 });
      }
      updates.push("email = ?");
      args.push(normalized);
    } else {
      updates.push(`${key} = ?`);
      args.push(val.trim());
    }
  }

  // Keep name in sync when first/last change
  const hasFirst = fields.first_name !== undefined;
  const hasLast  = fields.last_name  !== undefined;
  if ((hasFirst || hasLast) && fields.name === undefined) {
    // Fetch current values to compute full name
    const cur = await db.execute({ sql: "SELECT first_name, last_name FROM contacts WHERE id = ?", args: [id] });
    if (cur.rows[0]) {
      const fn = (fields.first_name ?? cur.rows[0].first_name ?? "") as string;
      const ln = (fields.last_name  ?? cur.rows[0].last_name  ?? "") as string;
      updates.push("name = ?");
      args.push([fn, ln].filter(Boolean).join(" "));
    }
  }

  if (updates.length > 0) {
    args.push(id);
    await db.execute({ sql: `UPDATE contacts SET ${updates.join(", ")} WHERE id = ?`, args });
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

// DELETE /api/contacts — delete a contact by id.
// By default this only deletes; it does NOT suppress (so routine cleanups don't
// pollute the opt-out list or silently block re-importing the same person).
// Pass { suppress: true } to also block the email from future imports/sends.
export async function DELETE(req: NextRequest): Promise<NextResponse> {
  const { id, suppress } = await req.json() as { id: number; suppress?: boolean };

  const emailResult = await db.execute({ sql: "SELECT email FROM contacts WHERE id = ?", args: [id] });
  const email = emailResult.rows[0]?.email as string | undefined;

  await db.execute({ sql: "DELETE FROM contacts WHERE id = ?", args: [id] });

  if (suppress && email) {
    await db.execute({
      sql: "INSERT OR IGNORE INTO suppression_list (email, reason) VALUES (?, 'removed')",
      args: [email],
    });
  }

  return NextResponse.json({ success: true });
}
