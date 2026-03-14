import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Flame, Target, CheckCircle2, Circle, ArrowUpRight,
  Mic, PenTool, BookOpen, Headphones, BookA,
  ChevronRight, Loader2, Trophy, Zap, TrendingUp,
} from "lucide-react";
import {
  collection, query, orderBy, limit, getDocs,
  doc, getDoc, setDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";

// ─── types ────────────────────────────────────────────────────────────────────
interface SkillBand { speaking: number; writing: number; reading: number; listening: number }

const SKILL_META = [
  { key: "speaking",  label: "Speaking",  icon: Mic,       href: "/app/speaking/practice?part=2", color: "#0a0a0a" },
  { key: "writing",   label: "Writing",   icon: PenTool,   href: "/app/writing/task2",             color: "#0a0a0a" },
  { key: "reading",   label: "Reading",   icon: BookOpen,  href: "/app/reading/practice",          color: "#0a0a0a" },
  { key: "listening", label: "Listening", icon: Headphones,href: "/app/listening",                 color: "#0a0a0a" },
];

// Day index 0 = Sunday in JS
const DAILY_SCHEDULE: { skill: string; label: string; time: string; icon: any; href: string }[][] = [
  // Sun
  [
    { skill: "speaking",   label: "Speaking — Part 3 Discussion",  time: "15 min", icon: Mic,       href: "/app/speaking/practice?part=3"  },
    { skill: "writing",    label: "Writing — Task 2 Essay",         time: "40 min", icon: PenTool,   href: "/app/writing/task2"              },
    { skill: "vocabulary", label: "Vocabulary Drill — 20 words",    time: "10 min", icon: BookA,     href: "/app/vocabulary"                 },
  ],
  // Mon
  [
    { skill: "speaking",   label: "Speaking — Part 1 Introduction", time: "10 min", icon: Mic,       href: "/app/speaking/practice?part=1"  },
    { skill: "reading",    label: "Reading Practice",                time: "30 min", icon: BookOpen,  href: "/app/reading/practice"           },
    { skill: "vocabulary", label: "Vocabulary Drill — 20 words",    time: "10 min", icon: BookA,     href: "/app/vocabulary"                 },
  ],
  // Tue
  [
    { skill: "writing",    label: "Writing — Task 1 Report",        time: "20 min", icon: PenTool,   href: "/app/writing/task1"              },
    { skill: "reading",    label: "Reading Practice",               time: "30 min", icon: BookOpen,  href: "/app/reading/practice"           },
    { skill: "vocabulary", label: "Vocabulary Drill — 20 words",    time: "10 min", icon: BookA,     href: "/app/vocabulary"                 },
  ],
  // Wed
  [
    { skill: "speaking",   label: "Speaking — Part 2 Long Turn",    time: "15 min", icon: Mic,       href: "/app/speaking/practice?part=2"  },
    { skill: "listening",  label: "Listening Overview",             time: "10 min", icon: Headphones,href: "/app/listening"                  },
    { skill: "vocabulary", label: "Vocabulary Drill — 20 words",    time: "10 min", icon: BookA,     href: "/app/vocabulary"                 },
  ],
  // Thu
  [
    { skill: "writing",    label: "Writing — Task 2 Essay",         time: "40 min", icon: PenTool,   href: "/app/writing/task2"              },
    { skill: "reading",    label: "Reading Practice",               time: "30 min", icon: BookOpen,  href: "/app/reading/practice"           },
    { skill: "vocabulary", label: "Vocabulary Drill — 20 words",    time: "10 min", icon: BookA,     href: "/app/vocabulary"                 },
  ],
  // Fri
  [
    { skill: "speaking",   label: "Speaking — Part 3 Discussion",   time: "15 min", icon: Mic,       href: "/app/speaking/practice?part=3"  },
    { skill: "listening",  label: "Listening Review",               time: "10 min", icon: Headphones,href: "/app/listening"                  },
    { skill: "vocabulary", label: "Vocabulary Drill — 20 words",    time: "10 min", icon: BookA,     href: "/app/vocabulary"                 },
  ],
  // Sat
  [
    { skill: "writing",    label: "Writing — Task 1 Report",        time: "20 min", icon: PenTool,   href: "/app/writing/task1"              },
    { skill: "reading",    label: "Reading Practice",               time: "30 min", icon: BookOpen,  href: "/app/reading/practice"           },
    { skill: "vocabulary", label: "Vocabulary Drill — 30 words",    time: "15 min", icon: BookA,     href: "/app/vocabulary"                 },
  ],
];

const TARGET_OPTIONS = [5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 8.5];

const ROADMAP = [
  { level: "Foundation",       band: "4.0–5.0", cefr: "B1", desc: "Core grammar, basic vocab, simple responses." },
  { level: "Elementary",       band: "5.0–6.0", cefr: "B2", desc: "Structured answers, improved fluency, task awareness." },
  { level: "Intermediate",     band: "6.0–7.0", cefr: "B2+", desc: "Complex structures, coherent essays, extended speaking." },
  { level: "Upper-Intermediate", band: "7.0–8.0", cefr: "C1", desc: "Advanced lexical resource, nuanced arguments." },
  { level: "Advanced",         band: "8.0–9.0", cefr: "C2", desc: "Native-like fluency, sophisticated vocabulary." },
];

function bandToRoadmapIndex(band: number): number {
  if (band < 5.0) return 0;
  if (band < 6.0) return 1;
  if (band < 7.0) return 2;
  if (band < 8.0) return 3;
  return 4;
}

function weeksToTarget(current: number, target: number): number {
  if (current >= target) return 0;
  const gap = target - current;
  return Math.ceil(gap / 0.25) * 3; // ~3 weeks per 0.25 band improvement
}

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function StudyPlan() {
  const { user } = useAuth();
  const [targetBand, setTargetBand] = useState<number>(7.0);
  const [currentBands, setCurrentBands] = useState<SkillBand>({ speaking: 0, writing: 0, reading: 0, listening: 0 });
  const [overallBand, setOverallBand] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [activeDays, setActiveDays] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [savingTarget, setSavingTarget] = useState(false);
  const [checkedTasks, setCheckedTasks] = useState<Set<number>>(new Set());

  const todayDayIndex = new Date().getDay();
  const todayTasks = DAILY_SCHEDULE[todayDayIndex];

  const toggleTask = (i: number) => setCheckedTasks((prev) => {
    const next = new Set(prev);
    next.has(i) ? next.delete(i) : next.add(i);
    return next;
  });

  const saveTarget = useCallback(async (band: number) => {
    if (!user) return;
    setSavingTarget(true);
    try {
      await setDoc(doc(db, "users", user.uid), { targetBand: band }, { merge: true });
    } finally { setSavingTarget(false); }
  }, [user]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        // Load user profile for targetBand
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          if (data.targetBand) setTargetBand(data.targetBand as number);
        }

        // Load sessions
        const snap = await getDocs(
          query(collection(db, "users", user.uid, "sessions"), orderBy("createdAt", "desc"), limit(200))
        );

        const byType: Record<string, number[]> = {};
        const days = new Set<string>();

        snap.forEach((d) => {
          const data = d.data();
          const t = data.type as string;
          const band = (data.evaluation as Record<string, number>)?.overallBand;
          if (t && band) { byType[t] = byType[t] || []; byType[t].push(band); }
          const ts = data.createdAt;
          if (ts?.seconds) {
            const date = new Date(ts.seconds * 1000);
            days.add(`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`);
          }
        });

        setActiveDays(days);

        // Compute streak
        let s = 0;
        const today = new Date(); today.setHours(0, 0, 0, 0);
        for (let i = 0; i < 365; i++) {
          const d = new Date(today); d.setDate(today.getDate() - i);
          const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
          if (days.has(key)) { s++; } else if (i > 0) break;
        }
        setStreak(s);

        // Current bands
        const bands: SkillBand = { speaking: 0, writing: 0, reading: 0, listening: 0 };
        let total = 0, count = 0;
        for (const [k, v] of Object.entries(byType)) {
          if (k in bands) {
            (bands as Record<string, number>)[k] = v.reduce((a: number, b: number) => a + b, 0) / v.length;
            total += (bands as Record<string, number>)[k];
            count++;
          }
        }
        setCurrentBands(bands);
        setOverallBand(count ? total / count : 0);
      } finally { setLoading(false); }
    })();
  }, [user]);

  const currentRoadmapIdx = bandToRoadmapIndex(overallBand);
  const targetRoadmapIdx  = bandToRoadmapIndex(targetBand);
  const weeks = weeksToTarget(overallBand, targetBand);

  // 28-day calendar
  const calendarDays: { date: Date; key: string; active: boolean }[] = [];
  for (let i = 27; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i); d.setHours(0, 0, 0, 0);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    calendarDays.push({ date: d, key, active: activeDays.has(key) });
  }
  const activeLast28 = calendarDays.filter((d) => d.active).length;

  const todayKey = (() => {
    const d = new Date(); d.setHours(0, 0, 0, 0);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  })();

  const tasksDone = checkedTasks.size;
  const tasksTotal = todayTasks.length;

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#fafafa", minHeight: "100vh" }}>
      <style>{`
        * { -webkit-font-smoothing: antialiased; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes flame { 0%,100%{transform:scaleY(1) scaleX(1)} 50%{transform:scaleY(1.08) scaleX(0.96)} }
        .sp-target:hover { border-color: #0a0a0a !important; }
        .sp-task:hover { background: #f5f5f5 !important; }
        .sp-roadmap:hover { background: #f5f5f5 !important; }
        .sp-link:hover { opacity: 0.8; }
      `}</style>

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <div style={{ background: "#0a0a0a", padding: "44px 40px 40px", marginBottom: 28 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 40, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#555", marginBottom: 14 }}>Study Plan</div>
            <h1 style={{ fontSize: 42, fontWeight: 300, letterSpacing: "-0.05em", color: "#fff", margin: "0 0 12px", lineHeight: 1.1 }}>
              Your path to{" "}
              <em style={{ fontFamily: "'DM Serif Display', serif", fontStyle: "italic" }}>Band {targetBand.toFixed(1)}</em>
            </h1>
            <p style={{ fontSize: 14, color: "#555", lineHeight: 1.75, maxWidth: 400, margin: "0 0 24px" }}>
              Structured daily tasks, progress milestones, and skill-by-skill tracking toward your target score.
            </p>
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              {[
                { label: "Current Band", value: overallBand ? overallBand.toFixed(1) : "—" },
                { label: "Target Band", value: targetBand.toFixed(1) },
                { label: "Est. Timeline", value: weeks ? `${weeks} wks` : "—" },
                { label: "Streak", value: `${streak}d` },
              ].map((s) => (
                <div key={s.label}>
                  <div style={{ fontSize: 26, fontWeight: 300, letterSpacing: "-0.05em", color: "#fff", lineHeight: 1 }}>{loading ? "…" : s.value}</div>
                  <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#555", marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Target Band Picker */}
          <div style={{ background: "#141414", border: "1px solid #1e1e1e", borderRadius: 20, padding: "22px 24px", minWidth: 260 }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#555", marginBottom: 14, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              Target Band
              {savingTarget && <Loader2 size={12} color="#555" style={{ animation: "spin 0.8s linear infinite" }} />}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {TARGET_OPTIONS.map((b) => (
                <button
                  key={b}
                  className="sp-target"
                  onClick={() => { setTargetBand(b); saveTarget(b); }}
                  style={{
                    width: 52, height: 52, borderRadius: "50%", border: `2px solid ${targetBand === b ? "#fff" : "#2a2a2a"}`,
                    background: targetBand === b ? "#fff" : "transparent",
                    color: targetBand === b ? "#0a0a0a" : "#555",
                    fontSize: 13, fontWeight: 600, cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    transition: "all 0.15s",
                  }}
                >
                  {b.toFixed(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px 64px" }}>

        {/* ── Top row: Streak + Today's Tasks ─────────────────────────────────── */}
        <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 14, marginBottom: 14 }}>

          {/* Streak Card */}
          <div style={{ background: "#0a0a0a", borderRadius: 24, padding: "26px 28px", border: "1px solid #1e1e1e" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div style={{ animation: "flame 1.8s ease-in-out infinite" }}>
                <Flame size={22} color="#f97316" fill="#f97316" />
              </div>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#555" }}>Study Streak</div>
            </div>
            <div style={{ fontSize: 72, fontWeight: 300, letterSpacing: "-0.06em", color: "#fff", lineHeight: 1, marginBottom: 6 }}>
              {loading ? "…" : streak}
            </div>
            <div style={{ fontSize: 13, color: "#555", marginBottom: 20 }}>
              {streak === 0 ? "Start today to build your streak" : streak === 1 ? "day in a row — keep going!" : `days in a row — keep it up!`}
            </div>

            {/* Mini calendar — last 28 days */}
            <div>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#444", marginBottom: 10 }}>Last 28 days</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
                {DAY_NAMES.map((d) => (
                  <div key={d} style={{ textAlign: "center", fontSize: 9, fontWeight: 600, color: "#333", letterSpacing: "0.06em", marginBottom: 2 }}>{d}</div>
                ))}
                {/* Pad first row based on day of week of 28 days ago */}
                {(() => {
                  const firstDay = calendarDays[0]?.date.getDay() || 0;
                  const rows: JSX.Element[] = [];
                  for (let i = 0; i < firstDay; i++) {
                    rows.push(<div key={`pad-${i}`} />);
                  }
                  calendarDays.forEach((cd) => {
                    const isToday = cd.key === todayKey;
                    rows.push(
                      <div
                        key={cd.key}
                        title={cd.key}
                        style={{
                          aspectRatio: "1",
                          borderRadius: 5,
                          background: cd.active ? "#16a34a" : "#1a1a1a",
                          border: isToday ? "2px solid #fff" : "1px solid transparent",
                          opacity: cd.active ? 1 : 0.5,
                        }}
                      />
                    );
                  });
                  return rows;
                })()}
              </div>
              <div style={{ marginTop: 10, fontSize: 11, color: "#444" }}>{activeLast28} active days of 28</div>
            </div>
          </div>

          {/* Today's Tasks */}
          <div style={{ background: "#fff", borderRadius: 24, padding: "26px 28px", border: "1px solid #e8e8e8" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#bbb", marginBottom: 6 }}>
                  Today · {DAY_NAMES[todayDayIndex]}
                </div>
                <div style={{ fontSize: 18, fontWeight: 500, color: "#0a0a0a" }}>Today's Study Tasks</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                <div style={{ fontSize: 28, fontWeight: 300, letterSpacing: "-0.05em", color: "#0a0a0a" }}>{tasksDone}/{tasksTotal}</div>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#bbb" }}>done</div>
              </div>
            </div>

            {/* Progress bar */}
            <div style={{ height: 3, background: "#f0f0f0", borderRadius: 2, marginBottom: 22, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${(tasksDone / tasksTotal) * 100}%`, background: "#0a0a0a", borderRadius: 2, transition: "width 0.4s ease" }} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {todayTasks.map((task, i) => (
                <div
                  key={i}
                  className="sp-task"
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", borderRadius: 16, border: "1px solid #e8e8e8", background: checkedTasks.has(i) ? "#fafafa" : "#fff", transition: "background 0.15s", cursor: "pointer" }}
                  onClick={() => toggleTask(i)}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleTask(i); }}
                      style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", color: checkedTasks.has(i) ? "#16a34a" : "#ddd" }}
                    >
                      {checkedTasks.has(i) ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                    </button>
                    <task.icon size={14} color={checkedTasks.has(i) ? "#bbb" : "#555"} />
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 500, color: checkedTasks.has(i) ? "#bbb" : "#0a0a0a", textDecoration: checkedTasks.has(i) ? "line-through" : "none" }}>{task.label}</div>
                      <div style={{ fontSize: 11, color: "#bbb", marginTop: 2 }}>{task.time}</div>
                    </div>
                  </div>
                  <Link
                    to={task.href}
                    onClick={(e) => e.stopPropagation()}
                    className="sp-link"
                    style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 100, background: "#0a0a0a", color: "#fff", textDecoration: "none", fontSize: 12, fontWeight: 600, transition: "opacity 0.2s", flexShrink: 0 }}
                  >
                    Start <ChevronRight size={12} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Learning Roadmap ─────────────────────────────────────────────────── */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#bbb", marginBottom: 14 }}>Learning Roadmap</div>
          <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 24, padding: "26px 28px", overflowX: "auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 0, minWidth: 600 }}>
              {ROADMAP.map((stage, i) => {
                const isCompleted = i < currentRoadmapIdx;
                const isCurrent   = i === currentRoadmapIdx;
                const isTarget    = i === targetRoadmapIdx;
                return (
                  <div key={stage.level} style={{ display: "flex", alignItems: "center", flex: 1 }}>
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
                      {/* Node */}
                      <div style={{ position: "relative" }}>
                        {isTarget && !isCurrent && (
                          <div style={{ position: "absolute", top: -22, left: "50%", transform: "translateX(-50%)", fontSize: 9, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", whiteSpace: "nowrap", background: "#0a0a0a", color: "#fff", padding: "2px 8px", borderRadius: 100 }}>
                            Target
                          </div>
                        )}
                        <div style={{
                          width: 44, height: 44, borderRadius: "50%",
                          background: isCompleted ? "#0a0a0a" : isCurrent ? "#0a0a0a" : "#f5f5f5",
                          border: `2px solid ${isCompleted || isCurrent ? "#0a0a0a" : isTarget ? "#0a0a0a" : "#e8e8e8"}`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          position: "relative", zIndex: 1,
                          boxShadow: isCurrent ? "0 0 0 4px rgba(10,10,10,0.08)" : "none",
                        }}>
                          {isCompleted ? <CheckCircle2 size={18} color="#fff" /> : isCurrent ? <Zap size={16} color="#fff" /> : <span style={{ fontSize: 12, fontWeight: 600, color: isTarget ? "#0a0a0a" : "#bbb" }}>{i + 1}</span>}
                        </div>
                      </div>
                      {/* Label */}
                      <div style={{ textAlign: "center", marginTop: 12, padding: "0 6px" }}>
                        <div style={{ fontSize: 12, fontWeight: 600, color: isCompleted || isCurrent ? "#0a0a0a" : "#bbb", marginBottom: 3 }}>{stage.level}</div>
                        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", color: "#bbb", marginBottom: 4 }}>{stage.band}</div>
                        <div style={{ fontSize: 11, color: "#999", lineHeight: 1.5, maxWidth: 110 }}>{stage.desc}</div>
                      </div>
                    </div>
                    {/* Connector */}
                    {i < ROADMAP.length - 1 && (
                      <div style={{ width: 40, height: 2, background: i < currentRoadmapIdx ? "#0a0a0a" : "#e8e8e8", borderRadius: 1, flexShrink: 0, marginBottom: 64 }} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Skill Progress ────────────────────────────────────────────────────── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 14 }}>
          {SKILL_META.map((sk) => {
            const current = (currentBands as Record<string, number>)[sk.key] || 0;
            const gap = Math.max(0, targetBand - current);
            const pct = current > 0 ? Math.min(100, Math.round((current / targetBand) * 100)) : 0;
            return (
              <div key={sk.key} style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 20, padding: "20px 22px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: "#fafafa", border: "1px solid #e8e8e8", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <sk.icon size={15} color="#555" />
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 24, fontWeight: 300, letterSpacing: "-0.04em", color: "#0a0a0a", lineHeight: 1 }}>
                      {loading ? "…" : current ? current.toFixed(1) : "—"}
                    </div>
                    <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#bbb" }}>Current</div>
                  </div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 500, color: "#0a0a0a", marginBottom: 12 }}>{sk.label}</div>
                {/* Band gap indicator */}
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#bbb", marginBottom: 6 }}>
                  <span>{current ? current.toFixed(1) : "0.0"}</span>
                  <span>Target {targetBand.toFixed(1)}</span>
                </div>
                <div style={{ height: 5, background: "#f0f0f0", borderRadius: 3, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${pct}%`, background: pct >= 100 ? "#16a34a" : "#0a0a0a", borderRadius: 3, transition: "width 0.8s ease" }} />
                </div>
                {gap > 0 && (
                  <div style={{ marginTop: 8, fontSize: 11, color: "#999" }}>+{gap.toFixed(1)} band to target</div>
                )}
                {gap <= 0 && current > 0 && (
                  <div style={{ marginTop: 8, fontSize: 11, color: "#16a34a", fontWeight: 600 }}>Target reached!</div>
                )}
                <Link to={sk.href} style={{ display: "inline-flex", alignItems: "center", gap: 5, marginTop: 12, fontSize: 12, fontWeight: 600, color: "#0a0a0a", textDecoration: "none" }}>
                  Practice <ArrowUpRight size={11} />
                </Link>
              </div>
            );
          })}
        </div>

        {/* ── Weekly Schedule ─────────────────────────────────────────────────── */}
        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#bbb", marginBottom: 14 }}>Weekly Schedule</div>
        <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 24, padding: "26px 28px", overflowX: "auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 10, minWidth: 700 }}>
            {DAY_NAMES.map((day, di) => {
              const isToday = di === todayDayIndex;
              return (
                <div key={day} style={{ border: `1px solid ${isToday ? "#0a0a0a" : "#e8e8e8"}`, borderRadius: 16, overflow: "hidden" }}>
                  {/* Day header */}
                  <div style={{ padding: "10px 12px", background: isToday ? "#0a0a0a" : "#fafafa", textAlign: "center" }}>
                    <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: isToday ? "#fff" : "#bbb" }}>{day}</div>
                    {isToday && <div style={{ fontSize: 9, color: "#555", marginTop: 2 }}>Today</div>}
                  </div>
                  {/* Tasks */}
                  <div style={{ padding: "10px 12px", display: "flex", flexDirection: "column", gap: 7 }}>
                    {DAILY_SCHEDULE[di].map((task, ti) => (
                      <div key={ti} style={{ display: "flex", alignItems: "flex-start", gap: 6 }}>
                        <task.icon size={10} color="#bbb" style={{ marginTop: 2, flexShrink: 0 }} />
                        <div style={{ fontSize: 11, color: "#555", lineHeight: 1.4 }}>
                          {task.skill === "vocabulary" ? "Vocab drill" : task.label.split("—")[1]?.trim() || task.label}
                          <div style={{ fontSize: 10, color: "#bbb" }}>{task.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Tips section ────────────────────────────────────────────────────── */}
        <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {[
            { icon: Target, title: "Set Your Target", tip: "Choose a realistic band target 0.5–1.0 above your current score. Clear goals accelerate progress." },
            { icon: Flame, title: "Build a Streak", tip: "15–30 minutes of focused practice daily beats 3-hour weekend sessions. Consistency is the top predictor of band improvement." },
            { icon: TrendingUp, title: "Review Analytics", tip: "Check your Analytics page weekly to spot trends and double down on the skill moving slowest." },
          ].map((t) => (
            <div key={t.title} style={{ background: "#0a0a0a", border: "1px solid #1e1e1e", borderRadius: 20, padding: "22px 24px" }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "#141414", border: "1px solid #1e1e1e", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                <t.icon size={15} color="#555" />
              </div>
              <div style={{ fontSize: 14, fontWeight: 500, color: "#fff", marginBottom: 8 }}>{t.title}</div>
              <div style={{ fontSize: 12, color: "#555", lineHeight: 1.7 }}>{t.tip}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
