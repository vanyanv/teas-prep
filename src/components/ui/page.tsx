import * as React from "react";

import { cn } from "@/lib/utils";

const WIDTH = {
  /** Reading surfaces: session, questions, results, lessons. */
  narrow: "max-w-2xl",
  /** Most pages. */
  default: "max-w-3xl",
  /** Today dashboard only. */
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

/** The app's label voice: mono, uppercase, tracked. */
function Kicker({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
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
