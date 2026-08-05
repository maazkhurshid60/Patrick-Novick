"use client";

import { useEffect, useState } from "react";
import { Check, Loader2, Upload, X } from "lucide-react";
import { buildMetroEmail, DEFAULT_BUILDER, DEFAULT_FOOTER, FooterSettings } from "@/lib/emailBuilder";

// A fixed sample body — this page previews the FOOTER, so the body just needs
// to look like a real email around it, not be editable here.
const PREVIEW_BODY = DEFAULT_BUILDER;

const inputStyle = {
  border: "1px solid rgba(255,255,255,0.08)",
  color: "#fff",
  background: "rgba(255,255,255,0.04)",
  borderRadius: "0.75rem",
  padding: "0.625rem 1rem",
  fontSize: "0.875rem",
  outline: "none",
  width: "100%",
};

function Field({ label, value, onChange, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  return (
    <div>
      <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>{label}</p>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} style={inputStyle} />
    </div>
  );
}

export default function FooterSettingsClient() {
  const [footer, setFooter] = useState<FooterSettings>(DEFAULT_FOOTER);
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadErr, setUploadErr] = useState("");

  const setF = (patch: Partial<FooterSettings>) => { setFooter((f) => ({ ...f, ...patch })); setSaved(false); };

  useEffect(() => {
    fetch("/api/footer-settings")
      .then((r) => (r.ok ? r.json() : DEFAULT_FOOTER))
      .then((data) => setFooter({ ...DEFAULT_FOOTER, ...data }))
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  async function handleSave() {
    setSaving(true);
    const res = await fetch("/api/footer-settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(footer),
    });
    setSaving(false);
    if (res.ok) { setSaved(true); setTimeout(() => setSaved(false), 2000); }
  }

  async function uploadLogo(file: File) {
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
      setF({ logoUrl: data.url });
    } catch {
      setUploadErr("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  const previewHtml = buildMetroEmail(PREVIEW_BODY, footer);
  const previewSrc = previewHtml.replace(
    /https:\/\/patricknovick\.com\//g,
    (typeof window !== "undefined" ? window.location.origin : "https://patricknovick.com") + "/"
  );

  if (!loaded) {
    return (
      <div className="flex items-center justify-center py-24 gap-2 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
        <Loader2 size={16} className="animate-spin" /> Loading footer settings…
      </div>
    );
  }

  return (
    <div className="rounded-2xl p-7" style={{ background: "#1a1d23", border: "1px solid rgba(255,255,255,0.06)" }}>
      <p className="text-sm font-bold text-white mb-1" style={{ fontFamily: "var(--font-heading)" }}>Email Footer</p>
      <p className="text-xs mb-6" style={{ color: "rgba(255,255,255,0.4)" }}>
        This signature block and bottom bar are the same on every email the branded
        builder produces. Edit it once here — new and re-saved templates pick it up
        automatically. Templates already sent, or already saved with their own HTML,
        are not rewritten.
      </p>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Fields */}
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Signature name" value={footer.signatureName} onChange={(v) => setF({ signatureName: v })} />
            <Field label="Signature title" value={footer.signatureTitle} onChange={(v) => setF({ signatureTitle: v })} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Phone (shown)" value={footer.phoneDisplay} onChange={(v) => setF({ phoneDisplay: v })} placeholder="+1 (312) 500-1878" />
            <Field label="Phone (tel: link)" value={footer.phoneHref} onChange={(v) => setF({ phoneHref: v })} placeholder="+13125001878" />
          </div>
          <Field label="Email" value={footer.email} onChange={(v) => setF({ email: v })} placeholder="patrick@metroassoc.com" />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Link 1 label" value={footer.link1Label} onChange={(v) => setF({ link1Label: v })} placeholder="patricknovick.com" />
            <Field label="Link 1 URL" value={footer.link1Url} onChange={(v) => setF({ link1Url: v })} placeholder="https://patricknovick.com" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Link 2 label" value={footer.link2Label} onChange={(v) => setF({ link2Label: v })} placeholder="metroassoc.com" />
            <Field label="Link 2 URL" value={footer.link2Url} onChange={(v) => setF({ link2Url: v })} placeholder="https://metroassoc.com" />
          </div>
          <Field label="Bottom bar tagline" value={footer.tagline} onChange={(v) => setF({ tagline: v })} placeholder="Metro Associates  •  Engineering, MEP, DOT and Construction Recruiting" />

          {/* Logo — upload/URL + where it sits */}
          <div>
            <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>Footer logo (optional)</p>
            <div className="flex gap-2">
              <input
                value={footer.logoUrl}
                onChange={(e) => setF({ logoUrl: e.target.value })}
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
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadLogo(f); e.target.value = ""; }}
                />
              </label>
            </div>
            {uploadErr && <p className="text-xs mt-1" style={{ color: "#f87171" }}>{uploadErr}</p>}
            {footer.logoUrl && (
              <div className="mt-2 flex items-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={footer.logoUrl} alt="Footer logo preview" style={{ height: 36, width: "auto", borderRadius: 6, border: "1px solid rgba(255,255,255,0.1)" }} />
                <button
                  type="button"
                  onClick={() => setF({ logoUrl: "" })}
                  className="flex items-center gap-1 text-xs transition-colors hover:text-white"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  <X size={12} /> Remove
                </button>
              </div>
            )}

            {/* Placement — only meaningful once a logo is set, but left visible
                so the choice is remembered if one is added later. */}
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div>
                <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>Position</p>
                <div className="flex gap-2">
                  {(["top", "bottom"] as const).map((pos) => (
                    <button
                      key={pos}
                      type="button"
                      onClick={() => setF({ logoPosition: pos })}
                      className="flex-1 py-2 rounded-xl text-xs font-bold capitalize transition-all"
                      style={footer.logoPosition === pos
                        ? { background: "rgba(230,57,70,0.15)", color: "#f87171", border: "1px solid rgba(230,57,70,0.3)" }
                        : { background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.08)" }}
                    >
                      {pos === "top" ? "Above signature" : "Below signature"}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>Alignment</p>
                <div className="flex gap-2">
                  {(["left", "center", "right"] as const).map((align) => (
                    <button
                      key={align}
                      type="button"
                      onClick={() => setF({ logoAlign: align })}
                      className="flex-1 py-2 rounded-xl text-xs font-bold capitalize transition-all"
                      style={footer.logoAlign === align
                        ? { background: "rgba(230,57,70,0.15)", color: "#f87171", border: "1px solid rgba(230,57,70,0.3)" }
                        : { background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.08)" }}
                    >
                      {align}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="flex items-center justify-center gap-2 mt-2 px-6 py-2.5 rounded-full text-sm font-bold text-white transition-all hover:scale-[1.02] disabled:opacity-50 w-fit"
            style={{ background: "var(--color-red)", fontFamily: "var(--font-heading)", boxShadow: "0 4px 16px rgba(230,57,70,0.3)" }}
          >
            <Check size={14} /> {saved ? "Saved!" : saving ? "Saving…" : "Save Footer"}
          </button>
        </div>

        {/* Live preview */}
        <div className="lg:sticky lg:top-4 h-fit">
          <p className="text-xs mb-1.5 font-semibold" style={{ color: "rgba(255,255,255,0.4)" }}>
            Live preview — sample email body, real footer
          </p>
          <iframe
            title="Footer preview"
            srcDoc={previewSrc}
            sandbox=""
            style={{ width: "100%", height: "70vh", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "0.5rem", background: "#fff" }}
          />
        </div>
      </div>
    </div>
  );
}
