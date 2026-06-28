"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/", label: "Dashboard" },
  { href: "/diagnostic", label: "Diagnostic" },
  { href: "/nursehub", label: "NurseHub" },
  { href: "/plan", label: "Plan" },
  { href: "/practice", label: "Practice" },
  { href: "/mock", label: "Mock exam" },
  { href: "/flashcards", label: "Flashcards" },
  { href: "/progress", label: "Progress" },
];

export function MainNav({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav className={cn("items-center gap-1 text-sm", className)}>
      {LINKS.map((link) => {
        const active =
          link.href === "/"
            ? pathname === "/"
            : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
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
