import type { GuidedLesson } from "../guided-lesson-types";

/**
 * Guided lesson for READING / craft-structure / "Analyze Types of Writing".
 * Content carried over from the flat skill-lesson blocks, restructured into
 * the concept / rule / example / mistake / quick check pattern. Quick checks
 * are informal and never touch mastery.
 */
export const ANALYZE_TYPES_OF_WRITING: GuidedLesson = {
  section: "READING",
  topic: "craft-structure",
  skill: "Analyze Types of Writing",
  slug: "analyze-types-of-writing",
  title: "Types of Writing",
  summary:
    "The four main types of writing are narrative, expository, persuasive, and descriptive, each with its own goal and features.",
  minutes: [8, 10],
  objectives: [
    "Name the four main types of writing and the goal of each",
    "Match a type of writing to its key features",
    "Identify a passage's type from its details and structure",
    "Separate a passage's type from the author's purpose",
  ],
  sections: [
    {
      id: "four-types",
      title: "The four types",
      blocks: [
        {
          kind: "concept",
          body: "Writing is grouped by what it sets out to do. Four types cover almost everything the TEAS shows you, and each one has a goal you can state in a few words.\n\nStart with the goal. Once you know what a passage is trying to do to you, telling a story, explaining, convincing, or making you see something, the type follows.",
        },
        {
          kind: "tabs",
          tabs: [
            {
              label: "Narrative",
              blocks: [
                {
                  kind: "concept",
                  body: "Narrative writing tells a story. It moves through events and involves characters, so it usually has a sequence: this happened, then that happened.",
                },
              ],
            },
            {
              label: "Expository",
              blocks: [
                {
                  kind: "concept",
                  body: "Expository writing explains facts and ideas. It informs without arguing a side: definitions, processes, causes, how something works.",
                },
              ],
            },
            {
              label: "Persuasive",
              blocks: [
                {
                  kind: "concept",
                  body: "Persuasive writing argues a position. It states a claim and backs it with reasons, because it wants you to agree or to act.",
                },
              ],
            },
            {
              label: "Descriptive",
              blocks: [
                {
                  kind: "concept",
                  body: "Descriptive writing paints a detailed picture using the senses: how something looks, sounds, smells, feels, or tastes.",
                },
              ],
            },
          ],
        },
        {
          kind: "rule",
          title: "The goal of each type",
          items: [
            "Narrative: tells a story with events and characters",
            "Expository: explains facts and ideas",
            "Persuasive: argues a position",
            "Descriptive: paints a detailed picture using the senses",
          ],
        },
      ],
      quickCheck: {
        prompt: "Which type of writing has the goal of explaining facts and ideas?",
        choices: ["Narrative", "Expository", "Persuasive", "Descriptive"],
        answer: 1,
        explanation:
          "Expository writing informs and explains. Persuasive writing also uses facts, but it uses them to argue a position rather than simply to explain.",
      },
    },
    {
      id: "key-features",
      title: "Matching type to features",
      blocks: [
        {
          kind: "concept",
          body: "The TEAS tests this two ways. You read a passage and name its type, or you are given a feature and asked which type it belongs to.\n\nThe second version is faster if you know the signature feature of each type, because each type leaves different tracks on the page.",
        },
        {
          kind: "rule",
          title: "Signature features",
          items: [
            "Narrative: a sequence of events, characters, a beginning and an end",
            "Expository: facts, definitions, steps, causes, no side taken",
            "Persuasive: a thesis and reasons supporting it",
            "Descriptive: sensory detail (sight, sound, smell, touch, taste)",
          ],
        },
        {
          kind: "tip",
          body: "Ask one question of the passage: is it moving through time (narrative), stating a claim (persuasive), listing sensory detail (descriptive), or explaining (expository)? The first honest answer is usually the type.",
        },
      ],
      quickCheck: {
        prompt:
          "A passage opens with a thesis and then gives three reasons that support it. Which type is it?",
        choices: ["Narrative", "Expository", "Persuasive", "Descriptive"],
        answer: 2,
        explanation:
          "A thesis plus reasons is the signature of persuasive writing: it is arguing a position, not just explaining one.",
      },
    },
    {
      id: "identify-in-passages",
      title: "Naming the type of a passage",
      blocks: [
        {
          kind: "concept",
          body: "Two passages can cover the same subject and still be different types. What separates them is what the writing does with the subject, not the subject itself.",
        },
        {
          kind: "example",
          title: "Same subject, two types",
          steps: [
            {
              note: "The first passage piles up sensory detail about a room.",
              work: [
                "\"the sharp smell of antiseptic\"",
                "\"the cold metal of the table\"",
              ],
              becomes: "Smell and touch, no events: descriptive",
            },
            {
              note: "The second passage walks through the steps of an injury in order.",
              work: ["It happened, then this, then that"],
              becomes: "A sequence of events: narrative",
            },
          ],
          answer:
            "The first is descriptive; the second is narrative. Same clinic, different jobs.",
        },
        {
          kind: "tip",
          body: "Sensory words can appear inside a story. Ask whether the detail is the point of the passage or the scenery for events that are the point.",
        },
      ],
      quickCheck: {
        prompt:
          "A passage describes the sharp smell of antiseptic and the cold metal of an exam table, with no events. Which type is it?",
        choices: [
          "Narrative, because it is set in a clinic",
          "Expository, because it reports facts about a room",
          "Persuasive, because it wants you to feel something",
          "Descriptive, because it builds a picture from the senses",
        ],
        answer: 3,
        explanation:
          "Smell and touch detail with no sequence of events is descriptive writing. A clinic setting alone does not make a passage narrative.",
      },
    },
    {
      id: "type-vs-purpose",
      title: "Type is not purpose",
      blocks: [
        {
          kind: "concept",
          body: "Type and purpose are close cousins, and the test uses that. Purpose is what the author wants to happen; type is the kind of writing produced. Each type carries its own purpose, so the two line up in a predictable way.",
        },
        {
          kind: "rule",
          title: "The pairing to hold onto",
          items: [
            "Persuasive writing always aims to convince",
            "Expository writing simply explains, without taking a side",
          ],
        },
        {
          kind: "mistake",
          body: "Do not confuse type with purpose. A passage full of facts is not automatically expository: if those facts are marshaled to convince you of a position, the type is persuasive.",
        },
        {
          kind: "example",
          title: "Facts alone do not settle it",
          steps: [
            {
              note: "One passage reports how a vaccine trains the immune system, and stops there.",
              work: [],
              becomes: "Explains, takes no side: expository",
            },
            {
              note: "Another reports the same facts, then argues that staff should be vaccinated.",
              work: [],
              becomes: "Facts used as reasons for a claim: persuasive",
            },
          ],
          answer:
            "The facts are the same. The type follows what the author does with them.",
        },
      ],
      quickCheck: {
        prompt:
          "A passage lists statistics about handwashing and concludes that every nurse should wash before each patient. Which type is it?",
        choices: [
          "Expository, because it is built on statistics",
          "Persuasive, because the facts support a position it wants you to accept",
          "Descriptive, because it details a procedure",
          "Narrative, because it follows a nurse through a shift",
        ],
        answer: 1,
        explanation:
          "The statistics work as reasons for a claim, so the writing argues rather than merely explains. Expository writing would report the statistics and stop.",
      },
    },
  ],
};
