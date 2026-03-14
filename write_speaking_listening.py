import os
BASE = "/Users/danialtalgatov/Downloads/grader-ai-web/src/pages"

# ─────────────────────────────────────────────────────────────────────────────
SPEAKING = r'''import { Link } from "react-router-dom";
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
'''

# ─────────────────────────────────────────────────────────────────────────────
SPEAKING_PRACTICE = r'''import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ChevronLeft, Mic, Square, Loader2, Clock, AlignLeft, Info } from "lucide-react";
import { transcribeAudio, evaluateSpeaking } from "@/lib/openai";
import { collection, addDoc, serverTimestamp, doc, setDoc, increment } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";

const SPEAKING_P1 = [
  "What is your hometown like?",
  "Do you enjoy cooking? Why or why not?",
  "What kind of music do you usually listen to?",
  "How do you typically spend your weekends?",
  "Do you prefer indoor or outdoor activities?",
  "What is your favourite type of weather and why?",
  "How important is fashion to you?",
  "What hobbies did you have as a child?",
  "Do you enjoy reading books? What type do you prefer?",
  "How do you keep fit and healthy?",
];
const SPEAKING_P2 = [
  { topic: "Describe a memorable journey you have taken.", cueCard: "You should say:\n• where you went and when\n• who you travelled with\n• what you did there\n\nand explain why this journey was so memorable." },
  { topic: "Describe a person who has had a great influence on your life.", cueCard: "You should say:\n• who this person is\n• how long you have known them\n• what they have done for you\n\nand explain why their influence has been so significant." },
  { topic: "Describe a book or film that you particularly enjoyed.", cueCard: "You should say:\n• what the book or film is about\n• when you read or watched it\n• what you liked about it\n\nand explain why you would recommend it to others." },
  { topic: "Describe a skill you have learned that you find useful.", cueCard: "You should say:\n• what the skill is\n• how and where you learned it\n• how often you use it\n\nand explain why it has been valuable to you." },
  { topic: "Describe a place in your city that you enjoy visiting.", cueCard: "You should say:\n• where it is\n• what you do there\n• who you usually go with\n\nand explain why you enjoy going there." },
];
const SPEAKING_P3 = [
  "What role does travel play in broadening people's perspectives?",
  "How has technology changed the way people communicate with each other?",
  "In what ways can literature influence society?",
  "What are the advantages and disadvantages of city life compared to rural life?",
  "How important is it for young people to develop leadership skills?",
];

type Stage = "loading" | "ready" | "preparing" | "recording" | "processing" | "done";

export function SpeakingPractice() {
  const [searchParams] = useSearchParams();
  const part = parseInt(searchParams.get("part") || "2");
  const navigate = useNavigate();
  const { user } = useAuth();

  const [stage, setStage]     = useState<Stage>("ready");
  const [topic, setTopic]     = useState("");
  const [cueCard, setCueCard] = useState<string | null>(null);
  const [prepTime, setPrepTime] = useState(part === 2 ? 60 : 0);
  const [recordTime, setRecordTime] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError]     = useState("");

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef        = useRef<Blob[]>([]);
  const audioBlobRef     = useRef<Blob | null>(null);
  const audioRef         = useRef<HTMLAudioElement | null>(null);
  const prepTimerRef     = useRef<number | null>(null);
  const recTimerRef      = useRef<number | null>(null);

  useEffect(() => {
    if (part === 2) {
      const p = SPEAKING_P2[Math.floor(Math.random() * SPEAKING_P2.length)];
      setTopic(p.topic); setCueCard(p.cueCard);
    } else {
      setTopic((part === 1 ? SPEAKING_P1 : SPEAKING_P3)[Math.floor(Math.random() * (part === 1 ? SPEAKING_P1 : SPEAKING_P3).length)]);
      setCueCard(null);
    }
    setStage("ready");
  }, [part]);

  useEffect(() => {
    if (stage === "preparing" && prepTime > 0) {
      prepTimerRef.current = window.setInterval(() => {
        setPrepTime((t) => { if (t <= 1) { clearInterval(prepTimerRef.current!); startRecording(); return 0; } return t - 1; });
      }, 1000);
    }
    return () => { if (prepTimerRef.current) clearInterval(prepTimerRef.current); };
  }, [stage]);

  useEffect(() => {
    if (stage === "recording") {
      recTimerRef.current = window.setInterval(() => setRecordTime((t) => t + 1), 1000);
    } else {
      if (recTimerRef.current) clearInterval(recTimerRef.current);
    }
    return () => { if (recTimerRef.current) clearInterval(recTimerRef.current); };
  }, [stage]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mimeType = MediaRecorder.isTypeSupported("audio/webm") ? "audio/webm" : MediaRecorder.isTypeSupported("audio/mp4") ? "audio/mp4" : "";
      const recorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
      chunksRef.current = [];
      recorder.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mimeType || "audio/webm" });
        audioBlobRef.current = blob;
        setAudioUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach((t) => t.stop());
        setStage("processing");
      };
      recorder.start(250);
      mediaRecorderRef.current = recorder;
      setStage("recording");
    } catch {
      setError("Microphone access denied. Please allow microphone in your browser settings.");
      setStage("ready");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") mediaRecorderRef.current.stop();
  };

  const handleBegin = () => { part === 2 ? setStage("preparing") : startRecording(); };

  useEffect(() => {
    if (stage === "processing") processRecording();
  }, [stage]);

  const processRecording = async () => {
    if (!audioBlobRef.current) { setError("Recording failed — no audio captured. Please try again."); setStage("ready"); return; }
    try {
      const transcript = await transcribeAudio(audioBlobRef.current);
      const evaluation = await evaluateSpeaking(transcript, part, topic);
      const ref = await addDoc(collection(db, "users", user!.uid, "sessions"), {
        type: "speaking", part, topic, transcript, evaluation,
        overallBand: evaluation.overallBand, duration: recordTime,
        createdAt: serverTimestamp(), userId: user?.uid,
      });
      await setDoc(doc(db, "users", user!.uid), { totalSessions: increment(1) }, { merge: true });
      navigate("/app/speaking/results/" + ref.id);
    } catch (err) {
      console.error(err);
      setError("AI processing failed or timed out. Please try again.");
      setStage("ready");
    }
  };

  const fmt = (s: number) => `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  const stageBg = stage === "recording" ? "#0f0505" : stage === "preparing" ? "#0a0900" : "#0a0a0a";

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", position: "fixed", inset: 0, zIndex: 50, background: stageBg, display: "flex", flexDirection: "column", overflow: "hidden", transition: "background 0.8s" }}>
      <style>{`
        * { -webkit-font-smoothing: antialiased; }
        @keyframes spin     { to { transform: rotate(360deg); } }
        @keyframes pulse-dot { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes rec-ring  { 0%{transform:scale(1);opacity:0.6} 100%{transform:scale(1.8);opacity:0} }
      `}</style>

      {/* Header */}
      <div style={{ height: 64, borderBottom: "1px solid #1a1a1a", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 28px", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Link to="/app/speaking" style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid #222", display: "flex", alignItems: "center", justifyContent: "center", color: "#555", textDecoration: "none", transition: "border-color 0.15s" }}>
            <ChevronLeft size={16} />
          </Link>
          <div>
            <div style={{ fontSize: 13, fontWeight: 500, color: "#fff" }}>IELTS Speaking</div>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#444" }}>
              Part {part} · {part === 1 ? "Introduction" : part === 2 ? "Long Turn" : "Discussion"}
            </div>
          </div>
        </div>

        {/* Timer badges */}
        {stage === "recording" && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 100, border: "1px solid #3a1a1a", background: "#1a0808", fontSize: 13, fontWeight: 600, color: "#ef4444", fontVariantNumeric: "tabular-nums" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#ef4444", animation: "pulse-dot 1s ease-in-out infinite", display: "inline-block" }} />
            {fmt(recordTime)}
          </div>
        )}
        {stage === "preparing" && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 100, border: "1px solid #2a2000", background: "#120f00", fontSize: 13, fontWeight: 600, color: "#f59e0b", fontVariantNumeric: "tabular-nums" }}>
            <Clock size={13} />
            {fmt(prepTime)}
          </div>
        )}
      </div>

      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 32px 80px" }}>
        <div style={{ width: "100%", maxWidth: 640, display: "flex", flexDirection: "column", alignItems: "center", gap: 36 }}>

          {/* Stage pill */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 14px", borderRadius: 100, border: "1px solid #1e1e1e", background: "rgba(255,255,255,0.02)", fontSize: 10, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#555" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: stage === "recording" ? "#ef4444" : stage === "preparing" ? "#f59e0b" : stage === "processing" ? "#3b82f6" : "#444", animation: stage !== "ready" ? "pulse-dot 1.2s ease-in-out infinite" : "none" }} />
            {stage === "ready" && "Ready"}
            {stage === "preparing" && "Preparing"}
            {stage === "recording" && "Recording"}
            {stage === "processing" && "Analysing"}
          </div>

          {/* Topic text */}
          <div style={{ width: "100%", textAlign: "center" }}>
            <h2 style={{ fontSize: 32, fontWeight: 300, letterSpacing: "-0.04em", color: "#fff", lineHeight: 1.25, margin: "0 0 28px", fontFamily: "'DM Serif Display', serif", fontStyle: "italic" }}>
              {topic || "Loading topic…"}
            </h2>

            {cueCard && (
              <div style={{ textAlign: "left", background: "rgba(255,255,255,0.03)", border: "1px solid #1e1e1e", borderRadius: 20, padding: "22px 26px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#444", marginBottom: 14, paddingBottom: 12, borderBottom: "1px solid #1a1a1a" }}>
                  <AlignLeft size={12} />
                  <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase" }}>Cue Card</span>
                </div>
                <p style={{ fontSize: 14, color: "#888", lineHeight: 1.8, margin: 0, whiteSpace: "pre-wrap" }}>{cueCard}</p>
              </div>
            )}
          </div>

          {/* Error */}
          {error && (
            <div style={{ width: "100%", padding: "12px 16px", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 12, fontSize: 13, color: "#fca5a5", textAlign: "center" }}>
              {error}
            </div>
          )}

          {/* Controls */}
          <div style={{ height: 100, display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>

            {stage === "ready" && (
              <button onClick={handleBegin} style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 32px", background: "#fff", color: "#0a0a0a", border: "none", borderRadius: 100, fontSize: 14, fontWeight: 600, fontFamily: "'DM Sans', sans-serif", cursor: "pointer", transition: "opacity 0.2s" }}>
                <Mic size={16} />
                {part === 2 ? "Start Preparation (1 min)" : "Start Recording"}
              </button>
            )}

            {stage === "preparing" && (
              <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
                <div style={{ fontSize: 64, fontWeight: 300, letterSpacing: "-0.06em", color: "#f59e0b", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>
                  {fmt(prepTime)}
                </div>
                <button onClick={() => { clearInterval(prepTimerRef.current!); startRecording(); }} style={{ padding: "10px 20px", background: "transparent", border: "1px solid #2a2a2a", color: "#777", borderRadius: 100, fontSize: 13, fontWeight: 500, fontFamily: "'DM Sans', sans-serif", cursor: "pointer" }}>
                  Skip
                </button>
              </div>
            )}

            {stage === "recording" && (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, position: "relative" }}>
                {/* Ping rings */}
                <div style={{ position: "absolute", width: 96, height: 96, borderRadius: "50%", border: "1px solid rgba(239,68,68,0.3)", animation: "rec-ring 1.8s ease-out infinite" }} />
                <div style={{ position: "absolute", width: 96, height: 96, borderRadius: "50%", border: "1px solid rgba(239,68,68,0.2)", animation: "rec-ring 1.8s ease-out 0.6s infinite" }} />
                <button onClick={stopRecording} style={{ position: "relative", width: 72, height: 72, borderRadius: "50%", background: "#ef4444", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 32px rgba(239,68,68,0.3)" }}>
                  <Square size={22} color="#fff" fill="#fff" />
                </button>
                <div style={{ fontSize: 11, color: "#555", letterSpacing: "0.06em" }}>Tap to stop</div>
              </div>
            )}

            {stage === "processing" && (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", border: "2px solid #1a1a1a", borderTopColor: "#3b82f6", animation: "spin 0.8s linear infinite" }} />
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 14, fontWeight: 500, color: "#fff", marginBottom: 4 }}>Evaluating Response</div>
                  <div style={{ fontSize: 11, color: "#444", letterSpacing: "0.1em", textTransform: "uppercase" }}>AI Analysis in progress…</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom hint */}
      {(stage === "ready") && (
        <div style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 100, border: "1px solid #1a1a1a", background: "rgba(255,255,255,0.02)", fontSize: 12, color: "#444", whiteSpace: "nowrap" }}>
          <Info size={12} />
          {part === 1 && "Answer general questions. Aim for 4–5 minutes total."}
          {part === 2 && "Read the cue card, prepare 1 minute, then speak for 2 minutes."}
          {part === 3 && "Discuss abstract ideas related to the topic. Aim for 4–5 minutes total."}
        </div>
      )}

      {audioUrl && <audio ref={audioRef} src={audioUrl} onEnded={() => {}} style={{ display: "none" }} />}
    </div>
  );
}
'''

# ─────────────────────────────────────────────────────────────────────────────
SPEAKING_RESULT = r'''import { Link, useParams } from "react-router-dom";
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
'''

# ─────────────────────────────────────────────────────────────────────────────
LISTENING = r'''import { Link } from "react-router-dom";
import { Headphones, Clock, ArrowUpRight, Lock } from "lucide-react";

const PARTS = [
  { part: 1, label: "Everyday Conversation",  desc: "Two speakers discussing everyday social situations.", time: "~10 min", ready: false },
  { part: 2, label: "Everyday Monologue",     desc: "One speaker talking about a local facility or service.", time: "~10 min", ready: false },
  { part: 3, label: "Academic Discussion",    desc: "Up to four people discussing an educational topic.", time: "~10 min", ready: false },
  { part: 4, label: "Academic Lecture",       desc: "A university lecture on an academic subject.", time: "~10 min", ready: false },
];

export function Listening() {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#fafafa", minHeight: "100vh" }}>
      <style>{`
        * { -webkit-font-smoothing: antialiased; }
        .ls-part:hover { background: #f5f5f5 !important; }
        @keyframes ring { 0%{transform:scale(1);opacity:0.5} 100%{transform:scale(1.6);opacity:0} }
        @keyframes ring2 { 0%{transform:scale(1);opacity:0.35} 100%{transform:scale(1.9);opacity:0} }
      `}</style>

      {/* Hero */}
      <div style={{ background: "#0a0a0a", padding: "44px 40px 40px", marginBottom: 28 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#555", marginBottom: 14 }}>Listening Hub</div>
            <h1 style={{ fontSize: 42, fontWeight: 300, letterSpacing: "-0.05em", color: "#fff", margin: "0 0 14px", lineHeight: 1.1 }}>
              Train your{" "}
              <em style={{ fontFamily: "'DM Serif Display', serif", fontStyle: "italic" }}>Ear</em>
            </h1>
            <p style={{ fontSize: 14, color: "#555", lineHeight: 1.75, maxWidth: 380, margin: 0 }}>
              Real audio tests with synchronized transcripts, question sets, and instant band scoring.
            </p>
          </div>

          {/* Pulsing headphones widget */}
          <div style={{ position: "relative", width: 110, height: 110, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <div style={{ position: "absolute", width: 80, height: 80, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.08)", animation: "ring 2s ease-out infinite" }} />
            <div style={{ position: "absolute", width: 80, height: 80, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.05)", animation: "ring2 2s ease-out 0.5s infinite" }} />
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#141414", border: "1px solid #2a2a2a", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 1 }}>
              <Headphones size={24} color="#555" />
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px 56px" }}>

        {/* Coming soon banner */}
        <div style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 20, padding: "20px 24px", marginBottom: 28, display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#fafafa", border: "1px solid #e8e8e8", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Lock size={14} color="#bbb" />
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 500, color: "#0a0a0a", marginBottom: 2 }}>Real audio coming soon</div>
            <div style={{ fontSize: 12, color: "#999" }}>Authentic IELTS-style audio recordings are being prepared. Practice sessions will be unlocked shortly.</div>
          </div>
          <div style={{ marginLeft: "auto", flexShrink: 0, padding: "5px 14px", borderRadius: 100, background: "#fafafa", border: "1px solid #e8e8e8", fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#bbb" }}>
            In Progress
          </div>
        </div>

        {/* Part cards */}
        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#bbb", marginBottom: 14 }}>Practice Parts</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 40 }}>
          {PARTS.map((p) => (
            <div key={p.part} className="ls-part" style={{ background: "#fff", border: "1px solid #e8e8e8", borderRadius: 20, padding: "24px 22px", display: "flex", flexDirection: "column", justifyContent: "space-between", opacity: p.ready ? 1 : 0.6, transition: "background 0.15s" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, color: "#fff" }}>P{p.part}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "#bbb" }}>
                    <Clock size={10} />{p.time}
                  </div>
                </div>
                <div style={{ fontSize: 14, fontWeight: 500, color: "#0a0a0a", marginBottom: 7 }}>{p.label}</div>
                <p style={{ fontSize: 12, color: "#999", lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
              </div>
              {p.ready ? (
                <Link to={`/app/listening/practice?part=${p.part}`} style={{ marginTop: 20, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", background: "#0a0a0a", borderRadius: 100, textDecoration: "none", fontSize: 12, fontWeight: 600, color: "#fff" }}>
                  Start Part {p.part} <ArrowUpRight size={12} />
                </Link>
              ) : (
                <div style={{ marginTop: 20, display: "flex", alignItems: "center", justifyContent: "center", padding: "10px 14px", background: "#f5f5f5", borderRadius: 100, fontSize: 12, fontWeight: 600, color: "#bbb", gap: 6 }}>
                  <Lock size={11} /> Coming soon
                </div>
              )}
            </div>
          ))}
        </div>

        {/* What to expect */}
        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#bbb", marginBottom: 14 }}>What to Expect</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {[
            { n: "40",   unit: "questions",  desc: "Spread across 4 parts with increasing difficulty" },
            { n: "30",   unit: "minutes",    desc: "Timed test replicating real exam conditions" },
            { n: "Band", unit: "1.0 – 9.0",  desc: "Instant AI-scored band based on correct answers" },
          ].map((s) => (
            <div key={s.n} style={{ background: "#0a0a0a", border: "1px solid #1e1e1e", borderRadius: 20, padding: "22px 22px" }}>
              <div style={{ fontSize: 36, fontWeight: 300, letterSpacing: "-0.05em", color: "#fff", lineHeight: 1, marginBottom: 6 }}>{s.n}</div>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#555", marginBottom: 8 }}>{s.unit}</div>
              <div style={{ fontSize: 12, color: "#555", lineHeight: 1.6 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
      {false && <><ArrowUpRight /><Headphones /></>}
    </div>
  );
}
'''

# ─────────────────────────────────────────────────────────────────────────────
LISTENING_RESULT = r'''import { Link, useParams } from "react-router-dom";
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
'''

for fname, content in [
    ("Speaking.tsx",        SPEAKING),
    ("SpeakingPractice.tsx",SPEAKING_PRACTICE),
    ("SpeakingResult.tsx",  SPEAKING_RESULT),
    ("Listening.tsx",       LISTENING),
    ("ListeningResult.tsx", LISTENING_RESULT),
]:
    path = os.path.join(BASE, fname)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"✓  {fname}  ({len(content):,} chars)")

print("\nAll done.")
