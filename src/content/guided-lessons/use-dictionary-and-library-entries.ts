import type { GuidedLesson } from "../guided-lesson-types";

/**
 * Guided lesson for READING / craft-structure / "Use Dictionary and Library
 * Entries". Content carried over from the flat skill-lesson blocks,
 * restructured into the concept / rule / example / mistake / quick check
 * pattern. Quick checks are informal and never touch mastery.
 */
export const USE_DICTIONARY_AND_LIBRARY_ENTRIES: GuidedLesson = {
  section: "READING",
  topic: "craft-structure",
  skill: "Use Dictionary and Library Entries",
  slug: "use-dictionary-and-library-entries",
  summary:
    "Dictionary and reference entries are organized in set parts you read to find meaning, pronunciation, part of speech, and sources.",
  title: "Dictionary and Library Entries",
  minutes: [8, 10],
  objectives: [
    "Identify the parts of a dictionary entry",
    "Read a library or catalog entry to locate a source",
    "Choose the numbered meaning that fits a sentence",
    "Use part of speech to narrow the possible meanings",
  ],
  sections: [
    {
      id: "dictionary-entry-parts",
      title: "Parts of a dictionary entry",
      blocks: [
        {
          kind: "concept",
          body: "A dictionary entry is not a paragraph to read straight through. It is a set of labeled parts, always in the same order, so you can jump to the one the question asks about.\n\nOnce you know what each part is for, most entry questions become a matter of looking in the right place rather than reading everything.",
        },
        {
          kind: "rule",
          title: "What an entry lists",
          items: [
            "The word itself, called the entry word",
            "Its pronunciation, usually in parentheses or between slashes",
            "Its part of speech, often abbreviated: n., v., adj., adv.",
            "Its numbered meanings, one number per distinct sense",
            "Sometimes its origin, showing the language the word came from",
          ],
        },
        {
          kind: "example",
          title: "Reading an entry part by part",
          expression: "chart (n.) 1. a sheet of information in table form 2. a patient's medical record",
          steps: [
            {
              note: "The entry word is what is being defined.",
              work: ["chart"],
            },
            {
              note: "The abbreviation gives the part of speech. Here n. marks it as a noun.",
              work: ["(n.) = noun"],
            },
            {
              note: "The numbers separate distinct meanings. This entry lists two.",
              work: [
                "1. a sheet of information in table form",
                "2. a patient's medical record",
              ],
            },
          ],
          answer: "One entry word, one part of speech, two numbered meanings.",
        },
      ],
      quickCheck: {
        prompt:
          "In the entry chart (n.) 1. a sheet of information in table form 2. a patient's medical record, what does the (n.) tell you?",
        choices: [
          "The word has a noun meaning",
          "The word is the first meaning listed",
          "The word came from another language",
          "The word is pronounced with a silent letter",
        ],
        answer: 0,
        explanation:
          "The abbreviation in parentheses is the part of speech, and n. stands for noun. Origin and pronunciation are separate parts of the entry.",
      },
    },
    {
      id: "library-entry-parts",
      title: "Parts of a library entry",
      blocks: [
        {
          kind: "concept",
          body: "Library and catalog entries work the same way, but they describe a source rather than a word. Their job is to get you to a book on a shelf.",
        },
        {
          kind: "rule",
          title: "What a library entry lists",
          items: [
            "The title of the source",
            "The author",
            "The call number, which tells you where the source sits on the shelf",
            "Publication details, such as the publisher and the year",
          ],
        },
        {
          kind: "tip",
          body: "When a question asks where to find a book, look for the call number. Title and author identify the source; only the call number locates it.",
        },
      ],
      quickCheck: {
        prompt:
          "You have found a book in the library catalog and want to know where it sits on the shelf. Which part of the entry do you use?",
        choices: [
          "The title",
          "The author",
          "The call number",
          "The publication year",
        ],
        answer: 2,
        explanation:
          "The call number is the shelf location. The other parts identify the source but do not tell you where it is.",
      },
    },
    {
      id: "how-tested",
      title: "How the TEAS tests it",
      blocks: [
        {
          kind: "concept",
          body: "You are given a sample entry and asked a question about it. You are not expected to know the word or the book already, and everything you need is printed in the entry.",
        },
        {
          kind: "rule",
          title: "Questions you will see",
          items: [
            "Which numbered meaning fits this sentence?",
            "What part of speech is this word?",
            "Which call number would you use to find this book?",
          ],
        },
        {
          kind: "mistake",
          body: "Do not answer from what you already know about the word. Use only the meanings the entry actually lists, even if you would define the word differently.",
        },
      ],
      quickCheck: {
        prompt:
          "A TEAS question shows a dictionary entry and asks which meaning fits a sentence. Where should the answer come from?",
        choices: [
          "Your own knowledge of the word",
          "The numbered meanings printed in the entry",
          "The word's origin",
          "The first meaning listed, since it is the most common",
        ],
        answer: 1,
        explanation:
          "The entry supplies the meanings, and the correct one is always among them. The first meaning is not automatically the right fit.",
      },
    },
    {
      id: "choosing-the-meaning",
      title: "Choosing the meaning that fits",
      blocks: [
        {
          kind: "concept",
          body: "When an entry lists several meanings, the sentence decides which one applies. Read the sentence, see how the word is being used, then test the numbered meanings against that use.",
        },
        {
          kind: "rule",
          title: "How to pick the right meaning",
          ordered: true,
          items: [
            "Find how the word is acting in the sentence, and note its part of speech",
            "Rule out any meanings under a different part of speech",
            "Substitute each remaining meaning into the sentence",
            "Keep the one that leaves the sentence making sense",
          ],
        },
        {
          kind: "example",
          title: "Which meaning fits?",
          expression: "chart (n.) 1. a sheet of information in table form 2. a patient's medical record",
          steps: [
            {
              note: "Read the sentence and see how the word is used.",
              work: ["She updated his chart after rounds."],
            },
            {
              note: "Chart is a thing being updated, so it is acting as a noun. Both listed meanings are nouns, so neither is ruled out yet.",
              work: [],
            },
            {
              note: "Substitute each meaning. A sheet of information in table form does not fit updating after rounds; a patient's medical record does.",
              work: [
                "1. She updated his sheet of information in table form.",
                "2. She updated his medical record.",
              ],
            },
          ],
          answer: "Meaning 2 fits.",
        },
        {
          kind: "tip",
          body: "Match the part of speech first. If the word is acting as a noun in the sentence, only consider the noun meanings in the entry.",
        },
        {
          kind: "mistake",
          body: "Do not choose meaning 1 by default. The numbers separate senses; they do not rank which one your sentence needs.",
        },
      ],
      quickCheck: {
        prompt:
          "Given chart (n.) 1. a sheet of information in table form 2. a patient's medical record, which meaning fits: The nurse posted a chart of the weekly staffing hours.",
        choices: [
          "Meaning 1, a sheet of information in table form",
          "Meaning 2, a patient's medical record",
          "Both meanings fit equally",
          "Neither meaning fits",
        ],
        answer: 0,
        explanation:
          "Staffing hours laid out by week is information in table form, so meaning 1 fits. Nothing in the sentence involves a patient.",
      },
    },
  ],
};
