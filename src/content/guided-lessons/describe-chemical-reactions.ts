import type { GuidedLesson } from "../guided-lesson-types";

/** Guided lesson for SCIENCE / chemistry / "Describe Chemical Reactions".
 *  Content carried over from the flat skill-lesson blocks, restructured into
 *  the concept / rule / example / mistake / quick check pattern. */
export const DESCRIBE_CHEMICAL_REACTIONS: GuidedLesson = {
  section: "SCIENCE",
  topic: "chemistry",
  skill: "Describe Chemical Reactions",
  slug: "describe-chemical-reactions",
  title: "Chemical Reactions",
  summary:
    "Chemical reactions rearrange reactants into products while conserving mass, and balanced equations sort reactions into a few predictable types.",
  minutes: [8, 10],
  objectives: [
    "Identify reactants and products in a chemical equation",
    "Explain the law of conservation of mass",
    "Balance a chemical equation by adjusting coefficients",
    "Classify reactions as synthesis, decomposition, replacement, or combustion",
  ],
  sections: [
    {
      id: "reactants-products",
      title: "Reactants and products",
      blocks: [
        {
          kind: "concept",
          body: "In a chemical reaction, starting substances change into new substances. A chemical equation records that change, and every part of it has a fixed position.",
        },
        {
          kind: "rule",
          title: "Reading an equation",
          items: [
            "Reactants: the substances you start with, written on the LEFT of the arrow",
            "Products: the new substances formed, written on the RIGHT of the arrow",
            "The arrow means 'yields' or 'produces' and shows the direction of the reaction",
          ],
        },
        {
          kind: "example",
          title: "Label the parts of an equation",
          expression: "2 H2 + O2 → 2 H2O",
          steps: [
            {
              note: "Everything left of the arrow is a reactant.",
              work: ["Reactants: hydrogen (H2) and oxygen (O2)"],
            },
            {
              note: "Everything right of the arrow is a product.",
              work: ["Product: water (H2O)"],
            },
          ],
          answer: "Hydrogen and oxygen are the reactants; water is the product.",
        },
        {
          kind: "mistake",
          body: "Do not read the equation like a sentence that could run either way. The arrow points from what you start with to what forms; reactants are always on the left, products on the right.",
        },
      ],
      quickCheck: {
        prompt: "In the equation 2 H2 + O2 → 2 H2O, which substance is a product?",
        choices: [
          "H2, because it is listed first",
          "O2, because it drives the reaction",
          "H2O, because it appears after the arrow",
          "All three, since they all appear in the equation",
        ],
        answer: 2,
        explanation:
          "Products are the new substances on the right of the arrow. Here water (H2O) is the product; H2 and O2 are the reactants.",
      },
    },
    {
      id: "conservation-of-mass",
      title: "Conservation of mass",
      blocks: [
        {
          kind: "concept",
          body: "The law of conservation of mass states that matter is neither created nor destroyed in a chemical reaction. A reaction only rearranges the atoms you already have.",
        },
        {
          kind: "rule",
          title: "What conservation of mass means",
          items: [
            "The total mass of the reactants equals the total mass of the products",
            "Atoms are only rearranged, so every atom on the left must appear on the right",
            "This is the reason chemical equations must be balanced",
          ],
        },
        {
          kind: "example",
          title: "Predict the mass of a product",
          steps: [
            {
              note: "Suppose 4 g of hydrogen reacts completely with 32 g of oxygen to form water.",
              work: ["Reactant mass: 4 g + 32 g = 36 g"],
            },
            {
              note: "No mass is created or destroyed, so the product carries all of it.",
              work: ["Product mass: 36 g of water"],
            },
          ],
          answer: "36 g of water forms, matching the total reactant mass.",
        },
        {
          kind: "tip",
          body: "If a mass seems to disappear, look for a product you cannot see, such as a gas escaping. The atoms are still there; they just left the container.",
        },
      ],
      quickCheck: {
        prompt:
          "In a sealed container, 10 g of reactants undergo a chemical reaction. What is the total mass of the products?",
        choices: [
          "Less than 10 g, because energy is released",
          "Exactly 10 g",
          "More than 10 g, because new substances form",
          "It cannot be determined without the equation",
        ],
        answer: 1,
        explanation:
          "Matter is neither created nor destroyed, so the products have exactly the mass of the reactants: 10 g. Forming new substances rearranges atoms without changing total mass.",
      },
    },
    {
      id: "balancing-equations",
      title: "Balancing equations",
      blocks: [
        {
          kind: "concept",
          body: "Balancing means making the number of each type of atom equal on both sides of the equation. It is conservation of mass written into the symbols.",
        },
        {
          kind: "rule",
          title: "How to balance",
          items: [
            "Adjust coefficients (the big numbers in front of formulas), NEVER the subscripts inside a formula",
            "A coefficient multiplies every atom in that formula",
            "Count atoms element by element, and handle oxygen and hydrogen last",
          ],
        },
        {
          kind: "example",
          title: "Balance the equation for water",
          expression: "H2 + O2 → H2O",
          steps: [
            {
              note: "Count atoms on each side: the oxygen does not match.",
              work: ["Left: 2 H, 2 O", "Right: 2 H, 1 O"],
            },
            {
              note: "Put a coefficient 2 in front of H2O to fix oxygen; now hydrogen is off.",
              work: ["H2 + O2 → 2 H2O", "Left: 2 H, 2 O; right: 4 H, 2 O"],
            },
            {
              note: "Put a coefficient 2 in front of H2 to fix hydrogen.",
              work: ["2 H2 + O2 → 2 H2O", "Left: 4 H, 2 O; right: 4 H, 2 O"],
              becomes: "2 H2 + O2 → 2 H2O",
            },
          ],
          answer: "2 H2 + O2 → 2 H2O, with 4 H and 2 O on each side.",
        },
        {
          kind: "mistake",
          body: "Never change a subscript to balance an equation. Writing H2O2 instead of 2 H2O balances the atom count but turns water into hydrogen peroxide, a different substance.",
        },
      ],
      quickCheck: {
        prompt:
          "To balance an equation, which numbers are you allowed to change?",
        choices: [
          "The subscripts inside each formula",
          "The coefficients in front of formulas",
          "Either coefficients or subscripts, whichever is easier",
          "Neither; you add or remove substances instead",
        ],
        answer: 1,
        explanation:
          "Only coefficients may change; a coefficient multiplies every atom in its formula. Changing a subscript changes the identity of the substance.",
      },
    },
    {
      id: "reaction-types",
      title: "Types of reactions",
      blocks: [
        {
          kind: "concept",
          body: "Most reactions on the TEAS fit one of five patterns. Matching the general form of an equation to its pattern is usually enough to classify it.",
        },
        {
          kind: "rule",
          title: "The five reaction types",
          items: [
            "Synthesis (combination): two or more substances combine into one. A + B → AB",
            "Decomposition: one substance breaks into two or more. AB → A + B",
            "Single replacement: one element replaces another in a compound. A + BC → AC + B",
            "Double replacement: two compounds swap partners. AB + CD → AD + CB",
            "Combustion: a fuel (usually a hydrocarbon) reacts with oxygen to release energy, producing carbon dioxide and water",
          ],
        },
        {
          kind: "example",
          title: "Classify by matching the pattern",
          steps: [
            {
              note: "Count the substances on each side and see who moved.",
              work: ["AB → A + B: one substance became two"],
            },
            {
              note: "One reactant breaking into pieces matches decomposition.",
              work: ["Pattern: decomposition"],
            },
          ],
          answer: "One substance breaking into two or more is decomposition.",
        },
        {
          kind: "tip",
          body: "Synthesis builds up, decomposition breaks down, replacements swap atoms, and combustion burns with oxygen.",
        },
      ],
      quickCheck: {
        prompt:
          "A reaction follows the pattern AB + CD → AD + CB. What type is it?",
        choices: [
          "Synthesis",
          "Decomposition",
          "Single replacement",
          "Double replacement",
        ],
        answer: 3,
        explanation:
          "Two compounds swapping partners is double replacement. Single replacement instead has a lone element trading places with part of one compound.",
      },
    },
  ],
};
