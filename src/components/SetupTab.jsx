import React from 'react'

const s = {
  card: {
    background: '#111827',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: '14px',
    padding: '1.25rem 1.5rem',
    marginBottom: '1rem',
  },
  title: {
    fontSize: '11px', fontWeight: '600', color: '#475569',
    textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: '.75rem',
  },
  body: { fontSize: '14px', color: '#94a3b8', lineHeight: '1.65', marginBottom: '.9rem' },
  code: {
    fontFamily: "'DM Mono', monospace",
    fontSize: '12px', lineHeight: '1.7',
    background: '#0b0f1a', border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: '8px', padding: '.75rem 1rem',
    color: '#94a3b8', overflowX: 'auto', whiteSpace: 'pre', display: 'block',
    marginTop: '.5rem',
  },
  link: {
    display: 'inline-flex', alignItems: 'center', gap: '5px',
    padding: '7px 14px', background: 'transparent',
    border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px',
    color: '#94a3b8', fontSize: '13px', cursor: 'pointer',
    fontFamily: 'inherit', transition: 'background .15s',
    textDecoration: 'none',
  },
}

export default function SetupTab() {
  return (
    <div>
      <div style={s.card}>
        <div style={s.title}>Step 1 — Get a free Apify account</div>
        <p style={s.body}>
          Apify offers a free tier with <strong style={{ color: '#f1f5f9' }}>$5 monthly platform credits</strong>.
          The <em>LinkedIn Posts Search Scraper</em> actor (no login or cookies required) costs roughly
          $0.25–0.50 per 100 posts — so the free tier covers several runs per month.
        </p>
        <a href="https://apify.com/apimaestro/linkedin-posts-search-scraper-no-cookies" target="_blank" rel="noreferrer" style={s.link}>
          Open Apify actor page ↗
        </a>
      </div>

      <div style={s.card}>
        <div style={s.title}>Step 2 — Get your API token</div>
        <p style={s.body}>
          After signing in, go to <strong style={{ color: '#f1f5f9' }}>Settings → Integrations → API tokens</strong>.
          Copy your personal token and paste it into the Scraper tab.
        </p>
        <a href="https://console.apify.com/settings/integrations" target="_blank" rel="noreferrer" style={s.link}>
          Open Apify token settings ↗
        </a>
      </div>

      <div style={s.card}>
        <div style={s.title}>Step 3 — How this app calls the API</div>
        <p style={s.body}>The scraper sends this POST request, waits for results, then filters locally:</p>
        <code style={s.code}>{`POST https://api.apify.com/v2/acts/
  apimaestro~linkedin-posts-search-scraper-no-cookies/
  run-sync-get-dataset-items?token=YOUR_TOKEN

Body (JSON):
{
  "keyword":    "Adya AI",
  "sortBy":     "date_posted",
  "totalPosts": 100
}`}</code>
      </div>

      <div style={s.card}>
        <div style={s.title}>Adya AI LinkedIn company details</div>
        <p style={s.body}>
          The filter checks for these identifiers inside every post's raw JSON.
          If you discover the numeric company ID (e.g. via LinkedIn's network inspector),
          update <code style={{ fontFamily: 'DM Mono', color: '#60a5fa', fontSize: '13px' }}>ADYA_COMPANY_ID</code> in{' '}
          <code style={{ fontFamily: 'DM Mono', color: '#60a5fa', fontSize: '13px' }}>src/utils/filter.js</code>.
        </p>
        <code style={s.code}>{`Company slug:    adyadotai
Profile URL:     linkedin.com/company/adyadotai
Company ID:      (update in filter.js once known)
URN pattern:     urn:li:organization:<ID>`}</code>
      </div>
    </div>
  )
}
