"use client";

import Link from "next/link";
import { useState } from "react";
import { ExternalLink, BarChart2, Mail, Users, Layout, List, Activity, UserMinus, Menu, X } from "lucide-react";

const BASE = "/bd825db8c738";

const navItems = [
  { label: "Dashboard",       icon: BarChart2, href: BASE,                key: "dashboard" },
  { label: "Analytics",       icon: Activity,  href: `${BASE}/analytics`, key: "analytics" },
  { label: "Contacts",        icon: Users,     href: `${BASE}/contacts`,  key: "contacts" },
  { label: "Lists",           icon: List,      href: `${BASE}/lists`,     key: "lists" },
  { label: "Email Campaigns", icon: Mail,      href: `${BASE}/campaigns`, key: "campaigns" },
  { label: "Templates",       icon: Layout,    href: `${BASE}/templates`, key: "templates" },
  { label: "Opt-Outs",        icon: UserMinus, href: `${BASE}/optouts`,   key: "optouts" },
];

export default function Sidebar({ active }: { active: string }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      {/* Mobile hamburger — sits inside the top bar, hidden on desktop */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="lg:hidden fixed top-0 left-0 z-30 h-14 w-14 flex items-center justify-center transition-colors hover:bg-white/5"
        style={{ color: "rgba(255,255,255,0.6)" }}
      >
        <Menu size={20} />
      </button>

      {/* Backdrop (mobile only, when drawer open) */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 z-40"
          style={{ background: "rgba(0,0,0,0.6)" }}
          onClick={close}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-56 flex flex-col z-50 transition-transform duration-200 lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}
        style={{ background: "#0d0f12", borderRight: "1px solid rgba(255,255,255,0.06)" }}
      >
        {/* Close button (mobile only) */}
        <button
          onClick={close}
          aria-label="Close menu"
          className="lg:hidden absolute top-3 right-3 w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-white/5"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          <X size={16} />
        </button>

        {/* Logo */}
        <div className="px-5 py-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center gap-1 mb-0.5">
            <span className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>Patrick</span>
            <span className="text-sm font-bold" style={{ color: "var(--color-red)" }}>.</span>
            <span className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>Novick</span>
          </div>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>Admin Panel</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-5 flex flex-col gap-0.5 overflow-y-auto">
          <p className="text-xs font-semibold uppercase tracking-widest px-3 mb-3" style={{ color: "rgba(255,255,255,0.18)" }}>
            Application
          </p>
          {navItems.map(({ label, icon: Icon, href, key }) => {
            const isActive = active === key;
            return (
              <Link
                key={href}
                href={href}
                onClick={close}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
                style={{
                  background: isActive ? "rgba(230,57,70,0.12)" : "transparent",
                  color: isActive ? "#f87171" : "rgba(255,255,255,0.38)",
                }}
              >
                <Icon size={15} strokeWidth={1.75} />
                {label}
              </Link>
            );
          })}

          <div className="mt-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <p className="text-xs font-semibold uppercase tracking-widest px-3 mb-3" style={{ color: "rgba(255,255,255,0.18)" }}>
              Others
            </p>
            <Link
              href="/"
              onClick={close}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all hover:bg-white/5"
              style={{ color: "rgba(255,255,255,0.38)" }}
            >
              <ExternalLink size={15} strokeWidth={1.75} />
              View Site
            </Link>
          </div>
        </nav>

        {/* User badge */}
        <div className="px-4 py-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center gap-3 px-2 py-2 rounded-xl" style={{ background: "rgba(255,255,255,0.04)" }}>
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0" style={{ background: "var(--color-red)", color: "#fff" }}>
              P
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-white truncate">Patrick Novick</p>
              <p className="text-xs truncate" style={{ color: "rgba(255,255,255,0.3)" }}>Admin</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
