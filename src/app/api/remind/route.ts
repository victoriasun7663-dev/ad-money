import { NextResponse } from "next/server";
import { copy } from "@/content/copy";
import { planEmail, reminderEmail, type PlanPayload } from "@/lib/emails";

// POST /api/remind — emails the plan now, schedules the 30-day check-in,
// and adds the address to the sign-up list.
//
// Env (Vercel → Settings → Environment Variables):
//   RESEND_API_KEY      required; without it this returns 503 and the page
//                       falls back to calendar reminders
//   RESEND_FROM         required, e.g. "Ad Money <plan@yourdomain.com>"
//   RESEND_AUDIENCE_ID  optional; the sign-up list to add contacts to

const RESEND = "https://api.resend.com";
// Resend schedules at most 30 days ahead; stay an hour inside that.
const CHECK_IN_MS = 30 * 24 * 3600 * 1000 - 3600 * 1000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const str = (v: unknown, max: number) => (typeof v === "string" ? v.slice(0, max) : "");

async function resend(path: string, body: unknown) {
  const res = await fetch(`${RESEND}${path}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Resend ${path} ${res.status}: ${await res.text()}`);
  return res.json();
}

export async function POST(req: Request) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  if (!key || !from) return NextResponse.json({ error: "not_configured" }, { status: 503 });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  // Honeypot: real people never fill the hidden "website" field.
  if (str(body.website, 200)) return NextResponse.json({ ok: true });

  const email = str(body.email, 254).trim();
  if (!EMAIL_RE.test(email)) return NextResponse.json({ error: "invalid_email" }, { status: 400 });

  const plan: PlanPayload = {
    lead: str(body.lead, 300),
    rule: str(body.rule, 120),
    easy: str(body.easy, 200),
    tasks: Array.isArray(body.tasks) ? body.tasks.slice(0, 8).map((s) => str(s, 200)) : [],
  };
  if (!plan.rule) return NextResponse.json({ error: "bad_request" }, { status: 400 });

  // Replies ("stop the reminder") go to a real inbox.
  const replyTo = process.env.RESEND_REPLY_TO || copy.support.email;

  const checkIn = new Date(Date.now() + CHECK_IN_MS);
  const checkInLabel = checkIn.toLocaleDateString("en-US", { month: "long", day: "numeric" });

  try {
    const now = planEmail(plan, checkInLabel);
    await resend("/emails", { from, to: [email], reply_to: replyTo, subject: now.subject, html: now.html, text: now.text });

    const later = reminderEmail(plan);
    await resend("/emails", {
      from,
      to: [email],
      reply_to: replyTo,
      subject: later.subject,
      html: later.html,
      text: later.text,
      scheduled_at: checkIn.toISOString(),
    });

    const audience = process.env.RESEND_AUDIENCE_ID;
    if (audience) {
      // A failed list add shouldn't fail the request: the emails already went out.
      await resend(`/audiences/${audience}/contacts`, { email, unsubscribed: false }).catch((e) =>
        console.error("audience add failed", e),
      );
    }
  } catch (e) {
    console.error("remind failed", e);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, checkIn: checkInLabel });
}
