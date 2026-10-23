"use client";

import { useState } from "react";
import { copy } from "@/content/copy";
import { downloadIcs, googleCalendarUrl, shareSummary } from "@/lib/share";
import { buttonPrimary, buttonSecondary } from "./ui";

const t = copy.plan;

type Status = "idle" | "sending" | "sent" | "invalid" | "error" | "off";

/** Email capture: sends the plan now and a 30-day check-in. Falls back to calendar. */
export function CommitCard({
  rule,
  easy,
  tasks,
  lead,
}: {
  rule: string;
  easy: string;
  tasks: string[];
  lead: string;
}) {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [checkIn, setCheckIn] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) return setStatus("invalid");
    setStatus("sending");
    try {
      const res = await fetch("/api/remind", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), website, rule, easy, tasks, lead }),
      });
      if (res.ok) {
        const data = await res.json();
        setCheckIn(data.checkIn ?? "");
        setStatus("sent");
      } else if (res.status === 503) {
        setStatus("off");
        setShowCalendar(true);
      } else if (res.status === 400) {
        setStatus("invalid");
      } else {
        setStatus("error");
        setShowCalendar(true);
      }
    } catch {
      setStatus("error");
      setShowCalendar(true);
    }
  }

  const reminder = { title: t.remindEvent.title, details: t.remindEvent.details(rule) };

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-line bg-panel p-4">
      <span className="text-xs font-semibold tracking-[0.08em] text-muted">{t.commitLabel}</span>
      <p className="text-[15px] text-soft">{t.commitBody}</p>

      {status === "sent" ? (
        <p role="status" className="rounded-xl border border-money-line bg-money-bg p-3 text-[15px] text-money">
          {t.emailSent(checkIn)}
        </p>
      ) : (
        <form onSubmit={submit} className="flex flex-col gap-2.5" noValidate>
          <label htmlFor="commit-email" className="sr-only">
            {t.emailLabel}
          </label>
          <input
            id="commit-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === "invalid") setStatus("idle");
            }}
            placeholder={t.emailPlaceholder}
            aria-invalid={status === "invalid"}
            aria-describedby="commit-msg"
            className="h-12 rounded-xl border border-[#3a3150] bg-panel-2 px-4 text-[16px] text-ink placeholder:text-faint focus:border-brand focus:outline-none"
          />
          {/* Honeypot: hidden from people, filled by bots. */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="hidden"
            aria-hidden="true"
          />
          <button type="submit" className={buttonPrimary} disabled={status === "sending"}>
            {status === "sending" ? t.emailSending : t.emailCta}
          </button>
          <p id="commit-msg" role={status === "idle" ? undefined : "alert"} className="text-center text-xs text-muted">
            {status === "invalid"
              ? t.emailInvalid
              : status === "error"
                ? t.emailError
                : status === "off"
                  ? t.emailOff
                  : t.emailFinePrint}
          </p>
        </form>
      )}

      {!showCalendar ? (
        status !== "sent" && (
          <button type="button" className="py-1 text-sm text-link" onClick={() => setShowCalendar(true)}>
            {t.calendarToggle}
          </button>
        )
      ) : (
        <div className="flex gap-2">
          <a
            href={googleCalendarUrl(reminder)}
            target="_blank"
            rel="noopener noreferrer"
            className={`${buttonSecondary} flex-1`}
          >
            {t.remindGoogle}
          </a>
          <button type="button" className={`${buttonSecondary} flex-1`} onClick={() => downloadIcs(reminder)}>
            {t.remindIcs}
          </button>
        </div>
      )}
    </div>
  );
}

/** Share sheet on phones, clipboard elsewhere. */
export function ShareButton({ text }: { text: string }) {
  const [note, setNote] = useState<string | null>(null);
  return (
    <div className="flex flex-col gap-1.5">
      <button
        type="button"
        className={buttonSecondary}
        onClick={async () => {
          const result = await shareSummary(t.shareTitle, text);
          setNote(result === "copied" ? t.shareCopied : result === "failed" ? t.shareFailed : null);
        }}
      >
        {t.sendManager}
      </button>
      {note && (
        <p role="status" className="text-center text-xs text-muted">
          {note}
        </p>
      )}
    </div>
  );
}
