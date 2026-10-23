import type { StreamDay } from "./model";

// Reads a Twitch Channel Analytics export. Column names shift over time,
// so we match on loose keywords instead of exact headers.

function splitRow(line: string) {
  const out: string[] = [];
  let cur = "";
  let quoted = false;
  for (const ch of line) {
    if (ch === '"') quoted = !quoted;
    else if (ch === "," && !quoted) {
      out.push(cur);
      cur = "";
    } else cur += ch;
  }
  out.push(cur);
  return out.map((s) => s.trim());
}

const num = (s: string | undefined) => {
  const n = parseFloat((s ?? "").replace(/[$,\s]/g, ""));
  return Number.isFinite(n) ? n : 0;
};

const find = (headers: string[], ...needles: RegExp[]) =>
  headers.findIndex((h) => needles.every((n) => n.test(h)));

export type ParseResult =
  | { ok: true; days: StreamDay[]; skipped: number }
  | { ok: false; error: string };

export function parseTwitchCsv(text: string): ParseResult {
  const lines = text.split(/\r?\n/).filter((l) => l.trim());
  if (lines.length < 2) return { ok: false, error: "That file looks empty." };

  const headers = splitRow(lines[0]).map((h) => h.toLowerCase());
  const col = {
    date: find(headers, /date|day/),
    viewers: find(headers, /av(g|erage)/, /viewer/),
    adMinutes: find(headers, /ad/, /(break|minute|time)/),
    adRevenue: find(headers, /^ad.*revenue|ads? revenue/),
    turbo: find(headers, /turbo/),
    minutes: find(headers, /(minutes|time|hours) streamed|stream.*(time|length)/),
  };

  const missing = [
    col.viewers < 0 && "average viewers",
    col.adMinutes < 0 && "ad minutes",
    col.adRevenue < 0 && "ad revenue",
  ].filter(Boolean);
  if (missing.length) {
    return {
      ok: false,
      error: `We couldn't find ${missing.join(", ")} in this file. Make sure it's the Channel Analytics export.`,
    };
  }

  const days: StreamDay[] = [];
  let skipped = 0;
  for (const line of lines.slice(1)) {
    const r = splitRow(line);
    const viewers = num(r[col.viewers]);
    const adMinutes = num(r[col.adMinutes]);
    const revenue = num(r[col.adRevenue]) + (col.turbo >= 0 ? num(r[col.turbo]) : 0);
    if (!viewers || !adMinutes || !revenue) {
      skipped++;
      continue;
    }
    const raw = col.minutes >= 0 ? num(r[col.minutes]) : 0;
    const hours = raw ? (headers[col.minutes].includes("hour") ? raw : raw / 60) : undefined;
    days.push({ date: col.date >= 0 ? r[col.date] : undefined, viewers, adMinutes, revenue, hours });
  }

  if (days.length < 5) {
    return { ok: false, error: "We need at least 5 stream days with ads to give you a real answer." };
  }
  return { ok: true, days, skipped };
}
