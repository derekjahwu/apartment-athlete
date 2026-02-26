'use client'

import { useEffect, useRef } from 'react'

const testimonials = [
  {
    initials: 'JM',
    name: 'Jordan M.',
    role: 'Software Engineer, New York',
    quote:
      'I live in a studio in NYC. I genuinely thought that meant giving up on serious training. ApartmentAthlete proved me completely wrong.',
  },
  {
    initials: 'SR',
    name: 'Simone R.',
    role: 'Teacher, Chicago',
    quote:
      "The Silent HIIT workouts are a revelation. My downstairs neighbors have literally thanked me. And I've never been in better shape.",
  },
  {
    initials: 'DL',
    name: 'Daniel L.',
    role: 'Freelance Designer, Austin',
    quote:
      "I canceled my $150/month gym membership six months ago. I'm stronger, I'm more consistent, and I've saved $900. The content here is world-class.",
  },
]

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible')
        })
      },
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.fade-up').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      style={{ background: '#0a0a0a', padding: '100px 80px' }}
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
        Real People. Real Results.
      </div>
      <h2
        style={{
          fontFamily: 'var(--font-bebas)',
          fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
          lineHeight: 1,
          letterSpacing: '0.02em',
        }}
      >
        What{' '}
        <em
          style={{
            fontFamily: 'var(--font-dm-serif)',
            fontStyle: 'italic',
            color: '#e8521a',
          }}
        >
          Athletes
        </em>{' '}
        Say
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2px',
          marginTop: '60px',
        }}
      >
        {testimonials.map((t, i) => (
          <div
            key={t.name}
            className="fade-up testi-card"
            style={{
              background: '#141414',
              padding: '40px',
              transitionDelay: `${i * 0.1}s`,
            }}
          >
            <div
              style={{
                color: '#f2c94c',
                fontSize: '0.9rem',
                letterSpacing: '3px',
                marginBottom: '20px',
              }}
            >
              ★★★★★
            </div>
            <p
              style={{
                fontFamily: 'var(--font-dm-serif)',
                fontStyle: 'italic',
                fontSize: '1.15rem',
                lineHeight: 1.6,
                color: '#f5f4f0',
                marginBottom: '28px',
              }}
            >
              &quot;{t.quote}&quot;
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: '#1f1f1f',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-bebas)',
                  fontSize: '1.1rem',
                  color: '#e8521a',
                  flexShrink: 0,
                }}
              >
                {t.initials}
              </div>
              <div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    color: '#f5f4f0',
                  }}
                >
                  {t.name}
                </div>
                <div
                  style={{
                    fontSize: '0.72rem',
                    color: '#888',
                    letterSpacing: '0.05em',
                  }}
                >
                  {t.role}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
