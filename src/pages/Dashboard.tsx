import { Link } from "react-router-dom";
import {
  Mic,
  PenTool,
  BookOpen,
  Headphones,
  ArrowUpRight,
  Target,
  TrendingUp,
  ArrowRight,
  Loader2,
  Clock3,
  CheckCircle2,
  BarChart2,
  Flame,
  ChevronRight,
  BookA,
  Map,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useState, useEffect, useMemo } from "react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";

const skillMeta = [
  { name: "Speaking",  type: "speaking",  icon: Mic,        href: "/app/speaking"  },
  { name: "Writing",   type: "writing",   icon: PenTool,    href: "/app/writing"   },
  { name: "Reading",   type: "reading",   icon: BookOpen,   href: "/app/reading"   },
  { name: "Listening", type: "listening", icon: Headphones, href: "/app/listening" },
];

export function Dashboard() {
  const { user } = useAuth();
  const [scores, setScores]       = useState<Record<string, number>>({});
  const [sessionCount, setSessionCount] = useState(0);
  const [overallBand, setOverallBand] = useState(0);
  const [streak, setStreak]       = useState(0);
  const [loading, setLoading]     = useState(true);
  const shouldReduceMotion = useReducedMotion();

  const todayDayIndex = new Date().getDay();
  const DAY_NAMES = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  // compact today's tasks for the dashboard strip
  const DASH_TASKS: { label: string; time: string; icon: any; href: string }[][] = [
    [ // Sun
      { label: "Speaking P3",    time: "15 min", icon: Mic,       href: "/app/speaking/practice?part=3" },
      { label: "Writing Task 2",  time: "40 min", icon: PenTool,   href: "/app/writing/task2"            },
      { label: "Vocabulary Drill",time: "10 min", icon: BookA,     href: "/app/vocabulary"               },
    ],
    [ // Mon
      { label: "Speaking P1",    time: "10 min", icon: Mic,       href: "/app/speaking/practice?part=1" },
      { label: "Reading Practice",time: "30 min", icon: BookOpen,  href: "/app/reading/practice"         },
      { label: "Vocabulary Drill",time: "10 min", icon: BookA,     href: "/app/vocabulary"               },
    ],
    [ // Tue
      { label: "Writing Task 1",  time: "20 min", icon: PenTool,   href: "/app/writing/task1"            },
      { label: "Reading Practice",time: "30 min", icon: BookOpen,  href: "/app/reading/practice"         },
      { label: "Vocabulary Drill",time: "10 min", icon: BookA,     href: "/app/vocabulary"               },
    ],
    [ // Wed
      { label: "Speaking P2",    time: "15 min", icon: Mic,       href: "/app/speaking/practice?part=2" },
      { label: "Listening",       time: "10 min", icon: Headphones,href: "/app/listening"                },
      { label: "Vocabulary Drill",time: "10 min", icon: BookA,     href: "/app/vocabulary"               },
    ],
    [ // Thu
      { label: "Writing Task 2",  time: "40 min", icon: PenTool,   href: "/app/writing/task2"            },
      { label: "Reading Practice",time: "30 min", icon: BookOpen,  href: "/app/reading/practice"         },
      { label: "Vocabulary Drill",time: "10 min", icon: BookA,     href: "/app/vocabulary"               },
    ],
    [ // Fri
      { label: "Speaking P3",    time: "15 min", icon: Mic,       href: "/app/speaking/practice?part=3" },
      { label: "Listening",       time: "10 min", icon: Headphones,href: "/app/listening"                },
      { label: "Vocabulary Drill",time: "10 min", icon: BookA,     href: "/app/vocabulary"               },
    ],
    [ // Sat
      { label: "Writing Task 1",  time: "20 min", icon: PenTool,   href: "/app/writing/task1"            },
      { label: "Reading Practice",time: "30 min", icon: BookOpen,  href: "/app/reading/practice"         },
      { label: "Vocabulary Drill",time: "15 min", icon: BookA,     href: "/app/vocabulary"               },
    ],
  ];
  const todayTasks = DASH_TASKS[todayDayIndex];

  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        const snap = await getDocs(
          query(collection(db, "users", user.uid, "sessions"), orderBy("createdAt", "desc"), limit(200))
        );
        setSessionCount(snap.size);
        const byType: Record<string, number[]> = {};
        const days = new Set<string>();
        snap.forEach((d) => {
          const data = d.data();
          const t    = data.type as string;
          const band = (data.evaluation as Record<string, number>)?.overallBand;
          if (t && band) { byType[t] = byType[t] || []; byType[t].push(band); }
          const ts = data.createdAt;
          if (ts?.seconds) {
            const dt = new Date(ts.seconds * 1000);
            days.add(`${dt.getFullYear()}-${String(dt.getMonth()+1).padStart(2,"0")}-${String(dt.getDate()).padStart(2,"0")}`);
          }
        });
        // compute streak
        let s = 0;
        const todayStart = new Date(); todayStart.setHours(0,0,0,0);
        for (let i = 0; i < 365; i++) {
          const d = new Date(todayStart); d.setDate(todayStart.getDate() - i);
          const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
          if (days.has(key)) { s++; } else if (i > 0) break;
        }
        setStreak(s);
        const avg: Record<string, number> = {};
        let total = 0, count = 0;
        for (const [k, v] of Object.entries(byType)) {
          avg[k] = v.reduce((a, b) => a + b, 0) / v.length;
          total += avg[k]; count++;
        }
        setScores(avg);
        setOverallBand(count ? total / count : 0);
      } finally { setLoading(false); }
    })();
  }, [user]);

  const skills = skillMeta.map((s) => ({ ...s, score: scores[s.type] ?? null }));

  const displayName = useMemo(() => {
    const src = user?.displayName || user?.email?.split("@")[0] || "there";
    return src.split(" ").map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(" ");
  }, [user]);

  const rankedSkills   = useMemo(() => [...skills].filter(s => s.score !== null).sort((a, b) => (b.score ?? 0) - (a.score ?? 0)), [skills]);
  const strongestSkill = rankedSkills[0];
  const focusSkill     = rankedSkills[rankedSkills.length - 1];
  const completedSkills = skills.filter(s => s.score !== null).length;
  const weeklyProgress  = Math.min(100, Math.round((completedSkills / 4) * 100));
  const targetBand      = overallBand ? Math.min(9, Math.max(6.5, Math.ceil(overallBand * 2) / 2 + 0.5)) : 7.5;
  const recommendedHref  = focusSkill?.href  || "/app/speaking";
  const recommendedLabel = focusSkill?.name  || "Speaking";
  const strongestLabel   = strongestSkill?.name || "Writing";
  const targetGap        = overallBand ? Math.max(0, +(targetBand - overallBand).toFixed(1)) : targetBand;
  const consistencyLabel = completedSkills >= 3 ? "Strong routine" : completedSkills >= 2 ? "Building rhythm" : "Needs more activity";

  const signals = useMemo(() => [
    overallBand
      ? `Current average is ${overallBand.toFixed(1)} — a stable view of your present band level.`
      : "Complete a few scored sessions to unlock an overall band signal.",
    strongestSkill?.score != null
      ? `${strongestLabel} is leading at ${strongestSkill.score.toFixed(1)}.`
      : `${strongestLabel} needs more sessions to appear here.`,
    focusSkill?.score != null
      ? `${recommendedLabel} has the biggest upside — focused work there moves the dashboard fastest.`
      : `Start with ${recommendedLabel.toLowerCase()} to create your next performance signal.`,
  ], [overallBand, strongestSkill, strongestLabel, focusSkill, recommendedLabel]);

  const actionItems = useMemo(() => [
    {
      title: `Resume ${recommendedLabel}`,
      text: focusSkill?.score != null
        ? `This is your lowest active skill, so it should create the fastest improvement.`
        : `Start here to create a stronger performance signal in the dashboard.`,
      href: recommendedHref,
    },
    {
      title: "Review analytics",
      text: "Open the wider trend view when you want more detail behind the current score pattern.",
      href: "/app/analytics",
    },
    {
      title: "Quick vocabulary drill",
      text: "Use a short session when you want momentum without starting a full practice block.",
      href: "/app/vocabulary",
    },
  ], [recommendedLabel, focusSkill, recommendedHref]);

  const strokeOffset = overallBand ? 289 - (overallBand / 9) * 289 : 289;
  const reveal = (delay = 0, y = 22) =>
    shouldReduceMotion
      ? { initial: false, animate: { opacity: 1, y: 0 }, transition: { duration: 0 } }
      : {
          initial: { opacity: 0, y },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.72, delay, ease: [0.16, 1, 0.3, 1] },
        };

  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", display: "flex", flexDirection: "column", gap: 20 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=DM+Serif+Display:ital@1&display=swap');
        * { -webkit-font-smoothing: antialiased; }
        .skill-card { transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease; }
        .skill-card:hover { transform: translateY(-3px); box-shadow: 0 16px 40px rgba(0,0,0,0.07); }
        .pill-btn { transition: opacity 0.2s; }
        .pill-btn:hover { opacity: 0.8; }
        .ghost-btn { transition: background 0.2s; }
        .ghost-btn:hover { background: #f0f0f0 !important; }
        .row-signal { transition: background 0.2s; }
        .row-signal:hover { background: #f7f7f7 !important; }
        .dashboard-hero,
        .dashboard-bottom,
        .dashboard-actions,
        .dashboard-skills,
        .dashboard-focus-grid,
        .dashboard-metrics { width: 100%; }
        .dashboard-hero { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 56px; align-items: center; }
        .dashboard-actions { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; }
        .dashboard-skills { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; }
        .dashboard-bottom { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 14px; }
        .dashboard-focus-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
        .dashboard-metrics { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 18px; }
        .cta-row { display: flex; gap: 10px; flex-wrap: wrap; }
        .ambient-glow {
          position: absolute;
          border-radius: 999px;
          filter: blur(40px);
          pointer-events: none;
          opacity: 0.6;
        }
        .hero-sheen {
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.65) 35%, transparent 70%);
          opacity: 0.45;
          pointer-events: none;
        }
        @media (max-width: 1180px) {
          .dashboard-hero,
          .dashboard-bottom { grid-template-columns: 1fr; gap: 20px; }
          .dashboard-skills { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (max-width: 860px) {
          .dashboard-actions,
          .dashboard-focus-grid,
          .dashboard-metrics { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 640px) {
          .dashboard-hero { gap: 24px; }
          .dashboard-actions,
          .dashboard-skills,
          .dashboard-focus-grid,
          .dashboard-metrics { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* ── HERO ── */}
      <motion.section
        {...reveal(0.02, 18)}
        style={{
        background: "#fff",
        border: "1px solid #e8e8e8",
        borderRadius: 24,
        padding: "40px 44px",
        boxShadow: "0 2px 20px rgba(0,0,0,0.04)",
        position: "relative",
        overflow: "hidden",
      }}>
        <motion.div
          className="ambient-glow"
          style={{ width: 240, height: 240, background: "rgba(15,15,15,0.06)", top: -60, right: -40 }}
          animate={shouldReduceMotion ? undefined : { y: [0, -14, 0], x: [0, -10, 0], scale: [1, 1.06, 1] }}
          transition={shouldReduceMotion ? undefined : { duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="ambient-glow"
          style={{ width: 180, height: 180, background: "rgba(120,120,120,0.08)", bottom: -40, left: 60 }}
          animate={shouldReduceMotion ? undefined : { y: [0, 10, 0], x: [0, 12, 0], scale: [1, 1.04, 1] }}
          transition={shouldReduceMotion ? undefined : { duration: 10, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        />
        <motion.div
          className="hero-sheen"
          animate={shouldReduceMotion ? undefined : { x: ["-120%", "140%"] }}
          transition={shouldReduceMotion ? undefined : { duration: 5.5, repeat: Infinity, repeatDelay: 3.5, ease: "easeInOut" }}
        />
        <div className="dashboard-hero">
        <motion.div {...reveal(0.08, 20)} style={{ minWidth: 0, position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#999", marginBottom: 14 }}>
            Welcome back, {displayName}
          </div>
          <h1 style={{ fontSize: "clamp(28px, 2.5vw, 40px)", fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 1.15, margin: "0 0 16px", color: "#0a0a0a" }}>
            Your preparation has a{" "}
            <em style={{ fontFamily: "'DM Serif Display', serif", fontStyle: "italic", fontWeight: 400 }}>clearer shape</em>{" "}
            today.
          </h1>
          <p style={{ fontSize: 14, lineHeight: 1.75, color: "#777", marginBottom: 28, maxWidth: 400 }}>
            Track band performance, see where momentum is building, and move directly into the practice that matters most.
          </p>

          <motion.div className="cta-row" style={{ marginBottom: 32 }} {...reveal(0.16, 14)}>
            <motion.div whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.01 }} whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}>
            <Link to={recommendedHref} className="pill-btn" style={{
              display: "inline-flex", alignItems: "center", gap: 7,
              background: "#0a0a0a", color: "#fff",
              padding: "11px 22px", borderRadius: 100,
              fontSize: 13, fontWeight: 600, textDecoration: "none",
            }}>
              Continue {recommendedLabel} <ArrowRight size={13} />
            </Link>
            </motion.div>
            <motion.div whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.01 }} whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}>
            <Link to="/app/analytics" className="ghost-btn" style={{
              display: "inline-flex", alignItems: "center", gap: 7,
              background: "#f5f5f5", color: "#0a0a0a",
              padding: "11px 22px", borderRadius: 100,
              fontSize: 13, fontWeight: 600, textDecoration: "none",
            }}>
              Analytics <ArrowUpRight size={13} />
            </Link>
            </motion.div>
          </motion.div>

          <div className="dashboard-metrics">
            {[
              { value: overallBand ? overallBand.toFixed(1) : "—", label: "Overall band" },
              { value: `${sessionCount}`,                           label: "Sessions analyzed" },
              { value: strongestLabel,                              label: "Strongest area" },
              { value: `${weeklyProgress}%`,                        label: "Weekly progress" },
            ].map(({ value, label }, index) => (
              <motion.div
                key={label}
                {...reveal(0.22 + index * 0.05, 16)}
                whileHover={shouldReduceMotion ? undefined : { y: -3 }}
                style={{ minWidth: 0 }}
              >
                <div style={{ fontSize: 26, fontWeight: 300, letterSpacing: "-0.05em", color: "#0a0a0a", lineHeight: 1 }}>{value}</div>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#999", marginTop: 5 }}>{label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* BAND CARD */}
        <motion.div
          {...reveal(0.12, 24)}
          whileHover={shouldReduceMotion ? undefined : { y: -4, rotateX: 1.2, rotateY: -1.2 }}
          style={{ background: "#0a0a0a", borderRadius: 20, padding: "28px 28px 24px", color: "#fff", minWidth: 0, position: "relative", transformStyle: "preserve-3d" }}
        >
          <motion.div
            className="ambient-glow"
            style={{ width: 150, height: 150, background: "rgba(255,255,255,0.08)", top: -30, right: -20, filter: "blur(54px)", opacity: 0.45 }}
            animate={shouldReduceMotion ? undefined : { scale: [1, 1.08, 1], opacity: [0.35, 0.5, 0.35] }}
            transition={shouldReduceMotion ? undefined : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#555", marginBottom: 8 }}>
                Projected band
              </div>
              <motion.div
                style={{ fontSize: 52, fontWeight: 300, letterSpacing: "-0.07em", lineHeight: 1 }}
                animate={shouldReduceMotion ? undefined : { opacity: [0.88, 1, 0.92, 1] }}
                transition={shouldReduceMotion ? undefined : { duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              >
                {loading ? <Loader2 size={28} style={{ animation: "spin 1s linear infinite", opacity: 0.4 }} /> : overallBand ? overallBand.toFixed(1) : "—"}
              </motion.div>
            </div>
            <motion.div
              style={{ width: 36, height: 36, borderRadius: 10, background: "#1a1a1a", display: "flex", alignItems: "center", justifyContent: "center" }}
              animate={shouldReduceMotion ? undefined : { rotate: [0, 6, 0, -6, 0] }}
              transition={shouldReduceMotion ? undefined : { duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              <BarChart2 size={15} color="#888" />
            </motion.div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 24 }}>
            {/* Donut */}
            <div style={{ position: "relative", width: 88, height: 88, flexShrink: 0 }}>
              <svg width="88" height="88" viewBox="0 0 100 100" style={{ transform: "rotate(-90deg)" }}>
                <circle cx="50" cy="50" r="46" fill="none" stroke="#1e1e1e" strokeWidth="8" />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="46"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="8"
                  strokeDasharray="289"
                  initial={shouldReduceMotion ? false : { strokeDashoffset: 289 }}
                  animate={{ strokeDashoffset: strokeOffset }}
                  transition={{ duration: shouldReduceMotion ? 0 : 1.25, delay: shouldReduceMotion ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] }}
                  strokeLinecap="round"
                />
              </svg>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <div style={{ fontSize: 20, fontWeight: 300, letterSpacing: "-0.05em" }}>{targetBand.toFixed(1)}</div>
                <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#555" }}>Target</div>
              </div>
            </div>

            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                ["Focus", recommendedLabel],
                ["Strongest", strongestLabel],
              ].map(([label, value], index) => (
                <motion.div
                  key={label}
                  initial={shouldReduceMotion ? false : { opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.55, delay: shouldReduceMotion ? 0 : 0.22 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  style={{ background: "#141414", borderRadius: 12, padding: "10px 14px", border: "1px solid #1e1e1e" }}
                >
                  <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#444" }}>{label}</div>
                  <div style={{ fontSize: 14, fontWeight: 500, marginTop: 4 }}>{value}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Progress bar */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#555" }}>Weekly target</span>
              <span style={{ fontSize: 10, fontWeight: 600, color: "#555" }}>{weeklyProgress}%</span>
            </div>
            <div style={{ height: 3, background: "#1e1e1e", borderRadius: 100, overflow: "hidden" }}>
              <motion.div
                initial={shouldReduceMotion ? false : { scaleX: 0 }}
                animate={{ scaleX: weeklyProgress / 100 }}
                transition={{ duration: shouldReduceMotion ? 0 : 1, delay: shouldReduceMotion ? 0 : 0.25, ease: [0.16, 1, 0.3, 1] }}
                style={{ height: "100%", width: "100%", background: "#fff", borderRadius: 100, transformOrigin: "left center" }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginTop: 14, flexWrap: "wrap" }}>
              <span style={{ fontSize: 12, color: "#8a8a8a", lineHeight: 1.6 }}>
                {targetGap > 0 ? `${targetGap.toFixed(1)} band points away from the current target.` : "You are already aligned with the current target band."}
              </span>
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#707070" }}>
                {consistencyLabel}
              </span>
            </div>
          </div>
        </motion.div>
        </div>
      </motion.section>

      {/* ── TODAY'S FOCUS ── */}
      <motion.div
        {...reveal(0.14, 16)}
        style={{
          background: "#fff",
          border: "1px solid #e8e8e8",
          borderRadius: 24,
          padding: "22px 26px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Flame size={16} color="#f97316" fill="#f97316" />
            <span style={{ fontSize: 14, fontWeight: 500, color: "#0a0a0a" }}>Today's Study Tasks</span>
            <span style={{ padding: "2px 10px", borderRadius: 100, background: "#fafafa", border: "1px solid #e8e8e8", fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "#bbb" }}>
              {DAY_NAMES[todayDayIndex]}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {streak > 0 && (
              <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 100, background: "#fff7ed", border: "1px solid #fed7aa", fontSize: 12, fontWeight: 600, color: "#ea580c" }}>
                <Flame size={12} fill="#ea580c" color="#ea580c" />
                {streak} day{streak !== 1 ? "s" : ""}
              </div>
            )}
            <Link to="/app/study-plan" style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 600, color: "#777", textDecoration: "none" }}>
              Full plan <ChevronRight size={12} />
            </Link>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
          {todayTasks.map((task, i) => (
            <Link
              key={i}
              to={task.href}
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "14px 16px", background: "#fafafa", border: "1px solid #e8e8e8",
                borderRadius: 16, textDecoration: "none", transition: "background 0.15s",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: 9, background: "#fff", border: "1px solid #e8e8e8", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <task.icon size={13} color="#555" />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: "#0a0a0a" }}>{task.label}</div>
                  <div style={{ fontSize: 11, color: "#bbb" }}>{task.time}</div>
                </div>
              </div>
              <ChevronRight size={13} color="#ccc" />
            </Link>
          ))}
        </div>
      </motion.div>

      <div className="dashboard-actions">
        {actionItems.map((item, index) => (
          <motion.div
            key={item.title}
            {...reveal(0.18 + index * 0.07, 18)}
            whileHover={shouldReduceMotion ? undefined : { y: -4, scale: 1.01 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.995 }}
          >
            <Link
              to={item.href}
              style={{
                background: index === 0 ? "#0a0a0a" : "#fff",
                color: index === 0 ? "#fff" : "#0a0a0a",
                border: index === 0 ? "1px solid #0a0a0a" : "1px solid #e8e8e8",
                borderRadius: 20,
                padding: "20px 22px",
                textDecoration: "none",
                boxShadow: index === 0 ? "0 10px 24px rgba(0,0,0,0.08)" : "0 2px 12px rgba(0,0,0,0.03)",
                transition: "box-shadow 0.28s ease, background 0.28s ease",
                display: "flex",
                flexDirection: "column",
                gap: 10,
                minWidth: 0,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: index === 0 ? "#8a8a8a" : "#999" }}>
                  {index === 0 ? "Recommended" : index === 1 ? "Insight" : "Quick win"}
                </div>
                <ArrowUpRight size={14} color={index === 0 ? "#8a8a8a" : "#b3b3b3"} />
              </div>
              <div style={{ fontSize: 18, fontWeight: 500, letterSpacing: "-0.03em", lineHeight: 1.2 }}>{item.title}</div>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: index === 0 ? "#b3b3b3" : "#7a7a7a" }}>{item.text}</p>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* ── FOUR SKILLS ── */}
      <div className="dashboard-skills">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            {...reveal(0.24 + index * 0.06, 18)}
            whileHover={shouldReduceMotion ? undefined : { y: -5 }}
          >
          <Link to={skill.href} className="skill-card" style={{
            background: "#fff",
            border: "1px solid #e8e8e8",
            borderRadius: 20,
            padding: "24px 24px 22px",
            textDecoration: "none",
            color: "inherit",
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ width: 38, height: 38, background: "#f5f5f5", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <skill.icon size={16} color="#444" />
              </div>
              <ArrowUpRight size={14} color="#ccc" />
            </div>

            <div>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#999", marginBottom: 8 }}>{skill.name}</div>
              <div style={{ fontSize: 36, fontWeight: 300, letterSpacing: "-0.06em", color: "#0a0a0a", lineHeight: 1 }}>
                {loading ? <Loader2 size={18} color="#ccc" style={{ animation: "spin 1s linear infinite" }} /> : skill.score !== null ? skill.score.toFixed(1) : "—"}
              </div>
              {skill.score !== null && !loading && (
                <div style={{ display: "inline-flex", alignItems: "center", gap: 4, marginTop: 10, background: "#f0faf4", borderRadius: 100, padding: "4px 10px" }}>
                  <TrendingUp size={10} color="#16a34a" />
                  <span style={{ fontSize: 10, fontWeight: 600, color: "#16a34a", letterSpacing: "0.1em" }}>AVG</span>
                </div>
              )}
              <p style={{ fontSize: 12, color: "#aaa", lineHeight: 1.6, marginTop: 10 }}>
                Open {skill.name.toLowerCase()} practice to build consistent performance.
              </p>
              <div style={{ marginTop: 12, fontSize: 11, color: "#777", lineHeight: 1.6 }}>
                {skill.score !== null ? (
                  skill.name === recommendedLabel
                    ? "Best next improvement opportunity right now."
                    : skill.name === strongestLabel
                      ? "Currently your strongest tracked area."
                      : "Stable supporting skill in your current profile."
                ) : (
                  "No scored activity yet — start here to unlock a benchmark."
                )}
              </div>
            </div>
          </Link>
          </motion.div>
        ))}
      </div>

      {/* ── BOTTOM ROW ── */}
      <div className="dashboard-bottom">

        {/* Focus plan */}
        <motion.div {...reveal(0.3, 22)} style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 20, padding: "32px 32px 28px", boxShadow: "0 2px 12px rgba(0,0,0,0.03)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 28 }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#999", marginBottom: 10 }}>Focus for this week</div>
              <h2 style={{ fontSize: 22, fontWeight: 400, letterSpacing: "-0.03em", color: "#0a0a0a", margin: 0, lineHeight: 1.2 }}>
                A calmer route to your{" "}
                <em style={{ fontFamily: "'DM Serif Display', serif", fontStyle: "italic" }}>next score jump.</em>
              </h2>
            </div>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#999", background: "#f5f5f5", padding: "6px 14px", borderRadius: 100 }}>
              {completedSkills}/4 active
            </div>
          </div>

          <div className="dashboard-focus-grid">
            {[
              { icon: Target,       title: `Prioritize ${recommendedLabel}`, text: `${recommendedLabel} has the most room — biggest gains come from focused work there.` },
              { icon: CheckCircle2, title: `Protect ${strongestLabel}`,       text: `${strongestLabel} is performing well. Keep it warm with short regular sessions.` },
              { icon: Clock3,       title: "Stay consistent",                  text: "Small daily sessions compound faster than occasional long ones." },
            ].map(({ icon: Icon, title, text }, i) => (
              <motion.div
                key={i}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.55, delay: shouldReduceMotion ? 0 : 0.38 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                whileHover={shouldReduceMotion ? undefined : { y: -3 }}
                style={{ background: "#fafafa", border: "1px solid #f0f0f0", borderRadius: 16, padding: "18px 18px 16px" }}
              >
                <div style={{ width: 32, height: 32, background: "#f0f0f0", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                  <Icon size={14} color="#555" />
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#0a0a0a", marginBottom: 8, letterSpacing: "-0.01em" }}>{title}</div>
                <p style={{ fontSize: 12, color: "#888", lineHeight: 1.65, margin: 0 }}>{text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Signals */}
        <motion.div {...reveal(0.36, 22)} style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 20, padding: "32px 32px 28px", boxShadow: "0 2px 12px rgba(0,0,0,0.03)", display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#999", marginBottom: 10 }}>Latest signals</div>
          <h2 style={{ fontSize: 22, fontWeight: 400, letterSpacing: "-0.03em", color: "#0a0a0a", margin: "0 0 24px", lineHeight: 1.2 }}>
            What is <em style={{ fontFamily: "'DM Serif Display', serif", fontStyle: "italic" }}>improving</em> right now.
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
            {signals.map((signal, i) => (
              <motion.div
                key={i}
                initial={shouldReduceMotion ? false : { opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.55, delay: shouldReduceMotion ? 0 : 0.42 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                whileHover={shouldReduceMotion ? undefined : { x: 3 }}
                className="row-signal"
                style={{
                display: "flex", alignItems: "flex-start", gap: 12,
                padding: "12px 14px",
                background: "#fafafa",
                borderRadius: 12,
                border: "1px solid #f0f0f0",
                cursor: "default",
              }}>
                <motion.div
                  style={{ width: 6, height: 6, borderRadius: "50%", background: i === 0 ? "#16a34a" : "#d1d5db", marginTop: 5, flexShrink: 0 }}
                  animate={shouldReduceMotion ? undefined : i === 0 ? { scale: [1, 1.5, 1], opacity: [1, 0.7, 1] } : { opacity: [0.7, 1, 0.7] }}
                  transition={shouldReduceMotion ? undefined : { duration: i === 0 ? 2.2 : 3.2, repeat: Infinity, ease: "easeInOut" }}
                />
                <span style={{ fontSize: 13, color: "#555", lineHeight: 1.6 }}>{signal}</span>
              </motion.div>
            ))}
          </div>

          {/* CTA block */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6, delay: shouldReduceMotion ? 0 : 0.58, ease: [0.16, 1, 0.3, 1] }}
            whileHover={shouldReduceMotion ? undefined : { y: -3 }}
            style={{ background: "#0a0a0a", borderRadius: 16, padding: "22px 22px 20px", color: "#fff", marginTop: "auto", position: "relative", overflow: "hidden" }}
          >
            <motion.div
              style={{ position: "absolute", inset: -80, background: "radial-gradient(circle at top right, rgba(255,255,255,0.14), transparent 32%)", pointerEvents: "none" }}
              animate={shouldReduceMotion ? undefined : { rotate: [0, 8, 0], scale: [1, 1.04, 1] }}
              transition={shouldReduceMotion ? undefined : { duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#555", marginBottom: 8 }}>Recommended next move</div>
            <div style={{ fontSize: 16, fontWeight: 500, marginBottom: 8, letterSpacing: "-0.02em" }}>Open {recommendedLabel} and keep the streak alive.</div>
            <p style={{ fontSize: 12, color: "#666", lineHeight: 1.65, marginBottom: 16 }}>
              The next gain comes from action, not more analysis.
            </p>
            <motion.div whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.01 }} whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }} style={{ display: "inline-flex" }}>
            <Link to={recommendedHref} className="pill-btn" style={{
              display: "inline-flex", alignItems: "center", gap: 7,
              background: "#fff", color: "#0a0a0a",
              padding: "9px 18px", borderRadius: 100,
              fontSize: 12, fontWeight: 600, textDecoration: "none",
            }}>
              Continue now <ArrowRight size={12} />
            </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* ── QUICK VOCAB ── */}
      <motion.div {...reveal(0.46, 20)} whileHover={shouldReduceMotion ? undefined : { y: -4, scale: 1.005 }}>
      <Link to="/app/vocabulary" style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "#0a0a0a", color: "#fff",
        borderRadius: 20, padding: "24px 32px",
        textDecoration: "none",
        transition: "opacity 0.2s",
      }}
        onMouseEnter={e => (e.currentTarget.style.opacity = "0.9")}
        onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 38, height: 38, background: "#1a1a1a", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Clock3 size={15} color="#888" />
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 500, letterSpacing: "-0.02em" }}>Quick vocabulary session</div>
            <div style={{ fontSize: 12, color: "#666", marginTop: 3 }}>A short focused drill is the easiest way to keep momentum moving today.</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, color: "#fff" }}>
          Start now <ArrowRight size={13} />
        </div>
      </Link>
      </motion.div>
    </div>
  );
}