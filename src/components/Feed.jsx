import React, { useState } from 'react'
import PostCard from './PostCard'

const FILTERS = [
  { id: 'all',  label: 'All' },
  { id: 'url',  label: 'URL match' },
  { id: 'urn',  label: 'URN match' },
  { id: 'both', label: 'Both signals' },
]

export default function Feed({ posts }) {
  const [active, setActive] = useState('all')

  const visible = active === 'all' ? posts : posts.filter(p => p.matchType === active)

  if (posts.length === 0) {
    return (
      <div style={{
        textAlign: 'center', padding: '3.5rem 1rem',
        background: '#111827', border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '14px', color: '#475569', fontSize: '14px',
      }}>
        No official @Adya AI mentions found. Try a larger fetch size or adjust the filter mode.
      </div>
    )
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '.9rem' }}>
        <div style={{ fontSize: '14px', fontWeight: '500', color: '#94a3b8' }}>
          {visible.length} official @Adya AI mention{visible.length !== 1 ? 's' : ''}
        </div>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {FILTERS.map(f => (
            <button
              key={f.id}
              onClick={() => setActive(f.id)}
              style={{
                padding: '4px 13px',
                border: '1px solid',
                borderColor: active === f.id ? '#3b82f6' : 'rgba(255,255,255,0.1)',
                borderRadius: '20px',
                background: active === f.id ? 'rgba(59,130,246,0.15)' : 'transparent',
                color: active === f.id ? '#60a5fa' : '#64748b',
                fontSize: '12px',
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'all .15s',
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {visible.map((post, i) => (
        <PostCard key={post.id} post={post} index={i} />
      ))}

      {visible.length === 0 && (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#475569', fontSize: '14px' }}>
          No posts match this filter.
        </div>
      )}
    </div>
  )
}
