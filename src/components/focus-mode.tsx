"use client";

import { createContext, useContext, useEffect, useState } from "react";

type FocusCtx = { focus: boolean; setFocus: (v: boolean) => void };

const Ctx = createContext<FocusCtx>({ focus: false, setFocus: () => {} });

/** Wraps the app so quiz/mock runners can hide the surrounding chrome. */
export function FocusModeProvider({ children }: { children: React.ReactNode }) {
  const [focus, setFocus] = useState(false);
  return <Ctx.Provider value={{ focus, setFocus }}>{children}</Ctx.Provider>;
}

export function useFocusMode() {
  return useContext(Ctx);
}

/** Call from a focus surface (a running quiz) to hide chrome while mounted. */
export function useEnterFocusMode(active = true) {
  const { setFocus } = useFocusMode();
  useEffect(() => {
    if (!active) return;
    setFocus(true);
    return () => setFocus(false);
  }, [active, setFocus]);
}
