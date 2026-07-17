import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

const WIDTH = {
  /** Reading surfaces: session, questions, results, lessons. */
  narrow: "max-w-2xl",
  /** Most pages, including Today. */
  default: "max-w-3xl",
  /** Reserved for genuinely multi-column pages. */
  wide: "max-w-4xl",
} as const;

/** Standard page shell: one width scale, one padding rhythm. */
function PageContainer({
  width = "default",
  className,
  ...props
}: React.ComponentProps<"div"> & { width?: keyof typeof WIDTH }) {
  return (
    <div
      data-slot="page-container"
      className={cn(
        "mx-auto w-full px-4 py-8 sm:px-6 sm:py-12",
        WIDTH[width],
        className,
      )}
      {...props}
    />
  );
}

/**
 * The app's label voice: mono, uppercase, tracked. 0.18em is the single
 * tracking value; `text-[11px]` via className is the one sanctioned compact
 * size for labels inside cards and panels. Use `asChild` to keep the voice on
 * a semantic element (e.g. an `h3`).
 */
function Kicker({
  asChild = false,
  className,
  ...props
}: React.ComponentProps<"p"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "p";
  return (
    <Comp
      data-slot="kicker"
      className={cn(
        "font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

/** Page opener in the coach's voice: kicker, interpretation title, optional subline. */
function PageHeader({
  kicker,
  title,
  sub,
  aside,
  className,
}: {
  kicker?: React.ReactNode;
  title: React.ReactNode;
  sub?: React.ReactNode;
  /** Right-aligned slot, e.g. the exam countdown. */
  aside?: React.ReactNode;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "flex flex-col-reverse gap-4 sm:flex-row sm:items-start sm:justify-between",
        className,
      )}
    >
      <div className="min-w-0">
        {kicker != null && <Kicker>{kicker}</Kicker>}
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
          {title}
        </h1>
        {sub != null && (
          <p className="mt-3 max-w-prose text-sm text-muted-foreground">{sub}</p>
        )}
      </div>
      {aside != null && <div className="flex shrink-0 sm:justify-end">{aside}</div>}
    </header>
  );
}

export { PageContainer, PageHeader, Kicker };
