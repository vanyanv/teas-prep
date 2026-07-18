import Link from "next/link";

import { requireUser } from "@/lib/session";
import { isPro, FREE_LIMITS } from "@/lib/access";
import { getActivePlan } from "@/lib/plan/service";
import { db } from "@/lib/db";
import { PlanSetup } from "@/components/plan/plan-setup";
import { PlanView } from "@/components/plan/plan-view";
import { UpgradePanel } from "@/components/upgrade-panel";
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
          <PlanSetup defaultDays={user.studyDaysPerWeek ?? 4} />
        </div>
      </PageContainer>
    );
  }

  // Free plan: the first week is real and workable; the rest unlocks with Pro.
  if (!(await isPro()) && plan.weeks.length > FREE_LIMITS.planWeeks) {
    const lockedWeeks = plan.weeks.length - FREE_LIMITS.planWeeks;
    return (
      <>
        <PlanView
          plan={{ ...plan, weeks: plan.weeks.slice(0, FREE_LIMITS.planWeeks) }}
        />
        <PageContainer width="narrow" className="pt-0">
          <UpgradePanel
            heading="Unlock the rest of your personalized plan"
            body={`Your plan runs ${plan.weeks.length} weeks to test day. Week 1 is yours free; the remaining ${lockedWeeks} ${lockedWeeks === 1 ? "week" : "weeks"} keep the same day-by-day pacing all the way to your exam.`}
            unlocks={[
              "Every week of your plan, through test day",
              "Daily sessions that adapt as your mastery moves",
              "A full mock exam scheduled before your date",
            ]}
            after="/plan"
            context="plan"
          />
        </PageContainer>
      </>
    );
  }

  return <PlanView plan={plan} />;
}
