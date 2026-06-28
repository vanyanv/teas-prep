import { notFound } from "next/navigation";

import { requireUser } from "@/lib/session";
import { getAttemptResult } from "@/lib/quiz/attempt";
import { AttemptResultView } from "@/components/quiz/attempt-result-view";

export default async function ResultsPage({
  params,
}: {
  params: Promise<{ attemptId: string }>;
}) {
  const user = await requireUser();
  const { attemptId } = await params;
  const result = await getAttemptResult(user.id, attemptId);
  if (!result) notFound();

  const isMock = result.mode === "MOCK";
  return (
    <AttemptResultView
      result={result}
      kicker={isMock ? "Mock exam results" : "Practice results"}
      headline={`You answered ${result.score.correct} of ${result.score.total} correctly.`}
      blurb={
        isMock
          ? "Strong work finishing a full timed run. Review what slipped, then keep your plan moving."
          : "Nice work. Review anything you missed, then keep chipping away at your plan."
      }
      cta={
        isMock
          ? { href: "/progress", label: "See my progress" }
          : { href: "/plan", label: "Back to my plan" }
      }
    />
  );
}
