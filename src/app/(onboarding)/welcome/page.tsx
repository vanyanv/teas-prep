import Link from "next/link";

import { requireUser } from "@/lib/session";
import { WelcomeForm } from "@/components/onboarding/welcome-form";

export const metadata = {
  title: "Welcome · TEAS 7 Prep",
};

/**
 * The three questions that shape the plan, asked once, all skippable.
 * Everything here can be changed later in settings.
 */
export default async function WelcomePage() {
  const user = await requireUser();

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="rounded-md outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40"
          >
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              TEAS 7
            </span>
            <span className="ml-1.5 font-semibold tracking-tight">Prep</span>
          </Link>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight text-balance">
            {user.name ? `Welcome, ${user.name.split(" ")[0]}.` : "Welcome."}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Three quick questions shape your plan. Skip anything; you can
            change all of this later in settings.
          </p>
        </div>
        <WelcomeForm
          initialTestDate={
            user.testDate ? user.testDate.toISOString().slice(0, 10) : ""
          }
        />
      </div>
    </main>
  );
}
