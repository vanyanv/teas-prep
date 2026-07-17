import Link from "next/link";
import { redirect } from "next/navigation";

import { PricingTableSafe } from "@/components/billing/pricing-table-safe";
import { requireUser } from "@/lib/session";
import { isPro } from "@/lib/access";
import { PageContainer, PageHeader } from "@/components/ui/page";

export const metadata = {
  title: "Upgrade · TEAS 7 Prep",
};

/** Only ever bounce back to our own pages after checkout. */
function safeAfter(after: string | undefined): string {
  if (after && after.startsWith("/") && !after.startsWith("//")) return after;
  return "/today";
}

export default async function UpgradePage({
  searchParams,
}: {
  searchParams: Promise<{ after?: string; context?: string }>;
}) {
  await requireUser();
  const { after } = await searchParams;
  const returnTo = safeAfter(after);

  // Already subscribed (e.g. back button after checkout): straight back to work.
  if (await isPro()) redirect(`${returnTo}?upgraded=1`);

  return (
    <PageContainer width="narrow">
      <PageHeader
        kicker="TEAS Pro"
        title="Pick up where you left off, with everything unlocked."
        sub="One plan: all 836 questions, the complete adaptive study plan, all 85 lessons, spaced review, timed section tests, and full mock exams. Cancel anytime; your progress stays either way."
      />
      <div className="mt-8">
        <PricingTableSafe redirectUrl={`${returnTo}?upgraded=1`} />
      </div>
      <p className="mt-6 text-sm text-muted-foreground">
        Payments are processed by Stripe through Clerk; your card details never
        touch our servers. Manage or cancel later from{" "}
        <Link
          href="/billing"
          className="rounded-md font-medium text-primary underline-offset-4 outline-none hover:underline focus-visible:ring-[3px] focus-visible:ring-ring/40"
        >
          billing
        </Link>
        .
      </p>
    </PageContainer>
  );
}
