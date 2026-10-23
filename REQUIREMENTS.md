# Ad Money — creator-friendly flow

## What the feedback says
1. Most streamers don't track the business side. Expect them to give us almost no time or attention.
2. "Sweet spot" (and $ per 1k viewers per ad-minute) is jargon they don't use.
3. The value has to be obvious in plain words: what do I get, is it more money or saved money, and is it worth the hassle?

## Requirements
- **Lead with one dollar number.** The result screen opens with a monthly dollar figure, not a chart.
- **Two honest outcomes:**
  - *Too few ads* → "+$X more every month" (and the yearly total).
  - *Too many ads* → "Cut N min and keep Y% of your ad money" (fewer interruptions, small loss).
  - *Already right* → say so; point to growing viewers.
- **Plain words only.** "Sweet spot" becomes "ad limit" or "best ad amount", and the rate becomes "each ad minute pays you $X".
- **Show the effort up front.** "1 setting, 2 minutes". Then one rule ("9 min an hour = 3 min every 20 min") and a short checklist.
- **2 steps to the answer:** get the file, then the result. Charts, tables and overrides go behind "See the math".
- **Low-friction input:** a guided 3-step CSV export plus a demo channel. The "Connect with Twitch" slot is reserved; Twitch's API doesn't expose ad revenue, so the CSV may stay.
- **Privacy:** the file stays in the browser (sessionStorage).
- **Return loop:** "check back in 30 days" and "send to my manager".
- **Manager view:** a roster of creators with each one's monthly gap and next step.

## Routes
`/` hook · `/upload` · `/result` · `/plan` · `/details` · `/manager` (example data)

## Not built yet
Twitch OAuth, the reminder email, share-to-manager links, accounts, and real manager data.
