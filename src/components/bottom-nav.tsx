"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  BookOpen,
  Dumbbell,
  Home,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

const TABS: { href: string; label: string; icon: LucideIcon }[] = [
  { href: "/today", label: "Today", icon: Home },
  { href: "/learn", label: "Learn", icon: BookOpen },
  { href: "/practice", label: "Practice", icon: Dumbbell },
  { href: "/progress", label: "Progress", icon: BarChart3 },
];

function isActive(pathname: string, href: string): boolean {
  // The full plan view lives under Today in the product hierarchy.
  if (href === "/today") return pathname.startsWith("/today") || pathname.startsWith("/plan");
  return pathname.startsWith(href);
}

/** Thumb-reachable bottom tab bar (mobile only; desktop uses the top bar). */
export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-30 border-t bg-background/95 backdrop-blur sm:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="mx-auto flex max-w-lg items-stretch">
        {TABS.map((tab) => {
          const active = isActive(pathname, tab.href);
          const Icon = tab.icon;
          return (
            <li key={tab.href} className="flex-1">
              <Link
                href={tab.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex flex-col items-center gap-1 rounded-md py-2.5 text-[11px] font-medium outline-none transition-colors",
                  "focus-visible:ring-[3px] focus-visible:ring-ring/40 focus-visible:ring-inset",
                  active ? "text-primary" : "text-muted-foreground",
                )}
              >
                <Icon
                  className={cn("size-5", active && "fill-primary/10")}
                  strokeWidth={active ? 2.4 : 1.9}
                />
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
