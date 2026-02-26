'use client'

import Link from 'next/link'

const footerCols = [
  {
    title: 'Train',
    links: [
      'All Workouts',
      '12-Week Program',
      'Bodyweight Only',
      'Silent HIIT',
      'Mobility & Recovery',
    ],
  },
  {
    title: 'Learn',
    links: ['Nutrition', 'Sleep & Recovery', 'Exercise Guides', 'Starter Kit', 'Blog'],
  },
  {
    title: 'Company',
    links: ['About', 'Coaching', 'Contact', 'Privacy'],
  },
]

const socials = ['Instagram', 'TikTok', 'YouTube', 'Twitter']

export default function Footer() {
  return (
    <footer
      style={{
        background: '#141414',
        borderTop: '1px solid #2a2a2a',
        padding: '60px 80px 40px',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '60px',
          marginBottom: '60px',
        }}
      >
        {/* Brand */}
        <div>
          <div
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: '2rem',
              letterSpacing: '0.06em',
              color: '#f5f4f0',
              marginBottom: '16px',
            }}
          >
            Apartment<span style={{ color: '#e8521a' }}>Athlete</span>
          </div>
          <p
            style={{
              fontSize: '0.88rem',
              color: '#888',
              lineHeight: 1.6,
              maxWidth: '240px',
            }}
          >
            Elite fitness for people who live in the real world. No gym. No
            excuses. Just results.
          </p>
        </div>

        {/* Columns */}
        {footerCols.map((col) => (
          <div key={col.title}>
            <div
              style={{
                fontSize: '0.68rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#e8521a',
                fontWeight: 700,
                marginBottom: '20px',
              }}
            >
              {col.title}
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {col.links.map((link) => (
                <li key={link}>
                  <Link href="#" className="footer-link">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: '1px solid #2a2a2a',
          paddingTop: '30px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span style={{ fontSize: '0.75rem', color: '#888' }}>
          © 2026 ApartmentAthlete. All rights reserved.
        </span>
        <div style={{ display: 'flex', gap: '20px' }}>
          {socials.map((s) => (
            <Link key={s} href="#" className="footer-social-link">
              {s}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
