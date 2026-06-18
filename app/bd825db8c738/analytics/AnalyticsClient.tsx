"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, Mail, Eye, AlertTriangle, Ban, UserMinus, Send, Users, TrendingUp, ChevronUp, ChevronDown } from "lucide-react";

interface ContactEngagement {
  email: string;
  name: string;
  status: string;
  title: string;
  company: string;
  sends: number;
  opens: number;
  last_sent: number | null;
  suppressed: number;
}

interface BrevoStats {
  range: string;
  requests: number;
  delivered: number;
  hardBounces: number;
  softBounces: number;
  clicks: number;
  uniqueClicks: number;
  opens: number;
  uniqueOpens: number;
  spamReports: number;
  blocked: number;
  invalid: number;
  unsubscribed: number;
}

interface Totals {
  total_contacts: number;
  total_sends: number;
  total_opens: number;
  total_suppressed: number;
}

interface AnalyticsData {
  brevo: BrevoStats;
  contacts: ContactEngagement[];
  totals: Totals;
}

type SortKey = "name" | "sends" | "opens" | "rate" | "last_sent";

const card = {
  background: "#1a1d23",
  border: "1px solid rgba(255,255,255,0.06)",
  borderRadius: "1rem",
};

function fmtDate(unix: number | null) {
  if (!unix) return "—";
  return new Date(unix * 1000).toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" });
}

function StatCard({ icon: Icon, label, value, sub, color, dim }: {
  icon: typeof Mail; label: string; value: number | string; sub?: string; color: string; dim: string;
}) {
  return (
    <div className="px-5 py-5" style={card}>
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>{label}</p>
        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: dim }}>
          <Icon size={14} style={{ color }} />
        </div>
      </div>
      <p className="text-3xl font-black" style={{ fontFamily: "var(--font-heading)", color }}>{value}</p>
      {sub && <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.3)" }}>{sub}</p>}
    </div>
  );
}

export default function AnalyticsClient() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(30);
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("sends");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetch(`/api/analytics?days=${days}`)
      .then((r) => r.json())
      .then((d: AnalyticsData) => { if (active) { setData(d); setLoading(false); } })
      .catch(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [days]);

  const rows = useMemo(() => {
    if (!data) return [];
    const q = query.trim().toLowerCase();
    const filtered = data.contacts.filter(
      (c) => !q || c.email.toLowerCase().includes(q) || c.name.toLowerCase().includes(q)
    );
    const rate = (c: ContactEngagement) => (c.sends > 0 ? c.opens / c.sends : 0);
    const sorted = [...filtered].sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case "name": cmp = (a.name || a.email).localeCompare(b.name || b.email); break;
        case "sends": cmp = a.sends - b.sends; break;
        case "opens": cmp = a.opens - b.opens; break;
        case "rate": cmp = rate(a) - rate(b); break;
        case "last_sent": cmp = (a.last_sent ?? 0) - (b.last_sent ?? 0); break;
      }
      return sortDir === "asc" ? cmp : -cmp;
    });
    return sorted;
  }, [data, query, sortKey, sortDir]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir(key === "name" ? "asc" : "desc"); }
  }

  const b = data?.brevo;
  const bounces = b ? b.hardBounces + b.softBounces : 0;
  const deliveryRate = b && b.requests > 0 ? Math.round((b.delivered / b.requests) * 100) : 0;
  const openRate = b && b.delivered > 0 ? Math.round((b.uniqueOpens / b.delivered) * 100) : 0;

  return (
    <div className="flex flex-col gap-6">
      {/* Engagement totals (from your own send logs) */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "rgba(255,255,255,0.3)" }}>
          Your audience
        </p>
        <div className="grid grid-cols-4 gap-4">
          <StatCard icon={Users} label="Total Contacts" value={data?.totals.total_contacts ?? 0} color="#7dd3fc" dim="rgba(125,211,252,0.1)" />
          <StatCard icon={Send} label="Emails Sent (all time)" value={data?.totals.total_sends ?? 0} color="#4ade80" dim="rgba(74,222,128,0.1)" />
          <StatCard icon={Eye} label="Total Opens" value={data?.totals.total_opens ?? 0} color="#fbbf24" dim="rgba(251,191,36,0.12)" />
          <StatCard icon={UserMinus} label="Unsubscribed / Suppressed" value={data?.totals.total_suppressed ?? 0} color="#f87171" dim="rgba(248,113,113,0.12)" />
        </div>
      </div>

      {/* Deliverability (from Brevo) */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>
            Deliverability <span style={{ color: "rgba(255,255,255,0.2)" }}>· via Brevo · {b?.range ?? `last ${days} days`}</span>
          </p>
          <div className="flex items-center gap-1 p-1 rounded-lg" style={{ background: "rgba(255,255,255,0.04)" }}>
            {[7, 30, 90].map((d) => (
              <button
                key={d}
                onClick={() => setDays(d)}
                className="px-3 py-1 rounded-md text-xs font-semibold transition-colors"
                style={{
                  background: days === d ? "rgba(230,57,70,0.15)" : "transparent",
                  color: days === d ? "#f87171" : "rgba(255,255,255,0.4)",
                }}
              >
                {d}d
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <StatCard icon={Mail} label="Delivered" value={b?.delivered ?? 0} sub={`${deliveryRate}% of ${b?.requests ?? 0} sent`} color="#4ade80" dim="rgba(74,222,128,0.1)" />
          <StatCard icon={Eye} label="Unique Opens" value={b?.uniqueOpens ?? 0} sub={`${openRate}% open rate`} color="#fbbf24" dim="rgba(251,191,36,0.12)" />
          <StatCard icon={TrendingUp} label="Unique Clicks" value={b?.uniqueClicks ?? 0} color="#a5b4fc" dim="rgba(165,180,252,0.12)" />
          <StatCard icon={AlertTriangle} label="Bounces" value={bounces} sub={`${b?.hardBounces ?? 0} hard · ${b?.softBounces ?? 0} soft`} color="#fb923c" dim="rgba(251,146,60,0.12)" />
          <StatCard icon={Ban} label="Blocked" value={b?.blocked ?? 0} color="#f87171" dim="rgba(248,113,113,0.12)" />
          <StatCard icon={AlertTriangle} label="Spam Reports" value={b?.spamReports ?? 0} color="#f87171" dim="rgba(248,113,113,0.12)" />
          <StatCard icon={Mail} label="Invalid Emails" value={b?.invalid ?? 0} color="#94a3b8" dim="rgba(148,163,184,0.12)" />
          <StatCard icon={UserMinus} label="Unsubscribed" value={b?.unsubscribed ?? 0} color="#f87171" dim="rgba(248,113,113,0.12)" />
        </div>
        {b && b.requests === 0 && (
          <p className="text-xs mt-2" style={{ color: "rgba(255,255,255,0.25)" }}>
            No Brevo activity in this window yet (or the API couldn&apos;t be reached). Your send-log numbers above are always accurate.
          </p>
        )}
      </div>

      {/* Per-contact engagement table */}
      <div style={card} className="overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div>
            <p className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>Contact Engagement</p>
            <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>How many times each person has been emailed, and how often they open.</p>
          </div>
          <div className="relative">
            <Search size={14} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.3)" }} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name or email…"
              style={{
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "0.75rem", color: "#fff", padding: "0.5rem 0.75rem 0.5rem 2rem",
                fontSize: "0.8rem", outline: "none", width: "240px",
              }}
            />
          </div>
        </div>

        {loading ? (
          <div className="py-16 text-center text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>Loading…</div>
        ) : rows.length === 0 ? (
          <div className="py-16 text-center text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>No contacts match.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <Th label="Contact" k="name" sortKey={sortKey} sortDir={sortDir} onClick={toggleSort} />
                  <Th label="Emails Sent" k="sends" sortKey={sortKey} sortDir={sortDir} onClick={toggleSort} align="right" />
                  <Th label="Opens" k="opens" sortKey={sortKey} sortDir={sortDir} onClick={toggleSort} align="right" />
                  <Th label="Open Rate" k="rate" sortKey={sortKey} sortDir={sortDir} onClick={toggleSort} align="right" />
                  <Th label="Last Contacted" k="last_sent" sortKey={sortKey} sortDir={sortDir} onClick={toggleSort} align="right" />
                  <th className="text-right px-5 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.25)" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((c, i) => {
                  const rate = c.sends > 0 ? Math.round((c.opens / c.sends) * 100) : 0;
                  return (
                    <tr key={c.email} className="transition-colors hover:bg-white/2"
                      style={{ borderBottom: i < rows.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                      <td className="px-5 py-3.5">
                        <p className="text-sm font-medium text-white truncate max-w-[220px]">{c.name || c.email}</p>
                        <p className="text-xs truncate max-w-[220px]" style={{ color: "rgba(255,255,255,0.3)" }}>
                          {c.name ? c.email : ""}
                          {(c.title || c.company) && (
                            <>
                              {c.name ? " • " : ""}
                              {c.title}
                              {c.title && c.company ? " at " : ""}
                              {c.company}
                            </>
                          )}
                        </p>
                      </td>
                      <td className="px-5 py-3.5 text-right text-sm font-semibold" style={{ color: c.sends > 0 ? "#fff" : "rgba(255,255,255,0.3)" }}>{c.sends}</td>
                      <td className="px-5 py-3.5 text-right text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>{c.opens}</td>
                      <td className="px-5 py-3.5 text-right">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{
                          background: rate >= 50 ? "rgba(74,222,128,0.1)" : rate > 0 ? "rgba(251,191,36,0.12)" : "rgba(255,255,255,0.05)",
                          color: rate >= 50 ? "#4ade80" : rate > 0 ? "#fbbf24" : "rgba(255,255,255,0.3)",
                        }}>{rate}%</span>
                      </td>
                      <td className="px-5 py-3.5 text-right text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>{fmtDate(c.last_sent)}</td>
                      <td className="px-5 py-3.5 text-right">
                        {c.suppressed ? (
                          <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "rgba(248,113,113,0.12)", color: "#f87171" }}>suppressed</span>
                        ) : (
                          <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: "rgba(74,222,128,0.1)", color: "#4ade80" }}>{c.status}</span>
                        )}
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

function Th({ label, k, sortKey, sortDir, onClick, align = "left" }: {
  label: string; k: SortKey; sortKey: SortKey; sortDir: "asc" | "desc"; onClick: (k: SortKey) => void; align?: "left" | "right";
}) {
  const activeSort = sortKey === k;
  return (
    <th className={`px-5 py-3 text-xs font-semibold uppercase tracking-wider ${align === "right" ? "text-right" : "text-left"}`} style={{ color: "rgba(255,255,255,0.25)" }}>
      <button onClick={() => onClick(k)} className={`inline-flex items-center gap-1 transition-colors hover:text-white/60 ${align === "right" ? "flex-row-reverse" : ""}`} style={{ color: activeSort ? "rgba(255,255,255,0.7)" : "inherit" }}>
        {label}
        {activeSort && (sortDir === "asc" ? <ChevronUp size={12} /> : <ChevronDown size={12} />)}
      </button>
    </th>
  );
}
