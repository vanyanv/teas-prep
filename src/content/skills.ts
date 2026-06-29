import type { Section } from "@/lib/teas-blueprint";

/**
 * Authoritative per-skill taxonomy for the ATI TEAS 7, transcribed from the
 * NurseHub Free TEAS 7 Practice Test score sheets (the lesson titles in their
 * Reading / Math / Science / ELU courses). Grouped under the blueprint topic
 * keys this app uses. This drives study-by-topic coverage and is the checklist
 * the seed question bank is authored against, so every tested skill has drills.
 */
export interface TopicSkills {
  section: Section;
  /** blueprint topic key (matches teas-blueprint.ts) */
  topic: string;
  skills: string[];
}

/** URL-safe slug for a skill name (used for /learn/[section]/[topic]/[skill]). */
export function slugifySkill(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Skill names for a section + blueprint topic. */
export function getSkills(section: string, topic: string): string[] {
  return SKILLS.find((s) => s.section === section && s.topic === topic)?.skills ?? [];
}

/** Resolve a skill slug back to its full skill name within a topic. */
export function findSkillBySlug(
  section: string,
  topic: string,
  slug: string,
): string | undefined {
  return getSkills(section, topic).find((name) => slugifySkill(name) === slug);
}

export const SKILLS: TopicSkills[] = [
  // ─────────────────────────── READING ───────────────────────────
  {
    section: "READING",
    topic: "key-ideas-details",
    skills: [
      "Identify the Topic, Main Idea, and Supporting Details",
      "Summarize a Multi-Paragraph Text",
      "Infer Logical Conclusions From a Text",
      "Demonstrate Comprehension of Written Directions",
      "Locate Specific Information in a Text",
      "Identify Information From a Printed Communication",
      "Identify Information From a Graphic",
      "Interpret Events in a Sequence",
    ],
  },
  {
    section: "READING",
    topic: "craft-structure",
    skills: [
      "Distinguish Between Fact and Opinion",
      "Identify Biases and Stereotypes",
      "Interpret the Meaning of Words and Phrases Using Context",
      "Use Dictionary and Library Entries",
      "Evaluate the Author's Purpose in a Given Text",
      "Recognize Text Structure",
      "Analyze Types of Writing",
      "Evaluate the Author's Point of View or Perspective in a Given Text",
    ],
  },
  {
    section: "READING",
    topic: "integration-knowledge",
    skills: [
      "Use Evidence From the Text to Make Predictions, Inferences, and Draw Conclusions",
      "Compare and Contrast the Themes Expressed in One or More Texts",
      "Evaluate an Argument",
      "Identify Primary Sources",
      "Evaluate and Integrate Data From Multiple Sources Across Various Formats",
    ],
  },

  // ──────────────────────────── MATH ─────────────────────────────
  {
    section: "MATH",
    topic: "numbers-algebra",
    skills: [
      "Perform Arithmetic Operations with Rational Numbers (Whole Numbers, Decimals, & Fractions)",
      "Convert Among Decimals, Fractions & Percents",
      "Solve Real World Problems Involving Percents",
      "Compare & Order Rational Numbers",
      "Solve Equations in One Variable",
      "Apply Estimation Strategies and Rounding Rules to Real World Problems",
      "Solve Real World Problems Involving Proportions, Ratios, and Rates of Change",
      "Translate Phrases and Sentences into Expressions, Equations, and Inequalities",
    ],
  },
  {
    section: "MATH",
    topic: "measurement-data",
    skills: [
      "Interpret Relevant Information from Tables, Charts, and Graphs",
      "Evaluate Information in Tables, Charts, and Graphs Using Statistics",
      "Explain the Relationship Between Variables",
      "Calculate Geometric Quantities",
      "Convert Within and Between Standard and Metric Units",
    ],
  },

  // ─────────────────────────── SCIENCE ───────────────────────────
  {
    section: "SCIENCE",
    topic: "anatomy-physiology",
    skills: [
      "Demonstrate Knowledge of the General Orientation of Human Anatomy",
      "Respiratory System",
      "Cardiovascular System",
      "Gastrointestinal System",
      "Neuromuscular System",
      "Reproductive System",
      "Integumentary System",
      "Endocrine System",
      "Genitourinary System",
      "Immune System",
      "Skeletal System",
    ],
  },
  {
    section: "SCIENCE",
    topic: "biology",
    skills: [
      "Describe Cell Structure, Function, and Organization",
      "Describe the Relationship Between Genetic Material and Protein Structure",
      "Apply Concepts Underlying Mendel's Laws of Inheritance",
      "Describe the Structure and Function of the Basic Macromolecules in a Biological System",
      "Describe the Role of Microorganisms in Disease",
    ],
  },
  {
    section: "SCIENCE",
    topic: "chemistry",
    skills: [
      "Recognize Basic Atomic Structure",
      "Explain Physical Properties and Changes of Matter",
      "Describe Chemical Reactions",
      "Understand Properties of Solutions",
    ],
  },
  {
    section: "SCIENCE",
    topic: "scientific-reasoning",
    skills: [
      "Use Basic Scientific Measurements and Measurement Tools",
      "Apply Logic and Evidence to Scientific Explanations",
      "Predict Relationships Among Events, Objects, and Processes",
      "Apply the Scientific Method to Interpret a Scientific Investigation",
    ],
  },

  // ─────────────────────────── ENGLISH ───────────────────────────
  {
    section: "ENGLISH",
    topic: "conventions",
    skills: [
      "Identifying Correct Spelling",
      "Correct Use of End Punctuation",
      "Using Commas with Introductory Words",
      "Using Commas to Join Clauses Together",
      "Using Commas with Nonessential Clauses",
      "Commas Separating Adjectives",
      "Using Commas in a Series",
      "Correctly Punctuating Quotations",
      "Correct Use of Colons",
      "Correct Use of Parentheses",
      "Using Hyphens",
      "Types of Sentences",
      "Identifying Correct Sentence Structure",
      "Subject-Verb Agreement",
      "Misplaced and Dangling Modifiers",
    ],
  },
  {
    section: "ENGLISH",
    topic: "knowledge-language",
    skills: [
      "Identifying Genre",
      "Matching Sentences to Types of Writing",
      "Identifying Intended Audience",
      "Identifying Appropriate Language for Intended Audience/Tone",
      "Stages of the Writing Process",
      "Parts of a Paragraph",
      "Identifying Unrelated Sentences",
      "Using Grammar to Enhance Clarity in Writing",
    ],
  },
  {
    section: "ENGLISH",
    topic: "vocabulary",
    skills: [
      "Using Prefixes to Determine Word Meaning",
      "Using Suffixes to Determine Word Meaning",
      "Using Common Root Words to Determine Word Meaning",
      "Use Context Clues to Determine Word Meaning",
    ],
  },
];
