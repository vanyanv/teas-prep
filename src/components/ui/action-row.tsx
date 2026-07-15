import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

/**
 * The interactive bordered row used for secondary actions and deep links.
 * Use `asChild` to render as a `Link`/`a`/`button` while keeping the styling.
 */
function ActionRow({
  asChild = false,
  className,
  ...props
}: React.ComponentProps<"div"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "div";
  return (
    <Comp
      data-slot="action-row"
      className={cn(
        "flex items-center gap-3 rounded-xl border bg-card p-3.5 outline-none transition-colors",
        "hover:bg-secondary/40 focus-visible:ring-[3px] focus-visible:ring-ring/40",
        className,
      )}
      {...props}
    />
  );
}

export { ActionRow };
