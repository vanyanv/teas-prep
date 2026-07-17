import { z } from "zod";

/** The three welcome questions; every field is skippable. */
export const onboardingSchema = z.object({
  /** "YYYY-MM-DD" from a date input; empty string = not scheduled yet */
  testDate: z
    .string()
    .regex(/^(\d{4}-\d{2}-\d{2})?$/, "Enter a valid date")
    .optional(),
  studyDaysPerWeek: z.coerce
    .number()
    .int()
    .min(1, "Pick between 1 and 7 days")
    .max(7, "Pick between 1 and 7 days")
    .optional(),
  sessionMinutes: z.coerce
    .number()
    .int()
    .min(10, "Sessions run from 10 to 120 minutes")
    .max(120, "Sessions run from 10 to 120 minutes")
    .optional(),
});

export const settingsSchema = z.object({
  name: z.string().trim().min(1, "Enter your name").max(80).optional(),
  /** "YYYY-MM-DD" from a date input; empty string = not scheduled yet */
  testDate: z
    .string()
    .regex(/^(\d{4}-\d{2}-\d{2})?$/, "Enter a valid date")
    .optional(),
  targetScore: z.coerce
    .number()
    .int()
    .min(50, "Target must be at least 50")
    .max(95, "Target must be 95 or below")
    .optional(),
});

export type OnboardingInput = z.infer<typeof onboardingSchema>;
export type SettingsInput = z.infer<typeof settingsSchema>;

// ── Imported questions ────────────────────────────────────────────────
const SECTION = z.enum(["READING", "MATH", "SCIENCE", "ENGLISH"]);
const QTYPE = z.enum(["SINGLE", "MULTI", "FILL_BLANK", "ORDERED", "HOT_SPOT"]);

export const importedQuestionSchema = z
  .object({
    section: SECTION,
    topic: z.string().trim().min(1),
    subtopic: z.string().trim().optional(),
    difficulty: z.number().int().min(1).max(3).optional(),
    type: QTYPE.optional(),
    stem: z.string().trim().min(1),
    options: z.array(z.string()).default([]),
    correct: z.union([z.array(z.number().int()), z.array(z.string())]),
    explanation: z.string().trim().optional(),
  })
  .refine(
    (q) => (q.type === "FILL_BLANK" ? true : q.options.length >= 2),
    { message: "Multiple-choice questions need at least 2 options", path: ["options"] },
  )
  .refine((q) => q.correct.length > 0, {
    message: "correct must not be empty",
    path: ["correct"],
  });

export const importPayloadSchema = z.array(importedQuestionSchema).min(1).max(1000);

export type ImportedQuestion = z.infer<typeof importedQuestionSchema>;
