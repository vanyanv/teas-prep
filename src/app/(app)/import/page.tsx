import { requireUser } from "@/lib/session";
import { db } from "@/lib/db";
import { ImportClient } from "@/components/import/import-client";

export default async function ImportPage() {
  const user = await requireUser();

  const [original, nursehub, imported] = await Promise.all([
    db.question.count({ where: { source: "original" } }),
    db.question.count({ where: { ownerId: user.id, source: "nursehub" } }),
    db.question.count({ where: { ownerId: user.id, source: "imported" } }),
  ]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
        Import questions
      </p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight">
        Add your own questions
      </h1>
      <p className="mt-2 text-muted-foreground">
        Bring in questions from materials you own, as JSON or CSV. They become
        part of your private practice and diagnostic pool.
      </p>

      <div className="mt-6 grid grid-cols-3 gap-3">
        {[
          { label: "Built-in", value: original },
          { label: "NurseHub", value: nursehub },
          { label: "Imported", value: imported },
        ].map((s) => (
          <div key={s.label} className="rounded-lg border bg-card p-4 text-center">
            <p className="font-mono text-2xl font-semibold tabular-nums">
              {s.value}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <ImportClient />
      </div>

      <section className="mt-10 rounded-xl border bg-card p-5 text-sm text-muted-foreground">
        <h2 className="font-medium text-foreground">Format</h2>
        <p className="mt-2">
          JSON is an array of question objects. Required fields:{" "}
          <code className="font-mono text-xs">section</code> (READING, MATH,
          SCIENCE, ENGLISH), <code className="font-mono text-xs">topic</code>,{" "}
          <code className="font-mono text-xs">stem</code>,{" "}
          <code className="font-mono text-xs">options</code> (array; empty for
          fill-in), and <code className="font-mono text-xs">correct</code>{" "}
          (array of option indices, or an array of accepted strings for
          fill-in). Optional:{" "}
          <code className="font-mono text-xs">type</code>,{" "}
          <code className="font-mono text-xs">subtopic</code>,{" "}
          <code className="font-mono text-xs">difficulty</code>,{" "}
          <code className="font-mono text-xs">explanation</code>. Download the
          template above for a working example.
        </p>
        <p className="mt-3">
          CSV columns:{" "}
          <code className="font-mono text-xs">
            section, topic, type, stem, optionA, optionB, optionC, optionD,
            correct, explanation
          </code>
          . Use a letter like <code className="font-mono text-xs">B</code> (or{" "}
          <code className="font-mono text-xs">A,B</code> for select-all) in the
          correct column.
        </p>
      </section>
    </div>
  );
}
