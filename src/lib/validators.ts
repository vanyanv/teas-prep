import { z } from "zod";

export const credentialsSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const signupSchema = credentialsSchema.extend({
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

export type CredentialsInput = z.infer<typeof credentialsSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
/** Raw form values before zod coercion (e.g. targetScore as a string from a <select>) */
export type SignupFormValues = z.input<typeof signupSchema>;

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
