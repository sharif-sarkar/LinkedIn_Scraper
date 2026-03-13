export const DEMO_RAW = [
  // ── Official @Adya AI tags (pass filter) ─────────────────────────────────
  {
    id: 'd1',
    author_name: 'Rohan Mehta',
    author_headline: 'Head of Engineering · Fintech startup',
    text: 'We just switched our internal tooling to @Adya AI and the productivity lift is real. The multi-agent orchestration layer saved us 3 weeks of build time. Highly recommend for anyone in the AI ops space.',
    likes: 412, comments: 64, reposts: 38,
    time_posted: '1h ago',
    url: 'https://www.linkedin.com/posts/rohanmehta_demo1',
    // embedded company tag — URL signal
    entityLinks: [{ url: 'https://www.linkedin.com/company/adyadotai/', name: 'Adya AI' }],
  },
  {
    id: 'd2',
    author_name: 'Priya Sundaram',
    author_headline: 'VP Product · Series B SaaS',
    text: 'Spent the afternoon with the @Adya AI team demoing their enterprise connectors. The depth of integrations across data sources is genuinely impressive — especially the live sync with Snowflake and BigQuery.',
    likes: 891, comments: 142, reposts: 77,
    time_posted: '3h ago',
    url: 'https://www.linkedin.com/posts/priyasundaram_demo2',
    entityLinks: [{ url: 'https://www.linkedin.com/company/adyadotai/', name: 'Adya AI' }],
  },
  {
    id: 'd3',
    author_name: 'Carlos Vega',
    author_headline: 'AI Infrastructure Lead',
    text: 'Comparison thread: I tested 5 agentic AI platforms this quarter. @Adya AI stood out for its low-latency pipeline execution and the cleanest developer experience by far. Full breakdown in the comments.',
    likes: 2340, comments: 318, reposts: 205,
    time_posted: '6h ago',
    url: 'https://www.linkedin.com/posts/carlosvega_demo3',
    entityLinks: [{ url: 'https://www.linkedin.com/company/adyadotai/', name: 'Adya AI' }],
  },
  {
    id: 'd4',
    author_name: 'Neha Joshi',
    author_headline: 'Founder · DataOps consultancy',
    text: 'Our client asked us to evaluate AI data platforms. After 4 weeks of testing, @Adya AI is the recommendation — especially for teams that need both no-code flexibility and deep API access.',
    likes: 567, comments: 93, reposts: 41,
    time_posted: '1d ago',
    url: 'https://www.linkedin.com/posts/nehajoshi_demo4',
    entityLinks: [{ url: 'https://www.linkedin.com/company/adyadotai/', name: 'Adya AI' }],
  },
  {
    id: 'd5',
    author_name: 'Tariq Al-Farsi',
    author_headline: 'CTO · Enterprise software',
    text: 'Great session at the AI Summit today. The @Adya AI keynote on unified data agents was one of the highlights — the live demo actually worked, which is more than I can say for most conference demos.',
    likes: 1103, comments: 187, reposts: 96,
    time_posted: '2d ago',
    url: 'https://www.linkedin.com/posts/tariqalfarsi_demo5',
    entityLinks: [{ url: 'https://www.linkedin.com/company/adyadotai/', name: 'Adya AI' }],
  },

  // ── Plain-text "adya" uses (should be discarded by filter) ───────────────
  { id: 'x1', author_name: 'Random User 1', text: 'adya is a beautiful name in Sanskrit meaning "first"', likes: 5 },
  { id: 'x2', author_name: 'Random User 2', text: 'Just discovered a company called adya — anyone know them?', likes: 2 },
  { id: 'x3', author_name: 'Random User 3', text: 'Adya consulting is hiring in Bangalore!', likes: 9 },
]
