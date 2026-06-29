"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

// Desktop top-bar links. Mobile uses BottomNav (5 primary tabs).
const LINKS = [
  { href: "/", label: "Today" },
  { href: "/learn", label: "Learn" },
  { href: "/practice", label: "Practice" },
  { href: "/mock", label: "Mock" },
  { href: "/flashcards", label: "Flashcards" },
  { href: "/progress", label: "Progress" },
  { href: "/plan", label: "Plan" },
];

function isActive(pathname: string, href: string): boolean {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
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
