import type { GuidedLesson } from "../guided-lesson-types";

/**
 * Guided lesson for ENGLISH / knowledge-language / "Stages of the Writing
 * Process". Content carried over from the flat skill-lesson blocks,
 * restructured into the concept / rule / example / mistake / quick check
 * pattern. Quick checks are informal and never touch mastery.
 */
export const STAGES_OF_THE_WRITING_PROCESS: GuidedLesson = {
  section: "ENGLISH",
  topic: "knowledge-language",
  skill: "Stages of the Writing Process",
  slug: "stages-of-the-writing-process",
  title: "The Writing Process",
  summary:
    "The writing process moves through five stages: prewriting, drafting, revising, editing, and publishing.",
  minutes: [8, 10],
  objectives: [
    "Name the five stages of the writing process in order",
    "Match a described writing action to the stage it belongs to",
    "Separate revising from editing by what each one changes",
    "Put a scrambled list of stages back into sequence",
  ],
  sections: [
    {
      id: "five-stages",
      title: "The five stages",
      blocks: [
        {
          kind: "concept",
          body: "Writing is treated as a process rather than a single act. You plan before you write, and you improve what you wrote in two separate passes before anyone else sees it.\n\nThe stages run in a fixed order, and each one has its own job. Knowing the job of each stage is what lets you place an action correctly.",
        },
        {
          kind: "rule",
          title: "The five stages, in order",
          ordered: true,
          items: [
            "Prewriting: brainstorm ideas, gather information, and plan or outline",
            "Drafting: write the first version, getting ideas down",
            "Revising: improve content, organization, and clarity of ideas",
            "Editing: fix grammar, spelling, punctuation, and mechanics",
            "Publishing: share the finished, polished piece",
          ],
        },
        {
          kind: "tip",
          body: "Read the list as a shape: planning comes first, polishing comes last, and the messy work of getting ideas down sits in the middle. Nothing is shared until it has been through both improvement passes.",
        },
      ],
      quickCheck: {
        prompt: "Which stage comes immediately after drafting?",
        choices: ["Prewriting", "Revising", "Editing", "Publishing"],
        answer: 1,
        explanation:
          "The order is prewriting, drafting, revising, editing, publishing. Revising follows drafting, because you improve the ideas before you correct the surface errors.",
      },
    },
    {
      id: "revising-vs-editing",
      title: "Revising vs editing",
      blocks: [
        {
          kind: "concept",
          body: "Revising and editing both happen after the draft, so they are the two stages most often confused. They are separated by what the change touches.\n\nRevising changes ideas and structure: what you say, in what order, and how clearly. Editing fixes surface errors like commas and spelling, and leaves the meaning alone.",
        },
        {
          kind: "rule",
          title: "The one question that sorts them",
          intro: "Ask what the action changed:",
          items: [
            "If the action changes meaning, content, or organization, it is revising",
            "If the action corrects grammar, spelling, punctuation, or mechanics, it is editing",
          ],
        },
        {
          kind: "mistake",
          body: "Students often call any change to a finished draft editing, because that is how the word is used in everyday speech. On the TEAS, cutting a weak paragraph or reordering an argument is revising, not editing, even though it happens to a draft you already wrote.",
        },
      ],
      quickCheck: {
        prompt:
          "A writer replaces a vague paragraph with a clearer explanation of her main point. Which stage is this?",
        choices: ["Prewriting", "Drafting", "Revising", "Editing"],
        answer: 2,
        explanation:
          "The change improves the clarity of the ideas, so it is revising. Editing would only correct surface errors such as a misplaced comma or a misspelled word.",
      },
    },
    {
      id: "placing-actions",
      title: "Placing an action",
      blocks: [
        {
          kind: "concept",
          body: "A typical question describes one thing a writer did and asks which stage it belongs to. Work from the action itself: name what the writer produced or changed, then match it to the stage that has that job.",
        },
        {
          kind: "example",
          title: "Two actions from one student's paper",
          steps: [
            {
              note: "Start with what she does before any sentences exist.",
              work: [
                "She lists every fact she knows about diabetes.",
                "She groups the facts before writing.",
                "No draft exists yet; this is gathering and planning.",
              ],
              becomes: "Prewriting",
            },
            {
              note: "Now an action taken on the finished draft. Ask what it changed.",
              work: [
                "She rereads her draft and moves a paragraph.",
                "The argument now flows better.",
                "Organization changed, not spelling or punctuation.",
              ],
              becomes: "Revising",
            },
          ],
          answer:
            "Listing and grouping facts is prewriting; moving a paragraph to improve the flow is revising.",
        },
        {
          kind: "tip",
          body: "Timing alone will not settle it, since revising and editing both happen after the draft. Let the timing narrow the field, then let the sorting question (meaning or surface?) finish the job.",
        },
      ],
      quickCheck: {
        prompt:
          "Before writing anything, a student sketches an outline of the points she plans to cover. Which stage is this?",
        choices: ["Prewriting", "Drafting", "Revising", "Publishing"],
        answer: 0,
        explanation:
          "Planning and outlining are part of prewriting, which happens before any draft exists. Drafting would mean actually writing the first version.",
      },
    },
    {
      id: "ordering-questions",
      title: "Putting the stages in order",
      blocks: [
        {
          kind: "concept",
          body: "The other common question form gives you the stages scrambled and asks for the correct sequence. Because the order is fixed, you can rebuild it from the two ends inward.\n\nPlanning is first and sharing is last. That fixes prewriting and publishing, leaving drafting, revising, and editing to fill the middle in that order.",
        },
        {
          kind: "rule",
          title: "Rebuilding the order",
          ordered: true,
          items: [
            "Place prewriting first: it is the only stage with no draft yet",
            "Place publishing last: it is the only stage where someone else reads it",
            "Place drafting next, since revising and editing both need a draft to work on",
            "Finish with revising then editing: ideas first, surface errors last",
          ],
        },
        {
          kind: "mistake",
          body: "Do not put editing before revising. Correcting commas in a paragraph you are about to cut wastes the work, which is why the surface pass comes after the ideas have settled.",
        },
      ],
      quickCheck: {
        prompt:
          "Which list shows the five stages in the correct order?",
        choices: [
          "Prewriting, drafting, editing, revising, publishing",
          "Prewriting, drafting, revising, editing, publishing",
          "Drafting, prewriting, revising, editing, publishing",
          "Prewriting, revising, drafting, editing, publishing",
        ],
        answer: 1,
        explanation:
          "Planning comes first and sharing comes last, and between them the draft is written, then improved for ideas (revising), then corrected for errors (editing).",
      },
    },
  ],
};
