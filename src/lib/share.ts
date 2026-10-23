// Reminder and share helpers for the plan screen. No server: the reminder is a
// calendar event the browser hands off, and sharing uses the OS share sheet
// or the clipboard.

const SITE = "https://ad-money.vercel.app";

/** All-day date `days` from now, as YYYYMMDD. */
function dayFromNow(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10).replace(/-/g, "");
}

export type Reminder = { title: string; details: string };

export function googleCalendarUrl(r: Reminder, days = 30) {
  const start = dayFromNow(days);
  const end = dayFromNow(days + 1);
  const p = new URLSearchParams({
    action: "TEMPLATE",
    text: r.title,
    details: `${r.details}\n\n${SITE}`,
    dates: `${start}/${end}`,
  });
  return `https://calendar.google.com/calendar/render?${p}`;
}

/** Downloads an .ics file (Apple Calendar, Outlook, most phone calendars). */
export function downloadIcs(r: Reminder, days = 30) {
  const esc = (s: string) => s.replace(/[\\,;]/g, (c) => `\\${c}`).replace(/\n/g, "\\n");
  const stamp = new Date().toISOString().replace(/[-:]/g, "").slice(0, 15) + "Z";
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Ad Money//EN",
    "BEGIN:VEVENT",
    `UID:${stamp}-ad-money@ad-money.vercel.app`,
    `DTSTAMP:${stamp}`,
    `DTSTART;VALUE=DATE:${dayFromNow(days)}`,
    `DTEND;VALUE=DATE:${dayFromNow(days + 1)}`,
    `SUMMARY:${esc(r.title)}`,
    `DESCRIPTION:${esc(`${r.details}\n\n${SITE}`)}`,
    `URL:${SITE}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = "ad-money-check-in.ics";
  a.click();
  URL.revokeObjectURL(url);
}

/** Opens the share sheet where there is one; otherwise copies to the clipboard. */
export async function shareSummary(title: string, text: string): Promise<"shared" | "copied" | "failed"> {
  const full = `${text}\n\n${SITE}`;
  if (typeof navigator !== "undefined" && navigator.share) {
    try {
      await navigator.share({ title, text: full });
      return "shared";
    } catch (e) {
      // User closed the sheet: not an error worth showing.
      if (e instanceof DOMException && e.name === "AbortError") return "failed";
    }
  }
  try {
    await navigator.clipboard.writeText(full);
    return "copied";
  } catch {
    return "failed";
  }
}
