"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useClerk } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import {
  CircleUserRound,
  CreditCard,
  LifeBuoy,
  LogOut,
  Moon,
  Settings,
  Sun,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ProfileMenu({
  name,
  email,
}: {
  name?: string | null;
  email?: string | null;
}) {
  const { resolvedTheme, setTheme } = useTheme();
  const { signOut } = useClerk();
  const [mounted, setMounted] = useState(false);

  // Defer (rAF) so this runs after hydration without a synchronous effect
  // setState; server and client both render the Moon until mounted.
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";
  const display = name?.trim() || email || "Your account";
  const initial = display.slice(0, 1).toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Account menu"
        className="flex size-8 items-center justify-center rounded-full bg-secondary text-sm font-medium text-secondary-foreground outline-none transition-colors hover:bg-accent focus-visible:ring-[3px] focus-visible:ring-ring/40 data-[state=open]:bg-accent"
      >
        {initial || <CircleUserRound className="size-4" aria-hidden />}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <span className="block truncate text-sm font-medium">{display}</span>
          {name && email && (
            <span className="block truncate text-xs text-muted-foreground">
              {email}
            </span>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/settings">
            <Settings aria-hidden />
            Account & settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <CreditCard aria-hidden />
          Subscription
          <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Soon
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/resources">
            <LifeBuoy aria-hidden />
            Help & resources
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={(event) => {
            event.preventDefault();
            setTheme(isDark ? "light" : "dark");
          }}
        >
          {isDark ? <Sun aria-hidden /> : <Moon aria-hidden />}
          {isDark ? "Light mode" : "Dark mode"}
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => signOut({ redirectUrl: "/" })}>
          <LogOut aria-hidden />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
