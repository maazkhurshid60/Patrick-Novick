"use client";

// Shared spreadsheet-import flow used by both the Contacts page and the
// Spreadsheet page, so contact importing works exactly the same way in both:
// upload a .csv/.xlsx/.xls → auto-map columns to system fields → optionally
// edit the data → optionally attach to a list → POST to /api/contacts.
//
// The component is self-contained: it renders its own trigger (via renderTrigger,
// or a default button) plus the mapping modal, and reports the result back
// through onImported so the parent can refresh and show a message.

import { useState } from "react";
import { FileText, X, Loader2 } from "lucide-react";

interface ContactList { id: number; name: string; member_count?: number }

// A cell as read from the sheet (SheetJS returns formatted text with raw:false,
// but blanks/numbers can still slip through, so keep it permissive).
type SheetCell = string | number | boolean | null | undefined;

// Just the slice of the SheetJS API this component uses, loaded from a CDN.
interface XLSXLib {
  read: (data: unknown, opts: Record<string, unknown>) => { SheetNames: string[]; Sheets: Record<string, unknown> };
  utils: { sheet_to_json: (ws: unknown, opts: Record<string, unknown>) => SheetCell[][] };
}

export interface ImportSummary { added: number; updated: number; skipped: number; invalid: number }

interface Props {
  lists: ContactList[];
  onImported: (summary: ImportSummary) => void;
  // Preselect this list in the "Add to Contact List" dropdown (e.g. the list the
  // user is currently viewing). Pass null/undefined for "don't add to a list".
  defaultListId?: number | null;
  // Render a custom trigger. `open` launches the file picker; `busy` is true
  // while a file is being read or an import is in flight.
  renderTrigger?: (open: () => void, busy: boolean) => React.ReactNode;
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.6875rem",
  fontWeight: 600,
  color: "rgba(255,255,255,0.35)",
  marginBottom: "0.3rem",
  letterSpacing: "0.04em",
  textTransform: "uppercase",
};

const loadXLSX = (): Promise<XLSXLib> => {
  const w = window as unknown as { XLSX?: XLSXLib };
  if (w.XLSX) return Promise.resolve(w.XLSX);
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js";
    script.onload = () => resolve((window as unknown as { XLSX: XLSXLib }).XLSX);
    script.onerror = (e) => reject(e);
    document.head.appendChild(script);
  });
};

const MAPPABLE_FIELDS = [
  { key: "email", label: "Email Address (primary) *" },
  { key: "first_name", label: "First Name" },
  { key: "last_name", label: "Last Name" },
  { key: "name", label: "Full Name" },
  { key: "title", label: "Title / Role" },
  { key: "company", label: "Company" },
  { key: "business_email", label: "Business Email" },
  { key: "email_2", label: "Personal Email 1" },
  { key: "personal_email_2", label: "Personal Email 2" },
  { key: "phone", label: "Work Phone 1" },
  { key: "work_phone_2", label: "Work Phone 2" },
  { key: "phone_2", label: "Mobile Phone 1" },
  { key: "mobile_phone_2", label: "Mobile Phone 2" },
  { key: "linkedin", label: "LinkedIn URL" },
  { key: "website", label: "Website" },
  { key: "street_address", label: "Work Address" },
  { key: "city", label: "City" },
  { key: "state", label: "State / Province" },
  { key: "zip_code", label: "ZIP / Postal Code" },
  { key: "county", label: "County" },
  { key: "region", label: "Region" },
  { key: "country", label: "Country" },
  { key: "notes", label: "Notes" },
  { key: "segments", label: "Segments" },
];

function autoMapHeader(header: string): string {
  const h = header.toLowerCase().replace(/[^a-z0-9]/g, "");
  // Primary email = business/work email (the campaign send target)
  if (h === "email" || h === "emailaddress" || h === "mail" || h === "workemail" ||
      h === "businessemail" || h === "bizmail" || h === "corporateemail" || h === "companyemail") return "email";
  if (h === "businessemail2" || h === "workemail2") return "business_email";
  // Personal emails
  if (h === "email2" || h === "otheremail" || h === "alternativeemail" || h === "personalemail" || h === "personalemail1") return "email_2";
  if (h === "personalemail2" || h === "otheremail2" || h === "email3") return "personal_email_2";
  if (h === "firstname" || h === "first" || h === "givenname") return "first_name";
  if (h === "lastname" || h === "last" || h === "surname") return "last_name";
  if (h === "name" || h === "fullname" || h === "contact" || h === "contactname") return "name";
  if (h === "title" || h === "role" || h === "position" || h === "jobtitle") return "title";
  if (h === "company" || h === "firm" || h === "organization" || h === "org" || h === "companyname") return "company";
  // Phones — work 1/2 and mobile 1/2
  if (h === "phone" || h === "telephone" || h === "phone1" || h === "workphone" || h === "workphone1" || h === "officephone" || h === "officephone1") return "phone";
  if (h === "workphone2" || h === "officephone2" || h === "telephone2") return "work_phone_2";
  if (h === "phone2" || h === "mobile" || h === "cell" || h === "cellphone" || h === "mobilephone" || h === "mobilephone1" || h === "cellphone1") return "phone_2";
  if (h === "mobilephone2" || h === "cellphone2" || h === "mobile2" || h === "cell2") return "mobile_phone_2";
  if (h === "linkedin" || h === "linkedinurl" || h === "linkedinprofile" || h === "linkedinlink") return "linkedin";
  if (h === "website" || h === "url" || h === "companywebsite" || h === "homepage") return "website";
  if (h === "streetaddress" || h === "street" || h === "address" || h === "address1" || h === "workaddress" || h === "businessaddress" || h === "officeaddress") return "street_address";
  if (h === "city") return "city";
  if (h === "state" || h === "province") return "state";
  if (h === "zipcode" || h === "zip" || h === "postal" || h === "postalcode") return "zip_code";
  if (h === "county") return "county";
  if (h === "region" || h === "territory" || h === "district") return "region";
  if (h === "country") return "country";
  if (h === "notes" || h === "note" || h === "comment" || h === "comments") return "notes";
  if (h === "segments" || h === "segment" || h === "tag" || h === "tags" || h === "list") return "segments";
  return "";
}

export default function ContactImportModal({ lists, onImported, defaultListId, renderTrigger }: Props) {
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState(""); // inline error / status inside the modal

  const [showMapping, setShowMapping] = useState(false);
  const [sheetHeaders, setSheetHeaders] = useState<string[]>([]);
  const [sheetRows, setSheetRows] = useState<SheetCell[][]>([]);
  const [mappings, setMappings] = useState<Record<string, string>>({}); // header -> systemFieldKey
  const [showPreview, setShowPreview] = useState(false); // mapping view vs full data preview

  // List association
  const [selectedListId, setSelectedListId] = useState<number | "new" | "">("");
  const [newListName, setNewListName] = useState("");

  // Launch the file picker via a transient input (no ref needed), then parse.
  function open() {
    setNote("");
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".csv,.xlsx,.xls";
    input.onchange = () => {
      const file = input.files?.[0];
      if (file) handleFile(file);
    };
    input.click();
  }

  async function handleFile(file: File) {
    setNote("");
    setBusy(true);

    try {
      const XLSX = await loadXLSX();
      const reader = new FileReader();
      reader.onload = (evt) => {
        try {
          const ab = evt.target?.result;
          const workbook = XLSX.read(ab, { type: "array", cellText: true, cellDates: true });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          // raw:false → use the displayed/formatted text (keeps phone numbers, ZIP
          // codes and dates as shown instead of coercing to numbers / scientific
          // notation). defval:"" → every row has a cell per column, so values stay
          // aligned to their header even when interior cells are blank.
          const json = XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: false, defval: "", blankrows: false });

          if (json.length === 0) {
            setNote("The spreadsheet appears to be empty.");
            setBusy(false);
            return;
          }

          const rawHeaders = (json[0] ?? []).map((h) => (h ?? "").toString().trim());
          if (rawHeaders.filter(Boolean).length === 0) {
            setNote("No valid columns found in the header row.");
            setBusy(false);
            return;
          }

          // Make every header key unique and non-blank so duplicate or empty
          // column names can be mapped independently (mappings are keyed by header).
          const seen: Record<string, number> = {};
          const uniqueHeaders = rawHeaders.map((h, i) => {
            const base = h || `Column ${i + 1}`;
            if (seen[base] === undefined) { seen[base] = 0; return base; }
            seen[base] += 1;
            return `${base} (${seen[base] + 1})`;
          });

          const rows = json.slice(1);
          setSheetHeaders(uniqueHeaders);
          setSheetRows(rows);

          // Auto-map from the ORIGINAL header text, but key the mapping by the
          // unique header so each column is independent.
          const initialMappings: Record<string, string> = {};
          uniqueHeaders.forEach((label, i) => {
            const match = autoMapHeader(rawHeaders[i]);
            if (match) initialMappings[label] = match;
          });
          setMappings(initialMappings);
          setSelectedListId(defaultListId != null ? defaultListId : "");
          setNewListName("");
          setShowPreview(false);
          setShowMapping(true);
        } catch {
          setNote("Failed to parse sheet data. Please check the file format.");
        } finally {
          setBusy(false);
        }
      };
      reader.readAsArrayBuffer(file);
    } catch {
      setNote("Failed to load spreadsheet parser library.");
      setBusy(false);
    }
  }

  // Edit a single cell value in the Data Preview (committed on blur)
  function updatePreviewCell(rowIdx: number, colIdx: number, value: string) {
    setSheetRows((prev) => {
      const next = prev.map((r) => r.slice());
      while (next[rowIdx].length <= colIdx) next[rowIdx].push("");
      next[rowIdx][colIdx] = value;
      return next;
    });
  }

  function closeModal() {
    setShowMapping(false);
  }

  async function handleImportSpreadsheet() {
    const emailHeader = Object.keys(mappings).find((h) => mappings[h] === "email");
    if (!emailHeader) {
      setNote("Please map at least one column to 'Email Address *'.");
      return;
    }

    setBusy(true);
    setNote("");

    const isValidEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
    const mappedEntries = sheetRows.map((row) => {
      const entry: Record<string, string> = {};
      sheetHeaders.forEach((header, index) => {
        const systemKey = mappings[header];
        if (systemKey && systemKey !== "") {
          const val = row[index];
          entry[systemKey] = val !== undefined && val !== null ? val.toString().trim() : "";
        }
      });
      return entry;
    }).filter((entry) => isValidEmail((entry.email || "").trim()));

    if (mappedEntries.length === 0) {
      setNote("No contacts with valid email addresses were found using the current mapping.");
      setBusy(false);
      return;
    }

    try {
      const payload = {
        contacts: mappedEntries,
        listId: selectedListId && selectedListId !== "new" ? Number(selectedListId) : null,
        newListName: selectedListId === "new" && newListName.trim() ? newListName.trim() : null,
      };
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({} as { error?: string } & Partial<ImportSummary>));
      if (!res.ok) {
        setNote(data.error ?? "Failed to import contacts.");
        setBusy(false);
        return;
      }
      onImported({
        added: data.added ?? 0,
        updated: data.updated ?? 0,
        skipped: data.skipped ?? 0,
        invalid: data.invalid ?? 0,
      });
      setSelectedListId("");
      setNewListName("");
      closeModal();
    } catch {
      setNote("Failed to transmit contact data.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      {renderTrigger ? (
        renderTrigger(open, busy)
      ) : (
        <button
          type="button" disabled={busy} onClick={open}
          className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-full text-sm font-bold transition-all hover:scale-[1.02] disabled:opacity-50"
          style={{ background: "rgba(99,102,241,0.12)", color: "#a5b4fc", border: "1px solid rgba(99,102,241,0.25)", fontFamily: "var(--font-heading)" }}
        >
          {busy ? <Loader2 size={14} className="animate-spin" /> : <FileText size={14} />} Upload Spreadsheet
        </button>
      )}

      {/* Inline error shown near the trigger when there is no modal open yet */}
      {note && !showMapping && (
        <div className="px-4 py-3 rounded-xl text-xs font-medium mt-2" style={{ background: "rgba(230,57,70,0.12)", color: "#f87171", border: "1px solid rgba(230,57,70,0.2)" }}>{note}</div>
      )}

      {/* ── Spreadsheet Field Mapping Modal ───────────────────────────────── */}
      {showMapping && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
        >
          <div
            className="relative w-full flex flex-col"
            style={{ background: "#16181e", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "1.25rem", maxWidth: "1100px", height: "92vh", overflow: "hidden" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* ── Modal header ── */}
            <div className="flex items-center justify-between px-8 py-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", flexShrink: 0 }}>
              <div>
                <p className="text-base font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>Spreadsheet Field Mapping</p>
                <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>
                  {sheetHeaders.length} columns detected · {Object.keys(mappings).length} mapped · {sheetRows.length} rows to import
                </p>
              </div>
              <button onClick={closeModal} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/5" style={{ color: "rgba(255,255,255,0.4)" }}><X size={16} /></button>
            </div>

            {/* ── Scrollable body ── */}
            <div className="flex-1 overflow-y-auto px-8 py-5" style={{ minHeight: 0 }}>

              {/* View toggle: field mapping vs full data preview */}
              <div className="flex items-center gap-1 p-1 rounded-lg mb-4 w-max" style={{ background: "rgba(255,255,255,0.04)" }}>
                <button
                  type="button"
                  onClick={() => setShowPreview(false)}
                  className="px-3 py-1.5 rounded-md text-xs font-semibold transition-colors"
                  style={{ background: !showPreview ? "rgba(230,57,70,0.15)" : "transparent", color: !showPreview ? "#f87171" : "rgba(255,255,255,0.45)" }}
                >
                  Field Mapping
                </button>
                <button
                  type="button"
                  onClick={() => setShowPreview(true)}
                  className="px-3 py-1.5 rounded-md text-xs font-semibold transition-colors"
                  style={{ background: showPreview ? "rgba(230,57,70,0.15)" : "transparent", color: showPreview ? "#f87171" : "rgba(255,255,255,0.45)" }}
                >
                  Data Preview ({sheetRows.length})
                </button>
              </div>

              {/* Full data preview — all columns, multiple rows */}
              {showPreview && (
                <div className="rounded-xl overflow-auto" style={{ border: "1px solid rgba(255,255,255,0.07)", maxHeight: "62vh" }}>
                  <table style={{ borderCollapse: "collapse", width: "100%", minWidth: "max-content" }}>
                    <thead>
                      <tr style={{ position: "sticky", top: 0, background: "#1d2026", zIndex: 1 }}>
                        <th style={{ padding: "0.5rem 0.75rem", textAlign: "left", borderBottom: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.3)", fontSize: "0.6875rem" }}>#</th>
                        {sheetHeaders.map((h, i) => {
                          const mappedKey = mappings[h];
                          return (
                            <th key={i} style={{ padding: "0.5rem 0.75rem", textAlign: "left", borderBottom: "1px solid rgba(255,255,255,0.08)", whiteSpace: "nowrap" }}>
                              <div className="text-xs font-semibold mb-1" style={{ color: mappedKey ? "#fff" : "rgba(255,255,255,0.45)" }}>{h || "(empty)"}</div>
                              <select
                                value={mappedKey ?? ""}
                                onChange={(e) => {
                                  const nm = { ...mappings };
                                  if (e.target.value) nm[h] = e.target.value; else delete nm[h];
                                  setMappings(nm);
                                }}
                                className="h-6 px-1.5 rounded text-[10px] text-white outline-none"
                                style={{ background: mappedKey ? "rgba(230,57,70,0.12)" : "rgba(255,255,255,0.05)", border: mappedKey ? "1px solid rgba(230,57,70,0.3)" : "1px solid rgba(255,255,255,0.1)", maxWidth: 170 }}
                              >
                                <option value="" style={{ background: "#16181e" }}>— Skip —</option>
                                {MAPPABLE_FIELDS.map((f) => (
                                  <option key={f.key} value={f.key} style={{ background: "#16181e" }}>{f.label}</option>
                                ))}
                              </select>
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {sheetRows.slice(0, 200).map((row, rIdx) => (
                        <tr key={rIdx} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                          <td style={{ padding: "0.2rem 0.75rem", color: "rgba(255,255,255,0.25)", fontSize: "0.7rem" }}>{rIdx + 1}</td>
                          {sheetHeaders.map((_, cIdx) => {
                            const v = row[cIdx];
                            return (
                              <td key={cIdx} style={{ padding: "0.15rem 0.3rem" }}>
                                <input
                                  defaultValue={v != null ? v.toString() : ""}
                                  onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(230,57,70,0.45)"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                                  onBlur={(e) => { updatePreviewCell(rIdx, cIdx, e.target.value); e.currentTarget.style.borderColor = "transparent"; e.currentTarget.style.background = "transparent"; }}
                                  style={{ width: "100%", minWidth: 100, background: "transparent", border: "1px solid transparent", borderRadius: 6, color: "rgba(255,255,255,0.72)", fontSize: "0.75rem", padding: "0.3rem 0.45rem", outline: "none" }}
                                />
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {sheetRows.length > 200 && (
                    <p className="px-3 py-2 text-xs" style={{ color: "rgba(255,255,255,0.3)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      Showing first 200 of {sheetRows.length} rows. All {sheetRows.length} will be imported.
                    </p>
                  )}
                </div>
              )}

              {/* Column mapping table */}
              {!showPreview && (
              <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
                {/* Sticky header row */}
                <div className="grid gap-0" style={{ gridTemplateColumns: "2fr 1.4fr 2fr", background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "0.5rem 1rem" }}>
                  <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>Spreadsheet Column</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>Sample Value</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>Map to System Field</p>
                </div>

                {sheetHeaders.map((header, hIdx) => {
                  const sampleVal = sheetRows[0]?.[hIdx];
                  const sample = sampleVal !== undefined && sampleVal !== null ? sampleVal.toString().trim() : "";
                  const isMapped = !!mappings[header];
                  return (
                    <div
                      key={header}
                      className="grid gap-0 items-center"
                      style={{
                        gridTemplateColumns: "2fr 1.4fr 2fr",
                        padding: "0.5rem 1rem",
                        borderBottom: hIdx < sheetHeaders.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                        background: isMapped ? "rgba(230,57,70,0.03)" : "transparent",
                      }}
                    >
                      {/* Column name */}
                      <div className="flex items-center gap-2 pr-4 min-w-0">
                        <div style={{ width: 6, height: 6, borderRadius: "50%", flexShrink: 0, background: isMapped ? "#f87171" : "rgba(255,255,255,0.15)" }} />
                        <span className="text-sm font-medium truncate" style={{ color: isMapped ? "#fff" : "rgba(255,255,255,0.55)" }} title={header}>
                          {header || "(empty)"}
                        </span>
                      </div>

                      {/* Sample value */}
                      <div className="pr-4 min-w-0">
                        <span className="text-xs truncate block" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "monospace" }} title={sample}>
                          {sample || <span style={{ color: "rgba(255,255,255,0.15)" }}>—</span>}
                        </span>
                      </div>

                      {/* Mapping dropdown */}
                      <select
                        value={mappings[header] ?? ""}
                        onChange={(e) => {
                          const newMappings = { ...mappings };
                          if (e.target.value) newMappings[header] = e.target.value;
                          else delete newMappings[header];
                          setMappings(newMappings);
                        }}
                        className="w-full h-8 px-3 rounded-lg text-xs text-white outline-none"
                        style={{
                          background: isMapped ? "rgba(230,57,70,0.1)" : "rgba(255,255,255,0.04)",
                          border: isMapped ? "1px solid rgba(230,57,70,0.25)" : "1px solid rgba(255,255,255,0.08)",
                        }}
                      >
                        <option value="" style={{ background: "#16181e" }}>— Skip Column —</option>
                        {MAPPABLE_FIELDS.map((f) => (
                          <option key={f.key} value={f.key} style={{ background: "#16181e" }}>{f.label}</option>
                        ))}
                      </select>
                    </div>
                  );
                })}
              </div>
              )}

              {/* ── Add to list ── */}
              <div className="mt-6 pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-heading)" }}>Add to Contact List (Optional)</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label style={labelStyle}>Select List</label>
                    <select
                      value={selectedListId}
                      onChange={(e) => {
                        setSelectedListId(e.target.value === "" ? "" : e.target.value === "new" ? "new" : Number(e.target.value));
                        if (e.target.value !== "new") setNewListName("");
                      }}
                      className="h-9 px-3 rounded-lg text-xs text-white outline-none border border-white/10 w-full"
                      style={{ background: "rgba(255,255,255,0.04)" }}
                    >
                      <option value="" style={{ background: "#16181e" }}>— Do Not Add to List —</option>
                      <option value="new" style={{ background: "#16181e" }}>[+ Create New List]</option>
                      {lists.map((l) => (
                        <option key={l.id} value={l.id} style={{ background: "#16181e" }}>{l.name}{l.member_count != null ? ` (${l.member_count} members)` : ""}</option>
                      ))}
                    </select>
                  </div>
                 {selectedListId === "new" && (
                  <div>
                    <label style={labelStyle}>New List Name</label>
                    <input
                      type="text"
                      value={newListName}
                      onChange={(e) => setNewListName(e.target.value)}
                      placeholder="e.g. Imported Contacts"
                      className="h-9 px-3 rounded-lg text-xs text-white outline-none border border-white/10 w-full"
                      style={{ background: "rgba(255,255,255,0.04)" }}
                      required
                    />
                  </div>
                )}
                </div>{/* end grid cols-2 */}
              </div>{/* end add-to-list */}

              {note && (
                <div className="px-4 py-3 rounded-xl text-xs font-medium mt-4" style={{ background: "rgba(230,57,70,0.12)", color: "#f87171", border: "1px solid rgba(230,57,70,0.2)" }}>{note}</div>
              )}
            </div>{/* end scrollable body */}

            {/* ── Sticky footer ── */}
            <div className="flex gap-3 px-8 py-4" style={{ borderTop: "1px solid rgba(255,255,255,0.07)", flexShrink: 0, background: "#16181e" }}>
              <button type="button" onClick={closeModal}
                className="flex-1 px-4 py-2.5 rounded-full text-sm font-bold transition-all hover:bg-white/5"
                style={{ color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.08)", fontFamily: "var(--font-heading)" }}>
                Cancel
              </button>
              <button
                type="button"
                onClick={handleImportSpreadsheet}
                disabled={busy}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold text-white transition-all hover:scale-[1.02] disabled:opacity-50"
                style={{ background: "var(--color-red)", fontFamily: "var(--font-heading)", boxShadow: "0 4px 16px rgba(230,57,70,0.3)" }}
              >
                {busy ? <Loader2 size={14} className="animate-spin" /> : null} Import Mapped Contacts
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
