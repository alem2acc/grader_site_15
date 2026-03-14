import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LogOut, ChevronRight, Zap, Activity, Target,
  Edit3, Check, X, Loader2, BookOpen, Mic, PenTool, Headphones,
  CalendarDays, Flame,
} from "lucide-react";
import {
  collection, query, orderBy, limit, getDocs,
  doc, updateDoc,
} from "firebase/firestore";
import { updateProfile as updateFirebaseProfile } from "firebase/auth";
import { db, auth } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";


// ── Types ─────────────────────────────────────────────────────────────────────
interface Session {
  id: string;
  type: string;
  overallBand: number;
  createdAt: { toDate: () => Date } | null;
  part?: number;
  task?: number;
  topic?: string;
  prompt?: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function toDate(ts: Session["createdAt"]): Date {
  if (!ts) return new Date(0);
  if (typeof (ts as { toDate?: () => Date }).toDate === "function") {
    return (ts as { toDate: () => Date }).toDate();
  }
  return new Date(ts as unknown as string);
}

function fmtDate(ts: Session["createdAt"]): string {
  return toDate(ts).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function bandBg(band: number): string {
  if (band >= 8) return "bg-emerald-100 text-emerald-700";
  if (band >= 7) return "bg-blue-100 text-blue-700";
  if (band >= 6) return "bg-amber-100 text-amber-700";
  return "bg-rose-100 text-rose-700";
}

const SKILL_META: Record<string, { label: string; icon: React.ElementType; color: string; bg: string; border: string; href: string }> = {
  speaking:  { label: "Speaking",  icon: Mic,        color: "text-orange-500", bg: "bg-orange-50",  border: "border-orange-200",  href: "/app/speaking"  },
  writing:   { label: "Writing",   icon: PenTool,    color: "text-pink-500",   bg: "bg-pink-50",    border: "border-pink-200",    href: "/app/writing"   },
  reading:   { label: "Reading",   icon: BookOpen,   color: "text-blue-500",   bg: "bg-blue-50",    border: "border-blue-200",    href: "/app/reading"   },
  listening: { label: "Listening", icon: Headphones, color: "text-teal-500",   bg: "bg-teal-50",    border: "border-teal-200",    href: "/app/listening" },
};

function buildHeatmap(sessions: Session[], weeks = 26): { date: Date; count: number; key: string }[][] {
  const getLocKey = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  const today = new Date();
  today.setHours(23, 59, 59, 999);
  const lookup = new Map<string, number>();
  sessions.forEach((s) => {
    const d = toDate(s.createdAt);
    if (d.getTime() === 0) return;
    const key = getLocKey(d);
    lookup.set(key, (lookup.get(key) || 0) + 1);
  });
  const cols: { date: Date; count: number; key: string }[][] = [];
  const totalDays = weeks * 7;
  const startDay = new Date(today);
  startDay.setDate(startDay.getDate() - (totalDays - 1));
  const dayOfWeek = startDay.getDay();
  startDay.setDate(startDay.getDate() - ((dayOfWeek + 6) % 7));
  const cur = new Date(startDay);
  for (let w = 0; w < weeks; w++) {
    const col: { date: Date; count: number; key: string }[] = [];
    for (let d = 0; d < 7; d++) {
      const key = getLocKey(cur);
      col.push({ date: new Date(cur), count: lookup.get(key) || 0, key });
      cur.setDate(cur.getDate() + 1);
    }
    cols.push(col);
  }
  return cols;
}

function heatColor(count: number): string {
  if (count === 0) return "bg-border/60";
  if (count === 1) return "bg-indigo-200";
  if (count === 2) return "bg-indigo-400";
  if (count === 3) return "bg-indigo-500";
  return "bg-indigo-600 shadow-[0_0_6px_rgba(99,102,241,0.5)]";
}

function computeStreak(sessions: Session[]): number {
  if (!sessions.length) return 0;
  const getLocKey = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  const dates = new Set(sessions.map((s) => getLocKey(toDate(s.createdAt))));
  const todayKey = getLocKey(new Date());
  const yd = new Date(); yd.setDate(yd.getDate() - 1);
  const yKey = getLocKey(yd);
  if (!dates.has(todayKey) && !dates.has(yKey)) return 0;
  let streak = 0;
  const check = new Date();
  if (!dates.has(todayKey)) check.setDate(check.getDate() - 1);
  while (true) {
    const k = getLocKey(check);
    if (!dates.has(k)) break;
    streak++;
    check.setDate(check.getDate() - 1);
  }
  return streak;
}

// ════════════════════════════════════════════════════════════════════════════════
export function Profile() {
  const { user, profile, signOut, refreshProfile } = useAuth();
  const navigate = useNavigate();

  const [sessions, setSessions] = useState<Session[]>([]);
  const [loadingSessions, setLoadingSessions] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editTarget, setEditTarget] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  const displayName = profile?.displayName || user?.displayName || user?.email?.split("@")[0] || "User";
  const initial = displayName.charAt(0).toUpperCase();
  const targetScore = profile?.targetScore ?? 7.0;
  const joinDate = (() => {
    const raw = profile?.createdAt as { toDate?: () => Date } | null | undefined;
    if (typeof raw?.toDate === "function") {
      return raw.toDate().toLocaleDateString("en-GB", { month: "long", year: "numeric" });
    }
    return "";
  })();

  useEffect(() => {
    if (!user) return;
    getDocs(
      query(collection(db, "users", user.uid, "sessions"), orderBy("createdAt", "desc"), limit(200))
    ).then((snap) => {
      setSessions(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Session)));
      setLoadingSessions(false);
    }).catch(() => setLoadingSessions(false));
  }, [user]);

  const heatmap = useMemo(() => buildHeatmap(sessions, 26), [sessions]);
  const streak = useMemo(() => computeStreak(sessions), [sessions]);

  const latestSessionRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loadingSessions && latestSessionRef.current) {
      // Scroll to the end of the heatmap container
      latestSessionRef.current.scrollIntoView({ inline: "end" });
    }
  }, [loadingSessions]);

  const avgByType = useMemo(() => {
    const map: Record<string, number[]> = {};
    sessions.forEach((s) => {
      if (s.overallBand > 0) map[s.type] = [...(map[s.type] || []), s.overallBand];
    });
    const out: Record<string, number> = {};
    Object.entries(map).forEach(([k, v]) => { out[k] = v.reduce((a, b) => a + b, 0) / v.length; });
    return out;
  }, [sessions]);

  const recentSessions = sessions.slice(0, 8);

  const openEdit = () => { setEditName(displayName); setEditTarget(String(targetScore)); setSaveError(""); setEditing(true); };
  const cancelEdit = () => { setEditing(false); setSaveError(""); };

  const saveEdit = async () => {
    if (!user) return;
    setSaving(true); setSaveError("");
    try {
      const newName = editName.trim() || displayName;
      const newTarget = parseFloat(editTarget) || targetScore;
      if (auth.currentUser && newName !== (auth.currentUser.displayName || "")) {
        await updateFirebaseProfile(auth.currentUser, { displayName: newName });
      }
      await updateDoc(doc(db, "users", user.uid), { displayName: newName, targetScore: newTarget });
      await refreshProfile();
      setEditing(false);
    } catch {
      setSaveError("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => { await signOut(); navigate("/login"); };

  return (
    <div className="space-y-8 pb-12">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-[#05050A] text-white p-8 sm:p-12 border border-white/10 shadow-2xl">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-blue-600/25 via-violet-600/20 to-pink-600/20 rounded-full blur-[100px] -translate-y-1/4 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-600/15 rounded-full blur-[80px] translate-y-1/4 -translate-x-1/4 pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="absolute inset-[-8px] rounded-full border border-white/10 animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite]" />
            <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-blue-500 via-violet-500 to-pink-500 relative z-10">
              <div className="w-full h-full rounded-full bg-[#05050A] flex items-center justify-center text-4xl font-bold text-white">
                {initial}
              </div>
            </div>
          </div>
          {/* Info / Edit */}
          <div className="flex-1 text-center md:text-left">
            {!editing ? (
              <>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-mono uppercase tracking-widest mb-4 backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Active Learner
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-2">{displayName}</h1>
                <p className="text-white/50 font-mono text-sm mb-5">{user?.email}</p>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 border border-white/10 text-sm font-semibold">
                    <Flame className="w-4 h-4 text-orange-400" />
                    {streak} day streak
                  </div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 border border-white/10 text-sm font-semibold">
                    <Activity className="w-4 h-4 text-indigo-400" />
                    {sessions.length} sessions
                  </div>
                  {joinDate && (
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 border border-white/10 text-sm font-semibold">
                      <CalendarDays className="w-4 h-4 text-teal-400" />
                      Joined {joinDate}
                    </div>
                  )}
                </div>
                <button
                  onClick={openEdit}
                  className="mt-6 flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-sm font-semibold transition-all"
                >
                  <Edit3 className="w-4 h-4" /> Edit Profile
                </button>
              </>
            ) : (
              <div className="w-full max-w-sm space-y-4">
                <div>
                  <label className="block text-xs text-white/50 mb-1.5 uppercase tracking-widest">Display Name</label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/50 mb-1.5 uppercase tracking-widest">Target Band Score</label>
                  <select
                    value={editTarget}
                    onChange={(e) => setEditTarget(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                  >
                    {[5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0].map((v) => (
                      <option key={v} value={v} className="bg-zinc-900 text-white">{v.toFixed(1)}</option>
                    ))}
                  </select>
                </div>
                {saveError && <p className="text-xs text-rose-400">{saveError}</p>}
                <div className="flex gap-2">
                  <button onClick={saveEdit} disabled={saving}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black text-sm font-bold hover:bg-white/90 transition-all disabled:opacity-60">
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />} Save
                  </button>
                  <button onClick={cancelEdit}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-sm font-semibold hover:bg-white/20 transition-all">
                    <X className="w-4 h-4" /> Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
          {/* Target Widget */}
          <div className="hidden lg:flex flex-col items-center justify-center w-36 h-36 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-md shrink-0">
            <Target className="w-5 h-5 text-white/30 mb-2" />
            <div className="text-xs text-white/40 uppercase tracking-widest mb-1">Target</div>
            <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-pink-400 to-orange-400">
              {targetScore.toFixed(1)}
            </div>
          </div>
        </div>
      </div>

      {/* ── Skill Cards ───────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Object.entries(SKILL_META).map(([type, meta]) => {
          const Icon = meta.icon;
          const avg = avgByType[type];
          const count = sessions.filter((s) => s.type === type).length;
          return (
            <Link key={type} to={meta.href} className="bento-card p-5 flex flex-col gap-3">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center border", meta.bg, meta.border)}>
                <Icon className={cn("w-5 h-5", meta.color)} />
              </div>
              <div>
                <p className="text-xs font-semibold text-text-tertiary uppercase tracking-widest">{meta.label}</p>
                <p className={cn("text-3xl font-bold tabular-nums mt-1",
                  avg ? (avg >= 7 ? "text-emerald-600" : avg >= 6 ? "text-amber-600" : "text-rose-600") : "text-text-tertiary"
                )}>
                  {avg ? avg.toFixed(1) : "—"}
                </p>
                <p className="text-xs text-text-tertiary mt-0.5">{count} session{count !== 1 ? "s" : ""}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* ── Activity Heatmap ──────────────────────────────────────────────── */}
      <div className="bento-card p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
            <Activity className="w-5 h-5 text-indigo-500" /> Practice Activity
          </h2>
          <span className="text-sm text-text-tertiary">
            {loadingSessions ? "—" : `${sessions.length} total`}
          </span>
        </div>
        {loadingSessions ? (
          <div className="flex items-center justify-center h-24">
            <Loader2 className="w-6 h-6 animate-spin text-text-tertiary" />
          </div>
        ) : (
          <>
            <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-hide mb-1">
              {heatmap.map((col, ci) => {
                const d = col[0].date;
                return (
                  <div key={ci} className="shrink-0 w-4 text-center">
                    {ci > 0 && d.getDate() <= 7 ? (
                      <span className="text-[9px] text-text-tertiary">
                        {d.toLocaleDateString("en-GB", { month: "short" })}
                      </span>
                    ) : <span className="text-[9px] text-transparent">·</span>}
                  </div>
                );
              })}
            </div>
            <div className="flex gap-1 overflow-x-auto pb-2 scrollbar-hide">
              <div className="flex flex-col gap-1 mr-1 shrink-0">
                {["M","T","W","T","F","S","S"].map((d, i) => (
                  <div key={i} className="w-3 h-4 flex items-center justify-center text-[9px] text-text-tertiary">
                    {i % 2 === 0 ? d : ""}
                  </div>
                ))}
              </div>
              {heatmap.map((col, ci) => (
                <div key={ci} className="flex flex-col gap-1 shrink-0" ref={ci === heatmap.length - 1 ? latestSessionRef : null}>
                  {col.map((cell) => (
                    <div
                      key={cell.key}
                      title={`${cell.date.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" })}: ${cell.count} session${cell.count !== 1 ? "s" : ""}`}
                      className={cn("w-4 h-4 rounded-sm transition-all hover:ring-2 hover:ring-indigo-400 hover:ring-offset-1 cursor-default", heatColor(cell.count))}
                    />
                  ))}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-end gap-2 mt-3 text-[11px] text-text-tertiary font-medium">
              <span>Less</span>
              {[0,1,2,3,4].map((i) => <div key={i} className={cn("w-3.5 h-3.5 rounded-sm", heatColor(i))} />)}
              <span>More</span>
            </div>
          </>
        )}
      </div>

      {/* ── Recent Sessions ───────────────────────────────────────────────── */}
      {recentSessions.length > 0 && (
        <div className="bento-card overflow-hidden">
          <div className="px-8 py-5 border-b border-border/60 flex items-center justify-between">
            <h2 className="text-lg font-bold text-text-primary">Recent Sessions</h2>
            <Link to="/app/analytics" className="text-sm font-medium text-text-secondary hover:text-text-primary flex items-center gap-1 transition-colors">
              Full Analytics <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="divide-y divide-border/60">
            {recentSessions.map((s) => {
              const meta = SKILL_META[s.type];
              if (!meta) return null;
              const Icon = meta.icon;
              const sub = s.type === "speaking" ? `Part ${s.part}` : s.type === "writing" ? `Task ${s.task}` : s.type;
              const detail = s.topic || (s.prompt ? s.prompt.slice(0, 55) + "…" : "");
              return (
                <div key={s.id} className="px-8 py-4 flex items-center gap-4 hover:bg-bg-secondary transition-colors">
                  <div className={cn("shrink-0 w-9 h-9 rounded-xl flex items-center justify-center border", meta.bg, meta.border)}>
                    <Icon className={cn("w-4 h-4", meta.color)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-text-primary">
                      {meta.label}<span className="text-text-tertiary font-normal"> · {sub}</span>
                    </p>
                    {detail && <p className="text-xs text-text-tertiary truncate mt-0.5">{detail}</p>}
                  </div>
                  <div className="shrink-0 text-right">
                    {s.overallBand > 0 && (
                      <span className={cn("inline-block px-2.5 py-0.5 rounded-lg text-sm font-bold", bandBg(s.overallBand))}>
                        {s.overallBand.toFixed(1)}
                      </span>
                    )}
                    <p className="text-[11px] text-text-tertiary mt-1">{fmtDate(s.createdAt)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Account ───────────────────────────────────────────────────────── */}
      <div className="bento-card overflow-hidden">
        <div className="px-8 py-5 border-b border-border/60">
          <h2 className="text-lg font-bold text-text-primary">Account</h2>
        </div>
        <button onClick={openEdit}
          className="w-full flex items-center justify-between px-8 py-5 hover:bg-bg-secondary transition-colors border-b border-border/60 group">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-bg-secondary flex items-center justify-center group-hover:bg-primary/5 transition-colors">
              <Target className="w-4.5 h-4.5 text-text-secondary" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-text-primary">Target Band Score</p>
              <p className="text-xs text-text-secondary mt-0.5">Currently set to {targetScore.toFixed(1)}</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-text-tertiary group-hover:text-text-primary transition-colors" />
        </button>
        <button disabled
          className="w-full flex items-center justify-between px-8 py-5 border-b border-border/60 cursor-default">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-bg-secondary flex items-center justify-center">
              <Zap className="w-4.5 h-4.5 text-text-secondary" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-text-primary">Practice Streak</p>
              <p className="text-xs text-text-secondary mt-0.5">{streak} day{streak !== 1 ? "s" : ""} current streak</p>
            </div>
          </div>
        </button>
        <button onClick={handleSignOut}
          className="w-full flex items-center gap-4 px-8 py-5 hover:bg-red-50 transition-colors text-left group">
          <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
            <LogOut className="w-4.5 h-4.5 text-red-500" />
          </div>
          <span className="text-sm font-semibold text-red-600">Sign Out</span>
        </button>
      </div>
    </div>
  );
}
