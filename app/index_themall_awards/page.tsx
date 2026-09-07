import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AWARDS } from "../lib/awards";

/* Awards and recognition.
 *
 * The URL is the client's, chosen deliberately and not derived from the
 * title — so it stays exactly as given rather than being tidied into
 * /awards. It isn't in the nav either; it's a link to be handed out.
 *
 * The page is driven by app/lib/awards.ts. While that list is empty nothing
 * is invented to fill it — an award is a credential a client acts on, and a
 * plausible-sounding fake is the fastest way to lose the trust the rest of
 * the site is built on. Empty means an honest placeholder and noindex; add
 * an entry and the page publishes itself.
 */

const hasAwards = AWARDS.length > 0;

export const metadata: Metadata = {
  title: "Awards & Recognition — Patrick Novick",
  description:
    "Awards and industry recognition earned by Patrick Novick across engineering, DOT and infrastructure recruiting.",
  alternates: { canonical: "/index_themall_awards" },
  openGraph: {
    title: "Awards & Recognition — Patrick Novick",
    description:
      "Awards and industry recognition in engineering, DOT and infrastructure recruiting.",
    url: "https://patricknovick.com/index_themall_awards",
    type: "website",
  },
  /* An awards page with no awards on it is thin content, and indexing it
     would put an empty page in front of anyone searching the name. It opens
     itself to search the moment there's something real to show. */
  ...(hasAwards ? {} : { robots: { index: false, follow: true } }),
};

export default function AwardsPage() {
  return (
    <>
      <Navbar />

      <main className="pt-20" style={{ background: "var(--color-bg)" }}>
        <section className="py-20 lg:py-28">
          <div className="max-w-4xl mx-auto px-6">
            <p
              className="text-sm font-semibold uppercase tracking-widest mb-3 flex items-center gap-2"
              style={{ color: "var(--color-red)" }}
            >
              <span className="inline-block w-6 h-0.5" style={{ background: "var(--color-red)" }} />
              Recognition
            </p>

            <h1
              className="text-4xl md:text-5xl font-black leading-tight mb-8"
              style={{ fontFamily: "var(--font-heading)", color: "var(--color-dark)" }}
            >
              Awards &amp; Recognition
            </h1>

            <p className="text-lg leading-relaxed" style={{ color: "var(--color-muted)" }}>
              Recognition earned over 35+ years placing engineers, inspectors and construction
              leaders on transportation and infrastructure programs across the United States.
            </p>

            {hasAwards ? (
              <ul className="mt-12 space-y-5">
                {AWARDS.map((award) => (
                  <li
                    key={`${award.title}-${award.year}`}
                    className="rounded-2xl border bg-white p-6 shadow-sm"
                    style={{ borderColor: "rgba(0,0,0,0.08)" }}
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h2
                        className="text-xl font-bold"
                        style={{ fontFamily: "var(--font-heading)", color: "var(--color-dark)" }}
                      >
                        {award.title}
                      </h2>
                      <span
                        className="text-sm font-semibold tabular-nums"
                        style={{ color: "var(--color-red)" }}
                      >
                        {award.year}
                      </span>
                    </div>

                    <p className="mt-1 text-sm font-semibold" style={{ color: "var(--color-muted)" }}>
                      {award.issuer}
                    </p>

                    {award.summary && (
                      <p className="mt-3 leading-relaxed" style={{ color: "var(--color-muted)" }}>
                        {award.summary}
                      </p>
                    )}

                    {/* A link to the issuer turns a claim into something a
                        client can check, which is the whole point of the page. */}
                    {award.href && (
                      <a
                        href={award.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-block text-sm font-semibold underline underline-offset-4"
                        style={{ color: "var(--color-red)" }}
                      >
                        View the announcement
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <div
                className="mt-12 rounded-2xl border border-dashed p-10 text-center"
                style={{ borderColor: "rgba(0,0,0,0.15)" }}
              >
                <h2
                  className="text-xl font-bold"
                  style={{ fontFamily: "var(--font-heading)", color: "var(--color-dark)" }}
                >
                  Being compiled
                </h2>
                <p className="mx-auto mt-2 max-w-md leading-relaxed" style={{ color: "var(--color-muted)" }}>
                  This page is being put together. In the meantime, the work behind it is on
                  the services pages — or get in touch and I&apos;ll talk you through it.
                </p>
              </div>
            )}

            <div className="mt-12 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="rounded-full px-7 py-3 font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: "var(--color-red)" }}
              >
                Get in touch
              </Link>
              <Link
                href="/services"
                className="rounded-full border px-7 py-3 font-semibold transition-colors"
                style={{ borderColor: "rgba(0,0,0,0.15)", color: "var(--color-dark)" }}
              >
                See what I do
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
