import { cn } from "@/lib/utils";
import { RichText } from "@/components/quiz/question-content";

/**
 * A worked-example line is only an instrument when it is actually arithmetic.
 * Non-math skills (anatomy, reading, grammar) carry verbal reasoning in the
 * same slot, and mono + nowrap turns those into an unreadable scroll strip.
 * Treat a line as math when it is short and built from digits and operators
 * rather than words.
 */
function looksLikeMath(s: string): boolean {
  const text = s.trim();
  if (!text || text.length > 80) return false;
  const hasOperator = /[=+×÷<>≤≥−^→]|\d\s*\/\s*\d/.test(text);
  const digits = (text.match(/\d/g) ?? []).length;
  if (!hasOperator && digits === 0) return false;
  // A few words are fine ("x = 5 apples"); a sentence is not.
  const words = text.split(/\s+/).filter((w) => /^[A-Za-z][A-Za-z'-]*$/.test(w));
  return words.length <= 3;
}

/**
 * A line of a worked example: for arithmetic, mono with tabular figures (the
 * app's instrument voice), stacked fractions and exponents via RichText, and
 * horizontal scrolling so a wide equation never breaks the mobile layout. For
 * verbal reasoning, ordinary wrapped prose.
 */
export function MathExpression({
  children,
  size = "md",
  className,
}: {
  children: string;
  size?: "md" | "lg";
  className?: string;
}) {
  if (!looksLikeMath(children)) {
    return (
      <p
        className={cn(
          "leading-relaxed",
          size === "lg" ? "text-lg font-medium sm:text-xl" : "text-[15px]",
          className,
        )}
      >
        <RichText>{children}</RichText>
      </p>
    );
  }

  return (
    <div className={cn("overflow-x-auto", className)}>
      <p
        className={cn(
          "w-max min-w-full whitespace-nowrap font-mono tabular-nums",
          size === "lg" ? "text-lg sm:text-xl" : "text-[15px]",
        )}
      >
        <RichText>{children}</RichText>
      </p>
    </div>
  );
}
