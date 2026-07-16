import type { GuidedLesson } from "../guided-lesson-types";

/** Guided lesson for READING / craft-structure / "Recognize Text Structure".
 *  Content carried over from the flat skill-lesson blocks, restructured into
 *  the concept / rule / example / mistake / quick check pattern. */
export const RECOGNIZE_TEXT_STRUCTURE: GuidedLesson = {
  section: "READING",
  topic: "craft-structure",
  skill: "Recognize Text Structure",
  slug: "recognize-text-structure",
  title: "Text Structure",
  summary:
    "Text structure is the pattern an author uses to organize ideas, such as sequence, cause and effect, compare and contrast, or problem and solution.",
  minutes: [6, 8],
  objectives: [
    "Name the five common text structures",
    "Use signal words to identify a paragraph's structure",
    "Distinguish cause and effect from compare and contrast",
    "Use a passage's structure to locate details like what happened next",
  ],
  sections: [
    {
      id: "common-patterns",
      title: "The common patterns",
      blocks: [
        {
          kind: "concept",
          body: "Authors arrange information in predictable patterns. Once you recognize the pattern, you know where to look for each idea, because the structure tells you how the pieces relate.",
        },
        {
          kind: "rule",
          title: "Five common structures",
          items: [
            "Chronological or sequence: events or steps presented in time order",
            "Cause and effect: one event or condition produces another",
            "Compare and contrast: how two things are alike and different",
            "Problem and solution: an issue is raised, then a way to address it",
            "Description: the features or characteristics of one topic",
          ],
        },
        {
          kind: "mistake",
          body: "Do not confuse the topic with the structure. A paragraph about handwashing could use any of the five patterns; the structure is how the ideas are organized, not what they are about.",
        },
      ],
      quickCheck: {
        prompt:
          "A paragraph explains how two blood pressure medications are alike and how they differ. Which structure is it using?",
        choices: [
          "Sequence",
          "Cause and effect",
          "Compare and contrast",
          "Problem and solution",
        ],
        answer: 2,
        explanation:
          "Alike and different is the defining move of compare and contrast. No time order, cause, or problem is being organized here.",
      },
    },
    {
      id: "signal-words",
      title: "Signal words",
      blocks: [
        {
          kind: "concept",
          body: "The fastest way to spot the pattern is through signal words, the connecting words an author uses to link ideas. Each structure leans on its own set.",
        },
        {
          kind: "rule",
          title: "Match the signals to the structure",
          items: [
            "First, then, next, finally: sequence",
            "Because, since, as a result, therefore: cause and effect",
            "However, unlike, similarly, both: compare and contrast",
            "Problem, issue, one solution, to address this: problem and solution",
          ],
        },
        {
          kind: "example",
          title: "Spot the structure from its signals",
          steps: [
            {
              note: "Read the passage and notice the connecting words.",
              work: [
                "\"First clean the site, then apply the bandage, and finally label the dressing with the date.\"",
              ],
            },
            {
              note: "The words first, then, and finally each mark a step in time order.",
              work: ["Signals: first, then, finally"],
            },
          ],
          answer: "Sequence structure",
        },
        {
          kind: "tip",
          body: "Confirm the pattern against the whole paragraph, not a single word. The structure is the one that explains how most of the sentences connect.",
        },
      ],
      quickCheck: {
        prompt:
          "\"The clinic was short-staffed; as a result, wait times doubled.\" Which structure do the signal words point to?",
        choices: [
          "Description",
          "Cause and effect",
          "Compare and contrast",
          "Sequence",
        ],
        answer: 1,
        explanation:
          "As a result links a cause (short staffing) to its effect (longer waits). However or unlike would have pointed to compare and contrast instead.",
      },
    },
    {
      id: "on-the-teas",
      title: "How the TEAS tests it",
      blocks: [
        {
          kind: "concept",
          body: "TEAS questions use this skill two ways. Some ask you to identify which structure a paragraph uses. Others ask you to use the structure to find a detail, such as what happened next in a sequence or what caused a result.",
        },
        {
          kind: "example",
          title: "Use the structure to find a detail",
          steps: [
            {
              note: "The passage reads: first clean the site, then apply the bandage, and finally label the dressing with the date. The question asks what should be done immediately after cleaning the site.",
              work: [
                "First: clean the site",
                "Then: apply the bandage",
                "Finally: label the dressing",
              ],
            },
            {
              note: "The sequence words order the steps, so the step after cleaning is the one introduced by then.",
              work: [],
            },
          ],
          answer: "Apply the bandage",
        },
        {
          kind: "mistake",
          body: "Do not answer a what-happened-next question from memory or from the order of the answer choices. Go back to the passage and follow its sequence words.",
        },
      ],
      quickCheck: {
        prompt:
          "A question asks, \"According to the passage, what caused the patient's fever to drop?\" Which structure is that question relying on?",
        choices: [
          "Cause and effect",
          "Compare and contrast",
          "Description",
          "Problem and solution",
        ],
        answer: 0,
        explanation:
          "Asking what caused a result depends on the passage's cause and effect organization. You would trace signals like because or as a result to find the answer.",
      },
    },
  ],
};
