import type { SeedQuestion } from "./seed-types";

// Hand-authored HOT_SPOT items: click-the-region questions over original
// schematic diagrams in /public/hotspots. For each item the `hotspots` regions
// are listed in the SAME order as `options`, so a region's array index is its
// answer index (what `correct` refers to). Coordinates are percent of the SVG
// viewBox. See public/hotspots/CREDITS.md.
export const GENERATED_QUESTIONS_HOTSPOTS: SeedQuestion[] = [
  // ── Heart (Cardiovascular System) ──
  {
    section: "SCIENCE",
    topic: "anatomy-physiology",
    subtopic: "Cardiovascular System",
    difficulty: 2,
    type: "HOT_SPOT",
    stem: "Click the chamber that pumps oxygen-rich blood out to the entire body.",
    options: ["Right atrium", "Left atrium", "Right ventricle", "Left ventricle"],
    correct: [3],
    explanation:
      "The left ventricle has the thickest muscular wall because it pumps oxygenated blood through the aorta to the whole body. The right ventricle only pumps to the lungs.",
    rationale: {
      takeaway:
        "The left ventricle is the heart's strongest chamber because it pushes oxygen-rich blood to the entire body.",
      whyCorrect:
        "Its thick muscular wall generates the pressure needed to drive blood through the aorta to every tissue.",
      distractors: {
        "0": "The right atrium is the upper right receiving chamber for oxygen-poor blood coming back from the body.",
        "1": "The left atrium is the upper left receiving chamber; it takes oxygen-rich blood from the lungs and hands it down to the left ventricle.",
        "2": "The right ventricle pumps, but only the short distance to the lungs, so its wall is much thinner.",
      },
      commonMistake:
        "Confusing the two ventricles. The chamber with the thickest wall is the one serving the whole body.",
    },
    images: ["/hotspots/heart.svg"],
    hotspots: [
      { x: 25, y: 21, w: 20, h: 26, label: "A" },
      { x: 55, y: 20, w: 19, h: 25, label: "B" },
      { x: 25, y: 50, w: 22, h: 34, label: "C" },
      { x: 55, y: 50, w: 22, h: 37, label: "D" },
    ],
  },
  {
    section: "SCIENCE",
    topic: "anatomy-physiology",
    subtopic: "Cardiovascular System",
    difficulty: 2,
    type: "HOT_SPOT",
    stem: "Click the chamber that receives oxygen-poor blood returning from the body through the venae cavae.",
    options: ["Right atrium", "Left atrium", "Right ventricle", "Left ventricle"],
    correct: [0],
    explanation:
      "Deoxygenated blood from the body returns through the superior and inferior venae cavae into the right atrium, which then passes it to the right ventricle.",
    rationale: {
      takeaway:
        "The right atrium is the entry point for oxygen-poor blood returning from the body.",
      whyCorrect:
        "The superior and inferior venae cavae empty directly into the right atrium, which then passes blood down to the right ventricle.",
      distractors: {
        "1": "The left atrium is the upper left chamber; it receives oxygen-rich blood from the pulmonary veins, not from the venae cavae.",
        "2": "The right ventricle is the lower right chamber that pumps blood out to the lungs rather than receiving it from the body.",
        "3": "The left ventricle is the thick-walled lower left chamber that pumps blood out to the body.",
      },
      commonMistake:
        "Mixing up atria and ventricles. Atria are the upper receiving chambers; ventricles are the lower pumping chambers.",
    },
    images: ["/hotspots/heart.svg"],
    hotspots: [
      { x: 25, y: 21, w: 20, h: 26, label: "A" },
      { x: 55, y: 20, w: 19, h: 25, label: "B" },
      { x: 25, y: 50, w: 22, h: 34, label: "C" },
      { x: 55, y: 50, w: 22, h: 37, label: "D" },
    ],
  },
  {
    section: "SCIENCE",
    topic: "anatomy-physiology",
    subtopic: "Cardiovascular System",
    difficulty: 3,
    type: "HOT_SPOT",
    stem: "Click the chamber that pumps blood to the lungs through the pulmonary artery.",
    options: ["Right atrium", "Left atrium", "Right ventricle", "Left ventricle"],
    correct: [2],
    explanation:
      "The right ventricle pumps oxygen-poor blood into the pulmonary artery toward the lungs for gas exchange. The left atrium then receives the oxygenated blood coming back.",
    rationale: {
      takeaway:
        "The right ventricle drives the pulmonary circuit, sending oxygen-poor blood to the lungs.",
      whyCorrect:
        "Blood leaves the right ventricle through the pulmonary artery and travels to the lungs for gas exchange.",
      distractors: {
        "0": "The right atrium is the upper right chamber that receives blood from the body and drops it into the right ventricle; it does not pump to the lungs.",
        "1": "The left atrium is the upper left chamber that receives the oxygenated blood returning from the lungs.",
        "3": "The left ventricle pumps oxygen-rich blood out the aorta to the body, the systemic circuit, not the lungs.",
      },
      commonMistake:
        "Assuming the strong left ventricle serves the lungs. The right side handles the shorter pulmonary route.",
    },
    images: ["/hotspots/heart.svg"],
    hotspots: [
      { x: 25, y: 21, w: 20, h: 26, label: "A" },
      { x: 55, y: 20, w: 19, h: 25, label: "B" },
      { x: 25, y: 50, w: 22, h: 34, label: "C" },
      { x: 55, y: 50, w: 22, h: 37, label: "D" },
    ],
  },

  // ── Neuron (Neuromuscular System) ──
  {
    section: "SCIENCE",
    topic: "anatomy-physiology",
    subtopic: "Neuromuscular System",
    difficulty: 2,
    type: "HOT_SPOT",
    stem: "Click the part of the neuron that receives incoming signals from other neurons.",
    options: ["Dendrites", "Cell body (soma)", "Axon", "Myelin sheath", "Axon terminals"],
    correct: [0],
    explanation:
      "Dendrites are the branching extensions that receive signals and carry them toward the cell body. The axon carries signals away.",
    rationale: {
      takeaway:
        "Dendrites are the neuron's input end, collecting signals from other neurons.",
      whyCorrect:
        "The branching dendrites gather incoming signals and carry them inward toward the cell body.",
      distractors: {
        "1": "The cell body (soma) holds the nucleus and integrates the signals dendrites bring in; it is not the receiving branch itself.",
        "2": "The axon is the long fiber that conducts the impulse away from the cell body, the opposite direction.",
        "3": "The myelin sheath is the fatty insulating wrap around the axon; it speeds signals rather than receiving them.",
        "4": "The axon terminals are the output endings that release neurotransmitters to the next cell.",
      },
      commonMistake:
        "Confusing the two ends of the neuron. Dendrites receive; axon terminals transmit.",
    },
    images: ["/hotspots/neuron.svg"],
    hotspots: [
      { x: 3, y: 20, w: 15, h: 60, label: "A" },
      { x: 15, y: 34, w: 16, h: 32, label: "B" },
      { x: 31, y: 45, w: 8, h: 11, label: "C" },
      { x: 54, y: 43, w: 9, h: 14, label: "D" },
      { x: 84, y: 24, w: 14, h: 52, label: "E" },
    ],
  },
  {
    section: "SCIENCE",
    topic: "anatomy-physiology",
    subtopic: "Neuromuscular System",
    difficulty: 2,
    type: "HOT_SPOT",
    stem: "Click the structure that insulates the axon and speeds up signal transmission.",
    options: ["Dendrites", "Cell body (soma)", "Axon", "Myelin sheath", "Axon terminals"],
    correct: [3],
    explanation:
      "The myelin sheath is a fatty insulating layer around the axon; its gaps (nodes of Ranvier) let the impulse jump, greatly speeding transmission.",
    rationale: {
      takeaway:
        "The myelin sheath is the fatty insulation around the axon that speeds impulse conduction.",
      whyCorrect:
        "Myelin insulates the axon, and the impulse jumps between its gaps (nodes of Ranvier), which greatly increases speed.",
      distractors: {
        "0": "The dendrites are the branching inputs at the far end of the neuron; they carry signals in, not insulate.",
        "1": "The cell body (soma) contains the nucleus and integrates signals; it is not a covering.",
        "2": "The axon is the fiber being insulated, not the insulation wrapped around it.",
        "4": "The axon terminals are the endings that release neurotransmitters at the synapse.",
      },
      commonMistake:
        "Clicking the axon itself. Myelin is the segmented sheath wrapped around it, not the fiber underneath.",
    },
    images: ["/hotspots/neuron.svg"],
    hotspots: [
      { x: 3, y: 20, w: 15, h: 60, label: "A" },
      { x: 15, y: 34, w: 16, h: 32, label: "B" },
      { x: 31, y: 45, w: 8, h: 11, label: "C" },
      { x: 54, y: 43, w: 9, h: 14, label: "D" },
      { x: 84, y: 24, w: 14, h: 52, label: "E" },
    ],
  },
  {
    section: "SCIENCE",
    topic: "anatomy-physiology",
    subtopic: "Neuromuscular System",
    difficulty: 3,
    type: "HOT_SPOT",
    stem: "Click the part that carries the electrical impulse away from the cell body toward the axon terminals.",
    options: ["Dendrites", "Cell body (soma)", "Axon", "Myelin sheath", "Axon terminals"],
    correct: [2],
    explanation:
      "The axon is the long projection that conducts the action potential away from the soma to the axon terminals, where neurotransmitters are released.",
    rationale: {
      takeaway:
        "The axon is the neuron's output fiber, conducting the impulse away from the cell body.",
      whyCorrect:
        "The action potential travels down the axon from the soma to the axon terminals, where neurotransmitters are released.",
      distractors: {
        "0": "The dendrites carry signals inward toward the cell body, the opposite direction.",
        "1": "The cell body (soma) is where signals are summed; the impulse starts there but is not conducted along it.",
        "3": "The myelin sheath is the insulating wrap on the axon, not the conducting fiber itself.",
        "4": "The axon terminals are the destination at the end of the axon, not the length that carries the impulse.",
      },
      commonMistake:
        "Clicking the myelin instead of the axon. The axon carries the impulse; myelin only insulates it.",
    },
    images: ["/hotspots/neuron.svg"],
    hotspots: [
      { x: 3, y: 20, w: 15, h: 60, label: "A" },
      { x: 15, y: 34, w: 16, h: 32, label: "B" },
      { x: 31, y: 45, w: 8, h: 11, label: "C" },
      { x: 54, y: 43, w: 9, h: 14, label: "D" },
      { x: 84, y: 24, w: 14, h: 52, label: "E" },
    ],
  },

  // ── Digestive tract (Gastrointestinal System) ──
  {
    section: "SCIENCE",
    topic: "anatomy-physiology",
    subtopic: "Gastrointestinal System",
    difficulty: 2,
    type: "HOT_SPOT",
    stem: "Click the organ that releases acid and enzymes to break food into a semi-liquid mixture after swallowing.",
    options: ["Esophagus", "Stomach", "Liver", "Small intestine", "Large intestine"],
    correct: [1],
    explanation:
      "The stomach secretes hydrochloric acid and pepsin and churns food into chyme. The esophagus only transports food to the stomach.",
    rationale: {
      takeaway:
        "The stomach combines acid, enzymes, and churning to turn swallowed food into semi-liquid chyme.",
      whyCorrect:
        "The stomach secretes hydrochloric acid and pepsin while its muscular walls churn, producing chyme.",
      distractors: {
        "0": "The esophagus is the muscular tube from throat to stomach; it only transports food and secretes no acid.",
        "2": "The liver sits in the upper right abdomen and makes bile and processes nutrients; swallowed food never enters it.",
        "3": "The small intestine is the coiled tube below the stomach where nutrients are absorbed after this breakdown.",
        "4": "The large intestine frames the abdomen and reabsorbs water from residue at the end of digestion.",
      },
      commonMistake:
        "Choosing a transport or absorption organ. Only the stomach does the acid-and-enzyme breakdown right after swallowing.",
    },
    images: ["/hotspots/digestive.svg"],
    hotspots: [
      { x: 44, y: 5, w: 7, h: 24, label: "A" },
      { x: 26, y: 27, w: 19, h: 29, label: "B" },
      { x: 53, y: 25, w: 28, h: 17, label: "C" },
      { x: 42, y: 56, w: 26, h: 28, label: "D" },
      { x: 68, y: 40, w: 8, h: 34, label: "E" },
    ],
  },
  {
    section: "SCIENCE",
    topic: "anatomy-physiology",
    subtopic: "Gastrointestinal System",
    difficulty: 2,
    type: "HOT_SPOT",
    stem: "Click the organ where most nutrients are absorbed into the bloodstream.",
    options: ["Esophagus", "Stomach", "Liver", "Small intestine", "Large intestine"],
    correct: [3],
    explanation:
      "The small intestine, lined with villi and microvilli, is where the majority of nutrient absorption occurs. The large intestine mainly absorbs water.",
    rationale: {
      takeaway:
        "Most nutrient absorption happens in the small intestine, whose villi and microvilli create enormous surface area.",
      whyCorrect:
        "The small intestine's folded lining maximizes contact with chyme, letting the majority of nutrients pass into the blood.",
      distractors: {
        "0": "The esophagus is the tube carrying swallowed food to the stomach; no absorption happens there.",
        "1": "The stomach breaks food down chemically and mechanically, but absorbs very little nutrient content.",
        "2": "The liver processes nutrients after they are absorbed, but it is not part of the tube where absorption occurs.",
        "4": "The large intestine reclaims water and electrolytes, not the bulk of the nutrients.",
      },
      commonMistake:
        "Assuming the stomach absorbs what it digests. Breakdown happens there, absorption happens downstream.",
    },
    images: ["/hotspots/digestive.svg"],
    hotspots: [
      { x: 44, y: 5, w: 7, h: 24, label: "A" },
      { x: 26, y: 27, w: 19, h: 29, label: "B" },
      { x: 53, y: 25, w: 28, h: 17, label: "C" },
      { x: 42, y: 56, w: 26, h: 28, label: "D" },
      { x: 68, y: 40, w: 8, h: 34, label: "E" },
    ],
  },
  {
    section: "SCIENCE",
    topic: "anatomy-physiology",
    subtopic: "Gastrointestinal System",
    difficulty: 3,
    type: "HOT_SPOT",
    stem: "Click the organ whose main job is to reabsorb water and form solid waste.",
    options: ["Esophagus", "Stomach", "Liver", "Small intestine", "Large intestine"],
    correct: [4],
    explanation:
      "The large intestine (colon) reabsorbs water and electrolytes from indigestible residue, forming and storing feces until elimination.",
    rationale: {
      takeaway:
        "The large intestine reclaims water and electrolytes, which is what turns liquid residue into solid waste.",
      whyCorrect:
        "As residue moves through the colon, water and electrolytes are reabsorbed, forming and storing feces until elimination.",
      distractors: {
        "0": "The esophagus carries swallowed food down to the stomach and handles no waste.",
        "1": "The stomach churns food into liquid chyme; it makes contents less solid, not more.",
        "2": "The liver produces bile and processes absorbed nutrients; waste does not pass through it.",
        "3": "The small intestine absorbs nutrients and passes still-liquid residue on to the large intestine.",
      },
      commonMistake:
        "Swapping the two intestines. Small intestine takes up nutrients; large intestine takes up water.",
    },
    images: ["/hotspots/digestive.svg"],
    hotspots: [
      { x: 44, y: 5, w: 7, h: 24, label: "A" },
      { x: 26, y: 27, w: 19, h: 29, label: "B" },
      { x: 53, y: 25, w: 28, h: 17, label: "C" },
      { x: 42, y: 56, w: 26, h: 28, label: "D" },
      { x: 68, y: 40, w: 8, h: 34, label: "E" },
    ],
  },

  // ── Animal cell (Biology) ──
  {
    section: "SCIENCE",
    topic: "biology",
    subtopic: "Describe Cell Structure, Function, and Organization",
    difficulty: 2,
    type: "HOT_SPOT",
    stem: "Click the organelle known as the 'powerhouse of the cell,' where most ATP is produced.",
    options: ["Nucleus", "Mitochondrion", "Cell membrane", "Cytoplasm"],
    correct: [1],
    explanation:
      "Mitochondria carry out cellular respiration, producing most of the cell's ATP. The nucleus stores DNA; it does not generate the cell's energy.",
    rationale: {
      takeaway:
        "Mitochondria are the powerhouse, running cellular respiration to produce most of the cell's ATP.",
      whyCorrect:
        "Cellular respiration takes place inside the mitochondria, generating the bulk of the ATP the cell spends.",
      distractors: {
        "0": "The nucleus is the large central body holding the cell's DNA; it directs activity but makes no ATP.",
        "2": "The cell membrane is the outer boundary that regulates what crosses in and out.",
        "3": "The cytoplasm is the gel-like fluid filling the cell and suspending the organelles.",
      },
      commonMistake:
        "Clicking the nucleus because it is the biggest structure. Size marks the control center, not the energy source.",
    },
    images: ["/hotspots/cell.svg"],
    hotspots: [
      { x: 37, y: 31, w: 29, h: 38, label: "A" },
      { x: 60, y: 22, w: 23, h: 23, label: "B" },
      { x: 12, y: 30, w: 8, h: 32, label: "C" },
      { x: 20, y: 62, w: 16, h: 16, label: "D" },
    ],
  },
  {
    section: "SCIENCE",
    topic: "biology",
    subtopic: "Describe Cell Structure, Function, and Organization",
    difficulty: 2,
    type: "HOT_SPOT",
    stem: "Click the structure that controls what enters and leaves the cell.",
    options: ["Nucleus", "Mitochondrion", "Cell membrane", "Cytoplasm"],
    correct: [2],
    explanation:
      "The cell (plasma) membrane is a selectively permeable boundary that regulates the movement of substances into and out of the cell.",
    rationale: {
      takeaway:
        "The cell membrane is the selectively permeable outer boundary that gates what enters and leaves.",
      whyCorrect:
        "As the cell's outer border, the plasma membrane lets some substances through and blocks others, controlling all traffic.",
      distractors: {
        "0": "The nucleus is the interior compartment storing DNA; it governs the cell but not its outer boundary.",
        "1": "The mitochondrion is the internal organelle that produces ATP.",
        "3": "The cytoplasm is the fluid inside the membrane, not the barrier that surrounds the cell.",
      },
      commonMistake:
        "Clicking an internal organelle. The structure that controls entry and exit has to be the outer edge.",
    },
    images: ["/hotspots/cell.svg"],
    hotspots: [
      { x: 37, y: 31, w: 29, h: 38, label: "A" },
      { x: 60, y: 22, w: 23, h: 23, label: "B" },
      { x: 12, y: 30, w: 8, h: 32, label: "C" },
      { x: 20, y: 62, w: 16, h: 16, label: "D" },
    ],
  },
  {
    section: "SCIENCE",
    topic: "biology",
    subtopic: "Describe Cell Structure, Function, and Organization",
    difficulty: 2,
    type: "HOT_SPOT",
    stem: "Click the structure that contains the cell's DNA and directs its activities.",
    options: ["Nucleus", "Mitochondrion", "Cell membrane", "Cytoplasm"],
    correct: [0],
    explanation:
      "The nucleus houses the cell's genetic material (DNA) and acts as the control center directing growth, metabolism, and reproduction.",
    rationale: {
      takeaway:
        "The nucleus stores the cell's DNA and acts as its control center.",
      whyCorrect:
        "Holding the genetic material lets the nucleus direct growth, metabolism, and reproduction through the instructions it stores.",
      distractors: {
        "1": "The mitochondrion produces ATP through cellular respiration; it powers the cell rather than directing it.",
        "2": "The cell membrane is the outer boundary controlling what moves in and out.",
        "3": "The cytoplasm is the fluid suspending the organelles, not the DNA-holding compartment.",
      },
      commonMistake:
        "Confusing the control center with the power supply. The nucleus stores instructions; the mitochondrion supplies energy.",
    },
    images: ["/hotspots/cell.svg"],
    hotspots: [
      { x: 37, y: 31, w: 29, h: 38, label: "A" },
      { x: 60, y: 22, w: 23, h: 23, label: "B" },
      { x: 12, y: 30, w: 8, h: 32, label: "C" },
      { x: 20, y: 62, w: 16, h: 16, label: "D" },
    ],
  },
];
