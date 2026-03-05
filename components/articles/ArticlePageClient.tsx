'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useAuth } from '@/lib/AuthContext'
import type { Article, ArticleSection, RatingCardProduct, WeekBlock } from '@/lib/articles'
import { ORANGE, SURFACE, BORDER, TEXT, MUTED, DIM, BG } from '@/lib/constants'
import { Lbl } from '@/components/ui/primitives'

// ── Mobile detection hook ─────────────────────────────────────────────────────

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`)
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [breakpoint])
  return isMobile
}

// ── Reading progress bar ──────────────────────────────────────────────────────

function ReadingProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    function onScroll() {
      const el = document.documentElement
      const scrolled = el.scrollTop
      const total = el.scrollHeight - el.clientHeight
      setProgress(total > 0 ? (scrolled / total) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <div style={{ position: 'fixed', top: 56, left: 0, right: 0, height: 2, zIndex: 90, background: '#1a1a1a' }}>
      <div style={{ height: '100%', width: `${progress}%`, background: ORANGE, transition: 'width 0.05s linear' }} />
    </div>
  )
}

// ── Save button ───────────────────────────────────────────────────────────────

function SaveButton({ slug }: { slug: string }) {
  const { savedArticles, toggleSave, openAuth, user } = useAuth()
  const saved = savedArticles.includes(slug)

  function handleSave() {
    if (!user) { openAuth(); return }
    toggleSave(slug)
  }

  const [hov, setHov] = useState(false)
  return (
    <button
      onClick={handleSave}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 7,
        padding: '9px 16px',
        background: saved ? 'rgba(232,82,26,0.12)' : hov ? '#1f1f1f' : SURFACE,
        border: `1px solid ${saved ? ORANGE : hov ? MUTED : BORDER}`,
        color: saved ? ORANGE : hov ? TEXT : MUTED,
        fontSize: 10.5, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
        cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'inherit',
      }}
    >
      {saved ? '★' : '☆'} {saved ? 'Saved' : 'Save Article'}
    </button>
  )
}

// ── Content renderer ──────────────────────────────────────────────────────────

function ExerciseBlock({ section }: { section: ArticleSection }) {
  const [open, setOpen] = useState(false)
  const isMobile = useIsMobile()
  const levelColor: Record<string, string> = {
    Beginner: '#82d296', 'Beginner+': '#a8d86e', Intermediate: '#f2c94c',
    'Intermediate+': '#ff9f43', Advanced: '#ff6b35', Elite: ORANGE,
  }
  const lc = levelColor[section.level ?? ''] ?? MUTED

  return (
    <div style={{
      margin: '32px 0',
      border: `1px solid ${BORDER}`,
      background: SURFACE,
      overflow: 'hidden',
    }}>
      <div
        onClick={() => setOpen(o => !o)}
        style={{
          padding: isMobile ? '14px 16px' : '18px 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          cursor: 'pointer',
          borderLeft: `3px solid ${lc}`,
          flexWrap: isMobile ? 'wrap' : 'nowrap',
          gap: isMobile ? 10 : 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{
            fontSize: 8, letterSpacing: '0.18em', textTransform: 'uppercase',
            color: lc, fontWeight: 700, background: `${lc}18`,
            padding: '3px 8px', border: `1px solid ${lc}44`,
          }}>
            {section.level}
          </span>
          <span style={{ fontFamily: 'var(--font-bebas)', fontSize: 18, letterSpacing: '0.04em', color: TEXT }}>
            {section.text}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 20, color: lc, lineHeight: 1 }}>{section.sets}</div>
            <div style={{ fontSize: 8, color: DIM, letterSpacing: '0.1em', textTransform: 'uppercase' }}>sets</div>
          </div>
          <div style={{ width: 1, height: 28, background: BORDER }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 20, color: lc, lineHeight: 1 }}>{section.reps}</div>
            <div style={{ fontSize: 8, color: DIM, letterSpacing: '0.1em', textTransform: 'uppercase' }}>reps</div>
          </div>
          <div style={{ fontSize: 12, color: DIM, marginLeft: 8, transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>▾</div>
        </div>
      </div>
      {open && section.note && (
        <div style={{ padding: '14px 24px 18px', borderTop: `1px solid ${BORDER}`, background: '#0f0f0f' }}>
          <p style={{ fontSize: 12.5, color: MUTED, lineHeight: 1.7, margin: 0 }}>{section.note}</p>
        </div>
      )}
    </div>
  )
}

// ── Star rating display ───────────────────────────────────────────────────────

function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5
  return (
    <span style={{ display: 'inline-flex', gap: 2, alignItems: 'center' }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} style={{
          fontSize: 12,
          color: i < full ? '#f2c94c' : (i === full && half) ? '#f2c94c' : '#333',
        }}>
          {i < full ? '★' : (i === full && half) ? '½' : '☆'}
        </span>
      ))}
      <span style={{ fontSize: 11, color: MUTED, marginLeft: 4, fontWeight: 700 }}>{rating.toFixed(1)}</span>
    </span>
  )
}

// ── Rating card (equipment review) ────────────────────────────────────────────

function RatingCard({ product, rank }: { product: RatingCardProduct; rank: number }) {
  const [open, setOpen] = useState(false)
  const [hov, setHov] = useState(false)
  const isMobile = useIsMobile()
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        border: `1px solid ${hov ? ORANGE : BORDER}`,
        background: SURFACE,
        transition: 'border-color 0.2s',
        borderLeft: rank === 1 ? `3px solid ${ORANGE}` : rank <= 3 ? '3px solid #f2c94c' : '3px solid transparent',
      }}
    >
      {/* Header */}
      <div
        onClick={() => setOpen(o => !o)}
        style={{ padding: '20px 22px', display: 'flex', alignItems: 'flex-start', gap: 18, cursor: 'pointer' }}
      >
        {/* Rank bubble */}
        <div style={{
          width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
          background: rank === 1 ? `${ORANGE}18` : '#1a1a1a',
          border: `1px solid ${rank === 1 ? ORANGE : BORDER}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-bebas)', fontSize: 15, letterSpacing: '0.04em',
          color: rank === 1 ? ORANGE : DIM,
        }}>
          {rank}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 5 }}>
            {product.badge && (
              <span style={{
                padding: '2px 8px', fontSize: 8, letterSpacing: '0.14em',
                textTransform: 'uppercase', fontWeight: 700,
                background: rank === 1 ? `${ORANGE}18` : '#1e1e1e',
                border: `1px solid ${rank === 1 ? ORANGE : BORDER}`,
                color: rank === 1 ? ORANGE : MUTED,
              }}>{product.badge}</span>
            )}
            <Stars rating={product.rating} />
          </div>
          <h3 style={{
            fontFamily: 'var(--font-bebas)', fontSize: 20, letterSpacing: '0.04em',
            color: TEXT, lineHeight: 1, marginBottom: 4,
          }}>{product.name}</h3>
          <div style={{ fontSize: 11, color: DIM }}>{product.price}</div>
        </div>

        <div style={{
          fontSize: 12, color: DIM, flexShrink: 0,
          transition: 'transform 0.2s',
          transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
        }}>▾</div>
      </div>

      {/* Expanded details */}
      {open && (
        <div style={{ padding: '0 22px 22px', borderTop: `1px solid ${BORDER}` }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 16, marginTop: 16, marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 8.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#82d296', fontWeight: 700, marginBottom: 8 }}>Pros</div>
              {product.pros.map((pro, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                  <span style={{ color: '#82d296', flexShrink: 0, marginTop: 1, fontSize: 10 }}>✓</span>
                  <span style={{ fontSize: 12.5, color: MUTED, lineHeight: 1.55 }}>{pro}</span>
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 8.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#ff6b6b', fontWeight: 700, marginBottom: 8 }}>Cons</div>
              {product.cons.map((con, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                  <span style={{ color: '#ff6b6b', flexShrink: 0, marginTop: 1, fontSize: 10 }}>✗</span>
                  <span style={{ fontSize: 12.5, color: MUTED, lineHeight: 1.55 }}>{con}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ padding: '13px 16px', background: '#0f0f0f', borderLeft: `3px solid ${ORANGE}` }}>
            <div style={{ fontSize: 8.5, letterSpacing: '0.14em', textTransform: 'uppercase', color: ORANGE, fontWeight: 700, marginBottom: 5 }}>Verdict</div>
            <p style={{ fontSize: 12.5, color: MUTED, lineHeight: 1.65, margin: 0 }}>{product.verdict}</p>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Week block card (programs) ────────────────────────────────────────────────

function WeekBlockCard({ week }: { week: WeekBlock }) {
  const [open, setOpen] = useState(true)
  return (
    <div style={{ border: `1px solid ${BORDER}`, background: SURFACE }}>
      <div
        onClick={() => setOpen(o => !o)}
        style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16, cursor: 'pointer', borderLeft: `3px solid ${ORANGE}` }}
      >
        <div style={{
          flexShrink: 0,
          fontFamily: 'var(--font-bebas)', fontSize: 11, letterSpacing: '0.1em',
          color: ORANGE, textTransform: 'uppercase',
        }}>
          Week {week.week}
        </div>
        <div style={{ width: 1, height: 20, background: BORDER, flexShrink: 0 }} />
        <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 18, letterSpacing: '0.04em', color: TEXT, flex: 1 }}>
          {week.focus}
        </div>
        <div style={{ fontSize: 11, color: DIM, transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>▾</div>
      </div>
      {open && (
        <div style={{ borderTop: `1px solid ${BORDER}` }}>
          {week.days.map((day, i) => (
            <div key={i} style={{
              display: 'flex', gap: 0, borderBottom: i < week.days.length - 1 ? `1px solid #1a1a1a` : 'none',
            }}>
              <div style={{
                width: 72, flexShrink: 0, padding: '11px 14px',
                borderRight: `1px solid #1a1a1a`,
                fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase',
                color: day.label.includes('D') && ['Day D', 'Day D (Deload)'].some(x => day.label.includes(x)) ? '#58a6ff' : DIM,
                fontWeight: 700, display: 'flex', alignItems: 'center',
              }}>
                {day.label}
              </div>
              <div style={{ padding: '11px 16px', fontSize: 12.5, color: MUTED, lineHeight: 1.6 }}>
                {day.workout}
              </div>
            </div>
          ))}
          {week.note && (
            <div style={{ padding: '11px 16px', background: '#0d0d0d', borderTop: `1px solid #1a1a1a`, display: 'flex', gap: 10 }}>
              <span style={{ fontSize: 13, flexShrink: 0 }}>📌</span>
              <p style={{ fontSize: 11.5, color: DIM, lineHeight: 1.65, margin: 0, fontStyle: 'italic' }}>{week.note}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function ContentBlock({ section }: { section: ArticleSection }) {
  switch (section.type) {
    case 'intro':
      return (
        <p style={{ fontSize: 17, color: '#ccc', lineHeight: 1.8, marginBottom: 28, fontWeight: 300, borderLeft: `3px solid ${ORANGE}`, paddingLeft: 20 }}>
          {section.text}
        </p>
      )
    case 'body':
      return (
        <p style={{ fontSize: 15, color: '#aaa', lineHeight: 1.85, marginBottom: 24, fontWeight: 300 }}>
          {section.text}
        </p>
      )
    case 'h2':
      return (
        <h2 style={{
          fontFamily: 'var(--font-bebas)', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
          letterSpacing: '0.03em', color: TEXT, lineHeight: 1, marginTop: 52, marginBottom: 20,
          paddingTop: 40, borderTop: `1px solid ${BORDER}`,
        }}>
          {section.text}
        </h2>
      )
    case 'h3':
      return (
        <h3 style={{
          fontFamily: 'var(--font-bebas)', fontSize: 'clamp(1.2rem, 2.5vw, 1.75rem)',
          letterSpacing: '0.04em', color: ORANGE, lineHeight: 1, marginTop: 36, marginBottom: 12,
        }}>
          {section.text}
        </h3>
      )
    case 'pullquote':
      return (
        <blockquote style={{
          margin: '44px 0',
          padding: '28px 36px',
          background: 'rgba(232,82,26,0.06)',
          borderLeft: `4px solid ${ORANGE}`,
          position: 'relative',
        }}>
          <div style={{ position: 'absolute', top: 12, left: 20, fontFamily: 'Georgia,serif', fontSize: 64, color: ORANGE, opacity: 0.15, lineHeight: 1 }}>"</div>
          <p style={{ fontFamily: 'var(--font-dm-serif)', fontStyle: 'italic', fontSize: 20, color: TEXT, lineHeight: 1.5, margin: 0, position: 'relative' }}>
            {section.text}
          </p>
        </blockquote>
      )
    case 'exercise':
      return <ExerciseBlock section={section} />
    case 'tip':
      return (
        <div style={{
          margin: '32px 0', padding: '18px 24px',
          background: 'rgba(242,201,76,0.06)',
          border: `1px solid rgba(242,201,76,0.25)`,
          display: 'flex', gap: 14, alignItems: 'flex-start',
        }}>
          <span style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>💡</span>
          <p style={{ fontSize: 13, color: '#d4b96a', lineHeight: 1.7, margin: 0 }}>{section.text}</p>
        </div>
      )
    case 'list':
      return (
        <ul style={{ margin: '20px 0 28px', paddingLeft: 0, listStyle: 'none' }}>
          {section.items?.map((item, i) => (
            <li key={i} style={{ display: 'flex', gap: 14, marginBottom: 12, alignItems: 'flex-start' }}>
              <span style={{ color: ORANGE, fontFamily: 'var(--font-bebas)', fontSize: 12, letterSpacing: '0.05em', flexShrink: 0, marginTop: 3 }}>{String(i + 1).padStart(2, '0')}</span>
              <span style={{ fontSize: 14, color: '#aaa', lineHeight: 1.65 }}>{item}</span>
            </li>
          ))}
        </ul>
      )
    case 'image':
      return (
        <figure style={{ margin: '44px 0' }}>
          <div style={{ width: '100%', aspectRatio: '16/8', backgroundImage: `url('${section.src}')`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.8)' }} />
          {section.caption && (
            <figcaption style={{ marginTop: 10, fontSize: 11.5, color: DIM, fontStyle: 'italic', textAlign: 'center' }}>
              {section.caption}
            </figcaption>
          )}
        </figure>
      )
    case 'divider':
      return <hr style={{ margin: '48px 0', border: 'none', borderTop: `1px solid ${BORDER}` }} />

    case 'callout':
      return (
        <div style={{
          margin: '32px 0', padding: '18px 22px',
          background: `${section.color || ORANGE}0d`,
          border: `1px solid ${section.color || ORANGE}33`,
          display: 'flex', gap: 14, alignItems: 'flex-start',
        }}>
          {section.icon && <span style={{ fontSize: 20, flexShrink: 0, marginTop: 1 }}>{section.icon}</span>}
          <p style={{ fontSize: 13, color: section.color ? `${section.color}ee` : MUTED, lineHeight: 1.72, margin: 0 }}>{section.text}</p>
        </div>
      )

    case 'table':
      return (
        <div style={{ margin: '32px 0', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5 }}>
            {section.headers && (
              <thead>
                <tr>
                  {section.headers.map((h, i) => (
                    <th key={i} style={{
                      padding: '10px 14px', background: '#1a1a1a',
                      border: `1px solid ${BORDER}`, color: ORANGE,
                      fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase',
                      fontWeight: 700, textAlign: 'left', whiteSpace: 'nowrap',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {section.rows?.map((row, ri) => (
                <tr key={ri} style={{ background: ri % 2 === 0 ? SURFACE : '#111' }}>
                  {row.cells.map((cell, ci) => (
                    <td key={ci} style={{
                      padding: '10px 14px', border: `1px solid ${BORDER}`,
                      color: ci === 0 ? TEXT : MUTED, fontSize: 12.5, lineHeight: 1.5,
                      fontWeight: ci === 0 ? 600 : 400,
                    }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )

    case 'rating-card':
      return (
        <div style={{ margin: '24px 0', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {section.products?.map((p, i) => (
            <RatingCard key={i} product={p} rank={i + 1} />
          ))}
        </div>
      )

    case 'week-block':
      return (
        <div style={{ margin: '28px 0', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {section.weeks?.map((w, i) => (
            <WeekBlockCard key={i} week={w} />
          ))}
        </div>
      )

    default:
      return null
  }
}

// ── Related article card ──────────────────────────────────────────────────────

function RelatedCard({ article }: { article: Article }) {
  const [hov, setHov] = useState(false)
  return (
    <Link
      href={`/articles/${article.slug}`}
      style={{ textDecoration: 'none' }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div style={{
        background: SURFACE,
        border: `1px solid ${hov ? ORANGE : BORDER}`,
        overflow: 'hidden',
        transition: 'border-color 0.2s',
      }}>
        <div style={{
          height: 120,
          backgroundImage: `url('${article.image}')`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          filter: hov ? 'brightness(0.6)' : 'brightness(0.45)',
          transform: hov ? 'scale(1.03)' : 'scale(1)',
          transition: 'filter 0.4s, transform 0.4s',
        }} />
        <div style={{ padding: '14px 16px' }}>
          <div style={{ fontSize: 8, color: ORANGE, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 6 }}>{article.tag}</div>
          <div style={{ fontFamily: 'var(--font-dm-serif)', fontStyle: 'italic', fontSize: 13.5, color: TEXT, lineHeight: 1.35 }}>{article.title}</div>
          <div style={{ fontSize: 9.5, color: DIM, marginTop: 8 }}>{article.readTime} read</div>
        </div>
      </div>
    </Link>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

interface Props {
  article: Article
  related: Article[]
}

export default function ArticlePageClient({ article, related }: Props) {
  const progressRef = useRef(0)
  const isMobile = useIsMobile()

  return (
    <>
      <ReadingProgress />

      {/* Hero */}
      <div style={{ position: 'relative', height: 'clamp(360px, 52vh, 580px)', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url('${article.image}')`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          filter: 'brightness(0.35)',
        }} />
        {/* Grid texture */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(232,82,26,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(232,82,26,0.06) 1px,transparent 1px)',
          backgroundSize: '48px 48px',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0a0a0a 0%, rgba(10,10,10,0.6) 50%, transparent 100%)' }} />

        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: isMobile ? '0 20px 32px' : '0 max(56px, 8vw) 48px' }}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, fontSize: 9.5, color: DIM, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            <Link href="/articles" style={{ color: DIM, textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = ORANGE)}
              onMouseLeave={e => (e.currentTarget.style.color = DIM)}>
              Articles
            </Link>
            <span>/</span>
            <span style={{ color: ORANGE }}>{article.tag}</span>
          </div>

          <span style={{
            display: 'inline-block', padding: '4px 12px', background: ORANGE, color: '#fff',
            fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 14,
          }}>
            {article.tag}
          </span>

          <h1 style={{
            fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2.2rem, 5.5vw, 5rem)',
            letterSpacing: '0.02em', lineHeight: 0.95, color: TEXT, marginBottom: 16,
            maxWidth: 900,
          }}>
            {article.title}
          </h1>

          {article.subtitle && (
            <p style={{ fontFamily: 'var(--font-dm-serif)', fontStyle: 'italic', fontSize: 16, color: MUTED, maxWidth: 640, lineHeight: 1.5, marginBottom: 20 }}>
              {article.subtitle}
            </p>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                background: 'rgba(232,82,26,0.2)', border: `1px solid ${ORANGE}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-bebas)', fontSize: 13, color: ORANGE,
              }}>
                {article.author.split(' ').map(w => w[0]).join('')}
              </div>
              <div>
                <div style={{ fontSize: 11.5, color: TEXT, fontWeight: 600 }}>{article.author}</div>
                <div style={{ fontSize: 9.5, color: DIM }}>{article.date}</div>
              </div>
            </div>
            <div style={{ width: 1, height: 28, background: BORDER }} />
            <span style={{ fontSize: 10, color: DIM, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              ⏱ {article.readTime} read
            </span>
          </div>
        </div>
      </div>

      {/* Article body */}
      <div style={{ background: BG, padding: isMobile ? '0 20px' : '0 max(56px, 8vw)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 280px', gap: isMobile ? 0 : 64, paddingTop: 52, paddingBottom: 80 }}>
          {/* Main content */}
          <div style={{ minWidth: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 32 }}>
              <SaveButton slug={article.slug} />
            </div>

            {article.content?.map((section, i) => (
              <ContentBlock key={i} section={section} />
            ))}

            {/* Author bio */}
            {article.authorBio && (
              <div style={{ marginTop: 56, paddingTop: 32, borderTop: `1px solid ${BORDER}` }}>
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: '50%', flexShrink: 0,
                    background: 'rgba(232,82,26,0.15)', border: `1px solid ${ORANGE}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-bebas)', fontSize: 18, color: ORANGE,
                  }}>
                    {article.author.split(' ').map(w => w[0]).join('')}
                  </div>
                  <div>
                    <div style={{ fontSize: 8.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: ORANGE, fontWeight: 700, marginBottom: 4 }}>About the Author</div>
                    <div style={{ fontSize: 13, color: TEXT, fontWeight: 600, marginBottom: 8 }}>{article.author}</div>
                    <p style={{ fontSize: 12.5, color: MUTED, lineHeight: 1.7, margin: 0 }}>{article.authorBio}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside style={{ paddingTop: isMobile ? 0 : 52, paddingBottom: isMobile ? 40 : 0 }}>
            <div style={{ position: isMobile ? 'static' : 'sticky', top: 80, display: 'flex', flexDirection: 'column', gap: 24 }}>
              {/* Quick facts */}
              <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, padding: '20px 22px' }}>
                <div style={{ fontSize: 8.5, letterSpacing: '0.2em', textTransform: 'uppercase', color: ORANGE, fontWeight: 700, marginBottom: 16 }}>
                  Quick Facts
                </div>
                {[
                  { label: 'Author', value: article.author },
                  { label: 'Published', value: article.date },
                  { label: 'Read time', value: `${article.readTime} read` },
                  { label: 'Category', value: article.tag },
                ].map(({ label, value }) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid #1e1e1e` }}>
                    <span style={{ fontSize: 10.5, color: DIM }}>{label}</span>
                    <span style={{ fontSize: 10.5, color: TEXT, textAlign: 'right', maxWidth: 140 }}>{value}</span>
                  </div>
                ))}
                <div style={{ marginTop: 16 }}>
                  <SaveButton slug={article.slug} />
                </div>
              </div>

              {/* Share */}
              <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, padding: '20px 22px' }}>
                <div style={{ fontSize: 8.5, letterSpacing: '0.2em', textTransform: 'uppercase', color: ORANGE, fontWeight: 700, marginBottom: 14 }}>
                  Share
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {['Twitter / X', 'Copy Link', 'Email'].map(s => (
                    <button key={s} style={{
                      padding: '9px 12px', background: BG, border: `1px solid ${BORDER}`,
                      color: MUTED, fontSize: 10.5, cursor: 'pointer', fontFamily: 'inherit',
                      textAlign: 'left', transition: 'all 0.2s',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = ORANGE; e.currentTarget.style.color = TEXT }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.color = MUTED }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Related articles */}
        {related.length > 0 && (
          <div style={{ paddingBottom: 80, borderTop: `1px solid ${BORDER}`, paddingTop: 52 }}>
            <Lbl>Keep Reading</Lbl>
            <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', letterSpacing: '0.03em', color: TEXT, lineHeight: 1, marginBottom: 28 }}>
              Related Articles
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)', gap: 2 }}>
              {related.map(a => <RelatedCard key={a.slug} article={a} />)}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
