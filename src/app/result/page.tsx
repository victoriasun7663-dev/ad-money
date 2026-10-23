"use client";

import Link from "next/link";
import { AdMeter } from "@/components/AdMeter";
import { NeedsData } from "@/components/NeedsData";
import { Card, Rich, Screen, TopBar, buttonPrimary } from "@/components/ui";
import { copy } from "@/content/copy";
import { money, type Analysis } from "@/lib/model";
import { useAdMoney } from "@/lib/store";

const t = copy.result;

function Headline({ a }: { a: Analysis }) {
  if (a.verdict === "more") {
    return (
      <>
        <span className="text-[15px] text-soft">{t.more.kicker}</span>
        <span className="font-display text-[64px] font-bold leading-none tracking-tight text-money">
          {t.more.big(money(Math.round(a.monthlyGap / 50) * 50))}
        </span>
        <span className="font-display text-[22px] font-medium">{t.more.unit}</span>
        <span className="mt-1 text-[15px] text-muted">
          <Rich text={t.more.yearly(money(Math.round((a.monthlyGap * 12) / 100) * 100))} strongClass="text-ink" />
        </span>
      </>
    );
  }
  if (a.verdict === "cut") {
    return (
      <>
        <span className="text-[15px] text-soft">{t.cut.kicker}</span>
        <span className="font-display text-[64px] font-bold leading-none tracking-tight text-warn">
          {t.cut.big(Math.round(a.cutMinutes))}
        </span>
        <span className="font-display text-[22px] font-medium">{t.cut.unit}</span>
        <span className="mt-1 text-[15px] text-muted">
          <Rich text={t.cut.keep(Math.round(a.keepShare * 100))} strongClass="text-ink" />
        </span>
      </>
    );
  }
  return (
    <>
      <span className="text-[15px] text-soft">{t.right.kicker}</span>
      <span className="font-display text-[48px] font-bold leading-none text-money">{t.right.big}</span>
      <span className="mt-1 text-[15px] text-muted">{t.right.body}</span>
    </>
  );
}

export default function Result() {
  const { source } = useAdMoney();
  return (
    <NeedsData>
      {(a) => (
        <Screen>
          <TopBar back="/upload" step={[2, 2]} />
          <div className="flex flex-col gap-1.5">
            <Headline a={a} />
          </div>

          <AdMeter you={a.usualPerHour} best={a.limitPerHour} />

          <div className="flex gap-2.5">
            <Card className="flex flex-1 flex-col gap-1">
              <span className="text-xs text-muted">{t.changeLabel}</span>
              <strong className="text-[15px]">
                {a.verdict === "right"
                  ? t.changeNone
                  : t.change(a.verdict === "more" ? "+" : "−", Math.abs(Math.round(a.limitPerHour - a.usualPerHour)))}
              </strong>
            </Card>
            <Card className="flex flex-1 flex-col gap-1">
              <span className="text-xs text-muted">{t.effortLabel}</span>
              <strong className="text-[15px]">{t.effort}</strong>
            </Card>
          </div>

          <div className="mt-auto flex flex-col gap-2.5">
            <Link href="/plan" className={buttonPrimary}>
              {t.ctaPlan}
            </Link>
            <Link href="/details" className="py-2 text-center text-sm text-link">
              {t.ctaMath}
            </Link>
            <span className="text-center text-xs text-faint">
              {t.footer(source === "sample" ? "sample" : "you", money(a.viewers).slice(1), a.days.length)}
            </span>
          </div>
        </Screen>
      )}
    </NeedsData>
  );
}
