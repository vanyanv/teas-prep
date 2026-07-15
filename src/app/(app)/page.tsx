import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  ClipboardCheck,
  Dumbbell,
  Layers,
  Play,
  RotateCcw,
  Timer,
  type LucideIcon,
} from "lucide-react";

import { requireUser } from "@/lib/session";
import { Button } from "@/components/ui/button";
import { ScoreRing } from "@/components/score-ring";
import { getMasteryData } from "@/lib/mastery";
import { getTodaySummary, type TodayKind } from "@/lib/study/today";
import { practiceHref } from "@/lib/quiz/links";
import { SECTIONS, sectionLabel } from "@/lib/teas-blueprint";

const KIND_ICON: Record<TodayKind, LucideIcon> = {
  diagnostic: ClipboardCheck,
  session: Play,
  review: RotateCcw,
  flashcards: Layers,
  drill: Dumbbell,
  study: BookOpen,
  mock: Timer,
};

export default async function DashboardPage() {
  const user = await requireUser();
  const [today, mastery] = await Promise.all([
    getTodaySummary(user.id),
    getMasteryData(user.id),
  ]);

  const PrimaryIcon = KIND_ICON[today.primary.kind];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      <header>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {user.name ? `${user.name.split(" ")[0]} — ` : ""}Today
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          {today.hasData ? "Here's your next move." : "Let's find your starting point."}
        </h1>
      </header>

      {/* Primary action — the one clear next thing to do */}
      <section className="mt-6 rounded-2xl border bg-card p-6 sm:p-7">
        <div className="flex items-start gap-4">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <PrimaryIcon className="size-[22px]" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold">{today.primary.label}</h2>
              {today.primary.count != null && today.primary.count > 0 && (
                <span className="rounded-full bg-primary/10 px-2 py-0.5 font-mono text-xs font-medium text-primary tabular-nums">
                  {today.primary.count}
                </span>
              )}
            </div>
            <p className="mt-1 max-w-prose text-sm text-muted-foreground">
              {today.primary.detail}
            </p>
            <Button asChild className="mt-4">
              <Link href={today.primary.href}>
                Start
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Secondary actions */}
      {today.secondary.length > 0 && (
        <section className="mt-4">
          <h2 className="px-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Also worth doing
          </h2>
          <ul className="mt-2 grid gap-2 sm:grid-cols-2">
            {today.secondary.map((a) => {
              const Icon = KIND_ICON[a.kind];
              return (
                <li key={a.kind + a.href}>
                  <Link
                    href={a.href}
                    className="flex items-center gap-3 rounded-xl border bg-card p-3.5 outline-none transition-colors hover:bg-secondary/40 focus-visible:ring-[3px] focus-visible:ring-ring/40"
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-muted-foreground">
                      <Icon className="size-[18px]" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium">{a.label}</span>
                      <span className="block truncate text-xs text-muted-foreground">
                        {a.detail}
                      </span>
                    </span>
                    {a.count != null && a.count > 0 && (
                      <span className="font-mono text-xs text-muted-foreground tabular-nums">
                        {a.count}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {/* Readiness + tappable section mastery */}
      {today.hasData && (
        <section className="mt-8 rounded-2xl border bg-card p-6 sm:p-7">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
            <div className="flex items-center gap-4">
              <ScoreRing score={mastery.overall} size="lg" />
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  Readiness
                </p>
                <p className="text-sm text-muted-foreground">
                  Mastery vs. a 70% target. Tap a section to work on it.
                </p>
              </div>
            </div>
            <div className="grid flex-1 grid-cols-4 gap-2">
              {SECTIONS.map((s) => (
                <Link
                  key={s.key}
                  href={practiceHref({ section: s.key })}
                  className="flex flex-col items-center gap-2 rounded-xl p-2 outline-none transition-colors hover:bg-secondary/50 focus-visible:ring-[3px] focus-visible:ring-ring/40"
                >
                  <ScoreRing score={mastery.sections[s.key]} size="md" />
                  <span className="text-center text-[11px] leading-tight text-muted-foreground">
                    {sectionLabel(s.key)}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
