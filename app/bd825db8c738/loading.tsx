import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-3" style={{ background: "#0d0f12" }}>
      <Loader2 className="animate-spin" size={28} style={{ color: "var(--color-red)" }} />
      <p className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.35)" }}>Loading…</p>
    </div>
  );
}
