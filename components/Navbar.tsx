'use client'

import Link from 'next/link'

const NAV_LINKS = [
  { label: 'Workouts', href: '#workouts' },
  { label: 'Training', href: '#training' },
  { label: 'Articles', href: '/articles' },
]

export default function Navbar() {
  return (
    <nav
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 40px',
        height: '64px',
        background: 'rgba(10,10,10,0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #2a2a2a',
      }}
    >
      <Link
        href="/"
        style={{
          fontFamily: 'var(--font-bebas)',
          fontSize: '1.5rem',
          letterSpacing: '0.08em',
          color: '#f5f4f0',
          textDecoration: 'none',
        }}
      >
        Apartment<span style={{ color: '#e8521a' }}>Athlete</span>
      </Link>

      <ul style={{ display: 'flex', gap: '32px', listStyle: 'none', alignItems: 'center' }}>
        {NAV_LINKS.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              style={{
                color: '#888',
                textDecoration: 'none',
                fontSize: '0.8rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: 500,
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#f5f4f0')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#888')}
            >
              {item.label}
            </Link>
          </li>
        ))}
        <li>
          <Link
            href="#newsletter"
            style={{
              background: '#e8521a',
              color: '#f5f4f0',
              padding: '8px 18px',
              borderRadius: '2px',
              fontWeight: 700,
              fontSize: '0.8rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.background = '#ff6b35')}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.background = '#e8521a')}
          >
            Get Free Plan
          </Link>
        </li>
      </ul>
    </nav>
  )
}
