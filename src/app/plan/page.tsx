"use client";

import { NeedsData } from "@/components/NeedsData";
import { Eyebrow, Rich, Screen, TopBar, buttonPrimary, buttonSecondary } from "@/components/ui";
import { copy } from "@/content/copy";
import { schedule } from "@/lib/model";

const t = copy.plan;

export default function Plan() {
  return (
    <NeedsData>
      {(a) => {
        const perHour = Math.round(a.limitPerHour);
        const s = schedule(a.limitPerHour);
        return (
          <Screen>
            <TopBar back="/result" title={t.title} />

            <div className="flex flex-col gap-2 rounded-[18px] border border-money-line bg-money-bg p-5">
              <span className="text-xs font-semibold tracking-[0.08em] text-money">{t.ruleLabel}</span>
              <span className="font-display text-[28px] font-bold leading-tight">{t.rule(perHour)}</span>
              <span className="text-[15px] text-soft">{t.easy(s.breakLen, s.every)}</span>
            </div>

            <div className="flex flex-col">
              <div className="mb-1.5">
                <Eyebrow>{t.setupLabel}</Eyebrow>
              </div>
              {t.tasks(s.breakLen, s.every).map((task, i) => (
                <label key={i} className="flex min-h-[52px] items-center gap-3.5 border-b border-[#241e33] text-[15px] last:border-0">
                  <input type="checkbox" className="size-[22px] flex-none accent-money" />
                  <span>
                    <Rich text={task} />
                  </span>
                </label>
              ))}
            </div>

            <p className="rounded-2xl border border-line bg-panel px-4 py-3.5 text-sm text-soft">{t.checkBack}</p>

            <div className="mt-auto flex flex-col gap-2.5">
              {/* TODO: reminder (email) — needs a backend + consent. */}
              <button type="button" className={buttonPrimary} disabled>
                {t.remind}
              </button>
              {/* TODO: share link to manager view. */}
              <button type="button" className={buttonSecondary} disabled>
                {t.sendManager}
              </button>
            </div>
          </Screen>
        );
      }}
    </NeedsData>
  );
}
