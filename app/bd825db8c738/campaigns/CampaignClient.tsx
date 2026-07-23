"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import { Send, Clock, ChevronDown, Users, Trash2, Paperclip, AlertTriangle, Mail, Reply, CheckCircle2, Search, X, MapPin } from "lucide-react";
import { ToastProvider, toast, Spinner, LoadingOverlay } from "../Toast";

interface Campaign {
  id: number;
  subject: string;
  recipient_count: number;
  status: string;
  target_list: string | null;
  list_id: number | null;
  sent_at: number;
  total_opens: number;
  unique_opens: number;
}

interface RecipientRow {
  id: number;
  email: string;
  name: string;
  title: string;
  company: string;
  city?: string;
  state?: string;
  send_count: number;
  last_sent: number | null;
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
  const [sendOffset, setSendOffset] = useState(0);
  const [excludeRecent, setExcludeRecent] = useState(true);
  const [excludeDays, setExcludeDays] = useState(30);
  const [replyTo, setReplyTo] = useState("");
  const [isTestSend, setIsTestSend] = useState(false);
  const [testEmail, setTestEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<Campaign[]>([]);
  const [historyFilter, setHistoryFilter] = useState<number | "all">("all");

  const [customAttachment, setCustomAttachment] = useState<{ name: string; content: string; size: number } | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [bodyIsHtml, setBodyIsHtml] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Recipient preview — the actual people this send will go to
  const [showRecipients, setShowRecipients] = useState(false);
  const [recipients, setRecipients] = useState<RecipientRow[]>([]);
  const [recipientsLoading, setRecipientsLoading] = useState(false);
  const [recipientSearch, setRecipientSearch] = useState("");

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

  async function fetchHistory(filter: number | "all" = historyFilter) {
    const url = filter === "all" ? "/api/campaigns/send" : `/api/campaigns/send?listId=${filter}`;
    const res = await fetch(url);
    setHistory(await res.json());
  }

  // Refetch history whenever the list filter changes (covers initial load too)
  useEffect(() => { fetchHistory(historyFilter); }, [historyFilter]);

  useEffect(() => {
    fetchLists();
    fetchContactCount();
    const draft = localStorage.getItem("campaign_draft");
    if (draft) {
      try {
        const { subject: s, body: b, isHtml: h } = JSON.parse(draft);
        setSubject(s ?? "");
        setBody(b ?? "");
        if (typeof h === "boolean") setBodyIsHtml(h);
        localStorage.removeItem("campaign_draft");
      } catch { /* ignore */ }
    }
  }, []);

  const selectedList = lists.find((l) => l.id === listId);
  const recipientCount = listId ? Number(selectedList?.member_count ?? 0) : contactCount;
  // Skip the first `sendOffset` recipients, then send up to `dailyLimit` of the rest.
  const remainingAfterSkip = Math.max(0, recipientCount - sendOffset);
  const sendCount = Math.min(remainingAfterSkip, dailyLimit);

  // Names of attachments that will ride along with this send
  const attachmentNames = [
    ...(customAttachment ? [customAttachment.name] : []),
  ];
  const hasAttachment = attachmentNames.length > 0;

  // Live preview — substitutes sample values and formats exactly like the server:
  // plain text turns newlines into <br>, HTML is used verbatim.
  const previewBodyHtml = (() => {
    const s = { first_name: "Alex", last_name: "Morgan", full_name: "Alex Morgan", title: "Principal Engineer", company: "Acme Corp", email: "alex.morgan@example.com" };
    let out = (body || "")
      .replace(/\{\{first_name\}\}/gi, s.first_name)
      .replace(/\{\{last_name\}\}/gi, s.last_name)
      .replace(/\{\{full_name\}\}/gi, s.full_name)
      .replace(/\{\{name\}\}/gi, s.full_name)
      .replace(/\{\{email\}\}/gi, s.email)
      .replace(/\{\{title\}\}/gi, s.title)
      .replace(/\{\{company\}\}/gi, s.company);
    if (!bodyIsHtml) out = out.trim().replace(/\n/g, "<br />");
    const sigHtml = `<div style="margin-top: 30px; border-top: 1px solid #eeeeee; padding-top: 20px;"><img src="/signature.png" alt="Patrick Novick - CEO, Metro Associates LLC" width="550" style="display: block; max-width: 100%; height: auto; border: 0;" /></div>`;
    return out + sigHtml;
  })();

  async function openRecipients() {
    setShowRecipients(true);
    setRecipientsLoading(true);
    setRecipientSearch("");
    const params = new URLSearchParams();
    if (listId) params.set("listId", String(listId));
    if (excludeRecent) params.set("excludeRecentDays", String(excludeDays));
    params.set("dailyLimit", String(dailyLimit));
    params.set("offset", String(sendOffset));
    try {
      const res = await fetch(`/api/campaigns/recipients?${params.toString()}`);
      const data = await res.json();
      setRecipients(data.recipients ?? []);
    } catch {
      setRecipients([]);
    } finally {
      setRecipientsLoading(false);
    }
  }

  async function handleSend(e: FormEvent) {
    e.preventDefault();
    if (!subject.trim() || !body.trim()) { toast.error("Subject and body are required"); return; }
    if (isTestSend && !testEmail.trim()) { toast.error("Test email is required"); return; }
    if (!isTestSend && recipientCount === 0) { toast.error("No contacts in selected list"); return; }

    // Test sends stay quick; real campaigns go through the pre-send checklist.
    if (isTestSend) {
      if (!confirm(`Send test email to ${testEmail.trim()}?`)) return;
      doSend();
    } else {
      setShowConfirm(true);
    }
  }

  async function doSend() {
    setShowConfirm(false);
    setLoading(true);
    try {
      const res = await fetch("/api/campaigns/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject, body,
          isHtml: bodyIsHtml,
          listId: listId ?? null,
          dailyLimit,
          offset: sendOffset,
          excludeRecentDays: excludeRecent ? excludeDays : null,
          replyTo: replyTo.trim() || null,
          isTestSend,
          testEmail: isTestSend ? testEmail.trim() : null,
          customAttachment: customAttachment ? { name: customAttachment.name, content: customAttachment.content } : null,
        }),
      });
      const data = await res.json().catch(() => ({} as { error?: string; recipients?: number }));
      if (!res.ok) {
        toast.error(friendlyError(data.error, res.status));
      } else {
        const n = Number(data.recipients ?? 0);
        const failedN = Number(data.failed ?? 0);
        toast.success(
          isTestSend
            ? `Test email sent to ${testEmail.trim()}`
            : `✓ Campaign sent to ${n} recipient${n === 1 ? "" : "s"}${failedN ? ` · ${failedN} failed` : ""}`
        );
        if (!isTestSend) {
          setSubject(""); setBody("");
          setCustomAttachment(null);
          fetchHistory();
        }
      }
    } catch {
      toast.error("Couldn't reach the server. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
    <ToastProvider />
    <LoadingOverlay show={loading} message={isTestSend ? "Sending test email…" : "Sending campaign… this can take a moment"} />

    {/* Pre-send checklist — a last-look before a real campaign goes out */}
    {showConfirm && (
      <div
        style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.72)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}
        onClick={(e) => { if (e.target === e.currentTarget) setShowConfirm(false); }}
      >
        <div style={{ background: "#151821", border: "1px solid rgba(255,255,255,0.09)", borderRadius: "1.25rem", width: "100%", maxWidth: 460, padding: "1.75rem", boxShadow: "0 40px 100px rgba(0,0,0,0.8)" }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(230,57,70,0.12)" }}>
              <Send size={17} style={{ color: "#f87171" }} />
            </div>
            <div>
              <p className="text-base font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>Ready to send?</p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Quick check before this goes out.</p>
            </div>
          </div>

          <div className="flex flex-col gap-2.5 mb-5">
            {/* Recipients */}
            <div className="flex items-start gap-2.5">
              <Users size={15} className="mt-0.5 shrink-0" style={{ color: "#7dd3fc" }} />
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>
                Sending to <strong className="text-white">{sendCount}</strong> {sendCount === 1 ? "contact" : "contacts"}
                <span style={{ color: "rgba(255,255,255,0.4)" }}> (#{sendOffset + 1}–#{sendOffset + sendCount} of {recipientCount} · {listId ? lists.find((l) => l.id === listId)?.name : "all active contacts"})</span>
              </p>
            </div>
            {/* Subject */}
            <div className="flex items-start gap-2.5">
              <Mail size={15} className="mt-0.5 shrink-0" style={{ color: "#4ade80" }} />
              <p className="text-sm truncate" style={{ color: "rgba(255,255,255,0.75)" }} title={subject}>
                Subject: <span className="text-white">{subject.trim() || "—"}</span>
              </p>
            </div>
            {/* Reply-to */}
            <div className="flex items-start gap-2.5">
              <Reply size={15} className="mt-0.5 shrink-0" style={{ color: "#a5b4fc" }} />
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>
                Replies go to <span className="text-white">{replyTo.trim() || "patrick@metroassoc.com"}</span>
              </p>
            </div>
            {/* Attachment — highlighted when missing */}
            <div
              className="flex items-start gap-2.5 px-3 py-2.5 rounded-xl"
              style={ hasAttachment
                ? { background: "rgba(74,222,128,0.06)", border: "1px solid rgba(74,222,128,0.15)" }
                : { background: "rgba(234,179,8,0.07)", border: "1px solid rgba(234,179,8,0.2)" } }
            >
              {hasAttachment
                ? <CheckCircle2 size={15} className="mt-0.5 shrink-0" style={{ color: "#4ade80" }} />
                : <AlertTriangle size={15} className="mt-0.5 shrink-0" style={{ color: "#fbbf24" }} />}
              <div className="min-w-0">
                {hasAttachment ? (
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.85)" }}>
                    <Paperclip size={12} className="inline mb-0.5" /> Attaching: <span className="text-white">{attachmentNames.join(", ")}</span>
                  </p>
                ) : (
                  <p className="text-sm" style={{ color: "#fbbf24" }}>
                    No attachment added — send without one?
                  </p>
                )}
              </div>
            </div>
            {/* Skip-recent reminder */}
            {excludeRecent && (
              <p className="text-xs pl-1" style={{ color: "rgba(255,255,255,0.4)" }}>
                Skipping anyone emailed in the last {excludeDays} day{excludeDays === 1 ? "" : "s"}.
              </p>
            )}
          </div>

          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => setShowConfirm(false)}
              className="px-4 py-2 rounded-xl text-sm font-semibold transition-colors hover:bg-white/5"
              style={{ color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              Back
            </button>
            <button
              onClick={doSend}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold text-white transition-all hover:scale-[1.02]"
              style={{ background: "#e63946" }}
            >
              <Send size={14} /> Send now
            </button>
          </div>
        </div>
      </div>
    )}
    {/* Recipient preview — the actual people this send resolves to */}
    {showRecipients && (
      <div
        style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.72)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}
        onClick={(e) => { if (e.target === e.currentTarget) setShowRecipients(false); }}
      >
        <div style={{ background: "#151821", border: "1px solid rgba(255,255,255,0.09)", borderRadius: "1.25rem", width: "100%", maxWidth: 620, maxHeight: "86vh", display: "flex", flexDirection: "column", overflow: "hidden", boxShadow: "0 40px 100px rgba(0,0,0,0.8)" }}>
          <div className="px-5 py-4 flex items-center justify-between gap-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div>
              <p className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>
                Recipients for this send {!recipientsLoading && <span style={{ color: "rgba(255,255,255,0.4)" }}>· {recipients.length}</span>}
              </p>
              <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>
                Exactly who gets this email with the current settings, and how many times we&apos;ve emailed each before.
              </p>
            </div>
            <button onClick={() => setShowRecipients(false)} className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-white/5 shrink-0" style={{ color: "rgba(255,255,255,0.5)" }}>
              <X size={16} />
            </button>
          </div>

          <div className="px-5 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="relative">
              <Search size={13} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.3)" }} />
              <input
                value={recipientSearch}
                onChange={(e) => setRecipientSearch(e.target.value)}
                placeholder="Search name, email, company…"
                style={{ ...inputStyle, paddingLeft: "2.2rem", fontSize: "0.8rem" }}
              />
            </div>
          </div>

          <div style={{ overflowY: "auto" }}>
            {recipientsLoading ? (
              <div className="py-16 text-center text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>Resolving recipients…</div>
            ) : (() => {
              const rq = recipientSearch.trim().toLowerCase();
              const shown = recipients.filter((r) =>
                !rq || r.email.toLowerCase().includes(rq) || (r.name || "").toLowerCase().includes(rq) || (r.company || "").toLowerCase().includes(rq)
              );
              if (shown.length === 0) {
                return <div className="py-16 text-center text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>{recipients.length === 0 ? "No eligible recipients for these settings." : "No recipients match your search."}</div>;
              }
              return shown.map((r, i) => (
                <div key={r.id} className="flex items-center justify-between gap-3 px-5 py-3" style={{ borderBottom: i < shown.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0" style={{ background: "rgba(230,57,70,0.12)", color: "#f87171" }}>
                      {(r.name || r.email)[0].toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white truncate">{r.name || r.email}</p>
                      <p className="text-xs truncate" style={{ color: "rgba(255,255,255,0.35)" }}>
                        {r.name ? r.email : ""}
                        {(r.title || r.company) && <>{r.name ? " · " : ""}{[r.title, r.company].filter(Boolean).join(" at ")}</>}
                      </p>
                      {[r.city, r.state].filter(Boolean).length > 0 && (
                        <p className="text-xs flex items-center gap-1" style={{ color: "rgba(255,255,255,0.3)" }}>
                          <MapPin size={9} /> {[r.city, r.state].filter(Boolean).join(", ")}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    {r.send_count > 0 ? (
                      <>
                        <span className="text-xs px-1.5 py-0.5 rounded-full font-medium" style={{ background: "rgba(96,165,250,0.12)", color: "#60a5fa" }}>
                          sent {r.send_count}×
                        </span>
                        {r.last_sent && (
                          <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.3)" }}>
                            last {new Date(r.last_sent * 1000).toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" })}
                          </p>
                        )}
                      </>
                    ) : (
                      <span className="text-xs px-1.5 py-0.5 rounded-full font-medium" style={{ background: "rgba(74,222,128,0.1)", color: "#4ade80" }}>first time</span>
                    )}
                  </div>
                </div>
              ));
            })()}
          </div>
        </div>
      </div>
    )}

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

            {/* Batch size + start position */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label style={labelStyle}>Batch size (send)</label>
                <input
                  type="text"
                  inputMode="numeric"
                  style={inputStyle}
                  value={dailyLimit}
                  onChange={(e) => {
                    const digits = e.target.value.replace(/[^0-9]/g, "");
                    setDailyLimit(digits === "" ? 0 : Math.min(1500, Number(digits)));
                  }}
                  onBlur={() => setDailyLimit((v) => Math.max(1, Math.min(1500, v || 1)))}
                  title="How many to send this run (1–1500)."
                />
              </div>
              <div>
                <label style={labelStyle}>Skip first</label>
                <div className="flex items-stretch gap-1.5">
                  <button
                    type="button"
                    onClick={() => setSendOffset((o) => Math.max(0, o - (dailyLimit || 1)))}
                    disabled={sendOffset === 0}
                    className="shrink-0 w-9 rounded-xl text-lg font-bold transition-colors hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
                    style={{ border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)" }}
                    title="Back one batch"
                  >
                    −
                  </button>
                  <input
                    type="text"
                    inputMode="numeric"
                    style={{ ...inputStyle, textAlign: "center" }}
                    value={sendOffset}
                    onChange={(e) => {
                      const digits = e.target.value.replace(/[^0-9]/g, "");
                      setSendOffset(digits === "" ? 0 : Number(digits));
                    }}
                    title="Skip this many recipients from the top, then send the next batch. Use − / + to jump one batch at a time."
                  />
                  <button
                    type="button"
                    onClick={() => setSendOffset((o) => o + (dailyLimit || 1))}
                    className="shrink-0 w-9 rounded-xl text-lg font-bold transition-colors hover:bg-white/10"
                    style={{ border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)" }}
                    title="Forward one batch"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Recipient preview + exclude toggle */}
          <div className="flex items-center justify-between px-4 py-3 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
            <div className="flex items-center gap-2">
              <Users size={13} style={{ color: "rgba(255,255,255,0.3)" }} />
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
                {sendCount === 0 ? (
                  <>Nothing to send — &ldquo;skip first&rdquo; ({sendOffset}) is past the {recipientCount} recipient{recipientCount !== 1 ? "s" : ""}</>
                ) : (
                  <>
                    Will send to <strong className="text-white">{sendCount}</strong> contact{sendCount !== 1 ? "s" : ""}
                    {" "}(#{sendOffset + 1}–#{sendOffset + sendCount} of {recipientCount})
                    {recipientCount > sendOffset + sendCount && (
                      <span style={{ color: "rgba(255,255,255,0.25)" }}> · {recipientCount - sendOffset - sendCount} remaining after this batch</span>
                    )}
                  </>
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
                    type="text"
                    inputMode="numeric"
                    value={excludeDays}
                    onChange={(e) => {
                      const digits = e.target.value.replace(/[^0-9]/g, "");
                      setExcludeDays(digits === "" ? 0 : Math.min(90, Number(digits)));
                    }}
                    onBlur={() => setExcludeDays((v) => Math.max(1, Math.min(90, v || 1)))}
                    onClick={(e) => e.stopPropagation()}
                    style={{ width: "42px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px", color: "#fff", padding: "1px 6px", fontSize: "0.75rem", outline: "none", textAlign: "center" }}
                  />
                  days
                </span>
              )}
            </label>
          </div>

          {/* See exactly who this send resolves to */}
          <button
            type="button"
            onClick={openRecipients}
            disabled={sendCount === 0}
            className="self-start flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors hover:bg-white/5 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.12)" }}
          >
            <Users size={13} /> Preview recipients &amp; send history
          </button>

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
              <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>Attach a document to this email campaign</span>
            </div>

            <div className="flex flex-col gap-3 pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
              {/* Custom File Upload */}
              <div className="flex flex-col gap-2">
                <label style={{ ...labelStyle, marginBottom: 0 }}>Attach a file</label>
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
            <div className="flex items-center justify-between gap-2 flex-wrap mb-1.5">
              <label style={{ ...labelStyle, marginBottom: 0 }}>
                Body <span style={{ color: "rgba(255,255,255,0.2)", fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>(use {"{{first_name}}"}, {"{{title}}"}, {"{{company}}"} etc.)</span>
              </label>
              <div className="flex items-center gap-2">
                {/* Plain / HTML toggle */}
                <div className="flex items-center gap-0.5 p-0.5 rounded-lg" style={{ background: "rgba(255,255,255,0.05)" }}>
                  {([["Plain text", false], ["HTML", true]] as [string, boolean][]).map(([lbl, val]) => (
                    <button
                      key={lbl}
                      type="button"
                      onClick={() => setBodyIsHtml(val)}
                      className="px-2.5 py-1 rounded-md text-xs font-semibold transition-colors"
                      style={{ background: bodyIsHtml === val ? "rgba(230,57,70,0.15)" : "transparent", color: bodyIsHtml === val ? "#f87171" : "rgba(255,255,255,0.4)" }}
                    >
                      {lbl}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setShowPreview((v) => !v)}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors hover:bg-white/5"
                  style={{ color: showPreview ? "#f87171" : "rgba(255,255,255,0.45)", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  {showPreview ? "Hide preview" : "Preview"}
                </button>
              </div>
            </div>
            <textarea
              style={{ ...inputStyle, minHeight: "240px", resize: "vertical", fontFamily: "monospace", fontSize: "0.8rem" }}
              placeholder={bodyIsHtml
                ? "<p>Hi {{first_name}},</p>\n<p>I saw you are a {{title}} at {{company}}…</p>\n<p>Best,<br/>Patrick</p>"
                : "Hi {{first_name}},\n\nI saw you are a {{title}} at {{company}}...\n\nBest,\nPatrick"}
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
            {bodyIsHtml && (
              <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.3)" }}>
                HTML mode: your markup is sent as-is (newlines are not auto-converted). The standard header/footer &amp; unsubscribe link are still added.
              </p>
            )}

            {/* Live preview */}
            {showPreview && (
              <div className="mt-3 rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="px-3 py-1.5 text-xs font-semibold flex items-center justify-between" style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.4)" }}>
                  <span>Preview — sample contact (Alex Morgan · Principal Engineer · Acme Corp)</span>
                  <span style={{ color: "rgba(255,255,255,0.25)" }}>{bodyIsHtml ? "HTML" : "Plain text"}</span>
                </div>
                <div style={{ background: "#ffffff", padding: "24px", maxHeight: 360, overflowY: "auto" }}>
                  <div className="text-sm mb-1" style={{ color: "#111", fontWeight: 600 }}>{subject.trim() || "(no subject yet)"}</div>
                  <div style={{ borderTop: "1px solid #eee", margin: "8px 0 16px" }} />
                  {body.trim() ? (
                    <div style={{ color: "#1a1a1a", fontSize: "15px", lineHeight: 1.7, fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif" }}
                      dangerouslySetInnerHTML={{ __html: previewBodyHtml }} />
                  ) : (
                    <div style={{ color: "#999", fontSize: "14px" }}>Start typing the body to see it here…</div>
                  )}
                  {hasAttachment && (
                    <div style={{ marginTop: 16, paddingTop: 12, borderTop: "1px solid #eee", color: "#666", fontSize: "12px" }}>
                      📎 {attachmentNames.join(", ")}
                    </div>
                  )}
                  <div style={{ marginTop: 24, paddingTop: 16, borderTop: "1px solid #eee", textAlign: "center", color: "#999", fontSize: "11px" }}>
                    Metro Associates, LLC • 1317 Edgewater Drive #4452, Orlando, FL 32804<br />
                    <span style={{ textDecoration: "underline" }}>Unsubscribe</span>
                  </div>
                </div>
              </div>
            )}
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
        <div className="flex items-center gap-2 px-5 py-4 flex-wrap" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <Clock size={14} style={{ color: "rgba(255,255,255,0.3)" }} />
          <p className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>Sent History</p>
          <select
            value={historyFilter}
            onChange={(e) => setHistoryFilter(e.target.value === "all" ? "all" : Number(e.target.value))}
            className="ml-auto"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "0.5rem", color: "#fff", fontSize: "0.72rem", padding: "0.25rem 0.5rem", outline: "none", cursor: "pointer", maxWidth: 160 }}
            title="Filter sent history by list"
          >
            <option value="all" style={{ background: "#1a1d23" }}>All lists</option>
            {lists.map((l) => (
              <option key={l.id} value={l.id} style={{ background: "#1a1d23" }}>{l.name}</option>
            ))}
          </select>
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
