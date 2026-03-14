import React, { useState, useRef, useEffect } from "react";
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
