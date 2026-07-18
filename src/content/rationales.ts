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
};
