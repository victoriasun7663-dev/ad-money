// Every word the user sees, grouped by screen. The copy deck doc mirrors
// these keys one-to-one: edit here, push, and the site redeploys.
// Functions take the numbers that get filled in (already formatted).

export const copy = {
  brand: {
    name: "Ad Money",
    tagline: "Made by V for Twitch streamers",
    metaDescription: "Find out, in dollars, if your Twitch ads are paying you or just annoying chat.",
  },

  // Shown at the bottom of every screen and after errors.
  support: {
    prompt: "Something not working?",
    email: "contact@victoriasun.io",
    emailLabel: "Email me",
    // Twitter/X handle without the @. Leave empty to hide the DM link.
    twitterHandle: "",
    twitterLabel: "DM me on X",
    joiner: "or",
  },

  hook: {
    headline: "Find your ad",
    headlineAccent: "sweet spot",
    sub: "Upload your last 30 days from Twitch (or 3 months if you stream less). In 2 minutes you'll know, in dollars, what to change.",
    perksLabel: "YOU GET",
    perks: [
      { title: "Your money gap", body: "How much more you could make each month" },
      { title: "Your best ad amount", body: "Not too few, not so many chat leaves" },
      { title: "One setting to change", body: "Set it once. Twitch does the rest." },
    ],
    ctaPrimary: "Check my channel",
    ctaExample: "See an example first",
    privacy: "Your file never leaves your device",
  },

  upload: {
    title: "Grab your Twitch file",
    sub: "About 1 minute. Easiest on a computer.",
    // **bold** marks the words shown in bold.
    steps: [
      "Go to **dashboard.twitch.tv** and open **Analytics**",
      "Pick **Last 30 days**. Stream less than 3 times a week? Pick **the last 3 months** instead.",
      "Click **Export**. A file downloads.",
    ],
    dropTitle: "Drop the file here",
    chooseFile: "Choose file",
    fileHint: "It ends in .csv",
    connectTwitch: "Connect with Twitch · coming soon",
    tryExample: "No file? Try an example channel",
    errors: {
      empty: "That file looks empty.",
      missingColumns: (what: string) =>
        `We couldn't find ${what} in this file. Make sure it's the Channel Analytics export.`,
      tooFewDays: "We need at least 5 stream days with ads to give you a real answer. Try exporting the last 3 months.",
      columnNames: { viewers: "average viewers", adMinutes: "ad minutes", adRevenue: "ad revenue" },
    },
  },

  result: {
    more: {
      kicker: "You're leaving money on the table.",
      big: (amount: string) => `+${amount}`,
      unit: "more every month",
      yearly: (perYear: string) => `That's about **${perYear} a year**, from ads you're not running yet.`,
    },
    cut: {
      kicker: "Good news: you can run fewer ads.",
      big: (minutes: number) => `−${minutes} min`,
      unit: "of ads per stream",
      keep: (pct: number) =>
        `Those last minutes barely pay. Cut them and you **keep ${pct}% of your ad money** with fewer interruptions.`,
    },
    right: {
      kicker: "Nice. You're already there.",
      big: "Just right",
      body: "Your ads are at the best level for your channel. More viewers is now your biggest lever.",
    },
    meter: {
      title: "Your ads per hour",
      unit: "minutes",
      you: (n: string) => `You · ${n}`,
      tooFew: "Too few",
      best: (n: number) => `Best: ${n}`,
      tooMany: "Too many",
      ariaLabel: (you: string, best: number) =>
        `You run ${you} minutes of ads per hour. Best is ${best}.`,
    },
    changeLabel: "THE CHANGE",
    changeNone: "Nothing to change",
    change: (sign: "+" | "−", minutes: number) => `${sign}${minutes} min of ads each hour`,
    effortLabel: "THE EFFORT",
    effort: "1 setting, 2 minutes",
    ctaPlan: "Show me what to change",
    ctaMath: "How did you get this number?",
    footer: (who: "sample" | "you", viewers: string, streams: number, periodDays: number) =>
      `${who === "sample" ? "Example channel" : "Your channel"} · ${viewers} avg viewers · ${streams} streams in ${periodDays} days`,
  },

  plan: {
    title: "Your plan",
    ruleLabel: "THE ONE RULE",
    rule: (perHour: number) => `Run ${perHour} minutes of ads every hour`,
    easy: (breakLen: number, every: number) => `Easy version: a ${breakLen}-minute break every ${every} minutes.`,
    setupLabel: "SET IT UP ONCE",
    tasks: (breakLen: number, every: number) => [
      "Open **Ads** in your Twitch Creator Dashboard",
      `Set break length to **${breakLen} minutes**`,
      `Set it to run **every ${every} minutes**`,
      "Stream like normal. That's it.",
    ],
    commitLabel: "LOCK IT IN",
    commitBody: "Get your plan by email now, and a check-in in 30 days to see if it worked.",
    emailLabel: "Your email",
    emailPlaceholder: "you@example.com",
    emailCta: "Email me my plan",
    emailSending: "Sending…",
    emailSent: (date: string) => `Sent. Check your inbox. We'll check in on ${date}.`,
    emailInvalid: "That email doesn't look right.",
    emailError: "Couldn't send right now. Add it to your calendar instead:",
    emailOff: "Email isn't switched on yet. Add it to your calendar instead:",
    emailFinePrint: "Just your plan and one reminder. No spam.",
    calendarToggle: "Or add a reminder to my calendar",
    remindGoogle: "Google Calendar",
    remindIcs: "Apple or Outlook",
    remindEvent: {
      title: "Ad Money: check if your new ad plan worked",
      details: (rule: string) =>
        `Export your last 30 days from Twitch Analytics and upload it again. Your rule was: ${rule}.`,
    },
    sendManager: "Send to my manager",
    shareTitle: "My Twitch ad plan",
    shareLead: {
      more: (amount: string) => `I could make about ${amount} more a month from Twitch ads.`,
      cut: (minutes: number, pct: number) =>
        `I can cut ${minutes} min of ads per stream and keep ${pct}% of my ad money.`,
      right: "My Twitch ads are already at the right level.",
    },
    shareBody: (rule: string, easy: string) => `The plan: ${rule}. ${easy}`,
    shareCopied: "Copied. Paste it to your manager.",
    shareFailed: "Couldn't share. Take a screenshot of this page instead.",
  },

  // The two emails sent from the plan screen.
  email: {
    planSubject: (rule: string) => `Your Twitch ad plan: ${rule}`,
    lead: {
      more: (amount: string) => `You could make about ${amount} more a month from Twitch ads.`,
      cut: (minutes: number, pct: number) =>
        `You can cut ${minutes} min of ads per stream and keep ${pct}% of your ad money.`,
      right: "Your Twitch ads are already at the right level.",
    },
    planIntro: "Here's what you committed to. Set it up once and stream like normal.",
    ruleLabel: "The one rule",
    stepsLabel: "Set it up once",
    planOutro: (date: string) => `We'll email you on ${date} to check if it worked. Have your Twitch export ready.`,
    reminderSubject: "Did your new ad plan work?",
    reminderIntro: "It's been 30 days. Time to see if your new ad plan paid off.",
    reminderSteps: [
      "Go to dashboard.twitch.tv and open Analytics",
      "Pick Last 30 days and click Export",
      "Upload the file at ad-money.vercel.app",
    ],
    reminderPlanLabel: "Your plan was",
    cta: "Check my channel",
    footer: "You're getting this because you asked Ad Money to email your plan. Reply to stop the reminder.",
  },

  details: {
    title: "See the math",
    plainLabel: "IN PLAIN WORDS",
    perMinute: "Each ad minute pays you",
    extraMinutes: "Extra ad minutes per stream",
    streams: "Streams per month",
    total: "More per month",
    whyLabel: (perHour: number) => `WHY ${perHour} MINUTES AN HOUR?`,
    why: (limit: number, drop: number) =>
      `On your streams, ads paid well up to about ${limit} minutes per stream. After that, each extra minute paid ${drop}% less. We call that point your **ad limit**.`,
    tableLabel: "ADS PER STREAM → YOUR MONEY",
    rowBest: " · best",
    rowYou: " · you now",
    dailyToggle: "Every stream, day by day",
    dailyHeaders: ["Day", "Viewers", "Ad min", "Ad $"],
    disclaimer:
      "Counts ads and Turbo only. Subs, bits, tips and sponsors aren't included. Results can vary month to month.",
  },

  needsData: {
    message: "We need your Twitch file first.",
    cta: "Get started",
  },

  manager: {
    label: "· Manager",
    addCreator: "Add a creator",
    tiles: {
      money: { label: "Money on the table", unit: " /mo", note: "across 3 creators running too few ads" },
      tooMany: { label: "Running too many ads", note: "can cut ads and keep most of the money" },
      stale: { label: "Need a fresh file", note: "last upload over 30 days ago" },
    },
    headers: ["CREATOR", "AVG VIEWERS", "ADS / HOUR NOW", "BEST", "MONTHLY GAP", "NEXT STEP"],
    actions: { sendPlan: "Send plan", askFile: "Ask for new file" },
    gapCut: (min: number) => `Cut ${min} min`,
    gapStale: "Old file",
    footnote: "Example data. Each creator's numbers come from their own 30-day Twitch file.",
  },
} as const;
