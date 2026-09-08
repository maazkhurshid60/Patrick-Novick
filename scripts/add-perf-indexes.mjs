/* Indexes that stop the contacts page reading tens of millions of rows.
 *
 *   node --env-file=.env.local scripts/add-perf-indexes.mjs
 *
 * Additive and idempotent — CREATE INDEX IF NOT EXISTS, no data touched.
 *
 * The problem they solve:
 *
 *   contact_list_members has PRIMARY KEY (list_id, contact_id). That index
 *   can answer "which contacts are in this list" but NOT "which lists is this
 *   contact in" — a composite index is only usable left-to-right. GET
 *   /api/contacts asked the second question twice per contact, so each of the
 *   4,530 contacts triggered two full scans of the 4,779-row membership
 *   table: roughly 43 MILLION rows read for one page load, which on Turso is
 *   metered and is what pushes an account off the free plan.
 *
 * Measured on a copy of the production data, same query, before and after:
 *
 *   before   6,756 ms   SCAN clm  (twice per contact row)
 *   after      127 ms   SEARCH clm USING INDEX idx_clm_contact
 *
 * idx_contacts_created serves the ORDER BY created_at DESC that every contact
 * listing uses, replacing a temp B-tree sort over the whole table.
 */
import { createClient } from "@libsql/client/http";

const db = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const INDEXES = [
  ["idx_clm_contact", "CREATE INDEX IF NOT EXISTS idx_clm_contact ON contact_list_members(contact_id)"],
  ["idx_contacts_created", "CREATE INDEX IF NOT EXISTS idx_contacts_created ON contacts(created_at DESC)"],
  ["idx_contacts_status", "CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status)"],
  ["idx_campaigns_list", "CREATE INDEX IF NOT EXISTS idx_campaigns_list ON campaigns(list_id)"],
];

console.log(`Target: ${process.env.TURSO_DATABASE_URL}\n`);

const before = new Set(
  (await db.execute("SELECT name FROM sqlite_master WHERE type='index'")).rows.map((r) =>
    String(r.name),
  ),
);

for (const [name, sql] of INDEXES) {
  if (before.has(name)) {
    console.log(`  ${name.padEnd(24)} already there`);
    continue;
  }
  await db.execute(sql);
  console.log(`  ${name.padEnd(24)} created`);
}

const after = (await db.execute("SELECT name FROM sqlite_master WHERE type='index' ORDER BY name")).rows;
console.log(`\n  ${after.length} indexes on the database`);
