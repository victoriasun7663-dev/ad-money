"use client";

import { NeedsData } from "@/components/NeedsData";
import { Card, Eyebrow, Rich, Screen, TopBar } from "@/components/ui";
import { copy } from "@/content/copy";
import { money, streamMoney } from "@/lib/model";

const t = copy.details;

export default function Details() {
  return (
    <NeedsData>
      {(a) => {
        const limit = Math.round(a.limitAdMinutes);
        const usual = Math.round(a.usualAdMinutes);
        // Unrounded so the plain-words lines multiply out to the total shown.
        const extra = Math.max(0, Math.round((a.limitAdMinutes - a.usualAdMinutes) * 10) / 10);
        const drop = a.ratePer1k ? Math.round((1 - a.ratePastLimit / a.ratePer1k) * 100) : 0;
        const loads = [...new Set([20, usual, limit, limit + 10, limit + 20])].sort((x, y) => x - y);
        return (
          <Screen>
            <TopBar back="/result" title={t.title} />

            {a.verdict === "more" && (
              <Card className="flex flex-col gap-3">
                <Eyebrow>{t.plainLabel}</Eyebrow>
                <Row label={t.perMinute} value={`$${a.perMinute.toFixed(2)}`} />
                <Row label={t.extraMinutes} value={`× ${extra}`} />
                <Row label={t.streams} value={`× ${a.streamsPerMonth}`} />
                <div className="h-px bg-line" />
                <div className="flex justify-between text-[17px]">
                  <span>{t.total}</span>
                  <strong className="text-money">≈ {money(a.monthlyGap)}</strong>
                </div>
              </Card>
            )}

            <div className="flex flex-col gap-2.5">
              <Eyebrow>{t.whyLabel(Math.round(a.limitPerHour))}</Eyebrow>
              <p className="text-[15px] leading-relaxed text-soft">
                <Rich text={t.why(limit, drop)} strongClass="text-ink" />
              </p>
            </div>

            <Card className="py-1.5">
              <div className="pb-1.5 pt-3">
                <Eyebrow>{t.tableLabel}</Eyebrow>
              </div>
              {loads.map((m, i) => {
                const prev = i ? streamMoney(a, loads[i - 1]) : 0;
                const cur = streamMoney(a, m);
                const tag = m === limit ? t.rowBest : m === usual ? t.rowYou : "";
                return (
                  <div
                    key={m}
                    className={`flex justify-between border-b border-[#241e33] py-2.5 text-sm last:border-0 ${m === limit ? "font-semibold text-money" : ""}`}
                  >
                    <span>
                      {m} min{tag}
                    </span>
                    <span>
                      {money(cur)}
                      {m > limit && <span className="text-warn"> +{money(cur - prev)}</span>}
                    </span>
                  </div>
                );
              })}
            </Card>

            <details className="border-t border-[#241e33] pt-1">
              <summary className="flex min-h-11 cursor-pointer items-center text-[15px] font-semibold">{t.dailyToggle}</summary>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="text-xs text-muted">
                    <tr>
                      <th className="py-2">{t.dailyHeaders[0]}</th>
                      <th>{t.dailyHeaders[1]}</th>
                      <th>{t.dailyHeaders[2]}</th>
                      <th className="text-right">{t.dailyHeaders[3]}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {a.days.map((d, i) => (
                      <tr key={i} className="border-t border-[#241e33]">
                        <td className="py-2">{d.date ?? i + 1}</td>
                        <td>{d.viewers.toLocaleString()}</td>
                        <td className={d.adMinutes > limit ? "text-warn" : ""}>{d.adMinutes}</td>
                        <td className="text-right">{money(d.revenue)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </details>

            <p className="text-xs leading-relaxed text-faint">{t.disclaimer}</p>
          </Screen>
        );
      }}
    </NeedsData>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-[15px]">
      <span className="text-soft">{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
