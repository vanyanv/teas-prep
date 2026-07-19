/**
 * Parse NurseHub's "Free TEAS 7 Practice Test" PDF into structured questions
 * tagged with the per-question skill from each section's score sheet, then load
 * them as the signed-in user's private question bank (source = nursehub).
 *
 * Usage:
 *   tsx scripts/import-nursehub-pdf.ts --dry [--section=MATH]   # parse + dump
 *   tsx scripts/import-nursehub-pdf.ts --email you@example.com  # insert to DB
 *
 * Requires poppler (pdftotext) on PATH.
 */
import "dotenv/config";
import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";

const PDF =
  process.env.NURSEHUB_PDF ??
  "/mnt/c/Users/Vardan/Downloads/v5_Final_Compiled_PDF_1_.pdf";

const PAGE_W = 595; // A4 width in pts

type SectionKey = "READING" | "MATH" | "SCIENCE" | "ENGLISH";

interface SectionConfig {
  key: SectionKey;
  qPages: [number, number];
  answerPage: number;
  scorePages: [number, number];
  /** how the skill maps to a blueprint topic key */
  topicFor: (skill: string) => string;
}

const SECTIONS: SectionConfig[] = [
  {
    key: "READING",
    qPages: [14, 24],
    answerPage: 25,
    scorePages: [26, 27],
    topicFor: () => "key-ideas-details",
  },
  {
    key: "MATH",
    qPages: [50, 53],
    answerPage: 54,
    scorePages: [55, 56],
    topicFor: (s) =>
      /convert|temperature|celsius|fahrenheit|area|perimeter|volume|surface|circle|statistic|data|rounding|metric|distance|weight|liquid|mass/i.test(
        s,
      )
        ? "measurement-data"
        : "numbers-algebra",
  },
  {
    key: "SCIENCE",
    qPages: [74, 79],
    answerPage: 80,
    scorePages: [81, 83],
    topicFor: (s) => {
      if (/chem|atom|bond|reaction|periodic|ph\b|acid|base|mole/i.test(s)) return "chemistry";
      if (/cell|biolog|gene|dna|rna|organ\b|photosynth|mitosis|protein|enzyme/i.test(s)) return "biology";
      if (/scientific|reasoning|experiment|variable|hypothesis|data|graph|measure/i.test(s)) return "scientific-reasoning";
      return "anatomy-physiology";
    },
  },
  {
    key: "ENGLISH",
    qPages: [101, 106],
    answerPage: 107,
    scorePages: [108, 109],
    topicFor: (s) => {
      if (/vocab|prefix|suffix|root|word meaning|context clue|affix/i.test(s)) return "vocabulary";
      if (/punctuation|capital|spelling|sentence structure|grammar|subject.?verb|comma|apostrophe/i.test(s)) return "conventions";
      return "knowledge-language";
    },
  },
];

// Figures are deliberately empty. Diagrams rendered out of the source PDF are
// that publisher's artwork, and the licence review covers only our own and
// CC BY material — so they were removed rather than shipped. Diagram questions
// are built from src/content/assets.ts instead.
const FIGURES: Partial<Record<SectionKey, Record<number, string[]>>> = {};

function pdftext(page: number, opts: { crop?: "left" | "right"; layout?: boolean } = {}): string {
  const args = ["-f", String(page), "-l", String(page)];
  if (opts.layout) args.push("-layout");
  if (opts.crop === "left") args.push("-x", "0", "-y", "0", "-W", String(Math.floor(PAGE_W / 2)), "-H", "842");
  if (opts.crop === "right") args.push("-x", String(Math.floor(PAGE_W / 2)), "-y", "0", "-W", String(Math.ceil(PAGE_W / 2)), "-H", "842");
  args.push(PDF, "-");
  return execFileSync("pdftotext", args, { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
}

const isFooter = (line: string) =>
  /TEAS®|NurseHub\.com|Practice Test\s*\d*/.test(line) || /^\d+$/.test(line.trim());

interface ParsedQuestion {
  num: number;
  stem: string;
  options: string[];
}

/** Parse questions from a column (already single-column text). */
function parseColumn(text: string, out: Map<number, ParsedQuestion>) {
  const lines = text.split("\n").map((l) => l.replace(/\s+$/, ""));
  let cur: ParsedQuestion | null = null;
  let mode: "stem" | "options" = "stem";

  for (const raw of lines) {
    const line = raw.trim();
    if (!line || isFooter(line)) continue;

    // Require whitespace (or EOL) right after the number's period so leading
    // decimals in a stem (e.g. "1.2 in : 6 yd") aren't misread as a new question.
    const qMatch = line.match(/^(\d{1,3})\.(?=\s|$)\s*(.*)$/);
    const optMatch = line.match(/^([a-fA-F])\.\s+(.*)$/);

    if (qMatch && (!optMatch || mode === "options")) {
      // new question
      if (cur) out.set(cur.num, cur);
      cur = { num: Number(qMatch[1]), stem: qMatch[2] ?? "", options: [] };
      mode = "stem";
      continue;
    }
    if (!cur) continue;
    if (optMatch) {
      mode = "options";
      cur.options.push(optMatch[2].trim());
    } else if (mode === "stem") {
      cur.stem += (cur.stem ? " " : "") + line;
    } else {
      // continuation of last option
      if (cur.options.length) cur.options[cur.options.length - 1] += " " + line;
    }
  }
  if (cur) out.set(cur.num, cur);
}

function parseQuestions(cfg: SectionConfig): Map<number, ParsedQuestion> {
  const out = new Map<number, ParsedQuestion>();
  for (let p = cfg.qPages[0]; p <= cfg.qPages[1]; p++) {
    parseColumn(pdftext(p, { crop: "left", layout: true }), out);
    parseColumn(pdftext(p, { crop: "right", layout: true }), out);
  }
  return out;
}

function parseAnswerKey(cfg: SectionConfig): Map<number, string> {
  const text = pdftext(cfg.answerPage);
  const map = new Map<number, string>();
  // pairs of "N." then an answer token on following non-empty lines
  const tokens = text
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !/Answers:|NurseHub|Total Score|TEAS®/i.test(l));
  for (let i = 0; i < tokens.length; i++) {
    const m = tokens[i].match(/^(\d{1,3})\.$/);
    if (m && i + 1 < tokens.length) {
      const ans = tokens[i + 1].replace(/\s+/g, "");
      if (!/^\d{1,3}\.$/.test(tokens[i + 1])) map.set(Number(m[1]), ans);
    }
    // inline form "1. C"
    const inline = tokens[i].match(/^(\d{1,3})\.\s+([A-F].*|\d.*)$/);
    if (inline) map.set(Number(inline[1]), inline[2].replace(/\s+/g, ""));
  }
  return map;
}

function parseScoreSheet(cfg: SectionConfig): Map<number, string> {
  const map = new Map<number, string>();
  for (let p = cfg.scorePages[0]; p <= cfg.scorePages[1]; p++) {
    const text = pdftext(p, { layout: true });
    for (const raw of text.split("\n")) {
      const line = raw.trim();
      const m = line.match(/^(\d{1,3})\s{2,}(.+\S)$/);
      if (m) {
        const skill = m[2].trim();
        if (skill && !/Correct\?|Topic|Question/i.test(skill)) {
          map.set(Number(m[1]), skill);
        }
      }
    }
  }
  return map;
}

function answerToCorrect(ans: string): { type: string; correct: number[] | string[] } {
  if (/^[\d.,/]+$/.test(ans)) return { type: "FILL_BLANK", correct: [ans] };
  const letters = ans.match(/[A-F]/gi);
  if (letters && letters.length > 1) {
    return { type: "MULTI", correct: letters.map((l) => l.toUpperCase().charCodeAt(0) - 65) };
  }
  if (letters && letters.length === 1) {
    return { type: "SINGLE", correct: [letters[0].toUpperCase().charCodeAt(0) - 65] };
  }
  return { type: "SINGLE", correct: [] };
}

async function main() {
  const args = process.argv.slice(2);
  const dry = args.includes("--dry");
  const onlySection = args.find((a) => a.startsWith("--section="))?.split("=")[1];
  const email = args.find((a) => a.startsWith("--email="))?.split("=")[1];

  // Reading questions depend on shared passages that don't auto-parse reliably
  // (passages get misread as questions), so exclude Reading from the default
  // import. Use --section=READING to inspect it.
  const DEFAULT_SECTIONS: SectionKey[] = ["MATH", "SCIENCE", "ENGLISH"];
  const configs = onlySection
    ? SECTIONS.filter((s) => s.key === onlySection)
    : SECTIONS.filter((s) => DEFAULT_SECTIONS.includes(s.key));

  const records: Record<string, unknown>[] = [];
  const summary: Record<string, unknown>[] = [];

  for (const cfg of configs) {
    const questions = parseQuestions(cfg);
    const answers = parseAnswerKey(cfg);
    const skills = parseScoreSheet(cfg);

    let withAnswer = 0;
    let withSkill = 0;
    for (const [num, q] of [...questions.entries()].sort((a, b) => a[0] - b[0])) {
      const ans = answers.get(num);
      const skill = skills.get(num);
      if (ans) withAnswer++;
      if (skill) withSkill++;
      const { type, correct } = ans ? answerToCorrect(ans) : { type: "SINGLE", correct: [] };
      records.push({
        num,
        section: cfg.key,
        topic: skill ? cfg.topicFor(skill) : "key-ideas-details",
        subtopic: skill ?? null,
        type,
        stem: q.stem,
        options: q.options,
        correct,
        images: FIGURES[cfg.key]?.[num] ?? null,
        rawAnswer: ans ?? null,
      });
    }
    summary.push({
      section: cfg.key,
      parsedQuestions: questions.size,
      withAnswer,
      withSkill,
      answerKeyEntries: answers.size,
      scoreSheetEntries: skills.size,
    });
  }

  console.log("PARSE SUMMARY:");
  console.table(summary);

  const dump = "/tmp/claude-1000/-home-vardan/scratch-nursehub.json";
  try {
    writeFileSync(dump, JSON.stringify(records, null, 2));
    console.log(`Dumped ${records.length} records to ${dump}`);
  } catch {
    /* ignore */
  }

  if (dry) {
    // print a couple of samples
    console.log("\nSAMPLE:", JSON.stringify(records.slice(0, 2), null, 2));
    process.exit(0);
  }

  if (!email) {
    console.error("Provide --email=<account> to import, or use --dry.");
    process.exit(1);
  }

  const { db } = await import("../src/lib/db");
  const user = await db.user.findUnique({ where: { email: email.toLowerCase() } });
  if (!user) {
    console.error(`No user with email ${email}. Create the account first.`);
    process.exit(1);
  }

  // Replace any prior NurseHub import for this user.
  await db.question.deleteMany({ where: { ownerId: user.id, source: "nursehub" } });

  let inserted = 0;
  for (const r of records) {
    const rec = r as {
      section: SectionKey;
      topic: string;
      subtopic: string | null;
      type: string;
      stem: string;
      options: string[];
      correct: number[] | string[];
      images: string[] | null;
    };
    if (!rec.stem || (rec.type !== "FILL_BLANK" && rec.options.length < 2)) continue;
    if (!rec.correct || rec.correct.length === 0) continue; // skip unanswerable
    if (!rec.subtopic) continue; // skip if we couldn't tag a skill
    await db.question.create({
      data: {
        section: rec.section,
        topic: rec.topic,
        subtopic: rec.subtopic,
        difficulty: 2,
        type: rec.type as never,
        stem: rec.stem,
        options: rec.options,
        correct: rec.correct,
        images: rec.images ?? undefined,
        source: "nursehub",
        attribution: "NurseHub Free TEAS 7 Practice Test © 2023",
        ownerId: user.id,
      },
    });
    inserted++;
  }
  console.log(`Inserted ${inserted} NurseHub questions for ${email}.`);
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
