# Adya AI — LinkedIn Mention Scraper

A React app that tracks official LinkedIn mentions of **Adya AI** and **Shayak Mazumder** from the last 6 months. It uses the Apify scraping API to search LinkedIn and filters results to only posts where someone used the official clickable company/profile tag — not just plain-text uses of the word "adya".

---

## How it works

1. Searches LinkedIn for the keyword `adya` via Apify
2. Filters posts to the last 6 months
3. Keeps only posts where the `contentAttributes` field contains an official tag linking to `linkedin.com/company/adyadotai` or `linkedin.com/in/smhaaz`
4. Displays matched posts with author info, engagement stats, and a direct link to the post

---

## Prerequisites

- **Node.js 18+** — download from [nodejs.org](https://nodejs.org)
- **Apify account** — free tier gives you $5/month (~6 full runs at 400 posts each)

---

## Getting your Apify token

1. Go to [apify.com](https://apify.com) and create a free account
2. Click your profile icon (top right) → **Settings**
3. Go to the **API & Integrations** tab
4. Copy your **Personal API Token**

---

## Installation

```bash
# 1. Unzip and enter the project folder
cd linkedin-scraper

# 2. Install dependencies
npm install

# 3. Start the app
npm run dev
```

Then open **http://localhost:5173** in your browser.

---

## Running a scrape

1. Paste your Apify token into the **API token** field
2. Choose a sort order — *Most recent first* is recommended
3. Click **Run scraper**
4. Wait 15–30 seconds for results to load
5. Browse the feed — each post shows a match badge, engagement stats, and a link to view it on LinkedIn

---

## Project structure

```
src/
├── App.jsx                   main state and layout
├── components/
│   ├── Header.jsx            branding
│   ├── TabNav.jsx            tab navigation
│   ├── ConfigPanel.jsx       token input and sort order
│   ├── StatusBar.jsx         live scrape status
│   ├── StatsRow.jsx          fetched / matched / discarded summary
│   ├── Feed.jsx              post list with filter buttons
│   ├── PostCard.jsx          individual post card
│   └── LogicTab.jsx          filter logic reference
└── utils/
    ├── apify.js              API call, 6-month filter, match logic
    └── filter.js             post normalisation and highlight helper
```

---

## Cost

The app uses the `harvestapi~linkedin-post-search` Apify actor at **$2 per 1,000 posts**.

| Posts per run | Cost   |
|---------------|--------|
| 100           | ~$0.20 |
| 200           | ~$0.40 |
| 400 (max)     | ~$0.80 |

On the free $5/month tier you get roughly **6 full runs** per month.

---

## Build for production

```bash
npm run build
```

The output goes to `dist/` — deploy it to any static host like Vercel, Netlify, or GitHub Pages.

---

## Limitations

- Only catches posts where the author used the **official clickable @Adya AI tag**. Plain-text mentions are not detected — this is a LinkedIn data limitation, not a bug.
- No data is stored between runs. Every scrape fetches fresh results.
- LinkedIn may rate-limit Apify's scrapers during high-traffic periods, which can reduce the number of posts returned.
