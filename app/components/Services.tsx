"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Users, ClipboardList, Search, TrendingUp } from "lucide-react";

const services = [
  {
    number: "01",
    title: "Candidate Matching",
    description:
      "Patrick expertly bridges the gap between candidates and companies — providing tailored guidance on resumes, interview prep, and industry-specific positioning to maximize placement success.",
    Icon: Users,
  },
  {
    number: "02",
    title: "Job Specification Analysis",
    description:
      "Working directly with hiring managers, Patrick gathers precise job specifications and translates them into actionable insights — giving candidates a real edge before they even apply.",
    Icon: ClipboardList,
  },
  {
    number: "03",
    title: "Talent Scouting",
    description:
      "As a true talent scout and career ally, Patrick maintains comprehensive candidate databases to match the right people with future opportunities — your career partner for the long haul.",
    Icon: Search,
  },
  {
    number: "04",
    title: "Market Research & Strategy",
    description:
      "Patrick conducts deep job market research, competitive salary analysis, and recommends training programs and industry networking opportunities to accelerate professional growth.",
    Icon: TrendingUp,
  },
];

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="services"
      ref={ref}
      className="py-24 lg:py-32"
      style={{ background: "var(--color-bg)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-sm font-semibold uppercase tracking-widest mb-3 flex items-center gap-2"
              style={{ color: "var(--color-red)" }}
            >
              <span className="inline-block w-6 h-0.5" style={{ background: "var(--color-red)" }} />
              What I Do
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-black leading-tight"
              style={{ fontFamily: "var(--font-heading)", color: "var(--color-dark)" }}
            >
              Services &amp;{" "}
              <span style={{ color: "var(--color-red)" }}>Expertise</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-sm text-sm leading-relaxed"
            style={{ color: "var(--color-gray)" }}
          >
            Comprehensive recruiting services tailored to connect exceptional
            talent with the companies that need them most.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((svc, i) => (
            <motion.div
              key={svc.number}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i + 0.3 }}
              className="group relative p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-default"
              style={{ borderColor: "var(--color-border)", background: "#fff" }}
            >
              {/* Top row */}
              <div className="flex items-start justify-between mb-6">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:bg-red-500 group-hover:text-white"
                  style={{ background: "var(--color-light)", color: "var(--color-red)" }}
                >
                  <svc.Icon size={22} strokeWidth={1.75} />
                </div>
                <span
                  className="text-5xl font-black leading-none select-none"
                  style={{ color: "#f0f0f0", fontFamily: "var(--font-heading)" }}
                >
                  {svc.number}
                </span>
              </div>

              <h3
                className="text-xl font-bold mb-3 transition-colors duration-300 group-hover:text-red-500"
                style={{ fontFamily: "var(--font-heading)", color: "var(--color-dark)" }}
              >
                {svc.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-gray)" }}>
                {svc.description}
              </p>

              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 left-8 right-8 h-0.5 rounded-full scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"
                style={{ background: "var(--color-red)" }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
