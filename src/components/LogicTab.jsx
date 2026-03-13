import React from "react";

const s = {
  card: {
    background: "#111827",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "14px",
    padding: "1.25rem 1.5rem",
    marginBottom: "1rem",
  },
  title: {
    fontSize: "11px",
    fontWeight: "600",
    color: "#475569",
    textTransform: "uppercase",
    letterSpacing: ".07em",
    marginBottom: ".75rem",
  },
  body: {
    fontSize: "14px",
    color: "#94a3b8",
    lineHeight: "1.65",
    marginBottom: "1rem",
  },
  code: {
    fontFamily: "'DM Mono', monospace",
    fontSize: "12px",
    lineHeight: "1.75",
    background: "#0b0f1a",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "8px",
    padding: ".9rem 1.1rem",
    color: "#94a3b8",
    overflowX: "auto",
    whiteSpace: "pre",
    display: "block",
  },
  signalBox: {
    borderRadius: "10px",
    padding: ".85rem 1rem",
    marginBottom: "10px",
  },
};

function Signal({ color, bg, title, mono, note }) {
  return (
    <div style={{ ...s.signalBox, background: bg }}>
      <div
        style={{
          fontSize: "13px",
          fontWeight: "600",
          color,
          marginBottom: "4px",
        }}
      >
        {title}
      </div>
      <code style={{ fontFamily: "DM Mono", fontSize: "12px", color }}>
        {mono}
      </code>
      <div style={{ fontSize: "12px", color, opacity: 0.75, marginTop: "4px" }}>
        {note}
      </div>
    </div>
  );
}

export default function LogicTab() {
  return (
    <div>
      <div style={s.card}>
        <div style={s.title}>How official @Adya tags are detected</div>
        <p style={s.body}>
          The raw JSON from Apify contains the post text plus embedded
          entity/link metadata. URL match identify an official company tag vs.
          plain-text use of the word "Adya":
        </p>

        <Signal
          bg="rgba(59,130,246,0.08)"
          color="#60a5fa"
          title="URL match"
          mono="linkedin.com/company/adyadotai"
          note="Found in post HTML as an anchor href when someone's @Adya tag is clicked"
        />
      </div>

      <div style={s.card}>
        <div style={s.title}>Core filter function (src/utils/filter.js)</div>
        <code
          style={s.code}
        >{`export function isOfficialAdyaMention(post, mode = 'all') {
  // Stringify the entire post object to catch all nested fields
  const raw = JSON.stringify(post).toLowerCase()

  const urlMatch = raw.includes('linkedin.com/company/adyadotai')

  const urnMatch = ADYA_COMPANY_ID
    ? (raw.includes(\`urn:li:organization:\${ADYA_COMPANY_ID}\`) ||
       raw.includes(\`"company_id":\${ADYA_COMPANY_ID}\`))
    : false

  if (mode === 'url') return urlMatch
  if (mode === 'urn') return urnMatch
  return urlMatch || urnMatch  // 'all' = either signal
}`}</code>
      </div>

      <div style={s.card}>
        <div style={s.title}>
          Full fetch + filter pipeline (src/utils/apify.js)
        </div>
        <code
          style={s.code}
        >{`export async function scrapeAdyaMentions(token, opts = {}) {
  const { totalPosts = 100, sortBy = 'date_posted', filterMode = 'all' } = opts

  const res = await fetch(APIFY_ENDPOINT + '?token=' + token, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ keyword: 'Adya AI', sortBy, totalPosts }),
  })

  const raw     = await res.json()
  const matched = raw.filter(p => isOfficialAdyaMention(p, filterMode))

  return {
    fetched:   raw.length,
    matched:   matched.length,
    discarded: raw.length - matched.length,
    posts:     matched.map(normalisePost),
  }
}`}</code>
      </div>
    </div>
  );
}
