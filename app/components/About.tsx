"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect } from "react";
import { ArrowRight } from "lucide-react";

function Bar({ label, pct, index }: { label: string; pct: number; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="mb-5">
      <div className="flex justify-between mb-1.5">
        <span className="text-sm font-medium" style={{ color: "var(--color-dark)" }}>
          {label}
        </span>
        <span className="text-sm font-semibold" style={{ color: "var(--color-red)" }}>
          {pct}%
        </span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "#f0f0f0" }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: "var(--color-red)" }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : { width: 0 }}
          transition={{ duration: 0.9, delay: index * 0.12 }}
        />
      </div>
    </div>
  );
}

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      const ctrl = animate(count, to, { duration: 1.8 });
      return ctrl.stop;
    }
  }, [inView, count, to]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

const expertise = [
  { label: "Government & Defense", pct: 92 },
  { label: "Technical / Engineering", pct: 88 },
  { label: "Cleared Security Positions", pct: 95 },
  { label: "Fortune 100/500 Placements", pct: 85 },
  { label: "MEP Engineering", pct: 80 },
  { label: "Transportation / DOT", pct: 83 },
];

const quickStats = [
  { value: 20, suffix: "+", label: "Years" },
  { value: 500, suffix: "+", label: "Placements" },
  { value: 6, suffix: "", label: "Verticals" },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      ref={ref}
      className="py-24 lg:py-32"
      style={{ background: "var(--color-light)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-sm font-semibold uppercase tracking-widest mb-3 flex items-center gap-2"
          style={{ color: "var(--color-red)" }}
        >
          <span className="inline-block w-6 h-0.5" style={{ background: "var(--color-red)" }} />
          About Me
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-black leading-tight mb-6"
              style={{ fontFamily: "var(--font-heading)", color: "var(--color-dark)" }}
            >
              Patrick Novick Will Help You{" "}
              <span style={{ color: "var(--color-red)" }}>Win</span> Your Next
              Role
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="text-base leading-relaxed mb-5"
              style={{ color: "var(--color-gray)" }}
            >
              With over 20 years of recruiting experience, Patrick Novick
              possesses an exceptional level of expertise in professional talent
              acquisition. His ability to connect the right people with the
              right roles is almost unmatched in the industry.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.26 }}
              className="text-base leading-relaxed mb-8"
              style={{ color: "var(--color-gray)" }}
            >
              Specializing in Fortune 100 &amp; 500 companies, Patrick focuses
              on technical and intelligence job placements across government,
              defense, and commercial sectors — from software engineers and
              DevOps professionals to cleared security personnel and senior
              executives.
            </motion.p>

            {/* Quick stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.32 }}
              className="grid grid-cols-3 gap-2 sm:gap-4 mb-8 p-4 sm:p-5 rounded-2xl"
              style={{ background: "#fff", border: "1px solid var(--color-border)" }}
            >
              {quickStats.map((s) => (
                <div key={s.label} className="text-center">
                  <div
                    className="text-2xl font-black"
                    style={{ fontFamily: "var(--font-heading)", color: "var(--color-red)" }}
                  >
                    <CountUp to={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-xs font-medium mt-0.5" style={{ color: "var(--color-gray)" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.38 }}
              className="grid grid-cols-2 gap-4 mb-8"
            >
              {[
                { label: "Name", value: "Patrick Novick" },
                { label: "Specialty", value: "Technical Recruiting" },
                { label: "Experience", value: "20+ Years" },
                { label: "Focus", value: "Fortune 100/500" },
              ].map((item) => (
                <div key={item.label}>
                  <div
                    className="text-xs font-semibold uppercase tracking-wider mb-0.5"
                    style={{ color: "var(--color-red)" }}
                  >
                    {item.label}
                  </div>
                  <div className="text-sm font-medium" style={{ color: "var(--color-dark)" }}>
                    {item.value}
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.44 }}
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm text-white transition-all duration-200 hover:scale-105"
              style={{
                background: "var(--color-red)",
                fontFamily: "var(--font-heading)",
                boxShadow: "0 4px 20px rgba(230,57,70,0.3)",
              }}
            >
              Get In Touch
              <ArrowRight size={15} />
            </motion.a>
          </div>

          {/* Right — expertise bars + tags */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h3
              className="text-lg font-bold mb-8"
              style={{ fontFamily: "var(--font-heading)", color: "var(--color-dark)" }}
            >
              Areas of Expertise
            </h3>
            {expertise.map((e, i) => (
              <Bar key={e.label} label={e.label} pct={e.pct} index={i} />
            ))}

            <div className="mt-10">
              <h3
                className="text-lg font-bold mb-4"
                style={{ fontFamily: "var(--font-heading)", color: "var(--color-dark)" }}
              >
                Industries Served
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "DOD / Intelligence",
                  "Civil Engineering",
                  "Structural Engineering",
                  "Transportation / DOT",
                  "MEP Engineering",
                  "CEI / Inspection",
                  "Water & Utilities",
                  "Software Development",
                  "AWS / DevOps",
                  "Full-Stack Dev",
                  "Finance",
                  "Automotive",
                  "Electronics",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold border"
                    style={{
                      borderColor: "var(--color-border)",
                      color: "var(--color-dark)",
                      background: "#fff",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
