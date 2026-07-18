import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PageContainer, PageHeader } from "@/components/ui/page";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { requireUser } from "@/lib/session";
import { getSubjectCards } from "@/lib/progress/read";
import type { Section } from "@/lib/teas-blueprint";

const ACCENT: Record<Section, string> = {
  READING: "bg-section-reading",
  MATH: "bg-section-math",
  SCIENCE: "bg-section-science",
  ENGLISH: "bg-section-english",
};

const pctLabel = (n: number | null) => (n == null ? "–" : `${n}%`);

export default async function LearnPage() {
  const user = await requireUser();
  const cards = await getSubjectCards(user.id);

  return (
    <PageContainer>
      <PageHeader
        kicker="Learn"
        title="Learn the material"
        sub="Study each TEAS section by topic and skill. Completion tracks the work you've finished; mastery tracks how well you know it — they move independently."
      />

      <ul className="mt-10 space-y-3">
        {cards.map((card) => (
          <li key={card.section}>
            <div className="rounded-xl border bg-card p-5">
              <div className="flex items-center justify-between gap-3">
                <Link
                  href={card.href}
                  className="inline-flex items-center gap-2 rounded-md text-lg font-semibold tracking-tight outline-none hover:underline focus-visible:ring-[3px] focus-visible:ring-ring/40"
                >
                  <span aria-hidden className={`size-2 rounded-full ${ACCENT[card.section]}`} />
                  {card.label}
                </Link>
                <span className="shrink-0 font-mono text-sm tabular-nums text-muted-foreground">
                  {pctLabel(card.completionPct)}
                </span>
              </div>

              <p className="mt-1 font-mono text-xs tabular-nums text-muted-foreground">
                {card.skillsCompleted} of {card.skillsRequired} skills completed
              </p>
              <Progress
                value={card.completionPct}
                size="sm"
                className="mt-3"
                aria-label={`${card.label} completion`}
              />

              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs tabular-nums text-muted-foreground">
                <span>Mastery {pctLabel(card.masteryPct)}</span>
                <span>Latest quiz {pctLabel(card.latestQuizPct)}</span>
              </div>

              {card.next && (
                <Button asChild variant="outline" size="sm" className="mt-4">
                  <Link href={card.next.href}>
                    {card.next.label}
                    <ArrowRight />
                  </Link>
                </Button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </PageContainer>
  );
}
