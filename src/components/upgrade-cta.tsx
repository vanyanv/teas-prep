"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { trackClient } from "@/components/analytics";
import { Button } from "@/components/ui/button";

/** The paywall's upgrade button: reports checkout intent, then navigates. */
export function UpgradeCta({
  href,
  context,
}: {
  href: string;
  context: string;
}) {
  return (
    <Button asChild size="lg">
      <Link
        href={href}
        onClick={() => trackClient("checkout_started", { context })}
      >
        Upgrade to TEAS Pro
        <ArrowRight />
      </Link>
    </Button>
  );
}
