import { z } from "zod";

/**
 * Optional structured rationale authored per question (Question.rationale).
 * Every field is optional: the renderer shows what exists and falls back to
 * the flat explanation string for the rest, so content can be enriched
 * progressively without touching all 836 items.
 */
export const structuredRationaleSchema = z.object({
  /** one-sentence key takeaway */
  takeaway: z.string().trim().min(1).optional(),
  /** step-by-step reasoning toward the correct answer */
  steps: z.array(z.string().trim().min(1)).min(1).optional(),
  /** why the correct answer works */
  whyCorrect: z.string().trim().min(1).optional(),
  /** why each distractor fails, keyed by option index as a string ("0", "2") */
  distractors: z.record(z.string().regex(/^\d+$/), z.string().trim().min(1)).optional(),
  /** the common mistake or test-taking clue */
  commonMistake: z.string().trim().min(1).optional(),
});

export type StructuredRationale = z.infer<typeof structuredRationaleSchema>;

/** Parse an unknown JSON payload; null when absent or malformed. */
export function parseRationale(json: unknown): StructuredRationale | null {
  if (json == null) return null;
  const parsed = structuredRationaleSchema.safeParse(json);
  if (!parsed.success) return null;
  const value = parsed.data;
  return Object.keys(value).length > 0 ? value : null;
}

/**
 * Presentation fallback for flat explanation strings: the first sentence is
 * the takeaway, the rest is the supporting body.
 */
export function splitExplanation(text: string | null): {
  takeaway: string | null;
  body: string | null;
} {
  if (!text) return { takeaway: null, body: null };
  const m = text.match(/^(.*?[.!?])\s+([\s\S]+)$/);
  return m ? { takeaway: m[1], body: m[2] } : { takeaway: text, body: null };
}
