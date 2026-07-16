import type { GuidedLesson } from "../guided-lesson-types";

/** Guided lesson for READING / key-ideas-details / "Infer Logical Conclusions
 *  From a Text". Content carried over from the flat skill-lesson blocks,
 *  restructured into the concept / rule / example / mistake / quick check
 *  pattern. */
export const INFER_LOGICAL_CONCLUSIONS: GuidedLesson = {
  section: "READING",
  topic: "key-ideas-details",
  skill: "Infer Logical Conclusions From a Text",
  slug: "infer-logical-conclusions-from-a-text",
  title: "Inferring Logical Conclusions",
  summary:
    "Draw a conclusion the text strongly implies but does not state outright, using only the given evidence.",
  minutes: [6, 8],
  objectives: [
    "Distinguish an evidence-based inference from a guess",
    "Recognize TEAS question stems that ask for an inference",
    "Support a conclusion by pointing to specific lines in the passage",
    "Eliminate answer choices that overreach or contradict the text",
  ],
  sections: [
    {
      id: "what-an-inference-is",
      title: "What an inference is",
      blocks: [
        {
          kind: "concept",
          body: "An inference is a reasonable, evidence-based conclusion that goes one small step beyond what is written. The author never states it directly, but the details in the passage point to it so clearly that a careful reader arrives at it anyway.",
        },
        {
          kind: "rule",
          title: "A valid inference",
          items: [
            "Rests on clues that are actually in the passage",
            "Moves only one small step beyond the stated words",
            "Holds up without your outside knowledge or personal guesses",
          ],
        },
        {
          kind: "mistake",
          body: "Do not treat what you already believe about a topic as evidence. An inference must be supported by the passage itself, not by your background knowledge or a hunch about what is probably true.",
        },
      ],
      quickCheck: {
        prompt: "A valid inference must be supported by what?",
        choices: [
          "Clues stated in the passage",
          "The reader's background knowledge",
          "What the author probably believes",
          "The most interesting possible conclusion",
        ],
        answer: 0,
        explanation:
          "An inference goes one small step beyond the text, but its support must come from the passage itself, not from outside knowledge or guesses.",
      },
    },
    {
      id: "how-the-teas-asks",
      title: "How the TEAS asks it",
      blocks: [
        {
          kind: "concept",
          body: "Inference questions announce themselves with a small set of stems. When you see one, you know the answer will not be quoted directly in the passage; it will be the conclusion the clues support.",
        },
        {
          kind: "rule",
          title: "Common inference stems",
          items: [
            "\"It can be concluded that...\"",
            "\"The passage suggests...\"",
            "\"The reader can infer...\"",
          ],
        },
        {
          kind: "concept",
          body: "The right answer is supported by clues in the text. Wrong answers usually fail in one of two ways: they overreach, claiming more than the clues justify, or they contradict something the passage says.",
        },
        {
          kind: "tip",
          body: "Test each choice with the question \"Can I point to a line that backs this up?\" If you cannot, it is a guess, not an inference. Stay close to the text.",
        },
      ],
      quickCheck: {
        prompt:
          "An answer choice sounds plausible, but you cannot point to any line in the passage that supports it. What should you do?",
        choices: [
          "Pick it if it matches your own experience",
          "Pick it if it sounds like something the author would agree with",
          "Eliminate it, because an inference needs support in the text",
          "Pick it, because inferences are never stated in the passage",
        ],
        answer: 2,
        explanation:
          "A choice with no supporting line is a guess, not an inference. The correct answer is unstated but still backed by specific clues in the text.",
      },
    },
    {
      id: "worked-example",
      title: "A worked example",
      blocks: [
        {
          kind: "concept",
          body: "Work an inference in three moves: gather the clues the text gives you, take one small step to the conclusion they support, and reject any conclusion the text never indicates.",
        },
        {
          kind: "example",
          title: "What can you infer about Maria?",
          steps: [
            {
              note: "Read the evidence the sentence gives you.",
              work: [
                "\"By the third night shift, Maria set two alarms and still struggled to wake on time.\"",
              ],
            },
            {
              note: "Take one small step: two alarms and still struggling to wake both point to exhaustion.",
              work: ["Valid inference: Maria was very tired from the schedule."],
            },
            {
              note: "Reject conclusions the text never supports.",
              work: [
                "Not valid: Maria dislikes her job. No line indicates her feelings about the job.",
              ],
            },
          ],
          answer: "Maria was very tired from the schedule.",
        },
        {
          kind: "mistake",
          body: "Overreaching is the classic trap. \"Maria dislikes her job\" might feel plausible, but the sentence only describes her struggle to wake up; it says nothing about how she feels about the work itself.",
        },
      ],
      quickCheck: {
        prompt:
          "In the Maria example, why is \"Maria dislikes her job\" not a valid inference?",
        choices: [
          "It is too short to be an inference",
          "The text never indicates her feelings about the job",
          "The text states the opposite directly",
          "Inferences cannot be about people's feelings",
        ],
        answer: 1,
        explanation:
          "The sentence only shows that Maria struggled to wake up. A conclusion about disliking her job goes beyond what any line in the text supports.",
      },
    },
  ],
};
