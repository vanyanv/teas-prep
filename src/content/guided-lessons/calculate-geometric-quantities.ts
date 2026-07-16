import type { GuidedLesson } from "../guided-lesson-types";

/** Guided lesson for MATH / measurement-data / "Calculate Geometric
 *  Quantities". Content carried over from the flat skill-lesson blocks,
 *  restructured into the concept / rule / example / mistake / quick check
 *  pattern. */
export const CALCULATE_GEOMETRIC_QUANTITIES: GuidedLesson = {
  section: "MATH",
  topic: "measurement-data",
  skill: "Calculate Geometric Quantities",
  slug: "calculate-geometric-quantities",
  title: "Calculating Geometric Quantities",
  summary:
    "Apply formulas for perimeter, area, circumference, surface area, volume, composite shapes, and scaling.",
  minutes: [12, 15],
  objectives: [
    "Compute perimeter and area of rectangles, squares, and triangles",
    "Find the circumference and area of a circle",
    "Break composite shapes into basic pieces to find area and perimeter",
    "Calculate surface area and volume of boxes and cylinders",
    "Apply scale factors to lengths, areas, and volumes",
  ],
  sections: [
    {
      id: "perimeter-area-basics",
      title: "Perimeter and area of basic shapes",
      blocks: [
        {
          kind: "concept",
          body: "Perimeter is the distance around a shape: add all the sides. Area is the surface inside it, measured in square units. Every basic shape has a short formula for each.",
        },
        {
          kind: "rule",
          title: "Formulas",
          items: [
            "Rectangle: P = 2(L + W); A = L × W",
            "Square with side s: P = 4s; A = s^2",
            "Triangle: P = add all three sides; A = (1/2)bh, where b is the base and h is the height straight up from that base",
          ],
        },
        {
          kind: "example",
          title: "A rectangle 8 cm by 3 cm",
          steps: [
            {
              note: "Perimeter adds the way around: two lengths plus two widths.",
              work: ["P = 2(8 + 3) = 2 × 11 = 22 cm"],
            },
            {
              note: "Area multiplies length by width.",
              work: ["A = 8 × 3 = 24 cm^2"],
            },
          ],
          answer: "P = 22 cm and A = 24 cm^2",
        },
        {
          kind: "example",
          title: "A triangle with base 10 and height 6",
          steps: [
            {
              note: "Use A = (1/2)bh with the height measured straight up from the base.",
              work: ["A = (1/2)(10)(6) = 30"],
            },
          ],
          answer: "30 square units",
        },
        {
          kind: "mistake",
          body: "In a triangle, the height is the distance straight up from the base, not the length of a slanted side. Using a slanted side as h inflates the area.",
        },
      ],
      quickCheck: {
        prompt: "A rectangle is 7 m long and 4 m wide. What is its perimeter?",
        choices: ["28 m", "22 m", "11 m", "14 m"],
        answer: 1,
        explanation:
          "P = 2(7 + 4) = 22 m. Multiplying 7 × 4 = 28 gives the area, not the perimeter.",
      },
    },
    {
      id: "circles",
      title: "Circles",
      blocks: [
        {
          kind: "concept",
          body: "For a circle, r is the radius (center to edge) and the diameter d = 2r spans the whole circle. Use π ≈ 3.14 in calculations.",
        },
        {
          kind: "rule",
          title: "Circle formulas",
          items: [
            "Circumference (distance around): C = 2πr, or equally C = πd",
            "Area: A = πr^2",
          ],
        },
        {
          kind: "example",
          title: "A circle with radius 5 cm",
          steps: [
            {
              note: "Circumference uses C = 2πr.",
              work: ["C = 2 × 3.14 × 5 = 31.4 cm"],
            },
            {
              note: "Area uses A = πr^2: square the radius first, then multiply by π.",
              work: ["A = 3.14 × 5^2 = 3.14 × 25 = 78.5 cm^2"],
            },
          ],
          answer: "C = 31.4 cm and A = 78.5 cm^2",
        },
        {
          kind: "tip",
          body: "If you are given the diameter, halve it to get the radius before using A = πr^2.",
        },
      ],
      quickCheck: {
        prompt: "A circle has a diameter of 10 cm. What is its area, using π ≈ 3.14?",
        choices: ["314 cm^2", "78.5 cm^2", "31.4 cm^2", "15.7 cm^2"],
        answer: 1,
        explanation:
          "Halve the diameter first: r = 5, so A = 3.14 × 5^2 = 78.5 cm^2. Using 10 as the radius gives 314, the classic trap.",
      },
    },
    {
      id: "composite-shapes",
      title: "Composite shapes",
      blocks: [
        {
          kind: "concept",
          body: "A composite shape is made of basic shapes joined together. There is no single formula for it, so you take it apart.",
        },
        {
          kind: "rule",
          title: "Area of a composite shape",
          ordered: true,
          items: [
            "Break the figure into rectangles, triangles, and circle pieces",
            "Find the area of each piece",
            "Add the pieces together, or subtract any cut-out",
          ],
        },
        {
          kind: "example",
          title: "An L-shape: a 6 by 4 rectangle with a 2 by 2 square removed from one corner",
          steps: [
            {
              note: "Find the area of the full rectangle as if nothing were removed.",
              work: ["6 × 4 = 24"],
            },
            {
              note: "Find the area of the removed square.",
              work: ["2 × 2 = 4"],
            },
            {
              note: "Subtract the cut-out from the full rectangle.",
              work: ["24 − 4 = 20"],
            },
          ],
          answer: "20 square units",
        },
        {
          kind: "tip",
          body: "For the perimeter of an irregular shape, walk around the outline and add every outer edge. Missing side lengths can often be found because opposite straight runs must match.",
        },
      ],
      quickCheck: {
        prompt:
          "A figure is a 5 by 3 rectangle with a 1 by 1 square cut out of one corner. What is its area?",
        choices: ["16 square units", "15 square units", "14 square units", "13 square units"],
        answer: 2,
        explanation:
          "Full rectangle 5 × 3 = 15, minus the 1 × 1 cut-out: 15 − 1 = 14. Leaving out the subtraction gives 15.",
      },
    },
    {
      id: "surface-area",
      title: "Surface area",
      blocks: [
        {
          kind: "concept",
          body: "Surface area is the total area of all the outer faces of a solid, measured in square units. Think of it as the amount of wrapping paper the solid would need.",
        },
        {
          kind: "rule",
          title: "Surface area formulas",
          items: [
            "Rectangular prism / box (length L, width W, height H): SA = 2(LW + LH + WH)",
            "Cylinder (radius r, height h): SA = 2πr^2 + 2πrh, the two circle ends plus the wrapped side",
          ],
        },
        {
          kind: "example",
          title: "A box with L = 4, W = 3, H = 2",
          steps: [
            {
              note: "Find the three distinct face areas.",
              work: ["LW = 4 × 3 = 12", "LH = 4 × 2 = 8", "WH = 3 × 2 = 6"],
            },
            {
              note: "Add them and double, because each face has a matching opposite face.",
              work: ["SA = 2(12 + 8 + 6) = 2 × 26 = 52"],
            },
          ],
          answer: "52 square units",
        },
        {
          kind: "example",
          title: "A cylinder with r = 3, h = 10",
          steps: [
            {
              note: "The two circle ends contribute 2πr^2.",
              work: ["2 × 3.14 × 3^2 = 2 × 3.14 × 9 = 56.52"],
            },
            {
              note: "The wrapped side contributes 2πrh.",
              work: ["2 × 3.14 × 3 × 10 = 188.4"],
            },
            {
              note: "Add the pieces.",
              work: ["SA = 56.52 + 188.4 = 244.92"],
            },
          ],
          answer: "244.92 square units",
        },
        {
          kind: "mistake",
          body: "A box has six faces in three matching pairs. Computing LW + LH + WH and forgetting the factor of 2 counts only half the faces and gives half the surface area.",
        },
      ],
      quickCheck: {
        prompt: "A box has L = 5, W = 2, H = 1. What is its surface area?",
        choices: ["17 square units", "34 square units", "10 square units", "16 square units"],
        answer: 1,
        explanation:
          "SA = 2(LW + LH + WH) = 2(10 + 5 + 2) = 34. Forgetting to double gives 17; 10 is the volume, not the surface area.",
      },
    },
    {
      id: "volume",
      title: "Volume",
      blocks: [
        {
          kind: "concept",
          body: "Volume is the space inside a solid, measured in cubic units. Where surface area covers the outside, volume fills the inside.",
        },
        {
          kind: "rule",
          title: "Volume formulas",
          items: [
            "Box / rectangular prism: V = L × W × H",
            "Cylinder: V = πr^2 × h",
          ],
        },
        {
          kind: "example",
          title: "A box with L = 4, W = 3, H = 2",
          steps: [
            {
              note: "Multiply the three dimensions.",
              work: ["V = 4 × 3 × 2 = 24"],
            },
          ],
          answer: "24 cubic units",
        },
        {
          kind: "example",
          title: "A cylinder with r = 3, h = 10",
          steps: [
            {
              note: "Square the radius, then multiply by π and the height.",
              work: ["V = 3.14 × 3^2 × 10 = 3.14 × 9 × 10 = 282.6"],
            },
          ],
          answer: "282.6 cubic units",
        },
        {
          kind: "tip",
          body: "Area uses square units (cm^2), volume uses cubic units (cm^3). Match every dimension to the same unit before multiplying.",
        },
      ],
      quickCheck: {
        prompt: "A cylinder has radius 2 and height 5. What is its volume, using π ≈ 3.14?",
        choices: ["62.8 cubic units", "31.4 cubic units", "251.2 cubic units", "20 cubic units"],
        answer: 0,
        explanation:
          "V = πr^2 × h = 3.14 × 4 × 5 = 62.8. Forgetting to square the radius gives 31.4; squaring the diameter instead gives 251.2.",
      },
    },
    {
      id: "scaling-similar-figures",
      title: "Scaling and similar figures",
      blocks: [
        {
          kind: "concept",
          body: "A scale factor multiplies every length in a figure. Similar figures have the same shape with matching sides in equal ratio, so one is a scaled copy of the other.",
        },
        {
          kind: "rule",
          title: "Scaling rules",
          items: [
            "New length = old length × scale factor",
            "If lengths scale by k, area scales by k^2 and volume scales by k^3",
            "Map scale: set up a proportion, map distance / real distance = scale",
          ],
        },
        {
          kind: "example",
          title: "Scale a 4 cm by 6 cm rectangle by factor 3",
          steps: [
            {
              note: "Multiply each side by the scale factor.",
              work: ["4 × 3 = 12 cm", "6 × 3 = 18 cm"],
            },
            {
              note: "Area grows by the scale factor squared, not the factor itself.",
              work: ["3^2 = 9, so the new area is 9 times the old area"],
            },
          ],
          answer: "A 12 cm by 18 cm rectangle with 9 times the area",
        },
        {
          kind: "example",
          title: "Map distances",
          steps: [
            {
              note: "The scale is 1 in = 50 mi, so multiply the map length by 50.",
              work: ["3.5 × 50 = 175 mi"],
            },
            {
              note: "With a proportion: if 2 cm represents 10 km, each cm is 10/2 = 5 km, so 7 cm covers 7 × 5.",
              work: ["7 × (10/2) = 35 km"],
            },
          ],
          answer: "175 mi for the road; 35 km for the 7 cm distance",
        },
        {
          kind: "mistake",
          body: "Do not scale area by the same factor as the lengths. Doubling every side makes the area 4 times as large (2^2), and the volume 8 times as large (2^3).",
        },
      ],
      quickCheck: {
        prompt:
          "Every side of a figure is multiplied by a scale factor of 2. What happens to its area?",
        choices: [
          "It doubles",
          "It becomes 4 times as large",
          "It becomes 8 times as large",
          "It stays the same",
        ],
        answer: 1,
        explanation:
          "Area scales by the square of the length factor: 2^2 = 4. The factor 8 (2^3) applies to volume, not area.",
      },
    },
  ],
};
