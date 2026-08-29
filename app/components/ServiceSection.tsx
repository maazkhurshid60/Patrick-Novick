"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export type ServiceContent = {
  eyebrow: string;
  title: string;
  intro: string[];
  includes: string[];
  whyPoints: { title: string; body: string }[];
};

export default function ServiceSection({ eyebrow, title, intro, includes, whyPoints }: ServiceContent) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <main ref={ref} className="pt-20" style={{ background: "var(--color-bg)" }}>
      {/* Intro */}
      <section className="py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-sm font-semibold uppercase tracking-widest mb-3 flex items-center gap-2"
            style={{ color: "var(--color-red)" }}
          >
            <span className="inline-block w-6 h-0.5" style={{ background: "var(--color-red)" }} />
            {eyebrow}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-black leading-tight mb-8"
            style={{ fontFamily: "var(--font-heading)", color: "var(--color-dark)" }}
          >
            {title}
          </motion.h1>

          {intro.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.18 + i * 0.08 }}
              className="text-base leading-relaxed mb-5 max-w-2xl"
              style={{ color: "var(--color-gray)" }}
            >
              {p}
            </motion.p>
          ))}

          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            href="/contact"
            className="mt-3 inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm text-white transition-all duration-200 hover:scale-105"
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
      </section>

      {/* What's included */}
      <section className="py-20" style={{ background: "var(--color-light)" }}>
        <div className="max-w-4xl mx-auto px-6">
          <h2
            className="text-2xl md:text-3xl font-black mb-8"
            style={{ fontFamily: "var(--font-heading)", color: "var(--color-dark)" }}
          >
            What&apos;s Included
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {includes.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle2 size={18} className="shrink-0 mt-0.5" style={{ color: "var(--color-red)" }} />
                <span className="text-sm leading-relaxed" style={{ color: "var(--color-dark)" }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why it matters */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2
            className="text-2xl md:text-3xl font-black mb-10"
            style={{ fontFamily: "var(--font-heading)", color: "var(--color-dark)" }}
          >
            Why It Matters
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {whyPoints.map((w) => (
              <div key={w.title} className="flex items-start gap-3">
                <CheckCircle2 size={20} className="shrink-0 mt-0.5" style={{ color: "var(--color-red)" }} />
                <div>
                  <div className="text-sm font-bold mb-1" style={{ color: "var(--color-dark)" }}>
                    {w.title}
                  </div>
                  <div className="text-sm leading-relaxed" style={{ color: "var(--color-gray)" }}>
                    {w.body}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
