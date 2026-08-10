"use client";

import { useState } from "react";

/* Shared card background — charts draw their end-dot ring and donut gaps in
   this color so they read as "cut into" the card rather than bordered. */
const SURFACE = "#1a1d23";

function fmtShort(dateStr?: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00Z");
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
}

/* Single-series time-series line — Opens/Clicks Over Time. One hue (no legend
   needed for a single series; the card title already names it), 2px round-cap
   line, ~10% area wash, zero-filled days so gaps read as zero, not "no data". */
export function LineChart({
  data,
  color,
}: {
  data: { date: string; count: number }[];
  color: string;
}) {
  const [hoverI, setHoverI] = useState<number | null>(null);

  const W = 600, H = 160;
  const padTop = 16, padBottom = 20, padX = 6;
  const innerW = W - padX * 2;
  const innerH = H - padTop - padBottom;
  const n = data.length;
  const max = Math.max(1, ...data.map((d) => d.count));

  const xAt = (i: number) => padX + (n <= 1 ? innerW / 2 : (i / (n - 1)) * innerW);
  const yAt = (v: number) => padTop + innerH - (v / max) * innerH;
  const points = data.map((d, i) => [xAt(i), yAt(d.count)] as const);

  if (n === 0) {
    return <div className="flex items-center justify-center text-xs" style={{ height: H, color: "rgba(255,255,255,0.25)" }}>No data in this window.</div>;
  }

  const linePath = points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const baseline = padTop + innerH;
  const areaPath = `${linePath} L${points[n - 1][0].toFixed(1)},${baseline} L${points[0][0].toFixed(1)},${baseline} Z`;
  const gridVals = [0, max / 2, max];
  const [lastX, lastY] = points[n - 1];

  function onMove(e: React.MouseEvent<SVGSVGElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const frac = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    setHoverI(Math.round(frac * (n - 1)));
  }

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        height={H}
        onMouseMove={onMove}
        onMouseLeave={() => setHoverI(null)}
        style={{ display: "block", overflow: "visible", cursor: "crosshair" }}
      >
        {gridVals.map((v, i) => (
          <g key={i}>
            <line x1={padX} x2={W - padX} y1={yAt(v)} y2={yAt(v)} stroke="rgba(255,255,255,0.06)" strokeWidth={1} />
            <text x={padX} y={yAt(v) - 3} fontSize="9" fill="rgba(255,255,255,0.28)">{Math.round(v)}</text>
          </g>
        ))}

        <path d={areaPath} fill={color} fillOpacity={0.1} stroke="none" />
        <path d={linePath} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />

        {/* end marker + direct label (value at the end — the one point worth labelling) */}
        <circle cx={lastX} cy={lastY} r={4} fill={color} stroke={SURFACE} strokeWidth={2} />
        <text x={Math.min(lastX, W - 20)} y={Math.max(lastY - 9, 12)} fontSize="10" fontWeight={700} fill="rgba(255,255,255,0.75)" textAnchor="end">
          {data[n - 1].count}
        </text>

        {hoverI != null && (
          <>
            <line x1={points[hoverI][0]} x2={points[hoverI][0]} y1={padTop} y2={baseline} stroke="rgba(255,255,255,0.15)" strokeWidth={1} />
            <circle cx={points[hoverI][0]} cy={points[hoverI][1]} r={4} fill={color} stroke={SURFACE} strokeWidth={2} />
          </>
        )}

        <text x={padX} y={H - 5} fontSize="9" fill="rgba(255,255,255,0.25)">{fmtShort(data[0]?.date)}</text>
        <text x={W - padX} y={H - 5} fontSize="9" fill="rgba(255,255,255,0.25)" textAnchor="end">{fmtShort(data[n - 1]?.date)}</text>
      </svg>

      {hoverI != null && (
        <div
          className="pointer-events-none absolute -translate-x-1/2 rounded-lg px-2.5 py-1.5 text-xs whitespace-nowrap"
          style={{
            left: `${(points[hoverI][0] / W) * 100}%`,
            top: 0,
            background: "#0d0f12",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.4)" }}>{fmtShort(data[hoverI].date)}</span>{" "}
          <strong style={{ color: "#fff" }}>{data[hoverI].count}</strong>
        </div>
      )}
    </div>
  );
}

/* 3-segment donut — Top Devices. Fixed categorical order/colors (validated:
   node scripts/validate_palette.js "#3b82f6,#16a34a,#7c3aed" --mode dark
   --surface "#1a1d23" → all pass; #7c3aed sits at 2.96:1 contrast, just under
   the 3:1 floor, so it always carries a direct % label per the WARN's
   required relief channel — never color alone. */
export function DonutChart({
  segments,
}: {
  segments: { label: string; value: number; color: string }[];
}) {
  const [hoverI, setHoverI] = useState<number | null>(null);
  const total = segments.reduce((s, x) => s + x.value, 0);
  const R = 38, C = 2 * Math.PI * R;

  const arcs = segments.reduce<{ label: string; value: number; color: string; dash: number; offset: number }[]>(
    (acc, s) => {
      const dash = total > 0 ? (s.value / total) * C : 0;
      const offset = acc.length ? acc[acc.length - 1].offset + acc[acc.length - 1].dash : 0;
      return [...acc, { ...s, dash, offset }];
    },
    [],
  );

  if (total === 0) {
    return <div className="flex items-center justify-center text-xs" style={{ height: 96, color: "rgba(255,255,255,0.25)" }}>No opens in this window.</div>;
  }

  return (
    <div className="flex items-center gap-6">
      <svg viewBox="0 0 100 100" width={110} height={110} style={{ overflow: "visible" }}>
        <circle cx={50} cy={50} r={R} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={14} />
        {arcs.map((a, i) => (
          <circle
            key={a.label}
            cx={50} cy={50} r={R} fill="none"
            stroke={a.color}
            strokeWidth={hoverI === i ? 16 : 14}
            strokeDasharray={`${Math.max(0, a.dash - 1.5)} ${C - a.dash + 1.5}`}
            strokeDashoffset={-a.offset}
            transform="rotate(-90 50 50)"
            strokeLinecap="butt"
            style={{ transition: "stroke-width 120ms", cursor: "pointer" }}
            onMouseEnter={() => setHoverI(i)}
            onMouseLeave={() => setHoverI(null)}
          />
        ))}
      </svg>
      <ul className="flex flex-col gap-2.5">
        {arcs.map((a, i) => (
          <li
            key={a.label}
            className="flex items-center gap-2 text-xs cursor-pointer"
            onMouseEnter={() => setHoverI(i)}
            onMouseLeave={() => setHoverI(null)}
          >
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: a.color, opacity: hoverI === null || hoverI === i ? 1 : 0.4 }} />
            <span style={{ color: "rgba(255,255,255,0.6)" }}>{a.label}</span>
            <span className="font-bold" style={{ color: "#fff" }}>{total ? Math.round((a.value / total) * 100) : 0}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
