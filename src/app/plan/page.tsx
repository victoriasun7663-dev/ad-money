"use client";

import { NeedsData } from "@/components/NeedsData";
import { Eyebrow, Screen, TopBar, buttonPrimary, buttonSecondary } from "@/components/ui";
import { schedule } from "@/lib/model";

export default function Plan() {
  return (
    <NeedsData>
      {(a) => {
        const perHour = Math.round(a.limitPerHour);
        const s = schedule(a.limitPerHour);
        const tasks = [
          <>Open <strong>Ads</strong> in your Twitch Creator Dashboard</>,
          <>Set break length to <strong>{s.breakLen} minutes</strong></>,
          <>Set it to run <strong>every {s.every} minutes</strong></>,
          <>Stream like normal. That&apos;s it.</>,
        ];
        return (
          <Screen>
            <TopBar back="/result" title="Your plan" />

            <div className="flex flex-col gap-2 rounded-[18px] border border-money-line bg-money-bg p-5">
              <span className="text-xs font-semibold tracking-[0.08em] text-money">THE ONE RULE</span>
              <span className="font-display text-[28px] font-bold leading-tight">Run {perHour} minutes of ads every hour</span>
              <span className="text-[15px] text-soft">
                Easy version: a {s.breakLen}-minute break every {s.every} minutes.
              </span>
            </div>

            <div className="flex flex-col">
              <div className="mb-1.5">
                <Eyebrow>SET IT UP ONCE</Eyebrow>
              </div>
              {tasks.map((t, i) => (
                <label key={i} className="flex min-h-[52px] items-center gap-3.5 border-b border-[#241e33] text-[15px] last:border-0">
                  <input type="checkbox" className="size-[22px] flex-none accent-money" />
                  <span>{t}</span>
                </label>
              ))}
            </div>

            <p className="rounded-2xl border border-line bg-panel px-4 py-3.5 text-sm text-soft">
              Come back in 30 days with a new file to see if it worked.
            </p>

            <div className="mt-auto flex flex-col gap-2.5">
              {/* TODO: reminder (email) — needs a backend + consent. */}
              <button type="button" className={buttonPrimary} disabled>
                Remind me in 30 days
              </button>
              {/* TODO: share link to manager view. */}
              <button type="button" className={buttonSecondary} disabled>
                Send to my manager
              </button>
            </div>
          </Screen>
        );
      }}
    </NeedsData>
  );
}
