import type { GuidedLesson } from "../guided-lesson-types";

/**
 * Guided lesson for ENGLISH / conventions / "Commas Separating Adjectives".
 * Content carried over from the flat skill-lesson blocks, restructured into
 * the concept / rule / example / mistake / quick check pattern. Quick checks
 * are informal and never touch mastery.
 */
export const COMMAS_SEPARATING_ADJECTIVES: GuidedLesson = {
  section: "ENGLISH",
  topic: "conventions",
  skill: "Commas Separating Adjectives",
  slug: "commas-separating-adjectives",
  title: "Commas Separating Adjectives",
  summary:
    "Use a comma between coordinate adjectives that independently describe the same noun.",
  minutes: [6, 8],
  objectives: [
    "Define what makes two adjectives coordinate",
    "Apply the swap test and the and test to a pair of adjectives",
    "Recognize when the last adjective forms a unit with the noun",
    "Place or omit the comma correctly in a sentence you are given",
  ],
  sections: [
    {
      id: "coordinate-adjectives",
      title: "Coordinate adjectives",
      blocks: [
        {
          kind: "concept",
          body: "When two or more adjectives sit in front of the same noun, they may or may not need a comma between them. It depends on whether each adjective describes the noun on its own.\n\nAdjectives that each modify the noun equally are called coordinate adjectives, and coordinate adjectives take a comma. In \"a calm, focused nurse\", the nurse is calm and the nurse is focused. Neither word leans on the other.",
        },
        {
          kind: "rule",
          title: "Two tests for coordinate adjectives",
          intro: "Either test alone is enough. If it passes, use a comma.",
          items: [
            "Swap test: reverse the adjectives. If the sentence still sounds right, they are coordinate.",
            "And test: put the word and between them. If it still sounds right, they are coordinate.",
          ],
        },
        {
          kind: "tip",
          body: "Say the sentence out loud when you run the test. Your ear catches a wrong order faster than your eye does.",
        },
      ],
      quickCheck: {
        prompt: "What makes two adjectives coordinate?",
        choices: [
          "They both come before the noun",
          "Each one modifies the noun equally, on its own",
          "They have the same number of syllables",
          "They both describe a color or a size",
        ],
        answer: 1,
        explanation:
          "Coordinate adjectives each describe the noun independently, which is why you can swap them or join them with and. Position alone does not make adjectives coordinate.",
      },
    },
    {
      id: "when-no-comma",
      title: "When to leave the comma out",
      blocks: [
        {
          kind: "concept",
          body: "Sometimes the adjectives are not equal. The one closest to the noun pairs up with it to form a single unit, and the earlier adjective describes that whole unit rather than the noun by itself.\n\nIn \"bright blue scrubs\", the scrubs are not bright and blue in the same way. They are blue scrubs, and the blue is bright. Because the adjectives are not equal, no comma belongs between them.",
        },
        {
          kind: "rule",
          title: "Leave the comma out when",
          items: [
            "The adjectives are not equal, such as when the last adjective forms a unit with the noun.",
            "Reversing the order sounds wrong, as in \"blue bright scrubs\".",
            "Inserting and changes the meaning, as in \"bright and blue scrubs\".",
          ],
        },
        {
          kind: "mistake",
          body: "Never place a comma between the final adjective and the noun. \"A calm, focused, nurse\" is wrong no matter how the adjectives relate to each other. The comma separates adjectives from each other, never an adjective from its noun.",
        },
      ],
      quickCheck: {
        prompt:
          "Why does \"bright blue scrubs\" take no comma between the adjectives?",
        choices: [
          "Because color words never take commas",
          "Because there are only two adjectives",
          "Because bright describes the unit blue scrubs rather than the scrubs on its own",
          "Because the adjectives are both short words",
        ],
        answer: 2,
        explanation:
          "Blue joins with scrubs to form a unit, and bright describes that unit. The adjectives are not equal, so no comma separates them.",
      },
    },
    {
      id: "applying-the-test",
      title: "Applying the test",
      blocks: [
        {
          kind: "concept",
          body: "The and test settles most TEAS items quickly. Insert and between the adjectives, listen to the result, then decide whether the comma stays or goes.",
        },
        {
          kind: "example",
          title: "Comma or no comma?",
          steps: [
            {
              note: "Start with the first pair and insert and between the adjectives.",
              work: [
                "\"She was a calm, focused nurse during the emergency.\"",
                "\"Calm and focused\" sounds right.",
              ],
              becomes: "Coordinate, so keep the comma",
            },
            {
              note: "Confirm with the swap test on the same pair.",
              work: ["\"A focused, calm nurse\" also sounds right."],
              becomes: "Both tests agree: comma",
            },
            {
              note: "Now the second pair. Insert and again.",
              work: [
                "\"She wore bright, blue scrubs to the clinic.\"",
                "\"Bright and blue scrubs\" changes the meaning.",
              ],
              becomes: "Not coordinate, so remove the comma",
            },
          ],
          answer:
            "\"A calm, focused nurse\" is correct; \"bright, blue scrubs\" is incorrect and should read \"bright blue scrubs\".",
        },
        {
          kind: "tip",
          body: "If the two tests disagree or you cannot hear a difference, read the sentence with the last adjective glued to the noun. If that pairing sounds like one thing, leave the comma out.",
        },
      ],
      quickCheck: {
        prompt:
          "Which sentence is punctuated correctly?",
        choices: [
          "He gave a clear, thorough, explanation of the procedure.",
          "He gave a clear, thorough explanation of the procedure.",
          "He gave a clear thorough explanation of the procedure.",
          "He gave a thorough, clear, explanation, of the procedure.",
        ],
        answer: 1,
        explanation:
          "\"Clear and thorough\" sounds right and the adjectives can be swapped, so they are coordinate and take a comma. No comma may stand between thorough and explanation.",
      },
    },
  ],
};
