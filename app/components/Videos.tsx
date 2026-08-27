"use client";

import Script from "next/script";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/* TikTok job-ad clips (@patricknovick225) — add new video IDs here as
   Patrick shares more. embed.js (loaded once, below) finds every
   .tiktok-embed blockquote on the page and renders the player into it. */
const VIDEO_IDS = [
  "7678660383099407647",
  "7678658540050943263",
  "7678040762646318367",
];

export default function Videos() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="videos" ref={ref} className="py-24 lg:py-32" style={{ background: "var(--color-light)" }}>
      <Script async src="https://www.tiktok.com/embed.js" strategy="lazyOnload" />
      <div className="max-w-6xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-sm font-semibold uppercase tracking-widest mb-3 flex items-center gap-2"
          style={{ color: "var(--color-red)" }}
        >
          <span className="inline-block w-6 h-0.5" style={{ background: "var(--color-red)" }} />
          On TikTok
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-black leading-tight mb-12"
          style={{ fontFamily: "var(--font-heading)", color: "var(--color-dark)" }}
        >
          Job Openings, <span style={{ color: "var(--color-red)" }}>On Video</span>
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {VIDEO_IDS.map((id, i) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.08 }}
              className="w-full flex justify-center"
            >
              <blockquote
                className="tiktok-embed"
                cite={`https://www.tiktok.com/@patricknovick225/video/${id}`}
                data-video-id={id}
                style={{ maxWidth: 325, minWidth: 260, width: "100%" }}
              >
                <section />
              </blockquote>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
