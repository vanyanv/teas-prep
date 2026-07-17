import Link from "next/link";

import { requireUser } from "@/lib/session";
import { getActivePlan } from "@/lib/plan/service";
import { db } from "@/lib/db";
import { PlanSetup } from "@/components/plan/plan-setup";
import { PlanView } from "@/components/plan/plan-view";
import { Button } from "@/components/ui/button";
import { PageContainer, Kicker } from "@/components/ui/page";

export default async function PlanPage() {
  const user = await requireUser();
  const plan = await getActivePlan(user.id);

  const hasDiagnostic = await db.attempt.count({
    where: { userId: user.id, mode: "DIAGNOSTIC", finishedAt: { not: null } },
  });

  if (!plan) {
    return (
      <PageContainer width="narrow">
        <Kicker>Study plan</Kicker>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">
          Build your week-by-week plan
        </h1>
        {hasDiagnostic === 0 ? (
          <div className="mt-6 rounded-xl border bg-card p-6">
            <p className="text-sm text-muted-foreground">
              Take the diagnostic first so your plan targets your real weak
              spots. You can still build a general plan now if you prefer.
            </p>
            <Button asChild variant="outline" className="mt-4">
              <Link href="/diagnostic">Take the diagnostic</Link>
            </Button>
          </div>
        ) : (
          <p className="mt-3 text-muted-foreground">
            We&apos;ll weight your schedule toward your weakest, highest-impact
            topics, with a full mock exam before test day.
          </p>
        )}
        <div className="mt-6">
          <PlanSetup />
        </div>
      </PageContainer>
    );
  }

  return <PlanView plan={plan} />;
}
