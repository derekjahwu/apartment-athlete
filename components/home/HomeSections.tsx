'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ORANGE, SURFACE, BORDER, TEXT } from '@/lib/constants'
import { OBtn, Lbl } from '@/components/ui/primitives'
import Link from 'next/link'

function workoutSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

// ── Ticker ───────────────────────────────────────────────────────────────────

const TICKER_ITEMS = ['BODYWEIGHT STRENGTH', 'HIIT IN 20 MINUTES', 'ZERO EQUIPMENT', 'APARTMENT APPROVED', 'REAL RESULTS', 'NO GYM REQUIRED']

export function Ticker() {
  return (
    <div style={{ background: ORANGE, overflow: 'hidden', height: 40, display: 'flex', alignItems: 'center' }}>
      <div className="animate-ticker" style={{ display: 'flex', whiteSpace: 'nowrap' }}>
        {TICKER_ITEMS.concat(TICKER_ITEMS).map((item, i) => (
          <span
            key={i}
            style={{ fontFamily: 'var(--font-bebas)', fontSize: 13, letterSpacing: '0.18em', color: '#fff', padding: '0 36px', display: 'inline-flex', alignItems: 'center', gap: 36 }}
          >
            {item} <span style={{ fontSize: 7 }}>*</span>
          </span>
        ))}
      </div>
    </div>
  )
}

// ── Philosophy ───────────────────────────────────────────────────────────────

function PhilCard({ n, title, text }: { n: string; title: string; text: string }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ padding: '40px 36px', background: hov ? '#1a1a1a' : '#0a0a0a', transition: 'background 0.25s' }}
    >
      <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 56, color: hov ? ORANGE : '#252525', lineHeight: 1, marginBottom: 16, transition: 'color 0.25s' }}>{n}</div>
      <div style={{ fontFamily: 'var(--font-dm-serif)', fontSize: 16, fontStyle: 'italic', color: TEXT, marginBottom: 10 }}>{title}</div>
      <p style={{ fontSize: 12, color: '#777', lineHeight: 1.65 }}>{text}</p>
    </div>
  )
}

export function Philosophy() {
  return (
    <section className="px-6 py-12 sm:px-14 sm:py-16" style={{ background: SURFACE, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
      <Lbl>Our Philosophy</Lbl>
      <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', letterSpacing: '0.02em', color: TEXT, marginBottom: 40, lineHeight: 1 }}>
        Built on{' '}
        <em style={{ fontFamily: 'var(--font-dm-serif)', fontStyle: 'italic', color: ORANGE }}>Three Rules</em>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5">
        <PhilCard n="01" title="Minimum Effective Dose" text="The right 25-minute session done consistently beats the perfect workout you never do." />
        <PhilCard n="02" title="Space is Never the Excuse" text="Arms outstretched = enough room. Every program tested in an actual apartment." />
        <PhilCard n="03" title="Progress Beats Perfection" text="Track consistency, strength gains, and how you feel — not macros to three decimal places." />
      </div>
    </section>
  )
}

// ── Workouts ─────────────────────────────────────────────────────────────────

function WorkoutCard({ tag, name, meta, img }: { tag: string; name: string; meta: string; img: string }) {
  const [hov, setHov] = useState(false)
  const router = useRouter()
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      onClick={() => router.push(`/workout/${workoutSlug(name)}`)}
      style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', cursor: 'pointer' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `url('${img}')`, backgroundSize: 'cover', backgroundPosition: 'center', filter: hov ? 'brightness(0.3)' : 'brightness(0.5)', transform: hov ? 'scale(1.05)' : 'scale(1)', transition: 'filter 0.5s, transform 0.5s' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(10,10,10,0.95) 0%,transparent 55%)' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px 22px' }}>
        <span style={{ display: 'inline-block', padding: '3px 9px', background: ORANGE, color: '#fff', fontSize: 8, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 8 }}>{tag}</span>
        <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 22, letterSpacing: '0.04em', color: TEXT, marginBottom: 6, lineHeight: 1.1 }}>{name}</div>
        <div style={{ fontSize: 9.5, color: '#888', letterSpacing: '0.08em' }}>{meta}</div>
        <div style={{ marginTop: 12, padding: '10px 14px', border: '1px solid rgba(255,255,255,0.18)', color: TEXT, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, textAlign: 'center', opacity: hov ? 1 : 0, transform: hov ? 'translateY(0)' : 'translateY(8px)', transition: 'opacity 0.3s, transform 0.3s' }}>
          Start Workout
        </div>
      </div>
    </div>
  )
}

export function Workouts() {
  return (
    <section id="workouts" className="px-6 py-12 sm:px-14 sm:py-16" style={{ background: '#0a0a0a' }}>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between mb-9">
        <div>
          <Lbl>Train Today</Lbl>
          <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', letterSpacing: '0.02em', color: TEXT, lineHeight: 1 }}>
            Pick Your{' '}
            <em style={{ fontFamily: 'var(--font-dm-serif)', fontStyle: 'italic', color: ORANGE }}>Session</em>
          </h2>
        </div>
        <Link href="#calendar">
        <span style={{ fontSize: 10, color: ORANGE, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, cursor: 'pointer' }}>View All Workouts</span>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0.5">
        <WorkoutCard tag="Strength" name="Full Body Blitz" meta="30 min · Intermediate · No Equipment" img="/img/full-body-blitz.jpeg" />
        <WorkoutCard tag="Cardio"   name="Silent HIIT"     meta="20 min · All Levels · Neighbor-Safe"  img="/img/upper-body.jpeg" />
        <WorkoutCard tag="Recovery" name="Mobility Reset"  meta="15 min · Beginner · Mat Only"         img="/img/mobility-reset.jpeg" />
      </div>
    </section>
  )
}

// ── Featured Guide ────────────────────────────────────────────────────────────

export function FeaturedGuide() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2" style={{ background: SURFACE, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
      <div className="relative h-56 md:h-auto" style={{ minHeight: 'unset' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: "url('/img/aa-banner.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="hidden md:block" style={{ position: 'absolute', inset: 0, background: `linear-gradient(to right,transparent 50%,${SURFACE})` }} />
        <div className="block md:hidden" style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top,${SURFACE} 0%,transparent 60%)` }} />
      </div>
      <div className="px-6 py-10 sm:px-12 sm:py-16 flex flex-col justify-center">
        <Lbl>Featured Guide</Lbl>
        <h2 style={{ fontFamily: 'var(--font-dm-serif)', fontStyle: 'italic', fontSize: 24, lineHeight: 1.3, color: TEXT, marginBottom: 18 }}>
          The Apartment Athlete Starter Kit: Build Serious Muscle With Minimal Equipment
        </h2>
        <p style={{ fontSize: 12.5, color: '#777', lineHeight: 1.75, marginBottom: 32, maxWidth: 400 }}>
          The complete framework for building real, lasting strength using nothing but your bodyweight and 6 sq ft of floor space.
        </p>
        <OBtn style={{ alignSelf: 'flex-start' }}>Read the Guide</OBtn>
      </div>
    </section>
  )
}

// ── Testimonials ──────────────────────────────────────────────────────────────

function TestiCard({ initials, name, role, quote }: { initials: string; name: string; role: string; quote: string }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ background: SURFACE, padding: '36px 32px', borderTop: `3px solid ${hov ? ORANGE : BORDER}`, transition: 'border-color 0.25s' }}
    >
      <div style={{ color: '#f2c94c', fontSize: 12, letterSpacing: 3, marginBottom: 16 }}>*****</div>
      <p style={{ fontFamily: 'var(--font-dm-serif)', fontStyle: 'italic', fontSize: 14, lineHeight: 1.65, color: TEXT, marginBottom: 22 }}>"{quote}"</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#1f1f1f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-bebas)', fontSize: 13, color: ORANGE, flexShrink: 0 }}>{initials}</div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 11.5, color: TEXT }}>{name}</div>
          <div style={{ fontSize: 10, color: '#666' }}>{role}</div>
        </div>
      </div>
    </div>
  )
}

export function Testimonials() {
  return (
    <section className="px-6 py-12 sm:px-14 sm:py-16" style={{ background: '#0a0a0a', borderTop: `1px solid ${BORDER}` }}>
      <Lbl>Real People. Real Results.</Lbl>
      <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', letterSpacing: '0.02em', color: TEXT, lineHeight: 1, marginBottom: 36 }}>
        What{' '}
        <em style={{ fontFamily: 'var(--font-dm-serif)', fontStyle: 'italic', color: ORANGE }}>Athletes</em>{' '}
        Say
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5">
        <TestiCard initials="JM" name="Jordan M." role="Software Engineer, New York" quote="I live in a studio in NYC. I genuinely thought that meant giving up on serious training. ApartmentAthlete proved me completely wrong." />
        <TestiCard initials="SR" name="Simone R." role="Teacher, Chicago" quote="The Silent HIIT workouts are a revelation. My downstairs neighbors have literally thanked me. I've never been in better shape." />
        <TestiCard initials="DL" name="Daniel L." role="Freelance Designer, Austin" quote="I canceled my $150/month gym six months ago. I'm stronger, more consistent, and I've saved $900. The content here is world-class." />
      </div>
    </section>
  )
}

// ── Newsletter ────────────────────────────────────────────────────────────────

export function Newsletter() {
  const [sent, setSent] = useState(false)
  return (
    <section id="newsletter" className="px-6 py-12 sm:px-14 sm:py-16 flex flex-col gap-8 md:flex-row md:items-center md:justify-between" style={{ background: ORANGE }}>
      <div>
        <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', letterSpacing: '0.02em', color: '#fff', lineHeight: 1 }}>Train Smarter.<br />Every Week.</h2>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', marginTop: 8 }}>One email. Three workouts. Zero fluff. Free forever.</p>
      </div>
      <div className="flex w-full md:w-auto md:min-w-[360px] md:flex-shrink-0">
        <input
          placeholder={sent ? 'Check your inbox!' : 'your@email.com'}
          readOnly
          style={{ flex: 1, padding: '14px 16px', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRight: 'none', color: '#fff', fontSize: 12.5, outline: 'none', fontFamily: 'inherit' }}
        />
        <button
          onClick={() => { setSent(true); setTimeout(() => setSent(false), 3000) }}
          style={{ padding: '14px 20px', background: '#0a0a0a', color: '#fff', fontSize: 9.5, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'inherit' }}
        >
          {sent ? 'Subscribed!' : 'Join Free'}
        </button>
      </div>
    </section>
  )
}
