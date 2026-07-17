import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  ClipboardCheck,
  RotateCcw,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Kicker } from "@/components/ui/page";
import type { SessionPreview } from "@/lib/study/dashboard";
import type { TodayAction } from "@/lib/study/today";

const CTA_BY_KIND: Partial<Record<TodayAction["kind"], string>> = {
  session: "Start session",
  diagnostic: "Start diagnostic",
  mock: "Start mock exam",
};

/**
 * The hero of Today: what the next study block is, why it was chosen, and
 * exactly what's inside it. One button; the composition does the persuading.
 */
export function SessionHero({
  action,
  preview,
}: {
  action: TodayAction;
  preview: SessionPreview | null;
}) {
  const title = preview
    ? preview.reviewCount > 0
      ? `${preview.focusLabel} + review`
      : `${preview.focusLabel} practice`
    : action.label;
  const why = preview?.whyLine ?? action.detail;

  return (
    <section className="rounded-2xl border bg-card p-6 sm:p-7">
      <Kicker className="text-[11px]">
        {preview ? "Today's session" : "Up next"}
      </Kicker>
      <h2 className="mt-2 text-xl font-semibold tracking-tight text-balance">
        {title}
      </h2>
      <p className="mt-2 max-w-prose text-sm leading-relaxed text-muted-foreground">
        {why}
      </p>

      {preview && (
        <ul className="mt-5 space-y-2.5 text-sm text-muted-foreground">
          {preview.reviewCount > 0 && (
            <li className="flex items-center gap-2.5">
              <RotateCcw className="size-4 shrink-0 text-primary/70" aria-hidden />
              {preview.reviewCount} review question
              {preview.reviewCount === 1 ? "" : "s"} you missed or were unsure about
            </li>
          )}
          {preview.hasLesson && (
            <li className="flex items-center gap-2.5">
              <BookOpen className="size-4 shrink-0 text-primary/70" aria-hidden />
              Short lesson: {preview.lessonTitle}
            </li>
          )}
          {preview.practiceCount > 0 && (
            <li className="flex items-center gap-2.5">
              <ClipboardCheck className="size-4 shrink-0 text-primary/70" aria-hidden />
              {preview.practiceCount} targeted {preview.focusLabel} question
              {preview.practiceCount === 1 ? "" : "s"}
            </li>
          )}
        </ul>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <Button asChild size="lg" className="w-full sm:w-auto">
          <Link href={action.href}>
            {CTA_BY_KIND[action.kind] ?? "Start"}
            <ArrowRight />
          </Link>
        </Button>
        {preview && (
          <Kicker asChild className="text-center sm:text-left">
            <span>~{preview.estimatedMinutes} min</span>
          </Kicker>
        )}
      </div>
    </section>
  );
}
