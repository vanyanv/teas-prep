import Link from "next/link";

import { billingEnabled } from "@/lib/access";
import { Button } from "@/components/ui/button";
import { TrackedCta } from "@/components/marketing/tracked-cta";
import { CTA_LABEL } from "@/lib/marketing";

// The pricing link only exists when there is a price (see billingEnabled).
const NAV_LINKS = [
  { href: "/#how", label: "How it works" },
  { href: "/#features", label: "Features" },
  { href: "/pricing", label: "Pricing", billingOnly: true },
];

const FOOTER_GROUPS: {
  title: string;
  links: { href: string; label: string; billingOnly?: boolean }[];
}[] = [
  {
    title: "Product",
    links: [
      { href: "/#how", label: "How it works" },
      { href: "/#features", label: "Features" },
      { href: "/pricing", label: "Pricing", billingOnly: true },
    ],
  },
  {
    title: "Account",
    links: [
      { href: "/sign-in", label: "Sign in" },
      { href: "/sign-up", label: "Create account" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/contact", label: "Contact" },
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
];

/**
 * Public shell: the same wordmark and chrome rhythm as the app, minus the
 * tabs and the auth guard. A visitor should recognize the signed-in product
 * as the same place they were just looking at.
 */
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const billing = billingEnabled();
  const navLinks = NAV_LINKS.filter((l) => billing || !l.billingOnly);
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-20 border-b bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-4xl items-center gap-4 px-4 sm:px-6">
          <Link
            href="/"
            className="shrink-0 rounded-md outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40"
          >
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              TEAS 7
            </span>
            <span className="ml-1.5 font-semibold tracking-tight">Prep</span>
          </Link>
          <nav className="hidden items-center gap-0.5 md:flex" aria-label="Site">
            {navLinks.map((link) => (
              <Button key={link.href} asChild variant="ghost" size="sm">
                <Link href={link.href}>{link.label}</Link>
              </Button>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-1">
            <Button asChild variant="ghost" size="sm">
              <Link href="/sign-in">Sign in</Link>
            </Button>
            <TrackedCta href="/sign-up" location="nav" size="sm">
              <span className="sm:hidden">Start Free</span>
              <span className="hidden sm:inline">{CTA_LABEL}</span>
            </TrackedCta>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t">
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {FOOTER_GROUPS.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  {group.title}
                </p>
                <ul className="mt-3 space-y-2">
                  {group.links
                    .filter((link) => billing || !link.billingOnly)
                    .map((link) => (
                    <li key={`${link.href}:${link.label}`}>
                      <Link
                        href={link.href}
                        className="rounded-md text-sm text-muted-foreground underline-offset-4 outline-none hover:text-foreground hover:underline focus-visible:ring-[3px] focus-visible:ring-ring/40"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
          <div className="mt-10 space-y-2 border-t pt-6 text-xs leading-relaxed text-muted-foreground">
            <p>
              TEAS 7 Prep is an independent study resource. It is not affiliated
              with or endorsed by ATI. ATI and TEAS are registered trademarks of
              Assessment Technologies Institute.
            </p>
            <p>
              Study tools improve preparation; they cannot promise outcomes. No
              particular score, and no admission to any program, is guaranteed.
            </p>
            <p>© 2026 TEAS 7 Prep. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
