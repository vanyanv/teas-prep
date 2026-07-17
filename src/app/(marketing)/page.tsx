import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight } from "lucide-react";

import { auth } from "@clerk/nextjs/server";

import { TrackView } from "@/components/analytics";
import { Button } from "@/components/ui/button";
import { Kicker } from "@/components/ui/page";
import { Faq } from "@/components/marketing/faq";
import { PricingCard } from "@/components/marketing/pricing-card";
import { TrackedCta } from "@/components/marketing/tracked-cta";
import {
  LessonPreview,
  QuestionPreview,
  RationalePreview,
  ResultsPreview,
  TodayPreview,
} from "@/components/marketing/preview";
import { CTA_LABEL, FACTS, FAQ_ITEMS } from "@/lib/marketing";

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
    title: "Keep it, then prove it",
    body: "Questions you miss come back on a spaced schedule, further apart as they stick. When your date is close, sit a timed, blueprint-balanced mock so test day is a repeat rather than a first.",
  },
];

const DIFFERENTIATORS = [
  {
    title: "Know what to study",
    body: "The diagnostic and confidence-weighted mastery point at the skills worth your next hour, ranked by how much of the exam they carry. You never open the app wondering where to begin.",
  },
  {
    title: "Study in sessions you can finish",
    body: "Each day combines a short lesson, targeted questions, and the review that came due. About twenty minutes, one Start button, built for the gap between work and sleep.",
  },
  {
    title: "Review before you forget",
    body: "Missed and shaky questions return on a spaced schedule, spaced further apart as they stick. Weak skills stay in rotation until they stop being weak.",
  },
];

export default async function LandingPage() {
  const { userId } = await auth();
  if (userId) redirect("/today");

  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
      <TrackView name="landing_viewed" />
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
          <TrackedCta href="/sign-up" location="hero">
            {CTA_LABEL}
            <ArrowRight />
          </TrackedCta>
          <Button asChild size="lg" variant="ghost">
            <Link href="/#how">See how it works</Link>
          </Button>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          No credit card required.
        </p>
        <p className="mt-4 font-mono text-xs text-muted-foreground tabular-nums">
          {FACTS}
        </p>

        <div className="mt-12">
          <TodayPreview />
        </div>
      </section>

      <section className="border-t py-14 sm:py-20" aria-labelledby="how">
        <Kicker className="text-[11px]">How it works</Kicker>
        <h2
          id="how"
          className="mt-2 max-w-2xl scroll-mt-20 text-2xl font-semibold tracking-tight text-balance sm:text-3xl"
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

      <section className="border-t py-14 sm:py-20" aria-labelledby="results">
        <Kicker className="text-[11px]">Your results</Kicker>
        <h2
          id="results"
          className="mt-2 max-w-2xl text-2xl font-semibold tracking-tight text-balance sm:text-3xl"
        >
          A score tells you where you stand. This tells you what to do.
        </h2>
        <p className="mt-4 max-w-prose text-[15px] leading-relaxed text-muted-foreground">
          Results arrive as a diagnosis, not a grade: how each section went,
          which skills are costing you the most points, and where guessing
          papered over a gap. One tap turns them into your plan.
        </p>
        <div className="mt-10 lg:grid lg:grid-cols-5 lg:gap-8">
          <ResultsPreview className="lg:col-span-3" />
        </div>
      </section>

      <section className="border-t py-14 sm:py-20" aria-labelledby="features">
        <Kicker className="text-[11px]">The lessons</Kicker>
        <h2
          id="features"
          className="mt-2 max-w-2xl scroll-mt-20 text-2xl font-semibold tracking-tight text-balance sm:text-3xl"
        >
          Lessons built for the night before a shift, not a semester.
        </h2>
        <p className="mt-4 max-w-prose text-[15px] leading-relaxed text-muted-foreground">
          One concept at a time, math typeset properly, a worked example you
          step through yourself, the mistake most students make, and a quick
          check before you move on. Five to seven minutes, start to finish.
        </p>
        <div className="mt-10 lg:grid lg:grid-cols-5 lg:gap-8">
          <LessonPreview className="lg:col-span-3" />
        </div>
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

      <section className="border-t py-14 sm:py-20" aria-labelledby="why">
        <Kicker className="text-[11px]">Why this works</Kicker>
        <h2
          id="why"
          className="mt-2 max-w-2xl text-2xl font-semibold tracking-tight text-balance sm:text-3xl"
        >
          Three habits the app enforces so you do not have to.
        </h2>
        <div className="mt-8 space-y-7">
          {DIFFERENTIATORS.map((d) => (
            <div key={d.title}>
              <h3 className="text-base font-semibold tracking-tight">
                {d.title}
              </h3>
              <p className="mt-1.5 max-w-prose text-[15px] leading-relaxed text-muted-foreground">
                {d.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t py-14 sm:py-20" aria-labelledby="pricing">
        <Kicker className="text-[11px]">Pricing</Kicker>
        <h2
          id="pricing"
          className="mt-2 max-w-2xl scroll-mt-20 text-2xl font-semibold tracking-tight text-balance sm:text-3xl"
        >
          Simple TEAS preparation.
        </h2>
        <p className="mt-4 max-w-prose text-[15px] leading-relaxed text-muted-foreground">
          The diagnostic, your full results, your top three priorities, and
          your first study session are free. One paid plan unlocks the rest.
        </p>
        <PricingCard ctaHref="/sign-up" className="mt-10 max-w-md" />
      </section>

      <section className="border-t py-14 sm:py-20" aria-labelledby="faq">
        <Kicker className="text-[11px]">FAQ</Kicker>
        <h2
          id="faq"
          className="mt-2 max-w-2xl text-2xl font-semibold tracking-tight text-balance sm:text-3xl"
        >
          Questions, answered plainly.
        </h2>
        <div className="mt-8 max-w-2xl">
          <Faq items={FAQ_ITEMS} />
        </div>
      </section>

      <section className="border-t py-14 sm:py-20" aria-labelledby="close">
        <h2
          id="close"
          className="max-w-2xl text-2xl font-semibold tracking-tight text-balance sm:text-3xl"
        >
          Stop guessing what to study next.
        </h2>
        <p className="mt-4 max-w-prose text-[15px] leading-relaxed text-muted-foreground">
          Take the diagnostic and start with the skills that can make the
          greatest difference.
        </p>
        <TrackedCta href="/sign-up" location="final" className="mt-7">
          {CTA_LABEL}
          <ArrowRight />
        </TrackedCta>
      </section>
    </div>
  );
}
