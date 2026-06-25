import db from "@/lib/db";
import LogoutButton from "./LogoutButton";

export const dynamic = "force-dynamic";
export const revalidate = 0;

import Sidebar from "./Sidebar";
import Link from "next/link";
import { Send, Plus, Users, Layout, ArrowUpRight } from "lucide-react";

const BASE = "/bd825db8c738";

function formatDate(unix: number) {
  return new Date(unix * 1000).toLocaleDateString("en-US", {
    day: "2-digit", month: "short", year: "numeric",
  });
}

export default async function AdminPage() {
  const [contactRes, campaignRes, templateRes, recentRes, sumRes] = await Promise.all([
    db.execute("SELECT COUNT(*) as count FROM contacts"),
    db.execute("SELECT COUNT(*) as count FROM campaigns WHERE status = 'sent' AND recipient_count > 0"),
    db.execute("SELECT COUNT(*) as count FROM email_templates"),
    db.execute("SELECT id, subject, recipient_count, status, sent_at FROM campaigns WHERE status = 'sent' AND recipient_count > 0 ORDER BY sent_at DESC LIMIT 8"),
    db.execute("SELECT SUM(recipient_count) as s FROM campaigns WHERE status = 'sent' AND recipient_count > 0"),
  ]);

  const contactCount = Number(contactRes.rows[0]?.count ?? 0);
  const campaignCount = Number(campaignRes.rows[0]?.count ?? 0);
  const templateCount = Number(templateRes.rows[0]?.count ?? 0);
  const recentCampaigns = recentRes.rows as unknown as { id: number; subject: string; recipient_count: number; status: string; sent_at: number }[];
  const smtpConfigured = !!(process.env.SMTP_HOST && process.env.SMTP_USER);

  return (
    <div className="min-h-screen" style={{ background: "#0d0f12" }}>
      <Sidebar active="dashboard" />

      <div className="lg:ml-56">
        {/* Top bar */}
        <header
          className="sticky top-0 z-20 flex items-center justify-between pl-16 pr-4 lg:px-8 h-14"
          style={{ background: "#0d0f12", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p className="text-sm font-semibold text-white/60">Dashboard</p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full" style={{ background: smtpConfigured ? "rgba(22,163,74,0.12)" : "rgba(230,57,70,0.12)" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: smtpConfigured ? "#16a34a" : "#e63946" }} />
              <span className="text-xs font-medium" style={{ color: smtpConfigured ? "#4ade80" : "#f87171" }}>
                {smtpConfigured ? "SMTP active" : "SMTP not set"}
              </span>
            </div>
            <LogoutButton />
          </div>
        </header>

        <main className="px-4 sm:px-6 lg:px-8 py-7">

          {/* Action cards row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-7">
            {/* New Campaign */}
            <div className="relative rounded-2xl p-6 overflow-hidden" style={{ background: "linear-gradient(135deg, #1a1d23 0%, #12151a 100%)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="absolute -right-4 -top-4 w-28 h-28 rounded-full opacity-10" style={{ background: "var(--color-red)", filter: "blur(20px)" }} />
              <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.35)" }}>Quick Action</p>
              <h3 className="text-base font-bold text-white mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                Launch a Campaign
              </h3>
              <p className="text-xs mb-5" style={{ color: "rgba(255,255,255,0.4)" }}>
                Write, preview and send to your full contact list in minutes.
              </p>
              <Link
                href={`${BASE}/campaigns`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-white transition-all hover:scale-[1.03]"
                style={{ background: "var(--color-red)", boxShadow: "0 4px 20px rgba(230,57,70,0.35)" }}
              >
                <Plus size={13} /> New Campaign
              </Link>
            </div>

            {/* Templates */}
            <div className="relative rounded-2xl p-6 overflow-hidden" style={{ background: "linear-gradient(135deg, #1a1d23 0%, #12151a 100%)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="absolute -right-4 -top-4 w-28 h-28 rounded-full opacity-10" style={{ background: "#7c3aed", filter: "blur(20px)" }} />
              <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.35)" }}>Templates</p>
              <h3 className="text-base font-bold text-white mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                Email Templates
              </h3>
              <p className="text-xs mb-5" style={{ color: "rgba(255,255,255,0.4)" }}>
                Build reusable templates with personalization variables.
              </p>
              <Link
                href={`${BASE}/templates`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all hover:scale-[1.03]"
                style={{ background: "rgba(124,58,237,0.15)", color: "#c4b5fd", border: "1px solid rgba(124,58,237,0.3)" }}
              >
                <Layout size={13} /> Manage Templates
              </Link>
            </div>

            {/* Contacts */}
            <div className="relative rounded-2xl p-6 overflow-hidden" style={{ background: "linear-gradient(135deg, #1a1d23 0%, #12151a 100%)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="absolute -right-4 -top-4 w-28 h-28 rounded-full opacity-10" style={{ background: "#0284c7", filter: "blur(20px)" }} />
              <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.35)" }}>Contacts</p>
              <h3 className="text-base font-bold text-white mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                Manage Contacts
              </h3>
              <p className="text-xs mb-5" style={{ color: "rgba(255,255,255,0.4)" }}>
                Add, import, or remove contacts from your email list.
              </p>
              <Link
                href={`${BASE}/contacts`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all hover:scale-[1.03]"
                style={{ background: "rgba(2,132,199,0.15)", color: "#7dd3fc", border: "1px solid rgba(2,132,199,0.3)" }}
              >
                <Users size={13} /> View Contacts
              </Link>
            </div>
          </div>

          {/* Stat row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
            {[
              { label: "Total Contacts",    value: contactCount,  change: null,   color: "#e63946", dim: "rgba(230,57,70,0.12)" },
              { label: "Campaigns Sent",    value: campaignCount, change: null,   color: "#4ade80", dim: "rgba(74,222,128,0.1)" },
              { label: "Email Templates",   value: templateCount, change: null,   color: "#c4b5fd", dim: "rgba(196,181,253,0.1)" },
              { label: "Avg. Recipients",
                value: campaignCount > 0
                  ? Math.round(Number(sumRes.rows[0]?.s ?? 0) / campaignCount)
                  : 0,
                change: null, color: "#7dd3fc", dim: "rgba(125,211,252,0.1)" },
            ].map(({ label, value, color, dim }) => (
              <div key={label} className="rounded-2xl px-5 py-5" style={{ background: "#1a1d23", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>{label}</p>
                  <div className="w-7 h-7 rounded-lg" style={{ background: dim }} />
                </div>
                <p className="text-3xl font-black" style={{ fontFamily: "var(--font-heading)", color }}>{value}</p>
              </div>
            ))}
          </div>

          {/* Campaign table */}
          <div className="rounded-2xl overflow-hidden" style={{ background: "#1a1d23", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <h2 className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>Latest Campaigns</h2>
              <Link href={`${BASE}/campaigns`} className="flex items-center gap-1 text-xs font-semibold transition-opacity hover:opacity-70" style={{ color: "var(--color-red)" }}>
                New campaign <ArrowUpRight size={12} />
              </Link>
            </div>

            {recentCampaigns.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3" style={{ background: "rgba(230,57,70,0.1)" }}>
                  <Send size={20} style={{ color: "var(--color-red)" }} strokeWidth={1.5} />
                </div>
                <p className="text-sm font-semibold text-white mb-1">No campaigns yet</p>
                <p className="text-xs mb-5" style={{ color: "rgba(255,255,255,0.35)" }}>Send your first campaign to get started.</p>
                <Link
                  href={`${BASE}/campaigns`}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold text-white"
                  style={{ background: "var(--color-red)" }}
                >
                  <Plus size={12} /> New Campaign
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
              <table className="w-full min-w-[480px]">
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    {["Name", "Status", "Recipients", "Date"].map((h) => (
                      <th key={h} className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.25)" }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentCampaigns.map((c, i) => (
                    <tr
                      key={c.id}
                      className="transition-colors hover:bg-white/2"
                      style={{ borderBottom: i < recentCampaigns.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(230,57,70,0.1)" }}>
                            <Send size={13} style={{ color: "var(--color-red)" }} strokeWidth={1.75} />
                          </div>
                          <p className="text-sm font-medium text-white truncate max-w-xs">{c.subject}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: "rgba(74,222,128,0.1)", color: "#4ade80" }}>
                          {c.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                        {c.recipient_count}
                      </td>
                      <td className="px-6 py-4 text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
                        {formatDate(c.sent_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
