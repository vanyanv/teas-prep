import Link from "next/link";
import { CreditCard, LifeBuoy } from "lucide-react";

import { requireUser } from "@/lib/session";
import { db } from "@/lib/db";
import { PageContainer, PageHeader } from "@/components/ui/page";
import { SettingsForm } from "@/components/settings/settings-form";
import { SignOutButton } from "@/components/sign-out-button";

export default async function SettingsPage() {
  const sessionUser = await requireUser();
  const user = await db.user.findUniqueOrThrow({
    where: { id: sessionUser.id },
    select: { name: true, email: true, testDate: true, targetScore: true },
  });

  return (
    <PageContainer width="narrow">
      <PageHeader
        kicker="Account & settings"
        title="Your account"
        sub={user.email}
      />

      <div className="mt-8">
        <SettingsForm
          initial={{
            name: user.name ?? "",
            testDate: user.testDate ? user.testDate.toISOString().slice(0, 10) : "",
            targetScore: user.targetScore,
          }}
        />
      </div>

      <section className="mt-10">
        <h2 className="text-base font-semibold">More</h2>
        <div className="mt-3 divide-y rounded-xl border bg-card">
          <div className="flex items-center gap-3 p-4 text-sm text-muted-foreground">
            <CreditCard className="size-4 shrink-0" aria-hidden />
            <span>Subscription</span>
            <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.18em]">
              Coming soon
            </span>
          </div>
          <Link
            href="/resources"
            className="flex items-center gap-3 p-4 text-sm outline-none transition-colors hover:bg-secondary/40 focus-visible:ring-[3px] focus-visible:ring-ring/40"
          >
            <LifeBuoy className="size-4 shrink-0 text-muted-foreground" aria-hidden />
            Help & resources
          </Link>
        </div>
      </section>

      <div className="mt-10">
        <SignOutButton />
      </div>
    </PageContainer>
  );
}
