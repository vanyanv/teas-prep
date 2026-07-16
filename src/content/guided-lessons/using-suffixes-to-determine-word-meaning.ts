import type { GuidedLesson } from "../guided-lesson-types";

/**
 * Guided lesson for ENGLISH / vocabulary / "Using Suffixes to Determine Word
 * Meaning". Content carried over from the flat skill-lesson blocks,
 * restructured into the concept / rule / example / mistake / quick check
 * pattern. Quick checks are informal and never touch mastery.
 */
export const USING_SUFFIXES_WORD_MEANING: GuidedLesson = {
  section: "ENGLISH",
  topic: "vocabulary",
  skill: "Using Suffixes to Determine Word Meaning",
  slug: "using-suffixes-to-determine-word-meaning",
  title: "Using Suffixes",
  summary:
    "A suffix is added to the end of a word and usually marks its part of speech or, in medical terms, a condition or procedure.",
  minutes: [8, 10],
  objectives: [
    "Identify the suffix at the end of an unfamiliar word",
    "Combine a root with its suffix to predict a general meaning",
    "Recall the meanings of common general and medical suffixes",
    "Use a suffix to determine a word's part of speech",
  ],
  sections: [
    {
      id: "what-it-is",
      title: "What a suffix does",
      blocks: [
        {
          kind: "concept",
          body: "A suffix is a word part attached after a root. Suffixes often tell you whether a word is a noun, verb, or adjective, and in clinical language they name conditions, processes, and procedures.\n\nIdentify the suffix to predict the word's role and general meaning, then combine it with the root. You do not need to know the whole word already; the two parts together get you close enough to answer.",
        },
        {
          kind: "rule",
          title: "How to read an unfamiliar word",
          ordered: true,
          items: [
            "Split the word into its root and its ending",
            "Recall what the suffix means",
            "Combine the suffix meaning with the root meaning",
          ],
        },
        {
          kind: "example",
          title: "Breaking apart a word",
          steps: [
            {
              note: "Split the word at the ending you recognize.",
              work: ["treatable", "root: treat + suffix: -able"],
            },
            {
              note: "Recall the suffix meaning, then combine it with the root.",
              work: ["-able means capable of, able to be", "treat + able to be"],
              becomes: "able to be treated",
            },
          ],
          answer: "Treatable means able to be treated.",
        },
      ],
      quickCheck: {
        prompt: "Where does a suffix attach, and what does it usually tell you?",
        choices: [
          "Before the root; it reverses the root's meaning",
          "After the root; it marks the word's part of speech or condition",
          "Before the root; it marks the word's part of speech",
          "After the root; it tells you how the word is pronounced",
        ],
        answer: 1,
        explanation:
          "A suffix comes after the root. It usually signals the part of speech, or in medical terms a condition or procedure.",
      },
    },
    {
      id: "general-suffixes",
      title: "Common general suffixes",
      blocks: [
        {
          kind: "concept",
          body: "These endings appear throughout everyday and academic English. Learn the meaning once and it carries over to every root it attaches to.",
        },
        {
          kind: "rule",
          title: "Suffixes to know",
          items: [
            "-able / -ible : capable of, able to be (treatable, reversible)",
            "-less : without (painless)",
            "-ful : full of (harmful)",
            "-ous : full of, having (nervous)",
            "-ist : one who practices (pharmacist)",
            "-tion / -sion : act or state of (digestion, tension)",
            "-ity : state or quality of (acidity)",
            "-ize : to make, to cause (sterilize)",
          ],
        },
        {
          kind: "example",
          title: "Two endings, opposite meanings",
          steps: [
            {
              note: "Attach -less to the root pain.",
              work: ["pain + -less", "-less means without"],
              becomes: "painless: without pain",
            },
            {
              note: "Attach -ful to the root harm.",
              work: ["harm + -ful", "-ful means full of"],
              becomes: "harmful: full of harm, causing harm",
            },
          ],
          answer:
            "The root stays put; the suffix decides whether the word means without something or full of it.",
        },
        {
          kind: "mistake",
          body: "Do not confuse -less with -ful. They attach the same way but point in opposite directions, so a rushed reader can turn painless into its opposite. Read the ending before you commit to an answer.",
        },
      ],
      quickCheck: {
        prompt: "What does the word reversible mean?",
        choices: [
          "Without reversal",
          "One who reverses",
          "Able to be reversed",
          "The act of reversing",
        ],
        answer: 2,
        explanation:
          "The suffix -ible (like -able) means capable of or able to be, so reversible means able to be reversed. Without would be -less, one who would be -ist, and the act of would be -sion.",
      },
    },
    {
      id: "medical-suffixes",
      title: "Medical suffixes",
      blocks: [
        {
          kind: "concept",
          body: "Clinical vocabulary leans heavily on a small set of endings that name conditions, processes, and areas of study. Recognizing the suffix tells you what kind of term you are looking at even when the root is unfamiliar.",
        },
        {
          kind: "rule",
          title: "Suffixes to know",
          items: [
            "-itis : inflammation (arthritis)",
            "-ology : study of (cardiology)",
            "-emia : blood condition (anemia)",
            "-pathy : disease, disorder (neuropathy)",
          ],
        },
        {
          kind: "example",
          title: "Same root, different suffixes",
          steps: [
            {
              note: "Start with a root you know: cardi- refers to the heart.",
              work: ["cardi- : heart"],
            },
            {
              note: "Attach -ology, which means study of.",
              work: ["cardi + -ology"],
              becomes: "cardiology: the study of the heart",
            },
            {
              note: "Attach -itis, which means inflammation.",
              work: ["cardi + -itis"],
              becomes: "carditis: inflammation of the heart",
            },
          ],
          answer:
            "One root gives a field of study or a condition depending only on the ending.",
        },
        {
          kind: "tip",
          body: "When a term ends in -itis, expect a condition rather than a treatment or a specialist. That distinction alone often eliminates two answer choices.",
        },
      ],
      quickCheck: {
        prompt: "A patient chart lists neuropathy. What does the suffix tell you?",
        choices: [
          "It names an inflammation",
          "It names a disease or disorder",
          "It names a field of study",
          "It names a blood condition",
        ],
        answer: 1,
        explanation:
          "The suffix -pathy means disease or disorder, so neuropathy is a disorder of the nerves. Inflammation would be -itis, study of would be -ology, and a blood condition would be -emia.",
      },
    },
    {
      id: "part-of-speech",
      title: "Suffixes and part of speech",
      blocks: [
        {
          kind: "concept",
          body: "Suffixes are reliable clues to part of speech. Even when you cannot pin down the exact meaning, the ending tells you what job the word does in a sentence, and that alone can help you pick the grammatically correct answer.",
        },
        {
          kind: "rule",
          title: "What each ending signals",
          items: [
            "Nouns: -tion / -sion, -ity, -ist (digestion, acidity, pharmacist)",
            "Verbs: -ize (sterilize)",
            "Adjectives: -ous, -able / -ible, -less, -ful (nervous, treatable, painless)",
          ],
        },
        {
          kind: "example",
          title: "Letting the ending choose the answer",
          steps: [
            {
              note: "A sentence needs a verb: \"The nurse will ___ the instruments.\"",
              work: ["The blank follows will, so a verb belongs there."],
            },
            {
              note: "Check the endings on offer.",
              work: [
                "sterilization: -tion, a noun",
                "sterile: an adjective",
                "sterilize: -ize, a verb",
              ],
              becomes: "sterilize",
            },
          ],
          answer:
            "The -ize ending marks the only verb, so it is the only choice that fits.",
        },
        {
          kind: "mistake",
          body: "Do not stop at the root. Sterilize, sterilization, and sterility share a root and a general idea, so choosing by meaning alone leaves you stuck. The suffix is what separates them.",
        },
      ],
      quickCheck: {
        prompt: "Which suffix most reliably signals that a word is a noun?",
        choices: ["-ize", "-ity", "-ous", "-able"],
        answer: 1,
        explanation:
          "The ending -ity marks a noun, as in acidity. The ending -ize signals a verb, while -ous and -able signal adjectives.",
      },
    },
  ],
};
