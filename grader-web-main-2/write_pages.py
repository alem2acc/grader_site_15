#!/usr/bin/env python3
"""Rewrites Writing.tsx, WritingResult.tsx, WritingPractice.tsx, Vocabulary.tsx
to the Grader AI design system: DM Sans, inline styles, zero Tailwind.
"""
import os, sys

BASE = os.path.join(os.path.dirname(__file__), "src", "pages")

# ─────────────────────────────────────────────────────────────────────────────
# 1. Writing.tsx
# ─────────────────────────────────────────────────────────────────────────────
WRITING = """\
import { Link } from "react-router-dom";
import { PenTool, Clock, FileText, ArrowUpRight, Sparkles, Loader2, Target } from "lucide-react";
import { useState, useEffect } from "react";
import { collection, query, where, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";

export function Writing() {
  const { user } = useAuth();
  const [essays, setEssays] = useState<Array<Record<string, unknown>>>([]);
  const [avgScore, setAvgScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const processSnap = (docs: any[]) => {
      const data = docs.map((d: any) => ({ id: d.id, ...d.data() }));
      setEssays(data);
      if (data.length) {
        const avg =
          data.reduce((sum: number, s: any) => sum + (s.evaluation?.overallBand || 0), 0) /
          data.length;
        setAvgScore(avg);
      }
      setLoading(false);
    };
    const fetchSessions = async () => {
      try {
        const snap = await getDocs(
          query(
            collection(db, "users", user.uid, "sessions"),
            where("type", "==", "writing"),
            orderBy("createdAt", "desc"),
            limit(5),
          ),
        );
        processSnap(snap.docs);
      } catch (err: any) {
        if (err.message?.includes("index")) {
          try {
            const fb = await getDocs(
              query(collection(db, "users", user.uid, "sessions"), where("type", "==", "writing")),
            );
            const sorted = [...fb.docs].sort(
              (a, b) => (b.data().createdAt?.seconds || 0) - (a.data().createdAt?.seconds || 0),
            );
            processSnap(sorted.slice(0, 5));
          } catch {
            setLoading(false);
          }
        } else {
          setLoading(false);
        }
      }
    };
    fetchSessions();
  }, [user]);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        * { -webkit-font-smoothing: antialiased; }
        .wrt-card { transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s cubic-bezier(0.16,1,0.3,1); }
        .wrt-card:hover { transform: translateY(-3px); box-shadow: 0 18px 48px rgba(0,0,0,0.08); }
        .wrt-btn-dark { transition: opacity 0.2s; }
        .wrt-btn-dark:hover { opacity: 0.82; }
        .wrt-btn-light { transition: background 0.2s; }
        .wrt-btn-light:hover { background: #f0f0f0 !important; }
        .wrt-row { transition: transform 0.25s cubic-bezier(0.16,1,0.3,1), box-shadow 0.25s cubic-bezier(0.16,1,0.3,1); }
        .wrt-row:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(0,0,0,0.07); }
      `}</style>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px 48px" }}>

        {/* ── Hero ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: 56,
            alignItems: "center",
            background: "#0a0a0a",
            borderRadius: 24,
            padding: "48px 56px",
            marginBottom: 20,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#777",
                marginBottom: 16,
              }}
            >
              Writing Hub
            </div>
            <h1
              style={{
                fontSize: 44,
                fontWeight: 300,
                letterSpacing: "-0.04em",
                color: "#fff",
                lineHeight: 1.15,
                margin: "0 0 14px",
              }}
            >
              Perfect your{" "}
              <em style={{ fontFamily: "'DM Serif Display', serif", fontStyle: "italic", fontWeight: 400, color: "#ccc" }}>
                prose
              </em>
            </h1>
            <p style={{ fontSize: 15, color: "#666", lineHeight: 1.7, margin: "0 0 32px", maxWidth: 420 }}>
              Line-by-line grammar checks, vocabulary upgrades, and structural feedback to elevate your writing band score.
            </p>
            <div style={{ display: "flex", gap: 44 }}>
              {[
                { value: "7.5+", label: "Target band" },
                { value: "2",    label: "Task types"  },
                { value: loading ? "—" : avgScore ? avgScore.toFixed(1) : "—", label: "Your avg" },
              ].map((s) => (
                <div key={s.label}>
                  <div style={{ fontSize: 28, fontWeight: 300, letterSpacing: "-0.05em", color: "#fff" }}>{s.value}</div>
                  <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#555", marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: "#141414", borderRadius: 20, padding: 32, border: "1px solid #222" }}>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#555", marginBottom: 20 }}>
              IELTS Writing Tasks
            </div>
            {[
              { num: "T1", title: "Academic Report",  sub: "Charts, graphs, tables, diagrams", time: "20 min", words: "150+" },
              { num: "T2", title: "Persuasive Essay",  sub: "Argue, discuss, give opinions",   time: "40 min", words: "250+" },
            ].map((t, i) => (
              <div
                key={t.num}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: "14px 0",
                  borderBottom: i === 0 ? "1px solid #222" : "none",
                }}
              >
                <div
                  style={{
                    width: 40, height: 40, background: "#1a1a1a", borderRadius: 10,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 12, fontWeight: 600, color: "#888",
                  }}
                >
                  {t.num}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 500, color: "#fff", marginBottom: 2 }}>{t.title}</div>
                  <div style={{ fontSize: 12, color: "#555" }}>{t.sub}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 12, color: "#666" }}>{t.time}</div>
                  <div style={{ fontSize: 11, color: "#444" }}>{t.words}</div>
                </div>
              </div>
            ))}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 20 }}>
              {loading ? (
                <span style={{ fontSize: 13, color: "#555", display: "flex", alignItems: "center", gap: 6 }}>
                  <Loader2 size={13} /> Loading…
                </span>
              ) : (
                <>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: avgScore ? "#16a34a" : "#555" }} />
                  <span style={{ fontSize: 13, color: "#666" }}>
                    {avgScore ? `Avg band: ${avgScore.toFixed(1)}` : "No sessions yet"}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* ── Task Cards ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
          {/* Task 1 – light */}
          <div
            className="wrt-card"
            style={{
              background: "#fff", borderRadius: 20, border: "1px solid #e8e8e8",
              padding: 32, boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
              display: "flex", flexDirection: "column",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
              <div style={{ width: 40, height: 40, background: "#f5f5f5", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600, color: "#444" }}>T1</div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 600, background: "#f5f5f5", color: "#777", borderRadius: 100, padding: "4px 10px", display: "flex", alignItems: "center", gap: 4 }}><Clock size={11} /> 20 min</span>
                <span style={{ fontSize: 11, fontWeight: 600, background: "#f5f5f5", color: "#777", borderRadius: 100, padding: "4px 10px", display: "flex", alignItems: "center", gap: 4 }}><FileText size={11} /> 150+</span>
              </div>
            </div>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#bbb", marginBottom: 8 }}>Task 1</div>
            <h3 style={{ fontSize: 22, fontWeight: 300, letterSpacing: "-0.03em", color: "#0a0a0a", margin: "0 0 10px" }}>
              Academic <em style={{ fontFamily: "'DM Serif Display', serif", fontStyle: "italic" }}>Report</em>
            </h3>
            <p style={{ fontSize: 14, color: "#777", lineHeight: 1.65, margin: "0 0 24px", flex: 1 }}>
              Analyse and describe visual information — charts, graphs, tables, and diagrams — in formal academic style.
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
              {["Charts", "Graphs", "Tables", "Diagrams"].map((tag) => (
                <span key={tag} style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.10em", background: "#f5f5f5", color: "#999", borderRadius: 100, padding: "4px 10px" }}>{tag}</span>
              ))}
            </div>
            <Link
              to="/app/writing/task1"
              className="wrt-btn-dark"
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 22px", background: "#0a0a0a", color: "#fff", borderRadius: 100, textDecoration: "none", fontSize: 13, fontWeight: 600 }}
            >
              Start Task 1 Practice <ArrowUpRight size={16} />
            </Link>
          </div>

          {/* Task 2 – dark */}
          <div
            className="wrt-card"
            style={{
              background: "#0a0a0a", borderRadius: 20, padding: 32,
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              display: "flex", flexDirection: "column",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
              <div style={{ width: 40, height: 40, background: "#1a1a1a", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600, color: "#888" }}>T2</div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 600, background: "#1a1a1a", color: "#666", borderRadius: 100, padding: "4px 10px", display: "flex", alignItems: "center", gap: 4 }}><Clock size={11} /> 40 min</span>
                <span style={{ fontSize: 11, fontWeight: 600, background: "#1a1a1a", color: "#666", borderRadius: 100, padding: "4px 10px", display: "flex", alignItems: "center", gap: 4 }}><FileText size={11} /> 250+</span>
              </div>
            </div>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#555", marginBottom: 8 }}>Task 2</div>
            <h3 style={{ fontSize: 22, fontWeight: 300, letterSpacing: "-0.03em", color: "#fff", margin: "0 0 10px" }}>
              Persuasive <em style={{ fontFamily: "'DM Serif Display', serif", fontStyle: "italic", color: "#aaa" }}>Essay</em>
            </h3>
            <p style={{ fontSize: 14, color: "#666", lineHeight: 1.65, margin: "0 0 24px", flex: 1 }}>
              Formulate arguments, present opinions, and solve problems. Tests critical thinking and complex grammar.
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
              {["Opinion", "Discussion", "Problem-Solution"].map((tag) => (
                <span key={tag} style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.10em", background: "#1a1a1a", color: "#555", borderRadius: 100, padding: "4px 10px" }}>{tag}</span>
              ))}
            </div>
            <Link
              to="/app/writing/task2"
              className="wrt-btn-light"
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 22px", background: "#f5f5f5", color: "#0a0a0a", borderRadius: 100, textDecoration: "none", fontSize: 13, fontWeight: 600 }}
            >
              Start Task 2 Practice <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>

        {/* ── How It Works ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 20 }}>
          {[
            { icon: Target,   step: "01", title: "Choose a prompt",   desc: "Filter by type, difficulty, or topic. Or hit Surprise Me for a random challenge." },
            { icon: PenTool,  step: "02", title: "Write under time",  desc: "A built-in timer mirrors real exam conditions. Word count tracks your progress live." },
            { icon: Sparkles, step: "03", title: "Get AI feedback",   desc: "Receive band scores, corrections, and suggestions across all four scoring criteria." },
          ].map(({ icon: Icon, step, title, desc }) => (
            <div key={step} style={{ background: "#fff", borderRadius: 20, padding: 28, border: "1px solid #e8e8e8", boxShadow: "0 2px 12px rgba(0,0,0,0.03)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{ width: 36, height: 36, background: "#f5f5f5", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={15} color="#444" />
                </div>
                <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#bbb" }}>Step {step}</span>
              </div>
              <div style={{ fontSize: 15, fontWeight: 500, color: "#0a0a0a", marginBottom: 6 }}>{title}</div>
              <div style={{ fontSize: 13, color: "#777", lineHeight: 1.65 }}>{desc}</div>
            </div>
          ))}
        </div>

        {/* ── Scoring Criteria ── */}
        <div style={{ background: "#fff", borderRadius: 20, padding: "28px 32px", border: "1px solid #e8e8e8", boxShadow: "0 2px 12px rgba(0,0,0,0.03)", marginBottom: 20 }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#999", marginBottom: 20 }}>How your essay is scored</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
            {[
              { label: "Task Response",       weight: "25%", desc: "Fully addresses the task, relevant arguments"         },
              { label: "Coherence & Cohesion", weight: "25%", desc: "Logical structure, paragraphing, linking"             },
              { label: "Lexical Resource",     weight: "25%", desc: "Vocabulary range, accuracy, collocations"             },
              { label: "Grammatical Range",    weight: "25%", desc: "Sentence structures, tense accuracy, variety"         },
            ].map((c) => (
              <div key={c.label} style={{ padding: "16px 20px", background: "#fafafa", borderRadius: 14, border: "1px solid #f0f0f0" }}>
                <div style={{ fontSize: 20, fontWeight: 300, letterSpacing: "-0.04em", color: "#0a0a0a", marginBottom: 6 }}>{c.weight}</div>
                <div style={{ fontSize: 13, fontWeight: 500, color: "#333", marginBottom: 4 }}>{c.label}</div>
                <div style={{ fontSize: 12, color: "#999", lineHeight: 1.5 }}>{c.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Recent Essays ── */}
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#999" }}>Recent essays</div>
            {essays.length > 0 && (
              <span style={{ fontSize: 12, color: "#bbb" }}>
                {essays.length} session{essays.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {loading ? (
              <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#bbb", padding: "20px 0", fontSize: 13 }}>
                <Loader2 size={14} /> Loading…
              </div>
            ) : essays.length === 0 ? (
              <div style={{ background: "#fff", borderRadius: 20, border: "1px solid #e8e8e8", padding: "40px 32px", textAlign: "center", color: "#bbb", fontSize: 14 }}>
                No essays yet — start your first practice session above
              </div>
            ) : (
              essays.map((essay) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const score: number = (essay.evaluation as any)?.overallBand || 0;
                const date = essay.createdAt
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  ? new Date(((essay.createdAt as any).seconds) * 1000).toLocaleDateString()
                  : "";
                const scoreColor = score >= 7 ? "#16a34a" : score >= 6 ? "#d97706" : "#e11d48";
                const scoreBg    = score >= 7 ? "#f0faf4" : score >= 6 ? "#fffbeb" : "#fff1f2";
                return (
                  <Link
                    key={essay.id as string}
                    to={`/app/writing/results/${essay.id}`}
                    className="wrt-row"
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "18px 24px", background: "#fff", borderRadius: 16,
                      border: "1px solid #e8e8e8", textDecoration: "none",
                      boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                      <div
                        style={{
                          width: 44, height: 44, borderRadius: 12, background: scoreBg,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 16, fontWeight: 300, letterSpacing: "-0.04em", color: scoreColor,
                        }}
                      >
                        {score.toFixed(1)}
                      </div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 500, color: "#0a0a0a", marginBottom: 3 }}>
                          {((essay.topic || essay.promptType || "Essay") as string)}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <span style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.10em", background: "#f5f5f5", color: "#777", borderRadius: 100, padding: "3px 8px" }}>
                            Task {essay.task as number}
                          </span>
                          <span style={{ fontSize: 12, color: "#bbb", display: "flex", alignItems: "center", gap: 4 }}>
                            <FileText size={11} /> {(essay.wordCount as number) || 0} words
                          </span>
                          <span style={{ fontSize: 12, color: "#bbb" }}>{date}</span>
                        </div>
                      </div>
                    </div>
                    <div style={{ width: 32, height: 32, background: "#f5f5f5", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <ArrowUpRight size={14} color="#444" />
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
"""

# ─────────────────────────────────────────────────────────────────────────────
# 2. WritingResult.tsx
# ─────────────────────────────────────────────────────────────────────────────
WRITING_RESULT = """\
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, AlertCircle, TrendingUp, FileText, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";

export function WritingResult() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading]  = useState(true);

  useEffect(() => {
    if (!id || !user) return;
    getDoc(doc(db, "users", user.uid, "sessions", id)).then((snap) => {
      if (snap.exists()) setSession({ id: snap.id, ...snap.data() });
      setLoading(false);
    });
  }, [id, user]);

  if (loading) {
    return (
      <div style={{ fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
        <div style={{ textAlign: "center" }}>
          <Loader2 size={32} color="#bbb" style={{ animation: "spin 1s linear infinite", margin: "0 auto 12px" }} />
          <div style={{ fontSize: 14, color: "#bbb" }}>Loading result…</div>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div style={{ fontFamily: "'DM Sans', sans-serif", maxWidth: 600, margin: "80px auto", padding: "0 40px", textAlign: "center" }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>🤔</div>
        <div style={{ fontSize: 18, fontWeight: 500, color: "#0a0a0a", marginBottom: 8 }}>Session not found</div>
        <div style={{ fontSize: 14, color: "#777", marginBottom: 24 }}>This session doesn't exist or you don't have access.</div>
        <button onClick={() => navigate("/app/writing")} style={{ padding: "10px 24px", background: "#0a0a0a", color: "#fff", borderRadius: 100, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>Back to Writing</button>
      </div>
    );
  }

  const ev = session.evaluation || {};
  const overall: number  = ev.overallBand || 0;
  const isGreat = overall >= 7;
  const isGood  = overall >= 6;
  const scoreColor = isGreat ? "#16a34a" : isGood ? "#d97706" : "#e11d48";
  const scoreBg    = isGreat ? "#f0faf4"  : isGood ? "#fffbeb" : "#fff1f2";

  const subScores = [
    { label: "Task Response",       val: ev.taskResponse       },
    { label: "Coherence & Cohesion", val: ev.coherenceCohesion  },
    { label: "Lexical Resource",     val: ev.lexicalResource    },
    { label: "Grammatical Range",    val: ev.grammaticalRange   },
  ];

  const corrections: Array<{ original: string; improved: string; explanation: string }> = ev.corrections || [];

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#fafafa", minHeight: "100vh" }}>
      <style>{`
        * { -webkit-font-smoothing: antialiased; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px 56px" }}>

        {/* Back nav */}
        <div style={{ paddingTop: 32, marginBottom: 28 }}>
          <Link to="/app/writing" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, color: "#777", textDecoration: "none", fontWeight: 500 }}>
            <ArrowLeft size={14} /> Back to Writing
          </Link>
        </div>

        {/* Score hero */}
        <div
          style={{
            display: "grid", gridTemplateColumns: "auto 1fr", gap: 40, alignItems: "center",
            background: "#fff", borderRadius: 24, padding: "36px 44px",
            border: "1px solid #e8e8e8", boxShadow: "0 2px 12px rgba(0,0,0,0.04)", marginBottom: 16,
          }}
        >
          <div
            style={{
              width: 96, height: 96, borderRadius: 24, background: scoreBg,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              border: `2px solid ${scoreColor}22`,
            }}
          >
            <div style={{ fontSize: 36, fontWeight: 300, letterSpacing: "-0.05em", color: scoreColor, lineHeight: 1 }}>{overall.toFixed(1)}</div>
            <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: scoreColor, opacity: 0.7, marginTop: 4 }}>Band</div>
          </div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#bbb", marginBottom: 10 }}>
              Task {session.task} · {session.wordCount || 0} words
            </div>
            <h2 style={{ fontSize: 26, fontWeight: 300, letterSpacing: "-0.04em", color: "#0a0a0a", margin: "0 0 8px" }}>
              {isGreat ? "Excellent work" : isGood ? "Good attempt" : "Keep practising"}
            </h2>
            <p style={{ fontSize: 14, color: "#777", margin: 0, lineHeight: 1.65 }}>
              {ev.overallFeedback || "AI feedback has been generated for this session."}
            </p>
          </div>
        </div>

        {/* Sub-scores */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 16 }}>
          {subScores.map((s) => {
            const sc = s.val || 0;
            const col = sc >= 7 ? "#16a34a" : sc >= 6 ? "#d97706" : "#e11d48";
            const bg  = sc >= 7 ? "#f0faf4"  : sc >= 6 ? "#fffbeb" : "#fff1f2";
            return (
              <div key={s.label} style={{ background: "#fff", borderRadius: 20, padding: "22px 24px", border: "1px solid #e8e8e8", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
                <div style={{ fontSize: 28, fontWeight: 300, letterSpacing: "-0.05em", color: col, marginBottom: 6 }}>{sc.toFixed(1)}</div>
                <div style={{ fontSize: 12, fontWeight: 500, color: "#333", marginBottom: 4 }}>{s.label}</div>
                <div style={{ height: 4, background: "#f0f0f0", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${(sc / 9) * 100}%`, background: bg === "#f0faf4" ? "#16a34a" : bg === "#fffbeb" ? "#d97706" : "#e11d48", borderRadius: 4 }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Strengths & areas to fix */}
        {(ev.strengths?.length || ev.areasToFix?.length) && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
            {ev.strengths?.length > 0 && (
              <div style={{ background: "#fff", borderRadius: 20, padding: "24px 28px", border: "1px solid #e8e8e8" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                  <CheckCircle2 size={14} color="#16a34a" />
                  <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#999" }}>Strengths</span>
                </div>
                <ul style={{ margin: 0, padding: "0 0 0 16px" }}>
                  {ev.strengths.map((s: string, i: number) => (
                    <li key={i} style={{ fontSize: 13, color: "#555", lineHeight: 1.65, marginBottom: 6 }}>{s}</li>
                  ))}
                </ul>
              </div>
            )}
            {ev.areasToFix?.length > 0 && (
              <div style={{ background: "#fff", borderRadius: 20, padding: "24px 28px", border: "1px solid #e8e8e8" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                  <TrendingUp size={14} color="#d97706" />
                  <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#999" }}>Areas to improve</span>
                </div>
                <ul style={{ margin: 0, padding: "0 0 0 16px" }}>
                  {ev.areasToFix.map((s: string, i: number) => (
                    <li key={i} style={{ fontSize: 13, color: "#555", lineHeight: 1.65, marginBottom: 6 }}>{s}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Main split: essay + corrections */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {/* Essay text */}
          <div style={{ background: "#fff", borderRadius: 20, padding: "28px 32px", border: "1px solid #e8e8e8", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
              <FileText size={14} color="#bbb" />
              <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#bbb" }}>Your essay</span>
            </div>
            <p style={{ fontSize: 14, color: "#333", lineHeight: 1.85, margin: 0, whiteSpace: "pre-wrap" }}>{session.essay}</p>
          </div>

          {/* Corrections */}
          <div style={{ background: "#fff", borderRadius: 20, padding: "28px 32px", border: "1px solid #e8e8e8", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
              <AlertCircle size={14} color="#bbb" />
              <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#bbb" }}>Corrections ({corrections.length})</span>
            </div>
            {corrections.length === 0 ? (
              <div style={{ fontSize: 14, color: "#bbb", padding: "20px 0" }}>No corrections — great writing!</div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {corrections.map((c, i) => (
                  <div key={i} style={{ background: "#fafafa", borderRadius: 14, padding: "16px 18px", border: "1px solid #f0f0f0" }}>
                    <div style={{ display: "flex", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 12, background: "#fff1f2", color: "#e11d48", borderRadius: 6, padding: "3px 8px", textDecoration: "line-through" }}>{c.original}</span>
                      <span style={{ fontSize: 12, color: "#bbb" }}>→</span>
                      <span style={{ fontSize: 12, background: "#f0faf4", color: "#16a34a", borderRadius: 6, padding: "3px 8px", fontWeight: 500 }}>{c.improved}</span>
                    </div>
                    <div style={{ fontSize: 12, color: "#777", lineHeight: 1.55 }}>{c.explanation}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer action */}
        <div style={{ textAlign: "center", marginTop: 36 }}>
          <Link
            to="/app/writing"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "13px 32px", background: "#0a0a0a", color: "#fff", borderRadius: 100, textDecoration: "none", fontSize: 13, fontWeight: 600 }}
          >
            Practice again
          </Link>
        </div>
      </div>
    </div>
  );
}
"""

# ─────────────────────────────────────────────────────────────────────────────
# 3. WritingPractice.tsx  (preserve all logic, replace all Tailwind)
# ─────────────────────────────────────────────────────────────────────────────
WRITING_PRACTICE = """\
import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Search, ChevronDown, Shuffle, Clock, AlignLeft,
  BarChart2, ChevronLeft, Send, Loader2,
} from "lucide-react";
import { TASK1_TOPICS, TASK2_TOPICS, type WritingTopic } from "@/data/writingTopics";
import { CHART_CONFIGS } from "@/data/chartConfigs";
import { ChartRenderer } from "@/components/ChartRenderer";
import { evaluateWriting } from "@/lib/openai";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";

/* ── helpers ─────────────────────────────────────────────────────────────── */
const TYPE_COLOR: Record<string, { bg: string; color: string }> = {
  "Opinion Essay":         { bg: "#f5f5f5", color: "#555" },
  "Discussion Essay":      { bg: "#f5f5f5", color: "#555" },
  "Problem-Solution":      { bg: "#f5f5f5", color: "#555" },
  "Advantages-Disadvantages": { bg: "#f5f5f5", color: "#555" },
  "Bar Chart":             { bg: "#f5f5f5", color: "#555" },
  "Line Graph":            { bg: "#f5f5f5", color: "#555" },
  "Pie Chart":             { bg: "#f5f5f5", color: "#555" },
  "Table":                 { bg: "#f5f5f5", color: "#555" },
  "Process Diagram":       { bg: "#f5f5f5", color: "#555" },
  "Map":                   { bg: "#f5f5f5", color: "#555" },
};

const DIFF_COLOR: Record<string, { bg: string; color: string }> = {
  Easy:   { bg: "#f0faf4", color: "#16a34a" },
  Medium: { bg: "#fffbeb", color: "#d97706" },
  Hard:   { bg: "#fff1f2", color: "#e11d48" },
};

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  return `${m}:${String(s % 60).padStart(2, "0")}`;
}

/* ── component ───────────────────────────────────────────────────────────── */
export function WritingPractice() {
  const { task } = useParams<{ task: string }>();
  const taskNum = task === "task1" ? 1 : 2;
  const TOPICS  = taskNum === 1 ? TASK1_TOPICS : TASK2_TOPICS;
  const minWords = taskNum === 1 ? 150 : 250;
  const timeLimit = taskNum === 1 ? 1200 : 2400;

  const navigate   = useNavigate();
  const { user }   = useAuth();
  const timerRef   = useRef<ReturnType<typeof setInterval> | null>(null);

  const [stage, setStage]           = useState<"select" | "writing" | "processing">("select");
  const [selected, setSelected]     = useState<WritingTopic | null>(null);
  const [essay, setEssay]           = useState("");
  const [timeLeft, setTimeLeft]     = useState(timeLimit);
  const [search, setSearch]         = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [diffFilter, setDiffFilter] = useState("All");
  const [errorMsg, setErrorMsg]     = useState("");

  const wordCount = essay.trim() ? essay.trim().split(/\\s+/).length : 0;

  /* timer */
  useEffect(() => {
    if (stage !== "writing") return;
    timerRef.current = setInterval(() => setTimeLeft((t) => Math.max(0, t - 1)), 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [stage]);

  const startWriting = useCallback((topic: WritingTopic) => {
    setSelected(topic);
    setEssay("");
    setTimeLeft(timeLimit);
    setStage("writing");
  }, [timeLimit]);

  const handleSubmit = async () => {
    if (!user || !selected) return;
    if (wordCount < minWords) {
      setErrorMsg(`Minimum ${minWords} words required (you have ${wordCount})`);
      return;
    }
    if (timerRef.current) clearInterval(timerRef.current);
    setStage("processing");
    setErrorMsg("");
    try {
      const evaluation = await evaluateWriting(essay, selected.prompt, taskNum);
      const ref = await addDoc(collection(db, "users", user.uid, "sessions"), {
        type: "writing",
        task: taskNum,
        topic: selected.title,
        promptType: selected.type,
        prompt: selected.prompt,
        essay,
        wordCount,
        evaluation,
        createdAt: serverTimestamp(),
      });
      navigate(`/app/writing/results/${ref.id}`);
    } catch (err) {
      console.error(err);
      setErrorMsg("Something went wrong. Please try again.");
      setStage("writing");
    }
  };

  /* ── filtered topics ── */
  const types = ["All", ...Array.from(new Set(TOPICS.map((t) => t.type)))];
  const diffs = ["All", "Easy", "Medium", "Hard"];
  const filtered = TOPICS.filter((t) => {
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase()) ||
                        t.topic.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "All" || t.type === typeFilter;
    const matchDiff = diffFilter === "All" || t.difficulty === diffFilter;
    return matchSearch && matchType && matchDiff;
  });

  const getRandomTopic = () => {
    const pool = filtered.length ? filtered : TOPICS;
    startWriting(pool[Math.floor(Math.random() * pool.length)]);
  };

  /* chart config for task1 */
  const chartConfig = selected
    ? CHART_CONFIGS.find((c) => c.id === (selected as WritingTopic & { chartId?: string }).chartId)
    : null;

  /* ── PROCESSING ── */
  if (stage === "processing") {
    return (
      <div style={{ fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "#fafafa" }}>
        <style>{"* { -webkit-font-smoothing: antialiased; }"}</style>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#fff", border: "1px solid #e8e8e8", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
            <Loader2 size={24} color="#555" style={{ animation: "spin 1s linear infinite" }} />
          </div>
          <div style={{ fontSize: 20, fontWeight: 300, letterSpacing: "-0.03em", color: "#0a0a0a", marginBottom: 8 }}>Evaluating your essay…</div>
          <div style={{ fontSize: 13, color: "#999" }}>This usually takes 15–30 seconds</div>
        </div>
        <style>{"@keyframes spin { to { transform: rotate(360deg); } }"}</style>
      </div>
    );
  }

  /* ── WRITING ── */
  if (stage === "writing" && selected) {
    const isLow     = wordCount < minWords;
    const isWarning = timeLeft < 120;

    return (
      <div style={{ fontFamily: "'DM Sans', sans-serif", height: "100vh", display: "flex", flexDirection: "column", background: "#fafafa" }}>
        <style>{"* { -webkit-font-smoothing: antialiased; }"}</style>

        {/* top bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 32px", background: "#fff", borderBottom: "1px solid #e8e8e8", flexShrink: 0 }}>
          <button onClick={() => setStage("select")} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#777", background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>
            <ChevronLeft size={15} /> Back
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 500, color: isWarning ? "#e11d48" : "#555" }}>
              <Clock size={14} /> {formatTime(timeLeft)}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: isLow ? "#e11d48" : "#555" }}>
              <AlignLeft size={14} /> {wordCount} / {minWords}+ words
            </div>
            <button
              onClick={handleSubmit}
              disabled={isLow}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "8px 20px", background: isLow ? "#f0f0f0" : "#0a0a0a",
                color: isLow ? "#bbb" : "#fff", borderRadius: 100,
                border: "none", cursor: isLow ? "not-allowed" : "pointer",
                fontSize: 13, fontWeight: 600, fontFamily: "'DM Sans', sans-serif",
                transition: "opacity 0.2s",
              }}
            >
              <Send size={13} /> Submit
            </button>
          </div>
        </div>

        {errorMsg && (
          <div style={{ padding: "12px 32px", background: "#fff1f2", borderBottom: "1px solid #fecdd3", fontSize: 13, color: "#e11d48" }}>{errorMsg}</div>
        )}

        {/* split pane */}
        <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
          {/* prompt panel */}
          <div style={{ width: "42%", overflow: "auto", padding: "32px 36px", borderRight: "1px solid #e8e8e8", background: "#fff" }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
              <span style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.10em", background: "#f5f5f5", color: "#777", borderRadius: 100, padding: "4px 10px" }}>{selected.type}</span>
              <span style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.10em", background: DIFF_COLOR[selected.difficulty]?.bg || "#f5f5f5", color: DIFF_COLOR[selected.difficulty]?.color || "#777", borderRadius: 100, padding: "4px 10px" }}>{selected.difficulty}</span>
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 500, color: "#0a0a0a", marginBottom: 18, lineHeight: 1.45 }}>{selected.title}</h2>
            {chartConfig && taskNum === 1 && (
              <div style={{ marginBottom: 20, background: "#fafafa", borderRadius: 16, padding: 16, border: "1px solid #f0f0f0" }}>
                <ChartRenderer config={chartConfig} />
              </div>
            )}
            <p style={{ fontSize: 14, color: "#555", lineHeight: 1.75, margin: 0, whiteSpace: "pre-wrap" }}>{selected.prompt}</p>
          </div>

          {/* editor panel */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "32px 36px", background: "#fafafa" }}>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#bbb", marginBottom: 12 }}>Your answer</div>
            <textarea
              value={essay}
              onChange={(e) => setEssay(e.target.value)}
              placeholder={`Start writing your ${taskNum === 1 ? "report" : "essay"} here…`}
              style={{
                flex: 1, resize: "none", border: "1px solid #e8e8e8", borderRadius: 16,
                padding: "20px 24px", fontSize: 14, fontFamily: "'DM Sans', sans-serif",
                color: "#0a0a0a", background: "#fff", lineHeight: 1.8, outline: "none",
                boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  /* ── SELECT ── */
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#fafafa", minHeight: "100vh" }}>
      <style>{"* { -webkit-font-smoothing: antialiased; } .wp-topic:hover { background: #f5f5f5 !important; } .wp-start:hover { opacity: 0.82; }"}</style>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px 48px" }}>

        {/* header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 32, marginBottom: 28 }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#bbb", marginBottom: 6 }}>
              Task {taskNum} Practice
            </div>
            <h1 style={{ fontSize: 28, fontWeight: 300, letterSpacing: "-0.04em", color: "#0a0a0a", margin: 0 }}>
              {taskNum === 1 ? (
                <>Academic <em style={{ fontFamily: "'DM Serif Display', serif", fontStyle: "italic" }}>Reports</em></>
              ) : (
                <>Persuasive <em style={{ fontFamily: "'DM Serif Display', serif", fontStyle: "italic" }}>Essays</em></>
              )}
            </h1>
          </div>
          <button
            onClick={getRandomTopic}
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 20px", background: "#0a0a0a", color: "#fff", borderRadius: 100, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}
          >
            <Shuffle size={13} /> Surprise me
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 20 }}>
          {/* sidebar filters */}
          <div>
            <div style={{ background: "#fff", borderRadius: 20, padding: "24px 20px", border: "1px solid #e8e8e8", boxShadow: "0 2px 8px rgba(0,0,0,0.03)", marginBottom: 12 }}>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#bbb", marginBottom: 14 }}>Type</div>
              {types.map((t) => (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t)}
                  style={{
                    display: "block", width: "100%", textAlign: "left", padding: "8px 12px",
                    borderRadius: 10, border: "none", cursor: "pointer",
                    background: typeFilter === t ? "#0a0a0a" : "transparent",
                    color: typeFilter === t ? "#fff" : "#555",
                    fontSize: 13, fontWeight: typeFilter === t ? 500 : 400,
                    fontFamily: "'DM Sans', sans-serif", marginBottom: 2, transition: "background 0.15s",
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
            <div style={{ background: "#fff", borderRadius: 20, padding: "24px 20px", border: "1px solid #e8e8e8", boxShadow: "0 2px 8px rgba(0,0,0,0.03)" }}>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#bbb", marginBottom: 14 }}>Difficulty</div>
              {diffs.map((d) => (
                <button
                  key={d}
                  onClick={() => setDiffFilter(d)}
                  style={{
                    display: "block", width: "100%", textAlign: "left", padding: "8px 12px",
                    borderRadius: 10, border: "none", cursor: "pointer",
                    background: diffFilter === d ? "#0a0a0a" : "transparent",
                    color: diffFilter === d ? "#fff" : "#555",
                    fontSize: 13, fontWeight: diffFilter === d ? 500 : 400,
                    fontFamily: "'DM Sans', sans-serif", marginBottom: 2, transition: "background 0.15s",
                  }}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* topic list */}
          <div>
            {/* search */}
            <div style={{ position: "relative", marginBottom: 14 }}>
              <Search size={14} color="#bbb" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search topics…"
                style={{
                  width: "100%", padding: "12px 16px 12px 40px", border: "1px solid #e8e8e8",
                  borderRadius: 100, fontSize: 13, fontFamily: "'DM Sans', sans-serif",
                  background: "#fff", outline: "none", color: "#0a0a0a",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* stats bar */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 14 }}>
              <span style={{ fontSize: 12, color: "#bbb" }}>{filtered.length} topic{filtered.length !== 1 ? "s" : ""}</span>
              <div style={{ display: "flex", gap: 6 }}>
                <span style={{ fontSize: 11, background: "#f5f5f5", color: "#777", borderRadius: 100, padding: "3px 10px", display: "flex", alignItems: "center", gap: 4 }}>
                  <Clock size={10} /> {taskNum === 1 ? "20 min" : "40 min"}
                </span>
                <span style={{ fontSize: 11, background: "#f5f5f5", color: "#777", borderRadius: 100, padding: "3px 10px", display: "flex", alignItems: "center", gap: 4 }}>
                  <AlignLeft size={10} /> {minWords}+ words
                </span>
                <span style={{ fontSize: 11, background: "#f5f5f5", color: "#777", borderRadius: 100, padding: "3px 10px", display: "flex", alignItems: "center", gap: 4 }}>
                  <BarChart2 size={10} /> Band 5–9
                </span>
              </div>
            </div>

            {/* topic cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {filtered.length === 0 ? (
                <div style={{ background: "#fff", borderRadius: 20, border: "1px solid #e8e8e8", padding: "40px 32px", textAlign: "center", color: "#bbb", fontSize: 14 }}>
                  No topics match your filters
                </div>
              ) : filtered.map((topic) => (
                <div
                  key={topic.id}
                  className="wp-topic"
                  style={{ background: "#fff", borderRadius: 16, padding: "18px 22px", border: "1px solid #e8e8e8", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", transition: "background 0.15s" }}
                  onClick={() => startWriting(topic)}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 500, color: "#0a0a0a", marginBottom: 6 }}>{topic.title}</div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.10em", background: TYPE_COLOR[topic.type]?.bg || "#f5f5f5", color: TYPE_COLOR[topic.type]?.color || "#777", borderRadius: 100, padding: "3px 9px" }}>{topic.type}</span>
                      <span style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.10em", background: DIFF_COLOR[topic.difficulty]?.bg || "#f5f5f5", color: DIFF_COLOR[topic.difficulty]?.color || "#777", borderRadius: 100, padding: "3px 9px" }}>{topic.difficulty}</span>
                      {topic.topic && <span style={{ fontSize: 11, color: "#bbb" }}>{topic.topic}</span>}
                    </div>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); startWriting(topic); }}
                    className="wp-start"
                    style={{ flexShrink: 0, marginLeft: 16, padding: "8px 18px", background: "#0a0a0a", color: "#fff", borderRadius: 100, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: "'DM Sans', sans-serif", transition: "opacity 0.2s" }}
                  >
                    Start
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* suppress unused import warnings */}
      {false && <><ChevronDown /><BarChart2 /></>}
    </div>
  );
}
"""

# ─────────────────────────────────────────────────────────────────────────────
# 4. Vocabulary.tsx  – preserve VOCAB data array; replace all UI
# ─────────────────────────────────────────────────────────────────────────────

# Read the original file to extract the VOCAB array verbatim
vocab_path = os.path.join(BASE, "Vocabulary.tsx")
with open(vocab_path) as f:
    vocab_original = f.read()

# Find VOCAB array boundaries
vocab_start = vocab_original.find("const VOCAB")
vocab_end   = vocab_original.find("\n];\n", vocab_start) + 4  # include "];\n"
VOCAB_BLOCK = vocab_original[vocab_start:vocab_end]

VOCABULARY = f"""\
import {{ useState }} from "react";
import {{ BookOpen, Zap, Brain, CheckCircle, Search, X }} from "lucide-react";

/* ── Word data (do not edit) ──────────────────────────────────────────────── */
{VOCAB_BLOCK}

type Word = (typeof VOCAB)[number];

/* ── topic / tag meta ─────────────────────────────────────────────────────── */
const TOPICS = [
  {{ id: "all",         label: "All",          emoji: "📚" }},
  {{ id: "environment", label: "Environment",  emoji: "🌿" }},
  {{ id: "technology",  label: "Technology",   emoji: "💻" }},
  {{ id: "education",   label: "Education",    emoji: "🎓" }},
  {{ id: "health",      label: "Health",       emoji: "🏥" }},
  {{ id: "society",     label: "Society",      emoji: "🏙️" }},
  {{ id: "economy",     label: "Economy",      emoji: "📈" }},
  {{ id: "culture",     label: "Culture",      emoji: "🎭" }},
];

const DIFF_CHIP: Record<string, {{ bg: string; color: string }}> = {{
  Beginner:     {{ bg: "#f0faf4", color: "#16a34a" }},
  Intermediate: {{ bg: "#fffbeb", color: "#d97706" }},
  Advanced:     {{ bg: "#fff1f2", color: "#e11d48" }},
}};

const POS_CHIP: Record<string, {{ bg: string; color: string }}> = {{
  noun:        {{ bg: "#eff6ff", color: "#2563eb" }},
  verb:        {{ bg: "#f5f3ff", color: "#7c3aed" }},
  adjective:   {{ bg: "#fff7ed", color: "#ea580c" }},
  adverb:      {{ bg: "#f0fdf4", color: "#16a34a" }},
  phrase:      {{ bg: "#fdf4ff", color: "#a21caf" }},
  conjunction: {{ bg: "#f0f9ff", color: "#0284c7" }},
}};

/* ── Word of the Day ─────────────────────────────────────────────────────── */
const dayOfYear = () => {{
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  return Math.floor((now.getTime() - start.getTime()) / 86400000);
}};
const WORD_OF_DAY = VOCAB[dayOfYear() % VOCAB.length];

/* ── WordCard ─────────────────────────────────────────────────────────────── */
function WordCard({{ word, learned, onToggle }}: {{ word: Word; learned: boolean; onToggle: () => void }}) {{
  const dc = DIFF_CHIP[word.difficulty] || {{ bg: "#f5f5f5", color: "#777" }};
  const pc = POS_CHIP[word.partOfSpeech] || {{ bg: "#f5f5f5", color: "#777" }};
  return (
    <div
      style={{{{
        background: "#fff", borderRadius: 20, padding: "24px 26px",
        border: "1px solid #e8e8e8", boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
        display: "flex", flexDirection: "column", gap: 12,
      }}}}
    >
      <div style={{{{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}}}>
        <div>
          <div style={{{{ fontSize: 20, fontWeight: 500, color: "#0a0a0a", letterSpacing: "-0.02em", marginBottom: 2 }}}}>{{word.word}}</div>
          <div style={{{{ fontSize: 12, color: "#999", fontStyle: "italic" }}}}>{{word.pronunciation}}</div>
        </div>
        <button
          onClick={{onToggle}}
          style={{{{
            width: 32, height: 32, borderRadius: "50%",
            background: learned ? "#f0faf4" : "#f5f5f5",
            border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, transition: "background 0.2s",
          }}}}
        >
          <CheckCircle size={{13}} color={{learned ? "#16a34a" : "#ccc"}} />
        </button>
      </div>
      <div style={{{{ display: "flex", gap: 6, flexWrap: "wrap" }}}}>
        <span style={{{{ fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", background: pc.bg, color: pc.color, borderRadius: 100, padding: "3px 9px" }}}}>{{word.partOfSpeech}}</span>
        <span style={{{{ fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", background: dc.bg, color: dc.color, borderRadius: 100, padding: "3px 9px" }}}}>{{word.difficulty}}</span>
      </div>
      <div style={{{{ fontSize: 14, color: "#333", lineHeight: 1.65 }}}}>{{word.definition}}</div>
      <div style={{{{ padding: "10px 14px", background: "#fafafa", borderRadius: 12, border: "1px solid #f0f0f0" }}}}>
        <div style={{{{ fontSize: 12, color: "#777", lineHeight: 1.65, fontStyle: "italic" }}}}>"{{word.example}}"</div>
      </div>
      {{word.synonyms?.length > 0 && (
        <div style={{{{ display: "flex", gap: 6, flexWrap: "wrap" }}}}>
          {{word.synonyms.map((s: string) => (
            <span key={{s}} style={{{{ fontSize: 11, fontWeight: 500, background: "#f5f5f5", color: "#777", borderRadius: 100, padding: "3px 9px" }}}}>{{s}}</span>
          ))}}
        </div>
      )}}
    </div>
  );
}}

/* ── FlashcardMode ─────────────────────────────────────────────────────────── */
function FlashcardMode({{ words, learned, onToggle }}: {{ words: Word[]; learned: Set<string>; onToggle: (id: string) => void }}) {{
  const [idx, setIdx]       = useState(0);
  const [flipped, setFlipped] = useState(false);
  const word = words[idx];
  if (!word) return <div style={{{{ padding: 40, textAlign: "center", color: "#bbb", fontSize: 14 }}}}>No words in this set.</div>;

  return (
    <div style={{{{ display: "flex", flexDirection: "column", alignItems: "center", padding: "40px 20px" }}}}>
      <div style={{{{ fontSize: 12, color: "#bbb", marginBottom: 24 }}}}>{{idx + 1}} / {{words.length}}</div>
      {{/* 3-D flip card */}}
      <div
        onClick={{() => setFlipped((f) => !f)}}
        style={{{{
          width: "min(480px,90vw)", height: 280, cursor: "pointer",
          perspective: 1000, marginBottom: 28,
        }}}}
      >
        <div
          style={{{{
            position: "relative", width: "100%", height: "100%",
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
          }}}}
        >
          {{/* front */}}
          <div
            style={{{{
              position: "absolute", width: "100%", height: "100%",
              backfaceVisibility: "hidden",
              background: "#0a0a0a", borderRadius: 24,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              gap: 8, padding: 32, boxSizing: "border-box",
            }}}}
          >
            <div style={{{{ fontSize: 32, fontWeight: 300, letterSpacing: "-0.04em", color: "#fff" }}}}>{{word.word}}</div>
            <div style={{{{ fontSize: 13, color: "#666", fontStyle: "italic" }}}}>{{word.pronunciation}}</div>
            <div style={{{{ fontSize: 11, color: "#555", marginTop: 8 }}}}>tap to reveal</div>
          </div>
          {{/* back */}}
          <div
            style={{{{
              position: "absolute", width: "100%", height: "100%",
              backfaceVisibility: "hidden",
              background: "#fff", borderRadius: 24, border: "1px solid #e8e8e8",
              transform: "rotateY(180deg)",
              display: "flex", flexDirection: "column", justifyContent: "center",
              gap: 10, padding: 32, boxSizing: "border-box",
            }}}}
          >
            <div style={{{{ fontSize: 15, fontWeight: 500, color: "#0a0a0a" }}}}>{{word.word}}</div>
            <div style={{{{ fontSize: 13, color: "#555", lineHeight: 1.65 }}}}>{{word.definition}}</div>
            <div style={{{{ fontSize: 12, color: "#999", fontStyle: "italic" }}}}>"{{word.example}}"</div>
          </div>
        </div>
      </div>
      {{/* controls */}}
      <div style={{{{ display: "flex", alignItems: "center", gap: 12 }}}}>
        <button onClick={{() => {{ setIdx((i) => Math.max(0, i - 1)); setFlipped(false); }}}} disabled={{idx === 0}} style={{{{ padding: "8px 20px", borderRadius: 100, border: "1px solid #e8e8e8", background: "#fff", cursor: idx === 0 ? "not-allowed" : "pointer", fontSize: 13, color: idx === 0 ? "#ccc" : "#555", fontFamily: "'DM Sans', sans-serif" }}}}>Prev</button>
        <button
          onClick={{() => {{ onToggle(word.id); }}}}
          style={{{{ padding: "8px 20px", borderRadius: 100, border: "none", background: learned.has(word.id) ? "#f0faf4" : "#f5f5f5", color: learned.has(word.id) ? "#16a34a" : "#777", cursor: "pointer", fontSize: 13, fontWeight: 500, fontFamily: "'DM Sans', sans-serif" }}}}
        >
          {{learned.has(word.id) ? "✓ Learned" : "Mark learned"}}
        </button>
        <button onClick={{() => {{ setIdx((i) => Math.min(words.length - 1, i + 1)); setFlipped(false); }}}} disabled={{idx === words.length - 1}} style={{{{ padding: "8px 20px", borderRadius: 100, border: "1px solid #e8e8e8", background: "#fff", cursor: idx === words.length - 1 ? "not-allowed" : "pointer", fontSize: 13, color: idx === words.length - 1 ? "#ccc" : "#555", fontFamily: "'DM Sans', sans-serif" }}}}>Next</button>
      </div>
    </div>
  );
}}

/* ── QuizMode ──────────────────────────────────────────────────────────────── */
function QuizMode({{ words }}: {{ words: Word[] }}) {{
  const [qIdx, setQIdx]   = useState(0);
  const [chosen, setChosen] = useState<string | null>(null);
  const [score, setScore]  = useState(0);
  const [done, setDone]    = useState(false);

  if (words.length < 4) return <div style={{{{ padding: 40, textAlign: "center", color: "#bbb", fontSize: 14 }}}}>Need at least 4 words for quiz mode.</div>;

  const q = words[qIdx];
  const others = words.filter((_, i) => i !== qIdx);
  const distractors = others.sort(() => Math.random() - 0.5).slice(0, 3).map((w) => w.definition);
  const options = [...distractors, q.definition].sort(() => Math.random() - 0.5);

  if (done) return (
    <div style={{{{ padding: 64, textAlign: "center" }}}}>
      <div style={{{{ fontSize: 48, fontWeight: 300, letterSpacing: "-0.05em", color: "#0a0a0a", marginBottom: 8 }}}}>{{score}}<span style={{{{ fontSize: 20, color: "#bbb" }}}}>{{`/${{words.length}}`}}</span></div>
      <div style={{{{ fontSize: 14, color: "#777", marginBottom: 28 }}}}>{{score === words.length ? "Perfect!" : score >= words.length * 0.7 ? "Great job!" : "Keep practising!"}}</div>
      <button onClick={{() => {{ setQIdx(0); setChosen(null); setScore(0); setDone(false); }}}} style={{{{ padding: "10px 28px", background: "#0a0a0a", color: "#fff", borderRadius: 100, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}}}>Retry</button>
    </div>
  );

  return (
    <div style={{{{ maxWidth: 600, margin: "0 auto", padding: "40px 20px" }}}}>
      <div style={{{{ fontSize: 12, color: "#bbb", marginBottom: 20 }}}}>Question {{qIdx + 1}} of {{words.length}}</div>
      <div style={{{{ fontSize: 20, fontWeight: 500, color: "#0a0a0a", marginBottom: 8 }}}}>{{q.word}}</div>
      <div style={{{{ fontSize: 12, color: "#999", fontStyle: "italic", marginBottom: 24 }}}}>{{q.pronunciation}}</div>
      <div style={{{{ display: "flex", flexDirection: "column", gap: 10 }}}}>
        {{options.map((opt) => {{
          const isCorrect = opt === q.definition;
          let bg = "#fff", col = "#0a0a0a", border = "1px solid #e8e8e8";
          if (chosen) {{
            if (opt === chosen && isCorrect)  {{ bg = "#f0faf4"; col = "#16a34a"; border = "1px solid #86efac"; }}
            else if (opt === chosen)          {{ bg = "#fff1f2"; col = "#e11d48"; border = "1px solid #fca5a5"; }}
            else if (isCorrect)               {{ bg = "#f0faf4"; col = "#16a34a"; border = "1px solid #86efac"; }}
          }}
          return (
            <button
              key={{opt}}
              disabled={{!!chosen}}
              onClick={{() => {{
                setChosen(opt);
                if (isCorrect) setScore((s) => s + 1);
                setTimeout(() => {{
                  if (qIdx + 1 >= words.length) setDone(true);
                  else {{ setQIdx((i) => i + 1); setChosen(null); }}
                }}, 900);
              }}}}
              style={{{{
                padding: "14px 18px", borderRadius: 14, border, background: bg, color: col,
                textAlign: "left", cursor: chosen ? "default" : "pointer",
                fontSize: 13, lineHeight: 1.5, fontFamily: "'DM Sans', sans-serif",
                transition: "background 0.2s, border-color 0.2s",
              }}}}
            >
              {{opt}}
            </button>
          );
        }})}}
      </div>
    </div>
  );
}}

/* ── Main Vocabulary page ─────────────────────────────────────────────────── */
export function Vocabulary() {{
  const [mode, setMode]       = useState<"browse" | "flashcard" | "quiz">("browse");
  const [topic, setTopic]     = useState("all");
  const [search, setSearch]   = useState("");
  const [learned, setLearned] = useState<Set<string>>(() => {{
    try {{ return new Set(JSON.parse(localStorage.getItem("grader_vocab_learned") || "[]")); }}
    catch {{ return new Set(); }}
  }});

  const toggleLearned = (id: string) => {{
    setLearned((prev) => {{
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      localStorage.setItem("grader_vocab_learned", JSON.stringify([...next]));
      return next;
    }});
  }};

  const filteredWords = VOCAB.filter((w) => {{
    const matchTopic  = topic === "all" || w.topic === topic;
    const matchSearch = !search || w.word.toLowerCase().includes(search.toLowerCase()) || w.definition.toLowerCase().includes(search.toLowerCase());
    return matchTopic && matchSearch;
  }});

  const learnedCount = filteredWords.filter((w) => learned.has(w.id)).length;

  return (
    <div style={{{{ fontFamily: "'DM Sans', sans-serif" }}}}>
      <style>{{`
        * {{ -webkit-font-smoothing: antialiased; }}
        .voc-topic:hover {{ background: #f0f0f0 !important; }}
        .voc-word-card {{ transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s cubic-bezier(0.16,1,0.3,1); }}
        .voc-word-card:hover {{ transform: translateY(-2px); box-shadow: 0 10px 32px rgba(0,0,0,0.07); }}
      `}}</style>
      <div style={{{{ maxWidth: 1280, margin: "0 auto", padding: "0 40px 48px" }}}}>

        {{/* ── Hero ── */}}
        <div
          style={{{{
            display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 48, alignItems: "center",
            background: "#0a0a0a", borderRadius: 24, padding: "48px 56px", marginBottom: 20,
          }}}}
        >
          <div>
            <div style={{{{ fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#777", marginBottom: 16 }}}}>Vocabulary Builder</div>
            <h1 style={{{{ fontSize: 44, fontWeight: 300, letterSpacing: "-0.04em", color: "#fff", lineHeight: 1.15, margin: "0 0 14px" }}}}>
              Expand your{{" "}}
              <em style={{{{ fontFamily: "'DM Serif Display', serif", fontStyle: "italic", fontWeight: 400, color: "#ccc" }}}}>lexicon</em>
            </h1>
            <p style={{{{ fontSize: 15, color: "#666", lineHeight: 1.7, margin: "0 0 28px", maxWidth: 400 }}}}>
              {{VOCAB.length}} curated IELTS words with definitions, examples, and pronunciation guides.
            </p>
            <div style={{{{ display: "flex", gap: 40 }}}}>
              {{[
                {{ value: VOCAB.length.toString(), label: "Total words" }},
                {{ value: learnedCount.toString(),  label: "Learned"     }},
                {{ value: TOPICS.length - 1 + "",  label: "Topics"      }},
              ].map((s) => (
                <div key={{s.label}}>
                  <div style={{{{ fontSize: 28, fontWeight: 300, letterSpacing: "-0.05em", color: "#fff" }}}}>{{s.value}}</div>
                  <div style={{{{ fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#555", marginTop: 4 }}}}>{{s.label}}</div>
                </div>
              ))}}
            </div>
          </div>

          {{/* Word of the day */}}
          <div style={{{{ background: "#141414", borderRadius: 20, padding: 28, border: "1px solid #222" }}}}>
            <div style={{{{ fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#555", marginBottom: 16 }}}}>Word of the day</div>
            <div style={{{{ fontSize: 26, fontWeight: 300, letterSpacing: "-0.04em", color: "#fff", marginBottom: 4 }}}}>{{WORD_OF_DAY.word}}</div>
            <div style={{{{ fontSize: 12, color: "#666", fontStyle: "italic", marginBottom: 12 }}}}>{{WORD_OF_DAY.pronunciation}}</div>
            <div style={{{{ fontSize: 13, color: "#888", lineHeight: 1.65, marginBottom: 14 }}}}>{{WORD_OF_DAY.definition}}</div>
            <div style={{{{ fontSize: 12, color: "#555", fontStyle: "italic" }}}}>"{{WORD_OF_DAY.example}}"</div>
          </div>
        </div>

        {{/* ── Mode switcher ── */}}
        <div style={{{{ display: "flex", gap: 8, marginBottom: 20, background: "#fff", borderRadius: 100, padding: 4, border: "1px solid #e8e8e8", width: "fit-content" }}}}>
          {{[
            {{ id: "browse",    label: "Browse",    icon: BookOpen }},
            {{ id: "flashcard", label: "Flashcards", icon: Zap     }},
            {{ id: "quiz",      label: "Quiz",       icon: Brain   }},
          ].map(({{ id, label, icon: Icon }}) => (
            <button
              key={{id}}
              onClick={{() => setMode(id as "browse" | "flashcard" | "quiz")}}
              style={{{{
                display: "flex", alignItems: "center", gap: 6,
                padding: "9px 20px", borderRadius: 100, border: "none", cursor: "pointer",
                background: mode === id ? "#0a0a0a" : "transparent",
                color: mode === id ? "#fff" : "#777",
                fontSize: 13, fontWeight: mode === id ? 600 : 400,
                fontFamily: "'DM Sans', sans-serif", transition: "background 0.2s, color 0.2s",
              }}}}
            >
              <Icon size={{13}} /> {{label}}
            </button>
          ))}}
        </div>

        {{/* ── Search + topic pills ── */}}
        <div style={{{{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, flexWrap: "wrap" }}}}>
          <div style={{{{ position: "relative", flexShrink: 0 }}}}>
            <Search size={{14}} color="#bbb" style={{{{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }}}} />
            <input
              value={{search}}
              onChange={{(e) => setSearch(e.target.value)}}
              placeholder="Search words…"
              style={{{{
                padding: "10px 16px 10px 36px", border: "1px solid #e8e8e8", borderRadius: 100,
                fontSize: 13, fontFamily: "'DM Sans', sans-serif", background: "#fff",
                outline: "none", color: "#0a0a0a", width: 220,
              }}}}
            />
            {{search && <button onClick={{() => setSearch("")}} style={{{{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", padding: 0 }}}}><X size={{12}} color="#bbb" /></button>}}
          </div>
          {{TOPICS.map((t) => (
            <button
              key={{t.id}}
              onClick={{() => setTopic(t.id)}}
              className="voc-topic"
              style={{{{
                display: "flex", alignItems: "center", gap: 5,
                padding: "8px 16px", borderRadius: 100, border: "1px solid",
                borderColor: topic === t.id ? "#0a0a0a" : "#e8e8e8",
                background: topic === t.id ? "#0a0a0a" : "#fff",
                color: topic === t.id ? "#fff" : "#555",
                fontSize: 12, fontWeight: topic === t.id ? 600 : 400,
                cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "background 0.15s, border-color 0.15s",
              }}}}
            >
              <span>{{t.emoji}}</span> {{t.label}}
            </button>
          ))}}
        </div>

        {{/* ── Stats bar ── */}}
        <div style={{{{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}}}>
          <span style={{{{ fontSize: 12, color: "#bbb" }}}}>{{filteredWords.length}} words</span>
          <div style={{{{ flex: 1, height: 4, background: "#f0f0f0", borderRadius: 4, overflow: "hidden", maxWidth: 200 }}}}>
            <div style={{{{ height: "100%", width: filteredWords.length ? `${{(learnedCount / filteredWords.length) * 100}}%` : "0%", background: "#16a34a", borderRadius: 4, transition: "width 0.4s" }}}} />
          </div>
          <span style={{{{ fontSize: 12, color: "#bbb" }}}}>{{learnedCount}} learned</span>
        </div>

        {{/* ── Mode content ── */}}
        {{mode === "flashcard" ? (
          <FlashcardMode words={{filteredWords}} learned={{learned}} onToggle={{toggleLearned}} />
        ) : mode === "quiz" ? (
          <QuizMode words={{filteredWords}} />
        ) : (
          <div style={{{{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 14 }}}}>
            {{filteredWords.length === 0 ? (
              <div style={{{{ gridColumn: "1 / -1", textAlign: "center", padding: "60px 0", color: "#bbb", fontSize: 14 }}}}>No words found</div>
            ) : (
              filteredWords.map((word) => (
                <div key={{word.id}} className="voc-word-card">
                  <WordCard word={{word}} learned={{learned.has(word.id)}} onToggle={{() => toggleLearned(word.id)}} />
                </div>
              ))
            )}}
          </div>
        )}}
      </div>
    </div>
  );
}}
"""

files = {
    "Writing.tsx":         WRITING,
    "WritingResult.tsx":   WRITING_RESULT,
    "WritingPractice.tsx": WRITING_PRACTICE,
    "Vocabulary.tsx":      VOCABULARY,
}

for name, content in files.items():
    path = os.path.join(BASE, name)
    with open(path, "w", encoding="utf-8") as fh:
        fh.write(content)
    print(f"✓ Wrote {name}  ({len(content):,} chars)")

print("\\nAll done.")
