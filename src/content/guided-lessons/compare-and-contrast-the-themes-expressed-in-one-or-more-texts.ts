import type { GuidedLesson } from "../guided-lesson-types";

/**
 * Guided lesson for READING / integration-knowledge / "Compare and Contrast the
 * Themes Expressed in One or More Texts". Content carried over from the flat
 * skill-lesson blocks, restructured into the concept / rule / example / mistake
 * / quick check pattern. Quick checks are informal and never touch mastery.
 */
export const COMPARE_CONTRAST_THEMES: GuidedLesson = {
  section: "READING",
  topic: "integration-knowledge",
  skill: "Compare and Contrast the Themes Expressed in One or More Texts",
  slug: "compare-and-contrast-the-themes-expressed-in-one-or-more-texts",
  title: "Comparing and Contrasting Themes",
  summary:
    "Identify the central messages of passages and judge how those messages are alike and different.",
  minutes: [8, 10],
  objectives: [
    "State the theme of a passage as a general idea rather than a plot summary",
    "Distinguish theme from subject, topic, and plot",
    "Identify a message two texts share",
    "Explain how two texts treat the same idea differently",
  ],
  sections: [
    {
      id: "what-a-theme-is",
      title: "What a theme is",
      blocks: [
        {
          kind: "concept",
          body: "A theme is the broad idea or lesson a text conveys, such as resilience or the cost of ambition. It is what the text is saying about its subject, not the events themselves.\n\nComparing themes means spotting where two texts share a message. Contrasting them means noting where the messages differ.",
        },
        {
          kind: "rule",
          title: "Theme is not the same as plot",
          items: [
            "Theme is general: it could apply to other texts and other lives",
            "Plot is specific: it is the sequence of events in this text only",
            "A subject (courage, family, loss) is a topic, not yet a theme",
            "A theme states something about that subject",
          ],
        },
        {
          kind: "example",
          title: "From plot to theme",
          steps: [
            {
              note: "Start with what happens, which is plot, not theme.",
              work: ["A runner finishes a race despite an injury."],
            },
            {
              note: "Name the subject the events circle around.",
              work: ["Subject: perseverance"],
            },
            {
              note: "Say what the text claims about that subject. That is the theme.",
              work: ["Theme: effort can carry a person past physical limits."],
            },
          ],
          answer: "Theme: effort can carry a person past physical limits.",
        },
        {
          kind: "mistake",
          body: "Retelling the story is not stating a theme. If your answer names specific characters or events, you are still describing plot.",
        },
      ],
      quickCheck: {
        prompt:
          "A passage describes a nurse working double shifts through a long winter to keep a small clinic open. Which statement is a theme rather than a plot summary?",
        choices: [
          "A nurse works double shifts all winter long",
          "The clinic stays open through the winter",
          "Devotion to others can outlast personal exhaustion",
          "The winter in the passage is unusually long",
        ],
        answer: 2,
        explanation:
          "A theme is a general idea that could apply beyond this text. The other choices name the specific events, which is plot.",
      },
    },
    {
      id: "how-teas-tests-it",
      title: "How the TEAS tests it",
      blocks: [
        {
          kind: "concept",
          body: "You may see one passage or two short ones. Questions ask which statement captures a shared theme, or how the texts treat the same idea differently.\n\nTwo authors can write about the same subject and still send different messages. One may be hopeful while another is cautious about that subject, and the question often turns on exactly that gap.",
        },
        {
          kind: "rule",
          title: "What the answer choices are doing",
          items: [
            "The correct choice is general and true of the text",
            "A common wrong choice is a plot detail, true but too specific",
            "Another wrong choice is a theme that is general but not in the text",
            "Another names the subject only, without saying anything about it",
          ],
        },
        {
          kind: "tip",
          body: "Test a candidate theme by asking whether it could describe a different story too. If it cannot, it is probably plot.",
        },
      ],
      quickCheck: {
        prompt:
          "Two passages both discuss new technology in hospitals. One praises the time it saves; the other warns it distances staff from patients. What does this show?",
        choices: [
          "The passages have no shared subject",
          "The passages share a subject but express different themes",
          "One of the passages has no theme",
          "The passages express the same theme in different words",
        ],
        answer: 1,
        explanation:
          "Both texts are about the same subject, hospital technology, but one author is hopeful and the other cautious, so the messages differ.",
      },
    },
    {
      id: "comparing-two-texts",
      title: "Comparing and contrasting two texts",
      blocks: [
        {
          kind: "concept",
          body: "Work out each text's theme on its own first. Only then line the two up. Texts can share a theme while arriving at it through very different material, and that difference is usually what the contrast question asks about.",
        },
        {
          kind: "example",
          title: "A runner and a student",
          steps: [
            {
              note: "Read the first text and name its theme.",
              work: [
                "Text 1: a runner finishes a race despite an injury.",
                "Theme: perseverance",
              ],
            },
            {
              note: "Read the second text and name its theme, independently.",
              work: [
                "Text 2: a student retakes an exam after failing.",
                "Theme: perseverance",
              ],
            },
            {
              note: "Compare: the shared message is the overlap.",
              work: ["Both texts share the theme of perseverance."],
            },
            {
              note: "Contrast: name how each text expresses that shared theme.",
              work: [
                "Text 1 stresses physical endurance.",
                "Text 2 stresses academic determination.",
              ],
            },
          ],
          answer:
            "Shared theme: perseverance. The first text expresses it through physical endurance, the second through academic determination.",
        },
        {
          kind: "mistake",
          body: "Different settings do not mean different themes. A race and an exam have nothing in common on the surface, yet both texts say the same thing about not giving up.",
        },
      ],
      quickCheck: {
        prompt:
          "One passage follows a firefighter re-entering a burning building; another follows an immigrant learning a new language over years. Which statement best compares them?",
        choices: [
          "They share no theme, since one is dangerous and one is not",
          "They share the theme of courage, shown in a sudden act and in a long effort",
          "The first is about fire and the second is about language",
          "Both passages describe people who fail at what they attempt",
        ],
        answer: 1,
        explanation:
          "The shared theme is courage; the contrast lies in how each text expresses it, one in a single risky act and one sustained over years. Naming the subjects only, as in the third choice, stops short of a theme.",
      },
    },
    {
      id: "a-method-to-use",
      title: "A method you can use under time",
      blocks: [
        {
          kind: "concept",
          body: "Ask 'What big idea is each author getting at?' first, then line the two ideas up side by side to see the overlap and the gap. Doing this before you look at the answer choices keeps the distractors from steering you.",
        },
        {
          kind: "rule",
          title: "Four steps",
          ordered: true,
          items: [
            "Name each text's theme in your own words, in one short sentence",
            "Find the overlap: what do both authors say?",
            "Find the gap: where do the messages or their emphasis part ways?",
            "Choose the option that matches your sentence, not the one with familiar words",
          ],
        },
        {
          kind: "tip",
          body: "Answering in your own words before reading the choices is the whole habit. A choice that repeats phrases from the passage often just restates plot.",
        },
        {
          kind: "mistake",
          body: "Do not settle for a choice because it feels true in general. It must be a message the text actually sends, not a familiar saying about the subject.",
        },
      ],
      quickCheck: {
        prompt:
          "What should you do first when asked how two passages treat the same idea?",
        choices: [
          "Scan the answer choices for words that appeared in both passages",
          "Summarize the plot of each passage in order",
          "State each passage's theme in your own words, then compare them",
          "Decide which passage is better written",
        ],
        answer: 2,
        explanation:
          "Name each theme first, then line them up to find the overlap and the gap. Reading the choices first lets a plot-detail distractor pull you off course.",
      },
    },
  ],
};
