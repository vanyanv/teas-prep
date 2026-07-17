"use client";

import Link from "next/link";

import { trackClient } from "@/components/analytics";
import { Button } from "@/components/ui/button";

/** A primary-CTA link that reports where in the page it was clicked. */
export function TrackedCta({
  href,
  location,
  size = "lg",
  variant = "default",
  className,
  children,
}: {
  href: string;
  /** e.g. "nav", "hero", "pricing", "final" */
  location: string;
  size?: "default" | "sm" | "lg";
  variant?: "default" | "ghost" | "outline" | "secondary";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Button asChild size={size} variant={variant} className={className}>
      <Link href={href} onClick={() => trackClient("cta_clicked", { location })}>
        {children}
      </Link>
    </Button>
  );
}
