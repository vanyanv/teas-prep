"use client";

import { useEffect } from "react";

import type { Answer, ClientQuestion } from "@/lib/quiz/types";

/**
 * Keyboard answering shared by the practice and mock runners:
 *  1-9 / A-F  select an option (toggles for MULTI; region index for HOT_SPOT)
 *  F          flag, Enter advance, ArrowLeft/Right move.
 * No-ops while the user is typing in a text field (FILL_BLANK).
 */
export function useAnswerKeys({
  question,
  answer,
  setAnswer,
  onFlag,
  onNext,
  onPrev,
  onEnter,
  deps = [],
}: {
  question: ClientQuestion | undefined;
  answer: Answer;
  setAnswer: (v: Answer) => void;
  onFlag: () => void;
  onNext: () => void;
  onPrev: () => void;
  onEnter: () => void;
  deps?: unknown[];
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const el = document.activeElement;
      if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) return;
      // Widgets like the calculator opt out of quiz shortcuts while focused.
      if (el instanceof HTMLElement && el.closest("[data-keys-exempt]")) return;
      if (!question) return;

      const picks =
        question.type === "MULTI" ||
        question.type === "SINGLE" ||
        question.type === "HOT_SPOT";
      const key = e.key.toLowerCase();

      let optIdx = -1;
      if (/^[1-9]$/.test(key)) optIdx = Number(key) - 1;
      else if (/^[a-f]$/.test(key)) optIdx = key.charCodeAt(0) - 97;

      if (picks && optIdx >= 0 && optIdx < question.options.length) {
        e.preventDefault();
        if (question.type === "MULTI") {
          const set = new Set(Array.isArray(answer) ? (answer as number[]) : []);
          if (set.has(optIdx)) set.delete(optIdx);
          else set.add(optIdx);
          setAnswer([...set].sort((a, b) => a - b));
        } else {
          setAnswer(optIdx);
        }
        return;
      }

      if (key === "f") {
        e.preventDefault();
        onFlag();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        onNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        onPrev();
      } else if (e.key === "Enter") {
        e.preventDefault();
        onEnter();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
