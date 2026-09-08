/* What the expensive endpoints actually cost in rows read.
 *
 *   node --env-file=.env.local scripts/measure-rows-read.mjs
 *
 * Turso bills rows read, and the dashboard only shows the account total —
 * which tells you that something is expensive but not what. This runs the
 * real queries and reports the per-query rows_read the server reports back,
 * so a regression can be caught before it shows up on a bill.
 *
 * Read-only.
 */
import { createClient } from "@libsql/client/http";

const db = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const QUERIES = {
  "GET /api/contacts (current)": `
    SELECT c.*,
           COALESCE(s.campaigns_sent, 0) AS campaigns_sent,
           m.lists, m.list_ids
    FROM contacts c
    LEFT JOIN (
      SELECT clm.contact_id AS cid,
             GROUP_CONCAT(cl.name, ', ') AS lists,
             GROUP_CONCAT(clm.list_id, ', ') AS list_ids
      FROM contact_list_members clm
      JOIN contact_lists cl ON cl.id = clm.list_id
      GROUP BY clm.contact_id
    ) m ON m.cid = c.id
    LEFT JOIN (
      SELECT email, COUNT(DISTINCT campaign_id) AS campaigns_sent
      FROM campaign_recipients GROUP BY email
    ) s ON s.email = c.email
    ORDER BY c.created_at DESC`,

  "GET /api/contacts (old, correlated)": `
    SELECT c.*,
      (SELECT COUNT(DISTINCT campaign_id) FROM campaign_recipients WHERE email = c.email) AS campaigns_sent,
      (SELECT GROUP_CONCAT(cl.name, ', ') FROM contact_list_members clm
        JOIN contact_lists cl ON clm.list_id = cl.id WHERE clm.contact_id = c.id) AS lists,
      (SELECT GROUP_CONCAT(clm.list_id, ', ') FROM contact_list_members clm
        WHERE clm.contact_id = c.id) AS list_ids
    FROM contacts c ORDER BY c.created_at DESC`,

  "contacts count": `SELECT COUNT(*) FROM contacts`,
  "lists with sizes": `
    SELECT l.id, l.name, COUNT(m.contact_id) AS n
    FROM contact_lists l LEFT JOIN contact_list_members m ON m.list_id = l.id
    GROUP BY l.id, l.name`,
};

/* `--only=<substring>` runs just one of them, and `--runs=N` sets how many
   times — together they let you A/B two phrasings of the same query against
   the account's rows-read counter, which is the metered number. */
const onlyArg = process.argv.find((a) => a.startsWith("--only="));
const runsArg = process.argv.find((a) => a.startsWith("--runs="));
const only = onlyArg ? onlyArg.slice("--only=".length) : null;
const RUNS = runsArg ? Number(runsArg.slice("--runs=".length)) : 3;

/* Three runs each, median reported — a single timing over the network says
   more about the network than about the query. */
for (const [label, sql] of Object.entries(QUERIES)) {
  if (only && !label.includes(only)) continue;
  const times = [];
  let rows = 0;
  for (let i = 0; i < RUNS; i++) {
    const t = Date.now();
    const r = await db.execute(sql);
    times.push(Date.now() - t);
    rows = r.rows.length;
  }
  times.sort((a, b) => a - b);
  const median = times[Math.floor(times.length / 2)];
  console.log(
    `  ${label.padEnd(38)} ${String(rows).padStart(6)} rows   median ${String(median).padStart(6)} ms   (${times.join(", ")})`,
  );
}
