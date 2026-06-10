import { createClient } from "@libsql/client/http";

const db = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

// Create tables on startup
db.batch([
  `CREATE TABLE IF NOT EXISTS te_connections (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id       INTEGER NOT NULL UNIQUE,
    access_token  TEXT NOT NULL,
    refresh_token TEXT NOT NULL,
    expires_at    INTEGER NOT NULL,
    scope         TEXT NOT NULL,
    created_at    INTEGER NOT NULL DEFAULT (unixepoch()),
    updated_at    INTEGER NOT NULL DEFAULT (unixepoch())
  )`,
  `CREATE TABLE IF NOT EXISTS contacts (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    email      TEXT NOT NULL UNIQUE,
    name       TEXT NOT NULL DEFAULT '',
    created_at INTEGER NOT NULL DEFAULT (unixepoch())
  )`,
  `CREATE TABLE IF NOT EXISTS email_templates (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    name       TEXT NOT NULL,
    subject    TEXT NOT NULL,
    body       TEXT NOT NULL,
    created_at INTEGER NOT NULL DEFAULT (unixepoch()),
    updated_at INTEGER NOT NULL DEFAULT (unixepoch())
  )`,
  `CREATE TABLE IF NOT EXISTS campaigns (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    subject         TEXT NOT NULL,
    body            TEXT NOT NULL,
    recipient_count INTEGER NOT NULL DEFAULT 0,
    status          TEXT NOT NULL DEFAULT 'sent',
    brevo_msg_id    TEXT,
    sent_at         INTEGER NOT NULL DEFAULT (unixepoch())
  )`,
  `CREATE TABLE IF NOT EXISTS contact_lists (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    name       TEXT NOT NULL UNIQUE,
    created_at INTEGER NOT NULL DEFAULT (unixepoch())
  )`,
  `CREATE TABLE IF NOT EXISTS contact_list_members (
    list_id    INTEGER NOT NULL,
    contact_id INTEGER NOT NULL,
    PRIMARY KEY (list_id, contact_id)
  )`,
  `CREATE TABLE IF NOT EXISTS campaign_recipients (
    campaign_id INTEGER NOT NULL,
    email       TEXT NOT NULL,
    sent_at     INTEGER NOT NULL DEFAULT (unixepoch()),
    PRIMARY KEY (campaign_id, email)
  )`,
], "write").catch(console.error);

// Safely add new columns to existing tables (no-op if already exist)
db.execute("ALTER TABLE contacts ADD COLUMN status TEXT NOT NULL DEFAULT 'active'").catch(() => {});
db.execute("ALTER TABLE campaigns ADD COLUMN target_list TEXT").catch(() => {});

export default db;
