"use client";

import { useState, useEffect, FormEvent } from "react";
import { Plus, Trash2, X, Users, UserMinus, ChevronLeft, Check } from "lucide-react";

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
}

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

export default function ListsClient() {
  const [lists, setLists] = useState<ContactList[]>([]);
  const [selected, setSelected] = useState<ContactList | null>(null);
  const [members, setMembers] = useState<Contact[]>([]);
  const [allContacts, setAllContacts] = useState<Contact[]>([]);
  const [showAddPanel, setShowAddPanel] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [newListName, setNewListName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchLists() {
    const res = await fetch("/api/lists");
    setLists(await res.json());
  }

  async function fetchMembers(listId: number) {
    const res = await fetch(`/api/lists/${listId}/members`);
    setMembers(await res.json());
  }

  async function fetchAllContacts() {
    const res = await fetch("/api/contacts");
    setAllContacts(await res.json());
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
    setShowAddPanel(false);
    setSelectedIds(new Set());
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

  async function openAddPanel() {
    await fetchAllContacts();
    setSelectedIds(new Set());
    setShowAddPanel(true);
  }

  async function handleAddContacts() {
    if (!selected || selectedIds.size === 0) return;
    setLoading(true);
    await fetch(`/api/lists/${selected.id}/members`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contactIds: Array.from(selectedIds) }),
    });
    setShowAddPanel(false);
    setSelectedIds(new Set());
    fetchMembers(selected.id);
    fetchLists();
    setLoading(false);
  }

  const memberIds = new Set(members.map((m) => m.id));

  return (
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
                onClick={openAddPanel}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-white transition-all hover:scale-[1.02]"
                style={{ background: "var(--color-red)", fontFamily: "var(--font-heading)" }}
              >
                <Plus size={12} /> Add Contacts
              </button>
            </div>

            {/* Add contacts panel */}
            {showAddPanel && (
              <div className="px-6 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-semibold text-white">Select contacts to add</p>
                  <button onClick={() => setShowAddPanel(false)} style={{ color: "rgba(255,255,255,0.3)" }}><X size={14} /></button>
                </div>
                {allContacts.length === 0 ? (
                  <p className="text-xs py-2" style={{ color: "rgba(255,255,255,0.3)" }}>No contacts found.</p>
                ) : (
                  <>
                    <div className="max-h-48 overflow-y-auto flex flex-col gap-1 mb-3">
                      {allContacts.map((c) => {
                        const isAlreadyMember = memberIds.has(c.id);
                        return (
                          <div
                            key={c.id}
                            className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-colors ${
                              isAlreadyMember
                                ? "opacity-50 cursor-not-allowed"
                                : "cursor-pointer hover:bg-white/[0.03]"
                            }`}
                            onClick={() => {
                              if (isAlreadyMember) return;
                              const next = new Set(selectedIds);
                              if (next.has(c.id)) next.delete(c.id); else next.add(c.id);
                              setSelectedIds(next);
                            }}
                          >
                            <div className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border transition-colors ${
                              isAlreadyMember
                                ? "border-white/10 bg-white/5"
                                : selectedIds.has(c.id)
                                ? "border-red-400 bg-red-500/20"
                                : "border-white/20"
                            }`}>
                              {(isAlreadyMember || selectedIds.has(c.id)) && (
                                <Check size={10} style={{ color: isAlreadyMember ? "rgba(255,255,255,0.3)" : "#f87171" }} />
                              )}
                            </div>
                            <div className="flex-1 min-w-0 flex items-center justify-between gap-2">
                              <div className="overflow-hidden">
                                <p className="text-xs font-medium text-white truncate">{c.name || c.email}</p>
                                {c.name && <p className="text-xs truncate" style={{ color: "rgba(255,255,255,0.35)" }}>{c.email}</p>}
                              </div>
                              {isAlreadyMember && (
                                <span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium shrink-0" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.4)" }}>
                                  already in list
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <button
                      disabled={selectedIds.size === 0 || loading}
                      onClick={handleAddContacts}
                      className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-white transition-all hover:scale-[1.02] disabled:opacity-40"
                      style={{ background: "var(--color-red)" }}
                    >
                      <Plus size={12} /> Add {selectedIds.size > 0 ? `${selectedIds.size} ` : ""}Selected
                    </button>
                  </>
                )}
              </div>
            )}

            {/* Members list */}
            {members.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <p className="text-sm font-semibold text-white mb-1">No contacts yet</p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>Click "Add Contacts" to add people to this list.</p>
              </div>
            ) : (
              members.map((c, i) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between px-6 py-3.5 transition-colors hover:bg-white/[0.02]"
                  style={{ borderBottom: i < members.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}
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
                      {c.name && <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{c.email}</p>}
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
  );
}
