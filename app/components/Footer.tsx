import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="py-8 border-t"
      style={{
        background: "var(--color-dark)",
        borderColor: "rgba(255,255,255,0.08)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-1">
          <span
            className="text-base font-bold tracking-tight text-white"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Patrick
          </span>
          <span className="text-base font-bold" style={{ color: "var(--color-red)" }}>
            .
          </span>
          <span
            className="text-base font-bold tracking-tight text-white"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Novick
          </span>
        </div>

        {/* Copyright */}
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
          © {new Date().getFullYear()} Patrick Novick. All rights reserved. &nbsp;|&nbsp;{" "}
          <a
            href="https://metroassoc.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-400 transition-colors duration-200"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            Metro Associates
          </a>
          &nbsp;|&nbsp;{" "}
          <Link
            href="/privacy"
            className="hover:text-red-400 transition-colors duration-200"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            Privacy Policy
          </Link>
          &nbsp;|&nbsp;{" "}
          <Link
            href="/unsubscribe"
            className="hover:text-red-400 transition-colors duration-200"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            Unsubscribe
          </Link>
        </p>

        {/* Nav links */}
        <div className="flex gap-5">
          {["#home", "#about", "#services", "#contact"].map((href) => (
            <a
              key={href}
              href={href}
              className="text-xs capitalize transition-colors duration-200 hover:text-white"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              {href.replace("#", "")}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
