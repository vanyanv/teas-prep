"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const DAY_OPTIONS = [2, 3, 4, 5, 6, 7];
const MINUTE_OPTIONS = [
  { value: 15, label: "15 min" },
  { value: 20, label: "20 min" },
  { value: 30, label: "30 min" },
  { value: 45, label: "45+ min" },
];

function OptionButton({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "min-h-10 flex-1 rounded-md border px-2 font-mono text-sm tabular-nums outline-none transition-colors",
        "focus-visible:ring-[3px] focus-visible:ring-ring/40",
        selected
          ? "border-primary/50 bg-accent text-accent-foreground"
          : "bg-card hover:border-primary/40 hover:bg-secondary/40",
      )}
    >
      {children}
    </button>
  );
}

export function WelcomeForm({ initialTestDate }: { initialTestDate: string }) {
  const router = useRouter();
  const [testDate, setTestDate] = useState(initialTestDate);
  const [notScheduled, setNotScheduled] = useState(false);
  const [days, setDays] = useState<number | null>(null);
  const [minutes, setMinutes] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          testDate: notScheduled ? "" : testDate,
          ...(days != null ? { studyDaysPerWeek: days } : {}),
          ...(minutes != null ? { sessionMinutes: minutes } : {}),
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Could not save your answers.");
      }
      router.push("/diagnostic");
    } catch (err) {
      setBusy(false);
      setError(
        err instanceof Error ? err.message : "Could not save your answers.",
      );
    }
  }

  return (
    <form onSubmit={submit} className="rounded-xl border bg-card p-6">
      <div className="flex flex-col gap-2">
        <Label htmlFor="testDate">When is your TEAS exam?</Label>
        <Input
          id="testDate"
          type="date"
          value={testDate}
          disabled={notScheduled}
          onChange={(e) => setTestDate(e.target.value)}
        />
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          <input
            type="checkbox"
            checked={notScheduled}
            onChange={(e) => setNotScheduled(e.target.checked)}
            className="size-4 rounded border-border accent-[var(--primary)]"
          />
          I have not scheduled it yet
        </label>
      </div>

      <fieldset className="mt-6">
        <legend className="text-sm font-medium">
          How many days a week can you study?
        </legend>
        <div className="mt-2 flex gap-1.5">
          {DAY_OPTIONS.map((d) => (
            <OptionButton
              key={d}
              selected={days === d}
              onClick={() => setDays(days === d ? null : d)}
            >
              {d}
            </OptionButton>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-6">
        <legend className="text-sm font-medium">
          How long is a realistic session?
        </legend>
        <div className="mt-2 flex gap-1.5">
          {MINUTE_OPTIONS.map((m) => (
            <OptionButton
              key={m.value}
              selected={minutes === m.value}
              onClick={() => setMinutes(minutes === m.value ? null : m.value)}
            >
              {m.label}
            </OptionButton>
          ))}
        </div>
      </fieldset>

      {error && <p className="mt-4 text-sm text-destructive">{error}</p>}

      <div className="mt-7 flex flex-col gap-2">
        <Button type="submit" size="lg" disabled={busy}>
          {busy ? (
            <>
              <Loader2 className="animate-spin" />
              Saving
            </>
          ) : (
            <>
              Start the free diagnostic
              <ArrowRight />
            </>
          )}
        </Button>
        <Button asChild variant="ghost" size="sm" className="text-muted-foreground">
          <a href="/diagnostic">Skip for now</a>
        </Button>
      </div>
    </form>
  );
}
