import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { csvRow } from "@/lib/csv";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// Column order for the bounce export. `id` is a stable key so a re-upload can
// match the right contact even if the email itself was corrected. `bounce_reason`
// is informational only (not applied on re-import).
const FIELDS = [
  "id", "email", "name", "first_name", "last_name", "title", "company",
  "business_email", "email_2", "personal_email_2",
  "phone", "work_phone_2", "phone_2", "mobile_phone_2",
  "linkedin", "website",
  "street_address", "city", "state", "zip_code", "county", "region", "country",
  "status", "bounce_reason",
];

// GET /api/export/bounced — every bounced/invalid address joined to its full
// contact record. ?format=json for the Excel builder; otherwise CSV download.
export async function GET(req: NextRequest): Promise<NextResponse> {
  const result = await db.execute(`
    SELECT c.id,
           s.email AS email,
           c.name, c.first_name, c.last_name, c.title, c.company,
           c.business_email, c.email_2, c.personal_email_2,
           c.phone, c.work_phone_2, c.phone_2, c.mobile_phone_2,
           c.linkedin, c.website,
           c.street_address, c.city, c.state, c.zip_code, c.county, c.region, c.country,
           c.status,
           s.reason AS bounce_reason
    FROM suppression_list s
    LEFT JOIN contacts c ON LOWER(c.email) = LOWER(s.email)
    WHERE s.reason IN ('bounced', 'invalid') OR s.reason LIKE '%bounce%'
    ORDER BY s.created_at DESC
  `);

  const data = result.rows.map((r) => {
    const o: Record<string, string> = {};
    for (const f of FIELDS) o[f] = r[f] == null ? "" : String(r[f]);
    return o;
  });

  if (req.nextUrl.searchParams.get("format") === "json") {
    return NextResponse.json(data);
  }

  const lines = [FIELDS.join(","), ...data.map((o) => csvRow(FIELDS.map((f) => o[f])))];
  const date = new Date().toISOString().slice(0, 10);
  return new NextResponse(lines.join("\r\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="bounced-contacts-${date}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
