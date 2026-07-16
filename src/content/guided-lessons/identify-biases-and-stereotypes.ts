import type { GuidedLesson } from "../guided-lesson-types";

/** Guided lesson for READING / craft-structure / "Identify Biases and
 *  Stereotypes". Content carried over from the flat skill-lesson blocks,
 *  restructured into the concept / rule / example / mistake / quick check
 *  pattern. */
export const IDENTIFY_BIASES_AND_STEREOTYPES: GuidedLesson = {
  section: "READING",
  topic: "craft-structure",
  skill: "Identify Biases and Stereotypes",
  slug: "identify-biases-and-stereotypes",
  title: "Biases and Stereotypes",
  summary:
    "Bias is a one-sided slant toward or against something, and a stereotype is an unfair fixed idea about a whole group.",
  minutes: [5, 7],
  objectives: [
    "Define bias and stereotype and tell the two apart",
    "Recognize how TEAS questions test bias and stereotypes",
    "Evaluate a claim for a one-sided slant or an unfair group trait",
    "Spot sweeping words like all, always, and never that flag unbalanced claims",
  ],
  sections: [
    {
      id: "bias-vs-stereotype",
      title: "Bias vs. stereotype",
      blocks: [
        {
          kind: "concept",
          body: "Bias is when an author favors one side and ignores or downplays the other. A stereotype assumes every member of a group shares the same trait, which is rarely true.\n\nThe two flaws are related but not identical. Bias is about which side of an issue the writing leans toward; a stereotype is about painting a whole group of people with one brush.",
        },
        {
          kind: "rule",
          title: "The two flaws",
          items: [
            "Bias: the author favors one side and ignores or downplays the other",
            "Stereotype: a claim assigns one trait to every member of a group",
          ],
        },
        {
          kind: "mistake",
          body: "Do not label every opinion as bias. An author can state a preference and still treat both sides fairly; bias shows up when the other side is ignored or downplayed.",
        },
      ],
      quickCheck: {
        prompt: "Which statement relies on a stereotype?",
        choices: [
          "This phone's battery lasted twelve hours in testing",
          "All teenagers ignore anything an adult tells them",
          "I prefer texting to phone calls",
          "Many students bring phones to class",
        ],
        answer: 1,
        explanation:
          "It assigns one trait to every member of a group. A tested fact, a personal preference, and a qualified claim like many students do not make that sweeping group assumption.",
      },
    },
    {
      id: "on-the-teas",
      title: "How the TEAS tests it",
      blocks: [
        {
          kind: "concept",
          body: "Questions ask you to spot a biased statement, name the author's slant, or identify a sentence that relies on a stereotype rather than evidence.",
        },
        {
          kind: "rule",
          title: "Common question forms",
          items: [
            "Spot the biased statement among the answer choices",
            "Name the author's slant: which side the passage favors",
            "Identify the sentence that rests on a stereotype instead of evidence",
          ],
        },
        {
          kind: "example",
          title: "Test two claims",
          steps: [
            {
              note: "Ask whether this claim favors one explanation and shuts out every other.",
              work: ["Only careless drivers ever get into accidents on this road."],
            },
            {
              note: "It blames carelessness alone and dismisses any other cause, so it is biased.",
              work: [],
            },
            {
              note: "Now ask whether this claim assigns one trait to an entire group.",
              work: ["Older patients can never learn to use new technology."],
            },
            {
              note: "It treats every older patient as identical, so it is a stereotype.",
              work: [],
            },
          ],
          answer: "The first claim is biased; the second relies on a stereotype.",
        },
      ],
      quickCheck: {
        prompt:
          "A passage says a new clinic finally brings real care to a town stuck with outdated doctors. What is the author's slant?",
        choices: [
          "The author favors the new clinic",
          "The author favors the established doctors",
          "The author is neutral about both",
          "The author's slant cannot be identified",
        ],
        answer: 0,
        explanation:
          "Words like finally, real care, and outdated praise the clinic while dismissing the existing doctors, so the passage leans toward the new clinic.",
      },
    },
    {
      id: "sweeping-words",
      title: "Sweeping words",
      blocks: [
        {
          kind: "concept",
          body: "Absolute language claims something about every case with no exceptions. Since a single exception breaks such a claim, sweeping words are a fast signal that a statement may be a stereotype or an unbalanced claim.",
        },
        {
          kind: "rule",
          title: "Watch for these words",
          items: ["all", "none", "always", "never", "every"],
        },
        {
          kind: "tip",
          body: "When you see a sweeping word, pause and ask whether the claim rests on evidence or on an assumption about a whole group. These words often signal a stereotype or an unbalanced claim.",
        },
        {
          kind: "mistake",
          body: "Qualified claims that use words like many, some, or often are not stereotypes. It is the leap to all or never, without evidence, that makes a generalization unfair.",
        },
      ],
      quickCheck: {
        prompt:
          "Which word in the sentence Nurses always know the right answer immediately signals a possible stereotype?",
        choices: ["Nurses", "always", "right", "immediately"],
        answer: 1,
        explanation:
          "Always claims the trait holds in every case for every nurse, the sweeping language that marks a stereotype or unbalanced claim.",
      },
    },
  ],
};
