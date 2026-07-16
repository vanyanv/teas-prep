import type { GuidedLesson } from "../guided-lesson-types";

/** Guided lesson for READING / integration-knowledge / "Use Evidence From the
 *  Text to Make Predictions, Inferences, and Draw Conclusions". Content
 *  carried over from the flat skill-lesson blocks, restructured into the
 *  concept / rule / example / mistake / quick check pattern. */
export const EVIDENCE_PREDICTIONS_INFERENCES_CONCLUSIONS: GuidedLesson = {
  section: "READING",
  topic: "integration-knowledge",
  skill:
    "Use Evidence From the Text to Make Predictions, Inferences, and Draw Conclusions",
  slug: "use-evidence-from-the-text-to-make-predictions-inferences-and-draw-conclusions",
  title: "Predictions, Inferences, and Conclusions",
  summary:
    "Combine stated clues in a passage with reasoning to figure out what is implied or likely to happen next.",
  minutes: [6, 8],
  objectives: [
    "Distinguish inferences and predictions from directly stated information",
    "Base conclusions on textual evidence rather than personal opinion",
    "Recognize question stems that signal inference and prediction items",
    "Eliminate choices that add to, overstate, or contradict the evidence",
    "Verify an answer by pointing to the sentence that supports it",
  ],
  sections: [
    {
      id: "what-it-is",
      title: "Inference, prediction, conclusion",
      blocks: [
        {
          kind: "concept",
          body: "Some questions ask about ideas a passage never states in so many words. An inference is a logical conclusion the text supports but does not say outright. A prediction is a reasonable guess about what comes next. Both must rest on actual textual evidence, not personal opinion.",
        },
        {
          kind: "rule",
          title: "Keep the terms straight",
          items: [
            "Inference: a conclusion the text supports but never states directly",
            "Prediction: a reasonable guess about what will happen next, built from the clues so far",
            "Both rest on evidence in the passage, never on opinion or outside knowledge",
          ],
        },
        {
          kind: "example",
          title: "An inference the text supports",
          steps: [
            {
              note: "A passage gives two concrete details about a nurse.",
              work: [
                "\"double-checked the medication chart twice\"",
                "\"asked a coworker to confirm the dose\"",
              ],
            },
            {
              note: "Both details show extra verification, so the text supports a conclusion it never states.",
              work: ["The nurse is careful about patient safety"],
            },
          ],
          answer:
            "You can infer the nurse is careful, even though the text never uses the word 'careful.'",
        },
        {
          kind: "mistake",
          body: "Treating a personal reaction as an inference. What you would do, or what usually happens in real life, is not evidence; only details in the passage count.",
        },
      ],
      quickCheck: {
        prompt:
          "A passage describes a student yawning through class and falling asleep at her desk, but never says how she feels. Concluding that she is exhausted is:",
        choices: [
          "An inference supported by the text",
          "A prediction about what comes next",
          "A personal opinion",
          "A detail stated directly in the passage",
        ],
        answer: 0,
        explanation:
          "The passage never states she is exhausted, but the yawning and sleeping are textual evidence that supports that conclusion. That is exactly what an inference is.",
      },
    },
    {
      id: "how-teas-tests-it",
      title: "How the TEAS tests it",
      blocks: [
        {
          kind: "concept",
          body: "Questions use phrasing like 'the passage suggests,' 'the reader can conclude,' or 'what will most likely happen.' The correct answer stays close to the clues given; it is the modest conclusion the details actually support.",
        },
        {
          kind: "rule",
          title: "How wrong choices fail",
          items: [
            "They add information not in the text",
            "They overstate the evidence, going further than the clues allow",
            "They contradict the evidence outright",
          ],
        },
        {
          kind: "example",
          title: "Staying close to the clues",
          steps: [
            {
              note: "A passage states that Maria reread a job posting, updated her resume, and asked her manager for a reference. The question asks what she will most likely do next.",
              work: [],
            },
            {
              note: "Test each choice against the clues.",
              work: [
                "'Apply for the job' stays close to the evidence",
                "'Get the job' overstates what the clues support",
                "'Quit without giving notice' contradicts asking her manager for a reference",
              ],
            },
          ],
          answer:
            "'Apply for the job' is correct because it follows directly from the clues without going beyond them.",
        },
        {
          kind: "tip",
          body: "When two choices both seem possible, pick the more modest one. The correct answer never claims more than the evidence can carry.",
        },
      ],
      quickCheck: {
        prompt:
          "On a 'the passage suggests' question, which pattern most often marks a wrong answer choice?",
        choices: [
          "It stays close to the clues in the passage",
          "It adds information the passage never gives",
          "It draws a modest conclusion from stated details",
          "It restates evidence found in the text",
        ],
        answer: 1,
        explanation:
          "Wrong choices typically add information not in the text, or overstate or contradict the evidence. The correct answer stays close to the clues given.",
      },
    },
    {
      id: "point-to-the-evidence",
      title: "Point to the evidence",
      blocks: [
        {
          kind: "concept",
          body: "The reliable way to check an inference or prediction is to demand proof from the passage itself. An answer that merely sounds reasonable, or matches your own experience, has not earned your pick.",
        },
        {
          kind: "tip",
          body: "Before picking an answer, point to the exact sentence that backs it up. If you cannot, the choice is probably a trap.",
        },
        {
          kind: "example",
          title: "Run the evidence test",
          steps: [
            {
              note: "A passage reads: 'The patient asked the nurse three separate questions about the recovery timeline.'",
              work: [],
            },
            {
              note: "Test a tempting choice: 'The patient is afraid of surgery.' No sentence mentions fear or surgery, so nothing backs it up.",
              work: [],
            },
            {
              note: "Test a modest choice: 'The patient wants a clearer picture of recovery.' The questioning sentence supports it directly.",
              work: [],
            },
          ],
          answer:
            "'The patient wants a clearer picture of recovery' passes the test; the other choice has no sentence behind it.",
        },
        {
          kind: "mistake",
          body: "Choosing an answer because it feels true in general. Plausible is not the same as supported; the sentence that proves it must be on the page.",
        },
      ],
      quickCheck: {
        prompt:
          "Before selecting an answer to an inference question, what should you be able to do?",
        choices: [
          "Recall a personal experience that matches the answer",
          "Point to the exact sentence that backs it up",
          "Find the answer stated word for word in the passage",
          "Confirm the answer sounds reasonable on its own",
        ],
        answer: 1,
        explanation:
          "If you cannot point to the sentence that supports a choice, it is probably a trap. An inference is not stated word for word, but it still needs specific evidence behind it.",
      },
    },
  ],
};
