"use client";

import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Edit2, Check, X, Copy, Layout, Send, Eye } from "lucide-react";

interface Template {
  id: number;
  name: string;
  subject: string;
  body: string;
  updated_at: number;
}

const EMAIL_WRAPPER = (content: string, preheader = "") => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Metro Associates</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  ${preheader ? `<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">${preheader}</div>` : ""}
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f4f4f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">

          <!-- HEADER -->
          <tr>
            <td style="background:#1a1a2e;border-radius:12px 12px 0 0;padding:28px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <span style="font-size:20px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">Metro</span>
                    <span style="font-size:20px;font-weight:800;color:#e63946;">.</span>
                    <span style="font-size:20px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">Associates</span>
                  </td>
                  <td align="right">
                    <span style="font-size:11px;color:rgba(255,255,255,0.4);font-weight:500;letter-spacing:1px;text-transform:uppercase;">Executive Recruiting</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="background:#ffffff;padding:40px 40px 32px;border-left:1px solid #e8e8e8;border-right:1px solid #e8e8e8;">
              <div style="font-size:15px;line-height:1.75;color:#1a1a2e;">
                ${content}
              </div>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background:#f9f9f9;border:1px solid #e8e8e8;border-top:none;border-radius:0 0 12px 12px;padding:24px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <p style="margin:0 0 4px;font-size:13px;font-weight:700;color:#1a1a2e;">Patrick Novick</p>
                    <p style="margin:0 0 2px;font-size:12px;color:#666;">Senior Recruiter — Metro Associates</p>
                    <p style="margin:0;font-size:12px;color:#999;">
                      <a href="mailto:patrick@metroassoc.com" style="color:#e63946;text-decoration:none;">patrick@metroassoc.com</a>
                      &nbsp;·&nbsp;+1 (239) 255-5921
                    </p>
                  </td>
                  <td align="right" style="vertical-align:top;">
                    <p style="margin:0;font-size:11px;color:#bbb;line-height:1.5;">
                      Metro Associates<br/>
                      <a href="https://patricknovick.com" style="color:#bbb;text-decoration:none;">patricknovick.com</a>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="padding-top:16px;border-top:1px solid #e8e8e8;margin-top:16px;">
                    <p style="margin:0;font-size:10px;color:#bbb;line-height:1.5;">
                      You are receiving this because you are a professional in our network.
                      If you'd prefer not to receive future emails, simply reply with "unsubscribe."
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

const STARTER_TEMPLATES = [
  {
    name: "Job Opportunity",
    subject: "Exciting Opportunity — {{role}} at {{company}}",
    body: EMAIL_WRAPPER(`
<p style="margin:0 0 20px;font-size:15px;color:#1a1a2e;">Hi {{first_name}},</p>

<p style="margin:0 0 16px;">I hope you're doing well. I came across your profile and immediately thought of an exciting opportunity that aligns with your background.</p>

<p style="margin:0 0 16px;">I'm recruiting for a <strong style="color:#1a1a2e;">{{role}}</strong> at <strong style="color:#1a1a2e;">{{company}}</strong> — a respected firm in the {{industry}} space.</p>

<!-- Highlight box -->
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:24px 0;">
  <tr>
    <td style="background:#fff8f8;border-left:4px solid #e63946;border-radius:0 8px 8px 0;padding:16px 20px;">
      <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#e63946;text-transform:uppercase;letter-spacing:0.5px;">What's on offer</p>
      <ul style="margin:0;padding-left:18px;color:#333;font-size:14px;line-height:1.8;">
        <li>Competitive compensation — {{compensation}}</li>
        <li>Location: {{location}}</li>
        <li>Strong growth trajectory</li>
        <li>Collaborative, high-performing team</li>
      </ul>
    </td>
  </tr>
</table>

<p style="margin:0 0 16px;">If you're open to a confidential conversation, I'd love to connect — just reply to this email or give me a call.</p>

<p style="margin:0;">Best regards,</p>`,
      "New opportunity — {{role}} at {{company}} — confidential conversation welcome."),
  },
  {
    name: "Follow Up",
    subject: "Following up — {{role}} opportunity",
    body: EMAIL_WRAPPER(`
<p style="margin:0 0 20px;font-size:15px;color:#1a1a2e;">Hi {{first_name}},</p>

<p style="margin:0 0 16px;">I wanted to follow up on my previous message regarding the <strong style="color:#1a1a2e;">{{role}}</strong> opportunity.</p>

<p style="margin:0 0 16px;">I completely understand you're busy — I just wanted to make sure my note didn't get buried. Even if the timing isn't quite right, I'd genuinely love to keep you in mind for future roles.</p>

<!-- CTA box -->
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:24px 0;">
  <tr>
    <td align="center" style="background:#f9f9f9;border-radius:8px;padding:24px;">
      <p style="margin:0 0 12px;font-size:14px;color:#666;">Would you have 10 minutes for a quick call?</p>
      <a href="mailto:patrick@metroassoc.com?subject=Re: {{role}} opportunity"
         style="display:inline-block;background:#e63946;color:#fff;font-size:13px;font-weight:700;padding:12px 28px;border-radius:50px;text-decoration:none;letter-spacing:0.3px;">
        Reply to Connect
      </a>
    </td>
  </tr>
</table>

<p style="margin:0 0 16px;">No pressure at all — I appreciate your time either way.</p>

<p style="margin:0;">Best,</p>`,
      "Quick follow-up on the {{role}} role — no pressure, just checking in."),
  },
  {
    name: "DOT / Transportation Outreach",
    subject: "DOT / Transportation Engineering Role — Are You Open?",
    body: EMAIL_WRAPPER(`
<p style="margin:0 0 20px;font-size:15px;color:#1a1a2e;">Hi {{first_name}},</p>

<p style="margin:0 0 16px;">My name is Patrick Novick — I'm a Senior Recruiter at Metro Associates, where we specialize exclusively in <strong style="color:#1a1a2e;">DOT, transportation infrastructure, and civil engineering placements</strong> across the United States.</p>

<p style="margin:0 0 20px;">Your background caught my attention. I'm currently working on a role that may be a strong fit:</p>

<!-- Role details box -->
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 24px;">
  <tr>
    <td style="background:#1a1a2e;border-radius:8px;padding:20px 24px;">
      <p style="margin:0 0 12px;font-size:13px;font-weight:700;color:#e63946;text-transform:uppercase;letter-spacing:0.5px;">Role Details</p>
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="font-size:13px;color:rgba(255,255,255,0.6);padding:4px 0;width:120px;">Position</td>
          <td style="font-size:13px;color:#fff;font-weight:600;padding:4px 0;">{{role}}</td>
        </tr>
        <tr>
          <td style="font-size:13px;color:rgba(255,255,255,0.6);padding:4px 0;">Location</td>
          <td style="font-size:13px;color:#fff;font-weight:600;padding:4px 0;">{{location}}</td>
        </tr>
        <tr>
          <td style="font-size:13px;color:rgba(255,255,255,0.6);padding:4px 0;">Experience</td>
          <td style="font-size:13px;color:#fff;font-weight:600;padding:4px 0;">{{experience}}</td>
        </tr>
        <tr>
          <td style="font-size:13px;color:rgba(255,255,255,0.6);padding:4px 0;">Compensation</td>
          <td style="font-size:13px;color:#fff;font-weight:600;padding:4px 0;">{{compensation}}</td>
        </tr>
      </table>
    </td>
  </tr>
</table>

<p style="margin:0 0 16px;">If you're open to exploring this confidentially, please reply or call me directly — I'm happy to share more details.</p>

<p style="margin:0;">Best,</p>`,
      "DOT/Transportation Engineering role — confidential, open to a quick conversation?"),
  },
  {
    name: "MEP Engineering Outreach",
    subject: "MEP Engineering Opportunity — {{role}} | Confidential",
    body: EMAIL_WRAPPER(`
<p style="margin:0 0 20px;font-size:15px;color:#1a1a2e;">Hi {{first_name}},</p>

<p style="margin:0 0 16px;">I'm Patrick Novick, Senior Recruiter at Metro Associates. We place top-tier <strong style="color:#1a1a2e;">MEP engineers</strong> — Mechanical, Electrical, and Plumbing — with leading firms nationwide.</p>

<p style="margin:0 0 20px;">I have a confidential opening that aligns well with your experience:</p>

<!-- Role details box -->
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 24px;">
  <tr>
    <td style="background:#1a1a2e;border-radius:8px;padding:20px 24px;">
      <p style="margin:0 0 12px;font-size:13px;font-weight:700;color:#e63946;text-transform:uppercase;letter-spacing:0.5px;">Role Details</p>
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="font-size:13px;color:rgba(255,255,255,0.6);padding:4px 0;width:120px;">Discipline</td>
          <td style="font-size:13px;color:#fff;font-weight:600;padding:4px 0;">{{discipline}} (MEP)</td>
        </tr>
        <tr>
          <td style="font-size:13px;color:rgba(255,255,255,0.6);padding:4px 0;">Role</td>
          <td style="font-size:13px;color:#fff;font-weight:600;padding:4px 0;">{{role}}</td>
        </tr>
        <tr>
          <td style="font-size:13px;color:rgba(255,255,255,0.6);padding:4px 0;">Location</td>
          <td style="font-size:13px;color:#fff;font-weight:600;padding:4px 0;">{{location}}</td>
        </tr>
        <tr>
          <td style="font-size:13px;color:rgba(255,255,255,0.6);padding:4px 0;">Compensation</td>
          <td style="font-size:13px;color:#fff;font-weight:600;padding:4px 0;">{{compensation}}</td>
        </tr>
      </table>
    </td>
  </tr>
</table>

<p style="margin:0 0 16px;">This is completely confidential. If you'd like to learn more or just stay connected for future roles, feel free to reply any time.</p>

<p style="margin:0;">Best regards,</p>`,
      "Confidential MEP Engineering opportunity — {{role}} — open to a conversation?"),
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
  const router = useRouter();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<Template | null>(null);
  const [form, setForm] = useState({ name: "", subject: "", body: "" });
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);
  const [previewing, setPreviewing] = useState<Template | null>(null);

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

  function getFullHtml(body: string): string {
    const trimmed = body.trimStart();
    if (trimmed.startsWith("<!DOCTYPE") || trimmed.startsWith("<html")) return body;
    return EMAIL_WRAPPER(body);
  }

  function useTemplate(t: Template) {
    localStorage.setItem("campaign_draft", JSON.stringify({ subject: t.subject, body: getFullHtml(t.body) }));
    router.push("/bd825db8c738/campaigns");
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
                  onClick={() => setPreviewing(t)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:bg-white/5"
                  style={{ color: "rgba(255,255,255,0.25)" }}
                  title="Preview"
                >
                  <Eye size={13} />
                </button>
                <button
                  onClick={() => copyBody(t.id, t.body)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:bg-white/5"
                  style={{ color: copied === t.id ? "#4ade80" : "rgba(255,255,255,0.25)" }}
                  title="Copy HTML"
                >
                  {copied === t.id ? <Check size={13} /> : <Copy size={13} />}
                </button>
                <button
                  onClick={() => startEdit(t)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:bg-white/5"
                  style={{ color: "rgba(255,255,255,0.25)" }}
                  title="Edit"
                >
                  <Edit2 size={13} />
                </button>
                <button
                  onClick={() => handleDelete(t.id)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:bg-red-500/10"
                  style={{ color: "rgba(255,255,255,0.25)" }}
                  title="Delete"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
            <pre
              className="text-xs rounded-xl p-3 overflow-hidden"
              style={{ background: "rgba(255,255,255,0.03)", color: "rgba(255,255,255,0.3)", maxHeight: "72px", whiteSpace: "pre-wrap", wordBreak: "break-all", border: "1px solid rgba(255,255,255,0.04)" }}
            >
              {t.body.replace(/<[^>]+>/g, " ").trim().slice(0, 150)}…
            </pre>
            <button
              onClick={() => useTemplate(t)}
              className="flex items-center justify-center gap-2 w-full py-2 rounded-xl text-xs font-bold transition-all hover:scale-[1.01]"
              style={{ background: "rgba(230,57,70,0.12)", color: "#f87171", border: "1px solid rgba(230,57,70,0.2)" }}
            >
              <Send size={11} /> Use in Campaign
            </button>
          </div>
        ))}
      </div>

      {/* Preview modal */}
      {previewing && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}
          onClick={() => setPreviewing(null)}
        >
          <div
            className="relative w-full flex flex-col"
            style={{ maxWidth: "680px", maxHeight: "90vh", background: "#1a1d23", borderRadius: "1rem", border: "1px solid rgba(255,255,255,0.08)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between px-5 py-4 shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <div>
                <p className="text-sm font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>{previewing.name}</p>
                <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>Subject: {previewing.subject}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { useTemplate(previewing); setPreviewing(null); }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-[1.02]"
                  style={{ background: "var(--color-red)", color: "#fff" }}
                >
                  <Send size={11} /> Use in Campaign
                </button>
                <button
                  onClick={() => setPreviewing(null)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center transition-all hover:bg-white/5"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  <X size={15} />
                </button>
              </div>
            </div>
            {/* Email rendered in iframe */}
            <div className="overflow-auto flex-1 p-4">
              <iframe
                srcDoc={getFullHtml(previewing.body)}
                sandbox="allow-same-origin"
                style={{ width: "100%", height: "600px", border: "none", borderRadius: "0.5rem", background: "#fff" }}
                title="Email Preview"
              />
            </div>
          </div>
        </div>
      )}

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
