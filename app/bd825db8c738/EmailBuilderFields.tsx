"use client";

import { useState } from "react";
import { Upload, Loader2, X } from "lucide-react";
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
  const [uploading, setUploading] = useState(false);
  const [uploadErr, setUploadErr] = useState("");
  const html = buildMetroEmail(builder);
  const previewSrc = html.replace(
    /https:\/\/patricknovick\.com\//g,
    (typeof window !== "undefined" ? window.location.origin : "https://patricknovick.com") + "/"
  );

  async function uploadImage(file: File) {
    setUploadErr("");
    if (!file.type.startsWith("image/")) { setUploadErr("Please choose an image file."); return; }
    setUploading(true);
    try {
      const dataUrl: string = await new Promise((resolve, reject) => {
        const r = new FileReader();
        r.onload = () => resolve(r.result as string);
        r.onerror = () => reject(new Error("read failed"));
        r.readAsDataURL(file);
      });
      const base64 = dataUrl.split(",")[1] ?? "";
      const res = await fetch("/api/images", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: file.name, mime: file.type, dataBase64: base64 }),
      });
      const data = await res.json();
      if (!res.ok) { setUploadErr(data.error || "Upload failed"); return; }
      setB({ heroUrl: data.url });
    } catch {
      setUploadErr("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  }

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
        <div className="grid grid-cols-2 gap-3">
          <BField label="Second button text (optional)" value={builder.ctaLabel2} onChange={(v) => setB({ ctaLabel2: v })} />
          <BField label="Second button link" value={builder.ctaHref2} onChange={(v) => setB({ ctaHref2: v })} />
        </div>
        {/* Header / hero image — upload one or paste a URL */}
        <div>
          <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>Header / hero image (optional)</p>
          <div className="flex gap-2">
            <input
              value={builder.heroUrl}
              onChange={(e) => setB({ heroUrl: e.target.value })}
              placeholder="Paste an image URL, or upload →"
              style={inputStyle}
            />
            <label
              className="flex items-center gap-1.5 px-3 rounded-xl text-xs font-bold cursor-pointer whitespace-nowrap transition-all hover:bg-white/5"
              style={{ border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.7)" }}
            >
              {uploading ? <Loader2 size={13} className="animate-spin" /> : <Upload size={13} />}
              {uploading ? "Uploading…" : "Upload"}
              <input
                type="file"
                accept="image/png,image/jpeg,image/gif,image/webp"
                style={{ display: "none" }}
                disabled={uploading}
                onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadImage(f); e.target.value = ""; }}
              />
            </label>
          </div>
          {uploadErr && <p className="text-xs mt-1" style={{ color: "#f87171" }}>{uploadErr}</p>}
          {builder.heroUrl && (
            <div className="mt-2 flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={builder.heroUrl} alt="Header preview" style={{ height: 44, width: "auto", borderRadius: 6, border: "1px solid rgba(255,255,255,0.1)" }} />
              <button
                type="button"
                onClick={() => setB({ heroUrl: "" })}
                className="flex items-center gap-1 text-xs transition-colors hover:text-white"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                <X size={12} /> Remove
              </button>
            </div>
          )}
          <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.25)" }}>
            Uploaded images are saved to your database and served from this app — no external host needed.
          </p>
        </div>
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
