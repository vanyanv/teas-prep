import { PageContainer } from "@/components/ui/page";

/**
 * Route-level skeleton while a server page's data loads. Mirrors the shape
 * every app page shares (kicker, title, one hero surface) so the swap to real
 * content doesn't jump.
 */
export default function AppLoading() {
  return (
    <PageContainer aria-busy="true" aria-label="Loading">
      <div className="animate-pulse">
        <div className="h-3 w-32 rounded-md bg-secondary" />
        <div className="mt-3 h-8 w-3/4 max-w-sm rounded-md bg-secondary" />
        <div className="mt-8 rounded-xl border bg-card p-5 sm:p-6">
          <div className="h-3 w-24 rounded-md bg-secondary" />
          <div className="mt-4 h-6 w-2/3 rounded-md bg-secondary" />
          <div className="mt-3 h-4 w-full max-w-md rounded-md bg-secondary" />
          <div className="mt-6 h-10 w-36 rounded-md bg-secondary" />
        </div>
        <div className="mt-8 space-y-2">
          <div className="h-14 rounded-xl border bg-card" />
          <div className="h-14 rounded-xl border bg-card" />
        </div>
      </div>
      <span className="sr-only">Loading</span>
    </PageContainer>
  );
}
