/* Does the new Turso database match a local .db file, row for row?
 *
 *   node --env-file=.env.local scripts/compare-to-file.mjs D:/portfolio/metro-associates.db
 *
 * Read-only on both sides. Counts every table in both, and checks the total
 * byte length of the images payload — the part most likely to be truncated by
 * a migration, since those rows are megabytes of base64 rather than short
 * strings. Exits non-zero on any mismatch so it can gate a cutover.
 */
import { createClient } from "@libsql/client/http";
import { DatabaseSync } from "node:sqlite";

const [file] = process.argv.slice(2);
if (!file) {
  console.error("Usage: node --env-file=.env.local scripts/compare-to-file.mjs <path-to.db>");
  process.exit(2);
}

const remote = createClient({
  url: process.env.NEW_TURSO_DATABASE_URL,
  authToken: process.env.NEW_TURSO_AUTH_TOKEN,
});
const local = new DatabaseSync(file, { readOnly: true });

const localTables = local
  .prepare(
    `SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name`,
  )
  .all()
  .map((r) => r.name);

const remoteTables = (
  await remote.execute(
    `SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name`,
  )
).rows.map((r) => String(r.name));

let bad = 0;

for (const t of new Set([...localTables, ...remoteTables])) {
  const inLocal = localTables.includes(t);
  const inRemote = remoteTables.includes(t);
  if (!inLocal || !inRemote) {
    console.log(`  ${t.padEnd(26)} MISSING from ${inLocal ? "remote" : "local file"}`);
    bad++;
    continue;
  }
  const l = Number(local.prepare(`SELECT COUNT(*) AS n FROM "${t}"`).get().n);
  const r = Number((await remote.execute(`SELECT COUNT(*) AS n FROM "${t}"`)).rows[0].n);
  const mark = l === r ? "ok" : "MISMATCH";
  if (l !== r) bad++;
  console.log(`  ${t.padEnd(26)} local ${String(l).padStart(6)}   remote ${String(r).padStart(6)}   ${mark}`);
}

/* The images table is the one a network migration mangles: 42 rows carrying
   ~80 MB of base64, several of them past 2 MB on their own. Equal row counts
   would not prove the payloads came across whole, so compare the bytes. */
if (localTables.includes("images") && remoteTables.includes("images")) {
  const l = Number(local.prepare(`SELECT SUM(LENGTH(data)) AS n FROM images`).get().n ?? 0);
  const r = Number((await remote.execute(`SELECT SUM(LENGTH(data)) AS n FROM images`)).rows[0].n ?? 0);
  const mark = l === r ? "ok" : "MISMATCH";
  if (l !== r) bad++;
  console.log(`\n  images payload bytes       local ${l}   remote ${r}   ${mark}`);
}

console.log(bad === 0 ? "\nIdentical — safe to cut over." : `\n${bad} problem(s) — do NOT cut over.`);
process.exitCode = bad === 0 ? 0 : 1;
