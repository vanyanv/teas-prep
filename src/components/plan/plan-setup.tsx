"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

function defaultTestDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 42); // ~6 weeks out (ATI's minimum recommendation)
  return d.toISOString().slice(0, 10);
}

const DAY_CHOICES = [2, 3, 4, 5, 6, 7];

export function PlanSetup({
  defaultDays = 4,
  onDone,
}: {
  defaultDays?: number;
  onDone?: () => void;
}) {
  const router = useRouter();
  const [testDate, setTestDate] = useState(defaultTestDate());
  const [days, setDays] = useState(
    DAY_CHOICES.includes(defaultDays) ? defaultDays : 4,
  );
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ testDate, daysPerWeek: days }),
      });
      if (!res.ok) throw new Error();
      onDone?.();
      router.refresh();
    } catch {
      setError("Could not build the plan. Check your test date and try again.");
      setBusy(false);
    }
  }

  return (
    <div className="rounded-xl border bg-card p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="testDate">Target test date</Label>
          <Input
            id="testDate"
            type="date"
            value={testDate}
            min={new Date().toISOString().slice(0, 10)}
            onChange={(e) => setTestDate(e.target.value)}
          />
        </div>
        <fieldset className="flex flex-col gap-2">
          <legend className="text-sm font-medium">Study days per week</legend>
          <div className="flex flex-wrap gap-1.5" role="group">
            {DAY_CHOICES.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDays(d)}
                aria-pressed={days === d}
                className={cn(
                  "min-h-9 min-w-11 rounded-md border px-3 font-mono text-sm tabular-nums outline-none transition-colors",
                  "focus-visible:ring-[3px] focus-visible:ring-ring/40",
                  days === d
                    ? "border-primary bg-primary text-primary-foreground"
                    : "bg-card hover:border-primary",
                )}
              >
                {d}
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            Each study day is one ~25-minute session; Sunday holds the weekly review.
          </p>
        </fieldset>
      </div>
      {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
      <Button className="mt-6" onClick={submit} disabled={busy}>
        {busy ? (
          <>
            <Loader2 className="animate-spin" />
            Building…
          </>
        ) : (
          "Build my plan"
        )}
      </Button>
    </div>
  );
}
