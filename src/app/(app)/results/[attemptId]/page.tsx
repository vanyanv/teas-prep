import { notFound } from "next/navigation";
import { Trophy } from "lucide-react";

import { requireUser } from "@/lib/session";
import { db } from "@/lib/db";
import { getAttemptResult } from "@/lib/quiz/attempt";
import { ACHIEVEMENTS } from "@/lib/gamification/achievements";
import { AttemptResultView } from "@/components/quiz/attempt-result-view";

const TITLE = new Map(ACHIEVEMENTS.map((a) => [a.id, a.title]));

export default async function ResultsPage({
  params,
}: {
  params: Promise<{ attemptId: string }>;
}) {
  const user = await requireUser();
  const { attemptId } = await params;
  const result = await getAttemptResult(user.id, attemptId);
  if (!result) notFound();

  // Milestones earned by this attempt (awarded during submit, at/after finish).
  const newlyEarned = result.finishedAt
    ? (
        await db.userAchievement.findMany({
          where: { userId: user.id, earnedAt: { gte: result.finishedAt } },
          orderBy: { earnedAt: "asc" },
          select: { achievementId: true },
        })
      )
        .map((r) => TITLE.get(r.achievementId))
        .filter(Boolean)
    : [];

  const isMock = result.mode === "MOCK";
  return (
    <>
      {newlyEarned.length > 0 && (
        <div className="mx-auto mt-4 max-w-2xl px-4">
          <div className="flex items-center gap-3 rounded-xl border bg-card p-3.5">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
              <Trophy className="size-[18px]" aria-hidden />
            </span>
            <p className="text-sm">
              <span className="font-medium">
                Milestone{newlyEarned.length > 1 ? "s" : ""} earned:
              </span>{" "}
              <span className="text-muted-foreground">{newlyEarned.join(", ")}</span>
            </p>
          </div>
        </div>
      )}
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
    </>
  );
}
