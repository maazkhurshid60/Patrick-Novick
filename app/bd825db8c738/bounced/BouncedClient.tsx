"use client";

import { useEffect, useState, useMemo } from "react";
import { Search, RefreshCw, MailWarning, Pencil, Check, X, RotateCcw } from "lucide-react";
import { Pagination } from "../Toast";

interface BouncedContact {
  email: string;
  reason: string;
  created_at: number;
  contact_id: number | null;
  name: string | null;
  company: string | null;
  title: string | null;
  status: string | null;
}

const cardStyle = {
  background: "#1a1d23",
  border: "1px solid rgba(255,255,255,0.06)",
  borderRadius: "1rem",
  padding: "1.5rem",
};

const inputStyle = {
  border: "1px solid rgba(255,255,255,0.08)",
  color: "#fff",
  background: "rgba(255,255,255,0.04)",
  borderRadius: "0.75rem",
  padding: "0.625rem 1rem",
  fontSize: "0.875rem",
  outline: "none",
  width: "100%",
};

function fmtDate(unix: number) {
  return new Date(unix * 1000).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function BouncedClient() {
  const [rows, setRows] = useState<BouncedContact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [busy, setBusy] = useState(false);
  const PER_PAGE = 30;

  // Inline email-editing state
  const [editing, setEditing] = useState<string | null>(null); // the original email being edited
  const [draft, setDraft] = useState("");

  async function fetchRows() {
    try {
      setLoading(true);
      const res = await fetch("/api/contacts/bounced");
      if (!res.ok) throw new Error("Failed to fetch bounced contacts");
      setRows(await res.json());
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRows();
  }, []);

  function startEdit(email: string) {
    setError("");
    setSuccess("");
    setEditing(email);
    setDraft(email);
  }

  function cancelEdit() {
    setEditing(null);
    setDraft("");
  }

  async function saveEmail(oldEmail: string) {
    const newEmail = draft.trim().toLowerCase();
    if (!newEmail || newEmail === oldEmail.toLowerCase()) {
      cancelEdit();
      return;
    }
    try {
      setBusy(true);
      setError("");
      setSuccess("");
      const res = await fetch("/api/contacts/bounced", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ oldEmail, newEmail }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update email");
      setSuccess(`Updated to ${newEmail} — they're sendable again.`);
      cancelEdit();
      fetchRows();
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setBusy(false);
    }
  }

  async function release(email: string) {
    if (!confirm(`Release ${email} back to your sendable list without changing the address?\n\nOnly do this if you believe the bounce was temporary — a permanently dead address will just bounce again.`)) return;
    try {
      setBusy(true);
      setError("");
      setSuccess("");
      const res = await fetch("/api/contacts/bounced", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to release contact");
      setSuccess(`Released ${email} — they can be emailed again.`);
      fetchRows();
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setBusy(false);
    }
  }

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(
      (r) =>
        r.email.toLowerCase().includes(q) ||
        (r.name ?? "").toLowerCase().includes(q) ||
        (r.company ?? "").toLowerCase().includes(q) ||
        r.reason.toLowerCase().includes(q)
    );
  }, [rows, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const paged = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);
  useEffect(() => { setPage(1); }, [search]);

  return (
    <div className="flex flex-col gap-6">
      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div style={cardStyle} className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>Bounced / Undeliverable</p>
            <p className="text-3xl font-black mt-2" style={{ fontFamily: "var(--font-heading)", color: "#fbbf24" }}>
              {rows.length}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(234,179,8,0.1)" }}>
            <MailWarning size={18} className="text-amber-400" />
          </div>
        </div>

        <div style={cardStyle} className="flex flex-col justify-center gap-1 sm:col-span-2">
          <p className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>What this is</p>
          <p className="text-xs mt-1 leading-relaxed" style={{ color: "rgba(255,255,255,0.3)" }}>
            These addresses bounced, were blocked, or came back invalid, so they're blocked from future sends.
            If it's just a typo, click <span className="text-white font-semibold">Fix email</span> to correct it — that releases them back to your sendable list automatically.
            Use <span className="text-white font-semibold">Release</span> only if you think the bounce was temporary.
          </p>
        </div>
      </div>

      {/* List */}
      <div style={cardStyle} className="overflow-hidden !p-0">
        <div className="flex items-center justify-between px-6 py-4 flex-wrap gap-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div>
            <p className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>Bounced Contacts</p>
            <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>Fix a wrong address or release a temporary bounce.</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={14} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.3)" }} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name, email, company..."
                style={{ ...inputStyle, padding: "0.5rem 0.75rem 0.5rem 2.2rem", fontSize: "0.8rem", width: "240px" }}
              />
            </div>
            <button
              onClick={fetchRows}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-white/5"
              style={{ border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}
              title="Refresh"
            >
              <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
            </button>
          </div>
        </div>

        {error && <div className="mx-6 mt-4 px-4 py-3 rounded-xl text-xs font-medium" style={{ background: "rgba(230,57,70,0.12)", color: "#f87171", border: "1px solid rgba(230,57,70,0.2)" }}>{error}</div>}
        {success && <div className="mx-6 mt-4 px-4 py-3 rounded-xl text-xs font-medium" style={{ background: "rgba(74,222,128,0.1)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.2)" }}>{success}</div>}

        {loading && rows.length === 0 ? (
          <div className="py-20 text-center text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>Loading bounced contacts...</div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
            {rows.length === 0 ? "No bounced addresses — your list is clean." : "No bounced contacts match your search."}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <th className="text-left px-6 py-3.5 text-xs font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.25)" }}>Contact</th>
                  <th className="text-left px-6 py-3.5 text-xs font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.25)" }}>Email</th>
                  <th className="text-left px-6 py-3.5 text-xs font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.25)" }}>Reason</th>
                  <th className="text-left px-6 py-3.5 text-xs font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.25)" }}>Date</th>
                  <th className="text-right px-6 py-3.5 text-xs font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.25)" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {paged.map((r, i) => {
                  const isEditing = editing === r.email;
                  return (
                    <tr
                      key={r.email}
                      className="transition-colors hover:bg-white/[0.01]"
                      style={{ borderBottom: i < paged.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}
                    >
                      <td className="px-6 py-4">
                        <div className="text-sm font-semibold text-white">{r.name || <span style={{ color: "rgba(255,255,255,0.3)" }}>—</span>}</div>
                        {(r.title || r.company) && (
                          <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>
                            {[r.title, r.company].filter(Boolean).join(" · ")}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {isEditing ? (
                          <input
                            autoFocus
                            value={draft}
                            onChange={(e) => setDraft(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") saveEmail(r.email);
                              if (e.key === "Escape") cancelEdit();
                            }}
                            style={{ ...inputStyle, padding: "0.4rem 0.6rem", fontSize: "0.8rem", width: "260px" }}
                          />
                        ) : (
                          <span className="text-sm" style={{ color: "rgba(255,255,255,0.85)" }}>{r.email}</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className="px-2.5 py-1 rounded-full text-xs font-semibold inline-block max-w-[260px] truncate"
                          style={{ background: "rgba(234,179,8,0.08)", color: "#fbbf24", border: "1px solid rgba(234,179,8,0.15)" }}
                          title={r.reason}
                        >
                          {r.reason}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{fmtDate(r.created_at)}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          {isEditing ? (
                            <>
                              <button
                                onClick={() => saveEmail(r.email)}
                                disabled={busy}
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all hover:scale-[1.03] disabled:opacity-50"
                                style={{ background: "rgba(74,222,128,0.1)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.2)" }}
                              >
                                <Check size={12} /> Save
                              </button>
                              <button
                                onClick={cancelEdit}
                                disabled={busy}
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all hover:scale-[1.03] disabled:opacity-50"
                                style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.08)" }}
                              >
                                <X size={12} /> Cancel
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => startEdit(r.email)}
                                disabled={busy}
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all hover:scale-[1.03] disabled:opacity-50"
                                style={{ background: "rgba(96,165,250,0.1)", color: "#60a5fa", border: "1px solid rgba(96,165,250,0.2)" }}
                                title="Correct a wrong address and release them back to sendable"
                              >
                                <Pencil size={12} /> Fix email
                              </button>
                              <button
                                onClick={() => release(r.email)}
                                disabled={busy}
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all hover:scale-[1.03] disabled:opacity-50"
                                style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.08)" }}
                                title="Remove from suppression without changing the email"
                              >
                                <RotateCcw size={12} /> Release
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <Pagination page={currentPage} total={filtered.length} perPage={PER_PAGE} onPage={setPage} />
          </div>
        )}
      </div>
    </div>
  );
}
