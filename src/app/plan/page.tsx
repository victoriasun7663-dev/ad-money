"use client";

import { NeedsData } from "@/components/NeedsData";
import { CommitCard, ShareButton } from "@/components/PlanActions";
import { Eyebrow, Rich, Screen, TopBar } from "@/components/ui";
import { copy } from "@/content/copy";
import { money, schedule, type Analysis } from "@/lib/model";

const t = copy.plan;

/** The headline result in a sentence, first person ("I") or second ("you"). */
function leadLine(a: Analysis, voice: "me" | "you") {
  const l = voice === "me" ? t.shareLead : copy.email.lead;
  if (a.verdict === "more") return l.more(money(Math.round(a.monthlyGap / 50) * 50));
  if (a.verdict === "cut") return l.cut(Math.round(a.cutMinutes), Math.round(a.keepShare * 100));
  return l.right;
}

export default function Plan() {
  return (
    <NeedsData>
      {(a) => {
        const perHour = Math.round(a.limitPerHour);
        const s = schedule(a.limitPerHour);
        const rule = t.rule(perHour);
        const easy = t.easy(s.breakLen, s.every);
        const tasks = t.tasks(s.breakLen, s.every);
        return (
          <Screen>
            <TopBar back="/result" title={t.title} />

            <div className="flex flex-col gap-2 rounded-[18px] border border-money-line bg-money-bg p-5">
              <span className="text-xs font-semibold tracking-[0.08em] text-money">{t.ruleLabel}</span>
              <span className="font-display text-[28px] font-bold leading-tight">{rule}</span>
              <span className="text-[15px] text-soft">{easy}</span>
            </div>

            <div className="flex flex-col">
              <div className="mb-1.5">
                <Eyebrow>{t.setupLabel}</Eyebrow>
              </div>
              {tasks.map((task, i) => (
                <label key={i} className="flex min-h-[52px] items-center gap-3.5 border-b border-[#241e33] text-[15px] last:border-0">
                  <input type="checkbox" className="size-[22px] flex-none accent-money" />
                  <span>
                    <Rich text={task} />
                  </span>
                </label>
              ))}
            </div>

            <div className="mt-auto flex flex-col gap-3">
              <CommitCard rule={rule} easy={easy} tasks={[...tasks]} lead={leadLine(a, "you")} />
              <ShareButton text={`${leadLine(a, "me")} ${t.shareBody(rule, easy)}`} />
            </div>
          </Screen>
        );
      }}
    </NeedsData>
  );
}
