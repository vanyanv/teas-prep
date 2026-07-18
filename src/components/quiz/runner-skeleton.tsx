/**
 * Placeholder for the full-bleed question runners. The app-wide skeleton is
 * shaped like a PageContainer page (kicker, title, hero card), which is the
 * wrong silhouette here and reads as a layout jump when the runner mounts.
 * This mirrors the runner instead: meta row, progress bar, prompt, choices.
 */
export function RunnerSkeleton({ choices = 4 }: { choices?: number }) {
  return (
    <div
      className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col px-4 pb-28 pt-4"
      aria-busy="true"
      aria-label="Loading questions"
    >
      <div className="animate-pulse">
        <div className="flex items-center justify-between gap-3">
          <div className="h-4 w-32 rounded-md bg-secondary" />
          <div className="h-4 w-12 rounded-md bg-secondary" />
        </div>
        <div className="mt-3 h-1.5 w-full rounded-full bg-secondary" />

        <div className="mt-8 space-y-2.5">
          <div className="h-5 w-full rounded-md bg-secondary" />
          <div className="h-5 w-4/5 rounded-md bg-secondary" />
        </div>

        <div className="mt-6 flex flex-col gap-2.5">
          {Array.from({ length: choices }, (_, i) => (
            <div key={i} className="h-14 rounded-xl border bg-card" />
          ))}
        </div>
      </div>
      <span className="sr-only">Loading questions</span>
    </div>
  );
}
