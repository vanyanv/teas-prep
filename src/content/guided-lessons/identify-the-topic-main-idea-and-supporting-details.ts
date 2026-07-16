import type { GuidedLesson } from "../guided-lesson-types";

/** Guided lesson for READING / key-ideas-details / "Identify the Topic, Main
 *  Idea, and Supporting Details". Content carried over from the flat
 *  skill-lesson blocks, restructured into the concept / rule / example /
 *  mistake / quick check pattern. */
export const TOPIC_MAIN_IDEA_SUPPORTING_DETAILS: GuidedLesson = {
  section: "READING",
  topic: "key-ideas-details",
  skill: "Identify the Topic, Main Idea, and Supporting Details",
  slug: "identify-the-topic-main-idea-and-supporting-details",
  title: "Topic, Main Idea, and Supporting Details",
  summary:
    "Tell apart the broad subject, the central point being made, and the facts that back it up.",
  minutes: [5, 7],
  objectives: [
    "Distinguish a text's topic, main idea, and supporting details",
    "Identify the main idea as the sentence the author most wants you to take away",
    "Recognize answer choices that are too narrow or too broad",
    "Sort a short passage into its three layers",
  ],
  sections: [
    {
      id: "three-layers",
      title: "The three layers",
      blocks: [
        {
          kind: "concept",
          body: "Every passage can be read at three levels of zoom. The widest level names what the text is about; the middle level states the one point being made about it; the narrowest level holds the evidence.",
        },
        {
          kind: "rule",
          title: "Three layers of a text",
          items: [
            "Topic: the general subject in a word or short phrase (\"hand hygiene\")",
            "Main idea: the one sentence the author most wants you to take away (often the claim)",
            "Supporting details: examples, reasons, and facts that prove the main idea",
          ],
        },
        {
          kind: "tip",
          body: "Notice the shape of each layer: a topic fits in a word or short phrase, while a main idea needs a full sentence because it says something about the topic.",
        },
      ],
      quickCheck: {
        prompt:
          "A sentence in a passage gives a statistic that backs up the author's claim. Which layer is that sentence?",
        choices: [
          "The topic",
          "The main idea",
          "A supporting detail",
          "A new, unrelated subject",
        ],
        answer: 2,
        explanation:
          "Facts, examples, and reasons that prove the claim are supporting details. The main idea is the claim itself, and the topic is just the subject.",
      },
    },
    {
      id: "how-teas-tests-it",
      title: "How the TEAS tests it",
      blocks: [
        {
          kind: "concept",
          body: "Questions ask \"Which is the topic?\", \"What is the main idea?\", or \"Which detail supports the main idea?\" Your job is to match the answer choice to the right layer.",
        },
        {
          kind: "mistake",
          body: "Wrong answers are usually too narrow (a single detail dressed up as the point) or too broad (a topic stated as if it were the point). Check that a main-idea answer covers the whole passage without adding anything.",
        },
        {
          kind: "tip",
          body: "Ask \"What is the author trying to convince me of?\" That answer is the main idea. Anything that answers \"How do they prove it?\" is a detail.",
        },
      ],
      quickCheck: {
        prompt:
          "An answer choice for a main-idea question restates one statistic from the passage. Why is it wrong?",
        choices: [
          "It is too broad; it covers more than the passage says",
          "It is too narrow; a single detail is not the central point",
          "It is off topic",
          "Statistics can never appear in correct answers",
        ],
        answer: 1,
        explanation:
          "A single statistic answers \"How do they prove it?\", so it is a supporting detail. The main idea must cover the passage's whole point.",
      },
    },
    {
      id: "worked-example",
      title: "A worked passage",
      blocks: [
        {
          kind: "concept",
          body: "Passage: \"Washing hands for 20 seconds removes more germs than a quick rinse. Studies show longer scrubbing cuts infection rates in clinics.\"",
        },
        {
          kind: "example",
          title: "Label the three layers",
          steps: [
            {
              note: "Name the general subject in a word or short phrase.",
              work: ["Topic: handwashing"],
            },
            {
              note: "Find the one sentence the author most wants you to take away.",
              work: [
                "Main idea: washing for a full 20 seconds removes more germs",
              ],
            },
            {
              note: "Whatever proves that claim is a supporting detail.",
              work: [
                "Supporting detail: studies show lower infection rates with longer scrubbing",
              ],
            },
          ],
          answer:
            "Topic: handwashing. Main idea: 20 seconds removes more germs. Detail: the clinic studies.",
        },
        {
          kind: "tip",
          body: "Run the two questions in order: \"What is the author trying to convince me of?\" gives the main idea, then \"How do they prove it?\" flags each detail.",
        },
      ],
      quickCheck: {
        prompt:
          "In the handwashing passage, which choice states the topic rather than the main idea?",
        choices: [
          "Handwashing",
          "Washing for a full 20 seconds removes more germs",
          "Studies show lower infection rates with longer scrubbing",
          "Clinics should post signs about scrubbing",
        ],
        answer: 0,
        explanation:
          "The topic is the general subject in a word or short phrase. The 20-second claim is the main idea, and the studies are a supporting detail.",
      },
    },
  ],
};
