import { Link } from "react-router-dom";

export function Terms() {
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#fafafa", minHeight: "100vh" }}>
      <style>{`
        * { -webkit-font-smoothing: antialiased; }
        .legal-table { width: 100%; border-collapse: collapse; }
        .legal-table th, .legal-table td { text-align: left; padding: 10px 14px; border-bottom: 1px solid #f0f0f0; font-size: 13px; }
        .legal-table th { font-size: 10px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: #999; background: #fafafa; }
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
          <Link to="/privacy" style={{ fontSize: 13, color: "#777", textDecoration: "none", fontWeight: 500 }}>
            Privacy Policy →
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
            Terms of <em style={{ fontFamily: "'DM Serif Display', serif", fontStyle: "italic" }}>Service</em>
          </h1>
          <div style={{ display: "flex", gap: 20 }}>
            <span style={{ fontSize: 13, color: "#999" }}>Effective: <strong style={{ color: "#555", fontWeight: 500 }}>March 12, 2026</strong></span>
            <span style={{ fontSize: 13, color: "#999" }}>Updated: <strong style={{ color: "#555", fontWeight: 500 }}>March 12, 2026</strong></span>
          </div>
        </div>

        <Section id="1" title="Agreement to Terms">
          <P>Welcome to <strong>Grader AI</strong>. By accessing or using our website at <strong>graderai.app</strong> and our mobile application (collectively, the "Service"), you agree to be bound by these Terms of Service ("Terms").</P>
          <P>If you do not agree to these Terms, please do not use the Service.</P>
        </Section>

        <Section id="2" title="Who We Are">
          <P>Grader AI is an AI-powered IELTS preparation platform providing practice tools, AI-generated scoring and feedback, vocabulary builders, leaderboards, and progress tracking for all four IELTS skills: Speaking, Writing, Reading, and Listening.</P>
          <P><strong>Contact:</strong> <a href="mailto:support@grader.ai" className="legal-link">support@grader.ai</a></P>
        </Section>

        <Section id="3" title="Eligibility">
          <P>To use the Service, you must:</P>
          <UL items={[
            "Be at least 13 years old (or the minimum age of digital consent in your country)",
            "Have the legal capacity to enter into a binding agreement",
            "Not be prohibited from using the Service under applicable law",
          ]} />
          <P>By registering, you confirm that you meet these requirements.</P>
        </Section>

        <Section id="4" title="Your Account">
          <UL items={[
            "You are responsible for keeping your login credentials confidential",
            "You are responsible for all activity that occurs under your account",
            "You must provide accurate and up-to-date information",
            "You must notify us immediately if you suspect unauthorised access to your account at support@grader.ai",
            "We reserve the right to terminate accounts that violate these Terms",
          ]} />
        </Section>

        <Section id="5" title="Free and Premium Plans">
          <H3>5.1 Free Plan</H3>
          <P>The Service offers a limited free tier, which includes:</P>
          <UL items={[
            "1 trial AI-scored session",
            "Access to basic features",
          ]} />
          <H3>5.2 PRO Subscription</H3>
          <P>Premium features require a paid subscription:</P>
          <Table
            headers={["Plan", "Price"]}
            rows={[
              ["PRO Monthly", "$9.99 / month"],
              ["PRO Yearly", "$59.99 / year"],
            ]}
          />
          <P>Subscriptions provide:</P>
          <UL items={[
            "Unlimited AI-scored sessions across all 4 IELTS skills",
            "Full AI feedback, coach plans, and vocabulary enrichment",
            "Access to detailed analytics and leaderboard",
          ]} />
          <H3>5.3 Billing</H3>
          <UL items={[
            "Subscriptions are billed in advance and auto-renew unless cancelled",
            "On web (graderai.app): payments are processed by Stripe",
            "On iOS app: payments are processed by Apple App Store (In-App Purchases)",
            "We do not store your full payment card details",
          ]} />
          <H3>5.4 Cancellation</H3>
          <UL items={[
            "You may cancel your subscription at any time from your account settings",
            "Cancellation takes effect at the end of the current billing period; you retain access until then",
            "We do not offer prorated refunds for partial periods unless required by law",
          ]} />
          <H3>5.5 Refunds</H3>
          <UL items={[
            "Web subscriptions (Stripe): Refund requests may be submitted to support@grader.ai within 14 days of initial purchase (first-time subscribers only)",
            "App Store subscriptions: Refunds are handled by Apple in accordance with their policies",
          ]} />
        </Section>

        <Section id="6" title="Acceptable Use">
          <P>You agree <strong>not</strong> to:</P>
          <UL items={[
            "Use the Service for any unlawful purpose",
            "Attempt to reverse-engineer, decompile, or extract source code from the Service",
            "Scrape, crawl, or harvest data from the Service using automated tools",
            "Circumvent or attempt to bypass any access controls or subscription paywalls",
            "Upload or transmit viruses, malware, or other harmful code",
            "Impersonate any person or entity",
            "Use the Service to spam, harass, or harm other users",
            "Share your account or sell access to your account",
            "Attempt to interfere with the availability or integrity of the Service",
          ]} />
          <P>Violation of these rules may result in immediate account suspension or termination.</P>
        </Section>

        <Section id="7" title="User Content">
          <H3>7.1 Your Ownership</H3>
          <P>You retain full ownership of the content you create using the Service, including written essays, audio recordings, and notes.</P>
          <H3>7.2 License to Us</H3>
          <P>By submitting content, you grant Grader AI a limited, non-exclusive, royalty-free licence to:</P>
          <UL items={[
            "Process and store your content to provide the Service (e.g., AI scoring, feedback)",
            "Display your content back to you in your account",
          ]} />
          <P>This licence does not allow us to sell, publish, or share your content publicly without your consent.</P>
          <H3>7.3 Prohibited Content</H3>
          <P>You must not submit content that:</P>
          <UL items={[
            "Violates any law or regulation",
            "Infringes any third-party intellectual property rights",
            "Contains personal data of others without their consent",
            "Is harmful, hateful, discriminatory, or pornographic",
          ]} />
        </Section>

        <Section id="8" title="AI-Generated Content Disclaimer">
          <P>The Service uses artificial intelligence to analyse your IELTS performance and generate feedback, scores, and recommendations.</P>
          <Callout>
            AI feedback is probabilistic and may contain errors or inaccuracies. AI-generated band scores are <strong>estimates</strong> and should not be taken as official IELTS results. Official IELTS band scores can only be obtained by taking an official exam administered by IDP or British Council. Do not rely solely on AI feedback for high-stakes decisions (visa applications, university admissions, employment).
          </Callout>
          <P>Grader AI is an independent product and is <strong>not</strong> affiliated with, endorsed by, or officially connected with IDP Education, British Council, or Cambridge Assessment English.</P>
        </Section>

        <Section id="9" title="Intellectual Property">
          <P>All content, features, code, design, trademarks, logos, and branding on the Service are owned by or licensed to Grader AI. You may not copy, reproduce, modify, or distribute any part of the Service without our prior written consent.</P>
        </Section>

        <Section id="10" title="Third-Party Services">
          <P>The Service integrates with third-party platforms including OpenAI, Google Firebase, Stripe, and others. Your use of these services is subject to their respective terms and privacy policies. We are not responsible for the availability or accuracy of third-party services.</P>
        </Section>

        <Section id="11" title="Service Availability">
          <P>We strive to keep the Service available 24/7 but do not guarantee uninterrupted access. We may:</P>
          <UL items={[
            "Perform scheduled maintenance (with advance notice where possible)",
            "Temporarily suspend the Service for emergency fixes or security reasons",
            "Modify, add, or remove features",
          ]} />
          <P>We will not be liable for any losses caused by unavailability of the Service.</P>
        </Section>

        <Section id="12" title="Termination">
          <H3>12.1 By You</H3>
          <P>You may delete your account at any time from <strong>Profile → Settings → Delete Account</strong>. Upon deletion:</P>
          <UL items={[
            "Your personal data will be deleted within 30 days",
            "Active subscriptions will not be refunded for the remaining period",
          ]} />
          <H3>12.2 By Us</H3>
          <P>We may suspend or terminate your account if:</P>
          <UL items={[
            "You violate these Terms",
            "You engage in fraudulent activity",
            "Continued access poses a legal or security risk",
          ]} />
          <P>We will attempt to notify you before termination unless immediate action is required.</P>
        </Section>

        <Section id="13" title="Limitation of Liability">
          <P>To the maximum extent permitted by applicable law:</P>
          <UL items={[
            "Grader AI's total liability to you for any claim shall not exceed the amount you paid us in the 12 months preceding the claim (or $10 USD if you have not paid anything)",
            "We are not liable for any indirect, incidental, consequential, special, or punitive damages, including loss of profits, data, or goodwill",
            "We are not liable for the accuracy of AI-generated scoring or feedback",
          ]} />
          <P>Nothing in these Terms limits our liability for fraud, gross negligence, or any liability that cannot be excluded by law.</P>
        </Section>

        <Section id="14" title="Indemnification">
          <P>You agree to defend, indemnify, and hold Grader AI harmless from any claims, liabilities, damages, and expenses (including legal fees) arising from:</P>
          <UL items={[
            "Your use of the Service in violation of these Terms",
            "Content you submit through the Service",
            "Your violation of any applicable law or third-party rights",
          ]} />
        </Section>

        <Section id="15" title="Governing Law and Disputes">
          <P>These Terms are governed by and construed in accordance with the laws of the <strong>Republic of Kazakhstan</strong> (or your country of residence if mandatory consumer protection laws apply there).</P>
          <P>Any disputes shall first be attempted to be resolved amicably via email at <a href="mailto:support@grader.ai" className="legal-link">support@grader.ai</a>. If unresolved within 30 days, disputes shall be submitted to the courts of competent jurisdiction.</P>
          <P><strong>For EU/EEA users:</strong> You may also submit complaints to your local consumer protection authority or use the EU Online Dispute Resolution platform at <a href="https://ec.europa.eu/consumers/odr" className="legal-link" target="_blank" rel="noreferrer">https://ec.europa.eu/consumers/odr</a>.</P>
        </Section>

        <Section id="16" title="Changes to These Terms">
          <P>We may update these Terms from time to time. When we make material changes, we will:</P>
          <UL items={[
            "Update the \"Last Updated\" date at the top of this page",
            "Notify you via email or an in-app notification",
          ]} />
          <P>Your continued use of the Service after the effective date of changes constitutes your acceptance of the updated Terms.</P>
        </Section>

        <Section id="17" title="Entire Agreement">
          <P>These Terms, together with our <Link to="/privacy" className="legal-link">Privacy Policy</Link>, constitute the entire agreement between you and Grader AI regarding your use of the Service and supersede all prior agreements.</P>
        </Section>

        <Section id="18" title="Contact Us">
          <P>If you have any questions about these Terms, please contact us:</P>
          <P><strong>Email:</strong> <a href="mailto:support@grader.ai" className="legal-link">support@grader.ai</a></P>
          <P><strong>Website:</strong> <a href="https://graderai.app/terms" className="legal-link" target="_blank" rel="noreferrer">https://graderai.app/terms</a></P>
        </Section>

        {/* Footer */}
        <div style={{ marginTop: 64, paddingTop: 24, borderTop: "1px solid #e8e8e8", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontSize: 12, color: "#ccc" }}>© 2026 Grader AI. All rights reserved.</span>
          <div style={{ display: "flex", gap: 20 }}>
            <Link to="/privacy" style={{ fontSize: 12, color: "#bbb", textDecoration: "none" }}>Privacy Policy</Link>
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

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      background: "#fff", border: "1px solid #e8e8e8", borderLeft: "3px solid #0a0a0a",
      borderRadius: "0 12px 12px 0", padding: "14px 18px",
    }}>
      <p style={{ fontSize: 13, color: "#555", lineHeight: 1.75, margin: 0 }}>{children}</p>
    </div>
  );
}

import React from "react";
