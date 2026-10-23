// The money model. Everything the UI shows comes from `analyze()`.
// Plain-language names on purpose: "ad limit" replaces "sweet spot".

export type StreamDay = {
  date?: string;
  viewers: number; // average viewers
  adMinutes: number; // ad minutes run that stream
  revenue: number; // ad + Turbo dollars
  hours?: number; // stream length
};

export type Verdict = "more" | "cut" | "right";

export type Analysis = {
  days: StreamDay[];
  periodDays: number; // calendar days the export covers
  streamsPerMonth: number;
  viewers: number; // median avg viewers
  hours: number; // median stream length
  usualAdMinutes: number; // median ad minutes per stream
  limitAdMinutes: number; // ad limit (where extra ads stop paying)
  ratePer1k: number; // $ per 1k viewers per ad-minute, up to the limit
  ratePastLimit: number; // same, past the limit
  perMinute: number; // $ one ad-minute pays at your viewers, up to the limit
  perMinutePastLimit: number;
  usualPerHour: number;
  limitPerHour: number;
  verdict: Verdict;
  monthlyGap: number; // + dollars/month for "more"
  cutMinutes: number; // minutes/stream to drop for "cut"
  keepShare: number; // share of ad money kept after cutting (0-1)
};

const median = (xs: number[]) => {
  const s = [...xs].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};

// Money per 1k viewers for a stream, as a function of ad minutes:
// linear up to the limit, then a flatter line. We try each candidate
// limit and keep the one with the smallest squared error.
function fitLimit(points: { x: number; y: number }[]) {
  const xs = [...new Set(points.map((p) => Math.round(p.x)))].sort((a, b) => a - b);
  let best = { limit: Math.max(...points.map((p) => p.x)), rate: 0, after: 0, err: Infinity };
  for (const limit of xs.slice(2, -1)) {
    const lo = points.filter((p) => p.x <= limit);
    const hi = points.filter((p) => p.x > limit);
    if (lo.length < 3 || hi.length < 2) continue;
    // y = rate * x through the origin, up to the limit
    const rate = lo.reduce((s, p) => s + p.x * p.y, 0) / lo.reduce((s, p) => s + p.x * p.x, 0);
    // y = rate*limit + after*(x - limit) past it
    const base = rate * limit;
    const after = Math.max(
      0,
      hi.reduce((s, p) => s + (p.x - limit) * (p.y - base), 0) /
        hi.reduce((s, p) => s + (p.x - limit) ** 2, 0),
    );
    const err =
      lo.reduce((s, p) => s + (p.y - rate * p.x) ** 2, 0) +
      hi.reduce((s, p) => s + (p.y - base - after * (p.x - limit)) ** 2, 0);
    if (err < best.err) best = { limit, rate, after, err };
  }
  if (best.err === Infinity) {
    // Not enough spread to find a limit: one straight line, limit = most ads seen.
    const rate = points.reduce((s, p) => s + p.x * p.y, 0) / points.reduce((s, p) => s + p.x * p.x, 0);
    best = { limit: Math.max(...points.map((p) => p.x)), rate, after: rate, err: 0 };
  }
  return best;
}

/** `periodDays` = how many calendar days the export covers (30, 90, …). */
export function analyze(days: StreamDay[], periodDays = 30): Analysis {
  // One decimal, so the "See the math" lines multiply out to the total.
  const streamsPerMonth = Math.round(((days.length * 30) / Math.max(periodDays, days.length)) * 10) / 10;
  const points = days.map((d) => ({ x: d.adMinutes, y: d.revenue / (d.viewers / 1000) }));
  const fit = fitLimit(points);

  const viewers = median(days.map((d) => d.viewers));
  const hours = median(days.map((d) => d.hours ?? 4));
  const usualAdMinutes = median(days.map((d) => d.adMinutes));
  const perMinute = (viewers / 1000) * fit.rate;
  const perMinutePastLimit = (viewers / 1000) * fit.after;

  const gapMinutes = fit.limit - usualAdMinutes;
  let verdict: Verdict = "right";
  if (gapMinutes > 2) verdict = "more";
  else if (gapMinutes < -2) verdict = "cut";

  const monthlyGap = verdict === "more" ? gapMinutes * perMinute * streamsPerMonth : 0;
  const cutMinutes = verdict === "cut" ? -gapMinutes : 0;
  const nowMoney = fit.limit * perMinute + cutMinutes * perMinutePastLimit;
  const keepShare = verdict === "cut" ? (fit.limit * perMinute) / nowMoney : 1;

  return {
    days,
    periodDays,
    streamsPerMonth,
    viewers,
    hours,
    usualAdMinutes,
    limitAdMinutes: fit.limit,
    ratePer1k: fit.rate,
    ratePastLimit: fit.after,
    perMinute,
    perMinutePastLimit,
    usualPerHour: usualAdMinutes / hours,
    limitPerHour: fit.limit / hours,
    verdict,
    monthlyGap,
    cutMinutes,
    keepShare,
  };
}

/** Money for one stream at a given ad load. */
export function streamMoney(a: Analysis, adMinutes: number, viewers = a.viewers) {
  const k = viewers / 1000;
  const under = Math.min(adMinutes, a.limitAdMinutes);
  const over = Math.max(0, adMinutes - a.limitAdMinutes);
  return k * (under * a.ratePer1k + over * a.ratePastLimit);
}

/** A friendly schedule for a per-hour target, e.g. 9 → "3 minutes every 20 minutes". */
export function schedule(perHour: number) {
  const target = Math.round(perHour);
  for (const breakLen of [3, 2, 4, 1, 5]) {
    const breaks = target / breakLen;
    if (Number.isInteger(breaks) && breaks >= 1 && breaks <= 6) {
      return { breakLen, every: Math.round(60 / breaks) };
    }
  }
  return { breakLen: 3, every: Math.round(60 / Math.max(1, target / 3)) };
}

export const money = (n: number) =>
  "$" + Math.round(n).toLocaleString("en-US");
