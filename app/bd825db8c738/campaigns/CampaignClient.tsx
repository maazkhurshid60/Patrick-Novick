"use client";

import { useState, useEffect, FormEvent } from "react";
import { Send, Clock } from "lucide-react";

interface Campaign {
  id: number;
  subject: string;
  recipient_count: number;
  status: string;
  sent_at: number;
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

export default function CampaignClient({ contactCount }: { contactCount: number }) {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [history, setHistory] = useState<Campaign[]>([]);

  async function fetchHistory() {
    const res = await fetch("/api/campaigns/send");
    const data = await res.json();
    setHistory(data);
  }

  useEffect(() => { fetchHistory(); }, []);

  async function handleSend(e: FormEvent) {
    e.preventDefault();
    setError(""); setSuccess("");
    if (!subject.trim() || !body.trim()) { setError("Subject and body are required"); return; }
    if (contactCount === 0) { setError("Add contacts first before sending"); return; }
    if (!confirm(`Send to ${contactCount} contacts?`)) return;

    setLoading(true);
    const res = await fetch("/api/campaigns/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject, body }),
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
          <span className="text-xs px-2.5 py-1 rounded-full font-semibold" style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.4)" }}>
            {contactCount} recipients
          </span>
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

        <form onSubmit={handleSend} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "rgba(255,255,255,0.35)" }}>Subject</label>
            <input style={inputStyle} type="text" placeholder="Email subject line" value={subject} onChange={(e) => setSubject(e.target.value)} required />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: "rgba(255,255,255,0.35)" }}>
              Body <span style={{ color: "rgba(255,255,255,0.2)", fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>(HTML supported)</span>
            </label>
            <textarea
              style={{ ...inputStyle, minHeight: "280px", resize: "vertical", fontFamily: "monospace", fontSize: "0.8rem" }}
              placeholder={"<p>Hi there,</p>\n<p>Your message here...</p>"}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />
          </div>
          <button
            type="submit" disabled={loading || contactCount === 0}
            className="self-start flex items-center gap-2 px-7 py-3 rounded-full text-sm font-bold text-white transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: "var(--color-red)", fontFamily: "var(--font-heading)", boxShadow: "0 4px 20px rgba(230,57,70,0.3)" }}
          >
            <Send size={14} />
            {loading ? "Sending…" : "Send Campaign"}
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
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "rgba(74,222,128,0.1)", color: "#4ade80" }}>
                    {c.status}
                  </span>
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{c.recipient_count} recipients</span>
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
