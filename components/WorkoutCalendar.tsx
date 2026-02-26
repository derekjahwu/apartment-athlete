'use client'

import { useState } from 'react'

type WorkoutType = 'strength' | 'cardio' | 'recovery' | 'hiit' | 'mobility' | 'rest'

interface DayWorkout {
  type: WorkoutType
  name: string
  duration: string
  level: string
  exercises: string[]
  tip: string
}

const TYPE_COLORS: Record<WorkoutType, { bg: string; text: string; border: string; dot: string }> = {
  strength: { bg: 'rgba(232,82,26,0.12)', text: '#e8521a', border: 'rgba(232,82,26,0.4)', dot: '#e8521a' },
  cardio:   { bg: 'rgba(242,201,76,0.12)', text: '#f2c94c', border: 'rgba(242,201,76,0.4)', dot: '#f2c94c' },
  recovery: { bg: 'rgba(88,166,255,0.12)', text: '#58a6ff', border: 'rgba(88,166,255,0.4)', dot: '#58a6ff' },
  hiit:     { bg: 'rgba(255,107,53,0.12)', text: '#ff6b35', border: 'rgba(255,107,53,0.4)', dot: '#ff6b35' },
  mobility: { bg: 'rgba(130,210,150,0.12)', text: '#82d296', border: 'rgba(130,210,150,0.4)', dot: '#82d296' },
  rest:     { bg: 'rgba(80,80,80,0.12)', text: '#666', border: 'rgba(80,80,80,0.3)', dot: '#444' },
}

const WORKOUTS: DayWorkout[] = [
  {
    type: 'strength',
    name: 'Full Body Blitz',
    duration: '30 min',
    level: 'Intermediate',
    exercises: ['Push-ups 4×12', 'Bodyweight Squats 4×15', 'Pike Push-ups 3×10', 'Reverse Lunges 3×12', 'Plank 3×45s'],
    tip: 'Keep rest to 45 seconds between sets to maintain intensity.',
  },
  {
    type: 'hiit',
    name: 'Silent HIIT',
    duration: '20 min',
    level: 'All Levels',
    exercises: ['Slow-mo Squats 4×10', 'Bear Crawls 3×20s', 'Wall Sit 3×40s', 'Controlled Burpees 3×8', 'Dead Bug 3×12'],
    tip: 'No jumping — every move is downstairs-neighbor approved.',
  },
  {
    type: 'mobility',
    name: 'Mobility Reset',
    duration: '15 min',
    level: 'Beginner',
    exercises: ['Hip 90/90 Stretch 2min', 'Thoracic Rotation 2×10', 'World\'s Greatest Stretch', 'Couch Stretch 90s/side', 'Cat-Cow 2×12'],
    tip: 'Move slowly and breathe into each stretch. Never force range.',
  },
  {
    type: 'strength',
    name: 'Upper Body Power',
    duration: '35 min',
    level: 'Intermediate',
    exercises: ['Diamond Push-ups 4×10', 'Inverted Rows (table) 4×10', 'Shoulder Taps 3×20', 'Tricep Dips 3×12', 'Superman Hold 3×30s'],
    tip: 'Focus on scapular retraction during rows — squeeze your shoulder blades.',
  },
  {
    type: 'cardio',
    name: 'Stairwell Sprint',
    duration: '25 min',
    level: 'Advanced',
    exercises: ['Stair Sprints ×6', 'Step-ups 4×15', 'Calf Raises 3×25', 'Jump Rope 3×60s', 'Lateral Step-overs 3×12'],
    tip: 'Use your building stairwell. 4 flights = roughly 400m equivalent.',
  },
  {
    type: 'rest',
    name: 'Active Rest',
    duration: '—',
    level: 'All Levels',
    exercises: ['10 min walk', 'Light stretching', 'Foam rolling optional'],
    tip: 'Rest is when gains are made. Eat well, sleep 7–9 hours.',
  },
  {
    type: 'strength',
    name: 'Leg Day: No Excuses',
    duration: '40 min',
    level: 'Intermediate',
    exercises: ['Bulgarian Split Squats 4×10', 'Glute Bridges 4×15', 'Wall Sit 3×60s', 'Step-ups 3×12', 'Single-leg Deadlift 3×10'],
    tip: 'Slow the eccentric (lowering) to 3 seconds for maximum muscle stimulus.',
  },
  {
    type: 'hiit',
    name: 'Apartment AMRAP',
    duration: '20 min',
    level: 'Advanced',
    exercises: ['Push-ups ×10', 'Squat Jumps ×10', 'Mountain Climbers ×20', 'Plank to Downdog ×10', '— Repeat as many rounds as possible'],
    tip: 'Track your rounds. Beat it next week by just one.',
  },
  {
    type: 'recovery',
    name: 'Deep Tissue Flow',
    duration: '20 min',
    level: 'All Levels',
    exercises: ['Foam roll quads 90s', 'Foam roll thoracic 90s', 'PNF hamstring stretch', 'Hip flexor couch stretch', 'Child\'s pose 2min'],
    tip: 'Slow down on tender spots. Hold for 30–60s until discomfort fades.',
  },
  {
    type: 'strength',
    name: 'Core Architect',
    duration: '25 min',
    level: 'Intermediate',
    exercises: ['Dead Bug 3×12', 'Hollow Body Hold 3×30s', 'Pallof Press (band) 3×12', 'Side Plank 3×30s/side', 'Ab Wheel Rollout 3×8'],
    tip: 'True core work is anti-rotation. These moves train stability, not just crunches.',
  },
  {
    type: 'cardio',
    name: 'Zone 2 Walk',
    duration: '45 min',
    level: 'Beginner',
    exercises: ['45 min brisk walk', 'Maintain conversational pace', 'Swing arms naturally', 'Focus on breathing'],
    tip: 'Zone 2 cardio is the most underrated fat-burner. Keep your heart rate moderate.',
  },
  {
    type: 'rest',
    name: 'Full Rest',
    duration: '—',
    level: 'All Levels',
    exercises: ['Prioritize sleep', 'Eat a protein-rich meal', 'Hydrate well (2–3L water)'],
    tip: 'Adaptation happens during recovery, not during the workout itself.',
  },
]

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

function getWorkoutForDay(day: number): DayWorkout {
  return WORKOUTS[(day - 1) % WORKOUTS.length]
}

const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December']
const DAY_NAMES = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

interface TooltipState {
  day: number
  x: number
  y: number
  placement: 'above' | 'below'
}

export default function WorkoutCalendar() {
  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [tooltip, setTooltip] = useState<TooltipState | null>(null)
  const [selectedDay, setSelectedDay] = useState<number | null>(today.getDate())

  const daysInMonth = getDaysInMonth(currentYear, currentMonth)
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth)
  const isCurrentMonth = currentMonth === today.getMonth() && currentYear === today.getFullYear()
  const todayWorkout = getWorkoutForDay(today.getDate())

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1) }
    else setCurrentMonth(m => m - 1)
    setTooltip(null)
  }

  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1) }
    else setCurrentMonth(m => m + 1)
    setTooltip(null)
  }

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>, day: number) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const parentRect = e.currentTarget.closest('section')!.getBoundingClientRect()
    const tooltipHeight = 320
    const spaceBelow = window.innerHeight - rect.bottom
    const placement = spaceBelow < tooltipHeight + 20 ? 'above' : 'below'
    setTooltip({
      day,
      x: rect.left - parentRect.left + rect.width / 2,
      y: placement === 'below' ? rect.bottom - parentRect.top + 8 : rect.top - parentRect.top - 8,
      placement,
    })
  }

  const selectedWorkout = selectedDay ? getWorkoutForDay(selectedDay) : null
  const selectedColors = selectedWorkout ? TYPE_COLORS[selectedWorkout.type] : null

  return (
    <section
      id="calendar"
      style={{
        background: '#0a0a0a',
        padding: '100px 80px',
        position: 'relative',
      }}
      onMouseLeave={() => setTooltip(null)}
    >
      {/* Section header */}
      <div style={{ marginBottom: '60px' }}>
        <div style={{ fontSize: '0.68rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#e8521a', fontWeight: 700, marginBottom: '12px' }}>
          Training Schedule
        </div>
        <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1, letterSpacing: '0.02em' }}>
          Workout of the{' '}
          <em style={{ fontFamily: 'var(--font-dm-serif)', fontStyle: 'italic', color: '#e8521a' }}>Day</em>
        </h2>
        <p style={{ marginTop: '16px', color: '#888', fontSize: '0.95rem', maxWidth: '500px' }}>
          Hover any day to preview the workout. Click to lock it in and see full details below.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '40px', alignItems: 'start' }}>

        {/* CALENDAR */}
        <div style={{ background: '#141414', border: '1px solid #2a2a2a' }}>
          {/* Month nav */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 28px', borderBottom: '1px solid #2a2a2a' }}>
            <button onClick={prevMonth} style={{ background: 'none', border: '1px solid #2a2a2a', color: '#888', width: '36px', height: '36px', cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'border-color 0.2s, color 0.2s' }}
              onMouseEnter={e => { (e.currentTarget.style.borderColor = '#e8521a'); (e.currentTarget.style.color = '#e8521a') }}
              onMouseLeave={e => { (e.currentTarget.style.borderColor = '#2a2a2a'); (e.currentTarget.style.color = '#888') }}>
              ‹
            </button>
            <span style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.4rem', letterSpacing: '0.1em' }}>
              {MONTH_NAMES[currentMonth]} {currentYear}
            </span>
            <button onClick={nextMonth} style={{ background: 'none', border: '1px solid #2a2a2a', color: '#888', width: '36px', height: '36px', cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'border-color 0.2s, color 0.2s' }}
              onMouseEnter={e => { (e.currentTarget.style.borderColor = '#e8521a'); (e.currentTarget.style.color = '#e8521a') }}
              onMouseLeave={e => { (e.currentTarget.style.borderColor = '#2a2a2a'); (e.currentTarget.style.color = '#888') }}>
              ›
            </button>
          </div>

          {/* Day headers */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', borderBottom: '1px solid #2a2a2a' }}>
            {DAY_NAMES.map(d => (
              <div key={d} style={{ padding: '12px 0', textAlign: 'center', fontSize: '0.68rem', letterSpacing: '0.12em', color: '#555', textTransform: 'uppercase', fontWeight: 700 }}>
                {d}
              </div>
            ))}
          </div>

          {/* Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', padding: '8px' }}>
            {/* Empty cells */}
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} style={{ aspectRatio: '1', padding: '4px' }} />
            ))}

            {/* Day cells */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1
              const workout = getWorkoutForDay(day)
              const colors = TYPE_COLORS[workout.type]
              const isToday = isCurrentMonth && day === today.getDate()
              const isSelected = day === selectedDay

              return (
                <div
                  key={day}
                  className="calendar-day"
                  onMouseEnter={e => handleMouseEnter(e, day)}
                  onClick={() => setSelectedDay(day)}
                  style={{
                    aspectRatio: '1',
                    padding: '4px',
                    cursor: 'pointer',
                    position: 'relative',
                  }}
                >
                  <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '5px',
                    background: isSelected ? colors.bg : isToday ? 'rgba(232,82,26,0.08)' : 'transparent',
                    border: isSelected ? `1px solid ${colors.border}` : isToday ? '1px solid rgba(232,82,26,0.3)' : '1px solid transparent',
                    borderRadius: '2px',
                    transition: 'background 0.15s, border-color 0.15s',
                  }}>
                    <span style={{
                      fontSize: '0.82rem',
                      fontWeight: isToday ? 700 : 400,
                      color: isToday ? '#e8521a' : isSelected ? '#f5f4f0' : '#aaa',
                      lineHeight: 1,
                    }}>
                      {day}
                    </span>
                    <div style={{
                      width: '5px',
                      height: '5px',
                      borderRadius: '50%',
                      background: colors.dot,
                      opacity: workout.type === 'rest' ? 0.3 : 0.8,
                    }} />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Legend */}
          <div style={{ padding: '16px 28px', borderTop: '1px solid #2a2a2a', display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            {(Object.entries(TYPE_COLORS) as [WorkoutType, typeof TYPE_COLORS[WorkoutType]][]).map(([type, colors]) => (
              <div key={type} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: colors.dot }} />
                <span style={{ fontSize: '0.65rem', color: '#555', letterSpacing: '0.1em', textTransform: 'capitalize' }}>{type}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SIDE PANEL — selected day detail */}
        <div style={{ position: 'sticky', top: '84px' }}>
          {selectedDay && selectedWorkout && selectedColors ? (
            <div style={{ background: '#141414', border: `1px solid ${selectedColors.border}` }}>
              {/* Panel header */}
              <div style={{ padding: '24px 28px', borderBottom: '1px solid #2a2a2a', background: selectedColors.bg }}>
                <div style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: selectedColors.text, fontWeight: 700, marginBottom: '8px' }}>
                  {MONTH_NAMES[currentMonth]} {selectedDay} · {selectedWorkout.type}
                </div>
                <div style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.8rem', letterSpacing: '0.04em', lineHeight: 1, color: '#f5f4f0' }}>
                  {selectedWorkout.name}
                </div>
                <div style={{ display: 'flex', gap: '16px', marginTop: '10px' }}>
                  <span style={{ fontSize: '0.72rem', color: '#888' }}>⏱ {selectedWorkout.duration}</span>
                  <span style={{ fontSize: '0.72rem', color: '#888' }}>· {selectedWorkout.level}</span>
                </div>
              </div>

              {/* Exercise list */}
              <div style={{ padding: '24px 28px', borderBottom: '1px solid #2a2a2a' }}>
                <div style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#555', fontWeight: 700, marginBottom: '14px' }}>
                  Exercise List
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {selectedWorkout.exercises.map((ex, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <span style={{ color: selectedColors.text, fontFamily: 'var(--font-bebas)', fontSize: '0.85rem', lineHeight: 1.5, flexShrink: 0 }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span style={{ fontSize: '0.85rem', color: '#ccc', lineHeight: 1.4 }}>{ex}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Coach tip */}
              <div style={{ padding: '20px 28px' }}>
                <div style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#555', fontWeight: 700, marginBottom: '10px' }}>
                  Coach Tip
                </div>
                <p style={{ fontSize: '0.85rem', color: '#888', lineHeight: 1.6, fontStyle: 'italic' }}>
                  "{selectedWorkout.tip}"
                </p>
              </div>

              {/* CTA */}
              <div style={{ padding: '0 28px 24px' }}>
                <button style={{
                  width: '100%',
                  padding: '14px',
                  background: '#e8521a',
                  color: '#f5f4f0',
                  border: 'none',
                  fontFamily: 'var(--font-dm-sans)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#ff6b35')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#e8521a')}
                >
                  Start This Workout →
                </button>
              </div>
            </div>
          ) : (
            <div style={{ background: '#141414', border: '1px solid #2a2a2a', padding: '40px 28px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.2rem', color: '#444', letterSpacing: '0.06em', marginBottom: '8px' }}>
                Select a Day
              </div>
              <p style={{ fontSize: '0.82rem', color: '#444' }}>Click any date to see the full workout plan</p>
            </div>
          )}

          {/* Today's highlight */}
          {isCurrentMonth && (
            <div style={{ marginTop: '16px', padding: '16px 20px', background: 'rgba(232,82,26,0.06)', border: '1px solid rgba(232,82,26,0.2)', display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#e8521a', flexShrink: 0, boxShadow: '0 0 8px rgba(232,82,26,0.6)', animation: 'pulse 2s ease-in-out infinite' }} />
              <div>
                <div style={{ fontSize: '0.65rem', color: '#e8521a', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700 }}>
                  Today's Workout
                </div>
                <div style={{ fontSize: '0.88rem', color: '#f5f4f0', fontWeight: 500, marginTop: '2px' }}>
                  {todayWorkout.name} · {todayWorkout.duration}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* HOVER TOOLTIP */}
      {tooltip && (() => {
        const w = getWorkoutForDay(tooltip.day)
        const c = TYPE_COLORS[w.type]
        return (
          <div
            style={{
              position: 'absolute',
              left: `${tooltip.x}px`,
              top: tooltip.placement === 'below' ? `${tooltip.y}px` : 'auto',
              bottom: tooltip.placement === 'above' ? `calc(100% - ${tooltip.y}px)` : 'auto',
              transform: 'translateX(-50%)',
              width: '240px',
              background: '#1f1f1f',
              border: `1px solid ${c.border}`,
              boxShadow: '0 16px 48px rgba(0,0,0,0.6)',
              zIndex: 50,
              pointerEvents: 'none',
              animation: 'tooltipIn 0.15s ease forwards',
            }}
          >
            <style>{`
              @keyframes tooltipIn {
                from { opacity: 0; transform: translateX(-50%) translateY(${tooltip.placement === 'below' ? '-6px' : '6px'}); }
                to   { opacity: 1; transform: translateX(-50%) translateY(0); }
              }
              @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.4; }
              }
            `}</style>

            {/* Arrow */}
            <div style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              ...(tooltip.placement === 'below' ? { top: '-5px' } : { bottom: '-5px' }),
              width: '8px',
              height: '8px',
              background: '#1f1f1f',
              border: `1px solid ${c.border}`,
              borderBottom: tooltip.placement === 'below' ? 'none' : undefined,
              borderRight: tooltip.placement === 'below' ? 'none' : undefined,
              borderTop: tooltip.placement === 'above' ? 'none' : undefined,
              borderLeft: tooltip.placement === 'above' ? 'none' : undefined,
              transform: `translateX(-50%) rotate(45deg)`,
            }} />

            <div style={{ padding: '14px 16px', borderBottom: `1px solid ${c.border}`, background: c.bg }}>
              <div style={{ fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: c.text, fontWeight: 700, marginBottom: '4px' }}>
                {MONTH_NAMES[currentMonth]} {tooltip.day} · {w.type}
              </div>
              <div style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.2rem', letterSpacing: '0.04em', color: '#f5f4f0' }}>
                {w.name}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#888', marginTop: '4px' }}>
                {w.duration} · {w.level}
              </div>
            </div>

            <div style={{ padding: '12px 16px' }}>
              {w.exercises.slice(0, 3).map((ex, i) => (
                <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '6px', alignItems: 'flex-start' }}>
                  <span style={{ color: c.text, fontSize: '0.7rem', fontFamily: 'var(--font-bebas)', lineHeight: 1.5, flexShrink: 0 }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#aaa' }}>{ex}</span>
                </div>
              ))}
              {w.exercises.length > 3 && (
                <div style={{ fontSize: '0.68rem', color: '#555', marginTop: '4px' }}>
                  +{w.exercises.length - 3} more exercises
                </div>
              )}
            </div>
          </div>
        )
      })()}
    </section>
  )
}
