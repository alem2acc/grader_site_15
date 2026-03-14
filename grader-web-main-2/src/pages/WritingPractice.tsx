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
  Moderate:    { bg: "#fffbeb", color: "#d97706" },
  Challenging: { bg: "#fff1f2", color: "#e11d48" },
  Advanced:    { bg: "#fdf4ff", color: "#7c3aed" },
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

  const wordCount = essay.trim() ? essay.trim().split(/\s+/).length : 0;

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
      const evaluation = await evaluateWriting(essay, taskNum, selected.prompt);
      const ref = await addDoc(collection(db, "users", user.uid, "sessions"), {
        type: "writing",
        task: taskNum,
        topic: selected.category,
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
  const diffs = ["All", "Moderate", "Challenging", "Advanced"];
  const filtered = TOPICS.filter((t) => {
    const matchSearch = t.category.toLowerCase().includes(search.toLowerCase()) ||
                        t.prompt.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "All" || t.type === typeFilter;
    const matchDiff = diffFilter === "All" || t.difficulty === diffFilter;
    return matchSearch && matchType && matchDiff;
  });

  const getRandomTopic = () => {
    const pool = filtered.length ? filtered : TOPICS;
    startWriting(pool[Math.floor(Math.random() * pool.length)]);
  };

  /* chart config for task1 */
  const chartConfig = selected ? CHART_CONFIGS[selected.id] : undefined;

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
            <h2 style={{ fontSize: 20, fontWeight: 500, color: "#0a0a0a", marginBottom: 18, lineHeight: 1.45 }}>{selected.category}</h2>
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
                    <div style={{ fontSize: 14, fontWeight: 500, color: "#0a0a0a", marginBottom: 6 }}>{topic.category}</div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.10em", background: TYPE_COLOR[topic.type]?.bg || "#f5f5f5", color: TYPE_COLOR[topic.type]?.color || "#777", borderRadius: 100, padding: "3px 9px" }}>{topic.type}</span>
                      <span style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.10em", background: DIFF_COLOR[topic.difficulty]?.bg || "#f5f5f5", color: DIFF_COLOR[topic.difficulty]?.color || "#777", borderRadius: 100, padding: "3px 9px" }}>{topic.difficulty}</span>
                      <span style={{ fontSize: 11, color: "#bbb" }}>{topic.category}</span>
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
