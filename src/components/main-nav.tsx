"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

// Desktop top-bar links. Mobile uses BottomNav (same four destinations).
// Mock and Flashcards live inside Practice; the Plan lives inside Today.
const LINKS = [
  { href: "/today", label: "Today" },
  { href: "/learn", label: "Learn" },
  { href: "/practice", label: "Practice" },
  { href: "/progress", label: "Progress" },
];

function isActive(pathname: string, href: string): boolean {
  // The full plan view lives under Today in the product hierarchy.
  if (href === "/today") return pathname.startsWith("/today") || pathname.startsWith("/plan");
  return pathname.startsWith(href);
}

export function MainNav({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav className={cn("items-center gap-1 text-sm", className)}>
      {LINKS.map((link) => {
        const active = isActive(pathname, link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "whitespace-nowrap rounded-md px-2.5 py-1.5 transition-colors",
              active
                ? "bg-secondary font-medium text-foreground"
                : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
