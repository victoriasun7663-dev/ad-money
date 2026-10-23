"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { copy } from "@/content/copy";
import { useAdMoney } from "@/lib/store";
import { Eyebrow, Screen, buttonPrimary, buttonSecondary } from "@/components/ui";

const t = copy.hook;

// Icons pair with copy.hook.perks by position.
const perkIcons = [
  { color: "#4ADE9A", d: "M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" },
  { color: "#C9A9FF", d: "M3 12h4l3-8 4 16 3-8h4" },
  { color: "#FFB357", d: "M20 6 9 17l-5-5" },
];

export default function Home() {
  const { loadSample } = useAdMoney();
  const router = useRouter();

  return (
    <Screen>
      <div className="flex items-center gap-2">
        <div className="size-2.5 rounded-full bg-money" />
        <span className="font-display font-bold tracking-wide">{copy.brand.name}</span>
        <span className="ml-auto text-[13px] text-muted">{copy.brand.tagline}</span>
      </div>

      <div className="mt-3 flex flex-col gap-3.5">
        <h1 className="font-display text-[38px] font-bold leading-[1.08] tracking-tight">
          {t.headline} <span className="text-brand">{t.headlineAccent}</span>
        </h1>
        <p className="text-[17px] leading-relaxed text-soft">{t.sub}</p>
      </div>

      <div className="flex flex-col gap-3">
        <Eyebrow>{t.perksLabel}</Eyebrow>
        {t.perks.map((p, i) => (
          <div key={p.title} className="flex items-start gap-3.5 rounded-2xl border border-line bg-panel px-4 py-3.5">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={perkIcons[i].color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d={perkIcons[i].d} />
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
          {t.ctaPrimary}
        </Link>
        <button
          type="button"
          className={buttonSecondary}
          onClick={() => {
            loadSample();
            router.push("/result");
          }}
        >
          {t.ctaExample}
        </button>
        <p className="text-center text-[13px] text-muted">{t.privacy}</p>
      </div>
    </Screen>
  );
}
