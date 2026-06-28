"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function defaultTestDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 42); // ~6 weeks out (ATI's minimum recommendation)
  return d.toISOString().slice(0, 10);
}

export function PlanSetup({ onDone }: { onDone?: () => void }) {
  const router = useRouter();
  const [testDate, setTestDate] = useState(defaultTestDate());
  const [hours, setHours] = useState(8);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ testDate, hoursPerWeek: hours }),
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
        <div className="flex flex-col gap-2">
          <Label htmlFor="hours">Study hours per week</Label>
          <Input
            id="hours"
            type="number"
            min={1}
            max={40}
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
          />
        </div>
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
