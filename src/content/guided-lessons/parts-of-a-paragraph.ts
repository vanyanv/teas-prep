import type { GuidedLesson } from "../guided-lesson-types";

/**
 * Guided lesson for ENGLISH / knowledge-language / "Parts of a Paragraph".
 * Content carried over from the flat skill-lesson blocks, restructured into
 * the concept / rule / example / mistake / quick check pattern. Quick checks
 * are informal and never touch mastery.
 */
export const PARTS_OF_A_PARAGRAPH: GuidedLesson = {
  section: "ENGLISH",
  topic: "knowledge-language",
  skill: "Parts of a Paragraph",
  slug: "parts-of-a-paragraph",
  title: "Parts of a Paragraph",
  summary:
    "A strong paragraph has a topic sentence, supporting details, and a concluding sentence.",
  minutes: [8, 10],
  objectives: [
    "Name the three parts of a well-built paragraph",
    "Identify the topic sentence by how broad it is",
    "Choose the supporting detail that develops the stated main idea",
    "Select a concluding sentence that closes the paragraph without adding new material",
  ],
  sections: [
    {
      id: "three-parts",
      title: "The three parts",
      blocks: [
        {
          kind: "concept",
          body: "A well-built paragraph is not just a group of related sentences. Each sentence has a job, and the three jobs work in order: announce the idea, develop it, then close it.\n\nTransitions such as first, also, and as a result connect the sentences so the paragraph reads smoothly rather than as a list.",
        },
        {
          kind: "rule",
          title: "What each part does",
          ordered: true,
          items: [
            "Topic sentence: states the main idea",
            "Supporting details: facts, examples, and explanations that develop that idea",
            "Concluding sentence: wraps up or restates the point",
          ],
        },
        {
          kind: "tip",
          body: "Read a paragraph asking what each sentence is doing rather than only what it says. Once you can name the job of a sentence, the question usually answers itself.",
        },
      ],
      quickCheck: {
        prompt: "What is the job of the topic sentence in a paragraph?",
        choices: [
          "To state the main idea",
          "To give the most specific fact",
          "To restate the point at the end",
          "To connect the sentences smoothly",
        ],
        answer: 0,
        explanation:
          "The topic sentence states the main idea. Specific facts are supporting details, restating happens in the concluding sentence, and connecting is the work of transitions.",
      },
    },
    {
      id: "how-tested",
      title: "How the TEAS tests it",
      blocks: [
        {
          kind: "concept",
          body: "You will be asked to identify the topic sentence, to pick the best supporting detail, or to choose a fitting concluding sentence.\n\nThe useful pattern is breadth. The topic sentence is usually the broadest sentence in the paragraph. Supporting sentences are more specific, and every one of them relates back to the topic sentence.",
        },
        {
          kind: "rule",
          title: "How to work the question",
          ordered: true,
          items: [
            "Find the main idea the paragraph is about",
            "Rank the sentences from broadest to most specific",
            "Eliminate choices that are off topic or that only cover part of the idea",
          ],
        },
        {
          kind: "mistake",
          body: "A choice can be perfectly true and still be wrong. On a supporting detail question, an interesting fact that does not develop the stated main idea does not belong in the paragraph.",
        },
      ],
      quickCheck: {
        prompt:
          "Compared with the supporting sentences around it, the topic sentence is usually:",
        choices: [
          "The shortest",
          "The broadest",
          "The most specific",
          "The last one",
        ],
        answer: 1,
        explanation:
          "The topic sentence covers the whole idea, so it is broader than the sentences that develop it. Length and position do not decide it, and being most specific is the mark of a supporting detail.",
      },
    },
    {
      id: "worked-example",
      title: "A paragraph part by part",
      blocks: [
        {
          kind: "concept",
          body: "The three sentences below form one short paragraph about handwashing. Watch how each sentence takes its turn.",
        },
        {
          kind: "example",
          title: "Naming each part",
          steps: [
            {
              note: "The first sentence names the idea the whole paragraph is about.",
              work: [
                "\"Handwashing is the simplest way to prevent infection.\"",
                "Broad: it covers handwashing in general.",
              ],
              becomes: "Topic sentence",
            },
            {
              note: "The next sentence gives a specific fact that develops that idea.",
              work: [
                "\"Scrubbing for twenty seconds removes most germs.\"",
                "Specific: a detail that proves the claim.",
              ],
              becomes: "Supporting detail",
            },
            {
              note: "The last sentence closes the paragraph by restating the point.",
              work: [
                "\"A few seconds at the sink protects every patient.\"",
                "No new information, just the point again.",
              ],
              becomes: "Concluding sentence",
            },
          ],
          answer:
            "Broad claim, then a specific detail that supports it, then a close that restates the point.",
        },
        {
          kind: "mistake",
          body: "A concluding sentence should not introduce a new idea. If the last sentence raised gloves or masks, it would open a new topic instead of closing this one.",
        },
      ],
      quickCheck: {
        prompt:
          "In the handwashing paragraph, which sentence is the supporting detail?",
        choices: [
          "\"Handwashing is the simplest way to prevent infection.\"",
          "\"Scrubbing for twenty seconds removes most germs.\"",
          "\"A few seconds at the sink protects every patient.\"",
          "\"Gloves should be worn during every procedure.\"",
        ],
        answer: 1,
        explanation:
          "The twenty-second scrub is the specific fact that develops the claim. The first sentence is the broad topic sentence, the third restates the point, and the gloves sentence is off topic.",
      },
    },
    {
      id: "finding-the-topic-sentence",
      title: "Finding the topic sentence",
      blocks: [
        {
          kind: "concept",
          body: "When several sentences look plausible, use the relationship between them rather than their position. Find the sentence that the others explain or prove. That broad sentence is the topic sentence, and everything else should support it.",
        },
        {
          kind: "rule",
          title: "Two tests that settle it",
          items: [
            "The explains test: do the other sentences explain or prove this one? If yes, it is the topic sentence.",
            "The coverage test: does this sentence cover the whole paragraph, or only one piece of it? Only the topic sentence covers all of it.",
          ],
        },
        {
          kind: "example",
          title: "Which sentence do the others support?",
          steps: [
            {
              note: "Test the sentence about scrubbing time.",
              work: [
                "\"Scrubbing for twenty seconds removes most germs.\"",
                "Does the infection sentence explain this? No.",
              ],
              becomes: "Not the topic sentence",
            },
            {
              note: "Test the sentence about preventing infection.",
              work: [
                "\"Handwashing is the simplest way to prevent infection.\"",
                "The scrubbing detail exists to prove this claim.",
              ],
              becomes: "Topic sentence",
            },
          ],
          answer:
            "The sentence the others work to prove is the topic sentence.",
        },
        {
          kind: "mistake",
          body: "Do not assume the first sentence is always the topic sentence. It often is, but a paragraph can open with a transition or an example and state its main idea later, so run the explains test instead of counting positions.",
        },
      ],
      quickCheck: {
        prompt:
          "You are unsure which of two sentences is the topic sentence. Which question best settles it?",
        choices: [
          "Which sentence comes first?",
          "Which sentence is longer?",
          "Which sentence do the others explain or prove?",
          "Which sentence contains a number?",
        ],
        answer: 2,
        explanation:
          "The topic sentence is the one the other sentences support. Position, length, and numbers do not identify it, since a specific supporting detail can be first, long, or numeric.",
      },
    },
  ],
};
