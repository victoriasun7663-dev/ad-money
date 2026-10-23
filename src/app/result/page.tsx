"use client";

import Link from "next/link";
import { AdMeter } from "@/components/AdMeter";
import { NeedsData } from "@/components/NeedsData";
import { Card, Screen, TopBar, buttonPrimary } from "@/components/ui";
import { money, type Analysis } from "@/lib/model";
import { useAdMoney } from "@/lib/store";

function Headline({ a }: { a: Analysis }) {
  if (a.verdict === "more") {
    return (
      <>
        <span className="text-[15px] text-soft">You&apos;re leaving money on the table.</span>
        <span className="font-display text-[64px] font-bold leading-none tracking-tight text-money">
          +{money(Math.round(a.monthlyGap / 50) * 50)}
        </span>
        <span className="font-display text-[22px] font-medium">more every month</span>
        <span className="mt-1 text-[15px] text-muted">
          That&apos;s about <strong className="text-ink">{money(Math.round((a.monthlyGap * 12) / 100) * 100)} a year</strong>, from ads
          you&apos;re not running yet.
        </span>
      </>
    );
  }
  if (a.verdict === "cut") {
    return (
      <>
        <span className="text-[15px] text-soft">Good news: you can run fewer ads.</span>
        <span className="font-display text-[64px] font-bold leading-none tracking-tight text-warn">
          −{Math.round(a.cutMinutes)} min
        </span>
        <span className="font-display text-[22px] font-medium">of ads per stream</span>
        <span className="mt-1 text-[15px] text-muted">
          Those last minutes barely pay. Cut them and you{" "}
          <strong className="text-ink">keep {Math.round(a.keepShare * 100)}% of your ad money</strong> with fewer interruptions.
        </span>
      </>
    );
  }
  return (
    <>
      <span className="text-[15px] text-soft">Nice. You&apos;re already there.</span>
      <span className="font-display text-[48px] font-bold leading-none text-money">Just right</span>
      <span className="mt-1 text-[15px] text-muted">
        Your ads are at the best level for your channel. More viewers is now your biggest lever.
      </span>
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
              <span className="text-xs text-muted">THE CHANGE</span>
              <strong className="text-[15px]">
                {a.verdict === "right"
                  ? "Nothing to change"
                  : `${a.verdict === "more" ? "+" : "−"}${Math.abs(Math.round(a.limitPerHour - a.usualPerHour))} min of ads each hour`}
              </strong>
            </Card>
            <Card className="flex flex-1 flex-col gap-1">
              <span className="text-xs text-muted">THE EFFORT</span>
              <strong className="text-[15px]">1 setting, 2 minutes</strong>
            </Card>
          </div>

          <div className="mt-auto flex flex-col gap-2.5">
            <Link href="/plan" className={buttonPrimary}>
              Show me what to change
            </Link>
            <Link href="/details" className="py-2 text-center text-sm text-link">
              How did you get this number?
            </Link>
            <span className="text-center text-xs text-faint">
              {source === "sample" ? "Example channel" : "Your channel"} · {money(a.viewers).slice(1)} avg viewers · {a.days.length} streams
            </span>
          </div>
        </Screen>
      )}
    </NeedsData>
  );
}
