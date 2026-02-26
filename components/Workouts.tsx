'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

const workouts = [
  {
    tag: 'Strength',
    name: 'Full Body Blitz',
    duration: '30 min',
    level: 'Intermediate',
    equipment: 'No Equipment',
    image:
      'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=600&q=80&fit=crop',
  },
  {
    tag: 'Cardio',
    name: 'Silent HIIT',
    duration: '20 min',
    level: 'All Levels',
    equipment: 'Neighbor-Safe',
    image:
      'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=600&q=80&fit=crop',
  },
  {
    tag: 'Recovery',
    name: 'Mobility Reset',
    duration: '15 min',
    level: 'Beginner',
    equipment: 'Mat Only',
    image:
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80&fit=crop',
  },
]

export default function Workouts() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
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
      id="workouts"
      style={{ background: '#0a0a0a', padding: '100px 80px' }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '60px',
        }}
      >
        <div>
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
            Train Today
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              lineHeight: 1,
              letterSpacing: '0.02em',
            }}
          >
            Pick Your{' '}
            <em
              style={{
                fontFamily: 'var(--font-dm-serif)',
                fontStyle: 'italic',
                color: '#e8521a',
              }}
            >
              Session
            </em>
          </h2>
        </div>

        <Link
          href="#"
          className="view-all"
          style={{
            color: '#e8521a',
            textDecoration: 'none',
            fontSize: '0.78rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'gap 0.2s',
          }}
        >
          View All Workouts →
        </Link>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2px',
        }}
      >
        {workouts.map((w, i) => (
          <div
            key={w.name}
            className="workout-card fade-up"
            style={{
              position: 'relative',
              aspectRatio: '3/4',
              overflow: 'hidden',
              cursor: 'pointer',
              transitionDelay: `${i * 0.1}s`,
            }}
          >
            <div
              className="workout-card-bg"
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url('${w.image}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'brightness(0.5)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to top, rgba(10,10,10,0.95) 0%, transparent 60%)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '32px',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  padding: '4px 10px',
                  background: '#e8521a',
                  color: '#f5f4f0',
                  fontSize: '0.65rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  marginBottom: '12px',
                }}
              >
                {w.tag}
              </span>
              <div
                style={{
                  fontFamily: 'var(--font-bebas)',
                  fontSize: '2rem',
                  lineHeight: 1,
                  letterSpacing: '0.04em',
                  color: '#f5f4f0',
                  marginBottom: '8px',
                }}
              >
                {w.name}
              </div>
              <div
                style={{
                  display: 'flex',
                  gap: '16px',
                  fontSize: '0.72rem',
                  color: '#888',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                <span>{w.duration}</span>
                <span>·</span>
                <span>{w.level}</span>
                <span>·</span>
                <span>{w.equipment}</span>
              </div>
              <Link
                href="#"
                className="workout-cta"
                style={{
                  display: 'block',
                  marginTop: '16px',
                  padding: '12px 20px',
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: '#f5f4f0',
                  fontSize: '0.72rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  textAlign: 'center',
                  textDecoration: 'none',
                }}
              >
                Start Workout →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
