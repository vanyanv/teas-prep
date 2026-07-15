import { ExternalLink } from "lucide-react";

const FREE_TESTS = [
  {
    name: "Official ATI free TEAS practice",
    url: "https://www.atitesting.com/teas/free-teas-practice-test",
    note: "15 questions per subject with rationales, straight from the test maker.",
  },
  {
    name: "NurseHub free TEAS 7 practice",
    url: "https://nursehub.com/teas-7-free-practice-tests/",
    note: "The 170-question practice test (the one imported here) plus a score report on their site.",
  },
  {
    name: "Mometrix free TEAS practice",
    url: "https://www.mometrix.com/academy/teas-practice-test/",
    note: "170 free practice questions across all four sections.",
  },
  {
    name: "Union Test Prep: TEAS",
    url: "https://uniontestprep.com/teas/practice-test",
    note: "Free practice tests and study guides by section.",
  },
];

const TIPS = [
  "Start with a diagnostic so your study time targets real weak spots, not guesswork.",
  "Anatomy & physiology is the largest single science sub-area, so keep the flashcards going daily.",
  "Math leans on data interpretation and conversions; practice reading tables and unit conversions.",
  "Pace yourself: the real exam is about 1 minute 13 seconds per question. Flag and move on when stuck.",
  "Take at least one full timed mock before test day to build stamina and timing.",
];

export default function ResourcesPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
        Resources
      </p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight">
        Free practice & study tips
      </h1>
      <p className="mt-2 text-muted-foreground">
        Legit, free TEAS practice from reputable sources, plus a few things worth
        remembering.
      </p>

      <section className="mt-8">
        <h2 className="text-sm font-medium text-muted-foreground">
          Free practice tests
        </h2>
        <div className="mt-3 space-y-3">
          {FREE_TESTS.map((r) => (
            <a
              key={r.url}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 rounded-xl border bg-card p-4 outline-none transition-colors hover:bg-secondary/40 focus-visible:ring-[3px] focus-visible:ring-ring/40"
            >
              <ExternalLink className="mt-0.5 size-4 shrink-0 text-primary" />
              <div>
                <p className="font-medium">{r.name}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{r.note}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-sm font-medium text-muted-foreground">Study tips</h2>
        <ul className="mt-3 space-y-2">
          {TIPS.map((tip) => (
            <li
              key={tip}
              className="flex items-start gap-3 rounded-xl border bg-card p-4 text-sm"
            >
              <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" />
              {tip}
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-8 text-xs text-muted-foreground">
        External sites are owned by their respective companies. Practice there on
        their terms; the questions are not copied into this app.
      </p>
    </div>
  );
}
