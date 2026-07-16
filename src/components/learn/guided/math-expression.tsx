import { cn } from "@/lib/utils";
import { RichText } from "@/components/quiz/question-content";

/**
 * A mathematical expression on its own line: mono with tabular figures (the
 * app's instrument voice), stacked fractions and exponents via RichText, and
 * horizontal scrolling so a wide equation never breaks the mobile layout.
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
