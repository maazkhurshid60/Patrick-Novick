"use client";

import { useEffect, useState, useMemo } from "react";
import { Search, UserCheck, AlertOctagon, RefreshCw, Download } from "lucide-react";

interface SuppressedContact {
  email: string;
  reason: string;
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

function fmtDate(unix: number) {
  return new Date(unix * 1000).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function OptOutsClient() {
  const [optouts, setOptouts] = useState<SuppressedContact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [search, setSearch] = useState("");

  async function fetchOptouts() {
    try {
      setLoading(true);
      const res = await fetch("/api/contacts/suppressed");
      if (!res.ok) throw new Error("Failed to fetch opt-outs list");
      const data = await res.json();
      setOptouts(data);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOptouts();
  }, []);

  async function handleReactivate(email: string) {
    if (!confirm(`Reactivate ${email}? This will remove them from the suppression list and set their status to active.`)) return;
    try {
      setError("");
      setSuccess("");
      const res = await fetch("/api/contacts/suppressed", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to reactivate contact");
      setSuccess(`Successfully reactivated ${email}`);
      fetchOptouts();
    } catch (err: any) {
      setError(err.message || "An error occurred");
    }
  }

  const filteredOptouts = useMemo(() => {
    const q = search.trim().toLowerCase();
    return optouts.filter(
      (o) => o.email.toLowerCase().includes(q) || o.reason.toLowerCase().includes(q)
    );
  }, [optouts, search]);

  function triggerDownload() {
    const a = document.createElement("a");
    a.href = "/api/export/suppression";
    a.click();
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-4">
        <div style={cardStyle} className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>Total Opt-Outs / Suppressed</p>
            <p className="text-3xl font-black mt-2" style={{ fontFamily: "var(--font-heading)", color: "#f87171" }}>
              {optouts.length}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-red-500/10">
            <AlertOctagon size={18} className="text-red-400" />
          </div>
        </div>

        <div style={cardStyle} className="flex flex-col justify-center gap-1 col-span-2">
          <p className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>Suppression List Purpose</p>
          <p className="text-xs mt-1 leading-relaxed" style={{ color: "rgba(255,255,255,0.3)" }}>
            Contacts are added to this list when they unsubscribe, bounce, or are marked invalid.
            The system strictly blocks outbound campaign sends to any email matching these records to guarantee spam compliance and sender domain health.
          </p>
        </div>
      </div>

      {/* Main List Container */}
      <div style={cardStyle} className="overflow-hidden !p-0">
        {/* Header toolbar */}
        <div className="flex items-center justify-between px-6 py-4 flex-wrap gap-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div>
            <p className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>Suppressed Contacts & Feedback Reasons</p>
            <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>View unsubscribes, opt-out reasons, and bounce events.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={14} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.3)" }} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search email or reason..."
                style={{
                  ...inputStyle,
                  padding: "0.5rem 0.75rem 0.5rem 2.2rem",
                  fontSize: "0.8rem",
                  width: "220px",
                }}
              />
            </div>
            
            <button
              onClick={triggerDownload}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all hover:scale-[1.02]"
              style={{ background: "rgba(230,57,70,0.08)", color: "#f87171", border: "1px solid rgba(230,57,70,0.15)", fontFamily: "var(--font-heading)" }}
            >
              <Download size={13} /> Export List
            </button>
            
            <button
              onClick={fetchOptouts}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-white/5"
              style={{ border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}
              title="Refresh opt-out list"
            >
              <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
            </button>
          </div>
        </div>

        {/* Notices */}
        {error && <div className="mx-6 mt-4 px-4 py-3 rounded-xl text-xs font-medium" style={{ background: "rgba(230,57,70,0.12)", color: "#f87171", border: "1px solid rgba(230,57,70,0.2)" }}>{error}</div>}
        {success && <div className="mx-6 mt-4 px-4 py-3 rounded-xl text-xs font-medium" style={{ background: "rgba(74,222,128,0.1)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.2)" }}>{success}</div>}

        {/* Table list */}
        {loading && optouts.length === 0 ? (
          <div className="py-20 text-center text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>Loading suppressed contacts...</div>
        ) : filteredOptouts.length === 0 ? (
          <div className="py-20 text-center text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>No opt-outs match your criteria.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <th className="text-left px-6 py-3.5 text-xs font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.25)" }}>Contact Email</th>
                  <th className="text-left px-6 py-3.5 text-xs font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.25)" }}>Unsubscribe Reason / Feedback</th>
                  <th className="text-left px-6 py-3.5 text-xs font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.25)" }}>Opt-Out Date</th>
                  <th className="text-right px-6 py-3.5 text-xs font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.25)" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredOptouts.map((o, i) => {
                  const isBounceOrInvalid = o.reason.includes("invalid") || o.reason.includes("bounce");
                  return (
                    <tr
                      key={o.email}
                      className="transition-colors hover:bg-white/[0.01]"
                      style={{ borderBottom: i < filteredOptouts.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}
                    >
                      <td className="px-6 py-4">
                        <span className="text-sm font-semibold text-white">{o.email}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className="px-2.5 py-1 rounded-full text-xs font-semibold inline-block max-w-[400px] truncate"
                          style={{
                            background: isBounceOrInvalid ? "rgba(234,179,8,0.08)" : "rgba(230,57,70,0.08)",
                            color: isBounceOrInvalid ? "#fbbf24" : "#f87171",
                            border: `1px solid ${isBounceOrInvalid ? "rgba(234,179,8,0.15)" : "rgba(230,57,70,0.15)"}`,
                          }}
                          title={o.reason}
                        >
                          {o.reason}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{fmtDate(o.created_at)}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleReactivate(o.email)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-white transition-all hover:scale-[1.03]"
                          style={{ background: "rgba(74,222,128,0.1)", color: "#4ade80", border: "1px solid rgba(74,222,128,0.2)" }}
                        >
                          <UserCheck size={12} /> Reactivate
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
