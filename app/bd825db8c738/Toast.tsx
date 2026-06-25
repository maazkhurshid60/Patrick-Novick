"use client";

import { useEffect, useState, useCallback } from "react";
import { CheckCircle, XCircle, AlertCircle, X, Loader2 } from "lucide-react";

export type ToastType = "success" | "error" | "info" | "loading";

export interface ToastItem {
  id: string;
  type: ToastType;
  message: string;
  duration?: number; // ms, 0 = never auto-dismiss
}

// ─── Singleton event bus ───────────────────────────────────────────────────────
type Listener = (t: ToastItem) => void;
type DismissListener = (id: string) => void;
const listeners: Listener[] = [];
const dismissListeners: DismissListener[] = [];

export function toast(message: string, type: ToastType = "info", duration = 3500) {
  const item: ToastItem = { id: crypto.randomUUID(), type, message, duration };
  listeners.forEach((l) => l(item));
  return item.id;
}
toast.success = (msg: string, d?: number) => toast(msg, "success", d ?? 3500);
toast.error   = (msg: string, d?: number) => toast(msg, "error",   d ?? 5000);
toast.info    = (msg: string, d?: number) => toast(msg, "info",    d ?? 3000);
toast.loading = (msg: string)             => toast(msg, "loading", 0);
// Dismiss a specific toast by id — needed to clear "loading" toasts (duration 0)
toast.dismiss = (id: string) => dismissListeners.forEach((l) => l(id));

// ─── Provider / renderer ──────────────────────────────────────────────────────
export function ToastProvider() {
  const [items, setItems] = useState<ToastItem[]>([]);

  const addToast = useCallback((t: ToastItem) => {
    setItems((prev) => [...prev, t]);
    if (t.duration && t.duration > 0) {
      setTimeout(() => removeToast(t.id), t.duration);
    }
  }, []);

  function removeToast(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  useEffect(() => {
    listeners.push(addToast);
    const onDismiss: DismissListener = (id) => removeToast(id);
    dismissListeners.push(onDismiss);
    return () => {
      const idx = listeners.indexOf(addToast);
      if (idx !== -1) listeners.splice(idx, 1);
      const dIdx = dismissListeners.indexOf(onDismiss);
      if (dIdx !== -1) dismissListeners.splice(dIdx, 1);
    };
  }, [addToast]);

  if (items.length === 0) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "1.5rem",
        right: "1.5rem",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: "0.625rem",
        pointerEvents: "none",
      }}
    >
      {items.map((t) => (
        <ToastCard key={t.id} item={t} onClose={() => removeToast(t.id)} />
      ))}
    </div>
  );
}

function ToastCard({ item, onClose }: { item: ToastItem; onClose: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  const colors = {
    success: { bg: "rgba(22,163,74,0.12)",  border: "rgba(74,222,128,0.25)",  text: "#4ade80",  icon: <CheckCircle size={15} /> },
    error:   { bg: "rgba(230,57,70,0.13)",  border: "rgba(230,57,70,0.3)",   text: "#f87171",  icon: <XCircle size={15} />     },
    info:    { bg: "rgba(99,102,241,0.12)", border: "rgba(167,139,250,0.25)", text: "#a5b4fc",  icon: <AlertCircle size={15} /> },
    loading: { bg: "rgba(255,255,255,0.06)", border: "rgba(255,255,255,0.1)", text: "rgba(255,255,255,0.7)", icon: <Loader2 size={15} style={{ animation: "spin 0.9s linear infinite" }} /> },
  }[item.type];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.625rem",
        minWidth: 260,
        maxWidth: 380,
        padding: "0.7rem 0.875rem",
        borderRadius: "0.875rem",
        background: "#1a1d23",
        border: `1px solid ${colors.border}`,
        boxShadow: "0 8px 32px rgba(0,0,0,0.45)",
        pointerEvents: "auto",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: "opacity 0.22s ease, transform 0.22s ease",
      }}
    >
      <span style={{ color: colors.text, flexShrink: 0 }}>{colors.icon}</span>
      <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.85)", fontWeight: 500, flex: 1, lineHeight: 1.4 }}>
        {item.message}
      </p>
      {item.type !== "loading" && (
        <button
          onClick={onClose}
          style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.25)", display: "flex", flexShrink: 0, padding: 0 }}
        >
          <X size={13} />
        </button>
      )}
    </div>
  );
}

// ─── Spinner for buttons ──────────────────────────────────────────────────────
export function Spinner({ size = 14 }: { size?: number }) {
  return (
    <Loader2
      size={size}
      style={{ animation: "spin 0.8s linear infinite", flexShrink: 0 }}
    />
  );
}
