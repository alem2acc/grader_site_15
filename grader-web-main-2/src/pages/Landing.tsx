import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Headphones,
  Mic,
  PenTool,
  TrendingUp,
  Zap,
} from "lucide-react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

const skillPillars = [
  {
    icon: Mic,
    title: "Speaking",
    tag: "01",
    description:
      "Train with instant feedback on pronunciation, fluency, pacing, and the small habits that quietly lower your score.",
  },
  {
    icon: PenTool,
    title: "Writing",
    tag: "02",
    description:
      "Get precise feedback on structure, argument quality, vocabulary range, grammar, and overall band performance.",
  },
  {
    icon: BookOpen,
    title: "Reading",
    tag: "03",
    description:
      "Practice with realistic passages, review every mistake, and build the speed and accuracy the exam actually rewards.",
  },
  {
    icon: Headphones,
    title: "Listening",
    tag: "04",
    description:
      "Improve listening under real exam pressure with clear tracking, smarter review, and focused correction after each attempt.",
  },
];

const scoreBars = [
  { label: "W1", value: 55 },
  { label: "W2", value: 62 },
  { label: "W3", value: 58 },
  { label: "W4", value: 71 },
  { label: "W5", value: 78 },
  { label: "W6", value: 85 },
  { label: "W7", value: 91 },
];

const stats = [
  { value: "50k+", label: "Practice sessions completed" },
  { value: "0.2s", label: "Average feedback speed" },
  { value: "9.0", label: "Band-ready calibration" },
];

const signals = [
  "Band 6.5 → 8.0 in 11 weeks",
  "Fluency score now consistently stronger",
  "Task 2 structure is finally stable",
  "Listening accuracy improved by 14%",
];

const features = [
  {
    title: "Adaptive Loop",
    description:
      "Every session teaches the platform what to fix next, so your practice becomes more focused over time.",
  },
  {
    title: "Band Engine",
    description:
      "Clear scoring, useful analytics, and smooth exam flow make it easier to understand exactly where your band is won or lost.",
  },
  {
    title: "Exam Calm",
    description:
      "The more familiar the interface feels, the calmer and sharper you are when the real test begins.",
  },
];

export function Landing() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 60]);
  const heroScale = useTransform(scrollYProgress, [0, 0.4], [1, 0.985]);
  const dashboardRotate = useTransform(scrollYProgress, [0, 0.4], [0, -2]);
  const progressScale = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.2 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="min-h-screen bg-[#fafafa] text-[#0a0a0a]"
      style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300;1,9..40,400&family=DM+Serif+Display:ital@0;1&display=swap');

        * { -webkit-font-smoothing: antialiased; }

        .label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #888;
        }

        .bar-fill {
          animation: growUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          transform-origin: bottom;
          transform: scaleY(0);
        }

        @keyframes growUp {
          to { transform: scaleY(1); }
        }

        .line-hover::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1px;
          background: #0a0a0a;
          transition: width 0.3s ease;
        }
        .line-hover:hover::after { width: 100%; }

        .card-lift {
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
        }
        .card-lift:hover {
          transform: translateY(-3px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.08);
        }

        .soft-float {
          animation: softFloat 7s cubic-bezier(0.37, 0, 0.63, 1) infinite;
        }

        .soft-float-delay {
          animation: softFloat 9s cubic-bezier(0.37, 0, 0.63, 1) infinite;
          animation-delay: -2.5s;
        }

        .ambient-sweep::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent);
          transform: translateX(-140%);
          animation: ambientSweep 5.5s ease-in-out infinite;
          opacity: 0.45;
          pointer-events: none;
        }

        @keyframes softFloat {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(0, -12px, 0); }
        }

        @keyframes ambientSweep {
          0%, 15% { transform: translateX(-140%); }
          45%, 100% { transform: translateX(140%); }
        }

        .nav-shell {
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(10,10,10,0.08);
          background: rgba(255,255,255,0.72);
          box-shadow: 0 10px 40px rgba(0,0,0,0.04);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }

        .nav-shell::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, rgba(255,255,255,0.45), transparent 35%, transparent 65%, rgba(255,255,255,0.3));
          pointer-events: none;
        }

        .nav-link {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 10px 0;
          color: #7a7a7a;
          transition: color 0.25s ease, transform 0.25s ease;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 2px;
          width: 100%;
          height: 1px;
          background: #0a0a0a;
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 0.25s ease;
        }

        .nav-link:hover {
          color: #0a0a0a;
          transform: translateY(-1px);
        }

        .nav-link:hover::after {
          transform: scaleX(1);
        }
      `}</style>

      <motion.div
        style={{ scaleX: progressScale, transformOrigin: "0% 50%" }}
        className="fixed left-0 right-0 top-0 z-[60] h-[2px] bg-[#0a0a0a]"
      />

      {/* NAV */}
      <nav
        className={`fixed top-0 z-50 w-full transition-all duration-500 ${scrolled ? "pt-4" : "pt-6"}`}
        style={{ paddingBottom: 12 }}
      >
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}
        >
          <div
            className="nav-shell"
            style={{
              borderRadius: 999,
              padding: "14px 18px 14px 20px",
              display: "grid",
              gridTemplateColumns: "auto 1fr auto",
              alignItems: "center",
              gap: 24,
            }}
          >
            <motion.div
              whileHover={{ y: -1 }}
              transition={{ duration: 0.2 }}
              style={{ display: "flex", alignItems: "center", gap: 12, minWidth: "fit-content" }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  background: "#0a0a0a",
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fafafa",
                  fontSize: 14,
                  fontWeight: 800,
                  boxShadow: "0 8px 20px rgba(0,0,0,0.10)",
                }}
              >
                G
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.06em" }}>Grader AI</span>
                <span className="label" style={{ fontSize: 9, color: "#9a9a9a" }}>IELTS, designed beautifully</span>
              </div>
            </motion.div>

            <div style={{ display: "flex", justifyContent: "center", gap: 32 }}>
              {["Speaking", "Writing", "Reading", "Listening"].map((item) => (
                <motion.span key={item} className="nav-link label" whileHover={{ y: -1 }} transition={{ duration: 0.2 }}>
                  {item}
                </motion.span>
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 10 }}>
              <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }}>
                <Link
                  to="/login"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "12px 16px",
                    color: "#6f6f6f",
                    textDecoration: "none",
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    borderRadius: 999,
                    transition: "color 0.2s ease, background 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#0a0a0a";
                    e.currentTarget.style.background = "rgba(10,10,10,0.04)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#6f6f6f";
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  Login
                </Link>
              </motion.div>

              <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }}>
                <Link
                  to="/app/dashboard"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: "#0a0a0a",
                    color: "#fafafa",
                    padding: "12px 18px",
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    textDecoration: "none",
                    boxShadow: "0 10px 24px rgba(0,0,0,0.12)",
                    transition: "opacity 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.86")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  Start free <ArrowRight size={13} />
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </nav>

      {/* HERO */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "160px 40px 120px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center", position: "relative" }}>
        <div
          className="soft-float"
          style={{
            position: "absolute",
            top: 120,
            right: 160,
            width: 180,
            height: 180,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,0,0,0.035), transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          className="soft-float-delay"
          style={{
            position: "absolute",
            top: 280,
            right: 40,
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,0,0,0.03), transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <motion.div
          style={{ scale: heroScale }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="label"
            style={{ marginBottom: 24 }}
          >
            A smarter way to prepare for IELTS
          </motion.div>

          <h1
            style={{
              fontSize: "clamp(52px, 5vw, 72px)",
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
              margin: "0 0 32px",
              overflow: "hidden",
            }}
          >
            <motion.span
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: "block" }}
            >
              Prepare with
            </motion.span>
            <motion.em
              initial={{ opacity: 0, y: 70 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: "block",
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "1.08em",
                letterSpacing: "-0.03em",
              }}
            >
              clarity, confidence, and control.
            </motion.em>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontSize: 16, lineHeight: 1.75, color: "#666", maxWidth: 420, marginBottom: 48, fontWeight: 400 }}
          >
            Grader AI helps you improve faster with realistic practice, instant scoring, and feedback that actually tells you what to do next.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "flex", gap: 12, marginBottom: 64 }}
          >
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/app/dashboard"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "#0a0a0a", color: "#fafafa",
                  padding: "14px 28px",
                  borderRadius: 100,
                  fontSize: 13, fontWeight: 600, letterSpacing: "0.02em",
                  textDecoration: "none",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >
                Start practicing <ArrowRight size={14} />
              </Link>
            </motion.div>
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "transparent", color: "#0a0a0a",
                padding: "14px 28px",
                borderRadius: 100,
                fontSize: 13, fontWeight: 600, letterSpacing: "0.02em",
                border: "1px solid #e0e0e0",
                cursor: "pointer",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "#0a0a0a")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "#e0e0e0")}
            >
              See how it works
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.46, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "flex", gap: 48 }}
          >
            {stats.map(({ value, label }) => (
              <motion.div key={label} whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                <div style={{ fontSize: 28, fontWeight: 300, letterSpacing: "-0.05em", lineHeight: 1 }}>{value}</div>
                <div className="label" style={{ marginTop: 6 }}>{label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* DASHBOARD CARD */}
        <motion.div
          style={{ y: heroY, rotate: dashboardRotate }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <div style={{
            background: "#fff",
            borderRadius: 24,
            border: "1px solid #e8e8e8",
            padding: 32,
            boxShadow: "0 8px 40px rgba(0,0,0,0.06)",
            position: "relative",
            overflow: "hidden",
          }}>
            <div
              className="ambient-sweep"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 1,
                overflow: "hidden",
                opacity: 0.8,
              }}
            />
            {/* Band Score */}
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "flex-start",
              marginBottom: 32,
              paddingBottom: 24,
              borderBottom: "1px solid #f0f0f0",
            }}>
              <div>
                <div className="label" style={{ marginBottom: 8 }}>Projected band</div>
                <div style={{ fontSize: 56, fontWeight: 300, letterSpacing: "-0.06em", lineHeight: 1 }}>8.5</div>
              </div>
              <div style={{
                width: 40, height: 40,
                borderRadius: 12,
                background: "#f0faf4",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <TrendingUp size={18} color="#16a34a" />
              </div>
            </div>

            {/* Skill Scores */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 28 }}>
              {[ ["Speaking", "8.0"], ["Writing", "7.5"], ["Reading", "8.5"]].map(([label, value], index) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.35 + index * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -2 }}
                  style={{ background: "#fafafa", borderRadius: 14, padding: "14px 16px", border: "1px solid #f0f0f0" }}
                >
                  <div className="label" style={{ marginBottom: 6 }}>{label}</div>
                  <div style={{ fontSize: 24, fontWeight: 300, letterSpacing: "-0.05em" }}>{value}</div>
                </motion.div>
              ))}
            </div>

            {/* Chart */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div className="label">Progress over time</div>
                <Zap size={13} color="#888" />
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "flex-end", height: 80 }}>
                {scoreBars.map(({ label, value }, i) => (
                  <div key={label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                    <div style={{ width: "100%", height: 70, display: "flex", alignItems: "flex-end" }}>
                      <motion.div
                        className="bar-fill"
                        style={{
                          width: "100%",
                          height: `${value}%`,
                          background: i === 6 ? "#0a0a0a" : "#e8e8e8",
                          borderRadius: 4,
                          animationDelay: `${i * 0.07}s`,
                        }}
                        whileHover={{ opacity: 0.8 }}
                      />
                    </div>
                    <div className="label" style={{ fontSize: 9 }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Signals */}
            <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: 20 }}>
              <div className="label" style={{ marginBottom: 12 }}>Recent progress</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {signals.slice(0, 3).map((s, i) => (
                  <motion.div
                    key={s}
                    initial={{ opacity: 0, x: 14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.55, delay: 0.5 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ x: 2 }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "10px 14px",
                      background: "#fafafa",
                      borderRadius: 10,
                      border: "1px solid #f0f0f0",
                    }}
                  >
                    <div
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: i === 0 ? "#16a34a" : "#d1d5db",
                      }}
                    />
                    <span style={{ fontSize: 12, color: "#444", fontWeight: 400 }}>{s}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* DIVIDER */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}
      >
        <div style={{ borderTop: "1px solid #e8e8e8", display: "flex", gap: 40, paddingTop: 32, paddingBottom: 32 }}>
          {["Precise feedback", "Real exam feel", "Cleaner practice flow", "Band-aware scoring"].map(item => (
            <motion.span key={item} className="label" whileHover={{ y: -1 }} transition={{ duration: 0.2 }}>{item}</motion.span>
          ))}
        </div>
      </motion.div>

      {/* FOUR SKILLS */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "100px 40px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 64 }}>
          <div>
            <div className="label" style={{ marginBottom: 16 }}>Everything you need in one system</div>
            <h2 style={{ fontSize: "clamp(36px, 3.5vw, 52px)", fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 1.1, margin: 0 }}>
              Four skills.<br />
              <em style={{ fontFamily: "'DM Serif Display', serif", fontStyle: "italic", fontWeight: 400 }}>One clear path to a better band.</em>
            </h2>
          </div>
          <p style={{ fontSize: 15, color: "#666", maxWidth: 320, lineHeight: 1.7, fontWeight: 400 }}>
            Every part of the platform is designed around the exact things examiners listen for, read for, and reward.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
          {skillPillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                className="card-lift"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  background: "#fff",
                  border: "1px solid #e8e8e8",
                  borderRadius: 20,
                  padding: 28,
                  cursor: "default",
                }}
              >
                <motion.div style={{
                  width: 40, height: 40,
                  background: "#f5f5f5",
                  borderRadius: 12,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 28,
                }} whileHover={{ rotate: -6, scale: 1.04 }} transition={{ duration: 0.25 }}>
                  <Icon size={17} color="#0a0a0a" />
                </motion.div>
                <div className="label" style={{ marginBottom: 10 }}>{pillar.tag}</div>
                <h3 style={{ fontSize: 18, fontWeight: 500, letterSpacing: "-0.02em", marginBottom: 12, lineHeight: 1.2 }}>{pillar.title}</h3>
                <p style={{ fontSize: 13, color: "#777", lineHeight: 1.7, fontWeight: 400 }}>{pillar.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ background: "#0a0a0a", padding: "120px 0" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80, alignItems: "start" }}>
            <div>
              <div className="label" style={{ color: "#555", marginBottom: 20 }}>Why it works</div>
              <h2 style={{ fontSize: "clamp(36px, 3vw, 48px)", fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 1.1, color: "#fafafa", margin: 0 }}>
                Designed to turn<br />
                <em style={{ fontFamily: "'DM Serif Display', serif", fontStyle: "italic", fontWeight: 400 }}>effort into measurable progress.</em>
              </h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -4, backgroundColor: "#151515" }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    border: "1px solid #1e1e1e",
                    borderRadius: 20,
                    padding: 28,
                    background: "#111",
                  }}
                >
                  <div style={{
                    fontSize: 10, fontWeight: 600, letterSpacing: "0.14em",
                    textTransform: "uppercase", color: "#555", marginBottom: 16,
                  }}>0{i + 1}</div>
                  <h3 style={{ fontSize: 16, fontWeight: 500, color: "#fafafa", marginBottom: 12, letterSpacing: "-0.02em", lineHeight: 1.3 }}>{f.title}</h3>
                  <p style={{ fontSize: 13, color: "#666", lineHeight: 1.7 }}>{f.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DASHBOARD HIGHLIGHT */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "120px 40px" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
          background: "#fff",
          border: "1px solid #e8e8e8",
          borderRadius: 28,
          padding: "64px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 80,
          alignItems: "center",
          boxShadow: "0 4px 30px rgba(0,0,0,0.04)",
        }}>
          <div>
            <div className="label" style={{ marginBottom: 20 }}>One place for everything</div>
            <h2 style={{ fontSize: "clamp(36px, 3vw, 52px)", fontWeight: 300, letterSpacing: "-0.04em", lineHeight: 1.1, margin: "0 0 24px" }}>
              All four skills.<br />
              <em style={{ fontFamily: "'DM Serif Display', serif", fontStyle: "italic" }}>One focused workflow.</em>
            </h2>
            <p style={{ fontSize: 15, color: "#666", lineHeight: 1.8, maxWidth: 380, marginBottom: 40 }}>
              Follow your progress across speaking, writing, reading, and listening with a dashboard built to make improvement obvious.
            </p>
            <Link
              to="/app/dashboard"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "#0a0a0a", color: "#fafafa",
                padding: "14px 28px", borderRadius: 100,
                fontSize: 13, fontWeight: 600, letterSpacing: "0.02em",
                textDecoration: "none", transition: "opacity 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              Explore dashboard <ArrowRight size={14} />
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              ["Specific feedback instead of vague advice", "#f0faf4", "#16a34a"],
              ["Review mode built for real learning", "#fafafa", "#888"],
              ["A clean interface that keeps you focused", "#fafafa", "#888"],
              ["A faster path from mistakes to improvement", "#fafafa", "#888"],
            ].map(([label, bg, dot], index) => (
              <motion.div key={label as string} style={{
                display: "flex", alignItems: "center", gap: 14,
                padding: "16px 20px",
                background: bg as string,
                borderRadius: 14,
                border: "1px solid #f0f0f0",
              }} initial={{ opacity: 0, x: 18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.55, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }} whileHover={{ x: 3 }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: dot as string, flexShrink: 0 }} />
                <span style={{ fontSize: 14, color: "#333", fontWeight: 400 }}>{label as string}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section style={{ background: "#0a0a0a", padding: "120px 0" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}
        >
          <div>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#555", marginBottom: 24 }}>
              Ready when you are
            </div>
            <h2 style={{ fontSize: "clamp(52px, 5vw, 80px)", fontWeight: 300, letterSpacing: "-0.05em", lineHeight: 1, color: "#fafafa", margin: 0 }}>
              Build a stronger<br />
              <em style={{ fontFamily: "'DM Serif Display', serif", fontStyle: "italic", fontWeight: 400 }}>IELTS result.</em>
            </h2>
          </div>

          <div style={{ maxWidth: 400, textAlign: "right" }}>
            <p style={{ fontSize: 15, color: "#666", lineHeight: 1.8, marginBottom: 32 }}>
              Practice becomes easier to sustain when the product is clear, fast, and genuinely useful after every attempt.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/app/dashboard"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "#fafafa", color: "#0a0a0a",
                  padding: "14px 28px", borderRadius: 100,
                  fontSize: 13, fontWeight: 600, letterSpacing: "0.02em",
                  textDecoration: "none", transition: "opacity 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >
                Start free <ArrowRight size={14} />
              </Link>
              </motion.div>
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/login"
                style={{
                  display: "inline-flex", alignItems: "center",
                  border: "1px solid #1e1e1e", color: "#fafafa",
                  padding: "14px 28px", borderRadius: 100,
                  fontSize: 13, fontWeight: 600, letterSpacing: "0.02em",
                  textDecoration: "none", transition: "border-color 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "#555")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "#1e1e1e")}
              >
                Login
              </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #e8e8e8", padding: "60px 0 40px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 60 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 32, height: 32,
                background: "#0a0a0a",
                borderRadius: 8,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fafafa", fontSize: 14, fontWeight: 800,
              }}>G</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.06em" }}>Grader AI</div>
                <div className="label" style={{ marginTop: 2 }}>Practice better. Score higher.</div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 80 }}>
              {[
                { title: "Modules", items: ["Speaking", "Writing", "Reading", "Listening"] },
                { title: "Product", items: ["Dashboard", "Mock Exams", "Analytics", "Review Flow"] },
                { title: "Trust", items: ["AI scoring", "Band calibration", "Fast feedback", "Progress tracking"] },
              ].map(col => (
                <div key={col.title}>
                  <div className="label" style={{ marginBottom: 20 }}>{col.title}</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {col.items.map(item => (
                      <span key={item} style={{ fontSize: 13, color: "#888", fontWeight: 400, cursor: "pointer", transition: "color 0.2s" }}
                        onMouseEnter={e => (e.currentTarget.style.color = "#0a0a0a")}
                        onMouseLeave={e => (e.currentTarget.style.color = "#888")}
                      >{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="label">© 2026 Grader AI — serious prep, beautifully designed.</span>
            <span className="label">All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}