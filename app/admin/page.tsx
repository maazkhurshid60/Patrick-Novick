import { getConnection } from "@/lib/token";
import Link from "next/link";
import DisconnectButton from "./DisconnectButton";
import LogoutButton from "./LogoutButton";
import {
  Link2,
  ShieldCheck,
  Clock,
  RefreshCw,
  Tag,
  AlertTriangle,
  ExternalLink,
  Mail,
  Users,
  BarChart2,
} from "lucide-react";

const ADMIN_USER_ID = 1;

function formatDate(unix: number) {
  return new Date(unix * 1000).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function timeAgo(unix: number) {
  const diff = Math.floor(Date.now() / 1000) - unix;
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function AdminPage() {
  const connection = getConnection(ADMIN_USER_ID);
  const nowSeconds = Math.floor(Date.now() / 1000);
  const isExpired = connection ? connection.expires_at < nowSeconds : false;
  const expiresIn = connection ? connection.expires_at - nowSeconds : 0;

  const expiresLabel = !connection
    ? "—"
    : isExpired
    ? "Expired"
    : expiresIn > 3600
    ? `${Math.floor(expiresIn / 3600)}h remaining`
    : `${Math.floor(expiresIn / 60)}m remaining`;

  return (
    <div className="min-h-screen" style={{ background: "#f4f5f7" }}>

      {/* Sidebar */}
      <aside
        className="fixed top-0 left-0 h-full w-60 flex flex-col z-30"
        style={{ background: "var(--color-dark)", borderRight: "1px solid rgba(255,255,255,0.06)" }}
      >
        {/* Logo */}
        <div className="px-6 py-6 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <div className="flex items-center gap-1">
            <span className="text-base font-bold" style={{ fontFamily: "var(--font-heading)", color: "#fff" }}>
              Patrick
            </span>
            <span className="text-base font-bold" style={{ color: "var(--color-red)" }}>.</span>
            <span className="text-base font-bold" style={{ fontFamily: "var(--font-heading)", color: "#fff" }}>
              Novick
            </span>
          </div>
          <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>Admin Panel</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-5 flex flex-col gap-1">
          {[
            { label: "Dashboard", icon: BarChart2, active: true },
            { label: "Big Biller", icon: Link2, active: false },
            { label: "Email Campaigns", icon: Mail, active: false },
            { label: "Candidates", icon: Users, active: false },
          ].map(({ label, icon: Icon, active }) => (
            <div
              key={label}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium cursor-default transition-all"
              style={{
                background: active ? "rgba(230,57,70,0.15)" : "transparent",
                color: active ? "var(--color-red)" : "rgba(255,255,255,0.45)",
              }}
            >
              <Icon size={16} strokeWidth={1.75} />
              {label}
            </div>
          ))}
        </nav>

        {/* Bottom */}
        <div className="px-3 py-4 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all hover:bg-white/5"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            <ExternalLink size={15} />
            View Site
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="ml-60">

        {/* Top bar */}
        <header
          className="sticky top-0 z-20 flex items-center justify-between px-8 h-16"
          style={{ background: "#fff", borderBottom: "1px solid var(--color-border)" }}
        >
          <div>
            <h1 className="text-base font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--color-dark)" }}>
              Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
              style={{
                background: connection && !isExpired ? "#f0fdf4" : "#fff0f0",
                color: connection && !isExpired ? "#16a34a" : "var(--color-red)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: connection && !isExpired ? "#16a34a" : "var(--color-red)" }}
              />
              {connection && !isExpired ? "Big Biller Connected" : "Not Connected"}
            </span>
            <LogoutButton />
          </div>
        </header>

        <main className="p-8">

          {/* Stat cards */}
          <div className="grid grid-cols-3 gap-5 mb-8">
            {[
              {
                label: "Connection",
                value: connection ? (isExpired ? "Expired" : "Active") : "None",
                sub: connection ? `Since ${formatDate(connection.created_at)}` : "Click below to connect",
                icon: Link2,
                color: connection && !isExpired ? "#16a34a" : "var(--color-red)",
                bg: connection && !isExpired ? "#f0fdf4" : "#fff0f0",
              },
              {
                label: "Token Expires",
                value: expiresLabel,
                sub: connection ? "Auto-refreshes on API call" : "—",
                icon: Clock,
                color: "var(--color-red)",
                bg: "#fff5f5",
              },
              {
                label: "Last Refreshed",
                value: connection ? timeAgo(connection.updated_at) : "—",
                sub: connection ? formatDate(connection.updated_at) : "No connection",
                icon: RefreshCw,
                color: "#2563eb",
                bg: "#eff6ff",
              },
            ].map(({ label, value, sub, icon: Icon, color, bg }) => (
              <div
                key={label}
                className="rounded-2xl p-6"
                style={{ background: "#fff", border: "1px solid var(--color-border)" }}
              >
                <div className="flex items-start justify-between mb-4">
                  <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--color-gray)" }}>
                    {label}
                  </p>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: bg, color }}>
                    <Icon size={15} strokeWidth={2} />
                  </div>
                </div>
                <p className="text-xl font-black mb-0.5" style={{ fontFamily: "var(--font-heading)", color: "var(--color-dark)" }}>
                  {value}
                </p>
                <p className="text-xs" style={{ color: "var(--color-gray)" }}>{sub}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-5">

            {/* Connection detail card — takes 2 cols */}
            <div
              className="col-span-2 rounded-2xl p-7"
              style={{ background: "#fff", border: "1px solid var(--color-border)" }}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-base font-bold mb-0.5" style={{ fontFamily: "var(--font-heading)", color: "var(--color-dark)" }}>
                    Big Biller Integration
                  </h2>
                  <p className="text-xs" style={{ color: "var(--color-gray)" }}>Top Echelon OAuth 2.0</p>
                </div>
                {connection && !isExpired && (
                  <DisconnectButton />
                )}
              </div>

              {connection ? (
                <>
                  {isExpired && (
                    <div
                      className="flex items-center gap-2 px-4 py-3 rounded-xl mb-5 text-sm"
                      style={{ background: "#fff0f0", color: "var(--color-red)", border: "1px solid rgba(230,57,70,0.2)" }}
                    >
                      <AlertTriangle size={15} />
                      Token is expired — it will auto-refresh on the next API call.
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-5">
                    {[
                      { icon: Tag, label: "Scope", value: connection.scope },
                      { icon: Clock, label: "Token Status", value: expiresLabel },
                      { icon: Link2, label: "Connected", value: formatDate(connection.created_at) },
                      { icon: RefreshCw, label: "Last Updated", value: formatDate(connection.updated_at) },
                    ].map(({ icon: Icon, label, value }) => (
                      <div
                        key={label}
                        className="flex items-start gap-3 p-4 rounded-xl"
                        style={{ background: "#f8f8f8" }}
                      >
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                          style={{ background: "#fff", color: "var(--color-red)", border: "1px solid var(--color-border)" }}
                        >
                          <Icon size={14} strokeWidth={2} />
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: "var(--color-gray)" }}>
                            {label}
                          </p>
                          <p className="text-sm font-semibold" style={{ color: "var(--color-dark)" }}>{value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                    style={{ background: "#fff0f0", color: "var(--color-red)" }}
                  >
                    <Link2 size={24} strokeWidth={1.5} />
                  </div>
                  <p className="text-sm font-semibold mb-1" style={{ color: "var(--color-dark)" }}>
                    No active connection
                  </p>
                  <p className="text-xs mb-6" style={{ color: "var(--color-gray)" }}>
                    Connect your Big Biller account to enable email marketing integrations.
                  </p>
                  <a
                    href="/api/auth/connect"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white transition-all duration-200 hover:scale-[1.02]"
                    style={{
                      background: "var(--color-red)",
                      fontFamily: "var(--font-heading)",
                      boxShadow: "0 4px 20px rgba(230,57,70,0.25)",
                    }}
                  >
                    Connect to Big Biller
                  </a>
                </div>
              )}
            </div>

            {/* Security card */}
            <div
              className="rounded-2xl p-7 flex flex-col"
              style={{ background: "var(--color-dark)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                style={{ background: "rgba(230,57,70,0.15)", color: "var(--color-red)" }}
              >
                <ShieldCheck size={20} strokeWidth={1.75} />
              </div>
              <h3 className="text-sm font-bold text-white mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                Security
              </h3>
              <ul className="flex flex-col gap-3 text-xs flex-1" style={{ color: "rgba(255,255,255,0.5)" }}>
                {[
                  "Tokens encrypted at rest (AES-256-GCM)",
                  "Tokens never sent to the browser",
                  "CSRF state verified on every callback",
                  "Session cookie is httpOnly + signed",
                  "Auto token refresh before expiry",
                  "Rate-limit backoff on 429 responses",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-0.5 shrink-0 w-1 h-1 rounded-full" style={{ background: "var(--color-red)" }} />
                    {item}
                  </li>
                ))}
              </ul>
              <div
                className="mt-6 pt-5 border-t text-xs"
                style={{ borderColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.25)" }}
              >
                Encryption key stored in env vars only
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
