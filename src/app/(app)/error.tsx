"use client";

import { useEffect } from "react";
import { AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageContainer, Kicker } from "@/components/ui/page";

/**
 * Route-level error boundary for the signed-in app. Calm, honest, and
 * recoverable: nothing the learner did was lost, and one action retries.
 */
export default function AppError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  /** Re-fetches and re-renders the failed segment (Next 16.2 convention). */
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <PageContainer className="flex flex-col items-start">
      <Kicker>Something went wrong</Kicker>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
        This page hit a snag.
      </h1>
      <p className="mt-3 max-w-prose text-sm text-muted-foreground">
        Your answers and progress are saved. Try again, and if it keeps
        happening, sign out and back in.
      </p>
      <div className="mt-6 flex items-center gap-3">
        <Button onClick={() => unstable_retry()}>Try again</Button>
        <Button asChild variant="outline">
          <a href="/today">Back to Today</a>
        </Button>
      </div>
      <p className="mt-8 flex items-center gap-2 font-mono text-xs text-muted-foreground">
        <AlertCircle className="size-3.5" aria-hidden />
        {error.digest ? `Error ${error.digest}` : "Unexpected error"}
      </p>
    </PageContainer>
  );
}
