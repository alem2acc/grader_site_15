import { Link } from "react-router-dom";
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
