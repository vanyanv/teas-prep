import type { GuidedLesson } from "../guided-lesson-types";

/**
 * Guided lesson for READING / key-ideas-details / "Identify Information From a
 * Printed Communication". Content carried over from the flat skill-lesson
 * blocks, restructured into the concept / rule / example / mistake / quick
 * check pattern. Quick checks are informal and never touch mastery.
 */
export const IDENTIFY_INFORMATION_PRINTED_COMMUNICATION: GuidedLesson = {
  section: "READING",
  topic: "key-ideas-details",
  skill: "Identify Information From a Printed Communication",
  slug: "identify-information-from-a-printed-communication",
  title: "Information From a Printed Communication",
  summary:
    "Pull accurate facts from everyday documents like memos, emails, letters, labels, and notices.",
  minutes: [6, 8],
  objectives: [
    "Recognize the common types of printed communication",
    "Identify the sender, audience, and purpose of a document",
    "Locate the action requested and any deadline",
    "Use headings, subject lines, and emphasis to find details quickly",
  ],
  sections: [
    {
      id: "what-it-is",
      title: "What a printed communication is",
      blocks: [
        {
          kind: "concept",
          body: "Printed communications are real-world texts written with a purpose rather than to tell a story. A memo, an email, a flyer, an appointment letter, and a product label are all printed communications.\n\nYou do not read them the way you read an essay. You read them for four things: who sent it, who it is for, what it asks you to do, and the key dates or details attached to that request.",
        },
        {
          kind: "rule",
          title: "Four questions to answer on any document",
          items: [
            "Who sent it?",
            "Who is it for (the audience)?",
            "What does it ask the reader to do?",
            "What dates, amounts, or specific details matter?",
          ],
        },
        {
          kind: "tip",
          body: "The audience is often narrower than it first looks. An email sent to a whole office may still address only one group, such as clinical staff.",
        },
      ],
      quickCheck: {
        prompt:
          "Which of these is a printed communication of the kind this skill covers?",
        choices: [
          "A short story about a nurse's first day",
          "A memo announcing a new sign-in procedure",
          "A poem about hospitals",
          "A novel chapter set in a clinic",
        ],
        answer: 1,
        explanation:
          "A memo is a real-world document written to inform or request action. The other choices are literary texts, not practical communications.",
      },
    },
    {
      id: "how-teas-tests-it",
      title: "How the TEAS tests it",
      blocks: [
        {
          kind: "concept",
          body: "The questions stay close to the document. You are asked about its purpose, its audience, the action it requests, or one specific detail such as a date or a location.\n\nEvery one of those answers is somewhere on the page. Your job is to find it, not to infer beyond it.",
        },
        {
          kind: "rule",
          title: "Where the answers hide",
          items: [
            "Subject line: usually states the purpose in a few words",
            "Header or greeting: names the sender and the audience",
            "Headings: divide the document into findable parts",
            "Dates: deadlines, appointment times, effective dates",
            "Bold or highlighted text: the writer marking what matters most",
          ],
        },
        {
          kind: "tip",
          body: "Read the subject line and any header first. They usually tell you the purpose, which makes locating the requested action or deadline much faster.",
        },
      ],
      quickCheck: {
        prompt:
          "You are asked for the purpose of a staff email. Where should you look first?",
        choices: [
          "The last sentence of the email",
          "The subject line",
          "The longest paragraph",
          "The list of recipients",
        ],
        answer: 1,
        explanation:
          "The subject line usually states the purpose in a few words, which is why it is the fastest place to start.",
      },
    },
    {
      id: "reading-one-in-practice",
      title: "Reading one in practice",
      blocks: [
        {
          kind: "concept",
          body: "Work through a short document the same way every time: purpose from the subject line, audience from the greeting, then the action and the deadline from the body.",
        },
        {
          kind: "example",
          title: 'A staff email: "What action is required?"',
          expression:
            '"Subject: Flu shots. All clinical staff must complete vaccination by November 15. Sign up at the front desk."',
          steps: [
            {
              note: "Read the subject line for the purpose.",
              work: ['"Subject: Flu shots"'],
              becomes: "Purpose: vaccination.",
            },
            {
              note: "Find the audience in the opening words of the body.",
              work: ['"All clinical staff"'],
              becomes: "Audience: clinical staff, not every employee.",
            },
            {
              note: "Find the verb that tells the reader what to do, plus its deadline.",
              work: [
                '"must complete vaccination"',
                '"by November 15"',
                '"Sign up at the front desk"',
              ],
              becomes:
                "Action: get a flu shot, signing up at the front desk, by November 15.",
            },
          ],
          answer:
            "Get a flu shot (sign up at the front desk) by November 15.",
        },
        {
          kind: "mistake",
          body: "Do not stop at the first thing the document mentions. The subject line names the topic, but the action and the deadline usually sit further down in the body.",
        },
      ],
      quickCheck: {
        prompt:
          'The email reads: "Subject: Flu shots. All clinical staff must complete vaccination by November 15. Sign up at the front desk." Who is required to act?',
        choices: [
          "Every employee at the site",
          "All clinical staff",
          "Only the front desk staff",
          "Patients scheduled before November 15",
        ],
        answer: 1,
        explanation:
          'The body names its audience directly: "All clinical staff." The front desk is only where sign-up happens, not who must act.',
      },
    },
  ],
};
