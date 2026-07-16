import type { GuidedLesson } from "../guided-lesson-types";

/** Guided lesson for SCIENCE / chemistry / "Recognize Basic Atomic Structure".
 *  Content carried over from the flat skill-lesson blocks, restructured into
 *  the concept / rule / example / mistake / quick check pattern. */
export const RECOGNIZE_BASIC_ATOMIC_STRUCTURE: GuidedLesson = {
  section: "SCIENCE",
  topic: "chemistry",
  skill: "Recognize Basic Atomic Structure",
  slug: "recognize-basic-atomic-structure",
  title: "Basic Atomic Structure",
  summary:
    "Atoms are built from protons, neutrons, and electrons whose counts and arrangement explain elements, ions, isotopes, bonding, compounds, and basic organic chemistry.",
  minutes: [14, 17],
  objectives: [
    "Identify the charge, location, and role of protons, neutrons, and electrons",
    "Use atomic number and mass number to count the particles in an atom",
    "Distinguish isotopes, cations, and anions",
    "Explain how valence electrons drive ionic and covalent bonding",
    "Classify matter as elements, compounds, or mixtures",
  ],
  sections: [
    {
      id: "subatomic-particles",
      title: "Subatomic particles",
      blocks: [
        {
          kind: "concept",
          body: "An atom has a dense central nucleus surrounded by electrons. Three particles build every atom, and each has a fixed charge, location, and job.",
        },
        {
          kind: "rule",
          title: "The three particles",
          items: [
            "Protons: positive charge (+1), located in the nucleus, set the element's identity",
            "Neutrons: no charge (neutral), located in the nucleus, add mass",
            "Electrons: negative charge (−1), orbit the nucleus in shells, almost no mass",
          ],
        },
        {
          kind: "concept",
          body: "In a neutral atom the number of protons equals the number of electrons, so the charges cancel out.",
        },
        {
          kind: "tip",
          body: "Memory cue: prOtons are pOsitive, neutrons are neutral, and electrons are the leftover negatives.",
        },
      ],
      quickCheck: {
        prompt: "Which particle sits outside the nucleus?",
        choices: [
          "The proton, because it is positive",
          "The neutron, because it has no charge",
          "The electron, which orbits in shells",
          "None; all three particles sit in the nucleus",
        ],
        answer: 2,
        explanation:
          "Protons and neutrons pack into the nucleus; electrons orbit around it in shells and carry almost no mass.",
      },
    },
    {
      id: "atomic-vs-mass-number",
      title: "Atomic number vs mass number",
      blocks: [
        {
          kind: "concept",
          body: "Atomic number = number of protons. It defines which element the atom is and never changes for that element: every carbon atom has 6 protons.\n\nMass number = protons + neutrons. Electrons are too light to count.",
        },
        {
          kind: "rule",
          title: "Counting neutrons",
          items: [
            "Neutrons = mass number − atomic number",
          ],
        },
        {
          kind: "example",
          title: "Neutrons in carbon-12",
          steps: [
            {
              note: "Carbon-12 has atomic number 6 and mass number 12.",
              work: [],
            },
            {
              note: "Subtract the atomic number from the mass number.",
              work: ["12 − 6 = 6"],
            },
          ],
          answer: "6 neutrons",
        },
        {
          kind: "mistake",
          body: "Do not add electrons into the mass number. Mass number counts only protons and neutrons; electrons are too light to matter.",
        },
      ],
      quickCheck: {
        prompt:
          "An atom has atomic number 8 and mass number 18. How many neutrons does it have?",
        choices: ["8", "10", "18", "26"],
        answer: 1,
        explanation:
          "Neutrons = mass number − atomic number = 18 − 8 = 10. Adding the two numbers (26) or reading off either number alone is the trap.",
      },
    },
    {
      id: "isotopes",
      title: "Isotopes",
      blocks: [
        {
          kind: "concept",
          body: "Isotopes are atoms of the same element (same number of protons) but with different numbers of neutrons.",
        },
        {
          kind: "rule",
          items: [
            "Same atomic number, different mass numbers",
            "Same chemical properties, because chemistry depends on electrons and protons, not neutrons",
          ],
        },
        {
          kind: "example",
          title: "Carbon-12 vs carbon-14",
          steps: [
            {
              note: "Both are carbon, so both have 6 protons.",
              work: ["carbon-12: 12 − 6 = 6 neutrons", "carbon-14: 14 − 6 = 8 neutrons"],
            },
            {
              note: "Carbon-14 has 2 extra neutrons, nothing else changes.",
              work: [],
            },
          ],
          answer: "Same element, different neutron counts",
        },
        {
          kind: "mistake",
          body: "Isotopes do not differ in protons. Changing the proton count would make a different element, not an isotope.",
        },
      ],
      quickCheck: {
        prompt: "What makes carbon-14 an isotope of carbon-12?",
        choices: [
          "It has more protons",
          "It has more neutrons",
          "It has more electrons",
          "It is a different element",
        ],
        answer: 1,
        explanation:
          "Isotopes share the same proton count (6 for carbon) but differ in neutrons; carbon-14 carries 2 extra neutrons.",
      },
    },
    {
      id: "ions",
      title: "Ions: cations and anions",
      blocks: [
        {
          kind: "concept",
          body: "An ion is an atom that has gained or lost electrons, giving it a net charge. Protons never change; only electrons move.",
        },
        {
          kind: "rule",
          title: "Two kinds of ion",
          items: [
            "Cation: a positive ion formed by losing electrons (now more protons than electrons); metals tend to form cations",
            "Anion: a negative ion formed by gaining electrons (now more electrons than protons); nonmetals tend to form anions",
          ],
        },
        {
          kind: "example",
          title: "Sodium becomes Na+",
          steps: [
            {
              note: "A neutral sodium atom has 11 protons and 11 electrons.",
              work: [],
            },
            {
              note: "It loses 1 electron, leaving 10 electrons against 11 protons.",
              work: ["11 protons − 10 electrons = +1 charge"],
            },
          ],
          answer: "Na+, a cation with a +1 charge",
        },
        {
          kind: "tip",
          body: "Memory aid: a cation is 'paw-sitive'; an anion is 'a negative ion.'",
        },
        {
          kind: "mistake",
          body: "Losing an electron makes an atom more positive, not more negative. The charge reflects what remains, not what left.",
        },
      ],
      quickCheck: {
        prompt: "An atom gains 2 electrons. What does it become?",
        choices: [
          "A cation with a +2 charge",
          "An anion with a −2 charge",
          "An isotope with 2 extra neutrons",
          "A different element",
        ],
        answer: 1,
        explanation:
          "Gaining electrons adds negative charge, producing an anion with a −2 charge. Protons never change, so the element stays the same.",
      },
    },
    {
      id: "electron-shells",
      title: "Electron shells and valence electrons",
      blocks: [
        {
          kind: "concept",
          body: "Electrons fill shells (energy levels) from the inside out.",
        },
        {
          kind: "rule",
          items: [
            "The first three shells hold up to 2, then 8, then 8 electrons",
            "Valence electrons are the electrons in the outermost shell; they control bonding",
            "Octet rule: atoms are most stable with 8 electrons in their outer shell (or 2 for the very first shell)",
          ],
        },
        {
          kind: "concept",
          body: "Atoms gain, lose, or share electrons to reach a full outer shell.",
        },
        {
          kind: "mistake",
          body: "Bonding is decided by the outermost shell only. Inner-shell electrons are full and stable, so counting every electron when predicting bonds leads you astray.",
        },
      ],
      quickCheck: {
        prompt: "Which electrons determine how an atom bonds?",
        choices: [
          "The electrons in the innermost shell",
          "The electrons in the outermost shell",
          "All electrons equally",
          "The electrons in the nucleus",
        ],
        answer: 1,
        explanation:
          "Valence electrons, the ones in the outermost shell, control bonding. Electrons never sit in the nucleus.",
      },
    },
    {
      id: "ionic-vs-covalent",
      title: "Ionic vs covalent bonds",
      blocks: [
        {
          kind: "concept",
          body: "Atoms bond to achieve full valence shells. The two main bond types differ in what happens to the electrons.",
        },
        {
          kind: "tabs",
          tabs: [
            {
              label: "Ionic",
              blocks: [
                {
                  kind: "concept",
                  body: "Electrons are transferred from one atom to another, creating oppositely charged ions that attract. Ionic bonds usually form between a metal and a nonmetal, as in sodium chloride (NaCl).",
                },
              ],
            },
            {
              label: "Covalent",
              blocks: [
                {
                  kind: "concept",
                  body: "Electrons are shared between atoms. Covalent bonds usually form between nonmetals, as in water (H2O).",
                },
              ],
            },
          ],
        },
        {
          kind: "concept",
          body: "Ionic compounds tend to dissolve in water and conduct electricity when dissolved; covalent molecules often do not.",
        },
        {
          kind: "tip",
          body: "Transfer vs share is the whole distinction: metal plus nonmetal usually means transfer (ionic), nonmetal plus nonmetal usually means share (covalent).",
        },
      ],
      quickCheck: {
        prompt: "In a covalent bond, what do the atoms do with their electrons?",
        choices: [
          "Transfer them from one atom to the other",
          "Share them between the atoms",
          "Destroy them to become stable",
          "Move them into the nucleus",
        ],
        answer: 1,
        explanation:
          "Covalent bonds share electrons, typically between nonmetals like the hydrogen and oxygen in water. Transfer describes ionic bonds.",
      },
    },
    {
      id: "matter-classification",
      title: "Atoms, elements, compounds, mixtures",
      blocks: [
        {
          kind: "concept",
          body: "These four terms describe matter at increasing levels of combination, and the TEAS expects you to keep them straight.",
        },
        {
          kind: "rule",
          title: "The four terms",
          items: [
            "Atom: the smallest unit of matter that keeps an element's properties",
            "Element: a pure substance made of only one kind of atom (everything on the periodic table); cannot be broken down chemically",
            "Compound: two or more different elements chemically bonded in a fixed ratio (water, table salt); has new properties",
            "Mixture: two or more substances physically combined, not chemically bonded, and separable by physical means",
          ],
        },
        {
          kind: "concept",
          body: "Mixtures can be homogeneous (uniform, like saltwater) or heterogeneous (uneven, like a salad).",
        },
        {
          kind: "mistake",
          body: "Do not call a mixture a compound. A compound is chemically bonded in a fixed ratio and has new properties; a mixture is only physically combined and can be separated by physical means.",
        },
      ],
      quickCheck: {
        prompt: "Saltwater is best classified as which of the following?",
        choices: [
          "An element",
          "A compound",
          "A homogeneous mixture",
          "A heterogeneous mixture",
        ],
        answer: 2,
        explanation:
          "Salt and water are physically combined, not chemically bonded, so saltwater is a mixture; it is uniform throughout, so it is homogeneous.",
      },
    },
    {
      id: "organic-basics",
      title: "Organic chemistry basics",
      blocks: [
        {
          kind: "concept",
          body: "Organic chemistry is the chemistry of carbon-containing compounds.",
        },
        {
          kind: "rule",
          items: [
            "Carbon has 4 valence electrons, so it forms 4 covalent bonds, allowing long chains and rings",
            "Hydrocarbons are molecules made of only carbon and hydrogen (methane, CH4)",
            "An alcohol contains a hydroxyl group (-OH) attached to a carbon (ethanol)",
          ],
        },
        {
          kind: "concept",
          body: "Carbon's bonding flexibility is why it forms the backbone of all living things.",
        },
      ],
      quickCheck: {
        prompt: "Why can carbon form long chains and rings?",
        choices: [
          "It has 4 valence electrons and forms 4 covalent bonds",
          "It has a full outer shell and never reacts",
          "It transfers electrons easily like a metal",
          "It has more neutrons than other elements",
        ],
        answer: 0,
        explanation:
          "Carbon's 4 valence electrons let it form 4 covalent bonds, which is what makes chains, rings, and the backbone of living things possible.",
      },
    },
    {
      id: "periodic-table",
      title: "Periodic table basics",
      blocks: [
        {
          kind: "concept",
          body: "The periodic table organizes all elements by increasing atomic number (number of protons).",
        },
        {
          kind: "rule",
          items: [
            "Rows are periods; columns are groups (families)",
            "Elements in the same group act alike because they have the same number of valence electrons",
            "The left and middle are mostly metals; the upper right are nonmetals; a stair-step zone holds metalloids",
            "The far right column (noble gases) already has full valence shells, so those elements are very unreactive",
          ],
        },
        {
          kind: "tip",
          body: "When asked why two elements behave alike, look at their column: same group means same number of valence electrons.",
        },
      ],
      quickCheck: {
        prompt: "Why do elements in the same group behave similarly?",
        choices: [
          "They have the same atomic number",
          "They have the same number of valence electrons",
          "They have the same mass number",
          "They are all noble gases",
        ],
        answer: 1,
        explanation:
          "A group (column) shares a valence electron count, and valence electrons control chemical behavior. Atomic and mass numbers differ down a group.",
      },
    },
  ],
};
