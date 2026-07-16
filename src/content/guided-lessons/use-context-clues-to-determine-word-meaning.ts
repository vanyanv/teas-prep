import type { GuidedLesson } from "../guided-lesson-types";

/**
 * Guided lesson for ENGLISH / vocabulary / "Use Context Clues to Determine Word
 * Meaning". Content carried over from the flat skill-lesson blocks,
 * restructured into the concept / rule / example / mistake / quick check
 * pattern. Quick checks are informal and never touch mastery.
 */
export const USE_CONTEXT_CLUES: GuidedLesson = {
  section: "ENGLISH",
  topic: "vocabulary",
  skill: "Use Context Clues to Determine Word Meaning",
  slug: "use-context-clues-to-determine-word-meaning",
  title: "Context Clues",
  summary:
    "Context clues are hints in the surrounding sentence that help you figure out an unfamiliar word without a dictionary.",
  minutes: [8, 10],
  objectives: [
    "Explain why the words around an unfamiliar word are more reliable than the word alone",
    "Identify definition, synonym, antonym, and example clues",
    "Use signal words to spot which kind of clue a sentence offers",
    "Work an unfamiliar word from a sentence to a working meaning",
  ],
  sections: [
    {
      id: "what-it-is",
      title: "What context clues are",
      blocks: [
        {
          kind: "concept",
          body: "When you meet a word you do not know, the words around it often define or hint at its meaning. Writers rarely drop a hard word into a sentence and leave you stranded, so the sentence usually carries the help you need.\n\nReading the full sentence and the nearby sentences for these signals is faster and more reliable than guessing from the word alone. On the TEAS you have no dictionary, so the passage is the only source of meaning available.",
        },
        {
          kind: "rule",
          title: "How to read for a clue",
          ordered: true,
          items: [
            "Read the whole sentence, not just the unfamiliar word",
            "Look just before and just after the word for a definition, a matching word, a contrast, or examples",
            "Read the next sentence too, since the help sometimes lands there",
            "State a meaning in your own words, then reread the sentence with it in place",
          ],
        },
        {
          kind: "mistake",
          body: "Guessing from word parts alone. Breaking a word into pieces you think you recognize can send you the wrong direction, and the sentence often hands you the answer directly. Read the context first, and use word parts only to confirm.",
        },
      ],
      quickCheck: {
        prompt:
          "Why is reading the full sentence better than guessing from the unfamiliar word itself?",
        choices: [
          "Long sentences always contain easier synonyms",
          "The surrounding words often define or hint at the meaning",
          "The unfamiliar word is usually unimportant to the passage",
          "Word parts are never a reliable guide to any meaning",
        ],
        answer: 1,
        explanation:
          "The sentence around a hard word usually carries a definition, a matching word, a contrast, or examples. Word parts can help confirm a meaning, but the context is the more reliable place to start.",
      },
    },
    {
      id: "clue-types",
      title: "The four clue types",
      blocks: [
        {
          kind: "concept",
          body: "Almost every clue you meet is one of four kinds. Knowing which kind you are looking at tells you what to do with it: some clues hand you the meaning, and one gives you the opposite of it.",
        },
        {
          kind: "tabs",
          tabs: [
            {
              label: "Definition",
              blocks: [
                {
                  kind: "concept",
                  body: "The meaning is stated directly, often set off by a comma or a phrase like which means.\n\nExample: The patient had tachycardia, a faster than normal heart rate.\n\nThe phrase after the comma is the definition. Tachycardia means a faster than normal heart rate.",
                },
              ],
            },
            {
              label: "Synonym",
              blocks: [
                {
                  kind: "concept",
                  body: "A nearby word or phrase means roughly the same thing.\n\nExample: The wound was sterile, completely clean and free of germs.\n\nCompletely clean and free of germs restates sterile in easier words.",
                },
              ],
            },
            {
              label: "Antonym",
              blocks: [
                {
                  kind: "concept",
                  body: "A contrast word signals that the nearby word means the opposite.\n\nExample: Unlike her usually placid roommate, Mia was restless and anxious.\n\nUnlike sets up a contrast, so placid must be the opposite of restless and anxious: calm.",
                },
              ],
            },
            {
              label: "Example",
              blocks: [
                {
                  kind: "concept",
                  body: "Instances clarify the word by showing you members of the group.\n\nExample: Many analgesics, such as ibuprofen and acetaminophen, relieve mild pain.\n\nIbuprofen and acetaminophen are pain relievers, so analgesics are drugs that relieve pain.",
                },
              ],
            },
          ],
        },
        {
          kind: "mistake",
          body: "Treating an antonym clue like a synonym clue. In \"Unlike her usually placid roommate, Mia was restless,\" the nearby word restless is the opposite of placid, not a match for it. When a contrast word appears, flip the meaning before you accept it.",
        },
      ],
      quickCheck: {
        prompt:
          "\"Many analgesics, such as ibuprofen and acetaminophen, relieve mild pain.\" Which clue type is this?",
        choices: ["Definition", "Synonym", "Antonym", "Example"],
        answer: 3,
        explanation:
          "Such as introduces instances of the word, which makes this an example clue. The instances are pain relievers, so analgesics are drugs that relieve pain.",
      },
    },
    {
      id: "signal-words",
      title: "Signal words",
      blocks: [
        {
          kind: "concept",
          body: "Signal words tell you which clue type a sentence is offering, so they are the fastest way in. Scan the sentence for one before you try to reason out the meaning.",
        },
        {
          kind: "rule",
          title: "What each signal points to",
          items: [
            "Definitions: which means, that is, or is, a comma followed by a short restatement",
            "Antonyms: however, unlike, but, although, on the other hand",
            "Examples: such as, including, for instance, like",
          ],
        },
        {
          kind: "example",
          title: "One signal word changes the answer",
          steps: [
            {
              note: "Start with a sentence built on a contrast signal.",
              work: [
                "\"Unlike her placid roommate, Mia was restless.\"",
                "Unlike signals an antonym clue.",
              ],
              becomes: "placid is the opposite of restless: calm",
            },
            {
              note: "Swap the signal for one that points at a definition and the clue reverses.",
              work: [
                "\"Her roommate was placid, that is, calm and steady.\"",
                "That is signals a definition clue.",
              ],
              becomes: "placid is defined right there: calm and steady",
            },
          ],
          answer:
            "Both sentences land on calm, but the signal word decides whether you match the nearby words or flip them.",
        },
        {
          kind: "tip",
          body: "If you find no signal word, the clue is often still there in punctuation. A comma, a dash, or parentheses right after a hard word frequently introduces a definition or a synonym.",
        },
      ],
      quickCheck: {
        prompt: "Which signal word tells you to look for an opposite meaning?",
        choices: ["Such as", "However", "That is", "Including"],
        answer: 1,
        explanation:
          "However sets up a contrast, so the nearby description points to the opposite of the unfamiliar word. That is introduces a definition, while such as and including introduce examples.",
      },
    },
    {
      id: "working-a-question",
      title: "Working a question",
      blocks: [
        {
          kind: "concept",
          body: "A TEAS question gives you a sentence and four possible meanings. The right choice is the one the sentence supports, not the one that sounds closest to a word you already know.",
        },
        {
          kind: "example",
          title: "Finding the meaning of taciturn",
          expression:
            "\"Unlike his talkative brother, Ken was taciturn and rarely spoke at meetings.\"",
          steps: [
            {
              note: "Scan for a signal word first.",
              work: [
                "Unlike is present.",
                "That marks an antonym clue.",
              ],
              becomes: "taciturn is the opposite of something nearby",
            },
            {
              note: "Find what the contrast is against.",
              work: ["The brother is talkative."],
              becomes: "taciturn is the opposite of talkative",
            },
            {
              note: "Confirm with the rest of the sentence.",
              work: [
                "\"rarely spoke at meetings\"",
                "This agrees with the opposite of talkative.",
              ],
              becomes: "taciturn means quiet, not saying much",
            },
          ],
          answer: "taciturn means quiet or reserved in speech",
        },
        {
          kind: "tip",
          body: "Put your meaning back into the original sentence and read it through. If the sentence still makes sense, your meaning is close enough to answer the question.",
        },
        {
          kind: "mistake",
          body: "Choosing a meaning that fits the topic but not the sentence. In the taciturn sentence, a choice like unfriendly sounds plausible for someone who does not speak, but the sentence contrasts him only with talkative, so quiet is what the context supports.",
        },
      ],
      quickCheck: {
        prompt:
          "\"The instructions were succinct; that is, they were brief and to the point.\" What does succinct mean?",
        choices: [
          "Confusing",
          "Detailed and lengthy",
          "Brief and to the point",
          "Written by hand",
        ],
        answer: 2,
        explanation:
          "That is signals a definition clue, so the words right after it give the meaning outright. No flipping is needed here, because nothing in the sentence sets up a contrast.",
      },
    },
  ],
};
