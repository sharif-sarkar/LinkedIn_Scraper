import { normalisePost } from "./filter";

const ACTOR = "harvestapi~linkedin-post-search";

const SIX_MONTHS_AGO = Date.now() - 6 * 30 * 24 * 60 * 60 * 1000;

function isWithinSixMonths(post) {
  const ts = post.postedAt?.timestamp;
  if (!ts) return true;
  return ts >= SIX_MONTHS_AGO;
}

function hasAdyaTag(post) {
  const attrs = post.contentAttributes || [];
  return attrs.some(
    (attr) =>
      attr.type === "COMPANY_NAME" &&
      (attr.hyperlink || "").toLowerCase().includes("adyadotai"),
  );
}

function hasShayakTag(post) {
  const attrs = post.contentAttributes || [];
  const raw = JSON.stringify(post).toLowerCase();
  return (
    attrs.some((attr) =>
      (attr.hyperlink || "").toLowerCase().includes("smhaaz"),
    ) ||
    raw.includes("smhaaz") ||
    raw.includes("shayak mazumder") ||
    raw.includes("shayak")
  );
}

export async function scrapeAdyaMentions(token, opts = {}) {
  const { sortBy = "date_posted", onStatus = () => {} } = opts;

  onStatus("Fetching posts from the last 6 months…");

  const res = await fetch(
    `https://api.apify.com/v2/acts/${ACTOR}/run-sync-get-dataset-items?token=${encodeURIComponent(token)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        searchQueries: ["adya"],
        maxPosts: 400,
        sortBy: sortBy === "date_posted" ? "date" : "relevance",
      }),
    },
  );

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Apify error ${res.status}: ${body.slice(0, 200)}`);
  }

  const raw = await res.json();

  const withinRange = raw.filter(isWithinSixMonths);
  const matched = withinRange.filter((p) => hasAdyaTag(p) || hasShayakTag(p));
  const discarded = raw.length - matched.length;

  console.log("Total fetched:", raw.length);
  console.log("Within 6 months:", withinRange.length);
  console.log("Matched (Adya or Shayak):", matched.length);

  onStatus(`Done — ${matched.length} mentions found from the last 6 months.`);

  return {
    fetched: raw.length,
    matched: matched.length,
    discarded,
    rate: raw.length > 0 ? Math.round((matched.length / raw.length) * 100) : 0,
    posts: matched.map((p, i) => normalisePost(p, i)),
  };
}
