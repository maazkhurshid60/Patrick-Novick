"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import { Send, Clock, ChevronDown, Users } from "lucide-react";

interface Campaign {
  id: number;
  subject: string;
  recipient_count: number;
  status: string;
  target_list: string | null;
  sent_at: number;
}

interface ContactList {
  id: number;
  name: string;
  member_count: number;
}

function formatDate(unix: number) {
  return new Date(unix * 1000).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });
}

const inputStyle = {
  border: "1px solid rgba(255,255,255,0.08)",
  color: "#fff",
  background: "rgba(255,255,255,0.04)",
  borderRadius: "0.75rem",
  padding: "0.75rem 1rem",
  fontSize: "0.875rem",
  outline: "none",
  width: "100%",
};

const labelStyle = {
  display: "block" as const,
  fontSize: "0.75rem",
  fontWeight: 600,
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
  marginBottom: "0.375rem",
  color: "rgba(255,255,255,0.35)",
};

export default function CampaignClient({
  contactCount,
  lists,
}: {
  contactCount: number;
  lists: ContactList[];
}) {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [listId, setListId] = useState<number | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const [dailyLimit, setDailyLimit] = useState(50);
  const [excludeRecent, setExcludeRecent] = useState(false);
  const [excludeDays, setExcludeDays] = useState(7);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [history, setHistory] = useState<Campaign[]>([]);

  async function fetchHistory() {
    const res = await fetch("/api/campaigns/send");
    setHistory(await res.json());
  }

  useEffect(() => {
    fetchHistory();
    const draft = localStorage.getItem("campaign_draft");
    if (draft) {
      try {
        const { subject: s, body: b } = JSON.parse(draft);
        setSubject(s ?? "");
        setBody(b ?? "");
        localStorage.removeItem("campaign_draft");
      } catch { /* ignore */ }
    }
  }, []);

  const selectedList = lists.find((l) => l.id === listId);
  const recipientCount = listId ? Number(selectedList?.member_count ?? 0) : contactCount;
  const sendCount = Math.min(recipientCount, dailyLimit);

  async function handleSend(e: FormEvent) {
    e.preventDefault();
    setError(""); setSuccess("");
    if (!subject.trim() || !body.trim()) { setError("Subject and body are required"); return; }
    if (recipientCount === 0) { setError("No contacts in selected list"); return; }
    if (!confirm(`Send to up to ${sendCount} contacts?`)) return;

    setLoading(true);
    const res = await fetch("/api/campaigns/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subject,
        body,
        listId: listId ?? null,
        dailyLimit,
        excludeRecentDays: excludeRecent ? excludeDays : null,
      }),
    });
    const data = await res.json();
    if (!res.ok) { setError(data.error ?? "Send failed"); }
    else {
      setSuccess(`Sent to ${data.recipients} recipients`);
      setSubject(""); setBody("");
      fetchHistory();
    }
    setLoading(false);
  }

  return (
    <div className="grid grid-cols-3 gap-5">
      {/* Composer */}
      <div className="col-span-2 rounded-2xl p-7" style={{ background: "#1a1d23", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>New Campaign</p>
        </div>

        {error && (
          <div className="mb-4 px-4 py-3 rounded-xl text-xs font-medium" style={{ background: "rgba(230,57,70,0.12)", color: "#f87171", border: "1px solid rgba(230,57,70,0.2)" }}>
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 px-4 py-3 rounded-xl text-xs font-medium" style={{ background: "rgba(74,222,128,0.1)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.2)" }}>
            {success}
          </div>
        )}

        <form onSubmit={handleSend} className="flex flex-col gap-5">
          {/* Targeting row */}
          <div className="grid grid-cols-2 gap-4">
            {/* Send to */}
            <div>
              <label style={labelStyle}>Send to</label>
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center justify-between w-full"
                  style={{ ...inputStyle, cursor: "pointer", textAlign: "left" }}
                >
                  <span>{listId ? `${lists.find(l => l.id === listId)?.name} (${Number(lists.find(l => l.id === listId)?.member_count)})` : `All active contacts (${contactCount})`}</span>
                  <ChevronDown size={14} style={{ color: "rgba(255,255,255,0.3)", flexShrink: 0, transform: dropdownOpen ? "rotate(180deg)" : "none", transition: "transform 0.15s" }} />
                </button>
                {dropdownOpen && (
                  <div className="absolute z-50 w-full mt-1 rounded-xl overflow-hidden" style={{ background: "#1e2128", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>
                    <div
                      className="px-4 py-2.5 text-sm cursor-pointer transition-colors"
                      style={{ color: listId === null ? "#fff" : "rgba(255,255,255,0.6)", background: listId === null ? "rgba(230,57,70,0.1)" : "transparent" }}
                      onMouseEnter={e => { if (listId !== null) (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.04)"; }}
                      onMouseLeave={e => { if (listId !== null) (e.currentTarget as HTMLDivElement).style.background = "transparent"; }}
                      onClick={() => { setListId(null); setDropdownOpen(false); }}
                    >
                      All active contacts ({contactCount})
                    </div>
                    {lists.map((l) => (
                      <div
                        key={l.id}
                        className="px-4 py-2.5 text-sm cursor-pointer transition-colors"
                        style={{ color: listId === l.id ? "#fff" : "rgba(255,255,255,0.6)", background: listId === l.id ? "rgba(230,57,70,0.1)" : "transparent", borderTop: "1px solid rgba(255,255,255,0.04)" }}
                        onMouseEnter={e => { if (listId !== l.id) (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.04)"; }}
                        onMouseLeave={e => { if (listId !== l.id) (e.currentTarget as HTMLDivElement).style.background = "transparent"; }}
                        onClick={() => { setListId(l.id); setDropdownOpen(false); }}
                      >
                        {l.name} ({Number(l.member_count)})
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Daily limit */}
            <div>
              <label style={labelStyle}>Daily send limit</label>
              <input
                type="number"
                min={1}
                max={500}
                style={inputStyle}
                value={dailyLimit}
                onChange={(e) => setDailyLimit(Math.max(1, Math.min(500, Number(e.target.value))))}
              />
            </div>
          </div>

          {/* Recipient preview + exclude toggle */}
          <div className="flex items-center justify-between px-4 py-3 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
            <div className="flex items-center gap-2">
              <Users size={13} style={{ color: "rgba(255,255,255,0.3)" }} />
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
                Will send to <strong className="text-white">{sendCount}</strong> contact{sendCount !== 1 ? "s" : ""}
                {recipientCount > dailyLimit && (
                  <span style={{ color: "rgba(255,255,255,0.25)" }}> ({recipientCount - dailyLimit} held back by daily limit)</span>
                )}
              </span>
            </div>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>Skip recently emailed</span>
              <div
                className="relative w-8 h-4 rounded-full transition-colors"
                style={{ background: excludeRecent ? "rgba(230,57,70,0.6)" : "rgba(255,255,255,0.1)" }}
                onClick={() => setExcludeRecent(!excludeRecent)}
              >
                <div className="absolute top-0.5 w-3 h-3 rounded-full bg-white transition-transform" style={{ left: excludeRecent ? "calc(100% - 14px)" : "2px" }} />
              </div>
              {excludeRecent && (
                <span className="flex items-center gap-1 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
                  in last
                  <input
                    type="number"
                    min={1}
                    max={90}
                    value={excludeDays}
                    onChange={(e) => setExcludeDays(Math.max(1, Number(e.target.value)))}
                    onClick={(e) => e.stopPropagation()}
                    style={{ width: "42px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px", color: "#fff", padding: "1px 6px", fontSize: "0.75rem", outline: "none" }}
                  />
                  days
                </span>
              )}
            </label>
          </div>

          {/* Subject */}
          <div>
            <label style={labelStyle}>Subject</label>
            <input style={inputStyle} type="text" placeholder="Email subject line" value={subject} onChange={(e) => setSubject(e.target.value)} required />
          </div>

          {/* Body */}
          <div>
            <label style={{ ...labelStyle }}>
              Body <span style={{ color: "rgba(255,255,255,0.2)", fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>(plain text — use {"{{first_name}}"} etc.)</span>
            </label>
            <textarea
              style={{ ...inputStyle, minHeight: "240px", resize: "vertical", fontFamily: "monospace", fontSize: "0.8rem" }}
              placeholder={"Hi {{first_name}},\n\nYour message here...\n\nBest,\nPatrick"}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />
          </div>

          <button
            type="submit" disabled={loading || recipientCount === 0}
            className="self-start flex items-center gap-2 px-7 py-3 rounded-full text-sm font-bold text-white transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: "var(--color-red)", fontFamily: "var(--font-heading)", boxShadow: "0 4px 20px rgba(230,57,70,0.3)" }}
          >
            <Send size={14} />
            {loading ? "Sending…" : `Send to ${sendCount} contacts`}
          </button>
        </form>
      </div>

      {/* History */}
      <div className="rounded-2xl overflow-hidden flex flex-col" style={{ background: "#1a1d23", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-2 px-5 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <Clock size={14} style={{ color: "rgba(255,255,255,0.3)" }} />
          <p className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>Sent History</p>
        </div>

        {history.length === 0 ? (
          <div className="flex-1 flex items-center justify-center py-12 text-center px-4">
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>No campaigns sent yet.</p>
          </div>
        ) : (
          <div className="overflow-y-auto">
            {history.map((c, i) => (
              <div
                key={c.id}
                className="px-5 py-4"
                style={{ borderBottom: i < history.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}
              >
                <p className="text-sm font-semibold text-white mb-1.5 truncate">{c.subject}</p>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "rgba(74,222,128,0.1)", color: "#4ade80" }}>
                    {c.status}
                  </span>
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{c.recipient_count} sent</span>
                  {c.target_list && (
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(99,102,241,0.1)", color: "#a5b4fc" }}>
                      {c.target_list}
                    </span>
                  )}
                </div>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>{formatDate(c.sent_at)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
