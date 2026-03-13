import React from "react";

const s = {
  card: {
    background: "#111827",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "14px",
    padding: "1.25rem 1.5rem",
    marginBottom: "1rem",
  },
  cardTitle: {
    fontSize: "11px",
    fontWeight: "600",
    color: "#475569",
    textTransform: "uppercase",
    letterSpacing: ".07em",
    marginBottom: "1rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
    marginBottom: "12px",
  },
  field: { display: "flex", flexDirection: "column", gap: "6px" },
  label: { fontSize: "12px", color: "#64748b" },
  input: {
    height: "38px",
    padding: "0 12px",
    background: "#0f172a",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "8px",
    color: "#f1f5f9",
    fontSize: "14px",
    outline: "none",
    fontFamily: "inherit",
    transition: "border-color .15s",
  },
  hint: {
    fontSize: "12px",
    color: "#475569",
    marginTop: "4px",
    lineHeight: "1.5",
  },
  actions: { display: "flex", gap: "10px", marginTop: "1.25rem" },
  btnPrimary: {
    height: "40px",
    padding: "0 20px",
    background: "#3b82f6",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    fontFamily: "inherit",
  },
};

export default function ConfigPanel({ config, onChange, onRun, loading }) {
  const handleChange = (e) =>
    onChange({ ...config, [e.target.name]: e.target.value });

  return (
    <div style={s.card}>
      <div style={s.cardTitle}>Configuration</div>

      <div style={s.grid}>
        <div style={s.field}>
          <label style={s.label}>Apify API token</label>
          <input
            style={s.input}
            type="password"
            name="token"
            placeholder="apify_api_xxxxxxxxxxxx"
            value={config.token}
            onChange={handleChange}
            onFocus={(e) =>
              (e.target.style.borderColor = "rgba(99,179,237,0.5)")
            }
            onBlur={(e) =>
              (e.target.style.borderColor = "rgba(255,255,255,0.08)")
            }
          />
          <span style={s.hint}>
            apify.com → sign in → Settings → API &amp; Integrations → copy
            Personal API Token
          </span>
        </div>
        <div style={s.field}>
          <label style={s.label}>Sort order</label>
          <select
            style={s.input}
            name="sortBy"
            value={config.sortBy}
            onChange={handleChange}
          >
            <option value="date_posted">Most recent first</option>
            <option value="relevance">By relevance</option>
          </select>
          <span style={s.hint}>Searches last 6 months</span>
        </div>
      </div>

      <div style={s.actions}>
        <button
          style={{
            ...s.btnPrimary,
            opacity: loading ? 0.5 : 1,
            cursor: loading ? "not-allowed" : "pointer",
          }}
          onClick={onRun}
          disabled={loading}
        >
          {loading ? "Scraping…" : "Run scraper"}
        </button>
      </div>
    </div>
  );
}
