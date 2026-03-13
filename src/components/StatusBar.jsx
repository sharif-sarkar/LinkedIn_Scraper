import React from 'react'

const DOT_COLORS = {
  idle:    '#475569',
  running: '#10b981',
  done:    '#3b82f6',
  error:   '#ef4444',
}

export default function StatusBar({ status, message }) {
  const color = DOT_COLORS[status] || DOT_COLORS.idle
  const pulse  = status === 'running'

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '.7rem 1rem',
      background: '#0f172a',
      border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: '10px',
      marginBottom: '1rem',
      fontSize: '13px',
      color: '#94a3b8',
    }}>
      <span style={{
        width: '8px', height: '8px', borderRadius: '50%',
        background: color, flexShrink: 0,
        animation: pulse ? 'pulse-dot 1s infinite' : 'none',
      }} />
      {status === 'running' && (
        <span style={{
          width: '14px', height: '14px', border: '2px solid rgba(255,255,255,0.1)',
          borderTopColor: '#3b82f6', borderRadius: '50%',
          animation: 'spin .7s linear infinite', flexShrink: 0,
        }} />
      )}
      <span>{message}</span>
    </div>
  )
}
