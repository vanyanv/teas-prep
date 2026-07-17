import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Kicker } from "@/components/ui/page";

/** Brand 404: same voice as the app, one way back. */
export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-4 py-12 text-center">
      <Kicker>404</Kicker>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
        That page isn&apos;t here.
      </h1>
      <p className="mt-3 max-w-prose text-sm text-muted-foreground">
        The link may be old, or the page may have moved.
      </p>
      <Button asChild className="mt-6">
        <Link href="/today">Back to Today</Link>
      </Button>
    </main>
  );
}
