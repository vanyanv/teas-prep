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
};
