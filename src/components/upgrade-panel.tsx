import Link from "next/link";
import { Check } from "lucide-react";

import { TrackView } from "@/components/analytics";
import { UpgradeCta } from "@/components/upgrade-cta";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Kicker } from "@/components/ui/page";

/**
 * The contextual paywall: an inline panel, never a modal, never a scare.
 * It says what the student was doing, what Pro adds to it, the price, and
 * how to leave without paying.
 */
export function UpgradePanel({
  heading,
  body,
  unlocks,
  after,
  context,
  className,
}: {
  /** What this unlocks, phrased around what the student was attempting. */
  heading: string;
  /** Why the feature matters, one calm sentence. */
  body: string;
  /** The two or three most relevant things Pro adds here. */
  unlocks: string[];
  /** In-app path to return to after checkout. */
  after: string;
  /** Analytics context slug, e.g. "mock", "plan", "lesson". */
  context: string;
  className?: string;
}) {
  const upgradeHref = `/upgrade?after=${encodeURIComponent(after)}&context=${encodeURIComponent(context)}`;
  return (
    <section
      aria-label="Upgrade to TEAS Pro"
      className={className}
      data-paywall={context}
    >
      <TrackView name="paywall_viewed" props={{ context }} />
      <div className="rounded-xl border bg-card p-6 shadow-sm sm:p-7">
        <div className="flex items-baseline justify-between gap-3">
          <Kicker className="text-[11px]">TEAS Pro</Kicker>
          <Badge variant="primary">Founding member price</Badge>
        </div>
        <h2 className="mt-3 text-lg font-semibold tracking-tight text-balance">
          {heading}
        </h2>
        <p className="mt-2 max-w-prose text-sm leading-relaxed text-muted-foreground">
          {body}
        </p>
        <ul className="mt-4 space-y-2">
          {unlocks.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2.5 text-sm leading-relaxed"
            >
              <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              <span className="min-w-0">{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-5 flex items-baseline gap-1.5">
          <span className="font-mono text-2xl font-semibold tracking-tight tabular-nums">
            $4.99
          </span>
          <span className="text-sm text-muted-foreground">
            per month, cancel anytime
          </span>
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <UpgradeCta href={upgradeHref} context={context} />
          <Button asChild variant="ghost" size="lg" className="text-muted-foreground">
            <Link href="/today">Keep studying free</Link>
          </Button>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          Your progress and history stay yours either way.
        </p>
      </div>
    </section>
  );
}
