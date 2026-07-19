import type { SeedQuestion } from "./seed-types";
import { GENERATED_QUESTIONS } from "./questions.generated";
import { GENERATED_QUESTIONS_2 } from "./questions.generated.2";
import { GENERATED_QUESTIONS_3 } from "./questions.generated.3";
import { GENERATED_QUESTIONS_4 } from "./questions.generated.4";
import { GENERATED_QUESTIONS_5 } from "./questions.generated.5";
import { GENERATED_QUESTIONS_6 } from "./questions.generated.6";
import { GENERATED_QUESTIONS_7 } from "./questions.generated.7";
import { GENERATED_QUESTIONS_HOTSPOTS } from "./questions.generated.hotspots";
import { DIAGRAM_QUESTIONS } from "./questions.diagrams";
import { RATIONALES } from "./rationales";

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
    rationale: {
      takeaway:
        "The main idea is the point the whole passage supports, not one detail or a statement it contradicts.",
      whyCorrect:
        "Both sentences point the same way: residents petitioned and the council extended hours, so the correct choice links that cause to that result.",
      distractors: {
        "0": "The parents wanted more access, which shows interest in the library, not dislike.",
        "1": "Hours were extended, so the library stays open later, not earlier.",
        "3": "The council acted on the petition by changing the hours, so it did not ignore it.",
      },
      commonMistake:
        "Picking a choice that names one detail or flatly contradicts the text. Ask which statement the whole passage supports.",
    },
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
    rationale: {
      takeaway:
        "A 'because' clause states the direct cause, so read it for the answer to a 'why' question.",
      whyCorrect:
        "The passage says she checked early 'because her oven runs hot,' meaning it heats more than expected and cooks food faster.",
      distractors: {
        "0": "She followed the recipe and adjusted the timing, so she did not forget it.",
        "2": "The text faults her oven's heat, not the recipe.",
        "3": "Checking early prevents overbaking; she wanted the bread done right, not undercooked.",
      },
      commonMistake:
        "Inventing a reason the text does not give. The cause is stated outright in the 'because' clause.",
    },
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
    rationale: {
      takeaway:
        "For select-all, keep only actions the passage actually names and reject anything it never mentions.",
      whyCorrect:
        "The passage names all three: cleaning the riverbank (removing litter), planting native grasses, and posting signs asking visitors not to litter.",
      distractors: {
        "2": "A boat dock is never mentioned; the volunteers only cleaned, planted, and posted signs.",
      },
      commonMistake:
        "Adding a plausible-sounding action that was not stated. Every selected option must be traceable to the text.",
    },
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
    rationale: {
      takeaway:
        "Use the sentence context: 'reached an impasse' signals a stuck, no-progress situation.",
      whyCorrect:
        "An impasse is a deadlock, a point where no further progress can be made.",
      distractors: {
        "0": "An agreement is the opposite of an impasse; reaching agreement means progress, not a standstill.",
        "2": "A celebration is unrelated; a negotiation that stalls is not a cause for celebration.",
        "3": "A beginning implies starting out, but an impasse is where forward movement stops.",
      },
      commonMistake:
        "Guessing from a positive-sounding word. The context 'negotiation reached' points to a blocked outcome.",
    },
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
    rationale: {
      takeaway:
        "Identify author's purpose by the effect the words aim for: inform, persuade, entertain, or describe.",
      whyCorrect:
        "The urgent command 'Read this now, before it's too late' pushes the reader to act quickly, which is persuasion.",
      distractors: {
        "0": "Informing states neutral facts; this sentence pressures the reader instead of reporting anything.",
        "2": "There is no story or humor here, so it is not meant to entertain.",
        "3": "Nothing about a scene is described; the sentence issues a call to act.",
      },
      commonMistake:
        "Confusing an urgent tone with simply giving information. A command urging action is persuasive.",
    },
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
    rationale: {
      takeaway:
        "Match the structure to what the parts do: a claim backed by evidence is an argument structure.",
      whyCorrect:
        "A claim, then three supporting studies, then a restated claim is the classic claim-and-evidence pattern.",
      distractors: {
        "0": "Chronological order arranges events by time; these studies are support, not a timeline.",
        "1": "Compare and contrast weighs similarities and differences; here everything supports one claim.",
        "3": "Cause and effect links an action to a result; this text argues a point rather than tracing causes.",
      },
      commonMistake:
        "Defaulting to chronological order because items are listed. Ask what each part does, not just where it sits.",
    },
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
    rationale: {
      takeaway:
        "To find a whole-container amount, multiply the per-serving amount by the number of servings.",
      steps: [
        "Identify the amount per serving: 240 mg of sodium.",
        "Multiply by servings per container: 240 × 3 = 720 mg.",
      ],
      whyCorrect:
        "720 mg is 240 mg times 3 servings, the sodium in the full container.",
      distractors: {
        "0": "80 mg divides 240 by 3 instead of multiplying, giving a third of one serving.",
        "1": "240 mg is the amount in one serving only, not the whole container.",
        "3": "243 mg adds 3 to 240 instead of multiplying by 3.",
      },
      commonMistake:
        "Adding or dividing by the serving count instead of multiplying by it.",
    },
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
    rationale: {
      takeaway:
        "Different word choices about the same event usually reveal the authors' differing perspectives.",
      whyCorrect:
        "One article's 'minor inconvenience' and the other's 'devastating event' describe the same storm, so the gap is in viewpoint.",
      distractors: {
        "1": "A difference in tone is not evidence that either article stated a false fact.",
        "2": "Both articles describe the same storm, so the contrast comes from the writers, not from the weather changing.",
        "3": "Opposite descriptions show the reporting is not identical.",
      },
      commonMistake:
        "Assuming one source must be wrong. Contrasting tone about one event points to perspective, not error.",
    },
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
    rationale: {
      takeaway: "Isolate x by undoing addition first, then division.",
      steps: [
        "Subtract 5 from both sides: 3x = 20 − 5 = 15.",
        "Divide both sides by 3: x = 15 ÷ 3 = 5.",
      ],
      whyCorrect: "Check by substituting back: 3(5) + 5 = 20.",
      distractors: {
        "0": "3 is the coefficient of x, not the solution.",
        "2": "7 comes from dividing 20 by 3 and rounding, which skips the subtraction step.",
        "3": "15 is the value of 3x after subtracting, before the division by 3.",
      },
      commonMistake:
        "Dividing before subtracting. When solving, undo addition and subtraction before multiplication and division.",
    },
  },
  {
    section: "MATH",
    topic: "numbers-algebra",
    difficulty: 2,
    stem: "What is 3/4 expressed as a percent?",
    options: ["34%", "43%", "75%", "0.75%"],
    correct: [2],
    explanation: "3 ÷ 4 = 0.75, and 0.75 × 100 = 75%.",
    rationale: {
      takeaway:
        "Convert a fraction to a percent by dividing the numerator by the denominator, then multiplying by 100.",
      steps: [
        "Divide: 3 ÷ 4 = 0.75.",
        "Multiply by 100 to get percent: 0.75 × 100 = 75%.",
      ],
      whyCorrect:
        "3/4 equals 0.75, which is 75 parts per 100, or 75%.",
      distractors: {
        "0": "34% just reuses the digits 3 and 4; it never divides.",
        "1": "43% flips those digits and still skips the division.",
        "3": "0.75% is the decimal without the multiplication by 100, leaving it 100 times too small.",
      },
      commonMistake:
        "Reading the numerator and denominator as the digits of the percent instead of dividing them.",
    },
  },
  {
    section: "MATH",
    topic: "numbers-algebra",
    difficulty: 2,
    stem: "A shirt costs $40 and is marked down 25%. What is the sale price?",
    options: ["$10", "$15", "$30", "$35"],
    correct: [2],
    explanation: "25% of $40 is $10; $40 − $10 = $30.",
    rationale: {
      takeaway: "A markdown is subtracted from the original price; the sale price is what remains.",
      steps: [
        "Find the discount: 25% of $40 = 0.25 × 40 = $10.",
        "Subtract it from the original price: $40 − $10 = $30.",
      ],
      whyCorrect: "The sale price is the original $40 minus the $10 discount.",
      distractors: {
        "0": "$10 is the discount itself, not the price after the discount.",
        "1": "$15 subtracts 25 dollars instead of 25 percent.",
        "3": "$35 subtracts only $5, which would be a 12.5% markdown.",
      },
      commonMistake:
        "Stopping after computing the percent. The question asks for the price after the discount, so finish with the subtraction.",
    },
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
    rationale: {
      takeaway:
        "For a total over time, count how many intervals fit in the period, then multiply by the amount per interval.",
      steps: [
        "Count the 6-hour intervals in 24 hours: 24 ÷ 6 = 4.",
        "Multiply the number of doses by the volume each: 4 × 250 mL = 1000 mL.",
      ],
      whyCorrect:
        "Four doses of 250 mL over the 24-hour period total 1000 mL.",
      commonMistake:
        "Multiplying 250 by 24 as if the fluid ran hourly, instead of by the 4 six-hour doses.",
    },
  },
  {
    section: "MATH",
    topic: "numbers-algebra",
    difficulty: 3,
    stem: "If 2 nurses can care for 16 patients, how many nurses are needed for 40 patients at the same ratio?",
    options: ["4", "5", "8", "10"],
    correct: [1],
    explanation: "Ratio is 1 nurse : 8 patients. 40 ÷ 8 = 5 nurses.",
    rationale: {
      takeaway:
        "Reduce a ratio to one unit first, then scale it to the new total.",
      steps: [
        "Simplify the given ratio: 2 nurses to 16 patients is 1 nurse to 8 patients.",
        "Divide the new patient count by 8: 40 ÷ 8 = 5 nurses.",
      ],
      whyCorrect:
        "At 1 nurse per 8 patients, 5 nurses cover 5 × 8 = 40 patients, which matches the requirement.",
      distractors: {
        "0": "4 doubles the original 2 nurses, but 4 nurses would only cover 32 patients.",
        "2": "8 is the patients-per-nurse figure, not a count of nurses.",
        "3": "10 divides 40 by 4 instead of 8, using the wrong ratio.",
      },
      commonMistake:
        "Scaling the wrong number. Simplify to a per-nurse rate before dividing the new total.",
    },
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
    rationale: {
      takeaway:
        "The mean is the sum of all values divided by how many values there are.",
      steps: [
        "Add the scores: 80 + 90 + 70 + 100 = 340.",
        "Divide by the number of scores: 340 ÷ 4 = 85.",
      ],
      whyCorrect:
        "Check it: 85 × 4 = 340, which matches the total of the four scores.",
      distractors: {
        "0": "80 is one of the scores, not the average of all four.",
        "2": "90 is a single score and sits above the true average.",
        "3": "100 is the highest score, which is the maximum, not the mean.",
      },
      commonMistake:
        "Forgetting to divide by the number of values, or dividing by the wrong count.",
    },
  },
  {
    section: "MATH",
    topic: "measurement-data",
    difficulty: 2,
    stem: "Convert 2.5 kilograms to grams.",
    options: ["25 g", "250 g", "2,500 g", "25,000 g"],
    correct: [2],
    explanation: "1 kg = 1,000 g, so 2.5 × 1,000 = 2,500 g.",
    rationale: {
      takeaway:
        "Going from a larger unit to a smaller one multiplies: kilograms to grams means times 1,000.",
      steps: [
        "Recall the conversion: 1 kg = 1,000 g.",
        "Multiply: 2.5 × 1,000 = 2,500 g.",
      ],
      whyCorrect:
        "2,500 g is 2.5 groups of 1,000 g, which is exactly 2.5 kg.",
      distractors: {
        "0": "25 g moves the decimal the wrong direction, shrinking the value instead of growing it.",
        "1": "250 g multiplies by only 100, missing a factor of 10.",
        "3": "25,000 g multiplies by 10,000, one factor of 10 too many.",
      },
      commonMistake:
        "Miscounting zeros. Kilo means 1,000, so shift the decimal three places to the right.",
    },
  },
  {
    section: "MATH",
    topic: "measurement-data",
    difficulty: 2,
    stem: "A bar graph shows sales of 20, 35, and 45 units over three months. What was the total?",
    options: ["90", "95", "100", "105"],
    correct: [2],
    explanation: "20 + 35 + 45 = 100 units.",
    rationale: {
      takeaway:
        "A total from a bar graph is the sum of every bar's value.",
      steps: [
        "Add the first two months: 20 + 35 = 55.",
        "Add the third month: 55 + 45 = 100 units.",
      ],
      whyCorrect:
        "The three bars sum to exactly 100 units.",
      distractors: {
        "0": "90 falls 10 short of the true sum.",
        "1": "95 undercounts the sum by 5.",
        "3": "105 overcounts the sum by 5.",
      },
      commonMistake:
        "Adding all three at once and slipping a digit. Add in pairs, then check the running total.",
    },
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
    rationale: {
      takeaway:
        "The median is the middle value after the numbers are put in order.",
      steps: [
        "Put the values in order: 4, 8, 12, 15, 20.",
        "With five values, the middle is the third one: 12.",
      ],
      whyCorrect:
        "12 has exactly two values below it (4 and 8) and two above it (15 and 20).",
      distractors: {
        "0": "8 is the second value in order, one position short of the middle.",
        "2": "15 is the fourth value, one position past the middle.",
        "3": "11.8 is the mean of the five numbers, not the median.",
      },
      commonMistake:
        "Taking the middle of the list as written without sorting first, or computing the mean by habit.",
    },
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
    rationale: {
      takeaway:
        "The heart is the muscular pump that drives blood through the circulatory system.",
      whyCorrect:
        "The heart contracts rhythmically to push blood out to every tissue in the body.",
      distractors: {
        "0": "The liver filters and processes blood chemically, but it does not move blood.",
        "2": "The lungs add oxygen to blood; the heart is what pushes that blood onward.",
        "3": "The kidneys filter blood to form urine; they do not pump it.",
      },
      commonMistake:
        "Confusing organs that process blood with the one organ that moves it. Only the heart pumps.",
    },
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
    rationale: {
      takeaway:
        "Gas exchange happens in the alveoli, the thin-walled air sacs wrapped in capillaries.",
      whyCorrect:
        "Alveoli have walls thin enough for oxygen to diffuse into the blood and carbon dioxide to diffuse out.",
      distractors: {
        "0": "The trachea is the windpipe, a conducting tube with walls too thick for exchange.",
        "1": "The bronchi branch air toward the alveoli but do not exchange gases themselves.",
        "3": "The pharynx (throat) is a shared passage for air and food, well above the exchange surface.",
      },
      commonMistake:
        "Choosing a larger, more familiar airway. Exchange requires the thin-walled alveoli, not the conducting tubes.",
    },
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
    rationale: {
      takeaway:
        "The central nervous system is defined as the brain plus the spinal cord; everything else is peripheral.",
      whyCorrect:
        "By definition the CNS is made up of the brain and spinal cord, the body's processing center.",
      distractors: {
        "0": "The peripheral nervous system is the nerves outside the brain and spinal cord.",
        "2": "The autonomic system is a peripheral subdivision controlling involuntary functions like heart rate.",
        "3": "The somatic system is a peripheral subdivision handling voluntary muscle control.",
      },
      commonMistake:
        "Mixing the CNS with its peripheral subdivisions. Brain and cord are central; the nerves leaving them are peripheral.",
    },
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
    rationale: {
      takeaway:
        "Arteries carry blood away from the heart, veins carry it back: direction, not oxygen level, defines them.",
      whyCorrect:
        "Arteries leave the heart under pressure, and most of them deliver oxygen-rich blood to body tissues.",
      distractors: {
        "0": "Veins return blood toward the heart, the opposite direction.",
        "2": "Capillaries are the tiny exchange vessels between arteries and veins, not the outbound carriers.",
        "3": "Venules are small vessels that collect blood from capillaries into veins, heading back to the heart.",
      },
      commonMistake:
        "Sorting vessels by oxygen level instead of direction. Arteries mean away, even when the blood is oxygen-poor.",
    },
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
    rationale: {
      takeaway:
        "The mitochondrion is the cell's powerhouse, producing most of its ATP.",
      whyCorrect:
        "Mitochondria run cellular respiration, converting nutrients into the bulk of the cell's usable ATP energy.",
      distractors: {
        "0": "The nucleus stores DNA and directs the cell; it does not generate energy.",
        "1": "Ribosomes assemble proteins from amino acids; they consume energy rather than make it.",
        "3": "The Golgi apparatus packages and ships proteins, not energy.",
      },
      commonMistake:
        "Confusing the energy producer with the organelles that handle DNA or proteins.",
    },
  },
  {
    section: "SCIENCE",
    topic: "biology",
    difficulty: 2,
    stem: "What molecule carries genetic information in most living organisms?",
    options: ["ATP", "DNA", "Glucose", "Hemoglobin"],
    correct: [1],
    explanation: "DNA stores and transmits genetic information.",
    rationale: {
      takeaway:
        "DNA is the molecule that stores genetic information and passes it to new cells and offspring.",
      whyCorrect:
        "DNA carries the coded instructions for building proteins and is copied whenever cells divide.",
      distractors: {
        "0": "ATP carries usable energy for cell work; it holds no genetic code.",
        "2": "Glucose is a sugar the cell burns for energy, not an information molecule.",
        "3": "Hemoglobin transports oxygen inside red blood cells; it stores no heredity.",
      },
      commonMistake:
        "Confusing energy or transport molecules with the information molecule, DNA.",
    },
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
    rationale: {
      takeaway:
        "Photosynthesis captures sunlight and stores it as chemical energy in glucose.",
      whyCorrect:
        "Photosynthesis uses light energy along with water and carbon dioxide to build glucose and release oxygen.",
      distractors: {
        "0": "Respiration releases energy already stored in glucose; it does not capture sunlight.",
        "2": "Digestion breaks food into smaller molecules and involves no light energy.",
        "3": "Fermentation extracts energy from sugar without oxygen and without sunlight.",
      },
      commonMistake:
        "Swapping photosynthesis and respiration. Photosynthesis stores light energy; respiration releases stored energy.",
    },
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
    rationale: {
      takeaway:
        "On the pH scale, below 7 is acidic, exactly 7 is neutral, and above 7 is basic.",
      whyCorrect:
        "A pH of 3 sits well below 7, which places the solution firmly on the acidic side.",
      distractors: {
        "0": "Strongly basic solutions have a high pH, near 11 to 14, not 3.",
        "1": "Neutral is exactly pH 7; a pH of 3 is thousands of times more acidic than that.",
        "3": "'Salty' describes taste or salt content, which is not what pH measures.",
      },
      commonMistake:
        "Reading a low number as 'low acidity.' On the pH scale, lower means more acidic.",
    },
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
    rationale: {
      takeaway:
        "The atomic number is the proton count, and the proton count is what identifies the element.",
      whyCorrect:
        "Every atom of a given element has the same number of protons, so that count defines the atomic number.",
      distractors: {
        "0": "Neutron count varies between isotopes of the same element, so it cannot define it.",
        "2": "Electrons plus neutrons is not a standard atomic quantity at all.",
        "3": "Atomic mass counts protons plus neutrons, so it is larger than the atomic number.",
      },
      commonMistake:
        "Confusing atomic number (protons only) with atomic mass (protons plus neutrons).",
    },
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
    rationale: {
      takeaway:
        "A balanced equation shows conservation of mass: atoms are rearranged, never created or destroyed.",
      whyCorrect:
        "Count them: 4 hydrogen and 2 oxygen atoms appear on each side, so the mass is unchanged.",
      distractors: {
        "0": "Energy is released or absorbed in reactions, and the atom counts say nothing about it.",
        "2": "Gas volumes can change during a reaction; balancing does not track volume.",
        "3": "Temperature commonly changes as reactions release or absorb heat.",
      },
      commonMistake:
        "Thinking balancing is about energy or volume. It tracks equal atom counts, which is conservation of mass.",
    },
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
    rationale: {
      takeaway:
        "The control group gets no treatment and serves as the baseline the treated group is measured against.",
      whyCorrect:
        "The plants receiving no fertilizer show what happens without the treatment, giving the comparison baseline.",
      distractors: {
        "0": "The independent variable is the factor being changed, the fertilizer itself, not a group.",
        "2": "The dependent variable is the measured outcome, plant growth, not a group.",
        "3": "A hypothesis is the prediction being tested, not a set of subjects.",
      },
      commonMistake:
        "Labeling groups with variable names. Groups are control or experimental; variables are independent or dependent.",
    },
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
    rationale: {
      takeaway:
        "What the researcher changes on purpose is the independent variable; what gets measured is the dependent one.",
      whyCorrect:
        "The researcher sets the amount of light, so light is the manipulated, independent variable.",
      distractors: {
        "0": "The dependent variable here is plant growth, the outcome being measured.",
        "1": "A control is a comparison condition, not the factor being varied.",
        "3": "A constant is deliberately held the same, but light is deliberately changed.",
      },
      commonMistake:
        "Swapping independent and dependent. What you change is independent; what you measure depends on it.",
    },
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
    rationale: {
      takeaway:
        "Apostrophe forms are contractions: \"it's\" means it is, and \"you're\" means you are.",
      whyCorrect:
        "Expand it and it still reads correctly: \"It is going to rain, so bring your umbrella.\"",
      distractors: {
        "0": "\"Its\" misses the contraction for \"it is,\" and \"you're umbrella\" expands to \"you are umbrella.\"",
        "2": "\"Your umbrella\" is right, but \"Its going to rain\" needs the contraction \"It's.\"",
        "3": "\"It's\" is right, but \"you're umbrella\" expands to \"you are umbrella,\" which makes no sense.",
      },
      commonMistake:
        "Guessing by sound. Expand the apostrophe form and see whether the sentence still works.",
    },
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
    rationale: {
      takeaway:
        "The verb agrees with the true subject, not with a noun sitting inside a prepositional phrase.",
      whyCorrect:
        "Strip out \"of items\" and the core sentence is \"The list is on the desk,\" which agrees correctly.",
      distractors: {
        "0": "\"Are\" agrees with \"items,\" but \"items\" is inside the phrase \"of items,\" not the subject.",
        "2": "\"Were\" is plural and past tense, while the singular subject \"list\" needs \"is.\"",
        "3": "\"Be\" is the unconjugated form and never agrees with a singular present-tense subject.",
      },
      commonMistake:
        "Matching the verb to the nearest noun. Cross out the prepositional phrase to find the real subject.",
    },
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
    rationale: {
      takeaway:
        "When a dependent clause opens a sentence, close it with a comma before the main clause begins.",
      whyCorrect:
        "The comma falls exactly at the end of \"Because the storm intensified,\" marking where the main clause starts.",
      distractors: {
        "0": "With no comma at all, the introductory clause runs straight into the main clause.",
        "2": "The comma after \"Because\" splits the clause open instead of closing it.",
        "3": "The comma after \"nurses\" separates the subject from its verb \"postponed.\"",
      },
      commonMistake:
        "Dropping the comma or placing it mid-clause. Find where the opening clause ends and put it there.",
    },
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
    rationale: {
      takeaway:
        "Replace bulky phrases like \"due to the fact that\" with one precise word such as \"because.\"",
      whyCorrect:
        "\"Because she was tired, she rested\" keeps the full meaning in the fewest clear, grammatical words.",
      distractors: {
        "0": "\"Due to the fact that being tired\" keeps the wordy phrase and is ungrammatical on top of it.",
        "2": "\"Due to the fact of tiredness\" trades one bulky phrase for another instead of trimming.",
        "3": "\"Tired she rested because of it\" is short but garbled, and the vague \"it\" loses clarity.",
      },
      commonMistake:
        "Assuming shortest is best. The strongest revision is brief and still clear and grammatical.",
    },
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
    rationale: {
      takeaway:
        "Formal academic tone stays neutral and precise, avoiding slang, exclamations, and casual questions.",
      whyCorrect:
        "\"The results were unexpected and warrant further study\" reports objectively and suggests a next step.",
      distractors: {
        "0": "\"Super cool\" and \"kinda\" are slang, far too casual for an academic paper.",
        "2": "\"Wow\" plus an exclamation point makes this an emotional reaction, not a finding.",
        "3": "The rhetorical question and \"totally wild\" are conversational, not academic.",
      },
      commonMistake:
        "Choosing the liveliest wording. Academic tone favors restraint over excitement.",
    },
  },
  {
    section: "ENGLISH",
    topic: "knowledge-language",
    difficulty: 1,
    stem: "Which word is a synonym for \"benefit\"?",
    options: ["advantage", "penalty", "delay", "mistake"],
    correct: [0],
    explanation: "A benefit is an advantage or positive effect.",
    rationale: {
      takeaway:
        "A synonym carries the same meaning, including the same positive or negative charge.",
      whyCorrect:
        "\"Advantage\" means a favorable gain, the same positive sense as \"benefit.\"",
      distractors: {
        "1": "A penalty is a punishment or loss, the opposite of a benefit.",
        "2": "A delay is a hold-up in time, unrelated to gain or loss.",
        "3": "A mistake is an error, which is a drawback rather than a benefit.",
      },
      commonMistake:
        "Picking a word that is merely related. Check that the charge matches too: a benefit is always positive.",
    },
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
    rationale: {
      takeaway:
        "The prefix \"hyper-\" means over, above, or excessive.",
      whyCorrect:
        "Hypertension is excessively high blood pressure, which matches \"hyper-\" as above or excessive.",
      distractors: {
        "0": "\"Below\" is the meaning of \"hypo-,\" the direct opposite of \"hyper-.\"",
        "2": "\"Around\" is the prefix \"peri-,\" as in pericardium.",
        "3": "\"Without\" is the prefix \"a-\" or \"an-,\" as in anemia.",
      },
      commonMistake:
        "Mixing up \"hyper-\" and \"hypo-.\" They are opposites: hyper is high, hypo is low.",
    },
  },
  {
    section: "ENGLISH",
    topic: "vocabulary",
    difficulty: 2,
    stem: "What does the root \"cardi\" mean in medical terms?",
    options: ["lung", "heart", "liver", "brain"],
    correct: [1],
    explanation: "\"Cardi/o\" refers to the heart (e.g., cardiology).",
    rationale: {
      takeaway:
        "The root \"cardi/o\" means heart.",
      whyCorrect:
        "Familiar terms confirm it: cardiology is the study of the heart, and cardiac arrest is heart stoppage.",
      distractors: {
        "0": "Lung is \"pulmon/o\" or \"pneum/o,\" as in pulmonary.",
        "2": "Liver is \"hepat/o,\" as in hepatitis.",
        "3": "Brain is \"encephal/o\" or \"cerebr/o,\" as in cerebral.",
      },
      commonMistake:
        "Guessing the organ from the question's medical setting. Anchor the root to a word you already know.",
    },
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
    rationale: {
      takeaway:
        "The right word has to fit both the meaning and the grammatical slot the sentence leaves open.",
      whyCorrect:
        "\"Effective\" means producing the intended result, and it is the adjective the blank calls for after \"was.\"",
      distractors: {
        "1": "\"Defective\" means faulty, the opposite of a medication that reduced the fever.",
        "2": "\"Affection\" is a noun meaning fondness, wrong in both meaning and part of speech.",
        "3": "\"Effect\" is a noun; the blank needs an adjective describing the medication.",
      },
      commonMistake:
        "Choosing by look-alike spelling. Test the part of speech first, then the meaning.",
    },
  },
];

// Full seed bank: hand-authored starters plus the verified, skill-mapped
// generated bank (authored to the NurseHub/ATI skill taxonomy in skills.ts,
// every answer independently blind-verified, option order shuffled).
const ALL_QUESTIONS: SeedQuestion[] = [
  ...BASE_QUESTIONS,
  ...GENERATED_QUESTIONS,
  ...GENERATED_QUESTIONS_2,
  ...GENERATED_QUESTIONS_3,
  ...GENERATED_QUESTIONS_4,
  ...GENERATED_QUESTIONS_5,
  ...GENERATED_QUESTIONS_6,
  ...GENERATED_QUESTIONS_7,
  ...GENERATED_QUESTIONS_HOTSPOTS,
  ...DIAGRAM_QUESTIONS,
];

// A few stems appear twice in the bank with *different* options and correct
// answers, so a stem alone cannot identify a question. Distractor explanations
// are keyed by option index, so attaching one to the wrong copy would teach a
// wrong answer: the overlay refuses ambiguous stems rather than guessing.
const stemCounts = new Map<string, number>();
for (const q of ALL_QUESTIONS) {
  stemCounts.set(q.stem, (stemCounts.get(q.stem) ?? 0) + 1);
}

/** Rationale keys that match no question — a typo or a retired stem. */
export function orphanedRationaleKeys(): string[] {
  return Object.keys(RATIONALES).filter((k) => !stemCounts.has(k));
}

/** Rationale keys that match more than one question, and so cannot be applied. */
export function ambiguousRationaleKeys(): string[] {
  return Object.keys(RATIONALES).filter((k) => (stemCounts.get(k) ?? 0) > 1);
}

// Authored rationales live outside the generated files (see rationales.ts) and
// attach by exact stem, so regenerating the bank never drops teaching content.
// An inline `rationale` on the question itself still wins.
export const QUESTIONS: SeedQuestion[] = ALL_QUESTIONS.map((q) => {
  if (q.rationale) return q;
  const overlay = RATIONALES[q.stem];
  if (!overlay || (stemCounts.get(q.stem) ?? 0) > 1) return q;
  return { ...q, rationale: overlay };
});
