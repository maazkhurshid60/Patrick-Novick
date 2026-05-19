"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Download, Briefcase } from "lucide-react";

const SocialIcons = {
  LinkedIn: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  ),
  Facebook: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  ),
  Twitter: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "var(--color-bg)" }}
    >
      {/* Large background watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="text-[22vw] font-black leading-none tracking-tighter uppercase"
          style={{
            color: "transparent",
            WebkitTextStroke: "1.5px #f0f0f0",
            fontFamily: "var(--font-heading)",
          }}
        >
          RECRUIT
        </span>
      </div>

      <div className="relative z-[1] max-w-6xl mx-auto px-6 pt-28 pb-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left — Text */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-sm font-semibold uppercase tracking-widest mb-6 flex items-center gap-2"
              style={{ color: "var(--color-red)" }}
            >
              <span
                className="inline-block w-8 h-0.5"
                style={{ background: "var(--color-red)" }}
              />
              Professional Recruiter &amp; Talent Strategist
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-black leading-none tracking-tight mb-2"
              style={{ fontFamily: "var(--font-heading)", color: "var(--color-dark)" }}
            >
              Hello<span style={{ color: "var(--color-red)" }}>.</span>
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-black leading-none tracking-tight mb-2"
              style={{ fontFamily: "var(--font-heading)", color: "var(--color-dark)" }}
            >
              I&apos;m
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-black leading-none tracking-tight"
              style={{ fontFamily: "var(--font-heading)", color: "var(--color-dark)" }}
            >
              Patrick<span style={{ color: "var(--color-red)" }}>.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-6 text-lg leading-relaxed max-w-lg"
              style={{ color: "var(--color-gray)" }}
            >
              20+ years connecting elite talent with Fortune 100/500 companies
              across government, defense &amp; commercial sectors. Expertise in
              technical, cleared, and executive placements.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <a
                href="#about"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white text-sm transition-all duration-200 hover:scale-105 hover:shadow-lg"
                style={{
                  background: "var(--color-red)",
                  fontFamily: "var(--font-heading)",
                  boxShadow: "0 4px 20px rgba(230,57,70,0.3)",
                }}
              >
                Learn More
                <ArrowRight size={15} />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm border-2 transition-all duration-200 hover:scale-105"
                style={{
                  borderColor: "var(--color-dark)",
                  color: "var(--color-dark)",
                  fontFamily: "var(--font-heading)",
                }}
              >
                <Download size={15} />
                Download CV
              </a>
              <a
                href="https://careers.topechelon.com/portals/3a7f6fd3-7cf7-447c-a20f-2354eb2031df"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm border-2 transition-all duration-200 hover:scale-105 hover:border-red-500 hover:text-red-500"
                style={{
                  borderColor: "var(--color-border)",
                  color: "var(--color-gray)",
                  fontFamily: "var(--font-heading)",
                }}
              >
                <Briefcase size={15} />
                View Open Jobs
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="mt-10 flex items-center gap-5"
            >
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: "var(--color-gray)" }}
              >
                Follow
              </span>
              <div className="flex-1 h-px" style={{ background: "var(--color-border)" }} />
              {[
                { Icon: SocialIcons.LinkedIn, href: "https://www.linkedin.com/in/patricknovick/", label: "LinkedIn" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-200 hover:border-red-500 hover:text-red-500"
                  style={{
                    borderColor: "var(--color-border)",
                    color: "var(--color-gray)",
                  }}
                >
                  <Icon />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right — Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Red blob behind image */}
              <div
                className="absolute -top-6 -right-6 w-72 h-72 md:w-96 md:h-96 rounded-full"
                style={{ background: "var(--color-red)", opacity: 0.1 }}
              />
              <div
                className="absolute -bottom-4 -left-4 w-40 h-40 rounded-full"
                style={{ background: "var(--color-dark)", opacity: 0.05 }}
              />
              {/* Image container */}
              <div
                className="relative w-72 h-80 md:w-96 md:h-[480px] rounded-3xl overflow-hidden"
                style={{ boxShadow: "0 30px 80px rgba(0,0,0,0.15)" }}
              >
                <Image
                  src="/ChatGPT-Image.webp"
                  alt="Patrick Novick — Professional Recruiter"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="absolute bottom-4 left-4 bg-white rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-black"
                  style={{ background: "var(--color-red)" }}
                >
                  20+
                </div>
                <div>
                  <div className="text-xs font-semibold" style={{ color: "var(--color-dark)" }}>
                    Years Experience
                  </div>
                  <div className="text-xs" style={{ color: "var(--color-gray)" }}>
                    In Recruiting
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator — only visible when viewport is tall enough */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="hidden lg:flex absolute bottom-8 right-8 flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest" style={{ color: "var(--color-gray)", writingMode: "vertical-rl" }}>
            Scroll
          </span>
          <div className="w-0.5 h-10" style={{ background: "var(--color-red)" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
