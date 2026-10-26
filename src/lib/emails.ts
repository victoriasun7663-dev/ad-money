import { copy } from "@/content/copy";

// Builds the two emails from the plan screen. Plain inline-styled HTML so it
// renders the same in Gmail, Apple Mail and Outlook.

const SITE = "https://ad-money.vercel.app";
const t = copy.email;

export type PlanPayload = {
  lead: string; // e.g. "I could make about $950 more a month…" reworded for "you"
  rule: string; // "Run 9 minutes of ads every hour"
  easy: string; // "Easy version: a 3-minute break every 20 minutes."
  tasks: string[]; // checklist, may contain **bold**
};

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const bold = (s: string) => esc(s).replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
const plain = (s: string) => s.replace(/\*\*/g, "");

function shell(body: string) {
  return `<!doctype html><html><body style="margin:0;background:#f4f1fa;font-family:Inter,Arial,sans-serif;color:#140f1f">
<div style="max-width:520px;margin:0 auto;padding:32px 24px">
<p style="font-weight:700;font-size:16px;margin:0 0 24px">Ad Money</p>
${body}
<p style="margin:32px 0 0"><a href="${SITE}" style="display:inline-block;background:#b48cff;color:#140f1f;font-weight:600;text-decoration:none;padding:14px 22px;border-radius:12px">${esc(t.cta)}</a></p>
<p style="font-size:12px;color:#6b6280;margin:32px 0 0">${esc(t.footer)}</p>
<p style="font-size:12px;color:#6b6280;margin:8px 0 0">${esc(copy.support.prompt)} <a href="mailto:${copy.support.email}" style="color:#6b6280">${copy.support.email}</a></p>
</div></body></html>`;
}

export function planEmail(p: PlanPayload, checkInDate: string) {
  const steps = p.tasks.map((s) => `<li style="margin:0 0 8px">${bold(s)}</li>`).join("");
  const html = shell(`
<p style="font-size:16px;line-height:1.5;margin:0 0 16px">${esc(p.lead)} ${esc(t.planIntro)}</p>
<div style="background:#16241e;color:#f4f1fa;border-radius:16px;padding:20px;margin:0 0 20px">
<p style="font-size:12px;letter-spacing:.08em;color:#4ade9a;margin:0 0 8px;font-weight:600">${esc(t.ruleLabel.toUpperCase())}</p>
<p style="font-size:22px;font-weight:700;margin:0 0 6px">${esc(p.rule)}</p>
<p style="font-size:14px;color:#c8c0d8;margin:0">${esc(p.easy)}</p>
</div>
<p style="font-size:12px;letter-spacing:.08em;color:#6b6280;margin:0 0 8px;font-weight:600">${esc(t.stepsLabel.toUpperCase())}</p>
<ol style="font-size:15px;line-height:1.5;padding-left:20px;margin:0 0 16px">${steps}</ol>
<p style="font-size:15px;line-height:1.5;margin:0">${esc(t.planOutro(checkInDate))}</p>`);
  const text = [
    `${p.lead} ${t.planIntro}`,
    "",
    `${t.ruleLabel}: ${p.rule}`,
    p.easy,
    "",
    `${t.stepsLabel}:`,
    ...p.tasks.map((s, i) => `${i + 1}. ${plain(s)}`),
    "",
    t.planOutro(checkInDate),
    "",
    SITE,
  ].join("\n");
  return { subject: t.planSubject(p.rule), html, text };
}

export function reminderEmail(p: PlanPayload) {
  const steps = t.reminderSteps.map((s) => `<li style="margin:0 0 8px">${esc(s)}</li>`).join("");
  const html = shell(`
<p style="font-size:16px;line-height:1.5;margin:0 0 16px">${esc(t.reminderIntro)}</p>
<ol style="font-size:15px;line-height:1.5;padding-left:20px;margin:0 0 16px">${steps}</ol>
<p style="font-size:14px;color:#6b6280;margin:0">${esc(t.reminderPlanLabel)}: ${esc(p.rule)}</p>`);
  const text = [t.reminderIntro, "", ...t.reminderSteps.map((s, i) => `${i + 1}. ${s}`), "", `${t.reminderPlanLabel}: ${p.rule}`, "", SITE].join("\n");
  return { subject: t.reminderSubject, html, text };
}
