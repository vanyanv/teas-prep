import { DiagnosticFlow } from "@/components/quiz/diagnostic-flow";
import { requireUser } from "@/lib/session";
import { db } from "@/lib/db";

export default async function DiagnosticPage() {
  const user = await requireUser();
  const nurseHubCount = await db.question.count({
    where: { ownerId: user.id, source: "nursehub" },
  });
  return <DiagnosticFlow hasNurseHub={nurseHubCount > 0} />;
}
