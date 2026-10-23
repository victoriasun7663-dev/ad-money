import { copy } from "@/content/copy";

// "Too few / Best / Too many" bar. Scale runs 0–15 ad-minutes per hour.
const MAX = 15;
const t = copy.result.meter;

export function AdMeter({ you, best }: { you: number; best: number }) {
  const pct = (v: number) => Math.min(98, Math.max(2, (v / MAX) * 100));
  const lo = Math.max(0, best - 1);
  const hi = Math.min(MAX, best + 1);
  return (
    <div className="flex flex-col gap-3.5 rounded-2xl border border-line bg-panel p-[18px]">
      <div className="flex items-baseline justify-between">
        <strong className="text-[15px]">{t.title}</strong>
        <span className="text-[13px] text-muted">{t.unit}</span>
      </div>
      <div className="relative h-14" role="img" aria-label={t.ariaLabel(you.toFixed(1), Math.round(best))}>
        <div className="absolute inset-x-0 top-[22px] flex h-3 overflow-hidden rounded-md">
          <div className="bg-[#3a3150]" style={{ flex: lo }} />
          <div className="bg-money" style={{ flex: hi - lo }} />
          <div className="bg-warn-dim" style={{ flex: MAX - hi }} />
        </div>
        <div className="absolute top-0 flex -translate-x-1/2 flex-col items-center" style={{ left: `${pct(you)}%` }}>
          <span className="whitespace-nowrap rounded-md bg-[#2a2240] px-1.5 py-0.5 text-xs font-semibold">
            {t.you(you.toFixed(1))}
          </span>
          <div className="mt-0.5 h-[26px] w-[3px] rounded-sm bg-ink" />
        </div>
      </div>
      <div className="flex text-xs text-muted">
        <span style={{ flex: lo }}>{t.tooFew}</span>
        <span className="whitespace-nowrap font-semibold text-money" style={{ flex: hi - lo }}>
          {t.best(Math.round(best))}
        </span>
        <span className="text-right" style={{ flex: MAX - hi }}>
          {t.tooMany}
        </span>
      </div>
    </div>
  );
}
