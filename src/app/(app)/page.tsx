import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  ClipboardCheck,
  ClipboardList,
  Dumbbell,
  Layers,
} from "lucide-react";

import { requireUser } from "@/lib/session";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { ScoreRing } from "@/components/score-ring";
import { SECTIONS, sectionLabel, type Section } from "@/lib/teas-blueprint";
import { scoreItems, type GradedItem } from "@/lib/quiz/score";

export default async function DashboardPage() {
  const user = await requireUser();

  const lastDiagnostic = await db.attempt.findFirst({
    where: { userId: user.id, mode: "DIAGNOSTIC", finishedAt: { not: null } },
    orderBy: { finishedAt: "desc" },
    include: { items: true },
  });

  const sectionScores = await computeSectionScores(user.id);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      <header>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Welcome back{user.name ? `, ${user.name.split(" ")[0]}` : ""}
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          {lastDiagnostic ? "Keep your momentum going." : "Let's find your starting point."}
        </h1>
      </header>

      {!lastDiagnostic ? (
        <section className="mt-8 rounded-xl border bg-card p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <ClipboardCheck className="mt-1 size-6 text-primary" />
            <div className="flex-1">
              <h2 className="text-lg font-semibold">Start with a diagnostic</h2>
              <p className="mt-1 max-w-prose text-sm text-muted-foreground">
                A short, blueprint-balanced test across Reading, Math, Science,
                and English. It pinpoints where you stand so we can build a study
                plan around your real weak spots, not guesswork.
              </p>
              <Button asChild className="mt-5">
                <Link href="/diagnostic">
                  Take the diagnostic
                  <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      ) : (
        <section className="mt-8 grid gap-4 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-8 rounded-xl border bg-card p-6 sm:p-8">
          <div className="flex flex-col items-center gap-2">
            <ScoreRing score={lastDiagnostic.scorePct ?? 0} size="xl" />
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
              Overall
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {SECTIONS.map((s) => (
              <div key={s.key} className="flex flex-col items-center gap-2">
                <ScoreRing score={sectionScores[s.key]} size="md" />
                <p className="text-center text-xs text-muted-foreground">
                  {sectionLabel(s.key)}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mt-10">
        <h2 className="text-sm font-medium text-muted-foreground">Jump back in</h2>
        <ul className="mt-3 divide-y overflow-hidden rounded-xl border bg-card">
          {ACTIONS.map((a) => (
            <li key={a.href}>
              <Link
                href={a.href}
                className="flex items-center gap-4 p-4 outline-none transition-colors hover:bg-secondary/40 focus-visible:bg-secondary/40 focus-visible:ring-[3px] focus-visible:ring-inset focus-visible:ring-ring/40"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <a.icon className="size-[18px]" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-medium">{a.title}</span>
                  <span className="block truncate text-sm text-muted-foreground">
                    {a.body}
                  </span>
                </span>
                <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

const ACTIONS = [
  {
    href: "/plan",
    icon: ClipboardCheck,
    title: "Study plan",
    body: "A week-by-week schedule built around your test date.",
  },
  {
    href: "/nursehub",
    icon: ClipboardList,
    title: "NurseHub diagnostic",
    body: "Real NurseHub questions with a per-skill score sheet.",
  },
  {
    href: "/practice",
    icon: Dumbbell,
    title: "Practice",
    body: "Targeted drills by section, topic, and difficulty.",
  },
  {
    href: "/flashcards",
    icon: Layers,
    title: "A&P flashcards",
    body: "Spaced repetition for high-yield anatomy and physiology.",
  },
];

async function computeSectionScores(
  userId: string,
): Promise<Record<Section, number | null>> {
  const items = await db.attemptItem.findMany({
    where: {
      attempt: { userId, mode: "DIAGNOSTIC" },
      isCorrect: { not: null },
    },
    include: { question: { select: { section: true, topic: true } } },
    orderBy: { attempt: { finishedAt: "desc" } },
    take: 500,
  });

  const graded: GradedItem[] = items.map((it) => ({
    questionId: it.questionId,
    section: it.question.section as Section,
    topic: it.question.topic,
    isCorrect: !!it.isCorrect,
  }));
  const score = scoreItems(graded);

  const out = {} as Record<Section, number | null>;
  for (const s of SECTIONS) {
    out[s.key] = score.bySection[s.key]?.pct ?? null;
  }
  return out;
}
