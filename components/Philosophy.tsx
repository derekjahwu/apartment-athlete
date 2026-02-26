'use client'

import { useEffect, useRef } from 'react'

const pillars = [
  {
    num: '01',
    title: 'Minimum Effective Dose',
    text: "You don't need two hours and a rack of weights. The right 25-minute session, done consistently, beats the perfect workout you never do.",
  },
  {
    num: '02',
    title: 'Space is Never the Excuse',
    text: 'Every program is tested in an actual apartment. If you can stand with arms outstretched, you have enough room to train like an athlete.',
  },
  {
    num: '03',
    title: 'Progress Beats Perfection',
    text: 'We track what matters: consistency, strength gains, and how you feel. Not macros to three decimal places or hitting every session flawlessly.',
  },
]

export default function Philosophy() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    const items = ref.current?.querySelectorAll('.fade-up')
    items?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      style={{
        background: '#141414',
        borderTop: '1px solid #2a2a2a',
        borderBottom: '1px solid #2a2a2a',
        padding: '80px',
      }}
    >
      <div
        style={{
          fontSize: '0.68rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: '#e8521a',
          fontWeight: 700,
          marginBottom: '12px',
        }}
      >
        Our Philosophy
      </div>
      <h2
        style={{
          fontFamily: 'var(--font-bebas)',
          fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
          lineHeight: 1,
          letterSpacing: '0.02em',
        }}
      >
        Built on{' '}
        <em
          style={{
            fontFamily: 'var(--font-dm-serif)',
            fontStyle: 'italic',
            color: '#e8521a',
          }}
        >
          Three Rules
        </em>
      </h2>

      <div style={{ height: '48px' }} />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2px',
        }}
      >
        {pillars.map((p, i) => (
          <div
            key={p.num}
            className="fade-up phil-item"
            style={{
              padding: '48px 40px',
              background: '#0a0a0a',
              transitionDelay: `${i * 0.1}s`,
            }}
          >
            <div
              className="phil-num"
              style={{
                fontFamily: 'var(--font-bebas)',
                fontSize: '5rem',
                color: '#2a2a2a',
                lineHeight: 1,
                marginBottom: '20px',
              }}
            >
              {p.num}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-dm-serif)',
                fontSize: '1.5rem',
                color: '#f5f4f0',
                marginBottom: '12px',
                fontStyle: 'italic',
              }}
            >
              {p.title}
            </div>
            <p style={{ fontSize: '0.9rem', color: '#888', lineHeight: 1.7 }}>
              {p.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
