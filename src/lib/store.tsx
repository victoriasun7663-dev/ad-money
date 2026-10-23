"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { analyze, type Analysis, type StreamDay } from "./model";
import { SAMPLE_DAYS } from "./sample";

// Channel data lives in this browser only (sessionStorage), never a server.
// When "Connect with Twitch" lands, it fills the same `days` slot.

type Source = "upload" | "sample" | "twitch";
type Ctx = {
  days: StreamDay[] | null;
  source: Source | null;
  analysis: Analysis | null;
  setDays: (days: StreamDay[], source: Source, periodDays?: number) => void;
  loadSample: () => void;
  clear: () => void;
};

const KEY = "ad-money:v1";
const AdMoneyContext = createContext<Ctx | null>(null);

export function AdMoneyProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<{ days: StreamDay[]; source: Source; periodDays?: number } | null>(null);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(KEY);
      if (saved) setState(JSON.parse(saved));
    } catch {}
  }, []);

  const value = useMemo<Ctx>(() => {
    const save = (next: typeof state) => {
      setState(next);
      try {
        if (next) sessionStorage.setItem(KEY, JSON.stringify(next));
        else sessionStorage.removeItem(KEY);
      } catch {}
    };
    return {
      days: state?.days ?? null,
      source: state?.source ?? null,
      analysis: state ? analyze(state.days, state.periodDays ?? 30) : null,
      setDays: (days, source, periodDays = 30) => save({ days, source, periodDays }),
      loadSample: () => save({ days: SAMPLE_DAYS, source: "sample" }),
      clear: () => save(null),
    };
  }, [state]);

  return <AdMoneyContext.Provider value={value}>{children}</AdMoneyContext.Provider>;
}

export function useAdMoney() {
  const ctx = useContext(AdMoneyContext);
  if (!ctx) throw new Error("useAdMoney must be used inside <AdMoneyProvider>");
  return ctx;
}
