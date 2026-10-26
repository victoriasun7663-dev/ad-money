// Manager view. Example rows for now — real rows will come from each
// creator's shared result once accounts/sharing exist.
import { SupportLine } from "@/components/ui";
import { copy } from "@/content/copy";

const t = copy.manager;

const rows = [
  { name: "[Creator A]", viewers: "1,983", now: "6.7 min", best: "9 min", gap: "+$1,100", tone: "text-money", action: t.actions.sendPlan },
  { name: "[Creator B]", viewers: "4,210", now: "5.0 min", best: "8 min", gap: "+$1,620", tone: "text-money", action: t.actions.sendPlan },
  { name: "[Creator C]", viewers: "640", now: "7.5 min", best: "9 min", gap: "+$520", tone: "text-money", action: t.actions.sendPlan },
  { name: "[Creator D]", viewers: "2,300", now: "14 min", best: "9 min", gap: t.gapCut(24), tone: "text-warn", action: t.actions.sendPlan },
  { name: "[Creator E]", viewers: "1,150", now: "—", best: "—", gap: t.gapStale, tone: "text-muted", action: t.actions.askFile },
];

const tiles = [
  { ...t.tiles.money, value: "+$3,240", money: true },
  { ...t.tiles.tooMany, value: "1", warn: true },
  { ...t.tiles.stale, value: "1" },
];

export default function Manager() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8">
      <div className="flex flex-wrap items-center gap-3">
        <div className="size-2.5 rounded-full bg-money" />
        <span className="font-display text-lg font-bold">{copy.brand.name}</span>
        <span className="text-sm text-muted">{t.label}</span>
        <button type="button" disabled className="ml-auto h-11 rounded-xl bg-brand px-4 font-semibold text-brand-ink">
          {t.addCreator}
        </button>
      </div>

      <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
        {tiles.map((tile) => (
          <div
            key={tile.label}
            className={`flex flex-col gap-1.5 rounded-2xl border p-5 ${"money" in tile ? "border-money-line bg-money-bg" : "border-line bg-panel"}`}
          >
            <span className="text-[13px] text-muted">{tile.label}</span>
            <span className={`font-display text-4xl font-bold ${"money" in tile ? "text-money" : "warn" in tile ? "text-warn" : ""}`}>
              {tile.value}
              {"unit" in tile && <span className="text-lg text-muted">{tile.unit}</span>}
            </span>
            <span className="text-[13px] text-muted">{tile.note}</span>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto rounded-2xl border border-line bg-panel">
        <table className="w-full min-w-[760px] border-collapse text-[15px]">
          <thead>
            <tr className="text-left text-xs tracking-wider text-muted">
              {t.headers.map((h, i) => (
                <th key={h} className={`${i === 0 || i === t.headers.length - 1 ? "px-5" : "px-3"} py-4 font-semibold`}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.name} className="border-t border-[#241e33]">
                <td className="px-5 py-4 font-semibold">{r.name}</td>
                <td className="px-3 py-4">{r.viewers}</td>
                <td className="px-3 py-4">{r.now}</td>
                <td className="px-3 py-4 text-money">{r.best}</td>
                <td className={`px-3 py-4 font-semibold ${r.tone}`}>{r.gap}</td>
                <td className="px-5 py-4 text-link">{r.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <span className="text-xs text-faint">{t.footnote}</span>
      <SupportLine />
    </main>
  );
}
