import type { GuidedLesson } from "../guided-lesson-types";

/**
 * Guided lesson for READING / integration-knowledge / "Evaluate and Integrate
 * Data From Multiple Sources Across Various Formats". Content carried over
 * from the flat skill-lesson blocks, restructured into the concept / rule /
 * example / mistake / quick check pattern. Quick checks are informal and
 * never touch mastery.
 */
export const EVALUATE_INTEGRATE_DATA_MULTIPLE_SOURCES: GuidedLesson = {
  section: "READING",
  topic: "integration-knowledge",
  skill: "Evaluate and Integrate Data From Multiple Sources Across Various Formats",
  slug: "evaluate-and-integrate-data-from-multiple-sources-across-various-formats",
  title: "Integrating Data From Multiple Sources",
  summary:
    "Pull information from text, tables, graphs, and labels together to answer a question no single source fully covers.",
  minutes: [8, 10],
  objectives: [
    "Recognize when a question requires more than one source",
    "Identify what each source contributes on its own",
    "Match labels, units, and headings across different formats",
    "Locate the answer in the overlap between sources",
    "Avoid conclusions that only one source supports",
  ],
  sections: [
    {
      id: "what-it-is",
      title: "What integrating data means",
      blocks: [
        {
          kind: "concept",
          body: "Integrating data means reading more than one format at once and combining the matching details to reach a conclusion.\n\nThe pairing can take many shapes: a paragraph plus a chart, a recipe plus a nutrition label, a set of instructions plus a table. Each format holds part of the picture, and neither part answers the question by itself.",
        },
        {
          kind: "concept",
          body: "The formats you are likely to see include:\n\n- Prose passages and paragraphs\n- Tables with labeled rows and columns\n- Graphs and charts\n- Labels, such as nutrition or medication labels",
        },
        {
          kind: "tip",
          body: "Before you look for an answer, name what each source contributes. One source usually supplies a specific value, and the other supplies the rule or scale that gives the value meaning.",
        },
      ],
      quickCheck: {
        prompt:
          "What does it mean to integrate data across formats?",
        choices: [
          "Choose the source that looks most reliable and read only that one",
          "Combine matching details from two or more formats to reach a conclusion",
          "Summarize each source separately without comparing them",
          "Convert every source into the same format before reading",
        ],
        answer: 1,
        explanation:
          "Integration is the act of linking details across formats. Reading one source alone, or summarizing sources in isolation, misses the connection the question depends on.",
      },
    },
    {
      id: "how-tested",
      title: "How the TEAS tests it",
      blocks: [
        {
          kind: "concept",
          body: "A question gives two or more sources and asks for a fact found by linking them, or asks which conclusion all the sources support. Either way, one source alone will not get you there.",
        },
        {
          kind: "rule",
          title: "What to do with the sources",
          items: [
            "Match labels, units, and headings carefully across formats",
            "Expect the answer to sit in the overlap, not in one source alone",
            "Find the shared data point that appears in both sources",
            "Check that a conclusion holds up in every source, not just one",
          ],
        },
        {
          kind: "concept",
          body: "The shared data point is the hinge. It is the detail named in one source that also appears as a label, a row, an axis, or a heading in the other. Once you find it, the two sources click together.",
        },
        {
          kind: "mistake",
          body: "Do not trust one source in isolation. An answer choice can restate the paragraph accurately and still be wrong, because the question asked for the fact that only appears once you bring the table into it.",
        },
      ],
      quickCheck: {
        prompt:
          "A question presents a passage and a graph and asks which conclusion is supported. Where does the correct answer usually come from?",
        choices: [
          "The passage, since prose carries more detail than a graph",
          "The graph, since data outweighs description",
          "The overlap where both sources agree",
          "Whichever source is listed first in the question",
        ],
        answer: 2,
        explanation:
          "When a question links sources, the answer sits in the overlap. A conclusion supported by only one source leaves the other source unaccounted for.",
      },
    },
    {
      id: "matching-labels",
      title: "Matching labels and units",
      blocks: [
        {
          kind: "concept",
          body: "Sources rarely use identical wording. A paragraph may say \"body weight\" where a table's column reads \"Weight (kg)\", or a passage may give a time in hours where a chart is marked in minutes. Matching is a deliberate step, not something to eyeball.",
        },
        {
          kind: "rule",
          title: "Check three things before you link",
          ordered: true,
          items: [
            "The label: does this row or axis name the same quantity the text names?",
            "The unit: are both sources measuring in the same unit, or does one need converting?",
            "The range: does the value from the text fall inside this row's or bin's range?",
          ],
        },
        {
          kind: "example",
          title: "A value that needs a unit check",
          steps: [
            {
              note: "The text gives a value with its unit.",
              work: ["Text: \"The patient weighs 30 kilograms.\""],
            },
            {
              note: "The table's heading names the same quantity, but confirm the unit before matching.",
              work: [
                "Table heading: \"Weight (kg)\"",
                "Units agree, so 30 can be matched directly.",
              ],
            },
          ],
          answer: "Same quantity, same unit: the value can be matched to a row.",
        },
        {
          kind: "mistake",
          body: "Matching a number to a row without checking the unit is a common error. A weight of 30 sitting in a table of pounds is a different patient than a weight of 30 in a table of kilograms.",
        },
      ],
      quickCheck: {
        prompt:
          "A passage reports a dose in milligrams and a table lists doses in grams. What should you do first?",
        choices: [
          "Match the number to the closest row and move on",
          "Ignore the table, since the passage is more specific",
          "Convert so both sources use the same unit before matching",
          "Choose the answer that repeats the passage's number exactly",
        ],
        answer: 2,
        explanation:
          "Units must agree before values can be linked. Matching a milligram figure against a gram column compares two different quantities.",
      },
    },
    {
      id: "worked-linking",
      title: "Linking a passage to a table",
      blocks: [
        {
          kind: "concept",
          body: "A paragraph states that a medication is dosed by weight, and a table lists doses for each weight range. Neither source names the dose for this patient. The paragraph has the patient's weight; the table has the rule that turns a weight into a dose.",
        },
        {
          kind: "example",
          title: "Find the right dose",
          steps: [
            {
              note: "Read what each source contributes.",
              work: [
                "Passage: the medication is dosed by weight; the patient weighs 30 kg.",
                "Table: a dose listed for each weight range.",
              ],
            },
            {
              note: "Name the shared data point that ties them together.",
              work: ["Weight appears in both the passage and the table."],
            },
            {
              note: "Carry the value from the text into the table and find the row whose range contains it.",
              work: [
                "30 kg falls in the row for 25 kg to 34 kg.",
                "Read the dose listed in that row.",
              ],
            },
          ],
          answer:
            "The dose in the row whose weight range contains 30 kg. The passage alone and the table alone each fall short.",
        },
        {
          kind: "tip",
          body: "Say the link out loud in one sentence: \"The text gives me the weight, and the table turns a weight into a dose.\" If you cannot say it, you have not found the connection yet.",
        },
      ],
      quickCheck: {
        prompt:
          "In the dosing example, why is the passage alone not enough to answer?",
        choices: [
          "The passage does not state the patient's weight",
          "The passage gives the weight but not the dose for that weight",
          "The passage contradicts the table",
          "The passage lists more weight ranges than the table does",
        ],
        answer: 1,
        explanation:
          "The passage supplies the weight and the rule that dosing depends on weight, but only the table converts that weight into a dose.",
      },
    },
    {
      id: "approach",
      title: "A method you can repeat",
      blocks: [
        {
          kind: "concept",
          body: "Identify what each source contributes before answering, then connect the shared data point that ties them together rather than trusting one source in isolation.",
        },
        {
          kind: "rule",
          title: "Work in this order",
          ordered: true,
          items: [
            "Read the question and note exactly what it asks for",
            "Name what each source contributes on its own",
            "Find the shared data point that appears in both",
            "Match labels and units, then carry the value across",
            "Test each answer choice against every source, not just one",
          ],
        },
        {
          kind: "mistake",
          body: "Do not start with the answer choices. Choices are written to sound like the sources, and a choice lifted word for word from the paragraph is often the trap. Build the link first, then check the choices against it.",
        },
        {
          kind: "tip",
          body: "If two sources seem to disagree, reread the labels before assuming one is wrong. Apparent conflicts are usually a unit mismatch, a different time span, or a different group being measured.",
        },
      ],
      quickCheck: {
        prompt:
          "Which step should come before checking the answer choices?",
        choices: [
          "Eliminate the two longest choices",
          "Decide which source is more trustworthy",
          "Identify what each source contributes and find the shared data point",
          "Reread only the source that mentions the question's keyword",
        ],
        answer: 2,
        explanation:
          "Building the link first gives you something to test the choices against. Choices are worded to echo the sources, so reading them first invites the trap.",
      },
    },
  ],
};
