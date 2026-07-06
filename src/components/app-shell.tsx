"use client";

import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";
import { SignOutButton } from "@/components/sign-out-button";
import { MainNav } from "@/components/main-nav";
import { BottomNav } from "@/components/bottom-nav";
import { useFocusMode } from "@/components/focus-mode";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { focus } = useFocusMode();

  // Focus mode (a running quiz/mock): hide all chrome so only the question
  // and its bottom action bar show. The chrome is hidden in place (not a
  // separate tree) so `children` keeps its position and React never remounts
  // the running quiz when focus toggles.
  return (
    <div className="flex min-h-dvh flex-col">
      {!focus && (
        <header className="sticky top-0 z-20 border-b bg-background/85 backdrop-blur">
          <div className="mx-auto flex h-14 max-w-5xl items-center gap-4 px-4 sm:px-6">
            <Link href="/" className="shrink-0">
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                TEAS 7
              </span>
              <span className="ml-1.5 font-semibold tracking-tight">Prep</span>
            </Link>
            <MainNav className="hidden gap-0.5 sm:flex" />
            <div className="ml-auto flex items-center gap-1">
              <ThemeToggle />
              <SignOutButton />
            </div>
          </div>
        </header>
      )}

      {/* extra bottom padding on mobile so content clears the bottom tab bar */}
      <main className={focus ? "flex-1" : "flex-1 pb-20 sm:pb-0"}>
        {children}
      </main>

      {!focus && (
        <footer className="hidden border-t sm:block">
          <div className="mx-auto flex max-w-5xl items-center gap-5 px-4 py-4 text-sm text-muted-foreground sm:px-6">
            <Link href="/diagnostic" className="hover:text-foreground">
              Diagnostic
            </Link>
            <Link href="/import" className="hover:text-foreground">
              Import questions
            </Link>
            <Link href="/resources" className="hover:text-foreground">
              Resources
            </Link>
          </div>
        </footer>
      )}

      {!focus && <BottomNav />}
    </div>
  );
}
