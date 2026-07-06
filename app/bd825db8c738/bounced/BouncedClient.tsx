"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import { Search, RefreshCw, MailWarning, Pencil, Check, X, RotateCcw, Download, Upload, FileSpreadsheet, Loader2 } from "lucide-react";
import { Pagination } from "../Toast";

/* eslint-disable @typescript-eslint/no-explicit-any */
// Load SheetJS on demand (same CDN the Contacts importer uses) for reading
// uploaded .xlsx/.csv files and for writing the .xlsx export.
const loadXLSX = (): Promise<any> => {
  if (typeof window === "undefined") return Promise.resolve(null);
  if ((window as any).XLSX) return Promise.resolve((window as any).XLSX);
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js";
    script.onload = () => resolve((window as any).XLSX);
    script.onerror = (e) => reject(e);
    document.head.appendChild(script);
  });
};

// Columns our export uses — re-uploads are matched header→field by exact key.
const IMPORT_KEYS = new Set([
  "id", "email", "name", "first_name", "last_name", "title", "company",
  "business_email", "email_2", "personal_email_2",
  "phone", "work_phone_2", "phone_2", "mobile_phone_2",
  "linkedin", "website",
  "street_address", "city", "state", "zip_code", "county", "region", "country",
]);
function headerToKey(header: string): string | null {
  const k = String(header).trim().toLowerCase().replace(/\s+/g, "_");
  return IMPORT_KEYS.has(k) ? k : null;
}

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

  // Export / upload state
  const [exporting, setExporting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function downloadCsv() {
    const a = document.createElement("a");
    a.href = "/api/export/bounced";
    a.click();
  }

  async function downloadExcel() {
    try {
      setExporting(true);
      setError("");
      const XLSX = await loadXLSX();
      const res = await fetch("/api/export/bounced?format=json");
      const data = await res.json();
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Bounced");
      XLSX.writeFile(wb, `bounced-contacts-${new Date().toISOString().slice(0, 10)}.xlsx`);
    } catch (err: any) {
      setError(err.message || "Excel export failed");
    } finally {
      setExporting(false);
    }
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (e.target) e.target.value = "";
    if (!file) return;
    try {
      setUploading(true);
      setError("");
      setSuccess("");
      const XLSX = await loadXLSX();
      const ab = await file.arrayBuffer();
      const wb = XLSX.read(ab, { type: "array", cellText: true, cellDates: true });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const grid = XLSX.utils.sheet_to_json(ws, { header: 1, raw: false, defval: "", blankrows: false }) as any[][];
      if (grid.length < 2) throw new Error("That file has a header row but no data rows.");

      const rawHeaders = grid[0].map((h) => String(h ?? "").trim());
      const keys = rawHeaders.map((h) => headerToKey(h));
      if (!keys.some((k) => k === "id" || k === "email")) {
        throw new Error("Couldn't find an 'id' or 'email' column. Upload the file exported from this page.");
      }

      // Locate the "keep in bounced" signal: a dedicated column, or (for files
      // annotated in the last column) a trailing blank-header column, or a
      // human-written bounce_reason. Any value there = keep the person suppressed.
      const norm = (h: string) => h.toLowerCase().replace(/\s+/g, "_");
      const KEEP_HEADERS = ["keep", "keep_bounced", "do_not_email", "donotemail", "note", "notes", "action"];
      let keepIdx = rawHeaders.findIndex((h) => KEEP_HEADERS.includes(norm(h)));
      if (keepIdx === -1 && rawHeaders.length && rawHeaders[rawHeaders.length - 1] === "") {
        keepIdx = rawHeaders.length - 1; // trailing unnamed column holds the notes
      }
      const reasonIdx = rawHeaders.findIndex((h) => norm(h) === "bounce_reason");
      const isSystemReason = (v: string) => /^(bounced|blocked|invalid)$/i.test(v.trim());

      const uploadRows = grid.slice(1)
        .map((cells) => {
          const o: Record<string, string> = {};
          keys.forEach((k, i) => { if (k) o[k] = cells[i] == null ? "" : String(cells[i]); });
          let keepNote = keepIdx >= 0 ? String(cells[keepIdx] ?? "").trim() : "";
          if (!keepNote && reasonIdx >= 0) {
            const rv = String(cells[reasonIdx] ?? "").trim();
            if (rv && !isSystemReason(rv)) keepNote = rv; // e.g. "Retired"
          }
          if (keepNote) o.__keep = keepNote;
          return o;
        })
        .filter((o) => (o.id && o.id.trim()) || (o.email && o.email.trim()));

      if (uploadRows.length === 0) throw new Error("No rows with an id or email were found.");

      const res = await fetch("/api/contacts/bounced", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rows: uploadRows }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Import failed");
      setSuccess(
        `Applied ${uploadRows.length} row${uploadRows.length === 1 ? "" : "s"}: ` +
        `${data.released} fixed & released · ${data.kept} kept in bounced` +
        (data.invalid ? ` · ${data.invalid} invalid email skipped` : "") +
        (data.notFound ? ` · ${data.notFound} not matched` : "")
      );
      fetchRows();
    } catch (err: any) {
      setError(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  }

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
            Fix one inline with <span className="text-white font-semibold">Fix email</span>, or do a batch:
            <span className="text-white font-semibold"> CSV / Excel</span> downloads every field for review,
            then <span className="text-white font-semibold">Upload fixed file</span> re-applies your edits and releases them back to sendable.
            Blank cells never overwrite existing data, so any updates you&apos;ve already made are safe.
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
              onClick={downloadCsv}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors hover:bg-white/5"
              style={{ border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)" }}
              title="Download all bounced contacts with every field, as CSV"
            >
              <Download size={13} /> CSV
            </button>
            <button
              onClick={downloadExcel}
              disabled={exporting}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors hover:bg-white/5 disabled:opacity-50"
              style={{ border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)" }}
              title="Download all bounced contacts with every field, as Excel (.xlsx)"
            >
              {exporting ? <Loader2 size={13} className="animate-spin" /> : <FileSpreadsheet size={13} />} Excel
            </button>
            <button
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all hover:scale-[1.02] disabled:opacity-50"
              style={{ background: "rgba(74,222,128,0.1)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.2)" }}
              title="Upload your fixed CSV/Excel to update these contacts and release them back to sendable"
            >
              {uploading ? <Loader2 size={13} className="animate-spin" /> : <Upload size={13} />}
              {uploading ? "Applying…" : "Upload fixed file"}
            </button>
            <input
              ref={fileRef}
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleUpload}
              style={{ display: "none" }}
            />
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
