"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAdMoney } from "@/lib/store";
import { Eyebrow, Screen, buttonPrimary, buttonSecondary } from "@/components/ui";

const perks = [
  { color: "#4ADE9A", d: "M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6", title: "Your money gap", body: "How much more you could make each month" },
  { color: "#C9A9FF", d: "M3 12h4l3-8 4 16 3-8h4", title: "Your best ad amount", body: "Not too few, not so many chat leaves" },
  { color: "#FFB357", d: "M20 6 9 17l-5-5", title: "One setting to change", body: "Set it once. Twitch does the rest." },
];

export default function Home() {
  const { loadSample } = useAdMoney();
  const router = useRouter();

  return (
    <Screen>
      <div className="flex items-center gap-2">
        <div className="size-2.5 rounded-full bg-money" />
        <span className="font-display font-bold tracking-wide">Ad Money</span>
        <span className="ml-auto text-[13px] text-muted">For Twitch streamers</span>
      </div>

      <div className="mt-3 flex flex-col gap-3.5">
        <h1 className="font-display text-[38px] font-bold leading-[1.08] tracking-tight">
          Are your ads paying you, or just <span className="text-brand">annoying chat?</span>
        </h1>
        <p className="text-[17px] leading-relaxed text-soft">
          Upload one file from Twitch. In 2 minutes you&apos;ll know, in dollars, what to change.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <Eyebrow>YOU GET</Eyebrow>
        {perks.map((p) => (
          <div key={p.title} className="flex items-start gap-3.5 rounded-2xl border border-line bg-panel px-4 py-3.5">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={p.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d={p.d} />
            </svg>
            <div className="flex flex-col gap-0.5">
              <strong className="text-[15px]">{p.title}</strong>
              <span className="text-sm text-muted">{p.body}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto flex flex-col gap-3">
        <Link href="/upload" className={buttonPrimary}>
          Check my channel
        </Link>
        <button
          type="button"
          className={buttonSecondary}
          onClick={() => {
            loadSample();
            router.push("/result");
          }}
        >
          See an example first
        </button>
        <p className="text-center text-[13px] text-muted">Your file never leaves your device</p>
      </div>
    </Screen>
  );
}
