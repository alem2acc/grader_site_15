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
