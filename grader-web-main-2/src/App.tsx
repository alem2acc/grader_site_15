import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { Landing } from "./pages/Landing";
import { Dashboard } from "./pages/Dashboard";
import { Speaking } from "./pages/Speaking";
import { SpeakingResult } from "./pages/SpeakingResult";
import { Writing } from "./pages/Writing";
import { WritingResult } from "./pages/WritingResult";
import { Reading } from "./pages/Reading";
import ReadingPractice from "./pages/ReadingPractice";
import { ReadingResult } from "./pages/ReadingResult";
import { Listening } from "./pages/Listening";
import { ListeningResult } from "./pages/ListeningResult";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Profile } from "./pages/Profile";
import { SpeakingPractice } from "./pages/SpeakingPractice";
import { WritingPractice } from "./pages/WritingPractice";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Vocabulary } from "./pages/Vocabulary";
import { Analytics } from "./pages/Analytics";
import { Privacy } from "./pages/Privacy";
import { Terms } from "./pages/Terms";
import { StudyPlan } from "./pages/StudyPlan";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />

        {/* Full-screen practice routes — protected */}
        <Route path="/app/reading/practice" element={<ProtectedRoute><ReadingPractice /></ProtectedRoute>} />
        <Route path="/app/speaking/practice" element={<ProtectedRoute><SpeakingPractice /></ProtectedRoute>} />
        <Route path="/app/writing/task1" element={<ProtectedRoute><WritingPractice /></ProtectedRoute>} />
        <Route path="/app/writing/task2" element={<ProtectedRoute><WritingPractice /></ProtectedRoute>} />

        <Route path="/app" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
          <Route index element={<Navigate to="/app/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="study-plan" element={<StudyPlan />} />

          <Route path="speaking" element={<Speaking />} />
          <Route path="speaking/results/:id" element={<SpeakingResult />} />

          <Route path="writing" element={<Writing />} />
          <Route path="writing/results/:id" element={<WritingResult />} />

          <Route path="reading" element={<Reading />} />
          <Route path="reading/results/:id" element={<ReadingResult />} />

          <Route path="listening" element={<Listening />} />
          <Route path="listening/results/:id" element={<ListeningResult />} />

          <Route path="vocabulary" element={<Vocabulary />} />
          <Route path="leaderboard" element={<div className="p-8 text-center text-text-secondary">Leaderboard Coming Soon</div>} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<div className="p-8 text-center text-text-secondary">Settings Coming Soon</div>} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

