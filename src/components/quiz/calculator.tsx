"use client";

import { useState } from "react";
import { Calculator as CalculatorIcon, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Op = "+" | "-" | "×" | "÷";

function compute(a: number, b: number, op: Op): number {
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "×":
      return a * b;
    case "÷":
      return b === 0 ? NaN : a / b;
  }
}

function format(n: number): string {
  if (!Number.isFinite(n)) return "Error";
  const rounded = Math.round(n * 1e10) / 1e10;
  const s = String(rounded);
  return s.length > 12 ? rounded.toExponential(6) : s;
}

/**
 * The TEAS-style four-function calculator: toggle button plus a small panel.
 * Render only while the current question is Math. `data-keys-exempt` keeps
 * the quiz answer-key shortcuts from firing while it has focus.
 */
export function QuizCalculator() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        variant={open ? "secondary" : "ghost"}
        size="sm"
        onClick={() => setOpen((v) => !v)}
        aria-pressed={open}
        aria-label="Calculator"
      >
        <CalculatorIcon />
        <span className="hidden sm:inline">Calc</span>
      </Button>
      {open && <CalculatorPanel onClose={() => setOpen(false)} />}
    </>
  );
}

function CalculatorPanel({ onClose }: { onClose: () => void }) {
  const [display, setDisplay] = useState("0");
  const [acc, setAcc] = useState<number | null>(null);
  const [op, setOp] = useState<Op | null>(null);
  // After = or an operator, the next digit starts a fresh number.
  const [fresh, setFresh] = useState(true);

  function digit(d: string) {
    setDisplay((cur) => {
      if (fresh || cur === "0" || cur === "Error") return d;
      return cur.length >= 12 ? cur : cur + d;
    });
    setFresh(false);
  }

  function dot() {
    setDisplay((cur) => {
      if (fresh || cur === "Error") return "0.";
      return cur.includes(".") ? cur : cur + ".";
    });
    setFresh(false);
  }

  function applyPending(): number {
    const cur = parseFloat(display) || 0;
    return acc != null && op ? compute(acc, cur, op) : cur;
  }

  function chooseOp(next: Op) {
    const value = fresh && acc != null ? acc : applyPending();
    setAcc(value);
    setDisplay(format(value));
    setOp(next);
    setFresh(true);
  }

  function equals() {
    if (op == null || acc == null) return;
    const value = applyPending();
    setDisplay(format(value));
    setAcc(null);
    setOp(null);
    setFresh(true);
  }

  function clearAll() {
    setDisplay("0");
    setAcc(null);
    setOp(null);
    setFresh(true);
  }

  function backspace() {
    if (fresh) return;
    setDisplay((cur) =>
      cur.length <= 1 || cur === "Error" ? "0" : cur.slice(0, -1),
    );
  }

  function negate() {
    setDisplay((cur) => {
      if (cur === "0" || cur === "Error") return cur;
      return cur.startsWith("-") ? cur.slice(1) : `-${cur}`;
    });
  }

  const keys: { label: string; onPress: () => void; kind?: "op" | "eq" }[] = [
    { label: "C", onPress: clearAll, kind: "op" },
    { label: "±", onPress: negate, kind: "op" },
    { label: "⌫", onPress: backspace, kind: "op" },
    { label: "÷", onPress: () => chooseOp("÷"), kind: "op" },
    { label: "7", onPress: () => digit("7") },
    { label: "8", onPress: () => digit("8") },
    { label: "9", onPress: () => digit("9") },
    { label: "×", onPress: () => chooseOp("×"), kind: "op" },
    { label: "4", onPress: () => digit("4") },
    { label: "5", onPress: () => digit("5") },
    { label: "6", onPress: () => digit("6") },
    { label: "-", onPress: () => chooseOp("-"), kind: "op" },
    { label: "1", onPress: () => digit("1") },
    { label: "2", onPress: () => digit("2") },
    { label: "3", onPress: () => digit("3") },
    { label: "+", onPress: () => chooseOp("+"), kind: "op" },
    { label: "0", onPress: () => digit("0") },
    { label: ".", onPress: dot },
    { label: "=", onPress: equals, kind: "eq" },
  ];

  return (
    <div
      data-keys-exempt
      role="group"
      aria-label="Calculator"
      className="fixed bottom-24 right-4 z-40 w-60 rounded-xl border bg-card p-3 shadow-md"
    >
      <div className="flex items-center justify-between gap-2">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          Calculator
        </p>
        <Button
          variant="ghost"
          size="icon"
          className="size-7"
          onClick={onClose}
          aria-label="Close calculator"
        >
          <X />
        </Button>
      </div>
      <output
        aria-live="polite"
        className="mt-2 block w-full overflow-hidden rounded-md border bg-background px-3 py-2 text-right font-mono text-lg tabular-nums"
      >
        {display}
      </output>
      <div className="mt-2 grid grid-cols-4 gap-1.5">
        {keys.map((k) => (
          <button
            key={k.label}
            type="button"
            onClick={k.onPress}
            className={cn(
              "flex h-10 items-center justify-center rounded-md border font-mono text-sm font-medium",
              "outline-none transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/40",
              k.kind === "eq"
                ? "col-span-2 border-primary bg-primary text-primary-foreground hover:bg-primary/90"
                : k.kind === "op"
                  ? "bg-secondary text-secondary-foreground hover:bg-secondary/70"
                  : "bg-card hover:bg-secondary",
            )}
          >
            {k.label}
          </button>
        ))}
      </div>
    </div>
  );
}
