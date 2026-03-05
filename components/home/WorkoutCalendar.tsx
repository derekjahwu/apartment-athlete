'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/AuthContext'
import { WORKOUTS, TYPE_COLORS, getWorkout, getDaysInMonth, getFirstDay } from '@/lib/workouts'
import { MONTHS, DAY_LABELS, ORANGE, SURFACE, BORDER, TEXT, MUTED, DIM, BG, ORANGE_HOV } from '@/lib/constants'
import { todayKey, computeStreak } from '@/lib/user'
import { OBtn, Lbl } from '@/components/ui/primitives'
import Link from 'next/dist/client/link'

interface CalendarGateProps {
  onOpenAuth: () => void
}

function CalendarGate({ onOpenAuth }: CalendarGateProps) {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(10,10,10,0.65)', backdropFilter: 'blur(12px)' }}>
      <div style={{ textAlign: 'center', padding: '40px 52px', background: SURFACE, border: `1px solid ${BORDER}`, maxWidth: 400, animation: 'fadeUp 0.3s ease' }}>
        <div style={{ fontSize: 36, marginBottom: 16 }}>🔒</div>
        <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 24, letterSpacing: '0.04em', color: TEXT, lineHeight: 1.1, marginBottom: 12 }}>
          Unlock Your{' '}
          <em style={{ fontFamily: 'var(--font-dm-serif)', fontStyle: 'italic', color: ORANGE }}>Training Calendar</em>
        </div>
        <p style={{ fontSize: 12.5, color: MUTED, lineHeight: 1.65, marginBottom: 28 }}>
          Create a free account to access personalized daily workouts, track your streak, and log every session.
        </p>
        <OBtn onClick={onOpenAuth} style={{ width: '100%', padding: '13px', fontSize: 11, marginBottom: 12 }}>
          Create Free Account →
        </OBtn>
        <div onClick={onOpenAuth} style={{ fontSize: 11.5, color: DIM, cursor: 'pointer', letterSpacing: '0.04em' }}>
          Already a member? <span style={{ color: ORANGE, fontWeight: 700 }}>Sign in</span>
        </div>
      </div>
    </div>
  )
}

function MonthBtn({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  const [hov, setHov] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ width: 34, height: 34, background: 'none', border: `1px solid ${hov ? ORANGE : BORDER}`, color: hov ? ORANGE : MUTED, cursor: 'pointer', fontSize: 17, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', fontFamily: 'inherit' }}
    >
      {children}
    </button>
  )
}

interface TooltipState {
  day: number
  x: number
  y: number
  placement: 'above' | 'below'
}

interface WorkoutCalendarProps {
  onOpenAuth: () => void
}

function workoutSlug(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function WorkoutCalendar({ onOpenAuth }: WorkoutCalendarProps) {
  const { user, workoutLog, logWorkout } = useAuth()
  const router = useRouter()
  const today = new Date()
  const [month, setMonth] = useState(today.getMonth())
  const [year, setYear] = useState(today.getFullYear())
  const [hovered, setHovered] = useState<number | null>(null)
  const [selected, setSelected] = useState<number>(today.getDate())
  const [tooltip, setTooltip] = useState<TooltipState | null>(null)
  const [justLogged, setJustLogged] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const calRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const dim = getDaysInMonth(year, month)
  const first = getFirstDay(year, month)
  const isCurMonth = month === today.getMonth() && year === today.getFullYear()
  const logSet = new Set(workoutLog)
  const streak = computeStreak(workoutLog)
  const todayLogged = logSet.has(todayKey())

  function handleCellEnter(e: React.MouseEvent<HTMLDivElement>, day: number) {
    setHovered(day)
    const rect = e.currentTarget.getBoundingClientRect()
    const par = calRef.current?.getBoundingClientRect()
    if (!par) return
    const placement = window.innerHeight - rect.bottom < 260 ? 'above' : 'below'
    setTooltip({ day, x: rect.left - par.left + rect.width / 2, y: placement === 'below' ? rect.bottom - par.top + 6 : rect.top - par.top - 6, placement })
  }

  function handleLogToday() {
    logWorkout()
    setJustLogged(true)
    setTimeout(() => setJustLogged(false), 2500)
  }

  const prevMonth = () => { if (month === 0) { setMonth(11); setYear(y => y - 1) } else setMonth(m => m - 1); setTooltip(null) }
  const nextMonth = () => { if (month === 11) { setMonth(0); setYear(y => y + 1) } else setMonth(m => m + 1); setTooltip(null) }

  const previewDay = hovered !== null ? hovered : selected
  const pw = getWorkout(previewDay)
  const pc = TYPE_COLORS[pw.type]

  return (
    <section
      id="calendar"
      ref={calRef}
      onMouseLeave={() => { setHovered(null); setTooltip(null) }}
      style={{ background: BG, padding: isMobile ? '40px 16px' : '64px 56px', borderTop: `1px solid ${BORDER}`, position: 'relative' }}
    >
      <div style={{ marginBottom: 36, display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'flex-end', gap: isMobile ? 16 : 0 }}>
        <div>
          <Lbl>Training Schedule</Lbl>
          <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', letterSpacing: '0.02em', color: TEXT, lineHeight: 1 }}>
            Workout of the{' '}
            <em style={{ fontFamily: 'var(--font-dm-serif)', fontStyle: 'italic', color: ORANGE }}>Day</em>
          </h2>
          <p style={{ marginTop: 12, fontSize: 12.5, color: DIM, maxWidth: 480 }}>{isMobile ? 'Tap any day to preview.' : 'Hover any day to preview. Click to lock in full details.'}</p>
        </div>
        {user && streak > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 20px', background: 'rgba(232,82,26,0.08)', border: '1px solid rgba(232,82,26,0.25)' }}>
            <span style={{ fontSize: 22 }}>🔥</span>
            <div>
              <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 24, color: ORANGE, lineHeight: 1 }}>{streak}</div>
              <div style={{ fontSize: 8.5, color: DIM, letterSpacing: '0.1em', textTransform: 'uppercase' }}>day streak</div>
            </div>
          </div>
        )}
      </div>

      <div style={{ position: 'relative' }}>
        {/* {!user && <CalendarGate onOpenAuth={onOpenAuth} />} */}

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 320px', gap: 28, alignItems: 'start', filter: 'none', pointerEvents:'auto', userSelect:'auto'}}>
          {/* Calendar grid */}
          <div style={{ background: SURFACE, border: `1px solid ${BORDER}` }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 22px', borderBottom: `1px solid ${BORDER}` }}>
              <MonthBtn onClick={prevMonth}>&#8249;</MonthBtn>
              <span style={{ fontFamily: 'var(--font-bebas)', fontSize: 16, letterSpacing: '0.1em', color: TEXT }}>{MONTHS[month]} {year}</span>
              <MonthBtn onClick={nextMonth}>&#8250;</MonthBtn>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', borderBottom: '1px solid #1c1c1c' }}>
              {DAY_LABELS.map((d, i) => (
                <div key={i} style={{ padding: '9px 0', textAlign: 'center', fontSize: 9, color: '#444', fontWeight: 700 }}>{d}</div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', padding: 7 }}>
              {Array.from({ length: first }).map((_, i) => <div key={`e${i}`} style={{ aspectRatio: '1' }} />)}
              {Array.from({ length: dim }).map((_, i) => {
                const day = i + 1
                const w = getWorkout(day)
                const c = TYPE_COLORS[w.type]
                const isToday = isCurMonth && day === today.getDate()
                const isSel = day === selected
                const isDone = logSet.has(`${year}-${month}-${day}`)
                return (
                  <div
                    key={day}
                    style={{ aspectRatio: '1', padding: 3, cursor: 'pointer' }}
                    onMouseEnter={e => handleCellEnter(e, day)}
                    onClick={() => setSelected(day)}
                  >
                    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, background: isDone ? 'rgba(232,82,26,0.18)' : isSel ? c.bg : isToday ? 'rgba(232,82,26,0.08)' : 'transparent', border: isDone ? '1px solid rgba(232,82,26,0.5)' : isSel ? `1px solid ${c.border}` : isToday ? '1px solid rgba(232,82,26,0.3)' : '1px solid transparent', borderRadius: 2, transition: 'background 0.12s' }}>
                      <span style={{ fontSize: 11.5, color: isToday ? ORANGE : isSel ? TEXT : '#999', fontWeight: isToday ? 700 : 400, lineHeight: 1 }}>{day}</span>
                      <div style={{ width: 5, height: 5, borderRadius: '50%', background: isDone ? ORANGE : c.dot, opacity: isDone ? 1 : w.type === 'rest' ? 0.25 : 0.9 }} />
                    </div>
                  </div>
                )
              })}
            </div>

            <div style={{ padding: '12px 22px', borderTop: '1px solid #1c1c1c', display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              {(Object.keys(TYPE_COLORS) as (keyof typeof TYPE_COLORS)[]).map(t => (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: TYPE_COLORS[t].dot }} />
                  <span style={{ fontSize: 8.5, color: DIM, textTransform: 'capitalize' }}>{t}</span>
                </div>
              ))}
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: ORANGE }} />
                <span style={{ fontSize: 8.5, color: DIM }}>completed</span>
              </div>
            </div>
          </div>

          {/* Side panel */}
          <div style={{ position: isMobile ? 'static' : 'sticky', top: 72 }}>
            <div style={{ background: SURFACE, border: `1px solid ${pc.border}`, animation: 'fadeUp 0.2s ease' }}>
              <div style={{ padding: '20px 22px', borderBottom: '1px solid #222', background: pc.bg }}>
                <div style={{ fontSize: 8.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: pc.text, fontWeight: 700, marginBottom: 6, display: 'flex', justifyContent: 'space-between' }}>
                  <span>{MONTHS[month].slice(0, 3)} {previewDay} — {pw.type}</span>
                  {hovered !== null && <span style={{ fontSize: 8, color: DIM }}>HOVER</span>}
                </div>
                <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 22, letterSpacing: '0.04em', color: TEXT, lineHeight: 1 }}>{pw.name}</div>
                <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                  <span style={{ fontSize: 10.5, color: MUTED }}>&#9201; {pw.duration}</span>
                  <span style={{ fontSize: 10.5, color: MUTED }}>· {pw.level}</span>
                </div>
              </div>

              <div style={{ padding: '18px 22px', borderBottom: '1px solid #1e1e1e' }}>
                <div style={{ fontSize: 8.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: DIM, fontWeight: 700, marginBottom: 10 }}>Exercises</div>
                {pw.exercises.map((ex, i) => (
                  <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'flex-start' }}>
                    <span style={{ color: pc.text, fontFamily: 'var(--font-bebas)', fontSize: 9.5, lineHeight: 1.6, flexShrink: 0 }}>{String(i + 1).padStart(2, '0')}</span>
                    <span style={{ fontSize: 11.5, color: '#bbb', lineHeight: 1.45 }}>{ex}</span>
                  </div>
                ))}
              </div>

              <div style={{ padding: '16px 22px', borderBottom: '1px solid #1e1e1e' }}>
                <div style={{ fontSize: 8.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: DIM, fontWeight: 700, marginBottom: 8 }}>Coach Tip</div>
                <p style={{ fontSize: 11.5, color: MUTED, lineHeight: 1.6, fontStyle: 'italic' }}>"{pw.tip}"</p>
              </div>

              <div style={{ padding: '16px 22px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {/* {isCurMonth && selected === today.getDate() && (
                  <button
                    onClick={handleLogToday}
                    style={{ width: '100%', padding: '12px', background: '#1a2e1a', border: `1px solid ${todayLogged || justLogged ? '#82d296' : '#2a4a2a'}`, color: '#82d296', fontSize: 9.5, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: todayLogged ? 'default' : 'pointer', fontFamily: 'inherit', transition: 'all 0.2s' }}
                  >
                    {justLogged ? '✓ Logged!' : todayLogged ? '✓ Completed Today' : 'Log This Workout ✓'}
                  </button>
                )} */}
                <Link href={`/workout/${workoutSlug(pw.name)}`}     style={{
                        padding: '11px 22px',
                        background: ORANGE_HOV,
                        color: "#ffffff",
                        border: `1px solid ${ORANGE}`,
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase' as const,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        fontFamily: 'inherit',
                        textAlign: 'center',
                      }}>
                  Start This Workout →
                </Link>
              </div>
            </div>

            {isCurMonth && (
              <div style={{ marginTop: 12, padding: '13px 16px', background: 'rgba(232,82,26,0.07)', border: '1px solid rgba(232,82,26,0.2)', display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: ORANGE, flexShrink: 0, boxShadow: '0 0 7px rgba(232,82,26,0.7)', animation: 'pulse 2s ease-in-out infinite' }} />
                <div>
                  <div style={{ fontSize: 8.5, color: ORANGE, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700 }}>
                    Today · {MONTHS[today.getMonth()].slice(0, 3)} {today.getDate()}
                  </div>
                  <div style={{ fontSize: 11.5, color: TEXT, fontWeight: 500, marginTop: 1 }}>{getWorkout(today.getDate()).name}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tooltip */}
      {tooltip && user && (() => {
        const w = getWorkout(tooltip.day)
        const c = TYPE_COLORS[w.type]
        const isBelow = tooltip.placement === 'below'
        return (
          <div style={{ position: 'absolute', left: tooltip.x, top: isBelow ? tooltip.y : 'auto', bottom: isBelow ? 'auto' : `calc(100% - ${tooltip.y}px)`, transform: 'translateX(-50%)', width: 230, background: '#1f1f1f', border: `1px solid ${c.border}`, boxShadow: '0 16px 48px rgba(0,0,0,0.7)', zIndex: 60, pointerEvents: 'none', animation: 'tooltipIn 0.14s ease' }}>
            <div style={{ position: 'absolute', left: '50%', top: isBelow ? -5 : 'auto', bottom: isBelow ? 'auto' : -5, width: 8, height: 8, background: '#1f1f1f', border: `1px solid ${c.border}`, borderBottom: isBelow ? 'none' : undefined, borderRight: isBelow ? 'none' : undefined, borderTop: isBelow ? undefined : 'none', borderLeft: isBelow ? undefined : 'none', transform: 'translateX(-50%) rotate(45deg)' }} />
            <div style={{ padding: '13px 15px', borderBottom: `1px solid ${c.border}`, background: c.bg }}>
              <div style={{ fontSize: 8, letterSpacing: '0.16em', textTransform: 'uppercase', color: c.text, fontWeight: 700, marginBottom: 4 }}>{MONTHS[month]} {tooltip.day} · {w.type}</div>
              <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 15, letterSpacing: '0.04em', color: TEXT }}>{w.name}</div>
              <div style={{ fontSize: 9.5, color: MUTED, marginTop: 4 }}>{w.duration} · {w.level}</div>
            </div>
            <div style={{ padding: '10px 15px' }}>
              {w.exercises.slice(0, 3).map((ex, i) => (
                <div key={i} style={{ display: 'flex', gap: 7, marginBottom: 5, alignItems: 'flex-start' }}>
                  <span style={{ color: c.text, fontFamily: 'var(--font-bebas)', fontSize: 9, lineHeight: 1.6, flexShrink: 0 }}>{String(i + 1).padStart(2, '0')}</span>
                  <span style={{ fontSize: 10, color: '#aaa' }}>{ex}</span>
                </div>
              ))}
              {w.exercises.length > 3 && <div style={{ fontSize: 9, color: DIM, marginTop: 4 }}>+{w.exercises.length - 3} more</div>}
            </div>
          </div>
        )
      })()}
    </section>
  )
}
