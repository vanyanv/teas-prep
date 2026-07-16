import Link from "next/link";
import {
  ArrowRight,
  Bookmark,
  Layers,
  RotateCcw,
  SlidersHorizontal,
  Timer,
  Zap,
} from "lucide-react";

import { requireUser } from "@/lib/session";
import { getMasteryData } from "@/lib/mastery";
import { pickWeakest } from "@/lib/study/today";
import { getDueQuestionCount, getSavedQuestionCount } from "@/lib/review/question-srs";
import { getDueCards } from "@/lib/flashcards/service";
import { practiceHref } from "@/lib/quiz/links";
import { estimateSessionMinutes } from "@/lib/study/estimate";
import { SECTIONS, sectionLabel, type Section } from "@/lib/teas-blueprint";
import { PracticeFlow } from "@/components/quiz/practice-flow";
import { PageContainer, PageHeader, Kicker } from "@/components/ui/page";
import { ActionRow } from "@/components/ui/action-row";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SECTION_DOT: Record<Section, string> = {
  READING: "bg-section-reading",
  MATH: "bg-section-math",
  SCIENCE: "bg-section-science",
  ENGLISH: "bg-section-english",
};

export default async function PracticePage({
  searchParams,
}: {
  searchParams: Promise<{
    section?: string;
    topic?: string;
    subtopic?: string;
    difficulty?: string;
    count?: string;
    mode?: string;
    start?: string;
    custom?: string;
    timed?: string;
  }>;
}) {
  const { section, topic, subtopic, difficulty, count, mode, start, custom, timed } =
    await searchParams;

  // Any filter, review mode, or the custom form: hand off to the flow.
  if (section || topic || subtopic || difficulty || count || mode || custom || timed) {
    return (
      <PracticeFlow
        initialSection={section ?? ""}
        initialTopic={topic ?? ""}
        initialSubtopic={subtopic ?? ""}
        initialDifficulty={difficulty ?? ""}
        initialCount={count ? Number(count) : 10}
        initialMode={mode === "review" ? "review" : mode === "saved" ? "saved" : "filter"}
        autoStart={start === "1"}
        initialTimed={timed === "1"}
      />
    );
  }

  // No params: the practice menu, most useful first.
  const user = await requireUser();
  const [mastery, dueQuestions, cards, savedCount] = await Promise.all([
    getMasteryData(user.id),
    getDueQuestionCount(user.id),
    getDueCards(user.id, 20),
    getSavedQuestionCount(user.id),
  ]);
  const weakest = mastery.totalAnswered > 0 ? pickWeakest(mastery.topics) : null;
  const dueCards = cards.dueCount + cards.newCount;

  return (
    <PageContainer>
      <PageHeader
        kicker="Practice"
        title="What do you want to work on?"
        sub={
          weakest
            ? undefined
            : "Take the diagnostic first and this page will know your weak spots."
        }
      />

      {weakest && (
        <section className="mt-6 rounded-xl border bg-card p-5 sm:p-6">
          <Kicker className="text-[11px]">Recommended</Kicker>
          <h2 className="mt-2 text-lg font-semibold tracking-tight">
            Drill: {weakest.label}
          </h2>
          <p className="mt-1 max-w-prose text-sm text-muted-foreground">
            Your lowest area
            {weakest.pct != null ? ` (${weakest.pct}% mastery)` : ""} in{" "}
            {sectionLabel(weakest.section)}.
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Button asChild className="w-full sm:w-auto">
              <Link
                href={practiceHref({
                  section: weakest.section,
                  topic: weakest.topic,
                  count: 10,
                  start: true,
                })}
              >
                Start 10 questions
                <ArrowRight />
              </Link>
            </Button>
            <span className="text-center font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground sm:text-left">
              ~{estimateSessionMinutes(10, null)} min
            </span>
          </div>
        </section>
      )}

      {(dueQuestions > 0 || dueCards > 0 || savedCount > 0) && (
        <section className="mt-6" aria-label="Review">
          <Kicker className="px-1 text-[11px]">Review</Kicker>
          <ul className="mt-2 space-y-2">
            {dueQuestions > 0 && (
              <li>
                <ActionRow asChild>
                  <Link href={practiceHref({ review: true })}>
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-muted-foreground">
                      <RotateCcw className="size-[18px]" aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium">
                        Review due questions
                      </span>
                      <span className="block text-xs text-muted-foreground">
                        Missed or unsure answers, resurfaced on schedule.
                      </span>
                    </span>
                    <span className="font-mono text-xs text-muted-foreground tabular-nums">
                      {dueQuestions}
                    </span>
                  </Link>
                </ActionRow>
              </li>
            )}
            {savedCount > 0 && (
              <li>
                <ActionRow asChild>
                  <Link href="/practice?mode=saved">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-muted-foreground">
                      <Bookmark className="size-[18px]" aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium">Saved questions</span>
                      <span className="block text-xs text-muted-foreground">
                        Everything you bookmarked from explanations.
                      </span>
                    </span>
                    <span className="font-mono text-xs text-muted-foreground tabular-nums">
                      {savedCount}
                    </span>
                  </Link>
                </ActionRow>
              </li>
            )}
            {dueCards > 0 && (
              <li>
                <ActionRow asChild>
                  <Link href="/flashcards">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-muted-foreground">
                      <Layers className="size-[18px]" aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium">A&P flashcards</span>
                      <span className="block text-xs text-muted-foreground">
                        {cards.dueCount
                          ? `${cards.dueCount} due, ${cards.newCount} new`
                          : `${cards.newCount} new cards`}
                      </span>
                    </span>
                    <span className="font-mono text-xs text-muted-foreground tabular-nums">
                      {dueCards}
                    </span>
                  </Link>
                </ActionRow>
              </li>
            )}
          </ul>
        </section>
      )}

      <section className="mt-6" aria-label="Practice by subject">
        <Kicker className="px-1 text-[11px]">By subject</Kicker>
        <ul className="mt-2 grid gap-2 sm:grid-cols-2">
          {SECTIONS.map((s) => {
            const pct = mastery.sections[s.key];
            return (
              <li key={s.key}>
                <ActionRow asChild>
                  <Link href={practiceHref({ section: s.key, count: 10, start: true })}>
                    <span
                      className={cn("size-2 shrink-0 rounded-full", SECTION_DOT[s.key])}
                      aria-hidden
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium">
                        {sectionLabel(s.key)}
                      </span>
                      <span className="block text-xs text-muted-foreground">
                        10 questions · untimed
                      </span>
                    </span>
                    <span className="font-mono text-xs text-muted-foreground tabular-nums">
                      {pct != null ? `${pct}%` : "—"}
                    </span>
                  </Link>
                </ActionRow>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mt-6" aria-label="Timed practice">
        <Kicker className="px-1 text-[11px]">Timed</Kicker>
        <ul className="mt-2 space-y-2">
          <li>
            <ActionRow asChild>
              <Link href="/mock">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-muted-foreground">
                  <Timer className="size-[18px]" aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium">Full practice exam</span>
                  <span className="block text-xs text-muted-foreground">
                    Timed, in real TEAS section order with breaks.
                  </span>
                </span>
                <ArrowRight className="size-4 shrink-0 text-muted-foreground" aria-hidden />
              </Link>
            </ActionRow>
          </li>
          <li>
            <ActionRow asChild>
              <Link href={practiceHref({ count: 15, timed: true, start: true })}>
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-muted-foreground">
                  <Zap className="size-[18px]" aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium">Question sprint</span>
                  <span className="block text-xs text-muted-foreground">
                    15 mixed questions at real exam pace.
                  </span>
                </span>
                <ArrowRight className="size-4 shrink-0 text-muted-foreground" aria-hidden />
              </Link>
            </ActionRow>
          </li>
        </ul>
      </section>

      <div className="mt-8 border-t pt-5">
        <Link
          href="/practice?custom=1"
          className="inline-flex items-center gap-2 rounded-md text-sm font-medium text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/40"
        >
          <SlidersHorizontal className="size-4" aria-hidden />
          Build a custom set
        </Link>
      </div>
    </PageContainer>
  );
}
