import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Brain,
  CheckCircle2,
  Clock3,
  FileSignature,
  GraduationCap,
  ScanText,
  Target,
  Trophy,
} from "lucide-react";
import { TESTS, GENERAL_TESTS } from "@/data/readingTests";

const DIFF_STYLE: Record<string, { bg: string; color: string }> = {
  Moderate:            { bg: "#f0faf4", color: "#16a34a" },
  Challenging:         { bg: "#fffbeb", color: "#d97706" },
  Advanced:            { bg: "#fff1f2", color: "#e11d48" },
  Intermediate:        { bg: "#eff6ff", color: "#2563eb" },
  "Upper-Intermediate":{ bg: "#f5f3ff", color: "#7c3aed" },
};

export function Reading() {
  const [activeTab, setActiveTab] = useState<"ielts" | "general">("ielts");
  const activeTests = activeTab === "ielts" ? TESTS : GENERAL_TESTS;

  const metrics = useMemo(() => [
    { label: "Practice formats", value: "2",                                  note: "IELTS + General English" },
    { label: "Reading sets",     value: `${TESTS.length + GENERAL_TESTS.length}`, note: "Full tests and article drills" },
    { label: "Focus style",      value: activeTab === "ielts" ? "Exam" : "Articles",
      note: activeTab === "ielts" ? "Timed structured prep" : "Fast comprehension reps" },
  ], [activeTab]);

  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", display: "flex", flexDirection: "column", gap: 20 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=DM+Serif+Display:ital@1&display=swap');
        * { -webkit-font-smoothing: antialiased; }
        .card-lift { transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s ease; }
        .card-lift:hover { transform: translateY(-3px); box-shadow: 0 18px 48px rgba(0,0,0,0.08); }
        .pill-btn { transition: opacity 0.2s; }
        .pill-btn:hover { opacity: 0.8; }
        .ghost-btn { transition: background 0.2s; }
        .ghost-btn:hover { background: #f0f0f0 !important; }
        .tab-active { background: #0a0a0a !important; color: #fff !important; }
        .tab-inactive:hover { background: #f5f5f5 !important; }
        .session-row { transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.2s; }
        .session-row:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(0,0,0,0.06); background: #fff !important; }
      `}</style>

      {/* ── HERO ── */}
      <section style={{
        background: "#fff",
        border: "1px solid #e8e8e8",
        borderRadius: 24,
        padding: "40px 44px",
        boxShadow: "0 2px 20px rgba(0,0,0,0.04)",
        display: "grid",
        gridTemplateColumns: "1.1fr 0.9fr",
        gap: 56,
        alignItems: "center",
      }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#999", marginBottom: 14 }}>
            Reading workspace
          </div>
          <h1 style={{ fontSize: "clamp(28px, 2.4vw, 38px)", fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 1.15, margin: "0 0 16px", color: "#0a0a0a" }}>
            Build faster comprehension,{" "}
            <em style={{ fontFamily: "'DM Serif Display', serif", fontStyle: "italic", fontWeight: 400 }}>calmer timing.</em>
          </h1>
          <p style={{ fontSize: 14, lineHeight: 1.75, color: "#777", marginBottom: 28, maxWidth: 420 }}>
            Move between full IELTS simulations and shorter article drills inside one focused training flow.
          </p>

          <div style={{ display: "flex", gap: 10, marginBottom: 36 }}>
            <Link
              to={`/app/reading/practice?type=${activeTab}&test=0`}
              className="pill-btn"
              style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                background: "#0a0a0a", color: "#fff",
                padding: "11px 22px", borderRadius: 100,
                fontSize: 13, fontWeight: 600, textDecoration: "none",
              }}
            >
              {activeTab === "ielts" ? "Start full IELTS test" : "Start article drill"} <ArrowRight size={13} />
            </Link>
            <button
              className="ghost-btn"
              onClick={() => setActiveTab(activeTab === "ielts" ? "general" : "ielts")}
              style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                background: "#f5f5f5", color: "#0a0a0a",
                padding: "11px 22px", borderRadius: 100,
                fontSize: 13, fontWeight: 600, border: "none", cursor: "pointer",
              }}
            >
              Switch to {activeTab === "ielts" ? "General English" : "IELTS"} <ArrowUpRight size={13} />
            </button>
          </div>

          <div style={{ display: "flex", gap: 32 }}>
            {metrics.map(({ label, value, note }) => (
              <div key={label}>
                <div style={{ fontSize: 24, fontWeight: 300, letterSpacing: "-0.05em", color: "#0a0a0a", lineHeight: 1 }}>{value}</div>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#999", marginTop: 5 }}>{label}</div>
                <div style={{ fontSize: 11, color: "#bbb", marginTop: 3 }}>{note}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Info cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ background: "#fafafa", border: "1px solid #f0f0f0", borderRadius: 18, padding: "22px 22px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#bbb", marginBottom: 8 }}>Training structure</div>
                <div style={{ fontSize: 17, fontWeight: 500, letterSpacing: "-0.02em", color: "#0a0a0a" }}>Read. Track. Review. Repeat.</div>
              </div>
              <div style={{ width: 36, height: 36, background: "#f0f0f0", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <ScanText size={15} color="#555" />
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
              {[
                { icon: BookOpen, title: "Passages",       text: "Long-form texts and article drills" },
                { icon: Brain,    title: "Question focus", text: "Multiple types, instant review" },
                { icon: Trophy,   title: "Score signal",   text: "Band or accuracy after each run" },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title} style={{ background: "#fff", border: "1px solid #ebebeb", borderRadius: 14, padding: "14px 14px 12px" }}>
                  <div style={{ width: 30, height: 30, background: "#f5f5f5", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
                    <Icon size={13} color="#444" />
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#0a0a0a", marginBottom: 4 }}>{title}</div>
                  <div style={{ fontSize: 11, color: "#aaa", lineHeight: 1.5 }}>{text}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: "#fafafa", border: "1px solid #f0f0f0", borderRadius: 18, padding: "20px 22px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#bbb", marginBottom: 6 }}>Recommended now</div>
                <div style={{ fontSize: 15, fontWeight: 500, color: "#0a0a0a", letterSpacing: "-0.01em" }}>
                  {activeTab === "ielts" ? TESTS[0]?.title : GENERAL_TESTS[0]?.title}
                </div>
              </div>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#999", background: "#efefef", padding: "5px 12px", borderRadius: 100 }}>
                {activeTab === "ielts" ? "Full test" : "Quick read"}
              </div>
            </div>
            <p style={{ fontSize: 12, color: "#999", lineHeight: 1.65 }}>
              {activeTab === "ielts"
                ? "Best for exam-realistic sessions with timing, passage switching, and full result readout."
                : "Best for shorter comprehension blocks with strong review density and less time overhead."}
            </p>
          </div>
        </div>
      </section>

      {/* ── TAB BAR ── */}
      <div style={{
        background: "#fff",
        border: "1px solid #e8e8e8",
        borderRadius: 16,
        padding: "10px 12px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}>
        <div style={{ display: "flex", gap: 6 }}>
          {([["ielts", GraduationCap, "IELTS reading"], ["general", FileSignature, "General English"]] as const).map(([tab, Icon, label]) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={activeTab === tab ? "tab-active" : "tab-inactive"}
              style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                padding: "9px 18px", borderRadius: 10,
                fontSize: 13, fontWeight: 600,
                border: "none", cursor: "pointer",
                color: activeTab === tab ? "#fff" : "#888",
                background: activeTab === tab ? "#0a0a0a" : "transparent",
                transition: "all 0.25s",
              }}
            >
              <Icon size={14} /> {label}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          {[`${activeTests.length} sets ready`, activeTab === "ielts" ? "60 min" : "15 min", activeTab === "ielts" ? "Band scoring" : "Accuracy scoring"].map(label => (
            <span key={label} style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#999", background: "#f5f5f5", padding: "6px 12px", borderRadius: 100 }}>
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* ── TEST LIBRARY ── */}
      <section>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#999", marginBottom: 8 }}>Library</div>
            <h2 style={{ fontSize: "clamp(22px, 2vw, 30px)", fontWeight: 300, letterSpacing: "-0.04em", color: "#0a0a0a", margin: 0 }}>
              {activeTab === "ielts" ? "Choose a full reading simulation" : "Choose a shorter article workout"}
            </h2>
          </div>
          <p style={{ fontSize: 13, color: "#aaa", maxWidth: 340, lineHeight: 1.65, textAlign: "right" }}>
            Pick a level, know the time cost, and jump straight in.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {activeTests.map((test, idx) => {
            const diff = DIFF_STYLE[test.difficulty] ?? { bg: "#f5f5f5", color: "#555" };
            return (
              <Link
                key={`${activeTab}-${test.id}`}
                to={`/app/reading/practice?type=${activeTab}&test=${idx}`}
                className="card-lift"
                style={{
                  background: "#fff",
                  border: "1px solid #e8e8e8",
                  borderRadius: 20,
                  padding: "24px 24px 20px",
                  textDecoration: "none",
                  color: "inherit",
                  display: "flex",
                  flexDirection: "column",
                  gap: 18,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{
                    width: 44, height: 44,
                    background: "#0a0a0a",
                    borderRadius: 13,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 16, fontWeight: 600, color: "#fff",
                  }}>{test.id}</div>
                  <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", background: diff.bg, color: diff.color, padding: "5px 12px", borderRadius: 100 }}>
                    {test.difficulty}
                  </span>
                </div>

                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 500, letterSpacing: "-0.02em", color: "#0a0a0a", margin: "0 0 8px", lineHeight: 1.3 }}>{test.title}</h3>
                  <p style={{ fontSize: 12, color: "#aaa", lineHeight: 1.65, margin: 0 }}>
                    {activeTab === "ielts"
                      ? "Full-length timed practice with passage progression and band-style score output."
                      : "Shorter comprehension training for repeatable sessions and faster review cycles."}
                  </p>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {test.tags.slice(0, 4).map(tag => (
                    <span key={tag} style={{ fontSize: 10, fontWeight: 600, color: "#bbb", background: "#fafafa", border: "1px solid #efefef", padding: "4px 10px", borderRadius: 100 }}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div style={{ background: "#fafafa", border: "1px solid #f0f0f0", borderRadius: 14, padding: "14px 16px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {[
                    { icon: Clock3,  label: "Time",      value: activeTab === "ielts" ? "60 min" : "15 min" },
                    { icon: Target,  label: "Questions",  value: activeTab === "ielts" ? "40 q"   : "6 q"    },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label}>
                      <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 9, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#bbb", marginBottom: 5 }}>
                        <Icon size={11} /> {label}
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#0a0a0a" }}>{value}</div>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #f0f0f0", paddingTop: 16 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#888" }}>
                    {activeTab === "ielts" ? "Launch simulation" : "Open article session"}
                  </span>
                  <div style={{ width: 32, height: 32, background: "#f5f5f5", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <ArrowUpRight size={14} color="#555" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── BOTTOM ROW ── */}
      <div style={{ display: "grid", gridTemplateColumns: "0.95fr 1.05fr", gap: 14 }}>

        {/* How to use */}
        <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 20, padding: "32px 28px 28px", boxShadow: "0 2px 12px rgba(0,0,0,0.03)" }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#999", marginBottom: 10 }}>How to use it</div>
          <h2 style={{ fontSize: 22, fontWeight: 300, letterSpacing: "-0.03em", color: "#0a0a0a", margin: "0 0 24px", lineHeight: 1.2 }}>
            A smoother{" "}
            <em style={{ fontFamily: "'DM Serif Display', serif", fontStyle: "italic" }}>reading routine.</em>
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { icon: GraduationCap, title: "Pick the right mode",          text: "Use IELTS for exam pressure. Use General English for quicker reps." },
              { icon: ScanText,      title: "Work passage by passage",       text: "The practice screen keeps progress visible so you always know where you are." },
              { icon: CheckCircle2,  title: "Review after every session",    text: "See what went right, where accuracy dropped, and what needs another round." },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} style={{ background: "#fafafa", border: "1px solid #f0f0f0", borderRadius: 14, padding: "16px 18px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <div style={{ width: 32, height: 32, background: "#0a0a0a", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={13} color="#fff" />
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#0a0a0a" }}>{title}</div>
                </div>
                <p style={{ fontSize: 12, color: "#999", lineHeight: 1.65, margin: 0 }}>{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 20, padding: "32px 28px 28px", boxShadow: "0 2px 12px rgba(0,0,0,0.03)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24 }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#999", marginBottom: 10 }}>Recent activity</div>
              <h2 style={{ fontSize: 22, fontWeight: 300, letterSpacing: "-0.03em", color: "#0a0a0a", margin: 0, lineHeight: 1.2 }}>
                Keep your{" "}
                <em style={{ fontFamily: "'DM Serif Display', serif", fontStyle: "italic" }}>reading streak</em>{" "}
                visible.
              </h2>
            </div>
            <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#999", background: "#f5f5f5", padding: "6px 12px", borderRadius: 100 }}>
              2 latest
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { id: 1, date: "Today · 09:15",      type: "IELTS full test",  topic: "Academic Reading Practice 4",   score: 7.5, correct: 32, total: 40, href: "/app/reading/results/1" },
              { id: 2, date: "Yesterday · 18:30",  type: "Article drill",    topic: "The Evolution of Architecture", score: 7.0, correct: 10, total: 10, href: "/app/reading/results/2" },
            ].map((session) => (
              <Link
                key={session.id}
                to={session.href}
                className="session-row"
                style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  background: "#fafafa",
                  border: "1px solid #f0f0f0",
                  borderRadius: 16,
                  padding: "16px 18px",
                  textDecoration: "none",
                  color: "inherit",
                  gap: 16,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{
                    width: 46, height: 46,
                    background: "#0a0a0a",
                    borderRadius: "50%",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 16, fontWeight: 300, color: "#fff", letterSpacing: "-0.04em",
                    flexShrink: 0,
                  }}>
                    {session.score.toFixed(1)}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#0a0a0a", marginBottom: 5 }}>{session.topic}</div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {[session.type, `${session.correct}/${session.total} correct`, session.date].map(t => (
                        <span key={t} style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#bbb" }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, color: "#bbb", flexShrink: 0 }}>
                  Open result
                  <div style={{ width: 30, height: 30, background: "#f0f0f0", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <ArrowUpRight size={13} color="#555" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}