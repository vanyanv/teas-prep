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
};
