export const ADYA_SLUG = "adyadotai";

export function highlightMention(text = "") {
  return text.replace(/adya(\s?ai)?/gi, "<mark>$&</mark>");
}

export function normalisePost(raw, index) {
  const postedAt = raw.postedAt || {};
  const author = raw.author || {};
  const eng = raw.engagement || {};

  return {
    id: raw.id || raw.entityId || `post-${index}`,
    author: author.name || "Unknown",
    headline: author.info || "",
    avatar: author.avatar?.url || "",
    text: raw.content || raw.text || "",
    likes: eng.likes || 0,
    comments: eng.comments || 0,
    reposts: eng.shares || 0,
    time: postedAt.postedAgoShort || postedAt.postedAgoText || "",
    url: raw.linkedinUrl || raw.socialContent?.shareUrl || "",
    matchType: "url",
  };
}

export function isOfficialAdyaMention() {
  return true;
}
