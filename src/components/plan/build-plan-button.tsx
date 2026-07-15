"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

/**
 * One-tap plan creation: POSTs an empty body (the API resolves the exam date
 * from the profile) and lands on Today, where the new session card takes over.
 */
export function BuildPlanButton({ className }: { className?: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function build() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      if (!res.ok) throw new Error();
      router.push("/");
      router.refresh();
    } catch {
      setError("Could not build the plan. Please try again.");
      setBusy(false);
    }
  }

  return (
    <div className={className}>
      <Button size="lg" className="w-full" onClick={build} disabled={busy}>
        {busy ? (
          <>
            <Loader2 className="animate-spin" />
            Building your plan…
          </>
        ) : (
          <>
            Build my study plan
            <ArrowRight />
          </>
        )}
      </Button>
      {error && <p className="mt-2 text-center text-sm text-destructive">{error}</p>}
    </div>
  );
}
