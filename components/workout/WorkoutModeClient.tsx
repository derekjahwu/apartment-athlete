'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { useAuth } from '@/lib/AuthContext'
import type { DayWorkout, ExerciseDetail } from '@/lib/workouts'
import { TYPE_COLORS } from '@/lib/workouts'
import { todayKey } from '@/lib/user'
import { ORANGE, SURFACE, BORDER, TEXT, MUTED, DIM, BG } from '@/lib/constants'

// ─── helpers ──────────────────────────────────────────────────────────────────

function fmtTime(secs: number) {
  const m = Math.floor(secs / 60).toString().padStart(2, '0')
  const s = (secs % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

function workoutSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

// ─── auth gate ────────────────────────────────────────────────────────────────

function AuthGate({ onOpenAuth }: { onOpenAuth: () => void }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 40,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(10,10,10,0.72)',
      backdropFilter: 'blur(18px)',
    }}>
      <div style={{
        textAlign: 'center',
        padding: '52px 56px',
        background: SURFACE,
        border: `1px solid ${BORDER}`,
        maxWidth: 420,
        animation: 'wm-fadeUp 0.3s ease',
      }}>
        <div style={{ fontSize: 44, marginBottom: 20, filter: 'grayscale(0.2)' }}>🔒</div>
        <div style={{
          fontFamily: 'var(--font-bebas)',
          fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
          letterSpacing: '0.04em',
          color: TEXT, lineHeight: 1.05, marginBottom: 14,
        }}>
          Unlock{' '}
          <em style={{ fontFamily: 'var(--font-dm-serif)', fontStyle: 'italic', color: ORANGE }}>
            Workout Mode
          </em>
        </div>
        <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.7, marginBottom: 32 }}>
          Create a free account to access the full workout experience — guided sets, rest timers, and automatic streak tracking.
        </p>
        <button
          onClick={onOpenAuth}
          style={{
            width: '100%', padding: '14px', marginBottom: 12,
            background: ORANGE, color: '#fff', border: 'none',
            fontSize: 11, fontWeight: 700, letterSpacing: '0.14em',
            textTransform: 'uppercase', cursor: 'pointer',
            fontFamily: 'inherit', transition: 'background 0.2s',
          }}
          onMouseEnter={e => { (e.currentTarget.style.background = '#ff6b35') }}
          onMouseLeave={e => { (e.currentTarget.style.background = ORANGE) }}
        >
          Create Free Account →
        </button>
        <div
          onClick={onOpenAuth}
          style={{ fontSize: 12, color: DIM, cursor: 'pointer', letterSpacing: '0.04em' }}
        >
          Already a member?{' '}
          <span style={{ color: ORANGE, fontWeight: 700 }}>Sign in</span>
        </div>
      </div>
    </div>
  )
}

// ─── rest timer ───────────────────────────────────────────────────────────────

interface RestTimerProps {
  seconds: number
  onDone: () => void
  onSkip: () => void
}

function RestTimer({ seconds, onDone, onSkip }: RestTimerProps) {
  const [remaining, setRemaining] = useState(seconds)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    setRemaining(seconds)
  }, [seconds])

  useEffect(() => {
    if (remaining <= 0) { onDone(); return }
    intervalRef.current = setInterval(() => {
      setRemaining(r => {
        if (r <= 1) { clearInterval(intervalRef.current!); onDone(); return 0 }
        return r - 1
      })
    }, 1000)
    return () => clearInterval(intervalRef.current!)
  }, [seconds]) // eslint-disable-line react-hooks/exhaustive-deps

  const pct = ((seconds - remaining) / seconds) * 100

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 50,
      background: 'rgba(10,10,10,0.94)',
      backdropFilter: 'blur(8px)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      animation: 'wm-fadeIn 0.2s ease',
    }}>
      <div style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: DIM, fontWeight: 700, marginBottom: 32 }}>
        Rest Period
      </div>

      {/* Circular timer */}
      <div style={{ position: 'relative', width: 200, height: 200, marginBottom: 40 }}>
        <svg width="200" height="200" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="100" cy="100" r="88" fill="none" stroke="#1e1e1e" strokeWidth="8" />
          <circle
            cx="100" cy="100" r="88" fill="none"
            stroke={ORANGE} strokeWidth="8"
            strokeDasharray={`${2 * Math.PI * 88}`}
            strokeDashoffset={`${2 * Math.PI * 88 * (pct / 100)}`}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.9s linear' }}
          />
        </svg>
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: 64, letterSpacing: '0.02em',
            color: remaining <= 5 ? '#ff6b6b' : TEXT,
            lineHeight: 1,
            transition: 'color 0.3s',
          }}>
            {remaining}
          </div>
          <div style={{ fontSize: 10, color: DIM, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 4 }}>
            seconds
          </div>
        </div>
      </div>

      <button
        onClick={onSkip}
        style={{
          padding: '12px 32px',
          background: 'transparent',
          border: `1px solid ${BORDER}`,
          color: MUTED, fontSize: 10, fontWeight: 700,
          letterSpacing: '0.14em', textTransform: 'uppercase',
          cursor: 'pointer', fontFamily: 'inherit',
          transition: 'all 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = ORANGE; e.currentTarget.style.color = ORANGE }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.color = MUTED }}
      >
        Skip Rest →
      </button>
    </div>
  )
}

// ─── completion screen ────────────────────────────────────────────────────────

function CompletionScreen({ workout, elapsed, onLogAndExit }: {
  workout: DayWorkout
  elapsed: number
  onLogAndExit: () => void
}) {
  const [logged, setLogged] = useState(false)

  function handleLog() {
    setLogged(true)
    onLogAndExit()
  }

  const c = TYPE_COLORS[workout.type]

  return (
    <div style={{
      minHeight: '100vh', background: BG,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '48px 24px',
      textAlign: 'center',
      animation: 'wm-fadeUp 0.4s ease',
    }}>
      {/* Big checkmark */}
      <div style={{
        width: 96, height: 96, borderRadius: '50%',
        background: `${ORANGE}18`,
        border: `2px solid ${ORANGE}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 44, marginBottom: 36,
        animation: 'wm-popIn 0.5s cubic-bezier(0.34,1.56,0.64,1)',
      }}>
        ✓
      </div>

      <div style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: ORANGE, fontWeight: 700, marginBottom: 12 }}>
        Workout Complete
      </div>
      <h1 style={{
        fontFamily: 'var(--font-bebas)',
        fontSize: 'clamp(2.5rem, 6vw, 5rem)',
        letterSpacing: '0.02em', color: TEXT,
        lineHeight: 0.95, marginBottom: 12,
      }}>
        {workout.name}
      </h1>
      <p style={{ fontSize: 14, color: MUTED, marginBottom: 48 }}>
        You crushed it. Every rep counted.
      </p>

      {/* Stats row */}
      <div style={{ display: 'flex', gap: 2, marginBottom: 52, flexWrap: 'wrap', justifyContent: 'center' }}>
        {[
          { label: 'Time', value: fmtTime(elapsed) },
          { label: 'Exercises', value: workout.details.length },
          { label: 'Total Sets', value: workout.details.reduce((a, e) => a + e.sets, 0) },
          { label: 'Type', value: workout.type },
        ].map(({ label, value }) => (
          <div key={label} style={{
            padding: '20px 28px', background: SURFACE,
            border: `1px solid ${c.border}`, textAlign: 'center', minWidth: 100,
          }}>
            <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 28, color: c.text, lineHeight: 1 }}>
              {value}
            </div>
            <div style={{ fontSize: 8.5, color: DIM, letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: 4 }}>
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <button
        onClick={handleLog}
        disabled={logged}
        style={{
          padding: '16px 48px', marginBottom: 16,
          background: logged ? '#1a2e1a' : ORANGE,
          border: logged ? '1px solid #82d296' : 'none',
          color: logged ? '#82d296' : '#fff',
          fontSize: 11, fontWeight: 700, letterSpacing: '0.14em',
          textTransform: 'uppercase', cursor: logged ? 'default' : 'pointer',
          fontFamily: 'inherit', transition: 'all 0.3s',
        }}
      >
        {logged ? '✓ Logged to your streak!' : 'Log Workout & Return Home'}
      </button>

      {logged && (
        <Link href="/" style={{
          fontSize: 11, color: ORANGE, textDecoration: 'none',
          letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700,
        }}>
          Back to Home →
        </Link>
      )}
    </div>
  )
}

// ─── exercise card ────────────────────────────────────────────────────────────

interface ExerciseCardProps {
  exercise: ExerciseDetail
  index: number
  isActive: boolean
  isComplete: boolean
  completedSets: number
  onSetDone: () => void
  c: { bg: string; text: string; border: string; dot: string }
}

function ExerciseCard({ exercise, index, isActive, isComplete, completedSets, onSetDone, c }: ExerciseCardProps) {
  const [noteOpen, setNoteOpen] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isActive && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [isActive])

  return (
    <div
      ref={cardRef}
      style={{
        border: `1px solid ${isActive ? c.border : isComplete ? 'rgba(130,210,150,0.3)' : BORDER}`,
        background: isActive ? c.bg : isComplete ? 'rgba(130,210,150,0.04)' : SURFACE,
        transition: 'all 0.3s',
        opacity: !isActive && !isComplete ? 0.45 : 1,
        borderLeft: isActive ? `3px solid ${c.text}` : isComplete ? '3px solid #82d296' : `3px solid transparent`,
      }}
    >
      {/* Header row */}
      <div style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
        {/* Index / check */}
        <div style={{
          width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
          background: isComplete ? 'rgba(130,210,150,0.15)' : isActive ? `${c.text}18` : '#1a1a1a',
          border: `1px solid ${isComplete ? '#82d296' : isActive ? c.text : BORDER}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-bebas)', fontSize: 14, letterSpacing: '0.04em',
          color: isComplete ? '#82d296' : isActive ? c.text : DIM,
          transition: 'all 0.3s',
        }}>
          {isComplete ? '✓' : String(index + 1).padStart(2, '0')}
        </div>

        {/* Name + meta */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: 20, letterSpacing: '0.04em',
            color: isComplete ? '#82d296' : isActive ? TEXT : MUTED,
            lineHeight: 1, transition: 'color 0.3s',
          }}>
            {exercise.name}
          </div>
          <div style={{ fontSize: 10.5, color: DIM, marginTop: 3, display: 'flex', gap: 12 }}>
            <span>{exercise.sets} sets</span>
            <span>·</span>
            <span>{exercise.reps} reps</span>
            <span>·</span>
            <span>{exercise.rest > 0 ? `${exercise.rest}s rest` : 'No rest'}</span>
          </div>
        </div>

        {/* Note toggle */}
        {exercise.note && (
          <button
            onClick={() => setNoteOpen(o => !o)}
            style={{
              width: 28, height: 28, borderRadius: '50%',
              background: noteOpen ? ORANGE + '22' : 'transparent',
              border: `1px solid ${noteOpen ? ORANGE : BORDER}`,
              color: noteOpen ? ORANGE : DIM,
              fontSize: 12, cursor: 'pointer', fontFamily: 'inherit',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s', flexShrink: 0,
            }}
          >
            ?
          </button>
        )}
      </div>

      {/* Coach note */}
      {noteOpen && exercise.note && (
        <div style={{
          padding: '10px 20px 14px 72px',
          background: 'rgba(255,255,255,0.02)',
          borderTop: `1px solid ${BORDER}`,
          animation: 'wm-fadeIn 0.15s ease',
        }}>
          <p style={{ fontSize: 12, color: MUTED, lineHeight: 1.65, margin: 0 }}>
            💡 {exercise.note}
          </p>
        </div>
      )}

      {/* Set tracker — only on active */}
      {isActive && (
        <div style={{
          padding: '0 20px 20px 72px',
          animation: 'wm-fadeIn 0.2s ease',
        }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
            {Array.from({ length: exercise.sets }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: 36, height: 36,
                  background: i < completedSets ? `${c.text}22` : '#1a1a1a',
                  border: `1px solid ${i < completedSets ? c.text : BORDER}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: i < completedSets ? 14 : 11,
                  color: i < completedSets ? c.text : DIM,
                  transition: 'all 0.2s',
                  borderRadius: 2,
                }}
              >
                {i < completedSets ? '✓' : i + 1}
              </div>
            ))}
          </div>
          <button
            onClick={onSetDone}
            style={{
              padding: '11px 24px',
              background: completedSets >= exercise.sets ? '#1a2e1a' : ORANGE,
              border: completedSets >= exercise.sets ? '1px solid #82d296' : 'none',
              color: completedSets >= exercise.sets ? '#82d296' : '#fff',
              fontSize: 10, fontWeight: 700, letterSpacing: '0.14em',
              textTransform: 'uppercase', cursor: 'pointer',
              fontFamily: 'inherit', transition: 'all 0.2s',
            }}
            onMouseEnter={e => { if (completedSets < exercise.sets) e.currentTarget.style.background = '#ff6b35' }}
            onMouseLeave={e => { if (completedSets < exercise.sets) e.currentTarget.style.background = ORANGE }}
          >
            {completedSets >= exercise.sets
              ? '✓ All Sets Done'
              : completedSets === 0
              ? 'Mark Set Complete'
              : `Set ${completedSets + 1} of ${exercise.sets} →`}
          </button>
        </div>
      )}
    </div>
  )
}

// ─── main component ───────────────────────────────────────────────────────────

export default function WorkoutModeClient({ workout }: { workout: DayWorkout }) {
  const { user, logWorkout, openAuth } = useAuth()
  const c = TYPE_COLORS[workout.type]

  // Workout state
  const [phase, setPhase] = useState<'preview' | 'active' | 'rest' | 'complete'>('preview')
  const [activeIdx, setActiveIdx] = useState(0)
  const [completedSets, setCompletedSets] = useState<number[]>(
    workout.details.map(() => 0)
  )
  const [completedExercises, setCompletedExercises] = useState<boolean[]>(
    workout.details.map(() => false)
  )
  const [restSeconds, setRestSeconds] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const elapsedRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Elapsed timer
  useEffect(() => {
    if (phase === 'active' || phase === 'rest') {
      elapsedRef.current = setInterval(() => setElapsed(e => e + 1), 1000)
    } else {
      if (elapsedRef.current) clearInterval(elapsedRef.current)
    }
    return () => { if (elapsedRef.current) clearInterval(elapsedRef.current) }
  }, [phase])

  const totalSets = workout.details.reduce((a, e) => a + e.sets, 0)
  const doneSets = completedSets.reduce((a, n) => a + n, 0)
  const progressPct = phase === 'complete' ? 100 : (doneSets / totalSets) * 100

  function handleSetDone() {
    const ex = workout.details[activeIdx]
    const newSets = completedSets[activeIdx] + 1
    const updated = [...completedSets]
    updated[activeIdx] = newSets

    if (newSets >= ex.sets) {
      // Exercise done
      const updatedComplete = [...completedExercises]
      updatedComplete[activeIdx] = true
      setCompletedExercises(updatedComplete)
      setCompletedSets(updated)

      const nextIdx = activeIdx + 1
      if (nextIdx >= workout.details.length) {
        // Workout complete
        setPhase('complete')
      } else {
        // Rest then next exercise
        if (ex.rest > 0) {
          setRestSeconds(ex.rest)
          setPhase('rest')
          setTimeout(() => {
            setActiveIdx(nextIdx)
          }, 0)
        } else {
          setActiveIdx(nextIdx)
        }
      }
    } else {
      setCompletedSets(updated)
      // Rest between sets
      if (ex.rest > 0) {
        setRestSeconds(ex.rest)
        setPhase('rest')
      }
    }
  }

  function handleRestDone() {
    setPhase('active')
  }

  function handleLogAndExit() {
    logWorkout()
  }

  const isToday = workout.name === workout.name // always true — placeholder for real check

  return (
    <>
      <style>{`
        @keyframes wm-fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes wm-fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes wm-popIn {
          from { transform: scale(0.5); opacity: 0; }
          to   { transform: scale(1); opacity: 1; }
        }
        @keyframes wm-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>

      {/* Rest timer overlay */}
      {phase === 'rest' && (
        <RestTimer
          seconds={restSeconds}
          onDone={handleRestDone}
          onSkip={handleRestDone}
        />
      )}

      {/* Completion screen */}
      {phase === 'complete' && (
        <CompletionScreen
          workout={workout}
          elapsed={elapsed}
          onLogAndExit={handleLogAndExit}
        />
      )}

      {phase !== 'complete' && (
        <div style={{ background: BG, minHeight: 'calc(100vh - 56px)', position: 'relative' }}>
          {/* Auth gate */}

          {/* Progress bar */}
          <div style={{ height: 3, background: '#1a1a1a', position: 'sticky', top: 56, zIndex: 30 }}>
            <div style={{
              height: '100%', width: `${progressPct}%`,
              background: c.text,
              transition: 'width 0.5s ease',
            }} />
          </div>

          <div style={{
            maxWidth: 760,
            margin: '0 auto',
            padding: '48px 24px 80px',
            pointerEvents:'auto',
            transition: 'filter 0.3s',
          }}>
            {/* Header */}
            <div style={{ marginBottom: 40 }}>
              <Link href="/" style={{
                fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase',
                color: DIM, textDecoration: 'none', display: 'inline-flex',
                alignItems: 'center', gap: 6, marginBottom: 24,
                transition: 'color 0.2s',
              }}
                onMouseEnter={e => (e.currentTarget.style.color = ORANGE)}
                onMouseLeave={e => (e.currentTarget.style.color = DIM)}
              >
                ← Back to Home
              </Link>

              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
                <div>
                  <span style={{
                    display: 'inline-block', padding: '3px 10px', marginBottom: 12,
                    background: c.bg, border: `1px solid ${c.border}`,
                    color: c.text, fontSize: 8.5, letterSpacing: '0.16em',
                    textTransform: 'uppercase', fontWeight: 700,
                  }}>
                    {workout.type}
                  </span>
                  <h1 style={{
                    fontFamily: 'var(--font-bebas)',
                    fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
                    letterSpacing: '0.02em', color: TEXT,
                    lineHeight: 0.95, marginBottom: 10,
                  }}>
                    {workout.name}
                  </h1>
                  <div style={{ display: 'flex', gap: 16, fontSize: 11, color: DIM }}>
                    <span>⏱ {workout.duration}</span>
                    <span>·</span>
                    <span>{workout.level}</span>
                    <span>·</span>
                    <span>{workout.details.length} exercises</span>
                  </div>
                </div>

                {/* Live stats */}
                <div style={{ display: 'flex', gap: 2, flexShrink: 0 }}>
                  {[
                    { label: 'Elapsed', value: fmtTime(elapsed) },
                    { label: 'Sets Done', value: `${doneSets} / ${totalSets}` },
                  ].map(({ label, value }) => (
                    <div key={label} style={{
                      padding: '12px 16px', background: SURFACE,
                      border: `1px solid ${BORDER}`, textAlign: 'center', minWidth: 88,
                    }}>
                      <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 22, color: c.text, lineHeight: 1 }}>
                        {value}
                      </div>
                      <div style={{ fontSize: 8, color: DIM, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 3 }}>
                        {label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Warmup */}
            {workout.warmup && workout.warmup.length > 0 && phase === 'preview' && (
              <div style={{ marginBottom: 28, padding: '18px 20px', background: SURFACE, border: `1px solid ${BORDER}`, borderLeft: '3px solid #58a6ff' }}>
                <div style={{ fontSize: 8.5, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#58a6ff', fontWeight: 700, marginBottom: 10 }}>
                  Warmup First
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {workout.warmup.map((w, i) => (
                    <span key={i} style={{
                      padding: '4px 10px', background: 'rgba(88,166,255,0.08)',
                      border: '1px solid rgba(88,166,255,0.2)',
                      color: '#58a6ff', fontSize: 11,
                    }}>
                      {w}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Start banner */}
            {phase === 'preview' && (
              <div style={{
                padding: '24px', marginBottom: 32,
                background: `${ORANGE}0d`,
                border: `1px solid rgba(232,82,26,0.3)`,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20,
                flexWrap: 'wrap',
              }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 18, color: TEXT, letterSpacing: '0.04em', marginBottom: 4 }}>
                    Ready to begin?
                  </div>
                  <p style={{ fontSize: 12, color: DIM, margin: 0 }}>
                    Work through each exercise in order. Tap a set when you complete it.
                  </p>
                </div>
                <button
                  onClick={() => setPhase('active')}
                  style={{
                    padding: '13px 28px', background: ORANGE, color: '#fff',
                    border: 'none', fontSize: 10.5, fontWeight: 700,
                    letterSpacing: '0.14em', textTransform: 'uppercase',
                    cursor: 'pointer', fontFamily: 'inherit',
                    transition: 'background 0.2s', flexShrink: 0,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#ff6b35' }}
                  onMouseLeave={e => { e.currentTarget.style.background = ORANGE }}
                >
                  Start Workout →
                </button>
              </div>
            )}

            {/* Exercise list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {workout.details.map((ex, i) => (
                <ExerciseCard
                  key={i}
                  exercise={ex}
                  index={i}
                  isActive={phase === 'active' && i === activeIdx}
                  isComplete={completedExercises[i]}
                  completedSets={completedSets[i]}
                  onSetDone={handleSetDone}
                  c={c}
                />
              ))}
            </div>

            {/* Coach tip */}
            <div style={{ marginTop: 32, padding: '16px 20px', background: 'rgba(242,201,76,0.06)', border: '1px solid rgba(242,201,76,0.2)', display: 'flex', gap: 12 }}>
              <span style={{ fontSize: 16, flexShrink: 0 }}>💡</span>
              <p style={{ fontSize: 12.5, color: '#d4b96a', lineHeight: 1.7, margin: 0 }}>
                <strong style={{ color: '#f2c94c' }}>Coach tip: </strong>{workout.tip}
              </p>
            </div>

            {/* Cooldown */}
            {workout.cooldown && workout.cooldown.length > 0 && (
              <div style={{ marginTop: 20, padding: '16px 20px', background: SURFACE, border: `1px solid ${BORDER}`, borderLeft: '3px solid #82d296' }}>
                <div style={{ fontSize: 8.5, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#82d296', fontWeight: 700, marginBottom: 10 }}>
                  Cooldown After
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {workout.cooldown.map((w, i) => (
                    <span key={i} style={{
                      padding: '4px 10px', background: 'rgba(130,210,150,0.07)',
                      border: '1px solid rgba(130,210,150,0.2)',
                      color: '#82d296', fontSize: 11,
                    }}>
                      {w}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
