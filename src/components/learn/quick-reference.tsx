import { ChevronDown } from "lucide-react";

import type { QuickReference as QuickReferenceData } from "@/content/quick-reference-types";

import { Kicker } from "@/components/ui/page";

/**
 * Collapsed by default: the cram sheet is reference material, and expanded it
 * pushed the section's skill list (the primary content) far below the fold.
 */
export function QuickReferenceCard({ data }: { data: QuickReferenceData }) {
  return (
    <details className="group rounded-xl border bg-card">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-xl p-5 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40 sm:p-6 [&::-webkit-details-marker]:hidden">
        <span>
          <span className="block text-base font-semibold tracking-tight">
            {data.title}
          </span>
          <span className="mt-0.5 block text-sm text-muted-foreground">
            {data.groups.length} topics of test-day rules and signal words.
          </span>
        </span>
        <ChevronDown
          className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180"
          aria-hidden
        />
      </summary>
      <div className="grid gap-x-8 gap-y-5 border-t p-5 sm:grid-cols-2 sm:p-6">
        {data.groups.map((group, i) => (
          <div key={i}>
            <Kicker asChild className="text-[11px]">
              <h3>{group.heading}</h3>
            </Kicker>
            <ul className="mt-2 space-y-1">
              {group.items.map((item, j) => (
                <li key={j} className="text-sm leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </details>
  );
}
