"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Play } from "lucide-react";

export interface TikTokVideo {
  id: string;
  url: string;
  thumbnailUrl: string | null;
  title: string | null;
}

export default function Videos({ videos }: { videos: TikTokVideo[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="videos" ref={ref} className="py-24 lg:py-32" style={{ background: "var(--color-light)" }}>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((v, i) => (
            <motion.a
              key={v.id}
              href={v.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.08 }}
              className="group relative block overflow-hidden rounded-3xl"
              style={{ aspectRatio: "9 / 16", boxShadow: "0 20px 50px rgba(0,0,0,0.15)" }}
            >
              {v.thumbnailUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={v.thumbnailUrl}
                  alt={v.title ?? "TikTok video"}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, var(--color-dark), #2a2a2a)" }} />
              )}

              {/* Legibility gradient for the caption */}
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.05) 45%)" }} />

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110"
                  style={{ background: "rgba(255,255,255,0.92)" }}
                >
                  <Play size={20} style={{ color: "var(--color-red)", marginLeft: 2 }} fill="var(--color-red)" />
                </div>
              </div>

              {/* Caption */}
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="line-clamp-2 text-sm font-semibold leading-snug text-white">
                  {v.title?.split("#")[0].trim() || "Watch on TikTok"}
                </p>
                <p className="mt-1 text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>
                  TikTok · @patricknovick225
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
