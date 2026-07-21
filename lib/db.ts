import { createClient } from "@libsql/client/http";
import { SEED_TEMPLATES } from "./seedTemplates";

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
    title      TEXT NOT NULL DEFAULT '',
    company    TEXT NOT NULL DEFAULT '',
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
  `CREATE TABLE IF NOT EXISTS suppression_list (
    email      TEXT PRIMARY KEY,
    reason     TEXT NOT NULL DEFAULT 'unsubscribed',
    created_at INTEGER NOT NULL DEFAULT (unixepoch())
  )`,
  `CREATE TABLE IF NOT EXISTS email_opens (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    campaign_id INTEGER NOT NULL,
    email       TEXT NOT NULL,
    opened_at   INTEGER NOT NULL DEFAULT (unixepoch())
  )`,
  // Append-only log of EVERY email actually dispatched — one row per send, no
  // dedup. campaign_recipients is keyed by (campaign_id, email) and so counts a
  // person once per campaign; this table is the source of truth for the true
  // number of emails sent (re-sends to the same person are counted each time).
  `CREATE TABLE IF NOT EXISTS email_send_log (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    campaign_id INTEGER NOT NULL,
    email       TEXT NOT NULL,
    sent_at     INTEGER NOT NULL DEFAULT (unixepoch())
  )`,
  // Uploaded email images (header/hero graphics). Stored base64 and served by
  // /api/images/[id] so they have a stable public URL that works on any host —
  // email clients require a real URL and strip embedded data: images.
  `CREATE TABLE IF NOT EXISTS images (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    name       TEXT NOT NULL DEFAULT '',
    mime       TEXT NOT NULL,
    data       TEXT NOT NULL,
    size       INTEGER NOT NULL DEFAULT 0,
    created_at INTEGER NOT NULL DEFAULT (unixepoch())
  )`,
  // Dashboard login accounts. The bootstrap super-admin still lives in the
  // ADMIN_USERNAME/ADMIN_PASSWORD env vars; these are additional accounts an
  // admin creates from the Users page. Passwords are scrypt-hashed with a salt.
  `CREATE TABLE IF NOT EXISTS admin_users (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    username      TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    password_salt TEXT NOT NULL,
    role          TEXT NOT NULL DEFAULT 'member',
    active        INTEGER NOT NULL DEFAULT 1,
    created_at    INTEGER NOT NULL DEFAULT (unixepoch())
  )`,
], "write")
  .catch(console.error)
  .then(() => Promise.all([
    db.execute("ALTER TABLE contacts ADD COLUMN status TEXT NOT NULL DEFAULT 'active'").catch(() => {}),
    db.execute("ALTER TABLE campaigns ADD COLUMN target_list TEXT").catch(() => {}),
    db.execute("ALTER TABLE contacts ADD COLUMN tags TEXT NOT NULL DEFAULT ''").catch(() => {}),
    db.execute("ALTER TABLE contacts ADD COLUMN title TEXT NOT NULL DEFAULT ''").catch(() => {}),
    db.execute("ALTER TABLE contacts ADD COLUMN company TEXT NOT NULL DEFAULT ''").catch(() => {}),
    // CRM expansion — new columns (safe: ignored if already exist)
    db.execute("ALTER TABLE contacts ADD COLUMN first_name TEXT NOT NULL DEFAULT ''").catch(() => {}),
    db.execute("ALTER TABLE contacts ADD COLUMN last_name TEXT NOT NULL DEFAULT ''").catch(() => {}),
    db.execute("ALTER TABLE contacts ADD COLUMN phone TEXT NOT NULL DEFAULT ''").catch(() => {}),
    db.execute("ALTER TABLE contacts ADD COLUMN phone_2 TEXT NOT NULL DEFAULT ''").catch(() => {}),
    db.execute("ALTER TABLE contacts ADD COLUMN street_address TEXT NOT NULL DEFAULT ''").catch(() => {}),
    db.execute("ALTER TABLE contacts ADD COLUMN city TEXT NOT NULL DEFAULT ''").catch(() => {}),
    db.execute("ALTER TABLE contacts ADD COLUMN state TEXT NOT NULL DEFAULT ''").catch(() => {}),
    db.execute("ALTER TABLE contacts ADD COLUMN zip_code TEXT NOT NULL DEFAULT ''").catch(() => {}),
    db.execute("ALTER TABLE contacts ADD COLUMN country TEXT NOT NULL DEFAULT 'US'").catch(() => {}),
    db.execute("ALTER TABLE contacts ADD COLUMN notes TEXT NOT NULL DEFAULT ''").catch(() => {}),
    db.execute("ALTER TABLE contacts ADD COLUMN segments TEXT NOT NULL DEFAULT ''").catch(() => {}),
    db.execute("ALTER TABLE contacts ADD COLUMN custom_fields TEXT NOT NULL DEFAULT '{}'").catch(() => {}),
    // Extended fields — safe to re-run, ignored if already exist
    db.execute("ALTER TABLE contacts ADD COLUMN business_email TEXT NOT NULL DEFAULT ''").catch(() => {}),
    db.execute("ALTER TABLE contacts ADD COLUMN email_2 TEXT NOT NULL DEFAULT ''").catch(() => {}),
    db.execute("ALTER TABLE contacts ADD COLUMN linkedin TEXT NOT NULL DEFAULT ''").catch(() => {}),
    db.execute("ALTER TABLE contacts ADD COLUMN website TEXT NOT NULL DEFAULT ''").catch(() => {}),
    db.execute("ALTER TABLE contacts ADD COLUMN county TEXT NOT NULL DEFAULT ''").catch(() => {}),
    db.execute("ALTER TABLE contacts ADD COLUMN region TEXT NOT NULL DEFAULT ''").catch(() => {}),
    // List scoping — tie campaigns & templates to a contact list (null = all / general)
    db.execute("ALTER TABLE campaigns ADD COLUMN list_id INTEGER").catch(() => {}),
    db.execute("ALTER TABLE email_templates ADD COLUMN list_id INTEGER").catch(() => {}),
    // Branded-builder field state (JSON). Present = the template was built with the
    // field builder and can be reopened in it; null = plain / pasted-HTML template.
    db.execute("ALTER TABLE email_templates ADD COLUMN builder_json TEXT").catch(() => {}),
    // Extra phone / email slots (work & mobile secondary numbers, second personal email)
    db.execute("ALTER TABLE contacts ADD COLUMN work_phone_2 TEXT NOT NULL DEFAULT ''").catch(() => {}),
    db.execute("ALTER TABLE contacts ADD COLUMN mobile_phone_2 TEXT NOT NULL DEFAULT ''").catch(() => {}),
    db.execute("ALTER TABLE contacts ADD COLUMN personal_email_2 TEXT NOT NULL DEFAULT ''").catch(() => {}),
  ]))
  .then(() => db.batch([
    // Seed test recipients — upsert so re-runs are safe
    { sql: "INSERT OR IGNORE INTO contacts (email, name, title, company) VALUES ('fiveer840@gmail.com', 'TEST SEED - Patrick', 'Senior Recruiter', 'Metro Associates')", args: [] },
    { sql: "INSERT OR IGNORE INTO contacts (email, name, title, company) VALUES ('news@patricknovick.com', 'TEST SEED - Sender', 'Marketing Coordinator', 'Metro Associates')", args: [] },
    { sql: "UPDATE contacts SET name = 'TEST SEED - Patrick', tags = 'test_seed', title = 'Senior Recruiter', company = 'Metro Associates' WHERE email = 'fiveer840@gmail.com'", args: [] },
    { sql: "UPDATE contacts SET name = 'TEST SEED - Sender', tags = 'test_seed', title = 'Marketing Coordinator', company = 'Metro Associates' WHERE email = 'news@patricknovick.com'", args: [] },
  ], "write"))
  // Seed built-in email templates once (idempotent: skip if the name exists).
  .then(() => db.batch(
    SEED_TEMPLATES.map((t) => ({
      sql: `INSERT INTO email_templates (name, subject, body)
            SELECT ?, ?, ? WHERE NOT EXISTS (SELECT 1 FROM email_templates WHERE name = ?)`,
      args: [t.name, t.subject, t.body, t.name],
    })),
    "write",
  ))
  // Backfill the send log from historical campaign_recipients ONCE — only runs
  // while the log is empty, so it preserves the existing "Emails Sent" baseline
  // without ever double-counting on later startups.
  .then(() => db.execute(`
    INSERT INTO email_send_log (campaign_id, email, sent_at)
    SELECT campaign_id, email, sent_at FROM campaign_recipients
    WHERE NOT EXISTS (SELECT 1 FROM email_send_log LIMIT 1)
  `))
  .catch(console.error);

export default db;
