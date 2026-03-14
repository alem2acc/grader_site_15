import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff, Loader2, ArrowRight, Mic, PenTool, BookOpen, Headphones } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const SKILL_CARDS: { icon: React.ElementType; label: string; score: string }[] = [
  { icon: Mic,        label: "Speaking",  score: "7.5" },
  { icon: PenTool,    label: "Writing",   score: "6.5" },
  { icon: BookOpen,   label: "Reading",   score: "8.0" },
  { icon: Headphones, label: "Listening", score: "7.0" },
];

export function Login() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { signIn, signInWithGoogle } = useAuth();
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || "/app/dashboard";

  const [email, setEmail]               = useState("");
  const [password, setPassword]         = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading]           = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError]               = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signIn(email, password);
      navigate(from, { replace: true });
    } catch (err: unknown) {
      const msg = (err as { code?: string })?.code;
      if (msg === "auth/user-not-found" || msg === "auth/wrong-password" || msg === "auth/invalid-credential") {
        setError("Invalid email or password.");
      } else if (msg === "auth/too-many-requests") {
        setError("Too many attempts. Please try again later.");
      } else {
        setError("Sign in failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    setGoogleLoading(true);
    try {
      await signInWithGoogle();
      navigate(from, { replace: true });
    } catch {
      setError("Google sign in failed. Please try again.");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", minHeight: "100vh", display: "flex" }}>
      <style>{`
        * { -webkit-font-smoothing: antialiased; }
        #login-left { display: none; }
        @media (min-width: 1024px) { #login-left { display: flex !important; } }
        .login-mobile-logo { display: flex; }
        @media (min-width: 1024px) { .login-mobile-logo { display: none !important; } }
        .auth-input:focus { border-color: #0a0a0a !important; background: #fff !important; outline: none; }
        .auth-input::placeholder { color: #bbb; }
        .login-google:hover:not(:disabled) { background: #f5f5f5 !important; }
        .login-submit:hover:not(:disabled) { opacity: 0.82; }
        .login-skill-card:hover { background: #1a1a1a !important; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      {/* ── LEFT PANEL ── */}
      <div
        id="login-left"
        style={{
          width: "52%", flexShrink: 0, background: "#0a0a0a",
          flexDirection: "column", justifyContent: "space-between", padding: "52px 60px",
        }}
      >
        {/* Logo */}
        <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10, background: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontWeight: 700, fontSize: 15, color: "#0a0a0a", fontFamily: "'DM Serif Display', serif" }}>G</span>
          </div>
          <span style={{ fontWeight: 600, fontSize: 16, color: "#fff", letterSpacing: "-0.02em" }}>Grader AI</span>
        </Link>

        {/* Main content */}
        <div>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#555", marginBottom: 18 }}>
            AI-Powered IELTS Coaching
          </div>
          <h1 style={{ fontSize: 48, fontWeight: 300, letterSpacing: "-0.05em", color: "#fff", lineHeight: 1.1, margin: "0 0 18px" }}>
            Reach your<br />
            <em style={{ fontFamily: "'DM Serif Display', serif", fontStyle: "italic", fontWeight: 400 }}>target band</em><br />
            faster.
          </h1>
          <p style={{ fontSize: 14, color: "#555", lineHeight: 1.75, maxWidth: 340, margin: "0 0 36px" }}>
            Real-time AI grading across all four skills. Instant feedback. Personalized improvement plans.
          </p>

          {/* Skill score cards 2×2 */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, maxWidth: 320, marginBottom: 36 }}>
            {SKILL_CARDS.map((card) => (
              <div
                key={card.label}
                className="login-skill-card"
                style={{
                  background: "#141414", borderRadius: 16, padding: "18px 20px",
                  border: "1px solid #1e1e1e", display: "flex", alignItems: "center",
                  justifyContent: "space-between", transition: "background 0.15s",
                }}
              >
                <div>
                  <card.icon size={14} color="#555" style={{ marginBottom: 8, display: "block" }} />
                  <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#555" }}>
                    {card.label}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 26, fontWeight: 300, letterSpacing: "-0.05em", color: "#fff" }}>{card.score}</div>
                  <div style={{ fontSize: 10, color: "#444" }}>band</div>
                </div>
              </div>
            ))}
          </div>

          {/* Social proof */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ display: "flex" }}>
              {(["#2a2a2a", "#303030", "#363636", "#3c3c3c"] as string[]).map((bg, i) => (
                <div
                  key={i}
                  style={{
                    width: 30, height: 30, borderRadius: "50%", background: bg,
                    border: "2px solid #0a0a0a", display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: 11, fontWeight: 600, color: "#777",
                    marginLeft: i > 0 ? -8 : 0,
                  }}
                >
                  {["A", "M", "J", "K"][i]}
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, color: "#fff" }}>12,000+ students</div>
              <div style={{ fontSize: 11, color: "#444" }}>improved their IELTS score</div>
            </div>
          </div>
        </div>

        {/* Testimonial */}
        <div style={{ borderTop: "1px solid #1a1a1a", paddingTop: 24 }}>
          <p style={{ fontSize: 13, color: "#555", fontStyle: "italic", lineHeight: 1.65, margin: "0 0 8px" }}>
            "I went from Band 6.0 to 7.5 in just 6 weeks using Grader AI."
          </p>
          <p style={{ fontSize: 11, color: "#333", fontWeight: 500, margin: 0 }}>
            — Aisha M., accepted to Imperial College London
          </p>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", background: "#fafafa", padding: "48px 40px" }}>
        <div style={{ width: "100%", maxWidth: 400, margin: "0 auto" }}>

          {/* Mobile logo */}
          <div className="login-mobile-logo" style={{ alignItems: "center", gap: 10, marginBottom: 40 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontWeight: 700, fontSize: 13, color: "#fff" }}>G</span>
            </div>
            <span style={{ fontWeight: 600, fontSize: 15, color: "#0a0a0a", letterSpacing: "-0.02em" }}>Grader AI</span>
          </div>

          {/* Heading */}
          <div style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: 28, fontWeight: 300, letterSpacing: "-0.04em", color: "#0a0a0a", margin: "0 0 8px" }}>
              Welcome{" "}
              <em style={{ fontFamily: "'DM Serif Display', serif", fontStyle: "italic" }}>back</em>
            </h2>
            <p style={{ fontSize: 13, color: "#999", margin: 0 }}>
              New to Grader AI?{" "}
              <Link to="/register" style={{ color: "#0a0a0a", fontWeight: 600, textDecoration: "none" }}>
                Create a free account →
              </Link>
            </p>
          </div>

          {/* Google button */}
          <button
            onClick={handleGoogle}
            disabled={googleLoading}
            className="login-google"
            style={{
              width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
              padding: "12px 20px", borderRadius: 14, border: "1px solid #e8e8e8", background: "#fff",
              fontSize: 14, fontWeight: 500, color: "#0a0a0a",
              cursor: googleLoading ? "not-allowed" : "pointer",
              fontFamily: "'DM Sans', sans-serif", transition: "background 0.15s", marginBottom: 18,
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)", opacity: googleLoading ? 0.6 : 1,
            }}
          >
            {googleLoading ? (
              <Loader2 size={15} color="#777" style={{ animation: "spin 1s linear infinite" }} />
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
            )}
            Continue with Google
          </button>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
            <div style={{ flex: 1, height: 1, background: "#e8e8e8" }} />
            <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#ccc" }}>or</span>
            <div style={{ flex: 1, height: 1, background: "#e8e8e8" }} />
          </div>

          {/* Error */}
          {error && (
            <div style={{
              marginBottom: 14, padding: "12px 16px",
              background: "#fff1f2", border: "1px solid #fca5a5", borderRadius: 12,
              fontSize: 13, color: "#e11d48", fontWeight: 500,
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#e11d48", flexShrink: 0 }} />
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {/* Email */}
            <div>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#999", marginBottom: 6 }}>
                Email
              </label>
              <input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="auth-input"
                style={{
                  width: "100%", padding: "12px 16px", borderRadius: 12,
                  border: "1px solid #e8e8e8", background: "#fff",
                  fontSize: 14, color: "#0a0a0a", fontFamily: "'DM Sans', sans-serif",
                  transition: "border-color 0.15s, background 0.15s", boxSizing: "border-box",
                }}
              />
            </div>

            {/* Password */}
            <div>
              <label style={{ display: "block", fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#999", marginBottom: 6 }}>
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="auth-input"
                  style={{
                    width: "100%", padding: "12px 44px 12px 16px", borderRadius: 12,
                    border: "1px solid #e8e8e8", background: "#fff",
                    fontSize: 14, color: "#0a0a0a", fontFamily: "'DM Sans', sans-serif",
                    transition: "border-color 0.15s, background 0.15s", boxSizing: "border-box",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)",
                    background: "none", border: "none", cursor: "pointer", color: "#bbb",
                    padding: 0, display: "flex", alignItems: "center",
                  }}
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            <div style={{ textAlign: "right", marginTop: -4 }}>
              <a href="#" style={{ fontSize: 12, color: "#bbb", textDecoration: "none", fontWeight: 500 }}>
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="login-submit"
              style={{
                width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                padding: "14px 24px", borderRadius: 100, background: "#0a0a0a",
                color: "#fff", border: "none", cursor: loading ? "not-allowed" : "pointer",
                fontSize: 14, fontWeight: 600, fontFamily: "'DM Sans', sans-serif",
                opacity: loading ? 0.6 : 1, transition: "opacity 0.2s",
              }}
            >
              {loading
                ? <Loader2 size={15} style={{ animation: "spin 1s linear infinite" }} />
                : <ArrowRight size={15} />}
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <p style={{ textAlign: "center", fontSize: 11, color: "#ccc", margin: "24px 0 0" }}>
            By signing in you agree to our{" "}
            <a href="#" style={{ color: "#999", textDecoration: "underline" }}>Terms</a>{" "}
            and{" "}
            <a href="#" style={{ color: "#999", textDecoration: "underline" }}>Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
