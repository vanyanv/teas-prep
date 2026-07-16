import type { GuidedLesson } from "../guided-lesson-types";

/**
 * Guided lesson for SCIENCE / biology / "Describe the Role of Microorganisms
 * in Disease". Content carried over from the flat skill-lesson blocks,
 * restructured into the concept / rule / example / mistake / quick check
 * pattern. Quick checks are informal and never touch mastery.
 */
export const MICROORGANISMS_IN_DISEASE: GuidedLesson = {
  section: "SCIENCE",
  topic: "biology",
  skill: "Describe the Role of Microorganisms in Disease",
  slug: "describe-the-role-of-microorganisms-in-disease",
  title: "Microorganisms and Disease",
  summary:
    "Pathogens such as bacteria, viruses, fungi, and parasites cause infectious diseases that can spread, in contrast to noninfectious diseases that do not spread between people.",
  minutes: [8, 10],
  objectives: [
    "Identify the four main groups of pathogens",
    "Match each pathogen group to the treatment that works against it",
    "Distinguish infectious from noninfectious disease",
    "Describe the main routes by which pathogens spread",
    "Connect each route of spread to a prevention measure",
  ],
  sections: [
    {
      id: "types-of-pathogens",
      title: "Types of pathogens",
      blocks: [
        {
          kind: "concept",
          body: "A pathogen is a microorganism that causes disease. There are four main groups, and the group matters because it decides what treatment works.\n\nKeep in mind that not every microorganism is a pathogen. Many bacteria are helpful, and only some cause illness.",
        },
        {
          kind: "tabs",
          tabs: [
            {
              label: "Bacteria",
              blocks: [
                {
                  kind: "concept",
                  body: "Single-celled prokaryotes. Some cause illness such as strep throat and tuberculosis, and these are treated with antibiotics. Many bacteria are harmless or helpful.",
                },
              ],
            },
            {
              label: "Viruses",
              blocks: [
                {
                  kind: "concept",
                  body: "Tiny non-living particles that must invade a host cell to reproduce. They cause the flu, the common cold, and COVID-19. Antibiotics do not work on viruses; some viral illnesses are prevented by vaccines.",
                },
              ],
            },
            {
              label: "Fungi",
              blocks: [
                {
                  kind: "concept",
                  body: "Include yeasts and molds. They cause infections such as athlete's foot and ringworm, and are treated with antifungal medicine.",
                },
              ],
            },
            {
              label: "Parasites",
              blocks: [
                {
                  kind: "concept",
                  body: "Organisms that live on or in a host and harm it. Examples include protozoa (malaria) and worms (tapeworms).",
                },
              ],
            },
          ],
        },
        {
          kind: "rule",
          title: "Group, example, treatment",
          items: [
            "Bacteria: strep throat, tuberculosis; antibiotics",
            "Viruses: flu, common cold, COVID-19; not antibiotics, some prevented by vaccines",
            "Fungi: athlete's foot, ringworm; antifungal medicine",
            "Parasites: malaria (protozoa), tapeworms (worms)",
          ],
        },
        {
          kind: "example",
          title: "A patient has the flu and asks for an antibiotic",
          steps: [
            {
              note: "Identify the pathogen group first. The flu is caused by a virus.",
              work: ["Flu = viral"],
            },
            {
              note: "Antibiotics act on bacteria, so they will not help here.",
              work: [],
            },
          ],
          answer: "Antibiotics will not treat the flu, because it is viral.",
        },
        {
          kind: "mistake",
          body: "Do not assume antibiotics treat any infection. They work on bacteria only, not on viruses, and not on fungal infections, which need antifungal medicine.",
        },
      ],
      quickCheck: {
        prompt: "Which pathogen group must invade a host cell to reproduce?",
        choices: ["Bacteria", "Viruses", "Fungi", "Parasites"],
        answer: 1,
        explanation:
          "Viruses are non-living particles with no way to reproduce on their own, so they must enter a host cell. Bacteria and fungi are living cells that reproduce independently.",
      },
    },
    {
      id: "infectious-vs-noninfectious",
      title: "Infectious vs noninfectious disease",
      blocks: [
        {
          kind: "concept",
          body: "Diseases are grouped by whether they can spread. The dividing question is simple: is a pathogen involved that can pass from one person or source to another?",
        },
        {
          kind: "rule",
          title: "The two categories",
          items: [
            "Infectious (communicable): caused by pathogens and can be passed from one person or source to another. Examples: flu, strep throat, COVID-19",
            "Noninfectious (noncommunicable): not caused by a spreading pathogen and cannot be passed between people. Causes include genetics, lifestyle, or environment. Examples: diabetes, heart disease, most cancers, asthma",
          ],
        },
        {
          kind: "example",
          title: "Sort two diseases",
          steps: [
            {
              note: "Strep throat is caused by bacteria, and those bacteria can move to another person.",
              work: ["Pathogen present, can spread"],
              becomes: "Infectious",
            },
            {
              note: "Asthma has no pathogen behind it; its causes are genetic and environmental.",
              work: ["No pathogen, cannot spread"],
              becomes: "Noninfectious",
            },
          ],
          answer: "Strep throat is infectious; asthma is noninfectious.",
        },
        {
          kind: "mistake",
          body: "Common does not mean contagious. Heart disease and diabetes affect large numbers of people, but they are noninfectious, because no pathogen passes between them.",
        },
      ],
      quickCheck: {
        prompt: "Which of the following is a noninfectious disease?",
        choices: ["Strep throat", "COVID-19", "Diabetes", "Influenza"],
        answer: 2,
        explanation:
          "Diabetes arises from genetics and lifestyle rather than a pathogen, so it cannot be passed to another person. The other three are caused by pathogens and can spread.",
      },
    },
    {
      id: "how-pathogens-spread",
      title: "How pathogens spread",
      blocks: [
        {
          kind: "concept",
          body: "Pathogens move from one host to another in several ways. Understanding the route guides prevention, because each route is broken by a different habit.",
        },
        {
          kind: "rule",
          title: "Routes of transmission",
          items: [
            "Direct contact: touching an infected person, or through body fluids",
            "Droplets and airborne: coughing and sneezing release particles others breathe in",
            "Contaminated food or water: ingesting pathogens (food poisoning)",
            "Contaminated surfaces (fomites): touching a doorknob then the face",
            "Vectors: animals or insects that carry pathogens, such as mosquitoes spreading malaria",
          ],
        },
        {
          kind: "tip",
          body: "Good handwashing, vaccines, safe food handling, and covering coughs all reduce the spread.",
        },
        {
          kind: "example",
          title: "Name the route",
          steps: [
            {
              note: "A mosquito bite passes malaria to a person. An insect is carrying the pathogen.",
              work: [],
              becomes: "Vector transmission",
            },
            {
              note: "Someone touches a doorknob a sick person used, then rubs an eye. The pathogen came from an object.",
              work: [],
              becomes: "Fomite transmission",
            },
          ],
          answer:
            "Malaria by mosquito is vector spread; doorknob to eye is fomite spread.",
        },
        {
          kind: "mistake",
          body: "A fomite is the contaminated object, not the person. Picking up a pathogen from a shared doorknob is surface spread, not direct contact, because you never touched the infected person.",
        },
      ],
      quickCheck: {
        prompt:
          "A mosquito bites an infected person and then bites someone else, passing on malaria. This is an example of which route?",
        choices: [
          "Direct contact",
          "Droplet or airborne spread",
          "Vector transmission",
          "Fomite transmission",
        ],
        answer: 2,
        explanation:
          "A vector is an animal or insect that carries a pathogen between hosts, which is exactly what the mosquito does here.",
      },
    },
  ],
};
