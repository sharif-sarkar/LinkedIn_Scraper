import React from 'react'

const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    marginBottom: '2rem',
  },
  logoWrap: {
    width: '44px',
    height: '44px',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    boxShadow: '0 0 20px rgba(99,102,241,0.35)',
  },
  textBlock: { display: 'flex', flexDirection: 'column', gap: '3px' },
  title: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#f1f5f9',
    letterSpacing: '-0.01em',
  },
  subtitle: { fontSize: '13px', color: '#64748b' },
  pill: {
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '5px 12px',
    background: 'rgba(16,185,129,0.1)',
    border: '1px solid rgba(16,185,129,0.25)',
    borderRadius: '20px',
    fontSize: '12px',
    color: '#10b981',
    fontWeight: '500',
  },
  dot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: '#10b981',
  },
}

export default function Header() {
  return (
    <header style={styles.header}>
      <div style={styles.logoWrap}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      </div>
      <div style={styles.textBlock}>
        <span style={styles.title}>Adya - Mention Tracker</span>
        <span style={styles.subtitle}>Scrapes LinkedIn for official @Adya company tags in real-time</span>
      </div>
    </header>
  )
}
