import React from "react";
import type { ChartConfig, SliceData, SeriesData } from "@/data/chartConfigs";
import { cn } from "@/lib/utils";

// ── Helpers ───────────────────────────────────────────────────────────────────
function fmt(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(n % 1000 === 0 ? 0 : 1) + "k";
  if (n % 1 !== 0) return n.toFixed(1);
  return String(n);
}

// ── Legend ────────────────────────────────────────────────────────────────────
function Legend({ series }: { series: { name: string; color: string }[] }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 mt-3">
      {series.map((s) => (
        <span key={s.name} className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-600">
          <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: s.color }} />
          {s.name}
        </span>
      ))}
    </div>
  );
}

// ── Line Chart ────────────────────────────────────────────────────────────────
function LineChart({ cfg }: { cfg: Extract<ChartConfig, { type: "line" }> }) {
  const W = 520, H = 240, ML = 48, MR = 16, MT = 14, MB = 34;
  const PW = W - ML - MR;
  const PH = H - MT - MB;

  const allVals = cfg.series.flatMap((s) => s.values);
  const minV = Math.min(...allVals);
  const maxV = Math.max(...allVals);
  const range = maxV - minV || 1;

  const xs = (i: number) => ML + (i / (cfg.xLabels.length - 1)) * PW;
  const ys = (v: number) => MT + (1 - (v - minV) / range) * PH;

  const n = cfg.xLabels.length;
  const xStride = n <= 7 ? 1 : n <= 12 ? 2 : 3;
  const gridVals = [0, 0.25, 0.5, 0.75, 1];

  return (
    <div>
      {cfg.title && <p className="text-[12px] font-bold text-slate-600 text-center mb-2 leading-snug">{cfg.title}</p>}
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
        {/* Grid lines + Y labels */}
        {gridVals.map((t) => {
          const y = MT + t * PH;
          const v = maxV - t * range;
          return (
            <g key={t}>
              <line x1={ML} y1={y} x2={ML + PW} y2={y} stroke="#E2E8F0" strokeWidth="1"
                    strokeDasharray={t === 0 || t === 1 ? undefined : "3,4"} />
              <text x={ML - 5} y={y + 4} textAnchor="end" fontSize="10" fill="#94A3B8">{fmt(v)}</text>
            </g>
          );
        })}
        {/* Y-axis label */}
        {cfg.yLabel && (
          <text x={10} y={MT + PH / 2} textAnchor="middle" fontSize="10" fill="#94A3B8"
                transform={`rotate(-90,10,${MT + PH / 2})`}>{cfg.yLabel}</text>
        )}
        {/* X labels */}
        {cfg.xLabels.map((lbl, i) =>
          i % xStride !== 0 ? null : (
            <text key={i} x={xs(i)} y={H - 4} textAnchor="middle" fontSize="10" fill="#94A3B8">{lbl}</text>
          )
        )}
        {/* Area fills */}
        {cfg.series.map((s) => {
          const pts = s.values.map((v, i) => `${xs(i)},${ys(v)}`).join(" ");
          const first = `${xs(0)},${ys(s.values[0])}`;
          const last  = `${xs(s.values.length - 1)},${ys(s.values[s.values.length - 1])}`;
          const areaPts = `${first} ${pts} ${last} ${xs(s.values.length - 1)},${ys(minV)} ${xs(0)},${ys(minV)}`;
          return (
            <polygon key={`fill-${s.name}`} points={areaPts} fill={s.color} opacity="0.05" />
          );
        })}
        {/* Lines + dots */}
        {cfg.series.map((s) => (
          <g key={s.name}>
            <polyline
              points={s.values.map((v, i) => `${xs(i)},${ys(v)}`).join(" ")}
              fill="none" stroke={s.color} strokeWidth="2.5"
              strokeLinejoin="round" strokeLinecap="round"
            />
            {s.values.map((v, i) => (
              <circle key={i} cx={xs(i)} cy={ys(v)} r="3.5" fill={s.color} stroke="white" strokeWidth="1.5" />
            ))}
          </g>
        ))}
      </svg>
      <Legend series={cfg.series} />
    </div>
  );
}

// ── Bar Chart ─────────────────────────────────────────────────────────────────
function BarChart({ cfg }: { cfg: Extract<ChartConfig, { type: "bar" }> }) {
  const W = 520, H = 240, ML = 48, MR = 10, MT = 14, MB = 44;
  const PW = W - ML - MR;
  const PH = H - MT - MB;

  const nGroups = cfg.groups.length;
  const nSeries = cfg.series.length;
  const allVals = cfg.series.flatMap((s) => s.values);
  const maxV = Math.max(...allVals) * 1.1;

  const groupW = PW / nGroups;
  const barW = Math.min((groupW * 0.85) / nSeries, 28);
  const groupPad = (groupW - barW * nSeries) / 2;

  const xs = (gi: number, si: number) => ML + gi * groupW + groupPad + si * barW;
  const ys = (v: number) => MT + (1 - v / maxV) * PH;
  const barH = (v: number) => (v / maxV) * PH;

  const gridVals = [0, 0.25, 0.5, 0.75, 1];

  return (
    <div>
      {cfg.title && <p className="text-[12px] font-bold text-slate-600 text-center mb-2 leading-snug">{cfg.title}</p>}
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
        {/* Grid */}
        {gridVals.map((t) => {
          const y = MT + t * PH;
          const v = maxV * (1 - t);
          return (
            <g key={t}>
              <line x1={ML} y1={y} x2={ML + PW} y2={y} stroke="#E2E8F0" strokeWidth="1"
                    strokeDasharray={t === 0 || t === 1 ? undefined : "3,4"} />
              <text x={ML - 5} y={y + 4} textAnchor="end" fontSize="10" fill="#94A3B8">{fmt(v)}</text>
            </g>
          );
        })}
        {cfg.yLabel && (
          <text x={10} y={MT + PH / 2} textAnchor="middle" fontSize="10" fill="#94A3B8"
                transform={`rotate(-90,10,${MT + PH / 2})`}>{cfg.yLabel}</text>
        )}
        {/* Bars */}
        {cfg.groups.map((grp, gi) => (
          <g key={grp}>
            {cfg.series.map((s, si) => (
              <rect
                key={s.name}
                x={xs(gi, si)} y={ys(s.values[gi])}
                width={barW - 2} height={Math.max(0, barH(s.values[gi]))}
                rx="3" fill={s.color} opacity="0.9"
              />
            ))}
            {/* Group label */}
            <text
              x={ML + gi * groupW + groupW / 2}
              y={H - 6}
              textAnchor="middle" fontSize="9.5" fill="#94A3B8"
            >
              {grp.length > 10 ? grp.slice(0, 9) + "…" : grp}
            </text>
          </g>
        ))}
      </svg>
      <Legend series={cfg.series} />
    </div>
  );
}

// ── Pie helpers ───────────────────────────────────────────────────────────────
function pieArcPath(cx: number, cy: number, r: number, startAngle: number, endAngle: number): string {
  const x1 = cx + r * Math.cos(startAngle);
  const y1 = cy + r * Math.sin(startAngle);
  const x2 = cx + r * Math.cos(endAngle);
  const y2 = cy + r * Math.sin(endAngle);
  const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
  return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;
}

function PieSlices({ slices, cx, cy, r }: { slices: SliceData[]; cx: number; cy: number; r: number }) {
  const total = slices.reduce((s, sl) => s + sl.value, 0);
  let angle = -Math.PI / 2;
  return (
    <>
      {slices.map((sl) => {
        const sweep = (sl.value / total) * 2 * Math.PI;
        const path = pieArcPath(cx, cy, r, angle, angle + sweep);
        angle += sweep;
        return <path key={sl.label} d={path} fill={sl.color} stroke="white" strokeWidth="2" />;
      })}
    </>
  );
}

function SinglePie({ cfg }: { cfg: Extract<ChartConfig, { type: "pie" }> }) {
  return (
    <div>
      {cfg.title && <p className="text-[12px] font-bold text-slate-600 text-center mb-2">{cfg.title}</p>}
      <svg viewBox="0 0 300 200" className="w-full h-auto">
        <PieSlices slices={cfg.slices} cx={150} cy={100} r={85} />
      </svg>
      <Legend series={cfg.slices.map((sl) => ({ name: `${sl.label} (${sl.value}%)`, color: sl.color }))} />
    </div>
  );
}

function DualPie({ cfg }: { cfg: Extract<ChartConfig, { type: "dual-pie" }> }) {
  const both = [
    { title: cfg.title1, slices: cfg.slices1 },
    { title: cfg.title2, slices: cfg.slices2 },
  ];
  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        {both.map((p) => (
          <div key={p.title} className="flex flex-col items-center">
            <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2 text-center">{p.title}</p>
            <svg viewBox="0 0 160 160" className="w-full max-w-[150px] h-auto">
              <PieSlices slices={p.slices} cx={80} cy={80} r={68} />
            </svg>
          </div>
        ))}
      </div>
      <Legend series={cfg.slices1.map((sl) => ({ name: sl.label, color: sl.color }))} />
    </div>
  );
}

// ── Table ─────────────────────────────────────────────────────────────────────
function TableChart({ cfg }: { cfg: Extract<ChartConfig, { type: "table" }> }) {
  return (
    <div>
      {cfg.title && <p className="text-[12px] font-bold text-slate-600 text-center mb-3 leading-snug">{cfg.title}</p>}
      <div className="overflow-x-auto rounded-xl border border-slate-100 shadow-sm">
        <table className="w-full text-[12px] border-collapse">
          <thead>
            <tr className="bg-slate-800 text-white">
              <th className="px-3 py-2.5 text-left font-bold rounded-tl-xl">Country / Region</th>
              {cfg.headers.slice(1).map((h, i) => (
                <th key={i} className={cn("px-3 py-2.5 text-center font-bold whitespace-nowrap", i === cfg.headers.length - 2 && "rounded-tr-xl")}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cfg.rows.map((row, ri) => (
              <tr key={ri} className={ri % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                <td className="px-3 py-2.5 font-bold text-slate-700">{row.label}</td>
                {row.values.map((v, vi) => (
                  <td key={vi} className="px-3 py-2.5 text-center text-slate-600 font-medium tabular-nums">{v}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Combo Chart (Bars + Line) ─────────────────────────────────────────────────
function ComboChart({ cfg }: { cfg: Extract<ChartConfig, { type: "combo" }> }) {
  const W = 520, H = 240, ML = 50, MR = 50, MT = 14, MB = 34;
  const PW = W - ML - MR;
  const PH = H - MT - MB;
  const n = cfg.xLabels.length;

  // Bar axis (left)
  const allBarVals = cfg.bars.flatMap((s) => s.values);
  const maxBar = Math.max(...allBarVals) * 1.15;

  // Line axis (right)
  const lineVals = cfg.line.values;
  const minLine = Math.min(...lineVals) * 0.9;
  const maxLine = Math.max(...lineVals) * 1.1;
  const lineRange = maxLine - minLine || 1;

  const nBars = cfg.bars.length;
  const groupW = PW / n;
  const barW = Math.min((groupW * 0.8) / nBars, 28);
  const groupPad = (groupW - barW * nBars) / 2;

  const xGroup = (i: number) => ML + i * groupW;
  const xCenter = (i: number) => ML + (i + 0.5) * groupW;
  const yBar = (v: number) => MT + (1 - v / maxBar) * PH;
  const barH = (v: number) => (v / maxBar) * PH;
  const yLine = (v: number) => MT + (1 - (v - minLine) / lineRange) * PH;

  const gridVals = [0, 0.25, 0.5, 0.75, 1];

  return (
    <div>
      {cfg.title && <p className="text-[12px] font-bold text-slate-600 text-center mb-2">{cfg.title}</p>}
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto">
        {gridVals.map((t) => {
          const y = MT + t * PH;
          return <line key={t} x1={ML} y1={y} x2={ML + PW} y2={y} stroke="#E2E8F0" strokeWidth="1" strokeDasharray={t === 0 || t === 1 ? undefined : "3,4"} />;
        })}
        {/* Left Y labels (bars) */}
        {gridVals.map((t) => {
          const y = MT + t * PH;
          const v = maxBar * (1 - t);
          return <text key={t} x={ML - 5} y={y + 4} textAnchor="end" fontSize="10" fill="#94A3B8">{fmt(v)}</text>;
        })}
        {/* Right Y labels (line) */}
        {gridVals.map((t) => {
          const y = MT + t * PH;
          const v = maxLine - t * lineRange;
          return <text key={t} x={W - MR + 5} y={y + 4} textAnchor="start" fontSize="10" fill={cfg.line.color}>{fmt(v)}</text>;
        })}
        {/* Axis labels */}
        {cfg.barYLabel && <text x={10} y={MT + PH / 2} textAnchor="middle" fontSize="10" fill="#94A3B8" transform={`rotate(-90,10,${MT + PH / 2})`}>{cfg.barYLabel}</text>}
        {cfg.lineYLabel && <text x={W - 8} y={MT + PH / 2} textAnchor="middle" fontSize="10" fill={cfg.line.color} transform={`rotate(90,${W - 8},${MT + PH / 2})`}>{cfg.lineYLabel}</text>}
        {/* Bars */}
        {cfg.xLabels.map((_, gi) =>
          cfg.bars.map((s, si) => (
            <rect
              key={`${gi}-${si}`}
              x={xGroup(gi) + groupPad + si * barW}
              y={yBar(s.values[gi])}
              width={barW - 2}
              height={Math.max(0, barH(s.values[gi]))}
              rx="3" fill={s.color} opacity="0.85"
            />
          ))
        )}
        {/* X labels */}
        {cfg.xLabels.map((lbl, i) => (
          <text key={i} x={xCenter(i)} y={H - 4} textAnchor="middle" fontSize="10" fill="#94A3B8">{lbl}</text>
        ))}
        {/* Line */}
        <polyline
          points={lineVals.map((v, i) => `${xCenter(i)},${yLine(v)}`).join(" ")}
          fill="none" stroke={cfg.line.color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"
        />
        {lineVals.map((v, i) => (
          <circle key={i} cx={xCenter(i)} cy={yLine(v)} r="4" fill={cfg.line.color} stroke="white" strokeWidth="1.5" />
        ))}
      </svg>
      <Legend series={[...cfg.bars, cfg.line]} />
    </div>
  );
}

// ── Process Diagram ────────────────────────────────────────────────────────────
function ProcessDiagram({ cfg }: { cfg: Extract<ChartConfig, { type: "process" }> }) {
  return (
    <div>
      {cfg.title && <p className="text-[12px] font-bold text-slate-600 text-center mb-3 leading-snug">{cfg.title}</p>}
      <div className="flex flex-col items-center gap-0">
        {cfg.steps.map((step, i) => (
          <React.Fragment key={i}>
            <div className="flex items-start gap-3 w-full max-w-sm">
              <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center text-xs font-black flex-shrink-0 shadow-md">
                {i + 1}
              </div>
              <div className="flex-1 bg-white border border-slate-100 rounded-xl px-4 py-2.5 shadow-sm min-h-[3rem] flex flex-col justify-center">
                <p className="text-[13px] font-bold text-slate-800 leading-tight">{step.label}</p>
                {step.sub && <p className="text-[11px] text-slate-500 mt-0.5">{step.sub}</p>}
              </div>
            </div>
            {i < cfg.steps.length - 1 && (
              <div className="w-0.5 h-5 bg-slate-300 ml-4 flex-shrink-0" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

// ── Map Comparison ────────────────────────────────────────────────────────────
function MapComparison({ cfg }: { cfg: Extract<ChartConfig, { type: "map" }> }) {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        {[
          { title: cfg.title1, features: cfg.features1, accent: "bg-slate-100 border-slate-200" },
          { title: cfg.title2, features: cfg.features2, accent: "bg-blue-50 border-blue-100" },
        ].map((pane) => (
          <div key={pane.title} className={cn("rounded-2xl border p-4", pane.accent)}>
            <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-3 text-center">{pane.title}</p>
            <ul className="space-y-2">
              {pane.features.map((f, i) => (
                <li key={i} className="text-[12.5px] font-medium text-slate-700 leading-snug flex items-start gap-1.5">
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main Export ───────────────────────────────────────────────────────────────
export function ChartRenderer({ config }: { config: ChartConfig }) {
  switch (config.type) {
    case "line":      return <LineChart cfg={config} />;
    case "bar":       return <BarChart cfg={config} />;
    case "pie":       return <SinglePie cfg={config} />;
    case "dual-pie":  return <DualPie cfg={config} />;
    case "table":     return <TableChart cfg={config} />;
    case "combo":     return <ComboChart cfg={config} />;
    case "process":   return <ProcessDiagram cfg={config} />;
    case "map":       return <MapComparison cfg={config} />;
    default:          return null;
  }
}
