"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Download, FileUp, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

const TEMPLATE = [
  {
    section: "SCIENCE",
    topic: "anatomy-physiology",
    subtopic: "Cardiac anatomy",
    difficulty: 2,
    type: "SINGLE",
    stem: "Which chamber pumps oxygenated blood to the body?",
    options: ["Right atrium", "Left ventricle", "Right ventricle", "Left atrium"],
    correct: [1],
    explanation: "The left ventricle pumps oxygenated blood into the aorta.",
  },
  {
    section: "MATH",
    topic: "numbers-algebra",
    type: "FILL_BLANK",
    stem: "What is 250 mL multiplied by 4?",
    options: [],
    correct: ["1000"],
    explanation: "250 x 4 = 1000.",
  },
];

const LETTER_TO_INDEX: Record<string, number> = { a: 0, b: 1, c: 2, d: 3, e: 4, f: 5 };

/** Minimal CSV parser handling quoted fields with commas and newlines. */
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else inQuotes = false;
      } else field += c;
    } else if (c === '"') inQuotes = true;
    else if (c === ",") { row.push(field); field = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field); field = "";
      if (row.some((x) => x.trim() !== "")) rows.push(row);
      row = [];
    } else field += c;
  }
  if (field !== "" || row.length) { row.push(field); if (row.some((x) => x.trim() !== "")) rows.push(row); }
  return rows;
}

/**
 * Columns: section, topic, type, stem, optionA, optionB, optionC, optionD,
 * correct (letter(s) like "B" or "A,B", or a value for fill-in), explanation.
 */
function csvToQuestions(text: string): unknown[] {
  const rows = parseCsv(text);
  if (rows.length < 2) return [];
  const header = rows[0].map((h) => h.trim().toLowerCase());
  const idx = (name: string) => header.indexOf(name);
  const out: unknown[] = [];
  for (const r of rows.slice(1)) {
    const get = (n: string) => (idx(n) >= 0 ? (r[idx(n)] ?? "").trim() : "");
    const options = [get("optiona"), get("optionb"), get("optionc"), get("optiond")].filter(Boolean);
    const type = (get("type") || (options.length ? "SINGLE" : "FILL_BLANK")).toUpperCase();
    const correctRaw = get("correct");
    let correct: number[] | string[];
    if (type === "FILL_BLANK") correct = [correctRaw];
    else {
      const letters = correctRaw.split(/[,\s]+/).filter(Boolean);
      correct = letters.map((l) => LETTER_TO_INDEX[l.toLowerCase()]).filter((n) => n != null);
    }
    out.push({
      section: get("section").toUpperCase(),
      topic: get("topic"),
      type,
      stem: get("stem"),
      options,
      correct,
      explanation: get("explanation") || undefined,
    });
  }
  return out;
}

export function ImportClient() {
  const router = useRouter();
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  async function importPayload(payload: unknown[]) {
    setBusy(true);
    setMessage(null);
    try {
      const res = await fetch("/api/questions/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Import failed");
      setMessage({ ok: true, text: `Imported ${data.imported} questions.` });
      setText("");
      router.refresh();
    } catch (e) {
      setMessage({ ok: false, text: (e as Error).message });
    } finally {
      setBusy(false);
    }
  }

  function submitPaste() {
    try {
      const payload = JSON.parse(text);
      importPayload(payload);
    } catch {
      setMessage({ ok: false, text: "That isn't valid JSON. Check the format." });
    }
  }

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const content = await file.text();
    const payload = file.name.toLowerCase().endsWith(".csv")
      ? csvToQuestions(content)
      : JSON.parse(content);
    importPayload(payload);
    if (fileRef.current) fileRef.current.value = "";
  }

  function downloadTemplate() {
    const blob = new Blob([JSON.stringify(TEMPLATE, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "teas-questions-template.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" onClick={() => fileRef.current?.click()} disabled={busy}>
          <FileUp />
          Upload .json or .csv
        </Button>
        <input
          ref={fileRef}
          type="file"
          accept=".json,.csv"
          className="hidden"
          onChange={onFile}
        />
        <Button variant="ghost" onClick={downloadTemplate}>
          <Download />
          Download JSON template
        </Button>
      </div>

      <div>
        <label htmlFor="paste-json" className="text-sm font-medium">
          Or paste JSON
        </label>
        <textarea
          id="paste-json"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder='[ { "section": "MATH", "topic": "numbers-algebra", "stem": "...", "options": ["..."], "correct": [0] } ]'
          className="mt-2 h-48 w-full rounded-md border border-input bg-background p-3 font-mono text-xs outline-none focus-visible:ring-[3px] focus-visible:ring-ring/40"
        />
        <Button className="mt-3" onClick={submitPaste} disabled={busy || !text.trim()}>
          {busy ? <Loader2 className="animate-spin" /> : null}
          Import questions
        </Button>
      </div>

      {message && (
        <p className={message.ok ? "text-sm text-success" : "text-sm text-destructive"}>
          {message.text}
        </p>
      )}
    </div>
  );
}
