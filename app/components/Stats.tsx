"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect } from "react";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      const controls = animate(count, to, { duration: 2, ease: "easeOut" });
      return controls.stop;
    }
  }, [inView, count, to]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

const stats = [
  { value: 20, suffix: "+", label: "Years of Experience" },
  { value: 500, suffix: "+", label: "Successful Placements" },
  { value: 100, suffix: "%", label: "Fortune Sector Focus" },
  { value: 6, suffix: "", label: "Industry Verticals" },
];

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="py-20"
      style={{ background: "var(--color-dark)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center md:border-r last:border-r-0"
              style={{ borderColor: "rgba(255,255,255,0.1)" }}
            >
              <div
                className="text-5xl md:text-6xl font-black mb-2"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--color-red)",
                }}
              >
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="text-sm font-medium uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.5)" }}>
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
