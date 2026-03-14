import { Link } from "react-router-dom";
import { Mic, Clock, ArrowUpRight, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { collection, query, where, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";

export function Speaking() {
  const { user } = useAuth();
  const [sessions, setSessions] = useState<Array<Record<string, unknown>>>([]);
  const [avgScore, setAvgScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchSessions = async () => {
      try {
        const snap = await getDocs(
          query(collection(db, "users", user.uid, "sessions"), where("type", "==", "speaking"), orderBy("createdAt", "desc"), limit(5))
        );
        processSnap(snap.docs);
      } catch (err: any) {
        if (err.message?.includes("index")) {
          try {
            const fallback = await getDocs(query(collection(db, "users", user.uid, "sessions"), where("type", "==", "speaking")));
            const docs = fallback.docs.sort((a, b) => (b.data().createdAt?.seconds || 0) - (a.data().createdAt?.seconds || 0));
            processSnap(docs.slice(0, 5));
          } catch { setLoading(false); }
        } else { setLoading(false); }
      }
    };
    const processSnap = (docs: any[]) => {
      const data = docs.map((d) => ({ id: d.id, ...d.data() }));
      setSessions(data);
      if (data.length) setAvgScore(data.reduce((s, x) => s + ((x.evaluation as any)?.overallBand || 0), 0) / data.length);
      setLoading(false);
    };
    fetchSessions();
  }, [user]);

  const PARTS = [
    { part: "P1", label: "Introduction",  time: "4–5 min", desc: "Answer general questions about yourself, your home, family, job, studies, and interests.", link: "/app/speaking/practice?part=1" },
    { part: "P2", label: "Long Turn",     time: "3–4 min", desc: "Speak for 1–2 minutes on a cue card topic. You have 1 minute to prepare your thoughts.", link: "/app/speaking/practice?part=2", featured: true },
    { part: "P3", label: "Discussion",    time: "4–5 min", desc: "Discuss abstract issues and concepts related to the Part 2 topic in depth.", link: "/app/speaking/practice?part=3" },
  ];

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#fafafa", minHeight: "100vh" }}>
      <style>{`
        * { -webkit-font-smoothing: antialiased; }
        .sp-part:hover { background: #f5f5f5 !important; }
        .sp-part-feat:hover { background: #1a1a1a !important; }
        .sp-session:hover { background: #fafafa !important; }
        .sp-btn:hover { opacity: 0.8; }
        .sp-bar { animation: sp-bounce 1.2s ease-in-out infinite alternate; }
        @keyframes sp-bounce { from { transform: scaleY(0.4); } to { transform: scaleY(1); } }
      `}</style>

      {/* Hero */}
      <div style={{ background: "#0a0a0a", padding: "44px 40px 40px", marginBottom: 28 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#555", marginBottom: 14 }}>Speaking Hub</div>
            <h1 style={{ fontSize: 42, fontWeight: 300, letterSpacing: "-0.05em", color: "#fff", margin: "0 0 14px", lineHeight: 1.1 }}>
              Master your{" "}
              <em style={{ fontFamily: "'DM Serif Display', serif", fontStyle: "italic" }}>Fluency</em>
            </h1>
            <p style={{ fontSize: 14, color: "#555", lineHeight: 1.75, maxWidth: 380, margin: 0 }}>
              Real-time voice analysis with AI scoring across all four IELTS speaking criteria.
            </p>
          </div>

          {/* Score + waveform widget */}
          <div style={{ background: "#141414", border: "1px solid #1e1e1e", borderRadius: 20, padding: "24px 28px", minWidth: 180, textAlign: "center" }}>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#555", marginBottom: 12 }}>Avg Band</div>
            <div style={{ fontSize: 48, fontWeight: 300, letterSpacing: "-0.05em", color: "#fff", lineHeight: 1, marginBottom: 16 }}>
              {loading ? "…" : avgScore ? avgScore.toFixed(1) : "—"}
            </div>
            {/* Waveform bars */}
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 3, height: 28 }}>
              {[0.4,0.8,0.6,1,0.7,0.9,0.5,0.75,0.85,0.6,0.95,0.5].map((h, i) => (
                <div key={i} className="sp-bar" style={{ width: 4, background: "#333", borderRadius: 2, height: `${h * 100}%`, animationDelay: `${i * 0.08}s` }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px 56px" }}>

        {/* Practice Parts */}
        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#bbb", marginBottom: 14 }}>Practice Modes</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 40 }}>
          {PARTS.map((p) => p.featured ? (
            <div key={p.part} className="sp-part-feat" style={{ background: "#0a0a0a", borderRadius: 20, padding: "28px 26px", border: "1px solid #1e1e1e", display: "flex", flexDirection: "column", justifyContent: "space-between", transition: "background 0.15s" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
                  <div style={{ fontSize: 22, fontWeight: 300, letterSpacing: "-0.04em", color: "#fff" }}>{p.part}</div>
                  <span style={{ fontSize: 11, color: "#555", fontWeight: 500 }}><Clock size={10} style={{ display: "inline", verticalAlign: "middle", marginRight: 4 }} />{p.time}</span>
                </div>
                <div style={{ fontSize: 15, fontWeight: 500, color: "#fff", marginBottom: 8 }}>{p.label}</div>
                <p style={{ fontSize: 13, color: "#666", lineHeight: 1.65, margin: 0 }}>{p.desc}</p>
              </div>
              <Link to={p.link} className="sp-btn" style={{ marginTop: 24, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 16px", background: "#fff", borderRadius: 100, textDecoration: "none", fontSize: 13, fontWeight: 600, color: "#0a0a0a", transition: "opacity 0.2s" }}>
                Start Practice <ArrowUpRight size={14} />
              </Link>
            </div>
          ) : (
            <div key={p.part} className="sp-part" style={{ background: "#fff", borderRadius: 20, padding: "28px 26px", border: "1px solid #e8e8e8", display: "flex", flexDirection: "column", justifyContent: "space-between", transition: "background 0.15s" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
                  <div style={{ fontSize: 22, fontWeight: 300, letterSpacing: "-0.04em", color: "#0a0a0a" }}>{p.part}</div>
                  <span style={{ fontSize: 11, color: "#bbb", fontWeight: 500 }}><Clock size={10} style={{ display: "inline", verticalAlign: "middle", marginRight: 4 }} />{p.time}</span>
                </div>
                <div style={{ fontSize: 15, fontWeight: 500, color: "#0a0a0a", marginBottom: 8 }}>{p.label}</div>
                <p style={{ fontSize: 13, color: "#777", lineHeight: 1.65, margin: 0 }}>{p.desc}</p>
              </div>
              <Link to={p.link} className="sp-btn" style={{ marginTop: 24, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 16px", background: "#0a0a0a", borderRadius: 100, textDecoration: "none", fontSize: 13, fontWeight: 600, color: "#fff", transition: "opacity 0.2s" }}>
                Start Practice <ArrowUpRight size={14} />
              </Link>
            </div>
          ))}
        </div>

        {/* Scoring criteria */}
        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#bbb", marginBottom: 14 }}>Scoring Criteria</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 40 }}>
          {[
            { label: "Fluency & Coherence",   short: "FC", desc: "Smooth delivery and logical flow of ideas" },
            { label: "Lexical Resource",       short: "LR", desc: "Range and accuracy of vocabulary" },
            { label: "Grammatical Range",      short: "GR", desc: "Variety and accuracy of grammar structures" },
            { label: "Pronunciation",          short: "PR", desc: "Clarity and naturalness of speech sounds" },
          ].map((c) => (
            <div key={c.short} style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 16, padding: "18px 18px 16px" }}>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#bbb", marginBottom: 8 }}>{c.short}</div>
              <div style={{ fontSize: 13, fontWeight: 500, color: "#0a0a0a", marginBottom: 6 }}>{c.label}</div>
              <div style={{ fontSize: 12, color: "#999", lineHeight: 1.55 }}>{c.desc}</div>
            </div>
          ))}
        </div>

        {/* Recent sessions */}
        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#bbb", marginBottom: 14 }}>Recent Sessions</div>
        {loading ? (
          <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#bbb", fontSize: 13 }}>
            <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} /> Loading…
            <style>{"@keyframes spin { to { transform: rotate(360deg); } }"}</style>
          </div>
        ) : sessions.length === 0 ? (
          <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 20, padding: "32px", textAlign: "center", color: "#bbb", fontSize: 13 }}>
            No sessions yet — start your first practice above.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {sessions.map((s) => {
              const ev = s.evaluation as Record<string, number>;
              const score = ev?.overallBand || 0;
              const date = s.createdAt ? new Date((s.createdAt as any).seconds * 1000).toLocaleDateString("en-GB", { day: "numeric", month: "short" }) : "";
              return (
                <Link key={s.id as string} to={`/app/speaking/results/${s.id}`} className="sp-session" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 22px", background: "#fff", borderRadius: 16, border: "1px solid #e8e8e8", textDecoration: "none", transition: "background 0.15s" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#fafafa", border: "1px solid #e8e8e8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 300, letterSpacing: "-0.04em", color: "#0a0a0a", flexShrink: 0 }}>
                      {score.toFixed(1)}
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 500, color: "#0a0a0a", marginBottom: 4 }}>{s.topic as string}</div>
                      <div style={{ display: "flex", gap: 10 }}>
                        <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", background: "#f5f5f5", color: "#777", borderRadius: 100, padding: "2px 8px" }}>Part {s.part as number}</span>
                        <span style={{ fontSize: 11, color: "#bbb" }}>{date}</span>
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight size={14} color="#ccc" />
                </Link>
              );
            })}
          </div>
        )}
      </div>
      {false && <Mic />}
    </div>
  );
}
