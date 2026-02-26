'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

export default function FeaturedGuide() {
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
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      className="fade-up"
      style={{
        background: '#141414',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        borderTop: '1px solid #2a2a2a',
        borderBottom: '1px solid #2a2a2a',
      }}
    >
      {/* Image side */}
      <div
        style={{
          position: 'relative',
          minHeight: '520px',
          background: `url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80&fit=crop') center / cover no-repeat`,
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, transparent 60%, #141414)',
          }}
        />
      </div>

      {/* Content side */}
      <div
        style={{
          padding: '80px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            fontSize: '0.68rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#e8521a',
            fontWeight: 700,
            marginBottom: '28px',
          }}
        >
          Featured Guide
        </div>

        <h2
          style={{
            fontFamily: 'var(--font-dm-serif)',
            fontSize: '2.2rem',
            lineHeight: 1.2,
            color: '#f5f4f0',
            marginBottom: '20px',
          }}
        >
          The Apartment Athlete Starter Kit: Build Serious Muscle Without a
          Single Weight
        </h2>

        <p
          style={{
            color: '#888',
            fontSize: '0.95rem',
            lineHeight: 1.75,
            marginBottom: '36px',
            maxWidth: '420px',
          }}
        >
          Most &quot;home workout&quot; guides assume you have at least a set of
          dumbbells. We don&apos;t. This is the complete framework for building
          real, lasting strength using nothing but your bodyweight, progressive
          overload principles, and 6 square feet of floor space.
        </p>

        <Link
          href="#"
          className="btn-primary"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '16px 28px',
            background: '#e8521a',
            color: '#f5f4f0',
            textDecoration: 'none',
            fontSize: '0.78rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            fontWeight: 700,
            transition: 'background 0.2s',
            alignSelf: 'flex-start',
          }}
        >
          Read the Guide →
        </Link>
      </div>
    </section>
  )
}
