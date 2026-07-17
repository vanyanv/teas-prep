"use client";

import * as React from "react";
import Link from "next/link";
import { PricingTable } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { Kicker } from "@/components/ui/page";

class Boundary extends React.Component<
  { fallback: React.ReactNode; children: React.ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

/**
 * Clerk's <PricingTable/> throws outright when Billing is not yet enabled on
 * the instance (e.g. a fresh dev instance). Checkout being misconfigured
 * should read as "not available right now", never as a broken page.
 */
export function PricingTableSafe({ redirectUrl }: { redirectUrl: string }) {
  return (
    <Boundary
      fallback={
        <div className="rounded-xl border bg-card p-6">
          <Kicker className="text-[11px]">Checkout</Kicker>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Checkout is not available right now. Nothing is wrong with your
            account, and nothing was charged. Try again in a little while, or
            head back to your studying.
          </p>
          <Button asChild variant="outline" size="sm" className="mt-4">
            <Link href="/today">Back to Today</Link>
          </Button>
        </div>
      }
    >
      <PricingTable newSubscriptionRedirectUrl={redirectUrl} />
    </Boundary>
  );
}
