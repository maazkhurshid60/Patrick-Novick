"use client";

import { useState, useEffect, useMemo, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Check, Wand2, Eye } from "lucide-react";
import { buildMetroEmail, DEFAULT_BUILDER, EmailBuilderInput } from "@/lib/emailBuilder";
import EmailBuilderFields from "../EmailBuilderFields";

interface ContactList { id: number; name: string }

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

export default function TemplateMakerClient() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [listId, setListId] = useState<number | null>(null);
  const [lists, setLists] = useState<ContactList[]>([]);
  const [builder, setBuilder] = useState<EmailBuilderInput>(DEFAULT_BUILDER);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const setB = (patch: Partial<EmailBuilderInput>) => setBuilder((b) => ({ ...b, ...patch }));
  const html = useMemo(() => buildMetroEmail(builder), [builder]);

  useEffect(() => {
    fetch("/api/lists").then((r) => (r.ok ? r.json() : [])).then(setLists).catch(() => {});
  }, []);

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/templates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, subject, body: html, list_id: listId, builder_json: JSON.stringify(builder) }),
    });
    setLoading(false);
    if (res.ok) {
      setSaved(true);
      setTimeout(() => router.push("/bd825db8c738/templates"), 700);
    }
  }

  function useInCampaign() {
    localStorage.setItem("campaign_draft", JSON.stringify({ subject, body: html, isHtml: true }));
    router.push("/bd825db8c738/campaigns");
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-2xl p-6" style={{ background: "#1a1d23", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-2 mb-1">
          <span className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(230,57,70,0.12)" }}>
            <Wand2 size={16} style={{ color: "#f87171" }} />
          </span>
          <p className="text-base font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>Email Template Maker</p>
        </div>
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
          Build a branded, Outlook-safe email from simple fields — it&apos;s saved to your
          Templates and ready to send as a campaign.
        </p>

        <form onSubmit={handleSave} className="flex flex-col gap-4 mt-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs mb-1.5" style={{ color: "rgba(255,255,255,0.4)" }}>Template name</p>
              <input style={inputStyle} placeholder="e.g. NYC Employer Outreach" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
              <p className="text-xs mb-1.5" style={{ color: "rgba(255,255,255,0.4)" }}>Email subject line</p>
              <input style={inputStyle} placeholder="What recipients see in their inbox" value={subject} onChange={(e) => setSubject(e.target.value)} required />
            </div>
          </div>
          <div>
            <p className="text-xs mb-1.5" style={{ color: "rgba(255,255,255,0.4)" }}>Contact list <span style={{ color: "rgba(255,255,255,0.2)" }}>(optional)</span></p>
            <select
              style={{ ...inputStyle, cursor: "pointer", maxWidth: 320 }}
              value={listId ?? ""}
              onChange={(e) => setListId(e.target.value ? Number(e.target.value) : null)}
            >
              <option value="" style={{ background: "#16181e" }}>General (no specific list)</option>
              {lists.map((l) => (
                <option key={l.id} value={l.id} style={{ background: "#16181e" }}>{l.name}</option>
              ))}
            </select>
          </div>

          <div className="pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }} />

          <EmailBuilderFields builder={builder} onChange={setB} previewHeight="70vh" />

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="submit" disabled={loading || saved}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold text-white transition-all hover:scale-[1.02] disabled:opacity-50"
              style={{ background: "var(--color-red)", fontFamily: "var(--font-heading)", boxShadow: "0 4px 16px rgba(230,57,70,0.3)" }}
            >
              <Check size={14} /> {saved ? "Saved!" : loading ? "Saving…" : "Save Template"}
            </button>
            <button
              type="button"
              onClick={useInCampaign}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all hover:bg-white/5"
              style={{ color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <Eye size={14} /> Use in Campaign
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
