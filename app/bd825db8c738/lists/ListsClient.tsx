"use client";

import { useState, useEffect, useRef, useCallback, FormEvent, useMemo, KeyboardEvent } from "react";
import {
  Plus, Trash2, X, Users, UserMinus, ChevronLeft, Check,
  Search, UploadCloud, CheckSquare, Square, RefreshCw,
  Layers, List as ListIcon, ChevronDown, ChevronRight, Pencil,
} from "lucide-react";
import { ToastProvider, toast, Spinner } from "../Toast";

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

// ─────────────────────────────────────────────
// helpers
// ─────────────────────────────────────────────
function Checkbox({ checked, partial, disabled }: { checked: boolean; partial?: boolean; disabled?: boolean }) {
  const base: React.CSSProperties = {
    width: 16, height: 16, borderRadius: 4, flexShrink: 0,
    border: checked || partial ? "1.5px solid #f87171" : "1.5px solid rgba(255,255,255,0.15)",
    background: checked ? "rgba(230,57,70,0.18)" : partial ? "rgba(230,57,70,0.08)" : "transparent",
    display: "flex", alignItems: "center", justifyContent: "center",
    transition: "all 0.1s",
    opacity: disabled ? 0.4 : 1,
  };
  return (
    <div style={base}>
      {checked && <Check size={9} color={disabled ? "rgba(255,255,255,0.3)" : "#f87171"} />}
      {!checked && partial && <div style={{ width: 8, height: 2, borderRadius: 1, background: "#f87171" }} />}
    </div>
  );
}

// ─────────────────────────────────────────────
// Add-contacts modal
// ─────────────────────────────────────────────
function AddContactsModal({
  listId, listName, memberIds, onClose, onDone,
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
  const [memberFilter, setMemberFilter] = useState<"all" | "no-list" | "not-in-list">("not-in-list");
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [adding, setAdding] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "grouped">("list");

  // Shift-range tracking
  const lastClickedIndexRef = useRef<number | null>(null);

  // Collapsed company groups
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set());

  // Paste tab
  const [tab, setTab] = useState<"browse" | "paste">("browse");
  const [pastedEmails, setPastedEmails] = useState("");
  const [pasteResult, setPasteResult] = useState<{ added: number; notFound: number; alreadyIn: number } | null>(null);
  const [pasteLoading, setPasteLoading] = useState(false);

  const PAGE = 100;
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch("/api/contacts")
      .then((r) => r.json())
      .then((d: Contact[]) => { setAllContacts(d); setLoadingContacts(false); });
  }, []);

  // ── filtered flat list ──────────────────────
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

  // eligible = not yet in list
  const eligible = useMemo(() => filtered.filter((c) => !memberIds.has(c.id)), [filtered, memberIds]);
  const allEligibleSelected = eligible.length > 0 && eligible.every((c) => selectedIds.has(c.id));

  // ── grouped view ────────────────────────────
  const grouped = useMemo(() => {
    const map = new Map<string, Contact[]>();
    for (const c of filtered) {
      const key = (c.company || "").trim() || "(No Company)";
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(c);
    }
    // sort: biggest groups first
    return [...map.entries()].sort((a, b) => b[1].length - a[1].length);
  }, [filtered]);

  const visible = filtered.slice(0, page * PAGE);
  const canLoadMore = visible.length < filtered.length;

  // ── keyboard shortcut Ctrl+A ─────────────
  useEffect(() => {
    function onKey(e: globalThis.KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === "a" && tab === "browse") {
        e.preventDefault();
        const next = new Set(selectedIds);
        eligible.forEach((c) => next.add(c.id));
        setSelectedIds(next);
      }
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [eligible, selectedIds, tab, onClose]);

  // ── toggle all eligible ──────────────────
  function toggleAll() {
    if (allEligibleSelected) {
      const next = new Set(selectedIds);
      eligible.forEach((c) => next.delete(c.id));
      setSelectedIds(next);
      lastClickedIndexRef.current = null;
    } else {
      const next = new Set(selectedIds);
      eligible.forEach((c) => next.add(c.id));
      setSelectedIds(next);
    }
  }

  // ── shift-range click (flat list) ────────
  function handleRowClick(c: Contact, index: number, shiftKey: boolean) {
    if (memberIds.has(c.id)) return;
    const next = new Set(selectedIds);

    if (shiftKey && lastClickedIndexRef.current !== null) {
      const from = Math.min(lastClickedIndexRef.current, index);
      const to = Math.max(lastClickedIndexRef.current, index);
      const shouldSelect = !selectedIds.has(c.id);
      for (let i = from; i <= to; i++) {
        const target = visible[i];
        if (!target || memberIds.has(target.id)) continue;
        if (shouldSelect) next.add(target.id);
        else next.delete(target.id);
      }
    } else {
      if (next.has(c.id)) next.delete(c.id);
      else next.add(c.id);
      lastClickedIndexRef.current = index;
    }

    setSelectedIds(next);
  }

  // ── group toggle ─────────────────────────
  function toggleGroup(company: string, contacts: Contact[]) {
    const eligibleInGroup = contacts.filter((c) => !memberIds.has(c.id));
    const allSelected = eligibleInGroup.every((c) => selectedIds.has(c.id));
    const next = new Set(selectedIds);
    if (allSelected) {
      eligibleInGroup.forEach((c) => next.delete(c.id));
    } else {
      eligibleInGroup.forEach((c) => next.add(c.id));
    }
    setSelectedIds(next);
    lastClickedIndexRef.current = null;
  }

  function toggleCollapse(company: string) {
    setCollapsedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(company)) next.delete(company);
      else next.add(company);
      return next;
    });
  }

  // ── add to list ──────────────────────────
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

  // ── paste import ─────────────────────────
  async function handlePasteImport(e: FormEvent) {
    e.preventDefault();
    const emails = pastedEmails
      .split(/[\n,;]+/)
      .map((s) => s.trim().toLowerCase())
      .filter((s) => s.includes("@"));
    if (!emails.length) return;
    setPasteLoading(true);
    setPasteResult(null);
    const emailToId = new Map(allContacts.map((c) => [c.email.toLowerCase(), c.id]));
    const toAdd: number[] = [];
    let notFound = 0, alreadyIn = 0;
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

  // ── styles ───────────────────────────────
  const backdrop: React.CSSProperties = {
    position: "fixed", inset: 0, zIndex: 9999,
    background: "rgba(0,0,0,0.72)",
    backdropFilter: "blur(6px)",
    display: "flex", alignItems: "center", justifyContent: "center",
    padding: "1rem",
  };
  const modal: React.CSSProperties = {
    background: "#151821",
    border: "1px solid rgba(255,255,255,0.09)",
    borderRadius: "1.25rem",
    width: "100%", maxWidth: "700px", maxHeight: "92vh",
    display: "flex", flexDirection: "column", overflow: "hidden",
    boxShadow: "0 40px 100px rgba(0,0,0,0.8)",
  };

  return (
    <div style={backdrop} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={modal}>

        {/* ── Header ── */}
        <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontFamily: "var(--font-heading)", fontWeight: 700, color: "#fff", fontSize: "0.95rem" }}>
              Add contacts to <span style={{ color: "#f87171" }}>{listName}</span>
            </p>
            <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.35)", marginTop: "0.2rem" }}>
              {allContacts.length} total · {memberIds.size} already in list
              <span style={{ marginLeft: "0.75rem", color: "rgba(255,255,255,0.2)" }}>
                · Shift+click to range-select · Ctrl+A to select all
              </span>
            </p>
          </div>
          <button onClick={onClose} style={{ color: "rgba(255,255,255,0.35)", background: "none", border: "none", cursor: "pointer", display: "flex", padding: "0.25rem" }}>
            <X size={18} />
          </button>
        </div>

        {/* ── Tabs ── */}
        <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "0 1.5rem" }}>
          {(["browse", "paste"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)} style={{
              background: "none", border: "none", cursor: "pointer",
              padding: "0.7rem 1rem 0.55rem", fontSize: "0.78rem", fontWeight: 600,
              color: tab === t ? "#fff" : "rgba(255,255,255,0.35)",
              borderBottom: tab === t ? "2px solid #e63946" : "2px solid transparent",
            }}>
              {t === "browse" ? "Browse Contacts" : "Paste / Import Emails"}
            </button>
          ))}
        </div>

        {tab === "browse" ? (
          <>
            {/* ── Filter bar ── */}
            <div style={{ padding: "0.75rem 1.5rem", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
              {/* Search */}
              <div style={{ position: "relative", flex: "1 1 180px", minWidth: 0 }}>
                <Search size={13} style={{ position: "absolute", left: "0.7rem", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.3)", pointerEvents: "none" }} />
                <input
                  style={{ ...inputStyle, paddingLeft: "2.1rem", fontSize: "0.78rem", borderRadius: "0.6rem" }}
                  placeholder="Search name, email, company…"
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setPage(1); lastClickedIndexRef.current = null; }}
                  autoFocus
                />
                {query && (
                  <button onClick={() => { setQuery(""); setPage(1); }} style={{ position: "absolute", right: "0.6rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.3)", display: "flex" }}>
                    <X size={12} />
                  </button>
                )}
              </div>

              {/* Status */}
              <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value as typeof statusFilter); setPage(1); }}
                style={{ ...inputStyle, width: "auto", fontSize: "0.76rem", borderRadius: "0.6rem", cursor: "pointer" }}>
                <option value="all">All statuses</option>
                <option value="active">Active only</option>
                <option value="unsubscribed">Unsubscribed</option>
              </select>

              {/* Member filter */}
              <select value={memberFilter} onChange={(e) => { setMemberFilter(e.target.value as typeof memberFilter); setPage(1); }}
                style={{ ...inputStyle, width: "auto", fontSize: "0.76rem", borderRadius: "0.6rem", cursor: "pointer" }}>
                <option value="all">All contacts</option>
                <option value="not-in-list">Not in this list</option>
                <option value="no-list">In no lists</option>
              </select>

              {/* View toggle */}
              <div style={{ display: "flex", background: "rgba(255,255,255,0.04)", borderRadius: "0.6rem", border: "1px solid rgba(255,255,255,0.07)", padding: "2px", gap: "2px", flexShrink: 0 }}>
                {([["list", <ListIcon size={13} />], ["grouped", <Layers size={13} />]] as [string, React.ReactNode][]).map(([m, icon]) => (
                  <button key={m} onClick={() => setViewMode(m as "list" | "grouped")}
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "0.3rem 0.5rem", borderRadius: "0.4rem", border: "none", cursor: "pointer", background: viewMode === m ? "rgba(255,255,255,0.1)" : "transparent", color: viewMode === m ? "#fff" : "rgba(255,255,255,0.35)", transition: "all 0.12s" }}
                    title={m === "list" ? "List view" : "Group by company"}>
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            {/* ── Select-all bar ── */}
            <div style={{ padding: "0.45rem 1.5rem", background: "rgba(255,255,255,0.012)", borderBottom: "1px solid rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <button onClick={toggleAll} style={{ display: "flex", alignItems: "center", gap: "0.45rem", background: "none", border: "none", cursor: eligible.length === 0 ? "default" : "pointer", color: allEligibleSelected ? "#f87171" : "rgba(255,255,255,0.45)", fontSize: "0.73rem", fontWeight: 600 }}>
                {allEligibleSelected ? <CheckSquare size={14} /> : <Square size={14} />}
                {allEligibleSelected ? "Deselect all" : `Select all ${eligible.length} eligible`}
              </button>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                {selectedIds.size > 0 && (
                  <button onClick={() => { setSelectedIds(new Set()); lastClickedIndexRef.current = null; }}
                    style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.3)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>
                    Clear
                  </button>
                )}
                <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.3)" }}>
                  {filtered.length} shown · <span style={{ color: selectedIds.size > 0 ? "#f87171" : "rgba(255,255,255,0.3)", fontWeight: selectedIds.size > 0 ? 700 : 400 }}>{selectedIds.size} selected</span>
                </span>
              </div>
            </div>

            {/* ── Contact list ── */}
            <div style={{ overflowY: "auto", flex: 1, minHeight: 0 }}>
              {loadingContacts ? (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "3rem", gap: "0.75rem", color: "rgba(255,255,255,0.3)", fontSize: "0.8rem" }}>
                  <RefreshCw size={16} style={{ animation: "spin 1s linear infinite" }} /> Loading contacts…
                </div>
              ) : filtered.length === 0 ? (
                <div style={{ padding: "3rem", textAlign: "center", color: "rgba(255,255,255,0.25)", fontSize: "0.8rem" }}>
                  No contacts match your filters.
                </div>
              ) : viewMode === "list" ? (
                <>
                  {visible.map((c, index) => {
                    const alreadyIn = memberIds.has(c.id);
                    return (
                      <ContactRow
                        key={c.id}
                        c={c}
                        index={index}
                        alreadyIn={alreadyIn}
                        selected={selectedIds.has(c.id)}
                        onRowClick={handleRowClick}
                      />
                    );
                  })}
                  {canLoadMore && (
                    <div style={{ padding: "0.875rem", textAlign: "center" }}>
                      <button onClick={() => setPage((p) => p + 1)}
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.55)", borderRadius: "0.6rem", padding: "0.45rem 1.5rem", fontSize: "0.76rem", cursor: "pointer" }}>
                        Show more ({filtered.length - visible.length} remaining)
                      </button>
                    </div>
                  )}
                </>
              ) : (
                /* ── Grouped view ── */
                grouped.map(([company, contacts]) => {
                  const eligibleInGroup = contacts.filter((c) => !memberIds.has(c.id));
                  const selectedInGroup = eligibleInGroup.filter((c) => selectedIds.has(c.id)).length;
                  const allGroupSelected = eligibleInGroup.length > 0 && selectedInGroup === eligibleInGroup.length;
                  const partialGroupSelected = selectedInGroup > 0 && !allGroupSelected;
                  const isCollapsed = collapsedGroups.has(company);

                  return (
                    <div key={company} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                      {/* Group header */}
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.55rem 1.5rem", background: "rgba(255,255,255,0.018)", cursor: "pointer" }}>
                        {/* Group checkbox */}
                        <div onClick={() => toggleGroup(company, contacts)} style={{ flexShrink: 0, cursor: eligibleInGroup.length === 0 ? "default" : "pointer" }}>
                          <Checkbox checked={allGroupSelected} partial={partialGroupSelected} disabled={eligibleInGroup.length === 0} />
                        </div>
                        {/* Collapse toggle + label */}
                        <div onClick={() => toggleCollapse(company)} style={{ flex: 1, display: "flex", alignItems: "center", gap: "0.5rem", minWidth: 0 }}>
                          {isCollapsed ? <ChevronRight size={12} style={{ color: "rgba(255,255,255,0.3)", flexShrink: 0 }} /> : <ChevronDown size={12} style={{ color: "rgba(255,255,255,0.3)", flexShrink: 0 }} />}
                          <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#fff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{company}</span>
                          <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.3)", flexShrink: 0 }}>
                            {contacts.length} contact{contacts.length !== 1 ? "s" : ""}
                            {selectedInGroup > 0 && <span style={{ color: "#f87171", marginLeft: "0.4rem" }}>· {selectedInGroup} selected</span>}
                          </span>
                        </div>
                        {/* Quick select all in group */}
                        {eligibleInGroup.length > 0 && (
                          <button onClick={() => toggleGroup(company, contacts)}
                            style={{ fontSize: "0.65rem", padding: "2px 8px", borderRadius: "99px", background: allGroupSelected ? "rgba(230,57,70,0.15)" : "rgba(255,255,255,0.05)", border: "1px solid " + (allGroupSelected ? "rgba(230,57,70,0.3)" : "rgba(255,255,255,0.08)"), color: allGroupSelected ? "#f87171" : "rgba(255,255,255,0.4)", cursor: "pointer", flexShrink: 0, whiteSpace: "nowrap" }}>
                            {allGroupSelected ? "Deselect all" : `Select all ${eligibleInGroup.length}`}
                          </button>
                        )}
                      </div>

                      {/* Group rows */}
                      {!isCollapsed && contacts.map((c) => {
                        const alreadyIn = memberIds.has(c.id);
                        return (
                          <GroupContactRow
                            key={c.id}
                            c={c}
                            alreadyIn={alreadyIn}
                            selected={selectedIds.has(c.id)}
                            onToggle={() => {
                              if (alreadyIn) return;
                              const next = new Set(selectedIds);
                              if (next.has(c.id)) next.delete(c.id); else next.add(c.id);
                              setSelectedIds(next);
                            }}
                          />
                        );
                      })}
                    </div>
                  );
                })
              )}
            </div>

            {/* ── Footer ── */}
            <div style={{ padding: "0.875rem 1.5rem", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.75rem" }}>
              <span style={{ fontSize: "0.76rem", color: "rgba(255,255,255,0.35)" }}>
                {selectedIds.size > 0
                  ? <><span style={{ color: "#f87171", fontWeight: 700 }}>{selectedIds.size}</span> contact{selectedIds.size !== 1 ? "s" : ""} selected</>
                  : "Select contacts above"}
              </span>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button onClick={onClose} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.6)", borderRadius: "0.6rem", padding: "0.5rem 1.1rem", fontSize: "0.78rem", cursor: "pointer" }}>
                  Cancel
                </button>
                <button onClick={handleAdd} disabled={selectedIds.size === 0 || adding}
                  style={{ background: selectedIds.size === 0 ? "rgba(230,57,70,0.25)" : "var(--color-red, #e63946)", border: "none", color: "#fff", borderRadius: "0.6rem", padding: "0.5rem 1.25rem", fontSize: "0.8rem", fontWeight: 700, cursor: selectedIds.size === 0 ? "default" : "pointer", display: "flex", alignItems: "center", gap: "0.4rem", opacity: adding ? 0.6 : 1, transition: "all 0.14s", fontFamily: "var(--font-heading)" }}>
                  {adding ? <RefreshCw size={13} style={{ animation: "spin 1s linear infinite" }} /> : <Plus size={13} />}
                  {adding ? "Adding…" : `Add ${selectedIds.size > 0 ? selectedIds.size : ""} to List`}
                </button>
              </div>
            </div>
          </>
        ) : (
          /* ── Paste tab ── */
          <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem", flex: 1, overflowY: "auto" }}>
            <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>
              Paste email addresses (one per line, or comma / semicolon separated).<br />
              Only contacts already in your database will be added.
            </p>
            <form onSubmit={handlePasteImport} style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              <textarea
                value={pastedEmails}
                onChange={(e) => { setPastedEmails(e.target.value); setPasteResult(null); }}
                placeholder={"john@acme.com\njane@corp.com\nbob@example.com"}
                rows={10}
                style={{ ...inputStyle, resize: "vertical", fontFamily: "monospace", fontSize: "0.78rem", lineHeight: "1.6" }}
              />
              {pasteResult && (
                <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "0.75rem", padding: "1rem 1.25rem", display: "flex", gap: "2rem" }}>
                  {([["added", "#4ade80", pasteResult.added], ["already in list", "rgba(255,255,255,0.4)", pasteResult.alreadyIn], ["not found", "#f87171", pasteResult.notFound]] as [string, string, number][]).map(([label, color, val]) => (
                    <div key={label} style={{ textAlign: "center" }}>
                      <p style={{ fontSize: "1.4rem", fontWeight: 700, color, lineHeight: 1 }}>{val}</p>
                      <p style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.4)", marginTop: "0.25rem" }}>{label}</p>
                    </div>
                  ))}
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button type="submit" disabled={pasteLoading || !pastedEmails.trim()}
                  style={{ background: "var(--color-red, #e63946)", border: "none", color: "#fff", borderRadius: "0.625rem", padding: "0.6rem 1.5rem", fontSize: "0.82rem", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem", opacity: pasteLoading || !pastedEmails.trim() ? 0.5 : 1, fontFamily: "var(--font-heading)" }}>
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

// ─────────────────────────────────────────────
// Flat list row (supports shift-click)
// ─────────────────────────────────────────────
function ContactRow({
  c, index, alreadyIn, selected, onRowClick,
}: {
  c: Contact;
  index: number;
  alreadyIn: boolean;
  selected: boolean;
  onRowClick: (c: Contact, index: number, shift: boolean) => void;
}) {
  return (
    <div
      onClick={(e) => onRowClick(c, index, e.shiftKey)}
      style={{
        display: "flex", alignItems: "center", gap: "0.875rem",
        padding: "0.55rem 1.5rem",
        cursor: alreadyIn ? "default" : "pointer",
        opacity: alreadyIn ? 0.4 : 1,
        borderBottom: "1px solid rgba(255,255,255,0.025)",
        background: selected ? "rgba(230,57,70,0.05)" : "transparent",
        transition: "background 0.1s",
        userSelect: "none",
      }}
      onMouseEnter={(e) => { if (!alreadyIn) (e.currentTarget as HTMLDivElement).style.background = selected ? "rgba(230,57,70,0.08)" : "rgba(255,255,255,0.02)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = selected ? "rgba(230,57,70,0.05)" : "transparent"; }}
    >
      <Checkbox checked={selected || alreadyIn} disabled={alreadyIn} />
      <div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, background: "rgba(230,57,70,0.12)", color: "#f87171", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.68rem", fontWeight: 700 }}>
        {(c.name || c.email)[0].toUpperCase()}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "#fff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.name || c.email}</span>
          {c.status === "unsubscribed" && <span style={{ fontSize: "0.6rem", padding: "1px 5px", borderRadius: 99, background: "rgba(230,57,70,0.12)", color: "#f87171", flexShrink: 0 }}>unsub</span>}
          {alreadyIn && <span style={{ fontSize: "0.6rem", padding: "1px 5px", borderRadius: 99, background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.4)", flexShrink: 0 }}>in list</span>}
        </div>
        <div style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.28)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {c.name ? c.email : ""}
          {(c.title || c.company) && <span> · {c.title}{c.title && c.company ? " at " : ""}{c.company}</span>}
        </div>
      </div>
      {c.lists && !alreadyIn && (
        <span style={{ fontSize: "0.62rem", padding: "2px 6px", borderRadius: 99, background: "rgba(168,85,247,0.1)", color: "#c084fc", border: "1px solid rgba(168,85,247,0.2)", flexShrink: 0, maxWidth: 110, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={c.lists}>
          {c.lists}
        </span>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// Grouped view row (no shift-select, simpler)
// ─────────────────────────────────────────────
function GroupContactRow({ c, alreadyIn, selected, onToggle }: { c: Contact; alreadyIn: boolean; selected: boolean; onToggle: () => void }) {
  return (
    <div
      onClick={onToggle}
      style={{
        display: "flex", alignItems: "center", gap: "0.875rem",
        padding: "0.5rem 1.5rem 0.5rem 3.25rem",
        cursor: alreadyIn ? "default" : "pointer",
        opacity: alreadyIn ? 0.4 : 1,
        borderBottom: "1px solid rgba(255,255,255,0.02)",
        background: selected ? "rgba(230,57,70,0.04)" : "transparent",
        transition: "background 0.1s",
        userSelect: "none",
      }}
      onMouseEnter={(e) => { if (!alreadyIn) (e.currentTarget as HTMLDivElement).style.background = selected ? "rgba(230,57,70,0.06)" : "rgba(255,255,255,0.015)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = selected ? "rgba(230,57,70,0.04)" : "transparent"; }}
    >
      <Checkbox checked={selected || alreadyIn} disabled={alreadyIn} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <span style={{ fontSize: "0.76rem", fontWeight: 600, color: "#fff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.name || c.email}</span>
          {c.status === "unsubscribed" && <span style={{ fontSize: "0.6rem", padding: "1px 5px", borderRadius: 99, background: "rgba(230,57,70,0.12)", color: "#f87171", flexShrink: 0 }}>unsub</span>}
          {alreadyIn && <span style={{ fontSize: "0.6rem", padding: "1px 5px", borderRadius: 99, background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.4)", flexShrink: 0 }}>in list</span>}
        </div>
        <div style={{ fontSize: "0.67rem", color: "rgba(255,255,255,0.28)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {c.name ? c.email : ""}
          {c.title && <span> · {c.title}</span>}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Main page
// ─────────────────────────────────────────────
export default function ListsClient() {
  const [lists, setLists] = useState<ContactList[]>([]);
  const [selected, setSelected] = useState<ContactList | null>(null);
  const [members, setMembers] = useState<Contact[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [memberSearch, setMemberSearch] = useState("");

  // Inline list rename
  const [renamingId, setRenamingId] = useState<number | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const renameInputRef = useRef<HTMLInputElement>(null);

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
    if (!res.ok) { toast.error(data.error ?? "Failed to create list"); }
    else { setNewListName(""); fetchLists(); toast.success(`List "${newListName.trim()}" created`); }
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
    toast.success("List deleted");
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
    toast.success("Removed from list");
    fetchMembers(selected.id);
    fetchLists();
  }

  async function handleModalDone() {
    setShowModal(false);
    if (selected) {
      await fetchMembers(selected.id);
      await fetchLists();
      setSelected((prev) => prev ? { ...prev } : null);
    }
  }

  async function handleRenameList(id: number, newName: string) {
    const trimmed = newName.trim();
    setRenamingId(null);
    if (!trimmed) return;
    const current = lists.find((l) => l.id === id);
    if (current && current.name === trimmed) return;
    const res = await fetch("/api/lists", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, name: trimmed }),
    });
    if (res.ok) {
      toast.success(`Renamed to "${trimmed}"`);
    } else {
      const d = await res.json();
      toast.error(d.error ?? "Rename failed");
    }
    await fetchLists();
    setSelected((prev) => prev?.id === id ? { ...prev, name: trimmed } : prev);
  }

  const memberIds = useMemo(() => new Set(members.map((m) => m.id)), [members]);

  const filteredMembers = useMemo(() => {
    const q = memberSearch.toLowerCase().trim();
    if (!q) return members;
    return members.filter((c) =>
      c.email.toLowerCase().includes(q) ||
      (c.name || "").toLowerCase().includes(q) ||
      (c.company || "").toLowerCase().includes(q)
    );
  }, [members, memberSearch]);

  return (
    <>
      <ToastProvider />
      {showModal && selected && (
        <AddContactsModal
          listId={selected.id}
          listName={selected.name}
          memberIds={memberIds}
          onClose={() => setShowModal(false)}
          onDone={handleModalDone}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          <div className="rounded-2xl p-5" style={{ background: "#1a1d23", border: "1px solid rgba(255,255,255,0.06)" }}>
            <p className="text-sm font-bold text-white mb-4" style={{ fontFamily: "var(--font-heading)" }}>New List</p>
            <form onSubmit={handleCreateList} className="flex flex-col gap-3">
              <input style={inputStyle} placeholder="e.g. MEP Engineers" value={newListName} onChange={(e) => setNewListName(e.target.value)} required />
              {error && <p className="text-xs" style={{ color: "#f87171" }}>{error}</p>}
              <button type="submit" disabled={loading}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold text-white transition-all hover:scale-[1.02] disabled:opacity-50"
                style={{ background: "var(--color-red)", fontFamily: "var(--font-heading)", boxShadow: "0 4px 16px rgba(230,57,70,0.3)" }}>
                {loading ? <Spinner size={14} /> : <Plus size={14} />} Create List
              </button>
            </form>
          </div>

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
            ) : lists.map((list, i) => (
              <div key={list.id}
                className="flex items-center justify-between px-5 py-3.5 cursor-pointer transition-colors group"
                style={{ borderBottom: i < lists.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none", background: selected?.id === list.id ? "rgba(230,57,70,0.06)" : "transparent" }}
                onClick={() => renamingId !== list.id && openList(list)}>
                <div className="flex items-center gap-3 overflow-hidden flex-1 min-w-0">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: selected?.id === list.id ? "rgba(230,57,70,0.15)" : "rgba(255,255,255,0.05)" }}>
                    <Users size={13} style={{ color: selected?.id === list.id ? "#f87171" : "rgba(255,255,255,0.4)" }} />
                  </div>
                  <div className="overflow-hidden flex-1 min-w-0">
                    {renamingId === list.id ? (
                      <input
                        ref={renameInputRef}
                        autoFocus
                        value={renameValue}
                        onChange={(e) => setRenameValue(e.target.value)}
                        onBlur={() => handleRenameList(list.id, renameValue)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") { e.preventDefault(); handleRenameList(list.id, renameValue); }
                          if (e.key === "Escape") { e.preventDefault(); setRenamingId(null); }
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="text-sm font-medium w-full outline-none"
                        style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(230,57,70,0.4)", borderRadius: "0.375rem", padding: "2px 6px", color: "#fff" }}
                      />
                    ) : (
                      <p className="text-sm font-medium truncate" style={{ color: selected?.id === list.id ? "#fff" : "rgba(255,255,255,0.7)" }}>{list.name}</p>
                    )}
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>{Number(list.member_count)} contacts</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={(e) => { e.stopPropagation(); setRenamingId(list.id); setRenameValue(list.name); }}
                    className="w-6 h-6 rounded-lg flex items-center justify-center transition-all hover:bg-white/10 opacity-0 group-hover:opacity-100"
                    style={{ color: "rgba(255,255,255,0.4)" }} title="Rename list">
                    <Pencil size={11} />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); handleDeleteList(list.id); }}
                    className="w-6 h-6 rounded-lg flex items-center justify-center transition-all hover:bg-red-500/10"
                    style={{ color: "rgba(255,255,255,0.2)" }}>
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="lg:col-span-2">
          {!selected ? (
            <div className="rounded-2xl flex flex-col items-center justify-center py-24 text-center"
              style={{ background: "#1a1d23", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3" style={{ background: "rgba(255,255,255,0.04)" }}>
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
                    {renamingId === selected.id ? (
                      <input
                        autoFocus
                        value={renameValue}
                        onChange={(e) => setRenameValue(e.target.value)}
                        onBlur={() => handleRenameList(selected.id, renameValue)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") { e.preventDefault(); handleRenameList(selected.id, renameValue); }
                          if (e.key === "Escape") { e.preventDefault(); setRenamingId(null); }
                        }}
                        className="text-sm font-bold outline-none"
                        style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(230,57,70,0.4)", borderRadius: "0.375rem", padding: "3px 8px", color: "#fff", fontFamily: "var(--font-heading)", minWidth: 180 }}
                      />
                    ) : (
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>{selected.name}</p>
                        <button
                          onClick={() => { setRenamingId(selected.id); setRenameValue(selected.name); }}
                          className="w-5 h-5 rounded flex items-center justify-center transition-all hover:bg-white/10"
                          style={{ color: "rgba(255,255,255,0.3)" }} title="Rename list">
                          <Pencil size={11} />
                        </button>
                      </div>
                    )}
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>{members.length} contacts</p>
                  </div>
                </div>
                <button onClick={() => setShowModal(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-white transition-all hover:scale-[1.02]"
                  style={{ background: "var(--color-red)", fontFamily: "var(--font-heading)" }}>
                  <Plus size={12} /> Add Contacts
                </button>
              </div>

              {/* Member search — always visible */}
              <div style={{ padding: "0.75rem 1.5rem", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <div style={{ position: "relative" }}>
                  <Search size={13} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.3)", pointerEvents: "none" }} />
                  <input style={{ ...inputStyle, paddingLeft: "2.2rem", fontSize: "0.78rem", borderRadius: "0.625rem" }}
                    placeholder="Search members…" value={memberSearch} onChange={(e) => setMemberSearch(e.target.value)} />
                  {memberSearch && (
                    <button onClick={() => setMemberSearch("")} style={{ position: "absolute", right: "0.625rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.3)", display: "flex" }}>
                      <X size={12} />
                    </button>
                  )}
                </div>
              </div>

              {/* Members */}
              {members.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <p className="text-sm font-semibold text-white mb-1">No contacts yet</p>
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>Click "Add Contacts" to add people to this list.</p>
                </div>
              ) : filteredMembers.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>No members match your search.</p>
                </div>
              ) : filteredMembers.map((c, i) => (
                <div key={c.id}
                  className="flex items-center justify-between px-6 py-3.5 transition-colors hover:bg-white/[0.02]"
                  style={{ borderBottom: i < filteredMembers.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                      style={{ background: "rgba(230,57,70,0.12)", color: "#f87171" }}>
                      {(c.name || c.email)[0].toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-white">{c.name || c.email}</p>
                        {c.status === "unsubscribed" && (
                          <span className="text-xs px-1.5 py-0.5 rounded-full font-medium" style={{ background: "rgba(230,57,70,0.12)", color: "#f87171" }}>unsubscribed</span>
                        )}
                      </div>
                      <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
                        {c.name ? c.email : ""}
                        {(c.title || c.company) && <>{c.name ? " · " : ""}{c.title}{c.title && c.company ? " at " : ""}{c.company}</>}
                      </p>
                    </div>
                  </div>
                  <button onClick={() => handleRemoveMember(c.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all hover:bg-white/5"
                    style={{ color: "rgba(255,255,255,0.3)" }} title="Remove from list">
                    <UserMinus size={12} /> Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
