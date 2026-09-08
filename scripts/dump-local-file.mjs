/* Turn a local SQLite file into replayable .sql, for restoring into Turso.
 *
 *   node scripts/dump-local-file.mjs D:/portfolio/metro-associates.db
 *
 * Companion to dump-sql.mjs, which dumps the live Turso database. This one
 * reads a local file instead — the case where the newest copy of the data is
 * a .db on disk rather than the database the app is pointed at.
 *
 * It writes TWO files on purpose:
 *
 *   ...-core.sql    every table except `images`
 *   ...-images.sql  `images` only
 *
 * because `images.data` holds base64, not raw bytes, and the biggest rows are
 * over 3 MB each — larger than the HTTP API will accept in one statement. The
 * core file restores cleanly over the network; the images need either the
 * Turso CLI's file import or re-uploading through the app. Splitting them
 * means a failure on an image can't leave the contact and campaign tables
 * half-written.
 *
 * Output goes to backups/ next to the other dumps.
 */
import { DatabaseSync } from "node:sqlite";
import { writeFileSync, mkdirSync } from "node:fs";
import { basename } from "node:path";

const [file] = process.argv.slice(2);
if (!file) {
  console.error("Usage: node scripts/dump-local-file.mjs <path-to.db>");
  process.exit(2);
}

const db = new DatabaseSync(file, { readOnly: true });

const objects = db
  .prepare(
    `SELECT type, name, tbl_name, sql FROM sqlite_master
      WHERE sql IS NOT NULL AND name NOT LIKE 'sqlite_%'
      ORDER BY CASE type WHEN 'table' THEN 0 WHEN 'index' THEN 1 ELSE 2 END, name`,
  )
  .all();

/** SQLite literal for one value. Blobs become X'..'; everything else quotes. */
function lit(v) {
  if (v === null || v === undefined) return "NULL";
  if (typeof v === "number") return String(v);
  if (typeof v === "bigint") return v.toString();
  if (v instanceof Uint8Array) {
    return "X'" + Buffer.from(v).toString("hex") + "'";
  }
  return "'" + String(v).replace(/'/g, "''") + "'";
}

function dumpTable(name) {
  const cols = db.prepare(`PRAGMA table_info("${name}")`).all().map((c) => c.name);
  const rows = db.prepare(`SELECT * FROM "${name}"`).all();
  const out = [];
  for (const r of rows) {
    const values = cols.map((c) => lit(r[c])).join(",");
    out.push(`INSERT INTO "${name}" (${cols.map((c) => `"${c}"`).join(",")}) VALUES (${values});`);
  }
  return { sql: out.join("\n"), count: rows.length };
}

const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
mkdirSync("backups", { recursive: true });

const core = [];
const images = [];
const counts = [];

for (const o of objects) {
  const target = o.tbl_name === "images" ? images : core;
  if (o.type === "table") {
    target.push(`DROP TABLE IF EXISTS "${o.name}";`);
    target.push(`${o.sql};`);
    const { sql, count } = dumpTable(o.name);
    if (sql) target.push(sql);
    counts.push([o.name, count]);
  } else {
    target.push(`${o.sql};`);
  }
}

const base = `backups/local-${basename(file, ".db")}-${stamp}`;
writeFileSync(`${base}-core.sql`, core.join("\n") + "\n", "utf8");
writeFileSync(`${base}-images.sql`, images.join("\n") + "\n", "utf8");

for (const [name, n] of counts.sort((a, b) => b[1] - a[1])) {
  console.log(`  ${name.padEnd(26)} ${String(n).padStart(6)} rows`);
}
console.log(`\n  ${base}-core.sql`);
console.log(`  ${base}-images.sql`);
