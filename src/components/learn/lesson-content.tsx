import { RichText } from "@/components/quiz/question-content";
import { Kicker } from "@/components/ui/page";
import type { LessonBlock } from "@/content/lesson-types";

/** "ADD/SUBTRACT DECIMALS: line up the points" -> label + the rest. */
const LABELLED = /^([A-Z][A-Z0-9 /&'-]{2,40}):\s*(.*)$/;

/**
 * One blank-line-separated block. The topic lessons are written as an optional
 * shouty label, a lead sentence, then "- " lines beneath it, so a block is
 * split at its first bullet rather than required to be all-bullets or none:
 * the earlier all-or-nothing test printed mixed blocks with their "- Example:"
 * prefixes showing.
 */
function Block({ body }: { body: string }) {
  const lines = body.split("\n").filter((l) => l.trim().length > 0);
  const lead: string[] = [];
  const bullets: string[] = [];
  for (const line of lines) {
    if (line.trim().startsWith("- ")) bullets.push(line.trim().slice(2));
    else if (bullets.length === 0) lead.push(line.trim());
    // A stray non-bullet after bullets belongs to the last bullet.
    else bullets[bullets.length - 1] += ` ${line.trim()}`;
  }

  const first = lead[0] ?? "";
  const match = LABELLED.exec(first);
  const label = match?.[1] ?? null;
  // The source reads "ADD/SUBTRACT DECIMALS: line up the points" as one
  // sentence. Lifting the label out leaves the remainder starting lowercase,
  // so restore the capital rather than print a sentence that starts mid-word.
  const unlabelled = match
    ? match[2].charAt(0).toUpperCase() + match[2].slice(1)
    : null;
  const rest = unlabelled != null ? [unlabelled, ...lead.slice(1)].filter(Boolean) : lead;

  return (
    <div className="space-y-2">
      {label && (
        <Kicker className="text-[11px]">{label}</Kicker>
      )}
      {rest.map((p, i) => (
        <p key={i} className="text-[15px] leading-relaxed">
          <RichText>{p}</RichText>
        </p>
      ))}
      {bullets.length > 0 && (
        <ul className="space-y-1.5 pt-0.5">
          {bullets.map((b, i) => (
            <li
              key={i}
              className="flex items-start gap-2.5 text-[15px] leading-relaxed text-muted-foreground"
            >
              <span
                className="mt-[9px] size-1.5 shrink-0 rounded-full bg-primary/60"
                aria-hidden
              />
              <span className="min-w-0">
                <RichText>{b}</RichText>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function LessonContent({ sections }: { sections: LessonBlock[] }) {
  return (
    <div className="mt-8 space-y-10">
      {sections.map((s, i) => (
        <section key={i}>
          <h2 className="text-base font-semibold tracking-tight">{s.heading}</h2>
          <div className="mt-3 space-y-4">
            {s.body
              .trim()
              .split(/\n\s*\n/)
              .map((block, j) => (
                <Block key={j} body={block} />
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}
