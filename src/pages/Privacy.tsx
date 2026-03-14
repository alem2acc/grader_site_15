import { Link } from "react-router-dom";

export function Privacy() {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#fafafa", minHeight: "100vh" }}>
      <style>{`
        * { -webkit-font-smoothing: antialiased; }
        .legal-table { width: 100%; borderCollapse: collapse; }
        .legal-table th, .legal-table td { text-align: left; padding: 10px 14px; border-bottom: 1px solid #f0f0f0; font-size: 13px; }
        .legal-table th { font-size: 10px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: #999; background: #fafafa; }
        .legal-table td { color: #555; }
        .legal-table tr:last-child td { border-bottom: none; }
        a.legal-link { color: #0a0a0a; font-weight: 500; }
        a.legal-link:hover { opacity: 0.7; }
      `}</style>

      {/* Top nav */}
      <div style={{ borderBottom: "1px solid #e8e8e8", background: "#fff" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "18px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: 9, textDecoration: "none" }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontWeight: 700, fontSize: 13, color: "#fff", fontFamily: "'DM Serif Display', serif" }}>G</span>
            </div>
            <span style={{ fontWeight: 600, fontSize: 15, color: "#0a0a0a", letterSpacing: "-0.02em" }}>Grader AI</span>
          </Link>
          <Link to="/terms" style={{ fontSize: 13, color: "#777", textDecoration: "none", fontWeight: 500 }}>
            Terms of Service →
          </Link>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "56px 32px 96px" }}>

        {/* Header */}
        <div style={{ marginBottom: 52 }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#bbb", marginBottom: 14 }}>
            Legal
          </div>
          <h1 style={{ fontSize: 40, fontWeight: 300, letterSpacing: "-0.04em", color: "#0a0a0a", margin: "0 0 14px" }}>
            Privacy <em style={{ fontFamily: "'DM Serif Display', serif", fontStyle: "italic" }}>Policy</em>
          </h1>
          <div style={{ display: "flex", gap: 20 }}>
            <span style={{ fontSize: 13, color: "#999" }}>Effective: <strong style={{ color: "#555", fontWeight: 500 }}>March 12, 2026</strong></span>
            <span style={{ fontSize: 13, color: "#999" }}>Updated: <strong style={{ color: "#555", fontWeight: 500 }}>March 12, 2026</strong></span>
          </div>
        </div>

        <Section id="1" title="Introduction">
          <P>Welcome to <strong>Grader AI</strong> ("we", "our", "us"). We operate the website <strong>graderai.app</strong> and the Grader AI mobile application (collectively, the "Service").</P>
          <P>This Privacy Policy explains what personal data we collect, why we collect it, how we use and protect it, and what rights you have over your data.</P>
          <P>By using the Service, you agree to the practices described in this policy.</P>
        </Section>

        <Section id="2" title="Who We Are">
          <P>Grader AI is an AI-powered IELTS preparation platform. Our Service helps users practice and improve their IELTS band scores across Speaking, Writing, Reading, and Listening sections.</P>
          <P><strong>Contact:</strong> <a href="mailto:support@grader.ai" className="legal-link">support@grader.ai</a></P>
        </Section>

        <Section id="3" title="What Data We Collect">
          <H3>3.1 Data You Provide Directly</H3>
          <Table
            headers={["Data Type", "When Collected"]}
            rows={[
              ["Full name", "During registration"],
              ["Email address", "During registration or sign-in"],
              ["Profile photo", "When you upload one (optional)"],
              ["Current and target IELTS band score", "During onboarding"],
              ["Exam date", "During onboarding"],
              ["Native language", "During onboarding"],
              ["Weekly study goal", "During onboarding"],
              ["Written essay text", "When you submit a Writing task"],
            ]}
          />
          <H3>3.2 Data We Collect Automatically</H3>
          <Table
            headers={["Data Type", "Purpose"]}
            rows={[
              ["IELTS session results and band scores", "Track your progress"],
              ["Audio recordings and transcriptions", "Generate Speaking feedback"],
              ["Feature usage and navigation events", "Improve the product"],
              ["App version, OS, browser type", "Debugging and compatibility"],
              ["Crash reports and error logs", "Fix bugs"],
            ]}
          />
          <H3>3.3 Data from Third Parties</H3>
          <UL items={[
            "Google / Apple — name and email address when you sign in via Google or Apple",
            "Stripe — subscription and payment status (we do not receive or store your full card number)",
          ]} />
        </Section>

        <Section id="4" title="How We Use Your Data">
          <Table
            headers={["Purpose", "Legal Basis"]}
            rows={[
              ["Provide the IELTS practice service (AI scoring, feedback, vocabulary)", "Contract performance"],
              ["Personalise your learning plan and recommendations", "Legitimate interest"],
              ["Sync your progress across devices (mobile ↔ web)", "Contract performance"],
              ["Process subscriptions and payments", "Contract performance"],
              ["Send product update emails (you can opt out anytime)", "Legitimate interest"],
              ["Analyse usage to improve the product", "Legitimate interest"],
              ["Detect fraud and prevent abuse", "Legitimate interest"],
              ["Comply with legal obligations", "Legal obligation"],
            ]}
          />
          <P>We do <strong>not</strong> use your data for advertising or sell it to any third party.</P>
        </Section>

        <Section id="5" title="Audio and AI Processing">
          <UL items={[
            "Recording: We record your voice during IELTS Speaking practice sessions, with your explicit permission.",
            "Transcription: Audio is transcribed using OpenAI Whisper.",
            "AI Analysis: The transcribed text is analysed by OpenAI GPT-4o and/or Google Gemini to generate your IELTS band score and personalised feedback.",
            "Storage: Audio files are stored securely in Firebase Storage.",
            "Retention: Audio recordings are kept for the lifetime of your account or until you request deletion.",
          ]} />
          <P>Your audio recordings are <strong>never</strong> used to train external AI models.</P>
        </Section>

        <Section id="6" title="Third-Party Services">
          <P>We use the following trusted third-party services that may process your data as part of delivering the Service:</P>
          <Table
            headers={["Service", "Provider", "Purpose"]}
            rows={[
              ["Firebase Auth", "Google LLC", "User authentication"],
              ["Cloud Firestore", "Google LLC", "Database (scores, progress)"],
              ["Firebase Storage", "Google LLC", "Audio files, profile photos"],
              ["Firebase Analytics", "Google LLC", "Anonymous usage analytics"],
              ["Firebase Crashlytics", "Google LLC", "Crash reporting"],
              ["OpenAI API", "OpenAI, L.L.C.", "Speaking and Writing AI scoring"],
              ["Gemini API", "Google LLC", "Writing AI scoring"],
              ["Merriam-Webster API", "Encyclopedia Britannica", "Vocabulary definitions"],
              ["Stripe", "Stripe, Inc.", "Subscription billing"],
              ["Vercel", "Vercel, Inc.", "Website hosting"],
            ]}
          />
          <P>Each provider has their own privacy policy. We only share the minimum data necessary for each service to function.</P>
        </Section>

        <Section id="7" title="Data Storage and Security">
          <UL items={[
            "All data is stored in Google Cloud infrastructure (Firebase), located in data centres that comply with international security standards.",
            "All data is encrypted in transit (TLS/HTTPS) and at rest (AES-256).",
            "API keys and secrets are stored server-side and are never exposed to the browser.",
            "Access to user data is restricted to authorised team members on a need-to-know basis.",
          ]} />
        </Section>

        <Section id="8" title="Data Retention">
          <Table
            headers={["Data Type", "Retention Period"]}
            rows={[
              ["Account and profile data", "Until you delete your account"],
              ["IELTS results and progress", "Until you delete your account"],
              ["Audio recordings", "Until you delete your account or request deletion"],
              ["Analytics data (anonymised)", "26 months (Google Analytics standard)"],
              ["Payment records", "As required by applicable tax/accounting law"],
            ]}
          />
        </Section>

        <Section id="9" title="Your Rights">
          <P>Depending on where you live, you may have the following rights:</P>
          <UL items={[
            "Access — Request a copy of the data we hold about you",
            "Correction — Ask us to correct inaccurate or incomplete data",
            "Deletion — Ask us to delete your account and associated data (\"right to be forgotten\")",
            "Portability — Receive your data in a structured, machine-readable format",
            "Objection — Object to certain types of processing (e.g., analytics)",
            "Withdraw consent — Where processing is based on consent, withdraw it at any time",
          ]} />
          <P>To exercise any of these rights, email us at <a href="mailto:support@grader.ai" className="legal-link">support@grader.ai</a> with subject line "Data Request". We will respond within <strong>30 days</strong>.</P>
          <P>You can also delete your account directly from the app: <strong>Profile → Settings → Delete Account</strong>.</P>
        </Section>

        <Section id="10" title="Children's Privacy">
          <P>The Service is not directed at children under the age of <strong>13</strong> (or 16 in the European Economic Area). We do not knowingly collect personal data from children. If you believe a child has provided us with personal data, please contact us at <a href="mailto:support@grader.ai" className="legal-link">support@grader.ai</a> and we will delete it promptly.</P>
        </Section>

        <Section id="11" title="Cookies and Tracking (Website)">
          <P>Our website (<strong>graderai.app</strong>) uses:</P>
          <Table
            headers={["Type", "Purpose", "Can be opted out"]}
            rows={[
              ["Essential cookies", "Authentication session, security", "No (required for login)"],
              ["Analytics cookies", "Firebase Analytics — anonymous page views", "Yes (via cookie banner)"],
              ["Preference cookies", "Theme (dark/light), language", "Yes"],
            ]}
          />
          <P>We do <strong>not</strong> use advertising or tracking cookies.</P>
        </Section>

        <Section id="12" title="International Transfers">
          <P>Your data may be processed in the United States and other countries where our service providers (Google, OpenAI, Stripe) operate. Where required, we rely on appropriate transfer mechanisms such as Standard Contractual Clauses (SCCs) to ensure your data is protected.</P>
        </Section>

        <Section id="13" title="Changes to This Policy">
          <P>We may update this Privacy Policy from time to time. When we make significant changes, we will:</P>
          <UL items={[
            "Update the \"Last Updated\" date at the top of this page",
            "Send you an email notification (if you have a registered account)",
          ]} />
          <P>Continued use of the Service after changes constitutes acceptance of the updated policy.</P>
        </Section>

        <Section id="14" title="Contact">
          <P>If you have any questions or concerns about this Privacy Policy, please contact us:</P>
          <P><strong>Email:</strong> <a href="mailto:support@grader.ai" className="legal-link">support@grader.ai</a></P>
          <P><strong>Website:</strong> <a href="https://graderai.app/privacy" className="legal-link" target="_blank" rel="noreferrer">https://graderai.app/privacy</a></P>
        </Section>

        {/* Footer */}
        <div style={{ marginTop: 64, paddingTop: 24, borderTop: "1px solid #e8e8e8", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontSize: 12, color: "#ccc" }}>© 2026 Grader AI. All rights reserved.</span>
          <div style={{ display: "flex", gap: 20 }}>
            <Link to="/terms" style={{ fontSize: 12, color: "#bbb", textDecoration: "none" }}>Terms of Service</Link>
            <Link to="/" style={{ fontSize: 12, color: "#bbb", textDecoration: "none" }}>Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── shared sub-components ─────────────────────────────────────────────────── */
function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <div id={`section-${id}`} style={{ marginBottom: 44 }}>
      <h2 style={{ fontSize: 18, fontWeight: 500, letterSpacing: "-0.02em", color: "#0a0a0a", margin: "0 0 16px", paddingTop: 4 }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: "#ccc", marginRight: 10, letterSpacing: "0.04em" }}>{id}.</span>
        {title}
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {children}
      </div>
    </div>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 style={{ fontSize: 13, fontWeight: 600, color: "#333", margin: "6px 0 8px", letterSpacing: "-0.01em" }}>
      {children}
    </h3>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: 14, color: "#555", lineHeight: 1.75, margin: 0 }}>
      {children}
    </p>
  );
}

function UL({ items }: { items: string[] }) {
  return (
    <ul style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 6 }}>
      {items.map((item, i) => (
        <li key={i} style={{ fontSize: 14, color: "#555", lineHeight: 1.7 }}>{item}</li>
      ))}
    </ul>
  );
}

function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div style={{ borderRadius: 14, border: "1px solid #e8e8e8", overflow: "hidden", background: "#fff" }}>
      <table className="legal-table">
        <thead>
          <tr>
            {headers.map((h) => <th key={h}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j} style={{ color: j === 0 ? "#333" : "#777", fontWeight: j === 0 ? 500 : 400 }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import React from "react";
