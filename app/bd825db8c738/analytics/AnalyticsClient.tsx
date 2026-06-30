"use client";

import { useEffect, useState } from "react";
import { Mail, Eye, AlertTriangle, UserMinus, Send, Users, TrendingUp, Loader2 } from "lucide-react";
import { Pagination } from "../Toast";

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

interface BrevoEvent {
  email: string;
  date: string;
  subject: string;
  event: string;
  reason?: string;
}

interface AnalyticsData {
  brevo: BrevoStats;
  events: BrevoEvent[];
  contacts: ContactEngagement[];
  totals: Totals;
}

// Map a Brevo event type to a readable label + colors
function eventStyle(ev: string): { label: string; color: string; bg: string } {
  switch (ev) {
    case "delivered":    return { label: "Delivered",    color: "#4ade80", bg: "rgba(74,222,128,0.12)" };
    case "requests":     return { label: "Sent",         color: "#93c5fd", bg: "rgba(147,197,253,0.12)" };
    case "opened":
    case "uniqueOpened": return { label: "Opened",       color: "#fbbf24", bg: "rgba(251,191,36,0.14)" };
    case "clicks":
    case "uniqueClicks": return { label: "Clicked",      color: "#a5b4fc", bg: "rgba(165,180,252,0.14)" };
    case "loadedByProxy":return { label: "Proxy open",   color: "#fcd34d", bg: "rgba(252,211,77,0.10)" };
    case "softBounces":  return { label: "Soft bounce",  color: "#fb923c", bg: "rgba(251,146,60,0.14)" };
    case "hardBounces":  return { label: "Hard bounce",  color: "#f87171", bg: "rgba(248,113,113,0.14)" };
    case "deferred":     return { label: "Deferred",     color: "#fdba74", bg: "rgba(253,186,116,0.10)" };
    case "blocked":      return { label: "Blocked",      color: "#f87171", bg: "rgba(248,113,113,0.14)" };
    case "spam":         return { label: "Spam",         color: "#f87171", bg: "rgba(248,113,113,0.14)" };
    case "invalid":      return { label: "Invalid",      color: "#94a3b8", bg: "rgba(148,163,184,0.14)" };
    case "unsubscribed": return { label: "Unsubscribed", color: "#f87171", bg: "rgba(248,113,113,0.14)" };
    case "error":        return { label: "Error",        color: "#f87171", bg: "rgba(248,113,113,0.14)" };
    default:             return { label: ev,             color: "rgba(255,255,255,0.6)", bg: "rgba(255,255,255,0.06)" };
  }
}

function fmtDateTime(iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleString("en-US", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
}

const card = {
  background: "#1a1d23",
  border: "1px solid rgba(255,255,255,0.06)",
  borderRadius: "1rem",
};

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
  const [eventPage, setEventPage] = useState(1);
  const EVENTS_PER_PAGE = 20;

  useEffect(() => {
    let active = true;
    setLoading(true);
    setEventPage(1);
    fetch(`/api/analytics?days=${days}`)
      .then((r) => r.json())
      .then((d: AnalyticsData) => { if (active) { setData(d); setLoading(false); } })
      .catch(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [days]);

  const b = data?.brevo;
  const allEvents = data?.events ?? [];
  const totalEventPages = Math.max(1, Math.ceil(allEvents.length / EVENTS_PER_PAGE));
  const currentEventPage = Math.min(eventPage, totalEventPages);
  const pagedEvents = allEvents.slice((currentEventPage - 1) * EVENTS_PER_PAGE, currentEventPage * EVENTS_PER_PAGE);
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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={Users} label="Total Contacts" value={data?.totals.total_contacts ?? 0} color="#7dd3fc" dim="rgba(125,211,252,0.1)" />
          <StatCard icon={Send} label="Emails Sent (all time)" value={data?.totals.total_sends ?? 0} color="#4ade80" dim="rgba(74,222,128,0.1)" />
          <StatCard icon={Eye} label="Total Opens" value={data?.totals.total_opens ?? 0} color="#fbbf24" dim="rgba(251,191,36,0.12)" />
          <StatCard icon={UserMinus} label="Unsubscribed / Suppressed" value={data?.totals.total_suppressed ?? 0} color="#f87171" dim="rgba(248,113,113,0.12)" />
        </div>
      </div>

      {/* Deliverability (from Brevo) */}
      <div>
        <div className="flex items-center justify-between gap-3 flex-wrap mb-3">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>
            Deliverability <span style={{ color: "rgba(255,255,255,0.2)" }}>· via Brevo · {b?.range ?? `last ${days} days`}</span>
            {loading && <Loader2 className="animate-spin" size={12} style={{ color: "rgba(255,255,255,0.35)" }} />}
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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={Mail} label="Delivered" value={b?.delivered ?? 0} sub={`${deliveryRate}% of ${b?.requests ?? 0} sent`} color="#4ade80" dim="rgba(74,222,128,0.1)" />
          <StatCard icon={Eye} label="Unique Opens" value={b?.uniqueOpens ?? 0} sub={`${openRate}% open rate`} color="#fbbf24" dim="rgba(251,191,36,0.12)" />
          <StatCard icon={TrendingUp} label="Unique Clicks" value={b?.uniqueClicks ?? 0} color="#a5b4fc" dim="rgba(165,180,252,0.12)" />
          <StatCard icon={AlertTriangle} label="Bounces" value={bounces} sub={`${b?.hardBounces ?? 0} hard · ${b?.softBounces ?? 0} soft`} color="#fb923c" dim="rgba(251,146,60,0.12)" />
        </div>
        {b && b.requests === 0 && (
          <p className="text-xs mt-2" style={{ color: "rgba(255,255,255,0.25)" }}>
            No Brevo activity in this window yet (or the API couldn&apos;t be reached). Your send-log numbers above are always accurate.
          </p>
        )}
      </div>

      {/* Recent email activity (live event log from Brevo, newest first) */}
      <div style={card} className="overflow-hidden">
        <div className="px-5 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <p className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>Recent Email Activity</p>
          <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>
            Latest send events — delivered, opened, clicked, bounced — newest first · via Brevo · {b?.range ?? `last ${days} days`}
          </p>
        </div>

        {loading ? (
          <div className="py-12 text-center text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>Loading…</div>
        ) : allEvents.length === 0 ? (
          <div className="py-12 text-center text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
            No email activity in this window (or Brevo couldn&apos;t be reached).
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full" style={{ minWidth: 560 }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <th className="text-left px-5 py-2.5 text-xs font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.25)" }}>Event</th>
                    <th className="text-left px-5 py-2.5 text-xs font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.25)" }}>Recipient</th>
                    <th className="text-left px-5 py-2.5 text-xs font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.25)" }}>Subject</th>
                    <th className="text-right px-5 py-2.5 text-xs font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.25)" }}>When</th>
                  </tr>
                </thead>
                <tbody>
                  {pagedEvents.map((ev, i) => {
                    const s = eventStyle(ev.event);
                    return (
                      <tr key={`${ev.email}-${ev.date}-${i}`} style={{ borderBottom: i < pagedEvents.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                        <td className="px-5 py-3">
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: s.bg, color: s.color }} title={ev.reason || s.label}>{s.label}</span>
                        </td>
                        <td className="px-5 py-3 text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
                          <span className="truncate inline-block max-w-[220px] align-middle">{ev.email}</span>
                        </td>
                        <td className="px-5 py-3 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
                          <span className="truncate inline-block max-w-[260px] align-middle" title={ev.subject}>{ev.subject || "—"}</span>
                        </td>
                        <td className="px-5 py-3 text-right text-xs whitespace-nowrap" style={{ color: "rgba(255,255,255,0.35)" }}>{fmtDateTime(ev.date)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <Pagination page={currentEventPage} total={allEvents.length} perPage={EVENTS_PER_PAGE} onPage={setEventPage} />
          </>
        )}
      </div>
    </div>
  );
}
