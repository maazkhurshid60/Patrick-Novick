"use client";

import { useState, useEffect, useRef, FormEvent, useMemo } from "react";
import {
  Plus, Trash2, X, Users, UserMinus, ChevronLeft, Check,
  Search, UploadCloud, ChevronDown, CheckSquare, Square, RefreshCw,
} from "lucide-react";

interface ContactList {
  id: number;
  name: string;
  member_count: number;
  created_at: number;
}

interface Contact {
  id: number;
  email: string;
  name: string;
  status: string;
  lists?: string | null;
  campaigns_sent?: number;
  title: string;
  company: string;
}

const inputStyle: React.CSSProperties = {
  border: "1px solid rgba(255,255,255,0.08)",
  color: "#fff",
  background: "rgba(255,255,255,0.04)",
  borderRadius: "0.75rem",
  padding: "0.625rem 1rem",
  fontSize: "0.875rem",
  outline: "none",
  width: "100%",
};

// ────────────────────────────────────────────────────────────────
// Add-contacts modal
// ────────────────────────────────────────────────────────────────
function AddContactsModal({
  listId,
  listName,
  memberIds,
  onClose,
  onDone,
}: {
  listId: number;
  listName: string;
  memberIds: Set<number>;
  onClose: () => void;
  onDone: () => void;
}) {
  const [allContacts, setAllContacts] = useState<Contact[]>([]);
  const [loadingContacts, setLoadingContacts] = useState(true);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "unsubscribed">("all");
  const [memberFilter, setMemberFilter] = useState<"all" | "no-list" | "not-in-list">("all");
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [adding, setAdding] = useState(false);

  // Paste-emails tab
  const [tab, setTab] = useState<"browse" | "paste">("browse");
  const [pastedEmails, setPastedEmails] = useState("");
  const [pasteResult, setPasteResult] = useState<{ added: number; notFound: number; alreadyIn: number } | null>(null);
  const [pasteLoading, setPasteLoading] = useState(false);

  // virtual-scroll helpers
  const PAGE = 80;
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch("/api/contacts")
      .then((r) => r.json())
      .then((d: Contact[]) => { setAllContacts(d); setLoadingContacts(false); });
  }, []);

  // Filtered list
  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return allContacts.filter((c) => {
      if (statusFilter !== "all" && c.status !== statusFilter) return false;
      if (memberFilter === "no-list" && c.lists) return false;
      if (memberFilter === "not-in-list" && memberIds.has(c.id)) return false;
      if (!q) return true;
      return (
        c.email.toLowerCase().includes(q) ||
        (c.name || "").toLowerCase().includes(q) ||
        (c.company || "").toLowerCase().includes(q) ||
        (c.title || "").toLowerCase().includes(q)
      );
    });
  }, [allContacts, query, statusFilter, memberFilter, memberIds]);

  const visible = filtered.slice(0, page * PAGE);
  const canLoadMore = visible.length < filtered.length;

  // Contacts that are not yet in the list (eligible to be added)
  const eligibleFiltered = filtered.filter((c) => !memberIds.has(c.id));
  const allEligibleSelected =
    eligibleFiltered.length > 0 && eligibleFiltered.every((c) => selectedIds.has(c.id));

  function toggleAll() {
    if (allEligibleSelected) {
      const next = new Set(selectedIds);
      eligibleFiltered.forEach((c) => next.delete(c.id));
      setSelectedIds(next);
    } else {
      const next = new Set(selectedIds);
      eligibleFiltered.forEach((c) => next.add(c.id));
      setSelectedIds(next);
    }
  }

  function toggleContact(c: Contact) {
    if (memberIds.has(c.id)) return;
    const next = new Set(selectedIds);
    if (next.has(c.id)) next.delete(c.id); else next.add(c.id);
    setSelectedIds(next);
  }

  async function handleAdd() {
    if (selectedIds.size === 0 || adding) return;
    setAdding(true);
    await fetch(`/api/lists/${listId}/members`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contactIds: Array.from(selectedIds) }),
    });
    setAdding(false);
    onDone();
  }

  async function handlePasteImport(e: FormEvent) {
    e.preventDefault();
    const emails = pastedEmails
      .split(/[\n,;]+/)
      .map((e) => e.trim().toLowerCase())
      .filter((e) => e.includes("@"));
    if (emails.length === 0) return;
    setPasteLoading(true);
    setPasteResult(null);

    // Find matching contact ids from allContacts
    const emailToId = new Map(allContacts.map((c) => [c.email.toLowerCase(), c.id]));
    const toAdd: number[] = [];
    let notFound = 0;
    let alreadyIn = 0;
    for (const email of emails) {
      const id = emailToId.get(email);
      if (!id) { notFound++; continue; }
      if (memberIds.has(id)) { alreadyIn++; continue; }
      toAdd.push(id);
    }
    if (toAdd.length > 0) {
      await fetch(`/api/lists/${listId}/members`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contactIds: toAdd }),
      });
    }
    setPasteResult({ added: toAdd.length, notFound, alreadyIn });
    setPasteLoading(false);
    if (toAdd.length > 0) onDone();
  }

  const backdrop: React.CSSProperties = {
    position: "fixed", inset: 0, zIndex: 9999,
    background: "rgba(0,0,0,0.7)",
    backdropFilter: "blur(6px)",
    display: "flex", alignItems: "center", justifyContent: "center",
    padding: "1rem",
  };
  const modal: React.CSSProperties = {
    background: "#151821",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "1.25rem",
    width: "100%",
    maxWidth: "680px",
    maxHeight: "90vh",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    boxShadow: "0 32px 80px rgba(0,0,0,0.7)",
  };

  return (
    <div style={backdrop} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={modal}>
        {/* Modal header */}
        <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "#fff", fontSize: "0.95rem" }}>
              Add contacts to <span style={{ color: "#f87171" }}>{listName}</span>
            </p>
            <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.35)", marginTop: "0.2rem" }}>
              {allContacts.length} total contacts · {memberIds.size} already in list
            </p>
          </div>
          <button onClick={onClose} style={{ color: "rgba(255,255,255,0.35)", background: "none", border: "none", cursor: "pointer", display: "flex" }}>
            <X size={18} />
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "0 1.5rem" }}>
          {(["browse", "paste"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                padding: "0.75rem 1rem 0.6rem",
                fontSize: "0.78rem", fontWeight: 600,
                color: tab === t ? "#fff" : "rgba(255,255,255,0.35)",
                borderBottom: tab === t ? "2px solid #e63946" : "2px solid transparent",
                textTransform: "capitalize",
              }}
            >
              {t === "browse" ? "Browse Contacts" : "Paste / Import Emails"}
            </button>
          ))}
        </div>

        {tab === "browse" ? (
          <>
            {/* Filters bar */}
            <div style={{ padding: "0.875rem 1.5rem", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", gap: "0.625rem", flexWrap: "wrap", alignItems: "center" }}>
              {/* Search */}
              <div style={{ position: "relative", flex: "1 1 200px", minWidth: 0 }}>
                <Search size={13} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.3)", pointerEvents: "none" }} />
                <input
                  style={{ ...inputStyle, paddingLeft: "2.2rem", fontSize: "0.8rem", borderRadius: "0.625rem" }}
                  placeholder="Search name, email, company…"
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setPage(1); }}
                  autoFocus
                />
                {query && (
                  <button onClick={() => { setQuery(""); setPage(1); }} style={{ position: "absolute", right: "0.625rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.3)" }}>
                    <X size={12} />
                  </button>
                )}
              </div>

              {/* Status filter */}
              <select
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value as typeof statusFilter); setPage(1); }}
                style={{ ...inputStyle, width: "auto", fontSize: "0.78rem", borderRadius: "0.625rem", cursor: "pointer" }}
              >
                <option value="all">All statuses</option>
                <option value="active">Active only</option>
                <option value="unsubscribed">Unsubscribed</option>
              </select>

              {/* Member filter */}
              <select
                value={memberFilter}
                onChange={(e) => { setMemberFilter(e.target.value as typeof memberFilter); setPage(1); }}
                style={{ ...inputStyle, width: "auto", fontSize: "0.78rem", borderRadius: "0.625rem", cursor: "pointer" }}
              >
                <option value="all">All contacts</option>
                <option value="not-in-list">Not in this list</option>
                <option value="no-list">In no lists</option>
              </select>
            </div>

            {/* Select-all bar */}
            <div style={{ padding: "0.5rem 1.5rem", background: "rgba(255,255,255,0.015)", borderBottom: "1px solid rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <button
                onClick={toggleAll}
                style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "none", border: "none", cursor: "pointer", color: allEligibleSelected ? "#f87171" : "rgba(255,255,255,0.45)", fontSize: "0.75rem", fontWeight: 600 }}
              >
                {allEligibleSelected
                  ? <CheckSquare size={14} />
                  : <Square size={14} />
                }
                {allEligibleSelected ? "Deselect all" : `Select all ${eligibleFiltered.length} eligible`}
              </button>
              <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.3)" }}>
                {filtered.length} shown · {selectedIds.size} selected
              </span>
            </div>

            {/* Contact list */}
            <div style={{ overflowY: "auto", flex: 1, minHeight: 0 }}>
              {loadingContacts ? (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "3rem", gap: "0.75rem", color: "rgba(255,255,255,0.3)", fontSize: "0.8rem" }}>
                  <RefreshCw size={16} style={{ animation: "spin 1s linear infinite" }} /> Loading contacts…
                </div>
              ) : filtered.length === 0 ? (
                <div style={{ padding: "3rem", textAlign: "center", color: "rgba(255,255,255,0.25)", fontSize: "0.8rem" }}>
                  No contacts match your filters.
                </div>
              ) : (
                <>
                  {visible.map((c) => {
                    const alreadyIn = memberIds.has(c.id);
                    const checked = selectedIds.has(c.id) || alreadyIn;
                    return (
                      <div
                        key={c.id}
                        onClick={() => toggleContact(c)}
                        style={{
                          display: "flex", alignItems: "center", gap: "0.875rem",
                          padding: "0.625rem 1.5rem",
                          cursor: alreadyIn ? "default" : "pointer",
                          opacity: alreadyIn ? 0.45 : 1,
                          borderBottom: "1px solid rgba(255,255,255,0.03)",
                          transition: "background 0.12s",
                          background: selectedIds.has(c.id) ? "rgba(230,57,70,0.05)" : "transparent",
                        }}
                        onMouseEnter={(e) => { if (!alreadyIn) (e.currentTarget as HTMLDivElement).style.background = selectedIds.has(c.id) ? "rgba(230,57,70,0.07)" : "rgba(255,255,255,0.02)"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = selectedIds.has(c.id) ? "rgba(230,57,70,0.05)" : "transparent"; }}
                      >
                        {/* Checkbox */}
                        <div style={{
                          width: "16px", height: "16px", borderRadius: "4px", flexShrink: 0,
                          border: checked ? "1.5px solid #f87171" : "1.5px solid rgba(255,255,255,0.15)",
                          background: checked ? "rgba(230,57,70,0.15)" : "transparent",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          transition: "all 0.12s",
                        }}>
                          {checked && <Check size={9} color={alreadyIn ? "rgba(255,255,255,0.3)" : "#f87171"} />}
                        </div>

                        {/* Avatar */}
                        <div style={{
                          width: "30px", height: "30px", borderRadius: "50%", flexShrink: 0,
                          background: "rgba(230,57,70,0.12)", color: "#f87171",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: "0.7rem", fontWeight: 700,
                        }}>
                          {(c.name || c.email)[0].toUpperCase()}
                        </div>

                        {/* Info */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "#fff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                              {c.name || c.email}
                            </span>
                            {c.status === "unsubscribed" && (
                              <span style={{ fontSize: "0.65rem", padding: "1px 6px", borderRadius: "99px", background: "rgba(230,57,70,0.12)", color: "#f87171", flexShrink: 0 }}>unsub</span>
                            )}
                            {alreadyIn && (
                              <span style={{ fontSize: "0.65rem", padding: "1px 6px", borderRadius: "99px", background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.4)", flexShrink: 0 }}>in list</span>
                            )}
                          </div>
                          <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.3)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {c.name ? c.email : ""}
                            {(c.title || c.company) && <span> · {c.title}{c.title && c.company ? " at " : ""}{c.company}</span>}
                          </div>
                        </div>

                        {/* List badge */}
                        {c.lists && !alreadyIn && (
                          <span style={{ fontSize: "0.65rem", padding: "2px 7px", borderRadius: "99px", background: "rgba(168,85,247,0.1)", color: "#c084fc", border: "1px solid rgba(168,85,247,0.2)", flexShrink: 0, maxWidth: "120px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={c.lists}>
                            {c.lists}
                          </span>
                        )}
                      </div>
                    );
                  })}

                  {canLoadMore && (
                    <div style={{ padding: "0.875rem", textAlign: "center" }}>
                      <button
                        onClick={() => setPage((p) => p + 1)}
                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)", borderRadius: "0.625rem", padding: "0.5rem 1.5rem", fontSize: "0.78rem", cursor: "pointer" }}
                      >
                        Show more ({filtered.length - visible.length} remaining)
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Footer */}
            <div style={{ padding: "1rem 1.5rem", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.75rem" }}>
              <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.35)" }}>
                {selectedIds.size > 0 ? `${selectedIds.size} contact${selectedIds.size !== 1 ? "s" : ""} selected` : "Select contacts above"}
              </span>
              <div style={{ display: "flex", gap: "0.625rem" }}>
                <button onClick={onClose} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.6)", borderRadius: "0.625rem", padding: "0.5rem 1.125rem", fontSize: "0.8rem", cursor: "pointer" }}>
                  Cancel
                </button>
                <button
                  onClick={handleAdd}
                  disabled={selectedIds.size === 0 || adding}
                  style={{
                    background: selectedIds.size === 0 ? "rgba(230,57,70,0.3)" : "var(--color-red, #e63946)",
                    border: "none", color: "#fff", borderRadius: "0.625rem",
                    padding: "0.5rem 1.25rem", fontSize: "0.8rem", fontWeight: 700,
                    cursor: selectedIds.size === 0 ? "default" : "pointer",
                    display: "flex", alignItems: "center", gap: "0.4rem",
                    opacity: adding ? 0.6 : 1, transition: "all 0.15s",
                    fontFamily: "var(--font-heading)",
                  }}
                >
                  {adding ? <RefreshCw size={13} style={{ animation: "spin 1s linear infinite" }} /> : <Plus size={13} />}
                  {adding ? "Adding…" : `Add ${selectedIds.size > 0 ? selectedIds.size : ""} to List`}
                </button>
              </div>
            </div>
          </>
        ) : (
          /* ── Paste tab ── */
          <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem", flex: 1, overflowY: "auto" }}>
            <div>
              <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.6)", marginBottom: "0.5rem" }}>
                Paste a list of email addresses (one per line, or comma/semicolon separated). Only contacts that already exist in your database will be added.
              </p>
            </div>
            <form onSubmit={handlePasteImport} style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              <textarea
                value={pastedEmails}
                onChange={(e) => { setPastedEmails(e.target.value); setPasteResult(null); }}
                placeholder={"john@acme.com\njane@corp.com\nbob@example.com"}
                rows={10}
                style={{ ...inputStyle, resize: "vertical", fontFamily: "monospace", fontSize: "0.78rem", lineHeight: "1.6" }}
              />
              {pasteResult && (
                <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "0.75rem", padding: "0.875rem 1rem", display: "flex", gap: "1.5rem" }}>
                  <div style={{ textAlign: "center" }}>
                    <p style={{ fontSize: "1.3rem", fontWeight: 700, color: "#4ade80" }}>{pasteResult.added}</p>
                    <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)" }}>added</p>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <p style={{ fontSize: "1.3rem", fontWeight: 700, color: "rgba(255,255,255,0.4)" }}>{pasteResult.alreadyIn}</p>
                    <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)" }}>already in list</p>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <p style={{ fontSize: "1.3rem", fontWeight: 700, color: "#f87171" }}>{pasteResult.notFound}</p>
                    <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)" }}>not found</p>
                  </div>
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button
                  type="submit"
                  disabled={pasteLoading || !pastedEmails.trim()}
                  style={{
                    background: "var(--color-red, #e63946)", border: "none", color: "#fff",
                    borderRadius: "0.625rem", padding: "0.6rem 1.5rem",
                    fontSize: "0.82rem", fontWeight: 700, cursor: "pointer",
                    display: "flex", alignItems: "center", gap: "0.5rem",
                    opacity: pasteLoading || !pastedEmails.trim() ? 0.5 : 1,
                    fontFamily: "var(--font-heading)",
                  }}
                >
                  {pasteLoading ? <RefreshCw size={13} style={{ animation: "spin 1s linear infinite" }} /> : <UploadCloud size={13} />}
                  {pasteLoading ? "Importing…" : "Import to List"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }`}</style>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────
// Main page
// ────────────────────────────────────────────────────────────────
export default function ListsClient() {
  const [lists, setLists] = useState<ContactList[]>([]);
  const [selected, setSelected] = useState<ContactList | null>(null);
  const [members, setMembers] = useState<Contact[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [memberSearch, setMemberSearch] = useState("");

  async function fetchLists() {
    const res = await fetch("/api/lists");
    setLists(await res.json());
  }

  async function fetchMembers(listId: number) {
    const res = await fetch(`/api/lists/${listId}/members`);
    setMembers(await res.json());
  }

  useEffect(() => { fetchLists(); }, []);

  async function handleCreateList(e: FormEvent) {
    e.preventDefault();
    if (!newListName.trim()) return;
    setLoading(true); setError("");
    const res = await fetch("/api/lists", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newListName.trim() }),
    });
    const data = await res.json();
    if (!res.ok) { setError(data.error ?? "Failed"); }
    else { setNewListName(""); fetchLists(); }
    setLoading(false);
  }

  async function handleDeleteList(id: number) {
    if (!confirm("Delete this list? Contacts are not deleted.")) return;
    await fetch("/api/lists", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (selected?.id === id) setSelected(null);
    fetchLists();
  }

  async function openList(list: ContactList) {
    setSelected(list);
    setMemberSearch("");
    await fetchMembers(list.id);
  }

  async function handleRemoveMember(contactId: number) {
    if (!selected) return;
    await fetch(`/api/lists/${selected.id}/members`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contactId }),
    });
    fetchMembers(selected.id);
    fetchLists();
  }

  async function handleModalDone() {
    setShowModal(false);
    if (selected) {
      await fetchMembers(selected.id);
      await fetchLists();
      // Refresh selected count
      setSelected((prev) => prev ? { ...prev } : null);
    }
  }

  const memberIds = useMemo(() => new Set(members.map((m) => m.id)), [members]);

  const filteredMembers = useMemo(() => {
    const q = memberSearch.toLowerCase().trim();
    if (!q) return members;
    return members.filter(
      (c) =>
        c.email.toLowerCase().includes(q) ||
        (c.name || "").toLowerCase().includes(q) ||
        (c.company || "").toLowerCase().includes(q)
    );
  }, [members, memberSearch]);

  return (
    <>
      {showModal && selected && (
        <AddContactsModal
          listId={selected.id}
          listName={selected.name}
          memberIds={memberIds}
          onClose={() => setShowModal(false)}
          onDone={handleModalDone}
        />
      )}

      <div className="grid grid-cols-3 gap-5">
        {/* Left: List of lists */}
        <div className="col-span-1 flex flex-col gap-4">
          {/* Create list */}
          <div className="rounded-2xl p-5" style={{ background: "#1a1d23", border: "1px solid rgba(255,255,255,0.06)" }}>
            <p className="text-sm font-bold text-white mb-4" style={{ fontFamily: "var(--font-heading)" }}>New List</p>
            <form onSubmit={handleCreateList} className="flex flex-col gap-3">
              <input
                style={inputStyle}
                placeholder="e.g. MEP Engineers"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                required
              />
              {error && <p className="text-xs" style={{ color: "#f87171" }}>{error}</p>}
              <button
                type="submit" disabled={loading}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold text-white transition-all hover:scale-[1.02] disabled:opacity-50"
                style={{ background: "var(--color-red)", fontFamily: "var(--font-heading)", boxShadow: "0 4px 16px rgba(230,57,70,0.3)" }}
              >
                <Plus size={14} /> Create List
              </button>
            </form>
          </div>

          {/* Lists */}
          <div className="rounded-2xl overflow-hidden" style={{ background: "#1a1d23", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="px-5 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <p className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>
                All Lists <span className="text-xs font-normal ml-1" style={{ color: "rgba(255,255,255,0.3)" }}>{lists.length}</span>
              </p>
            </div>
            {lists.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>No lists yet. Create one above.</p>
              </div>
            ) : (
              lists.map((list, i) => (
                <div
                  key={list.id}
                  className="flex items-center justify-between px-5 py-3.5 cursor-pointer transition-colors"
                  style={{
                    borderBottom: i < lists.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                    background: selected?.id === list.id ? "rgba(230,57,70,0.06)" : "transparent",
                  }}
                  onClick={() => openList(list)}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: selected?.id === list.id ? "rgba(230,57,70,0.15)" : "rgba(255,255,255,0.05)" }}>
                      <Users size={13} style={{ color: selected?.id === list.id ? "#f87171" : "rgba(255,255,255,0.4)" }} />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-sm font-medium truncate" style={{ color: selected?.id === list.id ? "#fff" : "rgba(255,255,255,0.7)" }}>{list.name}</p>
                      <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>{Number(list.member_count)} contacts</p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDeleteList(list.id); }}
                    className="w-6 h-6 rounded-lg flex items-center justify-center transition-all hover:bg-red-500/10 shrink-0"
                    style={{ color: "rgba(255,255,255,0.2)" }}
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right: Selected list members */}
        <div className="col-span-2">
          {!selected ? (
            <div className="rounded-2xl flex flex-col items-center justify-center py-24 text-center"
              style={{ background: "#1a1d23", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3"
                style={{ background: "rgba(255,255,255,0.04)" }}>
                <Users size={20} style={{ color: "rgba(255,255,255,0.2)" }} strokeWidth={1.5} />
              </div>
              <p className="text-sm font-semibold text-white mb-1">Select a list</p>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>Click a list on the left to view and manage its contacts.</p>
            </div>
          ) : (
            <div className="rounded-2xl overflow-hidden flex flex-col" style={{ background: "#1a1d23", border: "1px solid rgba(255,255,255,0.06)" }}>
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="flex items-center gap-3">
                  <button onClick={() => setSelected(null)} className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:bg-white/5" style={{ color: "rgba(255,255,255,0.4)" }}>
                    <ChevronLeft size={15} />
                  </button>
                  <div>
                    <p className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>{selected.name}</p>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>{members.length} contacts</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowModal(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-white transition-all hover:scale-[1.02]"
                  style={{ background: "var(--color-red)", fontFamily: "var(--font-heading)" }}
                >
                  <Plus size={12} /> Add Contacts
                </button>
              </div>

              {/* Member search */}
              {members.length > 5 && (
                <div style={{ padding: "0.75rem 1.5rem", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <div style={{ position: "relative" }}>
                    <Search size={13} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.3)", pointerEvents: "none" }} />
                    <input
                      style={{ ...inputStyle, paddingLeft: "2.2rem", fontSize: "0.78rem", borderRadius: "0.625rem" }}
                      placeholder="Search members…"
                      value={memberSearch}
                      onChange={(e) => setMemberSearch(e.target.value)}
                    />
                    {memberSearch && (
                      <button onClick={() => setMemberSearch("")} style={{ position: "absolute", right: "0.625rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.3)" }}>
                        <X size={12} />
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Members list */}
              {members.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <p className="text-sm font-semibold text-white mb-1">No contacts yet</p>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>Click "Add Contacts" to add people to this list.</p>
                </div>
              ) : filteredMembers.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>No members match your search.</p>
                </div>
              ) : (
                filteredMembers.map((c, i) => (
                  <div
                    key={c.id}
                    className="flex items-center justify-between px-6 py-3.5 transition-colors hover:bg-white/[0.02]"
                    style={{ borderBottom: i < filteredMembers.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                        style={{ background: "rgba(230,57,70,0.12)", color: "#f87171" }}>
                        {(c.name || c.email)[0].toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-white">{c.name || c.email}</p>
                          {c.status === "unsubscribed" && (
                            <span className="text-xs px-1.5 py-0.5 rounded-full font-medium" style={{ background: "rgba(230,57,70,0.12)", color: "#f87171" }}>
                              unsubscribed
                            </span>
                          )}
                        </div>
                        <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
                          {c.name ? c.email : ""}
                          {(c.title || c.company) && (
                            <>
                              {c.name ? " · " : ""}
                              {c.title}
                              {c.title && c.company ? " at " : ""}
                              {c.company}
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveMember(c.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all hover:bg-white/5"
                      style={{ color: "rgba(255,255,255,0.3)" }}
                      title="Remove from list"
                    >
                      <UserMinus size={12} /> Remove
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
