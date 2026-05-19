import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — Patrick Novick",
  description: "Privacy Policy for PatrickNovick.com",
};

const sections = [
  {
    num: "1",
    title: "Information We Collect",
    body: "We may collect personal and professional information you voluntarily provide, including:",
    list: [
      "Full name",
      "Email address",
      "Phone number",
      "Mailing address",
      "Resume or CV information",
      "Professional work history",
      "Job titles and employment background",
      "Professional licenses and certifications",
      "LinkedIn or professional profile information",
      "Communication preferences",
      "Information submitted through forms, emails, SMS/text messages, or phone calls",
    ],
    extra: "We may also collect limited technical information including browser type, IP address, device information, and website activity logs necessary for website functionality and security.",
  },
  {
    num: "2",
    title: "Sources of Information",
    body: "Information may be collected from:",
    list: [
      "Direct website submissions",
      "Email, phone, and SMS/text communications",
      "LinkedIn and professional networking platforms",
      "Public professional profiles",
      "Job boards and resume databases",
      "Referrals and networking contacts",
      "Recruiting and sourcing platforms",
      "Website forms and inquiries",
      "Third-party service providers and business tools",
    ],
  },
  {
    num: "3",
    title: "Cookies & Tracking Technologies",
    body: "This website may use basic cookies, analytics tools, and technical tracking technologies necessary for:",
    list: [
      "Website functionality",
      "Performance monitoring",
      "Security and spam prevention",
      "Analytics and website improvement",
    ],
    extra: "We do not currently sell personal information or use behavioral advertising trackers for cross-context behavioral advertising.",
  },
  {
    num: "4",
    title: "How We Use Your Information",
    body: "We may use personal information for legitimate business purposes including:",
    list: [
      "Recruiting and staffing activities",
      "Professional consulting and advisory services",
      "Business networking and communications",
      "Employment opportunity discussions",
      "Responding to inquiries",
      "Website administration and security",
      "Legal and regulatory compliance",
      "Business relationship management",
      "Fraud prevention and security monitoring",
    ],
    extra: "We do not sell personal information.",
  },
  {
    num: "5",
    title: "Email & SMS Communications",
    body: "By voluntarily providing your phone number or email address, you consent to receive communications regarding:",
    list: [
      "Employment opportunities",
      "Recruiting updates",
      "Business inquiries",
      "Interview scheduling",
      "Networking opportunities",
      "Professional follow-up communications",
    ],
    extra: "Message frequency may vary. Message and data rates may apply. You may opt out at any time by replying STOP to SMS messages, using unsubscribe links, or contacting us directly. Consent is not a condition of employment or purchase of any goods or services. We do not share SMS consent data with third parties for marketing purposes.",
  },
  {
    num: "6",
    title: "Third-Party Service Providers",
    body: "Trusted third-party vendors may support website operations, communications, analytics, hosting, recruiting, and business operations. These providers may include:",
    list: [
      "HubSpot",
      "Microsoft 365",
      "SendGrid",
      "LinkedIn",
      "CRM and ATS systems",
      "Website hosting providers",
      "Cloud communication providers",
      "Analytics providers",
    ],
    extra: "Information is shared only as reasonably necessary for legitimate business operations and legal compliance.",
  },
  {
    num: "7",
    title: "Data Retention",
    body: "We retain personal information only as long as reasonably necessary for:",
    list: [
      "Business communications",
      "Recruiting and consulting operations",
      "Legal and regulatory compliance",
      "Recordkeeping and dispute resolution",
    ],
    extra: "When information is no longer needed, it is securely deleted or anonymized where appropriate.",
  },
  {
    num: "8",
    title: "Data Security",
    body: "We implement commercially reasonable administrative, technical, and organizational safeguards to protect personal information against unauthorized access, disclosure, alteration, or destruction. No method of transmission over the Internet is completely secure, and absolute security cannot be guaranteed.",
  },
  {
    num: "9",
    title: "Your Privacy Rights",
    body: "Depending on your jurisdiction, you may have rights including:",
    list: [
      "Requesting access to your information",
      "Requesting correction of inaccurate information",
      "Requesting deletion of certain information",
      "Opting out of certain communications",
      "Requesting information about data usage",
    ],
    extra: "To submit a request, contact us using the button above.",
  },
  {
    num: "10",
    title: "International Data Transfers",
    body: "This website operates primarily in the United States. Information may be stored or processed in the United States or other jurisdictions where privacy laws may differ from your location. Where required, appropriate safeguards will be implemented.",
  },
  {
    num: "11",
    title: "Children's Privacy",
    body: "This website and services are intended for adults and professional users. We do not knowingly collect personal information from children under the age of 13.",
  },
  {
    num: "12",
    title: "Updates to This Privacy Policy",
    body: 'We may update this Privacy Policy periodically. Updates will be reflected by the revised "Last Updated" date at the top of this page. Continued use of this website after updates constitutes acceptance of the revised policy.',
  },
  {
    num: "13",
    title: "Contact Information",
    contact: true,
  },
];

export default function PrivacyPage() {
  return (
    <main style={{ background: "var(--color-dark)", minHeight: "100vh" }}>

      {/* Top bar */}
      <div
        className="border-b px-6 py-4 flex items-center justify-between"
        style={{ borderColor: "rgba(255,255,255,0.07)" }}
      >
        <Link
          href="/"
          className="flex items-center gap-0.5 text-white font-bold text-base hover:opacity-80 transition-opacity"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Patrick<span style={{ color: "var(--color-red)" }}>.</span>Novick
        </Link>
        <Link
          href="/"
          className="text-xs px-4 py-1.5 rounded-full border transition-colors hover:text-white"
          style={{ borderColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.45)" }}
        >
          ← Back to site
        </Link>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-16">

        {/* Header */}
        <div className="mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: "var(--color-red)" }}>
            <span className="inline-block w-6 h-0.5" style={{ background: "var(--color-red)" }} /> Legal
          </p>
          <h1
            className="font-black text-white mb-3"
            style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontFamily: "var(--font-heading)" }}
          >
            Privacy Policy
          </h1>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
            Last Updated: May 18, 2026
          </p>
        </div>

        {/* Intro */}
        <div
          className="rounded-2xl p-6 mb-10 border"
          style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.08)" }}
        >
          <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.6)" }}>
            PatrickNovick.com (&ldquo;Website,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, store, and safeguard your information when you use this website or engage with our recruiting and professional services.
          </p>
          <p className="text-sm font-semibold mb-3" style={{ color: "rgba(255,255,255,0.45)" }}>This Policy applies when you:</p>
          <ul className="space-y-1.5 mb-4">
            {[
              "Visit PatrickNovick.com",
              "Submit resumes or professional inquiries",
              "Communicate via email, phone, or SMS/text message",
              "Request consulting or recruiting information",
              "Use website forms or communication tools",
              "Interact with professional networking or business services",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                <span className="mt-2 w-1 h-1 rounded-full shrink-0" style={{ background: "var(--color-red)" }} />
                {item}
              </li>
            ))}
          </ul>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
            By using this website or communicating with us, you consent to the practices described in this Privacy Policy.
          </p>
        </div>

        {/* Contact button */}
        <div className="mb-12">
          <a
            href="mailto:privacy@patricknovick.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white transition-all duration-200 hover:scale-105"
            style={{ background: "var(--color-red)", fontFamily: "var(--font-heading)" }}
          >
            Contact Privacy Team
          </a>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((s) => (
            <div
              key={s.num}
              className="rounded-2xl p-6 border"
              style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.07)" }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black shrink-0"
                  style={{ background: "var(--color-red)", color: "#fff", fontFamily: "var(--font-heading)" }}
                >
                  {s.num}
                </span>
                <h2 className="text-base font-black text-white" style={{ fontFamily: "var(--font-heading)" }}>
                  {s.title}
                </h2>
              </div>

              {s.contact ? (
                <div className="space-y-1 text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
                  <p className="font-bold text-white">PatrickNovick.com</p>
                  <p>
                    Email:{" "}
                    <a href="mailto:privacy@patricknovick.com" className="underline hover:text-white" style={{ color: "rgba(255,255,255,0.55)" }}>
                      privacy@patricknovick.com
                    </a>
                  </p>
                </div>
              ) : (
                <>
                  {"body" in s && s.body && (
                    <p className="text-sm mb-3 leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>{s.body}</p>
                  )}
                  {"list" in s && s.list && (
                    <ul className="space-y-1.5 mb-3">
                      {s.list.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
                          <span className="mt-2 w-1 h-1 rounded-full shrink-0" style={{ background: "var(--color-red)" }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  {"extra" in s && s.extra && (
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{s.extra}</p>
                  )}
                </>
              )}
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
