<div align="center">

# 🎓 Grader AI

**Your personal IELTS coach**

Practice Speaking, Writing, Reading, and Listening. Get real band scores with detailed feedback in seconds, not days.

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite)](https://vitejs.dev)
[![Firebase](https://img.shields.io/badge/Firebase-12-FFCA28?style=flat-square&logo=firebase)](https://firebase.google.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38BDF8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)

</div>

---

## Why does this exist?

Most IELTS prep tools give you a band score and nothing else. You stare at a "6.5" and wonder: *why?* What exactly was wrong? What do I fix first?

Grader AI solves that. It records your voice, transcribes it with Whisper, and feeds everything to GPT-4o — which scores you on all four IELTS sub-criteria (Fluency, Lexical Resource, Grammatical Range, Pronunciation) and writes specific, actionable feedback. Not generic tips. Feedback about *your* answer.

Same idea for Writing. Paste your essay, get a score, get a rewritten model paragraph, understand the gap.

---

## What's inside

```
src/
├── pages/
│   ├── Landing.tsx          — marketing / homepage
│   ├── Login.tsx            — beautiful split-screen auth
│   ├── Register.tsx         — with live password strength meter
│   ├── Dashboard.tsx        — stats + recent sessions from Firestore
│   ├── Speaking.tsx         — hub with avg band + session history
│   ├── SpeakingPractice.tsx — record → Whisper → GPT-4o → score
│   ├── SpeakingResult.tsx   — detailed feedback breakdown
│   ├── Writing.tsx          — hub
│   ├── WritingPractice.tsx  — essay editor + timer
│   ├── WritingResult.tsx    — criteria breakdown + model answer
│   ├── Reading.tsx          — hub
│   ├── ReadingPractice.tsx  — 20 real passages with T/F/NG + MCQ
│   ├── Listening.tsx        — hub
│   └── Profile.tsx          — account settings
├── contexts/
│   └── AuthContext.tsx      — Firebase Auth (email + Google)
├── lib/
│   ├── firebase.ts          — Firestore + Auth setup
│   └── openai.ts            — Whisper + GPT-4o calls
└── components/
    ├── ProtectedRoute.tsx
    └── layout/              — AppLayout, Sidebar, TopNav
```

---

## Tech stack

| Layer | Choice | Why |
|---|---|---|
| Frontend | React 19 + Vite 6 | Fast, modern, HMR that actually works |
| Styling | Tailwind CSS v4 | Dark mode, custom tokens, no CSS files |
| Language | TypeScript 5.8 | Because runtime surprises aren't fun |
| Auth | Firebase Auth | Google Sign-In + email in 10 lines |
| Database | Firestore | Session history per user, real-time |
| AI / Speech | OpenAI Whisper + GPT-4o | Best-in-class accuracy for both |
| Icons | Lucide React | Consistent, tree-shakeable |
| Router | React Router v7 | File-level code splitting |

---

## Getting started

### 1. Clone and install

```bash
git clone https://github.com/Danchouvzv/grader-web.git
cd grader-web
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

Open `.env` and fill in your keys:

```env
# Firebase — create a project at https://console.firebase.google.com
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

# OpenAI — get your key at https://platform.openai.com/api-keys
VITE_OPENAI_API_KEY=
```

> **Note:** The app uses Whisper-1 for transcription and GPT-4o for scoring. Make sure your OpenAI account has access to both models.

### 3. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and start practising.

---

## Firebase setup (2 minutes)

1. Go to [Firebase Console](https://console.firebase.google.com) → create a project
2. **Authentication** → Enable *Email/Password* and *Google* providers
3. **Firestore** → Create database in production mode, then add this security rule:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

---

## Available scripts

```bash
npm run dev      # Start dev server on :3000
npm run build    # Production build → dist/
npm run preview  # Preview production build locally
npm run lint     # TypeScript type check (zero errors expected)
```

---

## How the AI grading works

```
User speaks into mic
      ↓
MediaRecorder → audio/webm blob
      ↓
OpenAI Whisper API → transcript text
      ↓
GPT-4o prompt with transcript + IELTS rubric
      ↓
JSON response: { overallBand, fluency, lexical, grammar, pronunciation, feedback[] }
      ↓
Saved to Firestore → shown on result page
```

For Writing, the flow skips Whisper and sends the essay text directly to GPT-4o along with Task type (Task 1 / Task 2) and word count.

---

## Roadmap

- [ ] Listening practice with real audio clips
- [ ] Full Reading mock test (3 passages, 40 questions, 60-minute timer)
- [ ] Weekly progress charts
- [ ] Vocabulary builder from your own mistakes
- [ ] Mobile app (React Native)

---

## Contributing

Pull requests are welcome. For major changes, open an issue first to discuss what you'd like to change.

---

## License

MIT — use it, fork it, build on it.

---

<div align="center">
  Built with ☕ and a genuine hatred for expensive IELTS prep courses.
</div>
Dummy change
