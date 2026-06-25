"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import { Send, Clock, ChevronDown, Users, Trash2 } from "lucide-react";
import { ToastProvider, toast, Spinner } from "../Toast";

interface Campaign {
  id: number;
  subject: string;
  recipient_count: number;
  status: string;
  target_list: string | null;
  sent_at: number;
  total_opens: number;
  unique_opens: number;
}

interface ContactList {
  id: number;
  name: string;
  member_count: number;
}

function formatDate(unix: number) {
  return new Date(unix * 1000).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });
}

// Turn raw API/network errors into something a person can act on.
function friendlyError(raw?: string, status?: number): string {
  if (!raw) {
    if (status === 504 || status === 408) return "The send took too long. Some emails may have gone out — check Sent History before resending.";
    return "Something went wrong while sending. Please try again.";
  }
  const r = raw.toLowerCase();
  if (r.includes("no eligible") || r.includes("no contacts")) return "No eligible contacts to send to right now (they may all be suppressed or recently emailed).";
  if (r.includes("subject") && r.includes("body")) return "Please add a subject and a message before sending.";
  if (r.includes("api key") || r.includes("unauthor") || r.includes("smtp") || r.includes("401")) return "The email service isn't configured correctly. Please check the Brevo/SMTP settings.";
  if (r.includes("fetch") || r.includes("network") || r.includes("timeout")) return "Couldn't reach the email service. Please check your connection and try again.";
  return raw; // already a readable server message
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
  contactCount: initialContactCount,
}: {
  contactCount: number;
  lists: ContactList[];
}) {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [listId, setListId] = useState<number | null>(null);
  const [lists, setLists] = useState<ContactList[]>([]);
  const [contactCount, setContactCount] = useState(initialContactCount);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dailyLimit, setDailyLimit] = useState(50);
  const [excludeRecent, setExcludeRecent] = useState(false);
  const [excludeDays, setExcludeDays] = useState(7);
  const [replyTo, setReplyTo] = useState("");
  const [isTestSend, setIsTestSend] = useState(false);
  const [testEmail, setTestEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<Campaign[]>([]);

  const [attachPostcard, setAttachPostcard] = useState(false);
  const [customAttachment, setCustomAttachment] = useState<{ name: string; content: string; size: number } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("File size exceeds the 5MB limit.");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = (reader.result as string).split(",")[1];
      setCustomAttachment({
        name: file.name,
        content: base64String,
        size: file.size,
      });
    };
    reader.readAsDataURL(file);
  };

  async function handleDeleteCampaign(id: number) {
    if (!confirm("Delete this campaign record from history?")) return;
    const loadId = toast.loading("Removing campaign…");
    try {
      const res = await fetch("/api/campaigns/send", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        await fetchHistory();
        toast.success("Campaign removed from history");
      } else {
        const data = await res.json().catch(() => ({} as { error?: string }));
        toast.error(friendlyError(data.error, res.status));
      }
    } catch {
      toast.error("Couldn't reach the server. Please check your connection and try again.");
    } finally {
      toast.dismiss(loadId);
    }
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function fetchLists() {
    const res = await fetch("/api/lists");
    setLists(await res.json());
  }

  async function fetchContactCount() {
    const res = await fetch("/api/contacts/count");
    if (res.ok) {
      const data = await res.json();
      setContactCount(data.count);
    }
  }

  async function fetchHistory() {
    const res = await fetch("/api/campaigns/send");
    setHistory(await res.json());
  }

  useEffect(() => {
    fetchLists();
    fetchContactCount();
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
    if (!subject.trim() || !body.trim()) { toast.error("Subject and body are required"); return; }
    if (isTestSend && !testEmail.trim()) { toast.error("Test email is required"); return; }
    if (!isTestSend && recipientCount === 0) { toast.error("No contacts in selected list"); return; }

    const confirmMsg = isTestSend
      ? `Send test email to ${testEmail.trim()}?`
      : `Send to up to ${sendCount} contacts?`;
    if (!confirm(confirmMsg)) return;

    setLoading(true);
    const loadId = toast.loading(isTestSend ? "Sending test email…" : `Sending to ${sendCount} contacts…`);
    try {
      const res = await fetch("/api/campaigns/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject, body,
          listId: listId ?? null,
          dailyLimit,
          excludeRecentDays: excludeRecent ? excludeDays : null,
          replyTo: replyTo.trim() || null,
          isTestSend,
          testEmail: isTestSend ? testEmail.trim() : null,
          attachPostcard,
          customAttachment: customAttachment ? { name: customAttachment.name, content: customAttachment.content } : null,
        }),
      });
      const data = await res.json().catch(() => ({} as { error?: string; recipients?: number }));
      if (!res.ok) {
        toast.error(friendlyError(data.error, res.status));
      } else {
        const n = Number(data.recipients ?? 0);
        toast.success(
          isTestSend
            ? `Test email sent to ${testEmail.trim()}`
            : `✓ Campaign sent to ${n} recipient${n === 1 ? "" : "s"}`
        );
        if (!isTestSend) {
          setSubject(""); setBody("");
          setAttachPostcard(false);
          setCustomAttachment(null);
          fetchHistory();
        }
      }
    } catch {
      toast.error("Couldn't reach the server. Please check your connection and try again.");
    } finally {
      toast.dismiss(loadId);
      setLoading(false);
    }
  }

  return (
    <>
    <ToastProvider />
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {/* Composer */}
      <div className="lg:col-span-2 rounded-2xl p-5 sm:p-7" style={{ background: "#1a1d23", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>New Campaign</p>
        </div>

        <form onSubmit={handleSend} className="flex flex-col gap-5">
          {/* Targeting row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

          {/* Reply-to */}
          <div>
            <label style={labelStyle}>
              Reply-to email <span style={{ color: "rgba(255,255,255,0.2)", fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>(optional — replies land here)</span>
            </label>
            <input
              style={inputStyle}
              type="email"
              placeholder="patrick@metroassoc.com (default)"
              value={replyTo}
              onChange={(e) => setReplyTo(e.target.value)}
            />
          </div>

          {/* Test send toggle */}
          <div className="flex flex-col gap-2.5 p-4 rounded-2xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isTestSend}
                onChange={(e) => {
                  setIsTestSend(e.target.checked);
                  if (e.target.checked && !testEmail) {
                    setTestEmail("patrick@metroassoc.com");
                  }
                }}
                className="w-4 h-4 rounded border-white/20 bg-white/5 accent-red-500 shrink-0"
              />
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-white">Enable Test Send</span>
                <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>Does not write log entry to sent history</span>
              </div>
            </label>
            {isTestSend && (
              <div className="mt-1 pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                <label style={{ ...labelStyle, marginBottom: "0.25rem" }}>Test Email Address</label>
                <input
                  style={inputStyle}
                  type="email"
                  placeholder="e.g. patrick@metroassoc.com"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                />
              </div>
            )}
          </div>

          {/* Campaign Attachments block */}
          <div className="flex flex-col gap-3.5 p-4 rounded-2xl" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-white">Campaign Attachments</span>
              <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>Attach a postcard or any document to this email campaign</span>
            </div>

            <div className="flex flex-col gap-3 pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
              {/* Predefined Postcard Checkbox */}
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={attachPostcard}
                  onChange={(e) => setAttachPostcard(e.target.checked)}
                  className="w-4 h-4 rounded border-white/20 bg-white/5 accent-red-500 shrink-0"
                />
                <div className="flex flex-col">
                  <span className="text-xs text-white/80">Attach standard postcard PDF</span>
                  <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>Includes the default company postcard.pdf</span>
                </div>
              </label>

              {/* Custom File Upload */}
              <div className="flex flex-col gap-2">
                <label style={{ ...labelStyle, marginBottom: 0 }}>Or attach a custom file</label>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="text-xs text-white/55 file:mr-4 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20 cursor-pointer"
                  />
                  {customAttachment && (
                    <button
                      type="button"
                      onClick={() => setCustomAttachment(null)}
                      className="text-xs text-red-400 hover:text-red-300 font-semibold"
                    >
                      Remove
                    </button>
                  )}
                </div>
                {customAttachment && (
                  <p className="text-[10px] text-emerald-400">
                    Selected: {customAttachment.name} ({Math.round(customAttachment.size / 1024)} KB)
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Subject */}
          <div>
            <label style={labelStyle}>Subject</label>
            <input style={inputStyle} type="text" placeholder="Email subject line" value={subject} onChange={(e) => setSubject(e.target.value)} />
          </div>

          {/* Body */}
          <div>
            <label style={{ ...labelStyle }}>
              Body <span style={{ color: "rgba(255,255,255,0.2)", fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>(plain text — use {"{{first_name}}"}, {"{{title}}"}, {"{{company}}"} etc.)</span>
            </label>
            <textarea
              style={{ ...inputStyle, minHeight: "240px", resize: "vertical", fontFamily: "monospace", fontSize: "0.8rem" }}
              placeholder={"Hi {{first_name}},\n\nI saw you are a {{title}} at {{company}}...\n\nBest,\nPatrick"}
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </div>

          <button
            type="submit" disabled={loading || (!isTestSend && recipientCount === 0)}
            className="self-start flex items-center gap-2 px-7 py-3 rounded-full text-sm font-bold text-white transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: "var(--color-red)", fontFamily: "var(--font-heading)", boxShadow: "0 4px 20px rgba(230,57,70,0.3)" }}
          >
            {loading ? <Spinner size={14} /> : <Send size={14} />}
            {loading ? "Sending…" : isTestSend ? "Send Test Email" : `Send to ${sendCount} contacts`}
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
                className="px-5 py-4 relative group"
                style={{ borderBottom: i < history.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-white mb-1.5 truncate">{c.subject}</p>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: c.status === "failed" ? "rgba(230,57,70,0.12)" : "rgba(74,222,128,0.1)", color: c.status === "failed" ? "#f87171" : "#4ade80" }}>
                        {c.status}
                      </span>
                      <span className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{c.recipient_count} sent</span>
                      {Number(c.unique_opens) > 0 && (
                        <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "rgba(251,191,36,0.12)", color: "#fbbf24" }}>
                          {c.unique_opens} opened
                        </span>
                      )}
                      {c.target_list && (
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(99,102,241,0.1)", color: "#a5b4fc" }}>
                          {c.target_list}
                        </span>
                      )}
                    </div>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>{formatDate(c.sent_at)}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteCampaign(c.id)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:bg-red-500/10 text-white/20 hover:text-red-400 opacity-0 group-hover:opacity-100 shrink-0"
                    title="Delete campaign log"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </>
  );
}
