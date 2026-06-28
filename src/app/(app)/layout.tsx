import Link from "next/link";

import { requireUser } from "@/lib/session";
import { ThemeToggle } from "@/components/theme-toggle";
import { SignOutButton } from "@/components/sign-out-button";
import { MainNav } from "@/components/main-nav";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireUser();

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-20 border-b bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-5xl items-center gap-4 px-4 sm:px-6">
          <Link href="/" className="shrink-0">
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              TEAS 7
            </span>
            <span className="ml-1.5 font-semibold tracking-tight">Prep</span>
          </Link>
          <MainNav className="hidden sm:flex" />
          <div className="ml-auto flex items-center gap-1">
            <ThemeToggle />
            <SignOutButton />
          </div>
        </div>
        <MainNav className="flex overflow-x-auto border-t px-4 py-1.5 sm:hidden" />
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t">
        <div className="mx-auto flex max-w-5xl items-center gap-5 px-4 py-4 text-sm text-muted-foreground sm:px-6">
          <Link href="/import" className="hover:text-foreground">
            Import questions
          </Link>
          <Link href="/resources" className="hover:text-foreground">
            Resources
          </Link>
        </div>
      </footer>
    </div>
  );
}
