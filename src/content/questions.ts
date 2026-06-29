import type { SeedQuestion } from "./seed-types";
import { GENERATED_QUESTIONS } from "./questions.generated";
import { GENERATED_QUESTIONS_2 } from "./questions.generated.2";
import { GENERATED_QUESTIONS_3 } from "./questions.generated.3";
import { GENERATED_QUESTIONS_4 } from "./questions.generated.4";
import { GENERATED_QUESTIONS_5 } from "./questions.generated.5";
import { GENERATED_QUESTIONS_6 } from "./questions.generated.6";

// Original practice questions authored to the ATI TEAS 7 blueprint.
// Hand-authored starter bank. NurseHub PDF content is imported separately
// as private content, never seeded here.
const BASE_QUESTIONS: SeedQuestion[] = [
  // ─────────────────────────── READING ───────────────────────────
  // key-ideas-details
  {
    section: "READING",
    topic: "key-ideas-details",
    difficulty: 1,
    stem: 'Passage: "The city council voted to extend library hours after residents petitioned for more evening access. Working parents had argued that the old 6 p.m. closing time left no room for after-dinner visits." What is the main idea?',
    options: [
      "Working parents dislike the library.",
      "The library will close earlier than before.",
      "Resident demand led the council to extend library hours.",
      "The council ignored the petition.",
    ],
    correct: [2],
    explanation:
      "The passage states residents petitioned and the council responded by extending hours. The other choices contradict the text.",
  },
  {
    section: "READING",
    topic: "key-ideas-details",
    difficulty: 2,
    stem: 'Passage: "Although the recipe called for an hour of baking, Mara checked the bread at 45 minutes because her oven runs hot." Why did Mara check early?',
    options: [
      "She forgot the instructions.",
      "Her oven heats more than a standard oven.",
      "The recipe was wrong.",
      "She wanted the bread undercooked.",
    ],
    correct: [1],
    explanation:
      "The phrase \"because her oven runs hot\" gives the direct reason: it heats more than expected, so food cooks faster.",
  },
  {
    section: "READING",
    topic: "key-ideas-details",
    difficulty: 2,
    type: "MULTI",
    stem: 'Passage: "Volunteers cleaned the riverbank, planted native grasses, and posted signs asking visitors not to litter." Which actions did the volunteers take? Select all that apply.',
    options: [
      "Removed litter from the riverbank",
      "Planted native grasses",
      "Built a boat dock",
      "Posted anti-litter signs",
    ],
    correct: [0, 1, 3],
    explanation:
      "The passage names cleaning, planting native grasses, and posting signs. A boat dock is never mentioned.",
  },
  // craft-structure
  {
    section: "READING",
    topic: "craft-structure",
    difficulty: 2,
    stem: 'In the sentence "The negotiation reached an impasse," the word "impasse" most nearly means:',
    options: ["agreement", "deadlock", "celebration", "beginning"],
    correct: [1],
    explanation:
      "An impasse is a situation where no progress is possible — a deadlock.",
  },
  {
    section: "READING",
    topic: "craft-structure",
    difficulty: 2,
    stem: "An author writes, \"Read this now, before it's too late!\" The primary purpose of this sentence is to:",
    options: [
      "inform the reader of a fact",
      "persuade the reader to act with urgency",
      "entertain with a story",
      "describe a scene",
    ],
    correct: [1],
    explanation:
      "The urgent command and exclamation are meant to persuade and prompt immediate action.",
  },
  {
    section: "READING",
    topic: "craft-structure",
    difficulty: 3,
    stem: "A text presents a claim, then lists three studies that support it, then restates the claim. This organizational structure is best described as:",
    options: [
      "chronological order",
      "compare and contrast",
      "claim and supporting evidence",
      "cause and effect",
    ],
    correct: [2],
    explanation:
      "A claim followed by supporting studies and a restatement is a claim-and-evidence (argument) structure.",
  },
  // integration-knowledge
  {
    section: "READING",
    topic: "integration-knowledge",
    difficulty: 2,
    stem: 'A nutrition label lists 240 mg of sodium per serving and 3 servings per container. How much sodium is in the whole container?',
    options: ["80 mg", "240 mg", "720 mg", "243 mg"],
    correct: [2],
    explanation: "240 mg × 3 servings = 720 mg for the full container.",
  },
  {
    section: "READING",
    topic: "integration-knowledge",
    difficulty: 2,
    stem: "Two articles describe the same storm. One calls it \"a minor inconvenience\" and the other \"a devastating event.\" This difference most likely reflects:",
    options: [
      "the authors' differing points of view",
      "a factual error in one article",
      "the storm changing over time",
      "identical reporting",
    ],
    correct: [0],
    explanation:
      "Different word choices about the same event reflect differing perspectives or purposes of the authors.",
  },

  // ─────────────────────────── MATH ───────────────────────────
  // numbers-algebra
  {
    section: "MATH",
    topic: "numbers-algebra",
    difficulty: 1,
    stem: "Solve for x: 3x + 5 = 20",
    options: ["3", "5", "7", "15"],
    correct: [1],
    explanation: "3x = 20 − 5 = 15, so x = 15 ÷ 3 = 5.",
  },
  {
    section: "MATH",
    topic: "numbers-algebra",
    difficulty: 2,
    stem: "What is 3/4 expressed as a percent?",
    options: ["34%", "43%", "75%", "0.75%"],
    correct: [2],
    explanation: "3 ÷ 4 = 0.75, and 0.75 × 100 = 75%.",
  },
  {
    section: "MATH",
    topic: "numbers-algebra",
    difficulty: 2,
    stem: "A shirt costs $40 and is marked down 25%. What is the sale price?",
    options: ["$10", "$15", "$30", "$35"],
    correct: [2],
    explanation: "25% of $40 is $10; $40 − $10 = $30.",
  },
  {
    section: "MATH",
    topic: "numbers-algebra",
    difficulty: 2,
    type: "FILL_BLANK",
    stem: "A patient needs 250 mL of fluid every 6 hours. How many mL will they receive in 24 hours? (Enter a number.)",
    options: [],
    correct: ["1000", "1,000"],
    explanation: "24 ÷ 6 = 4 doses; 4 × 250 mL = 1000 mL.",
  },
  {
    section: "MATH",
    topic: "numbers-algebra",
    difficulty: 3,
    stem: "If 2 nurses can care for 16 patients, how many nurses are needed for 40 patients at the same ratio?",
    options: ["4", "5", "8", "10"],
    correct: [1],
    explanation: "Ratio is 1 nurse : 8 patients. 40 ÷ 8 = 5 nurses.",
  },
  // measurement-data
  {
    section: "MATH",
    topic: "measurement-data",
    difficulty: 1,
    stem: "The test scores are 80, 90, 70, and 100. What is the mean?",
    options: ["80", "85", "90", "100"],
    correct: [1],
    explanation: "(80 + 90 + 70 + 100) ÷ 4 = 340 ÷ 4 = 85.",
  },
  {
    section: "MATH",
    topic: "measurement-data",
    difficulty: 2,
    stem: "Convert 2.5 kilograms to grams.",
    options: ["25 g", "250 g", "2,500 g", "25,000 g"],
    correct: [2],
    explanation: "1 kg = 1,000 g, so 2.5 × 1,000 = 2,500 g.",
  },
  {
    section: "MATH",
    topic: "measurement-data",
    difficulty: 2,
    stem: "A bar graph shows sales of 20, 35, and 45 units over three months. What was the total?",
    options: ["90", "95", "100", "105"],
    correct: [2],
    explanation: "20 + 35 + 45 = 100 units.",
  },
  {
    section: "MATH",
    topic: "measurement-data",
    difficulty: 2,
    stem: "What is the median of 12, 4, 8, 20, and 15?",
    options: ["8", "12", "15", "11.8"],
    correct: [1],
    explanation:
      "Ordered: 4, 8, 12, 15, 20. The middle value is 12.",
  },

  // ─────────────────────────── SCIENCE ───────────────────────────
  // anatomy-physiology
  {
    section: "SCIENCE",
    topic: "anatomy-physiology",
    difficulty: 1,
    stem: "Which organ is primarily responsible for pumping blood throughout the body?",
    options: ["Liver", "Heart", "Lungs", "Kidney"],
    correct: [1],
    explanation: "The heart pumps blood through the circulatory system.",
  },
  {
    section: "SCIENCE",
    topic: "anatomy-physiology",
    difficulty: 2,
    stem: "Where does gas exchange (oxygen and carbon dioxide) occur in the lungs?",
    options: ["Trachea", "Bronchi", "Alveoli", "Pharynx"],
    correct: [2],
    explanation:
      "Alveoli are tiny air sacs where oxygen and carbon dioxide are exchanged with the blood.",
  },
  {
    section: "SCIENCE",
    topic: "anatomy-physiology",
    difficulty: 2,
    stem: "Which part of the nervous system includes the brain and spinal cord?",
    options: [
      "Peripheral nervous system",
      "Central nervous system",
      "Autonomic nervous system",
      "Somatic nervous system",
    ],
    correct: [1],
    explanation:
      "The central nervous system (CNS) consists of the brain and spinal cord.",
  },
  {
    section: "SCIENCE",
    topic: "anatomy-physiology",
    difficulty: 3,
    stem: "Which type of blood vessel carries oxygen-rich blood away from the heart to the body?",
    options: ["Veins", "Arteries", "Capillaries", "Venules"],
    correct: [1],
    explanation:
      "Arteries carry blood away from the heart; most carry oxygenated blood (the pulmonary artery is the exception).",
  },
  // biology
  {
    section: "SCIENCE",
    topic: "biology",
    difficulty: 1,
    stem: "Which organelle is known as the powerhouse of the cell?",
    options: ["Nucleus", "Ribosome", "Mitochondrion", "Golgi apparatus"],
    correct: [2],
    explanation:
      "The mitochondrion produces most of the cell's ATP through cellular respiration.",
  },
  {
    section: "SCIENCE",
    topic: "biology",
    difficulty: 2,
    stem: "What molecule carries genetic information in most living organisms?",
    options: ["ATP", "DNA", "Glucose", "Hemoglobin"],
    correct: [1],
    explanation: "DNA stores and transmits genetic information.",
  },
  {
    section: "SCIENCE",
    topic: "biology",
    difficulty: 2,
    stem: "During which process do plants convert sunlight into chemical energy?",
    options: ["Respiration", "Photosynthesis", "Digestion", "Fermentation"],
    correct: [1],
    explanation:
      "Photosynthesis converts light energy, water, and CO2 into glucose and oxygen.",
  },
  // chemistry
  {
    section: "SCIENCE",
    topic: "chemistry",
    difficulty: 2,
    stem: "A solution with a pH of 3 is best described as:",
    options: ["strongly basic", "neutral", "acidic", "salty"],
    correct: [2],
    explanation: "A pH below 7 is acidic; pH 3 is fairly strongly acidic.",
  },
  {
    section: "SCIENCE",
    topic: "chemistry",
    difficulty: 2,
    stem: "What does the atomic number of an element represent?",
    options: [
      "Number of neutrons",
      "Number of protons",
      "Number of electrons plus neutrons",
      "Atomic mass",
    ],
    correct: [1],
    explanation:
      "The atomic number equals the number of protons in an atom's nucleus.",
  },
  {
    section: "SCIENCE",
    topic: "chemistry",
    difficulty: 3,
    stem: "In the reaction 2H₂ + O₂ → 2H₂O, what is being conserved?",
    options: [
      "Only energy",
      "Mass (number of atoms of each element)",
      "Only volume",
      "Temperature",
    ],
    correct: [1],
    explanation:
      "A balanced equation reflects conservation of mass: the same number of each atom appears on both sides.",
  },
  // scientific-reasoning
  {
    section: "SCIENCE",
    topic: "scientific-reasoning",
    difficulty: 2,
    stem: "In an experiment testing a new fertilizer, the group that receives no fertilizer is called the:",
    options: [
      "independent variable",
      "control group",
      "dependent variable",
      "hypothesis",
    ],
    correct: [1],
    explanation:
      "The control group receives no treatment and provides a baseline for comparison.",
  },
  {
    section: "SCIENCE",
    topic: "scientific-reasoning",
    difficulty: 2,
    stem: "A researcher changes the amount of light a plant receives and measures its growth. The amount of light is the:",
    options: [
      "dependent variable",
      "control",
      "independent variable",
      "constant",
    ],
    correct: [2],
    explanation:
      "The independent variable is the one the researcher deliberately changes; growth is the dependent variable.",
  },

  // ─────────────────────────── ENGLISH ───────────────────────────
  // conventions
  {
    section: "ENGLISH",
    topic: "conventions",
    difficulty: 1,
    stem: "Choose the correctly punctuated sentence.",
    options: [
      "Its going to rain, so bring you're umbrella.",
      "It's going to rain, so bring your umbrella.",
      "Its going to rain, so bring your umbrella.",
      "It's going to rain, so bring you're umbrella.",
    ],
    correct: [1],
    explanation:
      "\"It's\" = it is; \"your\" is possessive. Only the second sentence uses both correctly.",
  },
  {
    section: "ENGLISH",
    topic: "conventions",
    difficulty: 2,
    stem: "Which sentence uses subject-verb agreement correctly?",
    options: [
      "The list of items are on the desk.",
      "The list of items is on the desk.",
      "The list of items were on the desk.",
      "The list of items be on the desk.",
    ],
    correct: [1],
    explanation:
      "The subject is \"list\" (singular), so the verb is \"is.\" \"Of items\" is a prepositional phrase.",
  },
  {
    section: "ENGLISH",
    topic: "conventions",
    difficulty: 2,
    stem: "Which sentence is punctuated correctly?",
    options: [
      "Because the storm intensified the nurses postponed the transfer.",
      "Because the storm intensified, the nurses postponed the transfer.",
      "Because, the storm intensified the nurses postponed the transfer.",
      "Because the storm intensified the nurses, postponed the transfer.",
    ],
    correct: [1],
    explanation:
      "An introductory dependent clause (\"Because the storm intensified\") must be followed by a comma before the main clause. Unlike a short phrase, this comma is required, not optional.",
  },
  // knowledge-language
  {
    section: "ENGLISH",
    topic: "knowledge-language",
    difficulty: 2,
    stem: "Which revision makes this sentence most concise? \"Due to the fact that she was tired, she rested.\"",
    options: [
      "Due to the fact that being tired, she rested.",
      "Because she was tired, she rested.",
      "She rested due to the fact of tiredness.",
      "Tired she rested because of it.",
    ],
    correct: [1],
    explanation:
      "\"Because\" replaces the wordy \"due to the fact that\" without losing meaning.",
  },
  {
    section: "ENGLISH",
    topic: "knowledge-language",
    difficulty: 2,
    stem: "Which sentence is written in a formal tone appropriate for an academic paper?",
    options: [
      "The results were super cool and kinda surprising.",
      "The results were unexpected and warrant further study.",
      "Wow, nobody saw these results coming!",
      "The results? Totally wild.",
    ],
    correct: [1],
    explanation:
      "Formal academic tone avoids slang and exclamations; the second option is precise and objective.",
  },
  {
    section: "ENGLISH",
    topic: "knowledge-language",
    difficulty: 1,
    stem: "Which word is a synonym for \"benefit\"?",
    options: ["advantage", "penalty", "delay", "mistake"],
    correct: [0],
    explanation: "A benefit is an advantage or positive effect.",
  },
  // vocabulary
  {
    section: "ENGLISH",
    topic: "vocabulary",
    difficulty: 2,
    stem: "The prefix \"hyper-\" in \"hypertension\" means:",
    options: ["below", "above or excessive", "around", "without"],
    correct: [1],
    explanation:
      "\"Hyper-\" means over or excessive; hypertension is excessively high blood pressure.",
  },
  {
    section: "ENGLISH",
    topic: "vocabulary",
    difficulty: 2,
    stem: "What does the root \"cardi\" mean in medical terms?",
    options: ["lung", "heart", "liver", "brain"],
    correct: [1],
    explanation: "\"Cardi/o\" refers to the heart (e.g., cardiology).",
  },
  {
    section: "ENGLISH",
    topic: "vocabulary",
    difficulty: 1,
    stem: "Choose the word that best completes the sentence: \"The medication was ____ in reducing the fever.\"",
    options: ["effective", "defective", "affection", "effect"],
    correct: [0],
    explanation:
      "\"Effective\" (producing the intended result) fits; the others don't match the meaning or part of speech.",
  },
];

// Full seed bank: hand-authored starters plus the verified, skill-mapped
// generated bank (authored to the NurseHub/ATI skill taxonomy in skills.ts,
// every answer independently blind-verified, option order shuffled).
export const QUESTIONS: SeedQuestion[] = [
  ...BASE_QUESTIONS,
  ...GENERATED_QUESTIONS,
  ...GENERATED_QUESTIONS_2,
  ...GENERATED_QUESTIONS_3,
  ...GENERATED_QUESTIONS_4,
  ...GENERATED_QUESTIONS_5,
  ...GENERATED_QUESTIONS_6,
];
