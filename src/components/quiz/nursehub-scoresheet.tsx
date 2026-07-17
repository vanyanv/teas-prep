import { Check, X } from "lucide-react";

import { BuildPlanButton } from "@/components/plan/build-plan-button";
import { Kicker, PageContainer, PageHeader } from "@/components/ui/page";
import { sectionLabel, type Section } from "@/lib/teas-blueprint";
import type { AttemptResult } from "@/lib/quiz/attempt";

/**
 * Item-by-item score sheet for an imported diagnostic: every question marked
 * correct or incorrect against its specific skill, grouped by section, with the
 * missed and shaky skills pulled to the top. Same narrative grammar as the
 * native diagnostic results: what happened, what it means, one way forward.
 */
export function NurseHubScoreSheet({ result }: { result: AttemptResult }) {
  const { score } = result;

  // Group items by section, preserving order.
  const bySection = new Map<Section, typeof result.items>();
  for (const item of result.items) {
    const s = item.question.section;
    if (!bySection.has(s)) bySection.set(s, []);
    bySection.get(s)!.push(item);
  }

  const missedSkills = result.items
    .filter((it) => it.isCorrect === false && it.question.subtopic)
    .map((it) => it.question.subtopic as string);
  const uniqueMissed = [...new Set(missedSkills)];

  // Right answers you flagged as guesses: still not mastered, so the plan keeps
  // them in rotation. Exclude any skill already counted as missed.
  const guessedRight = result.items
    .filter(
      (it) =>
        it.isCorrect === true &&
        it.confidence === 1 &&
        it.question.subtopic &&
        !uniqueMissed.includes(it.question.subtopic),
    )
    .map((it) => it.question.subtopic as string);
  const uniqueGuessed = [...new Set(guessedRight)];

  return (
    <PageContainer width="narrow">
      <PageHeader
        kicker="Imported diagnostic · score sheet"
        title={
          uniqueMissed.length > 0
            ? `${uniqueMissed.length} ${uniqueMissed.length === 1 ? "skill needs" : "skills need"} work.`
            : "You cleared every skill on this set."
        }
        sub="Each question maps to a specific skill. These results, weighted by how sure you were, become the priorities in your study plan."
      />

      <p className="mt-6 flex items-baseline gap-3">
        <span className="font-mono text-5xl font-semibold tracking-tight tabular-nums">
          {score.pct}%
        </span>
        <span className="text-sm text-muted-foreground">
          {score.correct} of {score.total} correct
        </span>
      </p>

      {uniqueMissed.length > 0 && (
        <section className="mt-8" aria-label="Skills to work on">
          <Kicker className="text-[11px]">Skills to work on</Kicker>
          <p className="mt-1 text-xs text-muted-foreground">
            The lesson titles behind the questions you missed.
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {uniqueMissed.map((skill) => (
              <li
                key={skill}
                className="rounded-md border border-warning/40 bg-warning/10 px-2.5 py-1 text-xs text-warning"
              >
                {skill}
              </li>
            ))}
          </ul>
        </section>
      )}

      {uniqueGuessed.length > 0 && (
        <section className="mt-6" aria-label="Right, but guessed">
          <Kicker className="text-[11px]">Right, but you guessed</Kicker>
          <p className="mt-1 text-xs text-muted-foreground">
            Correct but unsure, so these still count as shaky. Your plan keeps
            them in rotation until they feel solid.
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {uniqueGuessed.map((skill) => (
              <li
                key={skill}
                className="rounded-md border bg-secondary px-2.5 py-1 text-xs text-muted-foreground"
              >
                {skill}
              </li>
            ))}
          </ul>
        </section>
      )}

      {[...bySection.entries()].map(([section, items]) => (
        <section key={section} className="mt-8">
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="text-base font-semibold tracking-tight">
              {sectionLabel(section)}
            </h2>
            <span className="font-mono text-xs text-muted-foreground tabular-nums">
              {items.filter((i) => i.isCorrect).length}/{items.length}
            </span>
          </div>
          <div className="mt-3 overflow-hidden rounded-xl border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-secondary/40 text-left">
                  <th className="w-10 px-3 py-2 font-medium text-muted-foreground">
                    #
                  </th>
                  <th className="w-12 px-2 py-2 font-medium text-muted-foreground">
                    <span className="sr-only">Result</span>
                  </th>
                  <th className="px-3 py-2 font-medium text-muted-foreground">
                    Skill / lesson
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((it, i) => (
                  <tr key={it.question.id} className="border-b last:border-0">
                    <td className="px-3 py-2 font-mono text-xs text-muted-foreground tabular-nums">
                      {i + 1}
                    </td>
                    <td className="px-2 py-2">
                      {it.isCorrect ? (
                        <>
                          <Check className="size-4 text-success" aria-hidden />
                          <span className="sr-only">Correct</span>
                        </>
                      ) : (
                        <>
                          <X className="size-4 text-destructive" aria-hidden />
                          <span className="sr-only">Incorrect</span>
                        </>
                      )}
                    </td>
                    <td className="px-3 py-2">
                      {it.question.subtopic ?? "Unmapped"}
                      {it.isCorrect && it.confidence === 1 && (
                        <span className="ml-2 rounded-full border bg-secondary px-1.5 py-0.5 align-middle font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
                          guessed
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}

      {/* Fixed so it never overlays the score sheet while reading; the page
          reserves clearance via the container's bottom padding. */}
      <div className="fixed inset-x-0 bottom-[calc(3.9rem+env(safe-area-inset-bottom))] z-10 px-4 sm:bottom-4">
        <div className="mx-auto max-w-2xl rounded-xl border bg-background/95 p-4 shadow-sm backdrop-blur">
          <p className="text-center text-xs text-muted-foreground">
            Your plan starts with the skills above.
          </p>
          <BuildPlanButton className="mt-3" />
        </div>
      </div>
    </PageContainer>
  );
}
