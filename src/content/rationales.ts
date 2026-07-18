import type { StructuredRationale } from "@/lib/quiz/rationale";

/**
 * Structured rationales, authored separately from the question bank and merged
 * by stem at seed time (see questions.ts). Keeping them here means the
 * machine-generated question files can be regenerated without losing authored
 * teaching content, and a rationale can never drift onto the wrong question:
 * the key is the exact stem, and seeding warns about any key that matches
 * nothing.
 *
 * Coverage is deliberately deep-first (one whole skill at a time) rather than
 * thin across the bank: a partial rationale reads as a broken promise, while a
 * complete skill gives the session engine something real to teach with.
 */
export const RATIONALES: Record<string, StructuredRationale> = {
  // ── MATH / numbers-algebra / Solve Equations in One Variable ──────────────
  // Note: "Solve for x: 3x + 5 = 20" is deliberately absent. That stem appears
  // twice in the bank with different options, so a stem-keyed entry could not
  // say which option index each distractor note belongs to. Both copies carry
  // their own inline rationale instead.
  "Solve for x: 2(x − 4) = 10": {
    takeaway: "Distribute to every term inside the parentheses, not just the variable.",
    steps: [
      "Distribute the 2: 2x − 8 = 10.",
      "Add 8 to both sides: 2x = 18.",
      "Divide both sides by 2: x = 9.",
    ],
    whyCorrect: "Check by substituting: 2(9 − 4) = 2(5) = 10.",
    distractors: {
      "0": "18 is the value of 2x. Divide by 2 to finish.",
      "2": "7 comes from distributing only to the x, writing 2x − 4 = 10 instead of 2x − 8 = 10.",
      "3": "1 subtracts the 8 from 10 instead of adding it to both sides.",
    },
    commonMistake:
      "Multiplying the 2 by x but forgetting the −4. The factor outside multiplies every term inside.",
  },
  "Solve for x: x/3 − 2 = 4": {
    takeaway: "When x is divided, multiply at the end to undo it.",
    steps: ["Add 2 to both sides: x/3 = 6.", "Multiply both sides by 3: x = 18."],
    whyCorrect: "Check by substituting: 18/3 − 2 = 6 − 2 = 4.",
    distractors: {
      "0": "6 is the value of x/3. Multiply by 3 to get x itself.",
      "1": "12 multiplies 4 by 3 before adding the 2, skipping a step.",
      "3": "2 subtracts instead of adds, and never undoes the division.",
    },
    commonMistake:
      "Dividing by 3 again at the end. x/3 is already divided; multiplying is what undoes it.",
  },
  "Solve for x: 5x − 3 = 2x + 12": {
    takeaway: "Collect the variable terms on one side first, then solve as usual.",
    steps: [
      "Subtract 2x from both sides: 3x − 3 = 12.",
      "Add 3 to both sides: 3x = 15.",
      "Divide both sides by 3: x = 5.",
    ],
    whyCorrect: "Check by substituting: 5(5) − 3 = 22 and 2(5) + 12 = 22.",
    commonMistake:
      "Moving the x terms and the constants in the same step. Do one at a time and the sign errors disappear.",
  },
  "Solve for x: 5x − 7 = 28.": {
    takeaway: "Add back what was subtracted, then divide by the coefficient.",
    steps: ["Add 7 to both sides: 5x = 35.", "Divide both sides by 5: x = 7."],
    whyCorrect: "Check by substituting: 5(7) − 7 = 35 − 7 = 28.",
    distractors: {
      "1": "4.2 divides 28 by 5 before adding the 7 back.",
      "2": "35 is the value of 5x. Divide by 5 to finish.",
      "3": "5 is the coefficient of x, not the solution.",
    },
    commonMistake:
      "Dividing while a constant is still attached to the variable term. Isolate 5x first.",
  },
  "Solve for x: 3(x + 4) = 2x + 19.": {
    takeaway: "Distribute first, then gather x on one side.",
    steps: [
      "Distribute the 3: 3x + 12 = 2x + 19.",
      "Subtract 2x from both sides: x + 12 = 19.",
      "Subtract 12 from both sides: x = 7.",
    ],
    whyCorrect: "Check by substituting: 3(7 + 4) = 33 and 2(7) + 19 = 33.",
    distractors: {
      "0": "31 adds 12 and 19 without ever combining the x terms.",
      "2": "1.4 divides instead of subtracting, treating 5x = 7.",
      "3": "−7 has a sign error: subtracting 12 from 19 gives 7, not −7.",
    },
    commonMistake:
      "Subtracting 3x instead of 2x, which flips the sign of the answer. Move the smaller x term.",
  },
  "Solve for x: x/4 + 6 = 14.": {
    takeaway: "Subtract the constant, then multiply away the division.",
    steps: ["Subtract 6 from both sides: x/4 = 8.", "Multiply both sides by 4: x = 32."],
    whyCorrect: "Check by substituting: 32/4 + 6 = 8 + 6 = 14.",
    commonMistake:
      "Multiplying by 4 before subtracting the 6, which multiplies the 6 as well.",
  },
  "Solve for x: x + 17 = 42": {
    takeaway: "Undo an addition by subtracting the same amount from both sides.",
    steps: ["Subtract 17 from both sides: x = 42 − 17 = 25."],
    whyCorrect: "Check by substituting: 25 + 17 = 42.",
    distractors: {
      "1": "26 is one off: 42 − 17 = 25, not 26.",
      "2": "59 adds 17 instead of subtracting it.",
      "3": "24 is one off: 42 − 17 = 25, not 24.",
    },
    commonMistake:
      "Adding the number that is already on the left. Whatever is done to x must be undone.",
  },
  "Solve for x: 6x = 54": {
    takeaway: "Undo multiplication by dividing both sides by the coefficient.",
    steps: ["Divide both sides by 6: x = 54 ÷ 6 = 9."],
    whyCorrect: "Check by substituting: 6(9) = 54.",
    distractors: {
      "0": "60 adds 6 instead of dividing by it.",
      "1": "8 gives 6(8) = 48, not 54.",
      "3": "48 subtracts 6 instead of dividing by it.",
    },
    commonMistake:
      "Treating 6x as 6 + x. A number written against a variable means multiplication.",
  },
  "Solve for x: 3x − 7 = 20": {
    takeaway: "Clear the constant first, then divide by the coefficient.",
    steps: ["Add 7 to both sides: 3x = 27.", "Divide both sides by 3: x = 9."],
    whyCorrect: "Check by substituting: 3(9) − 7 = 27 − 7 = 20.",
    distractors: {
      "0": "27 is the value of 3x. One step remains: divide by 3.",
      "1": "13/3 subtracts 7 from 20 instead of adding it, then divides.",
      "3": "4.5 halves 9; nothing in the equation divides by 2.",
    },
    commonMistake:
      "Subtracting 7 again because the equation shows a minus sign. The −7 is undone by adding.",
  },
  "Solve for x: 5x + 8 = 43": {
    takeaway: "Isolate the variable term before dividing.",
    steps: ["Subtract 8 from both sides: 5x = 35.", "Divide both sides by 5: x = 7."],
    whyCorrect: "Check by substituting: 5(7) + 8 = 35 + 8 = 43.",
    distractors: {
      "0": "10.2 divides 51 by 5, adding the 8 instead of subtracting it.",
      "1": "6 gives 5(6) + 8 = 38, not 43.",
      "2": "9.2 gives 5(9.2) + 8 = 54, not 43.",
    },
    commonMistake:
      "Dividing 43 by 5 first. The +8 has to come off before the coefficient can be undone.",
  },
  "Solve for x: 4(x − 3) = 28": {
    takeaway:
      "With a factor outside parentheses, dividing by it first is often the fastest route.",
    steps: ["Divide both sides by 4: x − 3 = 7.", "Add 3 to both sides: x = 10."],
    whyCorrect: "Check by substituting: 4(10 − 3) = 4(7) = 28.",
    distractors: {
      "0": "7 is the value of x − 3. Add 3 to get x.",
      "1": "13 gives 4(13 − 3) = 40, not 28.",
      "3": "7.75 comes from distributing only to the x, writing 4x − 3 = 28.",
    },
    commonMistake:
      "Stopping at x − 3 = 7. The question asks for x, so the last step is adding 3.",
  },
  "Solve for x: 7x − 4 = 3x + 16": {
    takeaway: "Variables to one side, numbers to the other, then divide.",
    steps: [
      "Subtract 3x from both sides: 4x − 4 = 16.",
      "Add 4 to both sides: 4x = 20.",
      "Divide both sides by 4: x = 5.",
    ],
    whyCorrect: "Check by substituting: 7(5) − 4 = 31 and 3(5) + 16 = 31.",
    distractors: {
      "0": "20 is the value of 4x. Divide by 4 to finish.",
      "2": "3 gives 7(3) − 4 = 17 and 3(3) + 16 = 25, which are not equal.",
      "3": "6 gives 7(6) − 4 = 38 and 3(6) + 16 = 34, which are not equal.",
    },
    commonMistake:
      "Forgetting the final division once the equation reads 4x = 20.",
  },
  "Solve for x: 2(x + 5) = 3x − 4": {
    takeaway:
      "When the larger x term is on the right, move the smaller one right to keep x positive.",
    steps: [
      "Distribute the 2: 2x + 10 = 3x − 4.",
      "Subtract 2x from both sides: 10 = x − 4.",
      "Add 4 to both sides: x = 14.",
    ],
    whyCorrect: "Check by substituting: 2(14 + 5) = 38 and 3(14) − 4 = 38.",
    distractors: {
      "1": "−14 is a sign error: adding 4 to 10 gives 14, not −14.",
      "2": "2 gives 2(2 + 5) = 14 and 3(2) − 4 = 2, which are not equal.",
      "3": "6 gives 2(6 + 5) = 22 and 3(6) − 4 = 14, which are not equal.",
    },
    commonMistake:
      "Subtracting 3x and then mishandling the negative coefficient. Moving the smaller x term avoids the negative entirely.",
  },
  "Solve for x: 5(x − 2) = 2(x + 7)": {
    takeaway: "Distribute on both sides before collecting like terms.",
    steps: [
      "Distribute both sides: 5x − 10 = 2x + 14.",
      "Subtract 2x from both sides: 3x − 10 = 14.",
      "Add 10 to both sides: 3x = 24.",
      "Divide both sides by 3: x = 8.",
    ],
    whyCorrect: "Check by substituting: 5(8 − 2) = 30 and 2(8 + 7) = 30.",
    distractors: {
      "0": "4 gives 5(4 − 2) = 10 and 2(4 + 7) = 22, which are not equal.",
      "2": "3 comes from failing to distribute, comparing 5x − 2 with 2x + 7.",
      "3": "6 gives 5(6 − 2) = 20 and 2(6 + 7) = 26, which are not equal.",
    },
    commonMistake:
      "Distributing one side but not the other. Both sets of parentheses must be expanded.",
  },
  "Solve for x: x ÷ 4 = 9": {
    takeaway: "Division is undone by multiplication.",
    steps: ["Multiply both sides by 4: x = 9 × 4 = 36."],
    whyCorrect: "Check by substituting: 36 ÷ 4 = 9.",
    distractors: {
      "0": "5 subtracts 4 instead of multiplying by it.",
      "1": "13 adds 4 instead of multiplying by it.",
      "2": "2.25 divides 9 by 4, repeating the operation instead of reversing it.",
    },
    commonMistake:
      "Dividing again because the equation shows a division sign. Ask what was done to x, then do the opposite.",
  },
  "Solve for x: 3x - 7 = 14. Enter a number.": {
    takeaway: "Add back the constant, then divide by the coefficient.",
    steps: ["Add 7 to both sides: 3x = 21.", "Divide both sides by 3: x = 7."],
    whyCorrect: "Check by substituting: 3(7) − 7 = 21 − 7 = 14.",
    commonMistake:
      "Entering 21, the value of 3x, instead of finishing the division.",
  },
  "Put the steps in the correct order to solve the equation 2x + 5 = 17.": {
    takeaway:
      "Solving unwinds the order of operations: undo addition, then multiplication, then check.",
    steps: [
      "Start from the equation as given: 2x + 5 = 17.",
      "Undo the addition: subtract 5 from both sides to get 2x = 12.",
      "Undo the multiplication: divide both sides by 2 to get x = 6.",
      "Check the solution: 2(6) + 5 = 12 + 5 = 17.",
    ],
    whyCorrect:
      "Each step isolates x a little further, and the check confirms the result satisfies the original equation.",
    commonMistake:
      "Dividing by 2 before removing the 5, which forces you to divide the 5 as well.",
  },

  // ── SCIENCE / chemistry / Recognize Basic Atomic Structure ────────────────
  // Note: "Two atoms are isotopes of the same element. Which statement must be
  // true about them?" is deliberately absent. That stem appears twice in the
  // bank with different option orders, so both copies carry their own inline
  // rationale instead.
  "Which subatomic particle carries a negative electrical charge?": {
    takeaway: "Electrons are negative, protons are positive, neutrons are neutral.",
    whyCorrect:
      "The electron carries a charge of −1. Its negative charge balances the positive protons in a neutral atom.",
    distractors: {
      "0": "A neutron carries no charge at all; that is what 'neutron' signals.",
      "2": "The nucleus is the atom's central region, not a particle. It is positive overall because it holds the protons.",
      "3": "A proton carries the positive charge, the exact opposite of what the question asks.",
    },
    commonMistake:
      "Mixing up the two charged particles. Tie the names down: protons are positive, and the electron is the one left over, so it is negative.",
  },
  "The atomic number of an element is determined by the number of which particle in its atoms?": {
    takeaway: "Atomic number = proton count. The proton count is what makes an element that element.",
    whyCorrect:
      "Every atom of a given element has the same number of protons; change the proton count and you have a different element. That is why the periodic table is ordered by it.",
    distractors: {
      "0": "Protons plus neutrons is the mass number, the other number on an element box.",
      "2": "Electrons match the proton count only in a neutral atom, and ions gain or lose them without changing the element.",
      "3": "Neutrons vary between isotopes of the same element, so they cannot define it.",
    },
    commonMistake:
      "Confusing atomic number with mass number. Atomic number counts protons only; mass number adds the neutrons.",
  },
  "A neutral atom has a mass number of 23 and an atomic number of 11. How many neutrons does it contain?": {
    takeaway: "Neutrons = mass number − atomic number.",
    steps: [
      "The mass number counts protons and neutrons together: 23.",
      "The atomic number counts the protons: 11.",
      "Subtract: 23 − 11 = 12 neutrons.",
    ],
    whyCorrect: "12 neutrons plus 11 protons gives the stated mass number of 23.",
    distractors: {
      "1": "23 is the mass number itself, protons and neutrons combined.",
      "2": "34 adds the two numbers instead of subtracting them.",
      "3": "11 is the atomic number, the count of protons (and of electrons, since the atom is neutral).",
    },
    commonMistake:
      "Adding the two numbers. The atomic number is already inside the mass number, so neutrons come from subtracting it out.",
  },
  "Which subatomic particle carries a negative electric charge?": {
    takeaway: "Electrons are negative, protons are positive, neutrons are neutral.",
    whyCorrect:
      "The electron carries a charge of −1. Its negative charge balances the positive protons in a neutral atom.",
    distractors: {
      "0": "The nucleus is the atom's central region, not a particle. It is positive overall because it holds the protons.",
      "1": "A neutron carries no charge at all; that is what 'neutron' signals.",
      "2": "A proton carries the positive charge, the exact opposite of what the question asks.",
    },
    commonMistake:
      "Mixing up the two charged particles. Tie the names down: protons are positive, and the electron is the one left over, so it is negative.",
  },
  "A neutral atom has a mass number of 39 and an atomic number of 19. How many neutrons does it contain?": {
    takeaway: "Neutrons = mass number − atomic number.",
    steps: [
      "The mass number counts protons and neutrons together: 39.",
      "The atomic number counts the protons: 19.",
      "Subtract: 39 − 19 = 20 neutrons.",
    ],
    whyCorrect: "20 neutrons plus 19 protons gives the stated mass number of 39.",
    distractors: {
      "1": "58 adds the two numbers instead of subtracting them.",
      "2": "39 is the mass number itself, protons and neutrons combined.",
      "3": "19 is the atomic number, the count of protons (and of electrons, since the atom is neutral).",
    },
    commonMistake:
      "Adding the two numbers. The atomic number is already inside the mass number, so neutrons come from subtracting it out.",
  },
  "An ionic bond forms when sodium reacts with chlorine. Which statement best describes how this bond is created?": {
    takeaway: "Ionic bonds transfer electrons from a metal to a nonmetal; the resulting ions attract.",
    steps: [
      "Sodium, a metal, gives up its single outer electron and becomes Na⁺.",
      "Chlorine, a nonmetal, takes that electron to fill its outer shell and becomes Cl⁻.",
      "The opposite charges pull the ions together — that attraction is the ionic bond.",
    ],
    whyCorrect:
      "Transfer, not sharing, is the signature of an ionic bond, and it always runs from the metal to the nonmetal.",
    distractors: {
      "0": "Protons stay locked in the nucleus during chemical reactions; only electrons move.",
      "2": "Equal sharing describes a nonpolar covalent bond between similar nonmetals, not a metal–nonmetal pair.",
      "3": "Neutrons play no part in bonding; they only add mass to the nucleus.",
    },
    commonMistake:
      "Answering 'sharing' for every bond. Sharing is covalent; a metal with a nonmetal hands the electron over completely.",
  },
  "Two nonmetal atoms join together by sharing electrons. What type of chemical bond is this?": {
    takeaway: "Shared electrons make a covalent bond; transferred electrons make an ionic one.",
    whyCorrect:
      "Two nonmetals both hold their electrons tightly, so neither can take from the other — they share pairs instead, and that shared pair is the covalent bond.",
    distractors: {
      "0": "There is no such thing as a nuclear bond between atoms; nuclei never touch in chemistry.",
      "1": "An ionic bond transfers electrons between a metal and a nonmetal; nothing is transferred here.",
      "3": "Metallic bonding is a sea of loose electrons among metal atoms — no metals are involved.",
    },
    commonMistake:
      "Deciding between ionic and covalent by memorized examples instead of the rule: transfer = ionic (metal + nonmetal), share = covalent (nonmetal + nonmetal).",
  },
  "In a polar covalent bond, the shared electrons are pulled more strongly toward one atom, creating partial charges. Which molecule contains polar covalent bonds?": {
    takeaway: "A bond is polar only when the two atoms attract the shared electrons unequally.",
    steps: [
      "Identical atoms pull equally, so any two-of-the-same molecule shares its electrons evenly.",
      "In water, oxygen attracts electrons far more strongly than hydrogen.",
      "The uneven pull leaves oxygen slightly negative and each hydrogen slightly positive — a polar bond.",
    ],
    whyCorrect:
      "H₂O pairs two different atoms with very different pulls on electrons, which is exactly what makes a bond polar (and what gives water most of its special properties).",
    distractors: {
      "1": "Two identical nitrogen atoms pull equally, so N₂ is nonpolar.",
      "2": "Two identical oxygen atoms pull equally, so O₂ is nonpolar.",
      "3": "Two identical chlorine atoms pull equally, so Cl₂ is nonpolar.",
    },
    commonMistake:
      "Assuming any molecule with oxygen is polar. Polarity needs a mismatch — an element bonded to itself can never be polar.",
  },
  "How many valence electrons does a neutral oxygen atom have, given that oxygen is in group 16 (6A) of the periodic table?": {
    takeaway: "For main-group elements, the group's A-number is the valence electron count.",
    steps: [
      "Oxygen sits in group 16, also written 6A.",
      "The 6 in 6A is the number of outer-shell electrons: 6.",
    ],
    whyCorrect:
      "Group 6A elements all carry 6 valence electrons — which is why oxygen grabs 2 more to reach a full shell of 8, forming O²⁻ or two covalent bonds.",
    distractors: {
      "0": "4 valence electrons belongs to group 14 (4A), carbon's column.",
      "2": "8 is the full outer shell oxygen is trying to reach, not what it starts with.",
      "3": "2 is how many electrons oxygen needs to gain, not how many valence electrons it has.",
    },
    commonMistake:
      "Confusing what the atom has (6) with what it wants (8). The difference between them — 2 — is the number of bonds oxygen usually forms.",
  },
  "The first electron shell of an atom can hold a maximum of how many electrons?": {
    takeaway: "The innermost shell holds only 2 electrons; the next shells hold up to 8.",
    whyCorrect:
      "The first shell has a single small orbital, with room for just one pair of electrons. That is why helium, with exactly 2, is already full and stable.",
    distractors: {
      "1": "18 is the capacity of the third shell, not the first.",
      "2": "8 is the capacity of the second shell — the number the octet rule is named for.",
      "3": "4 is not the capacity of any shell; shell capacities run 2, 8, 18.",
    },
    commonMistake:
      "Reaching for 8 because of the octet rule. The octet rule describes outer shells from the second onward; the first shell fills at 2.",
  },
  "According to the octet rule, why are noble gases such as neon and argon chemically unreactive?": {
    takeaway: "Atoms react to fill their outer shell; a shell that is already full has no reason to react.",
    whyCorrect:
      "Noble gases already hold eight outer electrons, the stable arrangement every other atom is bonding to achieve, so they have nothing to gain by reacting.",
    distractors: {
      "1": "Readily transferring electrons is what reactive metals like sodium do — the opposite of inert.",
      "2": "Every atom's nucleus has protons; a neutron-only nucleus is not an atom of any element.",
      "3": "An empty outer shell is impossible for a neutral atom; noble gases are unreactive because theirs is full, not empty.",
    },
    commonMistake:
      "Treating 'unreactive' as a mystery property. It follows directly from the octet rule: bonding exists to complete outer shells, and a complete shell opts out.",
  },
  "Which of the following is classified as an element?": {
    takeaway: "An element is one kind of atom only; anything with two kinds is a compound or mixture.",
    whyCorrect:
      "Pure gold contains nothing but gold atoms, and it has a periodic-table symbol (Au) to prove it — the quickest test for an element.",
    distractors: {
      "0": "Table salt is a compound: sodium and chlorine atoms chemically bonded as NaCl.",
      "1": "Water is a compound: hydrogen and oxygen bonded as H₂O.",
      "3": "Air is a mixture of nitrogen, oxygen, and other gases that are not bonded to each other at all.",
    },
    commonMistake:
      "Reading 'pure' as 'element'. Pure water is still a compound — purity is about having one substance, not one kind of atom.",
  },
  "What is the key difference between a compound and a mixture?": {
    takeaway: "Compounds are chemically bonded in fixed ratios; mixtures are only physically combined.",
    whyCorrect:
      "Bonding is the dividing line: a compound is a new substance with its own properties that only a chemical reaction can take apart, while a mixture's ingredients keep their properties and separate by physical means like filtering or evaporation.",
    distractors: {
      "0": "A compound must contain at least two elements — one element alone is just an element.",
      "1": "This reverses reality: mixtures are the ones that can be separated by physical means like filtering.",
      "2": "State of matter has nothing to do with it; compounds and mixtures each come as solids, liquids, and gases.",
    },
    commonMistake:
      "Using 'can I see the parts?' as the test. The real test is whether separating the parts requires breaking chemical bonds.",
  },
  "Which of the following is a pure substance rather than a mixture?": {
    takeaway: "A pure substance has one fixed composition — a single element or a single compound.",
    whyCorrect:
      "Carbon dioxide is one compound with one formula, CO₂, identical in every sample. Compounds count as pure substances even though they contain two elements, because those elements are bonded in a fixed ratio.",
    distractors: {
      "0": "Salt water is a mixture: the salt dissolves in the water but never bonds to it, and boiling separates them.",
      "1": "Salad dressing is a mixture so loose it visibly separates into layers on the shelf.",
      "2": "Sand and iron filings sit side by side unbonded; a magnet pulls the iron right back out.",
    },
    commonMistake:
      "Assuming 'two elements' means 'mixture'. CO₂ has two elements but one fixed formula — bonded in fixed ratio means pure substance.",
  },
  "A hydrocarbon is a type of organic molecule. Which elements make up a hydrocarbon?": {
    takeaway: "Hydrocarbons contain carbon and hydrogen — those two and nothing else.",
    whyCorrect:
      "The name spells it out: hydro (hydrogen) + carbon. Methane (CH₄) and propane (C₃H₈) fit the pattern — any other element in the formula disqualifies the molecule.",
    distractors: {
      "0": "Add nitrogen and it is no longer a hydrocarbon; nitrogen appears in amines and amino acids.",
      "1": "Hydrogen and oxygen with no carbon is not organic at all — that pair makes water.",
      "3": "Carbon and oxygen without hydrogen gives molecules like CO₂, which is not organic.",
    },
    commonMistake:
      "Letting oxygen sneak in because so many organic molecules carry it. The moment oxygen joins, the molecule is an alcohol, acid, or carbohydrate — not a hydrocarbon.",
  },
  "Which functional group is characteristic of an alcohol such as ethanol?": {
    takeaway: "Alcohol = hydroxyl group: an −OH bonded to carbon.",
    whyCorrect:
      "Every alcohol carries a hydroxyl (−OH) group on a carbon, and the -ol ending in names like ethanol announces it.",
    distractors: {
      "0": "A carboxyl group (−COOH) marks carboxylic acids, like the acetic acid in vinegar.",
      "1": "An amino group (−NH₂) marks amines and amino acids — nitrogen chemistry, not alcohols.",
      "3": "A carbonyl group (C=O) alone marks aldehydes and ketones, like acetone.",
    },
    commonMistake:
      "Confusing hydroxyl (−OH) with carboxyl (−COOH). The carboxyl contains a hydroxyl within it, but the acid behavior comes from the whole −COOH unit.",
  },
  "Carbon is central to organic chemistry partly because of how many covalent bonds a carbon atom typically forms. How many bonds is this?": {
    takeaway: "Carbon has 4 valence electrons and forms 4 covalent bonds.",
    steps: [
      "Carbon sits in group 14 (4A), so it has 4 valence electrons.",
      "It needs 8 for a full shell, and 8 − 4 = 4 shared pairs.",
      "Each shared pair is one covalent bond: 4 bonds.",
    ],
    whyCorrect:
      "Four bonds let carbon link in chains, branches, and rings at once — the structural freedom that makes the whole catalog of organic molecules possible.",
    distractors: {
      "0": "3 bonds is nitrogen's usual count, one group to the right.",
      "2": "2 bonds is oxygen's usual count, as in H₂O.",
      "3": "1 bond is hydrogen's count — the atoms carbon usually bonds to, not carbon itself.",
    },
    commonMistake:
      "Counting the electrons carbon has (4) but forgetting that is also exactly the number it needs — which is why it shares all four rather than gaining or losing.",
  },

  // ── MATH / measurement-data / Interpret Relevant Information from Tables,
  //    Charts, and Graphs ───────────────────────────────────────────────────
  // The recurring lesson across this skill: decide what the question asks for
  // (read one value, compare two, or combine all) before touching the numbers.
  "A bookstore recorded the number of books sold each day:\nMon: 12, Tue: 8, Wed: 15, Thu: 9, Fri: 21.\nOn which day were the most books sold?": {
    takeaway: "'Most' means the largest value — then answer with its label, not the number.",
    steps: [
      "Scan the values: 12, 8, 15, 9, 21.",
      "The largest is 21.",
      "Read across to its label: Friday.",
    ],
    whyCorrect: "21 books on Friday is the highest count in the list.",
    distractors: {
      "0": "Tuesday's 8 is the smallest count, the answer to 'fewest'.",
      "2": "Wednesday's 15 is the second highest, but 21 beats it.",
      "3": "Thursday's 9 is near the bottom of the list.",
    },
    commonMistake:
      "Answering with the value (21) instead of the label (Friday). Check whether the question asks 'which day' or 'how many'.",
  },
  "A dealership recorded cars sold by month:\nJan: 30, Feb: 45, Mar: 25, Apr: 50.\nHow many more cars were sold in April than in March?": {
    takeaway: "'How many more' is always a subtraction between the two named values.",
    steps: [
      "Find the two months named: April = 50, March = 25.",
      "Subtract: 50 − 25 = 25.",
    ],
    whyCorrect: "April's 50 exceeds March's 25 by 25 cars.",
    distractors: {
      "0": "15 is the gap between April and January, months the question does not ask about.",
      "1": "20 is the gap between February and March.",
      "2": "75 adds the two months instead of subtracting them.",
    },
    commonMistake:
      "Adding when the question says 'how many more'. A comparison question always subtracts.",
  },
  "Daily rainfall (in inches) for one week was recorded:\nMon: 0.5, Tue: 1.2, Wed: 0.0, Thu: 0.8, Fri: 1.5.\nWhat was the total rainfall for the week, in inches?": {
    takeaway: "'Total' means add every value, including the zeros.",
    steps: [
      "Add in order: 0.5 + 1.2 = 1.7.",
      "1.7 + 0.0 = 1.7 (Wednesday's zero changes nothing but must still be accounted for).",
      "1.7 + 0.8 = 2.5.",
      "2.5 + 1.5 = 4.0 inches.",
    ],
    whyCorrect: "All five daily amounts sum to 4.0 inches.",
    commonMistake:
      "Skipping the zero day and losing track of the count, or dropping a decimal place. Line the decimal points up and add straight down.",
  },
  "A class's final grades are shown in this frequency table:\nA: 6, B: 10, C: 8, D: 3, F: 1.\nHow many students earned a grade of C or higher (A, B, or C)?": {
    takeaway: "In a frequency table, the numbers are counts of students — add the rows the question names.",
    steps: [
      "The question defines 'C or higher' as A, B, and C.",
      "Add those three counts: 6 + 10 + 8 = 24 students.",
    ],
    whyCorrect: "24 students earned an A, B, or C.",
    distractors: {
      "0": "18 leaves out one of the three categories.",
      "2": "28 adds all five grades — that is the whole class, including D and F.",
      "3": "16 combines only two of the three categories.",
    },
    commonMistake:
      "Adding every row out of habit. Add only the categories the question includes, and re-read which grades 'C or higher' covers.",
  },
  "A nurse recorded a patient's temperature (°F) over time:\n8 AM: 65, 10 AM: 70, 12 PM: 72, 2 PM: 75.\n(Values are example readings.) At what time was the reading 72?": {
    takeaway: "This is a lookup: find the value, then report its label.",
    steps: ["Locate 72 among the readings.", "It sits in the 12 PM row."],
    whyCorrect: "The table pairs 12 PM with a reading of 72.",
    distractors: {
      "0": "2 PM pairs with 75.",
      "2": "8 AM pairs with 65.",
      "3": "10 AM pairs with 70.",
    },
    commonMistake:
      "Reading the neighboring row. Trace straight across from the value to its label rather than eyeballing the position.",
  },
  "The table shows the number of pizzas sold at a cafe each day. Day | Pizzas: Monday | 18, Tuesday | 24, Wednesday | 15, Thursday | 30, Friday | 27. How many more pizzas were sold on Thursday than on Wednesday?": {
    takeaway: "'How many more' compares two rows by subtracting.",
    steps: [
      "Thursday = 30, Wednesday = 15.",
      "Subtract: 30 − 15 = 15 pizzas.",
    ],
    whyCorrect: "Thursday outsold Wednesday by 15 pizzas.",
    distractors: {
      "0": "30 is Thursday's total on its own, with no comparison made.",
      "1": "12 is the gap between Thursday and Tuesday, not Wednesday.",
      "3": "45 adds the two days instead of subtracting.",
    },
    commonMistake:
      "Stopping at the larger value. The question asks for the size of the gap, which takes one more step.",
  },
  "The table shows points scored by four players in a trivia game. Player | Points: Ava | 32, Ben | 27, Cara | 41, Dan | 19. Together, how many points did the four players score?": {
    takeaway: "'Together' means add every row.",
    steps: [
      "32 + 27 = 59.",
      "59 + 41 = 100.",
      "100 + 19 = 119 points.",
    ],
    whyCorrect: "All four scores sum to 119.",
    distractors: {
      "0": "121 is an addition slip of 2; adding in pairs and re-checking catches it.",
      "2": "109 drops 10 somewhere in the running total.",
      "3": "100 is the total after only three players — Dan's 19 is still missing.",
    },
    commonMistake:
      "Losing the last row when adding a running total. Add in pairs (32 + 27 and 41 + 19, then 59 + 60) to make the count self-checking.",
  },
  "A line graph shows a seedling's height measured each week. Week 1: 3 cm, Week 2: 5 cm, Week 3: 8 cm, Week 4: 8 cm, Week 5: 12 cm. Between which two consecutive weeks did the height NOT change?": {
    takeaway: "No change means two consecutive readings are equal — a flat segment on the graph.",
    steps: [
      "Compare each neighboring pair: 3→5 rises, 5→8 rises.",
      "8→8 stays the same.",
      "8→12 rises.",
    ],
    whyCorrect: "Week 3 and Week 4 both read 8 cm, so the line is flat between them.",
    distractors: {
      "0": "Week 2 to Week 3 climbs from 5 to 8.",
      "1": "Week 1 to Week 2 climbs from 3 to 5.",
      "2": "Week 4 to Week 5 climbs from 8 to 12, the steepest rise of all.",
    },
    commonMistake:
      "Missing the NOT in the question and picking the biggest change. Capitalized words like NOT and EXCEPT flip what you are hunting for.",
  },
  "The table shows books read this month. Maria: 14, Devon: 9, Aisha: 17, Liam: 12. Who read the most books?": {
    takeaway: "'Who' wants the name attached to the largest value.",
    steps: ["Compare 14, 9, 17, 12.", "17 is the largest.", "17 belongs to Aisha."],
    whyCorrect: "Aisha's 17 books is the highest count in the table.",
    distractors: {
      "0": "Liam read 12.",
      "1": "Devon's 9 is the fewest, the answer to the opposite question.",
      "3": "Maria's 14 is second highest.",
    },
    commonMistake:
      "Picking the last row you read rather than comparing all of them. Scan the full column before answering.",
  },
  "A bar graph shows cups of coffee sold each day. Mon: 45, Tue: 38, Wed: 52, Thu: 41, Fri: 60. What is the difference between the highest and lowest daily sales?": {
    takeaway: "Difference between highest and lowest = the range. Find both extremes first.",
    steps: [
      "Highest: 60 on Friday.",
      "Lowest: 38 on Tuesday.",
      "Subtract: 60 − 38 = 22.",
    ],
    whyCorrect: "60 and 38 are the extremes of the five values, and they differ by 22.",
    distractors: {
      "0": "15 uses 45 as the lowest, but Tuesday's 38 is smaller.",
      "2": "60 is the highest value alone, with no subtraction done.",
      "3": "23 is an arithmetic slip; 60 − 38 is 22.",
    },
    commonMistake:
      "Grabbing the first small number instead of the smallest. Scan the whole set for both extremes before subtracting.",
  },
  "A scientist heats water and records its temperature every minute. On the graph, temperature is plotted on the y-axis and time on the x-axis. Which is the independent variable?": {
    takeaway: "The independent variable goes on the x-axis; the dependent one responds on the y-axis.",
    steps: [
      "Ask which quantity marches on regardless: time.",
      "Ask which responds: temperature, which rises as heating continues.",
      "Time is the driver, so it is independent — and the graph confirms it by placing time on the x-axis.",
    ],
    whyCorrect:
      "Temperature is recorded against time, so time is the input and temperature depends on it.",
    distractors: {
      "0": "The water is the thing being studied, not a variable being measured or changed.",
      "1": "The y-axis holds the dependent variable, which is the opposite of what is asked.",
      "2": "Temperature is the outcome that responds — the dependent variable.",
    },
    commonMistake:
      "Choosing the quantity being measured. What you record is the dependent variable; the independent one is what you vary.",
  },
  "A table lists points a team scored in 4 games: 78, 85, 92, 67. What is the total number of points scored?": {
    takeaway: "'Total' means add every game.",
    steps: ["78 + 85 = 163.", "163 + 92 = 255.", "255 + 67 = 322 points."],
    whyCorrect: "The four game scores sum to 322.",
    distractors: {
      "0": "312 is 10 short, a carrying slip in the addition.",
      "1": "92 is the single best game, not the total.",
      "3": "332 is 10 over, the same carrying slip in the other direction.",
    },
    commonMistake:
      "Rushing the carries with two-digit addition. Group friendly pairs first (78 + 92 = 170, 85 + 67 = 152, then 170 + 152 = 322).",
  },
  "A line graph shows weekly website visitors. Week 1: 200, Week 2: 350, Week 3: 380, Week 4: 500. Between which consecutive weeks did visitors increase the most?": {
    takeaway: "Biggest increase means the largest gap between neighboring weeks, not the largest value.",
    steps: [
      "Week 1→2: 350 − 200 = 150.",
      "Week 2→3: 380 − 350 = 30.",
      "Week 3→4: 500 − 380 = 120.",
      "The largest jump is 150.",
    ],
    whyCorrect: "The 150-visitor jump from Week 1 to Week 2 is bigger than either later increase.",
    distractors: {
      "0": "Week 3 to Week 4 rises 120 — large, but short of 150. It ends at the highest point, which makes it look biggest.",
      "2": "Week 1 to Week 4 is not a consecutive pair; it spans the whole graph.",
      "3": "Week 2 to Week 3 rises only 30, the smallest change.",
    },
    commonMistake:
      "Picking the segment that reaches the highest point. Steepness is about the size of the climb, not the height reached.",
  },
  "A study measures how plant height changes with the amount of fertilizer applied. In this study, which is the dependent variable?": {
    takeaway: "The dependent variable is the measured outcome — it depends on what the researcher changes.",
    steps: [
      "The researcher controls the fertilizer: that is the independent variable.",
      "Height is what gets measured in response: that is the dependent variable.",
    ],
    whyCorrect: "Plant height changes with fertilizer, so height is the outcome that depends on it.",
    distractors: {
      "0": "Sunlight is not part of the stated relationship; it would be held constant.",
      "1": "Number of days is not the variable being manipulated or measured here.",
      "2": "Fertilizer is the independent variable, the input the study varies.",
    },
    commonMistake:
      "Reversing the two. Phrase it as a sentence — height depends on fertilizer — and the dependent variable is the one before 'depends'.",
  },
  "A table shows monthly rainfall in inches. Jan: 3.2, Feb: 2.8, Mar: 4.1, Apr: 3.6. How much rain fell in March?": {
    takeaway: "A direct lookup: match the label, read its value, done.",
    steps: ["Find the March row.", "Read across: 4.1 inches."],
    whyCorrect: "The table pairs March with 4.1 inches.",
    distractors: {
      "0": "3.6 is April's rainfall, the row below.",
      "2": "2.8 is February's.",
      "3": "3.2 is January's.",
    },
    commonMistake:
      "Sliding one row off. With similar decimal values, put a finger on the label and track straight across.",
  },
  "A table lists the daily high temperatures (°F) for five days: 72, 68, 81, 75, 79. What is the range of the temperatures?": {
    takeaway: "Range = highest − lowest.",
    steps: [
      "Highest: 81.",
      "Lowest: 68 (not 72 — scan the whole list).",
      "Subtract: 81 − 68 = 13.",
    ],
    whyCorrect: "The values span from 68 to 81, a range of 13 degrees.",
    distractors: {
      "0": "81 is the highest value alone; the range needs the subtraction.",
      "1": "11 subtracts from the wrong extreme.",
      "2": "9 uses 72 as the lowest, but 68 is smaller.",
    },
    commonMistake:
      "Treating the first value as the smallest. Unordered lists hide the extremes — scan all of them before subtracting.",
  },
  "A table shows weekly donations to a food bank. Week 1: $120, Week 2: $95, Week 3: $140, Week 4: $85. What is the total amount donated?": {
    takeaway: "'Total' means add every week.",
    steps: ["120 + 95 = 215.", "215 + 140 = 355.", "355 + 85 = 440."],
    whyCorrect: "The four weekly donations sum to $440.",
    distractors: {
      "0": "$140 is the single best week, not the total.",
      "1": "$355 is the total after only three weeks — Week 4's $85 is missing.",
      "2": "$420 is short by 20, an addition slip.",
    },
    commonMistake:
      "Stopping one row early. A partial sum is the most common wrong answer on total questions, so count the rows you actually added.",
  },

  // ── SCIENCE / anatomy-physiology / Respiratory System ─────────────────────
  // Three ideas carry this whole skill: airways conduct while alveoli exchange,
  // breathing is volume driving pressure, and CO2 rides mostly as bicarbonate.
  "Gas exchange between air and blood occurs primarily in which structures of the lungs?": {
    takeaway: "Alveoli exchange gas; every other airway only conducts it.",
    whyCorrect:
      "Alveoli are thin-walled sacs wrapped in capillaries, giving a huge surface area one cell thick — exactly what diffusion needs.",
    distractors: {
      "1": "Bronchioles are the last conducting tubes before the alveoli; they carry air but have no capillary bed for exchange.",
      "2": "The trachea is the windpipe, a rigid tube built to keep the airway open.",
      "3": "Bronchi are the two large branches into the lungs, still plumbing rather than exchange surface.",
    },
    commonMistake:
      "Naming any lung structure. Sort every part into conductor or exchanger — only the alveoli exchange.",
  },
  "During quiet inhalation, the diaphragm contracts and moves downward. What effect does this have on thoracic volume and pressure?": {
    takeaway: "Volume up, pressure down, air in. Volume and pressure always move opposite ways.",
    steps: [
      "The diaphragm contracts downward, enlarging the thoracic cavity: volume increases.",
      "By Boyle's law, more volume in the same amount of air means less pressure.",
      "Pressure inside now sits below atmospheric, so air flows in to equalize.",
    ],
    whyCorrect:
      "Increased volume with decreased pressure is what pulls air inward — you never suck air in, you make room for it.",
    distractors: {
      "0": "Volume and pressure cannot both fall; they are inversely related.",
      "1": "Volume and pressure cannot both rise, for the same reason.",
      "2": "Volume down with pressure up describes exhalation, the reverse of what is described.",
    },
    commonMistake:
      "Thinking of breathing as pulling air in directly. Muscles change the volume; the pressure difference moves the air.",
  },
  "Most carbon dioxide is transported in the blood in which form?": {
    takeaway: "About 70% of CO₂ travels as bicarbonate ions in plasma.",
    whyCorrect:
      "CO₂ entering red blood cells combines with water to form carbonic acid, which splits into bicarbonate and hydrogen ions. The bicarbonate moves into the plasma, carrying the bulk of the load.",
    distractors: {
      "0": "Carbaminohemoglobin is real but carries only about 20–23% — second place, not most.",
      "1": "Albumin transports hormones, drugs, and fatty acids, not carbon dioxide.",
      "3": "Only about 7–10% rides dissolved as gas, the smallest share of the three.",
    },
    commonMistake:
      "Assuming CO₂ is carried on hemoglobin because oxygen is. Oxygen rides hemoglobin; CO₂ mostly converts to bicarbonate.",
  },
  "Gas exchange between inhaled air and the blood occurs across the walls of which structures?": {
    takeaway: "Alveoli exchange gas; every other airway only conducts it.",
    whyCorrect:
      "The alveolar wall and the capillary wall together are about one cell thick, so oxygen and carbon dioxide diffuse straight across.",
    distractors: {
      "1": "The trachea is a rigid conducting tube, far too thick-walled for diffusion.",
      "2": "The pleurae are the membranes wrapping the lungs; they reduce friction during breathing.",
      "3": "Bronchioles conduct air to the alveoli but do not exchange it.",
    },
    commonMistake:
      "Picking a structure because it sounds deep in the lung. Depth is not the test — a capillary-wrapped, one-cell-thick wall is.",
  },
  "When the diaphragm contracts and flattens during quiet breathing, what is the direct result inside the thoracic cavity?": {
    takeaway: "Diaphragm contracts → cavity enlarges → pressure drops → air enters.",
    steps: [
      "Contraction flattens the dome, enlarging the cavity.",
      "The larger space drops intrapulmonary pressure below atmospheric.",
      "Air flows down that pressure gradient into the lungs.",
    ],
    whyCorrect: "Increased thoracic volume drawing air in is the definition of inspiration.",
    distractors: {
      "0": "Pressure rising above atmospheric pushes air out — that is expiration.",
      "2": "Decreasing volume is what the relaxing diaphragm does, not the contracting one.",
      "3": "Passive recoil describes quiet exhalation, when the muscles let go.",
    },
    commonMistake:
      "Picturing the diaphragm rising when it contracts. Contraction pulls it down and flat; relaxation lets it dome back up.",
  },
  "Most carbon dioxide is transported in the blood from the tissues to the lungs in which chemical form?": {
    takeaway: "About 70% of CO₂ travels as bicarbonate ions in plasma.",
    whyCorrect:
      "Inside red blood cells CO₂ reacts with water to form carbonic acid, which dissociates into bicarbonate; that bicarbonate moves into the plasma and carries most of the load to the lungs.",
    distractors: {
      "1": "Mature red blood cells have no nucleus at all, so nothing can be stored in one.",
      "2": "Dissolved CO₂ gas is only a small fraction of the total.",
      "3": "CO₂ binds the globin protein, not the heme groups — heme is where oxygen binds — and that route carries less than bicarbonate does.",
    },
    commonMistake:
      "Confusing where each gas rides: oxygen binds heme, CO₂ mostly becomes bicarbonate.",
  },
  "After leaving the larynx, inhaled air travels directly into which structure?": {
    takeaway: "The path is nose → pharynx → larynx → trachea → bronchi → bronchioles → alveoli.",
    whyCorrect:
      "The trachea is the windpipe directly below the larynx, carrying air toward the branching bronchi.",
    distractors: {
      "0": "Bronchioles come later, after the bronchi branch.",
      "1": "Alveoli are the final destination, several branchings past the larynx.",
      "2": "The pharynx sits above the larynx — air passes it before, not after.",
    },
    commonMistake:
      "Skipping the trachea because the question feels like it wants a lung structure. Walk the pathway in order rather than jumping ahead.",
  },
  "Which sequence correctly orders the smallest air passages just before the gas exchange sacs?": {
    takeaway: "Airways branch large to small: bronchi → bronchioles → alveoli.",
    whyCorrect:
      "Each branching divides the airway into narrower tubes, ending at the alveolar sacs where exchange happens.",
    distractors: {
      "1": "Bronchioles are branches of the bronchi, so they cannot come first.",
      "2": "This skips the bronchi entirely and puts alveoli before bronchioles.",
      "3": "This is the exhalation direction, reversed from the question's inhalation order.",
    },
    commonMistake:
      "Reading the list backwards. Bronchi are big (think 'bronchial tubes'); the -ole ending on bronchioles means small.",
  },
  "Gas exchange in the lungs occurs across the thin walls of the alveoli because of which property of their surrounding structure?": {
    takeaway: "Alveoli work because a dense capillary net presses blood right against their thin walls.",
    whyCorrect:
      "Diffusion needs a short distance and a big surface. Capillaries wrapping each alveolus put blood one cell away from the air, across a combined surface roughly the size of a tennis court.",
    distractors: {
      "0": "Cartilage rings hold the trachea open; thick cartilage would block diffusion entirely.",
      "1": "Red bone marrow makes blood cells and is found in bone, not in lungs.",
      "3": "Ciliated mucus glands line the conducting airways to trap debris; mucus would slow diffusion.",
    },
    commonMistake:
      "Choosing a feature that sounds protective. The alveolus is built for thinness and contact, and every sturdy feature listed belongs to the airways instead.",
  },
  "During inhalation, the diaphragm does which of the following?": {
    takeaway: "Inhale: the diaphragm contracts and flattens, making the chest bigger.",
    whyCorrect:
      "A flattened diaphragm enlarges the thoracic cavity, dropping the pressure inside so air flows in.",
    distractors: {
      "1": "The diaphragm is the main muscle of quiet breathing; it never sits still while air moves.",
      "2": "Relaxing and doming upward is exhalation.",
      "3": "Contraction and doming upward cannot happen together — contraction is what flattens it.",
    },
    commonMistake:
      "Pairing 'contract' with 'dome upward'. Contraction always means flatten and enlarge; relaxation means dome and shrink.",
  },
  "Most oxygen carried in the blood is transported by binding to which molecule?": {
    takeaway: "Oxygen rides hemoglobin inside red blood cells.",
    whyCorrect:
      "Each hemoglobin molecule binds up to four oxygen molecules at its heme groups, forming oxyhemoglobin — about 98% of the oxygen carried. Only a trace dissolves in plasma.",
    distractors: {
      "0": "White blood cells fight infection; they carry no oxygen.",
      "1": "Albumin transports hormones, fatty acids, and drugs, not oxygen.",
      "2": "Platelets are cell fragments that form clots.",
    },
    commonMistake:
      "Naming red blood cells without naming hemoglobin. The cell is the vehicle; hemoglobin is the molecule that actually binds the oxygen.",
  },
  "Most carbon dioxide produced by body tissues is transported in the blood in what form?": {
    takeaway: "About 70% of CO₂ travels as bicarbonate ions in plasma.",
    whyCorrect:
      "Converting CO₂ to bicarbonate lets the blood carry far more of it than dissolving alone would allow, and it doubles as the body's main pH buffer.",
    distractors: {
      "0": "White blood cell membranes have no gas-transport role.",
      "1": "Platelets form clots; they carry no gases.",
      "3": "Dissolved oxygen is the wrong gas entirely — the question asks about carbon dioxide.",
    },
    commonMistake:
      "Skimming past the gas named in the stem. Check whether the question is about O₂ or CO₂ before choosing.",
  },
  "The basic rhythm of breathing is regulated primarily by which part of the brain?": {
    takeaway: "The medulla oblongata in the brainstem sets the breathing rhythm.",
    whyCorrect:
      "Respiratory centers in the medulla, assisted by the pons, fire automatically to drive breathing — which is why it continues during sleep and unconsciousness.",
    distractors: {
      "0": "The pituitary releases hormones; it has no role in breathing rhythm.",
      "2": "The frontal lobe allows voluntary override — holding your breath — but not the automatic rhythm.",
      "3": "The cerebellum coordinates balance and movement.",
    },
    commonMistake:
      "Reaching for a 'thinking' part of the brain. Automatic survival functions — breathing, heart rate, blood pressure — all live in the brainstem.",
  },
  "Which change in the blood most strongly stimulates an increase in breathing rate?": {
    takeaway: "Rising CO₂, not falling oxygen, is the main trigger to breathe harder.",
    whyCorrect:
      "CO₂ dissolves into carbonic acid, lowering blood pH. Chemoreceptors detect that shift and drive the medulla to increase rate and depth — a sensitive early warning, since CO₂ builds up faster than oxygen runs out.",
    distractors: {
      "0": "A low red blood cell count is anemia; it develops slowly and does not set breathing rate moment to moment.",
      "1": "Calcium affects muscle and nerve function, not respiratory drive.",
      "3": "Plasma protein levels influence fluid balance, not breathing.",
    },
    commonMistake:
      "Assuming low oxygen is the trigger. Oxygen is the backup signal; carbon dioxide is the primary one.",
  },
  "During quiet exhalation, what normally happens to the diaphragm and the volume of the chest cavity?": {
    takeaway: "Quiet exhalation is passive: the diaphragm relaxes, the cavity shrinks, air leaves.",
    whyCorrect:
      "The relaxing diaphragm returns to its dome, reducing thoracic volume and raising pressure above atmospheric so air flows out — no muscular effort required.",
    distractors: {
      "0": "Something must change for air to move; unchanged volume means no airflow.",
      "1": "Flattening and enlarging is inhalation.",
      "3": "Contraction and enlargement is also inhalation.",
    },
    commonMistake:
      "Assuming breathing out takes work like breathing in. Quiet exhalation is elastic recoil; only forced exhalation uses muscles.",
  },
  "Which of the following structures are part of the upper respiratory tract? Select all that apply.": {
    takeaway: "Upper tract = above the trachea: nasal cavity, pharynx, larynx.",
    steps: [
      "Draw the line at the larynx: everything above it is upper tract.",
      "Nasal cavity, pharynx, and larynx sit at or above that line.",
      "Trachea, bronchi, and alveoli sit below it, inside the chest.",
    ],
    whyCorrect:
      "The nasal cavity, pharynx, and larynx warm, filter, and route air before it reaches the chest.",
    distractors: {
      "1": "Alveoli are deep inside the lungs, the far end of the lower tract.",
      "4": "Bronchi branch below the trachea, squarely in the lower tract.",
    },
    commonMistake:
      "Splitting the tracts by head versus neck. The larynx is in the neck but still upper tract — the boundary is where the trachea begins.",
  },
  "Place the following structures in the correct order that inhaled air passes through them on its way to gas exchange.": {
    takeaway: "Pharynx → larynx → trachea → bronchi → alveoli.",
    steps: [
      "Air entering the nose or mouth reaches the pharynx (throat) first.",
      "It passes the larynx (voice box), which guards the airway.",
      "Down the trachea (windpipe), the single large tube into the chest.",
      "Into the bronchi, one branch per lung.",
      "Finally the alveoli, where gas exchange happens.",
    ],
    whyCorrect:
      "The order follows the anatomy from throat to chest, with the alveoli last because everything before them only conducts air.",
    commonMistake:
      "Swapping the pharynx and larynx. The pharynx is the shared throat behind the mouth; the larynx sits lower, holds the vocal cords, and guards the entrance to the trachea.",
  },

  // ── SCIENCE / anatomy-physiology / Endocrine System ───────────────────────
  // This skill is mostly gland-to-hormone-to-effect recall, so the rationales
  // lean on opposing pairs (insulin/glucagon, calcitonin/PTH) — the pairs are
  // what the distractors are built from.
  "Which gland is often called the 'master gland' because it secretes hormones that regulate several other endocrine glands?": {
    takeaway: "The pituitary directs other glands; the hypothalamus directs the pituitary.",
    whyCorrect:
      "Its hormones are addressed to other glands — TSH to the thyroid, ACTH to the adrenal cortex, FSH and LH to the gonads — which is what makes it the master.",
    distractors: {
      "1": "The adrenal glands take orders from ACTH rather than giving them.",
      "2": "The thyroid is a classic target gland, driven by pituitary TSH.",
      "3": "The pineal gland releases melatonin on a light cycle and commands nothing.",
    },
    commonMistake:
      "Assuming the master gland answers to no one. The hypothalamus outranks it — the pituitary is master of the glands, not of itself.",
  },
  "Which hormone, secreted by the pancreas, lowers blood glucose by promoting cellular glucose uptake?": {
    takeaway: "Insulin is the only hormone that lowers blood glucose.",
    whyCorrect:
      "Beta cells release insulin when glucose is high; it opens cells to take glucose in, which drops the level in the blood.",
    distractors: {
      "0": "Epinephrine raises glucose for fast energy in an emergency.",
      "2": "Cortisol raises glucose during sustained stress.",
      "3": "Glucagon is insulin's opposite from the same organ — it raises glucose.",
    },
    commonMistake:
      "Mixing up insulin and glucagon. Insulin puts glucose IN cells; glucagon sends it out into the blood.",
  },
  "The thyroid hormones thyroxine (T4) and triiodothyronine (T3) primarily regulate which body process?": {
    takeaway: "Thyroid hormones set the body's metabolic rate — the whole-body idle speed.",
    whyCorrect:
      "T3 and T4 govern how fast cells burn energy, which is why an overactive thyroid brings weight loss, heat intolerance, and a racing heart, while an underactive one brings the reverse.",
    distractors: {
      "1": "Glycogen storage is insulin's job.",
      "2": "Blood calcium is handled by calcitonin and parathyroid hormone.",
      "3": "Sodium retention and blood pressure are aldosterone's territory.",
    },
    commonMistake:
      "Confusing the thyroid's two products. The thyroid also makes calcitonin for calcium, but T3 and T4 specifically drive metabolism.",
  },
  "Antidiuretic hormone (ADH) and oxytocin are stored and released by which structure?": {
    takeaway: "The posterior pituitary stores ADH and oxytocin; it does not make them.",
    steps: [
      "Both hormones are synthesized by hypothalamic neurons.",
      "They travel down those neurons' axons into the posterior pituitary.",
      "The posterior pituitary holds them until a signal triggers release.",
    ],
    whyCorrect:
      "The posterior pituitary is nervous tissue acting as a storage terminal, which is why it releases hormones it never produced.",
    distractors: {
      "0": "The thyroid makes T3, T4, and calcitonin.",
      "1": "The anterior pituitary manufactures its own hormones — GH, TSH, ACTH, FSH, LH.",
      "3": "The adrenal cortex makes cortisol and aldosterone.",
    },
    commonMistake:
      "Treating both pituitary lobes the same. Anterior makes its hormones; posterior only stores and releases the hypothalamus's.",
  },
  "Calcitonin, a hormone that lowers blood calcium levels, is secreted by which gland?": {
    takeaway: "Calcitonin comes from the thyroid and lowers calcium; PTH comes from the parathyroids and raises it.",
    whyCorrect:
      "The thyroid secretes calcitonin, which pushes calcium out of the blood and into bone.",
    distractors: {
      "0": "The pineal gland makes melatonin.",
      "1": "The pancreas manages glucose with insulin and glucagon.",
      "3": "The parathyroid glands make PTH, calcitonin's opposite — a tempting answer because the names and locations are so close.",
    },
    commonMistake:
      "Assuming the parathyroids make calcitonin because they sit on the thyroid. Use the names: calcitonin comes from the thyroid, parathyroid hormone from the parathyroids, and they push calcium opposite ways.",
  },
  "During the fight-or-flight response, the adrenal medulla rapidly secretes which hormone to increase heart rate and mobilize energy?": {
    takeaway: "Adrenal medulla = epinephrine = fast response. Adrenal cortex = cortisol/aldosterone = slow.",
    whyCorrect:
      "Epinephrine (adrenaline) acts within seconds: heart rate up, airways open, stored glucose released.",
    distractors: {
      "0": "Aldosterone comes from the cortex and manages sodium and water over hours.",
      "1": "Cortisol also comes from the cortex and handles sustained stress, not the instant surge.",
      "3": "Thyroxine sets baseline metabolism and changes slowly.",
    },
    commonMistake:
      "Blurring the adrenal gland's two layers. The inner medulla fires fast for emergencies; the outer cortex works slowly with steroid hormones.",
  },
  "Which hormone lowers blood calcium levels by promoting calcium deposition into bone?": {
    takeaway: "Calcitonin lowers blood calcium by depositing it into bone.",
    whyCorrect:
      "Calcitonin drives calcium out of the blood and into bone — a useful memory hook is that it puts calcium into the bone 'tin'.",
    distractors: {
      "0": "Melatonin governs sleep cycles.",
      "1": "Insulin lowers glucose, not calcium.",
      "2": "Parathyroid hormone does the exact opposite, pulling calcium out of bone to raise blood levels.",
    },
    commonMistake:
      "Reversing the calcium pair. Calcitonin puts calcium away; PTH takes it back out.",
  },
  "Which hormone, secreted by the pineal gland, helps regulate the sleep-wake cycle?": {
    takeaway: "The pineal gland releases melatonin in darkness to drive the sleep-wake cycle.",
    whyCorrect:
      "Melatonin secretion rises as light fades, which is why screens at night and jet lag both disrupt sleep.",
    distractors: {
      "0": "Calcitonin comes from the thyroid and manages calcium.",
      "1": "Cortisol follows a daily rhythm too, but it drives the stress response and peaks in the morning to wake you.",
      "2": "Parathyroid hormone raises blood calcium.",
    },
    commonMistake:
      "Confusing melatonin with melanin. Melatonin is the sleep hormone; melanin is the skin and hair pigment.",
  },
  "Which gland is often called the master gland because it controls several other endocrine glands?": {
    takeaway: "The pituitary directs other glands; the hypothalamus directs the pituitary.",
    whyCorrect:
      "Its hormones are addressed to other glands — TSH to the thyroid, ACTH to the adrenal cortex — so it sets the pace for much of the endocrine system.",
    distractors: {
      "0": "The thyroid is a target gland, driven by pituitary TSH.",
      "1": "The pineal gland releases melatonin on a light cycle and commands nothing.",
      "3": "The adrenal glands take orders from ACTH rather than giving them.",
    },
    commonMistake:
      "Picking the gland with the biggest effects. 'Master' is about which gland commands the others, not which produces the strongest hormone.",
  },
  "When blood glucose levels rise after a meal, the pancreas releases which hormone to lower them?": {
    takeaway: "Glucose up → insulin out → glucose into cells.",
    whyCorrect:
      "Beta cells sense the post-meal rise and release insulin, which lets cells take glucose in and brings blood sugar back to normal.",
    distractors: {
      "0": "Adrenaline raises blood glucose for emergency energy.",
      "1": "Thyroxine sets metabolic rate, not moment-to-moment glucose.",
      "3": "Glucagon raises glucose — it is what the pancreas releases when sugar is too LOW.",
    },
    commonMistake:
      "Choosing glucagon because it also comes from the pancreas. Match the direction: after a meal sugar is high, so the body needs the hormone that brings it down.",
  },
  "When blood glucose drops too low, the pancreas secretes glucagon, which raises blood sugar mainly by which action?": {
    takeaway: "Glucagon tells the liver to break down glycogen and release glucose.",
    steps: [
      "Alpha cells detect low blood glucose and release glucagon.",
      "Glucagon reaches the liver, the body's glucose warehouse.",
      "The liver converts stored glycogen back to glucose and releases it into the blood.",
    ],
    whyCorrect:
      "The liver's glycogen stores are the fastest source of glucose, and glucagon's main job is unlocking them.",
    distractors: {
      "0": "The thyroid is not part of glucose regulation.",
      "2": "Cells absorbing more glucose would lower blood sugar — that is insulin's effect.",
      "3": "Filtering sugar out through the kidneys would lower it further, the opposite of the goal.",
    },
    commonMistake:
      "Forgetting the liver's role. Glucagon does not create glucose; it releases what the liver already had stored.",
  },
  "The thyroid gland secretes hormones that primarily influence which body process?": {
    takeaway: "Thyroid hormones set the body's metabolic rate.",
    whyCorrect:
      "Thyroxine determines how quickly cells consume energy, affecting weight, temperature, and heart rate together.",
    distractors: {
      "0": "Clotting depends on platelets and clotting factors, not hormones from the thyroid.",
      "1": "Urine production is governed by ADH and aldosterone acting on the kidneys.",
      "3": "Starch digestion is done by amylase, an enzyme rather than a hormone.",
    },
    commonMistake:
      "Confusing hormones with enzymes. Hormones are chemical messengers carried in blood; enzymes like amylase catalyze reactions on the spot.",
  },
  "The adrenal glands release adrenaline (epinephrine), which prepares the body for what type of response?": {
    takeaway: "Adrenaline drives fight-or-flight: heart and breathing up, energy released.",
    whyCorrect:
      "Every effect points one way — more oxygen and glucose to muscles for immediate physical action.",
    distractors: {
      "0": "Cooling during sleep is a circadian effect tied to melatonin, not adrenaline.",
      "1": "Red blood cell production is stimulated by erythropoietin from the kidneys.",
      "3": "Storing fat is a rest-and-digest activity, the opposite of what adrenaline promotes.",
    },
    commonMistake:
      "Overthinking a hormone you already know by feel. Adrenaline is the racing-heart hormone — trust that and pick the emergency answer.",
  },
  "The parathyroid glands secrete a hormone that regulates the blood level of which mineral?": {
    takeaway: "Parathyroid hormone regulates calcium.",
    whyCorrect:
      "PTH raises blood calcium by pulling it from bone, reclaiming it in the kidneys, and increasing intestinal absorption — critical because nerves and muscles fail without steady calcium.",
    distractors: {
      "0": "Iron balance is managed by absorption and storage proteins like ferritin, not PTH.",
      "1": "Sodium is regulated by aldosterone from the adrenal cortex.",
      "3": "Iodine is the raw material the THYROID needs to build T3 and T4 — a near-miss because the glands sit together.",
    },
    commonMistake:
      "Sliding from parathyroid to thyroid and answering iodine. The parathyroids handle calcium; the thyroid needs iodine.",
  },
  "In negative feedback control of hormones, a rising hormone level typically produces what effect?": {
    takeaway: "Negative feedback means the output shuts off its own production — like a thermostat.",
    whyCorrect:
      "As the hormone rises, it signals the controlling gland to slow down, holding the level in a narrow range.",
    distractors: {
      "0": "Output increasing its own release is positive feedback, which is rare and self-amplifying (labor contractions, blood clotting).",
      "2": "No effect would mean no regulation at all, and levels would drift freely.",
      "3": "Indefinite enlargement describes a pathological state, not normal control.",
    },
    commonMistake:
      "Reading 'negative' as harmful. It means opposing the change — the mechanism that keeps you stable.",
  },
  "The pineal gland secretes melatonin, a hormone that primarily helps regulate which body function?": {
    takeaway: "The pineal gland releases melatonin in darkness to drive the sleep-wake cycle.",
    whyCorrect:
      "Melatonin tracks light and dark, setting the circadian rhythm that tells the body when to sleep.",
    distractors: {
      "1": "Kidney filtration is influenced by ADH and aldosterone.",
      "2": "Protein digestion is enzyme work — pepsin and trypsin.",
      "3": "Calcium balance belongs to calcitonin and parathyroid hormone.",
    },
    commonMistake:
      "Mixing up the small brain glands. Pineal makes melatonin for sleep; pituitary is the master gland issuing orders.",
  },
  "Which of the following hormones are produced and secreted by the anterior pituitary gland? Select all that apply.": {
    takeaway: "Anterior pituitary MAKES its hormones; posterior only stores ADH and oxytocin from the hypothalamus.",
    steps: [
      "Ask of each hormone: is it made here, or only stored here?",
      "GH, ACTH, and TSH are manufactured by anterior pituitary cells.",
      "ADH and oxytocin are built in the hypothalamus and merely released from the posterior lobe.",
    ],
    whyCorrect:
      "Growth hormone, ACTH, and TSH are all anterior products — and the -tropic ones (ACTH, TSH) show the anterior lobe's role of directing other glands.",
    distractors: {
      "0": "Oxytocin is made in the hypothalamus and released from the posterior pituitary.",
      "3": "ADH is likewise hypothalamic in origin, only stored posteriorly.",
    },
    commonMistake:
      "Counting any pituitary-released hormone as anterior. The question asks what is PRODUCED there, which rules out the two posterior storage hormones.",
  },

  // ── SCIENCE / anatomy-physiology / Cardiovascular System ──────────────────
  // Two rules unlock most of this skill: arteries carry blood AWAY from the
  // heart (regardless of oxygen), and the right side serves the lungs while
  // the left side serves the body.
  "Which sequence correctly traces blood flow through the heart starting at the right atrium?": {
    takeaway: "Right side to the lungs, left side to the body — and blood never skips a chamber.",
    steps: [
      "Deoxygenated blood from the body fills the right atrium.",
      "It drops into the right ventricle.",
      "The right ventricle pumps it out the pulmonary artery to the lungs.",
    ],
    whyCorrect:
      "Each step moves blood atrium → ventricle → artery on the same side, which is the only legal path.",
    distractors: {
      "0": "Blood cannot pass directly from the right atrium to the left atrium; the septum separates them.",
      "2": "Pulmonary VEINS return blood from the lungs — they do not carry it there.",
      "3": "The right atrium empties into the right ventricle, not the left.",
    },
    commonMistake:
      "Assuming arteries always carry oxygenated blood. The pulmonary artery is the exception: it leaves the heart (making it an artery) carrying deoxygenated blood.",
  },
  "Which type of blood vessel carries blood away from the heart?": {
    takeaway: "Arteries go Away; veins return.",
    whyCorrect:
      "Arteries carry blood away from the heart under high pressure, which is why their walls are thick and muscular.",
    distractors: {
      "1": "Veins return blood toward the heart, at low pressure and with valves to stop backflow.",
      "2": "Venules are the small vessels that collect blood from capillaries into veins.",
      "3": "Capillaries are the one-cell-thick exchange vessels between arteries and veins.",
    },
    commonMistake:
      "Sorting vessels by oxygen instead of direction. Direction is the definition — the pulmonary artery carries deoxygenated blood and is still an artery.",
  },
  "Which structure of the heart's conduction system normally functions as the primary pacemaker that initiates each heartbeat?": {
    takeaway: "The SA node is the pacemaker; everything else relays what it starts.",
    whyCorrect:
      "The SA node in the right atrium depolarizes spontaneously and faster than any other tissue, so its rhythm wins and sets the heart rate.",
    distractors: {
      "1": "The bundle of His carries the impulse from the AV node into the ventricles.",
      "2": "The AV node briefly delays the impulse so the atria finish emptying — it can pace if the SA node fails, but more slowly.",
      "3": "Purkinje fibers spread the impulse through ventricular muscle so it contracts as a unit.",
    },
    commonMistake:
      "Picking the AV node because it sounds central. Follow the impulse in order — SA node, AV node, bundle of His, Purkinje fibers — and the initiator is first.",
  },
  "Which chamber of the heart pumps oxygenated blood into the aorta for distribution to the body?": {
    takeaway: "The left ventricle pumps to the whole body — the hardest job, so it has the thickest wall.",
    whyCorrect:
      "Oxygenated blood arrives in the left atrium, drops to the left ventricle, and is forced into the aorta for the systemic circuit.",
    distractors: {
      "1": "The right atrium receives deoxygenated blood returning from the body.",
      "2": "The left atrium receives oxygenated blood from the lungs, then passes it down rather than out.",
      "3": "The right ventricle pumps to the lungs, a much shorter, lower-pressure trip.",
    },
    commonMistake:
      "Confusing atria with ventricles. Atria receive, ventricles pump — so any 'pumps out to' question has a ventricle for its answer.",
  },
  "The electrical impulse that normally initiates each heartbeat originates in which structure?": {
    takeaway: "The SA node is the pacemaker; everything else relays what it starts.",
    whyCorrect:
      "The SA node fires on its own about 60–100 times a minute, and that intrinsic rhythm is the heartbeat.",
    distractors: {
      "0": "The bundle of His conducts the impulse into the ventricular septum.",
      "1": "The AV node passes the impulse along after a deliberate delay.",
      "3": "Purkinje fibers deliver the impulse to ventricular muscle last.",
    },
    commonMistake:
      "Treating every conduction structure as a possible starter. Only the SA node normally initiates; the rest conduct.",
  },
  "The atrioventricular (AV) valve located between the left atrium and left ventricle is the:": {
    takeaway: "Left AV valve = bicuspid (mitral). Right AV valve = tricuspid.",
    whyCorrect:
      "The bicuspid valve has two cusps and guards the left atrium–left ventricle opening; 'mitral' is its other name.",
    distractors: {
      "0": "The pulmonary semilunar valve guards the right ventricle's exit to the lungs.",
      "1": "The tricuspid valve is the AV valve on the right side.",
      "3": "The aortic semilunar valve guards the left ventricle's exit into the aorta — right side of the heart, wrong point in the circuit.",
    },
    commonMistake:
      "Losing track of which AV valve is which. Tricuspid has three cusps and sits on the right; bicuspid has two and sits on the left.",
  },
  "During ventricular systole, what happens to the heart and its valves?": {
    takeaway: "Systole = ventricles contract, semilunar valves open, AV valves slam shut.",
    steps: [
      "The ventricles contract, driving pressure up sharply.",
      "That pressure forces the semilunar valves open, ejecting blood into the aorta and pulmonary artery.",
      "The same pressure snaps the AV valves closed, so nothing washes back into the atria.",
    ],
    whyCorrect:
      "Contraction with the semilunar valves open is exactly what ejection requires.",
    distractors: {
      "1": "Open AV valves with relaxed ventricles describes diastole, the filling phase.",
      "2": "Relaxing and filling is also diastole, the opposite of systole.",
      "3": "Backflow from the arteries is what the semilunar valves exist to prevent.",
    },
    commonMistake:
      "Mixing up systole and diastole. Systole squeezes (both start with S); diastole is the resting, filling phase.",
  },
  "Which valve prevents blood from flowing back into the left atrium when the left ventricle contracts?": {
    takeaway: "Left AV valve = bicuspid (mitral). Right AV valve = tricuspid.",
    whyCorrect:
      "The mitral valve sits between the left atrium and left ventricle, so it is the only valve positioned to block backflow into that atrium.",
    distractors: {
      "0": "The tricuspid does this same job on the right side of the heart.",
      "1": "The aortic valve guards the exit to the aorta, downstream rather than back toward the atrium.",
      "3": "The pulmonary valve guards the right ventricle's exit to the lungs.",
    },
    commonMistake:
      "Choosing a valve without checking the chamber named. Trace which two spaces the valve must sit between, then name it.",
  },
  "Blood leaving the right ventricle on its way to the lungs must pass through which valve?": {
    takeaway: "Each ventricle exits through its own semilunar valve: right → pulmonary, left → aortic.",
    whyCorrect:
      "The pulmonary valve sits between the right ventricle and the pulmonary trunk, opening as the right ventricle contracts.",
    distractors: {
      "0": "The mitral valve is on the left side, between atrium and ventricle.",
      "1": "The tricuspid valve is passed BEFORE this point, entering the right ventricle rather than leaving it.",
      "3": "The aortic valve serves the left ventricle and the systemic circuit.",
    },
    commonMistake:
      "Choosing the tricuspid because it is also on the right. The tricuspid is the way in; the pulmonary valve is the way out.",
  },
  "Cardiac output is the volume of blood the heart pumps each minute. Which formula correctly defines cardiac output?": {
    takeaway: "Cardiac output = heart rate × stroke volume.",
    steps: [
      "Heart rate is beats per minute.",
      "Stroke volume is milliliters pumped per beat.",
      "Beats/minute × mL/beat = mL/minute — the units multiply into volume per minute.",
    ],
    whyCorrect:
      "Multiplying is the only operation that turns per-beat volume and beats-per-minute into volume per minute.",
    distractors: {
      "0": "Dividing gives beats per milliliter, a meaningless unit.",
      "2": "Adding two different units together is not a valid operation.",
      "3": "This inverts the relationship and produces the wrong units.",
    },
    commonMistake:
      "Memorizing the formula without the units. Checking that the units come out as volume per minute confirms multiplication every time.",
  },
  "During exercise, a person's heart rate increases while stroke volume stays the same. What happens to cardiac output?": {
    takeaway: "In CO = HR × SV, raising one factor while the other holds raises the product.",
    steps: [
      "Cardiac output = heart rate × stroke volume.",
      "Heart rate goes up; stroke volume is unchanged.",
      "A larger factor times the same factor gives a larger product, so cardiac output rises.",
    ],
    whyCorrect:
      "This is exactly what exercise demands — more blood per minute delivering oxygen to working muscle.",
    distractors: {
      "1": "Cardiac output dropping to zero would mean cardiac arrest.",
      "2": "A decrease would require heart rate or stroke volume to fall; neither does.",
      "3": "Staying the same would require the factors to offset, but only one changed.",
    },
    commonMistake:
      "Overthinking the physiology. Treat it as arithmetic: one factor up, the other constant, so the product goes up.",
  },
  "Which statement correctly describes atherosclerosis?": {
    takeaway: "Atherosclerosis is plaque buildup that narrows and hardens arteries.",
    whyCorrect:
      "Fatty plaque deposits along artery walls, shrinking the opening and stiffening the vessel, which restricts flow and can trigger heart attack or stroke.",
    distractors: {
      "0": "Chronically high pressure against artery walls is hypertension — related and often coexisting, but a different condition.",
      "1": "An abnormally slow heart rate is bradycardia.",
      "2": "Backflow through a leaky valve is valve regurgitation.",
    },
    commonMistake:
      "Swapping atherosclerosis and hypertension because they travel together. Atherosclerosis is the physical plaque; hypertension is the pressure reading.",
  },
  "A patient is told that the force of blood pushing against the walls of the arteries is consistently too high. Which condition does this describe?": {
    takeaway: "Blood pressure IS the force against artery walls, so persistently high force = hypertension.",
    whyCorrect:
      "The stem defines blood pressure almost word for word; 'consistently too high' makes it hypertension.",
    distractors: {
      "0": "Atherosclerosis is plaque buildup — a common cause of high pressure, but not the pressure itself.",
      "1": "Tachycardia is a fast heart RATE, which is not the same as pressure.",
      "3": "Anemia is too few red blood cells or too little hemoglobin.",
    },
    commonMistake:
      "Confusing rate with pressure. Tachycardia counts beats; hypertension measures force.",
  },
  "Which sequence correctly orders the three main steps of hemostasis after a blood vessel is injured?": {
    takeaway: "Hemostasis: spasm, then platelet plug, then coagulation — fastest response first.",
    steps: [
      "Vascular spasm: the vessel constricts within seconds to cut flow.",
      "Platelet plug: platelets stick to the injury and to each other, a temporary patch.",
      "Coagulation: fibrin threads weave through the plug to make a stable clot.",
    ],
    whyCorrect:
      "The order runs from fastest and weakest to slowest and strongest, each step buying time for the next.",
    distractors: {
      "1": "Vascular spasm is immediate; it cannot come last.",
      "2": "Coagulation reinforces the platelet plug, so the plug must form first.",
      "3": "Coagulation is the slowest step and cannot be first.",
    },
    commonMistake:
      "Putting coagulation first because clotting is the familiar word. The clot is the finish, not the start.",
  },
  "During the coagulation phase of hemostasis, which protein forms the mesh of threads that traps blood cells and stabilizes the clot?": {
    takeaway: "Fibrinogen (soluble) converts to fibrin (insoluble threads) to lock the clot together.",
    whyCorrect:
      "Fibrin threads weave a net through the platelet plug, trapping red blood cells and turning a fragile patch into a stable clot.",
    distractors: {
      "0": "Collagen is exposed by the injury and helps platelets stick, but it is structural tissue protein, not the clot mesh.",
      "2": "Hemoglobin carries oxygen inside red blood cells.",
      "3": "Albumin maintains blood osmotic pressure and transports substances.",
    },
    commonMistake:
      "Mixing up fibrinogen and fibrin. Fibrinogen dissolves in plasma at all times; fibrin is the threaded form that only appears when clotting starts.",
  },
  "Which of the following normally carry oxygenated blood? Select all that apply.": {
    takeaway: "Oxygenated blood runs lungs → pulmonary veins → left heart → aorta.",
    steps: [
      "Blood picks up oxygen in the lungs.",
      "Pulmonary VEINS carry it to the left atrium — veins with oxygenated blood, the exception to the rule.",
      "The left ventricle pumps it into the aorta and onward to the body.",
    ],
    whyCorrect:
      "All three sit on the oxygenated stretch of the circuit, between the lungs and the body's tissues.",
    distractors: {
      "1": "Pulmonary arteries carry deoxygenated blood from the right ventricle TO the lungs — the artery exception.",
      "4": "The superior vena cava returns deoxygenated blood from the upper body to the right atrium.",
    },
    commonMistake:
      "Applying 'arteries are oxygenated, veins are not' to the pulmonary vessels. In the lung circuit both are reversed, which is exactly what this question tests.",
  },
  "Beginning with blood returning from the body, place the following in the correct order that a drop of blood passes through them.": {
    takeaway: "Right atrium → right ventricle → pulmonary arteries → left atrium → left ventricle.",
    steps: [
      "Deoxygenated blood from the body enters the right atrium.",
      "It passes down into the right ventricle.",
      "The right ventricle pumps it through the pulmonary arteries to the lungs.",
      "Newly oxygenated, it returns to the left atrium.",
      "It drops into the left ventricle to be pumped out to the body.",
    ],
    whyCorrect:
      "The path alternates atrium then ventricle on each side, with the lungs in between — the right heart's whole job is getting blood to the lungs so the left heart can send it onward.",
    commonMistake:
      "Starting on the left. Blood returning FROM the body always arrives on the right side; the left side handles blood coming back from the lungs.",
  },

  // ── SCIENCE / anatomy-physiology / Gastrointestinal System ────────────────
  // The organizing distinction: the alimentary canal is the tube food passes
  // through; accessory organs (liver, gallbladder, pancreas) only send
  // secretions into it. Most distractors here are accessory/canal confusions.
  "Which organ is the primary site for the absorption of nutrients into the bloodstream?": {
    takeaway: "The small intestine absorbs nutrients; its villi make the surface area enormous.",
    whyCorrect:
      "Villi and microvilli fold the lining into a surface roughly the size of a tennis court, and it sits exactly where digestion finishes.",
    distractors: {
      "0": "The stomach digests and churns; almost nothing is absorbed there beyond alcohol and some drugs.",
      "1": "The esophagus is a transport tube with no absorptive role.",
      "2": "The large intestine absorbs water and electrolytes, not nutrients.",
    },
    commonMistake:
      "Assuming the biggest organ absorbs the most. The large intestine is wider, but the small intestine is far longer and lined with villi.",
  },
  "Bile, which emulsifies fats, is produced by the liver and stored and concentrated in which organ?": {
    takeaway: "Liver produces bile; gallbladder stores and concentrates it.",
    whyCorrect:
      "The gallbladder holds bile between meals and squeezes it into the small intestine when fat arrives.",
    distractors: {
      "0": "The duodenum receives bile and puts it to work, but stores nothing.",
      "1": "The pancreas makes digestive enzymes and bicarbonate.",
      "2": "The spleen filters blood and supports immunity; it is not a digestive organ.",
    },
    commonMistake:
      "Blurring 'makes' and 'stores'. Read which verb the question uses — liver makes, gallbladder stores.",
  },
  "The enzyme pepsin, which begins protein digestion in the stomach, requires which condition to function optimally?": {
    takeaway: "Pepsin needs strong stomach acid (about pH 1.5–2); pancreatic enzymes need alkaline conditions.",
    whyCorrect:
      "Hydrochloric acid both activates pepsinogen into pepsin and maintains the low pH pepsin needs to keep working.",
    distractors: {
      "0": "Alkaline conditions suit the pancreatic enzymes downstream, and would shut pepsin down.",
      "2": "Bile salts emulsify fats; they have nothing to do with activating pepsin.",
      "3": "Neutral pH is where salivary amylase works, not pepsin.",
    },
    commonMistake:
      "Assuming all digestive enzymes prefer similar conditions. Each is tuned to its own compartment — acidic stomach, alkaline small intestine.",
  },
  "Most absorption of nutrients into the bloodstream occurs in which segment of the digestive tract?": {
    takeaway: "The small intestine absorbs nutrients; its villi make the surface area enormous.",
    whyCorrect:
      "Chemical digestion finishes here, and the villi-covered lining immediately absorbs the products into blood and lymph.",
    distractors: {
      "0": "The large intestine reclaims water and electrolytes from what is left.",
      "1": "The stomach mixes and begins protein digestion but absorbs almost nothing.",
      "3": "The esophagus only transports food to the stomach.",
    },
    commonMistake:
      "Crediting the stomach because digestion is so obviously happening there. Digestion and absorption are separate jobs in separate places.",
  },
  "Bile, which emulsifies dietary fats, is produced by which organ?": {
    takeaway: "Liver produces bile; gallbladder stores and concentrates it.",
    whyCorrect:
      "Liver cells continuously manufacture bile, which then travels to the gallbladder for storage.",
    distractors: {
      "0": "The spleen is a lymphatic organ, not a digestive one.",
      "1": "The pancreas produces enzymes and bicarbonate, not bile.",
      "3": "The gallbladder stores bile but never produces it — the most common trap on this question.",
    },
    commonMistake:
      "Answering gallbladder because it is the organ most associated with bile. Storage is not production.",
  },
  "The enzyme pepsin, which begins protein digestion, requires which environment to function effectively?": {
    takeaway: "Pepsin needs strong stomach acid; pancreatic enzymes need alkaline conditions.",
    whyCorrect:
      "Stomach hydrochloric acid activates pepsinogen into pepsin and sustains the low pH it needs.",
    distractors: {
      "0": "The gallbladder stores bile and is not where enzymes act on food.",
      "1": "The alkaline small intestine is where pancreatic proteases take over from pepsin.",
      "3": "Saliva is near neutral, suiting amylase rather than pepsin.",
    },
    commonMistake:
      "Pairing protein digestion with the small intestine. Protein digestion STARTS in the acidic stomach and is completed downstream.",
  },
  "Which sequence correctly traces food through the digestive tract?": {
    takeaway: "Mouth → esophagus → stomach → small intestine → large intestine.",
    whyCorrect:
      "Food is chewed, swallowed down the esophagus, churned in the stomach, digested and absorbed in the small intestine, then water is reclaimed in the large intestine.",
    distractors: {
      "0": "This puts the small intestine before the stomach, skipping the stomach's churning step.",
      "2": "Food starts at the mouth, not the esophagus, and small precedes large intestine.",
      "3": "The esophagus carries food TO the stomach, so it cannot come after it.",
    },
    commonMistake:
      "Reversing small and large intestine. Small comes first: nutrients are absorbed there, and only leftovers reach the large intestine.",
  },
  "Most of the chemical digestion and nutrient absorption of food takes place in which organ?": {
    takeaway: "The small intestine both finishes digestion and does most absorption.",
    whyCorrect:
      "Pancreatic enzymes and bile arrive here to complete the breakdown, and the villi absorb the results on the spot.",
    distractors: {
      "0": "The stomach starts protein digestion but completes little and absorbs almost nothing.",
      "1": "The large intestine absorbs water, not nutrients.",
      "3": "The esophagus is purely a passageway.",
    },
    commonMistake:
      "Splitting digestion and absorption between organs. The small intestine is the answer to both.",
  },
  "The tiny finger-like projections that line the small intestine and increase surface area for absorption are called what?": {
    takeaway: "Villi are the finger-like folds of the small intestine that multiply absorptive surface.",
    whyCorrect:
      "Villi (each covered in even smaller microvilli) turn a smooth tube into a vast absorptive surface.",
    distractors: {
      "0": "Nephrons are the filtering units of the kidney.",
      "1": "Cilia are hair-like structures that sweep mucus in the airways.",
      "3": "Alveoli are the gas exchange sacs of the lungs — the same surface-area principle, wrong organ.",
    },
    commonMistake:
      "Confusing villi with alveoli. Both maximize surface area, but villi absorb nutrients in the gut and alveoli exchange gases in the lungs.",
  },
  "Which enzyme begins the chemical digestion of starch in the mouth?": {
    takeaway: "Salivary amylase starts carbohydrate digestion in the mouth.",
    whyCorrect:
      "Saliva contains amylase, which starts splitting starch into sugars while you chew — why a cracker turns sweet if held in the mouth.",
    distractors: {
      "1": "Bile is not an enzyme at all; it emulsifies fats.",
      "2": "Lipase digests fats, mostly in the small intestine.",
      "3": "Pepsin digests protein in the stomach.",
    },
    commonMistake:
      "Forgetting that digestion starts before swallowing. Chemical digestion of starch begins in the mouth, not the stomach.",
  },
  "Pepsin, an enzyme active in the acidic environment of the stomach, primarily digests which type of nutrient?": {
    takeaway: "Pepsin digests protein. (Both start with P.)",
    whyCorrect:
      "Pepsin cleaves proteins into shorter peptide chains, the first real step of protein digestion.",
    distractors: {
      "1": "Fats are handled by lipase, aided by bile.",
      "2": "Fiber is not digested by human enzymes at all; it passes through to the large intestine.",
      "3": "Starches are handled by amylase.",
    },
    commonMistake:
      "Guessing among enzymes without the name cues: Pepsin–Protein, Amylase–Amylose (starch), Lipase–Lipids (fats).",
  },
  "Bile, which helps break large fat droplets into smaller ones, is produced by which organ?": {
    takeaway: "Liver produces bile; gallbladder stores and concentrates it.",
    whyCorrect:
      "The liver manufactures bile continuously; emulsifying fat into small droplets gives lipase far more surface to work on.",
    distractors: {
      "1": "The gallbladder stores bile rather than producing it.",
      "2": "The stomach produces acid and pepsinogen, not bile.",
      "3": "The pancreas produces enzymes including lipase, which acts on the droplets bile creates.",
    },
    commonMistake:
      "Answering gallbladder out of association. Ask which organ MAKES it — that is always the liver.",
  },
  "The pancreas aids digestion by releasing enzymes such as lipase and amylase into which structure?": {
    takeaway: "Pancreatic enzymes empty into the small intestine (the duodenum).",
    whyCorrect:
      "The pancreatic duct delivers enzymes and bicarbonate into the duodenum, where the bicarbonate neutralizes stomach acid so those enzymes can work.",
    distractors: {
      "1": "The esophagus only transports food; no digestive secretions enter it.",
      "2": "The stomach makes its own acid and pepsinogen; pancreatic enzymes would be destroyed by its acidity.",
      "3": "The large intestine receives no pancreatic enzymes — digestion is finished by then.",
    },
    commonMistake:
      "Assuming enzymes go where food is most obviously being broken down. Follow the ducts: liver and pancreas both drain into the small intestine.",
  },
  "A primary function of the large intestine is to do which of the following?": {
    takeaway: "The large intestine reclaims water and compacts waste.",
    whyCorrect:
      "By this point nutrients are absorbed, so the remaining job is recovering water and electrolytes and forming solid feces.",
    distractors: {
      "0": "Protein digestion begins in the stomach.",
      "1": "Insulin comes from the pancreas, and it is a hormone rather than a digestive function.",
      "3": "Oxygenating blood is the lungs' job.",
    },
    commonMistake:
      "Expecting the large intestine to digest. Its work is recovery and compaction, which is why dehydration and diarrhea are linked.",
  },
  "The gallbladder contributes to digestion mainly by performing which role?": {
    takeaway: "The gallbladder stores and concentrates bile, releasing it when fat arrives.",
    whyCorrect:
      "Bile is made continuously but needed only at meals, so the gallbladder banks it and delivers a concentrated dose on demand.",
    distractors: {
      "0": "Absorption of nutrients happens in the small intestine.",
      "1": "Pepsin comes from the stomach lining, as pepsinogen.",
      "2": "Insulin is secreted by the pancreas.",
    },
    commonMistake:
      "Crediting the gallbladder with producing bile. It is a reservoir, not a factory — which is why the liver keeps working after gallbladder removal.",
  },
  "Which of the following are accessory organs of digestion rather than parts of the alimentary canal? Select all that apply.": {
    takeaway: "Accessory organs secrete into the tube; food never passes through them.",
    steps: [
      "Ask of each organ: does swallowed food physically travel through it?",
      "Liver, gallbladder, and pancreas send secretions in but hold no food — accessory.",
      "Stomach and small intestine are segments of the tube itself — alimentary canal.",
    ],
    whyCorrect:
      "The liver, gallbladder, and pancreas all deliver bile or enzymes through ducts while staying outside the food's path.",
    distractors: {
      "2": "The small intestine is the main stretch of the canal; food passes directly through it.",
      "4": "The stomach is a canal organ that holds and churns food.",
    },
    commonMistake:
      "Sorting by importance instead of by path. The test is purely whether food travels through the organ.",
  },
  "Place the following organs of the alimentary canal in the correct order that food travels through them.": {
    takeaway: "Mouth → esophagus → stomach → small intestine → large intestine.",
    steps: [
      "The mouth chews and starts starch digestion.",
      "The esophagus carries the bolus down by peristalsis.",
      "The stomach churns and begins protein digestion.",
      "The small intestine finishes digestion and absorbs nutrients.",
      "The large intestine reclaims water and forms waste.",
    ],
    whyCorrect:
      "This is the alimentary canal in order; the accessory organs feed into it but never appear in the path.",
    commonMistake:
      "Placing the large intestine before the small. Small comes first — the names describe diameter, not sequence.",
  },

  // ── MATH / numbers-algebra / Compare & Order Rational Numbers ─────────────
  // One strategy answers this entire skill: convert everything to decimals,
  // then compare. The negatives are where it gets dangerous, because the
  // ranking flips — more negative means smaller.
  "Which of the following has the greatest value?": {
    takeaway: "Put every value in the same form — decimals — before comparing.",
    steps: [
      "1/3 ≈ 0.333.",
      "2/5 = 0.4.",
      "The list is then 0.333, 0.5, 0.45, 0.4.",
      "0.5 is the largest.",
    ],
    whyCorrect: "0.5 exceeds every other value once they are all written as decimals.",
    distractors: {
      "0": "1/3 ≈ 0.333 is the smallest of the four.",
      "2": "0.45 is close to 0.5 but still below it.",
      "3": "2/5 = 0.4, less than 0.45 and 0.5.",
    },
    commonMistake:
      "Comparing fractions and decimals by eye. A bigger denominator does not mean a bigger value — convert first.",
  },
  "Order these numbers from least to greatest: 3/5, 0.55, 7/10.": {
    takeaway: "Convert to decimals, order those, then translate back to the original forms.",
    steps: [
      "3/5 = 0.6 and 7/10 = 0.7.",
      "The values are 0.6, 0.55, 0.7.",
      "Least to greatest: 0.55, 0.6, 0.7 — that is 0.55, 3/5, 7/10.",
    ],
    whyCorrect: "0.55 < 0.6 < 0.7 puts them in exactly this order.",
    distractors: {
      "0": "This is greatest to least, and misplaces 0.55.",
      "1": "7/10 = 0.7 is the largest, so it cannot sit in the middle.",
      "2": "3/5 = 0.6 is larger than 0.55, so it cannot come first.",
    },
    commonMistake:
      "Answering with the decimal order but forgetting to map back to the labels the options use.",
  },
  "Which number is less than −2/3?": {
    takeaway: "With negatives, 'less than' means farther from zero.",
    steps: [
      "−2/3 ≈ −0.667.",
      "Convert the options: −3/4 = −0.75, −0.6, −0.5, −1/2 = −0.5.",
      "Only −0.75 sits below −0.667 on the number line.",
    ],
    whyCorrect: "−0.75 is farther left than −0.667, so it is smaller.",
    distractors: {
      "1": "−0.6 is closer to zero than −0.667, making it greater.",
      "2": "−0.5 is closer to zero still.",
      "3": "−1/2 = −0.5, the same value as option 2 and also greater.",
    },
    commonMistake:
      "Treating the bigger-looking number as bigger. Among negatives, −0.75 looks larger than −0.6 but is actually less.",
  },
  "Which of the following numbers is the greatest: 0.6, 5/8, 0.58, or 3/5?": {
    takeaway: "Convert every value to a decimal, then compare place by place.",
    steps: [
      "5/8 = 0.625 and 3/5 = 0.6.",
      "The list is 0.6, 0.625, 0.58, 0.6.",
      "0.625 is the largest.",
    ],
    whyCorrect: "5/8 = 0.625 tops the list.",
    distractors: {
      "0": "0.58 is the smallest of the four.",
      "1": "3/5 = 0.6, tied with the decimal 0.6 but below 0.625.",
      "3": "0.6 equals 3/5 and falls short of 0.625.",
    },
    commonMistake:
      "Assuming two values written differently must differ. 0.6 and 3/5 are the same number here — the winner is neither.",
  },
  "Order from least to greatest: −2/3, −0.7, −5/8.": {
    takeaway: "Convert to decimals, then remember the ranking flips for negatives.",
    steps: [
      "−2/3 ≈ −0.667, −0.7, −5/8 = −0.625.",
      "Farther from zero is smaller: −0.7 < −0.667 < −0.625.",
      "In original form: −0.7, −2/3, −5/8.",
    ],
    whyCorrect: "−0.7 is the most negative, so it comes first in a least-to-greatest ordering.",
    distractors: {
      "0": "This starts with −5/8, which is the greatest, not the least.",
      "1": "−2/3 ≈ −0.667 is not the smallest; −0.7 is.",
      "2": "−5/8 = −0.625 is greater than −2/3, so it cannot sit in the middle.",
    },
    commonMistake:
      "Ordering the digits as if positive. Sort the absolute values, then reverse the whole list for negatives.",
  },
  "Which value lies between 1/4 and 1/2?": {
    takeaway: "'Between' means strictly greater than the lower bound and less than the upper.",
    steps: [
      "1/4 = 0.25 and 1/2 = 0.5 are the boundaries.",
      "Convert the choices: 1/3 ≈ 0.333, 1/5 = 0.2, 3/5 = 0.6, 1/8 = 0.125.",
      "Only 0.333 falls inside 0.25 to 0.5.",
    ],
    whyCorrect: "1/3 ≈ 0.333 sits between 0.25 and 0.5.",
    distractors: {
      "1": "1/5 = 0.2 is below the lower bound.",
      "2": "3/5 = 0.6 is above the upper bound.",
      "3": "1/8 = 0.125 is well below 0.25.",
    },
    commonMistake:
      "Assuming a fraction whose numbers fall between the bounds' numbers is itself between them. Denominators do not work that way — convert to decimals.",
  },
  "Order these numbers from least to greatest: 3/8, 0.3, 1/4, 0.45.": {
    takeaway: "Convert to decimals, order those, translate back.",
    steps: [
      "3/8 = 0.375 and 1/4 = 0.25.",
      "The values are 0.375, 0.3, 0.25, 0.45.",
      "Least to greatest: 0.25, 0.3, 0.375, 0.45 — that is 1/4, 0.3, 3/8, 0.45.",
    ],
    whyCorrect: "This orders all four correctly from smallest to largest.",
    distractors: {
      "0": "3/8 = 0.375 is larger than 0.3, so it cannot come second.",
      "1": "This runs greatest to least, the reverse of what was asked.",
      "2": "1/4 = 0.25 is smaller than 0.3, so 0.3 cannot be first.",
    },
    commonMistake:
      "Answering the greatest-to-least version. Confirm which direction the question asks for before choosing.",
  },
  "Order these numbers from greatest to least: −0.5, −1/4, −0.75, −1/3.": {
    takeaway: "For negatives, closest to zero is greatest.",
    steps: [
      "−1/4 = −0.25 and −1/3 ≈ −0.333.",
      "The values are −0.5, −0.25, −0.75, −0.333.",
      "Greatest (closest to zero) to least: −0.25, −0.333, −0.5, −0.75.",
    ],
    whyCorrect: "−1/4 is nearest zero and −0.75 is farthest, so this order runs correctly downward.",
    distractors: {
      "0": "−1/3 is not the greatest; −1/4 is closer to zero.",
      "1": "−0.5 is less than −1/3, so it cannot come before it.",
      "3": "This is least to greatest, the reverse of what was asked.",
    },
    commonMistake:
      "Reading 'greatest' as 'biggest digits'. With negatives, the greatest value has the smallest absolute value.",
  },
  "Which of these numbers is the least?": {
    takeaway: "The least negative number is the one farthest from zero.",
    steps: [
      "−2/3 ≈ −0.667 and −5/8 = −0.625.",
      "The values are −0.6, −0.667, −0.625, −0.7.",
      "−0.7 lies farthest left.",
    ],
    whyCorrect: "−0.7 is the most negative value in the list, so it is the least.",
    distractors: {
      "0": "−0.6 is the closest to zero, making it the greatest here.",
      "1": "−2/3 ≈ −0.667 is low but not the lowest.",
      "2": "−5/8 = −0.625 is closer to zero than −0.667.",
    },
    commonMistake:
      "Picking the value with the largest digits without checking the sign, or converting only some of the fractions.",
  },
  "Which of these numbers is the greatest?": {
    takeaway: "Convert to decimals and compare place by place.",
    steps: [
      "7/9 ≈ 0.778 and 5/6 ≈ 0.833.",
      "The values are 0.778, 0.83, 0.8, 0.833.",
      "0.833 edges out 0.83.",
    ],
    whyCorrect: "5/6 ≈ 0.8333 is just above 0.83.",
    distractors: {
      "0": "7/9 ≈ 0.778 is the smallest of the four.",
      "1": "0.83 is extremely close but still below 0.8333.",
      "2": "0.8 is below both.",
    },
    commonMistake:
      "Stopping the decimal conversion too early. Rounding 5/6 to 0.83 makes it look tied — carry a third place to break it.",
  },
  "Order these numbers from least to greatest: 1 1/2, 1.25, 1 3/4, 1.4.": {
    takeaway: "With mixed numbers, convert the fraction part and keep the whole number.",
    steps: [
      "1 1/2 = 1.5 and 1 3/4 = 1.75.",
      "The values are 1.5, 1.25, 1.75, 1.4.",
      "Least to greatest: 1.25, 1.4, 1.5, 1.75.",
    ],
    whyCorrect: "This is the correct ascending order of all four values.",
    distractors: {
      "1": "1.4 is less than 1 1/2 = 1.5, so 1 1/2 cannot come before it.",
      "2": "1.4 is greater than 1.25, so it cannot be first.",
      "3": "This runs greatest to least.",
    },
    commonMistake:
      "Comparing only the fraction parts. All four share the whole number 1, so the decimal part decides — but check the whole numbers first whenever they differ.",
  },
  "Which number lies between 0.5 and 0.75?": {
    takeaway: "Convert the choices and test each against both boundaries.",
    steps: [
      "5/8 = 0.625, which is above 0.5 and below 0.75.",
      "The others: 0.4, 1/3 ≈ 0.333, 4/5 = 0.8.",
    ],
    whyCorrect: "0.625 is the only value inside the interval.",
    distractors: {
      "0": "0.4 is below the lower bound of 0.5.",
      "2": "1/3 ≈ 0.333 is well below 0.5.",
      "3": "4/5 = 0.8 is above the upper bound of 0.75.",
    },
    commonMistake:
      "Checking only one boundary. A value can clear the bottom and still overshoot the top, so test both.",
  },
  "Which symbol makes this statement true: 3/5 ___ 0.6?": {
    takeaway: "Convert the fraction: 3 ÷ 5 = 0.6 exactly.",
    steps: ["Divide: 3 ÷ 5 = 0.6.", "Compare 0.6 with 0.6 — they match."],
    whyCorrect: "3/5 and 0.6 are two ways of writing the same number, so they are equal.",
    distractors: {
      "0": "Greater than would require 3/5 to exceed 0.6, but it equals it exactly.",
      "1": "Less than would require 3/5 to fall short of 0.6.",
      "3": "One of the three symbols always applies to a pair of real numbers.",
    },
    commonMistake:
      "Assuming different-looking forms must be unequal. Always convert before ruling out equality.",
  },
  "Order these numbers from greatest to least: 0.9, 7/8, 0.95, 4/5.": {
    takeaway: "Convert to decimals, then read down from the largest.",
    steps: [
      "7/8 = 0.875 and 4/5 = 0.8.",
      "The values are 0.9, 0.875, 0.95, 0.8.",
      "Greatest to least: 0.95, 0.9, 0.875, 0.8.",
    ],
    whyCorrect: "This lists all four in correct descending order.",
    distractors: {
      "0": "0.95 is greater than 0.9, so 0.9 cannot come first.",
      "2": "7/8 = 0.875 is less than 0.9, so it cannot come before it.",
      "3": "This runs least to greatest.",
    },
    commonMistake:
      "Assuming a fraction with big numbers outranks a decimal. 7/8 = 0.875 loses to 0.9 despite looking heavier.",
  },
  "Which fraction is greater than 2/3?": {
    takeaway: "Convert everything to decimals and compare against 2/3 ≈ 0.667.",
    steps: [
      "2/3 ≈ 0.667 is the benchmark.",
      "5/7 ≈ 0.714, 3/5 = 0.6, 7/12 ≈ 0.583, 1/2 = 0.5.",
      "Only 0.714 clears 0.667.",
    ],
    whyCorrect: "5/7 ≈ 0.714 is the sole value above 2/3.",
    distractors: {
      "1": "3/5 = 0.6 falls below 0.667.",
      "2": "7/12 ≈ 0.583 is lower still.",
      "3": "1/2 = 0.5 is the smallest of the group.",
    },
    commonMistake:
      "Comparing numerators and denominators separately. 5/7 beats 2/3 not because 5 > 2 but because 0.714 > 0.667.",
  },
  "Order these numbers from least to greatest.": {
    takeaway: "Percents, fractions, and decimals must all become decimals before they can be ranked.",
    steps: [
      "1/3 ≈ 0.333.",
      "0.35 stays 0.35.",
      "3/8 = 0.375.",
      "40% = 0.40.",
      "0.5 stays 0.5.",
      "Ascending: 0.333, 0.35, 0.375, 0.40, 0.5.",
    ],
    whyCorrect:
      "Converting all five to a common form makes the ordering a simple decimal comparison.",
    commonMistake:
      "Treating 40% as 40 and dropping it at the end. A percent must be divided by 100 first — 40% is 0.40, which lands between 3/8 and 0.5.",
  },

  // ── MATH / numbers-algebra / Solve Real World Problems Involving
  //    Proportions, Ratios, and Rates of Change ────────────────────────────
  // Nearly every item yields to the same two-step move: find the unit rate
  // (divide), then scale it (multiply). The distractors are almost always the
  // right numbers with the operations swapped.
  "If 3 apples cost $1.80, how much do 7 apples cost at the same rate?": {
    takeaway: "Find the unit rate first, then multiply by the new quantity.",
    steps: [
      "Unit price: $1.80 ÷ 3 = $0.60 per apple.",
      "Seven apples: 7 × $0.60 = $4.20.",
    ],
    whyCorrect: "At $0.60 each, seven apples come to $4.20.",
    distractors: {
      "1": "$4.00 is a round-number guess; the exact rate gives $4.20.",
      "2": "$5.40 multiplies $1.80 by 3 instead of scaling from the unit price.",
      "3": "$3.60 doubles the original $1.80, which would be 6 apples, not 7.",
    },
    commonMistake:
      "Skipping the unit rate and scaling the total directly. Divide to get one, then multiply to get many.",
  },
  "A recipe uses flour and sugar in a ratio of 5:2. If 15 cups of flour are used, how many cups of sugar are needed?": {
    takeaway: "Find the scale factor from the known part, then apply it to the other part.",
    steps: [
      "Flour went from 5 to 15, a factor of 15 ÷ 5 = 3.",
      "Apply that factor to sugar: 2 × 3 = 6 cups.",
    ],
    whyCorrect: "Tripling the whole recipe turns 5:2 into 15:6.",
    distractors: {
      "0": "7.5 halves the flour amount, applying the ratio backwards.",
      "1": "10 is a guess that does not preserve the 5:2 relationship.",
      "3": "3 is the scale factor itself, not the amount of sugar.",
    },
    commonMistake:
      "Answering with the scale factor instead of the scaled quantity. The factor (3) is a step, not the answer.",
  },
  "On a map, 1 inch represents 25 miles. Two cities are 4.5 inches apart on the map. How many actual miles apart are they?": {
    takeaway: "Map distance × scale = real distance.",
    steps: [
      "Each inch stands for 25 miles.",
      "Multiply: 4.5 × 25 = 112.5 miles.",
    ],
    whyCorrect: "4.5 inches at 25 miles per inch is 112.5 miles.",
    commonMistake:
      "Dividing instead of multiplying. Going from map to real world scales UP, so the answer must be larger than the map figure.",
  },
  "A car travels 180 miles in 3 hours at a constant speed. What is its average speed?": {
    takeaway: "Speed = distance ÷ time.",
    steps: ["Divide: 180 ÷ 3 = 60 miles per hour."],
    whyCorrect: "Covering 180 miles in 3 hours averages 60 mph.",
    distractors: {
      "0": "540 mph multiplies instead of dividing.",
      "1": "63 mph does not follow from these numbers.",
      "3": "54 mph is a subtraction-style error, not distance ÷ time.",
    },
    commonMistake:
      "Multiplying because both numbers are given. Let the units guide you: miles ÷ hours produces miles per hour.",
  },
  "A recipe uses flour and sugar in a ratio of 3 cups flour to 2 cups sugar. If 12 cups of flour are used, how many cups of sugar are needed?": {
    takeaway: "Scale both parts of a ratio by the same factor.",
    steps: [
      "Flour went from 3 to 12, a factor of 4.",
      "Sugar scales the same way: 2 × 4 = 8 cups.",
    ],
    whyCorrect: "Quadrupling the recipe turns 3:2 into 12:8.",
    commonMistake:
      "Adding the difference instead of multiplying. Flour rose by 9, but ratios scale by multiplication, not addition.",
  },
  "If 5 pens cost $6.25, how much do 8 pens cost at the same unit price?": {
    takeaway: "Divide to find the price of one, multiply to find the price of many.",
    steps: [
      "Unit price: $6.25 ÷ 5 = $1.25 per pen.",
      "Eight pens: 8 × $1.25 = $10.00.",
    ],
    whyCorrect: "At $1.25 each, eight pens come to exactly $10.00.",
    distractors: {
      "0": "$10.50 overshoots; the exact unit price gives $10.00.",
      "2": "$8.00 treats the pens as $1 each, ignoring the actual rate.",
      "3": "$12.50 doubles the original price, which would be 10 pens.",
    },
    commonMistake:
      "Estimating from the original total instead of computing the unit price. The unit rate makes the arithmetic exact.",
  },
  "A 4-pound bag of apples costs $6.00. What is the cost per pound?": {
    takeaway: "'Per pound' means divide the cost BY the pounds.",
    steps: ["Divide: $6.00 ÷ 4 = $1.50 per pound."],
    whyCorrect: "Four pounds at $1.50 each returns the $6.00 total.",
    distractors: {
      "1": "$0.67 divides 4 by 6, inverting the ratio.",
      "2": "$2.40 does not follow from dividing 6 by 4.",
      "3": "$24.00 multiplies instead of dividing.",
    },
    commonMistake:
      "Dividing in the wrong order. The word after 'per' — pound — is what you divide BY.",
  },
  "At a clinic, 3 nurses care for 12 patients. At the same ratio, how many nurses are needed for 28 patients?": {
    takeaway: "Set up a proportion with matching units in matching positions.",
    steps: [
      "Each nurse covers 12 ÷ 3 = 4 patients.",
      "For 28 patients: 28 ÷ 4 = 7 nurses.",
    ],
    whyCorrect: "Seven nurses at 4 patients each covers exactly 28 patients.",
    distractors: {
      "0": "9 does not preserve the 1-to-4 staffing ratio.",
      "1": "112 multiplies 28 by 4 instead of dividing.",
      "2": "4 is the patients-per-nurse figure, not the number of nurses.",
    },
    commonMistake:
      "Answering with the intermediate rate. 4 is patients per nurse; the question asks how many nurses.",
  },
  "A recipe that serves 6 people uses 2 1/4 cups of flour. How much flour is needed to serve 10 people?": {
    takeaway: "Per-serving amount first, then multiply by the new number of servings.",
    steps: [
      "Convert: 2 1/4 = 2.25 cups.",
      "Per serving: 2.25 ÷ 6 = 0.375 cup.",
      "For 10: 0.375 × 10 = 3.75 = 3 3/4 cups.",
    ],
    whyCorrect: "3 3/4 cups feeds 10 at the same 0.375 cup per person.",
    distractors: {
      "1": "1 1/2 cups is less than the original recipe, but 10 servings needs more than 6.",
      "2": "13 1/2 cups multiplies by 6 instead of dividing by it.",
      "3": "4 1/4 cups adds 2 to the original rather than scaling it.",
    },
    commonMistake:
      "Adding the difference in servings to the flour. Scaling a recipe is multiplication — and a sanity check helps: 10 servings should need somewhat more than 6, not double.",
  },
  "On a map, 1 inch represents 25 miles. Two cities are 4.5 inches apart on the map. What is the actual distance between them?": {
    takeaway: "Map distance × scale = real distance.",
    steps: ["Multiply: 4.5 × 25 = 112.5 miles."],
    whyCorrect: "Each of the 4.5 inches stands for 25 miles, totaling 112.5.",
    distractors: {
      "1": "5.56 miles divides 25 by 4.5, inverting the operation.",
      "2": "29.5 miles adds 25 and 4.5 instead of multiplying.",
      "3": "100 miles rounds 4.5 down to 4, losing half an inch of distance.",
    },
    commonMistake:
      "Adding the scale to the map distance. The scale is a multiplier, and the real distance must be far larger than the inches on paper.",
  },
  "A car travels 195 miles in 3 hours. What is its average speed?": {
    takeaway: "Speed = distance ÷ time.",
    steps: ["Divide: 195 ÷ 3 = 65 miles per hour."],
    whyCorrect: "195 miles across 3 hours averages 65 mph.",
    distractors: {
      "1": "0.015 mph divides 3 by 195, inverting the ratio.",
      "2": "585 mph multiplies instead of dividing.",
      "3": "58.5 mph misplaces a decimal; 195 ÷ 3 is exactly 65.",
    },
    commonMistake:
      "Not sanity-checking the result. 585 mph is faster than a jet — a quick plausibility check catches the inverted operation.",
  },
  "In a class the ratio of boys to girls is 5:3. If there are 40 students total, how many are girls?": {
    takeaway: "With a total, add the ratio parts first — the sum is the number of shares.",
    steps: [
      "Total parts: 5 + 3 = 8.",
      "One part: 40 ÷ 8 = 5 students.",
      "Girls hold 3 parts: 3 × 5 = 15.",
    ],
    whyCorrect: "15 girls and 25 boys totals 40 and preserves the 5:3 ratio.",
    distractors: {
      "0": "8 is the number of ratio parts, not a count of students.",
      "2": "25 is the number of boys — the 5 part rather than the 3 part.",
      "3": "24 would come from using 3/5 of 40, treating the ratio as a fraction of the whole.",
    },
    commonMistake:
      "Reading 3:5 as 'girls are 3/5 of the class'. In a part-to-part ratio the denominator is the SUM of the parts, so girls are 3/8.",
  },
  "If 8 identical widgets cost $20, how much do 14 widgets cost at the same rate?": {
    takeaway: "Unit price first, then multiply.",
    steps: [
      "Unit price: $20 ÷ 8 = $2.50 each.",
      "Fourteen widgets: 14 × $2.50 = $35.00.",
    ],
    whyCorrect: "At $2.50 each, 14 widgets cost $35.00.",
    distractors: {
      "0": "$22.40 does not follow from a $2.50 unit price.",
      "1": "$26.00 adds $1 per extra widget instead of the true $2.50.",
      "2": "$5.60 is far below the original $20 for fewer widgets — impossible when the count went up.",
    },
    commonMistake:
      "Adding a flat amount for the extra units. Every additional widget costs the full unit price, not a discount.",
  },
  "A seedling grows from 12 cm to 27 cm over 5 weeks. What is its average rate of growth per week?": {
    takeaway: "Rate of change = (ending − starting) ÷ time. The change, not the final value.",
    steps: [
      "Growth: 27 − 12 = 15 cm.",
      "Per week: 15 ÷ 5 = 3 cm per week.",
    ],
    whyCorrect: "Growing 15 cm over 5 weeks averages 3 cm each week.",
    distractors: {
      "0": "7.8 does not follow from these numbers.",
      "1": "5.4 divides the final height 27 by 5, ignoring that the plant started at 12.",
      "2": "2.4 divides the starting height 12 by 5.",
    },
    commonMistake:
      "Dividing the ending value by the time. Rate of change needs the DIFFERENCE first — the plant did not grow 27 cm, it grew 15.",
  },
  "A model car is built at a scale of 1:18. The real car is 4.5 meters long. How long is the model?": {
    takeaway: "Going from real to model means dividing by the scale.",
    steps: [
      "A 1:18 scale means the model is 1/18 of real size.",
      "Divide: 4.5 ÷ 18 = 0.25 m.",
    ],
    whyCorrect: "0.25 m (25 cm) is a believable model size, and 0.25 × 18 = 4.5 confirms it.",
    distractors: {
      "0": "81 m multiplies instead of dividing — that would be a car longer than a building.",
      "1": "0.225 m divides by 20 instead of 18.",
      "2": "0.40 m does not follow from dividing 4.5 by 18.",
    },
    commonMistake:
      "Multiplying by the scale factor. Check the direction: a model is smaller than the real thing, so the answer must shrink.",
  },
  "A car travels 150 miles on 5 gallons of gas. At the same rate, how many miles can it travel on 8 gallons of gas? Enter a number.": {
    takeaway: "Find miles per gallon, then multiply by the gallons available.",
    steps: [
      "Rate: 150 ÷ 5 = 30 miles per gallon.",
      "With 8 gallons: 30 × 8 = 240 miles.",
    ],
    whyCorrect: "At 30 mpg, 8 gallons carries the car 240 miles.",
    commonMistake:
      "Scaling the total by the wrong factor. Reduce to one gallon first; the per-unit rate makes the second step trivial.",
  },

  // ── SCIENCE / biology / Describe Cell Structure, Function, and
  //    Organization ────────────────────────────────────────────────────────
  // Two axes organize this skill: organelle-to-job matching, and the
  // mitosis/meiosis contrast (2 identical diploid vs 4 varied haploid), which
  // supplies most of the distractors.
  "Which organelle is the primary site of ATP production in eukaryotic cells?": {
    takeaway: "Mitochondria make ATP — the cell's powerhouse.",
    whyCorrect:
      "Mitochondria run cellular respiration, converting glucose and oxygen into the ATP the cell spends on everything else.",
    distractors: {
      "0": "Lysosomes digest waste and worn-out organelles with enzymes.",
      "1": "The Golgi apparatus modifies, packages, and ships proteins.",
      "2": "Ribosomes assemble proteins from amino acids.",
    },
    commonMistake:
      "Confusing energy production with energy use. Mitochondria MAKE the ATP; every other organelle spends it.",
  },
  "A student observes a cell that has a rigid cell wall, a large central vacuole, and chloroplasts. This cell is most likely from which type of organism?": {
    takeaway: "Cell wall + central vacuole + chloroplasts = plant cell.",
    whyCorrect:
      "All three features are plant signatures: the wall gives rigidity, the vacuole stores water and maintains pressure, and chloroplasts run photosynthesis.",
    distractors: {
      "0": "Bacteria have a cell wall but no chloroplasts and no membrane-bound organelles at all.",
      "1": "Viruses are not cells; they have no organelles or cytoplasm.",
      "3": "Animal cells lack all three of these structures.",
    },
    commonMistake:
      "Deciding on the cell wall alone. Bacteria and fungi have walls too — the chloroplast is what makes it definitively a plant.",
  },
  "Which structure controls the passage of materials into and out of the cell while separating the cytoplasm from the external environment?": {
    takeaway: "The plasma membrane is the selectively permeable boundary of the cell.",
    whyCorrect:
      "Its phospholipid bilayer with embedded proteins decides what crosses, making it both the border and the gatekeeper.",
    distractors: {
      "1": "The cytoskeleton is the internal scaffold that gives shape and enables movement.",
      "2": "The ER is an internal transport and synthesis network, not the outer boundary.",
      "3": "The nucleolus sits inside the nucleus and builds ribosome components.",
    },
    commonMistake:
      "Choosing the cell wall. Not every cell has a wall, and where one exists it is rigid support — the membrane does the selecting.",
  },
  "Rough endoplasmic reticulum is distinguished from smooth endoplasmic reticulum primarily by the presence of which feature, which gives it its function?": {
    takeaway: "Rough ER is rough because ribosomes stud it — so it handles proteins.",
    whyCorrect:
      "The attached ribosomes both create the bumpy texture that names it and give it its job: synthesizing and processing proteins.",
    distractors: {
      "1": "Digestive enzymes belong to lysosomes.",
      "2": "Chlorophyll is in chloroplasts, and only in plants.",
      "3": "Cilia project from the cell surface; organelles do not swim through cytoplasm.",
    },
    commonMistake:
      "Memorizing rough and smooth as arbitrary labels. The texture IS the ribosomes, and the ribosomes are why rough ER makes protein while smooth ER makes lipids.",
  },
  "A researcher examines a cell and finds it has no membrane-bound nucleus, a single circular chromosome, and a peptidoglycan cell wall. Into which category does this cell best fit?": {
    takeaway: "No nucleus = prokaryote. Peptidoglycan wall = bacterium.",
    steps: [
      "No membrane-bound nucleus rules out every eukaryote immediately.",
      "A single circular chromosome is the prokaryotic pattern.",
      "Peptidoglycan is unique to bacterial cell walls.",
    ],
    whyCorrect: "All three clues point to a prokaryotic bacterial cell.",
    distractors: {
      "0": "Fungal cells are eukaryotic with a nucleus, and their walls are chitin, not peptidoglycan.",
      "1": "Plant cells are eukaryotic with cellulose walls.",
      "3": "Animal cells are eukaryotic and have no cell wall at all.",
    },
    commonMistake:
      "Overlooking the nucleus clue. 'No membrane-bound nucleus' eliminates three of four options before the other details matter.",
  },
  "A liver cell devotes many resources to detoxifying drugs and synthesizing lipids. Which organelle would be especially abundant to support these specific functions?": {
    takeaway: "Smooth ER = lipids and detoxification. Rough ER = proteins.",
    whyCorrect:
      "Smooth ER handles both jobs named in the question, which is why liver cells are unusually rich in it.",
    distractors: {
      "1": "Rough ER makes proteins, not lipids.",
      "2": "Lysosomes digest cellular debris rather than detoxifying drugs.",
      "3": "The nucleolus assembles ribosome subunits.",
    },
    commonMistake:
      "Picking rough ER because it sounds more active. Match the function named — lipids and detox are always smooth ER.",
  },
  "In the levels of biological organization, which sequence is arranged correctly from smallest to largest?": {
    takeaway: "Cell → tissue → organ → organ system.",
    whyCorrect:
      "Similar cells group into tissues, tissues combine into organs, and organs cooperate as organ systems — each level built from the one before.",
    distractors: {
      "0": "This places organ before tissue, but organs are made OF tissues.",
      "1": "This runs largest to smallest and scrambles the middle.",
      "3": "Cells are smaller than tissues, and organ systems are larger than organs.",
    },
    commonMistake:
      "Swapping tissue and organ. Ask what each is made of: an organ contains several tissues, so tissue must come first.",
  },
  "What is the primary purpose of mitosis in multicellular organisms?": {
    takeaway: "Mitosis = growth and repair. Meiosis = gametes.",
    whyCorrect:
      "Mitosis yields two genetically identical cells, exactly what growing and replacing damaged tissue requires.",
    distractors: {
      "0": "Producing gametes is meiosis.",
      "2": "Genetic variation comes from meiosis and crossing over; mitosis makes copies.",
      "3": "Halving the chromosome number is meiosis.",
    },
    commonMistake:
      "Mixing the two divisions. Every wrong option here is a meiosis function, so knowing that one contrast answers the whole question.",
  },
  "Place the four phases of mitosis in the correct order from first to last.": {
    takeaway: "PMAT: Prophase, Metaphase, Anaphase, Telophase.",
    steps: [
      "Prophase: chromosomes condense and become visible.",
      "Metaphase: chromosomes line up at the Middle.",
      "Anaphase: sister chromatids are pulled Apart.",
      "Telophase: Two new nuclei form.",
    ],
    whyCorrect:
      "Each phase depends on the last: chromosomes must condense before aligning, and align before separating.",
    commonMistake:
      "Swapping metaphase and anaphase. Use the initials — Metaphase/Middle and Anaphase/Apart — and the order holds.",
  },
  "During which phase of mitosis do the chromosomes line up along the middle of the cell?": {
    takeaway: "Metaphase = Middle.",
    whyCorrect:
      "In metaphase the chromosomes align single-file along the cell's equator, ready to be pulled apart.",
    distractors: {
      "0": "In prophase chromosomes condense but have not yet aligned.",
      "1": "In anaphase the chromatids have already separated toward the poles.",
      "2": "In telophase two new nuclei are forming around the separated chromosomes.",
    },
    commonMistake:
      "Confusing metaphase with anaphase. Metaphase is the lineup; anaphase is the pull apart.",
  },
  "A diploid parent cell with 46 chromosomes divides by mitosis. How do the resulting daughter cells compare to the parent cell?": {
    takeaway: "Mitosis: 2 cells, full chromosome count, genetically identical.",
    steps: [
      "Mitosis divides once, producing two cells.",
      "Chromosomes are copied first, so each daughter keeps all 46.",
      "No crossing over occurs, so both are identical to the parent.",
    ],
    whyCorrect: "Two identical diploid cells is the definition of a mitotic division.",
    distractors: {
      "0": "23 chromosomes with variation describes meiosis products.",
      "1": "Four cells with variation is meiosis, though meiosis also halves the count.",
      "3": "Four haploid cells is meiosis, and meiotic products are not identical.",
    },
    commonMistake:
      "Assuming any division halves the chromosome count. Only meiosis halves; mitosis copies first so both cells stay diploid.",
  },
  "What is the main purpose of meiosis?": {
    takeaway: "Meiosis makes four genetically varied haploid gametes.",
    whyCorrect:
      "Halving the chromosome number lets fertilization restore the full count, and crossing over ensures the gametes differ.",
    distractors: {
      "0": "Repairing tissue is mitosis.",
      "1": "Two identical diploid cells is mitosis.",
      "3": "Replacing old cells is mitosis.",
    },
    commonMistake:
      "Forgetting why halving matters. If gametes kept 46 chromosomes, every generation would double the count.",
  },
  "A human cell with 46 chromosomes undergoes meiosis. How many chromosomes will each resulting gamete contain?": {
    takeaway: "Meiosis halves the chromosome number: 46 → 23.",
    steps: [
      "Meiosis reduces diploid to haploid.",
      "Half of 46 is 23 chromosomes per gamete.",
      "Fertilization joins two gametes: 23 + 23 = 46 restored.",
    ],
    whyCorrect: "Each human gamete carries 23 chromosomes, one from each pair.",
    distractors: {
      "0": "92 doubles the count instead of halving it.",
      "1": "12 does not follow from halving 46.",
      "3": "46 is the diploid parent count, unchanged — that would be mitosis.",
    },
    commonMistake:
      "Answering 46 out of habit. The whole point of meiosis is that the gamete carries half.",
  },
  "During meiosis, homologous chromosomes pair up and exchange segments of genetic material. What is the name and effect of this process?": {
    takeaway: "Crossing over swaps segments between homologous chromosomes, creating variation.",
    whyCorrect:
      "The exchange produces chromosomes with new allele combinations, so siblings differ from each other and from both parents.",
    distractors: {
      "0": "Replication copies a chromosome exactly; nothing is exchanged.",
      "1": "Condensation compacts chromosomes for division but changes no genetic content.",
      "3": "Cytokinesis divides the cytoplasm at the end of division.",
    },
    commonMistake:
      "Confusing crossing over with replication. Replication makes identical copies; crossing over shuffles material between different chromosomes.",
  },
  "Which statement correctly contrasts mitosis and meiosis?": {
    takeaway: "Mitosis: 2, diploid, identical. Meiosis: 4, haploid, varied.",
    whyCorrect:
      "All three contrasts line up correctly — cell count, chromosome number, and genetic variation.",
    distractors: {
      "1": "Reversed: meiosis makes gametes, mitosis makes body cells.",
      "2": "Reversed: mitosis makes two cells, meiosis makes four.",
      "3": "Reversed: meiosis halves the chromosome number, mitosis preserves it.",
    },
    commonMistake:
      "Reading too fast on a contrast question. Each wrong option is exactly backwards, so check the direction of every claim.",
  },
  "Which of the following structures are typically found in plant cells but NOT in animal cells? Select all that apply.": {
    takeaway: "Plant-only: cell wall, chloroplasts, large central vacuole.",
    steps: [
      "Ask of each structure whether an animal cell has one too.",
      "Cell wall, chloroplast, and large central vacuole: plants only.",
      "Ribosomes and mitochondria: both, since all cells build proteins and need energy.",
    ],
    whyCorrect:
      "These three support jobs animals do not need — rigid structure, photosynthesis, and water storage.",
    distractors: {
      "0": "Ribosomes are in every cell, including bacteria.",
      "4": "Mitochondria are in both plant and animal cells; plants need ATP too, and photosynthesis does not replace respiration.",
    },
    commonMistake:
      "Assuming plants use chloroplasts instead of mitochondria. Plants have both — chloroplasts capture energy, mitochondria release it.",
  },

  // ── MATH / numbers-algebra / Convert Among Decimals, Fractions & Percents ─
  // The decimal is the hub: fraction → decimal by dividing, decimal → percent
  // by ×100, percent → decimal by ÷100. Nearly every distractor is a decimal
  // point moved the wrong number of places or the wrong direction.
  // Note: "What is 5/8 written as a percent?" is deliberately absent — that
  // stem appears twice with different options, so both copies carry inline
  // rationales instead.
  "Write 0.6 as a fraction in simplest form.": {
    takeaway: "Read the decimal by its place value, write it over that place, then reduce.",
    steps: [
      "0.6 is six tenths: 6/10.",
      "Divide top and bottom by 2: 3/5.",
    ],
    whyCorrect: "3/5 = 0.6, and 3 and 5 share no common factor, so it is fully reduced.",
    distractors: {
      "0": "1/6 ≈ 0.167, not 0.6 — this uses the digit 6 as a denominator.",
      "2": "2/3 ≈ 0.667, close to 0.6 but not equal.",
      "3": "6/10 has the right value but is not in simplest form, which the question requires.",
    },
    commonMistake:
      "Stopping at 6/10. It is correct in value, but 'simplest form' means reducing until no common factor remains.",
  },
  "Express 45% as a fraction in simplest form.": {
    takeaway: "Percent means 'per hundred', so put it over 100 and reduce.",
    steps: [
      "45% = 45/100.",
      "Both divide by 5: 9/20.",
    ],
    whyCorrect: "9/20 = 0.45 = 45%, and 9 and 20 share no common factor.",
    commonMistake:
      "Reducing by 2 first and getting stuck on a decimal. 45 is odd, so look for 5 as the common factor instead.",
  },
  "Write 0.625 as a fraction in simplest form.": {
    takeaway: "Three decimal places means thousandths — write it over 1000, then reduce.",
    steps: [
      "0.625 = 625/1000.",
      "Divide both by 125: 5/8.",
    ],
    whyCorrect: "5 ÷ 8 = 0.625 exactly, confirming the conversion.",
    distractors: {
      "1": "1/16 = 0.0625, ten times too small.",
      "2": "5/16 = 0.3125, half the target value.",
      "3": "3/5 = 0.6, close but not 0.625.",
    },
    commonMistake:
      "Reducing in small steps and losing track. Recognizing 0.625 as the common fraction 5/8 is worth memorizing, along with 0.125 = 1/8 and 0.375 = 3/8.",
  },
  "Convert 7/20 to a percent.": {
    takeaway: "Fraction → decimal (divide), decimal → percent (×100).",
    steps: [
      "7 ÷ 20 = 0.35.",
      "0.35 × 100 = 35%.",
    ],
    whyCorrect: "7/20 is equivalent to 35/100, which is 35% by definition.",
    distractors: {
      "0": "7.2% misreads the fraction rather than dividing it.",
      "1": "27% does not follow from 7 ÷ 20.",
      "3": "0.35% skips the ×100 step, leaving the decimal with a percent sign attached.",
    },
    commonMistake:
      "Writing the decimal and adding a percent sign. 0.35 and 0.35% differ by a factor of 100 — the multiplication is not optional.",
  },
  "Express 0.4% as a decimal.": {
    takeaway: "Percent → decimal means divide by 100, moving the point two places LEFT.",
    steps: [
      "Start at 0.4.",
      "Move the decimal two places left, filling with zeros: 0.004.",
    ],
    whyCorrect: "0.4% is four tenths of one percent, a very small quantity — 0.004.",
    commonMistake:
      "Moving only one place and answering 0.04. Two places, always, and here the leading zero must be added to make room.",
  },
  "Which fraction, in lowest terms, is equal to 0.6?": {
    takeaway: "Write the decimal over its place value, then reduce completely.",
    steps: ["0.6 = 6/10.", "Divide both by 2: 3/5."],
    whyCorrect: "3/5 equals 0.6 and cannot be reduced further.",
    distractors: {
      "0": "1/6 ≈ 0.167.",
      "2": "2/3 ≈ 0.667.",
      "3": "6/10 equals 0.6 but is not in lowest terms — the trap this question is built around.",
    },
    commonMistake:
      "Choosing the unreduced form. When a question says 'lowest terms', a correct-but-unreduced option is always present as bait.",
  },
  "Which of the following values is the largest?": {
    takeaway: "Convert every form to a decimal, then compare.",
    steps: [
      "11/16 = 0.6875.",
      "65% = 0.65.",
      "2/3 ≈ 0.667.",
      "0.7 is already a decimal — and is the largest.",
    ],
    whyCorrect: "0.700 exceeds 0.6875, 0.667, and 0.65.",
    distractors: {
      "0": "11/16 = 0.6875, the runner-up.",
      "1": "65% = 0.65, the smallest of the four.",
      "3": "2/3 ≈ 0.667, below 0.6875 and 0.7.",
    },
    commonMistake:
      "Comparing mixed forms by eye. These four are deliberately close together — only decimals make the ranking obvious.",
  },
  "What is 3/4 written as a percent?": {
    takeaway: "Divide, then multiply by 100.",
    steps: ["3 ÷ 4 = 0.75.", "0.75 × 100 = 75%."],
    whyCorrect: "3/4 is three quarters, and a quarter is 25%, so three of them is 75%.",
    distractors: {
      "0": "34% just reads the digits 3 and 4 as a number.",
      "1": "7.5% moves the decimal only one place.",
      "2": "43% inverts the digits.",
    },
    commonMistake:
      "Reading the numerator and denominator as digits of an answer. Always perform the division.",
  },
  "What is 45% written as a fraction in lowest terms?": {
    takeaway: "Percent over 100, then reduce.",
    steps: ["45% = 45/100.", "Divide both by 5: 9/20."],
    whyCorrect: "9/20 = 0.45, matching 45%.",
    distractors: {
      "1": "1/45 = 0.022, unrelated to 45%.",
      "2": "45/10 = 4.5, which is 450%.",
      "3": "4/5 = 0.8, which is 80%.",
    },
    commonMistake:
      "Putting the percent over 10 instead of 100. 'Per cent' literally means per hundred.",
  },
  "What is 7/20 written as a decimal?": {
    takeaway: "A fraction is a division: numerator ÷ denominator.",
    steps: [
      "7 ÷ 20 = 0.35.",
      "Or scale to a power of ten: 7/20 × 5/5 = 35/100 = 0.35.",
    ],
    whyCorrect: "7/20 is just over a third, and 0.35 fits that estimate.",
    distractors: {
      "1": "3.5 is ten times too large.",
      "2": "0.035 is ten times too small.",
      "3": "0.72 inverts the digits of the fraction.",
    },
    commonMistake:
      "Losing the decimal place. A quick sanity check helps: 7/20 is close to 1/3, so the answer must be near 0.33.",
  },
  "What is 0.08 written as a percent?": {
    takeaway: "Decimal → percent: multiply by 100, moving the point two places RIGHT.",
    steps: ["0.08 × 100 = 8.", "So 0.08 = 8%."],
    whyCorrect: "0.08 is eight hundredths, and eight per hundred is 8%.",
    distractors: {
      "0": "80% would come from 0.80, not 0.08.",
      "2": "0.08% attaches a percent sign without multiplying.",
      "3": "0.8% moves the decimal only one place.",
    },
    commonMistake:
      "Moving the decimal one place instead of two. Percent conversions are always two places — the only question is which direction.",
  },
  "Which percent is equivalent to the fraction 1/8?": {
    takeaway: "1/8 = 0.125 = 12.5%.",
    steps: ["1 ÷ 8 = 0.125.", "0.125 × 100 = 12.5%."],
    whyCorrect: "An eighth is half of a quarter, and half of 25% is 12.5%.",
    distractors: {
      "0": "1.25% moves the decimal one place too few.",
      "1": "18% reads the digits 1 and 8 rather than dividing.",
      "2": "8% uses the denominator as the answer.",
    },
    commonMistake:
      "Reading the fraction's digits into the percent. Memorizing the eighths (1/8 = 12.5%, 3/8 = 37.5%, 5/8 = 62.5%) removes the guesswork.",
  },
  "What is 0.375 written as a fraction in lowest terms?": {
    takeaway: "Three decimal places = thousandths; write over 1000 and reduce.",
    steps: ["0.375 = 375/1000.", "Divide both by 125: 3/8."],
    whyCorrect: "3 ÷ 8 = 0.375 exactly.",
    distractors: {
      "0": "375/100 = 3.75, ten times too large and unreduced.",
      "1": "1/3 ≈ 0.333, not 0.375.",
      "3": "3/4 = 0.75, twice the target.",
    },
    commonMistake:
      "Using 100 as the denominator regardless of place value. Count the decimal places: two means hundredths, three means thousandths.",
  },

  // ── MATH / numbers-algebra / Apply Estimation Strategies and Rounding
  //    Rules to Real World Problems ─────────────────────────────────────────
  // Rounding: look ONLY at the digit immediately to the right of the target
  // place. Estimation: round every value first, then compute — the exact
  // answer is a distractor, not the goal.
  "Round 4,827 to the nearest hundred.": {
    takeaway: "Look at the digit one place to the right of the target, and nothing further.",
    steps: [
      "Target the hundreds digit: 8 in 4,827.",
      "Look one place right, at the tens digit: 2.",
      "2 is less than 5, so the hundreds digit stays and the rest become zeros: 4,800.",
    ],
    whyCorrect: "4,827 is closer to 4,800 than to 4,900.",
    distractors: {
      "0": "4,830 rounds to the nearest ten, not hundred.",
      "1": "4,900 rounds up, but the tens digit 2 says round down.",
      "3": "5,000 rounds to the nearest thousand.",
    },
    commonMistake:
      "Looking at the last digit (7) and rounding up. Only the digit immediately right of the target place decides.",
  },
  "Estimate the product 38 × 21 by first rounding each factor to the nearest ten.": {
    takeaway: "Round first, then multiply — the estimate is the goal, not the exact answer.",
    steps: [
      "38 rounds to 40.",
      "21 rounds to 20.",
      "40 × 20 = 800.",
    ],
    whyCorrect: "Rounding both factors to the nearest ten gives 800.",
    distractors: {
      "0": "600 rounds 38 down to 30 instead of up to 40.",
      "2": "798 is the exact product — correct arithmetic, but the question asked for the estimate.",
      "3": "760 rounds only one factor.",
    },
    commonMistake:
      "Computing the exact product. When a question says 'estimate by rounding', the exact answer is deliberately offered as a trap.",
  },
  "A car travels 296 miles on 11.8 gallons of gas. Estimate the miles per gallon by rounding to convenient numbers.": {
    takeaway: "Round to numbers that divide cleanly, then divide.",
    steps: [
      "296 rounds to 300.",
      "11.8 rounds to 12.",
      "300 ÷ 12 = 25 miles per gallon.",
    ],
    whyCorrect: "300 and 12 were chosen because they divide evenly, giving a clean 25.",
    distractors: {
      "0": "30 would require dividing 300 by 10, rounding 11.8 too aggressively.",
      "2": "27 is closer to the exact value but is not what the rounded numbers produce.",
      "3": "20 would come from dividing 300 by 15.",
    },
    commonMistake:
      "Rounding to the 'nearest' number rather than a convenient one. Estimation rewards numbers that divide cleanly — 12 beats 10 here because 300 ÷ 12 is exact.",
  },
  "Estimate the product 48 × 21 by first rounding each factor to the nearest ten.": {
    takeaway: "Round each factor to the nearest ten, then multiply.",
    steps: ["48 rounds to 50.", "21 rounds to 20.", "50 × 20 = 1,000."],
    whyCorrect: "Both factors rounded to the nearest ten give 1,000.",
    distractors: {
      "1": "1,050 rounds 21 up to 21 rather than down to 20.",
      "2": "980 is the exact product, not the estimate.",
      "3": "900 rounds 48 down to 40; 48 is closer to 50.",
    },
    commonMistake:
      "Rounding 48 down because it starts with 4. The tens digit is what changes — 48 is 2 away from 50 and 8 away from 40.",
  },
  "A shopper buys items costing $12.89, $7.45, and $4.99. Estimate the total by rounding each price to the nearest dollar.": {
    takeaway: "Round each price on its own — cents of 50 or more round up.",
    steps: [
      "$12.89 → $13 (89 cents rounds up).",
      "$7.45 → $7 (45 cents rounds down).",
      "$4.99 → $5.",
      "13 + 7 + 5 = $25.",
    ],
    whyCorrect: "Each price rounded correctly sums to $25.",
    distractors: {
      "0": "$26 rounds $7.45 up to $8; 45 cents rounds down.",
      "2": "$24 rounds $12.89 down to $12, but 89 cents rounds up.",
      "3": "$23 rounds every price down instead of applying the rule to each.",
    },
    commonMistake:
      "Rounding everything the same direction to be safe. Each value follows its own cents — some up, some down.",
  },
  "Round 7.3856 to the nearest hundredth.": {
    takeaway: "Hundredths is the second decimal place; check the third to decide.",
    steps: [
      "Second decimal place (hundredths): 8.",
      "Next digit (thousandths): 5, which is 5 or more.",
      "Round up: 7.39.",
    ],
    whyCorrect: "7.3856 is closer to 7.39 than to 7.38.",
    distractors: {
      "0": "7.38 keeps the hundredths digit, but the 5 that follows requires rounding up.",
      "1": "7.40 rounds to the nearest tenth.",
      "3": "7.386 rounds to the nearest thousandth.",
    },
    commonMistake:
      "Rounding digit by digit from the right (6 rounds the 5 to 6, which then rounds the 8 up). Look at ONE digit past the target place and stop.",
  },
  "A stadium reported 4,728 fans at a game. Rounded to the nearest hundred, about how many fans attended?": {
    takeaway: "Check the tens digit to round to the nearest hundred.",
    steps: [
      "Hundreds digit: 7.",
      "Tens digit: 2, less than 5.",
      "Round down: 4,700.",
    ],
    whyCorrect: "4,728 is nearer to 4,700 than to 4,800.",
    distractors: {
      "0": "4,800 rounds up, but 28 is less than halfway to the next hundred.",
      "1": "4,730 rounds to the nearest ten.",
      "3": "5,000 rounds to the nearest thousand.",
    },
    commonMistake:
      "Rounding to whichever place looks tidiest. The question names the place — match it exactly.",
  },
  "A runner finished a race in 6.847 minutes. Rounded to the nearest tenth, what is this time?": {
    takeaway: "Tenths is the first decimal place; check the hundredths to decide.",
    steps: [
      "Tenths digit: 8.",
      "Hundredths digit: 4, less than 5.",
      "Round down: 6.8.",
    ],
    whyCorrect: "6.847 is closer to 6.8 than to 6.9.",
    distractors: {
      "1": "6.85 rounds to the nearest hundredth.",
      "2": "6.9 rounds up, but the hundredths digit 4 says round down.",
      "3": "7.0 rounds to the nearest whole number.",
    },
    commonMistake:
      "Chaining the rounding (7 rounds 4 to 5, which rounds 8 to 9). Only the digit directly after the target place matters.",
  },
  "A shopper buys items costing $12.89, $7.45, and $19.20. Estimate the total by rounding each price to the nearest dollar.": {
    takeaway: "Round each price by its own cents, then add.",
    steps: [
      "$12.89 → $13.",
      "$7.45 → $7.",
      "$19.20 → $19.",
      "13 + 7 + 19 = $39.",
    ],
    whyCorrect: "Each price rounded independently sums to $39.",
    distractors: {
      "1": "$38 rounds $12.89 down to $12.",
      "2": "$40 rounds $19.20 up to $20; 20 cents rounds down.",
      "3": "$37 rounds too many prices down.",
    },
    commonMistake:
      "Assuming prices ending in cents always round up. Under 50 cents rounds down, whatever the dollar amount.",
  },
  "A city has a population of 35,492. Rounded to the nearest thousand, what is this population?": {
    takeaway: "For thousands, check the hundreds digit.",
    steps: [
      "Thousands digit: 5 in 35,492.",
      "Hundreds digit: 4, less than 5.",
      "Round down: 35,000.",
    ],
    whyCorrect: "35,492 is just under the halfway point of 35,500, so it rounds down.",
    distractors: {
      "0": "36,000 rounds up, but 492 is less than half of a thousand.",
      "2": "35,500 is the halfway mark itself, not a rounded thousand.",
      "3": "34,000 rounds down past the correct thousand.",
    },
    commonMistake:
      "Seeing 492 and rounding it to 500, then rounding up. Judge the hundreds digit as it is written — 4 means down.",
  },
  "A warehouse stacks boxes in 18 rows of 42 boxes. Estimate the total number of boxes by rounding each factor to the nearest ten.": {
    takeaway: "Round both factors to the nearest ten, then multiply.",
    steps: ["18 rounds to 20.", "42 rounds to 40.", "20 × 40 = 800."],
    whyCorrect: "800 is the estimate the rounding produces; the exact product is 756.",
    distractors: {
      "0": "900 does not follow from 20 × 40.",
      "1": "760 is near the exact product but not the rounded estimate.",
      "2": "600 rounds 18 down to 10 rather than up to 20.",
    },
    commonMistake:
      "Rounding 18 down to 10. The tens digit governs: 18 is 2 from 20 and 8 from 10.",
  },
  "A scale reads 0.0568 kg. Rounded to the nearest hundredth, what is this mass?": {
    takeaway: "Hundredths is the second decimal place, even when it is a zero.",
    steps: [
      "Count places: 0 is tenths, 5 is hundredths.",
      "Next digit (thousandths): 6, which is 5 or more.",
      "Round the hundredths digit up: 0.06.",
    ],
    whyCorrect: "0.0568 is closer to 0.06 than to 0.05.",
    distractors: {
      "0": "0.1 rounds to the nearest tenth.",
      "1": "0.05 keeps the hundredths digit, but the 6 after it forces a round up.",
      "3": "0.057 rounds to the nearest thousandth.",
    },
    commonMistake:
      "Miscounting places when the number starts with zeros. Count from the decimal point: first place tenths, second hundredths — the leading zero is a place, not a placeholder to skip.",
  },
  "A theater has 28 rows with 31 seats in each row. Estimate the total number of seats by rounding each number to the nearest ten.": {
    takeaway: "Round both numbers to the nearest ten, then multiply.",
    steps: ["28 rounds to 30.", "31 rounds to 30.", "30 × 30 = 900."],
    whyCorrect: "900 is the estimate; the exact total is 868, close enough to confirm it.",
    distractors: {
      "0": "1,000 would need both factors near 30 and 33, overshooting.",
      "2": "870 is near the exact product, not the rounded estimate.",
      "3": "800 rounds 31 down to 20 or 28 down to 20.",
    },
    commonMistake:
      "Rounding 31 down to 30 but 28 down to 20. Both are nearest 30 — check each independently.",
  },
  "A package weighs 149.5 ounces. Rounded to the nearest whole ounce, what is its weight?": {
    takeaway: "Exactly 5 in the deciding place rounds UP.",
    steps: [
      "Whole number place: 149.",
      "Tenths digit: 5, which meets the 'round up' threshold.",
      "Round up: 150.",
    ],
    whyCorrect: "The standard rule sends a trailing 5 upward, giving 150.",
    distractors: {
      "1": "140 rounds to the nearest ten and rounds down.",
      "2": "149 rounds down, but a 5 in the tenths place rounds up.",
      "3": "149.5 is the original value, not rounded at all.",
    },
    commonMistake:
      "Treating a 5 as 'in the middle, so leave it'. The convention is unambiguous: 5 or greater rounds up.",
  },
  "A gas tank holds 14.8 gallons, and gas costs $3.89 per gallon. Estimate the cost to fill the tank by rounding each value to the nearest whole number.": {
    takeaway: "Round both values to whole numbers, then multiply.",
    steps: [
      "14.8 gallons rounds to 15.",
      "$3.89 rounds to $4.",
      "15 × $4 = $60.",
    ],
    whyCorrect:
      "$60 is the estimate from the rounded values; the exact cost is about $57.57, close enough to confirm the approach.",
    distractors: {
      "0": "$75 would come from 15 × $5, rounding $3.89 up too far.",
      "2": "$52 is neither the estimate nor the exact cost.",
      "3": "$45 would come from 15 × $3, rounding $3.89 down.",
    },
    commonMistake:
      "Rounding $3.89 to $3 by dropping the cents. Dropping is truncating, not rounding — 89 cents rounds the dollar up.",
  },

  // ── SCIENCE / anatomy-physiology / Demonstrate Knowledge of the General
  //    Orientation of Human Anatomy ─────────────────────────────────────────
  // Directional terms come in opposing pairs, the three planes each make one
  // kind of cut, and feedback questions reduce to one test: does the response
  // reverse the change (negative) or amplify it (positive)?
  "In standard anatomical position, which directional term correctly describes the position of the wrist relative to the elbow?": {
    takeaway: "Distal = farther from the trunk along a limb; proximal = closer.",
    whyCorrect:
      "Traveling down the arm from the shoulder, the elbow comes first and the wrist later, so the wrist is distal to the elbow.",
    distractors: {
      "0": "Medial means toward the body's midline, a side-to-side term.",
      "1": "Proximal is the opposite — it would describe the elbow relative to the wrist.",
      "3": "Superior means above, used for the trunk and head rather than positions along a limb.",
    },
    commonMistake:
      "Using superior/inferior for limbs. Proximal and distal are the limb-specific pair, measured from where the limb attaches.",
  },
  "A plane that divides the body into superior and inferior portions is called the:": {
    takeaway: "Transverse = top/bottom, sagittal = left/right, frontal = front/back.",
    whyCorrect:
      "The transverse plane is the horizontal cut, separating everything above from everything below — the view a CT slice gives.",
    distractors: {
      "0": "A sagittal plane divides left from right.",
      "1": "The midsagittal plane is the exact center sagittal cut, still left versus right.",
      "2": "The frontal (coronal) plane divides anterior from posterior.",
    },
    commonMistake:
      "Guessing among the three planes. Match the pair of terms in the question — superior/inferior always means transverse.",
  },
  "The diaphragm separates which two body cavities?": {
    takeaway: "The diaphragm is the floor of the thoracic cavity and roof of the abdominal cavity.",
    whyCorrect:
      "It is the muscular sheet dividing the chest from the abdomen, which is why breathing changes pressure in both.",
    distractors: {
      "0": "The abdominal and pelvic cavities are continuous — together the abdominopelvic cavity, with no wall between them.",
      "1": "The pleural and pericardial cavities are both subdivisions inside the thorax.",
      "2": "The cranial and spinal cavities together form the dorsal cavity, nowhere near the diaphragm.",
    },
    commonMistake:
      "Picking abdominal and pelvic. Those two are not separated by anything — the diaphragm sits higher, under the lungs.",
  },
  "A clinician notes that the wrist is located distal to the elbow. Which relationship does the term distal describe?": {
    takeaway: "Distal = farther from the limb's point of attachment.",
    whyCorrect:
      "Distance is measured from where the limb joins the trunk, so structures farther down the limb are distal.",
    distractors: {
      "0": "Nearer the front is anterior (or ventral).",
      "1": "Toward the midline is medial.",
      "2": "Closer to the attachment point is proximal, the opposite term.",
    },
    commonMistake:
      "Confusing distal with inferior. Distal is measured along the limb from its attachment, not by height — a raised hand is still distal.",
  },
  "A plane that divides the body into superior and inferior portions is referred to as which plane?": {
    takeaway: "Transverse = top/bottom, sagittal = left/right, frontal = front/back.",
    whyCorrect: "The transverse plane makes the horizontal cut into upper and lower portions.",
    distractors: {
      "1": "The midsagittal plane divides the body into equal left and right halves.",
      "2": "The frontal plane divides front from back.",
      "3": "A sagittal plane divides left from right.",
    },
    commonMistake:
      "Mixing up frontal and transverse. Frontal separates front from back (it faces you); transverse cuts across horizontally.",
  },
  "Which body cavity is bounded inferiorly by the diaphragm and contains the heart and lungs?": {
    takeaway: "Thoracic cavity = chest, above the diaphragm, holding heart and lungs.",
    whyCorrect:
      "The thoracic cavity sits inside the rib cage with the diaphragm as its floor, housing the heart and lungs.",
    distractors: {
      "0": "The pelvic cavity holds the bladder and reproductive organs.",
      "1": "The abdominal cavity lies below the diaphragm with the digestive organs.",
      "2": "The cranial cavity holds the brain.",
    },
    commonMistake:
      "Missing the clue in 'bounded inferiorly by the diaphragm'. That phrase means the diaphragm is the floor, so the cavity is above it.",
  },
  "When a person becomes overheated, sweat glands activate and blood vessels in the skin dilate to release heat, returning body temperature toward its set point. This response is the best example of which physiological principle?": {
    takeaway: "If the response REVERSES the change, it is negative feedback.",
    steps: [
      "The change: body temperature rises.",
      "The response: sweating and vasodilation shed heat.",
      "The effect: temperature falls back toward the set point — the change is opposed.",
    ],
    whyCorrect:
      "Opposing a deviation to restore a set point is the definition of negative feedback maintaining homeostasis.",
    distractors: {
      "1": "Active transport moves molecules across membranes against a gradient — unrelated to temperature control.",
      "2": "Metabolic conversion produces energy but is not a feedback mechanism.",
      "3": "Positive feedback would amplify the rise, making the person hotter still.",
    },
    commonMistake:
      "Reading 'negative' as bad. It describes the direction of the response — against the change — which is what keeps you stable.",
  },
  "Which sequence correctly lists the levels of structural organization in the human body from simplest to most complex?": {
    takeaway: "Cells → tissues → organs → organ systems.",
    whyCorrect:
      "Each level is built from the previous one: similar cells make tissues, tissues combine into organs, organs cooperate as systems.",
    distractors: {
      "1": "Tissues are made of cells, so cells must come first.",
      "2": "Organs are made of tissues, so tissues precede organs.",
      "3": "This runs backwards for the first three levels.",
    },
    commonMistake:
      "Swapping tissues and organs. Ask what each is built from — the component always comes first.",
  },
  "The heart and lungs are protected by the rib cage and are located in which body cavity?": {
    takeaway: "Thoracic cavity = chest, inside the rib cage.",
    whyCorrect:
      "The rib cage encloses the thoracic cavity, shielding the heart and lungs.",
    distractors: {
      "0": "The abdominal cavity holds the digestive organs, below the diaphragm.",
      "2": "The pelvic cavity holds the bladder and reproductive organs.",
      "3": "The cranial cavity holds the brain.",
    },
    commonMistake:
      "Overlooking the rib cage clue. The ribs define the thorax, so anything they protect is thoracic.",
  },
  "Using the standard nine-region scheme of the abdomen, which region lies directly superior to the umbilical region?": {
    takeaway: "The central column runs epigastric (top), umbilical (middle), hypogastric (bottom).",
    steps: [
      "The umbilical region is the center, around the navel.",
      "Directly above it is the epigastric region — 'epi' meaning upon or above, 'gastric' the stomach.",
    ],
    whyCorrect: "Epigastric is the central region immediately above the umbilical region.",
    distractors: {
      "0": "Hypogastric is directly BELOW the umbilical region — 'hypo' means under.",
      "1": "The left iliac region is lateral and inferior, at the hip.",
      "3": "The right lumbar region is lateral, beside the umbilical region.",
    },
    commonMistake:
      "Confusing the epi-/hypo- prefixes. Epi means above and hypo means below — the same prefixes that distinguish epidermis from hypodermis.",
  },
  "Which of the four primary tissue types covers body surfaces and lines cavities and organs?": {
    takeaway: "Epithelial tissue covers, lines, and forms glands.",
    whyCorrect:
      "Epithelium forms continuous sheets over surfaces and linings — skin's outer layer, the gut lining, the airways.",
    distractors: {
      "0": "Nervous tissue transmits electrical impulses.",
      "1": "Muscle tissue contracts to produce movement.",
      "3": "Connective tissue supports and binds structures together.",
    },
    commonMistake:
      "Choosing connective tissue because skin comes to mind. Skin has both — epithelium on top, connective tissue beneath.",
  },
  "Which primary tissue type includes bone, blood, and tendons and functions to support, bind, and protect other tissues?": {
    takeaway: "Connective tissue is the diverse support category — bone, blood, cartilage, tendons, fat.",
    whyCorrect:
      "What unites these very different tissues is cells scattered in an extracellular matrix, which is the defining feature of connective tissue.",
    distractors: {
      "1": "Epithelial tissue covers and lines surfaces.",
      "2": "Nervous tissue conducts impulses.",
      "3": "Muscle tissue generates movement.",
    },
    commonMistake:
      "Refusing to classify blood as connective tissue. It qualifies because its cells are suspended in a matrix — plasma.",
  },
  "The regulation of body temperature, in which a rise in temperature triggers sweating to bring the temperature back toward normal, is an example of which type of homeostatic control?": {
    takeaway: "Response reverses the change = negative feedback.",
    whyCorrect:
      "Sweating counteracts the temperature rise, returning the body toward its set point.",
    distractors: {
      "0": "Feedforward control anticipates a change before it happens; here the response follows the rise.",
      "1": "Positive feedback would drive the temperature higher still.",
      "2": "Metabolic amplification is not a feedback classification.",
    },
    commonMistake:
      "Picking positive because the outcome is good. The labels describe direction, not desirability — most healthy regulation is negative feedback.",
  },
  "Which physiological process is an example of positive feedback, in which the response intensifies the original stimulus?": {
    takeaway: "Positive feedback amplifies until an endpoint — childbirth and clotting are the classic cases.",
    steps: [
      "Contractions push the baby against the cervix.",
      "Cervical stretch triggers oxytocin release.",
      "More oxytocin means stronger contractions, intensifying the cycle until delivery ends it.",
    ],
    whyCorrect:
      "The response increases the original stimulus rather than opposing it, which is exactly what positive feedback means.",
    distractors: {
      "0": "Temperature regulation opposes change — negative feedback.",
      "1": "Insulin lowers high blood glucose, opposing the change — negative feedback.",
      "3": "Baroreceptors correct blood pressure back toward normal — negative feedback.",
    },
    commonMistake:
      "Looking for a beneficial process. Positive feedback is rare in the body precisely because runaway amplification needs a definite endpoint to stop it.",
  },

  // ── SCIENCE / anatomy-physiology / Integumentary System ───────────────────
  // Layers from the outside in: epidermis (barrier, no blood vessels), dermis
  // (vessels, nerves, follicles, glands), hypodermis (fat). Most distractors
  // swap a protein, a pigment, or a gland type for another.
  "Which layer of the skin is the outermost and forms a protective barrier against the environment?": {
    takeaway: "Outside in: epidermis, dermis, hypodermis.",
    whyCorrect:
      "The epidermis is the surface layer, its dead keratin-filled cells forming the barrier against microbes and water loss.",
    distractors: {
      "0": "Fascia is connective tissue wrapping muscles, deeper than skin entirely.",
      "1": "The hypodermis is the deepest layer, made largely of fat.",
      "2": "The dermis lies beneath the epidermis and holds the vessels, nerves, and glands.",
    },
    commonMistake:
      "Mixing the epi-/hypo- prefixes. Epi means upon, so epidermis sits on top; hypo means under.",
  },
  "When body temperature rises, which integumentary response helps cool the body?": {
    takeaway: "Cooling = sweat plus vasodilation. Warming = vasoconstriction plus goosebumps.",
    steps: [
      "Sweat glands release fluid that carries heat away as it evaporates.",
      "Dermal vessels dilate, bringing warm blood to the surface to shed heat.",
    ],
    whyCorrect: "Both mechanisms move heat out of the body, which is what cooling requires.",
    distractors: {
      "0": "Constricting dermal vessels keeps blood away from the surface, conserving heat.",
      "1": "Arrector pili contraction raises hairs to trap air — a heat-conserving response.",
      "3": "Decreased skin blood flow retains heat rather than releasing it.",
    },
    commonMistake:
      "Choosing vasoconstriction because it sounds active. Ask which direction heat moves: to cool down, blood must come TO the surface.",
  },
  "Which layer of the epidermis contains actively dividing stem cells that continually replace the cells above it?": {
    takeaway: "Stratum basale is the deepest epidermal layer, where new cells are born.",
    steps: [
      "New keratinocytes divide in the basale, at the bottom.",
      "They are pushed upward as more form beneath them.",
      "By the time they reach the corneum they are dead, flattened, and ready to shed.",
    ],
    whyCorrect:
      "The basale is the only epidermal layer with stem cells actively dividing, which is why skin regenerates from the bottom up.",
    distractors: {
      "1": "The stratum corneum is the outermost layer of dead cells being shed.",
      "2": "The stratum granulosum is a transitional layer where cells are dying.",
      "3": "The stratum lucidum is a thin clear layer found only in thick skin like palms and soles.",
    },
    commonMistake:
      "Assuming new cells form at the surface. Growth happens at the base and pushes outward — the same reason nails grow from the cuticle.",
  },
  "Exposure of the skin to ultraviolet radiation triggers the initial synthesis of which vitamin?": {
    takeaway: "UV light starts vitamin D synthesis in the skin.",
    whyCorrect:
      "UV converts a cholesterol derivative in the skin into a vitamin D precursor, which the liver and kidneys then activate — the reason it is called the sunshine vitamin.",
    distractors: {
      "0": "Vitamin C must come from the diet; humans cannot synthesize it at all.",
      "2": "Vitamin A comes from the diet.",
      "3": "Vitamin K comes from the diet and gut bacteria.",
    },
    commonMistake:
      "Forgetting that vitamin D is only started in the skin. The liver and kidneys finish it, which is why kidney disease can cause deficiency.",
  },
  "Which type of sweat gland is distributed over most of the body surface and is most directly responsible for cooling the body through evaporation?": {
    takeaway: "Eccrine glands are everywhere and cool you; apocrine are localized and odor-related.",
    whyCorrect:
      "Eccrine glands cover nearly the whole body and secrete watery sweat that evaporates, making them the thermoregulatory glands.",
    distractors: {
      "0": "Ceruminous glands produce earwax in the ear canal.",
      "1": "Apocrine glands sit in the armpits and groin and secrete a thicker fluid that bacteria break down into body odor.",
      "3": "Sebaceous glands secrete oily sebum, not sweat.",
    },
    commonMistake:
      "Assuming apocrine glands do the cooling because they are associated with sweating. Their limited distribution rules them out — cooling requires whole-body coverage.",
  },
  "Which layer of the skin is the outermost layer that we can see and touch?": {
    takeaway: "Outside in: epidermis, dermis, hypodermis.",
    whyCorrect: "The epidermis is the visible surface layer of skin.",
    distractors: {
      "0": "The hypodermis is the deepest layer.",
      "1": "The dermis lies below the epidermis and is not directly visible.",
      "2": "Subcutaneous fat is part of the hypodermis, deepest of all.",
    },
    commonMistake:
      "Confusing dermis and epidermis. The epi- prefix means upon, marking the outer layer.",
  },
  "Exposure of the skin to sunlight allows the body to begin producing which vitamin?": {
    takeaway: "Sunlight starts vitamin D synthesis in the skin.",
    whyCorrect:
      "Vitamin D produced this way drives calcium absorption, linking sun exposure to bone health.",
    distractors: {
      "0": "Vitamin B12 comes from animal foods and requires intrinsic factor to absorb.",
      "1": "Vitamin K comes from leafy greens and gut bacteria.",
      "2": "Vitamin C comes from the diet.",
    },
    commonMistake:
      "Guessing among vitamins. Only D has a sunlight route — every other vitamin must be eaten.",
  },
  "Which pigment is mainly responsible for determining the color of a person's skin?": {
    takeaway: "Melanin, made by melanocytes, gives skin its color and absorbs UV.",
    whyCorrect:
      "Melanin's amount and type determine skin tone, and it shields deeper cells' DNA from ultraviolet damage.",
    distractors: {
      "0": "Keratin is the structural protein that toughens skin, not a pigment.",
      "1": "Hemoglobin colors blood red and can tint pale skin pink, but it does not determine skin color.",
      "3": "Collagen provides structural strength in the dermis.",
    },
    commonMistake:
      "Confusing melanin with melatonin. Melanin is the skin pigment; melatonin is the sleep hormone.",
  },
  "When body temperature rises, sweat glands in the skin help cool the body primarily by which mechanism?": {
    takeaway: "Evaporation is what cools — the sweat must dry to remove heat.",
    whyCorrect:
      "Converting liquid sweat to vapor absorbs heat from the skin, which is why humid air feels hotter: sweat cannot evaporate.",
    distractors: {
      "0": "Melanin protects against UV; it has no cooling role.",
      "1": "Keratin toughens and waterproofs the skin.",
      "3": "Constricting dermal vessels conserves heat instead of releasing it.",
    },
    commonMistake:
      "Thinking the sweat itself does the cooling. Wiping sweat away removes the cooling — the evaporation is the mechanism.",
  },
  "Which protein gives the outer skin, hair, and nails their toughness and helps make them water-resistant?": {
    takeaway: "Keratin is the tough structural protein of skin, hair, and nails.",
    whyCorrect:
      "Keratin fills maturing epidermal cells, hardening the surface and limiting water loss — hair and nails are essentially compacted keratin.",
    distractors: {
      "0": "Melanin is the pigment for color and UV protection.",
      "1": "Albumin is a blood plasma protein.",
      "3": "Elastin gives the dermis its stretch and recoil, which is flexibility rather than toughness.",
    },
    commonMistake:
      "Choosing collagen or elastin because they are also structural. Those support the dermis below; keratin hardens the surface.",
  },
  "Sebaceous glands in the skin secrete an oily substance. What is the main function of this secretion?": {
    takeaway: "Sebum lubricates and waterproofs skin and hair.",
    whyCorrect:
      "Sebum coats the skin and hair shafts, keeping them supple and water-resistant while inhibiting some microbes.",
    distractors: {
      "0": "Detecting temperature is the job of sensory nerve endings in the dermis.",
      "1": "Pigment comes from melanocytes.",
      "3": "Evaporative cooling is the eccrine sweat glands' role.",
    },
    commonMistake:
      "Mixing up the two gland types. Sebaceous glands secrete oil for conditioning; sweat glands secrete water for cooling.",
  },
  "In which skin layer are blood vessels, nerve endings, hair follicles, and many glands located?": {
    takeaway: "The dermis holds the working parts; the epidermis has no blood vessels at all.",
    whyCorrect:
      "The dermis contains vessels, nerves, follicles, and glands — which is why a shallow scrape does not bleed but a deeper cut does.",
    distractors: {
      "0": "The epidermis is avascular, nourished by diffusion from the dermis below.",
      "1": "The stratum corneum is the outermost epidermal layer, made of dead cells.",
      "3": "The cuticle is a structure at the base of a nail, not a skin layer.",
    },
    commonMistake:
      "Assuming the outer layer has the nerves because touch is felt there. The receptors sit in the dermis, below the surface you actually touch.",
  },
  "The hypodermis, the deepest layer associated with the skin, is largely composed of fat. Which function does this fat layer mainly provide?": {
    takeaway: "Hypodermis fat insulates, cushions, and stores energy.",
    whyCorrect:
      "Adipose tissue conducts heat poorly, so it retains body heat while padding underlying structures and banking energy.",
    distractors: {
      "1": "Vitamin D synthesis begins in the epidermis, where UV light reaches.",
      "2": "Light touch is detected by receptors in the dermis.",
      "3": "Pigment is produced by melanocytes in the epidermis.",
    },
    commonMistake:
      "Overlooking insulation as a real function. Fat's poor heat conduction is exactly what makes it an insulator.",
  },
  "Which of the following is a major protective function of the skin?": {
    takeaway: "Skin is a barrier — it keeps pathogens out and water in.",
    whyCorrect:
      "As the body's largest organ and its first line of defense, intact skin blocks microbes and prevents dehydration, which is why extensive burns are so dangerous.",
    distractors: {
      "0": "Filtering blood waste is the kidneys' job.",
      "1": "Pumping blood is the heart's job.",
      "3": "Digestive enzymes come from the pancreas, stomach, and small intestine.",
    },
    commonMistake:
      "Overlooking water retention as protection. Keeping fluid in matters as much as keeping pathogens out.",
  },

  // ── SCIENCE / anatomy-physiology / Genitourinary System ───────────────────
  // Two anchors: the plumbing order (kidney → ureter → bladder → urethra) and
  // the three steps of urine formation (filtration, reabsorption, secretion).
  // UretERs are the pair above the bladder; the urethRA is the single exit.
  "What is the functional unit of the kidney responsible for filtering blood and forming urine?": {
    takeaway: "The nephron is the kidney's functional unit; the glomerulus is just its filter.",
    whyCorrect:
      "A nephron performs the whole job — filtration, reabsorption, and secretion — and each kidney holds about a million of them.",
    distractors: {
      "0": "Alveoli are the gas exchange sacs of the lungs.",
      "1": "The ureter is a transport tube, not a filtering unit.",
      "3": "The glomerulus is the capillary tuft INSIDE a nephron where filtration happens — a part, not the whole unit.",
    },
    commonMistake:
      "Choosing the glomerulus. It performs one step; the nephron is the complete functional unit the question asks for.",
  },
  "Which sequence correctly describes the path of urine after it is formed in the kidney?": {
    takeaway: "Kidney → ureter → bladder → urethra.",
    steps: [
      "Urine forms in the kidney's nephrons.",
      "The ureters carry it down to the bladder.",
      "The bladder stores it.",
      "The urethra carries it out of the body.",
    ],
    whyCorrect: "This is the only order in which storage comes before the exit tube.",
    distractors: {
      "1": "This puts the urethra before the bladder, but the urethra is the final exit.",
      "2": "Urine cannot reach the bladder before passing through the ureters.",
      "3": "The urethra is last, not first.",
    },
    commonMistake:
      "Swapping ureter and urethra. UretERs are the pair carrying urine down from the kidneys; the urethRA is the single tube out.",
  },
  "What is the functional filtering unit of the kidney?": {
    takeaway: "The nephron is the kidney's functional unit.",
    whyCorrect:
      "Nephrons filter blood and form urine; roughly a million per kidney do this work.",
    distractors: {
      "0": "Alveoli are lung structures for gas exchange.",
      "2": "Villi are intestinal projections for nutrient absorption.",
      "3": "Sarcomeres are the contractile units of muscle.",
    },
    commonMistake:
      "Mixing up the functional units of different organs. Nephron–kidney, alveolus–lung, villus–intestine, sarcomere–muscle.",
  },
  "In the nephron, the initial filtration of blood plasma occurs as fluid passes from the glomerulus into which structure?": {
    takeaway: "Glomerulus filters INTO the glomerular (Bowman) capsule that surrounds it.",
    whyCorrect:
      "Blood pressure forces plasma out of the glomerular capillaries into the cup-shaped Bowman capsule, creating the filtrate.",
    distractors: {
      "0": "The collecting duct is at the end of the nephron, doing final water adjustment.",
      "2": "The loop of Henle concentrates the filtrate after it has already formed.",
      "3": "The renal pelvis collects finished urine before the ureter.",
    },
    commonMistake:
      "Choosing a later structure. Filtration is the FIRST step, so the answer must be the structure immediately around the glomerulus.",
  },
  "Antidiuretic hormone (ADH) helps conserve body water primarily by increasing water reabsorption in which part of the nephron?": {
    takeaway: "ADH acts on the collecting duct to reclaim water.",
    whyCorrect:
      "ADH makes the collecting duct permeable to water, so water leaves the filtrate and returns to the blood — the last chance to conserve it before urine leaves the kidney.",
    distractors: {
      "0": "The glomerulus filters; it does not reabsorb.",
      "2": "The renal corpuscle is the glomerulus plus Bowman capsule, the filtration apparatus.",
      "3": "The proximal convoluted tubule reabsorbs a great deal of water, but constantly and without ADH control.",
    },
    commonMistake:
      "Picking the proximal tubule because it reabsorbs the most. The question asks where ADH acts — regulation happens at the collecting duct.",
  },
  "What is the functional filtering unit of the kidney called?": {
    takeaway: "The nephron is the kidney's functional unit.",
    whyCorrect: "Each nephron filters blood and produces urine independently.",
    distractors: {
      "0": "Alveoli belong to the lungs.",
      "2": "Neurons are nerve cells — similar sounding, completely different organ.",
      "3": "Villi belong to the small intestine.",
    },
    commonMistake:
      "Confusing nephron with neuron. Nephron is the kidney unit; neuron is the nerve cell.",
  },
  "Which tubes carry urine from the kidneys down to the urinary bladder?": {
    takeaway: "Ureters run kidneys → bladder; the urethra runs bladder → outside.",
    whyCorrect:
      "There are two ureters, one draining each kidney into the bladder.",
    distractors: {
      "0": "Fallopian tubes carry eggs in the female reproductive system.",
      "2": "Renal arteries deliver blood TO the kidneys, not urine away from them.",
      "3": "The urethra carries urine out of the bladder, the next stage down.",
    },
    commonMistake:
      "Confusing the two similar names. There are two uretERs (paired, upstream) and one urethRA (single, downstream).",
  },
  "During urine formation, the first step occurs in the glomerulus. What is this step called?": {
    takeaway: "Urine formation: filtration, then reabsorption, then secretion.",
    whyCorrect:
      "Filtration forces water and small solutes out of the glomerular blood into the nephron, creating the filtrate everything else works on.",
    distractors: {
      "0": "Excretion is the final elimination of urine from the body.",
      "1": "Reabsorption returns useful substances to the blood, after filtration.",
      "2": "Secretion adds extra wastes into the filtrate, also after filtration.",
    },
    commonMistake:
      "Mixing up reabsorption and secretion. Reabsorption takes OUT of the filtrate back to blood; secretion puts INTO the filtrate — and both come after filtration.",
  },
  "When a person becomes dehydrated, antidiuretic hormone (ADH) is released and acts on the kidneys to do what?": {
    takeaway: "ADH = anti-diuretic = less urine. It conserves water.",
    steps: [
      "Dehydration means the body needs to keep water.",
      "ADH makes kidney tubules more permeable to water.",
      "More water returns to the blood, so urine is smaller in volume and more concentrated.",
    ],
    whyCorrect: "Conserving water is exactly what a dehydrated body needs.",
    distractors: {
      "0": "Increasing water loss would worsen dehydration — the opposite of the goal.",
      "1": "The kidneys never stop filtering; wastes would build to dangerous levels.",
      "3": "Glucose loss in urine signals diabetes, unrelated to ADH.",
    },
    commonMistake:
      "Missing the name's meaning. A diuretic increases urine, so ANTI-diuretic decreases it — the name gives the answer.",
  },
  "During reabsorption in the nephron, which of the following normally moves from the filtrate back into the blood?": {
    takeaway: "Reabsorption reclaims the useful things: glucose, water, ions.",
    whyCorrect:
      "The body cannot afford to lose glucose and water, so they are pulled back into the blood — which is why healthy urine contains no glucose.",
    distractors: {
      "0": "Red blood cells are far too large to be filtered; finding them in urine signals injury or disease.",
      "1": "Large proteins are likewise not filtered, so they never need reabsorbing.",
      "2": "Urea is a waste meant to LEAVE in the urine, and water is reabsorbed alongside solutes.",
    },
    commonMistake:
      "Thinking reabsorption recovers wastes. It recovers what the body wants to keep; wastes like urea are deliberately left behind.",
  },
  "The hormone aldosterone helps regulate fluid and electrolyte balance by causing the kidneys to reabsorb more of which ion?": {
    takeaway: "Aldosterone saves sodium (and water follows it), while dumping potassium.",
    whyCorrect:
      "Reabsorbing sodium pulls water along osmotically, raising blood volume and pressure.",
    distractors: {
      "0": "Calcium balance is handled by parathyroid hormone and calcitonin.",
      "1": "Iodine is needed by the thyroid to make its hormones.",
      "2": "Iron is managed through absorption and storage proteins, not aldosterone.",
    },
    commonMistake:
      "Forgetting that water follows sodium. That coupling is why a sodium-retaining hormone raises blood pressure.",
  },
  "Which structure stores urine until it is released from the body?": {
    takeaway: "The bladder stores; the kidney makes; the tubes transport.",
    whyCorrect:
      "The urinary bladder is a muscular, expandable sac that holds urine until urination.",
    distractors: {
      "1": "The ureter transports urine downward but stores nothing.",
      "2": "The kidney produces urine continuously.",
      "3": "The nephron is the kidney's microscopic filtering unit.",
    },
    commonMistake:
      "Assuming the kidney holds urine until you need to go. Urine drains continuously to the bladder, which is the reservoir.",
  },
  "Besides removing wastes, the kidneys play a major role in which of the following?": {
    takeaway: "Kidneys balance water and electrolytes, not just filter wastes.",
    whyCorrect:
      "By deciding how much water and which ions to keep or excrete, the kidneys govern blood volume, blood pressure, and pH.",
    distractors: {
      "0": "Insulin comes from the pancreas.",
      "1": "Bile is produced by the liver.",
      "2": "Gas exchange happens in the lungs.",
    },
    commonMistake:
      "Thinking of kidneys as waste filters only. Fluid and electrolyte balance is arguably their bigger job.",
  },
  "Which tube carries urine from the bladder to the outside of the body?": {
    takeaway: "The urethra is the single exit tube from the bladder.",
    whyCorrect: "The urethra runs from the bladder to the body's exterior.",
    distractors: {
      "0": "The ureter carries urine from kidney to bladder, one stage earlier.",
      "2": "The vas deferens carries sperm in the male reproductive system.",
      "3": "The renal vein carries filtered blood away from the kidney.",
    },
    commonMistake:
      "Reversing ureter and urethra again. Order them by the path: uretER first (kidney to bladder), urethRA last (bladder to outside).",
  },

  // ── SCIENCE / anatomy-physiology / Reproductive System ────────────────────
  // Structures split into produce / mature / transport / add fluid, and the
  // cycle hormones split by timing: FSH grows follicles, the LH surge triggers
  // ovulation, progesterone from the corpus luteum maintains the lining.
  "In the male reproductive system, sperm are produced in which structure?": {
    takeaway: "Sperm are MADE in the seminiferous tubules of the testes; everything else stores, moves, or adds fluid.",
    whyCorrect:
      "Spermatogenesis takes place inside the coiled seminiferous tubules, which is the testes' production role.",
    distractors: {
      "0": "The epididymis stores sperm and lets them mature after production.",
      "1": "The prostate adds fluid to semen but makes no sperm.",
      "2": "The vas deferens transports sperm toward the urethra.",
    },
    commonMistake:
      "Confusing production with maturation. Sperm are made in the testes and finish maturing in the epididymis.",
  },
  "In the female reproductive system, fertilization of an egg by a sperm normally occurs in the:": {
    takeaway: "Fertilization happens in the fallopian tube; implantation happens in the uterus.",
    whyCorrect:
      "Sperm meet the egg in the fallopian tube as it travels from the ovary, and the fertilized egg implants only after reaching the uterus.",
    distractors: {
      "0": "The uterus is where implantation and development occur, days after fertilization.",
      "2": "The cervix is the lower opening of the uterus, a passage rather than a site.",
      "3": "The ovary releases the egg but is not where sperm reach it.",
    },
    commonMistake:
      "Answering uterus because pregnancy happens there. Fertilization and implantation are separate events in separate places.",
  },
  "In the male reproductive system, sperm cells are produced within which structures?": {
    takeaway: "Sperm are made in the seminiferous tubules of the testes.",
    whyCorrect: "The seminiferous tubules are the site of spermatogenesis.",
    distractors: {
      "0": "The epididymis stores and matures sperm after they are produced.",
      "2": "The seminal vesicles contribute fructose-rich fluid to semen.",
      "3": "The prostate adds alkaline fluid to semen.",
    },
    commonMistake:
      "Treating every male structure as a producer. Only the testes produce; the glands supply fluid and the tubes transport.",
  },
  "Following ovulation, fertilization of a secondary oocyte by a sperm cell normally occurs in which structure?": {
    takeaway: "Fertilization happens in the fallopian (uterine) tube.",
    whyCorrect:
      "Fertilization typically occurs in the ampulla, the widest part of the uterine tube, before the zygote travels on to the uterus.",
    distractors: {
      "0": "The cervix is the narrow lower opening of the uterus.",
      "2": "The ovary releases the oocyte; sperm do not normally reach it there.",
      "3": "The uterus receives the already-fertilized egg for implantation.",
    },
    commonMistake:
      "Missing that 'uterine tube' and 'fallopian tube' are the same structure. The alternate name is not a different place.",
  },
  "A surge in which hormone directly triggers ovulation in the menstrual cycle?": {
    takeaway: "The LH surge triggers ovulation. FSH grows the follicle beforehand.",
    steps: [
      "FSH stimulates follicle growth in the first half of the cycle.",
      "The growing follicle releases estrogen, which builds to a peak.",
      "That peak triggers an LH surge, which ruptures the follicle — ovulation.",
    ],
    whyCorrect: "The sharp LH spike is the direct trigger releasing the egg.",
    distractors: {
      "0": "FSH matures the follicle earlier but does not release the egg.",
      "1": "Oxytocin drives labor contractions and milk letdown.",
      "3": "Progesterone dominates AFTER ovulation, maintaining the lining.",
    },
    commonMistake:
      "Choosing FSH because it acts on follicles. FSH grows the follicle; LH pops it — which is why ovulation predictor kits detect LH.",
  },
  "In which male structure are sperm cells produced?": {
    takeaway: "The testes produce sperm (in their seminiferous tubules).",
    whyCorrect: "The testes are the male gonads, producing both sperm and testosterone.",
    distractors: {
      "0": "The epididymis stores and matures sperm.",
      "1": "The seminal vesicles secrete fluid for semen.",
      "3": "The prostate secretes fluid for semen.",
    },
    commonMistake:
      "Picking a gland because it contributes to semen. Semen is mostly fluid from glands; only the testes make the sperm in it.",
  },
  "A sudden surge in luteinizing hormone (LH) during the menstrual cycle directly triggers which event?": {
    takeaway: "LH surge → ovulation.",
    whyCorrect:
      "The LH peak causes the mature follicle to rupture and release its egg, roughly midway through the cycle.",
    distractors: {
      "0": "Menstruation follows a DROP in progesterone at the cycle's end.",
      "2": "Endometrial thickening is driven mainly by estrogen before ovulation.",
      "3": "Maturing new follicles is FSH's role early in the cycle.",
    },
    commonMistake:
      "Associating any hormone spike with menstruation. Menstruation is triggered by hormones falling, not surging.",
  },
  "Where does fertilization of an egg by a sperm normally occur?": {
    takeaway: "Fertilization in the fallopian tube; implantation in the uterus.",
    whyCorrect:
      "The sperm meets the egg in the fallopian tube shortly after ovulation.",
    distractors: {
      "0": "The cervix is a passage sperm travel through, not where they meet the egg.",
      "2": "The uterus receives the already-fertilized egg for implantation.",
      "3": "The ovary releases the egg into the tube.",
    },
    commonMistake:
      "Assuming fertilization happens where the pregnancy develops. An egg fertilized in the tube that fails to move is an ectopic pregnancy — proof the two sites differ.",
  },
  "After ovulation, the corpus luteum secretes a hormone that maintains the uterine lining. Which hormone is this?": {
    takeaway: "The corpus luteum makes progesterone, which holds the endometrium in place.",
    whyCorrect:
      "Progesterone stabilizes the thickened lining after ovulation; when it falls, the lining sheds.",
    distractors: {
      "0": "Oxytocin drives labor contractions and milk letdown.",
      "1": "Testosterone is the main male sex hormone.",
      "2": "FSH stimulates follicle growth before ovulation.",
    },
    commonMistake:
      "Mixing up estrogen and progesterone. Estrogen BUILDS the lining before ovulation; progesterone MAINTAINS it after.",
  },
  "Which female organ produces eggs and the hormones estrogen and progesterone?": {
    takeaway: "The ovaries are the female gonads: eggs plus estrogen and progesterone.",
    whyCorrect:
      "Ovaries do double duty, releasing eggs and secreting the hormones that run the cycle — mirroring the testes in males.",
    distractors: {
      "0": "The vagina is the birth canal and passage to the uterus.",
      "2": "The cervix is the lower opening of the uterus.",
      "3": "The uterus houses a developing fetus but produces neither eggs nor these hormones.",
    },
    commonMistake:
      "Choosing the uterus because it is the organ most associated with reproduction. Gametes and sex hormones always come from the gonads.",
  },
  "A researcher notes that a hormone from the anterior pituitary stimulates the testes to produce testosterone. Which hormone is responsible?": {
    takeaway: "LH stimulates testosterone in males; FSH supports sperm production.",
    whyCorrect:
      "LH acts on the interstitial (Leydig) cells of the testes to drive testosterone production — the same hormone name in both sexes, different target.",
    distractors: {
      "0": "Estrogen is the primary female sex hormone, not a pituitary hormone.",
      "1": "ADH acts on the kidneys to conserve water.",
      "3": "Progesterone maintains the uterine lining in females.",
    },
    commonMistake:
      "Assuming 'luteinizing hormone' is female-only because of its name. LH exists in both sexes; in males it triggers testosterone.",
  },
  "If fertilization does NOT occur during a typical menstrual cycle, which event happens at the end of the cycle?": {
    takeaway: "No fertilization → corpus luteum degenerates → progesterone falls → lining sheds.",
    steps: [
      "Without a pregnancy signal, the corpus luteum breaks down.",
      "Progesterone drops sharply.",
      "The endometrium can no longer be maintained and is shed as menstrual flow.",
    ],
    whyCorrect: "Menstruation is the direct consequence of progesterone withdrawal.",
    distractors: {
      "0": "Implantation requires fertilization, which the question rules out.",
      "1": "Estrogen rises in the FIRST half of the cycle, not at the end.",
      "2": "The corpus luteum degenerates rather than reforming; a new one follows the next ovulation.",
    },
    commonMistake:
      "Thinking the lining is shed because it is old. It is shed because the hormone maintaining it disappears.",
  },
  "Which structure serves as the site where a fertilized egg implants and a fetus develops?": {
    takeaway: "The uterus is where implantation and fetal development happen.",
    whyCorrect:
      "Its thick endometrium receives the fertilized egg, and its muscular wall expands with the growing fetus.",
    distractors: {
      "0": "The fallopian tube is where fertilization occurs; implantation there is a dangerous ectopic pregnancy.",
      "1": "The urethra is part of the urinary system.",
      "3": "The ovary releases eggs.",
    },
    commonMistake:
      "Swapping the fertilization and implantation sites. Fertilization in the tube, implantation in the uterus.",
  },
  "During the first half of the menstrual cycle, follicle-stimulating hormone primarily promotes which process?": {
    takeaway: "FSH grows and matures ovarian follicles — the name says it.",
    whyCorrect:
      "FSH drives follicle development early in the cycle, and those maturing follicles then secrete the estrogen that builds the lining.",
    distractors: {
      "0": "Shedding the lining happens at the cycle's end when progesterone falls.",
      "1": "Uterine contractions in labor are driven by oxytocin.",
      "2": "Milk release is also oxytocin's role.",
    },
    commonMistake:
      "Overlooking that the hormone's name states its function. Follicle-Stimulating Hormone stimulates follicles.",
  },

  // ── SCIENCE / anatomy-physiology / Neuromuscular System ───────────────────
  // Three anchors: acetylcholine is the neuromuscular junction transmitter,
  // calcium is what actually uncovers actin's binding sites, and the reflex
  // arc always runs receptor → sensory → integration → motor → effector.
  "Which neurotransmitter is released at the neuromuscular junction to trigger skeletal muscle contraction?": {
    takeaway: "Acetylcholine is the neurotransmitter at every skeletal neuromuscular junction.",
    whyCorrect:
      "Motor neurons release acetylcholine into the synaptic cleft, where it binds receptors on the muscle fiber and starts the electrical event leading to contraction.",
    distractors: {
      "0": "Dopamine works in the brain, in reward and movement pathways.",
      "1": "Norepinephrine acts in the sympathetic nervous system and brain.",
      "2": "Serotonin acts in the brain and gut, affecting mood and motility.",
    },
    commonMistake:
      "Choosing a familiar brain neurotransmitter. Where nerve meets skeletal muscle the answer is always acetylcholine.",
  },
  "During skeletal muscle contraction, the direct trigger that exposes the binding sites on actin is the release of which ion into the sarcoplasm?": {
    takeaway: "Calcium uncovers actin's binding sites. Sodium and potassium only carry the action potential.",
    steps: [
      "The action potential reaches the sarcoplasmic reticulum.",
      "Calcium floods into the sarcoplasm.",
      "Calcium binds troponin, which shifts tropomyosin off actin's binding sites.",
      "Myosin heads can now attach, and contraction begins.",
    ],
    whyCorrect: "Calcium is the ion that physically unblocks the binding sites.",
    distractors: {
      "0": "Sodium rushing in creates the action potential but does not expose binding sites.",
      "1": "Chloride contributes to membrane stability, not to contraction.",
      "3": "Potassium leaving the cell repolarizes the membrane.",
    },
    commonMistake:
      "Answering sodium because it drives the nerve impulse. Sodium carries the SIGNAL; calcium carries out the ACTION.",
  },
  "Which part of a neuron typically receives incoming signals from other neurons?": {
    takeaway: "Dendrites receive, the axon transmits.",
    whyCorrect:
      "Dendrites are branched extensions that collect incoming signals and carry them toward the cell body.",
    distractors: {
      "0": "The axon conducts the impulse AWAY from the cell body.",
      "1": "The myelin sheath insulates the axon to speed conduction.",
      "2": "The axon terminal releases neurotransmitter to the next cell.",
    },
    commonMistake:
      "Mixing up the two ends. Signals flow in one direction: dendrites in, axon out.",
  },
  "Which neurotransmitter is released at the neuromuscular junction to stimulate contraction of skeletal muscle?": {
    takeaway: "Acetylcholine is the neuromuscular junction transmitter.",
    whyCorrect:
      "Acetylcholine binds receptors on the muscle fiber's motor end plate, initiating contraction.",
    distractors: {
      "1": "Serotonin acts in the brain and digestive tract.",
      "2": "GABA is the brain's main inhibitory neurotransmitter.",
      "3": "Dopamine acts in brain pathways for movement and reward.",
    },
    commonMistake:
      "Picking GABA or dopamine from general familiarity. Those act within the central nervous system; skeletal muscle answers only to acetylcholine.",
  },
  "During skeletal muscle contraction, the release of which ion from the sarcoplasmic reticulum exposes the binding sites needed for the cross-bridge cycle?": {
    takeaway: "Calcium from the sarcoplasmic reticulum exposes actin's binding sites.",
    whyCorrect:
      "Calcium binds troponin, moving tropomyosin aside so myosin cross-bridges can form.",
    distractors: {
      "1": "Sodium drives the action potential along the membrane.",
      "2": "Potassium restores the resting membrane potential.",
      "3": "Chloride is not involved in exposing binding sites.",
    },
    commonMistake:
      "Overlooking the storage clue. The sarcoplasmic reticulum is the muscle's calcium reservoir — naming it points at calcium.",
  },
  "Which type of muscle tissue is under voluntary control and attaches to bones to produce movement?": {
    takeaway: "Skeletal: voluntary and striated. Cardiac: involuntary but striated. Smooth: involuntary, not striated.",
    whyCorrect:
      "Skeletal muscle attaches to bone by tendons and contracts when you decide to move.",
    distractors: {
      "0": "Cardiac muscle is in the heart and beats involuntarily.",
      "2": "Visceral muscle is another name for smooth muscle, which is involuntary.",
      "3": "Smooth muscle lines hollow organs and works without conscious control.",
    },
    commonMistake:
      "Assuming striated means voluntary. Cardiac muscle is striated too but you cannot control it — only skeletal muscle is voluntary.",
  },
  "Which sequence correctly traces the pathway of a simple reflex arc?": {
    takeaway: "Receptor → sensory neuron → interneuron → motor neuron → effector.",
    steps: [
      "A receptor detects the stimulus.",
      "A sensory (afferent) neuron carries the signal toward the spinal cord.",
      "An interneuron in the cord processes it.",
      "A motor (efferent) neuron carries the command outward.",
      "The effector — usually a muscle — produces the response.",
    ],
    whyCorrect:
      "The signal must be detected before it can travel, and processed before a response can be sent.",
    distractors: {
      "0": "This runs the arc backwards, starting at the effector.",
      "2": "The receptor detects first; the sensory neuron cannot precede it.",
      "3": "This puts the motor neuron before the sensory neuron, reversing the flow.",
    },
    commonMistake:
      "Mixing up sensory and motor direction. Afferent Arrives at the cord; Efferent Exits toward the muscle.",
  },
  "In a myelinated axon, the action potential appears to jump from one node of Ranvier to the next. What is the main benefit of this saltatory conduction?": {
    takeaway: "Saltatory conduction makes impulses travel much faster.",
    whyCorrect:
      "Myelin insulates the axon so the impulse regenerates only at the nodes, skipping the slow work of depolarizing every point along the membrane.",
    distractors: {
      "0": "Neurotransmitters are still required at every synapse.",
      "1": "The axon still depolarizes — at the nodes, which is what propagates the signal.",
      "3": "Impulses travel one direction; the refractory period prevents backward movement.",
    },
    commonMistake:
      "Missing why speed matters here. Demyelinating disease like multiple sclerosis slows conduction precisely by destroying this mechanism.",
  },
  "The gaps in the myelin sheath where the axon membrane is exposed are called the": {
    takeaway: "Nodes of Ranvier are the gaps in myelin where the impulse regenerates.",
    whyCorrect:
      "At these exposed gaps, voltage-gated channels refresh the action potential, letting it leap from node to node.",
    distractors: {
      "0": "The motor end plate is the muscle-side membrane of the neuromuscular junction.",
      "2": "Dendritic spines are small protrusions on dendrites that receive synapses.",
      "3": "The synaptic cleft is the gap BETWEEN two cells, not a gap in myelin.",
    },
    commonMistake:
      "Confusing the two kinds of gap. Nodes of Ranvier interrupt myelin on one axon; a synaptic cleft separates two different cells.",
  },
  "In a withdrawal reflex, such as pulling the hand away from a hot stove, which cells serve as the effector that produces the response?": {
    takeaway: "The effector is whatever carries out the response — usually skeletal muscle.",
    whyCorrect:
      "Skeletal muscle cells contract to pull the hand away, which is the response itself.",
    distractors: {
      "0": "Interneurons process the signal in the spinal cord; they do not produce movement.",
      "1": "Sensory neurons carry the signal inward.",
      "2": "Receptors detect the heat, starting the arc rather than completing it.",
    },
    commonMistake:
      "Confusing the parts that carry the signal with the part that acts. The effector is the last link, where the response actually happens.",
  },
  "Which muscle type is striated and under voluntary control, allowing a person to deliberately move the limbs?": {
    takeaway: "Skeletal muscle is the only voluntary muscle type.",
    whyCorrect:
      "Skeletal muscle is both striated and voluntary, attaching to bone to move the body deliberately.",
    distractors: {
      "0": "Visceral muscle is another name for smooth muscle — involuntary.",
      "2": "Smooth muscle is involuntary and lacks striations.",
      "3": "Cardiac muscle is striated but beats involuntarily.",
    },
    commonMistake:
      "Choosing cardiac because it is striated. Both traits must match — striated AND voluntary means skeletal.",
  },
  "Which muscle type is involuntary and non-striated and is found in the walls of hollow organs such as the stomach and intestines?": {
    takeaway: "Smooth muscle: involuntary, non-striated, in the walls of hollow organs.",
    whyCorrect:
      "Smooth muscle moves food through the gut and adjusts blood vessel diameter, all without conscious control.",
    distractors: {
      "1": "'Striated muscle' describes skeletal and cardiac, the opposite of non-striated.",
      "2": "Skeletal muscle is voluntary and striated.",
      "3": "Cardiac muscle is striated and found only in the heart.",
    },
    commonMistake:
      "Overlooking one of the two clues. Non-striated alone rules out skeletal and cardiac immediately.",
  },
  "When the biceps brachii contracts, what action does it produce at the elbow joint?": {
    takeaway: "The biceps flexes the elbow; its antagonist, the triceps, extends it.",
    whyCorrect:
      "Contracting the biceps draws the forearm toward the upper arm, decreasing the joint angle — that is flexion.",
    distractors: {
      "0": "Shoulder abduction is produced by the deltoid.",
      "2": "Wrist rotation involves forearm muscles acting on the radius and ulna.",
      "3": "Extension straightens the elbow and is the triceps' job.",
    },
    commonMistake:
      "Mixing up flexion and extension. Flexion decreases the angle at a joint (curling up); extension increases it (straightening).",
  },
  "Place the components of a simple reflex arc in the correct order that a nerve signal travels through them.": {
    takeaway: "Receptor → sensory neuron → integration center → motor neuron → effector.",
    steps: [
      "The sensory receptor detects the stimulus.",
      "The sensory neuron carries the signal to the spinal cord.",
      "The integration center processes it — no trip to the brain required, which is why reflexes are fast.",
      "The motor neuron carries the command outward.",
      "The effector muscle contracts to produce the response.",
    ],
    whyCorrect:
      "Detection must precede transmission, and processing must precede the outgoing command.",
    commonMistake:
      "Placing the brain in the loop. A simple reflex is handled entirely in the spinal cord — you jerk your hand away before you feel the pain.",
  },

  // ── SCIENCE / anatomy-physiology / Skeletal System ────────────────────────
  // Three anchors: axial is the central axis (skull, spine, ribs, sternum)
  // while appendicular is limbs and girdles; osteoBlasts Build and osteoClasts
  // Consume; and joint type follows the motion described.
  "In adults, blood cells are produced primarily in which tissue?": {
    takeaway: "Red bone marrow makes blood cells; yellow marrow stores fat.",
    whyCorrect:
      "Hematopoiesis happens in red marrow, producing red cells, white cells, and platelets — which is why marrow is sampled to diagnose blood disorders.",
    distractors: {
      "0": "Articular cartilage cushions joint surfaces.",
      "1": "Yellow marrow is mostly fat storage, though it can convert back to red marrow under severe demand.",
      "2": "Compact bone matrix provides structural strength.",
    },
    commonMistake:
      "Treating all marrow as the same. The color distinguishes the function: red makes blood, yellow stores fat.",
  },
  "Which of the following bones is part of the axial skeleton?": {
    takeaway: "Axial = central axis: skull, vertebral column, rib cage, sternum.",
    whyCorrect:
      "The vertebral column runs down the body's central axis, the defining feature of the axial skeleton.",
    distractors: {
      "1": "The humerus is the upper arm bone — a limb, so appendicular.",
      "2": "The femur is the thigh bone — appendicular.",
      "3": "The tibia is a lower leg bone — appendicular.",
    },
    commonMistake:
      "Guessing between the two divisions. 'Appendicular' shares a root with appendage: limbs and the girdles attaching them.",
  },
  "Which bone cells are responsible for breaking down bone matrix and releasing stored calcium into the blood?": {
    takeaway: "OsteoBlasts Build bone; osteoClasts Consume it.",
    whyCorrect:
      "Osteoclasts resorb bone matrix, releasing calcium into the blood — the mechanism parathyroid hormone uses to raise blood calcium.",
    distractors: {
      "0": "Chondrocytes maintain cartilage, not bone.",
      "1": "Osteoblasts build new bone matrix, the opposite job.",
      "2": "Osteocytes are mature cells maintaining existing bone.",
    },
    commonMistake:
      "Confusing blasts and clasts. Use the first letters: B for Build, C for Consume.",
  },
  "Red bone marrow performs which important function?": {
    takeaway: "Red bone marrow produces blood cells.",
    whyCorrect:
      "Red marrow is the body's blood cell factory, making red cells, white cells, and platelets.",
    distractors: {
      "0": "Bile is synthesized by the liver.",
      "2": "Digestive enzymes come from the pancreas and intestinal lining.",
      "3": "Urine is stored in the bladder.",
    },
    commonMistake:
      "Thinking of bone as inert scaffolding. Bone is living tissue that manufactures blood and banks the body's calcium.",
  },
  "The joint at the elbow that allows flexion and extension in a single plane is best classified as which type of joint?": {
    takeaway: "One plane of motion, like a door = hinge joint.",
    whyCorrect:
      "The elbow bends and straightens in a single plane, exactly like a door hinge.",
    distractors: {
      "0": "Ball-and-socket joints (shoulder, hip) move in all directions.",
      "1": "Pivot joints allow rotation around an axis, like the neck's yes-no rotation.",
      "2": "Gliding joints let flat surfaces slide, as between wrist bones.",
    },
    commonMistake:
      "Guessing from the joint's name instead of its motion. Match the described movement to the joint type — one plane means hinge.",
  },
  "Which of the following bones is part of the axial skeleton rather than the appendicular skeleton?": {
    takeaway: "Axial = skull, spine, ribs, sternum. Appendicular = limbs and girdles.",
    whyCorrect: "The sternum is part of the rib cage, squarely in the axial skeleton.",
    distractors: {
      "0": "The clavicle is part of the shoulder girdle, which attaches the arm — appendicular.",
      "1": "The femur is a leg bone.",
      "2": "The humerus is an arm bone.",
    },
    commonMistake:
      "Counting the clavicle as axial because it sits near the chest. Girdles attach limbs, so they are appendicular despite being close to the trunk.",
  },
  "The shoulder and hip joints allow rotation and movement in many directions. What type of joint are they?": {
    takeaway: "Movement in all directions plus rotation = ball-and-socket.",
    whyCorrect:
      "A rounded head sitting in a cup-shaped socket permits the widest range of motion in the body.",
    distractors: {
      "1": "Pivot joints allow rotation around one axis only.",
      "2": "Gliding joints permit small sliding movements.",
      "3": "Hinge joints move in a single plane.",
    },
    commonMistake:
      "Overlooking the range clue. 'Many directions' can only describe ball-and-socket; every other type is more limited.",
  },
  "The elbow allows the forearm to bend and straighten in a single plane, much like a door. This is an example of which type of joint?": {
    takeaway: "Bend and straighten in one plane = hinge joint.",
    whyCorrect: "The elbow and knee are the classic hinge joints, moving in flexion and extension only.",
    distractors: {
      "0": "Ball-and-socket joints move in all planes.",
      "1": "Pivot joints rotate rather than bend.",
      "3": "Saddle joints, like the thumb's base, move in two planes.",
    },
    commonMistake:
      "Reading past the door analogy. The stem hands you the answer — a door hinge is a hinge joint.",
  },
  "The joint between the first and second cervical vertebrae lets the head rotate from side to side, as in shaking the head to signal no. Which type of joint makes this rotation possible?": {
    takeaway: "Rotation around a single axis = pivot joint.",
    whyCorrect:
      "The atlas rotates around the axis's peg-like projection, allowing the side-to-side 'no' motion.",
    distractors: {
      "0": "Ball-and-socket joints allow rotation plus movement in every other direction; this joint only rotates.",
      "1": "Gliding joints slide rather than rotate.",
      "3": "Hinge joints bend in one plane — the nodding 'yes' motion, not 'no'.",
    },
    commonMistake:
      "Choosing ball-and-socket because rotation is involved. Rotation ALONE is a pivot; rotation plus everything else is ball-and-socket.",
  },
  "Which of the following bones is part of the appendicular skeleton rather than the axial skeleton?": {
    takeaway: "Appendicular = appendages: limbs and the girdles attaching them.",
    whyCorrect: "The femur is the thigh bone, part of the lower limb.",
    distractors: {
      "0": "The skull is axial.",
      "1": "Vertebrae form the spinal column — axial.",
      "2": "The sternum is part of the rib cage — axial.",
    },
    commonMistake:
      "Reversing the two divisions. Appendicular shares a root with appendage — if it hangs off the central axis, it is appendicular.",
  },
  "Red bone marrow, found within certain bones, performs which important function?": {
    takeaway: "Red bone marrow produces blood cells.",
    whyCorrect:
      "Red marrow carries out hematopoiesis, generating red cells, white cells, and platelets.",
    distractors: {
      "0": "Bile is secreted by the liver.",
      "1": "Blood filtration and urine formation happen in the kidneys.",
      "2": "Digestive enzymes are stored and secreted by the pancreas.",
    },
    commonMistake:
      "Assuming blood is made in the heart or spleen. The heart pumps blood and the spleen filters it; marrow manufactures it.",
  },
};
