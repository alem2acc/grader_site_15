import { Link, useParams } from "react-router-dom";
import {
  Activity,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  Clock3,
  Sparkles,
  Target,
  Trophy,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

function getBandFromCorrect(correctCount: number) {
  if (correctCount >= 39) return 9.0;
  if (correctCount >= 37) return 8.5;
  if (correctCount >= 35) return 8.0;
  if (correctCount >= 33) return 7.5;
  if (correctCount >= 30) return 7.0;
  if (correctCount >= 27) return 6.5;
  if (correctCount >= 23) return 6.0;
  return 5.5;
}

export function ReadingResult() {
  const { id } = useParams();
  const seed = Number(id ?? "1") || 1;

  const types = ["Multiple Choice", "True/False/Not Given", "Matching Headings", "Summary Completion"] as const;
  const questions = Array.from({ length: 40 }, (_, index) => {
    const questionId = index + 1;
    const base = (questionId * 17 + seed * 11) % 100;
    const correct = base > (questionId % 7 === 0 ? 45 : 24);
    return {
      id: questionId,
      correct,
      type: types[Math.floor(index / 10)] ?? "Multiple Choice",
    };
  });

  const correctCount = questions.filter((question) => question.correct).length;
  const accuracy = Math.round((correctCount / questions.length) * 100);
  const score = getBandFromCorrect(correctCount);
  const timeTakenMinutes = 44 + (seed % 11);
  const timeTakenSeconds = (seed * 13) % 60;
  const targetBand = Math.min(9, Math.max(6.5, score + 0.5));

  const typeBreakdown = types.map((type, index) => {
    const slice = questions.slice(index * 10, index * 10 + 10);
    const correct = slice.filter((question) => question.correct).length;
    return {
      label: type,
      correct,
      total: slice.length,
      accuracy: Math.round((correct / slice.length) * 100),
      color:
        index === 0 ? "bg-blue-500" : index === 1 ? "bg-violet-500" : index === 2 ? "bg-pink-500" : "bg-emerald-500",
    };
  });

  const strongestType = [...typeBreakdown].sort((a, b) => b.accuracy - a.accuracy)[0];
  const weakestType = [...typeBreakdown].sort((a, b) => a.accuracy - b.accuracy)[0];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center gap-4">
        <Link to="/app/reading" className="flex h-11 w-11 items-center justify-center rounded-full border border-border/60 bg-surface text-text-secondary transition-colors hover:bg-bg-secondary hover:text-text-primary">
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-text-tertiary">Reading analysis</div>
          <h1 className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-text-primary">Session #{id || "1"}</h1>
        </div>
      </div>

      <section className="relative overflow-hidden rounded-[2.75rem] border border-border/60 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.16),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.12),transparent_30%),linear-gradient(180deg,#0b1020_0%,#0a0a0f_100%)] p-8 text-white shadow-[0_30px_80px_rgba(15,23,42,0.28)] sm:p-10 lg:p-12">
        <div className="absolute -right-16 top-4 h-56 w-56 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute -left-10 bottom-0 h-44 w-44 rounded-full bg-violet-500/15 blur-3xl" />

        <div className="relative z-10 grid gap-8 xl:grid-cols-[0.85fr_1.15fr] xl:items-center">
          <div className="flex flex-col items-center justify-center rounded-[2.2rem] border border-white/10 bg-white/[0.06] p-8 backdrop-blur-2xl">
            <div className="relative flex h-56 w-56 items-center justify-center">
              <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="6" />
                <circle
                  cx="50"
                  cy="50"
                  r="46"
                  fill="none"
                  stroke="url(#reading-result-gradient)"
                  strokeWidth="6"
                  strokeDasharray="289"
                  strokeDashoffset={289 - (correctCount / questions.length) * 289}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="reading-result-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#60A5FA" />
                    <stop offset="100%" stopColor="#A78BFA" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="relative z-10 text-center">
                <div className="text-[4.5rem] font-semibold tracking-[-0.08em] text-white">{score.toFixed(1)}</div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">IELTS band estimate</div>
              </div>
            </div>
            <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-5 py-2 text-sm font-semibold text-white/75">
              <Target className="h-4 w-4 text-blue-300" />
              {correctCount} / {questions.length} correct
            </div>
          </div>

          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/75">
              <Sparkles className="h-3.5 w-3.5 text-blue-300" />
              Premium reading review
            </div>

            <div>
              <h2 className="text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">A clearer view of where this attempt helped — and where it still leaks points.</h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-white/60">
                This result screen turns one reading session into something usable: score signal, timing context, question-type strengths, and a cleaner map of mistakes.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                { icon: Clock3, label: "Time used", value: `${timeTakenMinutes}:${timeTakenSeconds.toString().padStart(2, "0")}` },
                { icon: Activity, label: "Accuracy", value: `${accuracy}%` },
                { icon: Trophy, label: "Strongest type", value: strongestType.label },
                { icon: BookOpen, label: "Next target", value: targetBand.toFixed(1) },
              ].map((metric) => (
                <div key={metric.label} className="rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/8 text-white/70">
                    <metric.icon className="h-4 w-4" />
                  </div>
                  <div className="mt-5 text-lg font-semibold tracking-[-0.03em] text-white">{metric.value}</div>
                  <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40">{metric.label}</div>
                </div>
              ))}
            </div>

            <div className="rounded-[1.8rem] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-2xl">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40">Session read</div>
                  <div className="mt-2 text-lg font-semibold text-white">Strongest on {strongestType.label}, weakest on {weakestType.label}.</div>
                </div>
                <Link to="/app/reading" className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition-transform hover:-translate-y-0.5">
                  Next reading set
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[2rem] border border-border/60 bg-surface p-8 shadow-sm">
          <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-text-tertiary">Question-type breakdown</div>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-text-primary">Where the score came from.</h2>

          <div className="mt-8 space-y-4">
            {typeBreakdown.map((item) => (
              <div key={item.label} className="rounded-[1.4rem] border border-border/60 bg-bg-primary p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="text-sm font-semibold text-text-primary">{item.label}</div>
                    <div className="mt-1 text-xs font-medium text-text-tertiary">{item.correct} correct out of {item.total}</div>
                  </div>
                  <div className="text-lg font-semibold tracking-[-0.03em] text-text-primary">{item.accuracy}%</div>
                </div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-border/50">
                  <div className={cn("h-full rounded-full", item.color)} style={{ width: `${item.accuracy}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-border/60 bg-surface p-8 shadow-sm">
          <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-text-tertiary">Takeaways</div>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-text-primary">What to do next.</h2>

          <div className="mt-8 grid gap-4">
            {[
              {
                title: `Protect ${strongestType.label}`,
                text: `${strongestType.label} is currently your most stable task type. Keep it warm with short repetition instead of over-practising it.`,
              },
              {
                title: `Prioritize ${weakestType.label}`,
                text: `${weakestType.label} is creating the biggest drag on the total score right now, so focused reps there should lift the band fastest.`,
              },
              {
                title: "Keep timing under control",
                text: `You used ${timeTakenMinutes}:${timeTakenSeconds.toString().padStart(2, "0")}. The next step is holding this pace while reducing avoidable errors.`,
              },
            ].map((item, index) => (
              <div key={item.title} className="rounded-[1.4rem] border border-border/60 bg-bg-primary p-5">
                <div className="flex items-center gap-3">
                  <div className={cn("flex h-9 w-9 items-center justify-center rounded-xl text-white", index === 0 ? "bg-slate-950" : index === 1 ? "bg-violet-600" : "bg-blue-600")}>
                    {index === 0 ? <Trophy className="h-4 w-4" /> : index === 1 ? <Target className="h-4 w-4" /> : <Clock3 className="h-4 w-4" />}
                  </div>
                  <div className="text-sm font-semibold text-text-primary">{item.title}</div>
                </div>
                <p className="mt-4 text-sm leading-7 text-text-secondary">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-border/60 bg-surface p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-text-tertiary">Question map</div>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-text-primary">Review answer status at a glance.</h2>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-text-secondary">
            <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> Correct</span>
            <span className="inline-flex items-center gap-2"><XCircle className="h-4 w-4 text-rose-600" /> Incorrect</span>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-5 gap-3 sm:grid-cols-8 md:grid-cols-10">
          {questions.map((question) => (
            <div
              key={question.id}
              className={cn(
                "aspect-square rounded-xl border p-2 transition-transform hover:-translate-y-0.5",
                question.correct
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-rose-200 bg-rose-50 text-rose-700",
              )}
              title={`${question.type} • ${question.correct ? "Correct" : "Incorrect"}`}
            >
              <div className="flex h-full flex-col items-center justify-center gap-1">
                <span className="text-[11px] font-semibold opacity-70">{question.id}</span>
                {question.correct ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
