"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Globe, ExternalLink, ArrowRight } from "lucide-react";

const SocialIcons = {
  LinkedIn: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  ),
  Facebook: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  ),
  Twitter: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
};

const contactItems = [
  {
    Icon: Mail,
    label: "Email",
    value: "patrick@metroassoc.com",
    href: "mailto:patrick@metroassoc.com",
    external: false,
  },
  {
    Icon: Globe,
    label: "Primary Website",
    value: "patricknovick.com",
    href: "https://patricknovick.com",
    external: true,
  },
  {
    Icon: ExternalLink,
    label: "Metro Associates",
    value: "metroassoc.com",
    href: "https://metroassoc.com",
    external: true,
  },
];

const socials = [
  { Icon: SocialIcons.LinkedIn, href: "https://www.linkedin.com/in/patricknovick/", label: "LinkedIn" },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="contact"
      ref={ref}
      className="py-24 lg:py-32 relative overflow-hidden"
      style={{ background: "var(--color-dark)" }}
    >
      {/* Background decoration */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "var(--color-red)", opacity: 0.06, transform: "translate(30%, -30%)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: "var(--color-red)", opacity: 0.04, transform: "translate(-40%, 40%)" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-sm font-semibold uppercase tracking-widest mb-4 flex items-center gap-2"
              style={{ color: "var(--color-red)" }}
            >
              <span className="inline-block w-6 h-0.5" style={{ background: "var(--color-red)" }} />
              Get In Touch
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-black leading-tight mb-6 text-white"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Drop Me a Line.{" "}
              <span style={{ color: "var(--color-red)" }}>
                I&apos;m Open for Collaboration.
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base leading-relaxed mb-8"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              Whether you&apos;re a company looking to build your team or a
              professional ready for your next opportunity — Patrick is ready
              to help you win.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="mailto:patrick@metroassoc.com"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm text-white transition-all duration-200 hover:scale-105"
                style={{
                  background: "var(--color-red)",
                  fontFamily: "var(--font-heading)",
                  boxShadow: "0 4px 20px rgba(230,57,70,0.4)",
                }}
              >
                Let&apos;s Talk
                <ArrowRight size={15} />
              </a>
              <a
                href="https://metroassoc.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm border transition-all duration-200 hover:scale-105"
                style={{
                  borderColor: "rgba(255,255,255,0.2)",
                  color: "#fff",
                  fontFamily: "var(--font-heading)",
                }}
              >
                Visit Metro Associates
                <ExternalLink size={13} />
              </a>
            </motion.div>
          </div>

          {/* Right — contact card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="rounded-3xl p-6 sm:p-8"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <h3
              className="text-lg font-bold text-white mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Contact Information
            </h3>

            <div className="space-y-4">
              {contactItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-4 group"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 group-hover:bg-red-500"
                    style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)" }}
                  >
                    <item.Icon size={18} strokeWidth={1.75} />
                  </div>
                  <div>
                    <div className="text-xs font-medium mb-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                      {item.label}
                    </div>
                    <div className="text-sm font-semibold text-white group-hover:text-red-400 transition-colors duration-200">
                      {item.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <div
              className="mt-8 pt-6 flex gap-3 border-t"
              style={{ borderColor: "rgba(255,255,255,0.1)" }}
            >
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 hover:bg-red-500"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.7)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
