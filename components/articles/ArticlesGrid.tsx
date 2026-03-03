'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/lib/AuthContext'
import { ARTICLES, ARTICLE_CATEGORIES, type Article, type ArticleCategory } from '@/lib/articles'
import { FULL_ARTICLES } from '@/lib/articleContent'
import { ORANGE, SURFACE, BORDER, TEXT, MUTED, DIM, BG } from '@/lib/constants'

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
      {[1, 2, 3, 4, 5].map(s => (
        <span key={s} style={{ color: s <= Math.round(rating) ? '#f2c94c' : '#333', fontSize: 12 }}>★</span>
      ))}
      <span style={{ fontSize: 11.5, color: MUTED, fontWeight: 600, marginLeft: 2 }}>{rating.toFixed(1)}</span>
    </div>
  )
}

function ArticleCard({ article, featured, isSaved, onToggleSave }: {
  article: Article
  featured?: boolean
  isSaved: boolean
  onToggleSave: (slug: string) => void
}) {
  const [hov, setHov] = useState(false)
  const isReview = article.category === 'reviews'
  const hasFullPage = article.slug in FULL_ARTICLES

  const inner = (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: SURFACE,
        display: 'flex',
        flexDirection: featured ? 'row' : 'column',
        border: `1px solid ${hov ? ORANGE : BORDER}`,
        transition: 'border-color 0.25s',
        overflow: 'hidden',
        position: 'relative',
        height: '100%',
      }}
    >
      {/* Save button */}
      <button
        onClick={e => { e.stopPropagation(); e.preventDefault(); onToggleSave(article.slug) }}
        title={isSaved ? 'Remove from saved' : 'Save article'}
        style={{
          position: 'absolute', top: 10, right: 10, zIndex: 10,
          width: 30, height: 30, borderRadius: '50%',
          background: isSaved ? 'rgba(232,82,26,0.9)' : 'rgba(20,20,20,0.85)',
          border: `1px solid ${isSaved ? ORANGE : BORDER}`,
          color: isSaved ? '#fff' : DIM,
          fontSize: 14, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.2s', fontFamily: 'inherit',
        }}
      >
        {isSaved ? '★' : '☆'}
      </button>

      {/* Image */}
      <div style={{
        position: 'relative', flexShrink: 0,
        width: featured ? '42%' : '100%',
        aspectRatio: featured ? 'auto' : '16/9',
        minHeight: featured ? 250 : 'auto',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url('${article.image}')`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          filter: hov ? 'brightness(0.65)' : 'brightness(0.5)',
          transform: hov ? 'scale(1.04)' : 'scale(1)',
          transition: 'filter 0.5s, transform 0.5s',
        }} />
        <div style={{
          position: 'absolute', top: 12, left: 12,
          padding: '4px 10px',
          background: isReview ? 'rgba(20,20,20,0.9)' : ORANGE,
          border: isReview ? `1px solid ${ORANGE}` : 'none',
          color: isReview ? ORANGE : '#fff',
          fontSize: 8, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700,
        }}>
          {article.tag}
        </div>
        {hasFullPage && (
          <div style={{
            position: 'absolute', bottom: 12, left: 12,
            padding: '3px 8px',
            background: 'rgba(10,10,10,0.85)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#888',
            fontSize: 7.5, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700,
          }}>
            Full Article
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: featured ? '32px 36px' : '22px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
        <div>
          {isReview && article.rating && (
            <div style={{ marginBottom: 10 }}><StarRating rating={article.rating} /></div>
          )}
          <h3 style={{ fontFamily: 'var(--font-dm-serif)', fontStyle: 'italic', fontSize: featured ? 19 : 14.5, lineHeight: 1.35, color: TEXT, marginBottom: 10 }}>
            {article.title}
          </h3>
          <p style={{ fontSize: 12, color: '#777', lineHeight: 1.7, marginBottom: 16 }}>{article.excerpt}</p>
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 14, borderTop: '1px solid #222', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
              <div style={{ width: 27, height: 27, borderRadius: '50%', background: '#1f1f1f', border: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: ORANGE, fontWeight: 700, flexShrink: 0 }}>
                {article.author.split(' ').map(w => w[0]).join('')}
              </div>
              <div>
                <div style={{ fontSize: 11, color: '#ccc', fontWeight: 500 }}>{article.author}</div>
                <div style={{ fontSize: 9.5, color: DIM }}>{article.date}</div>
              </div>
            </div>
            <span style={{ fontSize: 9.5, color: DIM, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{article.readTime}</span>
          </div>
          <div style={{ fontSize: 9.5, color: hov ? ORANGE : DIM, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 5, transition: 'color 0.2s' }}>
            {isReview ? 'Read Full Review' : 'Read Article'}
            <span style={{ transition: 'transform 0.2s', transform: hov ? 'translateX(4px)' : 'translateX(0)' }}>→</span>
          </div>
        </div>
      </div>
    </div>
  )

  if (hasFullPage) {
    return (
      <Link href={`/articles/${article.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
        {inner}
      </Link>
    )
  }

  return inner
}

export default function ArticlesGrid() {
  const { savedArticles, toggleSave } = useAuth()
  const [activeCat, setActiveCat] = useState<ArticleCategory>('all')
  const [search, setSearch] = useState('')
  const [focused, setFocused] = useState(false)

  const filtered = ARTICLES.filter(a => {
    const mc = activeCat === 'all' || a.category === activeCat
    const q = search.toLowerCase()
    const ms = !search || a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q) || a.tag.toLowerCase().includes(q)
    return mc && ms
  })

  const featured = filtered.filter(a => a.featured)
  const rest = filtered.filter(a => !a.featured)

  return (
    <div style={{ background: BG, padding: '52px 56px 88px' }}>
      {/* Filter bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 44, flexWrap: 'wrap', gap: 16 }}>
        <div style={{ display: 'flex', gap: 2 }}>
          {ARTICLE_CATEGORIES.map(cat => {
            const active = activeCat === cat.value
            return (
              <button
                key={cat.value}
                onClick={() => setActiveCat(cat.value as ArticleCategory)}
                style={{ padding: '9px 18px', background: active ? ORANGE : SURFACE, color: active ? '#fff' : DIM, border: `1px solid ${active ? ORANGE : BORDER}`, fontSize: 9.5, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'inherit' }}
              >
                {cat.label}
              </button>
            )
          })}
        </div>
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#444', fontSize: 14, pointerEvents: 'none' }}>⌕</span>
          <input
            placeholder="Search articles..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            style={{ width: 240, padding: '9px 14px 9px 34px', background: SURFACE, border: `1px solid ${focused ? ORANGE : BORDER}`, color: TEXT, fontSize: 12, outline: 'none', fontFamily: 'inherit', transition: 'border-color 0.2s' }}
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '88px 0' }}>
          <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 30, color: BORDER, marginBottom: 12 }}>No Articles Found</div>
          <p style={{ color: DIM, fontSize: 13.5 }}>Try a different category or search term.</p>
        </div>
      ) : (
        <>
          {featured.length > 0 && (
            <div style={{ marginBottom: 44 }}>
              <div style={{ fontSize: 8.5, letterSpacing: '0.26em', textTransform: 'uppercase', color: '#444', fontWeight: 700, marginBottom: 16 }}>Featured</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {featured.map(a => (
                  <ArticleCard key={a.slug} article={a} featured isSaved={savedArticles.includes(a.slug)} onToggleSave={toggleSave} />
                ))}
              </div>
            </div>
          )}
          {rest.length > 0 && (
            <div>
              {featured.length > 0 && (
                <div style={{ fontSize: 8.5, letterSpacing: '0.26em', textTransform: 'uppercase', color: '#444', fontWeight: 700, marginBottom: 16 }}>More Articles</div>
              )}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2 }}>
                {rest.map(a => (
                  <ArticleCard key={a.slug} article={a} isSaved={savedArticles.includes(a.slug)} onToggleSave={toggleSave} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
