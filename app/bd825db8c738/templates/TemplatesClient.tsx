"use client";

import { useState, useEffect, FormEvent } from "react";
import { Plus, Trash2, Edit2, Check, X, Copy, Layout } from "lucide-react";

interface Template {
  id: number;
  name: string;
  subject: string;
  body: string;
  updated_at: number;
}

const STARTER_TEMPLATES = [
  {
    name: "Job Opportunity",
    subject: "Exciting Opportunity — {{role}} at {{company}}",
    body: `<p>Hi {{first_name}},</p>

<p>I hope you're doing well! I came across your profile and immediately thought of an exciting opportunity that aligns perfectly with your background.</p>

<p>We are currently recruiting for a <strong>{{role}}</strong> position at <strong>{{company}}</strong> — a leading firm in the {{industry}} space.</p>

<p><strong>What's on offer:</strong></p>
<ul>
  <li>Competitive compensation package</li>
  <li>Growth opportunities</li>
  <li>Strong company culture</li>
</ul>

<p>If you're open to a confidential conversation, I'd love to connect. Simply reply to this email or call me directly.</p>

<p>Best regards,<br/>
Patrick Novick<br/>
Metro Associates<br/>
+1 (239) 255-5921</p>`,
  },
  {
    name: "Follow Up",
    subject: "Following up — {{role}} opportunity",
    body: `<p>Hi {{first_name}},</p>

<p>I wanted to follow up on my previous message regarding the <strong>{{role}}</strong> opportunity.</p>

<p>I understand you're busy, but I believe this could be a great fit for your career trajectory. Even if the timing isn't right, I'd love to keep in touch for future opportunities.</p>

<p>Would you have 10 minutes for a quick call this week?</p>

<p>Best,<br/>
Patrick Novick<br/>
Metro Associates</p>`,
  },
  {
    name: "DOT Recruiting Outreach",
    subject: "DOT / Transportation Engineering Role — Are You Open?",
    body: `<p>Hi {{first_name}},</p>

<p>My name is Patrick Novick, Senior Recruiter at Metro Associates. We specialize exclusively in DOT, transportation infrastructure, and engineering placements across the United States.</p>

<p>I'm currently working on a <strong>{{role}}</strong> role with a well-established firm and your background caught my attention.</p>

<p>Key details:</p>
<ul>
  <li>Location: {{location}}</li>
  <li>Role: {{role}}</li>
  <li>Experience required: {{experience}}</li>
</ul>

<p>If you're open to exploring this confidentially, please reply or reach out directly.</p>

<p>Patrick Novick<br/>
Metro Associates<br/>
patrick@metroassoc.com | +1 (239) 255-5921</p>`,
  },
];

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

export default function TemplatesClient() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<Template | null>(null);
  const [form, setForm] = useState({ name: "", subject: "", body: "" });
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);

  async function fetchTemplates() {
    const res = await fetch("/api/templates");
    setTemplates(await res.json());
  }

  useEffect(() => { fetchTemplates(); }, []);

  async function handleSave(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    if (editing) {
      await fetch("/api/templates", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, id: editing.id }),
      });
    } else {
      await fetch("/api/templates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }
    setCreating(false); setEditing(null); setForm({ name: "", subject: "", body: "" });
    fetchTemplates();
    setLoading(false);
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this template?")) return;
    await fetch("/api/templates", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchTemplates();
  }

  async function handleStarter(t: typeof STARTER_TEMPLATES[0]) {
    setLoading(true);
    await fetch("/api/templates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(t),
    });
    fetchTemplates();
    setLoading(false);
  }

  function startEdit(t: Template) {
    setEditing(t);
    setForm({ name: t.name, subject: t.subject, body: t.body });
    setCreating(true);
  }

  function copyBody(id: number, body: string) {
    navigator.clipboard.writeText(body);
    setCopied(id);
    setTimeout(() => setCopied(null), 1500);
  }

  return (
    <div>
      {/* Starter templates banner */}
      {templates.length === 0 && !creating && (
        <div className="rounded-2xl p-6 mb-6" style={{ background: "#1a1d23", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3" style={{ background: "rgba(124,58,237,0.1)" }}>
              <Layout size={20} style={{ color: "#c4b5fd" }} strokeWidth={1.5} />
            </div>
            <p className="text-sm font-bold text-white mb-1" style={{ fontFamily: "var(--font-heading)" }}>No templates yet</p>
            <p className="text-xs mb-5" style={{ color: "rgba(255,255,255,0.3)" }}>
              Use a starter or create your own. Use{" "}
              <code style={{ background: "rgba(255,255,255,0.07)", padding: "1px 5px", borderRadius: 4 }}>{"{{variable}}"}</code>{" "}
              for personalization.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {STARTER_TEMPLATES.map((t) => (
                <button
                  key={t.name}
                  onClick={() => handleStarter(t)}
                  disabled={loading}
                  className="px-4 py-2 rounded-full text-xs font-semibold transition-all hover:scale-[1.02] disabled:opacity-50"
                  style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  + {t.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Create/Edit form */}
      {creating ? (
        <div className="rounded-2xl p-7 mb-6" style={{ background: "#1a1d23", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center justify-between mb-5">
            <p className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>
              {editing ? "Edit Template" : "New Template"}
            </p>
            <button
              onClick={() => { setCreating(false); setEditing(null); setForm({ name: "", subject: "", body: "" }); }}
              className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:bg-white/5"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              <X size={15} />
            </button>
          </div>
          <form onSubmit={handleSave} className="flex flex-col gap-4">
            <input style={inputStyle} placeholder="Template name (e.g. Job Outreach)" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <input style={inputStyle} placeholder="Email subject line" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required />
            <div>
              <p className="text-xs mb-1.5" style={{ color: "rgba(255,255,255,0.3)" }}>
                Body — HTML supported. Use{" "}
                <code style={{ background: "rgba(255,255,255,0.07)", padding: "1px 5px", borderRadius: 4 }}>{"{{first_name}}"}</code>,{" "}
                <code style={{ background: "rgba(255,255,255,0.07)", padding: "1px 5px", borderRadius: 4 }}>{"{{role}}"}</code>, etc.
              </p>
              <textarea
                style={{ ...inputStyle, minHeight: "260px", resize: "vertical", fontFamily: "monospace", fontSize: "0.78rem" }}
                placeholder="<p>Hi {{first_name}},</p>"
                value={form.body}
                onChange={(e) => setForm({ ...form, body: e.target.value })}
                required
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit" disabled={loading}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold text-white transition-all hover:scale-[1.02] disabled:opacity-50"
                style={{ background: "var(--color-red)", fontFamily: "var(--font-heading)", boxShadow: "0 4px 16px rgba(230,57,70,0.3)" }}
              >
                <Check size={14} /> {editing ? "Save Changes" : "Save Template"}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
            {templates.length} template{templates.length !== 1 ? "s" : ""}
          </p>
          <button
            onClick={() => setCreating(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white transition-all hover:scale-[1.02]"
            style={{ background: "var(--color-red)", fontFamily: "var(--font-heading)", boxShadow: "0 4px 16px rgba(230,57,70,0.3)" }}
          >
            <Plus size={14} /> New Template
          </button>
        </div>
      )}

      {/* Template grid */}
      <div className="grid grid-cols-2 gap-4">
        {templates.map((t) => (
          <div key={t.id} className="rounded-2xl p-6 flex flex-col gap-3" style={{ background: "#1a1d23", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex items-start justify-between gap-2">
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-white mb-0.5 truncate" style={{ fontFamily: "var(--font-heading)" }}>{t.name}</p>
                <p className="text-xs truncate" style={{ color: "rgba(255,255,255,0.35)" }}>{t.subject}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => copyBody(t.id, t.body)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:bg-white/5"
                  style={{ color: copied === t.id ? "#4ade80" : "rgba(255,255,255,0.25)" }}
                >
                  {copied === t.id ? <Check size={13} /> : <Copy size={13} />}
                </button>
                <button
                  onClick={() => startEdit(t)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:bg-white/5"
                  style={{ color: "rgba(255,255,255,0.25)" }}
                >
                  <Edit2 size={13} />
                </button>
                <button
                  onClick={() => handleDelete(t.id)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:bg-red-500/10"
                  style={{ color: "rgba(255,255,255,0.25)" }}
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
            <pre
              className="text-xs rounded-xl p-3 overflow-hidden"
              style={{ background: "rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.3)", maxHeight: "80px", whiteSpace: "pre-wrap", wordBreak: "break-all", border: "1px solid rgba(255,255,255,0.04)" }}
            >
              {t.body.replace(/<[^>]+>/g, " ").trim().slice(0, 150)}…
            </pre>
          </div>
        ))}
      </div>

      {/* Starter buttons when templates exist */}
      {templates.length > 0 && !creating && (
        <div className="mt-5 pt-5 flex flex-wrap gap-2" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <p className="w-full text-xs mb-1" style={{ color: "rgba(255,255,255,0.25)" }}>Add starter templates:</p>
          {STARTER_TEMPLATES.map((t) => (
            <button
              key={t.name}
              onClick={() => handleStarter(t)}
              disabled={loading}
              className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all hover:scale-[1.02] disabled:opacity-50"
              style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              + {t.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
