/**
 * Results is the slowest page in the app (it re-grades and joins the whole
 * attempt), and it is the one page a learner is anxious on arrival. Reserve the
 * score block and the review list so the score lands in place instead of
 * shoving the page down as it arrives.
 */
export default function ResultsLoading() {
  return (
    <div
      className="mx-auto w-full max-w-2xl px-4 py-8"
      aria-busy="true"
      aria-label="Scoring your attempt"
    >
      <div className="animate-pulse">
        <div className="flex flex-col items-center">
          <div className="size-32 rounded-full bg-secondary" />
          <div className="mt-5 h-5 w-48 rounded-md bg-secondary" />
          <div className="mt-2 h-4 w-64 rounded-md bg-secondary" />
        </div>
        <div className="mt-8 grid grid-cols-3 gap-2">
          <div className="h-16 rounded-xl border bg-card" />
          <div className="h-16 rounded-xl border bg-card" />
          <div className="h-16 rounded-xl border bg-card" />
        </div>
        <div className="mt-8 space-y-2">
          <div className="h-16 rounded-xl border bg-card" />
          <div className="h-16 rounded-xl border bg-card" />
          <div className="h-16 rounded-xl border bg-card" />
        </div>
      </div>
      <span className="sr-only">Scoring your attempt</span>
    </div>
  );
}
