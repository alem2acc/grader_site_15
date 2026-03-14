import { Link, useParams } from "react-router-dom";
import { ChevronLeft, CheckCircle2, XCircle, Target } from "lucide-react";
import { useState } from "react";

export function ListeningResult() {
  const { id } = useParams();

  // Mock data — replace with real Firebase fetch when audio tests go live
  const questions = Array.from({ length: 40 }, (_, i) => ({
    id: i + 1,
    correct: Math.random() > 0.15,
    type: i < 10 ? "Form Completion" : i < 20 ? "Multiple Choice" : i < 30 ? "Matching" : "Sentence Completion",
  }));

  const correctCount = questions.filter((q) => q.correct).length;
  const score =
    correctCount >= 39 ? 9.0 : correctCount >= 37 ? 8.5 : correctCount >= 35 ? 8.0 :
    correctCount >= 33 ? 7.5 : correctCount >= 30 ? 7.0 : correctCount >= 27 ? 6.5 :
    correctCount >= 23 ? 6.0 : 5.5;

  const accuracy = Math.round((correctCount / 40) * 100);
  const bandColor = score >= 7.5 ? "#16a34a" : score >= 6 ? "#d97706" : "#e11d48";
  const bandBg    = score >= 7.5 ? "#f0faf4" : score >= 6 ? "#fffbeb" : "#fff1f2";

  const TYPE_ACCURACY: Record<string, { correct: number; total: number }> = {};
  questions.forEach((q) => {
    if (!TYPE_ACCURACY[q.type]) TYPE_ACCURACY[q.type] = { correct: 0, total: 0 };
    TYPE_ACCURACY[q.type].total++;
    if (q.correct) TYPE_ACCURACY[q.type].correct++;
  });

  const [hover, setHover] = useState<number | null>(null);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#fafafa", minHeight: "100vh", paddingBottom: 64 }}>
      <style>{"* { -webkit-font-smoothing: antialiased; }"}</style>

      {/* Top nav */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e8e8e8", padding: "16px 40px", display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
        <Link to="/app/listening" style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid #e8e8e8", display: "flex", alignItems: "center", justifyContent: "center", color: "#777", textDecoration: "none" }}>
          <ChevronLeft size={16} />
        </Link>
        <div>
          <div style={{ fontSize: 16, fontWeight: 500, color: "#0a0a0a" }}>Listening Analysis</div>
          <div style={{ fontSize: 11, color: "#bbb" }}>Test #{id || "—"} · Academic Full Test</div>
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 40px" }}>

        {/* Score hero */}
        <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 16, marginBottom: 20 }}>
          <div style={{ background: "#0a0a0a", borderRadius: 24, padding: "32px 24px", textAlign: "center" }}>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#555", marginBottom: 16 }}>Band Score</div>
            <div style={{ fontSize: 80, fontWeight: 300, letterSpacing: "-0.06em", color: "#fff", lineHeight: 1, marginBottom: 10 }}>{score.toFixed(1)}</div>
            <div style={{ fontSize: 13, color: "#555", marginBottom: 12 }}>{correctCount} / 40 correct</div>
            <div style={{ display: "inline-block", padding: "4px 12px", borderRadius: 100, background: bandBg, color: bandColor, fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              {accuracy}% accuracy
            </div>
          </div>

          {/* Type breakdown */}
          <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 24, padding: "24px 26px" }}>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#bbb", marginBottom: 18 }}>Question Type Accuracy</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {Object.entries(TYPE_ACCURACY).map(([type, { correct, total }]) => {
                const pct = Math.round((correct / total) * 100);
                return (
                  <div key={type}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ fontSize: 13, color: "#333", fontWeight: 500 }}>{type}</span>
                      <span style={{ fontSize: 13, color: "#777" }}>{correct}/{total} · {pct}%</span>
                    </div>
                    <div style={{ height: 4, background: "#f0f0f0", borderRadius: 2, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${pct}%`, background: pct >= 80 ? "#16a34a" : pct >= 60 ? "#d97706" : "#e11d48", borderRadius: 2, transition: "width 0.8s ease" }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 20 }}>
          {[
            { label: "Time Taken",   value: "30:00" },
            { label: "Correct",      value: `${correctCount} / 40` },
            { label: "Band Score",   value: score.toFixed(1) },
          ].map((s) => (
            <div key={s.label} style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 16, padding: "16px 20px" }}>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#bbb", marginBottom: 6 }}>{s.label}</div>
              <div style={{ fontSize: 26, fontWeight: 300, letterSpacing: "-0.04em", color: "#0a0a0a" }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Question grid */}
        <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 24, padding: "26px 28px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
            <Target size={14} color="#bbb" />
            <div style={{ fontSize: 13, fontWeight: 500, color: "#0a0a0a" }}>Question Review</div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(10, 1fr)", gap: 8 }}>
            {questions.map((q) => (
              <div
                key={q.id}
                onMouseEnter={() => setHover(q.id)}
                onMouseLeave={() => setHover(null)}
                title={`Q${q.id} · ${q.type} · ${q.correct ? "Correct" : "Incorrect"}`}
                style={{
                  aspectRatio: "1", borderRadius: 10, display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center", cursor: "pointer",
                  border: `1px solid ${q.correct ? "#bbf7d0" : "#fecaca"}`,
                  background: q.correct ? (hover === q.id ? "#dcfce7" : "#f0faf4") : (hover === q.id ? "#fee2e2" : "#fff1f2"),
                  transition: "background 0.12s",
                }}
              >
                <span style={{ fontSize: 9, fontWeight: 600, color: q.correct ? "#16a34a" : "#e11d48", opacity: 0.7, marginBottom: 2 }}>{q.id}</span>
                {q.correct
                  ? <CheckCircle2 size={13} color="#16a34a" />
                  : <XCircle size={13} color="#e11d48" />}
              </div>
            ))}
          </div>

          <div style={{ marginTop: 18, paddingTop: 16, borderTop: "1px solid #f5f5f5", display: "flex", gap: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12, color: "#777" }}>
              <div style={{ width: 14, height: 14, borderRadius: 4, background: "#f0faf4", border: "1px solid #bbf7d0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <CheckCircle2 size={9} color="#16a34a" />
              </div>
              Correct ({correctCount})
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12, color: "#777" }}>
              <div style={{ width: 14, height: 14, borderRadius: 4, background: "#fff1f2", border: "1px solid #fecaca", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <XCircle size={9} color="#e11d48" />
              </div>
              Incorrect ({40 - correctCount})
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
