/* Replay a .sql dump (from scripts/dump-sql.mjs) into a NEW, empty Turso/libSQL
 * database over the network. Does not touch the source database at all.
 *
 *   node --env-file=.env.local scripts/restore-to-new.mjs backups/dump-<stamp>.sql
 *
 * Reads the target from NEW_TURSO_DATABASE_URL / NEW_TURSO_AUTH_TOKEN (add
 * these to .env.local — separate names from TURSO_DATABASE_URL/TURSO_AUTH_TOKEN
 * on purpose, so the source and destination can never be confused).
 *
 * The target database must be empty (or at least not already have these
 * tables) — every dump starts each table with `DROP TABLE IF EXISTS`, so this
 * WILL destroy same-named tables at the target. That's fine for a fresh
 * database, not fine for one already holding data you want to keep.
 */
import { createClient } from "@libsql/client/http";
import { readFileSync } from "node:fs";

const [sqlFile] = process.argv.slice(2);
if (!sqlFile) {
  console.error("Usage: node --env-file=.env.local scripts/restore-to-new.mjs <dump.sql>");
  process.exit(2);
}

const url = process.env.NEW_TURSO_DATABASE_URL;
const authToken = process.env.NEW_TURSO_AUTH_TOKEN;
if (!url) {
  console.error("NEW_TURSO_DATABASE_URL missing — add it (and NEW_TURSO_AUTH_TOKEN) to .env.local");
  process.exit(2);
}

// Same quote-aware splitter as verify-dump.mjs — a naive split on ";\n" loses
// rows here, since campaign/template bodies are HTML that can contain
// `style="overflow:hidden;` at a line end.
function splitStatements(sql) {
  const out = [];
  let buf = "";
  let inString = false;
  for (let i = 0; i < sql.length; i++) {
    const c = sql[i];
    if (inString) {
      if (c === "'") {
        if (sql[i + 1] === "'") { buf += "''"; i++; continue; }
        inString = false;
      }
      buf += c;
      continue;
    }
    if (c === "'") { inString = true; buf += c; continue; }
    if (c === ";") { out.push(buf.trim()); buf = ""; continue; }
    buf += c;
  }
  if (buf.trim()) out.push(buf.trim());
  return out.filter((s) => s && !s.split("\n").every((l) => l.trim().startsWith("--")));
}

const db = createClient({ url, authToken });
const stmts = splitStatements(readFileSync(sqlFile, "utf8"));
console.log(`Target: ${url}`);
console.log(`Statements to run: ${stmts.length}\n`);

let ok = 0;
const errors = [];
for (const s of stmts) {
  try {
    await db.execute(s);
    ok++;
  } catch (e) {
    errors.push({ stmt: s.slice(0, 110), message: e.message });
  }
}

console.log(`Executed: ${ok}   Failed: ${errors.length}`);
for (const e of errors.slice(0, 10)) {
  console.log(`  ! ${e.message}\n    <<< ${e.stmt}`);
}
if (errors.length > 10) console.log(`  ...and ${errors.length - 10} more`);

if (errors.length === 0) {
  console.log("\nRestore completed with no errors.");
} else {
  console.log("\nRestore finished with errors — check the target database before relying on it.");
  process.exitCode = 1;
}
