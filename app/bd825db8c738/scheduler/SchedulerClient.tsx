"use client";

import { useState, useEffect, useCallback } from "react";
import { Clock, Calendar, Trash2, Send, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

interface ListRow { id: number; name: string; member_count: number }
interface TemplateRow { id: number; name: string; subject: string; body: string }

interface ScheduledRow {
  id: number;
  subject: string;
  is_html: number;
  list_id: number | null;
  list_name: string | null;
  daily_limit: number | null;
  send_offset: number;
  exclude_recent_days: number | null;
  reply_to: string | null;
  scheduled_at: number;
  timezone: string;
  status: string;
  result_campaign_id: number | null;
  recipient_count: number;
  error: string | null;
}

// A curated set of common IANA zones; the viewer's own zone is added on mount.
const TIMEZONES = [
  "America/New_York", "America/Chicago", "America/Denver", "America/Phoenix",
  "America/Los_Angeles", "America/Anchorage", "Pacific/Honolulu",
  "America/Toronto", "America/Sao_Paulo", "Europe/London", "Europe/Paris",
  "Europe/Berlin", "Europe/Madrid", "Europe/Athens", "Africa/Johannesburg",
  "Asia/Dubai", "Asia/Karachi", "Asia/Kolkata", "Asia/Singapore",
  "Asia/Tokyo", "Australia/Sydney", "UTC",
];

const CARD: React.CSSProperties = { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16 };
const INPUT: React.CSSProperties = { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, color: "#fff", padding: "9px 12px", fontSize: 14, width: "100%", outline: "none" };
const LABEL: React.CSSProperties = { fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.55)", marginBottom: 6, display: "block" };

function statusStyle(status: string): { bg: string; color: string } {
  switch (status) {
    case "pending": return { bg: "rgba(245,158,11,0.14)", color: "#fbbf24" };
    case "processing": return { bg: "rgba(59,130,246,0.16)", color: "#60a5fa" };
    case "sent": return { bg: "rgba(34,197,94,0.14)", color: "#4ade80" };
    case "failed": return { bg: "rgba(230,57,70,0.16)", color: "#f87171" };
    default: return { bg: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)" };
  }
}

export default function SchedulerClient({
  contactCount, lists, templates,
}: { contactCount: number; lists: ListRow[]; templates: TemplateRow[] }) {
  // compose
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [isHtml, setIsHtml] = useState(false);
  const [listId, setListId] = useState<number | null>(null);
  const [dailyLimit, setDailyLimit] = useState(50);
  const [sendOffset, setSendOffset] = useState(0);
  const [excludeRecent, setExcludeRecent] = useState(false);
  const [excludeDays, setExcludeDays] = useState(30);
  const [replyTo, setReplyTo] = useState("");
  const [templateId, setTemplateId] = useState<number | "">("");

  // schedule
  const [localDateTime, setLocalDateTime] = useState("");
  const [timezone, setTimezone] = useState("America/New_York");
  const [tzOptions, setTzOptions] = useState<string[]>(TIMEZONES);

  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [rows, setRows] = useState<ScheduledRow[]>([]);
  const [loadingRows, setLoadingRows] = useState(true);

  // Default timezone + a sensible default time (1 hour from now, rounded to :00).
  useEffect(() => {
    const browserTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (browserTz && !TIMEZONES.includes(browserTz)) {
      setTzOptions([browserTz, ...TIMEZONES]);
    }
    if (browserTz) setTimezone(browserTz);

    const d = new Date(Date.now() + 60 * 60 * 1000);
    d.setMinutes(0, 0, 0);
    const pad = (n: number) => String(n).padStart(2, "0");
    setLocalDateTime(`${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`);

    // Pre-populate scheduler draft if any (e.g. from Templates page)
    const draft = localStorage.getItem("scheduler_draft");
    if (draft) {
      try {
        const { subject: s, body: b, isHtml: h } = JSON.parse(draft);
        if (s) setSubject(s);
        if (b) setBody(b);
        if (typeof h === "boolean") setIsHtml(h);
        localStorage.removeItem("scheduler_draft");
      } catch (err) {
        console.error(err);
      }
    }
  }, []);

  const loadRows = useCallback(async () => {
    setLoadingRows(true);
    try {
      const res = await fetch("/api/scheduler");
      if (res.ok) setRows(await res.json());
    } finally {
      setLoadingRows(false);
    }
  }, []);

  useEffect(() => { loadRows(); }, [loadRows]);

  function applyTemplate(id: number | "") {
    setTemplateId(id);
    if (id === "") return;
    const t = templates.find((x) => x.id === id);
    if (t) {
      setSubject(t.subject);
      setBody(t.body);
      // Templates are stored as HTML bodies in this app.
      setIsHtml(/<[a-z][\s\S]*>/i.test(t.body));
    }
  }

  const targetCount = listId ? (lists.find((l) => l.id === listId)?.member_count ?? 0) : contactCount;
  const remaining = Math.max(0, targetCount - sendOffset);
  const willSend = Math.min(remaining, dailyLimit);

  async function schedule() {
    setMsg(null);
    if (!subject.trim() || !body.trim()) { setMsg({ type: "err", text: "Subject and message are required." }); return; }
    if (!localDateTime) { setMsg({ type: "err", text: "Pick a date and time." }); return; }

    setSubmitting(true);
    try {
      const res = await fetch("/api/scheduler", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject, body, isHtml,
          listId: listId ?? null,
          dailyLimit,
          offset: sendOffset,
          excludeRecentDays: excludeRecent ? excludeDays : null,
          replyTo: replyTo.trim() || null,
          localDateTime,
          timezone,
        }),
      });
      const data = await res.json();
      if (!res.ok) { setMsg({ type: "err", text: data.error || "Failed to schedule." }); return; }
      setMsg({ type: "ok", text: "Scheduled! It will send automatically at the chosen time." });
      setSubject(""); setBody(""); setTemplateId(""); setIsHtml(false);
      loadRows();
    } catch {
      setMsg({ type: "err", text: "Network error — please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  async function cancel(id: number) {
    if (!confirm("Cancel this scheduled send?")) return;
    const res = await fetch("/api/scheduler", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) loadRows();
    else { const d = await res.json().catch(() => ({})); alert(d.error || "Could not cancel."); }
  }

  function fmt(epoch: number, tz: string): string {
    try {
      return new Date(epoch * 1000).toLocaleString("en-US", { timeZone: tz, dateStyle: "medium", timeStyle: "short" });
    } catch {
      return new Date(epoch * 1000).toLocaleString();
    }
  }

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(230,57,70,0.12)" }}>
          <Clock size={20} style={{ color: "#f87171" }} />
        </div>
        <div>
          <h1 className="text-lg font-bold text-white">Email Scheduler</h1>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
            Queue campaigns to send automatically at a specific time, in any timezone.
          </p>
        </div>
      </div>

      {/* Compose card */}
      <div style={CARD} className="p-5 sm:p-6 flex flex-col gap-5">
        {/* Template + list row */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label style={LABEL}>Start from a template (optional)</label>
            <select style={INPUT} value={templateId} onChange={(e) => applyTemplate(e.target.value ? Number(e.target.value) : "")}>
              <option value="" style={{ background: "#16181e", color: "#fff" }}>— None —</option>
              {templates.map((t) => <option key={t.id} value={t.id} style={{ background: "#16181e", color: "#fff" }}>{t.name}</option>)}
            </select>
          </div>
          <div>
            <label style={LABEL}>Send to</label>
            <select style={INPUT} value={listId ?? ""} onChange={(e) => setListId(e.target.value ? Number(e.target.value) : null)}>
              <option value="" style={{ background: "#16181e", color: "#fff" }}>All active contacts ({contactCount})</option>
              {lists.map((l) => <option key={l.id} value={l.id} style={{ background: "#16181e", color: "#fff" }}>{l.name} ({l.member_count})</option>)}
            </select>
          </div>
        </div>

        <div>
          <label style={LABEL}>Subject</label>
          <input style={INPUT} value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Your email subject…" />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label style={{ ...LABEL, marginBottom: 0 }}>Message</label>
            <label className="flex items-center gap-2 cursor-pointer" style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>
              <input type="checkbox" checked={isHtml} onChange={(e) => setIsHtml(e.target.checked)} />
              Body is HTML
            </label>
          </div>
          <textarea style={{ ...INPUT, minHeight: 160, resize: "vertical", fontFamily: isHtml ? "monospace" : undefined }}
            value={body} onChange={(e) => setBody(e.target.value)}
            placeholder={isHtml ? "<p>Paste your HTML here…</p>" : "Write your message… Use {{first_name}}, {{company}} etc. to personalize."} />
        </div>

        {/* Send controls */}
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label style={LABEL}>Batch size (max to send)</label>
            <input style={INPUT} type="number" min={1} value={dailyLimit} onChange={(e) => setDailyLimit(Math.max(1, Number(e.target.value)))} />
          </div>
          <div>
            <label style={LABEL}>Skip first N recipients</label>
            <input style={INPUT} type="number" min={0} value={sendOffset} onChange={(e) => setSendOffset(Math.max(0, Number(e.target.value)))} />
          </div>
          <div>
            <label style={LABEL}>Reply-to (optional)</label>
            <input style={INPUT} value={replyTo} onChange={(e) => setReplyTo(e.target.value)} placeholder="patrick@metroassoc.com" />
          </div>
        </div>

        <label className="flex items-center gap-2 cursor-pointer" style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>
          <input type="checkbox" checked={excludeRecent} onChange={(e) => setExcludeRecent(e.target.checked)} />
          Don&apos;t send to anyone emailed in the last
          <input style={{ ...INPUT, width: 64, padding: "4px 8px" }} type="number" min={1} value={excludeDays}
            disabled={!excludeRecent} onChange={(e) => setExcludeDays(Math.max(1, Number(e.target.value)))} />
          days
        </label>

        {/* Schedule row */}
        <div className="grid sm:grid-cols-2 gap-4 pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div>
            <label style={LABEL}><Calendar size={12} className="inline mr-1 -mt-0.5" />Send date &amp; time</label>
            <input style={INPUT} type="datetime-local" value={localDateTime} onChange={(e) => setLocalDateTime(e.target.value)} />
          </div>
          <div>
            <label style={LABEL}>Timezone</label>
            <select style={INPUT} value={timezone} onChange={(e) => setTimezone(e.target.value)}>
              {tzOptions.map((tz) => <option key={tz} value={tz} style={{ background: "#16181e", color: "#fff" }}>{tz.replace(/_/g, " ")}</option>)}
            </select>
          </div>
        </div>

        {/* Summary + submit */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
            Will send to <span style={{ color: "#fff" }}>{willSend}</span> recipient{willSend === 1 ? "" : "s"}
            {sendOffset > 0 ? ` (#${sendOffset + 1}–#${sendOffset + willSend})` : ""} of {targetCount} in{" "}
            <span style={{ color: "#fff" }}>{listId ? lists.find((l) => l.id === listId)?.name : "all active contacts"}</span>.
          </p>
          <button onClick={schedule} disabled={submitting}
            className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors"
            style={{ background: submitting ? "rgba(230,57,70,0.5)" : "var(--color-red, #e63946)", color: "#fff", cursor: submitting ? "default" : "pointer" }}>
            {submitting ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
            {submitting ? "Scheduling…" : "Schedule Send"}
          </button>
        </div>

        {msg && (
          <div className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm"
            style={{ background: msg.type === "ok" ? "rgba(34,197,94,0.12)" : "rgba(230,57,70,0.12)", color: msg.type === "ok" ? "#4ade80" : "#f87171" }}>
            {msg.type === "ok" ? <CheckCircle2 size={15} /> : <AlertCircle size={15} />}
            {msg.text}
          </div>
        )}
      </div>

      {/* Scheduled list */}
      <div style={CARD} className="p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-white">Scheduled &amp; Sent</h2>
          <button onClick={loadRows} className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Refresh</button>
        </div>

        {loadingRows ? (
          <div className="flex items-center gap-2 py-8 justify-center" style={{ color: "rgba(255,255,255,0.4)" }}>
            <Loader2 size={16} className="animate-spin" /> Loading…
          </div>
        ) : rows.length === 0 ? (
          <p className="py-8 text-center text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
            No scheduled sends yet. Compose one above.
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {rows.map((r) => {
              const ss = statusStyle(r.status);
              return (
                <div key={r.id} className="flex items-center gap-3 rounded-xl px-4 py-3"
                  style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{r.subject || "—"}</p>
                    <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                      {fmt(r.scheduled_at, r.timezone)} · {r.timezone.replace(/_/g, " ")} ·{" "}
                      {r.list_name ?? "All active contacts"}
                      {r.status === "sent" ? ` · ${r.recipient_count} sent` : ""}
                      {r.status === "failed" && r.error ? ` · ${r.error}` : ""}
                    </p>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full capitalize shrink-0" style={{ background: ss.bg, color: ss.color }}>
                    {r.status}
                  </span>
                  {r.status !== "processing" && (
                    <button onClick={() => cancel(r.id)} title={r.status === "pending" ? "Cancel" : "Remove"}
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors hover:bg-white/5"
                      style={{ color: "rgba(255,255,255,0.35)" }}>
                      <Trash2 size={15} />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <p className="text-xs text-center" style={{ color: "rgba(255,255,255,0.25)" }}>
        The scheduler checks for due sends every 5 minutes. A send fires at the next check after its scheduled time.
      </p>
    </div>
  );
}
