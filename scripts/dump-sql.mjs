/* Full Turso/libSQL dump -> one restorable .sql file.
 *
 *   node --env-file=.env.local scripts/dump-sql.mjs
 *
 * Writes backups/dump-<timestamp>.sql containing every table, index, trigger
 * and view, plus an INSERT for every row. Restore with:
 *
 *   turso db shell <db> < backups/dump-<timestamp>.sql
 *
 * Companion to backup-db.mjs, which writes the same data as per-table JSON and
 * decodes the images table back into real image files. Keep both: the JSON is
 * for reading and grepping, this is for actually putting the database back.
 */
import { createClient } from "@libsql/client/http";
import { createWriteStream, mkdirSync } from "node:fs";
import { join } from "node:path";
import { once } from "node:events";

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;
if (!url) {
  console.error("TURSO_DATABASE_URL missing — run with --env-file=.env.local");
  process.exit(2);
}

const db = createClient({ url, authToken });
const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
const outDir = join(process.cwd(), "backups");
mkdirSync(outDir, { recursive: true });
const outFile = join(outDir, `dump-${stamp}.sql`);
const out = createWriteStream(outFile, { encoding: "utf8" });

/* Backpressure matters here: the images table alone is ~24 MB of base64, and
   writing it without waiting for drain balloons memory. */
async function write(chunk) {
  if (!out.write(chunk)) await once(out, "drain");
}

/** SQLite literal for any value libsql hands back. */
function lit(v) {
  if (v === null || v === undefined) return "NULL";
  if (typeof v === "number") return Number.isFinite(v) ? String(v) : "NULL";
  if (typeof v === "bigint") return String(v);
  if (typeof v === "boolean") return v ? "1" : "0";
  // Blobs come back as ArrayBuffer/typed array — X'..' keeps them exact.
  if (v instanceof ArrayBuffer || ArrayBuffer.isView(v)) {
    return `X'${Buffer.from(v instanceof ArrayBuffer ? v : v.buffer).toString("hex")}'`;
  }
  // '' doubles the quote — the only escape SQLite string literals need.
  return `'${String(v).replace(/'/g, "''")}'`;
}

const q = (name) => `"${String(name).replace(/"/g, '""')}"`;

/* Rows are pulled in pages. A single SELECT * over a multi-megabyte table is
   one enormous HTTP response, and the remote will cut it off long before it
   admits to a limit — which would produce a dump that looks complete and
   silently isn't. */
const PAGE = 500;

async function dumpTable(name) {
  const [{ rows: countRows }] = [await db.execute(`SELECT COUNT(*) AS n FROM ${q(name)}`)];
  const total = Number(countRows[0].n);

  await write(`\n-- ---------- table: ${name} ----------\n`);
  await write(`DROP TABLE IF EXISTS ${q(name)};\n`);
  await write(`${schemaSql.get(name)};\n`);

  let written = 0;
  for (let offset = 0; offset < total; offset += PAGE) {
    const { rows, columns } = await db.execute(
      `SELECT * FROM ${q(name)} LIMIT ${PAGE} OFFSET ${offset}`,
    );
    const cols = columns.map(q).join(", ");
    for (const row of rows) {
      const values = columns.map((c) => lit(row[c])).join(", ");
      await write(`INSERT INTO ${q(name)} (${cols}) VALUES (${values});\n`);
      written++;
    }
  }

  if (written !== total) {
    // Loud, because a short dump is the failure that hurts at restore time.
    throw new Error(`${name}: wrote ${written} rows but the table holds ${total}`);
  }
  console.log(`  OK  ${name.padEnd(22)} ${String(total).padStart(6)} rows`);
  return total;
}

// Everything the database knows about itself — no hardcoded table list.
const { rows: objects } = await db.execute(
  `SELECT type, name, tbl_name, sql FROM sqlite_master
    WHERE name NOT LIKE 'sqlite_%' AND sql IS NOT NULL
    ORDER BY CASE type WHEN 'table' THEN 0 WHEN 'index' THEN 1
                       WHEN 'view'  THEN 2 ELSE 3 END, name`,
);

const schemaSql = new Map(
  objects.filter((o) => o.type === "table").map((o) => [String(o.name), String(o.sql)]),
);
const tables = [...schemaSql.keys()];
const extras = objects.filter((o) => o.type !== "table");

console.log(`\n  ${tables.length} tables, ${extras.length} indexes/triggers/views\n`);

await write(`-- Turso/libSQL dump\n`);
await write(`-- database: ${url}\n`);
await write(`-- created:  ${new Date().toISOString()}\n`);
await write(`PRAGMA foreign_keys=OFF;\nBEGIN TRANSACTION;\n`);

let totalRows = 0;
for (const name of tables) totalRows += await dumpTable(name);

if (extras.length) {
  await write(`\n-- ---------- indexes, triggers, views ----------\n`);
  for (const o of extras) {
    await write(`-- ${o.type}: ${o.name} (on ${o.tbl_name})\n${o.sql};\n`);
    console.log(`  OK  ${String(o.name).padEnd(22)} ${o.type}`);
  }
}

/* AUTOINCREMENT counters. Without these a restored database reissues ids that
   were already used, so new rows collide with anything referencing the old
   ones — campaign_recipients points at campaigns.id by number. */
const { rows: seqs } = await db.execute(
  `SELECT name, seq FROM sqlite_sequence`,
).catch(() => ({ rows: [] }));
if (seqs.length) {
  await write(`\n-- ---------- AUTOINCREMENT counters ----------\n`);
  await write(`DELETE FROM sqlite_sequence;\n`);
  for (const s of seqs) {
    await write(`INSERT INTO sqlite_sequence (name, seq) VALUES (${lit(s.name)}, ${lit(s.seq)});\n`);
  }
  console.log(`  OK  ${"sqlite_sequence".padEnd(22)} ${seqs.length} counters`);
}

await write(`\nCOMMIT;\n`);
out.end();
await once(out, "finish");

console.log(`\n  Done. ${totalRows} rows across ${tables.length} tables`);
console.log(`  -> ${outFile}`);
