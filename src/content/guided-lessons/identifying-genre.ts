import type { GuidedLesson } from "../guided-lesson-types";

/**
 * Guided lesson for ENGLISH / knowledge-language / "Identifying Genre".
 * Content carried over from the flat skill-lesson blocks, restructured into
 * the concept / rule / example / mistake / quick check pattern. Quick checks
 * are informal and never touch mastery.
 */
export const IDENTIFYING_GENRE: GuidedLesson = {
  section: "ENGLISH",
  topic: "knowledge-language",
  skill: "Identifying Genre",
  slug: "identifying-genre",
  title: "Identifying Genre",
  summary:
    "Genre is the category a piece of writing belongs to, based on its form, content, and purpose.",
  minutes: [8, 10],
  objectives: [
    "Define genre in terms of form, content, and purpose",
    "Describe what sets fiction, nonfiction, poetry, and drama apart",
    "Use formatting signals such as stage directions and line breaks to name a genre",
    "Apply the real-or-invented and what-form questions to a short passage",
  ],
  sections: [
    {
      id: "what-it-is",
      title: "The common genres",
      blocks: [
        {
          kind: "concept",
          body: "Genre is the type or category of a text. Common genres include fiction, nonfiction, poetry, drama, biography, and reference writing.\n\nGenre is shaped by purpose and structure: what the writing is trying to do, and the form it takes on the page.",
        },
        {
          kind: "rule",
          title: "Four genres to know cold",
          items: [
            "Fiction tells an invented story.",
            "Nonfiction shares facts and real information.",
            "Poetry uses rhythm, line breaks, and figurative language.",
            "Drama is written to be performed, using dialogue and stage directions.",
          ],
        },
        {
          kind: "concept",
          body: "Biography and reference writing sit inside nonfiction: both deal in real information, but a biography tells the story of a real life while reference writing is organized to be looked up rather than read straight through.",
        },
      ],
      quickCheck: {
        prompt: "What two things shape a text's genre?",
        choices: [
          "Its length and its difficulty",
          "Its purpose and its structure",
          "Its author and its publication date",
          "Its vocabulary and its tone",
        ],
        answer: 1,
        explanation:
          "Genre comes from what the writing is for and the form it takes. Length, author, and vocabulary can vary widely inside a single genre.",
      },
    },
    {
      id: "how-tested",
      title: "How the TEAS tests it",
      blocks: [
        {
          kind: "concept",
          body: "You read a short passage and choose its genre, or you match a description to the correct genre.\n\nThe passage is usually short, so the fastest evidence is often visual: how the text is laid out on the page tells you as much as what it says.",
        },
        {
          kind: "rule",
          title: "Signals to look for",
          items: [
            "Stage directions and character names before each line point to drama.",
            "Line breaks and rhyme point to poetry.",
            "Dated personal entries point to a journal or memoir.",
            "Invented characters and a story being told point to fiction.",
            "Facts, explanation, and real information point to nonfiction.",
          ],
        },
        {
          kind: "tip",
          body: "Scan the shape of the passage before you read a word of it. Line breaks, speaker labels, and dates are visible at a glance and narrow the choices immediately.",
        },
      ],
      quickCheck: {
        prompt:
          "A passage lists a character name before each spoken line and includes bracketed notes about crossing the stage. What genre is it?",
        choices: ["Poetry", "Biography", "Drama", "Reference writing"],
        answer: 2,
        explanation:
          "Speaker labels and stage directions are the marks of a script, which is written to be performed. That combination points to drama.",
      },
    },
    {
      id: "worked-example",
      title: "Naming the genre of a passage",
      blocks: [
        {
          kind: "concept",
          body: "Work the passage below the way the test wants you to: check the form first, then check whether the content is real or invented.",
        },
        {
          kind: "example",
          title: "What genre is this?",
          steps: [
            {
              note: "Read the passage and note how it is laid out.",
              work: [
                "\"Nurse Patel checked the monitor, then turned to the new resident. 'Watch the heart rate,' she said, 'it is climbing too fast.'\"",
                "Continuous prose: no line breaks, no speaker labels, no stage directions.",
              ],
              becomes: "Not poetry and not drama",
            },
            {
              note: "Ask whether the content is real information or an invented story.",
              work: [
                "Named characters acting in a scene, with dialogue moving events along.",
                "Nothing here is being reported as a real, checkable event.",
              ],
              becomes: "An invented story, not a factual report",
            },
          ],
          answer:
            "Fiction. The invented characters and the dialogue advancing a story make this fiction, not a factual report.",
        },
        {
          kind: "mistake",
          body: "Dialogue alone does not make a passage drama. Fiction is full of dialogue too. Drama is marked by speaker labels and stage directions because it is written to be performed; quoted speech inside ordinary prose is just a story being told.",
        },
      ],
      quickCheck: {
        prompt:
          "Why is the Nurse Patel passage fiction rather than drama?",
        choices: [
          "It contains dialogue between two people",
          "It is set in a hospital",
          "It is written as prose, without speaker labels or stage directions",
          "It uses the past tense",
        ],
        answer: 2,
        explanation:
          "Both fiction and drama use dialogue, so dialogue cannot decide it. The prose form, with no speaker labels or stage directions, rules out drama.",
      },
    },
    {
      id: "two-questions",
      title: "The two-question test",
      blocks: [
        {
          kind: "concept",
          body: "When a passage does not announce itself, two quick questions usually pin down the genre fast.",
        },
        {
          kind: "rule",
          title: "Ask in this order",
          ordered: true,
          items: [
            "Is it real or invented?",
            "What form is it in?",
          ],
        },
        {
          kind: "concept",
          body: "The first question splits nonfiction and biography from fiction. The second sorts what is left by shape: line breaks give you poetry, speaker labels and stage directions give you drama, dated entries give you a journal or memoir, and plain prose leaves you with fiction or straight nonfiction.",
        },
        {
          kind: "example",
          title: "Two questions, one answer",
          steps: [
            {
              note: "Start with a passage of dated entries about the writer's own week on a ward.",
              work: [
                "\"March 4. The ward was short two nurses again tonight.\"",
                "Question one: the writer is recording her own real shifts.",
              ],
              becomes: "Real, so some form of nonfiction",
            },
            {
              note: "Now the form question narrows it inside nonfiction.",
              work: [
                "Dated personal entries, written as they happened.",
                "Not organized for looking up, and not the story of someone else's life.",
              ],
              becomes: "A journal",
            },
          ],
          answer:
            "A journal. Real content plus dated personal entries lands you there in two steps.",
        },
        {
          kind: "mistake",
          body: "Do not let the subject matter decide the genre for you. A passage about a hospital could be fiction, a memoir, a poem, or a reference entry. Only the real-or-invented question and the form question separate them.",
        },
      ],
      quickCheck: {
        prompt:
          "A passage describes real events from the author's own life and is broken into short rhyming lines. What genre is it?",
        choices: [
          "Poetry",
          "Biography",
          "Drama",
          "Reference writing",
        ],
        answer: 0,
        explanation:
          "The content is real, but the form question decides the label: line breaks and rhyme make it poetry. Real subject matter does not force a passage into nonfiction.",
      },
    },
  ],
};
