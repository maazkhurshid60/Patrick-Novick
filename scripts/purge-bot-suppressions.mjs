// One-off cleanup for bot-injected junk in suppression_list.
//
// Deletes suppression rows for addresses that were NEVER real recipients — i.e.
// not present in `contacts` and not in `campaign_recipients`. Genuine
// unsubscribes/bounces (which always correspond to a real contact or a sent
// email) are left untouched.
//
// Dry-run first (prints what WOULD be deleted):
//   node --env-file=.env.local scripts/purge-bot-suppressions.mjs
// Actually delete:
//   node --env-file=.env.local scripts/purge-bot-suppressions.mjs --apply
import { createClient } from "@libsql/client/http";

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;
if (!url) { console.error("TURSO_DATABASE_URL missing"); process.exit(2); }

const apply = process.argv.includes("--apply");
const db = createClient({ url, authToken });

// Suppressed addresses that are not a contact and were never sent a campaign.
const orphanSql = `
  SELECT s.email, s.reason
  FROM suppression_list s
  WHERE NOT EXISTS (SELECT 1 FROM contacts c WHERE c.email = s.email)
    AND NOT EXISTS (SELECT 1 FROM campaign_recipients r WHERE r.email = s.email)
  ORDER BY s.email
`;

const orphans = await db.execute(orphanSql);
console.log(`Found ${orphans.rows.length} suppression rows with no matching contact or sent email.`);
for (const r of orphans.rows.slice(0, 50)) console.log(`  ${r.email}  (${r.reason})`);
if (orphans.rows.length > 50) console.log(`  … and ${orphans.rows.length - 50} more`);

if (!apply) {
  console.log("\nDry run — nothing deleted. Re-run with --apply to delete these rows.");
  process.exit(0);
}

const del = await db.execute({
  sql: `DELETE FROM suppression_list
        WHERE NOT EXISTS (SELECT 1 FROM contacts c WHERE c.email = suppression_list.email)
          AND NOT EXISTS (SELECT 1 FROM campaign_recipients r WHERE r.email = suppression_list.email)`,
  args: [],
});
console.log(`\nDeleted ${del.rowsAffected} orphan suppression rows.`);
