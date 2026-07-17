import type { FaqItem } from "@/lib/marketing";

/**
 * Stacked question and answer pairs. No accordion: nine short answers read
 * faster than nine clicks, and hiding answers signals having something to
 * hide.
 */
export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <dl className="space-y-7">
      {items.map((item) => (
        <div key={item.q}>
          <dt className="text-base font-semibold tracking-tight">{item.q}</dt>
          <dd className="mt-1.5 max-w-prose text-[15px] leading-relaxed text-muted-foreground">
            {item.a}
          </dd>
        </div>
      ))}
    </dl>
  );
}
