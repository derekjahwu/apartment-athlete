'use client'

import { useState } from 'react'
import EmailForm from './EmailForm'

const stats = [
  { num: '200+', label: 'No-Equipment Workouts' },
  { num: '12', label: 'Week Programs' },
  { num: '47K', label: 'Athletes Worldwide' },
]

export default function Hero() {
  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        paddingTop: '64px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* LEFT */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px 60px 80px 80px',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div
          style={{
            fontSize: '0.7rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: '#e8521a',
            fontWeight: 700,
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <span
            style={{
              display: 'block',
              width: '32px',
              height: '2px',
              background: '#e8521a',
              flexShrink: 0,
            }}
          />
          Real Training For Real Spaces
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: 'clamp(5rem, 9vw, 9rem)',
            lineHeight: 0.9,
            letterSpacing: '0.02em',
            marginBottom: '32px',
          }}
        >
          No Gym.
          <em
            style={{
              fontFamily: 'var(--font-dm-serif)',
              fontStyle: 'italic',
              color: '#e8521a',
              display: 'block',
            }}
          >
            No Excuses.
          </em>
          No Problem.
        </h1>

        <p
          style={{
            fontSize: '1.1rem',
            color: '#888',
            maxWidth: '380px',
            lineHeight: 1.7,
            marginBottom: '48px',
            fontWeight: 300,
          }}
        >
          Elite-level workouts designed for{' '}
          <strong style={{ color: '#f5f4f0', fontWeight: 500 }}>
            300 sq ft or 3,000
          </strong>
          . We turn your living room into a performance lab — no equipment
          required, zero fluff.
        </p>

        <EmailForm placeholder="your@email.com" buttonText="Get Free Plan →" />
        <p
          style={{
            marginTop: '16px',
            fontSize: '0.72rem',
            color: '#888',
            letterSpacing: '0.05em',
          }}
        >
          Join 47,000+ apartment athletes. No spam. Unsubscribe anytime.
        </p>
      </div>

      {/* RIGHT */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `
              linear-gradient(135deg, rgba(232,82,26,0.15) 0%, transparent 50%),
              linear-gradient(to left, rgba(10,10,10,0) 0%, rgba(10,10,10,0.6) 100%),
              url('https://images.unsplash.com/photo-1571019613914-85f342c6a11e?w=900&q=80&fit=crop') center / cover no-repeat
            `,
          }}
        />

        <div
          style={{
            position: 'absolute',
            bottom: '60px',
            left: '40px',
            display: 'flex',
            gap: '32px',
          }}
        >
          {stats.map((s) => (
            <div
              key={s.label}
              style={{
                borderLeft: '3px solid #e8521a',
                paddingLeft: '16px',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-bebas)',
                  fontSize: '2.6rem',
                  lineHeight: 1,
                  color: '#f5f4f0',
                }}
              >
                {s.num}
              </div>
              <div
                style={{
                  fontSize: '0.72rem',
                  color: '#888',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
