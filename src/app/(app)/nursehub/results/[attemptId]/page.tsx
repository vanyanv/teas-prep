import { notFound } from "next/navigation";

import { requireUser } from "@/lib/session";
import { getAttemptResult } from "@/lib/quiz/attempt";
import { NurseHubScoreSheet } from "@/components/quiz/nursehub-scoresheet";

export default async function NurseHubResultsPage({
  params,
}: {
  params: Promise<{ attemptId: string }>;
}) {
  const user = await requireUser();
  const { attemptId } = await params;
  const result = await getAttemptResult(user.id, attemptId);
  if (!result) notFound();

  return <NurseHubScoreSheet result={result} />;
}
