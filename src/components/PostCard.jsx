import React from 'react'
import { highlightMention } from '../utils/filter'

const AVATAR_PALETTES = [
  { bg: 'rgba(59,130,246,0.15)',  color: '#60a5fa' },
  { bg: 'rgba(16,185,129,0.15)', color: '#34d399' },
  { bg: 'rgba(139,92,246,0.15)', color: '#a78bfa' },
  { bg: 'rgba(245,158,11,0.15)', color: '#fbbf24' },
  { bg: 'rgba(236,72,153,0.15)', color: '#f472b6' },
]

const BADGE = {
  url:  { bg: 'rgba(59,130,246,0.12)',  color: '#60a5fa',  label: 'URL match'   },
  urn:  { bg: 'rgba(16,185,129,0.12)', color: '#34d399',  label: 'URN match'   },
  both: { bg: 'rgba(139,92,246,0.12)', color: '#a78bfa',  label: 'URL + URN'   },
}

function initials(name) {
  return (name || '?').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}

export default function PostCard({ post, index }) {
  const pal   = AVATAR_PALETTES[index % AVATAR_PALETTES.length]
  const badge = BADGE[post.matchType] || BADGE.url
  const highlighted = highlightMention(post.text)

  return (
    <div style={{
      background: '#111827',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: '14px',
      padding: '1.1rem 1.35rem',
      marginBottom: '.75rem',
      animation: `fadeInUp .3s ease both`,
      animationDelay: `${Math.min(index * 40, 300)}ms`,
      transition: 'border-color .2s',
    }}
    onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(59,130,246,0.3)'}
    onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}
    >
      {/* Meta row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '.75rem' }}>
        <div style={{
          width: '40px', height: '40px', borderRadius: '50%',
          background: pal.bg, color: pal.color,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '13px', fontWeight: '600', flexShrink: 0,
        }}>
          {initials(post.author)}
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: '14px', fontWeight: '500', color: '#f1f5f9', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {post.author}
          </div>
          <div style={{ fontSize: '12px', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {post.headline}
          </div>
        </div>
        {post.time && (
          <div style={{ marginLeft: 'auto', fontSize: '12px', color: '#475569', flexShrink: 0 }}>
            {post.time}
          </div>
        )}
        <span style={{
          padding: '3px 10px',
          background: badge.bg,
          color: badge.color,
          borderRadius: '20px',
          fontSize: '11px',
          fontWeight: '500',
          flexShrink: 0,
        }}>
          {badge.label}
        </span>
      </div>

      {/* Post text */}
      <div
        style={{ fontSize: '14px', lineHeight: '1.65', color: '#cbd5e1', marginBottom: '.75rem' }}
        dangerouslySetInnerHTML={{ __html: highlighted }}
      />

      {/* Engagement row */}
      <div style={{
        display: 'flex',
        gap: '16px',
        paddingTop: '.75rem',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        fontSize: '12px',
        color: '#475569',
        alignItems: 'center',
      }}>
        <span><strong style={{ color: '#94a3b8' }}>{Number(post.likes).toLocaleString()}</strong> likes</span>
        <span><strong style={{ color: '#94a3b8' }}>{post.comments}</strong> comments</span>
        <span><strong style={{ color: '#94a3b8' }}>{post.reposts}</strong> reposts</span>
        {post.url && post.url !== '#' && (
          <a
            href={post.url}
            target="_blank"
            rel="noreferrer"
            style={{ marginLeft: 'auto', fontSize: '12px', color: '#3b82f6', textDecoration: 'none' }}
          >
            View on LinkedIn ↗
          </a>
        )}
      </div>

      {/* Inject highlight style once */}
      <style>{`mark { background: rgba(59,130,246,0.2); color: #60a5fa; border-radius: 3px; padding: 0 2px; font-style: normal; }`}</style>
    </div>
  )
}
