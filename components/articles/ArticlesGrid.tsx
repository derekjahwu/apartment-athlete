'use client'

import { useState } from 'react'
import { ARTICLES, CATEGORIES, type Category } from './articlesData'

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      <div style={{ display: 'flex', gap: '2px' }}>
        {[1, 2, 3, 4, 5].map((s) => (
          <span
            key={s}
            style={{
              color: s <= Math.round(rating) ? '#f2c94c' : '#333',
              fontSize: '0.7rem',
            }}
          >
            ★
          </span>
        ))}
      </div>
      <span style={{ fontSize: '0.72rem', color: '#888', fontWeight: 600 }}>
        {rating.toFixed(1)}
      </span>
    </div>
  )
}

function ArticleCard({ article, featured = false }: { article: typeof ARTICLES[0]; featured?: boolean }) {
  const [hov, setHov] = useState(false)
  const isReview = article.category === 'reviews'

  return (
    <article
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: '#141414',
        display: 'flex',
        flexDirection: featured ? 'row' : 'column',
        cursor: 'pointer',
        border: `1px solid ${hov ? '#e8521a' : '#2a2a2a'}`,
        transition: 'border-color 0.25s',
        overflow: 'hidden',
      }}
    >
      {/* Image */}
      <div
        style={{
          position: 'relative',
          flexShrink: 0,
          width: featured ? '42%' : '100%',
          aspectRatio: featured ? 'auto' : '16/9',
          minHeight: featured ? 280 : 'auto',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url('${article.image}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: hov ? 'brightness(0.7)' : 'brightness(0.55)',
            transform: hov ? 'scale(1.04)' : 'scale(1)',
            transition: 'filter 0.5s, transform 0.5s',
          }}
        />
        {/* Tag badge */}
        <div
          style={{
            position: 'absolute',
            top: 14,
            left: 14,
            padding: '4px 10px',
            background: isReview ? '#141414' : '#e8521a',
            border: isReview ? '1px solid #e8521a' : 'none',
            color: isReview ? '#e8521a' : '#fff',
            fontSize: '0.62rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            fontWeight: 700,
          }}
        >
          {article.tag}
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          padding: featured ? '36px 40px' : '24px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flex: 1,
        }}
      >
        <div>
          {isReview && article.rating && (
            <div style={{ marginBottom: '10px' }}>
              <StarRating rating={article.rating} />
            </div>
          )}
          <h2
            style={{
              fontFamily: 'var(--font-dm-serif)',
              fontStyle: 'italic',
              fontSize: featured ? '1.5rem' : '1.1rem',
              lineHeight: 1.3,
              color: '#f5f4f0',
              marginBottom: '12px',
              transition: 'color 0.2s',
              ...(hov ? { color: '#fff' } : {}),
            }}
          >
            {article.title}
          </h2>
          <p
            style={{
              fontSize: '0.88rem',
              color: '#777',
              lineHeight: 1.7,
              marginBottom: '20px',
            }}
          >
            {article.excerpt}
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '16px',
            borderTop: '1px solid #222',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: '#1f1f1f',
                border: '1px solid #2a2a2a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.6rem',
                color: '#e8521a',
                fontWeight: 700,
                letterSpacing: '0.05em',
                flexShrink: 0,
              }}
            >
              {article.author.split(' ').map((w) => w[0]).join('')}
            </div>
            <div>
              <div style={{ fontSize: '0.78rem', color: '#ccc', fontWeight: 500 }}>
                {article.author}
              </div>
              <div style={{ fontSize: '0.68rem', color: '#555' }}>{article.date}</div>
            </div>
          </div>
          <span
            style={{
              fontSize: '0.68rem',
              color: '#555',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            {article.readTime}
          </span>
        </div>

        {/* Read CTA */}
        <div
          style={{
            marginTop: '16px',
            fontSize: '0.75rem',
            color: hov ? '#e8521a' : '#555',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'color 0.2s',
          }}
        >
          {isReview ? 'Read Full Review' : 'Read Article'}
          <span style={{ transition: 'transform 0.2s', transform: hov ? 'translateX(4px)' : 'translateX(0)' }}>→</span>
        </div>
      </div>
    </article>
  )
}

export default function ArticlesGrid() {
  const [activeCategory, setActiveCategory] = useState<Category>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = ARTICLES.filter((a) => {
    const matchesCat = activeCategory === 'all' || a.category === activeCategory
    const matchesSearch =
      searchQuery === '' ||
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.tag.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCat && matchesSearch
  })

  const featured = filtered.filter((a) => a.featured)
  const rest = filtered.filter((a) => !a.featured)

  return (
    <section style={{ background: '#0a0a0a', padding: '56px 80px 100px' }}>
      {/* Filter bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '48px',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        {/* Category tabs */}
        <div style={{ display: 'flex', gap: '2px' }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              style={{
                padding: '9px 20px',
                background: activeCategory === cat.value ? '#e8521a' : '#141414',
                color: activeCategory === cat.value ? '#fff' : '#666',
                border: `1px solid ${activeCategory === cat.value ? '#e8521a' : '#2a2a2a'}`,
                fontSize: '0.75rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontFamily: 'inherit',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div style={{ position: 'relative' }}>
          <span
            style={{
              position: 'absolute',
              left: 14,
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#444',
              fontSize: '0.8rem',
              pointerEvents: 'none',
            }}
          >
            ⌕
          </span>
          <input
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: 240,
              padding: '9px 14px 9px 34px',
              background: '#141414',
              border: '1px solid #2a2a2a',
              color: '#f5f4f0',
              fontSize: '0.82rem',
              outline: 'none',
              fontFamily: 'inherit',
              transition: 'border-color 0.2s',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#e8521a')}
            onBlur={(e) => (e.target.style.borderColor = '#2a2a2a')}
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
          <div
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: '2rem',
              color: '#2a2a2a',
              marginBottom: '12px',
            }}
          >
            No Articles Found
          </div>
          <p style={{ color: '#555', fontSize: '0.9rem' }}>
            Try a different category or search term.
          </p>
        </div>
      ) : (
        <>
          {/* Featured articles — horizontal layout */}
          {featured.length > 0 && (
            <div style={{ marginBottom: '48px' }}>
              <div
                style={{
                  fontSize: '0.65rem',
                  letterSpacing: '0.28em',
                  textTransform: 'uppercase',
                  color: '#555',
                  fontWeight: 700,
                  marginBottom: '20px',
                }}
              >
                Featured
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {featured.map((a) => (
                  <ArticleCard key={a.slug} article={a} featured />
                ))}
              </div>
            </div>
          )}

          {/* Standard grid */}
          {rest.length > 0 && (
            <div>
              {featured.length > 0 && (
                <div
                  style={{
                    fontSize: '0.65rem',
                    letterSpacing: '0.28em',
                    textTransform: 'uppercase',
                    color: '#555',
                    fontWeight: 700,
                    marginBottom: '20px',
                  }}
                >
                  More Articles
                </div>
              )}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '2px',
                }}
              >
                {rest.map((a) => (
                  <ArticleCard key={a.slug} article={a} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </section>
  )
}
