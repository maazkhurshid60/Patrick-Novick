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

// Every table the app creates (see lib/db.ts).
const TABLES = [
  "contacts", "campaigns", "campaign_recipients", "email_templates",
  "contact_lists", "contact_list_members", "suppression_list",
  "email_opens", "email_send_log", "images", "admin_users", "te_connections",
];

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
console.log(`\nDone. ${totalRows} total rows -> ${outDir}`);
