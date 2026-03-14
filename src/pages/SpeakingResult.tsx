import { Link, useParams } from "react-router-dom";
import { ChevronLeft, Mic, CheckCircle2, AlertCircle, Loader2, Clock, BookOpen, Wind, Hammer, Waves } from "lucide-react";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";

export function SpeakingResult() {
  const { id } = useParams();
  const { user } = useAuth();
  const [session, setSession] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id || !user) return;
    getDoc(doc(db, "users", user.uid, "sessions", id)).then((snap) => {
      if (snap.exists()) setSession(snap.data() as Record<string, unknown>);
      setLoading(false);
    });
  }, [id, user]);

  if (loading) return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "80vh" }}>
      <style>{"@keyframes spin { to { transform: rotate(360deg); } }"}</style>
      <div style={{ width: 40, height: 40, borderRadius: "50%", border: "2px solid #e8e8e8", borderTopColor: "#0a0a0a", animation: "spin 0.8s linear infinite" }} />
    </div>
  );

  if (!session) return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", gap: 16 }}>
      <p style={{ color: "#999", fontSize: 14 }}>Session not found.</p>
      <Link to="/app/speaking" style={{ padding: "9px 20px", background: "#0a0a0a", color: "#fff", borderRadius: 100, fontSize: 13, fontWeight: 600, textDecoration: "none" }}>Back to Speaking</Link>
    </div>
  );

  const ev = session.evaluation as Record<string, unknown>;
  const overall = (ev?.overallBand as number) || 0;
  const annotated = ev?.annotatedTranscript as Array<{ text: string; type: string; tooltip?: string }> | undefined;
  const durationSec = (session?.duration as number) || 0;
  const rawTranscript = (session?.transcript as string) || "";
  const wordCount = rawTranscript.split(/\s+/).filter(Boolean).length;
  const wpm = durationSec > 0 ? Math.round((wordCount / durationSec) * 60) : 0;
  const cefr = overall >= 8.5 ? "C2" : overall >= 7 ? "C1" : overall >= 5.5 ? "B2" : overall >= 4 ? "B1" : "A2";
  const dateFmt = session.createdAt ? new Date((session.createdAt as { seconds: number }).seconds * 1000).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "Today";
  const personalizedTips = (ev?.personalizedTips as string[]) || ["Speak more naturally.", "Use a wider range of vocabulary.", "Pay attention to pronunciation and intonation."];

  const subScores = [
    { label: "Fluency & Coherence", score: (ev?.fluencyCoherence as number) || 0, icon: Wind },
    { label: "Lexical Resource",    score: (ev?.lexicalResource    as number) || 0, icon: BookOpen },
    { label: "Grammatical Range",   score: (ev?.grammaticalRange   as number) || 0, icon: Hammer },
    { label: "Pronunciation",       score: (ev?.pronunciation      as number) || 0, icon: Mic },
  ];

  const bandColor = overall >= 7.5 ? "#16a34a" : overall >= 6 ? "#d97706" : "#e11d48";
  const bandBg    = overall >= 7.5 ? "#f0faf4" : overall >= 6 ? "#fffbeb" : "#fff1f2";

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#fafafa", minHeight: "100vh", paddingBottom: 64 }}>
      <style>{`
        * { -webkit-font-smoothing: antialiased; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .tooltip-wrap:hover .tooltip-box { opacity: 1; visibility: visible; }
      `}</style>

      {/* Top nav */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e8e8e8", padding: "16px 40px", display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
        <Link to="/app/speaking" style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid #e8e8e8", display: "flex", alignItems: "center", justifyContent: "center", color: "#777", textDecoration: "none" }}>
          <ChevronLeft size={16} />
        </Link>
        <div>
          <div style={{ fontSize: 16, fontWeight: 500, color: "#0a0a0a" }}>Speaking Analysis</div>
          <div style={{ fontSize: 11, color: "#bbb" }}>Part {session.part as number} · {dateFmt}</div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px" }}>

        {/* Score hero */}
        <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 16, marginBottom: 20 }}>

          {/* Overall band */}
          <div style={{ background: "#0a0a0a", borderRadius: 24, padding: "32px 28px", textAlign: "center" }}>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#555", marginBottom: 16 }}>Overall Band</div>
            <div style={{ fontSize: 80, fontWeight: 300, letterSpacing: "-0.06em", color: "#fff", lineHeight: 1, marginBottom: 8 }}>{overall.toFixed(1)}</div>
            <div style={{ display: "inline-block", padding: "4px 12px", borderRadius: 100, background: bandBg, color: bandColor, fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              {cefr}
            </div>
          </div>

          {/* Sub scores */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {subScores.map((s) => (
              <div key={s.label} style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 20, padding: "20px 22px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                  <s.icon size={14} color="#bbb" />
                  <div style={{ fontSize: 28, fontWeight: 300, letterSpacing: "-0.04em", color: "#0a0a0a" }}>{s.score.toFixed(1)}</div>
                </div>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#bbb", marginBottom: 8 }}>{s.label}</div>
                <div style={{ height: 3, background: "#f0f0f0", borderRadius: 2, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${(s.score / 9) * 100}%`, background: "#0a0a0a", borderRadius: 2, transition: "width 1s ease" }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats bar */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 20 }}>
          {[
            { label: "Duration",     value: `${Math.floor(durationSec / 60)}m ${durationSec % 60}s` },
            { label: "Speech Speed", value: `${wpm} WPM` },
            { label: "CEFR Level",   value: cefr },
            { label: "Word Count",   value: String(wordCount) },
          ].map((s) => (
            <div key={s.label} style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 16, padding: "14px 18px" }}>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#bbb", marginBottom: 6 }}>{s.label}</div>
              <div style={{ fontSize: 22, fontWeight: 300, letterSpacing: "-0.04em", color: "#0a0a0a" }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Main split */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 16 }}>

          {/* Annotated transcript */}
          <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 24, overflow: "hidden" }}>
            <div style={{ padding: "18px 24px", borderBottom: "1px solid #f0f0f0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: "#0a0a0a" }}>Annotated Transcript</div>
              <div style={{ display: "flex", gap: 14 }}>
                {[{ color: "#16a34a", label: "Advanced" }, { color: "#d97706", label: "Flagged" }, { color: "#e11d48", label: "Error" }].map((l) => (
                  <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "#999" }}>
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: l.color, display: "inline-block" }} />
                    {l.label}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ padding: "22px 26px", maxHeight: 400, overflowY: "auto", fontSize: 15, lineHeight: 2.1, color: "#555" }}>
              {!annotated ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: 200, color: "#ddd", textAlign: "center" }}>
                  <Waves size={32} style={{ marginBottom: 10 }} />
                  <p style={{ fontSize: 13, margin: 0 }}>Transcript data unavailable for this session.</p>
                </div>
              ) : (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "2px 0" }}>
                  {annotated.map((seg, i) => {
                    if (seg.type === "good") return (
                      <span key={i} className="tooltip-wrap" style={{ position: "relative", display: "inline-block", margin: "0 2px" }}>
                        <span style={{ background: "#f0faf4", color: "#16a34a", borderRadius: 6, padding: "1px 5px", cursor: seg.tooltip ? "help" : "default", fontSize: 15 }}>{seg.text}</span>
                        {seg.tooltip && <span className="tooltip-box" style={{ position: "absolute", bottom: "calc(100% + 6px)", left: "50%", transform: "translateX(-50%)", background: "#0a0a0a", color: "#fff", fontSize: 11, padding: "6px 10px", borderRadius: 8, whiteSpace: "nowrap", opacity: 0, visibility: "hidden", transition: "opacity 0.15s", zIndex: 10, maxWidth: 220, whiteSpaceCollapse: "collapse" as any }}>{seg.tooltip}</span>}
                      </span>
                    );
                    if (seg.type === "improve") return (
                      <span key={i} className="tooltip-wrap" style={{ position: "relative", display: "inline-block", margin: "0 2px" }}>
                        <span style={{ background: "#fffbeb", color: "#d97706", borderRadius: 6, padding: "1px 5px", cursor: seg.tooltip ? "help" : "default", fontSize: 15 }}>{seg.text}</span>
                        {seg.tooltip && <span className="tooltip-box" style={{ position: "absolute", bottom: "calc(100% + 6px)", left: "50%", transform: "translateX(-50%)", background: "#0a0a0a", color: "#fff", fontSize: 11, padding: "6px 10px", borderRadius: 8, whiteSpace: "nowrap", opacity: 0, visibility: "hidden", transition: "opacity 0.15s", zIndex: 10 }}>{seg.tooltip}</span>}
                      </span>
                    );
                    if (seg.type === "error") return (
                      <span key={i} className="tooltip-wrap" style={{ position: "relative", display: "inline-block", margin: "0 2px" }}>
                        <span style={{ color: "#e11d48", borderBottom: "2px solid #fca5a5", cursor: seg.tooltip ? "help" : "default", fontSize: 15 }}>{seg.text}</span>
                        {seg.tooltip && <span className="tooltip-box" style={{ position: "absolute", bottom: "calc(100% + 6px)", left: "50%", transform: "translateX(-50%)", background: "#0a0a0a", color: "#fff", fontSize: 11, padding: "6px 10px", borderRadius: 8, whiteSpace: "nowrap", opacity: 0, visibility: "hidden", transition: "opacity 0.15s", zIndex: 10 }}>{seg.tooltip}</span>}
                      </span>
                    );
                    return <span key={i} style={{ margin: "0 2px", fontSize: 15 }}>{seg.text} </span>;
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Right column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

            {/* Strengths */}
            <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 20, padding: "20px 22px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <CheckCircle2 size={14} color="#16a34a" />
                <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#16a34a" }}>Strengths</div>
              </div>
              <p style={{ fontSize: 13, color: "#555", lineHeight: 1.7, margin: 0 }}>{(ev?.strengths as string) || "Not analyzed."}</p>
            </div>

            {/* Areas to fix */}
            <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 20, padding: "20px 22px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <AlertCircle size={14} color="#d97706" />
                <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#d97706" }}>Areas to Fix</div>
              </div>
              <p style={{ fontSize: 13, color: "#555", lineHeight: 1.7, margin: 0 }}>{(ev?.areasToFix as string) || "Not analyzed."}</p>
            </div>

            {/* Tips */}
            <div style={{ background: "#0a0a0a", border: "1px solid #1e1e1e", borderRadius: 20, padding: "20px 22px", flex: 1 }}>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#555", marginBottom: 14 }}>AI Tips</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {personalizedTips.map((tip, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ flexShrink: 0, width: 20, height: 20, borderRadius: "50%", background: "#1e1e1e", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 600, color: "#555", marginTop: 1 }}>{i + 1}</span>
                    <p style={{ fontSize: 13, color: "#888", lineHeight: 1.65, margin: 0 }}>{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
