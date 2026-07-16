import type { GuidedLesson } from "../guided-lesson-types";

/**
 * Guided lesson for ENGLISH / knowledge-language / "Identifying Unrelated
 * Sentences". Content carried over from the flat skill-lesson blocks,
 * restructured into the concept / rule / example / mistake / quick check
 * pattern. Quick checks are informal and never touch mastery.
 */
export const IDENTIFYING_UNRELATED_SENTENCES: GuidedLesson = {
  section: "ENGLISH",
  topic: "knowledge-language",
  skill: "Identifying Unrelated Sentences",
  slug: "identifying-unrelated-sentences",
  title: "Unrelated Sentences",
  summary:
    "An unrelated sentence breaks a paragraph's unity by not supporting the topic sentence.",
  minutes: [8, 10],
  objectives: [
    "Explain what paragraph unity means",
    "Locate the main idea in a topic sentence",
    "Test each sentence against the main idea it should develop",
    "Choose the sentence that does not belong in a short paragraph",
  ],
  sections: [
    {
      id: "what-it-is",
      title: "What it is",
      blocks: [
        {
          kind: "concept",
          body: "Every sentence in a paragraph should support the main idea. A sentence that drifts to a different topic or adds an off-point detail breaks unity and should be removed.\n\nThis off-topic sentence is sometimes called an irrelevant or distracting detail.",
        },
        {
          kind: "rule",
          title: "What breaks unity",
          intro: "A sentence does not belong when it:",
          items: [
            "Moves to a different topic than the one the paragraph announced",
            "Adds a detail that is true but does not develop the main idea",
            "Talks about the writer or a side story instead of the subject",
          ],
        },
        {
          kind: "mistake",
          body: "An unrelated sentence is not the same as a false sentence. The off-topic line is usually perfectly true. It is unrelated because it does not support the main idea, not because it is wrong.",
        },
      ],
      quickCheck: {
        prompt: "What makes a sentence unrelated to its paragraph?",
        choices: [
          "It states something untrue",
          "It does not support the paragraph's main idea",
          "It is shorter than the other sentences",
          "It appears at the end of the paragraph",
        ],
        answer: 1,
        explanation:
          "Unity is about support, not truth or placement. A true, well-written sentence still does not belong if it fails to develop the main idea.",
      },
    },
    {
      id: "how-tested",
      title: "How the TEAS tests it",
      blocks: [
        {
          kind: "concept",
          body: "You read a short paragraph and choose the sentence that does not belong.\n\nFirst nail down the main idea from the topic sentence, then test each sentence: if one does not develop that idea, it is the unrelated one.",
        },
        {
          kind: "rule",
          title: "How to work the question",
          ordered: true,
          items: [
            "Read the topic sentence and state the main idea in your own words",
            "Take each remaining sentence one at a time",
            "Ask whether that sentence proves or explains the main idea",
            "The one sentence that does not is your answer",
          ],
        },
        {
          kind: "tip",
          body: "The topic sentence itself is almost never the answer. It sets the main idea, so the other sentences are measured against it.",
        },
      ],
      quickCheck: {
        prompt:
          "Before testing the sentences in a paragraph, what should you do first?",
        choices: [
          "Look for the longest sentence",
          "Check the paragraph for spelling errors",
          "Pin down the main idea from the topic sentence",
          "Decide which sentence sounds most interesting",
        ],
        answer: 2,
        explanation:
          "You cannot judge whether a sentence belongs until you know what it is supposed to support. The topic sentence gives you that standard.",
      },
    },
    {
      id: "worked-example",
      title: "Working an example",
      blocks: [
        {
          kind: "concept",
          body: "Read the paragraph below, then test each sentence against the idea the first sentence sets up.",
        },
        {
          kind: "example",
          title: "Which sentence does not belong?",
          expression:
            "\"Regular exercise strengthens the heart. It lowers blood pressure and improves circulation. My cousin just bought new running shoes. It also helps control weight.\"",
          steps: [
            {
              note: "Start with the topic sentence and name the main idea.",
              work: [
                "\"Regular exercise strengthens the heart.\"",
                "Main idea: exercise benefits the heart and health.",
              ],
            },
            {
              note: "Test the second sentence against that idea.",
              work: [
                "\"It lowers blood pressure and improves circulation.\"",
                "This explains how exercise helps the heart.",
              ],
              becomes: "Belongs",
            },
            {
              note: "Test the third sentence.",
              work: [
                "\"My cousin just bought new running shoes.\"",
                "Shoes are about the writer's cousin, not a health benefit.",
              ],
              becomes: "Does not belong",
            },
            {
              note: "Test the fourth sentence.",
              work: [
                "\"It also helps control weight.\"",
                "Another benefit of exercise, so it develops the idea.",
              ],
              becomes: "Belongs",
            },
          ],
          answer:
            "The shoes sentence is unrelated; it does not explain how exercise helps the heart.",
        },
        {
          kind: "mistake",
          body: "Do not be fooled by a shared word. The shoes sentence mentions running, which sounds like exercise, but sharing a topic word is not the same as supporting the main idea.",
        },
      ],
      quickCheck: {
        prompt:
          "In the exercise paragraph, why is \"My cousin just bought new running shoes\" the unrelated sentence?",
        choices: [
          "It is the shortest sentence in the paragraph",
          "It never mentions the word exercise",
          "It is a personal detail that does not develop a benefit of exercise",
          "It is untrue",
        ],
        answer: 2,
        explanation:
          "The paragraph is about the benefits of exercise. A note about a cousin's purchase is true and on-sounding, but it explains no benefit.",
      },
    },
    {
      id: "the-unity-test",
      title: "The unity test",
      blocks: [
        {
          kind: "concept",
          body: "When two choices both look a little loose, go back to the topic sentence and apply one question to each. The sentence that fails it is the answer.",
        },
        {
          kind: "rule",
          title: "Ask this of every line",
          intro: "Reread the topic sentence, then ask:",
          items: [
            "Does this sentence prove or explain the main idea?",
            "If yes, it belongs, even if it is a small detail.",
            "If no, it does not belong, even if it is true and on the same general subject.",
          ],
        },
        {
          kind: "tip",
          body: "Try reading the paragraph aloud with the suspect sentence removed. If nothing is lost and the paragraph flows better, you have found the unrelated one.",
        },
      ],
      quickCheck: {
        prompt:
          "A paragraph's topic sentence is \"Hospitals use color coding to speed up emergency response.\" Which sentence does not belong?",
        choices: [
          "Red tags mark patients who need immediate care",
          "Green tags identify patients who can safely wait",
          "The color-coding system was painted on the walls last spring",
          "Staff can sort dozens of patients in minutes using the tags",
        ],
        answer: 2,
        explanation:
          "When the paint was applied is a true detail about the system, but it does not explain how color coding speeds up response. The other three all show the system working.",
      },
    },
  ],
};
