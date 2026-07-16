import * as React from "react";

import { cn } from "@/lib/utils";
import { tokenize, typographize, type Token } from "@/lib/quiz/content";

/**
 * Inline rich text: renders the parser's tokens with proper math and chemistry
 * notation (stacked fractions, superscript exponents, subscript formula
 * counts, blanks) and curly typography. Everything else is plain text, so the
 * common case stays a single text node.
 */
export function RichText({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  const tokens = React.useMemo(() => tokenize(children), [children]);
  return (
    <span className={className}>
      {tokens.map((t, i) => (
        <TokenView key={i} token={t} />
      ))}
    </span>
  );
}

function TokenView({ token }: { token: Token }) {
  switch (token.kind) {
    case "text":
      return <>{typographize(token.value)}</>;
    case "frac":
      return <Frac whole={token.whole} num={token.num} den={token.den} />;
    case "sup":
      return <sup className="text-[0.7em]">{token.value}</sup>;
    case "sub":
      return <sub className="text-[0.7em]">{token.value}</sub>;
    case "blank":
      return (
        <span
          className="mx-0.5 inline-block w-16 translate-y-[-0.1em] border-b-2 border-dotted border-muted-foreground/60 align-baseline"
          aria-label="blank"
        />
      );
  }
}

/**
 * A vertically stacked fraction (with an optional whole-number part for mixed
 * numbers). Accessible: the visual stack carries an aria-label spelling it out,
 * and the stacked glyphs are hidden from the accessibility tree.
 */
function Frac({ whole, num, den }: { whole?: string; num: string; den: string }) {
  const label = `${whole ? whole + " and " : ""}${num} over ${den}`;
  return (
    <span className="inline-flex items-center gap-0.5 align-middle" aria-label={label}>
      {whole && <span aria-hidden>{whole}</span>}
      <span
        aria-hidden
        className="inline-flex flex-col items-center leading-none text-[0.82em]"
      >
        <span className="px-0.5">{num}</span>
        <span className="my-[1px] h-px w-full bg-current" />
        <span className="px-0.5">{den}</span>
      </span>
    </span>
  );
}

/**
 * Block-level content: splits text on blank lines into paragraphs, and renders
 * any lettered "A. …" list (common in converted multi-select / ordering stems)
 * as a real list so choices line up and compare cleanly. Each paragraph flows
 * through RichText.
 */
export function ContentBlocks({
  text,
  className,
  paragraphClassName,
}: {
  text: string;
  className?: string;
  paragraphClassName?: string;
}) {
  const paragraphs = text.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);

  return (
    <div className={className}>
      {paragraphs.map((para, i) => {
        const lines = para.split("\n").map((l) => l.trim()).filter(Boolean);
        const isLetterList =
          lines.length >= 2 && lines.every((l) => /^[A-F][.)]\s/.test(l));

        if (isLetterList) {
          return (
            <ul key={i} className={cn("space-y-1.5", i > 0 && "mt-3")}>
              {lines.map((line, j) => {
                const label = line.slice(0, 1);
                const body = line.replace(/^[A-F][.)]\s*/, "");
                return (
                  <li key={j} className="flex gap-2.5">
                    <span className="font-mono text-sm font-medium text-muted-foreground">
                      {label}.
                    </span>
                    <RichText className="min-w-0 flex-1">{body}</RichText>
                  </li>
                );
              })}
            </ul>
          );
        }

        return (
          <p key={i} className={cn(i > 0 && "mt-3", paragraphClassName)}>
            <RichText>{para}</RichText>
          </p>
        );
      })}
    </div>
  );
}

/**
 * A small data set rendered as a real table: mono tabular figures,
 * right-aligned numeric values, header row derived from the labels. Kept
 * horizontally scrollable so it never breaks the mobile layout.
 */
export function DataTable({
  rows,
  caption,
}: {
  rows: [string, string][];
  caption?: string;
}) {
  const numeric = rows.every(([, v]) => /^-?[\d,.]+\s*[a-zµ%°²³/]*$/.test(v));
  return (
    <figure className="my-5">
      {caption && (
        <figcaption className="mb-2 text-sm text-muted-foreground">
          <RichText>{caption}</RichText>
        </figcaption>
      )}
      <div className="overflow-x-auto rounded-xl border">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b bg-secondary/40">
              {rows.map(([label], i) => (
                <th
                  key={i}
                  scope="col"
                  className={cn(
                    "px-3 py-2 font-medium",
                    numeric ? "text-right" : "text-left",
                  )}
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {rows.map(([, value], i) => (
                <td
                  key={i}
                  className={cn(
                    "px-3 py-2 font-mono tabular-nums",
                    numeric ? "text-right" : "text-left",
                  )}
                >
                  {value}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </figure>
  );
}
