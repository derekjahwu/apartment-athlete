'use client'

import { useState } from 'react'

import { getWorkout } from '@/lib/workouts'
import { ORANGE, TEXT, BORDER } from '@/lib/constants'
import { OBtn, Lbl } from '@/components/ui/primitives'
import HeroImage from 'next/image'


interface HeroProps {
  onOpenAuth: () => void
}

export default function Hero() {
  // const { user } = useAuth()
  const [sent, setSent] = useState(false)
  const todayWorkout = getWorkout(new Date().getDate())

  return (
    <section style={{ background: '#0a0a0a', display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 540 }}>
      <div style={{ padding: '72px 48px 72px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <span style={{ display: 'block', width: 28, height: 2, background: ORANGE, flexShrink: 0 }} />
          <Lbl style={{ marginBottom: 0 }}>Real Training For Real Spaces</Lbl>
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: 'clamp(3.5rem, 6vw, 6.5rem)',
            lineHeight: 0.92,
            letterSpacing: '0.02em',
            marginBottom: 24,
            color: TEXT,
          }}
        >
          No Gym.<br />
          <em style={{ fontFamily: 'var(--font-dm-serif)', fontStyle: 'italic', color: ORANGE }}>No Excuses.</em><br />
          No Problem.
        </h1>

        <p style={{ fontSize: 13.5, color: '#777', lineHeight: 1.7, maxWidth: 340, marginBottom: 32 }}>
          Elite-level workouts designed for <strong style={{ color: '#ccc' }}>300 sq ft or 3,000</strong>.
          Your living room is your performance lab.
        </p>

        {/* {user ? (
          <div style={{ padding: '16px 20px', background: 'rgba(232,82,26,0.08)', border: '1px solid rgba(232,82,26,0.25)', maxWidth: 380 }}>
            <div style={{ fontSize: 9, color: ORANGE, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 6 }}>
              Welcome back, {user.name.split(' ')[0]}
            </div>
            <div style={{ fontSize: 13.5, color: TEXT, fontWeight: 600 }}>Today: {todayWorkout.name}</div>
            <div style={{ fontSize: 10.5, color: '#888', marginTop: 3 }}>{todayWorkout.duration} · {todayWorkout.level}</div>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', maxWidth: 400 }}>
              <input
                placeholder={sent ? 'Check your inbox!' : 'your@email.com'}
                readOnly
                style={{ flex: 1, padding: '13px 16px', background: '#1f1f1f', border: `1px solid ${BORDER}`, borderRight: 'none', color: TEXT, fontSize: 12, outline: 'none', fontFamily: 'inherit' }}
              />
              <OBtn
                onClick={() => { setSent(true); setTimeout(() => setSent(false), 3000) }}
                style={{ padding: '13px 20px', fontSize: 10, letterSpacing: '0.12em', whiteSpace: 'nowrap' }}
              >
                {sent ? "You're in!" : 'Get Free Plan'}
              </OBtn>
            </div>
            <p style={{ marginTop: 10, fontSize: 10, color: '#555' }}>Join 47,000+ apartment athletes. No spam.</p>
          </>
        )} */}
      </div>

      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: "url('/img/5132824-man-2264825_1920.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(232,82,26,0.18) 0%,transparent 50%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to left,transparent,rgba(10,10,10,0.55))' }} />

        <div style={{ position: 'absolute', bottom: 44, left: 36, display: 'flex', gap: 28 }}>
          {[['200+', 'No-Equip Workouts'], ['12', 'Week Programs'], ['47K', 'Athletes']].map(([num, label]) => (
            <div key={label} style={{ borderLeft: '3px solid ' + ORANGE, paddingLeft: 12 }}>
              <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 30, color: TEXT, lineHeight: 1 }}>{num}</div>
              <div style={{ fontSize: 9, color: '#888', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 3 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
