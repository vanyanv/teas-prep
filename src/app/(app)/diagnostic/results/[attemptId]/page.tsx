import { notFound } from "next/navigation";

import { requireUser } from "@/lib/session";
import { getAttemptResult } from "@/lib/quiz/attempt";
import { AttemptResultView } from "@/components/quiz/attempt-result-view";

export default async function DiagnosticResultsPage({
  params,
}: {
  params: Promise<{ attemptId: string }>;
}) {
  const user = await requireUser();
  const { attemptId } = await params;
  const result = await getAttemptResult(user.id, attemptId);
  if (!result) notFound();

  return (
    <AttemptResultView
      result={result}
      kicker="Diagnostic results"
      headline={`You answered ${result.score.correct} of ${result.score.total} correctly.`}
      blurb="This is your baseline. Next, generate a study plan that puts the most time where you need it most."
      cta={{ href: "/plan", label: "Generate my study plan" }}
    />
  );
}
