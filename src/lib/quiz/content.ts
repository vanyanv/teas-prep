/**
 * Presentation-layer parsing of question text. Pure and deterministic: it
 * derives structure (passage / prompt / data table) and inline notation
 * (fractions, exponents, chemical subscripts, blanks) from the plain strings
 * already stored in the bank, so nothing about the data model changes and
 * nothing can be lost — every token's visible text comes verbatim from the
 * source. Conservative on purpose: ambiguous cases stay plain text.
 */

// ── Stem structure ──────────────────────────────────────────────────────────

export interface ParsedStem {
  /** Instruction line before a passage, e.g. "Read the passage and answer…" */
  lead?: string;
  /** Reading passage or supporting text, when the stem embeds one. */
  passage?: string;
  /** Rows of a small data set pulled out of the prose, as [label, value]. */
  dataRows?: [string, string][];
  /** Sentence that introduces the data table, shown above it. */
  dataCaption?: string;
  /** The actual question being asked — always present. */
  prompt: string;
}

const LEAD_RE = /^(read the (?:passage|text|excerpt)[^\n.]*\.)\s*/i;
// A "Passage:" or "Excerpt:" label followed by a quoted body.
const LABELLED_QUOTE_RE = /^(?:passage|excerpt|text)\s*:\s*[""“]([\s\S]+?)[""”]\s*/i;
// A line that is entirely "Label: n, Label: n, …" numeric data.
const DATA_LINE_RE = /^[A-Za-z][\w .'-]*:\s*-?\d[\d,.]*\s*(?:[a-zµ%°²³/]+)?(?:\s*,\s*[A-Za-z][\w .'-]*:\s*-?\d[\d,.]*\s*(?:[a-zµ%°²³/]+)?)+\.?$/;

const collapse = (s: string) => s.replace(/[ \t]+/g, " ").trim();

/**
 * Break a stem into lead / passage / dataRows / prompt. Never throws; a plain
 * one-line question round-trips to `{ prompt: stem }`.
 */
export function parseStem(rawStem: string): ParsedStem {
  const stem = rawStem.replace(/\r\n/g, "\n");
  const out: ParsedStem = { prompt: stem.trim() };

  let body = stem.trim();

  // 1. "Read the passage…" lead-in.
  const lead = body.match(LEAD_RE);
  if (lead) {
    out.lead = collapse(lead[1]);
    body = body.slice(lead[0].length).trim();
  }

  // 2. Labelled quoted passage: `Passage: "…"`.
  const labelled = body.match(LABELLED_QUOTE_RE);
  if (labelled) {
    out.passage = collapse(labelled[1]);
    body = body.slice(labelled[0].length).trim();
    out.prompt = body || out.prompt;
    return finalizeData(out);
  }

  // 3. Multi-paragraph body: last question paragraph is the prompt, the rest
  //    is a passage — but only when there is a genuine passage worth splitting
  //    (more than one paragraph, and the passage part is substantial).
  const paras = body.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  if (paras.length >= 2) {
    const last = paras[paras.length - 1];
    if (/\?$/.test(last) || /^(which|what|the (?:main|central|author)|according to|based on)/i.test(last)) {
      const passage = paras.slice(0, -1).join("\n\n");
      // Only treat as a passage when it reads like prose, not just a short cue.
      if (passage.length >= 80) {
        out.passage = passage;
        out.prompt = last;
        return finalizeData(out);
      }
    }
  }

  // 4. Single block: maybe a lead-in already consumed, maybe a data set.
  if (out.lead) out.prompt = body;
  return finalizeData(out);
}

/** Extract label:value data lines out of whichever field still holds them. */
function finalizeData(out: ParsedStem): ParsedStem {
  const source = out.prompt;
  const lines = source.split("\n").map((l) => l.trim());
  const dataLineIdx = lines.findIndex((l) => DATA_LINE_RE.test(l));
  if (dataLineIdx === -1) {
    out.prompt = collapse(source);
    return out;
  }

  const rows: [string, string][] = [];
  const dataLine = lines[dataLineIdx].replace(/\.$/, "");
  for (const cell of dataLine.split(",")) {
    const m = cell.match(/^\s*([A-Za-z][\w .'-]*?):\s*(.+?)\s*$/);
    if (m) rows.push([m[1].trim(), m[2].trim()]);
  }
  if (rows.length >= 2) {
    out.dataRows = rows;
    // Lines before the data introduce it (e.g. "A bookstore recorded …:");
    // lines after it are the actual question.
    const before = lines.slice(0, dataLineIdx).join(" ").trim();
    const after = lines.slice(dataLineIdx + 1).join(" ").trim();
    if (before) out.dataCaption = collapse(before.replace(/:\s*$/, ""));
    out.prompt = collapse(after || before || source);
  } else {
    out.prompt = collapse(source);
  }
  return out;
}

// ── Fill-in-the-blank instruction ───────────────────────────────────────────

// A trailing answer-format instruction, kept verbatim as the input's cue.
const FILL_INSTRUCTION_RE =
  /\s*((?:Enter|Write|Round|Express|Give)\b[^]*?\.)\s*$/i;

/**
 * Separate a fill-in-the-blank stem's trailing format instruction (e.g.
 * "Enter a number." or "Round to the nearest tenth.") from the question, so
 * the instruction can sit at the input while the prompt stays clean.
 */
export function fillBlankInstruction(stem: string): {
  prompt: string;
  cue: string;
  numeric: boolean;
} {
  const m = stem.match(FILL_INSTRUCTION_RE);
  const cue = m ? collapse(m[1]) : "Enter your answer";
  const prompt = m ? stem.slice(0, m.index).trim() : stem.trim();
  const numeric = /number|nearest (?:tenth|hundredth|whole)|how many|decimal|mixed number|improper fraction/i.test(
    cue + " " + stem,
  );
  return { prompt, cue, numeric };
}

// ── Inline tokens ───────────────────────────────────────────────────────────

export type Token =
  | { kind: "text"; value: string }
  | { kind: "frac"; whole?: string; num: string; den: string }
  | { kind: "sup"; value: string }
  | { kind: "sub"; value: string } // rendered attached to preceding text token
  | { kind: "blank" };

// Chemical formula: element symbols (optionally with counts), 2+ chars total,
// containing at least one count digit somewhere. e.g. CO2, H2O, C6H12O6, CH4.
// Not preceded/followed by a letter, so a coefficient digit (the 2 in 2H2O)
// is allowed to sit in front of the formula without swallowing it.
const FORMULA_RE = /(?<![A-Za-z])((?:[A-Z][a-z]?\d*){1,8})(?![A-Za-z])/g;
const ELEMENTS = new Set([
  "H","He","Li","Be","B","C","N","O","F","Ne","Na","Mg","Al","Si","P","S","Cl",
  "Ar","K","Ca","Sc","Ti","V","Cr","Mn","Fe","Co","Ni","Cu","Zn","Br","I",
]);

/** True when a token like "CH4" is a plausible chemical formula. */
function isFormula(word: string): boolean {
  if (!/\d/.test(word)) return false; // needs a subscript to be worth formatting
  const parts = word.match(/[A-Z][a-z]?\d*/g);
  if (!parts) return false;
  let symbols = 0;
  for (const p of parts) {
    const sym = p.match(/^[A-Z][a-z]?/)![0];
    if (!ELEMENTS.has(sym)) return false;
    symbols++;
  }
  return symbols >= 1 && parts.join("") === word;
}

// Mixed number (4 5/12) or simple fraction (3/4), with numeric parts only.
const FRACTION_RE = /(?<![\w/])(?:(\d+)\s+)?(\d+)\/(\d+)(?![\w/])/g;
const CARET_RE = /([A-Za-z0-9)\]])\^(\d+|[A-Za-z])/g;
const BLANK_RE = /_{2,}/g;

interface Marker {
  start: number;
  end: number;
  token: Token;
  /** for sub: number of source chars belonging to the preceding text */
  attach?: boolean;
}

/**
 * Split text into renderable tokens. Non-overlapping matches for fractions,
 * caret exponents, chemical subscripts, and blanks; everything else is text.
 */
export function tokenize(text: string): Token[] {
  const markers: Marker[] = [];

  for (const m of text.matchAll(FRACTION_RE)) {
    markers.push({
      start: m.index!,
      end: m.index! + m[0].length,
      token: m[1]
        ? { kind: "frac", whole: m[1], num: m[2], den: m[3] }
        : { kind: "frac", num: m[2], den: m[3] },
    });
  }
  for (const m of text.matchAll(CARET_RE)) {
    // Keep the base character as text; only the exponent is the token.
    const supStart = m.index! + m[1].length; // position of "^"
    markers.push({
      start: supStart,
      end: supStart + 1 + m[2].length,
      token: { kind: "sup", value: m[2] },
    });
  }
  for (const m of text.matchAll(BLANK_RE)) {
    markers.push({ start: m.index!, end: m.index! + m[0].length, token: { kind: "blank" } });
  }
  // Chemical formulas → a text token for the symbols with interleaved subs.
  for (const m of text.matchAll(FORMULA_RE)) {
    if (!isFormula(m[0])) continue;
    markers.push({
      start: m.index!,
      end: m.index! + m[0].length,
      token: { kind: "text", value: m[0] }, // placeholder; expanded below
    });
  }

  markers.sort((a, b) => a.start - b.start || b.end - a.end);

  const out: Token[] = [];
  let cursor = 0;
  const pushText = (s: string) => {
    if (!s) return;
    const last = out[out.length - 1];
    if (last && last.kind === "text") last.value += s;
    else out.push({ kind: "text", value: s });
  };

  for (const mk of markers) {
    if (mk.start < cursor) continue; // overlap: skip the later match
    pushText(text.slice(cursor, mk.start));
    if (mk.token.kind === "text" && isFormula(mk.token.value)) {
      // Expand a formula into text+sub tokens: "CO2" -> "CO" + sub"2".
      for (const part of mk.token.value.match(/[A-Z][a-z]?\d*/g)!) {
        const sym = part.match(/^[A-Z][a-z]?/)![0];
        const count = part.slice(sym.length);
        pushText(sym);
        if (count) out.push({ kind: "sub", value: count });
      }
    } else {
      out.push(mk.token);
    }
    cursor = mk.end;
  }
  pushText(text.slice(cursor));
  return out;
}

// ── Typography ──────────────────────────────────────────────────────────────

/**
 * Fix straight quotes/apostrophes to curly, without touching prime notation
 * (3'-TAC) or possessive plurals after digits. Presentation-only.
 */
export function typographize(text: string): string {
  let out = text;
  // Double quotes: opening if preceded by start/space/(, else closing.
  out = out.replace(/"/g, (_q, i: number, s: string) => {
    const prev = s[i - 1];
    return !prev || /[\s([{]/.test(prev) ? "“" : "”";
  });
  // Apostrophes: only a letter'letter contraction or letter's possessive.
  out = out.replace(/([A-Za-z])'([A-Za-z])/g, "$1’$2");
  return out;
}
