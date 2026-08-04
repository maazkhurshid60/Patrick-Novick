/* Replay a .sql dump into a throwaway local SQLite file and compare row counts
   against the live Turso database.

   The statement splitter is quote-aware. A naive split on ";\n" loses rows
   here: campaign and template bodies are HTML, and `style="overflow:hidden;`
   at the end of a line puts a semicolon-newline *inside* a string literal. */
import { DatabaseSync } from "node:sqlite";
import { readFileSync, rmSync } from "node:fs";
import { createClient } from "@libsql/client/http";

const [sqlFile, dbPath] = process.argv.slice(2);

function splitStatements(sql) {
  const out = [];
  let buf = "";
  let inString = false;
  for (let i = 0; i < sql.length; i++) {
    const c = sql[i];
    if (inString) {
      if (c === "'") {
        if (sql[i + 1] === "'") { buf += "''"; i++; continue; } // escaped quote
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

rmSync(dbPath, { force: true });
const db = new DatabaseSync(dbPath);
const stmts = splitStatements(readFileSync(sqlFile, "utf8"));
console.log(`  statements parsed: ${stmts.length}`);

let ok = 0;
const errors = [];
for (const s of stmts) {
  try { db.exec(s); ok++; } catch (e) { errors.push(`${e.message}\n     <<< ${s.slice(0, 110)}`); }
}
console.log(`  executed: ${ok}   failed: ${errors.length}`);
for (const e of errors.slice(0, 3)) console.log(`   ! ${e}`);

// Compare against the live database, table by table.
const live = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});
const { rows: liveTabs } = await live.execute(
  `SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name`,
);

console.log(`\n  ${"table".padEnd(22)} ${"live".padStart(7)} ${"restored".padStart(9)}   match`);
let mismatches = 0;
let liveTotal = 0;
let restoredTotal = 0;

for (const t of liveTabs) {
  const name = String(t.name);
  const { rows } = await live.execute(`SELECT COUNT(*) AS n FROM "${name}"`);
  const liveN = Number(rows[0].n);
  let restN = -1;
  try { restN = Number(db.prepare(`SELECT COUNT(*) n FROM "${name}"`).get().n); } catch { /* table missing */ }
  const same = liveN === restN;
  if (!same) mismatches++;
  liveTotal += liveN;
  restoredTotal += Math.max(0, restN);
  console.log(
    `  ${name.padEnd(22)} ${String(liveN).padStart(7)} ${String(restN).padStart(9)}   ${same ? "yes" : "NO  <<<"}`,
  );
}

console.log(`\n  ${"TOTAL".padEnd(22)} ${String(liveTotal).padStart(7)} ${String(restoredTotal).padStart(9)}`);
console.log(mismatches === 0
  ? "\n  Dump restores completely — every table matches the live database."
  : `\n  ${mismatches} table(s) DO NOT match.`);

// Spot-check content, not just counts: a row can restore with mangled text.
const { rows: liveRow } = await live.execute(
  `SELECT id, subject, length(body) AS len FROM campaigns ORDER BY id DESC LIMIT 1`,
);
if (liveRow.length) {
  const r = liveRow[0];
  const got = db.prepare("SELECT subject, length(body) len FROM campaigns WHERE id = ?").get(Number(r.id));
  console.log(`\n  content spot-check — campaigns id=${r.id}`);
  console.log(`    subject  live "${String(r.subject).slice(0, 44)}"`);
  console.log(`             rest "${String(got?.subject ?? "").slice(0, 44)}"`);
  console.log(`    body len live ${r.len}  restored ${got?.len}  ${Number(r.len) === Number(got?.len) ? "identical" : "DIFFERS"}`);
}
