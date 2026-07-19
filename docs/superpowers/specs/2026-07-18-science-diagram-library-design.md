# Science Diagram Library — Design

Status: proposed, pending review
Date: 2026-07-18
Scope: SCIENCE section only

## 1. What already exists

The audit changed this brief substantially. Three things it asked us to design are
already built and working.

**Hot-spot architecture.** `SeedQuestion` already carries
`hotspots: { x, y, w, h, label }[]` in percent of the image box, with the region's
array index as its answer index. `HotspotInput`
(`src/components/quiz/question-view.tsx:352`) renders percent-positioned
`<button role="radio">` overlays inside a `role="radiogroup"`, with per-region
`aria-label`, focus rings, and correct/incorrect states after grading. Keyboard
operation and the screen-reader-equivalent selection interface the brief requires
are already satisfied. `HOT_SPOT` is a real `QuestionType` wired through scoring
(`src/lib/quiz/score.ts`), validation (`src/lib/validators.ts`), review
(`review-list.tsx`), and tests.

**Database.** `model Question` already has `images Json?`, `hotspots Json?`, and
`attribution String?`. No migration is required to ship figures.

**Original artwork precedent.** `public/hotspots/` holds four hand-authored SVGs
(heart, cell, neuron, digestive) with a `CREDITS.md` declaring them original and
unrestricted, feeding 12 hot-spot questions.

The brief's proposed `DiagramHotspot` type is therefore not new work. It is a
rename of a shipped structure, and this design keeps the existing shape rather
than migrating question content for cosmetic reasons.

## 2. Science taxonomy audit

Taxonomy is composed in `src/content/taxonomy.ts` from two authored sources:
`src/lib/teas-blueprint.ts` (sections and topics) and `src/content/skills.ts`
(skill name lists). Skill ids are `` `${topicId}:${slugifySkill(name)}` `` — note
there is no section prefix.

SCIENCE is 24 skills across 4 topics, carrying 298 of the bank's 836 questions.

| Topic | Skills | Scored weight | Questions |
|---|---|---|---|
| `anatomy-physiology` | 11 | 18 | 167 |
| `biology` | 5 | 9 | 47 |
| `chemistry` | 4 | 8 | 43 |
| `scientific-reasoning` | 4 | 9 | 29 |

All 24 skills already have guided lessons; there are no lesson gaps.

**Findings that shape the diagram plan:**

1. **Coverage is inverted relative to exam weight.** Anatomy and physiology is
   comparatively over-supplied, while biology and scientific reasoning each carry
   a scored weight of 9 against only 6–8 questions per skill. Chemistry and
   scientific reasoning together are 17 of the 44 scored Science points and were
   absent from the brief's draft diagram list. The list in section 3 is
   rebalanced accordingly.
2. **12 Science questions have no `subtopic`** and so map to no skill. They appear
   in topic-level pools but are invisible to per-skill progress. Bank-wide the
   figure is 38, all from the hand-authored `BASE_QUESTIONS` block predating the
   taxonomy.
3. **Questions resolve skills by name, not id.** They store `subtopic` (free text)
   resolved through `resolveSkill()`'s normalise plus a `NAME_OVERRIDES` table.
   New diagram-backed questions should carry an explicit `skillId`.
4. **`identify-information-from-a-graphic`** teaches chart reading with zero
   accompanying visuals — a pure-gap, high-value target.

## 3. Prioritised diagram list (30)

Allocation follows scored weight, not existing question volume. P1 = launch
blocker, P2 = launch, P3 = post-launch.

### Anatomy & physiology (14)

| # | Diagram | Skill | Essential | Formats | Qs | Diff | Pri |
|---|---|---|---|---|---|---|---|
| 1 | Anatomical position & directional terms | general-orientation | Essential | MC, hotspot, DnD | 5 | 1 | P1 |
| 2 | Anatomical planes & body cavities | general-orientation | Essential | MC, hotspot, DnD | 5 | 1 | P1 |
| 3 | Heart chambers & valves | cardiovascular | Essential | MC, hotspot, DnD, S&F | 6 | 2 | P1 |
| 4 | Blood flow circuit (pulmonary + systemic) | cardiovascular | Essential | Ordered, MC, sequencing | 5 | 2 | P1 |
| 5 | Respiratory tract & alveolar gas exchange | respiratory | Essential | MC, hotspot, ordered | 5 | 2 | P1 |
| 6 | Digestive tract & accessory organs | gastrointestinal | Essential | MC, hotspot, ordered | 5 | 2 | P1 |
| 7 | Neuron & synaptic transmission | neuromuscular | Essential | MC, hotspot, ordered | 4 | 2 | P1 |
| 8 | Major brain regions | neuromuscular | Essential | MC, hotspot, S&F | 4 | 2 | P2 |
| 9 | Endocrine glands & their hormones | endocrine | Essential | MC, hotspot, DnD | 5 | 2 | P1 |
| 10 | Nephron & urine formation | genitourinary | Essential | MC, hotspot, ordered | 4 | 3 | P1 |
| 11 | Skin layers | integumentary | Essential | MC, hotspot, DnD | 4 | 1 | P2 |
| 12 | Long bone & axial/appendicular skeleton | skeletal | Essential | MC, hotspot, DnD | 4 | 2 | P2 |
| 13 | Innate vs adaptive immunity | immune | Essential | MC, multi-select, S&F | 4 | 3 | P1 |
| 14 | Male & female reproductive anatomy | reproductive | Essential | MC, hotspot, DnD | 4 | 2 | P2 |

### Biology (8)

| # | Diagram | Skill | Essential | Formats | Qs | Diff | Pri |
|---|---|---|---|---|---|---|---|
| 15 | Animal cell & organelles | cell-structure | Essential | MC, hotspot, DnD, S&F | 6 | 1 | P1 |
| 16 | Membrane transport (diffusion/osmosis/active) | cell-structure | Essential | MC, interpretation | 5 | 2 | P1 |
| 17 | Mitosis & meiosis compared | cell-structure | Essential | Ordered, MC, sequencing | 5 | 3 | P2 |
| 18 | DNA structure & base pairing | genetic-material | Essential | MC, hotspot, DnD | 5 | 2 | P1 |
| 19 | Transcription & translation | genetic-material | Essential | Ordered, MC, sequencing | 5 | 3 | P1 |
| 20 | Punnett squares & inheritance patterns | mendel | Essential | MC, interpretation, DnD | 6 | 2 | P1 |
| 21 | Four macromolecule classes | macromolecules | Essential | MC, DnD, S&F | 5 | 2 | P2 |
| 22 | Bacterial cell vs virus structure | microorganisms | Essential | MC, hotspot, multi-select | 5 | 2 | P1 |

### Chemistry (4)

| # | Diagram | Skill | Essential | Formats | Qs | Diff | Pri |
|---|---|---|---|---|---|---|---|
| 23 | Atomic structure & subatomic particles | atomic-structure | Essential | MC, hotspot, interpretation | 5 | 1 | P1 |
| 24 | States of matter & phase changes | physical-properties | Essential | MC, ordered, interpretation | 5 | 2 | P1 |
| 25 | Chemical reaction types & balancing | chemical-reactions | Essential | MC, interpretation | 5 | 2 | P1 |
| 26 | Solutions, concentration & the pH scale | solutions | Essential | MC, interpretation, ordered | 5 | 2 | P1 |

### Scientific reasoning (4)

| # | Diagram | Skill | Essential | Formats | Qs | Diff | Pri |
|---|---|---|---|---|---|---|---|
| 27 | Experimental design (IV, DV, control) | scientific-method | Essential | MC, interpretation, DnD | 6 | 2 | P1 |
| 28 | Measurement tools & metric units | measurements | Essential | MC, hotspot, interpretation | 5 | 1 | P2 |
| 29 | Graph interpretation (line/bar/scatter) | logic-evidence | Essential | Data interpretation, MC | 6 | 2 | P1 |
| 30 | Correlation vs causation | predict-relationships | Essential | Data interpretation, MC | 5 | 3 | P2 |

Total capacity: roughly 148 questions, about 50% growth on the current Science
bank of 298, concentrated where the bank is thinnest.

## 4. Sourcing and licence risk

**Decision: source and adapt** from approved free sources, with Servier Medical
Art primary.

| Source | Licence | Commercial | Adapt | Risk | Verdict |
|---|---|---|---|---|---|
| Servier Medical Art | CC BY 4.0 | Yes | Yes | Low | Primary |
| Wikimedia Commons | Varies per file | Per file | Per file | Medium | Per-asset review |
| CDC PHIL | Mostly public domain | Per item | Per item | Medium | Micrographs only |
| Open Anatomy | Varies per atlas | Per atlas | Per atlas | High | Avoid at launch |

**Servier, verified 2026-07-18 against the live terms** (not the site-wide claim):
CC BY 4.0; commercial use permitted; adaptation permitted; explicitly permits
"inclusion in paid courses and subscription platforms." Prohibitions are logo
creation and reselling derivatives as a standalone image library — neither
applies. Two operational constraints matter:

- **No SVG.** Downloads are PPTX or PNG only.
- **No bots or scrapers.** Acquisition must be manual. There is no automated
  ingest step in the workflow, by licence, not by preference.

Attribution when modified: *"Image adapted from Servier Medical Art
(https://smart.servier.com/), licensed under CC BY 4.0."*

**Risk note.** The product is currently free (`BILLING_ENABLED` unset) but ships a
paid Pro tier, so every asset must clear commercial use regardless. NC, ND,
educational-use-only, and unspecified licences are rejected outright. CC BY-SA is
rejected at launch rather than reviewed: share-alike could force the surrounding
adaptation layer open, and no diagram is worth that ambiguity.

## 5. Adaptation approach

**Decision: PNG base plus an SVG overlay layer — but see the finding below.**

**Finding (2026-07-18), after inspecting the downloaded kits.** Servier offers no
SVG *download*, but the PPTX files contain native DrawingML vector shapes, not
embedded raster. Across the 49 kits there are 990 slides, 828 of them pure vector
(83%); a single animal-cell slide carries 1,362 shapes. The source is therefore
vector after all, and renderable to SVG through LibreOffice → PDF → `pdftocairo`.

This reopens the PNG-versus-SVG trade the original decision closed. Rendering to
SVG would make adapted art crisp at any size, recolourable, and genuinely
theme-aware. That last point is now demonstrated rather than assumed: the
original `anatomical-planes.svg` carries its own `prefers-color-scheme` block and
was verified rendering correctly in both schemes, which a PNG base cannot do.

The PNG path still works and needs no new dependency. The recommendation is to
render SVG for diagrams whose structures are simple enough to survive conversion
cleanly, and fall back to PNG where converted output is messy. That is a
per-diagram call to make once LibreOffice is installed and the first conversions
can actually be inspected.

The Servier PNG is used as the base artwork, unmodified. Labels, leader lines,
numbers, and hot-spot regions render as a separate token-driven layer on top.

Consequences, accepted deliberately:

- The overlay is fully themeable, accessible, and crisp; the base art is raster
  and sits on a fixed light-paper ground, so it will not follow dark mode. This
  is the same trade `FigureView` already makes.
- Because labels live in the overlay rather than baked into the image, one base
  image serves the labelled, unlabelled, numbered, and highlighted variants. No
  duplicate assets, and variants cost nothing at rest.
- Alt text and dimensions live with the asset, not the image file.

Rejected: PPTX→SVG via LibreOffice (heavy dependency, messy output requiring real
per-asset cleanup) and hand-rebuilding as SVG (best result, highest cost, and
effectively the original-art path).

**Visual system.** Overlay type is Inter for labels and JetBrains Mono for numbers
and region markers. Leader lines are 1.5px at `--muted-foreground`; label chips
sit on a translucent card ground for contrast over busy art. Structure colour
comes from the base image and is never recoloured, so no adaptation can introduce
a scientific inaccuracy. `--section-science` is reserved for the active or
highlighted structure only.

### 5b. The adaptation pipeline (built 2026-07-18)

Three scripts, each verified end to end:

- `scripts/index-servier-kits.py` — reads slide text and shape counts straight
  out of the PPTX zip with the standard library. Catalogued 990 slides across 49
  kits; this is how a diagram's source slide is located.
- `scripts/render-servier.sh` — LibreOffice to PDF, then `pdftocairo` to one SVG
  and one 200-dpi PNG per slide. Going via PDF is required: direct SVG export
  flattens a deck to its first slide.
- `scripts/adapt-servier-svg.mjs` — strips slide chrome and crops. Geometry is
  measured with `getBBox()` in a real browser, because transforms and nested
  groups make static analysis of DrawingML-derived SVG unreliable.

**The logo removal is a licence requirement, not styling.** Servier licenses the
images under CC BY 4.0 but expressly reserves its trademarks, so the wordmark is
the one element on every slide we have no licence to redistribute. The cleaner
removes it, the title, the footer licence line, and the decorative wedges.

Two behaviours worth knowing before using it:

- `--region` fractions apply to the *cleaned* artwork, not the raw slide, so the
  frame moves whenever cleaning changes. The script prints the cleaned bounds and
  a column-occupancy histogram; pick multi-panel splits off the measured gutter.
- `--strip-leaders` removes label callout lines. Geometry alone misses diagonal
  ones, so it also matches long neutral-grey strokes — Servier's own linework is
  dark navy and its fills are saturated, so artwork is spared. Once leaders are
  gone the artwork bounds usually *are* the diagram, and no `--region` is needed.

Because labels come off cleanly, one source slide yields both the labelled and
unlabelled variants; labels are re-added from `structures` in our own type.

**Size.** Converted SVG is heavy — the cell came out at 1.55MB. `svgo --multipass`
cuts roughly 65% (cell 552KB, heart 137KB) with no visible change, verified by
rendering before and after. 552KB is still large for a phone; assets above about
300KB should ship as PNG instead, decided per diagram.

## 6. Storage and delivery

Asset binaries live in Cloudflare R2 (bucket `teas-7`), not in `public/`.
Verified working: auth, bucket, and object read/write/delete.

Env: `R2_ACCOUNT_ID`, `R2_ENDPOINT`, `R2_BUCKET`, `R2_ACCESS_KEY_ID`,
`R2_SECRET_ACCESS_KEY`, `NEXT_PUBLIC_R2_PUBLIC_BASE_URL`. The S3 client requires
`region: "auto"`. Only the upload script needs credentials; the app reads over
plain HTTPS.

Outstanding: public access must be enabled on the bucket to obtain the
`pub-<hash>.r2.dev` base URL, and `next.config.ts` needs an `images.remotePatterns`
entry or the `next/image` figure path throws on remote URLs.

## 7. Asset manifest

**Decision: TypeScript registry** at `src/content/assets.ts`, matching how
`taxonomy.ts`, `skills.ts`, and the lessons already work. The review trail is git
history; the gate is a validation script. No Prisma model — the binaries are
external, so a table would add a second content convention and buy little.

```ts
export interface LearningAsset {
  id: string;                    // "sci-heart-chambers"
  title: string;
  description: string;
  section: "SCIENCE";
  topic: string;
  skillIds: string[];

  sourceProvider: "SERVIER" | "WIKIMEDIA" | "CDC_PHIL" | "OPEN_ANATOMY" | "CUSTOM";
  creator: string;
  originalSourceUrl: string;
  downloadUrl: string;
  licenseName: string;
  licenseUrl: string;
  commercialUseAllowed: boolean;
  adaptationAllowed: boolean;
  shareAlikeRequired: boolean;
  attributionRequired: boolean;
  attributionText: string;
  reviewedBy?: string;
  reviewedAt?: string;

  objectKey: string;             // R2 key, not a public/ path
  width: number;
  height: number;
  format: "PNG" | "JPG" | "WEBP" | "SVG";
  altText: string;
  status: "PROPOSED" | "LICENSE_REVIEW" | "APPROVED" | "ADAPTED"
        | "CONTENT_REVIEWED" | "PUBLISHED";

  structures: AssetStructure[];  // drives labels, hotspots, and DnD together
}

export interface AssetStructure {
  id: string;
  name: string;
  accessibleLabel: string;
  note?: string;
  x: number; y: number; w: number; h: number;   // percent, 0-100
  labelX?: number; labelY?: number;             // percent; defaults to region
}
```

`structures` is the key simplification: one declaration feeds the labelled
lesson view, the unlabelled practice view, numbered identification, hot-spot
regions, and drag-and-drop targets. Region geometry is authored once.

Because `width`/`height` live here, `src/content/figure-dimensions.ts` — today a
hand-maintained map that silently falls back to 800×500 and shifts layout —
becomes derivable and should be collapsed into the registry.

## 8. Attribution system

A central `/credits` page under `(marketing)`, beside `privacy` and `terms`,
listing every asset with title, creator, provider, source link, licence name and
link, and whether it was modified.

Placement, per the brief's question: attribution appears **inside an information
affordance on the image** (a small "i" disclosing source and licence, so it is
present but not competing with the diagram during a timed question), **and** in
full on `/credits`, **and** in any printable or exported material. It is never
hidden behind a hover-only interaction, and never omitted where required.

`Question.attribution` already exists and is already surfaced in
`review-list.tsx:209`; asset attribution composes into the same slot.

## 9. Component architecture

```
DiagramFigure          base image + overlay, aspect-ratio locked, zoomable
├─ DiagramImage        <img>, intrinsic dims from the registry, light ground
├─ DiagramOverlay      absolutely positioned percent layer
│  ├─ StructureLabel   label chip + leader line   (labelled variant)
│  ├─ StructureMarker  numbered marker            (numbered variant)
│  └─ StructureRegion  interactive region         (hotspot/DnD variants)
└─ DiagramAttribution  "i" disclosure
```

One component, a `variant` prop (`labelled | unlabelled | numbered | highlighted |
interactive`), one registry entry. The existing `HotspotInput` becomes a thin
wrapper over `DiagramFigure variant="interactive"` rather than a parallel
implementation, so hot-spot behaviour has exactly one home.

## 10. Accessibility requirements

Already satisfied by the existing hot-spot implementation: percent coordinates
that stay aligned at every size, `role="radiogroup"` with per-region `role="radio"`
and `aria-checked`, real focusable buttons, visible focus rings, and colour never
carrying meaning alone.

To add:

- **Per-image alt text.** Question figures currently render a hardcoded
  `alt="Question figure"` and there is no per-image alt mechanism at all. Alt
  comes from the registry. This is the single largest accessibility gap.
- **Minimum 44×44px effective tap target** for every region, enforced by the
  validator, so small structures never require pixel-perfect tapping.
- **Pinch-zoom and a zoom control** on mobile; never `user-scalable=no`.
- **Text alternative for every question**, so a hot-spot item is answerable
  without seeing the image — the radio list carries real structure names.
- Contrast ≥4.5:1 for overlay text against the light ground.

## 11. Production workflow

1. Identify need from the section 3 list.
2. Manually download from Servier (no scraping, per licence).
3. Create the registry entry at `status: "LICENSE_REVIEW"` with full provenance,
   before any file is committed or uploaded.
4. Licence review → `APPROVED`.
5. Author `structures` geometry; adapt overlay → `ADAPTED`.
6. Upload base image to R2 via `scripts/upload-assets.mts`.
7. Write questions referencing `assetId`.
8. Scientific + question review → `CONTENT_REVIEWED`.
9. Accessibility and mobile check → `PUBLISHED`.

`scripts/validate-assets.mts` gates the whole thing, in the established style of
`validate-guided-lessons.mts`: every asset has alt text and attribution; licence
is on the allowlist; `shareAlikeRequired` is false; regions fall within 0–100 and
meet the tap-target minimum; every `assetId` referenced by a question resolves;
hot-spot region count matches option count; dimensions are present.

## 12. Scientific review workflow

Reuse the existing adversarial pattern rather than inventing one. `verify-all.mts`
already runs blind third-pass verification over the served bank, writing
key-stripped questions for independent answering and diffing verdicts against the
answer key for human adjudication. Diagram questions enter the same pipeline, with
one addition: a labelled-structure check confirming each region's geometry
actually encloses the structure it claims, since a question can be textually
perfect and geometrically wrong.

No generated question publishes without human academic review.

## 13. Files and models that change

**New:** `src/content/assets.ts`, `src/components/learn/diagram/*`,
`scripts/validate-assets.mts`, `scripts/upload-assets.mts`,
`src/app/(marketing)/credits/page.tsx`.

**Modified:** `src/content/seed-types.ts` (add `assetId`, per-image alt,
`skillId`), `src/components/quiz/question-view.tsx` (alt text; `HotspotInput`
delegates to `DiagramFigure`), `src/content/figure-dimensions.ts` (collapse into
registry), `next.config.ts` (`images.remotePatterns`), `.env.example` (done).

**Unchanged:** `prisma/schema.prisma`. `images`, `hotspots`, and `attribution`
already exist as `Json?`/`String?`. No migration.

## 14. Phased plan

- **Phase 0 (now).** Registry types, validator, upload script, alt-text fix,
  `next.config` patterns, credits page. No assets required.
- **Phase 1.** Three proof-of-concept diagrams: heart and blood flow, animal cell
  and organelles, anatomical planes and directional terms. Full licence records,
  adaptation, one MC and one hot-spot question each, explanation state,
  accessible alternative, desktop and mobile. **Stop for review.**
- **Phase 2.** Remaining P1 diagrams (16), weighted to chemistry and scientific
  reasoning.
- **Phase 3.** P2 diagrams (11), drag-and-drop labelling as a new question type.
- **Phase 4.** Spaced-review and mock-exam integration; retire the four legacy
  `public/hotspots/` SVGs into the registry or replace them.

## 15. Open items

- Public access on `teas-7` to obtain `NEXT_PUBLIC_R2_PUBLIC_BASE_URL`.
- `sudo apt-get install -y libreoffice-impress` — the only remaining blocker on
  rendering. `scripts/render-servier.sh` is written and waiting on it; poppler is
  already present.
- Confirm the SVG-versus-PNG call in section 5 once the first renders can be seen.
- Coverage gap: Servier has no anatomical-planes, body-cavities, or
  Punnett-square material. Those are original artwork, as
  `anatomical-planes.svg` already is. Scientific-reasoning diagrams (graph
  interpretation, correlation versus causation) are also likely original, though
  `SMART-Scientific-graphs` may cover part of it.
- R2 token is currently account-wide with bucket create/delete rights; narrow to
  object read/write on `teas-7`.
- Drag-and-drop labelling is not an existing `QuestionType`; it needs an enum
  value, scoring, and validation before Phase 3.
