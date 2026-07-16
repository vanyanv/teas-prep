import type { GuidedLesson } from "../guided-lesson-types";

/**
 * Guided lesson for SCIENCE / chemistry / "Explain Physical Properties and
 * Changes of Matter". Content carried over from the flat skill-lesson blocks,
 * restructured into the concept / rule / example / mistake / quick check
 * pattern. Quick checks are informal and never touch mastery.
 */
export const PHYSICAL_PROPERTIES_CHANGES_MATTER: GuidedLesson = {
  section: "SCIENCE",
  topic: "chemistry",
  skill: "Explain Physical Properties and Changes of Matter",
  slug: "explain-physical-properties-and-changes-of-matter",
  title: "Physical Properties and Changes of Matter",
  summary:
    "Physical changes alter form but not identity, and properties like density, state, phase changes, and heat behavior describe matter without changing what it is.",
  minutes: [12, 15],
  objectives: [
    "Distinguish physical changes from chemical changes",
    "Classify properties as intensive or extensive",
    "Calculate density and predict whether an object floats or sinks",
    "Describe the three states of matter and name the phase changes between them",
    "Explain specific heat and thermal conduction in everyday situations",
  ],
  sections: [
    {
      id: "physical-vs-chemical",
      title: "Physical vs chemical changes",
      blocks: [
        {
          kind: "concept",
          body: "A physical change alters a substance's appearance or state but not its chemical identity. No new substance forms, and the change is often reversible: melting ice, cutting paper, dissolving sugar.\n\nA chemical change forms a new substance with new properties: burning wood, rusting iron, baking, digestion.",
        },
        {
          kind: "rule",
          title: "Signs of a chemical change",
          items: [
            "Color change",
            "Gas bubbles",
            "New odor",
            "Light or heat released",
            "A precipitate (solid) forming",
          ],
        },
        {
          kind: "example",
          title: "Classify two changes",
          steps: [
            {
              note: "Ice melting into water: it is still H2O, only the state changed.",
              work: ["solid water becomes liquid water, same substance"],
              becomes: "Physical change",
            },
            {
              note: "Iron rusting: iron combines with oxygen to form a new orange-brown substance with new properties.",
              work: ["iron becomes rust, a different substance"],
              becomes: "Chemical change",
            },
          ],
          answer: "Melting is physical; rusting is chemical.",
        },
        {
          kind: "tip",
          body: "Quick test: ask 'Is it still the same stuff?' If yes, the change is physical.",
        },
        {
          kind: "mistake",
          body: "Do not assume a dramatic change must be chemical. Dissolving sugar in water looks like the sugar disappears, but it is still sugar, so the change is physical.",
        },
      ],
      quickCheck: {
        prompt: "Sugar dissolving in water is which kind of change?",
        choices: [
          "Chemical, because the sugar seems to disappear",
          "Physical, because it is still sugar and no new substance forms",
          "Chemical, because a liquid is involved",
          "Neither physical nor chemical",
        ],
        answer: 1,
        explanation:
          "The sugar is still sugar; only its form changed, and the change can be reversed by evaporating the water. That makes it physical.",
      },
    },
    {
      id: "intensive-extensive",
      title: "Intensive vs extensive properties",
      blocks: [
        {
          kind: "concept",
          body: "An intensive property does not depend on the amount of matter present. Density, temperature, color, and boiling point are intensive: a drop of water and a bucket of water have the same density.\n\nAn extensive property does depend on the amount of matter. Mass, volume, length, and total heat content are extensive.",
        },
        {
          kind: "tip",
          body: "Quick test: imagine dividing the sample in half. If the value changes, the property is extensive; if it stays the same, it is intensive.",
        },
        {
          kind: "example",
          title: "Apply the halving test",
          steps: [
            {
              note: "Pour half a glass of water out. The mass drops, so mass is extensive.",
              work: ["half the water has half the mass"],
            },
            {
              note: "The temperature of the remaining water is unchanged, so temperature is intensive.",
              work: ["half the water is still the same temperature"],
            },
          ],
          answer: "Mass is extensive; temperature is intensive.",
        },
      ],
      quickCheck: {
        prompt: "Which of the following is an intensive property?",
        choices: ["Mass", "Volume", "Density", "Length"],
        answer: 2,
        explanation:
          "Density does not change with sample size; a drop and a bucket of the same substance have the same density. Mass, volume, and length all grow with the amount of matter.",
      },
    },
    {
      id: "density",
      title: "Density",
      blocks: [
        {
          kind: "concept",
          body: "Density is how much mass is packed into a given volume. It is an intensive property, so it can be used to identify substances regardless of sample size.\n\nObjects less dense than a liquid float in it; denser objects sink. That is why ice floats on water.",
        },
        {
          kind: "rule",
          title: "The density formula and its rearrangements",
          items: [
            "density = mass / volume (commonly g/mL or g/cm^3)",
            "mass = density × volume",
            "volume = mass / density",
          ],
        },
        {
          kind: "example",
          title: "Find a density and predict floating",
          expression: "mass = 40 g, volume = 50 mL",
          steps: [
            {
              note: "Divide mass by volume.",
              work: ["density = 40 ÷ 50 = 0.8 g/mL"],
            },
            {
              note: "Compare with water, which has a density of about 1 g/mL. 0.8 is less than 1, so the object floats.",
              work: ["0.8 g/mL < 1 g/mL"],
            },
          ],
          answer: "0.8 g/mL; the object floats in water.",
        },
        {
          kind: "mistake",
          body: "Do not divide volume by mass. Density is mass over volume; flipping the ratio gives a wrong value and can reverse a float-or-sink prediction.",
        },
      ],
      quickCheck: {
        prompt: "An object has a mass of 30 g and a volume of 15 mL. What is its density?",
        choices: ["0.5 g/mL", "2 g/mL", "45 g/mL", "450 g/mL"],
        answer: 1,
        explanation:
          "density = mass / volume = 30 ÷ 15 = 2 g/mL. Dividing volume by mass gives the 0.5 trap; adding or multiplying gives the others.",
      },
    },
    {
      id: "states-of-matter",
      title: "States of matter",
      blocks: [
        {
          kind: "concept",
          body: "The state of matter comes down to how its particles are arranged and how freely they move. Adding heat gives particles more energy and generally moves matter from solid toward liquid toward gas.",
        },
        {
          kind: "rule",
          title: "The three common states",
          items: [
            "Solid: definite shape and volume; particles packed tightly and vibrate in place",
            "Liquid: definite volume but takes the shape of its container; particles slide past one another",
            "Gas: no definite shape or volume; particles spread far apart and move freely to fill the container",
          ],
        },
        {
          kind: "tip",
          body: "Track two questions: does it keep its shape, and does it keep its volume? Solids keep both, liquids keep only volume, gases keep neither.",
        },
      ],
      quickCheck: {
        prompt:
          "A substance has a definite volume but takes the shape of its container. What state is it in?",
        choices: ["Solid", "Liquid", "Gas", "It cannot be determined"],
        answer: 1,
        explanation:
          "That combination defines a liquid: its particles slide past one another, so it flows to fit the container while its volume stays fixed.",
      },
    },
    {
      id: "phase-changes",
      title: "Phase changes",
      blocks: [
        {
          kind: "concept",
          body: "Phase changes are physical changes between states, driven by adding or removing heat. The substance's identity never changes; water is still water whether it is ice, liquid, or steam.",
        },
        {
          kind: "rule",
          title: "The six phase changes",
          items: [
            "Melting: solid to liquid (heat added)",
            "Freezing: liquid to solid (heat removed)",
            "Evaporation/vaporization: liquid to gas (heat added); boiling is rapid vaporization",
            "Condensation: gas to liquid (heat removed)",
            "Sublimation: solid directly to gas, skipping liquid (dry ice)",
            "Deposition: gas directly to solid (frost)",
          ],
        },
        {
          kind: "example",
          title: "Name the change",
          steps: [
            {
              note: "Water droplets form on the outside of a cold glass. Water vapor in the air turned into liquid, so heat was removed from a gas.",
              work: ["gas to liquid"],
              becomes: "Condensation",
            },
            {
              note: "Frost forms on a window overnight. Water vapor became solid ice without ever being liquid.",
              work: ["gas directly to solid"],
              becomes: "Deposition",
            },
          ],
          answer: "Condensation, then deposition.",
        },
        {
          kind: "mistake",
          body: "During a phase change the temperature stays constant, even though the substance is absorbing or releasing energy. Do not expect boiling water to keep getting hotter; the added heat goes into changing the state, not the temperature.",
        },
      ],
      quickCheck: {
        prompt: "Which phase change turns a gas directly into a solid?",
        choices: ["Sublimation", "Condensation", "Deposition", "Freezing"],
        answer: 2,
        explanation:
          "Deposition skips the liquid state entirely, as when frost forms from water vapor. Sublimation is the reverse (solid to gas), condensation makes a liquid, and freezing starts from a liquid.",
      },
    },
    {
      id: "heat-capacity",
      title: "Heat capacity and specific heat",
      blocks: [
        {
          kind: "concept",
          body: "Heat capacity is the amount of heat energy needed to raise a substance's temperature. Specific heat pins that down: the heat needed to raise 1 gram of a substance by 1 degree Celsius.\n\nA high specific heat means the substance resists temperature change; it heats up and cools down slowly. Water has an unusually high specific heat, which helps the body and the environment stay temperature-stable.",
        },
        {
          kind: "mistake",
          body: "Do not read high specific heat as heats up fast. It is the opposite: a high specific heat means more energy is required per degree, so the substance changes temperature slowly.",
        },
      ],
      quickCheck: {
        prompt: "A substance with a high specific heat will:",
        choices: [
          "Heat up and cool down quickly",
          "Heat up and cool down slowly",
          "Never change temperature",
          "Change state at a lower temperature",
        ],
        answer: 1,
        explanation:
          "High specific heat means more energy is needed for each degree of change, so the substance resists temperature swings. This is why water moderates body and environmental temperatures.",
      },
    },
    {
      id: "thermal-conduction",
      title: "Thermal conduction",
      blocks: [
        {
          kind: "concept",
          body: "Conduction is the transfer of heat through direct contact: fast-moving particles bump into slower ones and pass energy along.",
        },
        {
          kind: "rule",
          title: "Conductors and insulators",
          items: [
            "Conductors transfer heat easily; most metals (copper, aluminum) are good conductors",
            "Insulators resist heat transfer; wood, plastic, rubber, glass, and air are good insulators",
          ],
        },
        {
          kind: "example",
          title: "Two spoons in hot soup",
          steps: [
            {
              note: "A metal spoon left in hot soup gets hot quickly because metal conducts heat up the handle.",
              work: ["metal = conductor, heat travels fast"],
            },
            {
              note: "A wooden spoon in the same soup stays cool to the touch because wood resists heat transfer.",
              work: ["wood = insulator, heat travels slowly"],
            },
          ],
          answer: "The metal spoon heats quickly; the wooden spoon does not.",
        },
      ],
      quickCheck: {
        prompt: "Which of these materials is a good thermal conductor?",
        choices: ["Rubber", "Copper", "Wood", "Air"],
        answer: 1,
        explanation:
          "Copper is a metal, and most metals conduct heat easily. Rubber, wood, and air are all insulators that resist heat transfer.",
      },
    },
  ],
};
