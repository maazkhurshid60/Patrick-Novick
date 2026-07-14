"use client";

import { useState, useEffect, useCallback, FormEvent } from "react";
import { Plus, X, ShieldCheck, User as UserIcon, Loader2, Lock } from "lucide-react";
import { ToastProvider, toast, Spinner } from "../Toast";

type Role = "admin" | "member";

interface AdminUser {
  id: number;
  username: string;
  role: Role;
  active: boolean;
  created_at: number;
}

interface Me {
  id: string;
  username: string;
  role: Role;
}

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

function fmtDate(unix: number) {
  return new Date(unix * 1000).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

export default function UsersClient() {
  const [me, setMe] = useState<Me | null>(null);
  const [meLoaded, setMeLoaded] = useState(false);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<number | null>(null); // row toggling

  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ username: "", password: "", role: "member" as Role });
  const [saving, setSaving] = useState(false);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/users");
      if (res.ok) setUsers(await res.json());
    } finally {
      setLoading(false);
    }
  }, []);

  // Resolve the current user, and (if admin) load the user list in the same pass.
  useEffect(() => {
    let cancelled = false;
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((data: Me | null) => {
        if (cancelled) return;
        setMe(data);
        setMeLoaded(true);
        if (data?.role === "admin") loadUsers();
      })
      .catch(() => {
        if (cancelled) return;
        setMe(null);
        setMeLoaded(true);
      });
    return () => { cancelled = true; };
  }, [loadUsers]);

  async function handleAdd(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) { toast.error(data.error ?? "Failed to create user"); return; }
      toast.success(`User “${form.username.trim()}” created`);
      setForm({ username: "", password: "", role: "member" });
      setShowAdd(false);
      loadUsers();
    } catch {
      toast.error("Couldn't reach the server. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  async function toggleActive(u: AdminUser) {
    setBusyId(u.id);
    try {
      const res = await fetch("/api/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: u.id, active: !u.active }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) { toast.error(data.error ?? "Failed to update user"); return; }
      setUsers((prev) => prev.map((x) => (x.id === u.id ? { ...x, active: !u.active } : x)));
      toast.success(`${u.username} ${!u.active ? "enabled" : "disabled"}`);
    } catch {
      toast.error("Couldn't reach the server. Please try again.");
    } finally {
      setBusyId(null);
    }
  }

  // ── Access control ──────────────────────────────────────────────────────────

  if (!meLoaded) {
    return (
      <div className="flex items-center justify-center py-24 gap-2 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
        <Spinner /> Loading…
      </div>
    );
  }

  if (me?.role !== "admin") {
    return (
      <div className="max-w-md mx-auto mt-16 rounded-2xl p-8 text-center" style={{ background: "#1a1d23", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(230,57,70,0.12)" }}>
          <Lock size={20} style={{ color: "#f87171" }} />
        </div>
        <p className="text-base font-bold text-white mb-1" style={{ fontFamily: "var(--font-heading)" }}>Admins only</p>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
          You need an admin account to manage dashboard users.
        </p>
      </div>
    );
  }

  // ── Admin view ──────────────────────────────────────────────────────────────

  return (
    <>
      <ToastProvider />

      <div className="flex items-center justify-between gap-3 flex-wrap mb-5">
        <div>
          <p className="text-lg font-black text-white" style={{ fontFamily: "var(--font-heading)" }}>
            Dashboard Users <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.35)" }}>· {users.length}</span>
          </p>
          <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>
            Create accounts and enable or disable access. Admins can manage users; members can’t.
          </p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:scale-[1.02]"
          style={{ background: "var(--color-red)", fontFamily: "var(--font-heading)", boxShadow: "0 4px 16px rgba(230,57,70,0.28)" }}
        >
          <Plus size={15} /> Add User
        </button>
      </div>

      {/* Bootstrap-admin note */}
      <div className="px-4 py-2.5 rounded-xl text-xs mb-4" style={{ background: "rgba(96,165,250,0.08)", color: "#93c5fd", border: "1px solid rgba(96,165,250,0.18)" }}>
        You’re signed in as <strong>{me.username}</strong>. The primary admin is configured via environment variables and isn’t listed here.
      </div>

      {/* Users table */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "#1a1d23", border: "1px solid rgba(255,255,255,0.06)" }}>
        {loading ? (
          <div className="py-16 flex items-center justify-center gap-2 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
            <Loader2 size={14} className="animate-spin" /> Loading users…
          </div>
        ) : users.length === 0 ? (
          <div className="py-16 text-center text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>
            No users yet. Click <strong>Add User</strong> to create one.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.8125rem" }}>
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.02)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  {["User", "Role", "Status", "Created", ""].map((h, i) => (
                    <th key={i} style={{ textAlign: i === 4 ? "right" : "left", padding: "0.75rem 1rem", fontWeight: 600, color: "rgba(255,255,255,0.35)", whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <td style={{ padding: "0.75rem 1rem" }}>
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0" style={{ background: "rgba(255,255,255,0.06)", color: "#fff" }}>
                          {u.username[0]?.toUpperCase() ?? "?"}
                        </div>
                        <span className="font-medium text-white">{u.username}</span>
                      </div>
                    </td>
                    <td style={{ padding: "0.75rem 1rem" }}>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
                        style={u.role === "admin"
                          ? { background: "rgba(230,57,70,0.12)", color: "#f87171" }
                          : { background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.55)" }}>
                        {u.role === "admin" ? <ShieldCheck size={11} /> : <UserIcon size={11} />}
                        {u.role}
                      </span>
                    </td>
                    <td style={{ padding: "0.75rem 1rem" }}>
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold" style={{ color: u.active ? "#4ade80" : "rgba(255,255,255,0.35)" }}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: u.active ? "#4ade80" : "rgba(255,255,255,0.3)" }} />
                        {u.active ? "Active" : "Disabled"}
                      </span>
                    </td>
                    <td style={{ padding: "0.75rem 1rem", color: "rgba(255,255,255,0.4)", whiteSpace: "nowrap" }}>{fmtDate(u.created_at)}</td>
                    <td style={{ padding: "0.75rem 1rem", textAlign: "right" }}>
                      <button
                        onClick={() => toggleActive(u)}
                        disabled={busyId === u.id}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all hover:scale-[1.02] disabled:opacity-50 cursor-pointer inline-flex items-center gap-1.5"
                        style={u.active
                          ? { background: "rgba(234,179,8,0.1)", color: "#fbbf24", border: "1px solid rgba(234,179,8,0.2)" }
                          : { background: "rgba(74,222,128,0.1)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.2)" }}
                      >
                        {busyId === u.id ? <Loader2 size={12} className="animate-spin" /> : null}
                        {u.active ? "Disable" : "Enable"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add User modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowAdd(false); }}>
          <div className="w-full max-w-sm rounded-xl p-6 border" style={{ background: "#16181e", borderColor: "rgba(255,255,255,0.08)", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.5)" }}>
            <div className="flex items-center justify-between mb-5">
              <p className="text-base font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>Add User</p>
              <button onClick={() => setShowAdd(false)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/5" style={{ color: "rgba(255,255,255,0.4)" }}><X size={16} /></button>
            </div>
            <form onSubmit={handleAdd} className="flex flex-col gap-4">
              <div>
                <label style={label}>Username</label>
                <input style={inp} value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} placeholder="jane" autoComplete="off" required minLength={3} />
              </div>
              <div>
                <label style={label}>Password</label>
                <input style={inp} type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="At least 8 characters" autoComplete="new-password" required minLength={8} />
              </div>
              <div>
                <label style={label}>Role</label>
                <select style={{ ...inp, cursor: "pointer" }} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as Role })}>
                  <option value="member" style={{ background: "#16181e" }}>Member — dashboard access only</option>
                  <option value="admin" style={{ background: "#16181e" }}>Admin — can also manage users</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 mt-1 text-sm font-bold">
                <button type="button" onClick={() => setShowAdd(false)} className="px-4 py-2 rounded-full text-slate-400 hover:bg-white/5 cursor-pointer" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>Cancel</button>
                <button type="submit" disabled={saving} className="px-5 py-2 rounded-full text-white cursor-pointer flex items-center gap-2 disabled:opacity-50" style={{ background: "var(--color-red)", boxShadow: "0 4px 16px rgba(230,57,70,0.3)" }}>
                  {saving ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />} Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
