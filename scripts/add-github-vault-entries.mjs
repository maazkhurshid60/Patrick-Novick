/* Put the four project repositories in the vault.
 *
 *   node --env-file=.env.local scripts/add-github-vault-entries.mjs [--apply]
 *
 * Dry run by default; --apply writes.
 *
 * The one interesting part: these share their credential with the existing
 * "Patrick site" entry, and rather than decrypt that secret and re-encrypt it
 * four times, this copies the stored `secret_enc` blob verbatim. encrypt()
 * emits [12-byte IV][16-byte GCM tag][ciphertext] base64 — self-contained, so
 * a copied blob decrypts identically under the same TOKEN_ENCRYPTION_KEY.
 *
 * That is not a micro-optimisation. It means the plaintext is never decrypted,
 * never held in a variable, never printed, and never passes through this
 * script at all — so running it cannot leak the password, and it does not need
 * the encryption key. It also leaves vault_audit_log honest: that table records
 * reveals, and no reveal happened here.
 *
 * Idempotent: an entry whose label already exists is skipped.
 */
import { createClient } from "@libsql/client/http";

const APPLY = process.argv.includes("--apply");

const db = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

/* The entry whose stored secret these reuse. Matched by label rather than a
   hardcoded id — ids 3 and 4 are already missing from this table, so they
   clearly move. */
const SOURCE_LABEL = "Patrick site";

const SHARED_NOTE =
  "Same credential as the “Patrick site” entry — rotating one means rotating all of them.";

const REPOS = [
  { label: "GitHub — Patrick Novick", url: "https://github.com/maazkhurshid60/Patrick-Novick" },
  { label: "GitHub — Metro Associates", url: "https://github.com/maazkhurshid60/metorassoiate" },
  { label: "GitHub — JobFolder", url: "https://github.com/maazkhurshid60/Job-site" },
  /* EM Creative Studio (maazkhurshid60/em-creative-studio) is deliberately
     absent. It was added, then removed on request — leaving it here would
     put it straight back on the next run. */
];

const USERNAME = "maazkhurshid60";

const src = await db.execute({
  sql: "SELECT id, secret_enc FROM vault_entries WHERE label = ? LIMIT 1",
  args: [SOURCE_LABEL],
});
if (src.rows.length === 0) {
  console.error(`No vault entry labelled "${SOURCE_LABEL}" — nothing to copy the secret from.`);
  process.exit(1);
}
const secretEnc = String(src.rows[0].secret_enc);
console.log(`Reusing the secret stored on "${SOURCE_LABEL}" (#${src.rows[0].id}), ciphertext copied as-is.\n`);

const existing = new Set(
  (await db.execute("SELECT label FROM vault_entries")).rows.map((r) => String(r.label)),
);

let written = 0;
for (const r of REPOS) {
  if (existing.has(r.label)) {
    console.log(`  ${r.label.padEnd(32)} already there, skipped`);
    continue;
  }
  if (!APPLY) {
    console.log(`  ${r.label.padEnd(32)} would add  ${r.url}`);
    continue;
  }
  await db.execute({
    sql: `INSERT INTO vault_entries (label, username, url, notes, secret_enc, created_by)
          VALUES (?, ?, ?, ?, ?, ?)`,
    args: [r.label, USERNAME, r.url, SHARED_NOTE, secretEnc, "patrick"],
  });
  written++;
  console.log(`  ${r.label.padEnd(32)} added      ${r.url}`);
}

console.log(
  APPLY
    ? `\n${written} added. Vault now holds ${(await db.execute("SELECT COUNT(*) AS n FROM vault_entries")).rows[0].n} entries.`
    : "\nDry run — nothing written. Re-run with --apply.",
);
