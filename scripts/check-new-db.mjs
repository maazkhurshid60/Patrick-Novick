/* What is actually in NEW_TURSO_DATABASE_URL right now.
 *
 *   node --env-file=.env.local scripts/check-new-db.mjs
 *
 * Read-only. Run it before a restore to confirm the target is empty, and
 * after one to confirm every table arrived — comparing the counts it prints
 * against the source is the only thing that proves a migration worked.
 */
import { createClient } from "@libsql/client/http";

/* Defaults to the migration target. `--live` reads the variables the app
   itself uses, which is how you confirm a cutover actually took. */
const live = process.argv.includes("--live");
const prefix = live ? "" : "NEW_";
const url = process.env[`${prefix}TURSO_DATABASE_URL`];
const authToken = process.env[`${prefix}TURSO_AUTH_TOKEN`];
if (!url || !authToken) {
  console.error(`${prefix}TURSO_DATABASE_URL / ${prefix}TURSO_AUTH_TOKEN missing from .env.local`);
  process.exit(2);
}

const db = createClient({ url, authToken });
console.log(`${live ? "Live (app)" : "Target"}: ${url}\n`);

const tables = await db.execute(
  `SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name`,
);

if (tables.rows.length === 0) {
  console.log("  (no tables — database is empty)");
} else {
  let total = 0;
  for (const { name } of tables.rows) {
    const r = await db.execute(`SELECT COUNT(*) AS n FROM "${name}"`);
    const n = Number(r.rows[0].n);
    total += n;
    console.log(`  ${String(name).padEnd(26)} ${String(n).padStart(7)}`);
  }
  console.log(`\n  ${tables.rows.length} tables, ${total} rows`);
}
