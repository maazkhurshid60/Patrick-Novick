"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  ArrowRight, HardHat, Car, Building2, Droplets, Zap, ScanSearch,
  Code2, ShieldCheck, BarChart3, Monitor, Compass,
  FolderKanban, MapPin,
} from "lucide-react";

const disciplines = [
  { Icon: HardHat,       label: "Civil Engineering",        desc: "Roads, bridges & infrastructure" },
  { Icon: Car,           label: "Transportation / DOT",     desc: "Highway & transit planning" },
  { Icon: Building2,     label: "Structural Engineering",   desc: "Structural design & analysis" },
  { Icon: Zap,           label: "MEP Engineering",          desc: "Mechanical, electrical & plumbing" },
  { Icon: Droplets,      label: "Water / Hydrology",        desc: "Water resource management" },
  { Icon: ScanSearch,    label: "CEI / Inspection",         desc: "Construction engineering & oversight" },
  { Icon: FolderKanban,  label: "Project Management",       desc: "AEC project leaders & PMs" },
  { Icon: Code2,         label: "Software Engineering",     desc: "AWS, DevOps & full-stack" },
  { Icon: ShieldCheck,   label: "Government / Cleared",     desc: "Security-cleared engineering" },
  { Icon: BarChart3,     label: "Data Science",             desc: "Analytics & data engineering" },
  { Icon: Monitor,       label: "Information Technology",   desc: "IT infrastructure & support" },
  { Icon: Compass,       label: "Architecture (AEC)",       desc: "Architectural design & planning" },
];

const patrickSpecialties = [
  {
    Icon: ShieldCheck,
    label: "Security-Cleared Engineering",
    desc: "Top Secret, TS/SCI & clearance-required placements at defense contractors nationwide.",
  },
  {
    Icon: Building2,
    label: "Fortune 100/500 Engineering",
    desc: "Large-scale enterprise engineering talent for the country's most demanding firms.",
  },
  {
    Icon: HardHat,
    label: "DOD Project Staffing",
    desc: "Department of Defense engineering & infrastructure program support from day one.",
  },
];

const cities = [
  { name: "Orlando, FL",       primary: true },
  { name: "Boston, MA",        primary: false },
  { name: "Washington, D.C.",  primary: false },
  { name: "Atlanta, GA",       primary: false },
  { name: "Dallas, TX",        primary: false },
  { name: "Los Angeles, CA",   primary: false },
];

function DisciplineCard({
  Icon, label, desc, index,
}: {
  Icon: React.ElementType; label: string; desc: string; index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.055 }}
      className="group relative bg-white rounded-2xl p-5 border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-default"
      style={{ borderColor: "var(--color-border)" }}
    >
      {/* Animated ring + icon */}
      <div className="relative w-12 h-12 mb-4">
        <svg
          className="absolute inset-0 w-12 h-12"
          style={{ transform: "rotate(-90deg)" }}
          viewBox="0 0 48 48"
        >
          {/* Track */}
          <circle cx="24" cy="24" r="20" fill="none" stroke="#f0f0f0" strokeWidth="2" />
          {/* Draw-in ring */}
          <motion.circle
            cx="24"
            cy="24"
            r="20"
            fill="none"
            stroke="var(--color-red)"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 0.9, delay: index * 0.055 + 0.15, ease: "easeOut" }}
          />
        </svg>
        <div
          className="absolute inset-0 flex items-center justify-center transition-colors duration-300 group-hover:text-white"
          style={{ color: "var(--color-red)" }}
        >
          <motion.div
            animate={inView ? { scale: [0.6, 1.1, 1] } : { scale: 0.6 }}
            transition={{ duration: 0.5, delay: index * 0.055 + 0.35 }}
          >
            <Icon size={19} strokeWidth={1.75} />
          </motion.div>
        </div>
        {/* Red fill on hover */}
        <div
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
          style={{ background: "var(--color-red)" }}
        >
          <Icon size={19} strokeWidth={1.75} color="#fff" />
        </div>
      </div>

      <h4
        className="text-sm font-bold mb-1 group-hover:text-red-500 transition-colors duration-200"
        style={{ fontFamily: "var(--font-heading)", color: "var(--color-dark)" }}
      >
        {label}
      </h4>
      <p className="text-xs leading-relaxed" style={{ color: "var(--color-gray)" }}>
        {desc}
      </p>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-5 right-5 h-0.5 rounded-full scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"
        style={{ background: "var(--color-red)" }}
      />
    </motion.div>
  );
}

export default function Metro() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 lg:py-32" style={{ background: "var(--color-light)" }}>
      <div className="max-w-6xl mx-auto px-6">

        {/* ── Header ── */}
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-sm font-semibold uppercase tracking-widest mb-3 flex items-center justify-center gap-2"
            style={{ color: "var(--color-red)" }}
          >
            <span className="inline-block w-6 h-0.5" style={{ background: "var(--color-red)" }} />
            Associated Firm
            <span className="inline-block w-6 h-0.5" style={{ background: "var(--color-red)" }} />
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-black leading-tight mb-4"
            style={{ fontFamily: "var(--font-heading)", color: "var(--color-dark)" }}
          >
            Backed by{" "}
            <span style={{ color: "var(--color-red)" }}>Metro Associates</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="max-w-2xl mx-auto text-base leading-relaxed"
            style={{ color: "var(--color-gray)" }}
          >
            Metro Associates is a specialized engineering recruiting firm placing
            civil, transportation, structural, MEP, and infrastructure talent at
            firms across the nation. Patrick brings his government, defense &amp;
            Fortune 100/500 expertise directly into Metro&apos;s pipeline.
          </motion.p>
        </div>

        {/* ── Disciplines grid — 12 cards ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
          {disciplines.map((d, i) => (
            <DisciplineCard key={d.label} {...d} index={i} />
          ))}
        </div>

        {/* ── Nationwide presence strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.28 }}
          className="bg-white rounded-2xl px-6 py-5 mb-10 border flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-0 justify-between"
          style={{ borderColor: "var(--color-border)" }}
        >
          <div>
            <div
              className="text-xs font-semibold uppercase tracking-wider mb-0.5"
              style={{ color: "var(--color-red)" }}
            >
              Nationwide Presence
            </div>
            <div className="text-sm font-medium" style={{ color: "var(--color-dark)" }}>
              Metro Associates offices across 6 major U.S. markets
            </div>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {cities.map((city) => (
              <div key={city.name} className="flex items-center gap-1.5">
                <MapPin
                  size={12}
                  style={{ color: city.primary ? "var(--color-red)" : "var(--color-gray)" }}
                />
                <span
                  className="text-xs font-medium"
                  style={{ color: city.primary ? "var(--color-dark)" : "var(--color-gray)" }}
                >
                  {city.name}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Patrick's Edge dark panel ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="rounded-3xl p-8 lg:p-10 relative overflow-hidden"
          style={{ background: "var(--color-dark)" }}
        >
          {/* Background glow */}
          <div
            className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none"
            style={{ background: "var(--color-red)", opacity: 0.07, transform: "translate(30%, -30%)" }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
            {/* Left label */}
            <div className="lg:col-span-1">
              <div
                className="text-xs font-semibold uppercase tracking-widest mb-2"
                style={{ color: "var(--color-red)" }}
              >
                Patrick&apos;s Edge
              </div>
              <h3
                className="text-2xl font-black text-white leading-tight mb-4"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                What Patrick Brings to Metro
              </h3>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.5)" }}>
                Patrick&apos;s 20+ years recruiting for government &amp; defense
                unlocks opportunities within Metro&apos;s network that other
                recruiters simply can&apos;t access.
              </p>
              <a
                href="https://metroassoc.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:scale-105"
                style={{ background: "var(--color-red)", fontFamily: "var(--font-heading)" }}
              >
                Visit Metro Associates
                <ArrowRight size={14} />
              </a>
            </div>

            {/* Right — 3 specialty cards */}
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {patrickSpecialties.map(({ Icon, label, desc }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.45 + i * 0.1 }}
                  className="rounded-2xl p-5 group transition-colors duration-300 hover:bg-red-500 cursor-default"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-white"
                    style={{ background: "rgba(230,57,70,0.25)", color: "var(--color-red)" }}
                  >
                    <Icon size={18} strokeWidth={1.75} />
                  </div>
                  <div
                    className="text-sm font-bold text-white mb-1.5"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {label}
                  </div>
                  <div className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                    {desc}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
