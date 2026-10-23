# Ad Money

Tells a Twitch streamer, in dollars, whether their ads are paying them or just annoying chat, and what one setting to change.

Live: https://ad-money.vercel.app · Product requirements: [REQUIREMENTS.md](REQUIREMENTS.md)

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000. Click **See an example first** to try it without a Twitch file.

## Where things live

- `src/lib/model.ts`: finds the ad limit and computes the monthly gap
- `src/lib/csv.ts`: reads the Twitch Channel Analytics export
- `src/lib/store.tsx`: holds channel data in the browser only (sessionStorage)
- `src/app/*`: one folder per screen (`upload`, `result`, `plan`, `details`, `manager`)

Pushing to `main` deploys to production on Vercel.
