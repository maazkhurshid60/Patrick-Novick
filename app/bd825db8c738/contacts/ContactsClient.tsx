"use client";

import { useState, useEffect, FormEvent, useRef } from "react";
import { Trash2, Plus, Upload, Users, FileText } from "lucide-react";

interface Contact {
  id: number;
  email: string;
  name: string;
  created_at: number;
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

export default function ContactsClient() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [bulk, setBulk] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const csvRef = useRef<HTMLInputElement>(null);

  async function fetchContacts() {
    const res = await fetch("/api/contacts");
    setContacts(await res.json());
  }

  useEffect(() => { fetchContacts(); }, []);

  async function handleAdd(e: FormEvent) {
    e.preventDefault();
    setError(""); setSuccess(""); setLoading(true);
    const res = await fetch("/api/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name }),
    });
    const data = await res.json();
    if (!res.ok) setError(data.error ?? "Failed");
    else { setSuccess(`Added ${data.added} contact`); setEmail(""); setName(""); fetchContacts(); }
    setLoading(false);
  }

  async function handleBulk(e: FormEvent) {
    e.preventDefault();
    setError(""); setSuccess(""); setLoading(true);
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
    if (!res.ok) setError(data.error ?? "Failed");
    else { setSuccess(`Added ${data.added} contacts`); setBulk(""); fetchContacts(); }
    setLoading(false);
  }

  async function handleCsvUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(""); setSuccess(""); setLoading(true);

    const text = await file.text();
    const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);

    // Detect header row and find email/name column indexes
    const headers = lines[0].toLowerCase().split(",").map((h) => h.replace(/"/g, "").trim());
    const emailIdx = headers.findIndex((h) => h.includes("email"));
    const nameIdx = headers.findIndex((h) => h.includes("name") || h.includes("first") || h.includes("contact"));

    if (emailIdx === -1) {
      setError("No email column found in CSV. Make sure a column is named 'email'.");
      setLoading(false);
      if (csvRef.current) csvRef.current.value = "";
      return;
    }

    const entries = lines.slice(1).map((line) => {
      const cols = line.split(",").map((c) => c.replace(/"/g, "").trim());
      return {
        email: cols[emailIdx] ?? "",
        name: nameIdx >= 0 ? (cols[nameIdx] ?? "") : "",
      };
    }).filter((e) => e.email.includes("@"));

    if (entries.length === 0) {
      setError("No valid email addresses found in CSV.");
      setLoading(false);
      if (csvRef.current) csvRef.current.value = "";
      return;
    }

    const res = await fetch("/api/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(entries),
    });
    const data = await res.json();
    if (!res.ok) setError(data.error ?? "Failed");
    else { setSuccess(`Imported ${data.added} of ${entries.length} contacts from CSV`); fetchContacts(); }
    setLoading(false);
    if (csvRef.current) csvRef.current.value = "";
  }

  async function handleDelete(id: number) {
    await fetch("/api/contacts", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchContacts();
  }

  return (
    <div className="grid grid-cols-3 gap-5">
      {/* Left: forms */}
      <div className="col-span-1 flex flex-col gap-4">
        {/* Single */}
        <div style={cardStyle}>
          <p className="text-sm font-bold text-white mb-4" style={{ fontFamily: "var(--font-heading)" }}>Add Contact</p>
          <form onSubmit={handleAdd} className="flex flex-col gap-3">
            <input style={inputStyle} type="text" placeholder="Name (optional)" value={name} onChange={(e) => setName(e.target.value)} />
            <input style={inputStyle} type="email" placeholder="Email address *" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <button
              type="submit" disabled={loading}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold text-white transition-all hover:scale-[1.02] disabled:opacity-50"
              style={{ background: "var(--color-red)", fontFamily: "var(--font-heading)", boxShadow: "0 4px 16px rgba(230,57,70,0.3)" }}
            >
              <Plus size={14} /> Add Contact
            </button>
          </form>
        </div>

        {/* Bulk */}
        <div style={cardStyle}>
          <p className="text-sm font-bold text-white mb-1" style={{ fontFamily: "var(--font-heading)" }}>Bulk Import</p>
          <p className="text-xs mb-3" style={{ color: "rgba(255,255,255,0.35)" }}>
            One per line: <code style={{ background: "rgba(255,255,255,0.07)", padding: "1px 5px", borderRadius: 4 }}>Name &lt;email&gt;</code> or just email
          </p>
          <form onSubmit={handleBulk} className="flex flex-col gap-3">
            <textarea
              style={{ ...inputStyle, minHeight: "110px", resize: "vertical", fontFamily: "monospace", fontSize: "0.78rem" }}
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

          {/* CSV Upload */}
          <div className="mt-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <p className="text-xs mb-2" style={{ color: "rgba(255,255,255,0.35)" }}>
              Or upload a <strong style={{ color: "rgba(255,255,255,0.5)" }}>.csv</strong> file with <code style={{ background: "rgba(255,255,255,0.07)", padding: "1px 5px", borderRadius: 4 }}>email</code> and optional <code style={{ background: "rgba(255,255,255,0.07)", padding: "1px 5px", borderRadius: 4 }}>name</code> columns
            </p>
            <input
              ref={csvRef}
              type="file"
              accept=".csv"
              onChange={handleCsvUpload}
              disabled={loading}
              style={{ display: "none" }}
            />
            <button
              type="button"
              disabled={loading}
              onClick={() => csvRef.current?.click()}
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-full text-sm font-bold transition-all hover:scale-[1.02] disabled:opacity-50"
              style={{ background: "rgba(99,102,241,0.12)", color: "#a5b4fc", border: "1px solid rgba(99,102,241,0.25)", fontFamily: "var(--font-heading)" }}
            >
              <FileText size={14} /> Upload CSV
            </button>
          </div>
        </div>

        {error && <div className="px-4 py-3 rounded-xl text-xs font-medium" style={{ background: "rgba(230,57,70,0.12)", color: "#f87171", border: "1px solid rgba(230,57,70,0.2)" }}>{error}</div>}
        {success && <div className="px-4 py-3 rounded-xl text-xs font-medium" style={{ background: "rgba(74,222,128,0.1)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.2)" }}>{success}</div>}
      </div>

      {/* Right: list */}
      <div className="col-span-2 rounded-2xl overflow-hidden" style={{ background: "#1a1d23", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <p className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>All Contacts</p>
          <span className="text-xs px-2.5 py-1 rounded-full font-semibold" style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.4)" }}>
            {contacts.length} total
          </span>
        </div>

        {contacts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3" style={{ background: "rgba(230,57,70,0.1)" }}>
              <Users size={20} style={{ color: "var(--color-red)" }} strokeWidth={1.5} />
            </div>
            <p className="text-sm font-semibold text-white mb-1">No contacts yet</p>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>Add contacts using the form on the left.</p>
          </div>
        ) : (
          <div>
            {contacts.map((c, i) => (
              <div
                key={c.id}
                className="flex items-center justify-between px-6 py-3.5 transition-colors hover:bg-white/[0.02]"
                style={{ borderBottom: i < contacts.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                    style={{ background: "rgba(230,57,70,0.12)", color: "#f87171" }}>
                    {(c.name || c.email)[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{c.name || c.email}</p>
                    {c.name && <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{c.email}</p>}
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(c.id)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:bg-red-500/10"
                  style={{ color: "rgba(255,255,255,0.2)" }}
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
