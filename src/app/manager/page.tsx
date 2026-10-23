// Manager view. Example rows for now — real rows will come from each
// creator's shared result once accounts/sharing exist.

const rows = [
  { name: "[Creator A]", viewers: "1,983", now: "6.7 min", best: "9 min", gap: "+$1,100", tone: "text-money", action: "Send plan" },
  { name: "[Creator B]", viewers: "4,210", now: "5.0 min", best: "8 min", gap: "+$1,620", tone: "text-money", action: "Send plan" },
  { name: "[Creator C]", viewers: "640", now: "7.5 min", best: "9 min", gap: "+$520", tone: "text-money", action: "Send plan" },
  { name: "[Creator D]", viewers: "2,300", now: "14 min", best: "9 min", gap: "Cut 24 min", tone: "text-warn", action: "Send plan" },
  { name: "[Creator E]", viewers: "1,150", now: "—", best: "—", gap: "Old file", tone: "text-muted", action: "Ask for new file" },
];

const tiles = [
  { label: "Money on the table", value: "+$3,240", unit: " /mo", note: "across 3 creators running too few ads", money: true },
  { label: "Running too many ads", value: "1", note: "can cut ads and keep most of the money", warn: true },
  { label: "Need a fresh file", value: "1", note: "last upload over 30 days ago" },
];

export default function Manager() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8">
      <div className="flex flex-wrap items-center gap-3">
        <div className="size-2.5 rounded-full bg-money" />
        <span className="font-display text-lg font-bold">Ad Money</span>
        <span className="text-sm text-muted">· Manager</span>
        <button type="button" disabled className="ml-auto h-11 rounded-xl bg-brand px-4 font-semibold text-brand-ink">
          Add a creator
        </button>
      </div>

      <div className="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
        {tiles.map((t) => (
          <div
            key={t.label}
            className={`flex flex-col gap-1.5 rounded-2xl border p-5 ${t.money ? "border-money-line bg-money-bg" : "border-line bg-panel"}`}
          >
            <span className="text-[13px] text-muted">{t.label}</span>
            <span className={`font-display text-4xl font-bold ${t.money ? "text-money" : t.warn ? "text-warn" : ""}`}>
              {t.value}
              {t.unit && <span className="text-lg text-muted">{t.unit}</span>}
            </span>
            <span className="text-[13px] text-muted">{t.note}</span>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto rounded-2xl border border-line bg-panel">
        <table className="w-full min-w-[760px] border-collapse text-[15px]">
          <thead>
            <tr className="text-left text-xs tracking-wider text-muted">
              <th className="px-5 py-4 font-semibold">CREATOR</th>
              <th className="px-3 py-4 font-semibold">AVG VIEWERS</th>
              <th className="px-3 py-4 font-semibold">ADS / HOUR NOW</th>
              <th className="px-3 py-4 font-semibold">BEST</th>
              <th className="px-3 py-4 font-semibold">MONTHLY GAP</th>
              <th className="px-5 py-4 font-semibold">NEXT STEP</th>
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
      <span className="text-xs text-faint">Example data. Each creator&apos;s numbers come from their own 30-day Twitch file.</span>
    </main>
  );
}
