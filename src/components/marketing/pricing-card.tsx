import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Kicker } from "@/components/ui/page";
import {
  CTA_LABEL,
  PLAN_NAME,
  PRICE,
  PRICE_BADGE,
  PRICE_PERIOD,
  PRICING_SUPPORT,
  PRO_FEATURES,
} from "@/lib/marketing";

/**
 * The single pricing surface: one plan, one price, one CTA. Used on the
 * landing page and the standalone pricing page so they cannot disagree.
 */
export function PricingCard({
  ctaHref,
  className,
}: {
  ctaHref: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="rounded-xl border bg-card p-6 shadow-sm sm:p-7">
        <div className="flex items-baseline justify-between gap-3">
          <Kicker asChild className="text-[11px]">
            <h3>{PLAN_NAME}</h3>
          </Kicker>
          <Badge variant="primary">{PRICE_BADGE}</Badge>
        </div>
        <p className="mt-3 flex items-baseline gap-1.5">
          <span className="font-mono text-4xl font-semibold tracking-tight tabular-nums">
            {PRICE}
          </span>
          <span className="text-sm text-muted-foreground">
            per {PRICE_PERIOD}, cancel anytime
          </span>
        </p>
        <ul className="mt-6 space-y-2.5">
          {PRO_FEATURES.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2.5 text-[15px] leading-relaxed"
            >
              <Check className="mt-1 size-4 shrink-0 text-primary" aria-hidden />
              <span className="min-w-0">{feature}</span>
            </li>
          ))}
        </ul>
        <Button asChild size="lg" className="mt-7 w-full">
          <Link href={ctaHref}>
            {CTA_LABEL}
            <ArrowRight />
          </Link>
        </Button>
      </div>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        {PRICING_SUPPORT}
      </p>
    </div>
  );
}
