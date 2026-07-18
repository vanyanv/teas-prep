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
    takeaway:
      "Distribute to every term inside the parentheses, not just the variable.",
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
    steps: [
      "Add 2 to both sides: x/3 = 6.",
      "Multiply both sides by 3: x = 18.",
    ],
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
    takeaway:
      "Collect the variable terms on one side first, then solve as usual.",
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
    steps: [
      "Subtract 6 from both sides: x/4 = 8.",
      "Multiply both sides by 4: x = 32.",
    ],
    whyCorrect: "Check by substituting: 32/4 + 6 = 8 + 6 = 14.",
    commonMistake:
      "Multiplying by 4 before subtracting the 6, which multiplies the 6 as well.",
  },
  "Solve for x: x + 17 = 42": {
    takeaway:
      "Undo an addition by subtracting the same amount from both sides.",
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
    steps: [
      "Subtract 8 from both sides: 5x = 35.",
      "Divide both sides by 5: x = 7.",
    ],
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
    steps: [
      "Divide both sides by 4: x − 3 = 7.",
      "Add 3 to both sides: x = 10.",
    ],
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
    takeaway:
      "Electrons are negative, protons are positive, neutrons are neutral.",
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
  "The atomic number of an element is determined by the number of which particle in its atoms?":
    {
      takeaway:
        "Atomic number = proton count. The proton count is what makes an element that element.",
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
  "A neutral atom has a mass number of 23 and an atomic number of 11. How many neutrons does it contain?":
    {
      takeaway: "Neutrons = mass number − atomic number.",
      steps: [
        "The mass number counts protons and neutrons together: 23.",
        "The atomic number counts the protons: 11.",
        "Subtract: 23 − 11 = 12 neutrons.",
      ],
      whyCorrect:
        "12 neutrons plus 11 protons gives the stated mass number of 23.",
      distractors: {
        "1": "23 is the mass number itself, protons and neutrons combined.",
        "2": "34 adds the two numbers instead of subtracting them.",
        "3": "11 is the atomic number, the count of protons (and of electrons, since the atom is neutral).",
      },
      commonMistake:
        "Adding the two numbers. The atomic number is already inside the mass number, so neutrons come from subtracting it out.",
    },
  "Which subatomic particle carries a negative electric charge?": {
    takeaway:
      "Electrons are negative, protons are positive, neutrons are neutral.",
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
  "A neutral atom has a mass number of 39 and an atomic number of 19. How many neutrons does it contain?":
    {
      takeaway: "Neutrons = mass number − atomic number.",
      steps: [
        "The mass number counts protons and neutrons together: 39.",
        "The atomic number counts the protons: 19.",
        "Subtract: 39 − 19 = 20 neutrons.",
      ],
      whyCorrect:
        "20 neutrons plus 19 protons gives the stated mass number of 39.",
      distractors: {
        "1": "58 adds the two numbers instead of subtracting them.",
        "2": "39 is the mass number itself, protons and neutrons combined.",
        "3": "19 is the atomic number, the count of protons (and of electrons, since the atom is neutral).",
      },
      commonMistake:
        "Adding the two numbers. The atomic number is already inside the mass number, so neutrons come from subtracting it out.",
    },
  "An ionic bond forms when sodium reacts with chlorine. Which statement best describes how this bond is created?":
    {
      takeaway:
        "Ionic bonds transfer electrons from a metal to a nonmetal; the resulting ions attract.",
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
  "Two nonmetal atoms join together by sharing electrons. What type of chemical bond is this?":
    {
      takeaway:
        "Shared electrons make a covalent bond; transferred electrons make an ionic one.",
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
  "In a polar covalent bond, the shared electrons are pulled more strongly toward one atom, creating partial charges. Which molecule contains polar covalent bonds?":
    {
      takeaway:
        "A bond is polar only when the two atoms attract the shared electrons unequally.",
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
  "How many valence electrons does a neutral oxygen atom have, given that oxygen is in group 16 (6A) of the periodic table?":
    {
      takeaway:
        "For main-group elements, the group's A-number is the valence electron count.",
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
  "The first electron shell of an atom can hold a maximum of how many electrons?":
    {
      takeaway:
        "The innermost shell holds only 2 electrons; the next shells hold up to 8.",
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
  "According to the octet rule, why are noble gases such as neon and argon chemically unreactive?":
    {
      takeaway:
        "Atoms react to fill their outer shell; a shell that is already full has no reason to react.",
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
    takeaway:
      "An element is one kind of atom only; anything with two kinds is a compound or mixture.",
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
    takeaway:
      "Compounds are chemically bonded in fixed ratios; mixtures are only physically combined.",
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
    takeaway:
      "A pure substance has one fixed composition — a single element or a single compound.",
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
  "A hydrocarbon is a type of organic molecule. Which elements make up a hydrocarbon?":
    {
      takeaway:
        "Hydrocarbons contain carbon and hydrogen — those two and nothing else.",
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
  "Carbon is central to organic chemistry partly because of how many covalent bonds a carbon atom typically forms. How many bonds is this?":
    {
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
  "A bookstore recorded the number of books sold each day:\nMon: 12, Tue: 8, Wed: 15, Thu: 9, Fri: 21.\nOn which day were the most books sold?":
    {
      takeaway:
        "'Most' means the largest value — then answer with its label, not the number.",
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
  "A dealership recorded cars sold by month:\nJan: 30, Feb: 45, Mar: 25, Apr: 50.\nHow many more cars were sold in April than in March?":
    {
      takeaway:
        "'How many more' is always a subtraction between the two named values.",
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
  "Daily rainfall (in inches) for one week was recorded:\nMon: 0.5, Tue: 1.2, Wed: 0.0, Thu: 0.8, Fri: 1.5.\nWhat was the total rainfall for the week, in inches?":
    {
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
  "A class's final grades are shown in this frequency table:\nA: 6, B: 10, C: 8, D: 3, F: 1.\nHow many students earned a grade of C or higher (A, B, or C)?":
    {
      takeaway:
        "In a frequency table, the numbers are counts of students — add the rows the question names.",
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
  "A nurse recorded a patient's temperature (°F) over time:\n8 AM: 65, 10 AM: 70, 12 PM: 72, 2 PM: 75.\n(Values are example readings.) At what time was the reading 72?":
    {
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
  "The table shows the number of pizzas sold at a cafe each day. Day | Pizzas: Monday | 18, Tuesday | 24, Wednesday | 15, Thursday | 30, Friday | 27. How many more pizzas were sold on Thursday than on Wednesday?":
    {
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
  "The table shows points scored by four players in a trivia game. Player | Points: Ava | 32, Ben | 27, Cara | 41, Dan | 19. Together, how many points did the four players score?":
    {
      takeaway: "'Together' means add every row.",
      steps: ["32 + 27 = 59.", "59 + 41 = 100.", "100 + 19 = 119 points."],
      whyCorrect: "All four scores sum to 119.",
      distractors: {
        "0": "121 is an addition slip of 2; adding in pairs and re-checking catches it.",
        "2": "109 drops 10 somewhere in the running total.",
        "3": "100 is the total after only three players — Dan's 19 is still missing.",
      },
      commonMistake:
        "Losing the last row when adding a running total. Add in pairs (32 + 27 and 41 + 19, then 59 + 60) to make the count self-checking.",
    },
  "A line graph shows a seedling's height measured each week. Week 1: 3 cm, Week 2: 5 cm, Week 3: 8 cm, Week 4: 8 cm, Week 5: 12 cm. Between which two consecutive weeks did the height NOT change?":
    {
      takeaway:
        "No change means two consecutive readings are equal — a flat segment on the graph.",
      steps: [
        "Compare each neighboring pair: 3→5 rises, 5→8 rises.",
        "8→8 stays the same.",
        "8→12 rises.",
      ],
      whyCorrect:
        "Week 3 and Week 4 both read 8 cm, so the line is flat between them.",
      distractors: {
        "0": "Week 2 to Week 3 climbs from 5 to 8.",
        "1": "Week 1 to Week 2 climbs from 3 to 5.",
        "2": "Week 4 to Week 5 climbs from 8 to 12, the steepest rise of all.",
      },
      commonMistake:
        "Missing the NOT in the question and picking the biggest change. Capitalized words like NOT and EXCEPT flip what you are hunting for.",
    },
  "The table shows books read this month. Maria: 14, Devon: 9, Aisha: 17, Liam: 12. Who read the most books?":
    {
      takeaway: "'Who' wants the name attached to the largest value.",
      steps: [
        "Compare 14, 9, 17, 12.",
        "17 is the largest.",
        "17 belongs to Aisha.",
      ],
      whyCorrect: "Aisha's 17 books is the highest count in the table.",
      distractors: {
        "0": "Liam read 12.",
        "1": "Devon's 9 is the fewest, the answer to the opposite question.",
        "3": "Maria's 14 is second highest.",
      },
      commonMistake:
        "Picking the last row you read rather than comparing all of them. Scan the full column before answering.",
    },
  "A bar graph shows cups of coffee sold each day. Mon: 45, Tue: 38, Wed: 52, Thu: 41, Fri: 60. What is the difference between the highest and lowest daily sales?":
    {
      takeaway:
        "Difference between highest and lowest = the range. Find both extremes first.",
      steps: [
        "Highest: 60 on Friday.",
        "Lowest: 38 on Tuesday.",
        "Subtract: 60 − 38 = 22.",
      ],
      whyCorrect:
        "60 and 38 are the extremes of the five values, and they differ by 22.",
      distractors: {
        "0": "15 uses 45 as the lowest, but Tuesday's 38 is smaller.",
        "2": "60 is the highest value alone, with no subtraction done.",
        "3": "23 is an arithmetic slip; 60 − 38 is 22.",
      },
      commonMistake:
        "Grabbing the first small number instead of the smallest. Scan the whole set for both extremes before subtracting.",
    },
  "A scientist heats water and records its temperature every minute. On the graph, temperature is plotted on the y-axis and time on the x-axis. Which is the independent variable?":
    {
      takeaway:
        "The independent variable goes on the x-axis; the dependent one responds on the y-axis.",
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
  "A table lists points a team scored in 4 games: 78, 85, 92, 67. What is the total number of points scored?":
    {
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
  "A line graph shows weekly website visitors. Week 1: 200, Week 2: 350, Week 3: 380, Week 4: 500. Between which consecutive weeks did visitors increase the most?":
    {
      takeaway:
        "Biggest increase means the largest gap between neighboring weeks, not the largest value.",
      steps: [
        "Week 1→2: 350 − 200 = 150.",
        "Week 2→3: 380 − 350 = 30.",
        "Week 3→4: 500 − 380 = 120.",
        "The largest jump is 150.",
      ],
      whyCorrect:
        "The 150-visitor jump from Week 1 to Week 2 is bigger than either later increase.",
      distractors: {
        "0": "Week 3 to Week 4 rises 120 — large, but short of 150. It ends at the highest point, which makes it look biggest.",
        "2": "Week 1 to Week 4 is not a consecutive pair; it spans the whole graph.",
        "3": "Week 2 to Week 3 rises only 30, the smallest change.",
      },
      commonMistake:
        "Picking the segment that reaches the highest point. Steepness is about the size of the climb, not the height reached.",
    },
  "A study measures how plant height changes with the amount of fertilizer applied. In this study, which is the dependent variable?":
    {
      takeaway:
        "The dependent variable is the measured outcome — it depends on what the researcher changes.",
      steps: [
        "The researcher controls the fertilizer: that is the independent variable.",
        "Height is what gets measured in response: that is the dependent variable.",
      ],
      whyCorrect:
        "Plant height changes with fertilizer, so height is the outcome that depends on it.",
      distractors: {
        "0": "Sunlight is not part of the stated relationship; it would be held constant.",
        "1": "Number of days is not the variable being manipulated or measured here.",
        "2": "Fertilizer is the independent variable, the input the study varies.",
      },
      commonMistake:
        "Reversing the two. Phrase it as a sentence — height depends on fertilizer — and the dependent variable is the one before 'depends'.",
    },
  "A table shows monthly rainfall in inches. Jan: 3.2, Feb: 2.8, Mar: 4.1, Apr: 3.6. How much rain fell in March?":
    {
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
  "A table lists the daily high temperatures (°F) for five days: 72, 68, 81, 75, 79. What is the range of the temperatures?":
    {
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
  "A table shows weekly donations to a food bank. Week 1: $120, Week 2: $95, Week 3: $140, Week 4: $85. What is the total amount donated?":
    {
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
  "Gas exchange between air and blood occurs primarily in which structures of the lungs?":
    {
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
  "During quiet inhalation, the diaphragm contracts and moves downward. What effect does this have on thoracic volume and pressure?":
    {
      takeaway:
        "Volume up, pressure down, air in. Volume and pressure always move opposite ways.",
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
  "Gas exchange between inhaled air and the blood occurs across the walls of which structures?":
    {
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
  "When the diaphragm contracts and flattens during quiet breathing, what is the direct result inside the thoracic cavity?":
    {
      takeaway:
        "Diaphragm contracts → cavity enlarges → pressure drops → air enters.",
      steps: [
        "Contraction flattens the dome, enlarging the cavity.",
        "The larger space drops intrapulmonary pressure below atmospheric.",
        "Air flows down that pressure gradient into the lungs.",
      ],
      whyCorrect:
        "Increased thoracic volume drawing air in is the definition of inspiration.",
      distractors: {
        "0": "Pressure rising above atmospheric pushes air out — that is expiration.",
        "2": "Decreasing volume is what the relaxing diaphragm does, not the contracting one.",
        "3": "Passive recoil describes quiet exhalation, when the muscles let go.",
      },
      commonMistake:
        "Picturing the diaphragm rising when it contracts. Contraction pulls it down and flat; relaxation lets it dome back up.",
    },
  "Most carbon dioxide is transported in the blood from the tissues to the lungs in which chemical form?":
    {
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
  "After leaving the larynx, inhaled air travels directly into which structure?":
    {
      takeaway:
        "The path is nose → pharynx → larynx → trachea → bronchi → bronchioles → alveoli.",
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
  "Which sequence correctly orders the smallest air passages just before the gas exchange sacs?":
    {
      takeaway:
        "Airways branch large to small: bronchi → bronchioles → alveoli.",
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
  "Gas exchange in the lungs occurs across the thin walls of the alveoli because of which property of their surrounding structure?":
    {
      takeaway:
        "Alveoli work because a dense capillary net presses blood right against their thin walls.",
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
    takeaway:
      "Inhale: the diaphragm contracts and flattens, making the chest bigger.",
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
  "Most oxygen carried in the blood is transported by binding to which molecule?":
    {
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
  "Most carbon dioxide produced by body tissues is transported in the blood in what form?":
    {
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
  "The basic rhythm of breathing is regulated primarily by which part of the brain?":
    {
      takeaway:
        "The medulla oblongata in the brainstem sets the breathing rhythm.",
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
  "Which change in the blood most strongly stimulates an increase in breathing rate?":
    {
      takeaway:
        "Rising CO₂, not falling oxygen, is the main trigger to breathe harder.",
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
  "During quiet exhalation, what normally happens to the diaphragm and the volume of the chest cavity?":
    {
      takeaway:
        "Quiet exhalation is passive: the diaphragm relaxes, the cavity shrinks, air leaves.",
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
  "Which of the following structures are part of the upper respiratory tract? Select all that apply.":
    {
      takeaway:
        "Upper tract = above the trachea: nasal cavity, pharynx, larynx.",
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
  "Place the following structures in the correct order that inhaled air passes through them on its way to gas exchange.":
    {
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
  "Which gland is often called the 'master gland' because it secretes hormones that regulate several other endocrine glands?":
    {
      takeaway:
        "The pituitary directs other glands; the hypothalamus directs the pituitary.",
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
  "Which hormone, secreted by the pancreas, lowers blood glucose by promoting cellular glucose uptake?":
    {
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
  "The thyroid hormones thyroxine (T4) and triiodothyronine (T3) primarily regulate which body process?":
    {
      takeaway:
        "Thyroid hormones set the body's metabolic rate — the whole-body idle speed.",
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
  "Antidiuretic hormone (ADH) and oxytocin are stored and released by which structure?":
    {
      takeaway:
        "The posterior pituitary stores ADH and oxytocin; it does not make them.",
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
  "Calcitonin, a hormone that lowers blood calcium levels, is secreted by which gland?":
    {
      takeaway:
        "Calcitonin comes from the thyroid and lowers calcium; PTH comes from the parathyroids and raises it.",
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
  "During the fight-or-flight response, the adrenal medulla rapidly secretes which hormone to increase heart rate and mobilize energy?":
    {
      takeaway:
        "Adrenal medulla = epinephrine = fast response. Adrenal cortex = cortisol/aldosterone = slow.",
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
  "Which hormone lowers blood calcium levels by promoting calcium deposition into bone?":
    {
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
  "Which hormone, secreted by the pineal gland, helps regulate the sleep-wake cycle?":
    {
      takeaway:
        "The pineal gland releases melatonin in darkness to drive the sleep-wake cycle.",
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
  "Which gland is often called the master gland because it controls several other endocrine glands?":
    {
      takeaway:
        "The pituitary directs other glands; the hypothalamus directs the pituitary.",
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
  "When blood glucose levels rise after a meal, the pancreas releases which hormone to lower them?":
    {
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
  "When blood glucose drops too low, the pancreas secretes glucagon, which raises blood sugar mainly by which action?":
    {
      takeaway:
        "Glucagon tells the liver to break down glycogen and release glucose.",
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
  "The thyroid gland secretes hormones that primarily influence which body process?":
    {
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
  "The adrenal glands release adrenaline (epinephrine), which prepares the body for what type of response?":
    {
      takeaway:
        "Adrenaline drives fight-or-flight: heart and breathing up, energy released.",
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
  "The parathyroid glands secrete a hormone that regulates the blood level of which mineral?":
    {
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
  "In negative feedback control of hormones, a rising hormone level typically produces what effect?":
    {
      takeaway:
        "Negative feedback means the output shuts off its own production — like a thermostat.",
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
  "The pineal gland secretes melatonin, a hormone that primarily helps regulate which body function?":
    {
      takeaway:
        "The pineal gland releases melatonin in darkness to drive the sleep-wake cycle.",
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
  "Which of the following hormones are produced and secreted by the anterior pituitary gland? Select all that apply.":
    {
      takeaway:
        "Anterior pituitary MAKES its hormones; posterior only stores ADH and oxytocin from the hypothalamus.",
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
  "Which sequence correctly traces blood flow through the heart starting at the right atrium?":
    {
      takeaway:
        "Right side to the lungs, left side to the body — and blood never skips a chamber.",
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
  "Which structure of the heart's conduction system normally functions as the primary pacemaker that initiates each heartbeat?":
    {
      takeaway:
        "The SA node is the pacemaker; everything else relays what it starts.",
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
  "Which chamber of the heart pumps oxygenated blood into the aorta for distribution to the body?":
    {
      takeaway:
        "The left ventricle pumps to the whole body — the hardest job, so it has the thickest wall.",
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
  "The electrical impulse that normally initiates each heartbeat originates in which structure?":
    {
      takeaway:
        "The SA node is the pacemaker; everything else relays what it starts.",
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
  "The atrioventricular (AV) valve located between the left atrium and left ventricle is the:":
    {
      takeaway:
        "Left AV valve = bicuspid (mitral). Right AV valve = tricuspid.",
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
    takeaway:
      "Systole = ventricles contract, semilunar valves open, AV valves slam shut.",
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
  "Which valve prevents blood from flowing back into the left atrium when the left ventricle contracts?":
    {
      takeaway:
        "Left AV valve = bicuspid (mitral). Right AV valve = tricuspid.",
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
  "Blood leaving the right ventricle on its way to the lungs must pass through which valve?":
    {
      takeaway:
        "Each ventricle exits through its own semilunar valve: right → pulmonary, left → aortic.",
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
  "Cardiac output is the volume of blood the heart pumps each minute. Which formula correctly defines cardiac output?":
    {
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
  "During exercise, a person's heart rate increases while stroke volume stays the same. What happens to cardiac output?":
    {
      takeaway:
        "In CO = HR × SV, raising one factor while the other holds raises the product.",
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
    takeaway:
      "Atherosclerosis is plaque buildup that narrows and hardens arteries.",
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
  "A patient is told that the force of blood pushing against the walls of the arteries is consistently too high. Which condition does this describe?":
    {
      takeaway:
        "Blood pressure IS the force against artery walls, so persistently high force = hypertension.",
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
  "Which sequence correctly orders the three main steps of hemostasis after a blood vessel is injured?":
    {
      takeaway:
        "Hemostasis: spasm, then platelet plug, then coagulation — fastest response first.",
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
  "During the coagulation phase of hemostasis, which protein forms the mesh of threads that traps blood cells and stabilizes the clot?":
    {
      takeaway:
        "Fibrinogen (soluble) converts to fibrin (insoluble threads) to lock the clot together.",
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
  "Which of the following normally carry oxygenated blood? Select all that apply.":
    {
      takeaway:
        "Oxygenated blood runs lungs → pulmonary veins → left heart → aorta.",
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
  "Beginning with blood returning from the body, place the following in the correct order that a drop of blood passes through them.":
    {
      takeaway:
        "Right atrium → right ventricle → pulmonary arteries → left atrium → left ventricle.",
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
  "Which organ is the primary site for the absorption of nutrients into the bloodstream?":
    {
      takeaway:
        "The small intestine absorbs nutrients; its villi make the surface area enormous.",
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
  "Bile, which emulsifies fats, is produced by the liver and stored and concentrated in which organ?":
    {
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
  "The enzyme pepsin, which begins protein digestion in the stomach, requires which condition to function optimally?":
    {
      takeaway:
        "Pepsin needs strong stomach acid (about pH 1.5–2); pancreatic enzymes need alkaline conditions.",
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
  "Most absorption of nutrients into the bloodstream occurs in which segment of the digestive tract?":
    {
      takeaway:
        "The small intestine absorbs nutrients; its villi make the surface area enormous.",
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
  "The enzyme pepsin, which begins protein digestion, requires which environment to function effectively?":
    {
      takeaway:
        "Pepsin needs strong stomach acid; pancreatic enzymes need alkaline conditions.",
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
    takeaway:
      "Mouth → esophagus → stomach → small intestine → large intestine.",
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
  "Most of the chemical digestion and nutrient absorption of food takes place in which organ?":
    {
      takeaway:
        "The small intestine both finishes digestion and does most absorption.",
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
  "The tiny finger-like projections that line the small intestine and increase surface area for absorption are called what?":
    {
      takeaway:
        "Villi are the finger-like folds of the small intestine that multiply absorptive surface.",
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
  "Pepsin, an enzyme active in the acidic environment of the stomach, primarily digests which type of nutrient?":
    {
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
  "Bile, which helps break large fat droplets into smaller ones, is produced by which organ?":
    {
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
  "The pancreas aids digestion by releasing enzymes such as lipase and amylase into which structure?":
    {
      takeaway:
        "Pancreatic enzymes empty into the small intestine (the duodenum).",
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
  "A primary function of the large intestine is to do which of the following?":
    {
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
    takeaway:
      "The gallbladder stores and concentrates bile, releasing it when fat arrives.",
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
  "Which of the following are accessory organs of digestion rather than parts of the alimentary canal? Select all that apply.":
    {
      takeaway:
        "Accessory organs secrete into the tube; food never passes through them.",
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
  "Place the following organs of the alimentary canal in the correct order that food travels through them.":
    {
      takeaway:
        "Mouth → esophagus → stomach → small intestine → large intestine.",
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
    whyCorrect:
      "0.5 exceeds every other value once they are all written as decimals.",
    distractors: {
      "0": "1/3 ≈ 0.333 is the smallest of the four.",
      "2": "0.45 is close to 0.5 but still below it.",
      "3": "2/5 = 0.4, less than 0.45 and 0.5.",
    },
    commonMistake:
      "Comparing fractions and decimals by eye. A bigger denominator does not mean a bigger value — convert first.",
  },
  "Order these numbers from least to greatest: 3/5, 0.55, 7/10.": {
    takeaway:
      "Convert to decimals, order those, then translate back to the original forms.",
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
    takeaway:
      "Convert to decimals, then remember the ranking flips for negatives.",
    steps: [
      "−2/3 ≈ −0.667, −0.7, −5/8 = −0.625.",
      "Farther from zero is smaller: −0.7 < −0.667 < −0.625.",
      "In original form: −0.7, −2/3, −5/8.",
    ],
    whyCorrect:
      "−0.7 is the most negative, so it comes first in a least-to-greatest ordering.",
    distractors: {
      "0": "This starts with −5/8, which is the greatest, not the least.",
      "1": "−2/3 ≈ −0.667 is not the smallest; −0.7 is.",
      "2": "−5/8 = −0.625 is greater than −2/3, so it cannot sit in the middle.",
    },
    commonMistake:
      "Ordering the digits as if positive. Sort the absolute values, then reverse the whole list for negatives.",
  },
  "Which value lies between 1/4 and 1/2?": {
    takeaway:
      "'Between' means strictly greater than the lower bound and less than the upper.",
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
    whyCorrect:
      "−1/4 is nearest zero and −0.75 is farthest, so this order runs correctly downward.",
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
    whyCorrect:
      "−0.7 is the most negative value in the list, so it is the least.",
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
    takeaway:
      "With mixed numbers, convert the fraction part and keep the whole number.",
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
    whyCorrect:
      "3/5 and 0.6 are two ways of writing the same number, so they are equal.",
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
    takeaway:
      "Percents, fractions, and decimals must all become decimals before they can be ranked.",
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
  "A recipe uses flour and sugar in a ratio of 5:2. If 15 cups of flour are used, how many cups of sugar are needed?":
    {
      takeaway:
        "Find the scale factor from the known part, then apply it to the other part.",
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
  "On a map, 1 inch represents 25 miles. Two cities are 4.5 inches apart on the map. How many actual miles apart are they?":
    {
      takeaway: "Map distance × scale = real distance.",
      steps: [
        "Each inch stands for 25 miles.",
        "Multiply: 4.5 × 25 = 112.5 miles.",
      ],
      whyCorrect: "4.5 inches at 25 miles per inch is 112.5 miles.",
      commonMistake:
        "Dividing instead of multiplying. Going from map to real world scales UP, so the answer must be larger than the map figure.",
    },
  "A car travels 180 miles in 3 hours at a constant speed. What is its average speed?":
    {
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
  "A recipe uses flour and sugar in a ratio of 3 cups flour to 2 cups sugar. If 12 cups of flour are used, how many cups of sugar are needed?":
    {
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
    takeaway:
      "Divide to find the price of one, multiply to find the price of many.",
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
  "At a clinic, 3 nurses care for 12 patients. At the same ratio, how many nurses are needed for 28 patients?":
    {
      takeaway:
        "Set up a proportion with matching units in matching positions.",
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
  "A recipe that serves 6 people uses 2 1/4 cups of flour. How much flour is needed to serve 10 people?":
    {
      takeaway:
        "Per-serving amount first, then multiply by the new number of servings.",
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
  "On a map, 1 inch represents 25 miles. Two cities are 4.5 inches apart on the map. What is the actual distance between them?":
    {
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
  "In a class the ratio of boys to girls is 5:3. If there are 40 students total, how many are girls?":
    {
      takeaway:
        "With a total, add the ratio parts first — the sum is the number of shares.",
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
  "If 8 identical widgets cost $20, how much do 14 widgets cost at the same rate?":
    {
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
  "A seedling grows from 12 cm to 27 cm over 5 weeks. What is its average rate of growth per week?":
    {
      takeaway:
        "Rate of change = (ending − starting) ÷ time. The change, not the final value.",
      steps: ["Growth: 27 − 12 = 15 cm.", "Per week: 15 ÷ 5 = 3 cm per week."],
      whyCorrect: "Growing 15 cm over 5 weeks averages 3 cm each week.",
      distractors: {
        "0": "7.8 does not follow from these numbers.",
        "1": "5.4 divides the final height 27 by 5, ignoring that the plant started at 12.",
        "2": "2.4 divides the starting height 12 by 5.",
      },
      commonMistake:
        "Dividing the ending value by the time. Rate of change needs the DIFFERENCE first — the plant did not grow 27 cm, it grew 15.",
    },
  "A model car is built at a scale of 1:18. The real car is 4.5 meters long. How long is the model?":
    {
      takeaway: "Going from real to model means dividing by the scale.",
      steps: [
        "A 1:18 scale means the model is 1/18 of real size.",
        "Divide: 4.5 ÷ 18 = 0.25 m.",
      ],
      whyCorrect:
        "0.25 m (25 cm) is a believable model size, and 0.25 × 18 = 4.5 confirms it.",
      distractors: {
        "0": "81 m multiplies instead of dividing — that would be a car longer than a building.",
        "1": "0.225 m divides by 20 instead of 18.",
        "2": "0.40 m does not follow from dividing 4.5 by 18.",
      },
      commonMistake:
        "Multiplying by the scale factor. Check the direction: a model is smaller than the real thing, so the answer must shrink.",
    },
  "A car travels 150 miles on 5 gallons of gas. At the same rate, how many miles can it travel on 8 gallons of gas? Enter a number.":
    {
      takeaway:
        "Find miles per gallon, then multiply by the gallons available.",
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
  "Which organelle is the primary site of ATP production in eukaryotic cells?":
    {
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
  "A student observes a cell that has a rigid cell wall, a large central vacuole, and chloroplasts. This cell is most likely from which type of organism?":
    {
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
  "Which structure controls the passage of materials into and out of the cell while separating the cytoplasm from the external environment?":
    {
      takeaway:
        "The plasma membrane is the selectively permeable boundary of the cell.",
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
  "Rough endoplasmic reticulum is distinguished from smooth endoplasmic reticulum primarily by the presence of which feature, which gives it its function?":
    {
      takeaway:
        "Rough ER is rough because ribosomes stud it — so it handles proteins.",
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
  "A researcher examines a cell and finds it has no membrane-bound nucleus, a single circular chromosome, and a peptidoglycan cell wall. Into which category does this cell best fit?":
    {
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
  "A liver cell devotes many resources to detoxifying drugs and synthesizing lipids. Which organelle would be especially abundant to support these specific functions?":
    {
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
  "In the levels of biological organization, which sequence is arranged correctly from smallest to largest?":
    {
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
  "During which phase of mitosis do the chromosomes line up along the middle of the cell?":
    {
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
  "A diploid parent cell with 46 chromosomes divides by mitosis. How do the resulting daughter cells compare to the parent cell?":
    {
      takeaway:
        "Mitosis: 2 cells, full chromosome count, genetically identical.",
      steps: [
        "Mitosis divides once, producing two cells.",
        "Chromosomes are copied first, so each daughter keeps all 46.",
        "No crossing over occurs, so both are identical to the parent.",
      ],
      whyCorrect:
        "Two identical diploid cells is the definition of a mitotic division.",
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
  "A human cell with 46 chromosomes undergoes meiosis. How many chromosomes will each resulting gamete contain?":
    {
      takeaway: "Meiosis halves the chromosome number: 46 → 23.",
      steps: [
        "Meiosis reduces diploid to haploid.",
        "Half of 46 is 23 chromosomes per gamete.",
        "Fertilization joins two gametes: 23 + 23 = 46 restored.",
      ],
      whyCorrect:
        "Each human gamete carries 23 chromosomes, one from each pair.",
      distractors: {
        "0": "92 doubles the count instead of halving it.",
        "1": "12 does not follow from halving 46.",
        "3": "46 is the diploid parent count, unchanged — that would be mitosis.",
      },
      commonMistake:
        "Answering 46 out of habit. The whole point of meiosis is that the gamete carries half.",
    },
  "During meiosis, homologous chromosomes pair up and exchange segments of genetic material. What is the name and effect of this process?":
    {
      takeaway:
        "Crossing over swaps segments between homologous chromosomes, creating variation.",
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
  "Which of the following structures are typically found in plant cells but NOT in animal cells? Select all that apply.":
    {
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
    takeaway:
      "Read the decimal by its place value, write it over that place, then reduce.",
    steps: ["0.6 is six tenths: 6/10.", "Divide top and bottom by 2: 3/5."],
    whyCorrect:
      "3/5 = 0.6, and 3 and 5 share no common factor, so it is fully reduced.",
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
    steps: ["45% = 45/100.", "Both divide by 5: 9/20."],
    whyCorrect: "9/20 = 0.45 = 45%, and 9 and 20 share no common factor.",
    commonMistake:
      "Reducing by 2 first and getting stuck on a decimal. 45 is odd, so look for 5 as the common factor instead.",
  },
  "Write 0.625 as a fraction in simplest form.": {
    takeaway:
      "Three decimal places means thousandths — write it over 1000, then reduce.",
    steps: ["0.625 = 625/1000.", "Divide both by 125: 5/8."],
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
    steps: ["7 ÷ 20 = 0.35.", "0.35 × 100 = 35%."],
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
    takeaway:
      "Percent → decimal means divide by 100, moving the point two places LEFT.",
    steps: [
      "Start at 0.4.",
      "Move the decimal two places left, filling with zeros: 0.004.",
    ],
    whyCorrect:
      "0.4% is four tenths of one percent, a very small quantity — 0.004.",
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
    whyCorrect:
      "3/4 is three quarters, and a quarter is 25%, so three of them is 75%.",
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
    takeaway:
      "Decimal → percent: multiply by 100, moving the point two places RIGHT.",
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
    takeaway:
      "Look at the digit one place to the right of the target, and nothing further.",
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
  "Estimate the product 38 × 21 by first rounding each factor to the nearest ten.":
    {
      takeaway:
        "Round first, then multiply — the estimate is the goal, not the exact answer.",
      steps: ["38 rounds to 40.", "21 rounds to 20.", "40 × 20 = 800."],
      whyCorrect: "Rounding both factors to the nearest ten gives 800.",
      distractors: {
        "0": "600 rounds 38 down to 30 instead of up to 40.",
        "2": "798 is the exact product — correct arithmetic, but the question asked for the estimate.",
        "3": "760 rounds only one factor.",
      },
      commonMistake:
        "Computing the exact product. When a question says 'estimate by rounding', the exact answer is deliberately offered as a trap.",
    },
  "A car travels 296 miles on 11.8 gallons of gas. Estimate the miles per gallon by rounding to convenient numbers.":
    {
      takeaway: "Round to numbers that divide cleanly, then divide.",
      steps: [
        "296 rounds to 300.",
        "11.8 rounds to 12.",
        "300 ÷ 12 = 25 miles per gallon.",
      ],
      whyCorrect:
        "300 and 12 were chosen because they divide evenly, giving a clean 25.",
      distractors: {
        "0": "30 would require dividing 300 by 10, rounding 11.8 too aggressively.",
        "2": "27 is closer to the exact value but is not what the rounded numbers produce.",
        "3": "20 would come from dividing 300 by 15.",
      },
      commonMistake:
        "Rounding to the 'nearest' number rather than a convenient one. Estimation rewards numbers that divide cleanly — 12 beats 10 here because 300 ÷ 12 is exact.",
    },
  "Estimate the product 48 × 21 by first rounding each factor to the nearest ten.":
    {
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
  "A shopper buys items costing $12.89, $7.45, and $4.99. Estimate the total by rounding each price to the nearest dollar.":
    {
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
    takeaway:
      "Hundredths is the second decimal place; check the third to decide.",
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
  "A stadium reported 4,728 fans at a game. Rounded to the nearest hundred, about how many fans attended?":
    {
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
  "A runner finished a race in 6.847 minutes. Rounded to the nearest tenth, what is this time?":
    {
      takeaway:
        "Tenths is the first decimal place; check the hundredths to decide.",
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
  "A shopper buys items costing $12.89, $7.45, and $19.20. Estimate the total by rounding each price to the nearest dollar.":
    {
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
  "A city has a population of 35,492. Rounded to the nearest thousand, what is this population?":
    {
      takeaway: "For thousands, check the hundreds digit.",
      steps: [
        "Thousands digit: 5 in 35,492.",
        "Hundreds digit: 4, less than 5.",
        "Round down: 35,000.",
      ],
      whyCorrect:
        "35,492 is just under the halfway point of 35,500, so it rounds down.",
      distractors: {
        "0": "36,000 rounds up, but 492 is less than half of a thousand.",
        "2": "35,500 is the halfway mark itself, not a rounded thousand.",
        "3": "34,000 rounds down past the correct thousand.",
      },
      commonMistake:
        "Seeing 492 and rounding it to 500, then rounding up. Judge the hundreds digit as it is written — 4 means down.",
    },
  "A warehouse stacks boxes in 18 rows of 42 boxes. Estimate the total number of boxes by rounding each factor to the nearest ten.":
    {
      takeaway: "Round both factors to the nearest ten, then multiply.",
      steps: ["18 rounds to 20.", "42 rounds to 40.", "20 × 40 = 800."],
      whyCorrect:
        "800 is the estimate the rounding produces; the exact product is 756.",
      distractors: {
        "0": "900 does not follow from 20 × 40.",
        "1": "760 is near the exact product but not the rounded estimate.",
        "2": "600 rounds 18 down to 10 rather than up to 20.",
      },
      commonMistake:
        "Rounding 18 down to 10. The tens digit governs: 18 is 2 from 20 and 8 from 10.",
    },
  "A scale reads 0.0568 kg. Rounded to the nearest hundredth, what is this mass?":
    {
      takeaway:
        "Hundredths is the second decimal place, even when it is a zero.",
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
  "A theater has 28 rows with 31 seats in each row. Estimate the total number of seats by rounding each number to the nearest ten.":
    {
      takeaway: "Round both numbers to the nearest ten, then multiply.",
      steps: ["28 rounds to 30.", "31 rounds to 30.", "30 × 30 = 900."],
      whyCorrect:
        "900 is the estimate; the exact total is 868, close enough to confirm it.",
      distractors: {
        "0": "1,000 would need both factors near 30 and 33, overshooting.",
        "2": "870 is near the exact product, not the rounded estimate.",
        "3": "800 rounds 31 down to 20 or 28 down to 20.",
      },
      commonMistake:
        "Rounding 31 down to 30 but 28 down to 20. Both are nearest 30 — check each independently.",
    },
  "A package weighs 149.5 ounces. Rounded to the nearest whole ounce, what is its weight?":
    {
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
  "A gas tank holds 14.8 gallons, and gas costs $3.89 per gallon. Estimate the cost to fill the tank by rounding each value to the nearest whole number.":
    {
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
  "In standard anatomical position, which directional term correctly describes the position of the wrist relative to the elbow?":
    {
      takeaway:
        "Distal = farther from the trunk along a limb; proximal = closer.",
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
  "A plane that divides the body into superior and inferior portions is called the:":
    {
      takeaway:
        "Transverse = top/bottom, sagittal = left/right, frontal = front/back.",
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
    takeaway:
      "The diaphragm is the floor of the thoracic cavity and roof of the abdominal cavity.",
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
  "A clinician notes that the wrist is located distal to the elbow. Which relationship does the term distal describe?":
    {
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
  "A plane that divides the body into superior and inferior portions is referred to as which plane?":
    {
      takeaway:
        "Transverse = top/bottom, sagittal = left/right, frontal = front/back.",
      whyCorrect:
        "The transverse plane makes the horizontal cut into upper and lower portions.",
      distractors: {
        "1": "The midsagittal plane divides the body into equal left and right halves.",
        "2": "The frontal plane divides front from back.",
        "3": "A sagittal plane divides left from right.",
      },
      commonMistake:
        "Mixing up frontal and transverse. Frontal separates front from back (it faces you); transverse cuts across horizontally.",
    },
  "Which body cavity is bounded inferiorly by the diaphragm and contains the heart and lungs?":
    {
      takeaway:
        "Thoracic cavity = chest, above the diaphragm, holding heart and lungs.",
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
  "When a person becomes overheated, sweat glands activate and blood vessels in the skin dilate to release heat, returning body temperature toward its set point. This response is the best example of which physiological principle?":
    {
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
  "Which sequence correctly lists the levels of structural organization in the human body from simplest to most complex?":
    {
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
  "The heart and lungs are protected by the rib cage and are located in which body cavity?":
    {
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
  "Using the standard nine-region scheme of the abdomen, which region lies directly superior to the umbilical region?":
    {
      takeaway:
        "The central column runs epigastric (top), umbilical (middle), hypogastric (bottom).",
      steps: [
        "The umbilical region is the center, around the navel.",
        "Directly above it is the epigastric region — 'epi' meaning upon or above, 'gastric' the stomach.",
      ],
      whyCorrect:
        "Epigastric is the central region immediately above the umbilical region.",
      distractors: {
        "0": "Hypogastric is directly BELOW the umbilical region — 'hypo' means under.",
        "1": "The left iliac region is lateral and inferior, at the hip.",
        "3": "The right lumbar region is lateral, beside the umbilical region.",
      },
      commonMistake:
        "Confusing the epi-/hypo- prefixes. Epi means above and hypo means below — the same prefixes that distinguish epidermis from hypodermis.",
    },
  "Which of the four primary tissue types covers body surfaces and lines cavities and organs?":
    {
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
  "Which primary tissue type includes bone, blood, and tendons and functions to support, bind, and protect other tissues?":
    {
      takeaway:
        "Connective tissue is the diverse support category — bone, blood, cartilage, tendons, fat.",
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
  "The regulation of body temperature, in which a rise in temperature triggers sweating to bring the temperature back toward normal, is an example of which type of homeostatic control?":
    {
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
  "Which physiological process is an example of positive feedback, in which the response intensifies the original stimulus?":
    {
      takeaway:
        "Positive feedback amplifies until an endpoint — childbirth and clotting are the classic cases.",
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
  "Which layer of the skin is the outermost and forms a protective barrier against the environment?":
    {
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
  "When body temperature rises, which integumentary response helps cool the body?":
    {
      takeaway:
        "Cooling = sweat plus vasodilation. Warming = vasoconstriction plus goosebumps.",
      steps: [
        "Sweat glands release fluid that carries heat away as it evaporates.",
        "Dermal vessels dilate, bringing warm blood to the surface to shed heat.",
      ],
      whyCorrect:
        "Both mechanisms move heat out of the body, which is what cooling requires.",
      distractors: {
        "0": "Constricting dermal vessels keeps blood away from the surface, conserving heat.",
        "1": "Arrector pili contraction raises hairs to trap air — a heat-conserving response.",
        "3": "Decreased skin blood flow retains heat rather than releasing it.",
      },
      commonMistake:
        "Choosing vasoconstriction because it sounds active. Ask which direction heat moves: to cool down, blood must come TO the surface.",
    },
  "Which layer of the epidermis contains actively dividing stem cells that continually replace the cells above it?":
    {
      takeaway:
        "Stratum basale is the deepest epidermal layer, where new cells are born.",
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
  "Exposure of the skin to ultraviolet radiation triggers the initial synthesis of which vitamin?":
    {
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
  "Which type of sweat gland is distributed over most of the body surface and is most directly responsible for cooling the body through evaporation?":
    {
      takeaway:
        "Eccrine glands are everywhere and cool you; apocrine are localized and odor-related.",
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
  "Exposure of the skin to sunlight allows the body to begin producing which vitamin?":
    {
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
  "Which pigment is mainly responsible for determining the color of a person's skin?":
    {
      takeaway:
        "Melanin, made by melanocytes, gives skin its color and absorbs UV.",
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
  "When body temperature rises, sweat glands in the skin help cool the body primarily by which mechanism?":
    {
      takeaway:
        "Evaporation is what cools — the sweat must dry to remove heat.",
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
  "Which protein gives the outer skin, hair, and nails their toughness and helps make them water-resistant?":
    {
      takeaway:
        "Keratin is the tough structural protein of skin, hair, and nails.",
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
  "Sebaceous glands in the skin secrete an oily substance. What is the main function of this secretion?":
    {
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
  "In which skin layer are blood vessels, nerve endings, hair follicles, and many glands located?":
    {
      takeaway:
        "The dermis holds the working parts; the epidermis has no blood vessels at all.",
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
  "The hypodermis, the deepest layer associated with the skin, is largely composed of fat. Which function does this fat layer mainly provide?":
    {
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
  "What is the functional unit of the kidney responsible for filtering blood and forming urine?":
    {
      takeaway:
        "The nephron is the kidney's functional unit; the glomerulus is just its filter.",
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
  "Which sequence correctly describes the path of urine after it is formed in the kidney?":
    {
      takeaway: "Kidney → ureter → bladder → urethra.",
      steps: [
        "Urine forms in the kidney's nephrons.",
        "The ureters carry it down to the bladder.",
        "The bladder stores it.",
        "The urethra carries it out of the body.",
      ],
      whyCorrect:
        "This is the only order in which storage comes before the exit tube.",
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
  "In the nephron, the initial filtration of blood plasma occurs as fluid passes from the glomerulus into which structure?":
    {
      takeaway:
        "Glomerulus filters INTO the glomerular (Bowman) capsule that surrounds it.",
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
  "Antidiuretic hormone (ADH) helps conserve body water primarily by increasing water reabsorption in which part of the nephron?":
    {
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
    takeaway:
      "Ureters run kidneys → bladder; the urethra runs bladder → outside.",
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
  "During urine formation, the first step occurs in the glomerulus. What is this step called?":
    {
      takeaway:
        "Urine formation: filtration, then reabsorption, then secretion.",
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
  "When a person becomes dehydrated, antidiuretic hormone (ADH) is released and acts on the kidneys to do what?":
    {
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
  "During reabsorption in the nephron, which of the following normally moves from the filtrate back into the blood?":
    {
      takeaway:
        "Reabsorption reclaims the useful things: glucose, water, ions.",
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
  "The hormone aldosterone helps regulate fluid and electrolyte balance by causing the kidneys to reabsorb more of which ion?":
    {
      takeaway:
        "Aldosterone saves sodium (and water follows it), while dumping potassium.",
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
  "Besides removing wastes, the kidneys play a major role in which of the following?":
    {
      takeaway:
        "Kidneys balance water and electrolytes, not just filter wastes.",
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
    takeaway:
      "Sperm are MADE in the seminiferous tubules of the testes; everything else stores, moves, or adds fluid.",
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
  "In the female reproductive system, fertilization of an egg by a sperm normally occurs in the:":
    {
      takeaway:
        "Fertilization happens in the fallopian tube; implantation happens in the uterus.",
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
  "In the male reproductive system, sperm cells are produced within which structures?":
    {
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
  "Following ovulation, fertilization of a secondary oocyte by a sperm cell normally occurs in which structure?":
    {
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
  "A surge in which hormone directly triggers ovulation in the menstrual cycle?":
    {
      takeaway:
        "The LH surge triggers ovulation. FSH grows the follicle beforehand.",
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
    whyCorrect:
      "The testes are the male gonads, producing both sperm and testosterone.",
    distractors: {
      "0": "The epididymis stores and matures sperm.",
      "1": "The seminal vesicles secrete fluid for semen.",
      "3": "The prostate secretes fluid for semen.",
    },
    commonMistake:
      "Picking a gland because it contributes to semen. Semen is mostly fluid from glands; only the testes make the sperm in it.",
  },
  "A sudden surge in luteinizing hormone (LH) during the menstrual cycle directly triggers which event?":
    {
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
    takeaway:
      "Fertilization in the fallopian tube; implantation in the uterus.",
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
  "After ovulation, the corpus luteum secretes a hormone that maintains the uterine lining. Which hormone is this?":
    {
      takeaway:
        "The corpus luteum makes progesterone, which holds the endometrium in place.",
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
  "Which female organ produces eggs and the hormones estrogen and progesterone?":
    {
      takeaway:
        "The ovaries are the female gonads: eggs plus estrogen and progesterone.",
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
  "A researcher notes that a hormone from the anterior pituitary stimulates the testes to produce testosterone. Which hormone is responsible?":
    {
      takeaway:
        "LH stimulates testosterone in males; FSH supports sperm production.",
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
  "If fertilization does NOT occur during a typical menstrual cycle, which event happens at the end of the cycle?":
    {
      takeaway:
        "No fertilization → corpus luteum degenerates → progesterone falls → lining sheds.",
      steps: [
        "Without a pregnancy signal, the corpus luteum breaks down.",
        "Progesterone drops sharply.",
        "The endometrium can no longer be maintained and is shed as menstrual flow.",
      ],
      whyCorrect:
        "Menstruation is the direct consequence of progesterone withdrawal.",
      distractors: {
        "0": "Implantation requires fertilization, which the question rules out.",
        "1": "Estrogen rises in the FIRST half of the cycle, not at the end.",
        "2": "The corpus luteum degenerates rather than reforming; a new one follows the next ovulation.",
      },
      commonMistake:
        "Thinking the lining is shed because it is old. It is shed because the hormone maintaining it disappears.",
    },
  "Which structure serves as the site where a fertilized egg implants and a fetus develops?":
    {
      takeaway:
        "The uterus is where implantation and fetal development happen.",
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
  "During the first half of the menstrual cycle, follicle-stimulating hormone primarily promotes which process?":
    {
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
  "Which neurotransmitter is released at the neuromuscular junction to trigger skeletal muscle contraction?":
    {
      takeaway:
        "Acetylcholine is the neurotransmitter at every skeletal neuromuscular junction.",
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
  "During skeletal muscle contraction, the direct trigger that exposes the binding sites on actin is the release of which ion into the sarcoplasm?":
    {
      takeaway:
        "Calcium uncovers actin's binding sites. Sodium and potassium only carry the action potential.",
      steps: [
        "The action potential reaches the sarcoplasmic reticulum.",
        "Calcium floods into the sarcoplasm.",
        "Calcium binds troponin, which shifts tropomyosin off actin's binding sites.",
        "Myosin heads can now attach, and contraction begins.",
      ],
      whyCorrect:
        "Calcium is the ion that physically unblocks the binding sites.",
      distractors: {
        "0": "Sodium rushing in creates the action potential but does not expose binding sites.",
        "1": "Chloride contributes to membrane stability, not to contraction.",
        "3": "Potassium leaving the cell repolarizes the membrane.",
      },
      commonMistake:
        "Answering sodium because it drives the nerve impulse. Sodium carries the SIGNAL; calcium carries out the ACTION.",
    },
  "Which part of a neuron typically receives incoming signals from other neurons?":
    {
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
  "Which neurotransmitter is released at the neuromuscular junction to stimulate contraction of skeletal muscle?":
    {
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
  "During skeletal muscle contraction, the release of which ion from the sarcoplasmic reticulum exposes the binding sites needed for the cross-bridge cycle?":
    {
      takeaway:
        "Calcium from the sarcoplasmic reticulum exposes actin's binding sites.",
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
  "Which type of muscle tissue is under voluntary control and attaches to bones to produce movement?":
    {
      takeaway:
        "Skeletal: voluntary and striated. Cardiac: involuntary but striated. Smooth: involuntary, not striated.",
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
    takeaway:
      "Receptor → sensory neuron → interneuron → motor neuron → effector.",
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
  "In a myelinated axon, the action potential appears to jump from one node of Ranvier to the next. What is the main benefit of this saltatory conduction?":
    {
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
  "The gaps in the myelin sheath where the axon membrane is exposed are called the":
    {
      takeaway:
        "Nodes of Ranvier are the gaps in myelin where the impulse regenerates.",
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
  "In a withdrawal reflex, such as pulling the hand away from a hot stove, which cells serve as the effector that produces the response?":
    {
      takeaway:
        "The effector is whatever carries out the response — usually skeletal muscle.",
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
  "Which muscle type is striated and under voluntary control, allowing a person to deliberately move the limbs?":
    {
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
  "Which muscle type is involuntary and non-striated and is found in the walls of hollow organs such as the stomach and intestines?":
    {
      takeaway:
        "Smooth muscle: involuntary, non-striated, in the walls of hollow organs.",
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
  "When the biceps brachii contracts, what action does it produce at the elbow joint?":
    {
      takeaway:
        "The biceps flexes the elbow; its antagonist, the triceps, extends it.",
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
  "Place the components of a simple reflex arc in the correct order that a nerve signal travels through them.":
    {
      takeaway:
        "Receptor → sensory neuron → integration center → motor neuron → effector.",
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
    takeaway:
      "Axial = central axis: skull, vertebral column, rib cage, sternum.",
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
  "Which bone cells are responsible for breaking down bone matrix and releasing stored calcium into the blood?":
    {
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
  "The joint at the elbow that allows flexion and extension in a single plane is best classified as which type of joint?":
    {
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
  "Which of the following bones is part of the axial skeleton rather than the appendicular skeleton?":
    {
      takeaway:
        "Axial = skull, spine, ribs, sternum. Appendicular = limbs and girdles.",
      whyCorrect:
        "The sternum is part of the rib cage, squarely in the axial skeleton.",
      distractors: {
        "0": "The clavicle is part of the shoulder girdle, which attaches the arm — appendicular.",
        "1": "The femur is a leg bone.",
        "2": "The humerus is an arm bone.",
      },
      commonMistake:
        "Counting the clavicle as axial because it sits near the chest. Girdles attach limbs, so they are appendicular despite being close to the trunk.",
    },
  "The shoulder and hip joints allow rotation and movement in many directions. What type of joint are they?":
    {
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
  "The elbow allows the forearm to bend and straighten in a single plane, much like a door. This is an example of which type of joint?":
    {
      takeaway: "Bend and straighten in one plane = hinge joint.",
      whyCorrect:
        "The elbow and knee are the classic hinge joints, moving in flexion and extension only.",
      distractors: {
        "0": "Ball-and-socket joints move in all planes.",
        "1": "Pivot joints rotate rather than bend.",
        "3": "Saddle joints, like the thumb's base, move in two planes.",
      },
      commonMistake:
        "Reading past the door analogy. The stem hands you the answer — a door hinge is a hinge joint.",
    },
  "The joint between the first and second cervical vertebrae lets the head rotate from side to side, as in shaking the head to signal no. Which type of joint makes this rotation possible?":
    {
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
  "Which of the following bones is part of the appendicular skeleton rather than the axial skeleton?":
    {
      takeaway:
        "Appendicular = appendages: limbs and the girdles attaching them.",
      whyCorrect: "The femur is the thigh bone, part of the lower limb.",
      distractors: {
        "0": "The skull is axial.",
        "1": "Vertebrae form the spinal column — axial.",
        "2": "The sternum is part of the rib cage — axial.",
      },
      commonMistake:
        "Reversing the two divisions. Appendicular shares a root with appendage — if it hangs off the central axis, it is appendicular.",
    },
  "Red bone marrow, found within certain bones, performs which important function?":
    {
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

  // Physical properties and changes of matter.
  // Two ideas carry this whole skill: (1) a change is physical if the substance
  // is still the same substance afterward, chemical if a new one formed; and
  // (2) heat properties (specific heat, conduction) describe how readily a
  // material takes on or passes along energy, not how hot it is.
  "Which of the following is a physical change rather than a chemical change?":
    {
      takeaway:
        "A physical change alters form or state; the substance itself is unchanged.",
      whyCorrect:
        "Melted ice is still water — H2O in a different state. Nothing new was made, so the change is physical.",
      distractors: {
        "0": "Rust is iron oxide, a new compound that was not there before — chemical.",
        "2": "Souring is bacteria converting lactose into lactic acid, producing new substances — chemical.",
        "3": "Burning wood yields ash, smoke, and gases that cannot be turned back into wood — chemical.",
      },
      commonMistake:
        "Judging by how dramatic the change looks. Melting is unremarkable and physical; souring milk looks mild and is chemical. Ask only whether a new substance appeared.",
    },
  "The direct change of a substance from a solid to a gas, without passing through the liquid state, is called what?":
    {
      takeaway: "Solid straight to gas is sublimation.",
      whyCorrect:
        "Sublimation names the solid-to-gas transition that skips the liquid stage, as dry ice does at room temperature.",
      distractors: {
        "0": "Condensation is the reverse direction and the wrong pair of states: gas to liquid.",
        "1": "Evaporation is liquid to gas, so it passes through exactly the state the question excludes.",
        "3": "Freezing is liquid to solid.",
      },
      commonMistake:
        "Grabbing whichever term sounds like it involves gas. Track both the starting state and the ending state before choosing.",
    },
  "Which of the following is a chemical property of a substance?": {
    takeaway:
      "A chemical property can only be observed by changing the substance into something else.",
    whyCorrect:
      "Flammability describes whether a substance will burn — and finding out means combusting it into new products. That makes it chemical.",
    distractors: {
      "0": "Boiling point is measured while the substance stays itself, only shifting state — physical.",
      "1": "Color is observed by looking; the substance is untouched — physical.",
      "2": "Density is mass over volume, measurable without altering the substance — physical.",
    },
    commonMistake:
      "Treating anything measured in a lab as chemical. The test is whether measuring it destroys or transforms the sample.",
  },
  "In which state of matter do particles have the most kinetic energy and the greatest freedom of movement?":
    {
      takeaway:
        "Gas particles have the most energy and the most freedom; solids the least.",
      whyCorrect:
        "In a gas, particles have broken free of one another entirely, moving fast and independently in all directions.",
      distractors: {
        "0": "Liquid particles slide past each other but stay in contact — more freedom than a solid, less than a gas.",
        "2": "Solid particles are locked in place and can only vibrate.",
        "3": "The states differ precisely in particle energy; that difference is what makes them different states.",
      },
      commonMistake:
        "Thinking of gases as 'empty' and therefore low-energy. The particles are sparse but individually the fastest-moving of the three.",
    },
  "Which of the following is a physical change?": {
    takeaway: "No new substance formed means the change is physical.",
    whyCorrect:
      "Ice and liquid water are the same compound in two states, so melting is a physical change.",
    distractors: {
      "0": "Ash and smoke are new substances; the wood is chemically gone.",
      "1": "Rusting converts iron into iron oxide.",
      "2": "The fizzing is carbon dioxide gas being generated — a new substance, so a chemical change.",
    },
    commonMistake:
      "Reading bubbles or fizzing as merely physical. Gas that is being produced (rather than escaping from solution) signals a chemical reaction.",
  },
  "Density is best classified as which type of property?": {
    takeaway:
      "Density is physical and intensive: it does not depend on how much of the substance you have.",
    whyCorrect:
      "Every sample of a given substance at a given temperature has the same density, and measuring it does not change the substance.",
    distractors: {
      "0": "Cutting a sample in half halves both mass and volume, so their ratio is unchanged.",
      "1": "No reaction is needed — you can weigh and measure the sample as it is.",
      "3": "Extensive properties like mass and volume scale with sample size; density, their ratio, does not.",
    },
    commonMistake:
      "Confusing intensive with extensive. Mass and volume are extensive; a ratio of two extensive properties comes out intensive.",
  },
  "When solid carbon dioxide (dry ice) turns directly into a gas without first becoming a liquid, this phase change is called":
    {
      takeaway: "Sublimation: solid to gas, no liquid in between.",
      whyCorrect:
        "Dry ice passes straight from solid to gaseous CO2, which is the definition of sublimation — and it stays CO2 throughout, so it is a physical change.",
      distractors: {
        "1": "Vaporization starts from a liquid, the state this transition skips.",
        "2": "Condensation runs gas to liquid — the opposite direction.",
        "3": "Deposition is the reverse of sublimation: gas directly to solid.",
      },
      commonMistake:
        "Mixing up sublimation and deposition. They are the same shortcut traveled in opposite directions; sublimation goes up in energy, deposition down.",
    },
  "Specific heat is the amount of heat needed to raise the temperature of 1 gram of a substance by 1 degree Celsius. A substance with a high specific heat will do which of the following?":
    {
      takeaway:
        "High specific heat means a lot of heat buys only a little temperature change.",
      whyCorrect:
        "The definition sets heat per degree, so a high value means many joules are required per degree — the substance resists changing temperature.",
      distractors: {
        "1": "That describes a low specific heat; little energy is needed per degree, so the temperature swings fast.",
        "2": "A high specific heat means it absorbs a great deal of energy, not none.",
        "3": "Its temperature does change — just slowly, and only with substantial heat input.",
      },
      commonMistake:
        "Reading 'high specific heat' as 'gets hot easily.' It is the opposite: high specific heat makes a substance stubborn about changing temperature.",
    },
  "Water has an unusually high specific heat compared to most common substances. Which is a direct consequence of this property?":
    {
      takeaway:
        "Water's high specific heat lets it absorb or release lots of heat with little temperature change.",
      whyCorrect:
        "Because oceans and lakes take in enormous heat before warming much, they buffer the air temperature of nearby land.",
      distractors: {
        "0": "High specific heat makes water slow to lose temperature, so it freezes more slowly, not faster.",
        "2": "Resisting temperature change while absorbing heat is exactly what makes water an excellent engine coolant.",
        "3": "Boiling point is a separate property; water's is high (100 °C), not low.",
      },
      commonMistake:
        "Confusing specific heat with boiling point. Specific heat governs how fast the temperature climbs; boiling point is the temperature where the state changes.",
    },
  "Thermal conduction is the transfer of heat through a material. Which of the following is the best thermal conductor?":
    {
      takeaway:
        "Metals conduct heat well because their loose electrons carry energy through the material.",
      whyCorrect:
        "Copper's mobile electrons pass thermal energy along rapidly, which is why copper is used in cookware and heat sinks.",
      distractors: {
        "0": "Rubber is an insulator — the reason gloves are made of it.",
        "2": "Foam traps air pockets to block heat flow; that is what keeps a foam cup's contents hot.",
        "3": "Wood is an insulator, which is why wooden spoon handles stay cool in a hot pot.",
      },
      commonMistake:
        "Picking the material that feels warm to the touch. A metal rail feels cold precisely because it conducts heat away from your hand quickly.",
    },

  // Geometric quantities.
  // Nearly every miss here is one of three habits: using the diameter where the
  // formula asks for a radius, dropping the ½ from the triangle area, or
  // reporting the right number with the wrong unit (m vs m² vs m³).
  "A rectangle has a length of 8 cm and a width of 5 cm. What is its area?": {
    takeaway: "Rectangle area = length × width.",
    steps: ["Area = 8 × 5.", "8 × 5 = 40 cm²."],
    whyCorrect: "Multiplying the two side lengths gives 40 cm².",
    distractors: {
      "0": "80 cm² is the area doubled — that would be two such rectangles.",
      "2": "26 cm is the perimeter, 2 × (8 + 5), not the area.",
      "3": "13 cm is just the two sides added together.",
    },
    commonMistake:
      "Adding the sides instead of multiplying. Perimeter adds (distance around); area multiplies (space covered).",
  },
  "A circle has a radius of 5 cm. Using π ≈ 3.14, what is the area of the circle?":
    {
      takeaway: "Circle area = πr².",
      steps: [
        "Square the radius: 5² = 25.",
        "Multiply by π: 3.14 × 25 = 78.5 cm².",
      ],
      whyCorrect: "πr² with r = 5 gives 3.14 × 25 = 78.5 cm².",
      distractors: {
        "0": "31.4 cm is the circumference, 2πr, not the area.",
        "2": "314 cm² comes from squaring 10 instead of 5 — using a diameter that was never given.",
        "3": "15.7 cm² multiplies π by the radius once instead of squaring it.",
      },
      commonMistake:
        "Squaring after multiplying by π, or forgetting to square at all. The exponent applies to r alone: π × (r × r).",
    },
  "A circle has a diameter of 10 cm. Using π ≈ 3.14, what is its circumference?":
    {
      takeaway: "Circumference = πd, which is the same as 2πr.",
      steps: [
        "The diameter is given directly: 10 cm.",
        "C = 3.14 × 10 = 31.4 cm.",
      ],
      whyCorrect: "Multiplying π by the diameter gives 31.4 cm.",
      distractors: {
        "0": "62.8 cm treats 10 as the radius and doubles it, 2π(10).",
        "1": "78.5 cm² is the area of this circle, not its circumference.",
        "3": "15.7 cm uses the radius, 5, in the C = πd formula, which expects the diameter.",
      },
      commonMistake:
        "Halving the diameter out of habit and then using the πd formula anyway. Halve for r in πr²; use the diameter as-is in πd.",
    },
  "A rectangular box has a length of 4 cm, a width of 3 cm, and a height of 2 cm. What is its volume?":
    {
      takeaway: "Volume of a box = length × width × height.",
      steps: ["4 × 3 = 12.", "12 × 2 = 24 cm³."],
      whyCorrect: "All three dimensions multiplied give 24 cm³.",
      distractors: {
        "0": "9 cm³ adds the three dimensions rather than multiplying them.",
        "1": "26 cm³ sums the three different face areas (12 + 6 + 8) instead of finding volume.",
        "2": "12 cm³ multiplies only length and width, stopping one dimension short — that is the area of the base.",
      },
      commonMistake:
        "Stopping after two dimensions. Volume needs all three; the answer should carry cubic units.",
    },
  "A triangle has a base of 10 cm and a height of 6 cm. What is its area?": {
    takeaway: "Triangle area = ½ × base × height.",
    steps: [
      "Multiply base by height: 10 × 6 = 60.",
      "Take half: 60 ÷ 2 = 30 cm².",
    ],
    whyCorrect: "Half of 60 is 30 cm².",
    distractors: {
      "1": "60 cm² is the rectangle that the triangle fills exactly half of — the ½ was dropped.",
      "2": "16 cm² adds base and height instead of multiplying.",
      "3": "15 cm² halves twice, once too many.",
    },
    commonMistake:
      "Forgetting the ½. A triangle is half of the rectangle built on the same base and height, which is where that factor comes from.",
  },
  "A rectangular garden measures 12 meters long and 7 meters wide. What is the area of the garden?":
    {
      takeaway: "Area multiplies the sides and is reported in square units.",
      steps: ["12 × 7 = 84.", "Area units are squared: 84 m²."],
      whyCorrect:
        "The product of the two sides, labeled in square meters, is 84 m².",
      distractors: {
        "0": "38 m² is the perimeter, 2 × (12 + 7), wearing area's units.",
        "1": "84 m has the right number but linear units; area cannot be measured in plain meters.",
        "2": "19 m² is just 12 + 7.",
      },
      commonMistake:
        "Ignoring the units on the answer choices. When two options share a number, the units are the whole question.",
    },
  "A circular tabletop has a diameter of 10 inches. Using π ≈ 3.14, what is the area of the tabletop? (Area = π × radius²)":
    {
      takeaway: "Halve the diameter first, then apply πr².",
      steps: [
        "Radius = 10 ÷ 2 = 5 inches.",
        "Square it: 5² = 25.",
        "Multiply by π: 3.14 × 25 = 78.5 in².",
      ],
      whyCorrect: "Using the radius of 5 in πr² gives 78.5 in².",
      distractors: {
        "0": "31.4 in² is πd, the circumference, not the area.",
        "2": "314 in² squares the diameter (10² = 100) instead of the radius.",
        "3": "157 in² multiplies π by the diameter and then by the radius, mixing the two.",
      },
      commonMistake:
        "Plugging the diameter into πr². The formula names the radius; when a problem gives a diameter, converting it is the first step, not an optional one.",
    },
  "A rectangular storage box is 4 cm long, 3 cm wide, and 5 cm tall. What is the volume of the box?":
    {
      takeaway: "Volume = l × w × h, in cubic units.",
      steps: ["4 × 3 = 12.", "12 × 5 = 60.", "Volume units are cubed: 60 cm³."],
      whyCorrect: "The three dimensions multiply to 60, reported as 60 cm³.",
      distractors: {
        "0": "12 cm³ uses only length and width.",
        "1": "47 cm³ does not come from any correct operation on these numbers.",
        "3": "60 cm² is the right number with square units; volume requires cubic units.",
      },
      commonMistake:
        "Letting the unit slide. Length is cm, area is cm², volume is cm³ — one exponent per dimension multiplied.",
    },
  "A triangle has a base of 10 cm and a height of 6 cm. What is its area in cm^2? Enter a number.":
    {
      takeaway: "Triangle area = ½ × base × height.",
      steps: ["10 × 6 = 60.", "Half of 60 is 30.", "The area is 30 cm²."],
      whyCorrect:
        "Applying ½ × 10 × 6 gives 30, the number the blank asks for.",
      commonMistake:
        "Entering 60 by skipping the ½. With no answer choices to flag the error, run the halving step deliberately.",
    },
  "Each option describes a rectangle by its dimensions. Order the rectangles from smallest area to largest area.":
    {
      takeaway:
        "Compute every area first, then sort — the dimensions themselves do not predict the ranking.",
      steps: [
        "1 cm by 7 cm = 7 cm².",
        "2 cm by 5 cm = 10 cm².",
        "3 cm by 4 cm = 12 cm².",
        "6 cm by 3 cm = 18 cm².",
        "Smallest to largest: 7, 10, 12, 18.",
      ],
      whyCorrect:
        "Ordering the computed areas gives 1×7, then 2×5, then 3×4, then 6×3.",
      commonMistake:
        "Ranking by the largest single side. The 1 cm by 7 cm rectangle has the longest side of the four and the smallest area — the second dimension is what makes it thin.",
    },

  // Unit conversion.
  // One question decides the arithmetic: is the new unit smaller or larger?
  // Smaller unit means more of them, so multiply; larger unit means fewer, so
  // divide. Nearly every distractor here is that decision made backwards, or
  // the right number wearing the wrong unit label.
  "A board is 5 feet long. How many inches long is it? (1 ft = 12 in)": {
    takeaway:
      "Inches are smaller than feet, so the number gets bigger — multiply by 12.",
    steps: ["Each foot holds 12 inches.", "5 × 12 = 60 inches."],
    whyCorrect: "Five groups of 12 inches make 60 inches.",
    distractors: {
      "0": "600 in multiplies by 120 instead of 12 — an extra factor of ten.",
      "2": "50 in multiplies by 10, a round number that is not the conversion factor.",
      "3": "17 in adds 5 and 12 instead of multiplying.",
    },
    commonMistake:
      "Adding the conversion factor. A conversion asks how many of the new unit fit inside the old one, which is always a multiplication or a division.",
  },
  "A package has a mass of 2.5 kg. About how many pounds is this? (1 kg ≈ 2.2 lb)":
    {
      takeaway: "Pounds are smaller than kilograms, so multiply by 2.2.",
      steps: ["Each kilogram is about 2.2 pounds.", "2.5 × 2.2 = 5.5 lb."],
      whyCorrect: "Multiplying the mass by the factor gives 5.5 pounds.",
      commonMistake:
        "Dividing by 2.2, which converts pounds to kilograms — the opposite direction. Sanity-check the size: a pound is lighter than a kilogram, so the number of pounds must be larger.",
    },
  "A container holds 3 liters of solution. How many milliliters is this? (1 L = 1000 mL)":
    {
      takeaway: "Liters to milliliters: multiply by 1000.",
      steps: ["Each liter is 1000 mL.", "3 × 1000 = 3000 mL."],
      whyCorrect: "Three liters contain 3000 milliliters.",
      distractors: {
        "0": "30,000 mL shifts the decimal one place too far.",
        "1": "30 mL multiplies by 10 rather than 1000.",
        "2": "300 mL multiplies by 100 rather than 1000.",
      },
      commonMistake:
        "Losing count of zeros. The metric prefix milli- means one thousandth, so the factor is exactly three zeros.",
    },
  "A ribbon is 10 inches long. How many centimeters is this? (1 in = 2.54 cm)":
    {
      takeaway: "Centimeters are smaller than inches, so multiply by 2.54.",
      steps: ["Each inch is 2.54 cm.", "10 × 2.54 = 25.4 cm."],
      whyCorrect: "Ten inches measure 25.4 centimeters.",
      distractors: {
        "0": "3.94 cm divides by 2.54, converting centimeters to inches instead.",
        "1": "12.54 cm adds the factor to the length.",
        "3": "254 cm multiplies by 25.4 — the decimal point slipped one place.",
      },
      commonMistake:
        "Converting the wrong way. A centimeter is smaller than an inch, so any length has more centimeters than inches; an answer below 10 is immediately suspect.",
    },
  "A dose weighs 5000 grams. How many kilograms is this? (1 kg = 1000 g)": {
    takeaway:
      "Grams to kilograms: divide by 1000, because kilograms are larger.",
    steps: ["1000 g make one kilogram.", "5000 ÷ 1000 = 5 kg."],
    whyCorrect: "Five thousand grams is 5 kilograms.",
    distractors: {
      "0": "500 kg divides by 10 instead of 1000.",
      "2": "0.5 kg divides by 10,000, one zero too many.",
      "3": "50 kg divides by 100.",
    },
    commonMistake:
      "Multiplying because the factor is 1000. Moving to a larger unit always makes the count smaller, so this one divides.",
  },
  "A bandage is 6 inches long. Using 1 inch = 2.54 cm, what is its length in centimeters?":
    {
      takeaway: "Inches to centimeters: multiply by 2.54, and answer in cm.",
      steps: [
        "6 × 2.54 = 15.24.",
        "The unit asked for is centimeters: 15.24 cm.",
      ],
      whyCorrect: "Six inches equal 15.24 centimeters.",
      distractors: {
        "0": "8.54 cm adds 2.54 to 6 instead of multiplying.",
        "1": "15.24 in has the correct number labeled with the original unit; the question asked for centimeters.",
        "3": "2.36 cm divides by 2.54, running the conversion backwards.",
      },
      commonMistake:
        "Solving correctly and then not checking the unit on the choice. When two options share a number, the label is the entire question.",
    },
  "A patient weighs 70 kilograms. Using 1 kg ≈ 2.2 lb, approximately what is the patient's weight in pounds?":
    {
      takeaway: "Kilograms to pounds: multiply by 2.2.",
      steps: ["70 × 2.2 = 154.", "The weight is about 154 lb."],
      whyCorrect: "Multiplying the mass in kilograms by 2.2 gives 154 pounds.",
      distractors: {
        "0": "72.2 lb adds 2.2 rather than multiplying by it.",
        "1": "140 lb multiplies by 2, dropping the 0.2.",
        "3": "31.8 lb divides by 2.2 — the pounds-to-kilograms direction.",
      },
      commonMistake:
        "Reversing the direction on clinical weights. Because a pound is lighter, a patient's weight in pounds is always the larger number — roughly double the kilograms.",
    },
  "A container holds 2.5 liters of solution. Using 1 L = 1000 mL, how many milliliters does it hold? Enter your answer in mL.":
    {
      takeaway: "Liters to milliliters: multiply by 1000.",
      steps: ["2.5 × 1000 = 2500.", "The container holds 2500 mL."],
      whyCorrect:
        "Multiplying by 1000 shifts the decimal three places right, giving 2500 mL.",
      commonMistake:
        "Moving the decimal only two places and entering 250. Multiplying by 1000 means three places, every time.",
    },
  "A rope is 2.5 meters long. How many centimeters long is the rope? Enter a number.":
    {
      takeaway: "Meters to centimeters: multiply by 100.",
      steps: ["Each meter holds 100 centimeters.", "2.5 × 100 = 250 cm."],
      whyCorrect: "The rope measures 250 centimeters.",
      commonMistake:
        "Reaching for 1000 out of habit from liters and milliliters. Centi- means one hundredth, so the factor here is 100, not 1000.",
    },
  "Order these lengths from shortest to longest.": {
    takeaway:
      "Convert everything to one unit first; mixed units cannot be compared as written.",
    steps: [
      "50 cm stays 50 cm.",
      "0.8 m = 0.8 × 100 = 80 cm.",
      "1 m = 100 cm.",
      "1500 mm = 1500 ÷ 10 = 150 cm.",
      "Shortest to longest: 50 cm, 0.8 m, 1 m, 1500 mm.",
    ],
    whyCorrect:
      "In a common unit the values are 50, 80, 100, and 150 cm, which fixes the order.",
    commonMistake:
      "Sorting by the printed numbers, which would put 1 m first and 1500 mm last. The digits mean nothing until the units match — 1500 mm is the longest here, not the largest-looking mistake it appears to be.",
  },

  // Immune system.
  // Two distinctions answer most of these: innate immunity is fast, nonspecific,
  // and has no memory (barriers, phagocytes), while adaptive immunity is slow,
  // antigen-specific, and remembers (B cells, T cells, antibodies). The disorder
  // questions turn on what the immune system aimed at: a harmless target is an
  // allergy, the body's own tissue is autoimmunity.
  "Which type of white blood cell produces antibodies as part of the adaptive immune response?":
    {
      takeaway:
        "B cells become plasma cells, and plasma cells make antibodies.",
      whyCorrect:
        "B lymphocytes differentiate into plasma cells that secrete antibodies matched to a specific antigen.",
      distractors: {
        "0": "Neutrophils are innate phagocytes; they swallow pathogens rather than making antibodies.",
        "1": "Red blood cells carry oxygen and have no immune role.",
        "3": "Platelets are cell fragments that drive clotting.",
      },
      commonMistake:
        "Assuming T cells make antibodies. T cells kill infected cells and coordinate the response; only the B-cell line secretes antibodies.",
    },
  "Which of the following is a part of the body's innate (nonspecific) first line of defense against pathogens?":
    {
      takeaway:
        "Innate defenses work the same way against every pathogen; adaptive ones target one antigen.",
      whyCorrect:
        "Intact skin blocks microbes mechanically, without identifying what it is blocking — the definition of a nonspecific first line.",
      distractors: {
        "1": "Antibodies are built against one particular antigen — adaptive.",
        "2": "B cell activation is triggered by a specific antigen — adaptive.",
        "3": "Memory is the hallmark of adaptive immunity; innate defenses do not learn.",
      },
      commonMistake:
        "Ranking answers by how powerful they sound. The question asks which is nonspecific, and skin's indifference to what it is blocking is exactly the point.",
    },
  "Which cells differentiate into plasma cells that secrete antibodies?": {
    takeaway: "Plasma cells are mature B lymphocytes.",
    whyCorrect:
      "When a B cell meets its antigen, it differentiates into a plasma cell that mass-produces antibodies.",
    distractors: {
      "0": "Osteocytes are bone cells, maintaining bone tissue.",
      "2": "Red blood cells transport oxygen and have no nucleus to run antibody production.",
      "3": "Platelets are clotting fragments.",
    },
    commonMistake:
      "Treating plasma cells as something found in blood plasma. The name refers to a cell stage, not a location — a plasma cell is a B cell doing its job.",
  },
  "Which of the following is a feature of innate (nonspecific) immunity rather than adaptive immunity?":
    {
      takeaway:
        "If it is specific to one antigen or remembers a past infection, it is adaptive.",
      whyCorrect:
        "The skin is a general barrier that stops pathogens without recognizing them individually.",
      distractors: {
        "0": "Helper T cell activation is antigen-specific.",
        "1": "Antigen-specific antibodies are the signature product of adaptive immunity.",
        "2": "Immunological memory is what makes a second exposure milder — adaptive only.",
      },
      commonMistake:
        "Forgetting that innate immunity includes more than skin. Stomach acid, mucus, fever, and phagocytes are innate too — all fast and none of them selective.",
    },
  "Cytotoxic T cells protect the body primarily by performing which action?": {
    takeaway:
      "Cytotoxic T cells kill the body's own cells once those cells are infected or cancerous.",
    whyCorrect:
      "A virus hiding inside a host cell is out of an antibody's reach, so cytotoxic (CD8) T cells destroy the infected cell itself.",
    distractors: {
      "0": "Antibody secretion is the plasma cell's job, not the T cell's.",
      "1": "Histamine comes from mast cells and basophils during allergic and inflammatory responses.",
      "3": "Engulfing pathogens early in inflammation describes neutrophils and macrophages.",
    },
    commonMistake:
      "Expecting immune cells to attack only foreign invaders. Cytotoxic T cells deliberately kill host cells — that is how the body clears a virus that has already gotten inside.",
  },
  "One major function of the lymphatic system is to": {
    takeaway:
      "The lymphatic system drains leaked tissue fluid back into the blood.",
    whyCorrect:
      "Fluid constantly escapes capillaries into tissues; lymphatic vessels collect it as lymph and return it to the bloodstream, which is why blockage causes swelling.",
    distractors: {
      "0": "Blood glucose is regulated by insulin and glucagon from the pancreas.",
      "2": "Digestive enzymes come from the pancreas and intestinal lining.",
      "3": "Pumping oxygenated blood is the heart's job; lymph has no pump and moves by muscle compression.",
    },
    commonMistake:
      "Thinking of the lymphatic system as purely immune. It is also the body's drainage network, and that fluid-return role is what makes it a circulatory partner.",
  },
  "Which structures act as filters along lymphatic vessels, trapping pathogens and housing immune cells that mount a defense?":
    {
      takeaway: "Lymph nodes filter lymph and stage the immune response.",
      whyCorrect:
        "Bean-shaped nodes sit along lymphatic vessels, trapping pathogens while resident lymphocytes attack them — which is why nodes swell during infection.",
      distractors: {
        "0": "Alveoli are lung air sacs where gas exchange happens.",
        "1": "Nephrons are the kidney's filtering units — they filter blood, not lymph.",
        "3": "Villi are intestinal projections that absorb nutrients.",
      },
      commonMistake:
        "Choosing nephrons because the question says 'filter.' Both filter, but nephrons sit in the kidney and process blood; the question specifies lymphatic vessels.",
    },
  "An allergy occurs when the immune system reacts strongly to a substance that is normally harmless, such as pollen. This best illustrates which type of immune problem?":
    {
      takeaway: "An allergy is an overreaction aimed at a harmless target.",
      whyCorrect:
        "Hypersensitivity means the response is disproportionate to the threat — pollen is not dangerous, but the reaction is.",
      distractors: {
        "0": "Attacking the body's own healthy cells describes an autoimmune disorder.",
        "2": "Failing to respond to a vaccine is an immune deficiency, the opposite problem.",
        "3": "A complete absence of defenses is immunodeficiency, not overreaction.",
      },
      commonMistake:
        "Confusing allergy with autoimmunity. Both are misdirected immunity; the difference is the target — outside and harmless versus inside and self.",
    },
  "In an autoimmune disorder such as rheumatoid arthritis, what mistake does the immune system make?":
    {
      takeaway:
        "Autoimmunity is a failure to tell self from non-self, so the body attacks itself.",
      whyCorrect:
        "In rheumatoid arthritis the immune system targets the body's own joint tissues, producing chronic inflammation and damage.",
      distractors: {
        "0": "Ignoring bacteria and viruses describes immunodeficiency.",
        "1": "White blood cell production continues; the cells are active, just misdirected.",
        "3": "Overreacting to pollen is an allergy — an outside target, not a self target.",
      },
      commonMistake:
        "Assuming autoimmune means a weak immune system. The response is fully functional and often aggressive; the error is in what it identifies as the enemy.",
    },

  // Evaluating an argument.
  // Every item here names a structural flaw: too little evidence for too broad a
  // claim, correlation read as causation, only two options offered, or the person
  // attacked instead of the evidence. A second habit does most of the work on
  // test day — the wrong choices routinely describe things the passage never did,
  // so a criticism that does not match the text in front of you is out.
  'A columnist writes: "Our town should ban all skateboarding downtown. Last year a single skateboarder collided with a pedestrian, proving that skateboards are simply too dangerous for public streets."\n\nWhat is the most significant weakness in the columnist\'s argument?':
    {
      takeaway:
        "One incident cannot support a sweeping rule — that is a hasty generalization.",
      whyCorrect:
        "The columnist moves from a single collision to a town-wide ban, a conclusion far broader than the evidence can carry.",
      distractors: {
        "0": "No expert is cited anywhere in the passage.",
        "1": "There is one statistic — a single incident — which is the opposite of too many.",
        "2": "The skateboarder's age is irrelevant to whether one case justifies a ban.",
      },
      commonMistake:
        "Looking for a factual error instead of a reasoning error. The collision may well have happened; the flaw is how much weight it is being asked to hold.",
    },
  'An advertisement claims: "Nine out of ten dentists surveyed recommend BrightSmile toothpaste, so it must be the best toothpaste available."\n\nWhich question would most help a reader evaluate the strength of this claim?':
    {
      takeaway: "A statistic is only as good as the sample behind it.",
      whyCorrect:
        "Ten dentists hand-picked by the company and a thousand chosen at random produce very different nine-out-of-ten claims, so sample size and selection are the decisive questions.",
      distractors: {
        "0": "A celebrity endorsement says nothing about whether the survey was sound.",
        "2": "Company age is not evidence of product quality.",
        "3": "The tube's color has no bearing on the claim.",
      },
      commonMistake:
        "Accepting a ratio because it sounds precise. 'Nine out of ten' hides the denominator, and the denominator is where the claim usually breaks.",
    },
  '"Every successful entrepreneur I interviewed wakes up before 5 a.m.," a writer argues. "Therefore, waking up before 5 a.m. is what makes people successful in business."\n\nWhich flaw best describes the reasoning?':
    {
      takeaway:
        "Two things happening together does not prove one caused the other.",
      whyCorrect:
        "The writer observes early rising alongside success and concludes it produces success, skipping any evidence of cause.",
      distractors: {
        "0": "Success is never redefined; it is used in the ordinary business sense.",
        "1": "The two sentences agree with each other — there is no self-contradiction.",
        "2": "The source is the writer's own interviews with entrepreneurs, who are relevant.",
      },
      commonMistake:
        "Treating a consistent pattern as proof. Successful people may rise early because demanding careers force it — the causation could run the other way entirely.",
    },
  'A speaker argues: "We must either build the new highway or watch our city\'s economy collapse entirely. There is no other choice."\n\nWhich weakness does this argument most clearly display?':
    {
      takeaway: "A false dilemma offers two options as if no others exist.",
      whyCorrect:
        "Transit investment, road repair, and doing nothing are all real possibilities the speaker has quietly deleted.",
      distractors: {
        "0": "No economic data is cited at all.",
        "2": "No expert, anonymous or named, appears in the passage.",
        "3": "The tone is alarmed, not humorous.",
      },
      commonMistake:
        "Being persuaded by 'There is no other choice.' That sentence is the flaw announcing itself, not evidence that the dilemma is real.",
    },
  "An author argues that a new reading program improved test scores, citing that the school adopted the program in September and average scores rose by spring. The author does not mention that the school also hired four additional tutors and extended the school day that same year.\n\nWhich statement best evaluates the argument?":
    {
      takeaway:
        "When several things change at once, no single one can claim the credit.",
      whyCorrect:
        "Tutors and a longer school day changed alongside the program, so the score increase has three plausible causes and the evidence cannot separate them.",
      distractors: {
        "0": "Precise timing shows only that the events coincided, which is exactly the problem.",
        "1": "The argument does give dates — September and spring; missing dates are not the issue.",
        "2": "Test scores change for many reasons, so this claim is simply false.",
      },
      commonMistake:
        "Judging the conclusion rather than the support. The reading program may genuinely have helped; the argument still fails to show it, and that is what the question asks about.",
    },
  "A blogger writes: \"You shouldn't believe Dr. Lee's research on nutrition. After all, she dresses unprofessionally and has an annoying voice.\"\n\nWhat is the main weakness of this argument?":
    {
      takeaway:
        "Attacking the person instead of the evidence is an ad hominem — it leaves the research untouched.",
      whyCorrect:
        "Clothing and voice have no bearing on whether the nutrition data is sound, so the blogger has said nothing about the actual claim.",
      distractors: {
        "0": "No key terms are defined; the passage is two sentences of personal criticism.",
        "1": "The research methods are never discussed at all.",
        "2": "No studies are cited in support of anything.",
      },
      commonMistake:
        "Reading options 0 through 2 as possible answers when they describe strengths. A question asking for a weakness will not be answered by something the argument does well — or, here, never does.",
    },
  'Read the passage and answer the question.\n\nA columnist writes: "Our city should ban all food trucks downtown. Last summer a single food truck was cited for a health violation. Clearly, mobile vendors cannot be trusted to keep food safe, and the only way to protect residents is to remove them from the streets entirely."\n\nWhich is the strongest criticism of the columnist\'s argument?':
    {
      takeaway:
        "The strongest criticism targets the reasoning, not a missing detail.",
      whyCorrect:
        "One cited vendor is stretched into a claim about all mobile vendors — an overgeneralization, and the structural break in the argument.",
      distractors: {
        "0": "The language is forceful, but tone is a stylistic complaint, not a logical failure.",
        "1": "Restaurant violation rates would be interesting context, yet the argument would still overgeneralize without them.",
        "3": "Permit procedures are tangential to whether one citation condemns an entire industry.",
      },
      commonMistake:
        "Choosing the option that names something the passage left out. Several true observations can be made about any argument; the strongest criticism is the one that breaks the inference itself.",
    },
  'Read the passage and answer the question.\n\nAn advertisement reads: "Nine out of ten dentists surveyed recommend BrightMint toothpaste. Switch today and give your family the protection the experts choose." The fine print notes that the dentists were asked only whether they would recommend BrightMint or no toothpaste at all.\n\nWhy does the fine print weaken the advertisement\'s claim?':
    {
      takeaway:
        "A comparison claim requires that a comparison actually took place.",
      whyCorrect:
        "The dentists chose between BrightMint and nothing, so the survey shows only that brushing beats not brushing — not that BrightMint beats any rival.",
      distractors: {
        "0": "The fine print says nothing about the response rate; nine out of ten is not disputed.",
        "2": "No payment by a competitor is mentioned anywhere in the passage.",
        "3": "The passage never claims or denies family testing.",
      },
      commonMistake:
        "Assuming the number was fabricated. The statistic is accurate — it just answers a much weaker question than the ad implies.",
    },
  "Read the passage and answer the question.\n\nA student argues: \"The school should require every student to join a sports team. Studies show that students who play sports tend to have higher grades. Therefore, requiring sports will raise everyone's grades.\"\n\nWhich assumption must be true for the student's argument to hold?":
    {
      takeaway:
        "An assumption is the unstated claim the conclusion collapses without.",
      whyCorrect:
        "The argument only works if sports cause the higher grades; if disciplined students simply tend to do both, requiring sports would change nothing.",
      distractors: {
        "0": "Funding is a practical obstacle to the policy, not a link the reasoning depends on.",
        "1": "The argument needs grades to improve, not to be the school's top priority.",
        "2": "Enjoyment is irrelevant — a requirement applies whether students like it or not.",
      },
      commonMistake:
        "Picking whatever would make the plan work well in practice. An assumption question asks what the logic needs, and here the logic needs the correlation to be causal.",
    },

  // Inference, prediction, and drawing conclusions.
  // A supported inference is a short step from details the passage actually
  // states — never a leap. Wrong choices fall into three repeating shapes: too
  // extreme (always, never, entirely, permanently), reversed (the opposite of
  // what the details suggest), or off-topic (about something the passage never
  // raises). Naming the shape is usually faster than re-reading.
  "Maria checked the weather app, then placed her umbrella by the front door and slipped a raincoat over her arm before leaving for the bus stop. She also tucked a paperback into her bag, expecting a long wait under the shelter.\n\nBased on the passage, what can the reader most reasonably infer?":
    {
      takeaway:
        "Infer from what the character does: preparations reveal what they expect.",
      whyCorrect:
        "Checking the forecast and then taking both an umbrella and a raincoat points to one expectation — rain.",
      distractors: {
        "1": "She packs a book expecting a long wait, which suggests the opposite of reliable timing.",
        "2": "The passage says she will wait under the shelter, so a shelter exists.",
        "3": "She chooses to bring the paperback, which suggests she likes reading.",
      },
      commonMistake:
        "Overlooking details that directly contradict a choice. Two of these options are refuted by a single phrase in the passage.",
    },
  "The community garden's sign-up sheet filled completely within two hours of being posted, and the coordinator received a dozen emails that afternoon asking whether more plots could be added. Last spring, by contrast, half the plots sat empty all season.\n\nWhich prediction is best supported by the passage?":
    {
      takeaway:
        "A supported prediction extends the trend the passage establishes.",
      whyCorrect:
        "Demand outran supply and people explicitly asked for more plots, so considering an expansion is the natural next step.",
      distractors: {
        "1": "Fees are never mentioned; high demand alone does not imply a price increase.",
        "2": "Nothing in the passage concerns tool sharing or conflict between gardeners.",
        "3": "Interest is the highest it has been — the passage supports the reverse.",
      },
      commonMistake:
        "Predicting something merely plausible in the real world. Raising fees when demand spikes is realistic, but the passage gives no evidence for it, and prediction questions are still evidence questions.",
    },
  'Dr. Patel reviewed the lab\'s quarterly results and frowned. "Every batch we ran after replacing the old centrifuge has shown cleaner separation," she noted, "yet the contamination reports didn\'t drop until we also switched cleaning agents in March." She circled the March entry twice.\n\nWhat conclusion does the passage best support?':
    {
      takeaway:
        "When two changes happen at different times, the timing tells you which one tracks the result.",
      whyCorrect:
        "Contamination fell only in March, when the cleaning agents changed — not when the centrifuge was replaced. Circling March twice marks that link.",
      distractors: {
        "1": "The centrifuge improved separation; nothing suggests she wants it gone.",
        "2": "The centrifuge is credited with cleaner separation, not blamed for contamination.",
        "3": "Reports did drop — the passage says exactly when.",
      },
      commonMistake:
        "Attributing the improvement to the change you read about first. The passage deliberately separates the two events in time so that the sequence, not the order of mention, points to the answer.",
    },
  "When the new manager arrived, she replaced the suggestion box with weekly open meetings, posted the budget on the break-room wall, and began answering staff questions by email within a day. Employees who had once spoken only in whispers started raising concerns aloud.\n\nWhat can the reader most reasonably infer about the manager?":
    {
      takeaway:
        "Several actions pointing the same direction reveal a value, not a coincidence.",
      whyCorrect:
        "Open meetings, a publicly posted budget, and quick answers all share one theme: making information and access available.",
      distractors: {
        "0": "She answers questions within a day, which invites them rather than discouraging them.",
        "2": "Replacing a box with live meetings shows more interest in staff opinion, not less.",
        "3": "The budget is posted, not cut; the passage says nothing about reducing it.",
      },
      commonMistake:
        "Reading 'posted the budget' as a signal about money. The detail is about visibility — what she shares — which is why it belongs with the other two actions.",
    },
  'The trail guide wrote: "By midafternoon the clouds had thickened over the ridge, the temperature had dropped sharply, and the marmots that usually sunned on the rocks were nowhere to be seen. We decided to start back early."\n\nWhich inference is best supported by the passage?':
    {
      takeaway:
        "Three converging observations plus a decision explain each other.",
      whyCorrect:
        "Thickening clouds, a sharp temperature drop, and animals taking cover are classic storm signs — and they account for the choice to turn back early.",
      distractors: {
        "0": "No park officials or closures appear anywhere in the passage.",
        "2": "The passage never mentions the summit or how far along the trail they were.",
        "3": "Migration takes a season; these marmots are absent this particular afternoon.",
      },
      commonMistake:
        "Explaining one detail in isolation. The marmots' absence has an ordinary weather explanation once you read it alongside the clouds and the cold.",
    },
  "Read the passage and answer the question.\n\nMarisol had repaired clocks in the same shop for thirty years. Lately she noticed that customers brought in fewer mechanical watches and more smartwatches she could not service. Each month she sold a few more batteries and fixed a few fewer gears. She began keeping the front display case stocked with charging cables instead of winding keys, and she enrolled in an online course on phone screen replacement.\n\nWhich conclusion is best supported by the passage?":
    {
      takeaway:
        "Restocking and retraining are the moves of someone adapting, not someone quitting.",
      whyCorrect:
        "Changing the display case and enrolling in a course are both investments in continuing to trade, aimed at the devices customers now bring in.",
      distractors: {
        "0": "Someone closing within the year does not enroll in a course to learn a new repair skill.",
        "2": "Her personal preferences are never discussed; her stock choices follow demand.",
        "3": "Customers still come — they bring smartwatches and buy batteries.",
      },
      commonMistake:
        "Reading declining demand for one product as a failing business. Her gear repairs are down and her battery sales are up; the mix is shifting, not disappearing.",
    },
  "Read the passage and answer the question.\n\nThe trail guide warned the group that the river crossing ahead was usually ankle-deep but rose quickly after rain. As the hikers approached, they heard a low roar, and the guide stopped to study the muddy, churning water sliding over the marked stepping stones. She unclipped the rope from her pack and asked everyone to wait while she scouted upstream.\n\nBased on the passage, what will the guide most likely do next?":
    {
      takeaway: "Predict the next step from the step already in progress.",
      whyCorrect:
        "She has stopped the group and gone upstream to scout, which is what looking for a safer crossing looks like.",
      distractors: {
        "0": "She asked the group to wait, the opposite of sending them across alone.",
        "2": "Permanently canceling is far more extreme than pausing to scout.",
        "3": "She stopped precisely because the marked stones are under churning water.",
      },
      commonMistake:
        "Choosing the most dramatic outcome. Scouting upstream is a search for an alternative, so the modest prediction is the supported one.",
    },
  "Read the passage and answer the question.\n\nDevon arrived at the interview twenty minutes early and sat reviewing a folder of notes. When the receptionist offered him coffee, he declined, saying he did not want to risk a spill on his shirt. He had pressed the shirt the night before and laid out his shoes by the door. In the waiting room he silently rehearsed answers to questions he had written on index cards.\n\nWhich inference about Devon is best supported by the passage?":
    {
      takeaway:
        "Repeated small precautions add up to one straightforward inference.",
      whyCorrect:
        "Arriving early, pressing the shirt, laying out shoes, and rehearsing on cards are all preparation aimed at presenting well.",
      distractors: {
        "1": "Rehearsing answers suggests he expects to have to earn the offer.",
        "2": "He declines this coffee for a stated reason — spill risk — not out of general dislike.",
        "3": "His qualifications relative to the role are never mentioned.",
      },
      commonMistake:
        "Turning a situational choice into a permanent trait. He avoids coffee before this interview; 'in all situations' is the kind of absolute the passage does not support.",
    },
  "Read the following passage, then select all conclusions that can be reasonably drawn from the text. Passage: Every morning Devon arrives at the bakery before sunrise, flour already dusting his sleeves from the night's planning. He keeps a worn notebook listing which loaves sold out and which lingered unsold. Last month he quietly dropped the rye that few customers wanted and doubled his order of sourdough. Customers now wait in a line that stretches past the corner store. Select all that apply.":
    {
      takeaway:
        "On select-all items, test each option against the text on its own — they do not compete.",
      whyCorrect:
        "The notebook shows he tracks what sells, dropping rye and doubling sourdough shows he acts on what he tracks, and the line past the corner store shows demand rose after those changes.",
      distractors: {
        "2": "Arriving before sunrise and planning at night suggests investment in the work, not a wish to leave it.",
        "4": "The bakery is busier than ever; nothing points to closing.",
      },
      commonMistake:
        "Stopping after one correct choice. Select-all questions are scored per option, so every option needs its own pass through the passage — and here three of the five hold up.",
    },

  // Identifying primary sources.
  // One test settles every item: was this created during the event, by someone
  // taking part in or directly recording it? Letters, diaries, lab notebooks,
  // transcripts, raw datasets, and recordings are primary. Anything written
  // afterward *about* the event — textbooks, documentaries, reviews, news
  // summaries, encyclopedia entries — is secondary, no matter how accurate.
  "A student is writing a report about a 1955 labor strike and wants to use a primary source. Which of the following would best serve as a primary source for that event?":
    {
      takeaway:
        "A primary source comes from the event itself, made by someone who was there.",
      whyCorrect:
        "The letter was written in 1955 by a worker living through the strike — firsthand evidence, unfiltered by later interpretation.",
      distractors: {
        "0": "An encyclopedia entry compiles and condenses what others have written.",
        "2": "A recent documentary analyzes the strikes from decades away.",
        "3": "A 2010 textbook chapter summarizes; it is a report about the sources, not one of them.",
      },
      commonMistake:
        "Equating primary with trustworthy. A worker's letter may be biased and a textbook meticulously researched — the classification tracks origin, not reliability.",
    },
  "A researcher studying how a 19th-century scientist conducted an experiment wants a primary source. Which item is the primary source for that purpose?":
    {
      takeaway: "Original records made while the work happened are primary.",
      whyCorrect:
        "The laboratory notebook was written by the scientist during the experiment, so it records the procedure directly rather than describing it later.",
      distractors: {
        "0": "A review of the scientist's legacy is written long after and about the work.",
        "1": "A biography, however well researched, is one author's later account.",
        "3": "A modern textbook reports results secondhand.",
      },
      commonMistake:
        "Preferring the clearest source. The notebook is probably messy and hard to read; that it is the researcher's own contemporaneous record is exactly what makes it primary.",
    },
  "A historian wants to understand how ordinary citizens felt during a particular wartime year. Several sources are available. Which would function as a primary source for that goal?":
    {
      takeaway:
        "Match the source to the question: to study how people felt, use what those people wrote at the time.",
      whyCorrect:
        "A diary from that year records a citizen's own experience as it unfolded — precisely the evidence the historian's question calls for.",
      distractors: {
        "1": "A textbook chapter is a later summary written for students.",
        "2": "A ranking of battles is both later and about a different subject.",
        "3": "A journal article on morale published decades afterward analyzes primary sources rather than being one.",
      },
      commonMistake:
        "Choosing the most scholarly option. The peer-reviewed article is the most rigorous source here and still secondary, because it studies the period instead of coming from it.",
    },
  "A journalism class is studying a famous speech. To analyze the speaker's exact original words, which source is the primary source?":
    {
      takeaway:
        "A transcript of the words as delivered is the speech itself in written form.",
      whyCorrect:
        "The transcript reproduces the speaker's own remarks with nothing added or interpreted, which is what analyzing exact wording requires.",
      distractors: {
        "0": "Lecture notes describe the speech in a teacher's words.",
        "2": "An editorial written the following week reacts to the speech.",
        "3": "A blog summary compresses the ideas and loses the original wording.",
      },
      commonMistake:
        "Assuming a source must be old to be primary. Age is irrelevant — a transcript made yesterday of yesterday's speech is still the direct record.",
    },
  "A nursing student is researching how a new vaccine was first tested and wants the most direct, firsthand evidence. Which source is primary?":
    {
      takeaway:
        "In research, the original study report written by the investigators is the primary source.",
      whyCorrect:
        "The clinical trial report is the researchers' own account of the methods and results they produced, with no intermediate summarizer.",
      distractors: {
        "0": "A patient-education pamphlet translates findings for a lay audience.",
        "2": "A review article's entire purpose is to survey other studies, which makes it secondary.",
        "3": "A news summary reports on the trial from outside it.",
      },
      commonMistake:
        "Picking the review article because it covers more ground. Breadth is a strength for background reading and a disqualifier for primary status.",
    },
  "A historian is researching the experience of soldiers during a 1918 battle. Which of the following would serve as a primary source?":
    {
      takeaway: "Created during the event by a participant means primary.",
      whyCorrect:
        "A soldier's 1918 letter home was written mid-battle by someone living it, giving direct access to the experience under study.",
      distractors: {
        "0": "A 2015 documentary interprets the war nearly a century later.",
        "1": "An encyclopedia entry on causes is a compiled overview.",
        "3": "A 2010 textbook chapter summarizes the battle for readers.",
      },
      commonMistake:
        "Reading the dates without reading the authorship. 1918 is only half the test — the letter also has to come from a participant, which it does.",
    },
  "A nursing student is studying how a new hand-washing protocol affected infection rates at a hospital. Which source would be considered a primary source for this research?":
    {
      takeaway: "Raw data collected during the study is as primary as it gets.",
      whyCorrect:
        "The ward's own recorded infection counts are the original measurements the study rests on, gathered as the protocol was in use.",
      distractors: {
        "0": "A news report relays the findings to the public after the fact.",
        "1": "A textbook section covers infection control in general, not this study.",
        "2": "A review article summarizes multiple studies rather than reporting original data.",
      },
      commonMistake:
        "Assuming a primary source must be a document someone wrote. Datasets, recordings, photographs, and specimens all qualify — the form does not matter, the directness does.",
    },
  "A journalist is writing about a city council meeting that took place last night. Which item is a primary source about what happened at the meeting?":
    {
      takeaway:
        "A direct recording of the event is a primary source about that event.",
      whyCorrect:
        "The official audio captures the meeting as it occurred, with no one standing between the event and the record.",
      distractors: {
        "0": "A secondhand account has passed through two people before reaching the journalist.",
        "1": "A commentator's analysis interprets the meeting.",
        "3": "A retrospective written a year later looks back on the decisions.",
      },
      commonMistake:
        "Thinking recency makes a source primary. The blog post and the neighbor's account are both recent and both secondhand; only the recording is the event itself.",
    },

  // Comparing and contrasting themes.
  // Theme is the idea about life the details add up to — not the subject, and
  // not any single line. The reliable method is to state each passage's theme in
  // your own words first, then check the option against both. Wrong choices are
  // usually half-right: accurate about one passage and reversed, absolute
  // ("always," "only"), or invented about the other.
  'Passage 1: The old fisherman returned each dawn with empty nets, yet he rowed out again the next morning without complaint. "The sea owes me nothing," he would say, "but I owe it my effort."\n\nPassage 2: The young inventor\'s first ten machines failed, but she kept sketching new designs late into the night. "Each broken gear," she wrote, "teaches the next one how to turn."\n\nWhich theme is shared by both passages?':
    {
      takeaway:
        "A shared theme must fit both passages, not just the more vivid one.",
      whyCorrect:
        "Both figures fail repeatedly and continue anyway — the fisherman rows out again, the inventor sketches again. That is persistence through failure.",
      distractors: {
        "0": "Only one passage involves machines, and it treats them hopefully rather than as a danger.",
        "2": "Neither character accepts defeat; both return to the work.",
        "3": "Both work alone, so group effort is absent from each passage.",
      },
      commonMistake:
        "Picking a theme drawn from a single passage. Two very different settings — a boat and a workshop — were chosen precisely so the shared idea has to be stated abstractly.",
    },
  "Passage 1: In the village, neighbors gathered every harvest to bring in one another's crops, certain that no single family could survive the season alone.\n\nPassage 2: The mountaineer insisted on climbing solo, trusting only her own judgment and refusing every offer of a guide or partner.\n\nHow do the themes of the two passages differ?":
    {
      takeaway:
        "A contrast question needs both halves stated correctly and in the right order.",
      whyCorrect:
        "Passage 1 shows neighbors depending on each other to survive; Passage 2 shows a climber refusing all help. Interdependence against self-reliance.",
      distractors: {
        "0": "Passage 2 presents solo climbing as the mountaineer's confident choice, not as a target of criticism.",
        "1": "This reverses both passages: Passage 1 depends on neighbors and Passage 2 refuses partners.",
        "2": "Only Passage 1 concerns teamwork; Passage 2 rejects it.",
      },
      commonMistake:
        "Approving the first half of an option without checking the second. Reversed pairs are the standard trap on contrast items, and reading only to 'while' is how they catch you.",
    },
  "Passage 1: The general's memoir celebrated the conquered city as a trophy, listing its riches and the banners his troops raised over its walls.\n\nPassage 2: A displaced resident's diary described the same day as the morning her family's bakery burned and the streets filled with strangers' boots.\n\nWhich statement best compares the themes of the two passages?":
    {
      takeaway:
        "The same event carries opposite meanings depending on who is telling it.",
      whyCorrect:
        "The general counts riches and banners; the resident counts what she lost. One day, framed as triumph and as loss.",
      distractors: {
        "0": "The diary describes a burned bakery and occupying troops — not a celebration.",
        "1": "Both viewpoints are unmistakable; each writer's stance shapes every detail chosen.",
        "2": "Only the resident mourns; the memoir is triumphant.",
      },
      commonMistake:
        "Assuming passages about one event must share a theme. Perspective is often the whole point of the pairing, and here the contrast is the answer.",
    },
  'Passage 1: "Money spent on books is never wasted," the teacher told her students, "for what you read becomes a part of you that no one can take away."\n\nPassage 2: A wealthy merchant boasted that his gold was the only treasure worth keeping, since ideas faded but coins endured in the vault.\n\nWhich theme do the two passages most clearly set in opposition?':
    {
      takeaway:
        "Name what each side is arguing for; the opposition is between those two values.",
      whyCorrect:
        "The teacher champions what reading gives you permanently; the merchant champions gold. Knowledge set directly against material wealth.",
      distractors: {
        "1": "Neither speaker lies or accuses the other of dishonesty.",
        "2": "Both are about what is worth possessing, not about saving versus spending.",
        "3": "Age is never the point of contention; the teacher and merchant differ on values, not years.",
      },
      commonMistake:
        "Choosing a theme because money is mentioned. Both passages mention money; the disagreement is over what actually holds value, which is the finer distinction the question wants.",
    },
  'Passage 1: The river poem praised change itself: "What I love about the current is that it is never the same water twice, and so it never grows stale."\n\nPassage 2: The lighthouse poem praised constancy: "In every storm I am the one fixed light, and sailors trust me because I never move."\n\nWhich statement best describes how the themes relate?':
    {
      takeaway:
        "Two passages can praise opposite virtues without either being wrong.",
      whyCorrect:
        "The river poem finds worth in never repeating; the lighthouse poem finds worth in never moving. Change celebrated against permanence celebrated.",
      distractors: {
        "0": "The river poem treats change as the very thing worth loving.",
        "1": "Both poems state their attitudes outright — one praises the current, the other the fixed light.",
        "3": "Only the lighthouse poem praises permanence; the river poem prizes its absence.",
      },
      commonMistake:
        "Looking for which poem is right. Comparison questions ask what each text values, not which value you would choose.",
    },
  "Read both passages and answer the question.\n\nPassage 1: The old fisherman said the sea gives nothing for free. Every fish in the net, he told his grandson, is paid for with patience, cold hands, and hours of waiting in the dark before dawn. What you earn that way, he said, you never throw back.\n\nPassage 2: Mara won the lottery on a whim, buying a ticket with spare change at the gas station. Within two years the money was gone, spent on things she could barely remember. She often said she had never missed what came so easily.\n\nWhich theme do both passages share?":
    {
      takeaway:
        "Passages can share a theme by showing the same idea from opposite sides.",
      whyCorrect:
        "What the fisherman earns he never throws back; what Mara wins she cannot even remember spending. Both point to effort creating value.",
      distractors: {
        "0": "Neither passage compares planners to non-planners, and 'always' overstates anything either one shows.",
        "1": "The theme concerns effort generally, not physical labor specifically — the word 'only' has no support.",
        "3": "Mara's luck is exactly what fails to last, so this reverses the passages.",
      },
      commonMistake:
        "Discarding a shared theme because the passages disagree in tone. One illustrates the idea by example and the other by counterexample — the theme is still the same.",
    },
  "Read both passages and answer the question.\n\nPassage 1: When the storm tore the roof off the community hall, the whole town showed up the next morning with hammers and ladders. By dusk the hall stood again. No one had organized it; people simply came because the hall belonged to all of them.\n\nPassage 2: The lighthouse keeper lived alone for forty years, trusting only the lamp and his own two hands. When the supply boat failed to come, he rationed his food and told himself, as he always had, that a man must depend on no one.\n\nHow do the themes of the two passages differ?":
    {
      takeaway:
        "State each theme separately, then find the option that matches both in order.",
      whyCorrect:
        "An unorganized town rebuilds together; a keeper survives alone on principle. Communal effort against self-reliance.",
      distractors: {
        "1": "This swaps the passages — the town trusts one another and the keeper avoids depending on anyone.",
        "2": "Neither passage is about grief or ambition; both are about how people meet a difficulty.",
        "3": "Both show work producing results — a rebuilt hall and a keeper who endures.",
      },
      commonMistake:
        "Matching on setting instead of idea. A storm appears in one passage and a lighthouse in the other, but the contrast lives in how each responds to hardship.",
    },
  "Read both passages and answer the question.\n\nPassage 1: The inventor kept a wall of failed sketches. Visitors thought it a strange decoration, but she insisted each crossed-out design had taught her something the finished machine could not have. Failure, she said, was simply information arriving early.\n\nPassage 2: The young chess champion lost only once, and he never spoke of that game again. He removed the record from his shelf and refused to analyze it, certain that dwelling on a loss could only weaken him.\n\nWhich statement best compares the themes of the two passages?":
    {
      takeaway:
        "Two passages can share a subject and still land on opposite conclusions.",
      whyCorrect:
        "Both are about responding to failure: the inventor displays and studies hers, the champion hides and refuses to examine his. Same subject, opposite verdicts on what failure is worth.",
      distractors: {
        "0": "Neither passage weighs talent against effort.",
        "1": "The inventor hangs her failures on a wall for visitors to see, which contradicts hiding them.",
        "3": "Both figures work alone; neither passage concerns teamwork.",
      },
      commonMistake:
        "Assuming a shared subject means a shared theme. Subject is what a passage is about; theme is what it concludes — and here the conclusions point in opposite directions.",
    },

  // Integrating data from text and tables.
  // The text supplies the context — what changed, when, and what the threshold
  // is — and the table supplies the numbers. A supported conclusion needs both
  // and stays inside them. Wrong choices almost always overreach: predicting
  // beyond the last row, claiming a cause the data cannot show, asserting
  // something never measured (satisfaction, taste, cost), or contradicting a
  // number sitting in plain view.
  "Text: A clinic tracked average patient wait times after adding a second receptionist in March.\n\nMonthly Average Wait (minutes):\nJanuary: 32\nFebruary: 30\nMarch: 24\nApril: 19\nMay: 18\n\nBased on the text and the table together, which conclusion is best supported?":
    {
      takeaway:
        "The text says when the change happened; the table says what the numbers did after it.",
      whyCorrect:
        "March is when the receptionist was added, and the wait falls from 30 to 24 to 19 to 18 across March through May.",
      distractors: {
        "0": "The wait nearly halved after March, so 'no effect' contradicts the table.",
        "1": "January is the highest value at 32 minutes, not the lowest.",
        "3": "Every month is lower than the one before; the trend falls rather than rises.",
      },
      commonMistake:
        "Reading the trend backwards because the earliest month sits at the top of the list. Check the direction against two actual values before trusting the shape you expect.",
    },
  "Text: A library reported the number of e-books and printed books checked out each quarter last year.\n\nCheckouts by Quarter:\nQ1 - Printed: 1,200; E-books: 400\nQ2 - Printed: 1,000; E-books: 600\nQ3 - Printed: 900; E-books: 800\nQ4 - Printed: 850; E-books: 1,050\n\nWhich statement is best supported by combining the text and the table?":
    {
      takeaway:
        "With two data series, track each one separately before comparing them.",
      whyCorrect:
        "E-books climb 400 → 600 → 800 → 1,050 while printed books fall 1,200 → 1,000 → 900 → 850. Both trends hold across all four quarters.",
      distractors: {
        "0": "In Q4 e-books reach 1,050 against 850 printed, so they did overtake print.",
        "1": "Printed checkouts decline every quarter.",
        "3": "Q4 totals 1,900 checkouts, nowhere near zero.",
      },
      commonMistake:
        "Comparing only the first row. The two series cross between Q3 and Q4, and an answer built on Q1 alone misses the reversal entirely.",
    },
  "Text: A coach recorded each runner's best 5K time and the number of weekly training sessions they attended.\n\nRunner Data:\nAna - Sessions: 5; Best time: 22 min\nBen - Sessions: 4; Best time: 24 min\nCara - Sessions: 2; Best time: 28 min\nDev - Sessions: 1; Best time: 31 min\n\nWhich conclusion is best supported by the text and the table?":
    {
      takeaway:
        "Describe the pattern in the data without claiming it proves a cause.",
      whyCorrect:
        "As sessions drop from 5 to 1, times rise from 22 to 31 minutes — more sessions go with faster times, and 'tended to' keeps the claim at the level the data supports.",
      distractors: {
        "1": "Cara ran 28 and Dev 31, both above 25 minutes.",
        "2": "The two columns move together consistently, which is a relationship.",
        "3": "This reverses the pattern — the runners with the fewest sessions were slowest.",
      },
      commonMistake:
        "Rejecting the correct answer for hedging. 'Tended to' is what makes it defensible; a table of four runners shows an association, not a proven cause.",
    },
  'Text: A grocery store posted the price per pound of four fruits this week and noted that any fruit priced above $2.00 per pound is considered a "premium" item.\n\nPrice per Pound:\nApples: $1.50\nGrapes: $2.75\nBananas: $0.60\nCherries: $4.20\n\nUsing the text and the table, which fruits qualify as "premium" items? (Select all that apply.)':
    {
      takeaway:
        "The text defines the threshold; test every row against it individually.",
      whyCorrect:
        "Above $2.00 per pound is the rule. Cherries at $4.20 and grapes at $2.75 both clear it.",
      distractors: {
        "1": "Bananas at $0.60 are the cheapest item listed.",
        "3": "Apples at $1.50 fall below the $2.00 line.",
      },
      commonMistake:
        "Selecting only the most expensive item. The definition sets a cutoff, not a ranking, so every fruit above the line qualifies — here, two of them.",
    },
  "Text: A city compared the number of reported bicycle accidents before and after installing protected bike lanes on Main Street in 2022.\n\nReported Bicycle Accidents on Main Street:\n2020: 18\n2021: 16\n2022 (lanes installed): 11\n2023: 7\n\nWhich conclusion is best supported by combining the text and the table?":
    {
      takeaway:
        "Locate the year of the change, then read the values on either side of it.",
      whyCorrect:
        "The lanes went in during 2022, and reported accidents fall from 11 that year to 7 the next — a decline after installation.",
      distractors: {
        "0": "2023 is the lowest year at 7, not the highest.",
        "2": "The counts fall rather than rise.",
        "3": "The table labels 2022 as the installation year; 2020 is two years earlier.",
      },
      commonMistake:
        "Skipping the parenthetical label in the table. '(lanes installed)' is the one detail that connects the text to a specific row.",
    },
  "Read the text and table, then answer the question.\n\nText: A community library tracked attendance at its weekly evening programs. The director noted that programs offering free childcare consistently drew larger crowds than those without it.\n\nTable: Average Weekly Attendance\nProgram | Free Childcare? | Attendance\nBook Club | No | 18\nFamily Movie | Yes | 52\nLanguage Class | Yes | 47\nLecture Series | No | 21\n\nWhich conclusion is best supported by both the text and the table?":
    {
      takeaway:
        "Group the rows by the variable the text highlights, then compare the groups.",
      whyCorrect:
        "The two childcare programs drew 52 and 47; the two without drew 18 and 21. Every childcare program outdrew every program lacking it.",
      distractors: {
        "0": "'The only factor' goes far beyond four rows — topic, night, and season are never tested.",
        "2": "No morning program appears in the data, so this is invented.",
        "3": "Cancellation is never mentioned; the table reports attendance only.",
      },
      commonMistake:
        "Upgrading a clear pattern into a sole cause. The data supports 'higher attendance'; it cannot support 'the only factor that determines' it.",
    },
  "Read the text and table, then answer the question.\n\nText: A clinic measured the average wait time for patients before and after hiring a second receptionist in March. Staff hoped the change would reduce delays.\n\nTable: Average Patient Wait Time (minutes)\nMonth | Wait Time\nFebruary | 34\nMarch | 29\nApril | 22\nMay | 21\n\nWhich statement is best supported by combining the text and the table?":
    {
      takeaway:
        "Stay inside the rows: report what the measured months show, nothing beyond.",
      whyCorrect:
        "After the March hire, the average wait falls from 29 to 22 to 21 minutes — a decrease in the months following the change.",
      distractors: {
        "0": "Extending the trend to zero predicts past the data; the decline is already flattening from 22 to 21.",
        "2": "Satisfaction was never measured — only wait time.",
        "3": "Patient volume does not appear in the table at all.",
      },
      commonMistake:
        "Assuming a falling line keeps falling. A trend describes the range you measured; projecting it forward is a separate claim the data does not carry.",
    },
  "Read the two sources, then answer the question.\n\nSource 1 (text): A gardener recorded how well three tomato varieties grew in her shaded backyard, where plants receive only about four hours of sun per day.\n\nSource 2 (table): Tomato Yield in the Shaded Garden\nVariety | Recommended Sun | Pounds Harvested\nSungold | Full sun | 3\nBush Early | Partial sun | 11\nBeefsteak | Full sun | 2\n\nWhich conclusion is best supported by integrating both sources?":
    {
      takeaway:
        "The text establishes the conditions; the table shows which variety matched them.",
      whyCorrect:
        "The garden gets about four hours of sun, and the partial-sun variety yielded 11 pounds against 3 and 2 for the full-sun varieties.",
      distractors: {
        "0": "Taste is never measured; the table records pounds harvested.",
        "1": "Sungold produced 3 pounds in shade, so it did grow — just poorly.",
        "2": "Only the shaded garden was tested; a sunnier one is pure speculation.",
      },
      commonMistake:
        "Concluding that Bush Early is simply the better tomato. It won under these conditions, and the text exists to remind you what those conditions were.",
    },

  // Topic, main idea, and supporting details.
  // Three levels, and the question always names which one it wants. The topic is
  // what the passage is about, statable as a phrase. The main idea is the claim
  // the passage makes about that topic — it must cover the whole passage, not
  // one sentence. A supporting detail is a specific fact that backs the claim up.
  // The dominant trap is a true-but-narrow detail offered as the main idea:
  // being true is not enough, it has to account for everything else in the text.
  "Read the passage and answer the question.\n\nHoneybees do far more than make honey. As they move from flower to flower gathering nectar, they carry pollen on their bodies, fertilizing the plants they visit. Roughly one-third of the food that people eat depends on this pollination. Without honeybees, many fruits and vegetables would become scarce.\n\nWhat is the main idea of the passage?":
    {
      takeaway:
        "The main idea is the claim every other sentence exists to support.",
      whyCorrect:
        "The opening announces bees matter beyond honey, and pollination, the one-third statistic, and the scarcity warning all build that single case.",
      distractors: {
        "0": "A true detail about how bees forage — one supporting fact, not the point.",
        "1": "The passage opens by setting honey aside as the lesser contribution.",
        "3": "Growing climates are never discussed.",
      },
      commonMistake:
        "Choosing a sentence you can find verbatim in the passage. The main idea is usually a summary you assemble, not a line you locate.",
    },
  "Read the passage and answer the question.\n\nFor decades, people believed that adult brains could not change. Recent research, however, shows that the brain continues to form new connections throughout life, a quality called neuroplasticity. Stroke patients, for example, can sometimes retrain undamaged regions to take over lost functions. This discovery has transformed how doctors approach rehabilitation.\n\nWhich sentence best states the topic of the passage?":
    {
      takeaway:
        "The topic is the subject the whole passage circles, stated broadly.",
      whyCorrect:
        "Every sentence concerns the brain's continuing capacity to change, and the passage names that capacity: neuroplasticity.",
      distractors: {
        "0": "Stroke patients appear as evidence of recovery, and the passage argues against permanence.",
        "1": "No disagreement among doctors is described.",
        "2": "Medical research in general is far broader than this passage's subject.",
      },
      commonMistake:
        "Picking a topic drawn from the example rather than the point the example serves. Stroke rehabilitation illustrates neuroplasticity; it is not what the passage is about.",
    },
  "Read the passage and answer the question.\n\nThe Great Pacific Garbage Patch is not a solid island of trash, as many imagine. Instead, it is a vast area where tiny pieces of broken-down plastic float just below the surface. Because the particles are so small and spread out, the patch is difficult to see and even harder to clean up.\n\nWhich detail from the passage supports the idea that the patch is hard to clean up?":
    {
      takeaway:
        "A supporting detail must connect directly to the specific idea named in the question.",
      whyCorrect:
        "The passage says the cleanup difficulty follows from the particles being small and spread across a vast area — it states that causal link outright.",
      distractors: {
        "0": "The popular misconception explains what the patch is not; it says nothing about cleanup.",
        "1": "The location is background information.",
        "2": "Floating below the surface makes the patch hard to see — related, but the question asks about cleanup.",
      },
      commonMistake:
        "Settling for a detail that is merely nearby. Two options here touch on visibility; only one is tied to the difficulty of removing the plastic.",
    },
  "Read the passage and answer the question.\n\nMany shoppers assume that products labeled 'natural' are healthier than other options. In truth, the word 'natural' has no strict legal definition on food packaging, so manufacturers may apply it loosely. A cereal marked 'natural' can still contain large amounts of added sugar. Buyers who want reliable information should read the ingredient list rather than trust marketing terms.\n\nWhat is the author's main point?":
    {
      takeaway:
        "The main point is the author's central claim, stated at the strength the passage actually argues.",
      whyCorrect:
        "No legal definition, loose usage, and a sugary 'natural' cereal all support one conclusion: the label does not tell you whether a food is healthy.",
      distractors: {
        "0": "Cereal is an example, not the subject; the passage never ranks foods.",
        "1": "The passage says manufacturers *may* apply the term loosely — intentional deception is a stronger charge than the text makes.",
        "3": "Sugar illustrates the problem; the passage recommends reading the whole ingredient list.",
      },
      commonMistake:
        "Overshooting into a harsher claim. 'Natural' being unreliable is what the evidence supports; 'most manufacturers deceive customers' is an accusation the passage carefully avoids.",
    },
  "Read the passage and answer the question.\n\nThe axolotl, a salamander native to a single lake system in Mexico, has fascinated scientists for one striking reason: it can regrow lost body parts. A severed limb returns within weeks, complete with bone, muscle, and nerves. Researchers have even observed the axolotl rebuild portions of its heart and spinal cord. Because of these abilities, laboratories around the world now breed the animal to study how regeneration works.\n\nWhat is the main idea of this passage?":
    {
      takeaway: "The main idea joins the subject to why it matters.",
      whyCorrect:
        "Regrown limbs, rebuilt hearts and spinal cords, and labs breeding the animal all serve one claim: this regenerative ability makes the axolotl scientifically valuable.",
      distractors: {
        "0": "The labs breed axolotls specifically, and only because of regeneration.",
        "2": "Its native range is background detail from the opening clause.",
        "3": "The weeks-long regrowth is one example of the ability, not the idea itself.",
      },
      commonMistake:
        "Choosing the most memorable fact. Three of these options are true statements from the passage; only one states what the passage is arguing.",
    },
  "Read the passage and answer the question.\n\nMany people assume that bamboo is a kind of tree, but it is actually a grass. Unlike trees, which add new wood in rings each year, bamboo reaches its full height in a single growing season and never thickens afterward. Its hollow, jointed stems give it the strength to sway in storms that would snap rigid trunks. Some species can grow nearly a meter in a single day.\n\nWhich sentence best states the topic of the passage?":
    {
      takeaway:
        "A good topic statement covers the whole passage without adding a claim.",
      whyCorrect:
        "Every sentence contrasts bamboo with trees or describes how it grows, so the topic spans both threads.",
      distractors: {
        "0": "Fastest-growing plants generally is broader than this passage, which stays on bamboo.",
        "2": "Storms appear in one clause, illustrating the strength of hollow stems.",
        "3": "Tree rings are the comparison point, not the subject.",
      },
      commonMistake:
        "Choosing a topic that is too broad or too narrow. The right statement fits the passage exactly — nothing important left out, nothing extra promised.",
    },
  "Read the passage and answer the question.\n\nThe lighthouse keeper's job was once one of the loneliest in the world. Stationed for months on rocky islands, keepers trimmed wicks, polished lenses, and wound the heavy clockwork that turned the light. They kept detailed logs of passing ships and changing weather. When automation arrived in the twentieth century, machines took over these tasks, and the last keepers were sent home.\n\nWhich detail from the passage supports the idea that the keeper's work was demanding?":
    {
      takeaway:
        "Match the detail to the exact idea named — here, that the work was demanding.",
      whyCorrect:
        "Trimming wicks, polishing lenses, and winding heavy clockwork is a list of continuous physical labor, which is what makes the job demanding.",
      distractors: {
        "0": "The arrival of automation explains how the job ended.",
        "1": "Rocky islands support the loneliness of the job, a different idea from its difficulty.",
        "3": "Keepers being sent home is the outcome, not evidence about the work itself.",
      },
      commonMistake:
        "Grabbing the detail that supports the passage's most prominent idea. Loneliness opens the passage, but the question asks about demanding work, and those are separate claims with separate evidence.",
    },
  "Read the following passage, then select all statements that are supporting details for the main idea. Passage: Regular sleep benefits the body in measurable ways. People who sleep at least seven hours show stronger immune responses to infection. Consistent sleep also improves memory by helping the brain consolidate what it learned during the day. In addition, adequate rest lowers the risk of high blood pressure over time. The main idea is that regular sleep produces clear physical and mental benefits. Select all of the supporting details.":
    {
      takeaway:
        "Supporting details are the specific evidence under the claim — the claim itself is not one of them.",
      whyCorrect:
        "Immune response, memory consolidation, and blood pressure are three specific benefits, each demonstrating the general claim about sleep.",
      distractors: {
        "0": "This is the main idea, quoted from the passage. A claim cannot serve as evidence for itself.",
      },
      commonMistake:
        "Selecting the main idea along with the details because it is true and clearly stated. The question asks what supports the claim, which excludes the claim.",
    },

  // Comprehension of written directions.
  // Find the step the question names, then move exactly one position in the
  // direction asked — "immediately after" means the very next instruction, not
  // the next one that sounds important. Two other habits matter: a prohibition
  // ("do not," "never") is as binding as an instruction, and a stated reason
  // ("because," "as") is the answer to any why question.
  "Read the directions and answer the question.\n\nTo brew a cup of loose-leaf tea: (1) Heat water until it just begins to boil. (2) Place one teaspoon of leaves in the strainer. (3) Pour the hot water over the leaves and steep for four minutes. (4) Remove the strainer and discard the leaves before drinking.\n\nAccording to the directions, what should you do immediately after pouring the hot water over the leaves?":
    {
      takeaway: "Locate the step, then read the words that follow it.",
      whyCorrect:
        "Step 3 pairs pouring with steeping in the same instruction: pour, then steep four minutes.",
      distractors: {
        "0": "Adding leaves to the strainer is step 2, before the pour.",
        "1": "Discarding the leaves is step 4, after the steeping is done.",
        "2": "Heating the water is step 1.",
      },
      commonMistake:
        "Skipping to the last step because it feels like the finish. 'Immediately after' asks for one step forward, not the end of the process.",
    },
  "Read the directions and answer the question.\n\nMedication instructions: Take one tablet by mouth twice daily with food. Do not take more than two tablets in a 24-hour period. If you miss a dose, take it as soon as you remember, unless it is almost time for your next dose. Do not double the dose to make up for a missed one.\n\nA patient realizes she missed a dose, but her next scheduled dose is in 30 minutes. According to the directions, what should she do?":
    {
      takeaway:
        "The exception clause — 'unless' — governs cases that meet its condition.",
      whyCorrect:
        "Take it as soon as you remember applies *unless* the next dose is near. Thirty minutes away is near, so the missed dose is skipped and the schedule resumes.",
      distractors: {
        "0": "The directions explicitly forbid doubling up for a missed dose.",
        "1": "Two tablets within 30 minutes is doubling in practice and risks exceeding the daily limit.",
        "2": "Nothing instructs the patient to stop taking the medication for a day.",
      },
      commonMistake:
        "Following the first half of the rule and stopping at the comma. The word 'unless' exists to overrule what came before it, and this scenario was written to trigger it.",
    },
  "Read the directions and answer the question.\n\nTo assemble the bookshelf: First, attach the two side panels to the base using the four long screws. Next, slide each shelf into the grooves, starting from the bottom. Then secure the back panel with the small nails. Finally, tighten all screws once every piece is in place.\n\nAccording to the directions, when should the back panel be secured?":
    {
      takeaway:
        "Sequence words — first, next, then, finally — fix each step's position.",
      whyCorrect:
        "'Then secure the back panel' follows 'Next, slide each shelf into the grooves,' placing it directly after the shelves go in.",
      distractors: {
        "1": "The side panels are attached first, before anything else.",
        "2": "The shelves go in before the back panel, not after.",
        "3": "Tightening all screws is the final step, after the back panel is on.",
      },
      commonMistake:
        "Answering from how you would build it yourself. The question asks what these directions say, and assembly order is exactly what a manual specifies.",
    },
  "Read the directions and answer the question.\n\nTo reset the thermostat: First, slide the power switch on the right side to OFF and wait ten seconds. Next, press and hold the MENU button until the screen blinks twice. Then release the button and slide the power switch back to ON. Finally, set your preferred temperature using the arrow keys.\n\nAccording to the directions, what should you do immediately after the screen blinks twice?":
    {
      takeaway:
        "The blinking screen is a signal marking the end of one step and the start of the next.",
      whyCorrect:
        "You hold MENU *until* the screen blinks twice, and the next instruction begins 'Then release the button.'",
      distractors: {
        "0": "Sliding the switch to OFF is the first step, long before the blink.",
        "1": "Setting the temperature is the final step, after the power is back on.",
        "3": "The ten-second wait belongs to step one.",
      },
      commonMistake:
        "Reading the blink as the end of the procedure. It is a checkpoint inside the middle step; two instructions still follow it.",
    },
  "Read the directions and answer the question.\n\nBefore applying the wood stain, sand the surface with the grain using medium-grit paper, then wipe away all dust with a damp cloth and let the wood dry completely. Do not apply stain to a damp surface. Stir the stain gently; never shake the can, as shaking creates bubbles that mar the finish. Apply a thin coat with a brush, following the grain.\n\nAccording to the directions, why should you stir rather than shake the stain?":
    {
      takeaway: "When directions give a reason, the reason is the answer.",
      whyCorrect:
        "The text states it outright: shaking creates bubbles that mar the finish.",
      distractors: {
        "0": "Drying time depends on the damp cloth step, not on how the can is handled.",
        "2": "Sanding is a separate step performed with paper, not by stirring.",
        "3": "Dust is removed with a damp cloth before staining begins.",
      },
      commonMistake:
        "Hunting for outside knowledge about stain. The clause after 'as' supplies the reason directly — a why question about directions is usually a locating task.",
    },
  "Read the directions and answer the question.\n\nLab safety procedure for spilled acid: If acid contacts skin, immediately flush the area with cool running water for at least fifteen minutes. Remove any contaminated clothing while flushing. Do not apply ointment or neutralizing chemicals to the skin. After flushing, notify the lab supervisor and complete an incident report.\n\nAccording to the procedure, which action is prohibited after acid contacts the skin?":
    {
      takeaway:
        "Scan for the prohibition — the sentence beginning 'Do not' names what is forbidden.",
      whyCorrect:
        "The procedure states plainly: do not apply ointment or neutralizing chemicals to the skin.",
      distractors: {
        "0": "Notifying the supervisor is required after flushing.",
        "2": "Removing contaminated clothing is instructed, and done while flushing.",
        "3": "Flushing with cool running water is the first required action.",
      },
      commonMistake:
        "Choosing what seems medically helpful. Neutralizing an acid on skin releases heat and worsens the burn, which is why the procedure forbids it — but you do not need that knowledge, only the 'Do not' line.",
    },
  "Read the following directions for brewing a cup of loose-leaf tea, then arrange the steps in the correct order. Directions: Begin by heating fresh water until it is just below boiling. While the water heats, place one teaspoon of loose leaves into the empty pot. Pour the hot water over the leaves and cover the pot. Allow the tea to steep for three minutes. Finally, strain the tea into your cup and serve. Put the steps in the correct order.":
    {
      takeaway:
        "Order by the signal words, and note that 'while' marks a step that happens during another.",
      steps: [
        "'Begin by' marks heating the water as first.",
        "'While the water heats' places adding the leaves next.",
        "Pour the hot water over the leaves and cover the pot.",
        "Steep for three minutes.",
        "'Finally' marks straining and serving as last.",
      ],
      whyCorrect:
        "The directions chain each action to the one before it, giving heat, add leaves, pour, steep, strain.",
      commonMistake:
        "Placing the leaves after the pour. The leaves go into the empty pot while the water is still heating — pouring water over them is what starts the brewing.",
    },
  "Read the following instructions for resetting a wireless router, then place the steps in the correct order. Instructions: First, unplug the router's power cable from the wall outlet. Once it is unplugged, wait a full thirty seconds before doing anything else. Next, reconnect the power cable and wait for the indicator lights to turn solid green. After the lights are steady, open your device's settings and reconnect to the network. Only when you are reconnected should you test the connection by loading a web page. Arrange the steps from first to last.":
    {
      takeaway:
        "Each instruction names its predecessor — follow the chain rather than guessing.",
      steps: [
        "'First' marks unplugging the power cable.",
        "'Once it is unplugged' places the thirty-second wait second.",
        "'Next' reconnects the cable and waits for solid green lights.",
        "'After the lights are steady' opens settings and rejoins the network.",
        "'Only when you are reconnected' places the web-page test last.",
      ],
      whyCorrect:
        "Every step is anchored to the one preceding it, fixing the order from unplug through test.",
      commonMistake:
        "Testing the connection before rejoining the network. The instructions gate that step behind 'only when' for a reason — there is nothing to test until the device is back on the network.",
    },

  // Interpreting events in a sequence.
  // Passages rarely narrate in chronological order. Words like before, after,
  // once, until, and by the time reorder events on the page, so build the actual
  // timeline from those markers instead of from the order sentences appear. On
  // "right before" and "directly after" questions, move exactly one event.
  "Read the passage and answer the question.\n\nLena first sketched the design on paper. After she was satisfied with the drawing, she selected her fabrics and cut out each piece. She then sewed the pieces together and, last of all, stitched a label with her initials onto the finished bag.\n\nAccording to the passage, what did Lena do right before sewing the pieces together?":
    {
      takeaway: "'Right before' means the single event immediately preceding.",
      whyCorrect:
        "She selected fabrics and cut out each piece, and the next sentence begins 'She then sewed the pieces together.'",
      distractors: {
        "1": "Sketching is first, two steps before the sewing.",
        "2": "Selling the bag never happens in the passage.",
        "3": "The label is stitched on last, after the sewing.",
      },
      commonMistake:
        "Choosing the first event because the question asks what came before. 'Right before' points to the nearest earlier step, not the earliest one.",
    },
  "Read the passage and arrange the events in the order they occurred.\n\nThe storm began as a calm afternoon turned dark. First, thick clouds gathered over the hills. Then a strong wind bent the trees and scattered leaves across the yard. Rain followed, falling harder by the minute. At last, a bright flash of lightning lit the sky, and thunder rolled through the valley.\n\nArrange these events in chronological order:":
    {
      takeaway:
        "When a passage narrates in order, the signal words do the work for you.",
      steps: [
        "'First' — thick clouds gather over the hills.",
        "'Then' — strong wind bends the trees.",
        "'Rain followed' — rain falls harder by the minute.",
        "'At last' — lightning flashes and thunder rolls.",
      ],
      whyCorrect:
        "Each stage of the storm is tagged with an explicit order word, giving clouds, wind, rain, lightning.",
      commonMistake:
        "Reordering by what feels most dramatic. Lightning is the storm's climax and also the last thing described — here the passage's order and the timeline agree.",
    },
  "Read the passage and answer the question.\n\nThe recipe came together quickly. Before turning on the oven, Marcus greased the pan. He preheated the oven only after the batter was fully mixed. Once the oven reached temperature, he poured in the batter and baked the cake for thirty minutes.\n\nAccording to the passage, which event happened first?":
    {
      takeaway:
        "Rebuild the timeline from the anchors, not from sentence order.",
      whyCorrect:
        "Greasing the pan is anchored to 'before turning on the oven,' and it is the first action the passage attributes to Marcus; the remaining events form the chain mix, preheat, pour.",
      distractors: {
        "1": "Mixing is tied to the preheat, which comes after the greasing.",
        "2": "The oven is preheated only after the batter is mixed.",
        "3": "Pouring waits until the oven reaches temperature — the last of the four.",
      },
      commonMistake:
        "Assuming preheating comes first because that is how most recipes run. This passage states the opposite order, and the question asks about this passage.",
    },
  "Read the passage and answer the question.\n\nDeshawn's morning followed its usual order. He woke to his alarm at six, then laced up his shoes for a short run around the block. When he returned, he showered and ate a bowl of oatmeal. Only after rinsing his bowl did he sit down to review his notes for the chemistry exam scheduled that afternoon.\n\nAccording to the passage, what did Deshawn do immediately before reviewing his notes?":
    {
      takeaway: "'Only after X did he Y' places X directly before Y.",
      whyCorrect:
        "The passage says he sat down to review only after rinsing his bowl, making the rinse the immediately preceding action.",
      distractors: {
        "0": "Lacing his shoes comes early, before the run.",
        "1": "Waking at six is the first event of the morning.",
        "3": "The shower precedes the oatmeal, which precedes the rinsing.",
      },
      commonMistake:
        "Overlooking small actions like rinsing a bowl. The passage mentions it precisely because it is the hinge the question turns on.",
    },
  "Read the directions for brewing tea, then arrange the steps in the correct order from first to last.\n\nTo brew a proper cup of loose-leaf tea, begin by heating fresh water until it just reaches a boil. Pour the hot water over the leaves resting in the strainer. Allow the tea to steep for four minutes. Once the time is up, lift out the strainer and discard the spent leaves.":
    {
      takeaway:
        "Here the directions are narrated in order — read straight through and follow.",
      steps: [
        "'Begin by' — heat fresh water until it just boils.",
        "Pour the hot water over the leaves in the strainer.",
        "Let the tea steep for four minutes.",
        "'Once the time is up' — lift out the strainer and discard the leaves.",
      ],
      whyCorrect:
        "Each sentence gives the next action, ending with the strainer coming out after the four minutes.",
      commonMistake:
        "Removing the strainer before the steeping finishes. 'Once the time is up' gates that step behind the full four minutes.",
    },
  "Read the passage and answer the question.\n\nThe historical marker summarized the mill's life in a few lines. Founded in 1840, the textile mill prospered until a fire gutted it in 1871. Rebuilt within two years, it ran steadily until the river was dammed upstream in 1908, cutting its water power. The mill closed for good in 1915 and was converted into apartments in 1990.\n\nAccording to the passage, which event happened directly after the mill was rebuilt?":
    {
      takeaway:
        "With dates on the page, order the years and read off the next one.",
      whyCorrect:
        "The rebuild came within two years of the 1871 fire, so about 1873; the next dated event is the 1908 dam that cut the mill's water power.",
      distractors: {
        "0": "The conversion to apartments is 1990, the last event listed.",
        "1": "The founding is 1840, before the fire and the rebuild.",
        "3": "The fire is 1871 — what caused the rebuild, not what followed it.",
      },
      commonMistake:
        "Choosing the fire because it sits closest to the rebuild in the sentence. The rebuild is the response to the fire, which puts the fire before it.",
    },
  "Read the following short narrative, then arrange the events in the order they occurred. Narrative: Before the storm arrived, Mara stacked sandbags along the riverbank. The rain fell for two days straight, and the river crept over its banks despite her efforts. When the water finally receded, she walked outside to survey the muddy yard. Only then did she notice that her garden fence had washed away entirely. Order the events from first to last.":
    {
      takeaway:
        "'Before,' 'when,' and 'only then' each fix one event against another.",
      steps: [
        "'Before the storm arrived' — Mara stacks sandbags.",
        "Rain falls for two days and the river overflows.",
        "'When the water finally receded' — she surveys the muddy yard.",
        "'Only then' — she notices the fence is gone.",
      ],
      whyCorrect:
        "The markers chain the four events from the sandbags through the missing fence.",
      commonMistake:
        "Placing the missing fence with the flood, since that is when it washed away. The question orders when events are *narrated as occurring* to Mara, and she discovers the loss only after the water recedes.",
    },
  "Read the following passage, then arrange the events in chronological order. Passage: By the time the museum reopened, the restored painting had already drawn crowds for a week. The restoration itself had taken nearly a year, beginning shortly after a leaking roof damaged the canvas. Long before that leak, the painting had hung untouched in the same gallery for three decades. After the reopening, attendance figures doubled compared with the previous season. Order the events from earliest to latest.":
    {
      takeaway:
        "This passage runs backward before running forward — rebuild the timeline from the markers.",
      steps: [
        "'Long before that leak' — the painting hangs untouched for three decades.",
        "A leaking roof damages the canvas.",
        "The restoration begins shortly after the leak and takes nearly a year.",
        "'By the time the museum reopened' — the museum reopens and crowds gather.",
        "'After the reopening' — attendance doubles over the season.",
      ],
      whyCorrect:
        "Working from the anchors gives three decades hanging, the leak, the year-long restoration, the reopening, then the doubled attendance.",
      commonMistake:
        "Ordering by the sentences as written, which would start with the reopening. 'Long before,' 'had already,' and 'by the time' are all signals that the passage is moving backward through time.",
    },

  // Mendelian inheritance.
  // Draw the Punnett square — two seconds of work removes all guessing. Two
  // crosses cover most items: Bb × Bb gives 3 dominant : 1 recessive (so 1/4
  // recessive), and Bb × bb gives 1 : 1 (so 1/2 recessive). Keep genotype (the
  // allele pair) separate from phenotype (what you see): a recessive trait
  // appears only when both alleles are recessive.
  "In pea plants, the allele for tall (T) is dominant over the allele for short (t). What is the phenotype of a plant with the genotype Tt?":
    {
      takeaway:
        "One dominant allele is enough to produce the dominant phenotype.",
      whyCorrect:
        "T is dominant, so a Tt plant looks exactly like a TT plant: tall.",
      distractors: {
        "0": "Blending is not how dominance works — T masks t rather than averaging with it.",
        "2": "Short requires tt, two recessive alleles.",
        "3": "The genotype determines it completely; Tt is always tall for a fully dominant trait.",
      },
      commonMistake:
        "Expecting a heterozygote to look intermediate. That happens in incomplete dominance, which a problem will tell you about explicitly.",
    },
  "In rabbits, brown fur (B) is dominant over white fur (b). Two heterozygous brown rabbits are crossed (Bb x Bb). What fraction of the offspring are expected to have white fur?":
    {
      takeaway: "Bb × Bb yields 3 dominant : 1 recessive.",
      steps: [
        "Each parent contributes B or b.",
        "The four combinations are BB, Bb, Bb, bb.",
        "Only bb is white: 1 of 4.",
      ],
      whyCorrect:
        "One of the four squares is bb, so 1/4 of offspring are expected white.",
      distractors: {
        "0": "Both parents carry a hidden b, so white offspring are possible.",
        "1": "1/2 recessive comes from a Bb × bb cross, not Bb × Bb.",
        "3": "3/4 is the brown fraction — the dominant phenotype.",
      },
      commonMistake:
        "Reporting 3/4 because that number is the memorable one. Read which phenotype the question asked for; here it is the recessive.",
    },
  "In a certain plant, purple flowers (P) are dominant over white flowers (p). A homozygous purple plant (PP) is crossed with a white plant (pp). What percentage of the offspring are expected to have purple flowers?":
    {
      takeaway:
        "A homozygous dominant parent gives every offspring at least one dominant allele.",
      steps: [
        "PP can only contribute P; pp can only contribute p.",
        "Every offspring is Pp.",
        "Pp shows the dominant phenotype: 100% purple.",
      ],
      whyCorrect: "All four squares are Pp, so every offspring flowers purple.",
      distractors: {
        "0": "25% would require both parents to carry a recessive allele.",
        "1": "50% comes from a heterozygous × recessive cross.",
        "3": "75% is the Pp × Pp result, but neither parent here is heterozygous.",
      },
      commonMistake:
        "Assuming the white parent must produce some white offspring. It contributes p to every offspring, but each one also receives P, which masks it.",
    },
  "In guinea pigs, black coat (B) is dominant over brown (b). A heterozygous black guinea pig is crossed with a brown guinea pig (Bb x bb). What fraction of the offspring are expected to be brown?":
    {
      takeaway: "Heterozygous × homozygous recessive gives a 1 : 1 split.",
      steps: [
        "Bb contributes B or b; bb contributes only b.",
        "Offspring are Bb, Bb, bb, bb.",
        "Two of four are bb: 1/2 brown.",
      ],
      whyCorrect:
        "Half the squares are bb, so 1/2 of offspring are expected brown.",
      distractors: {
        "0": "3/4 belongs to a Bb × Bb cross.",
        "1": "The Bb parent can pass b, and the bb parent always does, so brown offspring occur.",
        "2": "1/4 is the recessive fraction when both parents are heterozygous.",
      },
      commonMistake:
        "Reusing the 3 : 1 ratio for every cross. The ratio depends on the parents — check both genotypes before reaching for a remembered fraction.",
    },
  "Mendel's law of segregation states that during gamete formation, the two alleles for a trait separate so that each gamete carries which of the following?":
    {
      takeaway:
        "Segregation means each gamete gets exactly one allele per trait.",
      whyCorrect:
        "The paired alleles separate during meiosis, so each sperm or egg carries a single allele — which is why offspring end up with one from each parent.",
      distractors: {
        "0": "A gamete with no allele could not contribute to the trait at all.",
        "2": "The number is fixed at one, not random.",
        "3": "Both alleles staying together would double the count each generation.",
      },
      commonMistake:
        "Confusing segregation with independent assortment. Segregation is about the two alleles of one trait separating; independent assortment is about different traits sorting independently of each other.",
    },
  "In pea plants, purple flower color (P) is dominant to white (p). Two heterozygous purple-flowered plants (Pp) are crossed. What fraction of the offspring is expected to have white flowers?":
    {
      takeaway: "Two heterozygous parents give 3 dominant : 1 recessive.",
      steps: [
        "Each Pp parent contributes P or p.",
        "Offspring are PP, Pp, Pp, pp.",
        "Only pp is white: 1/4.",
      ],
      whyCorrect:
        "One square in four is pp, so 1/4 of offspring are expected white.",
      distractors: {
        "0": "Each parent carries a masked p, so white offspring can appear.",
        "1": "3/4 is the purple fraction.",
        "2": "1/2 would require one parent to be homozygous recessive.",
      },
      commonMistake:
        "Assuming a trait absent in both parents cannot appear in the offspring. Two purple plants can produce a white one precisely because each hides a recessive allele.",
    },
  "In a certain plant, tall (T) is dominant to short (t). A test cross is performed between a tall plant of unknown genotype and a short plant (tt), producing 50% tall and 50% short offspring. What is the genotype of the tall parent?":
    {
      takeaway:
        "A test cross reveals a hidden allele: any short offspring means the tall parent carried t.",
      steps: [
        "If the tall parent were TT, every offspring would receive T and be tall.",
        "Half the offspring are short (tt), so they received t from each parent.",
        "The tall parent must therefore be Tt.",
      ],
      whyCorrect:
        "Only a Tt parent crossed with tt produces the observed 50/50 split.",
      distractors: {
        "0": "tt would be short, but the parent is described as tall.",
        "2": "TTtt is four alleles for one trait; each plant carries two.",
        "3": "TT would give 100% tall offspring, not 50%.",
      },
      commonMistake:
        "Overlooking what the short offspring prove. They are the entire point of a test cross — a recessive offspring can only come from two recessive alleles.",
    },
  "In snapdragons, flower color shows incomplete dominance: red (RR) crossed with white (rr) produces all pink (Rr) flowers. If two pink snapdragons are crossed, what phenotype ratio is expected in the offspring?":
    {
      takeaway:
        "Under incomplete dominance each genotype has its own phenotype, so the ratio is 1 : 2 : 1.",
      steps: [
        "Rr × Rr gives RR, Rr, Rr, rr.",
        "RR is red, Rr is pink, rr is white.",
        "The ratio is 1 red : 2 pink : 1 white.",
      ],
      whyCorrect:
        "With no allele masking the other, the genotype ratio shows through directly as the phenotype ratio.",
      distractors: {
        "0": "3 pink : 1 white would require pink to mask red, but RR shows as red.",
        "2": "3 red : 1 white is the complete-dominance result, which does not apply here.",
        "3": "All pink is the first generation, from RR × rr; crossing two pinks reintroduces both extremes.",
      },
      commonMistake:
        "Applying the 3 : 1 ratio out of habit. The genotype ratio is always 1 : 2 : 1 — complete dominance merges the first two into 3, and incomplete dominance leaves all three visible.",
    },

  // Genetic material and protein structure.
  // The central dogma runs one direction: DNA → transcription → RNA →
  // translation → protein. Two mechanical facts settle most items: RNA uses
  // uracil wherever DNA would use thymine, and transcription reads a template,
  // so the mRNA is the complement of that strand (A→U, T→A, C→G, G→C).
  "During transcription, the genetic information in DNA is used to produce which molecule?":
    {
      takeaway: "Transcription makes RNA from DNA.",
      whyCorrect:
        "The DNA sequence is copied into messenger RNA, which then carries the instructions out to the ribosome.",
      distractors: {
        "0": "Copying DNA to DNA is replication, not transcription.",
        "2": "Phospholipids are membrane lipids, unrelated to gene expression.",
        "3": "Protein is made in translation, the step after transcription.",
      },
      commonMistake:
        "Merging the two steps. Transcription and translation happen in sequence, and each question usually hinges on which one it names.",
    },
  "A segment of DNA template has the base sequence TAC. What is the corresponding mRNA codon transcribed from this template?":
    {
      takeaway:
        "Pair each template base with its complement, using U in place of T.",
      steps: [
        "T pairs with A.",
        "A pairs with U (RNA uses uracil, not thymine).",
        "C pairs with G.",
        "The codon is AUG.",
      ],
      whyCorrect:
        "Complementing TAC while substituting uracil gives AUG — the start codon.",
      distractors: {
        "0": "ATG complements correctly but keeps thymine, which RNA does not use.",
        "1": "UAC copies the template instead of complementing it, changing only T to U.",
        "2": "TAC is the template itself, unchanged.",
      },
      commonMistake:
        "Copying rather than complementing. Transcription builds the opposite strand, so every base changes — and then T becomes U.",
    },
  "Which best describes the correct flow of genetic information during gene expression?":
    {
      takeaway: "DNA → RNA → protein, transcription then translation.",
      whyCorrect:
        "DNA is transcribed into RNA, and RNA is translated into protein. The verbs match the steps.",
      distractors: {
        "0": "The molecules are in order but the verbs are swapped — DNA is transcribed, not translated.",
        "1": "RNA to DNA is reverse transcription, a special case, not ordinary gene expression.",
        "2": "This runs the entire pathway backwards.",
      },
      commonMistake:
        "Matching on the molecules and ignoring the verbs. One option lists DNA, RNA, and protein in the right order and is still wrong because it misassigns transcription and translation.",
    },
  "Translation of mRNA into a polypeptide takes place at which cellular structure, where amino acids are joined in the order specified by codons?":
    {
      takeaway: "Ribosomes read codons and build polypeptides.",
      whyCorrect:
        "The ribosome is the site where tRNA delivers amino acids matched to each mRNA codon and peptide bonds form between them.",
      distractors: {
        "0": "Mitochondria have their own ribosomes, but 'matrix only' excludes the cytoplasmic ribosomes that do most translation.",
        "2": "The cell membrane controls what enters and leaves the cell.",
        "3": "The nucleus is where transcription occurs; mRNA leaves it to be translated.",
      },
      commonMistake:
        "Placing translation in the nucleus because that is where the DNA lives. The mRNA is made there and then exported — the two steps happen in different compartments.",
    },
  "A point mutation changes a single DNA base, which alters one codon so that a different amino acid is inserted into a protein. This illustrates that the sequence of DNA bases ultimately determines which property of a protein?":
    {
      takeaway:
        "DNA sequence sets amino acid sequence, and amino acid sequence sets structure.",
      whyCorrect:
        "Each codon specifies an amino acid, so changing a base changes the amino acid — and the resulting chain folds differently.",
      distractors: {
        "0": "Mitochondrial count is a matter of cell type and energy demand.",
        "1": "Most proteins function outside the nucleus; location is not set by a single codon.",
        "2": "Cell wall thickness is a structural feature of plant and bacterial cells, not a property of one protein.",
      },
      commonMistake:
        "Stopping at 'amino acid sequence' and missing why it matters. Sequence determines folding, folding determines shape, and shape determines whether the protein works — which is how one base can cause disease.",
    },
  "During transcription, a segment of DNA template reads 3'-TACGGT-5'. What is the corresponding sequence of the messenger RNA produced?":
    {
      takeaway:
        "Complement every base and write U wherever the template has A.",
      steps: [
        "T → A, A → U, C → G.",
        "G → C, G → C, T → A.",
        "The mRNA reads 5'-AUGCCA-3'.",
      ],
      whyCorrect:
        "Complementing 3'-TACGGT-5' with uracil in place of thymine gives 5'-AUGCCA-3', running antiparallel to the template.",
      distractors: {
        "0": "5'-UACGGU-3' copies the template and swaps T for U instead of complementing.",
        "2": "5'-TACGGT-3' is the template itself.",
        "3": "5'-ATGCCA-3' complements correctly but keeps thymine, so it is DNA, not RNA.",
      },
      commonMistake:
        "Doing one of the two operations. The sequence must be both complemented and converted to uracil — the distractors here are built from doing only one.",
    },
  "A point mutation changes a single DNA base, yet the resulting protein has the exact same amino acid sequence as before. Which term best describes this type of mutation?":
    {
      takeaway:
        "A silent mutation changes a base without changing the amino acid.",
      whyCorrect:
        "Several codons can specify the same amino acid, so a base change — often in the third position — can leave the protein untouched.",
      distractors: {
        "1": "A nonsense mutation creates a stop codon and truncates the protein.",
        "2": "A frameshift comes from an insertion or deletion that shifts codon boundaries, not from a substitution.",
        "3": "A missense mutation does change the amino acid, which this one did not.",
      },
      commonMistake:
        "Assuming every base change alters the protein. The genetic code is redundant, and that redundancy is what makes silent mutations possible.",
    },
  "In a eukaryotic cell, in which location does translation, the assembly of a polypeptide from a messenger RNA template, take place?":
    {
      takeaway:
        "Translation happens at ribosomes, in the cytoplasm or on the rough ER.",
      whyCorrect:
        "The ribosome is where mRNA is read and amino acids are joined into a polypeptide.",
      distractors: {
        "0": "The Golgi apparatus modifies and packages proteins after they are made.",
        "1": "The nucleus houses DNA and transcription.",
        "2": "The nucleolus assembles ribosome subunits but does not translate mRNA itself.",
      },
      commonMistake:
        "Choosing the nucleolus because it involves ribosomes. It is the factory that builds ribosomes; the finished ribosomes leave the nucleus to do the translating.",
    },

  // Prefixes.
  // A prefix carries the same meaning into every word it attaches to, so the
  // fastest check is to test a candidate meaning against a word you already
  // know that shares the prefix. If "mal-" means bad, it should work in
  // malfunction, malpractice, and malnourished alike — and it does.
  'The prefix in the word "malfunction" most nearly means which of the following?':
    {
      takeaway: "mal- means bad or badly.",
      whyCorrect:
        "A malfunction is a faulty working — the same mal- appears in malpractice and malnourished, all carrying the sense of something gone wrong.",
      distractors: {
        "0": "Again or repeated is re-, as in rewrite or repeat.",
        "1": "Before in time is pre- or ante-, as in preview or antecedent.",
        "3": "Many is multi- or poly-, as in multiple or polygon.",
      },
      commonMistake:
        "Guessing from the whole word instead of isolating the prefix. Strip 'function' away and mal- is what remains to be explained.",
    },
  'Based on its prefix, the word "antecedent" refers to something that comes in what way?':
    {
      takeaway: "ante- means before.",
      whyCorrect:
        "An antecedent comes before — the same ante- appears in antebellum (before the war) and anteroom (the room you pass through first).",
      distractors: {
        "1": "Around is circum-, as in circumference.",
        "2": "Against is anti-, a different prefix despite the similar spelling.",
        "3": "After is post-, as in postwar or postpone.",
      },
      commonMistake:
        "Confusing ante- with anti-. One letter separates 'before' from 'against' — antebellum precedes a war, antiwar opposes one.",
    },
  'Using the prefix, what does "circumnavigate" most likely mean?': {
    takeaway: "circum- means around.",
    whyCorrect:
      "Circum- plus navigate gives sailing around, matching circumference, the distance around a circle.",
    distractors: {
      "0": "Across is trans-, as in transatlantic.",
      "2": "Under is sub-, as in submarine.",
      "3": "Against is anti- or contra-.",
    },
    commonMistake:
      "Reaching for the most common travel word rather than the prefix's meaning. Each wrong option here matches a real prefix — just not this one.",
  },
  'The prefix in "benevolent" suggests that a benevolent person is characterized by what quality?':
    {
      takeaway: "bene- means good or well.",
      whyCorrect:
        "Benevolent joins bene- (good) with a root meaning wishing, so it describes good will — the same bene- appears in benefit and beneficial.",
      distractors: {
        "0": "Fear is phobia, as in claustrophobia.",
        "1": "Ill will is malevolent, built on mal- instead of bene-.",
        "3": "Indifference has no prefix marking it; benevolence is an active good will.",
      },
      commonMistake:
        "Missing that benevolent and malevolent share a root and differ only in prefix. That pairing is the clearest demonstration of how much work a prefix does.",
    },
  'The prefix in the word "circumnavigate" means "around." Based on this, what does it mean to circumnavigate an island?':
    {
      takeaway:
        "With the prefix given, apply it literally to the rest of the word.",
      whyCorrect:
        "Around plus navigate means traveling a full circuit of the island rather than crossing or stopping on it.",
      distractors: {
        "1": "Building a settlement has nothing to do with navigating.",
        "2": "Directly across contradicts 'around' — that would be trans-.",
        "3": "Studying wildlife is an activity, not a description of the route.",
      },
      commonMistake:
        "Ignoring the definition the question hands you. When a prefix is supplied, the item is testing whether you can apply it, not whether you memorized it.",
    },
  'The prefix "mal-" means "bad" or "badly." Which word uses this prefix to describe something that is poorly nourished?':
    {
      takeaway:
        "Read the second half of the word — the prefix is the same across all four options.",
      whyCorrect:
        "Malnourished is mal- plus nourished: badly nourished, exactly what the question describes.",
      distractors: {
        "0": "Malfunction is badly *functioning*, about operation rather than nutrition.",
        "2": "Malicious means having bad intent.",
        "3": "Maladjusted means badly adjusted or adapted.",
      },
      commonMistake:
        "Scanning for the prefix when every choice already has it. The prefix is the constant here; the root is the variable that decides the answer.",
    },
  'The prefix "ambi-" means "both." Using this knowledge, what is the most likely meaning of "ambivalent" in the sentence: "She felt ambivalent about the move, eager for the adventure yet sad to leave home"?':
    {
      takeaway:
        "Combine the prefix's meaning with the evidence the sentence supplies.",
      whyCorrect:
        "Both plus the sentence's 'eager … yet sad' gives two opposing feelings held at once — the same ambi- appears in ambidextrous, skilled with both hands.",
      distractors: {
        "0": "Indifference means feeling nothing; she feels two things strongly.",
        "1": "Complete opposition ignores the eagerness the sentence reports.",
        "2": "Firmly decided is the opposite of holding two conflicting feelings.",
      },
      commonMistake:
        "Treating ambivalent as a synonym for indifferent. It means pulled both ways, not unmoved — and the sentence spells out both pulls.",
    },
  "The prefix in the word 'subterranean' means ___. Enter one word.": {
    takeaway: "sub- means under or below.",
    whyCorrect:
      "Subterranean joins sub- (under) with terra (earth), describing what lies below ground — the same sub- appears in submarine and subway.",
    commonMistake:
      "Defining the whole word instead of the prefix. The blank asks only what sub- contributes, which is 'under.'",
  },

  // Root words.
  // Roots carry the core meaning, and the same root recurs across words that
  // otherwise look unrelated. Two or more example words are the strongest tool:
  // whatever meaning fits all of them is the root's meaning. Combining a root
  // with a known prefix then unlocks words you have never seen.
  'The root in the word "aquatic" most nearly means which of the following?': {
    takeaway: "aqua means water.",
    whyCorrect:
      "Aquatic describes life in water, and the same root gives aquarium and aqueduct.",
    distractors: {
      "0": "Earth is terra, as in terrain or subterranean.",
      "1": "Fire is ign-, as in ignite.",
      "3": "Air is aer-, as in aerobic or aerial.",
    },
    commonMistake:
      "Testing the root against only one word. Checking it against aquarium as well confirms water rather than any general nature meaning.",
  },
  'Based on its root, the word "chronological" is most closely related to which concept?':
    {
      takeaway: "chron means time.",
      whyCorrect:
        "Chronological order is time order, and the root recurs in chronic (lasting over time) and synchronize (to time together).",
      distractors: {
        "1": "Distance is metr- or -meter, as in odometer.",
        "2": "Color is chrom-, a similar-looking root with a different meaning.",
        "3": "Sound is aud- or phon-, as in audible or telephone.",
      },
      commonMistake:
        "Mixing up chron- and chrom-. Chronological is about time; chromatic is about color.",
    },
  'The root in the words "dictate" and "dictionary" most nearly means what?': {
    takeaway: "dict means to speak or say.",
    whyCorrect:
      "You dictate by speaking words aloud, and a dictionary collects words and how they are said — the meaning that fits both.",
    distractors: {
      "0": "To hear is aud-, as in audible.",
      "1": "To write is scrib- or graph-, as in scribble or autograph.",
      "2": "To see is spect- or vis-, as in inspect or vision.",
    },
    commonMistake:
      "Choosing 'to write' because a dictionary is a book. Test the candidate meaning against dictate too — you speak a dictation rather than write it.",
  },
  'Knowing that the root "spect" appears in "spectator," "inspect," and "spectacle," you can conclude this root means what?':
    {
      takeaway:
        "The meaning that fits every example word is the root's meaning.",
      whyCorrect:
        "A spectator watches, to inspect is to look closely, and a spectacle is something worth seeing. Looking runs through all three.",
      distractors: {
        "1": "To carry is port-, as in transport or portable.",
        "2": "To break is rupt-, as in rupture or interrupt.",
        "3": "To move or run is mob- or curr-, as in mobile or current.",
      },
      commonMistake:
        "Deciding from a single example. Three words are supplied precisely so you can rule out any meaning that fits one but not the others.",
    },
  'The root "aqua" means "water." What is the most likely meaning of an "aqueduct," given that "duct" means "to lead or carry"?':
    {
      takeaway: "Assemble the parts: water + carry.",
      whyCorrect:
        "An aqueduct is a structure that carries water from one place to another, which is exactly what the two roots spell out.",
      distractors: {
        "0": "A fish tank involves water but nothing that leads or carries it.",
        "1": "A boat travels on water rather than conveying it.",
        "3": "A rain gauge measures water; measuring is not carrying.",
      },
      commonMistake:
        "Choosing any option that mentions water. Three of the four involve water — the 'duct' half is what narrows it to one.",
    },
  'The root "dict" means "to speak" or "to say." Using this root, what does it mean to "contradict" someone?':
    {
      takeaway: "contra- (against) plus dict (speak) means to speak against.",
      whyCorrect:
        "To contradict is to say the opposite of what someone else has said, combining both word parts directly.",
      distractors: {
        "1": "Writing down speech is transcription, not contradiction.",
        "2": "Praise would need a prefix like bene-, not contra-.",
        "3": "Repeating exactly is the opposite of speaking against.",
      },
      commonMistake:
        "Using only the root and ignoring the prefix. Dict alone gives 'speak'; contra- is what makes it opposition.",
    },
  'The root "spect" means "to look" or "to see." In the sentence "The auditor reviewed the records with great circumspection," what does the root suggest about circumspection?':
    {
      takeaway:
        "Two known parts unlock an unfamiliar word: circum- (around) plus spect (look).",
      whyCorrect:
        "Looking around means examining all sides before acting — the careful, thorough review the sentence attributes to the auditor.",
      distractors: {
        "1": "Speaking loudly involves dict- or voc-, not spect-.",
        "2": "Removing records has nothing to do with looking.",
        "3": "Quick approval without review is the opposite of looking around carefully.",
      },
      commonMistake:
        "Treating an unfamiliar word as unanswerable. Circumspection contains two parts you have already met in this skill, and together they give the meaning.",
    },
  "The root 'aud' in the words 'audible,' 'auditorium,' and 'audition' relates to the act of ___. Enter one word.":
    {
      takeaway: "aud means to hear.",
      whyCorrect:
        "Audible means able to be heard, an auditorium is built for hearing, and an audition is a tryout that is listened to. Hearing fits all three.",
      commonMistake:
        "Answering 'speaking' because auditions and auditoriums involve performance. The root names the listening side — dict- and voc- cover speaking.",
    },

  // Statistics from data sets.
  // Four measures, four distinct jobs: mean is the total divided by the count,
  // median is the middle value *after sorting*, mode is the value that repeats,
  // and range is highest minus lowest. Wrong answers are almost always the right
  // arithmetic for a different measure, so read which one is being asked before
  // touching the numbers — and sort the list first whenever median is involved.
  "A student's five test scores were: 80, 85, 90, 95, 100. What is the mean (average) score?":
    {
      takeaway: "Mean = sum ÷ count.",
      steps: ["80 + 85 + 90 + 95 + 100 = 450.", "450 ÷ 5 = 90."],
      whyCorrect:
        "The five scores total 450, and dividing by 5 gives a mean of 90.",
      distractors: {
        "0": "95 is one of the scores, not the average of all five.",
        "1": "85 is also just a listed score.",
        "3": "92 is close but does not come from 450 ÷ 5.",
      },
      commonMistake:
        "Dividing by the wrong count. The divisor is how many values there are — five here, not four or six.",
    },
  "What is the median of the following data set?\n3, 8, 2, 10, 5": {
    takeaway: "Sort the values first, then take the middle one.",
    steps: [
      "Sorted: 2, 3, 5, 8, 10.",
      "Five values, so the third is the middle: 5.",
    ],
    whyCorrect: "With the list in order, 5 sits in the center position.",
    distractors: {
      "0": "8 is the middle of the list *as written*, before sorting.",
      "2": "6 is not a value in the set and does not come from any measure here.",
      "3": "5.6 is the mean (28 ÷ 5), not the median.",
    },
    commonMistake:
      "Taking the middle of the unsorted list. Sorting is the first step of finding a median, and this set is deliberately shuffled.",
  },
  "What is the mode of the following data set?\n4, 7, 7, 2, 9, 7, 3": {
    takeaway: "The mode is the value that appears most often.",
    steps: [
      "7 appears three times.",
      "Every other value appears once.",
      "The mode is 7.",
    ],
    whyCorrect: "No other value repeats, so 7 is the mode.",
    distractors: {
      "0": "3 appears once.",
      "1": "4 appears once.",
      "3": "9 appears once.",
    },
    commonMistake:
      "Choosing the largest value. Mode is about frequency, not size — count occurrences rather than comparing magnitudes.",
  },
  "A data set of weekly sales totals is: 15, 22, 8, 30, 19. What is the range of the data set?":
    {
      takeaway: "Range = largest − smallest.",
      steps: ["Largest: 30.", "Smallest: 8.", "30 − 8 = 22."],
      whyCorrect: "The spread between the extreme values is 22.",
      commonMistake:
        "Reporting the largest value, or averaging the set. Range is a single subtraction between the two extremes and ignores everything in between.",
    },
  "The hours worked by 5 employees in one week are shown:\nEmployee 1: 38, Employee 2: 40, Employee 3: 42, Employee 4: 36, Employee 5: 44.\nWhat is the mean number of hours worked?":
    {
      takeaway: "Add every value, then divide by how many there are.",
      steps: ["38 + 40 + 42 + 36 + 44 = 200.", "200 ÷ 5 = 40."],
      whyCorrect:
        "The total of 200 hours across 5 employees averages 40 hours each.",
      distractors: {
        "0": "42 is Employee 3's hours.",
        "1": "41 does not result from 200 ÷ 5.",
        "3": "38 is Employee 1's hours.",
      },
      commonMistake:
        "Picking a middle-looking value from the list. Here the mean happens to equal a listed value, but that is a coincidence — always compute it.",
    },
  "A nurse records the resting heart rates (in beats per minute) of five patients: 68, 72, 80, 75, 65. What is the mean heart rate?":
    {
      takeaway:
        "Mean = sum ÷ count, regardless of the order values are listed in.",
      steps: ["68 + 72 + 80 + 75 + 65 = 360.", "360 ÷ 5 = 72."],
      whyCorrect: "The five rates total 360, giving a mean of 72 bpm.",
      distractors: {
        "0": "80 is the highest single reading.",
        "1": "73 is near the mean but is not 360 ÷ 5.",
        "2": "75 is one patient's reading.",
      },
      commonMistake:
        "Estimating instead of adding. The distractors cluster near the true mean specifically to catch an eyeballed answer.",
    },
  "The ages of six people in a study are: 22, 31, 19, 45, 28, 37. What is the median age?":
    {
      takeaway:
        "With an even count, the median is the average of the two middle values.",
      steps: [
        "Sorted: 19, 22, 28, 31, 37, 45.",
        "Six values, so the middle two are 28 and 31.",
        "(28 + 31) ÷ 2 = 29.5.",
      ],
      whyCorrect: "Averaging the third and fourth sorted values gives 29.5.",
      distractors: {
        "0": "30 is a rounded guess between the middle values, not their average.",
        "1": "31 is only the upper of the two middle values.",
        "2": "28 is only the lower of the two.",
      },
      commonMistake:
        "Picking one of the two middle numbers. An even-sized set has no single middle value, so the median usually is not a member of the set at all.",
    },
  "A data set of daily rainfall amounts (in mm) is: 7, 12, 4, 19, 10. What is the range of the data set? Enter your answer in mm.":
    {
      takeaway: "Range = highest − lowest.",
      steps: ["Highest: 19 mm.", "Lowest: 4 mm.", "19 − 4 = 15 mm."],
      whyCorrect:
        "The rainfall spans 15 mm from the driest day to the wettest.",
      commonMistake:
        "Subtracting the first and last listed values instead of the extremes. Scan the whole set for the true maximum and minimum — the list is not in order.",
    },

  // Arithmetic with rational numbers.
  // Fractions need a common denominator to add or subtract, but never to
  // multiply. Division means multiplying by the reciprocal — flip the second
  // fraction, then multiply. Mixed expressions follow the order of operations,
  // so multiplication and division happen before addition and subtraction, no
  // matter what order they appear in. Simplify at the end; several distractors
  // are correct values left unsimplified.
  "What is 3/4 + 1/6?": {
    takeaway: "Convert to a common denominator before adding.",
    steps: [
      "The least common denominator of 4 and 6 is 12.",
      "3/4 = 9/12 and 1/6 = 2/12.",
      "9/12 + 2/12 = 11/12.",
    ],
    whyCorrect: "With both fractions over 12, the numerators add to 11.",
    distractors: {
      "1": "2/5 adds numerators and denominators straight across, which is not how fractions add.",
      "2": "5/12 converts the denominators but forgets to scale the numerators.",
      "3": "4/10 also comes from adding across the top and bottom.",
    },
    commonMistake:
      "Adding denominators. The denominator names the size of the pieces; adding thirds to fourths requires re-cutting both into the same size first.",
  },
  "Evaluate: 2.5 − 0.375 × 4": {
    takeaway: "Multiplication comes before subtraction.",
    steps: ["0.375 × 4 = 1.5.", "2.5 − 1.5 = 1."],
    whyCorrect: "Doing the multiplication first leaves 2.5 − 1.5, which is 1.",
    distractors: {
      "0": "8.5 comes from working left to right: (2.5 − 0.375) × 4.",
      "2": "0.625 is 2.5 ÷ 4, an operation the expression does not contain.",
      "3": "1.5 is the product alone, with the subtraction never performed.",
    },
    commonMistake:
      "Reading left to right. Order of operations is not reading order — the multiplication binds tighter regardless of where it sits.",
  },
  "What is −3/8 ÷ 3/4?": {
    takeaway: "Dividing by a fraction means multiplying by its reciprocal.",
    steps: [
      "Flip the divisor: 3/4 becomes 4/3.",
      "−3/8 × 4/3 = −12/24.",
      "Simplify: −1/2.",
    ],
    whyCorrect: "Multiplying by the reciprocal and simplifying gives −1/2.",
    distractors: {
      "0": "−2 flips the wrong fraction, dividing 3/4 by 3/8 instead.",
      "2": "−9/32 multiplies the two fractions without flipping.",
      "3": "1/2 has the right magnitude but drops the negative sign.",
    },
    commonMistake:
      "Flipping the first fraction rather than the second. The divisor — the one after the ÷ — is what gets inverted.",
  },
  "What is 1¾ + 2⅔? Write your answer as a mixed number in simplest form.": {
    takeaway:
      "Convert mixed numbers to improper fractions, add, then convert back.",
    steps: [
      "1¾ = 7/4 and 2⅔ = 8/3.",
      "Common denominator 12: 21/12 + 32/12 = 53/12.",
      "53 ÷ 12 = 4 remainder 5, so the answer is 4 5/12.",
    ],
    whyCorrect: "The improper sum 53/12 converts to the mixed number 4 5/12.",
    commonMistake:
      "Adding whole parts and fractional parts separately without a common denominator — 3 and ¾ + ⅔ leaves the harder half of the problem undone.",
  },
  "What is 3/8 + 5/6?": {
    takeaway: "Find the least common denominator, then add numerators only.",
    steps: [
      "The LCD of 8 and 6 is 24.",
      "3/8 = 9/24 and 5/6 = 20/24.",
      "9/24 + 20/24 = 29/24 = 1 5/24.",
    ],
    whyCorrect: "The sum exceeds 1, converting to the mixed number 1 5/24.",
    distractors: {
      "1": "8/14 adds across the tops and bottoms.",
      "2": "1 1/24 comes from an arithmetic slip in the numerators — 9 + 20 is 29, not 25.",
      "3": "29/48 uses 8 × 6 = 48 as the denominator while keeping numerators scaled for 24.",
    },
    commonMistake:
      "Not noticing the answer is greater than 1. Both fractions are sizable, so a result under 1 signals an error before you check anything else.",
  },
  "What is 4.7 − 1.85?": {
    takeaway: "Align the decimal points, padding with a zero as needed.",
    steps: ["Write 4.7 as 4.70.", "4.70 − 1.85 = 2.85."],
    whyCorrect: "Subtracting with the decimals aligned gives 2.85.",
    distractors: {
      "1": "2.95 comes from a borrowing error in the hundredths place.",
      "2": "2.65 subtracts in the wrong direction within a column.",
      "3": "3.85 subtracts only the whole-number part correctly and mishandles the rest.",
    },
    commonMistake:
      "Right-aligning the digits instead of the decimal points. Padding 4.7 to 4.70 keeps every place value in its own column.",
  },
  "What is 2/3 × 9/14 in simplest form?": {
    takeaway:
      "Multiply straight across, then simplify — no common denominator needed.",
    steps: [
      "2 × 9 = 18 and 3 × 14 = 42.",
      "18/42 shares a factor of 6.",
      "18 ÷ 6 = 3 and 42 ÷ 6 = 7, giving 3/7.",
    ],
    whyCorrect: "The product 18/42 reduces to 3/7.",
    distractors: {
      "0": "9/21 reduces to 3/7 in value but comes from cancelling incorrectly mid-problem.",
      "1": "11/17 adds across instead of multiplying.",
      "2": "18/42 is the correct product left unsimplified, and the question asks for simplest form.",
    },
    commonMistake:
      "Stopping at the unsimplified product. When 'simplest form' appears in the question, an unreduced fraction is offered as a distractor almost every time.",
  },
  "Evaluate 2/3 + 1/4 and write the result as a fraction in lowest terms. Enter your answer as a fraction (for example, 5/6).":
    {
      takeaway: "Common denominator, add numerators, then reduce.",
      steps: [
        "The LCD of 3 and 4 is 12.",
        "2/3 = 8/12 and 1/4 = 3/12.",
        "8/12 + 3/12 = 11/12, already in lowest terms.",
      ],
      whyCorrect:
        "11 and 12 share no common factor, so 11/12 is fully reduced.",
      commonMistake:
        "Assuming every answer needs reducing and altering a fraction that is already in lowest terms. Check for a shared factor; if there is none, you are done.",
    },

  // Percent problems.
  // Convert the percent to a decimal and decide what it is a percent *of* — the
  // original amount, always. Three patterns cover these items: a part is percent
  // × whole; a discounted price is whole × (1 − rate), or equivalently the whole
  // minus the discount; and percent change is (change ÷ ORIGINAL) × 100. The
  // most expensive error is dividing by the new value instead of the original.
  "A jacket regularly priced at $80 is on sale for 25% off. What is the sale price?":
    {
      takeaway:
        "'Off' means subtract — find the discount, then take it away from the original.",
      steps: [
        "25% of 80 = 0.25 × 80 = $20.",
        "$80 − $20 = $60.",
        "Or directly: 80 × 0.75 = $60.",
      ],
      whyCorrect:
        "Removing the $20 discount from $80 leaves a sale price of $60.",
      distractors: {
        "0": "$55 is not 25% off of $80 by any route.",
        "1": "$20 is the discount amount, not the price you pay.",
        "2": "$75 subtracts $5, as if the discount were 25 cents on each dollar of a much smaller base.",
      },
      commonMistake:
        "Answering with the discount instead of the sale price. The question asks what you pay, which is what remains after the discount comes off.",
    },
  "A restaurant bill is $48.00. How much is a 15% tip on the bill?": {
    takeaway: "A tip is a part of the whole: percent × total.",
    steps: ["15% = 0.15.", "0.15 × 48 = $7.20."],
    whyCorrect: "Fifteen percent of $48.00 is $7.20.",
    distractors: {
      "0": "$72.00 misplaces the decimal — that is 150% of the bill.",
      "1": "$6.40 does not come from 0.15 × 48.",
      "2": "$7.00 is a rounded estimate rather than the computed value.",
    },
    commonMistake:
      "Adding the tip to the bill when only the tip was requested. Read whether the question wants the tip alone or the total with tip.",
  },
  "A town's population grew from 250 people to 320 people. What is the percent increase?":
    {
      takeaway: "Percent change divides the change by the ORIGINAL value.",
      steps: [
        "Change: 320 − 250 = 70.",
        "Divide by the original: 70 ÷ 250 = 0.28.",
        "0.28 × 100 = 28%.",
      ],
      whyCorrect: "A gain of 70 on a base of 250 is a 28% increase.",
      distractors: {
        "1": "21.9% divides by the new population (70 ÷ 320) instead of the original.",
        "2": "22% is that same error, rounded.",
        "3": "70% mistakes the raw increase of 70 people for a percentage.",
      },
      commonMistake:
        "Dividing by the new value. Percent change always measures against where you started, which is why the same 70-person gain would be a smaller percentage in a larger town.",
    },
  "After a 20% discount, a coat costs $48. What was the original price?": {
    takeaway:
      "Working backward from a sale price means dividing, not adding the percent back.",
    steps: [
      "After 20% off, you pay 80% of the original.",
      "0.80 × original = 48.",
      "original = 48 ÷ 0.80 = $60.",
    ],
    whyCorrect:
      "Since $48 represents 80% of the original, the original was $60 — and 20% of 60 is 12, leaving 48.",
    distractors: {
      "0": "$68 adds a rough 20 to the sale price.",
      "2": "$240 divides by 0.20 instead of 0.80.",
      "3": "$57.60 adds 20% to $48, but 20% of the smaller number is not the discount that was taken.",
    },
    commonMistake:
      "Adding 20% back onto $48. The discount was 20% of the larger original price, so adding 20% of the smaller sale price undershoots — check by testing your answer forward.",
  },
  "A jacket priced at $80 is marked down 35%. What is the sale price?": {
    takeaway: "Marked down 35% means you pay 65%.",
    steps: [
      "35% of 80 = 0.35 × 80 = $28.",
      "$80 − $28 = $52.",
      "Or directly: 80 × 0.65 = $52.",
    ],
    whyCorrect: "Taking $28 off the $80 price leaves $52.",
    distractors: {
      "1": "$45 does not follow from a 35% markdown on $80.",
      "2": "$115 adds 35% instead of subtracting it.",
      "3": "$28 is the discount, not the price paid.",
    },
    commonMistake:
      "Confusing the markdown with the price. Computing 80 × 0.65 in one step skips the intermediate value that gets mistaken for the answer.",
  },
  "18 is what percent of 45?": {
    takeaway: "'What percent of' means part ÷ whole.",
    steps: ["18 ÷ 45 = 0.4.", "0.4 × 100 = 40%."],
    whyCorrect: "18 is 0.4 of 45, which is 40%.",
    distractors: {
      "0": "2.5% comes from 45 ÷ 18 = 2.5, dividing in the wrong order and misreading the result.",
      "1": "25% is a plausible-looking guess but not 18 ÷ 45.",
      "3": "27% is the difference 45 − 18, not a ratio.",
    },
    commonMistake:
      "Dividing the larger number by the smaller out of habit. The word 'of' marks the whole — here 45 — and the whole is always the divisor.",
  },
  "A town's population grows from 250 to 320 people. What is the percent increase?":
    {
      takeaway: "(new − original) ÷ original, then convert to a percent.",
      steps: ["320 − 250 = 70.", "70 ÷ 250 = 0.28.", "0.28 × 100 = 28%."],
      whyCorrect:
        "The 70-person gain is 28% of the starting population of 250.",
      distractors: {
        "0": "21.875% divides the change by 320, the new population.",
        "1": "22% is that same mistake rounded.",
        "3": "70% is the number of new people, not a percentage.",
      },
      commonMistake:
        "Using the ending value as the base. A quick check: 25% of 250 would be 62.5 people, so a 70-person gain must be a bit above 25% — which rules out both of the 22-ish options.",
    },
  "A jacket normally costs $80. It is on sale for 25% off. What is the sale price in dollars? Enter a number.":
    {
      takeaway: "Pay 100% − 25% = 75% of the original.",
      steps: ["0.75 × 80 = 60.", "The sale price is $60."],
      whyCorrect: "Three-quarters of $80 is $60, the amount actually paid.",
      commonMistake:
        "Entering 20, the discount. With no answer choices to compare against, name what the question asked for — the price paid — before entering a number.",
    },

  // The scientific method and experimental design.
  // The independent variable is what the researcher deliberately changes; the
  // dependent variable is what gets measured in response; controlled variables
  // are everything held constant. The control group receives no treatment and
  // exists to answer "compared with what?" A design fails when some other
  // difference between groups — a confounding variable — could explain the
  // result, which is exactly what random assignment prevents.
  "A student tests whether the amount of fertilizer affects plant growth. She gives different plants different amounts of fertilizer while keeping water, light, and soil the same, and measures plant height after two weeks. What is the independent variable in this experiment?":
    {
      takeaway:
        "The independent variable is the one the researcher changes on purpose.",
      whyCorrect:
        "She varies the fertilizer amount between plants — that is the input under her control.",
      distractors: {
        "0": "Soil is held the same for every plant, making it a controlled variable.",
        "2": "Water is likewise held constant.",
        "3": "Plant height is what she measures at the end — the dependent variable.",
      },
      commonMistake:
        "Naming the measured outcome. A useful phrasing: the independent variable is what you *do*, the dependent variable is what you *observe*.",
    },
  "A researcher tests whether a new cleaner kills more bacteria than the old cleaner. She treats identical bacterial plates with each cleaner and leaves one plate untreated. In this investigation, what is the purpose of the untreated plate?":
    {
      takeaway: "A control shows what happens when nothing is done.",
      whyCorrect:
        "The untreated plate establishes the baseline bacterial growth, so any reduction on the treated plates can be attributed to the cleaners.",
      distractors: {
        "1": "The dependent variable is the bacteria killed, a measurement — not a plate.",
        "2": "The untreated plate receives no cleaner at all.",
        "3": "The independent variable is which cleaner is applied, not the plate itself.",
      },
      commonMistake:
        "Viewing the untreated plate as wasted effort. Without it there is no way to know whether the bacteria would have died anyway.",
    },
  "A scientist hypothesizes that warmer water dissolves sugar faster. He stirs equal amounts of sugar into 100 mL of water at three temperatures and records the time to fully dissolve: 20 degrees C -> 90 s, 40 degrees C -> 55 s, 60 degrees C -> 30 s. Which conclusion is best supported by these data?":
    {
      takeaway:
        "State the trend in the data and say whether it matches the hypothesis.",
      whyCorrect:
        "As temperature rises from 20 to 60 °C, dissolving time falls from 90 to 30 seconds — faster dissolving at higher temperatures, as predicted.",
      distractors: {
        "0": "This reverses the data; the coldest water was the slowest.",
        "1": "Water volume was held constant at 100 mL, so it cannot explain the differences.",
        "3": "The times differ by a factor of three across the range, which is a clear effect.",
      },
      commonMistake:
        "Reading falling numbers as a weaker result. Time-to-dissolve going *down* means the process got *faster* — check which direction the measured quantity runs.",
    },
  "A team tests whether a drug lowers blood pressure. They give the drug to one group and a placebo to another, but they let participants choose which group to join, and the drug group happens to contain mostly younger people. Why does this design weaken the validity of any conclusion about the drug?":
    {
      takeaway:
        "A confounding variable is a second difference between groups that could explain the result.",
      whyCorrect:
        "The groups differ in age as well as treatment, so lower blood pressure in the drug group might come from youth rather than the drug.",
      distractors: {
        "0": "Blood pressure is measured, not manipulated; the flaw is in group composition.",
        "2": "Blood pressure is routinely and reliably measured.",
        "3": "A placebo group strengthens a design — the problem is how people were sorted into it.",
      },
      commonMistake:
        "Blaming the placebo. Placebos are good practice; self-selection is what broke this study, because it let the groups differ in more than one way.",
    },
  "A researcher tests whether a plant food increases growth. She gives Group A plant food and gives Group B nothing, keeping light, water, soil, and pot size identical for both groups. What is the role of Group B in this experiment?":
    {
      takeaway: "The group that receives no treatment is the control group.",
      whyCorrect:
        "Group B is identical to Group A except for the plant food, so it shows what growth looks like without it.",
      distractors: {
        "0": "The independent variable is the plant food, not a group of plants.",
        "2": "A confounding variable is an uncontrolled difference; here everything except the plant food was matched.",
        "3": "The dependent variable is the growth measured in both groups.",
      },
      commonMistake:
        "Labeling a group as a variable. Groups are collections of subjects; variables are the quantities that change or get measured.",
    },
  "An investigator studies how salt concentration affects how fast water boils. She prepares pots of water with 0 g, 5 g, 10 g, and 15 g of salt, using the same pot, stove setting, and starting water volume each time, and records the time to boil. What is the independent variable in this experiment?":
    {
      takeaway: "Look for the quantity that takes several deliberate values.",
      whyCorrect:
        "Salt is set to 0, 5, 10, and 15 g — the only thing varied on purpose.",
      distractors: {
        "0": "The stove setting is held the same across trials.",
        "1": "Time to boil is the measured outcome, the dependent variable.",
        "2": "Starting water volume is kept identical each time.",
      },
      commonMistake:
        "Missing that the 0 g pot is the control condition. It belongs to the same variable — it is simply the level where the treatment is absent.",
    },
  "A team tests a cold remedy. Volunteers who chose to take the remedy reported shorter colds than those who chose not to take it. A critic notes the result may be unreliable because participants selected their own group. Which change would most improve the validity of the investigation?":
    {
      takeaway:
        "Random assignment is the fix for self-selection, because it balances unknown differences across groups.",
      whyCorrect:
        "Assigning participants at random means the groups should start out similar in every respect except the remedy, so a difference in outcome points to the remedy.",
      distractors: {
        "0": "Less frequent symptom reporting collects worse data, not better.",
        "2": "A higher dose changes the treatment without addressing how groups were formed.",
        "3": "Removing the comparison group leaves nothing to compare against.",
      },
      commonMistake:
        "Trying to fix a design flaw by adjusting the treatment. The problem is who ended up in which group, so the fix has to be in the assignment.",
    },
  "Place the following steps of the scientific method in their correct order.":
    {
      takeaway:
        "Observe, hypothesize, experiment, analyze, conclude — each step supplies what the next one needs.",
      steps: [
        "Make an observation — something unexplained prompts the question.",
        "Form a hypothesis — a testable proposed explanation.",
        "Conduct an experiment — gather data that could support or refute it.",
        "Analyze the data — look for patterns in what was collected.",
        "Draw a conclusion — state whether the data support the hypothesis.",
      ],
      whyCorrect:
        "You cannot hypothesize without an observation, test without a hypothesis, analyze without data, or conclude without analysis.",
      commonMistake:
        "Placing the hypothesis first. Observation comes before it — a hypothesis is a proposed answer, so there has to be a question already.",
    },

  // Scientific measurement and tools.
  // Match the tool to the quantity: graduated cylinder for volume, balance for
  // mass, thermometer for temperature, ruler for length, stopwatch for time.
  // Then check that the unit belongs to that quantity — grams cannot measure
  // temperature no matter how reasonable the number looks. Precision and
  // accuracy are separate: precise means repeatable, accurate means correct.
  "A student needs to measure the volume of a liquid sample for an experiment. Which laboratory tool is most appropriate for this measurement?":
    {
      takeaway: "Volume of a liquid calls for a graduated cylinder.",
      whyCorrect:
        "A graduated cylinder is marked in milliliters specifically for reading liquid volume.",
      distractors: {
        "1": "A triple-beam balance measures mass.",
        "2": "A stopwatch measures time.",
        "3": "A thermometer measures temperature.",
      },
      commonMistake:
        "Reaching for a beaker instead. Beakers hold liquid but their markings are rough estimates; a graduated cylinder is the measuring instrument.",
    },
  "A nurse reads a patient's body temperature from a digital thermometer. Which unit and value would be the most reasonable reading for a healthy adult?":
    {
      takeaway: "The unit has to match the quantity being measured.",
      whyCorrect:
        "Temperature is measured in degrees, and 37 °C is normal human body temperature (98.6 °F).",
      distractors: {
        "0": "Kilometers measure distance.",
        "1": "Milliliters measure volume.",
        "2": "Grams measure mass.",
      },
      commonMistake:
        "Being drawn in by the familiar number 37 attached to any unit. Check the unit against the quantity first — only one option even measures temperature.",
    },
  "When reading the volume of water in a graduated cylinder, the surface of the water forms a curved dip called the meniscus. To read the measurement correctly, where should the student position the eye and read the scale?":
    {
      takeaway: "Read the bottom of the meniscus, with your eye level with it.",
      whyCorrect:
        "Water curves down in the center, and the accepted convention is to read that lowest point at eye level to avoid a viewing-angle error.",
      distractors: {
        "0": "The highest points are where water climbs the glass walls, which overstates the volume.",
        "2": "Looking from above introduces parallax error and reads the edge rather than the center.",
        "3": "Reading from below tilts the error the other way and does not use the meniscus at all.",
      },
      commonMistake:
        "Ignoring eye position. Even reading the correct part of the curve gives a wrong value if you view the scale from above or below — that shift is called parallax.",
    },
  "A student measures the mass of a sample three times using a balance and records 12.4 g, 12.5 g, and 12.3 g. Which statement best describes these measurements?":
    {
      takeaway: "Precision is agreement among repeated measurements.",
      whyCorrect:
        "The three readings fall within 0.2 g of each other, which is precision — repeatability — regardless of the true mass.",
      distractors: {
        "1": "Accuracy requires knowing the true mass, which the question never provides.",
        "2": "A balance measures mass in grams, not volume in milliliters.",
        "3": "Differing values can absolutely be averaged; that is standard practice.",
      },
      commonMistake:
        "Calling closely clustered readings accurate. Consistency proves only that the instrument repeats itself — it could be repeating the same error every time.",
    },
  "A technician needs to measure the mass of a small amount of powdered salt for a chemistry experiment. The expected mass is about 2 grams. Which tool and unit pairing is most appropriate for this measurement?":
    {
      takeaway: "Mass in grams means a balance.",
      whyCorrect:
        "An analytical balance reads mass in grams with the sensitivity a 2-gram sample requires.",
      distractors: {
        "0": "A meter stick measures length.",
        "1": "A thermometer measures temperature.",
        "3": "A graduated cylinder measures volume, and volume is not mass — 2 mL of salt would weigh something different.",
      },
      commonMistake:
        "Substituting volume for mass with a powder. A given volume of salt has a mass that depends on how tightly it is packed, so a recipe calling for grams needs a balance.",
    },
  "A student pours water into a graduated cylinder and records the volume four times, getting 24.8 mL, 24.9 mL, 24.8 mL, and 24.9 mL. The true volume is known to be 30.0 mL. Which statement best describes these measurements?":
    {
      takeaway:
        "Precise but not accurate: tightly grouped readings, consistently wrong.",
      whyCorrect:
        "The four values agree within 0.1 mL, which is precise, but all sit about 5 mL below the true 30.0 mL, so none is accurate.",
      distractors: {
        "1": "Accuracy would require the readings to land near 30.0 mL.",
        "2": "The readings are tightly clustered, so they are certainly precise.",
        "3": "They are precise — only the accuracy fails.",
      },
      commonMistake:
        "Treating consistency as correctness. This pattern usually means a systematic error, such as a miscalibrated instrument, which repeats the same offset every time.",
    },
  "A nurse must give a patient a liquid medication dose of 0.5 grams. The medication bottle lists its concentration in milligrams per milliliter. To select the correct volume to draw into the syringe, what conversion must the nurse first apply to the ordered dose?":
    {
      takeaway:
        "Match the units before calculating: grams must become milligrams.",
      steps: [
        "1 gram = 1,000 milligrams.",
        "0.5 × 1,000 = 500 mg.",
        "With the dose in mg, the mg/mL concentration gives the volume.",
      ],
      whyCorrect:
        "Converting 0.5 g to 500 mg puts the ordered dose in the same unit the label uses.",
      distractors: {
        "1": "50 mg multiplies by 100 instead of 1,000.",
        "2": "5,000 mg multiplies by 10,000.",
        "3": "0.005 mg divides when the conversion to a smaller unit calls for multiplying.",
      },
      commonMistake:
        "Calculating with mismatched units. In dosing this is a dangerous error — an unnoticed factor of ten here becomes a tenfold medication error at the bedside.",
    },

  // Logic and evidence in scientific explanations.
  // A scientific explanation must be testable and falsifiable, and it yields to
  // evidence rather than the reverse. Two flaws recur: treating a correlation as
  // a cause (often with a third factor driving both), and changing more than one
  // variable so no single cause can be isolated. Strong evidence means a
  // controlled comparison — testimonials and sales figures are not evidence.
  "A scientist proposes an explanation for an observation and wants it to be considered scientific. What must the explanation be able to do?":
    {
      takeaway:
        "A scientific explanation must be testable, which means it could in principle be shown wrong.",
      whyCorrect:
        "Falsifiability is the dividing line: if no possible evidence could count against a claim, science has no way to evaluate it.",
      distractors: {
        "0": "No explanation covers everything; scientific claims are deliberately narrow.",
        "1": "An explanation immune to new data is the opposite of scientific.",
        "3": "Consensus follows evidence; a vote does not make a claim scientific.",
      },
      commonMistake:
        "Hearing 'potentially disproven' as a weakness. It is the requirement — a claim that cannot fail a test cannot pass one either.",
    },
  "A study reports that people who drink more coffee tend to sleep fewer hours per night. A reporter concludes that coffee directly causes people to need less sleep. Why is this conclusion logically flawed?":
    {
      takeaway: "Correlation does not establish causation.",
      whyCorrect:
        "The two variables move together, but the causation could run the other way — poor sleepers may drink more coffee — or a third factor may drive both.",
      distractors: {
        "0": "Hours of sleep are readily measured.",
        "2": "The passage gives no reason to doubt the measurements; the flaw is in the inference.",
        "3": "The variables are clearly related; the question is whether one causes the other.",
      },
      commonMistake:
        "Rejecting the association itself. The observed pattern may be perfectly real — only the causal claim built on it is unsupported.",
    },
  "A researcher claims that a new supplement improves memory. Which piece of evidence would most strongly support this claim?":
    {
      takeaway:
        "The strongest evidence is a controlled comparison against a placebo.",
      whyCorrect:
        "A treatment group outperforming a placebo group isolates the supplement's effect from expectation and chance.",
      distractors: {
        "1": "How a product was developed says nothing about whether it works.",
        "2": "Testimonials are uncontrolled and subject to the placebo effect.",
        "3": "Sales volume measures marketing, not memory.",
      },
      commonMistake:
        "Counting many personal reports as strong evidence. Quantity does not substitute for a control group — a thousand people who all expected to improve still have nothing to be compared against.",
    },
  "A scientist's hypothesis predicts that a certain enzyme will speed up a reaction. After many careful experiments, the data repeatedly show no change in reaction rate when the enzyme is added. What is the most appropriate response according to scientific reasoning?":
    {
      takeaway:
        "When evidence contradicts a hypothesis, the hypothesis gives way.",
      whyCorrect:
        "Repeated careful experiments showing no effect are grounds to revise or reject the hypothesis — that is how science self-corrects.",
      distractors: {
        "0": "One enzyme failing says nothing about enzymes in general; that overgeneralizes.",
        "2": "Discarding inconvenient data is misconduct, not method.",
        "3": "Priority is not evidence; being proposed first earns a hypothesis nothing.",
      },
      commonMistake:
        "Treating a rejected hypothesis as a failed experiment. A well-run study that disconfirms a prediction is a success — it produced knowledge.",
    },
  "Researchers observed that towns with more ice cream sales also reported more cases of sunburn during the same months. A reporter concluded that eating ice cream causes sunburn. Which statement best explains the flaw in this conclusion?":
    {
      takeaway:
        "A third factor can drive two variables up together without either causing the other.",
      whyCorrect:
        "Hot sunny weather independently increases both ice cream sales and sun exposure, producing the correlation with no causal link between them.",
      distractors: {
        "0": "Reversing the direction keeps the same error; sunburn does not cause ice cream sales either.",
        "1": "Units are not the issue — the inference is.",
        "3": "A large sample strengthens a study; it does not invalidate it.",
      },
      commonMistake:
        "Assuming a correlation must mean one variable acts on the other. Naming a plausible third factor is usually the fastest way to see why it need not.",
    },
  "A scientist proposes that a new fertilizer increases tomato yield. In a trial, 50 plants given the fertilizer averaged 4.2 kg of fruit, while 50 untreated plants averaged 4.1 kg. The difference was within the normal range of plant-to-plant variation. Which conclusion is best supported by this evidence?":
    {
      takeaway:
        "A difference smaller than the ordinary variation is not evidence of an effect.",
      whyCorrect:
        "The 0.1 kg gap falls inside the range plants differ by anyway, so the data cannot distinguish the fertilizer's effect from noise.",
      distractors: {
        "0": "4.2 against 4.1 kg is a 2% difference, nowhere near doubling.",
        "2": "The treated plants yielded slightly more, and 'in all conditions' overreaches besides.",
        "3": "Safety for consumption was never tested.",
      },
      commonMistake:
        "Reading any numerical difference as a real one. The question supplies the decisive detail — the gap is within normal variation — and that is what makes the result inconclusive.",
    },
  "A student claims that a plant grew taller because she spoke kind words to it daily. She also watered it more than the other plants during the same period. Why does this observation fail to support her claim about speaking to the plant?":
    {
      takeaway:
        "Change one variable at a time, or you cannot say which one acted.",
      whyCorrect:
        "Speaking and extra water changed together, so the growth could be explained by either — the design cannot separate them.",
      distractors: {
        "1": "Height is a legitimate measure of plant growth.",
        "2": "Plants require light; this claim is simply false.",
        "3": "Speaking to a plant daily is entirely possible — the flaw is the confounded design.",
      },
      commonMistake:
        "Dismissing the claim because it sounds implausible. The reason it fails is methodological: even a plausible claim would be unsupported by this experiment.",
    },

  // Predicting relationships.
  // First name the relationship: direct (both rise together), inverse (one rises
  // as the other falls), or exponential (repeated doubling). Then extend it by
  // one step, keeping the same spacing the data uses. Two cautions: a trend that
  // reverses — as enzymes do past their optimum — must not be extended through
  // the turn, and exponential growth multiplies rather than adds.
  "A student observes that as the temperature of a gas in a sealed, flexible container increases, the volume of the gas also increases. Based on this pattern, what should the student predict will happen if the gas is cooled?":
    {
      takeaway:
        "In a direct relationship, reversing the input reverses the output.",
      whyCorrect:
        "Heating expanded the gas, so cooling should contract it — the volume decreases.",
      distractors: {
        "0": "The container is sealed, so no gas enters or leaves and the mass is unchanged.",
        "2": "This repeats the heating result instead of reversing it.",
        "3": "Cooling a gas can condense it to a liquid, but it cannot transmute it into a metal.",
      },
      commonMistake:
        "Predicting a mass change when the volume changes. In a sealed container the same particles simply occupy more or less space.",
    },
  "A gardener records that bean plants grow taller as the number of hours of daily sunlight increases, as shown: 2 hours -> 5 cm, 4 hours -> 9 cm, 6 hours -> 13 cm. If a plant receives 8 hours of sunlight, what height is the best prediction based on the trend?":
    {
      takeaway: "Find the step size, then take one more step.",
      steps: [
        "Each 2-hour increase adds 4 cm: 5 → 9 → 13.",
        "8 hours is one more 2-hour step.",
        "13 + 4 = about 17 cm.",
      ],
      whyCorrect:
        "The constant 4 cm increment predicts roughly 17 cm at 8 hours.",
      distractors: {
        "0": "9 cm is the value at 4 hours.",
        "1": "5 cm is the value at 2 hours.",
        "3": "13 cm is the value at 6 hours, with no step taken.",
      },
      commonMistake:
        "Repeating the last value in the table. A prediction goes beyond the data — the pattern is there so you can extend it.",
    },
  "In a study of a predator-prey relationship, researchers find that when the population of hawks (predators) increases, the population of mice (prey) tends to decrease. Based on this inverse relationship, what is the best prediction if the hawk population suddenly declines?":
    {
      takeaway: "An inverse relationship runs both directions.",
      whyCorrect:
        "Fewer predators means less predation pressure, so the mouse population tends to rise.",
      distractors: {
        "0": "Extinction is the opposite outcome and far more extreme than the pattern supports.",
        "1": "This applies the relationship in the same direction rather than inversely.",
        "3": "Nothing suggests the two populations would converge to equal numbers.",
      },
      commonMistake:
        "Overshooting into a dramatic outcome. Predictions should be proportionate — the pattern supports 'tends to increase,' not a population explosion or collapse.",
    },
  "A chemist measures how the rate of a reaction changes with the concentration of a reactant: 0.1 M -> 2 units/s, 0.2 M -> 4 units/s, 0.3 M -> 6 units/s. Which statement best describes the relationship and a valid prediction?":
    {
      takeaway:
        "Directly proportional means doubling one value doubles the other.",
      steps: [
        "Rate ÷ concentration is 20 at every point.",
        "The relationship is directly proportional.",
        "At 0.4 M: 0.4 × 20 = about 8 units/s.",
      ],
      whyCorrect:
        "The constant ratio confirms direct proportionality and predicts roughly 8 units/s at 0.4 M.",
      distractors: {
        "0": "The two rise together in lockstep, which is a strong relationship, not the absence of one.",
        "2": "The rate rises with concentration; it does not fall.",
        "3": "An inverse relationship would show the rate dropping as concentration climbs.",
      },
      commonMistake:
        "Naming the relationship without checking it. Dividing output by input at each point takes seconds and confirms whether the ratio really is constant.",
    },
  "In a study of an enzyme, reaction rate increased steadily as temperature rose from 10 C to 37 C, then dropped sharply between 40 C and 50 C. Based on this pattern, what is the most reasonable prediction for the reaction rate at 60 C?":
    {
      takeaway:
        "Once a trend reverses, extend the new direction — not the old one.",
      whyCorrect:
        "The sharp drop after 40 °C signals denaturation, so at 60 °C the enzyme's shape is destroyed and the rate should be very low.",
      distractors: {
        "0": "The data already show the increase ending; it does not continue without limit.",
        "1": "There is no reason the rate would land exactly on the 10 °C value.",
        "3": "37 °C is near the optimum; 60 °C is well past the collapse.",
      },
      commonMistake:
        "Extending the rising portion of the curve through the peak. The question describes both phases precisely so you predict from the second one.",
    },
  "A spring is stretched and its length is measured under increasing loads: 0 g gives 10.0 cm, 100 g gives 12.0 cm, 200 g gives 14.0 cm, and 300 g gives 16.0 cm. If the pattern continues, what length is predicted at a load of 400 g?":
    {
      takeaway: "A constant increment per step makes the next value easy.",
      steps: [
        "Each 100 g adds 2.0 cm: 10.0 → 12.0 → 14.0 → 16.0.",
        "400 g is one more 100 g step.",
        "16.0 + 2.0 = 18.0 cm.",
      ],
      whyCorrect: "Continuing the 2.0 cm per 100 g pattern predicts 18.0 cm.",
      distractors: {
        "0": "16.5 cm adds only half a step.",
        "1": "14.0 cm is the length at 200 g.",
        "2": "20.0 cm skips ahead two steps, to 500 g.",
      },
      commonMistake:
        "Adding the total stretch rather than one increment. From 0 to 300 g the spring gained 6 cm, but the next step adds only the per-100 g amount.",
    },
  "A population of bacteria doubles every 30 minutes under ideal conditions. A culture starts with 200 cells. Assuming ideal conditions continue, which prediction about the population after 90 minutes is correct?":
    {
      takeaway:
        "Doubling is repeated multiplication — count the intervals first.",
      steps: [
        "90 minutes ÷ 30 minutes = 3 doublings.",
        "200 → 400 → 800 → 1,600.",
        "The population reaches 1,600 cells.",
      ],
      whyCorrect: "Three successive doublings from 200 give 1,600 cells.",
      distractors: {
        "1": "600 adds 200 three times instead of doubling.",
        "2": "2,000 does not result from any doubling of 200.",
        "3": "800 stops after two doublings, at 60 minutes.",
      },
      commonMistake:
        "Adding the starting amount each interval instead of doubling the current amount. Exponential growth compounds — each doubling acts on the new total, not the original.",
    },

  // Chemical reactions.
  // Reactants sit left of the arrow, products right — the arrow points the way
  // the reaction runs. Reaction types follow the shape of the equation: many
  // into one is synthesis, one into many is decomposition, and a hydrocarbon
  // plus O2 giving CO2 and water is combustion. Balancing enforces conservation
  // of mass: atoms are rearranged, never created or destroyed.
  "In a chemical equation, the substances written to the left of the arrow (→) are called what?":
    {
      takeaway: "Left of the arrow: reactants. Right of the arrow: products.",
      whyCorrect:
        "Reactants are the starting materials that react; the arrow points from them toward what they become.",
      distractors: {
        "1": "Products are on the right, the result of the reaction.",
        "2": "A catalyst speeds a reaction without being consumed and is usually written above the arrow.",
        "3": "A solvent dissolves substances; it is not defined by equation position.",
      },
      commonMistake:
        "Reversing the two. The arrow reads as 'becomes' — whatever precedes it is what you started with.",
    },
  "The reaction 2H2 + O2 → 2H2O is best classified as which type of reaction?":
    {
      takeaway: "Two or more substances combining into one is synthesis.",
      whyCorrect:
        "Hydrogen and oxygen — two reactants — join to form the single product water.",
      distractors: {
        "0": "Double replacement requires two compounds swapping partners; these reactants are elements.",
        "1": "Decomposition runs the other way, breaking one compound into several.",
        "2": "Single replacement needs an element displacing another from a compound.",
      },
      commonMistake:
        "Counting molecules instead of distinct substances. The coefficient 2 does not make two products — there is one product, H2O.",
    },
  "What coefficient should be placed in front of O2 to correctly balance the combustion reaction CH4 + ___ O2 → CO2 + 2H2O?":
    {
      takeaway: "Count each element on both sides and match the totals.",
      steps: [
        "Right side oxygen: CO2 has 2, and 2H2O has 2, for 4 total.",
        "Left side oxygen comes only from O2, which carries 2 atoms each.",
        "4 ÷ 2 = 2, so the coefficient is 2.",
      ],
      whyCorrect:
        "2O2 supplies the 4 oxygen atoms the products require, balancing the equation.",
      distractors: {
        "1": "4 would supply 8 oxygen atoms, twice what is needed.",
        "2": "3 gives 6 oxygen atoms.",
        "3": "1 gives only 2, leaving the products short.",
      },
      commonMistake:
        "Counting O2 as one oxygen atom. The subscript means each molecule carries two, so the atom count is always double the coefficient.",
    },
  "According to the law of conservation of mass, if 10 grams of reactants completely react in a sealed container, what is the total mass of the products?":
    {
      takeaway:
        "Mass is conserved: atoms are rearranged, not created or destroyed.",
      whyCorrect:
        "Every atom present at the start is still present at the end, so a sealed container's contents still weigh 10 grams.",
      distractors: {
        "1": "Conservation of mass determines it exactly.",
        "2": "Mass appearing to decrease usually means a gas escaped — impossible in a sealed container.",
        "3": "Nothing entered the container, so mass cannot increase.",
      },
      commonMistake:
        "Expecting a loss because a gas formed. Gases have mass; sealing the container is what makes that visible on a balance.",
    },
  "In the reaction 2H2 + O2 → 2H2O, the substances on the left side of the arrow are called the":
    {
      takeaway:
        "The starting substances, left of the arrow, are the reactants.",
      whyCorrect:
        "H2 and O2 are consumed to form water, making them the reactants of this reaction.",
      distractors: {
        "0": "The product is H2O, on the right.",
        "2": "No solvent appears — this is a reaction between gases.",
        "3": "A catalyst would not be consumed, and none is shown.",
      },
      commonMistake:
        "Assuming the more familiar substance must be the product. Water is the product here because of where it sits, not because it is the recognizable one.",
    },
  "Which coefficient should replace the blank to balance the equation N2 + ___ H2 → 2NH3?":
    {
      takeaway: "Balance one element at a time, using the given coefficients.",
      steps: [
        "Right side hydrogen: 2NH3 has 3 H each, for 6 total.",
        "Left side hydrogen comes as H2, 2 atoms per molecule.",
        "6 ÷ 2 = 3, so the coefficient is 3.",
      ],
      whyCorrect:
        "3H2 provides 6 hydrogen atoms, matching the 6 in 2NH3 (and the nitrogen already balances at 2).",
      distractors: {
        "0": "1 supplies only 2 hydrogen atoms.",
        "1": "6 supplies 12 — double what is needed, because H2 was counted as one atom.",
        "3": "2 supplies 4 hydrogen atoms, still short of 6.",
      },
      commonMistake:
        "Multiplying the subscript and the coefficient in the wrong direction. Atoms of H in 2NH3 is 2 × 3 = 6; atoms of H in 3H2 is 3 × 2 = 6. Both multiply out, and they must match.",
    },
  "The reaction 2KClO3 → 2KCl + 3O2 is best classified as which type of reaction?":
    {
      takeaway: "One reactant breaking into several products is decomposition.",
      whyCorrect:
        "A single compound, KClO3, breaks apart into KCl and O2 — the defining shape of decomposition.",
      distractors: {
        "0": "Combustion requires oxygen as a reactant; here oxygen is produced.",
        "1": "Single replacement needs a free element displacing another from a compound.",
        "3": "Synthesis combines substances into one; this equation does the reverse.",
      },
      commonMistake:
        "Seeing O2 and assuming combustion. The position matters — oxygen among the products means it was released, not consumed.",
    },

  // Properties of solutions.
  // The solute dissolves; the solvent does the dissolving and is usually the
  // larger amount (water, most often). Dissolving goes faster with stirring,
  // heat, and smaller pieces — all of which increase contact between solute and
  // solvent. On the pH scale, below 7 is acidic with more hydrogen ions, 7 is
  // neutral, above 7 is basic with more hydroxide ions.
  "When salt is dissolved in water to make saltwater, which component is the solute?":
    {
      takeaway: "The solute is the substance that dissolves.",
      whyCorrect: "Salt disperses into the water, so salt is the solute.",
      distractors: {
        "1": "The container holds the solution but is not part of it.",
        "2": "Water does the dissolving, making it the solvent.",
        "3": "The saltwater is the solution — solute and solvent together.",
      },
      commonMistake:
        "Swapping solute and solvent. A memory hook: the solute is the one that seems to disappear.",
    },
  "A solution has a pH of 3. This solution is best described as which of the following?":
    {
      takeaway: "Below 7 is acidic; 7 is neutral; above 7 is basic.",
      whyCorrect:
        "A pH of 3 sits well below neutral, making the solution acidic.",
      distractors: {
        "0": "Neutral is exactly 7.",
        "2": "A pure solvent like water would read 7, and pH does not indicate purity.",
        "3": "Strongly basic means a high pH, around 12 to 14.",
      },
      commonMistake:
        "Reading a low number as a weak result. On the pH scale, lower means *more* acidic — the scale runs opposite to the intuition that bigger is stronger.",
    },
  "Which change would most likely increase the rate at which a sugar cube dissolves in a glass of water?":
    {
      takeaway:
        "Anything that increases contact between solute and solvent speeds dissolving.",
      whyCorrect:
        "Stirring carries dissolved sugar away from the cube and brings fresh water to its surface, so dissolving continues at full speed.",
      distractors: {
        "0": "Larger crystals have less surface area per gram, which slows dissolving.",
        "1": "Sitting undisturbed lets sugar-saturated water linger against the cube.",
        "2": "Cooler water slows molecular motion and dissolves solids more slowly.",
      },
      commonMistake:
        "Confusing rate with amount. Stirring changes how *fast* the sugar dissolves; temperature is what changes how *much* can dissolve in total.",
    },
  "A solution that contains the maximum amount of dissolved solute possible at a given temperature, with no more able to dissolve, is described as what?":
    {
      takeaway:
        "Saturated means no more solute can dissolve at that temperature.",
      whyCorrect:
        "At saturation the solvent holds all it can, and any additional solute settles out undissolved.",
      distractors: {
        "1": "A colloid has particles suspended rather than dissolved.",
        "2": "Dilute means little solute relative to solvent — the opposite extreme.",
        "3": "Unsaturated means more solute could still dissolve.",
      },
      commonMistake:
        "Overlooking the temperature clause. Saturation is defined at a given temperature; heat the solution and it becomes unsaturated again.",
    },
  "When table salt is dissolved in water to make a saltwater solution, the water is acting as the":
    {
      takeaway: "The solvent is the substance doing the dissolving.",
      whyCorrect:
        "Water surrounds and disperses the salt particles, which makes it the solvent — the role water plays so often it is called the universal solvent.",
      distractors: {
        "1": "A precipitate is a solid that comes out of solution.",
        "2": "The solute is the salt.",
        "3": "Product is a term for chemical reactions; dissolving is a physical process.",
      },
      commonMistake:
        "Calling dissolved salt a chemical reaction. No new substance forms — evaporate the water and the salt returns unchanged.",
    },
  "A solution has a pH of 3. Which statement best describes this solution?": {
    takeaway:
      "Low pH means acidic, driven by a high hydrogen ion concentration.",
    whyCorrect:
      "pH measures hydrogen ion concentration, and a pH of 3 indicates many H+ ions, which is what makes a solution acidic.",
    distractors: {
      "0": "Basic solutions have high hydroxide and a pH above 7.",
      "2": "Low hydrogen ion concentration describes a base, not a pH of 3.",
      "3": "Neutral means pH 7, with hydrogen and hydroxide balanced.",
    },
    commonMistake:
      "Pairing 'acidic' with hydroxide ions. Acids donate H+; bases supply OH−. Matching the ion to the label settles most pH questions.",
  },
  "Raising the temperature of water generally increases how much of a solid such as sugar will dissolve. This best illustrates that temperature can affect a solution's":
    {
      takeaway: "Solubility is how much solute a solvent can dissolve.",
      whyCorrect:
        "The statement describes a change in the maximum amount that will dissolve, which is precisely solubility.",
      distractors: {
        "0": "pH measures acidity, not dissolving capacity.",
        "1": "Freezing point does change with dissolved solute, but 'only' excludes what is described here.",
        "2": "Boiling point is likewise affected, yet the statement is about how much dissolves.",
      },
      commonMistake:
        "Confusing solubility with rate of dissolving. Heat does both — it speeds dissolving *and* raises the ceiling — but this statement is about the ceiling.",
    },

  // Context clues.
  // The sentence always supplies the answer; the job is finding which kind of
  // clue it used. Three recur: a restatement or example that defines the word
  // directly, a contrast signaled by unlike, but, or however — where the meaning
  // is the OPPOSITE of what follows — and a negation ("not capricious"), where
  // the described behavior is the opposite of the word. Miss the contrast signal
  // and you will pick the exact reverse of the right answer, which is why every
  // contrast item offers it.
  'Read the sentence below.\n\nAfter the long hike in the summer heat, the travelers were so parched that they drank an entire bottle of water in seconds.\n\nAs used in the sentence, the word "parched" most nearly means which of the following?':
    {
      takeaway: "The consequence in the sentence defines the word.",
      whyCorrect:
        "They drank a whole bottle in seconds after hiking in heat — the behavior of people who are extremely thirsty.",
      distractors: {
        "1": "Injury would not be relieved by drinking water.",
        "2": "Pleasantly cool contradicts the summer heat and the urgent drinking.",
        "3": "Exhaustion is plausible after a long hike, but the sentence's evidence is about drinking, not resting.",
      },
      commonMistake:
        "Choosing a word that merely fits the situation. Exhaustion is believable here; thirst is what the sentence actually demonstrates.",
    },
  'Read the sentence below.\n\nUnlike his gregarious sister, who loved crowded parties and constant conversation, Marcus preferred to spend his evenings alone with a book.\n\nAs used in the sentence, the word "gregarious" most nearly means which of the following?':
    {
      takeaway:
        "'Unlike' signals contrast — the word means the opposite of the comparison.",
      whyCorrect:
        "The sister loves crowds and conversation, and the clause describing her directly defines gregarious as sociable and outgoing.",
      distractors: {
        "0": "Wealth and generosity are never suggested.",
        "2": "Quiet and withdrawn describes Marcus, not his sister — this is the reversal the sentence sets up.",
        "3": "Clever and witty is a different trait from sociability.",
      },
      commonMistake:
        "Attaching the description to the wrong person. 'Unlike' means Marcus is the contrast; gregarious belongs to the sister who loves parties.",
    },
  'Read the sentence below.\n\nThe new manager was known for being frugal, carefully tracking every expense and refusing to waste even a single dollar of the company\'s budget.\n\nAs used in the sentence, the word "frugal" most nearly means which of the following?':
    {
      takeaway: "A restatement clue defines the word right after it.",
      whyCorrect:
        "Tracking every expense and refusing to waste a dollar is a definition of being careful with money.",
      distractors: {
        "1": "Careful tracking shows command of the budget, not confusion.",
        "2": "Nothing suggests dishonesty; the manager guards company money.",
        "3": "Generous is the opposite of refusing to waste a dollar.",
      },
      commonMistake:
        "Importing a negative connotation. Frugal is neutral-to-positive — the sentence presents this behavior as something the manager is known for, not criticized for.",
    },
  'Read the sentence below.\n\nThe witness\'s testimony was so mendacious that the jury, after uncovering several deliberate lies, refused to believe a single word she said.\n\nAs used in the sentence, the word "mendacious" most nearly means which of the following?':
    {
      takeaway: "The explanation after 'that' spells out the meaning.",
      whyCorrect:
        "The jury uncovered deliberate lies and stopped believing her, which defines mendacious as untruthful.",
      distractors: {
        "1": "Nothing in the sentence is frightening.",
        "2": "Length is never mentioned — the problem is truthfulness, not quantity.",
        "3": "The testimony was understood clearly enough to be caught as false.",
      },
      commonMistake:
        "Guessing from sound. 'Mendacious' resembles no common English word; the sentence supplies 'deliberate lies' so you do not have to know it.",
    },
  'Read the sentence: "Because the trail was so arduous, the hikers stopped often to rest their aching legs." What does "arduous" most likely mean?':
    {
      takeaway:
        "'Because' introduces a cause, and the effect reveals the meaning.",
      whyCorrect:
        "Frequent stops and aching legs are the effects of a trail that demands great effort.",
      distractors: {
        "1": "A short trail would not require repeated rests.",
        "2": "Smooth and easy contradicts the aching legs entirely.",
        "3": "Pleasant and scenic describes a view, not physical difficulty.",
      },
      commonMistake:
        "Overlooking the cause-and-effect structure. 'Because X, Y happened' means Y is your evidence for what X means.",
    },
  'Read the sentence: "Unlike his gregarious sister, who chatted with every guest, Marcus preferred to read quietly in the corner." What does "gregarious" most likely mean?':
    {
      takeaway: "Contrast clue: Marcus is the opposite of gregarious.",
      whyCorrect:
        "The sister chats with every guest while Marcus reads alone, so gregarious means sociable and fond of company.",
      distractors: {
        "0": "Shy and withdrawn describes Marcus, the contrast.",
        "1": "Generosity with money is unrelated to chatting with guests.",
        "2": "Strict and demanding is a different quality altogether.",
      },
      commonMistake:
        "Picking the trait belonging to the other person. On any 'unlike' sentence, ask whose description the target word attaches to before choosing.",
    },
  'Read the sentence: "The committee\'s decision was not capricious; every recommendation followed months of careful study and consistent reasoning." What does "capricious" most likely mean?':
    {
      takeaway:
        "With 'not,' the described behavior is the opposite of the word's meaning.",
      whyCorrect:
        "The decision was *not* capricious and *was* careful and consistent, so capricious means the reverse: based on sudden, unpredictable whims.",
      distractors: {
        "0": "Approval by a majority is about voting, not the character of the decision.",
        "2": "Carefully reasoned and consistent is what the decision *was* — the negation makes this the exact opposite of the answer.",
        "3": "Delay concerns timing, not whether reasoning was sound.",
      },
      commonMistake:
        "Dropping the 'not.' That single word flips the sentence, and the option describing the committee's actual behavior is offered precisely to catch readers who miss it.",
    },
  "Read the sentence and determine the meaning of the underlined word. Because the directions were so 'ambiguous,' the students each interpreted the assignment differently. The word 'ambiguous' most nearly means ___. Enter one word.":
    {
      takeaway: "The result — differing interpretations — reveals the cause.",
      whyCorrect:
        "Directions that lead every student to a different reading are unclear, open to more than one interpretation.",
      commonMistake:
        "Answering with a word about the students rather than the directions. The blank describes the directions, so 'confused' misses; 'unclear' or 'vague' fits.",
    },

  // Suffixes.
  // A suffix tells you what *kind* of thing a word is: -ology is the study of
  // something, -phobia a fear of it, -able means capable of being done, -ous
  // means full of, -itis an inflammation, -ectomy a removal, and -fy means to
  // make. Combine the suffix with the root and the definition assembles itself,
  // which is what makes unfamiliar medical vocabulary readable.
  'The suffix in the word "cardiology" indicates that cardiology is best described as what?':
    {
      takeaway: "-ology means the study of.",
      whyCorrect:
        "Cardi- (heart) plus -ology (study of) gives the study of the heart.",
      distractors: {
        "1": "Inflammation is -itis, as in carditis.",
        "2": "Removal is -ectomy, as in appendectomy.",
        "3": "Fear is -phobia.",
      },
      commonMistake:
        "Defining the root and ignoring the suffix. Every option here concerns the heart — the suffix is what distinguishes them.",
    },
  'Based on its suffix, a person described as "acrophobic" experiences what?': {
    takeaway: "-phobia (or -phobic) means fear of.",
    whyCorrect:
      "The suffix marks a fear; with acro- meaning heights, acrophobic means afraid of heights.",
    distractors: {
      "0": "Love of something is -philia.",
      "1": "Study of something is -ology.",
      "3": "Skill is not what -phobic conveys.",
    },
    commonMistake:
      "Needing to know the root first. The suffix alone answers this question — you can identify it as a fear without knowing what acro- means.",
  },
  'The suffix in the word "breakable" shows that something breakable is what?':
    {
      takeaway: "-able means capable of being.",
      whyCorrect:
        "Breakable means able to be broken, the same pattern as readable, washable, and portable.",
      distractors: {
        "0": "Without something is -less, as in breathless.",
        "1": "One who does something is -er, as in breaker.",
        "2": "The act of doing something is -ing or -tion.",
      },
      commonMistake:
        "Reading -able as active rather than passive. Something breakable can *be* broken; it does not do the breaking.",
    },
  'Considering its suffix, the word "courageous" most nearly means which of the following?':
    {
      takeaway: "-ous means full of.",
      whyCorrect:
        "Courageous means full of courage, matching joyous, nervous, and dangerous.",
      distractors: {
        "0": "One who gives something would be -er or -or.",
        "1": "Study of is -ology.",
        "3": "Lacking something is -less, as in courageless.",
      },
      commonMistake:
        "Confusing -ous with -less. They point in opposite directions — full of versus without — so the suffix decides the entire meaning.",
    },
  'The suffix "-ology" means "the study of." What does "seismology" most likely mean?':
    {
      takeaway: "Apply the given suffix to the root.",
      whyCorrect:
        "Seism- refers to earthquakes, so seismology is the study of earthquakes.",
      distractors: {
        "0": "Fear of earthquakes would be a -phobia.",
        "1": "A measuring tool would be a seismograph, using -graph.",
        "3": "The study of weather is meteorology, a different root.",
      },
      commonMistake:
        "Confusing -ology with -graph. One names a field of study, the other an instrument that records — seismology versus seismograph.",
    },
  'The suffix "-phobia" means "fear of." In the word "agoraphobia," the root "agora" refers to an open public space. What does agoraphobia describe?':
    {
      takeaway: "Assemble the parts: open public space + fear of.",
      whyCorrect:
        "Combining the root and suffix gives a fear of open or crowded public spaces.",
      distractors: {
        "0": "Love would be -philia, not -phobia.",
        "1": "Study would be -ology.",
        "2": "Fear of being alone indoors reverses the root — agora refers to public space, not enclosure.",
      },
      commonMistake:
        "Reversing the root. Both remaining fear options are fears; the root is what determines which one, and agora means the open marketplace.",
    },
  'The suffix "-fy" means "to make or cause to become." Based on this, what does "solidify" mean?':
    {
      takeaway: "-fy turns a description into an action: to make it so.",
      whyCorrect:
        "Solid plus -fy means to make something solid, the same pattern as simplify and purify.",
      distractors: {
        "1": "A state of being would use -ity, as in solidity.",
        "2": "One who studies would be -ist or -ologist.",
        "3": "Making something larger is magnify — a different root with the same suffix.",
      },
      commonMistake:
        "Choosing a noun when the suffix marks a verb. -fy always produces an action word, which rules out the state and the person immediately.",
    },

  // Fact versus opinion.
  // A fact can be checked against evidence — counted, dated, measured — and it
  // stays true whether or not anyone agrees. An opinion expresses judgment or
  // preference and cannot be verified. The tells are reliable: "in my view,"
  // "honestly," and superlatives like best, most beautiful, or smartest signal
  // opinion, while numbers, dates, and quantities signal fact. Note that a
  // statement can be an opinion even when it is widely shared or probably right.
  'Read the passage:\n\n"The public library opened in 1962 and now holds more than 80,000 books. In my view, it is the most beautiful building in the entire town. It also offers free internet access to all visitors."\n\nWhich sentence from the passage states an opinion rather than a fact?':
    {
      takeaway: "'In my view' plus a superlative is opinion twice over.",
      whyCorrect:
        "Beauty cannot be verified, and the phrase 'in my view' marks the claim as the writer's judgment.",
      distractors: {
        "0": "An opening date is checkable in records.",
        "1": "Whether internet access is offered free can be confirmed.",
        "3": "A collection size is a countable quantity.",
      },
      commonMistake:
        "Assuming a sentence is factual because it sits among facts. Passages mix the two deliberately — evaluate each sentence on its own.",
    },
  'Read the passage:\n\n"Aloe vera plants store water in their thick leaves, which is why they survive in dry climates. Many gardeners believe aloe is the easiest houseplant anyone could ever own. The gel inside the leaves is commonly used in skin lotions."\n\nWhich statement from the passage is best classified as an opinion?':
    {
      takeaway:
        "'Easiest … anyone could ever own' is a judgment no measurement settles.",
      whyCorrect:
        "Ease of care is a matter of judgment, and the superlative makes it a comparison across every houseplant — unverifiable.",
      distractors: {
        "0": "Water storage in leaves is an observable plant structure.",
        "1": "Survival in dry climates is documented.",
        "2": "Use of aloe gel in lotions can be confirmed from product labels.",
      },
      commonMistake:
        "Treating 'many gardeners believe' as evidence that makes it factual. It is a fact that people hold the belief, but the claim being reported is still an opinion.",
    },
  'Read the passage:\n\n"The new electric buses cost the city $4 million. They produce zero tailpipe emissions while running. Honestly, switching the whole fleet to electric was the smartest decision the council has made in decades."\n\nWhich sentence expresses an opinion?':
    {
      takeaway: "'Smartest decision in decades' evaluates rather than reports.",
      whyCorrect:
        "Ranking a decision as the smartest in decades is a judgment, flagged further by the opener 'Honestly.'",
      distractors: {
        "0": "Both of those sentences are verifiable — a cost figure and an emissions property.",
        "2": "A $4 million cost appears in budget records.",
        "3": "Zero tailpipe emissions is a measurable characteristic of electric buses.",
      },
      commonMistake:
        "Reading a large dollar figure as opinion because it sounds like a complaint. The number itself is checkable; only the evaluation of the decision is not.",
    },
  "Which sentence from a brochure about a city aquarium states a fact rather than an opinion?":
    {
      takeaway: "Reversed question — find the one claim that can be verified.",
      whyCorrect:
        "Counts of animals and exhibits can be checked against the aquarium's records.",
      distractors: {
        "0": "'Far more exciting' compares experiences, which vary by visitor.",
        "1": "'Most breathtaking' is a judgment.",
        "3": "'Everyone should' is a recommendation, not a verifiable statement.",
      },
      commonMistake:
        "Answering as though the question asked for the opinion. Brochures are mostly opinion by design, so the single factual statement is the outlier here.",
    },
  "Read the passage: 'The new bus route added six stops and now runs every fifteen minutes. In my view, this makes it the best transit decision the council has ever made, and riders clearly agree.' Which statement best identifies the opinion in the passage?":
    {
      takeaway:
        "'Best … ever' cannot be verified, however reasonable it sounds.",
      whyCorrect:
        "Calling it the best decision the council has ever made is an evaluation, introduced by 'in my view.'",
      distractors: {
        "0": "Who operates the route is a matter of record.",
        "2": "A fifteen-minute frequency is published and checkable.",
        "3": "The number of added stops is countable.",
      },
      commonMistake:
        "Being swayed by 'riders clearly agree.' Agreement — even widespread agreement — does not convert a judgment into a fact.",
    },
  "A nutrition article reads: 'Oats contain soluble fiber called beta-glucan. Studies have measured reductions in cholesterol among people who ate oats daily. Therefore, oatmeal is undeniably the healthiest breakfast a person can choose.' Which sentence shifts the passage from fact to opinion?":
    {
      takeaway:
        "Watch for the sentence where reporting turns into recommending.",
      whyCorrect:
        "The first two sentences report composition and study results; the third leaps to 'the healthiest breakfast a person can choose,' a judgment the studies do not establish.",
      distractors: {
        "0": "Measured reductions in a study are reportable findings.",
        "2": "The presence of beta-glucan is a verifiable chemical fact.",
        "3": "The study's protocol is a factual detail.",
      },
      commonMistake:
        "Being reassured by 'undeniably' and 'therefore.' Words that sound like proof are doing the opposite here — dressing an opinion in the clothing of a conclusion.",
    },
  "Read the following passage, then select all statements that are facts rather than opinions according to the passage. Passage: The community garden covers two acres on the edge of town. It was established in 1998 and now hosts more than sixty plots. Honestly, it is the most charming spot in the entire city. Volunteers donate over a thousand hours each growing season. Anyone who skips visiting it in spring is making a terrible mistake. Select all that apply.":
    {
      takeaway:
        "Test each statement separately: could someone check it and settle the matter?",
      whyCorrect:
        "Acreage, a founding year with a plot count, and volunteer hours are all measurable and on the record.",
      distractors: {
        "1": "'Most charming' is a judgment, and 'Honestly' flags the writer's opinion.",
        "3": "Calling a choice a 'terrible mistake' evaluates rather than reports.",
      },
      commonMistake:
        "Selecting statements that feel true rather than ones that are verifiable. The garden may well be charming — that still cannot be checked.",
    },

  // Word meaning from context (craft and structure).
  // The sentence defines the word, usually through a restatement after a comma
  // or semicolon, a contrast ("not final but provisional"), or an explanation of
  // consequences. Two habits matter most: use the sentence's own evidence rather
  // than a remembered definition, and watch for words with a common everyday
  // sense that does not apply here — animated, nominal, and salvage all have
  // familiar meanings the passages deliberately set aside.
  'Read the sentence:\n\n"After the long hike, the water in our bottles was tepid, neither refreshingly cold nor hot enough for tea."\n\nAs used in the sentence, the word "tepid" most nearly means:':
    {
      takeaway: "The sentence defines by ruling out both extremes.",
      whyCorrect: "Neither cold nor hot leaves the middle: lukewarm.",
      distractors: {
        "1": "Frozen solid is ruled out by 'neither refreshingly cold.'",
        "2": "Boiling is ruled out by 'nor hot enough for tea.'",
        "3": "Carbonation is about bubbles, not temperature.",
      },
      commonMistake:
        "Ignoring an elimination clue. When a sentence names what a word is *not*, it has narrowed the answer to whatever remains.",
    },
  'Read the sentence:\n\n"The committee\'s decision was not final but provisional, subject to change once the full survey results arrived."\n\nAs used in the sentence, "provisional" most nearly means:':
    {
      takeaway: "'Not X but Y' makes Y the opposite of X.",
      whyCorrect:
        "Set against 'final' and described as subject to change, provisional means temporary and conditional.",
      distractors: {
        "1": "Popularity is never mentioned.",
        "2": "Nothing suggests the decision was secret; it was announced as changeable.",
        "3": "Permanent and binding is the meaning of 'final' — the word being contrasted.",
      },
      commonMistake:
        "Selecting the contrasted word's meaning. 'Not final but provisional' guarantees the answer is the opposite of final, and the reverse is always offered.",
    },
  'Read the sentence:\n\n"Although the politician promised reform, her critics called the speech mere rhetoric, full of grand phrases but empty of any concrete plan."\n\nAs used in the sentence, "rhetoric" most nearly means:':
    {
      takeaway: "The description after the comma defines the word.",
      whyCorrect:
        "'Full of grand phrases but empty of any concrete plan' spells out showy language without substance.",
      distractors: {
        "0": "A speech to critics is not casual conversation.",
        "1": "The complaint is the absence of substance, not the presence of evidence.",
        "3": "No legal documents appear in the sentence.",
      },
      commonMistake:
        "Using a neutral textbook definition. Rhetoric can simply mean persuasive language, but 'mere' and the criticism that follows fix the negative sense here.",
    },
  'Read the sentence:\n\n"The normally reserved coach gave an animated, arm-waving speech that fired up the whole team before the championship game."\n\nAs used in the sentence, "animated" most nearly means:':
    {
      takeaway: "Context overrides the word's most familiar meaning.",
      whyCorrect:
        "Arm-waving and firing up the team describe a lively, energetic delivery.",
      distractors: {
        "0": "A speech that fired up the whole team was not forgettable.",
        "1": "Cartoon animation is the common modern sense and has nothing to do with a coach's speech.",
        "2": "Quiet and withdrawn describes how the coach normally is — the contrast the sentence sets up with 'normally reserved.'",
      },
      commonMistake:
        "Defaulting to 'cartoon.' A word's everyday meaning is exactly what these items test, and the sentence's evidence always wins.",
    },
  "Read the sentence: 'The instructions were so terse that the new employee had to ask a coworker to explain each step in detail.' As used here, the word 'terse' most nearly means":
    {
      takeaway: "The consequence reveals what was lacking.",
      whyCorrect:
        "Needing every step explained in detail means the instructions were brief and short on detail.",
      distractors: {
        "0": "Long and repetitive instructions would not require additional explanation.",
        "1": "Decorative language is not what the employee was missing.",
        "3": "Friendliness has no bearing on needing steps clarified.",
      },
      commonMistake:
        "Reading 'terse' as merely rude. It can carry curtness, but the sentence's evidence points to brevity as the problem.",
    },
  "Read the sentence: 'After the storm, the volunteers worked to salvage whatever furniture had not been ruined by the flood.' As used in this sentence, 'salvage' most nearly means":
    {
      takeaway:
        "'Whatever had not been ruined' points to rescuing what survived.",
      whyCorrect:
        "Volunteers were saving the furniture the flood spared, which is what salvage means.",
      distractors: {
        "0": "Repainting is restoration after the rescue, not the rescue itself.",
        "2": "Throwing away is the opposite — the ruined items are what get discarded.",
        "3": "Selling at a discount reads 'salvage' as the noun in 'salvage yard,' not the verb used here.",
      },
      commonMistake:
        "Carrying over the sense of 'salvage yard,' where salvage means scrap. As a verb in this sentence it means to save.",
    },
  "Read the sentence: 'The committee's support for the proposal was only nominal; although they voted yes, they provided no funding and attended none of the planning meetings.' As used here, 'nominal' most nearly means":
    {
      takeaway: "The semicolon introduces the explanation of the word.",
      whyCorrect:
        "Voting yes while giving no money and no attendance is support in name only, with nothing behind it.",
      distractors: {
        "0": "Expensive and demanding is the opposite — they provided no funding.",
        "1": "Carefully measured describes precision, not hollow support.",
        "3": "Enthusiastic and complete contradicts skipping every meeting.",
      },
      commonMistake:
        "Thinking of 'a nominal fee,' where nominal means small. Both senses trace back to 'in name' — here it describes support that exists on paper only.",
    },

  // Text structure.
  // Five patterns cover almost everything, and each has its own signal words.
  // Cause and effect: because, as a result, consequently, therefore. Compare and
  // contrast: both, however, whereas, while, unlike. Sequence: first, next, then,
  // finally. Problem and solution: a difficulty stated, then steps that address
  // it. Description or spatial: features and locations with no time or causal
  // chain. Scan for the signal words before deciding.
  'Read the passage:\n\n"Because the factory dumped waste into the river for years, the fish population collapsed. As a result, local fishers lost their income, and several family businesses were forced to close."\n\nWhich text structure does this passage use?':
    {
      takeaway: "'Because' and 'as a result' mark cause and effect.",
      whyCorrect:
        "The passage traces a chain: dumping caused the collapse, which caused lost income and closures.",
      distractors: {
        "0": "Events do unfold over time, but the passage links them by causation, not by dates or order.",
        "1": "Nothing is arranged by physical location.",
        "3": "No two things are being compared.",
      },
      commonMistake:
        "Choosing chronological order because the events happen in sequence. Effects always follow their causes in time — the question is whether the passage stresses the *link* or the *order*.",
    },
  'Read the passage:\n\n"Both online courses and traditional classes can lead to a degree. However, online courses offer flexible scheduling, while traditional classes provide face-to-face interaction with instructors and classmates."\n\nWhich text structure best describes this passage?':
    {
      takeaway: "'Both,' 'however,' and 'while' mark compare and contrast.",
      whyCorrect:
        "The passage names a shared quality, then sets the two options' distinct advantages against each other.",
      distractors: {
        "1": "No causal chain is drawn.",
        "2": "No time order is present.",
        "3": "No problem is posed and no solution proposed.",
      },
      commonMistake:
        "Missing that comparison covers similarities *and* differences. The opening 'Both' does as much structural work as the 'however' that follows.",
    },
  'Read the passage:\n\n"Traffic on Main Street has become dangerous during school hours. To address this, the town could add a crosswalk, lower the speed limit, and station a crossing guard near the entrance. These steps would protect students walking to class."\n\nWhich text structure organizes this passage?':
    {
      takeaway:
        "A difficulty named, then measures to fix it: problem and solution.",
      whyCorrect:
        "Dangerous traffic is the problem, and 'To address this' introduces the proposed remedies.",
      distractors: {
        "0": "Description would detail what the street is like, not what to do about it.",
        "1": "The three measures are options, not steps in a time order.",
        "3": "Nothing is compared against anything else.",
      },
      commonMistake:
        "Reading a list of three actions as a sequence. They are alternatives offered together, and 'To address this' is the phrase that identifies the structure.",
    },
  "Read the passage: 'First, gather your ingredients. Next, mix the dry items in one bowl. Then, add the wet items. Finally, bake the batter for thirty minutes.' Which text structure does this passage use?":
    {
      takeaway: "First, next, then, finally — sequence.",
      whyCorrect:
        "Each sentence gives the next action in a fixed order, the defining shape of sequential structure.",
      distractors: {
        "1": "No step is presented as causing another.",
        "2": "Nothing is compared.",
        "3": "No problem is raised.",
      },
      commonMistake:
        "Calling it cause and effect because each step enables the next. Sequence answers 'what comes next'; cause and effect answers 'why did this happen.'",
    },
  "Read the passage: 'Many downtown shops were losing customers to online sellers. To address this, the merchants' association launched a weekend market and a free delivery service, which brought shoppers back to the district.' Which text structure best describes this passage?":
    {
      takeaway: "Problem stated, response taken, situation improved.",
      whyCorrect:
        "Lost customers is the problem, and the market and delivery service are the solution, marked by 'To address this.'",
      distractors: {
        "1": "Online sellers are the source of the problem, not a subject of comparison.",
        "2": "The events have an order, but the passage is organized around the fix.",
        "3": "No physical layout is described.",
      },
      commonMistake:
        "Choosing cause and effect because the solution produced a result. Problem-and-solution passages usually report an outcome too — what distinguishes them is that a difficulty was posed and deliberately addressed.",
    },
  "Read the passage: 'Both electric and gasoline cars provide reliable transportation. However, electric cars produce no tailpipe emissions and run quietly, whereas gasoline cars can be refueled in minutes and travel farther between fill-ups.' Which text structure does the author use?":
    {
      takeaway: "'Both … however … whereas' is the compare-and-contrast frame.",
      whyCorrect:
        "The passage establishes common ground, then sets each type's advantages against the other's.",
      distractors: {
        "0": "No causes are traced.",
        "1": "Neither option is framed as a problem needing a fix.",
        "3": "Nothing happens in an order.",
      },
      commonMistake:
        "Looking only for differences. 'Whereas' is the clearest signal, but the structure begins with the shared quality in the first sentence.",
    },
  "Read the following passage, then select all statements that accurately describe its text structure. Passage: When a city replaces its old streetlights with LED bulbs, several effects follow. Because LEDs use less electricity, the city's energy bills drop within the first year. As a result of the brighter, whiter light, drivers report fewer nighttime accidents at major intersections. Consequently, residents who once avoided certain streets after dark begin walking there again. Each of these changes stems directly from the single decision to switch bulbs. Select all that apply.":
    {
      takeaway:
        "One cause with several effects is still cause-and-effect structure.",
      whyCorrect:
        "The passage names one action and traces three consequences from it, and 'Because,' 'As a result,' and 'Consequently' mark each link explicitly.",
      distractors: {
        "0": "No person's life is narrated, and the passage is organized by causation rather than dates.",
        "1": "Only one city is discussed; nothing is compared.",
      },
      commonMistake:
        "Assuming cause and effect means one cause and one effect. A single decision branching into several outcomes is one of its most common shapes.",
    },

  // Dictionary and library entries.
  // For a multi-definition entry, check the part of speech first — it eliminates
  // half the options — then test each remaining sense in the sentence. Guide
  // words mark the first and last entries on a page, so a word belongs there
  // only if it falls alphabetically BETWEEN them. In a catalog, the call number
  // is what puts related books physically side by side.
  'Read the dictionary entry:\n\ncurrent (\\u02c8kər-ənt) adjective, noun\n1. adjective. belonging to the present time; happening now\n2. noun. a steady flow of water, air, or electricity in one direction\n3. noun. a general tendency or movement of opinion\n\nIn which sentence is "current" used in the sense of definition 2?\n\n"Swimmers were warned that the strong current near the rocks could pull them out to sea."':
    {
      takeaway: "Match the sentence's meaning to the numbered sense.",
      whyCorrect:
        "A flow of water strong enough to pull swimmers out to sea is exactly definition 2.",
      distractors: {
        "0": "Definition 2 fits precisely, so 'none' is wrong.",
        "1": "Definition 3 concerns opinion, not water.",
        "3": "Definition 1 is the adjective meaning 'present-day'; here current is a noun.",
      },
      commonMistake:
        "Choosing by the word's most familiar sense. Checking the part of speech first — noun here — rules out definition 1 before you compare meanings.",
    },
  'Read the dictionary entry:\n\ntemper (\\u02c8tem-pər) noun, verb\n1. noun. a person\'s state of mind or mood\n2. noun. a tendency to become angry easily\n3. verb. to soften or moderate the effect of something\n4. verb. to harden metal by heating and cooling it\n\nWhich definition fits the use of "temper" in this sentence?\n\n"The judge chose to temper the harsh sentence with a chance for early release."':
    {
      takeaway:
        "Part of speech first: 'to temper' is a verb, cutting the options in half.",
      whyCorrect:
        "Softening a harsh sentence by adding early release moderates its effect — definition 3.",
      distractors: {
        "1": "Definition 4 is the metalworking sense; no metal is involved.",
        "2": "Definition 1 is a noun meaning mood.",
        "3": "Definition 2 is a noun meaning a quick temper, and the judge's anger is not at issue.",
      },
      commonMistake:
        "Reaching for the everyday noun sense of temper as anger. The sentence uses it as a verb, which eliminates both noun definitions immediately.",
    },
  'A dictionary page shows the guide words "marble" and "margin" at the top. Which of the following words would appear on this page?':
    {
      takeaway:
        "A word belongs on the page only if it falls between the guide words.",
      steps: [
        "Compare letter by letter: marble … margin.",
        "march comes after marble (c after b) and before margin (c before g).",
        "So march falls on this page.",
      ],
      whyCorrect: "Alphabetically, march sits between marble and margin.",
      distractors: {
        "0": "marvel comes after margin (v after g), so it is on a later page.",
        "2": "manner comes before marble (n before r), so it is on an earlier page.",
        "3": "mark comes after margin (k after g), placing it later.",
      },
      commonMistake:
        "Comparing only the first few letters. All four options start with 'mar' or 'man' — the decision is made at the fourth letter, so compare that far.",
    },
  "A library catalog entry reads:\n\nTitle: Rivers of Stone: A History of Bridges\nAuthor: Patel, Anika\nCall Number: 624.2 PAT\nSubjects: Bridges—Design and construction; Civil engineering\nLocation: Nonfiction, 2nd floor\n\nA student needs another book on the same shelf about building structures. Which piece of information is most useful for locating nearby books on related engineering topics?":
    {
      takeaway:
        "Call numbers group books by subject, so neighbors on the shelf share a topic.",
      whyCorrect:
        "624.2 places this book among civil engineering titles; browsing near that number finds related works.",
      distractors: {
        "0": "The floor narrows the search to a whole department, not a shelf.",
        "1": "Author order groups a writer's own books, not books on a subject.",
        "2": "The title identifies this one book and leads nowhere else.",
      },
      commonMistake:
        "Assuming the subject headings are the shelving tool. They are excellent for *searching* the catalog, but the call number is what determines physical placement.",
    },
  "A dictionary page has the guide words 'marble' and 'mark.' Which word would appear on this page?":
    {
      takeaway: "Test each candidate against both guide words.",
      steps: [
        "The range runs marble … mark.",
        "margin: mar-g falls after mar-b and before mar-k.",
        "So margin is on this page.",
      ],
      whyCorrect: "Margin falls alphabetically between marble and mark.",
      distractors: {
        "0": "manatee comes before marble, since n precedes r.",
        "1": "martyr comes after mark (t after k).",
        "3": "marsh also comes after mark (s after k).",
      },
      commonMistake:
        "Checking only against the first guide word. A word must clear both ends — three of these options come after marble, and only one also comes before mark.",
    },
  "Read this dictionary entry: 'current (adj.) 1. belonging to the present time. 2. (n.) a continuous flow of water, air, or electricity. 3. (n.) the general movement or tendency of opinion.' In the sentence 'The current of public feeling turned against the new tax,' which definition applies?":
    {
      takeaway: "The words around the term point to the intended sense.",
      whyCorrect:
        "'Public feeling' turning against a tax is a movement of opinion — definition 3.",
      distractors: {
        "0": "Definition 2 is a literal flow of water or electricity; feeling is not literally flowing.",
        "1": "Definition 1 is the adjective for present-day, but here current is a noun.",
        "3": "Definition 3 applies, so 'none' is incorrect.",
      },
      commonMistake:
        "Selecting the literal flow sense because 'current' evokes water. Definition 3 exists precisely for this figurative use, and 'of public feeling' points straight to it.",
    },
  "Using a library catalog, a student wants the most recent and frequently updated information about current vaccination guidelines. Which source is the best choice?":
    {
      takeaway:
        "Match the source to the need: current guidance requires a frequently updated source.",
      whyCorrect:
        "A government public health website is revised as guidelines change, so it carries the most current recommendations.",
      distractors: {
        "0": "A nineteenth-century biography is historical, not current.",
        "1": "A novel is fiction and not a source of medical guidance.",
        "3": "A twelve-year-old encyclopedia was accurate when printed and cannot reflect changes since.",
      },
      commonMistake:
        "Preferring print because it seems more authoritative. For guidance that changes, recency is the criterion — an outdated authoritative source is still outdated.",
    },

  // Inferring logical conclusions.
  // A supported conclusion follows from the passage with a short, forced step —
  // often applying a stated rule to a stated situation. Wrong choices overreach
  // ("always," "permanently," "no longer necessary at all"), invent motives the
  // text never gives, or reverse what the passage says. If you need to assume
  // something the passage never mentions, the conclusion is not supported.
  "Read the passage and answer the question.\n\nWhenever the temperature drops below freezing overnight, the citrus farmers in the valley run large fans and spray their trees with water to protect the fruit. This year, the fans and sprayers have run every night for the past two weeks.\n\nWhich conclusion is best supported by the passage?":
    {
      takeaway:
        "A stated rule plus a stated observation forces the conclusion.",
      whyCorrect:
        "The passage says the equipment runs *whenever* it freezes; it has run every night for two weeks, so it has been freezing every night.",
      distractors: {
        "1": "The spraying protects the fruit — that is why farmers do it.",
        "2": "Two straight weeks of freezes suggests the opposite of rarity.",
        "3": "Harvest size is never discussed.",
      },
      commonMistake:
        "Hesitating because the passage does not state the temperature directly. It states the rule and the response, and together those make the conclusion unavoidable.",
    },
  "Read the passage and answer the question.\n\nMaria packed her umbrella, rain boots, and a waterproof jacket before leaving the house. She also moved her morning jog to the indoor track at the gym instead of running through the park as she usually does.\n\nWhat can the reader most reasonably infer?":
    {
      takeaway: "Several preparations pointing one way give one inference.",
      whyCorrect:
        "Rain gear plus moving a usually outdoor jog indoors both point to an expectation of rain.",
      distractors: {
        "1": "She packed the umbrella, which suggests she intends to use it.",
        "2": "A day's rain gear is not vacation luggage.",
        "3": "She usually runs in the park, so she does not dislike outdoor exercise.",
      },
      commonMistake:
        "Turning a one-day choice into a permanent preference. 'As she usually does' establishes that today is the exception.",
    },
  "Read the passage and answer the question.\n\nThe new museum exhibit was scheduled to open Saturday, but on Friday afternoon the curator posted a notice canceling the preview event. The crates holding several paintings had not cleared customs, and the gallery walls stood bare.\n\nWhich conclusion is best supported by the passage?":
    {
      takeaway: "The passage supplies both the cancellation and its cause.",
      whyCorrect:
        "Paintings stuck in customs and bare walls explain why the opening could not proceed.",
      distractors: {
        "1": "The obstacle is customs, not a change of heart.",
        "2": "No visitor complaints are mentioned.",
        "3": "One canceled preview is far short of a permanent closure.",
      },
      commonMistake:
        "Inventing a motive when the passage gives a logistical reason. The customs delay is stated outright; nothing suggests anyone changed their mind.",
    },
  "Read the passage and answer the question.\n\nBy the time the guests arrived, Daniel had set the table, lit the candles, and pulled a steaming dish from the oven. The smell of roasted garlic filled the kitchen.\n\nWhat can the reader most reasonably conclude?":
    {
      takeaway: "Concrete details converge on the simplest conclusion.",
      whyCorrect:
        "A dish from his own oven, a set table, and the smell of roasting all indicate Daniel cooked for his guests.",
      distractors: {
        "1": "Takeout does not come out of your oven.",
        "2": "He cooked with garlic, which suggests he chose it.",
        "3": "He set the table and timed the meal for their arrival.",
      },
      commonMistake:
        "Looking for a hidden twist. Inference questions reward the reading the details actually support, which is often the straightforward one.",
    },
  "Read the passage and answer the question.\n\nThe town's only bakery closed at noon every Wednesday so the owner could deliver bread to the three restaurants under contract. On those afternoons, the shelves out front stayed empty, and a handwritten sign in the window listed the regular hours for the rest of the week.\n\nBased on the passage, which conclusion is best supported?":
    {
      takeaway: "Apply the stated pattern to a specific case.",
      whyCorrect:
        "The bakery closes at noon on Wednesdays and it is the town's only bakery, so a 2 p.m. Wednesday customer could not buy bread there.",
      distractors: {
        "0": "The noon closing applies to Wednesdays; regular hours hold the rest of the week.",
        "1": "The reason given is deliveries, not any dislike of customers.",
        "3": "Three contracts exist, but the passage never compares income sources.",
      },
      commonMistake:
        "Generalizing the Wednesday schedule to every day. The sign listing regular hours for the rest of the week is there to rule that out.",
    },
  "Read the passage and answer the question.\n\nMarisol noticed that the houseplants nearest the north window grew tall and pale, stretching their stems toward the glass, while the same kind of plant on the sunny south sill stayed short and deep green. She moved one of the pale plants to the south sill, and within two weeks its new leaves came in darker and its stems thickened.\n\nWhich conclusion is best supported by the passage?":
    {
      takeaway:
        "Same plant type, different light, different results — and moving one reproduced the effect.",
      whyCorrect:
        "The plants are identical except for light exposure, and relocating one changed its color and growth, pointing to light as the cause.",
      distractors: {
        "0": "Both groups are near windows; height varied with light, not with window proximity.",
        "1": "Watering is never mentioned.",
        "2": "Nothing suggests the window was broken — only that it faces north.",
      },
      commonMistake:
        "Overlooking why the move matters. It turns an observation into something close to an experiment, because one plant changed conditions while its type stayed the same.",
    },
  "Read the passage and answer the question.\n\nThe museum's new exhibit allowed visitors to touch replicas of ancient pottery while the genuine artifacts remained behind glass nearby. Staff reported that fingerprints on the display cases dropped sharply after the replicas were added, and fewer guards were needed to remind people not to lean on the glass.\n\nWhich conclusion is best supported by the passage?":
    {
      takeaway:
        "Two measured changes after one intervention support a conclusion about that intervention.",
      whyCorrect:
        "Fewer fingerprints and fewer reminders both indicate that giving visitors something to touch reduced their touching of the real artifacts.",
      distractors: {
        "0": "Fewer guards were needed, which is not the same as none.",
        "1": "The genuine artifacts remain on display behind glass.",
        "2": "Preference is never measured — only touching behavior.",
      },
      commonMistake:
        "Sliding from 'fewer' to 'none.' Watch for options that push a real but partial change into an absolute.",
    },

  // Relationships between variables.
  // Find the constant that links the two columns — a rate, a per-unit amount, or
  // a fixed step — then apply it to the value asked about. Direct or positive
  // means both move the same way; inverse or negative means one rises as the
  // other falls. When a question asks for a value beyond the table, multiply by
  // the rate rather than extending the table one row and stopping.
  "A table shows hours studied and test score:\n1 hr: 60, 2 hr: 70, 3 hr: 80, 4 hr: 90.\nIf the pattern continues, what score is predicted for 5 hours of studying?":
    {
      takeaway: "Find the per-step change, then take one more step.",
      steps: ["Each additional hour adds 10 points.", "90 + 10 = 100."],
      whyCorrect:
        "Continuing the steady 10-point increase predicts 100 at 5 hours.",
      distractors: {
        "0": "95 adds only half a step.",
        "1": "90 is the score at 4 hours, with no step taken.",
        "2": "110 takes two steps, landing at 6 hours.",
      },
      commonMistake:
        "Stopping at the last table value. The question asks for a prediction, which by definition lies past the data.",
    },
  "A café tracked the outdoor temperature and cups of hot chocolate sold:\n30°F: 50 cups, 40°F: 40 cups, 50°F: 30 cups, 60°F: 20 cups.\nWhich statement best describes the relationship?":
    {
      takeaway:
        "When one variable rises as the other falls, the relationship is inverse.",
      whyCorrect:
        "Temperature climbs from 30 to 60 °F while sales fall from 50 to 20 cups — a consistent inverse pattern.",
      distractors: {
        "0": "The values change together in a perfectly regular way, which is a strong relationship.",
        "1": "This reverses the direction; sales fall as it warms.",
        "3": "Sales change by 10 cups at every step.",
      },
      commonMistake:
        "Reading 'no relationship' into a downward trend. An inverse relationship is a relationship — the variables are tightly linked, just in opposite directions.",
    },
  "A car travels at a constant speed. A table of time and distance shows:\n2 hr: 120 mi, 3 hr: 180 mi, 4 hr: 240 mi.\nHow far will the car travel in 6 hours?":
    {
      takeaway: "Find the unit rate, then multiply by the hours asked for.",
      steps: [
        "120 ÷ 2 = 60 miles per hour (and 180 ÷ 3 confirms it).",
        "6 × 60 = 360 miles.",
      ],
      whyCorrect: "At 60 mph for 6 hours, the car covers 360 miles.",
      distractors: {
        "0": "240 miles is the 4-hour distance from the table.",
        "1": "300 miles is 5 hours, one step short.",
        "3": "420 miles is 7 hours, one step too far.",
      },
      commonMistake:
        "Extending the table row by row and losing count. Computing the rate once and multiplying is faster and less error-prone.",
    },
  "A cookie recipe is proportional: 2 cups of flour make 12 cookies. How many cups of flour are needed to make 30 cookies?":
    {
      takeaway: "Reduce to a unit rate, then scale up.",
      steps: ["12 cookies ÷ 2 cups = 6 cookies per cup.", "30 ÷ 6 = 5 cups."],
      whyCorrect: "At 6 cookies per cup, 30 cookies require 5 cups of flour.",
      distractors: {
        "0": "4 cups would make 24 cookies.",
        "2": "6 cups would make 36 cookies.",
        "3": "15 cups comes from scaling in the wrong direction, treating cookies as cups.",
      },
      commonMistake:
        "Setting up the proportion upside down. Check the answer's size: 30 cookies is 2.5 times 12, so the flour should be 2.5 times 2 — not seven times it.",
    },
  "A car travels at a constant speed. The table shows distance over time. Time (hours) | Distance (miles): 1 | 55, 2 | 110, 3 | 165, 4 | 220. Based on the table, how many miles does the car travel each hour?":
    {
      takeaway:
        "The per-hour rate is the distance at 1 hour, or any distance divided by its time.",
      steps: [
        "At 1 hour the car has gone 55 miles.",
        "110 ÷ 2 = 55 confirms the rate.",
      ],
      whyCorrect:
        "Every hour adds 55 miles, so the speed is 55 miles per hour.",
      distractors: {
        "1": "165 miles is the 3-hour total.",
        "2": "110 miles is the 2-hour total.",
        "3": "50 miles is a rounded guess, not the table's rate.",
      },
      commonMistake:
        "Reading a total as a rate. The table's later rows are cumulative distances; the rate is how much each single hour adds.",
    },
  "A study records the relationship between hours studied and test score. As the number of hours studied increases, the test score also increases. What kind of relationship does this describe between the two variables?":
    {
      takeaway:
        "Both variables moving the same direction is a positive relationship.",
      whyCorrect:
        "More hours going with higher scores means the two rise together — positive, also called direct.",
      distractors: {
        "0": "Inverse means one rises while the other falls.",
        "1": "Negative is another name for inverse and describes the opposite pattern.",
        "3": "The two clearly change together, so a relationship exists.",
      },
      commonMistake:
        "Hearing 'positive' as a value judgment. It describes the direction of the relationship, not whether the outcome is good.",
    },
  "A worker is paid a fixed amount per item assembled. The table shows total pay for items assembled. Items | Pay: 5 | $40, 10 | $80, 15 | $120. At this rate, how much would the worker earn for assembling 25 items?":
    {
      takeaway: "Find the per-item rate, then multiply.",
      steps: ["$40 ÷ 5 items = $8 per item.", "25 × $8 = $200."],
      whyCorrect: "At $8 per item, 25 items pay $200.",
      distractors: {
        "0": "$240 corresponds to 30 items.",
        "1": "$180 does not match any whole number of items at $8 each.",
        "3": "$160 is the pay for 20 items.",
      },
      commonMistake:
        "Adding one more table step to reach 20 and stopping. The question jumps to 25, which is why the unit rate is worth computing.",
    },

  // Subject-verb agreement.
  // Find the true subject and ignore everything between it and the verb. A
  // prepositional phrase — "of chocolates," "of the students" — never contains
  // the subject, and it is planted there to make a singular subject sound
  // plural. Each, either, and neither are always singular on their own. With
  // "neither … nor," the verb matches whichever subject sits CLOSER to it.
  // The five single-answer items in this skill all share one stem, so their
  // rationales live inline in the generated question files.
  "Which of the following sentences show correct subject-verb agreement? Select all that apply.":
    {
      takeaway:
        "Check each sentence separately: find the subject, strip the modifiers, match the verb.",
      whyCorrect:
        "'Box … sits' matches a singular subject; 'neither the coach nor the players were' agrees with the nearer plural; 'Each … has' keeps each singular.",
      distractors: {
        "2": "'Committee' is a collective noun treated as singular here, so it needs 'meets.'",
        "4": "'There is several reasons' inverts the order — the true subject is 'reasons,' so it must be 'There are.'",
      },
      commonMistake:
        "Skipping sentences that begin with 'There.' In those, the subject comes after the verb, so you have to look ahead to decide between is and are.",
    },
  "Choose the correct verb to complete the sentence: The list of approved vendors ___ posted on the bulletin board. Enter 'is' or 'are'.":
    {
      takeaway: "The subject is 'list,' singular.",
      whyCorrect:
        "'Of approved vendors' is a prepositional phrase; removing it leaves 'The list is posted.'",
      commonMistake:
        "Choosing 'are' because 'vendors' sits right before the blank. Placement does not make a noun the subject — the phrase 'of approved vendors' only describes the list.",
    },

  // Identifying genre.
  // Genre follows the writer's job. Narrative fiction tells an invented story
  // with characters and scene; technical or instructional writing gives numbered
  // steps; persuasive writing argues for an action, usually with should or must;
  // expository writing explains; poetry and literary prose use imagery and
  // figurative language; legal writing uses formal contractual terms. Nonfiction
  // is anything presenting itself as factually true, whatever its form.
  'Read the following passage: "Maria crept down the creaking staircase, her heart pounding. A shadow moved across the moonlit hall, and she gasped as the floorboard groaned beneath her bare foot." Which genre does this passage best represent?':
    {
      takeaway:
        "A character moving through a scene in past tense is narrative fiction.",
      whyCorrect:
        "Maria, the setting, and the building suspense are the machinery of a told story.",
      distractors: {
        "0": "No argument is made and nothing is urged.",
        "1": "A news report identifies real events, sources, and facts.",
        "2": "Technical writing gives procedures, not atmosphere.",
      },
      commonMistake:
        "Confusing a suspenseful scene with a news account. Both describe events; only fiction builds a scene around an invented character's sensations.",
    },
  'Read the following passage: "Step 1: Unplug the device. Step 2: Remove the four screws on the back panel. Step 3: Gently lift the cover and locate the battery." Which genre does this passage best represent?':
    {
      takeaway:
        "Numbered steps in command form mean technical or instructional writing.",
      whyCorrect:
        "The passage exists to walk a reader through a procedure, step by step.",
      distractors: {
        "0": "Poetry works through imagery and sound, not screw counts.",
        "2": "An editorial argues an opinion.",
        "3": "A memoir recounts the writer's own experience.",
      },
      commonMistake:
        "Overthinking a plain-language passage. The imperative verbs and numbered steps are the entire signature of this genre.",
    },
  'Read the following passage: "The city council should fund the new bike lanes immediately. Safer streets reduce accidents, and residents deserve healthier commuting options now." Which genre does this passage best represent?':
    {
      takeaway: "'Should' plus reasons for an action is persuasive writing.",
      whyCorrect:
        "The passage takes a position and offers supporting reasons to move the reader toward it.",
      distractors: {
        "0": "A biography narrates a life.",
        "1": "An expository report explains without advocating.",
        "3": "No story or characters appear.",
      },
      commonMistake:
        "Calling it expository because it contains facts. Persuasive writing uses facts too — what marks it is that they are marshaled toward a recommendation.",
    },
  'Read the passage: "The salt marsh exhales at dawn, and the heron lifts its question mark of a neck against a sky the color of old pewter." To which genre does this passage most likely belong?':
    {
      takeaway:
        "Figurative language and imagery mark poetry or literary prose.",
      whyCorrect:
        "A marsh that 'exhales,' a neck shaped like a question mark, and a pewter sky are metaphor and simile doing the work.",
      distractors: {
        "0": "Legal writing is precise and literal by design.",
        "1": "A manual would name parts and steps.",
        "2": "A news report states what happened plainly.",
      },
      commonMistake:
        "Requiring line breaks before calling something poetic. Literary prose uses the same devices in ordinary paragraphs.",
    },
  'Read the passage: "WHEREAS the Tenant agrees to remit payment no later than the fifth day of each calendar month, and WHEREAS failure to do so shall incur a late fee of five percent..." This passage is an example of which genre?':
    {
      takeaway: "WHEREAS, shall, and capitalized parties signal legal writing.",
      whyCorrect:
        "The formal contractual vocabulary and the stating of obligations and penalties are the marks of a contract.",
      distractors: {
        "1": "A folk tale narrates a traditional story.",
        "2": "No argument is being advanced.",
        "3": "No personal experience is recounted.",
      },
      commonMistake:
        "Reading formal, dense prose as academic. Academic writing explains and argues; contractual language binds parties to terms.",
    },
  'A text begins: "Captain\'s log, stardate 4521.3. We have entered the asteroid belt, and the navigation array is failing. If the colonists are to survive, I must reroute power from the cryo-bays before the next solar flare." This passage best fits which genre?':
    {
      takeaway:
        "An invented future with imagined technology is science fiction.",
      whyCorrect:
        "Stardates, cryo-bays, and colonists in an asteroid belt place the story in a speculative technological setting.",
      distractors: {
        "0": "No instructions are given to the reader.",
        "1": "Journalism reports real, verifiable events.",
        "3": "A historical biography covers a real person's past.",
      },
      commonMistake:
        "Taking the log format as evidence of nonfiction. The form imitates a real record; the content is invented, which is what settles the genre.",
    },
  "Which of the following passages would be classified as nonfiction? Select all that apply.":
    {
      takeaway:
        "Nonfiction presents itself as factually true, regardless of its format.",
      whyCorrect:
        "A repair guide, a news article about a real vote, and a biography of a real inventor all make factual claims about the actual world.",
      distractors: {
        "0": "A poem imagining the moon in conversation is invented.",
        "1": "A dragon fantasy is fiction by definition.",
      },
      commonMistake:
        "Assuming nonfiction means one kind of writing. Instructions, journalism, and biography look nothing alike and are all nonfiction — the test is factual intent, not form.",
    },

  // Bias and stereotypes.
  // A stereotype assigns a fixed trait to everyone in a group — watch for
  // always, all, never, and naturally attached to women, older drivers, or
  // people from a place. Bias is a one-sided presentation: only favorable
  // evidence, loaded language about the alternatives, or an undisclosed stake in
  // the outcome. Both are flaws in how a claim is made, not in whether the
  // underlying facts happen to be right.
  'Read the passage:\n\n"When we hired the new accountant, I was surprised. Women are usually too emotional to handle the pressure of managing a company\'s finances, yet she has kept our books flawless for two years."\n\nWhich element of the passage reflects a stereotype?':
    {
      takeaway:
        "A generalization about an entire group's abilities is a stereotype.",
      whyCorrect:
        "'Women are usually too emotional to handle … finances' assigns a trait to half the population regardless of any individual.",
      distractors: {
        "1": "The surprise is a reaction; the stereotype is the belief that produced it.",
        "2": "Flawless books is a factual observation about this accountant.",
        "3": "When she was hired is a neutral detail.",
      },
      commonMistake:
        "Thinking the praise cancels the stereotype. Treating her as an exception leaves the generalization intact — 'yet' actually reinforces it.",
    },
  "Read the passage:\n\n\"This review of the city budget is completely one-sided. The author lists every program he personally dislikes as 'wasteful' while praising every project in his own neighborhood, ignoring any data that might contradict him.\"\n\nThe passage suggests the budget review is flawed mainly because the author shows what?":
    {
      takeaway:
        "Favoring your own interests and ignoring contrary data is bias.",
      whyCorrect:
        "Praising his own neighborhood's projects while dismissing others, and skipping contradictory data, describes a review shaped by personal stake.",
      distractors: {
        "1": "The complaint is about slant, not writing skill.",
        "2": "No mathematical error is alleged.",
        "3": "The author ignores data rather than over-relying on it.",
      },
      commonMistake:
        "Assuming bias means the facts are false. The listed programs may be real — bias is about which facts get included and how they are framed.",
    },
  "Read the passage:\n\n\"The travel guide claims that every tourist will 'instantly fall in love' with the resort, calls the competing hotels 'dreary failures,' and never mentions a single drawback of the property it describes. The guide was, it turns out, paid for by the resort itself.\"\n\nWhich detail most clearly signals that the guide is biased?":
    {
      takeaway:
        "One-sided coverage plus a financial stake is the clearest bias signal.",
      whyCorrect:
        "No drawbacks mentioned, rivals dismissed, and funding from the subject itself together show the guide was not written to inform.",
      distractors: {
        "1": "Every travel guide is written for tourists.",
        "2": "Enthusiastic phrasing alone could appear in an honest review.",
        "3": "Mentioning competitors is normal; the loaded description of them is the issue.",
      },
      commonMistake:
        "Pointing to the enthusiastic language alone. Praise can be genuine — what makes this decisive is the missing drawbacks combined with who paid.",
    },
  "Which sentence relies on a stereotype?": {
    takeaway: "'Always' applied to a whole group marks a stereotype.",
    whyCorrect:
      "'Older drivers are always too slow and confused' assigns fixed negative traits to everyone in an age group.",
    distractors: {
      "0": "A course open to all drivers describes a program, not a group trait.",
      "1": "Reporting that drivers in a study renewed licenses is a factual observation.",
      "3": "'Some drivers requested' describes specific people without generalizing.",
    },
    commonMistake:
      "Flagging any sentence that mentions a group. Groups can be discussed factually — 'some drivers' and 'drivers in the study' do so; 'always' does not.",
  },
  "Read the passage: 'Our cleaning product clearly outperforms every competitor on the market. Rival brands are weak, overpriced, and made by companies that do not care about customers.' What does this passage most clearly reveal?":
    {
      takeaway: "Praise for one side and disparagement of all others is bias.",
      whyCorrect:
        "Sweeping superiority claims plus loaded attacks on every rival show the writer is advocating rather than comparing.",
      distractors: {
        "0": "An objective comparison would cite evidence and acknowledge trade-offs.",
        "2": "No weaknesses of the product are mentioned.",
        "3": "No test results appear at all.",
      },
      commonMistake:
        "Mistaking confident language for evidence. 'Clearly outperforms' asserts a conclusion without offering anything to check it against.",
    },
  "A travel writer states: 'People from mountain villages are naturally warm and simple folk who never worry about modern problems.' Which best explains why this statement is problematic?":
    {
      takeaway: "A positive-sounding generalization is still a stereotype.",
      whyCorrect:
        "It assigns uniform personality traits to everyone from a type of place, erasing individual differences.",
      distractors: {
        "0": "No two villages are being compared.",
        "2": "No statistics are cited.",
        "3": "The problem is the absence of specifics, not an excess.",
      },
      commonMistake:
        "Excusing a stereotype because it sounds complimentary. 'Warm and simple' still reduces real people to a fixed type, and 'naturally' and 'never' are the giveaways.",
    },

  // Author's purpose.
  // Four purposes cover nearly everything: to inform or explain, to persuade, to
  // instruct, and to entertain. Ask what the text is trying to make the reader
  // do. Steps in command form instruct; should, must, and a call to action
  // persuade; a neutral explanation of how something works informs; a story told
  // for enjoyment entertains. A passage can contain facts and still be
  // persuasive — what decides it is what the facts are being used for.
  'Read the passage:\n\n"To replace the printer cartridge, first open the front panel by pressing the gray tab. Remove the empty cartridge by lifting it straight up. Slide the new cartridge into the slot until it clicks, then close the panel."\n\nWhat is the author\'s primary purpose in this passage?':
    {
      takeaway: "Commands in order mean the purpose is to instruct.",
      whyCorrect:
        "Each sentence directs the reader through one step of replacing a cartridge.",
      distractors: {
        "0": "No story is told.",
        "2": "No history is given.",
        "3": "Nothing urges a purchase.",
      },
      commonMistake:
        "Choosing 'to inform' for any factual passage. Informing describes how something works; instructing tells the reader what to do — the imperative verbs decide it.",
    },
  'Read the passage:\n\n"Our neighborhood park is falling apart, and we cannot wait any longer. Cracked pathways and broken benches put families at risk every day. Sign the petition today and demand that the city fund repairs before someone is hurt."\n\nWhat is the author\'s primary purpose?':
    {
      takeaway: "A call to action reveals a persuasive purpose.",
      whyCorrect:
        "'Sign the petition today and demand' asks the reader to act, and the described hazards exist to motivate it.",
      distractors: {
        "0": "The tone is urgent, not humorous.",
        "1": "No construction process is explained.",
        "3": "Only one park is discussed.",
      },
      commonMistake:
        "Calling it instructional because it says to sign something. Instructions teach a procedure; this urges a position and asks for support.",
    },
  "Read the passage:\n\n\"A honeybee colony functions as a single organism. Worker bees gather nectar, nurse bees feed the young, and the queen lays thousands of eggs each day. Each role is essential, and the loss of any group can threaten the entire hive's survival.\"\n\nThe author's main purpose is to:":
    {
      takeaway: "A neutral explanation of how something works informs.",
      whyCorrect:
        "The passage describes the roles in a colony and how they interlock, without urging anything.",
      distractors: {
        "0": "No one is criticized.",
        "2": "Beekeeping is never recommended.",
        "3": "No personal experience appears.",
      },
      commonMistake:
        "Reading the warning about hive survival as advocacy. It explains a consequence within the system rather than asking the reader to do anything about it.",
    },
  "A pamphlet reads: 'Step 1: Unplug the device. Step 2: Remove the back panel using a screwdriver. Step 3: Replace the worn battery and reattach the panel.' What is the author's primary purpose?":
    {
      takeaway: "Numbered steps in command form: the purpose is to instruct.",
      whyCorrect:
        "The passage walks the reader through completing a battery replacement.",
      distractors: {
        "1": "No feelings are expressed.",
        "2": "Nothing is played for humor.",
        "3": "The pamphlet helps repair the device rather than replace it.",
      },
      commonMistake:
        "Assuming a manufacturer's pamphlet must be selling something. These steps extend the device's life, which is the opposite of a sales pitch.",
    },
  "An essay concludes: 'For all these reasons, the town must approve funding for the new library this year. Contact your council member today and demand action.' What is the author's main purpose?":
    {
      takeaway: "'Must' plus 'contact … today' is persuasion.",
      whyCorrect:
        "The passage states a required action and directs readers to press for it.",
      distractors: {
        "0": "No anecdote is told.",
        "1": "The library's appearance is never described.",
        "3": "Library organization is not discussed.",
      },
      commonMistake:
        "Being distracted by 'For all these reasons.' That phrase points back at evidence, but the sentence it introduces is a demand — which is what makes the purpose persuasive.",
    },
  "Read the passage: 'Photosynthesis is the process by which green plants convert sunlight, water, and carbon dioxide into glucose and oxygen. This reaction occurs in the chloroplasts and forms the base of most food chains.' What is the author's primary purpose?":
    {
      takeaway: "Explaining a process without advocating is informing.",
      whyCorrect:
        "The passage defines photosynthesis, names where it happens, and places it in the food chain — explanation throughout.",
      distractors: {
        "0": "No scientists are criticized.",
        "1": "No personal experience is recounted.",
        "2": "No comparison or argument about plants versus animals is made.",
      },
      commonMistake:
        "Mistaking technical vocabulary for persuasion. Difficulty is not the same as advocacy; nothing here asks the reader to believe or do anything.",
    },

  // Summarizing a multi-paragraph text.
  // A summary must cover every paragraph, in the writer's own words, without
  // adding anything. When a passage has two paragraphs, it usually has two
  // halves to a single idea — benefits and costs, or a problem and what solved
  // it — and the correct summary joins them, often with "but" or "while." The
  // standard traps are a true detail from one paragraph offered alone, and an
  // overstatement ("always," "the single cause," "the most effective way").
  "Read the passage and answer the question.\n\nVolunteering benefits more than the people who receive help. Studies show that those who volunteer regularly report lower levels of stress and a stronger sense of purpose. Some research even links volunteering to better physical health and longer life.\n\nAt the same time, communities gain skilled, motivated workers at no cost. Schools, hospitals, and food banks often rely on volunteers to provide services they could not otherwise afford.\n\nWhich choice best summarizes the passage?":
    {
      takeaway: "Two paragraphs, two beneficiaries — the summary needs both.",
      whyCorrect:
        "It captures the first paragraph's gains for volunteers and the second's gains for communities, which is the passage's whole structure.",
      distractors: {
        "0": "This overstates one paragraph — organizations 'often rely on' volunteers, not 'cannot function' without them.",
        "2": "'Most effective way' is a ranking the passage never makes.",
        "3": "Longer life is one supporting detail inside the first paragraph.",
      },
      commonMistake:
        "Choosing a true statement that covers half the passage. A summary is judged on coverage, so a detail-level claim fails even when accurate.",
    },
  "Read the passage and answer the question.\n\nThe printing press, invented in the 1400s, made books far cheaper to produce. Before its invention, scribes copied texts by hand, a slow process that kept books rare and expensive.\n\nAs printed books spread, literacy rates climbed and new ideas traveled quickly across Europe. Historians often credit the press with helping to spark major social and religious movements.\n\nWhich statement best summarizes the passage?":
    {
      takeaway: "Cause in the first paragraph, effects in the second.",
      whyCorrect:
        "Cheap, widespread books is the cause; rising literacy and spreading ideas are the effects. Both halves are represented.",
      distractors: {
        "0": "The passage never says scribes refused anything.",
        "1": "This reverses the causation — books were rare because copying was slow.",
        "2": "'Single cause of every European revolution' overstates 'helping to spark.'",
      },
      commonMistake:
        "Accepting an option that hardens a hedge. The passage says historians 'often credit' the press with 'helping to' spark movements — 'the single cause of every' is a much larger claim.",
    },
  "Read the passage and answer the question.\n\nElectric vehicles produce no tailpipe emissions, which can improve air quality in crowded cities. For this reason, many governments now offer rebates to encourage their purchase.\n\nHowever, the electricity that powers these cars must come from somewhere. In regions that burn coal to generate power, the overall environmental benefit of an electric vehicle shrinks considerably.\n\nWhich choice best summarizes the passage?":
    {
      takeaway: "'However' between paragraphs means the summary must hold both sides.",
      whyCorrect:
        "It states the local emissions benefit and the qualification that the full benefit depends on the power source.",
      distractors: {
        "0": "'Always better' ignores the entire second paragraph.",
        "2": "Coal is mentioned as one power source, not named the main cause of city pollution.",
        "3": "The passage never recommends ending rebates.",
      },
      commonMistake:
        "Summarizing only the paragraph you agree with. A two-sided passage requires a two-sided summary, whichever side seems stronger.",
    },
  "Read the passage and answer the question.\n\nWhen a city decides to plant trees along its streets, the benefits go beyond appearance. Mature trees shade pavement and buildings, lowering summer temperatures and reducing the energy needed for cooling. Their leaves trap dust and absorb some pollutants from the air.\n\nHowever, street trees also bring costs. Roots can crack sidewalks and clog pipes, and falling limbs may damage cars or wires. City budgets must cover pruning, leaf removal, and occasional replacement.\n\nWhich choice best summarizes the passage?":
    {
      takeaway: "Benefits and costs — the summary must name both.",
      whyCorrect:
        "It pairs the cooling and air-quality benefits with the maintenance costs and hazards, matching the passage's two paragraphs.",
      distractors: {
        "0": "Cooling is one benefit from the first paragraph only.",
        "1": "The passage lists drawbacks but never recommends against planting.",
        "3": "The passage opens by saying the benefits go *beyond* appearance.",
      },
      commonMistake:
        "Turning a balanced passage into a recommendation. Listing costs is not the same as advising against — the passage takes no side.",
    },
  "Read the passage and answer the question.\n\nFor centuries, sailors navigated by dead reckoning, estimating their position from speed, heading, and time elapsed. The method worked reasonably well over short distances but accumulated errors on long voyages, sometimes placing ships hundreds of miles from where their crews believed they were.\n\nThe invention of the marine chronometer changed this. By keeping accurate time at sea, the device let navigators calculate longitude precisely. Voyages grew safer, and trade routes that had once been gambles became dependable.\n\nWhich choice best summarizes the passage?":
    {
      takeaway: "Problem then solution: the summary carries both.",
      whyCorrect:
        "It names dead reckoning's imprecision on long voyages and the chronometer's accurate timekeeping as the fix.",
      distractors: {
        "1": "Unpredictable trade routes is a consequence mentioned in passing.",
        "2": "This defines dead reckoning without reaching the second paragraph.",
        "3": "This covers the chronometer without the problem it solved.",
      },
      commonMistake:
        "Picking an accurate sentence from a single paragraph. Two of these options summarize one paragraph each perfectly — and each is incomplete for that reason.",
    },
  "Read the passage and answer the question.\n\nHoneybees communicate the location of food through movement. A scout that finds a rich patch of flowers returns to the hive and performs a looping pattern often called a waggle dance. The angle of the dance relative to the sun indicates direction, and its duration signals distance.\n\nThis silent language lets a colony direct hundreds of workers to the same source without any of them having seen it. In effect, one bee's discovery becomes the whole hive's knowledge.\n\nWhich choice best summarizes the passage?":
    {
      takeaway: "Mechanism plus significance makes the complete summary.",
      whyCorrect:
        "It names how the dance encodes direction and distance and why that matters — one scout guiding the whole colony.",
      distractors: {
        "0": "The looping movement is described without its meaning or effect.",
        "1": "Colony composition is background, not the passage's point.",
        "3": "The sun angle is one of the two things encoded.",
      },
      commonMistake:
        "Settling for the how and skipping the so-what. The second paragraph exists to explain the significance, and a summary that omits it covers only half the text.",
    },

  // Locating specific information.
  // The answer is stated in the passage — find it rather than reason toward it.
  // Take the key term from the question, scan for it in the text, and read that
  // sentence closely. Distractors are usually other facts from the same passage
  // placed where a careless scan would land, which is why matching the question's
  // exact term matters more than remembering the gist.
  "Read the passage and answer the question.\n\nThe blue whale is the largest animal known to have existed. An adult can reach a length of about 100 feet and weigh as much as 200 tons. Despite its enormous size, the blue whale feeds almost entirely on tiny shrimp-like animals called krill, eating up to four tons of them each day.\n\nAccording to the passage, what does the blue whale eat?":
    {
      takeaway: "'According to the passage' means the answer is written there.",
      whyCorrect:
        "The passage states the whale feeds almost entirely on krill, tiny shrimp-like animals.",
      distractors: {
        "0": "Fish and squid are never mentioned.",
        "2": "No plants or seaweed appear in the passage.",
        "3": "Nothing suggests blue whales eat other whales.",
      },
      commonMistake:
        "Answering from what you already know about whales. These questions test locating, not knowledge, and the passage is the only authority.",
    },
  "Read the passage and answer the question.\n\nThe city library expanded its hours last spring. It is now open from 9:00 a.m. to 8:00 p.m. on weekdays and from 10:00 a.m. to 5:00 p.m. on Saturdays. The library remains closed on Sundays and all federal holidays. Patrons may return books at any time using the outdoor drop box.\n\nAccording to the passage, when is the library open on Saturdays?":
    {
      takeaway: "With multiple schedules listed, match the day the question names.",
      whyCorrect: "The passage gives Saturday hours as 10:00 a.m. to 5:00 p.m.",
      distractors: {
        "0": "Sunday is the closed day, not Saturday.",
        "1": "9:00 a.m. to 8:00 p.m. is the weekday schedule.",
        "3": "This mixes the weekday opening time with the Saturday closing time.",
      },
      commonMistake:
        "Grabbing the first time range you see. Passages with several schedules place the wrong one first on purpose — anchor on the day before reading the hours.",
    },
  "Read the passage and answer the question.\n\nMount Kilimanjaro, located in Tanzania, is the highest mountain in Africa, rising about 19,341 feet above sea level. Unlike many tall peaks, it is not part of a mountain range; it stands alone as a dormant volcano. Thousands of climbers attempt to reach its summit each year, though many turn back because of altitude sickness.\n\nAccording to the passage, why do many climbers turn back?":
    {
      takeaway: "A 'why' question usually has 'because' sitting next to the answer.",
      whyCorrect:
        "The passage says many turn back because of altitude sickness.",
      distractors: {
        "0": "No closure is mentioned; thousands attempt the climb each year.",
        "1": "The volcano is described as dormant.",
        "3": "The passage says it stands alone, not in a range.",
      },
      commonMistake:
        "Choosing a detail that is true of the mountain but not an answer to the question asked. Two of these options describe the volcano incorrectly, and none of them is the stated reason.",
    },
  "Read the passage and answer the question.\n\nThe community pool opens for the season on May 24 and closes on September 2. Lap swimming is reserved for the early morning hours, from 6:00 a.m. to 8:00 a.m. on weekdays. Open swim runs from 10:00 a.m. to 7:00 p.m. daily. Swim lessons for children are held on Saturday mornings beginning at 9:00 a.m.\n\nAccording to the passage, when is lap swimming available?":
    {
      takeaway: "Three activities, three schedules — match the one named.",
      whyCorrect:
        "Lap swimming is listed as 6:00 a.m. to 8:00 a.m. on weekdays.",
      distractors: {
        "0": "May 24 to September 2 is the season, not the daily lap hours.",
        "2": "Saturday at 9:00 a.m. is children's swim lessons.",
        "3": "10:00 a.m. to 7:00 p.m. is open swim.",
      },
      commonMistake:
        "Reading past the activity name. Every wrong option here is a real detail from the passage attached to a different activity.",
    },
  "Read the passage and answer the question.\n\nThe Pacific giant octopus typically weighs about 33 pounds, though unusually large individuals have reached over 100 pounds. It lives in the cold coastal waters of the northern Pacific, often hiding in dens among rocks. A female lays tens of thousands of eggs at once and guards them without eating until they hatch, after which she dies.\n\nAccording to the passage, what does the female octopus do while guarding her eggs?":
    {
      takeaway: "Find the clause attached to 'guards them.'",
      whyCorrect:
        "The passage says she guards the eggs without eating until they hatch.",
      distractors: {
        "0": "Over 100 pounds describes unusually large individuals, not guarding behavior.",
        "1": "She lays her eggs once, all at the same time.",
        "3": "No move to deeper water is mentioned.",
      },
      commonMistake:
        "Skimming past 'without eating' because it is a short phrase. Detail questions often turn on exactly these compact modifiers.",
    },
  "Read the passage and answer the question.\n\nThe Riverside branch library offers several services beyond lending books. The first floor houses a quiet reading room and a bank of public computers, available without a reservation. The second floor contains study rooms that groups may reserve up to two weeks in advance. The basement level holds the local history archive, open only on Thursdays and by appointment.\n\nAccording to the passage, where is the local history archive located?":
    {
      takeaway:
        "When a passage is organized by location, find the item and read its level.",
      whyCorrect: "The passage places the local history archive on the basement level.",
      distractors: {
        "0": "The second floor holds reservable study rooms.",
        "2": "The first floor holds the reading room.",
        "3": "The public computers are also on the first floor.",
      },
      commonMistake:
        "Confusing the archive's access rules with its location. 'Thursdays and by appointment' answers *when*; the question asks *where*.",
    },

  // Printed communications.
  // Notices, emails, labels, and appointment cards are organized so each line
  // answers one question. Locate the line matching what is asked and read it
  // exactly — the answer is rarely inferred. Two recurring traps: a date or time
  // that belongs to a different event in the same notice, and an instruction
  // that requires arithmetic ("arrive 15 minutes early") rather than the printed
  // time itself.
  "Read the notice and answer the question.\n\nCOMMUNITY POOL NOTICE\nThe pool will be CLOSED for cleaning on Monday, July 6.\nNormal hours resume Tuesday, July 7: 6:00 a.m. - 9:00 p.m.\nChildren under 12 must be accompanied by an adult at all times.\nQuestions? Call the front desk at 555-0182.\n\nAccording to the notice, on which day is the pool closed?":
    {
      takeaway: "Two dates appear — match the one attached to the closure.",
      whyCorrect: "The notice states the pool is closed for cleaning on Monday, July 6.",
      distractors: {
        "0": "July 7 is when normal hours resume.",
        "1": "Only one day is affected.",
        "2": "July 5 is never mentioned.",
      },
      commonMistake:
        "Reading the second date because it comes with specific hours. Those hours mark the reopening, which is the opposite of what the question asks.",
    },
  "Read the email and answer the question.\n\nTo: All Staff\nFrom: Human Resources\nSubject: Parking Lot Repaving\n\nThe north parking lot will be repaved starting Wednesday and will be unavailable for two days. During this time, please use the south lot or the street garage on Elm Avenue. Shuttle service to the main entrance will run every 15 minutes from the Elm Avenue garage.\n\nAccording to the email, where can staff park while the north lot is closed?":
    {
      takeaway: "The instruction sentence names both alternatives.",
      whyCorrect:
        "Staff are told to use the south lot or the Elm Avenue street garage.",
      distractors: {
        "1": "Two specific facilities are offered, not street parking.",
        "2": "The north lot is the one being repaved.",
        "3": "Working from home is never mentioned.",
      },
      commonMistake:
        "Reporting only one option when the email gives two. 'Or' means both are available, and an answer naming just one is incomplete.",
    },
  "Read the appointment card and answer the question.\n\nWESTSIDE DENTAL\nPatient: J. Ortiz\nAppointment: Thursday, August 13, at 2:30 p.m.\nReason: Routine cleaning\nPlease arrive 15 minutes early to update your insurance information.\nTo reschedule, call at least 24 hours in advance.\n\nAccording to the card, what time should the patient arrive at the office?":
    {
      takeaway:
        "The arrival time is the appointment time minus the early-arrival instruction.",
      steps: ["Appointment: 2:30 p.m.", "Arrive 15 minutes early.", "2:30 − 0:15 = 2:15 p.m."],
      whyCorrect: "Fifteen minutes before the 2:30 appointment is 2:15 p.m.",
      distractors: {
        "1": "2:30 p.m. is the appointment itself, not the arrival time.",
        "2": "2:45 p.m. adds fifteen minutes instead of subtracting.",
        "3": "1:30 p.m. subtracts an hour rather than fifteen minutes.",
      },
      commonMistake:
        "Answering with the printed appointment time. The card gives an instruction that changes it, and the question asks when to *arrive*.",
    },
  "Read the notice and answer the question.\n\nNOTICE TO RESIDENTS\nWater service to Building C will be temporarily shut off on Tuesday, June 30, from 9:00 a.m. to 1:00 p.m. so that crews can replace a corroded main valve. Please store drinking water in advance. Service to Buildings A and B will not be affected. We apologize for the inconvenience.\n- Greenfield Property Management\n\nAccording to the notice, why will the water be shut off?":
    {
      takeaway: "'So that' introduces the reason.",
      whyCorrect:
        "The notice states the shutoff is so crews can replace a corroded main valve.",
      distractors: {
        "1": "Storing drinking water is advice to residents, not the reason for the work.",
        "2": "Buildings A and B are explicitly unaffected.",
        "3": "The storage request follows from the shutoff; it did not cause it.",
      },
      commonMistake:
        "Confusing an instruction with a cause. 'Store drinking water in advance' tells residents what to do about the shutoff, not why it is happening.",
    },
  "Read the email and answer the question.\n\nTo: All Volunteers\nFrom: Shelter Coordinator\nSubject: Schedule Change for the Adoption Fair\n\nHi everyone. The adoption fair has been moved from Saturday to Sunday because of the forecasted storm. Setup now begins at 8:00 a.m. Sunday in the east parking lot. If you signed up for a Saturday shift, your shift carries over to the same time on Sunday. Please reply by Friday if you can no longer attend.\n\nAccording to the email, what should a volunteer do if they can no longer attend?":
    {
      takeaway: "Find the sentence beginning with the same condition the question names.",
      whyCorrect:
        "The email's final line asks volunteers who can no longer attend to reply by Friday.",
      distractors: {
        "1": "Shifts carry over automatically; no new signup is required.",
        "2": "Setup is in the east lot, and this is not an instruction about absence.",
        "3": "The fair moved off Saturday entirely.",
      },
      commonMistake:
        "Answering with the most prominent detail rather than the conditional instruction. The email contains several directions; only one applies to volunteers who cannot come.",
    },
  "Read the product label and answer the question.\n\nORALEASE THROAT SPRAY\nDirections: Adults and children 12 years and older, spray twice into the throat every two hours as needed. Do not exceed 8 doses in 24 hours. Children under 12: ask a doctor. Stop use and ask a doctor if sore throat lasts more than 2 days or is accompanied by fever.\nWarnings: Do not use if seal under cap is broken.\n\nAccording to the label, what is the maximum number of doses an adult may take in one day?":
    {
      takeaway: "The dosage ceiling is stated after 'Do not exceed.'",
      whyCorrect: "The label caps use at 8 doses in 24 hours.",
      distractors: {
        "0": "Two is the number of sprays per dose, not doses per day.",
        "2": "12 is the age threshold in the directions.",
        "3": "24 is the number of hours in the limit period.",
      },
      commonMistake:
        "Picking up a nearby number without checking its unit. This label contains four numbers — sprays, doses, ages, and hours — and only one answers the question.",
    },

  // Reading graphics.
  // Read the title and labels first, then find the row, bar, or point the
  // question names. Two habits prevent most errors: check whether the question
  // asks about one serving or the whole container — per-serving values need
  // multiplying — and when it asks about a gap or difference between two lines,
  // compute the difference at each point rather than eyeballing which values are
  // highest.
  "Use the table to answer the question.\n\nDaily Rainfall (in inches)\nMonday: 0.2\nTuesday: 1.1\nWednesday: 0.0\nThursday: 0.5\nFriday: 0.8\n\nAccording to the table, which day had the most rainfall?":
    {
      takeaway: "Compare all values and take the largest.",
      whyCorrect: "Tuesday's 1.1 inches is the highest figure in the table.",
      distractors: {
        "0": "Friday recorded 0.8 inches, the second highest.",
        "2": "Monday recorded 0.2 inches.",
        "3": "Thursday recorded 0.5 inches.",
      },
      commonMistake:
        "Comparing decimals by digit count. 0.8 has fewer characters than 1.1 but is smaller — compare place values, not appearances.",
    },
  "Use the bus schedule to answer the question.\n\nROUTE 9 DEPARTURES (from Central Station)\n7:00 a.m. - Express to Airport\n7:20 a.m. - Local to Downtown\n7:45 a.m. - Express to Airport\n8:10 a.m. - Local to Downtown\n8:30 a.m. - Express to Airport\n\nA passenger arrives at Central Station at 7:25 a.m. and needs an Express bus to the Airport. According to the schedule, what is the next departure she can take?":
    {
      takeaway: "Apply both conditions: after her arrival, and the right destination.",
      steps: [
        "She arrives at 7:25, so 7:00 and 7:20 are gone.",
        "The next departures are 7:45 Express, 8:10 Local, 8:30 Express.",
        "The first Express after 7:25 is 7:45 a.m.",
      ],
      whyCorrect: "7:45 a.m. is the earliest Express to the Airport she can still catch.",
      distractors: {
        "1": "8:10 is a Local to Downtown, and later besides.",
        "2": "7:00 departed before she arrived.",
        "3": "7:20 also departed before 7:25, and it goes Downtown.",
      },
      commonMistake:
        "Applying only one filter. The next departure of any kind and the next Express are different buses, which is why the schedule mixes the two routes.",
    },
  "Use the nutrition label to answer the question.\n\nNUTRITION FACTS (per serving)\nServings per container: 3\nCalories: 150\nTotal Fat: 6 g\nSodium: 200 mg\nTotal Carbohydrate: 22 g\nProtein: 4 g\n\nIf a person eats the entire container, how many grams of total carbohydrate will they consume?":
    {
      takeaway: "Label values are per serving — multiply by the servings per container.",
      steps: ["22 g of carbohydrate per serving.", "3 servings per container.", "22 × 3 = 66 g."],
      whyCorrect: "Eating all three servings means consuming 66 grams of carbohydrate.",
      distractors: {
        "0": "44 g is only two servings.",
        "2": "11 g halves one serving instead of scaling up.",
        "3": "22 g is a single serving, which is not the whole container.",
      },
      commonMistake:
        "Reading the printed value as the total. 'Per serving' and 'servings per container' are the two lines that matter, and the label puts them apart on purpose.",
    },
  "A bar graph titled 'Monthly Rainfall (in inches), Maple County' shows the following values: January 2.1, February 1.8, March 3.4, April 4.6, May 5.2, June 3.0. The vertical axis measures inches of rainfall, and the horizontal axis lists the months January through June.\n\nAccording to the graph, which month had the highest rainfall?":
    {
      takeaway: "Find the largest value and read its label.",
      whyCorrect: "May's 5.2 inches is the highest of the six months.",
      distractors: {
        "0": "January recorded 2.1 inches, among the lowest.",
        "2": "April's 4.6 inches is the second highest.",
        "3": "March recorded 3.4 inches.",
      },
      commonMistake:
        "Assuming the last or middle month must be the peak. Read the values; position in the sequence tells you nothing about size.",
    },
  "A nutrition table for one cup of cooked lentils lists the following: Calories 230, Protein 18 g, Dietary Fiber 16 g, Total Fat 1 g, Iron 37% of the Daily Value, Folate 90% of the Daily Value.\n\nAccording to the table, which nutrient meets the highest percentage of the Daily Value in one cup of lentils?":
    {
      takeaway:
        "The question asks about percentages, so only the entries given in percent qualify.",
      whyCorrect:
        "Folate at 90% of the Daily Value exceeds iron at 37%, the only other percentage listed.",
      distractors: {
        "0": "Dietary fiber is listed in grams, not as a percentage.",
        "1": "Iron's 37% is a percentage but lower than folate's.",
        "2": "Protein is listed in grams.",
      },
      commonMistake:
        "Comparing 18 grams of protein against 90 percent. Grams and percentages are different units and cannot be ranked against each other — the question's wording restricts the field.",
    },
  "A line graph titled 'Library Visitors per Day' tracks two lines across one week. The 'Adults' line reads: Mon 120, Tue 110, Wed 140, Thu 130, Fri 160, Sat 200. The 'Children' line reads: Mon 40, Tue 35, Wed 60, Thu 50, Fri 70, Sat 150.\n\nOn which day was the gap between adult and child visitors the smallest?":
    {
      takeaway: "A gap question requires subtracting at each point.",
      steps: [
        "Mon 120 − 40 = 80; Tue 110 − 35 = 75.",
        "Wed 140 − 60 = 80; Thu 130 − 50 = 80.",
        "Fri 160 − 70 = 90; Sat 200 − 150 = 50.",
        "The smallest difference is Saturday's 50.",
      ],
      whyCorrect: "Saturday's 50-visitor gap is the narrowest of the week.",
      distractors: {
        "0": "Wednesday's gap is 80.",
        "1": "Friday's gap is 90 — the widest.",
        "3": "Monday's gap is also 80.",
      },
      commonMistake:
        "Choosing the day with the lowest totals. Tuesday has the fewest visitors overall and not the smallest gap; Saturday has the most visitors and the narrowest gap.",
    },
};
