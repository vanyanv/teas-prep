import Link from "next/link";
import { ArrowRight, Check, X } from "lucide-react";

import { ScoreRing } from "@/components/score-ring";
import { Button } from "@/components/ui/button";
import { sectionLabel, type Section } from "@/lib/teas-blueprint";
import type { AttemptResult } from "@/lib/quiz/attempt";

/**
 * NurseHub-style score sheet: every question marked correct/incorrect with its
 * specific skill, grouped by section, plus a "skills to work on" summary of the
 * skills you missed (these are NurseHub lesson titles).
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
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
        NurseHub diagnostic · score sheet
      </p>

      <section className="mt-4 flex flex-col items-center gap-4 rounded-xl border bg-card p-6 sm:flex-row sm:gap-8 sm:p-8">
        <div className="flex flex-col items-center gap-1">
          <ScoreRing score={score.pct} size="xl" />
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Overall
          </p>
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-xl font-semibold tracking-tight">
            {score.correct} of {score.total} correct
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Each question maps to a specific skill. These results, weighted by
            how sure you were, become the priorities in your study plan.
          </p>
          <Button asChild className="mt-4">
            <Link href="/plan">
              Build my study plan
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>

      {uniqueMissed.length > 0 && (
        <section className="mt-6 rounded-xl border bg-card p-5">
          <h2 className="text-sm font-medium">
            Skills to work on ({uniqueMissed.length})
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            These are the NurseHub lesson titles for the questions you missed.
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {uniqueMissed.map((skill) => (
              <li
                key={skill}
                className="rounded-full border border-warning/40 bg-warning/10 px-3 py-1 text-xs text-warning"
              >
                {skill}
              </li>
            ))}
          </ul>
        </section>
      )}

      {uniqueGuessed.length > 0 && (
        <section className="mt-6 rounded-xl border bg-card p-5">
          <h2 className="text-sm font-medium">
            Right, but you guessed ({uniqueGuessed.length})
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            You got these correct but weren&apos;t sure, so they still count as
            shaky. Your plan keeps them in rotation until they feel solid.
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {uniqueGuessed.map((skill) => (
              <li
                key={skill}
                className="rounded-full border border-foreground/15 bg-secondary px-3 py-1 text-xs text-muted-foreground"
              >
                {skill}
              </li>
            ))}
          </ul>
        </section>
      )}

      {[...bySection.entries()].map(([section, items]) => (
        <section key={section} className="mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium">{sectionLabel(section)}</h2>
            <span className="font-mono text-xs text-muted-foreground tabular-nums">
              {items.filter((i) => i.isCorrect).length}/{items.length}
            </span>
          </div>
          <div className="mt-3 overflow-hidden rounded-lg border">
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
                      {it.question.subtopic ?? "—"}
                      {it.isCorrect && it.confidence === 1 && (
                        <span className="ml-2 rounded-full border border-foreground/15 bg-secondary px-1.5 py-0.5 align-middle font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
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
    </div>
  );
}
