'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ORANGE, SURFACE, BORDER, TEXT, DIM } from '@/lib/constants'
import { Lbl } from '@/components/ui/primitives'

function FLink({ href = '#', children }: { href?: string; children: React.ReactNode }) {
  const [hov, setHov] = useState(false)
  return (
    <li>
      <Link
        href={href}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{ fontSize: 11, color: hov ? TEXT : '#666', cursor: 'pointer', transition: 'color 0.2s', textDecoration: 'none' }}
      >
        {children}
      </Link>
    </li>
  )
}

function SLink({ children }: { children: React.ReactNode }) {
  const [hov, setHov] = useState(false)
  return (
    <span
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ fontSize: 9.5, color: hov ? ORANGE : DIM, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', transition: 'color 0.2s' }}
    >
      {children}
    </span>
  )
}

export default function Footer() {
  return (
    <footer style={{ background: SURFACE, borderTop: `1px solid ${BORDER}`, padding: '52px 24px 32px' }} className="footer-root">
      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 48px;
          margin-bottom: 44px;
        }
        .footer-bottom {
          border-top: 1px solid #222;
          padding-top: 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        @media (max-width: 640px) {
          .footer-root {
            padding: 40px 20px 28px !important;
          }
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 32px;
          }
          .footer-brand {
            grid-column: 1 / -1;
          }
          .footer-bottom {
            flex-direction: column;
            gap: 16px;
            align-items: flex-start;
          }
        }
      `}</style>
      <div className="footer-grid">
        <div className="footer-brand">
          <Link href="/" style={{ fontFamily: 'var(--font-bebas)', fontSize: 22, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12, display: 'block', color: TEXT, textDecoration: 'none' }}>
            Apartment<span style={{ color: ORANGE }}>Athlete</span>
          </Link>
          <p style={{ fontSize: 11, color: '#777', lineHeight: 1.65, maxWidth: 220 }}>
            Elite fitness for people who live in the real world. No gym. No excuses. Just results.
          </p>
        </div>
        <div>
          <Lbl style={{ marginBottom: 14 }}>Train</Lbl>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 9 }}>
            <FLink>All Workouts</FLink>
            <FLink>12-Week Program</FLink>
            <FLink>Silent HIIT</FLink>
            <FLink>Mobility</FLink>
          </ul>
        </div>
        <div>
          <Lbl style={{ marginBottom: 14 }}>Articles</Lbl>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 9 }}>
            <FLink href="/articles">Guides</FLink>
            <FLink href="/articles">Equipment Reviews</FLink>
            <FLink href="/articles">Programs</FLink>
            <FLink href="/articles">Nutrition</FLink>
          </ul>
        </div>
        <div>
          <Lbl style={{ marginBottom: 14 }}>Company</Lbl>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 9 }}>
            <FLink>About</FLink>
            <FLink>Coaching</FLink>
            <FLink>Contact</FLink>
            <FLink>Privacy</FLink>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span style={{ fontSize: 10, color: DIM }}>© 2026 ApartmentAthlete. All rights reserved.</span>
        <div style={{ display: 'flex', gap: 20 }}>
          <SLink>Instagram</SLink>
          <SLink>TikTok</SLink>
          <SLink>YouTube</SLink>
          <SLink>Twitter</SLink>
        </div>
      </div>
    </footer>
  )
}
