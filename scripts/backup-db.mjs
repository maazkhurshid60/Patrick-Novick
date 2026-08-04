// Full Turso backup: dumps every table to JSON and decodes the `images` table
// back into real image files. Run AFTER reads are unblocked:
//   node --env-file=.env.local scripts/backup-db.mjs
import { createClient } from "@libsql/client/http";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;
if (!url) { console.error("TURSO_DATABASE_URL missing"); process.exit(2); }

const db = createClient({ url, authToken });
const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
const outDir = join(process.cwd(), "backups", stamp);
const imgDir = join(outDir, "images");
mkdirSync(imgDir, { recursive: true });

const extFromMime = (m = "") =>
  ({ "image/png": "png", "image/jpeg": "jpg", "image/jpg": "jpg", "image/gif": "gif",
     "image/webp": "webp", "image/svg+xml": "svg" }[m.toLowerCase()] || "bin");

/* Tables are discovered from the database, not listed here.

   This used to be a hardcoded array, and it had already drifted: it was written
   before `scheduled_campaigns` existed, so every backup taken since silently
   omitted that table and still printed "Done". A backup that quietly skips data
   is worse than one that fails, because you only find out when you restore.

   sqlite_sequence is SQLite's own AUTOINCREMENT bookkeeping — it is rebuilt
   from the data, so there is nothing to preserve. */
const { rows: tableRows } = await db.execute(
  `SELECT name FROM sqlite_master
    WHERE type = 'table' AND name NOT LIKE 'sqlite_%'
    ORDER BY name`,
);
const TABLES = tableRows.map((r) => String(r.name));
console.log(`Found ${TABLES.length} tables\n`);

let totalRows = 0;
for (const t of TABLES) {
  try {
    const r = await db.execute(`SELECT * FROM ${t}`);
    writeFileSync(join(outDir, `${t}.json`), JSON.stringify(r.rows, null, 2));
    totalRows += r.rows.length;
    console.log(`OK  ${t.padEnd(22)} ${r.rows.length} rows`);

    if (t === "images") {
      let n = 0;
      for (const row of r.rows) {
        try {
          const buf = Buffer.from(String(row.data), "base64");
          const name = `${row.id}-${String(row.name || "image").replace(/[^a-zA-Z0-9._-]/g, "_")}.${extFromMime(row.mime)}`;
          writeFileSync(join(imgDir, name), buf);
          n++;
        } catch (e) { console.error(`  ! image id=${row.id}: ${e.message}`); }
      }
      console.log(`    -> wrote ${n} image files to images/`);
    }
  } catch (e) {
    console.error(`ERR ${t.padEnd(22)} ${e.code || ""} ${e.message}`);
  }
}
/* The CREATE statements, so this folder can rebuild the database on its own.
   Row JSON alone isn't a backup you can restore from — it says nothing about
   indexes, defaults or column types. */
const { rows: ddl } = await db.execute(
  `SELECT type, name, sql FROM sqlite_master
    WHERE sql IS NOT NULL AND name NOT LIKE 'sqlite_%'
    ORDER BY CASE type WHEN 'table' THEN 0 ELSE 1 END, name`,
);
writeFileSync(
  join(outDir, "schema.sql"),
  ddl.map((r) => `-- ${r.type}: ${r.name}\n${r.sql};\n`).join("\n"),
);
console.log(`OK  ${"schema.sql".padEnd(22)} ${ddl.length} objects`);

console.log(`\nDone. ${totalRows} total rows -> ${outDir}`);
