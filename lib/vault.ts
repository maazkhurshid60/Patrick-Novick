import db from "@/lib/db";
import { encrypt, decrypt } from "@/lib/crypto";

/* A small credential vault — logins to other systems an admin needs to keep
   on hand (the JobFolder admin panel, third-party consoles, etc.), not this
   app's own dashboard accounts (see lib/users.ts for those, which are
   correctly one-way hashed and never displayed). A vault necessarily has to
   be reversible — that's the point, an admin needs to read the secret back —
   so what keeps this safe is that it's ciphertext at rest (AES-256-GCM,
   lib/crypto.ts) rather than plaintext, and the decrypted value is only ever
   returned by the one explicit reveal() call below, never by list(). */

export interface VaultEntrySummary {
  id: number;
  label: string;
  username: string;
  url: string;
  notes: string;
  created_by: string;
  created_at: number;
  updated_at: number;
}

export async function listVaultEntries(): Promise<VaultEntrySummary[]> {
  const res = await db.execute(
    "SELECT id, label, username, url, notes, created_by, created_at, updated_at FROM vault_entries ORDER BY label COLLATE NOCASE ASC"
  );
  return res.rows.map((r) => ({
    id: Number(r.id),
    label: r.label as string,
    username: r.username as string,
    url: r.url as string,
    notes: r.notes as string,
    created_by: r.created_by as string,
    created_at: Number(r.created_at),
    updated_at: Number(r.updated_at),
  }));
}

/** The one place a stored secret is ever decrypted. */
export async function revealVaultSecret(id: number): Promise<string | null> {
  const res = await db.execute({ sql: "SELECT secret_enc FROM vault_entries WHERE id = ?", args: [id] });
  const row = res.rows[0];
  if (!row) return null;
  return decrypt(row.secret_enc as string);
}

export type VaultWriteResult = { ok: true; id: number } | { ok: false; error: string; status: number };

export async function createVaultEntry(input: {
  label: string;
  username: string;
  url: string;
  notes: string;
  secret: string;
  createdBy: string;
}): Promise<VaultWriteResult> {
  const label = input.label.trim();
  if (!label) return { ok: false, error: "Label is required.", status: 400 };
  if (!input.secret) return { ok: false, error: "A secret to store is required.", status: 400 };

  const res = await db.execute({
    sql: "INSERT INTO vault_entries (label, username, url, notes, secret_enc, created_by) VALUES (?, ?, ?, ?, ?, ?)",
    args: [label, input.username.trim(), input.url.trim(), input.notes.trim(), encrypt(input.secret), input.createdBy],
  });
  return { ok: true, id: Number(res.lastInsertRowid) };
}

/** `secret` is optional — omit it to leave the stored value unchanged. */
export async function updateVaultEntry(
  id: number,
  input: { label: string; username: string; url: string; notes: string; secret?: string }
): Promise<VaultWriteResult> {
  const label = input.label.trim();
  if (!label) return { ok: false, error: "Label is required.", status: 400 };

  if (input.secret) {
    await db.execute({
      sql: "UPDATE vault_entries SET label = ?, username = ?, url = ?, notes = ?, secret_enc = ?, updated_at = unixepoch() WHERE id = ?",
      args: [label, input.username.trim(), input.url.trim(), input.notes.trim(), encrypt(input.secret), id],
    });
  } else {
    await db.execute({
      sql: "UPDATE vault_entries SET label = ?, username = ?, url = ?, notes = ?, updated_at = unixepoch() WHERE id = ?",
      args: [label, input.username.trim(), input.url.trim(), input.notes.trim(), id],
    });
  }
  return { ok: true, id };
}

export async function deleteVaultEntry(id: number): Promise<void> {
  await db.execute({ sql: "DELETE FROM vault_entries WHERE id = ?", args: [id] });
}
