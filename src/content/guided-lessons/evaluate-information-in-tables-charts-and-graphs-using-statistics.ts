import type { GuidedLesson } from "../guided-lesson-types";

/** Guided lesson for MATH / measurement-data / "Evaluate Information in
 *  Tables, Charts, and Graphs Using Statistics". Content carried over from
 *  the flat skill-lesson blocks, restructured into the concept / rule /
 *  example / mistake / quick check pattern. */
export const TABLES_CHARTS_GRAPHS_STATISTICS: GuidedLesson = {
  section: "MATH",
  topic: "measurement-data",
  skill: "Evaluate Information in Tables, Charts, and Graphs Using Statistics",
  slug: "evaluate-information-in-tables-charts-and-graphs-using-statistics",
  title: "Evaluate Data Using Statistics",
  summary:
    "Find mean, median, mode, and range from lists, tables, and frequency tables, and apply them in word problems.",
  minutes: [8, 10],
  objectives: [
    "Compute the mean, median, mode, and range of a data set",
    "Find the median when a data set has an even count",
    "Calculate the mean from a frequency table",
    "Work backward from a known mean to find a missing value",
    "Choose between mean and median when data contains an outlier",
  ],
  sections: [
    {
      id: "core-measures",
      title: "The four core measures",
      blocks: [
        {
          kind: "concept",
          body: "Tables, charts, and graphs are summarized with four statistics. Three of them (mean, median, mode) describe the center of the data; the fourth (range) describes how spread out it is.",
        },
        {
          kind: "rule",
          title: "The four measures",
          items: [
            "Mean (average): add all values, then divide by how many there are. Mean = sum / count",
            "Median: the middle value once the data is sorted in order. With an even count, average the two middle values",
            "Mode: the value that appears most often. There can be no mode, one mode, or more than one",
            "Range: largest value minus smallest value. Range = max − min",
          ],
        },
        {
          kind: "tip",
          body: "Range measures spread, not center. A data set can have a small mean and a huge range, or the reverse.",
        },
      ],
      quickCheck: {
        prompt:
          "Which measure is found by subtracting the smallest value from the largest?",
        choices: ["Mean", "Median", "Mode", "Range"],
        answer: 3,
        explanation:
          "Range = max − min. It tells you how spread out the data is, while mean, median, and mode describe the center.",
      },
    },
    {
      id: "worked-example",
      title: "Finding all four measures",
      blocks: [
        {
          kind: "concept",
          body: "One small data set is enough to practice all four measures. Work through them in a fixed order so nothing gets skipped: mean, then median, then mode, then range.",
        },
        {
          kind: "example",
          title: "All four measures of one data set",
          expression: "4, 8, 6, 8, 9",
          steps: [
            {
              note: "Mean: add all five values, then divide by the count.",
              work: ["4 + 8 + 6 + 8 + 9 = 35", "35 ÷ 5 = 7"],
            },
            {
              note: "Median: sort the data first; the middle (3rd of 5) is the median.",
              work: ["4, 6, 8, 8, 9", "median = 8"],
            },
            {
              note: "Mode: 8 appears twice, more than any other value.",
              work: ["mode = 8"],
            },
            {
              note: "Range: largest minus smallest.",
              work: ["9 − 4 = 5"],
            },
          ],
          answer: "Mean 7, median 8, mode 8, range 5",
        },
        {
          kind: "example",
          title: "Even count: average the two middle values",
          expression: "4, 6, 8, 9",
          steps: [
            {
              note: "With four values there is no single middle, so average the two middle values, 6 and 8.",
              work: ["(6 + 8) ÷ 2 = 7"],
            },
          ],
          answer: "Median = 7",
        },
        {
          kind: "mistake",
          body: "Do not take the middle of the list as it is given. The median only means anything after the data is sorted in order.",
        },
      ],
      quickCheck: {
        prompt: "What is the median of 2, 9, 4, 7?",
        choices: ["4", "5.5", "6.5", "7"],
        answer: 1,
        explanation:
          "Sort first: 2, 4, 7, 9. The count is even, so average the two middle values: (4 + 7) ÷ 2 = 5.5. Averaging the middle of the unsorted list gives 6.5, which is wrong.",
      },
    },
    {
      id: "frequency-tables",
      title: "Mean from a frequency table",
      blocks: [
        {
          kind: "concept",
          body: "A frequency table lists each value with how many times it occurs. The frequencies are counts of repeats, so a value that occurs 5 times contributes to the sum 5 times, not once.",
        },
        {
          kind: "rule",
          title: "Mean from a frequency table",
          ordered: true,
          items: [
            "Multiply each value by its frequency",
            "Add those products to get the total sum",
            "Add the frequencies to get the total count",
            "Divide: mean = total sum / total count",
          ],
        },
        {
          kind: "example",
          title: "Value 1 occurs 2 times, value 2 occurs 3 times, value 3 occurs 5 times",
          steps: [
            {
              note: "Multiply each value by its frequency and add the products.",
              work: ["(1 × 2) + (2 × 3) + (3 × 5) = 2 + 6 + 15 = 23"],
            },
            {
              note: "Add the frequencies to get the total count.",
              work: ["2 + 3 + 5 = 10"],
            },
            {
              note: "Divide the total sum by the total count.",
              work: ["23 ÷ 10 = 2.3"],
            },
          ],
          answer: "Mean = 2.3",
        },
        {
          kind: "mistake",
          body: "Do not just average the distinct values. Averaging 1, 2, and 3 gives 2, but that ignores how often each value occurs; the true mean here is 2.3.",
        },
      ],
      quickCheck: {
        prompt:
          "In a frequency table, the value 2 occurs 4 times and the value 5 occurs 6 times. What is the mean?",
        choices: ["3.5", "3.8", "7", "38"],
        answer: 1,
        explanation:
          "Sum = (2 × 4) + (5 × 6) = 8 + 30 = 38, and count = 4 + 6 = 10, so mean = 38 ÷ 10 = 3.8. Averaging just 2 and 5 gives 3.5, which ignores the frequencies.",
      },
    },
    {
      id: "word-problems",
      title: "Statistics word problems",
      blocks: [
        {
          kind: "concept",
          body: "Many TEAS statistics questions give you the mean and ask for a missing value. Work backward: since mean = sum / count, the needed sum is mean × count. Subtract the values you already have to find the missing one.",
        },
        {
          kind: "wordProblem",
          problem:
            "A student scored 80, 90, and 85 on three tests and wants a mean of 88 across four tests. What score is needed on the fourth test?",
          asking: "The fourth score that makes the four-test mean exactly 88.",
          relevant: [
            "Current scores: 80, 90, 85",
            "Target mean: 88",
            "Total number of tests: 4",
          ],
          operation:
            "Work backward from the mean: needed sum = mean × count, then subtract the points already earned.",
          calculation: "88 × 4 = 352; 80 + 90 + 85 = 255; 352 − 255 = 97",
          answer: "A score of 97 is needed on the fourth test.",
        },
        {
          kind: "tip",
          body: "The mean is pulled toward outliers; the median is not. If one value sits far from the rest, the median often describes the typical value better.",
        },
      ],
      quickCheck: {
        prompt:
          "A nurse's first two shift counts are 70 and 80. What third count gives a mean of 80 over three shifts?",
        choices: ["80", "85", "90", "100"],
        answer: 2,
        explanation:
          "Needed total = 80 × 3 = 240. Current total = 70 + 80 = 150, so the third count must be 240 − 150 = 90.",
      },
    },
  ],
};
