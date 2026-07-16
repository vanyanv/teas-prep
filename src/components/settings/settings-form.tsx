"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SettingsForm({
  initial,
}: {
  initial: { name: string; testDate: string; targetScore: number };
}) {
  const router = useRouter();
  const [name, setName] = useState(initial.name);
  const [testDate, setTestDate] = useState(initial.testDate);
  const [targetScore, setTargetScore] = useState(String(initial.targetScore));
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setSaved(false);
    setError(null);
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, testDate, targetScore }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Could not save your settings.");
      }
      setSaved(true);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save your settings.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="rounded-xl border bg-card p-6">
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={name}
          autoComplete="name"
          onChange={(e) => {
            setName(e.target.value);
            setSaved(false);
          }}
        />
      </div>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="testDate">Test date</Label>
          <Input
            id="testDate"
            type="date"
            value={testDate}
            onChange={(e) => {
              setTestDate(e.target.value);
              setSaved(false);
            }}
          />
          <p className="text-xs text-muted-foreground">
            Drives the countdown and your study plan.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="targetScore">Target score (%)</Label>
          <Input
            id="targetScore"
            type="number"
            min={50}
            max={95}
            value={targetScore}
            onChange={(e) => {
              setTargetScore(e.target.value);
              setSaved(false);
            }}
          />
          <p className="text-xs text-muted-foreground">
            Readiness is measured against this.
          </p>
        </div>
      </div>
      {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
      <div className="mt-6 flex items-center gap-3">
        <Button type="submit" disabled={busy}>
          {busy ? (
            <>
              <Loader2 className="animate-spin" />
              Saving
            </>
          ) : (
            "Save changes"
          )}
        </Button>
        {saved && (
          <span className="flex items-center gap-1.5 text-sm text-success" role="status">
            <Check className="size-4" aria-hidden />
            Saved
          </span>
        )}
      </div>
    </form>
  );
}
