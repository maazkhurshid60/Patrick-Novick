"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const specialties = [
  {
    href: "/dot-transportation-recruiter",
    title: "DOT & Transportation",
    body: "Transportation engineers, program managers, and technical specialists for DOT agencies and infrastructure firms.",
  },
  {
    href: "/civil-engineering-recruiter",
    title: "Civil Engineering",
    body: "Licensed PEs, project managers, and technical specialists for transportation, infrastructure, and municipal projects.",
  },
  {
    href: "/construction-inspection-recruiter",
    title: "Construction Inspection",
    body: "Certified inspectors, resident engineers, and QA/QC specialists for materials testing, bridge, and roadway programs.",
  },
  {
    href: "/mep-recruiter",
    title: "MEP Engineering",
    body: "Mechanical, electrical, and plumbing engineers for data centers, healthcare, and commercial buildings.",
  },
  {
    href: "/government-defense-recruiter",
    title: "Government & Defense",
    body: "Cleared software engineers, DevOps professionals, and senior executives across government and defense.",
  },
];

export default function Specialties() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24 lg:py-32" style={{ background: "var(--color-light)" }}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-sm font-semibold uppercase tracking-widest mb-3 flex items-center gap-2"
          style={{ color: "var(--color-red)" }}
        >
          <span className="inline-block w-6 h-0.5" style={{ background: "var(--color-red)" }} />
          Where I Recruit
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-black leading-tight mb-12"
          style={{ fontFamily: "var(--font-heading)", color: "var(--color-dark)" }}
        >
          My Specialties
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {specialties.map((s, i) => (
            <motion.div
              key={s.href}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i + 0.2 }}
            >
              <Link
                href={s.href}
                className="group flex h-full flex-col justify-between gap-6 p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{ borderColor: "var(--color-border)", background: "#fff" }}
              >
                <div>
                  <h3
                    className="text-xl font-bold mb-3 transition-colors duration-300 group-hover:text-red-500"
                    style={{ fontFamily: "var(--font-heading)", color: "var(--color-dark)" }}
                  >
                    {s.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-gray)" }}>
                    {s.body}
                  </p>
                </div>
                <span
                  className="inline-flex items-center gap-2 text-sm font-semibold"
                  style={{ color: "var(--color-red)" }}
                >
                  Learn more
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
