"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, HardHat, Car, Building2, Droplets, Zap, ScanSearch } from "lucide-react";

const metroServices = [
  { Icon: HardHat,    label: "Civil Engineering" },
  { Icon: Car,        label: "Transportation / DOT" },
  { Icon: Building2,  label: "Structural Engineering" },
  { Icon: Droplets,   label: "Water & Utilities" },
  { Icon: Zap,        label: "MEP (Mechanical, Electrical, Plumbing)" },
  { Icon: ScanSearch, label: "CEI (Construction Engineering Inspection)" },
];

export default function Metro() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="py-24 lg:py-32"
      style={{ background: "var(--color-light)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-sm font-semibold uppercase tracking-widest mb-3 flex items-center gap-2"
              style={{ color: "var(--color-red)" }}
            >
              <span className="inline-block w-6 h-0.5" style={{ background: "var(--color-red)" }} />
              Associated Firm
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-black leading-tight mb-6"
              style={{ fontFamily: "var(--font-heading)", color: "var(--color-dark)" }}
            >
              Backed by{" "}
              <span style={{ color: "var(--color-red)" }}>Metro Associates</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base leading-relaxed mb-6"
              style={{ color: "var(--color-gray)" }}
            >
              Patrick works in partnership with Metro Associates — a specialized
              engineering recruiting firm staffing talent across the entire United
              States. Together, they cover civil, structural, MEP, and CEI
              positions nationwide.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.28 }}
              className="text-base leading-relaxed mb-8"
              style={{ color: "var(--color-gray)" }}
            >
              This partnership extends Patrick&apos;s reach and resources, ensuring
              candidates and companies receive best-in-class talent acquisition
              support backed by a proven, nationwide network.
            </motion.p>
            <motion.a
              href="https://metroassoc.com/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.36 }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm text-white transition-all duration-200 hover:scale-105"
              style={{ background: "var(--color-dark)", fontFamily: "var(--font-heading)" }}
            >
              Visit Metro Associates
              <ArrowRight size={15} />
            </motion.a>
          </div>

          {/* Right — service list card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-white rounded-3xl p-8"
            style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.08)" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: "var(--color-red)" }}
              />
              <span
                className="text-xs font-semibold uppercase tracking-wider"
                style={{ color: "var(--color-gray)" }}
              >
                Metro Associates Covers
              </span>
            </div>

            <div className="space-y-1">
              {metroServices.map(({ Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 p-3 rounded-xl transition-colors duration-200 hover:bg-gray-50 group"
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-all duration-200 group-hover:bg-red-500 group-hover:text-white"
                    style={{ background: "var(--color-light)", color: "var(--color-red)" }}
                  >
                    <Icon size={16} strokeWidth={1.75} />
                  </div>
                  <span className="text-sm font-medium" style={{ color: "var(--color-dark)" }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>

            <div
              className="mt-6 pt-5 flex items-center justify-between border-t"
              style={{ borderColor: "var(--color-border)" }}
            >
              <span className="text-xs" style={{ color: "var(--color-gray)" }}>
                Nationwide staffing network
              </span>
              <a
                href="https://metroassoc.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold transition-colors hover:opacity-70 flex items-center gap-1"
                style={{ color: "var(--color-red)" }}
              >
                metroassoc.com
                <ArrowRight size={11} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
