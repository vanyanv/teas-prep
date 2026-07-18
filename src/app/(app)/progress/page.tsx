import Link from "next/link";

import { ArrowRight, Dumbbell, Trophy } from "lucide-react";

import { requireUser } from "@/lib/session";
import { isPro } from "@/lib/access";
import { db } from "@/lib/db";
import { getProgressData } from "@/lib/progress";
import { getSubjectCards, getProgressSummary } from "@/lib/progress/read";
import { getQuizHistory } from "@/lib/progress/history";
import { getBaseline } from "@/lib/progress/baseline";
import { getGamificationSummary } from "@/lib/gamification/summary";
import { getAchievements } from "@/lib/gamification/achievements";
import { UpgradePanel } from "@/components/upgrade-panel";
import { ScoreRing } from "@/components/score-ring";
import { ProgressChart } from "@/components/progress/progress-chart";
import { PaceChart } from "@/components/progress/pace-chart";
import { ProgressTabs } from "@/components/progress/progress-tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ActionRow } from "@/components/ui/action-row";
import { PageContainer, PageHeader, Kicker } from "@/components/ui/page";
import { practiceHref } from "@/lib/quiz/links";
import { examPaceSeconds, SECTIONS, sectionLabel, type Section } from "@/lib/teas-blueprint";
import type { TrendPoint } from "@/lib/progress";

const EXAM_PACE_SEC = Math.round(examPaceSeconds());

const ACCENT: Record<Section, string> = {
  READING: "bg-section-reading",
  MATH: "bg-section-math",
  SCIENCE: "bg-section-science",
  ENGLISH: "bg-section-english",
};

function masteryTone(pct: number | null): "success" | "primary" | "warning" | "muted" {
  if (pct == null) return "muted";
  if (pct >= 80) return "success";
  if (pct >= 60) return "primary";
  return "warning";
}

const pctLabel = (n: number | null) => (n == null ? "–" : `${n}%`);

function paceLabel(sec: number): string {
  const s = Math.round(sec);
  if (s < 60) return `${s}s`;
  return `${Math.floor(s / 60)}m ${String(s % 60).padStart(2, "0")}s`;
}

function pacePoints(trend: TrendPoint[]) {
  const timed = trend.filter((t) => t.avgSec != null);
  if (timed.length === 0) return null;
  const latest = timed.at(-1)!.avgSec!;
  const first = timed.length > 1 ? timed[0].avgSec! : null;
  const delta = first != null ? latest - first : null;
  const trendDir =
    delta == null || Math.abs(delta) < 3 ? "flat" : delta < 0 ? "faster" : "slower";
  return { latest, first, delta, trend: trendDir as "flat" | "faster" | "slower" };
}

function relDate(d: Date): string {
  const days = Math.floor((Date.now() - d.getTime()) / 86_400_000);
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 7) return `${days} days ago`;
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export default async function ProgressPage() {
  const user = await requireUser();
  const [data, pro, summary, subjects, quizzes, baseline, finishedMocks] = await Promise.all([
    getProgressData(user.id),
    isPro(),
    getProgressSummary(user.id),
    getSubjectCards(user.id),
    getQuizHistory(user.id),
    getBaseline(user.id),
    db.attempt.findMany({
      where: { userId: user.id, mode: "MOCK", finishedAt: { not: null }, scorePct: { not: null } },
      orderBy: { finishedAt: "asc" },
      select: { scorePct: true },
    }),
  ]);
  const [gam, achievements] = await Promise.all([
    getGamificationSummary(user.id),
    getAchievements(user.id),
  ]);

  if (data.totalAnswered === 0) {
    return (
      <PageContainer width="narrow" className="py-16 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">No data yet</h1>
        <p className="mt-2 text-muted-foreground">
          Take the diagnostic or some practice questions and your progress will
          show up here.
        </p>
        <Button asChild className="mt-6">
          <Link href="/diagnostic">Take the diagnostic</Link>
        </Button>
      </PageContainer>
    );
  }

  const readiness = data.readiness ?? 0;
  const gap = data.target - readiness;
  const assessedTopics = data.topics.filter((t) => t.pct != null && t.count > 0);
  const weakest = assessedTopics.length
    ? [...assessedTopics].sort((a, b) => (a.pct ?? 0) - (b.pct ?? 0))[0]
    : null;
  const latest = data.trend.at(-1);
  const first = data.trend[0];
  const pace = pacePoints(data.trend);
  const shownTopics = pro
    ? data.topics
    : [...assessedTopics].sort((a, b) => (a.pct ?? 0) - (b.pct ?? 0)).slice(0, 3);
  const mocks = data.mocks;
  const examTrend: TrendPoint[] = [
    ...(baseline.aggregate != null
      ? [{ date: "", label: "Baseline", pct: baseline.aggregate, mode: "DIAGNOSTIC", avgSec: null }]
      : []),
    ...finishedMocks.map((m, i) => ({
      date: "",
      label: `PE${i + 1}`,
      pct: Math.round(m.scorePct as number),
      mode: "MOCK",
      avgSec: null,
    })),
  ];

  // ── Overview panel ─────────────────────────────────────────────────────────
  const overview = (
    <div className="space-y-8">
      <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Skills completed" value={`${summary.skillsCompleted}`} sub={`of ${summary.skillsTotal}`} />
        <Stat label="Skills mastered" value={`${summary.skillsMastered}`} />
        <Stat label="Readiness" value={`${readiness}%`} sub={gap > 0 ? `${gap} points to target` : "at target"} />
        {baseline.aggregate != null && latest ? (
          <Stat
            label="Since baseline"
            value={`${latest.pct - baseline.aggregate >= 0 ? "+" : ""}${latest.pct - baseline.aggregate}%`}
            sub={
              baseline.complete
                ? `${baseline.aggregate}% → ${latest.pct}%`
                : `baseline ${baseline.capturedCount}/4 sections`
            }
          />
        ) : (
          <Stat
            label="Since first attempt"
            value={latest && first ? `${latest.pct - first.pct >= 0 ? "+" : ""}${latest.pct - first.pct}%` : "–"}
            sub={first && latest && data.trend.length > 1 ? `${first.pct}% → ${latest.pct}%` : "one attempt"}
          />
        )}
      </dl>

      {weakest && (
        <ActionRow asChild>
          <Link
            href={practiceHref({ section: weakest.section, topic: weakest.topic, count: 10, start: true })}
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-secondary text-muted-foreground">
              <Dumbbell className="size-[18px]" aria-hidden />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-medium">Next: drill {weakest.label}</span>
              <span className="block text-xs text-muted-foreground">
                Your weakest topic right now
                {weakest.pct != null ? ` at ${weakest.pct}% mastery` : ""}.
              </span>
            </span>
            <ArrowRight className="size-4 shrink-0 text-muted-foreground" aria-hidden />
          </Link>
        </ActionRow>
      )}

      {pro && data.trend.length > 1 && latest && first ? (
        <section className="rounded-xl border bg-card p-5">
          <Kicker className="text-[11px]">Score trend</Kicker>
          <p className="mt-1 text-sm text-muted-foreground">
            From {first.pct}% to {latest.pct}% over your last {data.trend.length} scored attempts,
            against a {data.target}% target.
          </p>
          <div className="mt-3">
            <ProgressChart data={data.trend} target={data.target} />
          </div>
          {pace && (
            <div className="mt-4 border-t pt-4">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Pace: </span>
                {paceLabel(pace.latest)} per question on your last attempt
                {pace.first != null && pace.delta != null && pace.trend !== "flat"
                  ? `, ${paceLabel(Math.abs(pace.delta))} ${pace.trend === "faster" ? "faster" : "slower"} than when you started.`
                  : "."}{" "}
                <span className="text-muted-foreground/80">Exam pace is {paceLabel(EXAM_PACE_SEC)}.</span>
              </p>
              <PaceChart data={data.trend} examPaceSec={EXAM_PACE_SEC} />
            </div>
          )}
        </section>
      ) : (
        !pro && (
          <UpgradePanel
            heading="See your whole picture, and where it is heading"
            body="Progress on the free plan shows where you stand today. TEAS Pro adds the movement: score trend across attempts, pacing against real exam speed, and mock history."
            unlocks={[
              "Score and readiness trends across every attempt",
              "Pacing compared with real exam speed",
              "The full confidence-weighted mastery map",
            ]}
            after="/progress"
            context="progress"
          />
        )
      )}

      {(gam.personalBests.length > 0 || achievements.earned.length > 0) && (
        <section aria-label="Milestones and bests">
          <div className="flex items-baseline justify-between gap-3">
            <Kicker className="text-[11px]">Milestones &amp; bests</Kicker>
            <span className="font-mono text-xs tabular-nums text-muted-foreground">
              {gam.points} pts
            </span>
          </div>

          {gam.personalBests.length > 0 && (
            <dl className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {gam.personalBests.map((b) => (
                <div key={b.label} className="rounded-xl border bg-card p-3">
                  <dt className="text-xs text-muted-foreground">{b.label}</dt>
                  <dd className="mt-0.5 font-mono text-lg font-semibold tabular-nums">{b.value}</dd>
                </div>
              ))}
            </dl>
          )}

          {achievements.earned.length > 0 && (
            <ul className="mt-3 space-y-1.5">
              {achievements.earned.map((a) => (
                <li key={a.id} className="flex items-start gap-2.5 text-sm">
                  <Trophy className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                  <span>
                    <span className="font-medium">{a.title}</span>{" "}
                    <span className="text-muted-foreground">— {a.description}</span>
                  </span>
                </li>
              ))}
            </ul>
          )}
          {achievements.locked.length > 0 && (
            <p className="mt-2 font-mono text-xs text-muted-foreground">
              {achievements.locked.length} more to earn
            </p>
          )}
        </section>
      )}

      <p>
        <Link
          href="/plan"
          className="text-sm text-muted-foreground underline-offset-4 outline-none transition-colors hover:text-foreground hover:underline focus-visible:ring-[3px] focus-visible:ring-ring/40"
        >
          View full study plan
        </Link>
      </p>
    </div>
  );

  // ── Subjects & Skills panel ────────────────────────────────────────────────
  const subjectsPanel = (
    <div className="space-y-8">
      <section aria-label="Performance by section">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {SECTIONS.map((s) => (
            <Link
              key={s.key}
              href={practiceHref({ section: s.key })}
              className="flex flex-col items-center gap-2 rounded-xl border bg-card p-4 outline-none transition-colors hover:bg-secondary/40 focus-visible:ring-[3px] focus-visible:ring-ring/40"
            >
              <ScoreRing score={data.sectionScores[s.key]} size="md" />
              <p className="text-center text-xs text-muted-foreground">{sectionLabel(s.key)}</p>
            </Link>
          ))}
        </div>
      </section>

      <section aria-label="Completion by subject">
        <Kicker className="px-1 text-[11px]">Completion &amp; mastery</Kicker>
        <ul className="mt-3 space-y-2">
          {subjects.map((card) => (
            <li key={card.section} className="rounded-xl border bg-card p-4">
              <div className="flex items-center justify-between gap-3">
                <Link
                  href={card.href}
                  className="inline-flex items-center gap-2 rounded-md text-sm font-medium outline-none hover:underline focus-visible:ring-[3px] focus-visible:ring-ring/40"
                >
                  <span aria-hidden className={`size-2 rounded-full ${ACCENT[card.section]}`} />
                  {card.label}
                </Link>
                <span className="shrink-0 font-mono text-xs tabular-nums text-muted-foreground">
                  {card.skillsCompleted}/{card.skillsRequired} · {card.completionPct}%
                </span>
              </div>
              <Progress value={card.completionPct} size="sm" className="mt-2.5" />
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-0.5 font-mono text-[11px] tabular-nums text-muted-foreground">
                <span>Mastery {pctLabel(card.masteryPct)}</span>
                <span>Latest quiz {pctLabel(card.latestQuizPct)}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border bg-card p-5">
        <Kicker className="text-[11px]">{pro ? "Topic mastery" : "Your three weakest topics"}</Kicker>
        <p className="mt-1 text-xs text-muted-foreground">
          Confidence-weighted. Tap any topic to drill it.
        </p>
        <ul className="mt-4 space-y-3">
          {shownTopics.map((t) => (
            <li key={`${t.section}:${t.topic}`}>
              <Link
                href={practiceHref({ section: t.section, topic: t.topic })}
                className="group block rounded-md px-1 py-1 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40"
              >
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="truncate group-hover:underline">{t.label}</span>
                  <span className="flex shrink-0 items-center gap-1.5 font-mono text-xs text-muted-foreground tabular-nums">
                    {t.pct == null ? "–" : `${t.pct}%`}
                    {t.count > 0 && <span className="text-muted-foreground/60">({t.count})</span>}
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
                <Progress value={t.pct ?? 0} tone={masteryTone(t.pct)} size="md" className="mt-1.5" />
              </Link>
            </li>
          ))}
        </ul>
        {!pro && (
          <UpgradePanel
            className="mt-6"
            heading="See mastery for every topic"
            body="The free plan shows your three weakest topics. TEAS Pro reveals the full confidence-weighted mastery map across all twelve."
            unlocks={["The full confidence-weighted mastery map", "Every topic ranked by mastery"]}
            after="/progress"
            context="progress"
          />
        )}
      </section>
    </div>
  );

  // ── Quiz History panel ─────────────────────────────────────────────────────
  const quizzesPanel =
    quizzes.length === 0 ? (
      <EmptyPanel
        title="No quizzes yet"
        body="Finish a skill quiz or some practice and every attempt will be listed here, oldest preserved."
      />
    ) : (
      <ul className="space-y-2">
        {quizzes.map((q) => (
          <li key={q.attemptId}>
            <ActionRow asChild className="group items-start">
              <Link href={`/results/${q.attemptId}`}>
                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline gap-2">
                    <span className="font-mono text-sm font-medium tabular-nums">{q.scorePct}%</span>
                    <span className="truncate text-xs text-muted-foreground">{q.scopeLabel}</span>
                    {q.isPersonalBest && (
                      <span className="rounded-full bg-secondary px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-success">
                        Best
                      </span>
                    )}
                  </span>
                  <span className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 font-mono text-[11px] tabular-nums text-muted-foreground">
                    <span>{q.correct}/{q.total} correct</span>
                    <span>{relDate(q.finishedAt)}</span>
                    {q.skillsNeedingReview.length > 0 && (
                      <span className="text-primary">{q.skillsNeedingReview.length} to review</span>
                    )}
                  </span>
                </span>
                <ArrowRight
                  className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            </ActionRow>
          </li>
        ))}
      </ul>
    );

  // ── Exam History panel ─────────────────────────────────────────────────────
  const examsPanel = !pro ? (
    <UpgradePanel
      heading="Track full practice exams"
      body="TEAS Pro records every full-length realistic simulation: overall and section scores, timing, and change from your baseline."
      unlocks={[
        "Full-length realistic TEAS simulations",
        "Section-by-section scoring and timing",
        "Score comparison across every exam",
      ]}
      after="/progress"
      context="progress"
    />
  ) : mocks.length === 0 ? (
    <EmptyPanel
      title="No exams yet"
      body="Take a full-length realistic simulation and each attempt will be tracked here with section scores."
    />
  ) : (
    <div className="space-y-6">
      {examTrend.length > 1 && (
        <section className="rounded-xl border bg-card p-5">
          <Kicker className="text-[11px]">Score comparison</Kicker>
          <p className="mt-1 text-sm text-muted-foreground">
            Your baseline against each realistic simulation, on your {data.target}% target.
          </p>
          <div className="mt-3">
            <ProgressChart data={examTrend} target={data.target} />
          </div>
        </section>
      )}
      <ul className="space-y-2" aria-label="Exam history">
        {mocks.map((m) => (
        <li key={m.id}>
          <ActionRow asChild className="group items-start">
            <Link href={`/results/${m.id}`}>
              <span className="min-w-0 flex-1">
                <span className="flex items-baseline gap-2">
                  <span className="font-mono text-sm font-medium tabular-nums">{m.pct}%</span>
                  <span className="text-xs text-muted-foreground">{m.label}</span>
                </span>
                <span className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5">
                  {m.sections.map((s) => (
                    <span key={s.key} className="text-xs text-muted-foreground">
                      {s.label}{" "}
                      <span className="font-mono tabular-nums">{s.correct}/{s.total}</span>
                    </span>
                  ))}
                </span>
              </span>
              <ArrowRight
                className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </ActionRow>
        </li>
        ))}
      </ul>
    </div>
  );

  return (
    <PageContainer>
      <PageHeader
        kicker="Progress"
        title={
          gap <= 0
            ? `You're at or above your ${data.target}% target.`
            : `You're ${gap} points from your ${data.target}% target.`
        }
        sub={`Readiness ${readiness}%, based on ${data.totalAnswered} questions answered so far.`}
        aside={
          <div className="flex flex-col items-center gap-1">
            <ScoreRing score={readiness} size="lg" />
            <Kicker className="text-[11px]">Readiness</Kicker>
          </div>
        }
      />

      <ProgressTabs
        overview={overview}
        subjects={subjectsPanel}
        quizzes={quizzesPanel}
        exams={examsPanel}
      />
    </PageContainer>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-xl border bg-card p-4">
      <dt className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="mt-1 font-mono text-xl font-semibold tabular-nums">{value}</dd>
      {sub && <dd className="text-xs text-muted-foreground">{sub}</dd>}
    </div>
  );
}

function EmptyPanel({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-dashed bg-card/50 p-8 text-center">
      <p className="text-sm font-medium">{title}</p>
      <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">{body}</p>
    </div>
  );
}
