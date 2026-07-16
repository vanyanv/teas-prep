import type { GuidedLesson } from "../guided-lesson-types";

/**
 * Guided lesson for ENGLISH / knowledge-language / "Matching Sentences to
 * Types of Writing". Content carried over from the flat skill-lesson blocks,
 * restructured into the concept / rule / example / mistake / quick check
 * pattern. Quick checks are informal and never touch mastery.
 */
export const MATCHING_SENTENCES_TO_TYPES_OF_WRITING: GuidedLesson = {
  section: "ENGLISH",
  topic: "knowledge-language",
  skill: "Matching Sentences to Types of Writing",
  slug: "matching-sentences-to-types-of-writing",
  title: "Types of Writing",
  summary:
    "The four main writing types are narrative, expository, persuasive, and technical, each with its own purpose.",
  minutes: [8, 10],
  objectives: [
    "Name the purpose behind each of the four writing types",
    "Match a single sentence to the type it belongs to",
    "Separate a neutral explanation from an argument",
    "Use the writer's goal to name the type quickly",
  ],
  sections: [
    {
      id: "what-it-is",
      title: "The four types",
      blocks: [
        {
          kind: "concept",
          body: "Writing is grouped by its main purpose. Two sentences can cover the same subject and still belong to different types, because the type is set by what the writer is trying to do, not by the topic.",
        },
        {
          kind: "rule",
          title: "The four writing types",
          intro: "Each type exists to do one job:",
          items: [
            "Narrative tells a story or recounts events.",
            "Expository explains or informs without taking sides.",
            "Persuasive argues a position and tries to convince.",
            "Technical gives precise instructions or specialized procedures.",
          ],
        },
        {
          kind: "concept",
          body: "Notice how close expository and persuasive can sit. Both can discuss the flu vaccine. Expository would report how the vaccine works; persuasive would tell you to go get one.",
        },
      ],
      quickCheck: {
        prompt: "Which type of writing explains or informs without taking sides?",
        choices: ["Narrative", "Expository", "Persuasive", "Technical"],
        answer: 1,
        explanation:
          "Expository writing informs, and it stays neutral. Persuasive writing takes a side, narrative recounts events, and technical gives procedures.",
      },
    },
    {
      id: "how-tested",
      title: "How the TEAS tests it",
      blocks: [
        {
          kind: "concept",
          body: "You read one sentence and identify which type of writing it fits. There is no passage to lean on, so the sentence itself has to tell you its purpose.\n\nMatch by purpose: a story moment is narrative, a neutral explanation is expository, an opinion with a call to act is persuasive, and a step or specification is technical.",
        },
        {
          kind: "rule",
          title: "How to work the question",
          ordered: true,
          items: [
            "Read the sentence and ask what the writer wants from you",
            "Name that goal: to tell, to explain, to convince, or to instruct",
            "Match the goal to its type and eliminate the rest",
          ],
        },
        {
          kind: "tip",
          body: "Subject matter is not the clue. A sentence about a catheter could be narrative, expository, persuasive, or technical depending on what it does with the catheter.",
        },
      ],
      quickCheck: {
        prompt:
          "You are given one sentence with no surrounding passage. What decides its writing type?",
        choices: [
          "The subject the sentence is about",
          "Whether the sentence is long or short",
          "The purpose the sentence is trying to serve",
          "Whether the sentence uses specialized vocabulary",
        ],
        answer: 2,
        explanation:
          "Type is set by purpose. The same subject or vocabulary can appear in any of the four types, so only the writer's goal separates them.",
      },
    },
    {
      id: "worked-example",
      title: "Matching two sentences",
      blocks: [
        {
          kind: "concept",
          body: "The two sentences below both come from a clinical setting. They do very different jobs.",
        },
        {
          kind: "example",
          title: "Name the type",
          steps: [
            {
              note: "Take the first sentence and ask what it is doing.",
              work: [
                "\"Insert the catheter slowly to the marked line, then secure it with tape.\"",
                "It gives an exact procedure to carry out.",
              ],
              becomes: "Technical",
            },
            {
              note: "Now the second sentence. It makes a claim and pushes you toward an action.",
              work: [
                "\"Every nurse should get the flu vaccine to protect patients.\"",
                "Should signals a recommendation, not a procedure.",
              ],
              becomes: "Persuasive",
            },
          ],
          answer:
            "The first is technical (an exact procedure); the second is persuasive (an argued position).",
        },
        {
          kind: "mistake",
          body: "Do not call the second sentence technical just because it mentions a clinical topic and sounds like an instruction. It urges a choice rather than specifying how to perform a task, which makes it persuasive.",
        },
      ],
      quickCheck: {
        prompt:
          "\"Set the drip rate to 20 drops per minute before leaving the room.\" Which type is this?",
        choices: ["Narrative", "Expository", "Persuasive", "Technical"],
        answer: 3,
        explanation:
          "The sentence gives a precise step with a specification to follow, which is technical writing. It neither argues a position nor recounts an event.",
      },
    },
    {
      id: "goal-first",
      title: "Decide the goal first",
      blocks: [
        {
          kind: "concept",
          body: "Decide the writer's goal first: to tell, to explain, to convince, or to instruct. The goal names the type. If you start by hunting for the type, you tend to get pulled toward whichever type the topic reminds you of.",
        },
        {
          kind: "rule",
          title: "Goal to type",
          intro: "Once you can name the goal, the type follows directly:",
          items: [
            "To tell what happened: narrative",
            "To explain neutrally: expository",
            "To convince: persuasive",
            "To instruct precisely: technical",
          ],
        },
        {
          kind: "example",
          title: "One topic, four goals",
          steps: [
            {
              note: "Recount an event, and the goal is to tell.",
              work: ["\"On my first night shift, I gave my first injection.\""],
              becomes: "Narrative",
            },
            {
              note: "Report how something works, with no side taken.",
              work: ["\"The vaccine trains the immune system to recognize the virus.\""],
              becomes: "Expository",
            },
            {
              note: "Argue for a choice.",
              work: ["\"Clinics ought to offer the vaccine free of charge.\""],
              becomes: "Persuasive",
            },
            {
              note: "Specify how to do the task.",
              work: ["\"Inject 0.5 mL into the deltoid at a 90 degree angle.\""],
              becomes: "Technical",
            },
          ],
          answer:
            "The topic stayed the same across all four; the goal changed, and the goal set the type.",
        },
      ],
      quickCheck: {
        prompt:
          "A sentence's goal is to convince the reader to change a policy. Which type is it?",
        choices: ["Expository", "Persuasive", "Technical", "Narrative"],
        answer: 1,
        explanation:
          "Convincing is the persuasive goal. Expository would explain the policy neutrally, and technical would specify how to carry it out.",
      },
    },
  ],
};
