import type { GuidedLesson } from "../guided-lesson-types";

/** Guided lesson for MATH / measurement-data / "Interpret Relevant Information
 *  from Tables, Charts, and Graphs". Content carried over from the flat
 *  skill-lesson blocks, restructured into the concept / rule / example /
 *  mistake / quick check pattern. */
export const INTERPRET_TABLES_CHARTS_GRAPHS: GuidedLesson = {
  section: "MATH",
  topic: "measurement-data",
  skill: "Interpret Relevant Information from Tables, Charts, and Graphs",
  slug: "interpret-relevant-information-from-tables-charts-and-graphs",
  title: "Interpreting Tables, Charts, and Graphs",
  summary:
    "Read values from bar graphs, line graphs, and tables, tell the independent from the dependent variable, and label a graph correctly.",
  minutes: [8, 10],
  objectives: [
    "Read a value from a table, a bar graph, or a line graph",
    "Check a display's title, axis labels, units, and scale before answering",
    "Identify the independent and dependent variables and place them on the correct axes",
    "Compare values across a graph to answer questions about differences and change",
    "Label a new graph with a title, axis labels, units, and an even scale",
  ],
  sections: [
    {
      id: "reading-displays",
      title: "How to read each display",
      blocks: [
        {
          kind: "concept",
          body: "Tables, bar graphs, and line graphs all answer the same kind of question: what is the value here? Each display just stores that value in a different place, so each has its own reading move.",
        },
        {
          kind: "tabs",
          tabs: [
            {
              label: "Tables",
              blocks: [
                {
                  kind: "concept",
                  body: "Find the row and the column the question names, then read the cell where they meet. Check the headers and units first so you know what each row and column means.",
                },
              ],
            },
            {
              label: "Bar graphs",
              blocks: [
                {
                  kind: "concept",
                  body: "Each bar's height (or length) is a quantity. Trace the top of the bar straight across to the value axis to read it.",
                },
              ],
            },
            {
              label: "Line graphs",
              blocks: [
                {
                  kind: "concept",
                  body: "Each point is a value at one input or time. Find the input on the horizontal axis, go straight up to the line, then straight left to read the value. Lines are best for showing change over time.",
                },
              ],
            },
          ],
        },
        {
          kind: "rule",
          title: "Before you read any value",
          ordered: true,
          items: [
            "Read the title to know the topic",
            "Read both axis labels and their units",
            "Watch the scale: gridlines may count by 2, 5, 10, or 100, not by 1",
          ],
        },
        {
          kind: "mistake",
          body: "Do not assume each gridline equals 1. A bar that reaches the third gridline on a count-by-10 scale shows 30, not 3.",
        },
      ],
      quickCheck: {
        prompt:
          "On a bar graph, the value axis counts by 5s. A bar reaches the fourth gridline above zero. What value does the bar show?",
        choices: ["4", "5", "20", "45"],
        answer: 2,
        explanation:
          "Each gridline is worth 5, so the fourth gridline marks 4 × 5 = 20. Reading it as 4 assumes the scale counts by 1.",
      },
    },
    {
      id: "independent-dependent",
      title: "Independent vs dependent variable",
      blocks: [
        {
          kind: "concept",
          body: "The independent variable is the input you control or that changes on its own (often time). It goes on the horizontal x-axis.\n\nThe dependent variable is the output that responds; its value depends on the independent variable. It goes on the vertical y-axis.",
        },
        {
          kind: "tip",
          body: 'Quick test: fill in "___ depends on ___." The first blank is the dependent variable, the second is the independent variable.',
        },
        {
          kind: "example",
          title: "Sorting two real pairs",
          steps: [
            {
              note: "Medication dose vs blood pressure: blood pressure depends on dose, so dose is independent (x) and blood pressure is dependent (y).",
              work: ["dose: x-axis", "blood pressure: y-axis"],
            },
            {
              note: "Hours studied vs test score: the score depends on the hours, so hours is independent (x) and score is dependent (y).",
              work: ["hours studied: x-axis", "test score: y-axis"],
            },
          ],
          answer: "The input goes on x; the responding value goes on y.",
        },
      ],
      quickCheck: {
        prompt:
          "A graph tracks a patient's temperature every hour after surgery. Which variable is independent, and which axis does it take?",
        choices: [
          "Temperature, on the x-axis",
          "Temperature, on the y-axis",
          "Time, on the x-axis",
          "Time, on the y-axis",
        ],
        answer: 2,
        explanation:
          "Temperature depends on time, so time is the independent variable and belongs on the horizontal x-axis; temperature goes on the y-axis.",
      },
    },
    {
      id: "line-graph-example",
      title: "Worked example: reading a line graph",
      blocks: [
        {
          kind: "concept",
          body: "Comparison questions ask you to read two values from the same display and combine them, usually by subtracting. Read each value carefully first; the arithmetic is the easy part.",
        },
        {
          kind: "example",
          title:
            "A clinic line graph shows patients seen each day: Mon 20, Tue 35, Wed 30, Thu 45, Fri 40. How many more patients were seen Thursday than Monday?",
          steps: [
            {
              note: "Read Thursday's point from the graph.",
              work: ["Thursday = 45"],
            },
            {
              note: "Read Monday's point from the graph.",
              work: ["Monday = 20"],
            },
            {
              note: "Subtract to find how many more.",
              work: ["45 − 20 = 25"],
            },
          ],
          answer: "25 more patients on Thursday",
        },
      ],
      quickCheck: {
        prompt:
          "Using the same graph (Mon 20, Tue 35, Wed 30, Thu 45, Fri 40), how many more patients were seen Friday than Wednesday?",
        choices: ["5", "10", "15", "70"],
        answer: 1,
        explanation:
          "Friday is 40 and Wednesday is 30, so 40 − 30 = 10. Choosing 70 adds the two values instead of subtracting.",
      },
    },
    {
      id: "creating-labeling",
      title: "Creating and labeling a graph",
      blocks: [
        {
          kind: "rule",
          title: "To build a clear graph",
          items: [
            "Give it a title stating what is shown",
            "Put the independent variable on the x-axis, labeled with units",
            "Put the dependent variable on the y-axis, labeled with units",
            "Choose an even scale that fits all the data, with equal spacing between gridlines",
            "Use bars for categories or counts; use a line for change over time",
          ],
        },
        {
          kind: "tip",
          body: "If a value lands between gridlines, estimate by how far between them it falls. Always answer using the graph's own scale, not by assuming each line equals 1.",
        },
      ],
      quickCheck: {
        prompt:
          "You are graphing the number of flu cases recorded each month for a year. Which display and setup fit best?",
        choices: [
          "A line graph with months on the x-axis and cases on the y-axis",
          "A line graph with cases on the x-axis and months on the y-axis",
          "A bar graph with a scale that skips from 10 to 50 to 60",
          "A table with no column headers, since the numbers speak for themselves",
        ],
        answer: 0,
        explanation:
          "Change over time calls for a line graph, with time (the independent variable) on x and cases (the dependent variable) on y. A scale must use equal spacing, and headers are required.",
      },
    },
  ],
};
