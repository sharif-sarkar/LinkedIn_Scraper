import React from "react";

const TABS = [
  { id: "scraper", label: "Scraper" },
  { id: "logic", label: "Filter Logic" },
];

function tabStyle(active) {
  return {
    padding: "8px 18px",
    fontSize: "14px",
    fontWeight: active ? "500" : "400",
    color: active ? "#f1f5f9" : "#64748b",
    background: "none",
    border: "none",
    borderBottom: active ? "2px solid #3b82f6" : "2px solid transparent",
    marginBottom: "-1px",
    cursor: "pointer",
    transition: "color .15s",
    fontFamily: "inherit",
  };
}

export default function TabNav({ active, onChange }) {
  return (
    <nav
      style={{
        display: "flex",
        gap: "4px",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        marginBottom: "1.5rem",
      }}
    >
      {TABS.map((t) => (
        <button
          key={t.id}
          style={tabStyle(active === t.id)}
          onClick={() => onChange(t.id)}
        >
          {t.label}
        </button>
      ))}
    </nav>
  );
}
