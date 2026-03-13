import React from 'react'

function StatCard({ value, label, accent }) {
  return (
    <div style={{
      background: '#111827',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: '12px',
      padding: '.9rem 1.1rem',
    }}>
      <div style={{
        fontSize: '26px',
        fontWeight: '600',
        color: accent || '#f1f5f9',
        letterSpacing: '-0.02em',
        lineHeight: 1.1,
      }}>
        {value}
      </div>
      <div style={{ fontSize: '12px', color: '#475569', marginTop: '4px' }}>{label}</div>
    </div>
  )
}

export default function StatsRow({ fetched, matched, discarded, rate }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '10px',
      marginBottom: '1.25rem',
    }}>
      <StatCard value={fetched.toLocaleString()}   label="Posts fetched" />
      <StatCard value={matched.toLocaleString()}   label="Official mentions" accent="#3b82f6" />
      <StatCard value={discarded.toLocaleString()} label="Discarded (plain text)" accent="#ef4444" />
      <StatCard value={`${rate}%`}                 label="Match rate" accent="#10b981" />
    </div>
  )
}
