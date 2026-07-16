import type { GuidedLesson } from "../guided-lesson-types";

/**
 * Guided lesson for SCIENCE / anatomy-physiology / "Neuromuscular System".
 * Content carried over from the flat skill-lesson blocks, restructured into
 * the concept / rule / example / mistake / quick check pattern. Quick checks
 * are informal and never touch mastery.
 */
export const NEUROMUSCULAR_SYSTEM: GuidedLesson = {
  section: "SCIENCE",
  topic: "anatomy-physiology",
  skill: "Neuromuscular System",
  slug: "neuromuscular-system",
  title: "The Neuromuscular System",
  summary:
    "Distinguish the central and peripheral nervous systems, understand neuron structure, neurotransmitters, the reflex arc, myelin and saltatory conduction, and how muscles contract.",
  minutes: [11, 14],
  objectives: [
    "Distinguish the central and peripheral nervous systems and their divisions",
    "Identify the parts of a neuron and the three functional neuron types",
    "Match key neurotransmitters to their functions",
    "Trace a signal through the five components of the reflex arc",
    "Explain saltatory conduction and the sliding filament theory",
  ],
  sections: [
    {
      id: "cns-pns",
      title: "CNS versus PNS",
      blocks: [
        {
          kind: "concept",
          body: "The nervous system has two main divisions. The central nervous system (CNS) is the brain and spinal cord; it integrates information and directs responses. The peripheral nervous system (PNS) is all the nerves outside the CNS that connect it to the body.\n\nThe PNS splits by direction of travel. The sensory (afferent) division carries signals toward the CNS. The motor (efferent) division carries commands away from the CNS.",
        },
        {
          kind: "rule",
          title: "How the motor division branches",
          items: [
            "Somatic nervous system: voluntary control of skeletal muscle",
            "Autonomic nervous system: involuntary control",
            "Sympathetic branch of the autonomic system: fight-or-flight",
            "Parasympathetic branch of the autonomic system: rest-and-digest",
          ],
        },
        {
          kind: "tip",
          body: "Afferent signals arrive at the CNS; efferent signals exit it. The first letter of each word carries the direction.",
        },
        {
          kind: "example",
          title: "Place the pieces: your heart rate rises before an exam",
          steps: [
            {
              note: "The response is involuntary, so it is not somatic.",
              work: ["Autonomic, not somatic"],
            },
            {
              note: "Speeding the heart for a stressful moment is fight-or-flight.",
              work: ["Autonomic, sympathetic branch"],
            },
          ],
          answer: "PNS, motor division, autonomic system, sympathetic branch",
        },
        {
          kind: "mistake",
          body: "The spinal cord belongs to the CNS, not the PNS. Only the nerves outside the brain and spinal cord are peripheral.",
        },
      ],
      quickCheck: {
        prompt:
          "Which division controls voluntary movement of skeletal muscle?",
        choices: [
          "The sympathetic branch",
          "The parasympathetic branch",
          "The somatic nervous system",
          "The sensory (afferent) division",
        ],
        answer: 2,
        explanation:
          "The somatic nervous system is the voluntary motor branch of the PNS. The sympathetic and parasympathetic branches are both autonomic, meaning involuntary.",
      },
    },
    {
      id: "neuron-structure",
      title: "Neuron structure",
      blocks: [
        {
          kind: "concept",
          body: "A neuron is the basic functional cell of the nervous system. A signal moves through it in one direction: in through the dendrites, through the cell body, out along the axon, and off the axon terminals.",
        },
        {
          kind: "rule",
          title: "Parts of a neuron",
          ordered: true,
          items: [
            "Dendrites receive incoming signals and carry them toward the cell body",
            "The cell body (soma) contains the nucleus and organelles",
            "The axon is the long fiber that carries the electrical impulse (action potential) away from the cell body",
            "Axon terminals at the end release neurotransmitters to pass the signal on",
          ],
        },
        {
          kind: "rule",
          title: "Three functional types",
          items: [
            "Sensory neurons: afferent, carry signals toward the CNS",
            "Motor neurons: efferent, carry signals away from the CNS",
            "Interneurons: connect neurons within the CNS",
          ],
        },
        {
          kind: "example",
          title: "Which neuron type is which?",
          steps: [
            {
              note: "A neuron carrying pain information from your fingertip toward the spinal cord travels toward the CNS.",
              work: ["Toward the CNS = afferent"],
              becomes: "Sensory neuron",
            },
            {
              note: "A neuron carrying the command from the spinal cord out to a muscle travels away from the CNS.",
              work: ["Away from the CNS = efferent"],
              becomes: "Motor neuron",
            },
            {
              note: "A neuron sitting entirely inside the spinal cord, linking the other two, never leaves the CNS.",
              work: ["Within the CNS"],
              becomes: "Interneuron",
            },
          ],
          answer: "Sensory (in), interneuron (between), motor (out)",
        },
        {
          kind: "mistake",
          body: "Dendrites receive and the axon sends. Reversing them reverses the direction of the whole signal.",
        },
      ],
      quickCheck: {
        prompt:
          "Which part of a neuron carries the action potential away from the cell body?",
        choices: ["The dendrites", "The axon", "The soma", "The synapse"],
        answer: 1,
        explanation:
          "The axon is the long fiber that conducts the action potential away from the cell body toward the axon terminals. Dendrites carry signals in the opposite direction, toward the cell body.",
      },
    },
    {
      id: "neurotransmitters",
      title: "Neurotransmitters and the synapse",
      blocks: [
        {
          kind: "concept",
          body: "A synapse is the tiny gap between one neuron's axon terminal and the next cell. The electrical signal cannot cross the gap directly.\n\nInstead, the neuron releases chemical messengers called neurotransmitters into the synaptic cleft. They bind receptors on the next cell, and that binding either continues the signal or inhibits it.",
        },
        {
          kind: "rule",
          title: "Key neurotransmitters",
          items: [
            "Acetylcholine: triggers skeletal muscle contraction at the neuromuscular junction; also acts in the parasympathetic system",
            "Dopamine: movement, reward, and motivation",
            "Serotonin: mood and sleep",
            "Norepinephrine: drives the sympathetic fight-or-flight response",
            "GABA: the main inhibitory neurotransmitter",
          ],
        },
        {
          kind: "example",
          title: "Follow a signal across one synapse",
          steps: [
            {
              note: "The action potential reaches the end of the axon and stops there; it cannot jump the gap.",
              work: ["Axon terminal reached"],
            },
            {
              note: "The terminal releases neurotransmitter into the synaptic cleft.",
              work: ["Electrical signal becomes a chemical signal"],
            },
            {
              note: "The neurotransmitter binds receptors on the next cell, which continues or inhibits the signal.",
              work: ["Chemical signal becomes electrical again"],
            },
          ],
          answer:
            "The signal converts from electrical to chemical and back to cross the synapse.",
        },
        {
          kind: "mistake",
          body: "Not every neurotransmitter excites the next cell. GABA is inhibitory: it makes the next cell less likely to fire, which is just as much a signal as excitation.",
        },
      ],
      quickCheck: {
        prompt:
          "Which neurotransmitter acts at the neuromuscular junction to trigger skeletal muscle contraction?",
        choices: ["Dopamine", "Serotonin", "GABA", "Acetylcholine"],
        answer: 3,
        explanation:
          "Acetylcholine is released at the neuromuscular junction and triggers skeletal muscle contraction. Dopamine and serotonin act in the brain, and GABA is inhibitory.",
      },
    },
    {
      id: "reflex-arc",
      title: "The reflex arc",
      blocks: [
        {
          kind: "concept",
          body: "A reflex is a rapid, automatic, involuntary response to a stimulus. The reflex arc is the neural pathway that produces it.\n\nMany reflexes are processed at the spinal cord without waiting for the brain. That shortcut is what makes them fast, and fast is what makes them protective.",
        },
        {
          kind: "rule",
          title: "Components in order",
          ordered: true,
          items: [
            "A receptor detects the stimulus",
            "A sensory (afferent) neuron carries the signal to the spinal cord",
            "An integration center (often an interneuron in the cord) processes it",
            "A motor (efferent) neuron carries the command outward",
            "An effector (a muscle or gland) produces the response",
          ],
        },
        {
          kind: "example",
          title: "The knee-jerk (patellar) reflex",
          steps: [
            {
              note: "A tap on the tendon stretches the muscle, and a receptor detects it.",
              work: ["Stimulus detected by the receptor"],
            },
            {
              note: "A sensory neuron carries the signal to the spinal cord, where it is integrated.",
              work: ["Receptor to spinal cord"],
            },
            {
              note: "A motor neuron carries the command back out to the effector, and the leg kicks.",
              work: ["Spinal cord to muscle"],
              becomes: "The leg extends before the brain registers the tap",
            },
          ],
          answer: "Receptor, sensory neuron, integration center, motor neuron, effector",
        },
        {
          kind: "mistake",
          body: "The brain is not a required step in a reflex arc. You become aware of the tap, but the response is already underway because the spinal cord handled it.",
        },
      ],
      quickCheck: {
        prompt: "What is the final component of a reflex arc?",
        choices: [
          "The receptor",
          "The effector",
          "The sensory neuron",
          "The integration center",
        ],
        answer: 1,
        explanation:
          "The effector, a muscle or gland, produces the actual response. The receptor is the first component, not the last.",
      },
    },
    {
      id: "myelin",
      title: "Myelin and saltatory conduction",
      blocks: [
        {
          kind: "concept",
          body: "Myelin is a fatty insulating sheath wrapped around many axons. It acts as electrical insulation and greatly speeds up signal transmission.\n\nDifferent cells build it in each division: Schwann cells form myelin in the PNS, and oligodendrocytes form it in the CNS.",
        },
        {
          kind: "rule",
          title: "Why myelinated axons are faster",
          items: [
            "Gaps in the sheath are called the nodes of Ranvier",
            "The action potential jumps from node to node instead of traveling smoothly along the whole axon",
            "This leaping is called saltatory conduction",
            "It is much faster than conduction along an unmyelinated fiber",
          ],
        },
        {
          kind: "example",
          title: "What happens when myelin is damaged",
          steps: [
            {
              note: "In multiple sclerosis, the myelin sheath is damaged.",
              work: ["Insulation lost"],
            },
            {
              note: "Without intact myelin the impulse can no longer jump node to node.",
              work: ["Saltatory conduction disrupted"],
              becomes: "Signals are slowed or blocked",
            },
          ],
          answer: "Losing myelin slows or blocks signal transmission.",
        },
        {
          kind: "mistake",
          body: "Saltatory conduction does not mean the signal skips part of the message. The impulse jumps between nodes of Ranvier, which speeds it up without losing anything.",
        },
      ],
      quickCheck: {
        prompt:
          "Which cells form the myelin sheath in the peripheral nervous system?",
        choices: [
          "Oligodendrocytes",
          "Schwann cells",
          "Interneurons",
          "Sarcomeres",
        ],
        answer: 1,
        explanation:
          "Schwann cells myelinate axons in the PNS; oligodendrocytes do the same job in the CNS.",
      },
    },
    {
      id: "muscle-contraction",
      title: "Muscle contraction",
      blocks: [
        {
          kind: "concept",
          body: "Skeletal muscle is built from fibers containing myofibrils, which are divided into repeating units called sarcomeres. The sarcomere contains two protein filaments: thin actin filaments and thick myosin filaments.\n\nThe sliding filament theory explains contraction. The filaments themselves do not shorten; they slide past each other, so the sarcomere shortens and the whole muscle contracts.",
        },
        {
          kind: "rule",
          title: "Sliding filament theory, step by step",
          ordered: true,
          items: [
            "A motor neuron releases acetylcholine",
            "Calcium is released from the sarcoplasmic reticulum into the muscle cell",
            "Calcium binds troponin, which shifts tropomyosin off actin's binding sites",
            "Myosin heads form cross-bridges and pull the actin filaments toward the center of the sarcomere",
            "The sarcomere shortens and the muscle contracts; this requires ATP for energy",
            "When stimulation stops, calcium is pumped back into the sarcoplasmic reticulum and the muscle relaxes",
          ],
        },
        {
          kind: "rule",
          title: "The three muscle types",
          items: [
            "Skeletal: voluntary, striated",
            "Cardiac: involuntary, striated, only in the heart",
            "Smooth: involuntary, in organ walls",
          ],
        },
        {
          kind: "example",
          title: "Why relaxation is not just an absence of effort",
          steps: [
            {
              note: "Stimulation stops, so no more acetylcholine arrives.",
              work: ["Signal ends"],
            },
            {
              note: "Calcium is actively pumped back into the sarcoplasmic reticulum, the store it came from. It is not pumped out of the cell.",
              work: ["Calcium returned to storage"],
            },
            {
              note: "Without calcium, tropomyosin covers the binding sites again and cross-bridges stop forming. The filaments do not pull themselves back: the muscle is lengthened passively, by opposing muscles or elastic recoil.",
              work: ["Cross-bridges stop forming"],
              becomes: "The muscle relaxes",
            },
          ],
          answer: "Relaxation requires calcium to be pumped back, not just a stopped signal.",
        },
        {
          kind: "mistake",
          body: "Actin and myosin filaments do not get shorter during contraction. They slide across one another, which pulls the ends of the sarcomere closer together.",
        },
      ],
      quickCheck: {
        prompt:
          "According to the sliding filament theory, what happens during muscle contraction?",
        choices: [
          "The actin and myosin filaments both shorten",
          "Myosin heads pull actin filaments toward the center of the sarcomere",
          "The sarcomere lengthens as calcium enters the cell",
          "Acetylcholine binds directly to the actin filaments",
        ],
        answer: 1,
        explanation:
          "Myosin heads form cross-bridges and pull actin toward the sarcomere's center, so the filaments slide and the sarcomere shortens. The filaments themselves keep their length.",
      },
    },
  ],
};
