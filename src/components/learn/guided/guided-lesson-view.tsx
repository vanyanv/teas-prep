"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  Dumbbell,
  ListChecks,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Kicker, PageContainer } from "@/components/ui/page";
import { MasteryBadge } from "@/components/learn/mastery-badge";
import { LessonBlocks } from "./lesson-blocks";
import { QuickCheckPanel } from "./quick-check";
import type { GuidedLesson } from "@/content/guided-lesson-types";

interface StoredProgress {
  v: 1;
  started: boolean;
  /** Index of the section in view; sections.length means the summary. */
  current: number;
  /** Furthest index ever reached; gates the outline. */
  reached: number;
  completed: string[];
  /** Section id -> was the quick check right on the first try? */
  checks: Record<string, boolean>;
}

const FRESH: StoredProgress = {
  v: 1,
  started: false,
  current: 0,
  reached: 0,
  completed: [],
  checks: {},
};

function storageKey(slug: string) {
  return `guided-lesson:v1:${slug}`;
}

function loadProgress(slug: string): StoredProgress {
  try {
    const raw = window.localStorage.getItem(storageKey(slug));
    if (!raw) return FRESH;
    const parsed = JSON.parse(raw) as StoredProgress;
    if (parsed?.v !== 1 || typeof parsed.current !== "number") return FRESH;
    return { ...FRESH, ...parsed };
  } catch {
    return FRESH;
  }
}

/** Fire-and-forget POST; completion is a convenience, never blocks the lesson. */
function postJSON(url: string, body: unknown): void {
  void fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    keepalive: true,
  }).catch(() => {});
}

export interface GuidedLessonViewProps {
  lesson: GuidedLesson;
  /** taxonomy skill id (topicId:slug) — server key for completion persistence */
  skillId: string;
  sectionName: string;
  topicName: string;
  topicHref: string;
  /** Practice URL that starts the skill quiz directly. */
  quizHref: string;
  /** Questions the skill quiz will draw. */
  quizCount: number;
  masteryPct: number | null;
  nextSkill: { name: string; href: string } | null;
}

/**
 * The guided lesson experience: overview with objectives and outline, one
 * concept section at a time (concept, rule, worked example, mistake, quick
 * check), then a summary that hands off to the skill quiz. Progress is saved
 * locally and restored on return.
 */
export function GuidedLessonView({
  lesson,
  skillId,
  sectionName,
  topicName,
  topicHref,
  quizHref,
  quizCount,
  masteryPct,
  nextSkill,
}: GuidedLessonViewProps) {
  const total = lesson.sections.length;
  const [progress, setProgress] = React.useState<StoredProgress>(FRESH);
  const [loaded, setLoaded] = React.useState(false);
  const headingRef = React.useRef<HTMLHeadingElement>(null);
  const skipFocus = React.useRef(true);
  const completePosted = React.useRef(false);
  const postedChecks = React.useRef<Set<string>>(new Set());

  React.useEffect(() => {
    // Saved progress only exists on the client, so the first render shows the
    // fresh-lesson state and this swaps in the stored location after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProgress(loadProgress(lesson.slug));
    setLoaded(true);
  }, [lesson.slug]);

  React.useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(storageKey(lesson.slug), JSON.stringify(progress));
    } catch {
      // Private mode or full storage: the lesson still works, it just won't resume.
    }
  }, [progress, loaded, lesson.slug]);

  // One-time migration: push any locally-stored quick-check results to the
  // server after load (covers progress made before completion was persisted).
  React.useEffect(() => {
    if (!loaded) return;
    for (const [id, ok] of Object.entries(progress.checks)) {
      if (!postedChecks.current.has(id)) {
        postedChecks.current.add(id);
        postJSON("/api/quick-checks", { skillId, checkKey: id, isCorrect: ok });
      }
    }
    // Intentionally runs once after load; syncs the restored snapshot.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

  // Persist lesson completion once every section has been finished (whether
  // reached this visit or restored from a prior local session).
  React.useEffect(() => {
    if (!loaded || completePosted.current) return;
    if (progress.completed.length >= total) {
      completePosted.current = true;
      postJSON("/api/lessons/complete", { skillId });
    }
  }, [loaded, progress.completed.length, total, skillId]);

  // Move focus and scroll to the section heading on navigation (not on load).
  const { current: currentIndex, started } = progress;
  React.useEffect(() => {
    if (skipFocus.current) {
      skipFocus.current = false;
      return;
    }
    headingRef.current?.focus({ preventScroll: true });
    headingRef.current?.scrollIntoView({ block: "start" });
  }, [currentIndex, started]);

  const phase: "overview" | "section" | "summary" = !progress.started
    ? "overview"
    : progress.current >= total
      ? "summary"
      : "section";

  const update = (patch: Partial<StoredProgress>) =>
    setProgress((p) => ({ ...p, ...patch }));

  const start = () => update({ started: true });

  const goTo = (index: number) => {
    if (index > progress.reached) return;
    update({ current: index });
  };

  const continueFrom = (index: number) => {
    const id = lesson.sections[index].id;
    const next = index + 1;
    setProgress((p) => ({
      ...p,
      completed: p.completed.includes(id) ? p.completed : [...p.completed, id],
      current: next,
      reached: Math.max(p.reached, next),
    }));
  };

  const recordCheck = (id: string, correct: boolean) => {
    setProgress((p) =>
      id in p.checks ? p : { ...p, checks: { ...p.checks, [id]: correct } },
    );
    if (!postedChecks.current.has(id)) {
      postedChecks.current.add(id);
      postJSON("/api/quick-checks", { skillId, checkKey: id, isCorrect: correct });
    }
  };

  const doneCount = progress.completed.length;
  const section = phase === "section" ? lesson.sections[progress.current] : null;

  return (
    <PageContainer width="wide">
      <Link
        href={topicHref}
        className="inline-flex items-center gap-1.5 rounded-md text-sm text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/40"
      >
        <ArrowLeft className="size-4" />
        {topicName}
      </Link>

      <header className="mt-5 max-w-2xl">
        <Kicker className="flex items-center gap-2">
          <span aria-hidden className="size-2 rounded-full bg-section-math" />
          {sectionName} · {topicName}
        </Kicker>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
          {lesson.title}
        </h1>
        <p className="mt-3 text-pretty text-muted-foreground">{lesson.summary}</p>
        <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
          <span className="font-mono tabular-nums">
            {lesson.minutes[0]} to {lesson.minutes[1]} min
          </span>
          <span className="font-mono tabular-nums">{total} sections</span>
          {masteryPct != null && <MasteryBadge pct={masteryPct} />}
        </p>
        {progress.started && (
          <div className="mt-4 flex items-center gap-3">
            <Progress
              value={(doneCount / total) * 100}
              size="sm"
              aria-label="Lesson progress"
            />
            <span className="shrink-0 font-mono text-xs tabular-nums text-muted-foreground">
              {doneCount} of {total}
            </span>
          </div>
        )}
      </header>

      {phase === "overview" ? (
        <Overview lesson={lesson} onStart={start} />
      ) : (
        <div className="mt-8 lg:grid lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-10">
          <aside className="hidden lg:block">
            <div className="sticky top-20">
              <Outline
                lesson={lesson}
                progress={progress}
                currentIndex={phase === "summary" ? total : progress.current}
                onSelect={goTo}
              />
            </div>
          </aside>

          <div className="min-w-0 max-w-2xl">
            <MobileOutline
              lesson={lesson}
              progress={progress}
              currentIndex={phase === "summary" ? total : progress.current}
              onSelect={goTo}
            />

            {section ? (
              <section aria-labelledby="lesson-section-heading">
                <Kicker>
                  {progress.current + 1} of {total}
                </Kicker>
                <h2
                  id="lesson-section-heading"
                  ref={headingRef}
                  tabIndex={-1}
                  className="mt-2 scroll-mt-24 text-xl font-semibold tracking-tight outline-none"
                >
                  {section.title}
                </h2>
                <div className="mt-5 space-y-6">
                  <LessonBlocks blocks={section.blocks} />
                  <QuickCheckPanel
                    key={section.id}
                    check={section.quickCheck}
                    onFirstResult={(ok) => recordCheck(section.id, ok)}
                  />
                </div>
                <nav className="mt-8 flex items-center justify-between gap-3 border-t pt-5">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => goTo(progress.current - 1)}
                    disabled={progress.current === 0}
                  >
                    <ArrowLeft />
                    Previous
                  </Button>
                  <Button type="button" onClick={() => continueFrom(progress.current)}>
                    {progress.current === total - 1 ? "Finish lesson" : "Continue"}
                    <ArrowRight />
                  </Button>
                </nav>
              </section>
            ) : (
              <Summary
                lesson={lesson}
                progress={progress}
                headingRef={headingRef}
                quizHref={quizHref}
                quizCount={quizCount}
                topicHref={topicHref}
                topicName={topicName}
                nextSkill={nextSkill}
                onReview={goTo}
              />
            )}
          </div>
        </div>
      )}
    </PageContainer>
  );
}

/** Pre-start view: objectives, the outline, and one clear way in. */
function Overview({
  lesson,
  onStart,
}: {
  lesson: GuidedLesson;
  onStart: () => void;
}) {
  return (
    <div className="mt-8 max-w-2xl space-y-8">
      <section>
        <h2 className="text-base font-semibold tracking-tight">
          By the end of this lesson, you will be able to
        </h2>
        <ul className="mt-3 space-y-1.5">
          {lesson.objectives.map((objective) => (
            <li key={objective} className="flex items-start gap-2.5 text-[15px] leading-relaxed">
              <Check className="mt-1 size-4 shrink-0 text-primary" aria-hidden />
              {objective}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-base font-semibold tracking-tight">In this lesson</h2>
        <ol className="mt-3 space-y-1.5">
          {lesson.sections.map((s, i) => (
            <li key={s.id} className="flex items-baseline gap-3 text-[15px]">
              <span className="w-4 shrink-0 text-right font-mono text-sm tabular-nums text-muted-foreground">
                {i + 1}
              </span>
              {s.title}
            </li>
          ))}
          <li className="flex items-baseline gap-3 text-[15px]">
            <span className="w-4 shrink-0 text-right font-mono text-sm text-muted-foreground">
              ◇
            </span>
            Skill quiz
          </li>
        </ol>
      </section>

      <Button type="button" size="lg" onClick={onStart}>
        Start lesson
        <ArrowRight />
      </Button>
    </div>
  );
}

interface OutlineProps {
  lesson: GuidedLesson;
  progress: StoredProgress;
  currentIndex: number;
  onSelect: (index: number) => void;
}

/** The lesson outline: done, current, and not-yet-reached section states. */
function Outline({ lesson, progress, currentIndex, onSelect }: OutlineProps) {
  const total = lesson.sections.length;
  const entries = [
    ...lesson.sections.map((s, i) => ({ label: s.title, index: i, quiz: false })),
    { label: "Skill quiz", index: total, quiz: true },
  ];
  return (
    <nav aria-label="Lesson outline">
      <ol className="space-y-0.5">
        {entries.map((entry) => {
          const isCurrent = currentIndex === entry.index;
          const isDone =
            !entry.quiz && progress.completed.includes(lesson.sections[entry.index].id);
          const reachable = entry.index <= progress.reached;
          return (
            <li key={entry.index}>
              <button
                type="button"
                onClick={() => onSelect(entry.index)}
                disabled={!reachable}
                aria-current={isCurrent ? "step" : undefined}
                className={cn(
                  "flex w-full items-start gap-2.5 rounded-md px-2 py-1.5 text-left text-[13px] leading-snug outline-none transition-colors",
                  "focus-visible:ring-[3px] focus-visible:ring-ring/40",
                  isCurrent
                    ? "bg-secondary font-medium text-foreground"
                    : reachable
                      ? "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                      : "text-muted-foreground/50",
                )}
              >
                <span className="mt-px flex size-4 shrink-0 items-center justify-center">
                  {isDone ? (
                    <Check className="size-3.5 text-success" aria-hidden />
                  ) : entry.quiz ? (
                    <Dumbbell className="size-3.5" aria-hidden />
                  ) : (
                    <span
                      aria-hidden
                      className={cn(
                        "font-mono text-[11px] tabular-nums",
                        isCurrent && "text-primary",
                      )}
                    >
                      {entry.index + 1}
                    </span>
                  )}
                </span>
                {entry.label}
                {isDone && <span className="sr-only">(completed)</span>}
                {!reachable && <span className="sr-only">(not started)</span>}
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** Collapsible outline for small screens; closed by default. */
function MobileOutline(props: OutlineProps) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="mb-6 rounded-xl border lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-2 rounded-xl p-3.5 text-sm font-medium outline-none transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/40"
      >
        <span className="inline-flex items-center gap-2">
          <ListChecks className="size-4 text-muted-foreground" aria-hidden />
          Lesson outline
        </span>
        <ChevronDown
          className={cn(
            "size-4 text-muted-foreground transition-transform",
            open && "rotate-180",
          )}
          aria-hidden
        />
      </button>
      {open && (
        <div className="border-t p-2">
          <Outline
            {...props}
            onSelect={(i) => {
              setOpen(false);
              props.onSelect(i);
            }}
          />
        </div>
      )}
    </div>
  );
}

/** Post-lesson summary: what was covered, quick-check results, one next step. */
function Summary({
  lesson,
  progress,
  headingRef,
  quizHref,
  quizCount,
  topicHref,
  topicName,
  nextSkill,
  onReview,
}: {
  lesson: GuidedLesson;
  progress: StoredProgress;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
  quizHref: string;
  quizCount: number;
  topicHref: string;
  topicName: string;
  nextSkill: { name: string; href: string } | null;
  onReview: (index: number) => void;
}) {
  const answered = lesson.sections.filter((s) => s.id in progress.checks);
  const correct = answered.filter((s) => progress.checks[s.id]).length;
  const review = lesson.sections
    .map((s, i) => ({ section: s, index: i }))
    .filter(({ section }) => progress.checks[section.id] === false);

  return (
    <section aria-labelledby="lesson-summary-heading">
      <Kicker>Lesson complete</Kicker>
      <h2
        id="lesson-summary-heading"
        ref={headingRef}
        tabIndex={-1}
        className="mt-2 scroll-mt-24 text-xl font-semibold tracking-tight outline-none"
      >
        You covered all {lesson.sections.length} sections
      </h2>

      <ul className="mt-5 grid gap-1.5 sm:grid-cols-2">
        {lesson.sections.map((s) => (
          <li key={s.id} className="flex items-start gap-2.5 text-[15px] leading-relaxed">
            <Check className="mt-1 size-4 shrink-0 text-success" aria-hidden />
            {s.title}
          </li>
        ))}
      </ul>

      {answered.length > 0 && (
        <p className="mt-5 text-[15px] text-muted-foreground">
          You answered{" "}
          <span className="font-mono font-medium tabular-nums text-foreground">
            {correct} of {answered.length}
          </span>{" "}
          quick checks correctly on the first try.
        </p>
      )}

      {review.length > 0 && (
        <div className="mt-5">
          <h3 className="text-sm font-medium">Review recommended</h3>
          <ul className="mt-2 space-y-1">
            {review.map(({ section, index }) => (
              <li key={section.id}>
                <button
                  type="button"
                  onClick={() => onReview(index)}
                  className="rounded-md text-[15px] text-primary underline-offset-4 outline-none transition-colors hover:underline focus-visible:ring-[3px] focus-visible:ring-ring/40"
                >
                  {section.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-8 rounded-xl border bg-card p-5">
        <Kicker>Skill quiz</Kicker>
        <p className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs tabular-nums text-muted-foreground">
          <span>{quizCount} questions</span>
          <span>about {Math.max(2, Math.round(quizCount * 0.8))} min</span>
          <span>untimed</span>
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Your result updates your mastery of this skill.
        </p>
        <Button asChild className="mt-4">
          <Link href={quizHref}>
            <Dumbbell />
            Start skill quiz
          </Link>
        </Button>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
        {nextSkill && (
          <Link
            href={nextSkill.href}
            className="inline-flex items-center gap-1.5 rounded-md text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/40"
          >
            Next skill: {nextSkill.name}
            <ArrowRight className="size-4" />
          </Link>
        )}
        <Link
          href={topicHref}
          className="rounded-md text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/40"
        >
          Back to {topicName}
        </Link>
      </div>
    </section>
  );
}
