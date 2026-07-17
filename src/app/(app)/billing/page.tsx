import { UserProfile } from "@clerk/nextjs";

import { requireUser } from "@/lib/session";
import { PageContainer, PageHeader } from "@/components/ui/page";

export const metadata = {
  title: "Billing · TEAS 7 Prep",
};

/**
 * Clerk's account surface, which carries the billing tab: current plan,
 * payment method, invoices, and cancellation. Canceling keeps Pro access
 * through the end of the paid period, then the account returns to the free
 * plan with all history intact.
 */
export default async function BillingPage() {
  await requireUser();

  return (
    <PageContainer width="wide">
      <PageHeader
        kicker="Billing"
        title="Your plan and payment details."
        sub="Cancel anytime. You keep Pro through the period you paid for, and your study history is never deleted."
      />
      <div className="mt-8">
        <UserProfile
          routing="hash"
          appearance={{ elements: { rootBox: "w-full", cardBox: "w-full shadow-none border" } }}
        />
      </div>
    </PageContainer>
  );
}
