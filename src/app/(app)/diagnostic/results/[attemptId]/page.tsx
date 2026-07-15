import { notFound } from "next/navigation";

import { requireUser } from "@/lib/session";
import { db } from "@/lib/db";
import { getAttemptResult } from "@/lib/quiz/attempt";
import { computeDiagnosticInsights } from "@/lib/quiz/diagnostic-insights";
import { weeksUntil } from "@/lib/plan/generate";
import { DiagnosticResultView } from "@/components/quiz/diagnostic-result-view";

export default async function DiagnosticResultsPage({
  params,
}: {
  params: Promise<{ attemptId: string }>;
}) {
  const user = await requireUser();
  const { attemptId } = await params;
  const [result, profile] = await Promise.all([
    getAttemptResult(user.id, attemptId),
    db.user.findUnique({ where: { id: user.id }, select: { testDate: true } }),
  ]);
  if (!result) notFound();

  const insights = computeDiagnosticInsights(
    result.items
      .filter((it) => it.isCorrect != null)
      .map((it) => ({
        section: it.question.section,
        topic: it.question.topic,
        isCorrect: !!it.isCorrect,
        confidence: it.confidence,
      })),
  );

  const testDate =
    profile?.testDate && profile.testDate.getTime() > Date.now()
      ? profile.testDate
      : new Date(Date.now() + 42 * 86_400_000);
  const weeks = weeksUntil(testDate, new Date());
  const focus = insights.priorities
    .slice(0, 2)
    .map((p) => p.label)
    .join(" and ");
  const planPreview = `~${weeks} week${weeks === 1 ? "" : "s"} · 4 sessions/week${
    focus ? ` · ${focus} first` : ""
  }`;

  return (
    <DiagnosticResultView
      insights={insights}
      planPreview={planPreview}
      items={result.items}
    />
  );
}
