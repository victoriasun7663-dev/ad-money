"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { parseTwitchCsv } from "@/lib/csv";
import { useAdMoney } from "@/lib/store";
import { Screen, TopBar, buttonSecondary } from "@/components/ui";

const steps = [
  <>Go to <strong>dashboard.twitch.tv</strong> and open <strong>Analytics</strong></>,
  <>Pick <strong>Last 30 days</strong></>,
  <>Click <strong>Export</strong>. A file downloads.</>,
];

export default function Upload() {
  const { setDays, loadSample } = useAdMoney();
  const router = useRouter();
  const input = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  async function handle(file: File | undefined) {
    if (!file) return;
    const result = parseTwitchCsv(await file.text());
    if (!result.ok) return setError(result.error);
    setDays(result.days, "upload");
    router.push("/result");
  }

  return (
    <Screen>
      <TopBar back="/" step={[1, 2]} />

      <div className="flex flex-col gap-2">
        <h1 className="font-display text-3xl font-bold leading-tight">Grab your Twitch file</h1>
        <p className="text-soft">About 1 minute. Easiest on a computer.</p>
      </div>

      <ol className="flex flex-col gap-2.5">
        {steps.map((s, i) => (
          <li key={i} className="flex items-center gap-3.5 rounded-2xl border border-line bg-panel p-3.5 text-[15px]">
            <span className="flex size-[30px] flex-none items-center justify-center rounded-full bg-[#2a2240] text-sm font-semibold">
              {i + 1}
            </span>
            <span>{s}</span>
          </li>
        ))}
      </ol>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handle(e.dataTransfer.files[0]);
        }}
        className={`flex flex-col items-center gap-3 rounded-[18px] border-2 border-dashed px-5 py-7 text-center ${
          dragging ? "border-brand bg-[#1d1730]" : "border-[#4a3f63] bg-panel-2"
        }`}
      >
        <strong>Drop the file here</strong>
        <button
          type="button"
          onClick={() => input.current?.click()}
          className="h-11 rounded-xl bg-brand px-5 text-[15px] font-semibold text-brand-ink"
        >
          Choose file
        </button>
        <input ref={input} type="file" accept=".csv,text/csv" className="hidden" onChange={(e) => handle(e.target.files?.[0])} />
        <span className="text-[13px] text-muted">It ends in .csv</span>
      </div>

      {error && (
        <p role="alert" className="rounded-xl border border-warn-dim bg-[#241a10] p-3 text-sm text-warn">
          {error}
        </p>
      )}

      <div className="mt-auto flex flex-col gap-2.5">
        {/* Slot for Twitch login. Note: Twitch's API doesn't expose ad revenue, so this may still need the CSV. */}
        <button type="button" disabled className={`${buttonSecondary} text-muted`}>
          Connect with Twitch · coming soon
        </button>
        <button
          type="button"
          className="py-2 text-sm text-link"
          onClick={() => {
            loadSample();
            router.push("/result");
          }}
        >
          No file? Try an example channel
        </button>
      </div>
    </Screen>
  );
}
