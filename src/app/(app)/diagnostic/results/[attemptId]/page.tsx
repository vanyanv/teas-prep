import { notFound } from "next/navigation";

import { requireUser } from "@/lib/session";
import { db } from "@/lib/db";
import { getAttemptResult } from "@/lib/quiz/attempt";
import { computeDiagnosticInsights } from "@/lib/quiz/diagnostic-insights";
import {
  getSectionDiagnosticStatus,
  nextUndiagnosedSection,
} from "@/lib/quiz/diagnostic-status";
import { sectionSlug } from "@/lib/teas-blueprint";
import { weeksUntil } from "@/lib/plan/generate";
import { DEFAULT_RUNWAY_DAYS } from "@/lib/plan/defaults";
import { TrackView } from "@/components/analytics";
import { DiagnosticResultView } from "@/components/quiz/diagnostic-result-view";

export default async function DiagnosticResultsPage({
  params,
}: {
  params: Promise<{ attemptId: string }>;
}) {
  const user = await requireUser();
  const { attemptId } = await params;
  const [result, profile, status] = await Promise.all([
    getAttemptResult(user.id, attemptId),
    db.user.findUnique({ where: { id: user.id }, select: { testDate: true } }),
    getSectionDiagnosticStatus(user.id),
  ]);
  if (!result) notFound();

  const insights = computeDiagnosticInsights(
    result.items
      .filter((it) => it.isCorrect != null)
      .map((it) => ({
        section: it.question.section,
        topic: it.question.topic,
        subtopic: it.question.subtopic ?? null,
        isCorrect: !!it.isCorrect,
        confidence: it.confidence,
        answered: it.selected != null,
      })),
  );

  // A server page's "now" is request-scoped input; one consistent read.
  const now = new Date();
  const testDate =
    profile?.testDate && profile.testDate.getTime() > now.getTime()
      ? profile.testDate
      : new Date(now.getTime() + DEFAULT_RUNWAY_DAYS * 86_400_000);
  const weeks = weeksUntil(testDate, now);
  const focus = insights.priorities
    .slice(0, 2)
    .map((p) => p.label)
    .join(" and ");
  const planPreview = `~${weeks} week${weeks === 1 ? "" : "s"} · 4 sessions/week${
    focus ? ` · ${focus} first` : ""
  }`;

  const nextSection = nextUndiagnosedSection(status);
  const next = nextSection
    ? {
        label: `${nextSection.label} diagnostic`,
        href: `/diagnostic/${sectionSlug(nextSection.section)}`,
      }
    : null;

  return (
    <>
      <TrackView
        name="results_viewed"
        props={{ overallPct: insights.overallPct }}
      />
      <DiagnosticResultView
        insights={insights}
        planPreview={planPreview}
        items={result.items}
        savedQuestionIds={result.savedQuestionIds}
        next={next}
      />
    </>
  );
}
