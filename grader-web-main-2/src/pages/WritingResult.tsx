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
