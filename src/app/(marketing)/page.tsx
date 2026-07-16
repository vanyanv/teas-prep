import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Kicker } from "@/components/ui/page";
import {
  QuestionPreview,
  RationalePreview,
  TodayPreview,
} from "@/components/marketing/preview";

export const metadata = {
  title: "TEAS 7 Prep: your study plan, built from one diagnostic",
  description:
    "Take one diagnostic. Know exactly what to study every day. A TEAS 7 prep app that turns your results into a daily plan.",
};

/** The steps are a real sequence: each one consumes what the last produced. */
const STEPS = [
  {
    title: "Take one diagnostic",
    body: "About an hour across Reading, Math, Science, and English. You mark how sure you were on every question, so a lucky guess never reads as mastery.",
  },
  {
    title: "Get a plan, not a score",
    body: "Your results become ranked priorities, weighted by how much of the exam each skill is worth and how shaky it looked. The plan spreads them across the days you have left.",
  },
  {
    title: "Study today's session",
    body: "Open the app and there is one thing to do: a short lesson, the practice that follows from it, and any review that came due. No deciding, no dashboard to interpret.",
  },
  {
    title: "Keep what you learn",
    body: "Questions you miss come back on a spaced schedule, further apart as they stick. Mastery only moves when you are both correct and confident.",
  },
  {
    title: "Sit a full mock before the real thing",
    body: "Timed, blueprint-balanced, and scored the way the exam is, so test day is a repeat rather than a first.",
  },
];

export default async function LandingPage() {
  const session = await auth();
  if (session) redirect("/today");

  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
      <section className="py-14 sm:py-20">
        <Kicker>Take one diagnostic. Know what to study.</Kicker>
        <h1 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          Your TEAS study plan, built around what you actually need to learn.
        </h1>
        <p className="mt-4 max-w-prose text-base text-muted-foreground sm:text-lg">
          Most prep gives you a library and wishes you luck. This starts with an
          hour of questions, finds the skills that are actually costing you
          points, and turns them into a session you can finish today.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Button asChild size="lg">
            <Link href="/signup">
              Start with the diagnostic
              <ArrowRight />
            </Link>
          </Button>
          <Button asChild size="lg" variant="ghost">
            <Link href="/signin">I already have an account</Link>
          </Button>
        </div>
        <p className="mt-4 font-mono text-xs text-muted-foreground tabular-nums">
          836 questions · 4 sections · 12 topics · 85 skills
        </p>

        <div className="mt-12">
          <TodayPreview />
        </div>
      </section>

      <section className="border-t py-14 sm:py-20" aria-labelledby="how">
        <Kicker className="text-[11px]">How it works</Kicker>
        <h2
          id="how"
          className="mt-2 max-w-2xl text-2xl font-semibold tracking-tight text-balance sm:text-3xl"
        >
          One hour of questions decides the next several weeks.
        </h2>
        <ol className="mt-8 space-y-7">
          {STEPS.map((s, i) => (
            <li key={s.title} className="flex gap-4 sm:gap-5">
              <span
                className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md bg-primary/10 font-mono text-xs font-semibold text-primary"
                aria-hidden
              >
                {i + 1}
              </span>
              <div className="min-w-0">
                <h3 className="text-base font-semibold tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-1.5 max-w-prose text-[15px] leading-relaxed text-muted-foreground">
                  {s.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-t py-14 sm:py-20" aria-labelledby="questions">
        <Kicker className="text-[11px]">The questions</Kicker>
        <h2
          id="questions"
          className="mt-2 max-w-2xl text-2xl font-semibold tracking-tight text-balance sm:text-3xl"
        >
          The part you spend the most time in gets the most care.
        </h2>
        <p className="mt-4 max-w-prose text-[15px] leading-relaxed text-muted-foreground">
          Every format the real exam uses: multiple choice, select-all, fill in
          the blank, ordering, and hot spots. Passages sit beside their
          questions on a wide screen and a keystroke away on a phone. You can
          eliminate a choice without picking it, and say how sure you were
          before you see the answer.
        </p>
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <QuestionPreview />
          <RationalePreview />
        </div>
      </section>

      <section className="border-t py-14 sm:py-20" aria-labelledby="close">
        <h2
          id="close"
          className="max-w-2xl text-2xl font-semibold tracking-tight text-balance sm:text-3xl"
        >
          Stop guessing what to study.
        </h2>
        <p className="mt-4 max-w-prose text-[15px] leading-relaxed text-muted-foreground">
          Take the diagnostic, and the next session is waiting when you finish.
        </p>
        <Button asChild size="lg" className="mt-7">
          <Link href="/signup">
            Start with the diagnostic
            <ArrowRight />
          </Link>
        </Button>
      </section>
    </div>
  );
}
