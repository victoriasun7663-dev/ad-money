// Every word the user sees, grouped by screen. The copy deck doc mirrors
// these keys one-to-one: edit here, push, and the site redeploys.
// Functions take the numbers that get filled in (already formatted).

export const copy = {
  brand: {
    name: "Ad Money",
    tagline: "For Twitch streamers",
    metaDescription: "Find out, in dollars, if your Twitch ads are paying you or just annoying chat.",
  },

  hook: {
    headline: "Are your ads paying you, or just",
    headlineAccent: "annoying chat?",
    sub: "Upload one file from Twitch. In 2 minutes you'll know, in dollars, what to change.",
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
      "Pick **Last 30 days**",
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
      tooFewDays: "We need at least 5 stream days with ads to give you a real answer.",
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
    footer: (who: "sample" | "you", viewers: string, streams: number) =>
      `${who === "sample" ? "Example channel" : "Your channel"} · ${viewers} avg viewers · ${streams} streams`,
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
    checkBack: "Come back in 30 days with a new file to see if it worked.",
    remind: "Remind me in 30 days",
    sendManager: "Send to my manager",
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
