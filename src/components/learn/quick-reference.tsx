import type { QuickReference as QuickReferenceData } from "@/content/quick-reference-types";

import { Kicker } from "@/components/ui/page";

export function QuickReferenceCard({ data }: { data: QuickReferenceData }) {
  return (
    <section className="rounded-xl border bg-card p-5 sm:p-6">
      <h2 className="text-base font-semibold tracking-tight">{data.title}</h2>
      <div className="mt-4 grid gap-x-8 gap-y-5 sm:grid-cols-2">
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
    </section>
  );
}
