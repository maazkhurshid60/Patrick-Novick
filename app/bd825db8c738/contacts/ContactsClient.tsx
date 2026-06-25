"use client";
import { useState, useEffect, FormEvent, useRef, useCallback, useMemo } from "react";
import {
  Trash2, Plus, Upload, Users, FileText, UserMinus, UserCheck,
  ShieldCheck, Pencil, Download, X, Phone, MapPin, Tag, StickyNote,
  ChevronRight, Mail, Building2, User, Star, Send, Eye, Settings2, Search,
} from "lucide-react";
import { ToastProvider, toast, Spinner } from "../Toast";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Contact {
  id: number;
  email: string;
  name: string;
  first_name: string;
  last_name: string;
  title: string;
  company: string;
  phone: string;
  phone_2: string;
  work_phone_2: string;
  mobile_phone_2: string;
  business_email: string;
  email_2: string;
  personal_email_2: string;
  linkedin: string;
  website: string;
  street_address: string;
  city: string;
  state: string;
  zip_code: string;
  county: string;
  region: string;
  country: string;
  notes: string;
  segments: string;
  custom_fields: string;
  status: string;
  tags: string;
  campaigns_sent: number;
  created_at: number;
  lists?: string | null;
}

interface ActivityEntry {
  campaign_id: number;
  subject: string;
  sent_at: number;
  opened: boolean;
}

interface ContactList {
  id: number;
  name: string;
  member_count: number;
}


// ─── Style tokens ─────────────────────────────────────────────────────────────

const card = {
  background: "#1a1d23",
  border: "1px solid rgba(255,255,255,0.06)",
  borderRadius: "1rem",
  padding: "1.5rem",
} as const;

const inp = {
  border: "1px solid rgba(255,255,255,0.08)",
  color: "#fff",
  background: "rgba(255,255,255,0.04)",
  borderRadius: "0.625rem",
  padding: "0.5rem 0.75rem",
  fontSize: "0.8125rem",
  outline: "none",
  width: "100%",
} as const;

const label = {
  display: "block",
  fontSize: "0.6875rem",
  fontWeight: 600,
  color: "rgba(255,255,255,0.35)",
  marginBottom: "0.3rem",
  letterSpacing: "0.04em",
  textTransform: "uppercase" as const,
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function initials(c: Contact) {
  const fn = c.first_name || c.name.split(" ")[0] || c.email[0];
  const ln = c.last_name  || c.name.split(" ")[1] || "";
  return (fn[0] + (ln[0] ?? "")).toUpperCase();
}

function displayName(c: Contact) {
  if (c.first_name || c.last_name) return [c.first_name, c.last_name].filter(Boolean).join(" ");
  return c.name || c.email;
}

function hasAddress(c: Contact) {
  return !!(c.street_address && c.city && c.state);
}

// ─── Blank form state ─────────────────────────────────────────────────────────

const BLANK = {
  first_name: "", last_name: "", email: "", title: "", company: "",
  phone: "", phone_2: "", work_phone_2: "", mobile_phone_2: "",
  business_email: "", email_2: "", personal_email_2: "",
  linkedin: "", website: "",
  street_address: "", city: "", state: "", zip_code: "", county: "", region: "",
  country: "US", notes: "", segments: "",
};

// ─── Section header ───────────────────────────────────────────────────────────

function SectionLabel({ icon: Icon, label: txt }: { icon: React.ElementType; label: string }) {
  return (
    <div className="flex items-center gap-1.5 mb-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "0.5rem" }}>
      <Icon size={12} style={{ color: "rgba(255,255,255,0.3)" }} />
      <span style={{ fontSize: "0.6875rem", fontWeight: 700, color: "rgba(255,255,255,0.3)", letterSpacing: "0.06em", textTransform: "uppercase" }}>{txt}</span>
    </div>
  );
}

// ─── Field pair ───────────────────────────────────────────────────────────────

function Field({ label: lbl, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={label}>{lbl}</label>
      {children}
    </div>
  );
}

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

// ─── Main component ───────────────────────────────────────────────────────────

export default function ContactsClient() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState("");
  const [success, setSuccess] = useState("");

  // Contact list search & filter
  const [contactSearch, setContactSearch] = useState("");
  const [contactStatusFilter, setContactStatusFilter] = useState<"all" | "active" | "unsubscribed" | "invalid">("all");

  // Add modal
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ ...BLANK });

  // Bulk import
  const [bulk, setBulk] = useState("");

  // Detail drawer
  const [drawer, setDrawer] = useState<Contact | null>(null);
  const [editForm, setEditForm] = useState({ ...BLANK, email: "" });
  const [activity, setActivity] = useState<ActivityEntry[]>([]);
  const [mailingCount, setMailingCount] = useState<number | null>(null);
  const [segmentFilter, setSegmentFilter] = useState("");

  // Spreadsheet mapping states
  const [showMapping, setShowMapping] = useState(false);
  const [sheetHeaders, setSheetHeaders] = useState<string[]>([]);
  const [sheetRows, setSheetRows] = useState<any[][]>([]);
  const [mappings, setMappings] = useState<Record<string, string>>({}); // header -> systemFieldKey
  const [showPreview, setShowPreview] = useState(false); // mapping view vs full data preview
  const sheetRef = useRef<HTMLInputElement>(null);

  // Import list association states
  const [allLists, setAllLists] = useState<ContactList[]>([]);
  const [selectedListId, setSelectedListId] = useState<number | "new" | "">("");
  const [newListName, setNewListName] = useState("");

  // ── Fetch ──────────────────────────────────────────────────────────────────

  const fetchContacts = useCallback(async () => {
    const res = await fetch("/api/contacts");
    const data = await res.json();
    setContacts(data);
    setMailingCount(data.filter(hasAddress).length);
  }, []);

  const fetchAllLists = useCallback(async () => {
    const res = await fetch("/api/lists");
    if (res.ok) {
      setAllLists(await res.json());
    }
  }, []);

  useEffect(() => {
    fetchContacts();
    fetchAllLists();
  }, [fetchContacts, fetchAllLists]);


  // ── Activity history for a contact ────────────────────────────────────────

  async function fetchActivity(email: string) {
    const res = await fetch(`/api/contacts/activity?email=${encodeURIComponent(email)}`);
    if (res.ok) setActivity(await res.json());
    else setActivity([]);
  }

  function openDrawer(c: Contact) {
    setDrawer(c);
    setEditForm({
      first_name: c.first_name || c.name.split(" ")[0] || "",
      last_name:  c.last_name  || c.name.split(" ").slice(1).join(" ") || "",
      email:      c.email,
      title:      c.title,
      company:    c.company,
      phone:      c.phone,
      phone_2:    c.phone_2,
      work_phone_2:   c.work_phone_2 || "",
      mobile_phone_2: c.mobile_phone_2 || "",
      business_email: c.business_email || "",
      email_2:    c.email_2 || "",
      personal_email_2: c.personal_email_2 || "",
      linkedin:   c.linkedin || "",
      website:    c.website || "",
      street_address: c.street_address,
      city:       c.city,
      state:      c.state,
      zip_code:   c.zip_code,
      county:     c.county || "",
      region:     c.region || "",
      country:    c.country || "US",
      notes:      c.notes,
      segments:   c.segments,
    });
    fetchActivity(c.email);
  }

  // ── Add contact ───────────────────────────────────────────────────────────

  async function handleAdd(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok) toast.error(data.error ?? "Failed to add contact");
    else {
      toast.success(`Contact added`);
      setForm({ ...BLANK });
      setShowAdd(false);
      fetchContacts();
    }
    setLoading(false);
  }

  // ── Bulk import ───────────────────────────────────────────────────────────

  async function handleBulk(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    const entries = bulk.split("\n").map((line) => {
      line = line.trim();
      const match = line.match(/^(.+?)\s*<(.+?)>$/);
      if (match) return { name: match[1].trim(), email: match[2].trim() };
      return { email: line, name: "" };
    }).filter((e) => e.email.includes("@"));

    const res = await fetch("/api/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(entries),
    });
    const data = await res.json();
    if (!res.ok) toast.error(data.error ?? "Failed");
    else {
      toast.success(`Added ${data.added} contacts${data.skipped ? `, skipped ${data.skipped} suppressed` : ""}`);
      setBulk(""); fetchContacts();
    }
    setLoading(false);
  }

  // ── Spreadsheet upload & mapping ──────────────────────────────────────────

  async function handleSpreadsheetSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(""); setSuccess(""); setLoading(true);

    try {
      const XLSX = await loadXLSX();
      const reader = new FileReader();
      reader.onload = (evt) => {
        try {
          const ab = evt.target?.result;
          const workbook = XLSX.read(ab, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];

          if (json.length === 0) {
            setError("The spreadsheet appears to be empty.");
            setLoading(false);
            return;
          }

          const rawHeaders = (json[0] ?? []).map((h) => (h ?? "").toString().trim());
          if (rawHeaders.filter(Boolean).length === 0) {
            setError("No valid columns found in the header row.");
            setLoading(false);
            return;
          }

          const rows = json.slice(1);
          setSheetHeaders(rawHeaders);
          setSheetRows(rows);

          const initialMappings: Record<string, string> = {};
          rawHeaders.forEach((h) => {
            if (h) {
              const match = autoMapHeader(h);
              if (match) initialMappings[h] = match;
            }
          });
          setMappings(initialMappings);
          setShowPreview(false);
          setShowMapping(true);
        } catch (err) {
          setError("Failed to parse sheet data. Please check the file format.");
        } finally {
          setLoading(false);
        }
      };
      reader.readAsArrayBuffer(file);
    } catch (err) {
      setError("Failed to load spreadsheet parser library.");
      setLoading(false);
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

  async function handleImportSpreadsheet() {
    const emailHeader = Object.keys(mappings).find((h) => mappings[h] === "email");
    if (!emailHeader) {
      alert("Please map at least one column to 'Email Address *'.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    const mappedEntries = sheetRows.map((row) => {
      const entry: Record<string, any> = {};
      sheetHeaders.forEach((header, index) => {
        const systemKey = mappings[header];
        if (systemKey && systemKey !== "") {
          const val = row[index];
          entry[systemKey] = val !== undefined && val !== null ? val.toString().trim() : "";
        }
      });
      return entry;
    }).filter((entry) => entry.email && entry.email.includes("@"));

    if (mappedEntries.length === 0) {
      setError("No contacts with valid email addresses were found using the current mapping.");
      setLoading(false);
      setShowMapping(false);
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
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error ?? "Failed to import contacts.");
      } else {
        toast.success(`Imported ${data.added} of ${mappedEntries.length} contacts`);
        fetchContacts();
        fetchAllLists();
      }
    } catch (err) {
      toast.error("Failed to transmit contact data.");
    } finally {
      setLoading(false);
      setShowMapping(false);
      setSelectedListId("");
      setNewListName("");
      if (sheetRef.current) sheetRef.current.value = "";
    }
  }

  // ── Save drawer edits ─────────────────────────────────────────────────────

  async function handleSaveDrawer() {
    if (!drawer) return;
    setLoading(true);
    const res = await fetch("/api/contacts", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: drawer.id, ...editForm }),
    });
    const data = await res.json();
    if (!res.ok) toast.error(data.error ?? "Update failed");
    else { toast.success("Contact updated"); fetchContacts(); setDrawer(null); }
    setLoading(false);
  }

  // ── Delete / toggle ───────────────────────────────────────────────────────

  async function handleDelete(id: number) {
    await fetch("/api/contacts", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    toast.success("Contact deleted");
    setDrawer(null);
    fetchContacts();
  }

  async function handleToggleStatus(id: number, current: string) {
    const status = current === "unsubscribed" ? "active" : "unsubscribed";
    await fetch("/api/contacts", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status }) });
    fetchContacts();
    if (drawer?.id === id) setDrawer((d) => d ? { ...d, status } : null);
  }

  // ── Validate ──────────────────────────────────────────────────────────────

  async function handleValidate() {
    if (!confirm("Check all active contacts for valid email domains? This may take a minute.")) return;
    setLoading(true);
    const loadId = toast.loading("Validating email addresses…");
    const res = await fetch("/api/contacts/validate", { method: "POST" });
    const data = await res.json();
    toast.success(`Checked ${data.checked} — ${data.valid} valid, ${data.invalid} marked invalid`);
    fetchContacts(); setLoading(false);
  }

  function triggerDownload(url: string) {
    const a = document.createElement("a"); a.href = url; a.click();
  }

  const activeCount = contacts.filter((c) => c.status === "active" || !c.status).length;

  // Filtered contacts (client-side, instant)
  const filteredContacts = useMemo(() => {
    const q = contactSearch.toLowerCase().trim();
    return contacts.filter((c) => {
      if (contactStatusFilter === "active" && c.status !== "active" && c.status) return false;
      if (contactStatusFilter === "unsubscribed" && c.status !== "unsubscribed") return false;
      if (contactStatusFilter === "invalid" && c.status !== "invalid") return false;
      if (!q) return true;
      return (
        c.email.toLowerCase().includes(q) ||
        (c.name || "").toLowerCase().includes(q) ||
        (c.first_name || "").toLowerCase().includes(q) ||
        (c.last_name || "").toLowerCase().includes(q) ||
        (c.company || "").toLowerCase().includes(q) ||
        (c.title || "").toLowerCase().includes(q) ||
        (c.city || "").toLowerCase().includes(q) ||
        (c.zip_code || "").toLowerCase().includes(q) ||
        (c.phone || "").toLowerCase().includes(q)
      );
    });
  }, [contacts, contactSearch, contactStatusFilter]);

  // ─────────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <>
      <ToastProvider />
      {/* ── Spreadsheet Field Mapping Modal ───────────────────────────────── */}
      {showMapping && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowMapping(false); }}
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
              <button onClick={() => setShowMapping(false)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/5" style={{ color: "rgba(255,255,255,0.4)" }}><X size={16} /></button>
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
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label style={label}>Select List</label>
                    <select
                      value={selectedListId}
                      onChange={(e) => {
                        setSelectedListId(e.target.value as any);
                        if (e.target.value !== "new") setNewListName("");
                      }}
                      className="h-9 px-3 rounded-lg text-xs text-white outline-none border border-white/10 w-full"
                      style={{ background: "rgba(255,255,255,0.04)" }}
                    >
                      <option value="" style={{ background: "#16181e" }}>— Do Not Add to List —</option>
                      <option value="new" style={{ background: "#16181e" }}>[+ Create New List]</option>
                      {allLists.map((l) => (
                        <option key={l.id} value={l.id} style={{ background: "#16181e" }}>{l.name} ({l.member_count} members)</option>
                      ))}
                    </select>
                  </div>
                 {selectedListId === "new" && (
                  <div>
                    <label style={label}>New List Name</label>
                    <input
                      type="text"
                      value={newListName}
                      onChange={(e) => setNewListName(e.target.value)}
                      placeholder="e.g. Imported Contacts - Jun 23"
                      className="h-9 px-3 rounded-lg text-xs text-white outline-none border border-white/10 w-full"
                      style={{ background: "rgba(255,255,255,0.04)" }}
                      required
                    />
                  </div>
                )}
                </div>{/* end grid cols-2 */}
              </div>{/* end add-to-list */}
            </div>{/* end scrollable body */}

            {/* ── Sticky footer ── */}
            <div className="flex gap-3 px-8 py-4" style={{ borderTop: "1px solid rgba(255,255,255,0.07)", flexShrink: 0, background: "#16181e" }}>
              <button type="button" onClick={() => setShowMapping(false)}
                className="flex-1 px-4 py-2.5 rounded-full text-sm font-bold transition-all hover:bg-white/5"
                style={{ color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.08)", fontFamily: "var(--font-heading)" }}>
                Cancel
              </button>
              <button
                type="button"
                onClick={handleImportSpreadsheet}
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold text-white transition-all hover:scale-[1.02] disabled:opacity-50"
                style={{ background: "var(--color-red)", fontFamily: "var(--font-heading)", boxShadow: "0 4px 16px rgba(230,57,70,0.3)" }}
              >
                Import Mapped Contacts
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Add Contact Modal ─────────────────────────────────────────────── */}
      {showAdd && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowAdd(false); }}
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            style={{ background: "#16181e", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "1.25rem", padding: "2rem" }}
          >
            <div className="flex items-center justify-between mb-6">
              <p className="text-base font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>Add Contact</p>
              <button onClick={() => setShowAdd(false)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/5" style={{ color: "rgba(255,255,255,0.4)" }}><X size={16} /></button>
            </div>

            <form onSubmit={handleAdd} className="flex flex-col gap-5">

              {/* Identity */}
              <div>
                <SectionLabel icon={User} label="Identity" />
                <div className="grid grid-cols-2 gap-3">
                  <Field label="First Name"><input style={inp} value={form.first_name} onChange={(e) => setForm({ ...form, first_name: e.target.value })} placeholder="John" /></Field>
                  <Field label="Last Name"><input style={inp} value={form.last_name} onChange={(e) => setForm({ ...form, last_name: e.target.value })} placeholder="Smith" /></Field>
                  <Field label="Title / Role"><input style={inp} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="VP of Marketing" /></Field>
                  <Field label="Company"><input style={inp} value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Acme Corp" /></Field>
                </div>
              </div>

              {/* Contact */}
              <div>
                <SectionLabel icon={Mail} label="Contact" />
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Email Address (primary) *"><input style={inp} type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="john@acme.com" /></Field>
                  <Field label="Business Email"><input style={inp} type="email" value={form.business_email} onChange={(e) => setForm({ ...form, business_email: e.target.value })} placeholder="j.smith@work.com" /></Field>
                  <Field label="Personal Email 1"><input style={inp} type="email" value={form.email_2} onChange={(e) => setForm({ ...form, email_2: e.target.value })} placeholder="personal@gmail.com" /></Field>
                  <Field label="Personal Email 2"><input style={inp} type="email" value={form.personal_email_2} onChange={(e) => setForm({ ...form, personal_email_2: e.target.value })} placeholder="personal2@gmail.com" /></Field>
                  <Field label="Work Phone 1"><input style={inp} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+1 555-000-0000" /></Field>
                  <Field label="Work Phone 2"><input style={inp} value={form.work_phone_2} onChange={(e) => setForm({ ...form, work_phone_2: e.target.value })} placeholder="+1 555-000-0002" /></Field>
                  <Field label="Mobile Phone 1"><input style={inp} value={form.phone_2} onChange={(e) => setForm({ ...form, phone_2: e.target.value })} placeholder="+1 555-000-0001" /></Field>
                  <Field label="Mobile Phone 2"><input style={inp} value={form.mobile_phone_2} onChange={(e) => setForm({ ...form, mobile_phone_2: e.target.value })} placeholder="+1 555-000-0003" /></Field>
                  <Field label="LinkedIn URL"><input style={inp} value={form.linkedin} onChange={(e) => setForm({ ...form, linkedin: e.target.value })} placeholder="linkedin.com/in/jsmith" /></Field>
                  <Field label="Website"><input style={inp} value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} placeholder="https://acme.com" /></Field>
                </div>
              </div>

              {/* Address */}
              <div>
                <SectionLabel icon={MapPin} label="Mailing Address" />
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <Field label="Work Address"><input style={inp} value={form.street_address} onChange={(e) => setForm({ ...form, street_address: e.target.value })} placeholder="123 Main St" /></Field>
                  </div>
                  <Field label="City"><input style={inp} value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="New York" /></Field>
                  <Field label="State / Province"><input style={inp} value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} placeholder="NY" /></Field>
                  <Field label="ZIP / Postal Code"><input style={inp} value={form.zip_code} onChange={(e) => setForm({ ...form, zip_code: e.target.value })} placeholder="10001" /></Field>
                  <Field label="Country"><input style={inp} value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} placeholder="US" /></Field>
                  <Field label="County"><input style={inp} value={form.county} onChange={(e) => setForm({ ...form, county: e.target.value })} placeholder="Kings County" /></Field>
                  <Field label="Region"><input style={inp} value={form.region} onChange={(e) => setForm({ ...form, region: e.target.value })} placeholder="Northeast" /></Field>
                </div>
              </div>

              {/* More */}
              <div>
                <SectionLabel icon={StickyNote} label="Notes & Segments" />
                <div className="flex flex-col gap-3">
                  <Field label="Marketing Segments (comma-separated)"><input style={inp} value={form.segments} onChange={(e) => setForm({ ...form, segments: e.target.value })} placeholder="Healthcare, Newsletter, VIP" /></Field>
                  <Field label="Notes"><textarea style={{ ...inp, minHeight: "80px", resize: "vertical" }} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Any notes about this contact…" /></Field>
                </div>
              </div>

              {error && <div className="px-4 py-3 rounded-xl text-xs font-medium" style={{ background: "rgba(230,57,70,0.12)", color: "#f87171", border: "1px solid rgba(230,57,70,0.2)" }}>{error}</div>}

              <div className="flex gap-3 pt-1">
                <button type="button" onClick={() => setShowAdd(false)} className="flex-1 px-4 py-2.5 rounded-full text-sm font-bold transition-all hover:bg-white/5" style={{ color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.08)", fontFamily: "var(--font-heading)" }}>Cancel</button>
                <button type="submit" disabled={loading} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold text-white transition-all hover:scale-[1.02] disabled:opacity-50" style={{ background: "var(--color-red)", fontFamily: "var(--font-heading)", boxShadow: "0 4px 16px rgba(230,57,70,0.3)" }}>
                {loading ? <Spinner size={14} /> : <Plus size={14} />} Add Contact
              </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Detail / Edit Drawer ──────────────────────────────────────────── */}
      {drawer && (
        <div
          className="fixed inset-0 z-50 flex justify-end"
          style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setDrawer(null); }}
        >
          <div
            className="h-full w-full max-w-lg overflow-y-auto flex flex-col"
            style={{ background: "#16181e", borderLeft: "1px solid rgba(255,255,255,0.08)" }}
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: "rgba(230,57,70,0.15)", color: "#f87171" }}>
                  {initials(drawer)}
                </div>
                <div>
                  <p className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>{displayName(drawer)}</p>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{drawer.email}</p>
                </div>
              </div>
              <button onClick={() => setDrawer(null)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/5" style={{ color: "rgba(255,255,255,0.4)" }}><X size={16} /></button>
            </div>

            {/* Status badges */}
            <div className="flex items-center gap-2 px-6 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              {(drawer.status === "active" || !drawer.status) && <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: "rgba(74,222,128,0.1)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.2)" }}>Active</span>}
              {drawer.status === "unsubscribed" && <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: "rgba(230,57,70,0.1)", color: "#f87171" }}>Unsubscribed</span>}
              {drawer.status === "invalid" && <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: "rgba(234,179,8,0.1)", color: "#fbbf24" }}>Invalid</span>}
              {drawer.tags?.includes("test_seed") && <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ background: "rgba(20,184,166,0.15)", color: "#2dd4bf", border: "1px solid rgba(20,184,166,0.25)" }}>SEED</span>}
              {Number(drawer.campaigns_sent) > 0 && <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: "rgba(74,222,128,0.08)", color: "#4ade80" }}>Sent ×{drawer.campaigns_sent}</span>}
              {drawer.lists && <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: "rgba(168,85,247,0.1)", color: "#c084fc", border: "1px solid rgba(168,85,247,0.2)" }}>Lists: {drawer.lists}</span>}
              <div className="ml-auto flex items-center gap-1.5">
                {drawer.status !== "invalid" && (
                  <button onClick={() => handleToggleStatus(drawer.id, drawer.status)} className="text-xs px-2.5 py-1 rounded-full font-semibold transition-all hover:scale-[1.02]" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    {drawer.status === "unsubscribed" ? <><UserCheck size={10} className="inline mr-1" />Reactivate</> : <><UserMinus size={10} className="inline mr-1" />Unsubscribe</>}
                  </button>
                )}
                <button onClick={() => { if (confirm("Delete this contact?")) handleDelete(drawer.id); }} className="text-xs px-2.5 py-1 rounded-full font-semibold transition-all hover:scale-[1.02]" style={{ background: "rgba(230,57,70,0.08)", color: "#f87171", border: "1px solid rgba(230,57,70,0.15)" }}>
                  <Trash2 size={10} className="inline mr-1" />Delete
                </button>
              </div>
            </div>

            {/* Edit form */}
            <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-5">

              <div>
                <SectionLabel icon={User} label="Identity" />
                <div className="grid grid-cols-2 gap-3">
                  <Field label="First Name"><input style={inp} value={editForm.first_name} onChange={(e) => setEditForm({ ...editForm, first_name: e.target.value })} /></Field>
                  <Field label="Last Name"><input style={inp} value={editForm.last_name} onChange={(e) => setEditForm({ ...editForm, last_name: e.target.value })} /></Field>
                  <Field label="Title"><input style={inp} value={editForm.title} onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} /></Field>
                  <Field label="Company"><input style={inp} value={editForm.company} onChange={(e) => setEditForm({ ...editForm, company: e.target.value })} /></Field>
                </div>
              </div>

              <div>
                <SectionLabel icon={Mail} label="Contact" />
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <Field label="Email Address"><input style={inp} type="email" value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} /></Field>
                  </div>
                  <Field label="Business Email"><input style={inp} type="email" value={editForm.business_email} onChange={(e) => setEditForm({ ...editForm, business_email: e.target.value })} placeholder="j.smith@work.com" /></Field>
                  <Field label="Personal Email 1"><input style={inp} type="email" value={editForm.email_2} onChange={(e) => setEditForm({ ...editForm, email_2: e.target.value })} placeholder="personal@gmail.com" /></Field>
                  <Field label="Personal Email 2"><input style={inp} type="email" value={editForm.personal_email_2} onChange={(e) => setEditForm({ ...editForm, personal_email_2: e.target.value })} placeholder="personal2@gmail.com" /></Field>
                  <Field label="Work Phone 1"><input style={inp} value={editForm.phone} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} placeholder="+1 555-000-0000" /></Field>
                  <Field label="Work Phone 2"><input style={inp} value={editForm.work_phone_2} onChange={(e) => setEditForm({ ...editForm, work_phone_2: e.target.value })} placeholder="+1 555-000-0002" /></Field>
                  <Field label="Mobile Phone 1"><input style={inp} value={editForm.phone_2} onChange={(e) => setEditForm({ ...editForm, phone_2: e.target.value })} placeholder="+1 555-000-0001" /></Field>
                  <Field label="Mobile Phone 2"><input style={inp} value={editForm.mobile_phone_2} onChange={(e) => setEditForm({ ...editForm, mobile_phone_2: e.target.value })} placeholder="+1 555-000-0003" /></Field>
                  <Field label="LinkedIn URL"><input style={inp} value={editForm.linkedin} onChange={(e) => setEditForm({ ...editForm, linkedin: e.target.value })} placeholder="linkedin.com/in/jsmith" /></Field>
                  <Field label="Website"><input style={inp} value={editForm.website} onChange={(e) => setEditForm({ ...editForm, website: e.target.value })} placeholder="https://acme.com" /></Field>
                </div>
              </div>

              <div>
                <SectionLabel icon={MapPin} label="Mailing Address" />
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <Field label="Work Address"><input style={inp} value={editForm.street_address} onChange={(e) => setEditForm({ ...editForm, street_address: e.target.value })} placeholder="123 Main St" /></Field>
                  </div>
                  <Field label="City"><input style={inp} value={editForm.city} onChange={(e) => setEditForm({ ...editForm, city: e.target.value })} /></Field>
                  <Field label="State / Province"><input style={inp} value={editForm.state} onChange={(e) => setEditForm({ ...editForm, state: e.target.value })} /></Field>
                  <Field label="ZIP / Postal Code"><input style={inp} value={editForm.zip_code} onChange={(e) => setEditForm({ ...editForm, zip_code: e.target.value })} /></Field>
                  <Field label="Country"><input style={inp} value={editForm.country} onChange={(e) => setEditForm({ ...editForm, country: e.target.value })} /></Field>
                  <Field label="County"><input style={inp} value={editForm.county} onChange={(e) => setEditForm({ ...editForm, county: e.target.value })} placeholder="Kings County" /></Field>
                  <Field label="Region"><input style={inp} value={editForm.region} onChange={(e) => setEditForm({ ...editForm, region: e.target.value })} placeholder="Northeast" /></Field>
                </div>
              </div>

              {/* Mailing label preview */}
              {(editForm.street_address && editForm.city && editForm.state) && (
                <div style={{ background: "rgba(255,255,255,0.03)", border: "1px dashed rgba(255,255,255,0.1)", borderRadius: "0.75rem", padding: "1rem" }}>
                  <p className="text-xs font-semibold mb-2" style={{ color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.05em" }}><MapPin size={10} className="inline mr-1" />Mailing Label Preview</p>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.7)", fontFamily: "monospace", lineHeight: 1.6 }}>
                    {[editForm.first_name, editForm.last_name].filter(Boolean).join(" ") || "—"}<br />
                    {editForm.company && <>{editForm.company}<br /></>}
                    {editForm.street_address}<br />
                    {editForm.city}, {editForm.state} {editForm.zip_code}<br />
                    {editForm.country !== "US" ? editForm.country : ""}
                  </p>
                </div>
              )}

              <div>
                <SectionLabel icon={Tag} label="Marketing Segments" />
                <Field label="Segments (comma-separated)">
                  <input style={inp} value={editForm.segments} onChange={(e) => setEditForm({ ...editForm, segments: e.target.value })} placeholder="Healthcare, Newsletter, VIP" />
                </Field>
                {editForm.segments && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {editForm.segments.split(",").map((s) => s.trim()).filter(Boolean).map((seg) => (
                      <span key={seg} className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "rgba(99,102,241,0.12)", color: "#a5b4fc", border: "1px solid rgba(99,102,241,0.2)" }}>{seg}</span>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <SectionLabel icon={StickyNote} label="Notes" />
                <textarea style={{ ...inp, minHeight: "90px", resize: "vertical" }} value={editForm.notes} onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })} placeholder="Notes about this contact…" />
              </div>

              {/* Email Activity History */}
              <div>
                <SectionLabel icon={Send} label="Email Activity History" />
                {activity.length === 0 ? (
                  <p className="text-xs py-2" style={{ color: "rgba(255,255,255,0.25)" }}>No campaigns sent to this contact yet.</p>
                ) : (
                  <div className="flex flex-col gap-2">
                    {activity.map((a) => (
                      <div key={a.campaign_id} className="flex items-center gap-3 px-3 py-2 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: a.opened ? "rgba(74,222,128,0.1)" : "rgba(255,255,255,0.05)" }}>
                          {a.opened ? <Eye size={12} style={{ color: "#4ade80" }} /> : <Send size={12} style={{ color: "rgba(255,255,255,0.3)" }} />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium truncate" style={{ color: "rgba(255,255,255,0.7)" }}>{a.subject}</p>
                          <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>{new Date(a.sent_at * 1000).toLocaleDateString()}{a.opened ? " · Opened" : ""}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Save bar */}
            <div className="px-6 py-4 flex gap-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <button onClick={() => setDrawer(null)} className="flex-1 px-4 py-2.5 rounded-full text-sm font-bold transition-all hover:bg-white/5" style={{ color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.08)", fontFamily: "var(--font-heading)" }}>Cancel</button>
            <button onClick={handleSaveDrawer} disabled={loading} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold text-white transition-all hover:scale-[1.02] disabled:opacity-50" style={{ background: "var(--color-red)", fontFamily: "var(--font-heading)", boxShadow: "0 4px 16px rgba(230,57,70,0.3)" }}>
              {loading ? <Spinner size={14} /> : null} Save Changes
            </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Main layout ───────────────────────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-5">

        {/* Left: forms */}
        <div className="col-span-1 flex flex-col gap-4">

          {/* Add button */}
          <button
            onClick={() => { setShowAdd(true); setError(""); setSuccess(""); }}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold text-white transition-all hover:scale-[1.02]"
            style={{ background: "var(--color-red)", fontFamily: "var(--font-heading)", boxShadow: "0 4px 16px rgba(230,57,70,0.28)" }}
          >
            <Plus size={15} /> Add Contact
          </button>

          {/* Bulk */}
          <div style={card}>
            <p className="text-sm font-bold text-white mb-1" style={{ fontFamily: "var(--font-heading)" }}>Bulk Import</p>
            <p className="text-xs mb-3" style={{ color: "rgba(255,255,255,0.35)" }}>
              One per line: <code style={{ background: "rgba(255,255,255,0.07)", padding: "1px 5px", borderRadius: 4 }}>Name &lt;email&gt;</code> or just email
            </p>
            <form onSubmit={handleBulk} className="flex flex-col gap-3">
              <textarea
                style={{ ...inp, minHeight: "110px", resize: "vertical", fontFamily: "monospace", fontSize: "0.78rem" }}
                placeholder={"John Smith <john@firm.com>\njane@firm.com"}
                value={bulk}
                onChange={(e) => setBulk(e.target.value)}
              />
              <button
                type="submit" disabled={loading}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold transition-all hover:scale-[1.02] disabled:opacity-50"
                style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-heading)" }}
              >
                <Upload size={14} /> Import All
              </button>
            </form>

            {/* Spreadsheet (CSV & Excel) Upload */}
            <div className="mt-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <p className="text-xs mb-2" style={{ color: "rgba(255,255,255,0.35)" }}>
                Or upload a spreadsheet (<strong style={{ color: "rgba(255,255,255,0.5)" }}>.csv, .xlsx, .xls</strong>) with column field mapping
              </p>
              <input ref={sheetRef} type="file" accept=".csv,.xlsx,.xls" onChange={handleSpreadsheetSelect} disabled={loading} style={{ display: "none" }} />
              <button
                type="button" disabled={loading} onClick={() => sheetRef.current?.click()}
                className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-full text-sm font-bold transition-all hover:scale-[1.02] disabled:opacity-50"
                style={{ background: "rgba(99,102,241,0.12)", color: "#a5b4fc", border: "1px solid rgba(99,102,241,0.25)", fontFamily: "var(--font-heading)" }}
              >
                <FileText size={14} /> Upload Spreadsheet
              </button>
            </div>
          </div>

          {error && <div className="px-4 py-3 rounded-xl text-xs font-medium" style={{ background: "rgba(230,57,70,0.12)", color: "#f87171", border: "1px solid rgba(230,57,70,0.2)" }}>{error}</div>}
          {success && <div className="px-4 py-3 rounded-xl text-xs font-medium" style={{ background: "rgba(74,222,128,0.1)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.2)" }}>{success}</div>}

          {/* Export */}
          <div style={card}>
            <p className="text-sm font-bold text-white mb-1" style={{ fontFamily: "var(--font-heading)" }}>Export Data</p>
            <p className="text-xs mb-3" style={{ color: "rgba(255,255,255,0.35)" }}>
              Download CSVs for external systems, mail houses, or third-party tools.
            </p>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => triggerDownload("/api/export/contacts?filter=all")}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold transition-all hover:scale-[1.02]"
                style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-heading)" }}
              >
                <Download size={13} /> All Contacts
              </button>
              {/* Mailing list export — new */}
              <div className="flex flex-col gap-1.5" style={{ background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.18)", borderRadius: "0.75rem", padding: "0.75rem" }}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold" style={{ color: "#a5b4fc", fontFamily: "var(--font-heading)" }}><MapPin size={11} className="inline mr-1" />Mailing List (Direct Mail)</span>
                  {mailingCount !== null && (
                    <span className="text-xs px-1.5 py-0.5 rounded-full font-semibold" style={{ background: "rgba(99,102,241,0.2)", color: "#a5b4fc" }}>{mailingCount} with address</span>
                  )}
                </div>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>For postcard printers & mail houses. Includes address-complete contacts only.</p>
                <div className="flex gap-1.5 mt-1">
                  <input
                    style={{ ...inp, flex: 1, padding: "0.375rem 0.625rem", fontSize: "0.75rem" }}
                    placeholder="Filter by segment (optional)"
                    value={segmentFilter}
                    onChange={(e) => setSegmentFilter(e.target.value)}
                  />
                  <button
                    onClick={() => triggerDownload(`/api/export/mailing-list${segmentFilter ? `?segment=${encodeURIComponent(segmentFilter)}` : ""}`)}
                    className="shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-all hover:scale-[1.02]"
                    style={{ background: "rgba(99,102,241,0.25)", color: "#a5b4fc", fontFamily: "var(--font-heading)" }}
                  >
                    <Download size={12} className="inline mr-1" />Download
                  </button>
                </div>
              </div>
              <button
                onClick={() => triggerDownload("/api/export/suppression")}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold transition-all hover:scale-[1.02]"
                style={{ background: "rgba(230,57,70,0.08)", color: "#f87171", border: "1px solid rgba(230,57,70,0.15)", fontFamily: "var(--font-heading)" }}
              >
                <Download size={13} /> Suppression List
              </button>
              <button
                onClick={() => triggerDownload("/api/export/contacts?filter=removed")}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold transition-all hover:scale-[1.02]"
                style={{ background: "rgba(234,179,8,0.08)", color: "#fbbf24", border: "1px solid rgba(234,179,8,0.15)", fontFamily: "var(--font-heading)" }}
              >
                <Download size={13} /> Removed / Opted Out
              </button>
            </div>
          </div>
        </div>

        {/* Right: contact list */}
        <div className="col-span-2 rounded-2xl overflow-hidden" style={{ background: "#1a1d23", border: "1px solid rgba(255,255,255,0.06)" }}>
          {/* List header */}
          <div className="px-6 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>All Contacts</p>
              <div className="flex items-center gap-3">
                <span className="text-xs px-2.5 py-1 rounded-full font-semibold" style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.4)" }}>
                  {contactSearch || contactStatusFilter !== "all" ? `${filteredContacts.length} / ` : ""}{activeCount} active / {contacts.length} total
                </span>
                <button
                  onClick={handleValidate}
                  disabled={loading}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-[1.02] disabled:opacity-50"
                  style={{ background: "rgba(99,102,241,0.12)", color: "#a5b4fc", border: "1px solid rgba(99,102,241,0.2)" }}
                  title="Check all emails for valid domains"
                >
                  <ShieldCheck size={12} /> Validate Emails
                </button>
              </div>
            </div>
            {/* Search + filter row */}
            <div className="flex gap-2">
              <div style={{ position: "relative", flex: 1 }}>
                <Search size={13} style={{ position: "absolute", left: "0.7rem", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.3)", pointerEvents: "none" }} />
                <input
                  style={{ ...inp, paddingLeft: "2.1rem", borderRadius: "0.625rem" }}
                  placeholder="Search name, email, company, city, phone…"
                  value={contactSearch}
                  onChange={(e) => setContactSearch(e.target.value)}
                />
                {contactSearch && (
                  <button onClick={() => setContactSearch("")} style={{ position: "absolute", right: "0.6rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.3)", display: "flex" }}>
                    <X size={12} />
                  </button>
                )}
              </div>
              <select
                value={contactStatusFilter}
                onChange={(e) => setContactStatusFilter(e.target.value as typeof contactStatusFilter)}
                style={{ ...inp, width: "auto", fontSize: "0.76rem", borderRadius: "0.625rem", cursor: "pointer" }}
              >
                <option value="all">All statuses</option>
                <option value="active">Active</option>
                <option value="unsubscribed">Unsubscribed</option>
                <option value="invalid">Invalid</option>
              </select>
            </div>
          </div>

          {contacts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3" style={{ background: "rgba(230,57,70,0.1)" }}>
                <Users size={20} style={{ color: "var(--color-red)" }} strokeWidth={1.5} />
              </div>
              <p className="text-sm font-semibold text-white mb-1">No contacts yet</p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>Click "Add Contact" to get started.</p>
            </div>
          ) : filteredContacts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <p className="text-sm font-semibold text-white mb-1">No results</p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                No contacts match <span style={{ color: "rgba(255,255,255,0.55)" }}>"{contactSearch}"</span>. Try a different search.
              </p>
              <button onClick={() => { setContactSearch(""); setContactStatusFilter("all"); }} className="mt-3 text-xs px-3 py-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)", border: "none", cursor: "pointer" }}>Clear filters</button>
            </div>
          ) : (
            <div>
              {filteredContacts.map((c, i) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between px-6 py-3 transition-colors cursor-pointer hover:bg-white/[0.02]"
                  style={{ borderBottom: i < filteredContacts.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}
                  onClick={() => openDrawer(c)}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                      style={{
                        background: c.status === "active" || !c.status ? "rgba(230,57,70,0.12)" : "rgba(255,255,255,0.06)",
                        color: c.status === "active" || !c.status ? "#f87171" : "rgba(255,255,255,0.3)",
                      }}
                    >
                      {initials(c)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <p className="text-sm font-medium truncate" style={{ color: c.status === "active" || !c.status ? "#fff" : "rgba(255,255,255,0.4)" }}>
                          {displayName(c)}
                        </p>
                        {c.status === "unsubscribed" && <span className="text-xs px-1.5 py-0.5 rounded-full font-medium shrink-0" style={{ background: "rgba(230,57,70,0.1)", color: "#f87171" }}>unsub</span>}
                        {c.status === "invalid" && <span className="text-xs px-1.5 py-0.5 rounded-full font-medium shrink-0" style={{ background: "rgba(234,179,8,0.1)", color: "#fbbf24" }}>invalid</span>}
                        {c.tags?.includes("test_seed") && <span className="text-xs px-1.5 py-0.5 rounded-full font-bold shrink-0" style={{ background: "rgba(20,184,166,0.15)", color: "#2dd4bf", border: "1px solid rgba(20,184,166,0.25)" }}>SEED</span>}
                        {Number(c.campaigns_sent) > 0 && <span className="text-xs px-1.5 py-0.5 rounded-full font-medium shrink-0" style={{ background: "rgba(74,222,128,0.08)", color: "#4ade80" }}>sent ×{c.campaigns_sent}</span>}
                        {hasAddress(c) && <span className="text-xs px-1.5 py-0.5 rounded-full font-medium shrink-0" style={{ background: "rgba(99,102,241,0.1)", color: "#a5b4fc" }}><MapPin size={8} className="inline mr-0.5" />addr</span>}
                      </div>
                      <p className="text-xs truncate mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>
                        {c.name !== displayName(c) ? c.email : ""}
                        {(c.title || c.company) && (
                          <>
                            {c.name !== displayName(c) ? " · " : ""}
                            <span style={{ color: "rgba(255,255,255,0.45)" }}>{c.title}</span>
                            {c.title && c.company ? " at " : ""}
                            <span style={{ color: "rgba(255,255,255,0.45)" }}>{c.company}</span>
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={14} style={{ color: "rgba(255,255,255,0.15)", flexShrink: 0 }} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
