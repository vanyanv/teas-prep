import type { GuidedLesson } from "../guided-lesson-types";

/** Guided lesson for SCIENCE / chemistry / "Understand Properties of
 *  Solutions". Content carried over from the flat skill-lesson blocks,
 *  restructured into the concept / rule / example / mistake / quick check
 *  pattern. */
export const PROPERTIES_OF_SOLUTIONS: GuidedLesson = {
  section: "SCIENCE",
  topic: "chemistry",
  skill: "Understand Properties of Solutions",
  slug: "understand-properties-of-solutions",
  title: "Properties of Solutions",
  summary:
    "A solution is a solute dissolved in a solvent, and its concentration, solubility, saturation, and pH describe its behavior, including acids and bases.",
  minutes: [8, 10],
  objectives: [
    "Identify the solute and solvent in a solution",
    "Explain how adding or removing solvent changes concentration",
    "Distinguish unsaturated, saturated, and supersaturated solutions",
    "Describe how temperature, stirring, and particle size affect dissolving",
    "Classify solutions as acidic, neutral, or basic from their pH",
  ],
  sections: [
    {
      id: "solute-solvent",
      title: "Solute and solvent",
      blocks: [
        {
          kind: "concept",
          body: "A solution is a homogeneous (uniform) mixture of two or more substances. Every solution has two roles: something that gets dissolved and something that does the dissolving.",
        },
        {
          kind: "rule",
          title: "The two parts of a solution",
          items: [
            "Solute: the substance being dissolved, present in the smaller amount (salt or sugar)",
            "Solvent: the substance doing the dissolving, present in the larger amount (water)",
          ],
        },
        {
          kind: "tip",
          body: "Water dissolves so many things that it is called the universal solvent. On the TEAS, if water is in the mixture, it is almost always the solvent.",
        },
        {
          kind: "example",
          title: "Identify the parts of saltwater",
          steps: [
            {
              note: "Salt is present in the smaller amount and is being dissolved.",
              work: ["salt = solute"],
            },
            {
              note: "Water is present in the larger amount and does the dissolving.",
              work: ["water = solvent"],
            },
          ],
          answer: "Salt is the solute; water is the solvent.",
        },
      ],
      quickCheck: {
        prompt: "In a cup of sweetened tea, what role does the sugar play?",
        choices: [
          "Solvent, because it changes the flavor",
          "Solute, because it is the substance being dissolved",
          "Solution, because it forms a mixture",
          "Solvent, because the tea dissolves into it",
        ],
        answer: 1,
        explanation:
          "The sugar is dissolved and present in the smaller amount, so it is the solute. The tea (mostly water) is the solvent.",
      },
    },
    {
      id: "concentration",
      title: "Concentration",
      blocks: [
        {
          kind: "concept",
          body: "Concentration describes how much solute is dissolved in a given amount of solvent or solution. A concentrated solution has a lot of solute; a dilute solution has little solute.",
        },
        {
          kind: "rule",
          title: "Changing concentration",
          items: [
            "Adding more solvent dilutes a solution (lowers concentration)",
            "Removing solvent, such as by evaporation, makes it more concentrated",
          ],
        },
        {
          kind: "example",
          title: "Saltwater left in an open dish",
          steps: [
            {
              note: "The water slowly evaporates, but the salt stays behind.",
              work: ["solvent decreases, solute stays the same"],
            },
            {
              note: "The same amount of solute now sits in less solvent.",
              work: ["concentration increases"],
            },
          ],
          answer: "The solution becomes more concentrated.",
        },
        {
          kind: "mistake",
          body: "Do not confuse the amount of solute with concentration. Diluting a solution does not remove any solute; it adds solvent, so the same solute is spread through more liquid.",
        },
      ],
      quickCheck: {
        prompt:
          "You add more water to a saltwater solution. What happens to its concentration?",
        choices: [
          "It increases, because there is more solution",
          "It decreases, because the solute is spread through more solvent",
          "It stays the same, because no salt was removed",
          "It becomes saturated",
        ],
        answer: 1,
        explanation:
          "Adding solvent dilutes the solution: the same amount of salt is now dissolved in more water, so the concentration drops.",
      },
    },
    {
      id: "solubility-saturation",
      title: "Solubility and saturation",
      blocks: [
        {
          kind: "concept",
          body: "Solubility is the maximum amount of solute that can dissolve in a solvent at a given temperature. How close a solution is to that maximum determines its saturation state.",
        },
        {
          kind: "rule",
          title: "Saturation states",
          items: [
            "Unsaturated: more solute can still dissolve",
            "Saturated: holding the maximum amount; no more will dissolve",
            "Supersaturated: holding more than normal (unstable), achieved by special conditions",
          ],
        },
        {
          kind: "concept",
          body: "For most solids, raising the temperature increases solubility, so more dissolves in hot water than in cold water.",
        },
        {
          kind: "mistake",
          body: "Stirring and smaller particle size speed up dissolving, but they do not change the maximum solubility. A saturated solution stays saturated no matter how hard you stir.",
        },
      ],
      quickCheck: {
        prompt:
          "You keep adding sugar to water until new sugar just settles on the bottom and will not dissolve. The solution is now:",
        choices: ["Unsaturated", "Saturated", "Supersaturated", "Dilute"],
        answer: 1,
        explanation:
          "A saturated solution holds the maximum amount of solute at that temperature, so any extra solute stays undissolved.",
      },
    },
    {
      id: "ph-scale",
      title: "Acids, bases, and the pH scale",
      blocks: [
        {
          kind: "concept",
          body: "The pH scale measures how acidic or basic (alkaline) a solution is, from 0 to 14.",
        },
        {
          kind: "rule",
          title: "Reading the pH scale",
          items: [
            "pH below 7: acidic. Acids release hydrogen ions (H+), taste sour, and include lemon juice and stomach acid",
            "pH of 7: neutral (pure water)",
            "pH above 7: basic/alkaline. Bases release hydroxide ions (OH-), feel slippery, and include soap and bleach",
          ],
        },
        {
          kind: "concept",
          body: "The scale is logarithmic, so each whole number step is a tenfold change in acidity. Lower pH means stronger acid; higher pH means stronger base. Blood is slightly basic at about 7.35 to 7.45.",
        },
        {
          kind: "example",
          title: "Compare pH 2 and pH 4",
          steps: [
            {
              note: "Each whole number step on the scale is a tenfold change in acidity.",
              work: ["pH 4 to pH 3 = 10 times more acidic"],
            },
            {
              note: "pH 2 is two steps below pH 4, so multiply the tenfold changes.",
              work: ["10 × 10 = 100"],
            },
          ],
          answer: "A pH 2 solution is 100 times more acidic than a pH 4 solution.",
        },
        {
          kind: "mistake",
          body: "Do not assume a bigger pH number means a stronger acid. It is the opposite: the lower the pH, the stronger the acid; the higher the pH, the stronger the base.",
        },
      ],
      quickCheck: {
        prompt: "A solution has a pH of 3. Which statement describes it?",
        choices: [
          "It is basic and feels slippery",
          "It is neutral, like pure water",
          "It is acidic and releases hydrogen ions (H+)",
          "It is slightly basic, like blood",
        ],
        answer: 2,
        explanation:
          "A pH below 7 is acidic, and acids release hydrogen ions (H+). Blood sits slightly above neutral at about 7.35 to 7.45.",
      },
    },
  ],
};
