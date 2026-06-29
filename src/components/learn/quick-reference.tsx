import type { QuickReference as QuickReferenceData } from "@/content/quick-reference-types";

export function QuickReferenceCard({ data }: { data: QuickReferenceData }) {
  return (
    <section className="rounded-xl border bg-card p-5 sm:p-6">
      <h2 className="text-base font-semibold tracking-tight">{data.title}</h2>
      <div className="mt-4 grid gap-x-8 gap-y-5 sm:grid-cols-2">
        {data.groups.map((group, i) => (
          <div key={i}>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              {group.heading}
            </h3>
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
