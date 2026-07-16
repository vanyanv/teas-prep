import type { GuidedLesson } from "../guided-lesson-types";

/**
 * Guided lesson for READING / key-ideas-details / "Identify Information From a
 * Graphic". Content carried over from the flat skill-lesson blocks,
 * restructured into the concept / rule / example / mistake / quick check
 * pattern. Quick checks are informal and never touch mastery.
 */
export const IDENTIFY_INFORMATION_FROM_A_GRAPHIC: GuidedLesson = {
  section: "READING",
  topic: "key-ideas-details",
  skill: "Identify Information From a Graphic",
  slug: "identify-information-from-a-graphic",
  title: "Identify Information From a Graphic",
  summary:
    "Read and interpret charts, tables, graphs, diagrams, and labels to find requested data.",
  minutes: [6, 8],
  objectives: [
    "Name the parts of a graphic and what each one tells you",
    "Orient yourself with the title, axis labels, units, and legend before reading values",
    "Read a single value off a table, bar graph, or line graph",
    "Compare categories and identify the largest, smallest, or trending value",
    "Avoid misreading units and legends",
  ],
  sections: [
    {
      id: "graphic-anatomy",
      title: "The parts of a graphic",
      blocks: [
        {
          kind: "concept",
          body: "Graphics present information visually instead of in sentences. The TEAS uses tables, bar graphs, line graphs, pie charts, diagrams, and keys.\n\nEvery graphic is built from the same few parts, and each part answers a different question. Reading a graphic means using those parts to locate a value or compare items, not guessing from the picture's shape.",
        },
        {
          kind: "rule",
          title: "What each part tells you",
          items: [
            "Title: what the whole graphic is about",
            "Axis labels: what each direction measures (categories across, amounts up)",
            "Units: what the numbers count, such as cups, grams, or percent",
            "Legend or key: what each color, pattern, or line stands for",
            "Data: the bars, points, slices, or cells themselves",
          ],
        },
        {
          kind: "tip",
          body: "Before reading any value, read the title, both axis labels, and the legend. That takes a few seconds and tells you exactly what each number means and what unit it is in.",
        },
      ],
      quickCheck: {
        prompt:
          "A bar graph uses blue bars and green bars. Which part of the graphic tells you what the two colors represent?",
        choices: [
          "The title",
          "The legend",
          "The vertical axis label",
          "The horizontal axis label",
        ],
        answer: 1,
        explanation:
          "The legend, or key, is what assigns meaning to each color, pattern, or line. The title names the overall topic, and the axis labels tell you what is being measured.",
      },
    },
    {
      id: "question-types",
      title: "How the TEAS tests it",
      blocks: [
        {
          kind: "concept",
          body: "The questions stay close to the graphic. You are not asked to explain the data or bring in outside knowledge; you are asked to find something that is already there.",
        },
        {
          kind: "rule",
          title: "What you will be asked to do",
          items: [
            "Read off a single value for one category",
            "Compare two categories to see which is greater",
            "Find a trend, such as whether values rise or fall over time",
            "Identify the largest or smallest amount shown",
          ],
        },
        {
          kind: "mistake",
          body: "Misreading the axis units or the legend is the most common error. If the axis counts in tens, a bar reaching the third gridline is 30, not 3. If the legend assigns blue to Week 1, reading a green bar answers a question no one asked.",
        },
      ],
      quickCheck: {
        prompt:
          "A question asks which month had the fewest clinic visits. What are you being asked to do?",
        choices: [
          "Explain why visits dropped that month",
          "Identify the smallest amount shown",
          "Find the trend across all months",
          "Compare two specific months",
        ],
        answer: 1,
        explanation:
          "Fewest asks you to identify the smallest amount in the graphic: find the shortest bar or lowest point. The graphic shows what happened, not why.",
      },
    },
    {
      id: "reading-values",
      title: "Reading and comparing values",
      blocks: [
        {
          kind: "concept",
          body: "Work the graphic in a fixed order: orient yourself, decide what the question wants, then go to the data and read it. Locating a value means matching a category on one axis to an amount on the other.",
        },
        {
          kind: "rule",
          title: "A reliable order of work",
          ordered: true,
          items: [
            "Read the title, axis labels, units, and legend",
            "Reread the question and name what it wants: one value, a comparison, a trend, or an extreme",
            "Find the category in the graphic",
            "Read its amount and attach the unit",
          ],
        },
        {
          kind: "example",
          title: "Which day had the most water?",
          expression: "Bar graph: daily water intake, in cups",
          steps: [
            {
              note: "Orient first. The title is daily water intake and the vertical axis is measured in cups, so every number is a count of cups.",
              work: [
                "Monday: 6 cups",
                "Tuesday: 8 cups",
                "Wednesday: 5 cups",
              ],
            },
            {
              note: "The question asks for the most, so you want the largest amount: the tallest bar.",
              work: ["Tallest bar: Tuesday"],
            },
            {
              note: "Read that bar's value and attach the unit.",
              work: ["Tuesday = 8 cups"],
              becomes: "Tuesday, at 8 cups",
            },
          ],
          answer: "Tuesday, at 8 cups",
        },
        {
          kind: "example",
          title: "A comparison uses the same graphic",
          steps: [
            {
              note: "How many more cups were taken on Monday than on Wednesday? Read both values, then subtract.",
              work: ["Monday = 6 cups", "Wednesday = 5 cups", "6 − 5 = 1"],
            },
          ],
          answer: "1 more cup on Monday",
        },
        {
          kind: "mistake",
          body: "Do not answer with the category when the question wants the amount, or with the amount when it wants the category. Most is Tuesday; how much is 8 cups. Check which one the question asked for.",
        },
      ],
      quickCheck: {
        prompt:
          "Using the same graph (Monday 6 cups, Tuesday 8, Wednesday 5), which day had the least water, and how much?",
        choices: [
          "Wednesday, 5 cups",
          "Monday, 6 cups",
          "Wednesday, 8 cups",
          "Tuesday, 8 cups",
        ],
        answer: 0,
        explanation:
          "Least means the smallest amount, so find the shortest bar: Wednesday, at 5 cups. Tuesday's 8 cups is the most, not the least.",
      },
    },
  ],
};
