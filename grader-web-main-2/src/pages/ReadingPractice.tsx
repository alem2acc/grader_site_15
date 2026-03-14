import React, { useState, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle2,
  BookOpen,
  Trophy,
  RotateCcw,
  Target,
  FileText,
  ArrowRight,
  ArrowUpRight,
  BarChart2,
} from "lucide-react";
import { TESTS, GENERAL_TESTS, getBandScore, type QuestionGroup, type IELTSTest, type GeneralReadingTest } from "@/data/readingTests";

const PARA_LABELS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

export default function ReadingPractice() {
  const [searchParams] = useSearchParams();
  const [screen, setScreen] = useState<"select" | "test" | "results">("select");
  const [testMode, setTestMode] = useState<"ielts" | "general">("ielts");
  const [testIdx, setTestIdx] = useState(0);
  const [passageIdx, setPassageIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(3600);
  const [fontSize, setFontSize] = useState<"normal" | "large">("normal");
  const [showReview, setShowReview] = useState(false);

  const passageRef = useRef<HTMLDivElement>(null);
  const questionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tMode = searchParams.get("type") === "general" ? "general" : "ielts";
    const t = parseInt(searchParams.get("test") ?? "", 10);
    const testsArr = tMode === "general" ? GENERAL_TESTS : TESTS;
    if (!isNaN(t) && t >= 0 && t < testsArr.length) {
      setTestMode(tMode); setTestIdx(t); setPassageIdx(0);
      setAnswers({}); setTimeLeft(tMode === "general" ? 900 : 3600); setScreen("test");
    }
  }, []);

  const currentTest: IELTSTest | GeneralReadingTest = (testMode === "general" ? GENERAL_TESTS : TESTS)[testIdx] || TESTS[0];
  const currentPassage = currentTest.passages[passageIdx];
  const answeredCount = Object.keys(answers).length;
  const totalQuestions = getTotalQuestions(currentTest);
  const overallProgress = totalQuestions ? Math.round((answeredCount / totalQuestions) * 100) : 0;

  useEffect(() => {
    if (screen !== "test") return;
    if (timeLeft <= 0) { setScreen("results"); return; }
    const id = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(id);
  }, [screen, timeLeft]);

  useEffect(() => {
    passageRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    questionsRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [passageIdx]);

  function formatTime(s: number) {
    return Math.floor(s / 60).toString().padStart(2, "0") + ":" + (s % 60).toString().padStart(2, "0");
  }

  function handleAnswer(qId: string, value: string) {
    setAnswers(prev => ({ ...prev, [qId]: value }));
  }

  function startTest(idx: number, tMode: "ielts" | "general" = "ielts") {
    setTestMode(tMode); setTestIdx(idx); setPassageIdx(0);
    setAnswers({}); setTimeLeft(tMode === "general" ? 900 : 3600); setScreen("test");
  }

  function calcScore(test: IELTSTest | GeneralReadingTest) {
    let correct = 0;
    for (const p of test.passages)
      for (const g of p.questions)
        for (const item of g.items) {
          if (!item.answer) continue;
          const u = (answers[item.id] ?? "").toLowerCase().trim();
          const c = item.answer.toLowerCase().trim();
          if (u === c || (g.type === "short-answer" && u.length > 3 && (c.includes(u) || u.includes(c)))) correct++;
        }
    return correct;
  }

  function passageScore(pi: number) {
    let correct = 0;
    const p = currentTest.passages[pi];
    for (const g of p.questions)
      for (const item of g.items) {
        if (!item.answer) continue;
        const u = (answers[item.id] ?? "").toLowerCase().trim();
        const c = item.answer.toLowerCase().trim();
        if (u === c || (g.type === "short-answer" && u.length > 3 && (c.includes(u) || u.includes(c)))) correct++;
      }
    return { correct, total: p.questions.reduce((s, g) => s + g.items.length, 0) };
  }

  function getTotalQuestions(test: IELTSTest | GeneralReadingTest) {
    return test.passages.reduce((t, p) => t + p.questions.reduce((s, g) => s + g.items.length, 0), 0);
  }

  // ── QUESTION RENDERERS ──────────────────────────────────────────────────────────

  function renderGroup(group: QuestionGroup, passage: typeof currentPassage) {
    const baseItem = (id: string, children: React.ReactNode) => (
      <div key={id} style={{ background: "#fafafa", border: "1px solid #f0f0f0", borderRadius: 14, padding: "16px 18px", marginBottom: 10 }}>
        {children}
      </div>
    );

    const qNum = (id: string) => (
      <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 26, height: 26, background: "#f0f0f0", borderRadius: 8, fontSize: 11, fontWeight: 700, color: "#555", flexShrink: 0 }}>{id}</span>
    );

    const optBtn = (id: string, opt: string, label: string, active: boolean, color = "#0a0a0a") => (
      <button
        key={opt}
        onClick={() => handleAnswer(id, opt)}
        style={{
          flex: 1, padding: "9px 12px", borderRadius: 10, fontSize: 13, fontWeight: 600,
          border: active ? `2px solid ${color}` : "2px solid #e8e8e8",
          background: active ? color : "#fff",
          color: active ? "#fff" : "#555",
          cursor: "pointer", transition: "all 0.15s",
        }}
      >{label}</button>
    );

    switch (group.type) {
      case "tfng":
        return group.items.map(item => baseItem(item.id, (
          <>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12 }}>
              {qNum(item.id)}
              <span style={{ fontSize: 14, color: "#333", lineHeight: 1.6 }}>{item.text}</span>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {["True", "False", "Not Given"].map(opt => optBtn(item.id, opt, opt, answers[item.id] === opt))}
            </div>
          </>
        )));

      case "ynng":
        return group.items.map(item => baseItem(item.id, (
          <>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12 }}>
              {qNum(item.id)}
              <span style={{ fontSize: 14, color: "#333", lineHeight: 1.6 }}>{item.text}</span>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {["Yes", "No", "Not Given"].map(opt => optBtn(item.id, opt, opt, answers[item.id] === opt))}
            </div>
          </>
        )));

      case "multiple-choice":
        return group.items.map(item => (
          <div key={item.id} style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 14, padding: "18px", marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 14 }}>
              {qNum(item.id)}
              <span style={{ fontSize: 14, fontWeight: 600, color: "#0a0a0a", lineHeight: 1.5 }}>{item.text}</span>
            </div>
            {(item.options ?? []).map(opt => (
              <button
                key={opt.value}
                onClick={() => handleAnswer(item.id, opt.value)}
                style={{
                  display: "flex", alignItems: "flex-start", gap: 10, width: "100%", textAlign: "left",
                  padding: "11px 14px", borderRadius: 10, marginBottom: 6,
                  border: answers[item.id] === opt.value ? "2px solid #0a0a0a" : "2px solid #f0f0f0",
                  background: answers[item.id] === opt.value ? "#fafafa" : "#fff",
                  cursor: "pointer", transition: "all 0.15s",
                }}
              >
                <span style={{
                  width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 10, fontWeight: 700,
                  background: answers[item.id] === opt.value ? "#0a0a0a" : "#f0f0f0",
                  color: answers[item.id] === opt.value ? "#fff" : "#888",
                }}>{opt.value}</span>
                <span style={{ fontSize: 13, color: "#333", lineHeight: 1.55 }}>{opt.label}</span>
              </button>
            ))}
          </div>
        ));

      case "matching-headings":
        return (
          <div style={{ background: "#fafafa", border: "1px solid #f0f0f0", borderRadius: 16, padding: 20 }}>
            <div style={{ background: "#fff", border: "1px solid #ebebeb", borderRadius: 12, padding: "14px 16px", marginBottom: 16 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#bbb", marginBottom: 10 }}>Options Bank</div>
              {(group.bank ?? []).map(h => (
                <div key={h.value} style={{ display: "flex", gap: 10, padding: "6px 0", borderBottom: "1px solid #f5f5f5" }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#0a0a0a", minWidth: 24 }}>{h.value}</span>
                  <span style={{ fontSize: 13, color: "#555" }}>{h.label}</span>
                </div>
              ))}
            </div>
            {group.items.map(item => (
              <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, background: "#fff", border: "1px solid #ebebeb", borderRadius: 10, padding: "10px 14px" }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#0a0a0a", minWidth: 28 }}>{item.id}</span>
                <span style={{ fontSize: 13, color: "#555", flex: 1 }}>{item.text}</span>
                <select
                  value={answers[item.id] ?? ""}
                  onChange={e => handleAnswer(item.id, e.target.value)}
                  style={{ fontSize: 13, fontWeight: 600, border: "2px solid #e8e8e8", borderRadius: 8, padding: "6px 10px", background: "#fafafa", color: "#0a0a0a", outline: "none", cursor: "pointer" }}
                >
                  <option value="" disabled>Select...</option>
                  {(group.bank ?? []).map(h => (
                    <option key={h.value} value={h.value}>{h.value} — {h.label.substring(0, 38)}{h.label.length > 38 ? "…" : ""}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        );

      case "matching-info":
        return (
          <div>
            <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 10, padding: "10px 14px", marginBottom: 14, fontSize: 12, color: "#92400e" }}>
              Match to paragraphs: <strong>{PARA_LABELS.slice(0, passage.paragraphs.length).join(", ")}</strong>
            </div>
            {group.items.map(item => (
              <div key={item.id} style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 14, padding: "16px 18px", marginBottom: 10 }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12 }}>
                  {qNum(item.id)}
                  <span style={{ fontSize: 14, color: "#333", lineHeight: 1.6 }}>{item.text}</span>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, paddingLeft: 36 }}>
                  {PARA_LABELS.slice(0, passage.paragraphs.length).map(lbl => (
                    <button
                      key={lbl}
                      onClick={() => handleAnswer(item.id, lbl)}
                      style={{
                        width: 36, height: 36, borderRadius: 10, fontSize: 13, fontWeight: 700,
                        border: answers[item.id] === lbl ? "2px solid #0a0a0a" : "2px solid #e8e8e8",
                        background: answers[item.id] === lbl ? "#0a0a0a" : "#fff",
                        color: answers[item.id] === lbl ? "#fff" : "#555",
                        cursor: "pointer", transition: "all 0.15s",
                      }}
                    >{lbl}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case "short-answer":
        return (
          <div>
            <div style={{ background: "#f0f9ff", border: "1px solid #bae6fd", borderRadius: 10, padding: "10px 14px", marginBottom: 14, fontSize: 12, color: "#0369a1" }}>{group.instruction}</div>
            {group.items.map(item => (
              <div key={item.id} style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 14, padding: "16px 18px", marginBottom: 10 }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12 }}>
                  {qNum(item.id)}
                  <span style={{ fontSize: 14, color: "#333", lineHeight: 1.6 }}>{item.text}</span>
                </div>
                <textarea
                  value={answers[item.id] ?? ""}
                  onChange={e => handleAnswer(item.id, e.target.value)}
                  placeholder="Type your answer here..."
                  rows={2}
                  style={{ width: "100%", fontSize: 14, fontWeight: 500, color: "#0a0a0a", background: "#fafafa", border: "2px solid #e8e8e8", borderRadius: 10, padding: "10px 14px", outline: "none", resize: "none", boxSizing: "border-box" }}
                />
              </div>
            ))}
          </div>
        );

      case "sentence-completion":
        return group.items.map(item => (
          <div key={item.id} style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 14, padding: "16px 18px", marginBottom: 10 }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12 }}>
              {qNum(item.id)}
              <span style={{ fontSize: 14, color: "#333", lineHeight: 1.6 }}>{item.text}</span>
            </div>
            <input
              type="text"
              value={answers[item.id] ?? ""}
              onChange={e => handleAnswer(item.id, e.target.value)}
              placeholder="Extract exact words..."
              style={{ width: "100%", fontSize: 14, fontWeight: 600, color: "#0a0a0a", background: "#fafafa", border: "2px solid #e8e8e8", borderRadius: 10, padding: "10px 14px", outline: "none", boxSizing: "border-box" }}
            />
          </div>
        ));

      case "summary-completion":
        return (
          <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 16, padding: 20 }}>
            {group.summaryTitle && (
              <div style={{ fontSize: 15, fontWeight: 600, color: "#0a0a0a", marginBottom: 12, paddingBottom: 12, borderBottom: "1px solid #f0f0f0" }}>{group.summaryTitle}</div>
            )}
            {group.summaryText && (
              <div style={{ fontSize: 13, color: "#666", lineHeight: 1.7, background: "#fafafa", borderRadius: 10, padding: "12px 14px", marginBottom: 16 }}>{group.summaryText}</div>
            )}
            {group.items.map(item => (
              <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, padding: "10px 14px", background: "#fafafa", border: "1px solid #f0f0f0", borderRadius: 10 }}>
                {qNum(item.id)}
                <span style={{ fontSize: 13, color: "#555", flex: 1 }}>{item.text}</span>
                <input
                  type="text"
                  value={answers[item.id] ?? ""}
                  onChange={e => handleAnswer(item.id, e.target.value)}
                  placeholder="Extract..."
                  style={{ fontSize: 13, fontWeight: 600, color: "#0a0a0a", background: "#fff", border: "2px solid #e8e8e8", borderRadius: 8, padding: "7px 12px", outline: "none", width: 180 }}
                />
              </div>
            ))}
          </div>
        );

      default: return null;
    }
  }

  // ── SELECT SCREEN ──────────────────────────────────────────────────────────────

  if (screen === "select") {
    const DIFF_STYLE: Record<string, { bg: string; color: string }> = {
      Moderate:             { bg: "#f0faf4", color: "#16a34a" },
      Challenging:          { bg: "#fffbeb", color: "#d97706" },
      Advanced:             { bg: "#fff1f2", color: "#e11d48" },
      Intermediate:         { bg: "#eff6ff", color: "#2563eb" },
      "Upper-Intermediate": { bg: "#f5f3ff", color: "#7c3aed" },
    };
    const selectionTests = testMode === "general" ? GENERAL_TESTS : TESTS;

    return (
      <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", minHeight: "100vh", background: "#fafafa", padding: "48px 40px" }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=DM+Serif+Display:ital@1&display=swap'); * { -webkit-font-smoothing: antialiased; } .test-card { transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease; cursor: pointer; } .test-card:hover { transform: translateY(-3px); box-shadow: 0 18px 48px rgba(0,0,0,0.08); }`}</style>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Link to="/app/reading" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "#888", textDecoration: "none", marginBottom: 36 }}>
            <ChevronLeft size={15} /> Back to Reading
          </Link>

          <div style={{ marginBottom: 40 }}>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#bbb", marginBottom: 14 }}>Start training</div>
            <h1 style={{ fontSize: "clamp(32px, 3vw, 48px)", fontWeight: 300, letterSpacing: "-0.04em", color: "#0a0a0a", margin: "0 0 14px", lineHeight: 1.1 }}>
              {testMode === "ielts" ? "Select an authentic test" : "Select a reading article"}
            </h1>
            <p style={{ fontSize: 15, color: "#777", lineHeight: 1.7, maxWidth: 520 }}>
              {testMode === "ielts"
                ? "Full passages, timer pressure, and a complete score breakdown designed around exam conditions."
                : "Shorter sessions for faster repetition, clearer review loops, and easier daily consistency."}
            </p>
          </div>

          {/* Tab + meta */}
          <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 16, padding: "10px 12px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
            <div style={{ display: "flex", gap: 6 }}>
              {(["ielts", "general"] as const).map(tab => (
                <button key={tab} onClick={() => setTestMode(tab)} style={{
                  padding: "9px 18px", borderRadius: 10, fontSize: 13, fontWeight: 600, border: "none", cursor: "pointer",
                  background: testMode === tab ? "#0a0a0a" : "transparent",
                  color: testMode === tab ? "#fff" : "#888",
                  transition: "all 0.2s",
                }}>
                  {tab === "ielts" ? "IELTS Reading" : "General English"}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {[`${selectionTests.length} sets`, testMode === "ielts" ? "60 min" : "15 min", testMode === "ielts" ? "Band scoring" : "Accuracy"].map(l => (
                <span key={l} style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#bbb", background: "#f5f5f5", padding: "5px 12px", borderRadius: 100 }}>{l}</span>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
            {selectionTests.map((test, idx) => {
              const diff = DIFF_STYLE[test.difficulty] ?? { bg: "#f5f5f5", color: "#555" };
              return (
                <div key={`${testMode}-${test.id}`} className="test-card" onClick={() => startTest(idx, testMode)}
                  style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 20, padding: "28px 28px 22px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
                    <div style={{ width: 44, height: 44, background: "#0a0a0a", borderRadius: 13, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 600, color: "#fff" }}>{test.id}</div>
                    <span style={{ fontSize: 11, fontWeight: 600, background: diff.bg, color: diff.color, padding: "5px 12px", borderRadius: 100, letterSpacing: "0.08em", textTransform: "uppercase" }}>{test.difficulty}</span>
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 500, letterSpacing: "-0.02em", color: "#0a0a0a", margin: "0 0 8px", lineHeight: 1.3 }}>{test.title}</h3>
                  <p style={{ fontSize: 13, color: "#aaa", lineHeight: 1.65, marginBottom: 16 }}>
                    {testMode === "ielts" ? "Timed multi-passage reading with full exam navigation and band score output." : "Shorter article comprehension for tighter repetition and easier daily consistency."}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>
                    {test.tags.slice(0, 4).map(tag => (
                      <span key={tag} style={{ fontSize: 10, fontWeight: 600, color: "#bbb", background: "#fafafa", border: "1px solid #efefef", padding: "4px 10px", borderRadius: 100 }}>{tag}</span>
                    ))}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #f0f0f0", paddingTop: 16 }}>
                    <div style={{ display: "flex", gap: 20 }}>
                      {[["Time", testMode === "ielts" ? "60 min" : "15 min"], ["Questions", `${getTotalQuestions(test)}`]].map(([l, v]) => (
                        <div key={l}><div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#ccc", marginBottom: 3 }}>{l}</div><div style={{ fontSize: 14, fontWeight: 600, color: "#0a0a0a" }}>{v}</div></div>
                      ))}
                    </div>
                    <div style={{ width: 32, height: 32, background: "#f5f5f5", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <ArrowRight size={14} color="#555" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ── RESULTS SCREEN ─────────────────────────────────────────────────────────────

  if (screen === "results") {
    const totalScore = calcScore(currentTest);
    const accuracy = Math.round((totalScore / totalQuestions) * 100);
    const band = testMode === "ielts" ? getBandScore(totalScore) : Number(((totalScore / totalQuestions) * 9).toFixed(1));
    const pScores = currentTest.passages.map((_, i) => passageScore(i));
    const ranked = pScores.map((s, i) => ({ ...s, index: i, ratio: s.total ? s.correct / s.total : 0 })).sort((a, b) => b.ratio - a.ratio);
    const strongest = ranked[0], focus = ranked[ranked.length - 1];
    const isGreat = testMode === "ielts" ? band >= 7.0 : accuracy >= 80;

    return (
      <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", minHeight: "100vh", background: "#fafafa", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "60px 40px" }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=DM+Serif+Display:ital@1&display=swap'); * { -webkit-font-smoothing: antialiased; }`}</style>
        <div style={{ maxWidth: 720, width: "100%" }}>

          {/* Score hero */}
          <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 24, padding: "48px", marginBottom: 16, textAlign: "center", boxShadow: "0 4px 30px rgba(0,0,0,0.04)" }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#bbb", marginBottom: 20 }}>Test complete — {currentTest.title}</div>
            <div style={{ fontSize: "clamp(80px, 12vw, 120px)", fontWeight: 300, letterSpacing: "-0.07em", lineHeight: 1, color: "#0a0a0a", marginBottom: 10 }}>
              {testMode === "ielts" ? band.toFixed(1) : `${accuracy}%`}
            </div>
            <div style={{ fontSize: 14, color: "#999", marginBottom: 24 }}>{testMode === "ielts" ? "Estimated IELTS Band" : "Accuracy"}</div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#fafafa", border: "1px solid #f0f0f0", borderRadius: 100, padding: "10px 20px" }}>
              <Target size={15} color="#888" />
              <span style={{ fontSize: 14, fontWeight: 600, color: "#0a0a0a" }}>{totalScore}</span>
              <span style={{ fontSize: 14, color: "#bbb" }}>/ {totalQuestions} correct</span>
            </div>
          </div>

          {/* Passage breakdown */}
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(pScores.length, 3)}, 1fr)`, gap: 12, marginBottom: 16 }}>
            {pScores.map((ps, i) => {
              const pct = Math.round((ps.correct / ps.total) * 100);
              return (
                <div key={i} style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 16, padding: "20px 20px 16px", textAlign: "center", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "#f0f0f0" }}>
                    <div style={{ height: "100%", width: `${pct}%`, background: pct >= 70 ? "#16a34a" : pct >= 50 ? "#d97706" : "#e11d48", transition: "width 1s ease" }} />
                  </div>
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#bbb", marginBottom: 8, marginTop: 6 }}>Passage {i + 1}</div>
                  <div style={{ fontSize: 32, fontWeight: 300, letterSpacing: "-0.05em", color: "#0a0a0a" }}>{ps.correct}<span style={{ fontSize: 16, color: "#ccc" }}>/{ps.total}</span></div>
                </div>
              );
            })}
          </div>

          {/* Stats row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 24 }}>
            {[
              { label: testMode === "ielts" ? "Band estimate" : "Accuracy", value: testMode === "ielts" ? band.toFixed(1) : `${accuracy}%`, note: "From total correct answers." },
              { label: "Strongest passage", value: `Passage ${strongest.index + 1}`, note: `${strongest.correct}/${strongest.total} correct` },
              { label: "Focus next", value: `Passage ${focus.index + 1}`, note: `${focus.correct}/${focus.total} correct — biggest upside` },
            ].map(({ label, value, note }) => (
              <div key={label} style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 16, padding: "18px 18px 14px" }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#bbb", marginBottom: 8 }}>{label}</div>
                <div style={{ fontSize: 22, fontWeight: 300, letterSpacing: "-0.04em", color: "#0a0a0a", marginBottom: 4 }}>{value}</div>
                <div style={{ fontSize: 12, color: "#bbb" }}>{note}</div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
            <button onClick={() => setShowReview(!showReview)} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "13px 20px", background: "#fafafa", border: "1px solid #e8e8e8", borderRadius: 12, fontSize: 13, fontWeight: 600, color: "#0a0a0a", cursor: "pointer" }}>
              <FileText size={14} /> {showReview ? "Hide answers" : "Review answers"}
            </button>
            <button onClick={() => { setAnswers({}); setPassageIdx(0); setShowReview(false); setTimeLeft(testMode === "ielts" ? 3600 : 900); setScreen("test"); }} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "13px 20px", background: "#fafafa", border: "1px solid #e8e8e8", borderRadius: 12, fontSize: 13, fontWeight: 600, color: "#0a0a0a", cursor: "pointer" }}>
              <RotateCcw size={14} /> Retry test
            </button>
            <button onClick={() => { setShowReview(false); setScreen("select"); }} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "13px 20px", background: "#0a0a0a", border: "none", borderRadius: 12, fontSize: 13, fontWeight: 600, color: "#fff", cursor: "pointer" }}>
              <BookOpen size={14} /> Choose another
            </button>
          </div>

          {/* Review */}
          {showReview && (
            <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 20, padding: "32px 32px 28px" }}>
              <div style={{ fontSize: 16, fontWeight: 500, letterSpacing: "-0.02em", color: "#0a0a0a", marginBottom: 24 }}>Detailed review</div>
              {currentTest.passages.map((p, pIdx) => (
                <div key={pIdx} style={{ marginBottom: 28 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#bbb", marginBottom: 14 }}>Passage {pIdx + 1}</div>
                  {p.questions.map((g, gi) => (
                    <div key={gi}>
                      {g.items.map(item => {
                        const u = (answers[item.id] ?? "").toLowerCase().trim();
                        const c = (item.answer || "").toLowerCase().trim();
                        const ok = Boolean(item.answer && (u === c || (g.type === "short-answer" && u.length > 3 && (c.includes(u) || u.includes(c)))));
                        return (
                          <div key={item.id} style={{ display: "flex", gap: 14, padding: "12px 16px", background: ok ? "#f0faf4" : "#fff1f2", border: `1px solid ${ok ? "#bbf7d0" : "#fecdd3"}`, borderRadius: 12, marginBottom: 8, alignItems: "flex-start" }}>
                            <div style={{ width: 24, height: 24, borderRadius: "50%", background: ok ? "#16a34a" : "#e11d48", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                              {ok ? <CheckCircle2 size={13} color="#fff" /> : <span style={{ color: "#fff", fontSize: 11, fontWeight: 800 }}>✕</span>}
                            </div>
                            <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                              <div>
                                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#bbb", marginBottom: 4 }}>Your answer</div>
                                <div style={{ fontSize: 14, fontWeight: 500, color: ok ? "#15803d" : "#be123c" }}>{answers[item.id] || <span style={{ color: "#ccc", fontStyle: "italic" }}>No answer</span>}</div>
                              </div>
                              <div>
                                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#bbb", marginBottom: 4 }}>Correct answer</div>
                                <div style={{ fontSize: 14, fontWeight: 600, color: "#0a0a0a" }}>{item.answer}</div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── TEST SCREEN ────────────────────────────────────────────────────────────────

  const passageQIds = currentPassage.questions.flatMap(g => g.items.map(i => i.id));
  const passageAnswered = passageQIds.filter(id => answers[id]).length;
  const passageTotal = passageQIds.length;
  const passageQuestionAnchors = Object.fromEntries(
    currentPassage.questions.flatMap(g => g.items.map(i => [i.id, `q-${g.items[0].id}`]))
  ) as Record<string, string>;
  const timerWarn = timeLeft < 600;
  const timerDanger = timeLeft < 300;

  return (
    <div style={{ fontFamily: "'DM Sans', system-ui, sans-serif", height: "100vh", display: "flex", flexDirection: "column", background: "#f0f0f0", padding: 12, gap: 10, overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=DM+Serif+Display:ital@0;1&display=swap');
        * { -webkit-font-smoothing: antialiased; }
        .slim-scroll::-webkit-scrollbar { width: 4px; }
        .slim-scroll::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.12); border-radius: 4px; }
        .input-focus:focus { border-color: #0a0a0a !important; background: #fff !important; }
      `}</style>

      {/* HEADER */}
      <header style={{
        background: "#fff", borderRadius: 16, padding: "0 20px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, border: "1px solid #e8e8e8",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, width: "25%" }}>
          <button onClick={() => setScreen("select")} style={{ width: 36, height: 36, borderRadius: 10, background: "#fafafa", border: "1px solid #e8e8e8", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <ChevronLeft size={16} color="#555" />
          </button>
          <div>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#bbb" }}>Focus mode</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#0a0a0a", maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{currentTest.title}</div>
          </div>
        </div>

        {/* Passage tabs */}
        <div style={{ display: "flex", background: "#f5f5f5", borderRadius: 12, padding: 4, gap: 3 }}>
          {currentTest.passages.map((p, i) => {
            const qIds = p.questions.flatMap(g => g.items.map(it => it.id));
            const done = qIds.filter(id => answers[id]).length;
            const complete = done === qIds.length;
            const active = passageIdx === i;
            return (
              <button key={i} onClick={() => setPassageIdx(i)} style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "8px 16px", borderRadius: 9, fontSize: 12, fontWeight: 600, border: "none", cursor: "pointer",
                background: active ? "#fff" : "transparent",
                color: active ? "#0a0a0a" : complete ? "#16a34a" : "#999",
                boxShadow: active ? "0 1px 6px rgba(0,0,0,0.08)" : "none",
                transition: "all 0.2s",
              }}>
                {complete && !active && <CheckCircle2 size={12} />}
                Passage {i + 1}
              </button>
            );
          })}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "flex-end", width: "25%" }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 7, padding: "8px 14px", background: "#fafafa", border: "1px solid #e8e8e8", borderRadius: 10,
            fontSize: 14, fontWeight: 600, fontFamily: "monospace", letterSpacing: "0.02em",
            color: timerDanger ? "#e11d48" : timerWarn ? "#d97706" : "#0a0a0a",
          }}>
            <Clock size={13} color={timerDanger ? "#e11d48" : timerWarn ? "#d97706" : "#888"} />
            {formatTime(timeLeft)}
          </div>
          <button onClick={() => setScreen("results")} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", background: "#0a0a0a", color: "#fff", border: "none", borderRadius: 10, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
            Finish <CheckCircle2 size={12} />
          </button>
        </div>
      </header>

      {/* SPLIT PANES */}
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "55% 45%", gap: 10, overflow: "hidden" }}>

        {/* PASSAGE */}
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e8e8e8", overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div ref={passageRef} className="slim-scroll" style={{ flex: 1, overflowY: "auto", padding: "40px 52px" }}>
            <div style={{ maxWidth: 640 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#d97706", marginBottom: 12 }}>{currentPassage.subtitle}</div>
              <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 34, fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.15, color: "#0a0a0a", margin: "0 0 32px" }}>{currentPassage.title}</h2>
              <div style={{ fontSize: fontSize === "large" ? 18 : 16, lineHeight: fontSize === "large" ? 2 : 1.85, color: "#2d2d2d" }}>
                {currentPassage.paragraphs.map((para, i) => (
                  <div key={i} style={{ display: "flex", gap: 14, marginBottom: 22 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "#ccc", width: 16, flexShrink: 0, paddingTop: 3 }}>{PARA_LABELS[i]}</span>
                    <p style={{ margin: 0, fontFamily: "'DM Serif Display', serif", letterSpacing: "0.01em" }}>{para}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* QUESTIONS */}
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e8e8e8", overflow: "hidden", display: "flex", flexDirection: "column" }}>
          {/* Q header */}
          <div style={{ padding: "16px 20px", borderBottom: "1px solid #f0f0f0", flexShrink: 0, background: "#fff" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#0a0a0a" }}>Questions</div>
                <div style={{ fontSize: 12, color: "#bbb", marginTop: 2 }}><span style={{ color: "#0a0a0a", fontWeight: 600 }}>{passageAnswered}</span>/{passageTotal} answered</div>
              </div>
              <div style={{ display: "flex", gap: 3 }}>
                {passageQIds.map(id => (
                  <div key={id} style={{ width: 5, height: 28, borderRadius: 3, background: answers[id] ? "#0a0a0a" : "#f0f0f0", transition: "background 0.2s" }} />
                ))}
              </div>
            </div>

            {/* Overall progress */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ flex: 1, height: 3, background: "#f0f0f0", borderRadius: 100, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${overallProgress}%`, background: "#0a0a0a", borderRadius: 100, transition: "width 0.5s ease" }} />
              </div>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#bbb" }}>{overallProgress}%</div>
            </div>

            {/* Navigator */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {passageQIds.map(id => (
                <button key={id} onClick={() => document.getElementById(passageQuestionAnchors[id])?.scrollIntoView({ behavior: "smooth", block: "center" })}
                  style={{
                    width: 30, height: 28, borderRadius: 7, fontSize: 11, fontWeight: 700, border: "none", cursor: "pointer",
                    background: answers[id] ? "#0a0a0a" : "#f5f5f5",
                    color: answers[id] ? "#fff" : "#888",
                    transition: "all 0.15s",
                  }}>{id}</button>
              ))}
            </div>
          </div>

          {/* Q body */}
          <div ref={questionsRef} className="slim-scroll" style={{ flex: 1, overflowY: "auto", padding: "20px 20px 40px" }}>
            <div style={{ maxWidth: 560 }}>
              {currentPassage.questions.map(group => (
                <div key={group.id} style={{ marginBottom: 32 }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 14 }}>
                    <span style={{ background: "#0a0a0a", color: "#fff", fontSize: 10, fontWeight: 700, padding: "4px 10px", borderRadius: 6, flexShrink: 0, letterSpacing: "0.08em" }}>
                      {group.items[0].id}–{group.items[group.items.length - 1].id}
                    </span>
                    <p style={{ fontSize: 13, fontWeight: 500, color: "#444", lineHeight: 1.55, margin: 0 }}>{group.instruction}</p>
                  </div>
                  <div id={`q-${group.items[0].id}`}>{renderGroup(group, currentPassage)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Q footer */}
          <div style={{ padding: "14px 20px", borderTop: "1px solid #f0f0f0", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0, background: "#fff" }}>
            <div style={{ display: "flex", background: "#f5f5f5", borderRadius: 10, padding: 3, gap: 2 }}>
              {(["normal", "large"] as const).map(s => (
                <button key={s} onClick={() => setFontSize(s)} style={{
                  padding: "6px 12px", borderRadius: 7, fontSize: s === "large" ? 14 : 12, fontWeight: 700, border: "none", cursor: "pointer",
                  background: fontSize === s ? "#fff" : "transparent",
                  color: fontSize === s ? "#0a0a0a" : "#bbb",
                  boxShadow: fontSize === s ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
                }}>Aa</button>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {passageIdx > 0 && (
                <button onClick={() => setPassageIdx(p => p - 1)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 16px", background: "#fafafa", border: "1px solid #e8e8e8", borderRadius: 10, fontSize: 12, fontWeight: 600, color: "#555", cursor: "pointer" }}>
                  <ChevronLeft size={13} /> Previous
                </button>
              )}
              {passageIdx < currentTest.passages.length - 1 ? (
                <button onClick={() => setPassageIdx(p => p + 1)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 16px", background: "#0a0a0a", border: "none", borderRadius: 10, fontSize: 12, fontWeight: 600, color: "#fff", cursor: "pointer" }}>
                  Next <ArrowRight size={13} />
                </button>
              ) : (
                <button onClick={() => setScreen("results")} style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 16px", background: "#16a34a", border: "none", borderRadius: 10, fontSize: 12, fontWeight: 600, color: "#fff", cursor: "pointer" }}>
                  <CheckCircle2 size={13} /> Submit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Progress strip */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 2, background: "#e8e8e8", zIndex: 100 }}>
        <div style={{ height: "100%", width: `${overallProgress}%`, background: "#0a0a0a", transition: "width 0.6s ease" }} />
      </div>
    </div>
  );
}