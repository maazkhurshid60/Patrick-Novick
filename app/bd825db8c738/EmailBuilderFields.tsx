"use client";

import { EmailBuilderInput, buildMetroEmail } from "@/lib/emailBuilder";

const inputStyle = {
  border: "1px solid rgba(255,255,255,0.08)",
  color: "#fff",
  background: "rgba(255,255,255,0.04)",
  borderRadius: "0.75rem",
  padding: "0.55rem 0.85rem",
  fontSize: "0.82rem",
  outline: "none",
  width: "100%",
};

// A labeled input/textarea used by the branded email builder.
function BField({ label, value, onChange, area, rows }: {
  label: string; value: string; onChange: (v: string) => void; area?: boolean; rows?: number;
}) {
  return (
    <div>
      <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>{label}</p>
      {area ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows ?? 3}
          style={{ ...inputStyle, resize: "vertical" }}
        />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} style={inputStyle} />
      )}
    </div>
  );
}

/**
 * The branded email builder: structured fields on the left, a live preview of
 * the generated house-style HTML on the right. Controlled via `builder`/`onChange`.
 */
export default function EmailBuilderFields({
  builder,
  onChange,
  previewHeight = "62vh",
}: {
  builder: EmailBuilderInput;
  onChange: (patch: Partial<EmailBuilderInput>) => void;
  previewHeight?: string;
}) {
  const setB = onChange;
  const html = buildMetroEmail(builder);
  const previewSrc = html.replace(
    /https:\/\/patricknovick\.com\//g,
    (typeof window !== "undefined" ? window.location.origin : "https://patricknovick.com") + "/"
  );

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {/* Fields */}
      <div className="flex flex-col gap-3">
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
          Fill in the pieces — the branded HTML (680px layout, gold button, Patrick&apos;s
          signature &amp; unsubscribe) is generated automatically. Tokens like{" "}
          <code style={{ background: "rgba(255,255,255,0.07)", padding: "1px 5px", borderRadius: 4 }}>{"{{first_name}}"}</code> work anywhere.
        </p>
        <BField label="Eyebrow (small gold label)" value={builder.eyebrow} onChange={(v) => setB({ eyebrow: v })} />
        <BField label="Headline" value={builder.headline} onChange={(v) => setB({ headline: v })} />
        <BField label="Greeting" value={builder.greeting} onChange={(v) => setB({ greeting: v })} />
        <BField label="Intro paragraphs (blank line = new paragraph)" value={builder.intro} onChange={(v) => setB({ intro: v })} area rows={4} />
        <BField label="List heading (optional)" value={builder.listHeading} onChange={(v) => setB({ listHeading: v })} />
        <BField label="List items (one per line, optional)" value={builder.listItems.join("\n")} onChange={(v) => setB({ listItems: v.split("\n") })} area rows={4} />
        <BField label="Closing paragraph (optional)" value={builder.bodyAfter} onChange={(v) => setB({ bodyAfter: v })} area rows={2} />
        <div className="grid grid-cols-2 gap-3">
          <BField label="Button text (blank = no button)" value={builder.ctaLabel} onChange={(v) => setB({ ctaLabel: v })} />
          <BField label="Button link (mailto: or https:)" value={builder.ctaHref} onChange={(v) => setB({ ctaHref: v })} />
        </div>
        <BField label="Hero image URL (optional)" value={builder.heroUrl} onChange={(v) => setB({ heroUrl: v })} />
        <BField label="Inbox preview text (optional)" value={builder.previewText} onChange={(v) => setB({ previewText: v })} />
      </div>

      {/* Live preview */}
      <div className="lg:sticky lg:top-4 h-fit">
        <p className="text-xs mb-1.5 font-semibold" style={{ color: "rgba(255,255,255,0.4)" }}>Live preview</p>
        <iframe
          title="Email builder preview"
          srcDoc={previewSrc}
          sandbox=""
          style={{ width: "100%", height: previewHeight, border: "1px solid rgba(255,255,255,0.1)", borderRadius: "0.5rem", background: "#fff" }}
        />
      </div>
    </div>
  );
}
