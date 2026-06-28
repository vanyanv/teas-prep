import type { LessonBlock } from "@/content/lesson-types";

/** Render a lesson body: blank-line-separated blocks; "- " lines become bullets. */
function Body({ body }: { body: string }) {
  const blocks = body.trim().split(/\n\s*\n/);
  return (
    <div className="space-y-3">
      {blocks.map((block, i) => {
        const lines = block.split("\n").filter((l) => l.trim().length > 0);
        const isList = lines.length > 0 && lines.every((l) => l.trim().startsWith("- "));
        if (isList) {
          return (
            <ul key={i} className="space-y-1.5">
              {lines.map((l, j) => (
                <li key={j} className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground">
                  <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-primary/60" />
                  <span>{l.trim().slice(2)}</span>
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
            {block}
          </p>
        );
      })}
    </div>
  );
}

export function LessonContent({ sections }: { sections: LessonBlock[] }) {
  return (
    <div className="mt-8 space-y-8">
      {sections.map((s, i) => (
        <section key={i}>
          <h2 className="text-base font-semibold tracking-tight">{s.heading}</h2>
          <div className="mt-2.5">
            <Body body={s.body} />
          </div>
        </section>
      ))}
    </div>
  );
}
