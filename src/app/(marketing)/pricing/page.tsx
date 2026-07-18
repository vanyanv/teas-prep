import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";

import { billingEnabled } from "@/lib/access";
import { Button } from "@/components/ui/button";
import { Kicker } from "@/components/ui/page";
import { Faq } from "@/components/marketing/faq";
import { PricingCard } from "@/components/marketing/pricing-card";
import { CTA_LABEL, FAQ_ITEMS, FREE_FEATURES } from "@/lib/marketing";

export const metadata = {
  title: "Pricing · TEAS 7 Prep",
  description:
    "One free plan, one paid plan. The diagnostic and your first study session are free; TEAS Pro is $4.99 per month, cancel anytime.",
};

/** The FAQ entries a visitor deciding about money actually needs. */
const PRICING_FAQ = FAQ_ITEMS.filter((item) =>
  [
    "Do I need a credit card to begin?",
    "Can I cancel at any time?",
    "What happens to my progress if I cancel?",
    "Does this guarantee a particular TEAS score?",
  ].includes(item.q),
);

export default function PricingPage() {
  // While billing is off there is no plan to sell; the landing page already
  // says everything is free.
  if (!billingEnabled()) redirect("/");
  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
      <section className="py-14 sm:py-20">
        <Kicker>Pricing</Kicker>
        <h1 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          Simple TEAS preparation.
        </h1>
        <p className="mt-4 max-w-prose text-base text-muted-foreground sm:text-lg">
          Start free, see exactly where you stand, and study your first
          session. Upgrade only if the plan earns it.
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-8">
          <div>
            <h2 className="text-base font-semibold tracking-tight">
              Free to every account
            </h2>
            <ul className="mt-4 space-y-2.5">
              {FREE_FEATURES.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2.5 text-[15px] leading-relaxed"
                >
                  <Check
                    className="mt-1 size-4 shrink-0 text-muted-foreground"
                    aria-hidden
                  />
                  <span className="min-w-0">{feature}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 max-w-prose text-sm leading-relaxed text-muted-foreground">
              The free plan is a working sample of the real thing: the same
              diagnostic, the same results, and a genuine personalized session.
              It exists so you can judge the product on evidence.
            </p>
          </div>
          <PricingCard ctaHref="/sign-up" />
        </div>
      </section>

      <section className="border-t py-14 sm:py-20" aria-labelledby="pricing-faq">
        <Kicker className="text-[11px]">FAQ</Kicker>
        <h2
          id="pricing-faq"
          className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl"
        >
          The money questions.
        </h2>
        <div className="mt-8 max-w-2xl">
          <Faq items={PRICING_FAQ} />
        </div>
      </section>

      <section className="border-t py-14 sm:py-20" aria-labelledby="pricing-close">
        <h2
          id="pricing-close"
          className="max-w-2xl text-2xl font-semibold tracking-tight text-balance sm:text-3xl"
        >
          See your results before you spend a dollar.
        </h2>
        <Button asChild size="lg" className="mt-7">
          <Link href="/sign-up">
            {CTA_LABEL}
            <ArrowRight />
          </Link>
        </Button>
      </section>
    </div>
  );
}
