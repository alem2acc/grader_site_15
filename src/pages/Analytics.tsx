import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Mic, PenTool, BookOpen, Headphones,
  TrendingUp, TrendingDown, Minus, Loader2,
  Sparkles, Target, Zap, Activity, ArrowUpRight,
  CalendarDays, BarChart2,
} from "lucide-react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

// ── Types ─────────────────────────────────────────────────────────────────────
interface Session {
  id: string;
  type: string;
  overallBand: number;
  createdAt: { toDate: () => Date } | null;
  evaluation: Record<string, number>;
  part?: number;
  task?: number;
  topic?: string;
  prompt?: string;
  transcript?: string;
  essay?: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function toDate(ts: Session["createdAt"]): Date {
  if (!ts) return new Date(0);
  if (typeof (ts as { toDate?: () => Date }).toDate === "function") {
    return (ts as { toDate: () => Date }).toDate();
  }
  return new Date(ts as unknown as string);
}

function fmtDate(ts: Session["createdAt"]): string {
  const d = toDate(ts);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function fmtShort(ts: Session["createdAt"]): string {
  const d = toDate(ts);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

function bandColor(band: number): string {
  if (band >= 8) return "text-emerald-600";
  if (band >= 7) return "text-blue-600";
  if (band >= 6) return "text-amber-600";
  return "text-rose-600";
}

function bandBg(band: number): string {
  if (band >= 8) return "bg-emerald-100 text-emerald-700";
  if (band >= 7) return "bg-blue-100 text-blue-700";
  if (band >= 6) return "bg-amber-100 text-amber-700";
  return "bg-rose-100 text-rose-700";
}

// ── Sparkline SVG ─────────────────────────────────────────────────────────────
function Sparkline({ values, stroke }: { values: number[]; stroke: string }) {
  if (values.length < 2) {
    return (
      <div className="w-24 h-8 flex items-center justify-center">
        <span className="text-xs text-text-tertiary">—</span>
      </div>
    );
  }
  const W = 96, H = 32, pad = 3;
  const min = Math.max(0, Math.min(...values) - 0.5);
  const max = Math.min(9, Math.max(...values) + 0.5);
  const range = max - min || 1;
  const pts = values.map((v, i) => {
    const x = pad + (i / (values.length - 1)) * (W - pad * 2);
    const y = H - pad - ((v - min) / range) * (H - pad * 2);
    return [x, y] as [number, number];
  });
  const polyline = pts.map((p) => p.join(",")).join(" ");
  const fillPath = `M${pts[0][0]},${H - pad} ` +
    pts.map((p) => `L${p[0]},${p[1]}`).join(" ") +
    ` L${pts[pts.length - 1][0]},${H - pad} Z`;
  return (
    <svg width={W} height={H} className="overflow-visible shrink-0">
      <defs>
        <linearGradient id={`sg-${stroke.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.3" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={fillPath} fill={`url(#sg-${stroke.replace("#", "")})`} />
      <polyline points={polyline} fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="3" fill={stroke} />
    </svg>
  );
}

// ── Band Timeline Chart ────────────────────────────────────────────────────────
function TimelineChart({ sessions }: { sessions: Session[] }) {
  const data = useMemo(() => {
    return [...sessions]
      .filter((s) => s.overallBand > 0)
      .sort((a, b) => toDate(a.createdAt).getTime() - toDate(b.createdAt).getTime())
      .slice(-30);
  }, [sessions]);

  if (data.length < 2) {
    return (
      <div className="flex flex-col items-center justify-center h-40 gap-3 text-center">
        <BarChart2 className="w-8 h-8 text-text-tertiary" />
        <p className="text-sm text-text-tertiary">Complete at least 2 sessions to see your trend</p>
      </div>
    );
  }

  const W = 100, H = 100; // viewBox units (percentage-based)
  const padL = 8, padR = 4, padT = 8, padB = 20;
  const minBand = Math.max(0, Math.min(...data.map((s) => s.overallBand)) - 0.5);
  const maxBand = Math.min(9, Math.max(...data.map((s) => s.overallBand)) + 0.5);
  const rangeB = maxBand - minBand || 1;

  const pts = data.map((s, i) => {
    const x = padL + (i / (data.length - 1)) * (W - padL - padR);
    const y = padT + (1 - (s.overallBand - minBand) / rangeB) * (H - padT - padB);
    return { x, y, s };
  });

  const polyline = pts.map((p) => `${p.x},${p.y}`).join(" ");
  const fillPath = `M${pts[0].x},${H - padB} ` +
    pts.map((p) => `L${p.x},${p.y}`).join(" ") +
    ` L${pts[pts.length - 1].x},${H - padB} Z`;

  // Y-axis labels: show a few band values
  const yLabels = [Math.ceil(minBand), Math.round((minBand + maxBand) / 2), Math.floor(maxBand)].filter(
    (v, i, a) => a.indexOf(v) === i && v >= 0 && v <= 9,
  );

  // X-axis labels: first, middle, last
  const xLabelIdxs = [0, Math.floor((data.length - 1) / 2), data.length - 1];

  const SKILL_COLORS: Record<string, string> = {
    speaking: "#F97316",
    writing: "#EC4899",
    reading: "#3B82F6",
    listening: "#14B8A6",
  };

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 200 }} preserveAspectRatio="none">
        {/* Grid lines */}
        {yLabels.map((v) => {
          const y = padT + (1 - (v - minBand) / rangeB) * (H - padT - padB);
          return (
            <line key={v} x1={padL} y1={y} x2={W - padR} y2={y}
              stroke="#E4E4E7" strokeWidth="0.5" strokeDasharray="2,2" />
          );
        })}
        {/* Fill area */}
        <defs>
          <linearGradient id="timeline-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366F1" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={fillPath} fill="url(#timeline-fill)" />
        {/* Line */}
        <polyline points={polyline} fill="none" stroke="#6366F1" strokeWidth="1.5"
          strokeLinecap="round" strokeLinejoin="round" />
        {/* Dots colored by skill */}
        {pts.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="1.5"
            fill={SKILL_COLORS[p.s.type] || "#6366F1"}
            stroke="white" strokeWidth="0.5" />
        ))}
        {/* Y-axis labels */}
        {yLabels.map((v) => {
          const y = padT + (1 - (v - minBand) / rangeB) * (H - padT - padB);
          return (
            <text key={v} x={padL - 1} y={y + 1} textAnchor="end"
              fontSize="4" fill="#A1A1AA" fontFamily="system-ui">{v.toFixed(1)}</text>
          );
        })}
        {/* X-axis labels */}
        {xLabelIdxs.map((idx) => {
          const p = pts[idx];
          const anchor = idx === 0 ? "start" : idx === data.length - 1 ? "end" : "middle";
          return (
            <text key={idx} x={p.x} y={H - padB + 6} textAnchor={anchor}
              fontSize="3.5" fill="#A1A1AA" fontFamily="system-ui">
              {fmtShort(data[idx].createdAt)}
            </text>
          );
        })}
      </svg>
      {/* Legend */}
      <div className="flex flex-wrap gap-3 mt-2">
        {Object.entries(SKILL_COLORS).map(([skill, color]) => (
          <div key={skill} className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-xs text-text-tertiary capitalize">{skill}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Sub-score bar chart ────────────────────────────────────────────────────────
function SubScoreBars({ label, scores }: { label: string; scores: { key: string; label: string; value: number; color: string }[] }) {
  return (
    <div>
      <p className="text-xs font-bold text-text-tertiary uppercase tracking-widest mb-3">{label}</p>
      <div className="space-y-2.5">
        {scores.map(({ key, label: lbl, value, color }) => (
          <div key={key}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-text-secondary">{lbl}</span>
              <span className={cn("text-xs font-bold tabular-nums", value >= 7 ? "text-emerald-600" : value >= 5.5 ? "text-amber-600" : "text-rose-600")}>
                {value.toFixed(1)}
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-bg-secondary overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${(value / 9) * 100}%`, backgroundColor: color }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Skill meta ─────────────────────────────────────────────────────────────────
const SKILL_META = [
  { type: "speaking",  label: "Speaking",  icon: Mic,        color: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500/20", stroke: "#F97316", href: "/app/speaking" },
  { type: "writing",   label: "Writing",   icon: PenTool,    color: "text-pink-500",   bg: "bg-pink-500/10",   border: "border-pink-500/20",   stroke: "#EC4899", href: "/app/writing"  },
  { type: "reading",   label: "Reading",   icon: BookOpen,   color: "text-blue-500",   bg: "bg-blue-500/10",   border: "border-blue-500/20",   stroke: "#3B82F6", href: "/app/reading"  },
  { type: "listening", label: "Listening", icon: Headphones, color: "text-teal-500",   bg: "bg-teal-500/10",   border: "border-teal-500/20",   stroke: "#14B8A6", href: "/app/listening"},
];

// ════════════════════════════════════════════════════════════════════════════════
// Main Export
// ════════════════════════════════════════════════════════════════════════════════
export function Analytics() {
  const { user } = useAuth();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    getDocs(
      query(collection(db, "users", user.uid, "sessions"), orderBy("createdAt", "desc"), limit(200))
    ).then((snap) => {
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Session));
      setSessions(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [user]);

  // ── Derived stats ──────────────────────────────────────────────────────────
  const skillStats = useMemo(() => {
    return SKILL_META.map((meta) => {
      const list = sessions
        .filter((s) => s.type === meta.type && s.overallBand > 0)
        .sort((a, b) => toDate(a.createdAt).getTime() - toDate(b.createdAt).getTime());
      const bands = list.map((s) => s.overallBand);
      const avg = bands.length ? bands.reduce((a, b) => a + b, 0) / bands.length : 0;
      const last = bands[bands.length - 1] || 0;
      const prev = bands[bands.length - 2] || 0;
      const trend = bands.length >= 2 ? last - prev : 0;
      return { ...meta, count: list.length, avg, bands: bands.slice(-10), trend, lastSession: list[list.length - 1] };
    });
  }, [sessions]);

  const overallAvg = useMemo(() => {
    const all = sessions.filter((s) => s.overallBand > 0);
    return all.length ? all.reduce((a, s) => a + s.overallBand, 0) / all.length : 0;
  }, [sessions]);

  const bestSkill = useMemo(() => {
    const sorted = [...skillStats].sort((a, b) => b.avg - a.avg);
    return sorted.find((s) => s.avg > 0);
  }, [skillStats]);

  const recentSessions = useMemo(() => {
    return [...sessions].slice(0, 10);
  }, [sessions]);

  // ── Sub-scores from last speaking + writing sessions ──────────────────────
  const lastSpeaking = useMemo(() =>
    sessions.find((s) => s.type === "speaking" && s.overallBand > 0), [sessions]);
  const lastWriting = useMemo(() =>
    sessions.find((s) => s.type === "writing" && s.overallBand > 0), [sessions]);

  const speakingSubScores = lastSpeaking ? [
    { key: "fluency",       label: "Fluency & Coherence",    value: lastSpeaking.evaluation?.fluency       || 0, color: "#F97316" },
    { key: "lexical",       label: "Lexical Resource",       value: lastSpeaking.evaluation?.lexical       || 0, color: "#EC4899" },
    { key: "grammar",       label: "Grammatical Range",      value: lastSpeaking.evaluation?.grammar       || 0, color: "#8B5CF6" },
    { key: "pronunciation", label: "Pronunciation",          value: lastSpeaking.evaluation?.pronunciation || 0, color: "#3B82F6" },
  ] : [];

  const writingSubScores = lastWriting ? [
    { key: "taskAchievement", label: "Task Achievement",     value: lastWriting.evaluation?.taskAchievement || 0, color: "#EC4899" },
    { key: "coherence",       label: "Coherence & Cohesion", value: lastWriting.evaluation?.coherence       || 0, color: "#F97316" },
    { key: "lexical",         label: "Lexical Resource",     value: lastWriting.evaluation?.lexical         || 0, color: "#8B5CF6" },
    { key: "grammar",         label: "Grammatical Range",    value: lastWriting.evaluation?.grammar         || 0, color: "#3B82F6" },
  ] : [];

  // This week vs last week improvement
  const thisWeekSessions = useMemo(() => {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    return sessions.filter((s) => toDate(s.createdAt) > weekAgo).length;
  }, [sessions]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="w-8 h-8 animate-spin text-text-tertiary" />
      </div>
    );
  }

  if (sessions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center gap-6">
        <div className="w-20 h-20 rounded-[2rem] bg-bg-secondary flex items-center justify-center text-4xl shadow-sm">📊</div>
        <div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">No data yet</h2>
          <p className="text-text-secondary max-w-sm">Complete your first practice session and your analytics will appear here.</p>
        </div>
        <Link to="/app/speaking"
          className="flex items-center gap-2 px-6 py-3 bg-text-primary text-white rounded-full text-sm font-semibold hover:opacity-80 transition-opacity">
          <Zap className="w-4 h-4" /> Start Practising
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-[#05050A] text-white p-8 sm:p-12 border border-white/10 shadow-2xl">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-indigo-600/25 to-violet-600/25 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-teal-500/15 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/3 pointer-events-none" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-medium tracking-wide mb-6 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            <span className="text-white/90">Performance Analytics</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-8 text-balance">
            Your IELTS{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
              Progress
            </span>
          </h1>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: Activity, label: "Total Sessions", value: sessions.length, color: "text-indigo-400" },
              { icon: Target,   label: "Avg Band Score", value: overallAvg ? overallAvg.toFixed(1) : "—", color: "text-violet-400" },
              { icon: Zap,      label: "This Week",      value: `${thisWeekSessions} session${thisWeekSessions !== 1 ? "s" : ""}`, color: "text-teal-400" },
              { icon: TrendingUp, label: "Best Skill",   value: bestSkill ? bestSkill.label : "—", color: "text-emerald-400" },
            ].map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="px-5 py-4 rounded-2xl bg-white/8 border border-white/10 backdrop-blur-md">
                <Icon className={cn("w-4 h-4 mb-2", color)} />
                <p className="text-xl font-bold leading-tight">{value}</p>
                <p className="text-[11px] text-white/40 uppercase tracking-widest mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Skill Cards Grid ──────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {skillStats.map((s) => {
          const Icon = s.icon;
          const TrendIcon = s.trend > 0 ? TrendingUp : s.trend < 0 ? TrendingDown : Minus;
          const trendColor = s.trend > 0 ? "text-emerald-600" : s.trend < 0 ? "text-rose-600" : "text-text-tertiary";
          return (
            <Link
              key={s.type}
              to={s.href}
              className="group bento-card p-6 flex flex-col gap-4 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className={cn("w-11 h-11 rounded-2xl flex items-center justify-center", s.bg, s.border, "border")}>
                  <Icon className={cn("w-5 h-5", s.color)} />
                </div>
                <ArrowUpRight className="w-4 h-4 text-text-tertiary opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div>
                <p className="text-xs font-semibold text-text-tertiary uppercase tracking-widest mb-1">{s.label}</p>
                <div className="flex items-baseline gap-2">
                  {s.avg > 0 ? (
                    <>
                      <span className={cn("text-4xl font-bold tabular-nums", bandColor(s.avg))}>{s.avg.toFixed(1)}</span>
                      <span className="text-sm text-text-tertiary">avg band</span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold text-text-tertiary">No data</span>
                  )}
                </div>
              </div>

              <div className="flex items-end justify-between gap-2">
                <div>
                  <p className="text-xs text-text-tertiary">{s.count} session{s.count !== 1 ? "s" : ""}</p>
                  {s.trend !== 0 && (
                    <div className={cn("flex items-center gap-1 text-xs font-semibold mt-0.5", trendColor)}>
                      <TrendIcon className="w-3.5 h-3.5" />
                      {Math.abs(s.trend).toFixed(1)} from last
                    </div>
                  )}
                </div>
                <Sparkline values={s.bands} stroke={s.stroke} />
              </div>
            </Link>
          );
        })}
      </div>

      {/* ── Timeline Chart + Sub-scores ───────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Timeline Chart */}
        <div className="lg:col-span-2 bento-card p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-text-primary">Band Score Over Time</h2>
              <p className="text-sm text-text-tertiary">Last {Math.min(30, sessions.filter(s => s.overallBand > 0).length)} sessions</p>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-bg-secondary border border-border/60 text-xs font-medium text-text-secondary">
              <CalendarDays className="w-3.5 h-3.5" />
              All skills
            </div>
          </div>
          <TimelineChart sessions={sessions} />
        </div>

        {/* Sub-score breakdown */}
        <div className="bento-card p-8 flex flex-col gap-8">
          <h2 className="text-lg font-bold text-text-primary">Sub-score Breakdown</h2>
          {speakingSubScores.length > 0 && (
            <SubScoreBars label="Speaking (latest)" scores={speakingSubScores} />
          )}
          {writingSubScores.length > 0 && (
            <SubScoreBars label="Writing (latest)" scores={writingSubScores} />
          )}
          {speakingSubScores.length === 0 && writingSubScores.length === 0 && (
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-3 py-8">
              <p className="text-sm text-text-tertiary">Complete a Speaking or Writing session to see sub-score analysis.</p>
            </div>
          )}
        </div>
      </div>

      {/* ── Recent Sessions Table ─────────────────────────────────────────── */}
      <div className="bento-card overflow-hidden">
        <div className="px-8 py-6 border-b border-border/60 flex items-center justify-between">
          <h2 className="text-lg font-bold text-text-primary">Recent Sessions</h2>
          <span className="text-sm text-text-tertiary">{recentSessions.length} of {sessions.length}</span>
        </div>
        <div className="divide-y divide-border/60">
          {recentSessions.map((s) => {
            const meta = SKILL_META.find((m) => m.type === s.type);
            const Icon = meta?.icon || Sparkles;
            const subtitle = s.type === "speaking"
              ? `Part ${s.part || "—"}`
              : s.type === "writing"
              ? `Task ${s.task || "—"}`
              : s.type;
            const detail = s.topic || (s.prompt ? s.prompt.slice(0, 60) + "…" : "");
            return (
              <div key={s.id} className="px-8 py-4 flex items-center gap-4 hover:bg-bg-secondary transition-colors group">
                <div className={cn("shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center", meta?.bg || "bg-bg-secondary", meta?.border || "border-border/40", "border")}>
                  <Icon className={cn("w-4 h-4", meta?.color || "text-text-secondary")} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-text-primary capitalize">
                    {meta?.label || s.type}
                    <span className="text-text-tertiary font-normal"> · {subtitle}</span>
                  </p>
                  {detail && <p className="text-xs text-text-tertiary truncate mt-0.5">{detail}</p>}
                </div>
                <div className="shrink-0 text-right">
                  {s.overallBand > 0 && (
                    <span className={cn("inline-block px-2.5 py-0.5 rounded-lg text-sm font-bold", bandBg(s.overallBand))}>
                      {s.overallBand.toFixed(1)}
                    </span>
                  )}
                  <p className="text-[11px] text-text-tertiary mt-1">{fmtDate(s.createdAt)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
