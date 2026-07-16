import Link from "next/link";

import { Button } from "@/components/ui/button";

/**
 * Public shell: the same wordmark and chrome rhythm as the app, minus the
 * tabs and the auth guard. A visitor should recognize the signed-in product
 * as the same place they were just looking at.
 */
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-20 border-b bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-4xl items-center gap-4 px-4 sm:px-6">
          <Link href="/" className="shrink-0">
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              TEAS 7
            </span>
            <span className="ml-1.5 font-semibold tracking-tight">Prep</span>
          </Link>
          <div className="ml-auto flex items-center gap-1">
            <Button asChild variant="ghost" size="sm">
              <Link href="/signin">Sign in</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/signup">Get started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t">
        <div className="mx-auto flex max-w-4xl flex-col gap-3 px-4 py-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            TEAS 7 Prep. Not affiliated with or endorsed by ATI. ATI and TEAS
            are trademarks of Assessment Technologies Institute.
          </p>
          <Link
            href="/signin"
            className="rounded-md underline-offset-4 outline-none hover:text-foreground hover:underline focus-visible:ring-[3px] focus-visible:ring-ring/40"
          >
            Sign in
          </Link>
        </div>
      </footer>
    </div>
  );
}
