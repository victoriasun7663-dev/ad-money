import type { StreamDay } from "./model";

// Example channel: ~2k viewers, usually runs ~32 ad-min per ~4.8h stream.
// Pays ~$3.15 per 1k viewers per ad-minute up to ~43 min, much less after.
const raw: [string, number, number, number][] = [
  // date, avg viewers, ad minutes, hours
  ["Sep 3", 1920, 28, 4.5],
  ["Sep 4", 2050, 32, 5.0],
  ["Sep 6", 1880, 24, 4.2],
  ["Sep 8", 2110, 36, 5.1],
  ["Sep 10", 1990, 30, 4.8],
  ["Sep 11", 1960, 33, 4.9],
  ["Sep 13", 2200, 40, 5.4],
  ["Sep 15", 1850, 20, 4.0],
  ["Sep 16", 2010, 31, 4.7],
  ["Sep 18", 1970, 34, 4.8],
  ["Sep 19", 2080, 52, 5.2],
  ["Sep 21", 1940, 29, 4.6],
  ["Sep 22", 2030, 43, 5.0],
  ["Sep 23", 1900, 58, 4.9],
  ["Sep 25", 1990, 68, 5.3],
  ["Sep 26", 2060, 35, 4.8],
];

export const SAMPLE_DAYS: StreamDay[] = raw.map(([date, viewers, adMinutes, hours]) => {
  const k = viewers / 1000;
  const under = Math.min(adMinutes, 43);
  const over = Math.max(0, adMinutes - 43);
  const wobble = 1 + (((adMinutes * 7) % 5) - 2) / 100; // ±2%, deterministic
  const revenue = k * (under * 3.15 + over * 0.9) * wobble;
  return { date, viewers, adMinutes, hours, revenue: Math.round(revenue * 100) / 100 };
});
