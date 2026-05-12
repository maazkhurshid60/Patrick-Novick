"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase } from "lucide-react";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-sm shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-1">
          <span
            className="text-xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-heading)", color: "var(--color-dark)" }}
          >
            Patrick
          </span>
          <span
            className="text-xl font-bold tracking-tight"
            style={{ color: "var(--color-red)" }}
          >
            .
          </span>
          <span
            className="text-xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-heading)", color: "var(--color-dark)" }}
          >
            Novick
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-colors duration-200 relative group"
              style={{ color: "var(--color-gray)" }}
            >
              {link.label}
              <span
                className="absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                style={{ background: "var(--color-red)" }}
              />
            </a>
          ))}
        </nav>

        {/* CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://careers.topechelon.com/portals/3a7f6fd3-7cf7-447c-a20f-2354eb2031df"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-semibold border transition-all duration-200 hover:border-red-500 hover:text-red-500"
            style={{ borderColor: "var(--color-border)", color: "var(--color-gray)", fontFamily: "var(--font-heading)" }}
          >
            <Briefcase size={13} />
            View Jobs
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:scale-105"
            style={{ background: "var(--color-red)", fontFamily: "var(--font-heading)" }}
          >
            Let&apos;s Talk
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-6 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
            style={{ background: "var(--color-dark)" }}
          />
          <span
            className={`block h-0.5 w-6 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
            style={{ background: "var(--color-dark)" }}
          />
          <span
            className={`block h-0.5 w-6 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            style={{ background: "var(--color-dark)" }}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t overflow-hidden"
            style={{ borderColor: "var(--color-border)" }}
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-base font-medium"
                  style={{ color: "var(--color-dark)" }}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="https://careers.topechelon.com/portals/3a7f6fd3-7cf7-447c-a20f-2354eb2031df"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border mt-2"
                style={{ borderColor: "var(--color-border)", color: "var(--color-gray)" }}
              >
                <Briefcase size={14} />
                View Open Jobs
              </a>
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-semibold text-white mt-1"
                style={{ background: "var(--color-red)" }}
              >
                Let&apos;s Talk
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
