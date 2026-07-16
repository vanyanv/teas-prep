import type { GuidedLesson } from "../guided-lesson-types";

/**
 * Guided lesson for ENGLISH / vocabulary / "Using Common Root Words to
 * Determine Word Meaning". Content carried over from the flat skill-lesson
 * blocks, restructured into the concept / rule / example / mistake / quick
 * check pattern. Quick checks are informal and never touch mastery.
 */
export const COMMON_ROOT_WORDS: GuidedLesson = {
  section: "ENGLISH",
  topic: "vocabulary",
  skill: "Using Common Root Words to Determine Word Meaning",
  slug: "using-common-root-words-to-determine-word-meaning",
  title: "Common Root Words",
  summary:
    "The root carries the core meaning of a word, so knowing common Greek and Latin roots unlocks many related terms at once.",
  minutes: [8, 10],
  objectives: [
    "Identify the root inside an unfamiliar word",
    "Recall the meanings of common Greek and Latin roots",
    "Use a root as the anchor for reasoning out a full word's meaning",
    "Recognize the family of words built on a single root",
  ],
  sections: [
    {
      id: "what-a-root-is",
      title: "What a root is",
      blocks: [
        {
          kind: "concept",
          body: "A root is the central part of a word that holds its main meaning. Prefixes and suffixes build around it, but the root is what the word is fundamentally about.\n\nMost academic and medical vocabulary comes from Greek and Latin roots. That is why a word you have never read before can still be reasoned through: its center is a piece you may already know from other words.",
        },
        {
          kind: "rule",
          title: "How to use a root",
          ordered: true,
          items: [
            "Find the root, the part that is not a prefix or a suffix",
            "Recall what that root means",
            "Use the root's meaning as the anchor for understanding the full word",
          ],
        },
        {
          kind: "example",
          title: "Anchoring on the root",
          steps: [
            {
              note: "Strip the word down to its center.",
              work: ["inspect", "in- + spect"],
              becomes: "The root is spect",
            },
            {
              note: "Recall the root's meaning and anchor on it.",
              work: ["spect : to look, to see"],
              becomes: "Whatever inspect means, it involves looking",
            },
          ],
          answer:
            "To inspect is to look at something closely. The root fixed the core meaning before you considered anything else.",
        },
      ],
      quickCheck: {
        prompt: "What does the root of a word carry?",
        choices: [
          "The word's main meaning",
          "The word's part of speech",
          "The word's pronunciation",
          "The word's tense",
        ],
        answer: 0,
        explanation:
          "The root is the central part that holds the main meaning. Prefixes and suffixes build around it and adjust the sense, but the root is the anchor.",
      },
    },
    {
      id: "common-roots",
      title: "Roots worth knowing",
      blocks: [
        {
          kind: "concept",
          body: "These roots appear constantly on the TEAS and throughout health science reading. Learn them as meanings first, and the example word second, since the example is only there to remind you where you have already met the root.",
        },
        {
          kind: "tabs",
          tabs: [
            {
              label: "Action roots",
              blocks: [
                {
                  kind: "rule",
                  title: "Latin roots for doing",
                  items: [
                    "spect : to look, to see (inspect)",
                    "dict : to say, to speak (predict)",
                    "port : to carry (transport)",
                    "scrib / script : to write (prescribe)",
                    "struct : to build (construct)",
                  ],
                },
              ],
            },
            {
              label: "Body and life",
              blocks: [
                {
                  kind: "rule",
                  title: "Roots behind medical terms",
                  items: [
                    "cardi : heart (cardiac)",
                    "derm : skin (dermatology)",
                    "gastr : stomach (gastric)",
                    "neur : nerve (neuron)",
                    "bio : life (biology)",
                  ],
                },
              ],
            },
            {
              label: "The senses",
              blocks: [
                {
                  kind: "rule",
                  title: "Roots for hearing and sight",
                  items: [
                    "audi : to hear (auditory)",
                    "vis : to see (vision)",
                  ],
                },
              ],
            },
          ],
        },
        {
          kind: "tip",
          body: "Notice that spect and vis both mean to see. Two roots can land on the same meaning, so a root you do not recognize may still be reachable through a synonym you do know.",
        },
      ],
      quickCheck: {
        prompt: "The root gastr means:",
        choices: ["Skin", "Nerve", "Stomach", "Heart"],
        answer: 2,
        explanation:
          "Gastr means stomach, as in gastric. Skin is derm, nerve is neur, and heart is cardi.",
      },
    },
    {
      id: "word-families",
      title: "One root, a family of words",
      blocks: [
        {
          kind: "concept",
          body: "One root often appears in a whole family of words. Learning a single root does not buy you one word; it buys you every word built on that root.\n\nIf you know cardi means heart, you can reason through cardiac, cardiology, and cardiovascular even if you have never seen them before.",
        },
        {
          kind: "example",
          title: "The cardi family",
          expression: "cardi : heart",
          steps: [
            {
              note: "Start with the plainest member of the family.",
              work: ["cardiac"],
              becomes: "Relating to the heart",
            },
            {
              note: "The same root with a different ending names a field of study.",
              work: ["cardiology"],
              becomes: "The study of the heart",
            },
            {
              note: "The root joined to a second piece covers both parts.",
              work: ["cardiovascular"],
              becomes: "Relating to the heart and the blood vessels",
            },
          ],
          answer:
            "One root, three words. The root held the heart meaning steady in each; the surrounding parts adjusted what was being said about it.",
        },
        {
          kind: "tip",
          body: "When you meet a new root, spend a moment listing other words you already know that contain it. That turns one memorized item into a family you can recognize on sight.",
        },
      ],
      quickCheck: {
        prompt:
          "You know that derm means skin. Which word's meaning can you reason toward from that root alone?",
        choices: ["Dormant", "Dermatitis", "Determine", "Diameter"],
        answer: 1,
        explanation:
          "Dermatitis is built on derm, so you know it concerns the skin. The other words only resemble the root in spelling; they are not built on it.",
      },
    },
    {
      id: "unfamiliar-words",
      title: "Reasoning through an unfamiliar word",
      blocks: [
        {
          kind: "concept",
          body: "On the test you will meet words you have never read. The move is always the same: locate the root, recall its meaning, and let that meaning rule out the choices that have nothing to do with it.\n\nYou do not need to produce a dictionary definition. You need enough of the core meaning to choose between four options.",
        },
        {
          kind: "example",
          title: "Working out a new word",
          expression: "What does the word gastroscope most likely involve?",
          steps: [
            {
              note: "Break the word at its parts and find the roots.",
              work: ["gastroscope", "gastr + scope"],
              becomes: "gastr is a root you know",
            },
            {
              note: "Recall the meaning and anchor on it.",
              work: ["gastr : stomach"],
              becomes: "The word concerns the stomach",
            },
            {
              note: "Eliminate every choice that is not about the stomach.",
              work: [
                "A choice about the heart uses cardi, not gastr.",
                "A choice about the skin uses derm, not gastr.",
              ],
              becomes: "Only a stomach choice can survive",
            },
          ],
          answer:
            "A gastroscope is an instrument for viewing the stomach. The root alone narrowed four choices to one.",
        },
        {
          kind: "mistake",
          body: "Do not judge a word by how it sounds or by a familiar-looking chunk that is not actually the root. Port means to carry, so transport and portable belong together, but portion is not part of that family. Confirm the root carries the meaning before you lean on it.",
        },
      ],
      quickCheck: {
        prompt:
          "An unfamiliar word contains the root dict. Its meaning most likely involves:",
        choices: ["Writing", "Speaking", "Building", "Carrying"],
        answer: 1,
        explanation:
          "Dict means to say or to speak, as in predict. Writing is scrib or script, building is struct, and carrying is port.",
      },
    },
  ],
};
