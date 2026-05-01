'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
// import { useAuth } from '@/lib/AuthContext'
import { getWorkout } from '@/lib/workouts'
import { ARTICLES } from '@/lib/articles'
import { MONTHS, ORANGE, SURFACE, BORDER, TEXT, MUTED, DIM, BG } from '@/lib/constants'
import { computeStreak } from '@/lib/user'
import { Lbl, OBtn } from '@/components/ui/primitives'
import { useSession, useUser, UserAvatar  } from '@clerk/nextjs'
import { createClient } from '@supabase/supabase-js'
import PastWorkouts from '../Pastworkouts'

type Workout = {
  id: number;
  user_id: string;
  workout_name: string;
  duration_minutes: number;
  workout_type: string;
  completed_at: string;
};

// ── Streak heatmap ────────────────────────────────────────────────────────────

function MiniStreakGrid({ workoutLog = [] }: { workoutLog: Workout[] }) {
  const today = new Date();

  const logSet = new Set(
    (workoutLog ?? []).map(w => new Date(w.completed_at).toDateString())
  );

  // First day of current month
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  // What day of the week does the month start on? (0=Sun)
  const startPadding = monthStart.getDay();
  // How many days in this month
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  // Total cells = padding + days in month, rounded up to full weeks
  const totalCells = Math.ceil((startPadding + daysInMonth) / 7) * 7;

  const days = Array.from({ length: totalCells }, (_, i) => {
    const d = new Date(monthStart);
    d.setDate(1 - startPadding + i);
    const key = d.toDateString();
    const isToday = key === today.toDateString();
    const isCurrentMonth = d.getMonth() === today.getMonth();
    return { key, date: d, done: logSet.has(key), isToday, isCurrentMonth };
  });

  return (
    <div>
      <div style={{ display: 'flex', gap: 3, marginBottom: 7 }}>
        {['S','M','T','W','T','F','S'].map((d, i) => (
          <div key={i} style={{ flex: 1, textAlign: 'center', fontSize: 8, color: '#444', fontWeight: 700 }}>{d}</div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 3 }}>
        {days.map(d => (
          <div
            key={d.key}
            title={d.isCurrentMonth ? d.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''}
            style={{
              aspectRatio: '1',
              background: !d.isCurrentMonth
                ? 'transparent'
                : d.done
                ? ORANGE
                : d.isToday
                ? 'rgba(232,82,26,0.15)'
                : '#1a1a1a',
              border: d.isToday ? `1px solid ${ORANGE}` : '1px solid transparent',
              borderRadius: 2,
              transition: 'background 0.2s',
              opacity: d.isCurrentMonth ? 1 : 0,  // hide overflow days
            }}
          />
        ))}
      </div>
      <div style={{ display: 'flex', gap: 14, marginTop: 10, alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{ width: 10, height: 10, background: ORANGE, borderRadius: 2 }} />
          <span style={{ fontSize: 8.5, color: DIM }}>Completed</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{ width: 10, height: 10, background: '#1a1a1a', border: '1px solid #333', borderRadius: 2 }} />
          <span style={{ fontSize: 8.5, color: DIM }}>Missed</span>
        </div>
      </div>
    </div>
  )
}

// ── Session row with remove ───────────────────────────────────────────────────

function SessionRow({ workoutKey, index, onRemove }: { workoutKey: string; index: number; onRemove: (key: string) => void }) {
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [hov, setHov] = useState(false)
  const [removing, setRemoving] = useState(false)

  const [y, m, d] = workoutKey.split('-').map(Number)
  const w = getWorkout(d)
  const dateStr = new Date(y, m, d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

  function handleRemove() {
    setRemoving(true)
    setTimeout(() => onRemove(workoutKey), 300)
  }

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setHov(false); setConfirmDelete(false) }}
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '11px 14px',
        background: removing ? 'rgba(255,107,107,0.06)' : index === 0 ? 'rgba(232,82,26,0.06)' : BG,
        border: `1px solid ${removing ? 'rgba(255,107,107,0.3)' : BORDER}`,
        transition: 'all 0.25s',
        opacity: removing ? 0 : 1,
        transform: removing ? 'translateX(-8px)' : 'translateX(0)',
      }}
    >
      <div style={{ width: 6, height: 6, borderRadius: '50%', background: index === 0 ? ORANGE : '#444', flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, color: TEXT, fontWeight: 600 }}>{w.name}</div>
        <div style={{ fontSize: 9.5, color: DIM }}>{w.duration} · {w.type}</div>
      </div>
      <div style={{ fontSize: 9.5, color: DIM, flexShrink: 0 }}>{dateStr}</div>
      {index === 0 && !confirmDelete && (
        <div style={{ fontSize: 8, color: ORANGE, letterSpacing: '0.1em', fontWeight: 700, flexShrink: 0 }}>LATEST</div>
      )}

      {/* Delete controls */}
      {confirmDelete ? (
        <div style={{ display: 'flex', gap: 6, flexShrink: 0, animation: 'fadeUp 0.15s ease' }}>
          <button
            onClick={handleRemove}
            style={{ padding: '5px 10px', background: 'rgba(255,107,107,0.15)', border: '1px solid rgba(255,107,107,0.4)', color: '#ff6b6b', fontSize: 9.5, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '0.08em', transition: 'all 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,107,107,0.25)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,107,107,0.15)' }}
          >
            Remove
          </button>
          <button
            onClick={() => setConfirmDelete(false)}
            style={{ padding: '5px 10px', background: 'transparent', border: `1px solid ${BORDER}`, color: DIM, fontSize: 9.5, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.color = TEXT }}
            onMouseLeave={e => { e.currentTarget.style.color = DIM }}
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={() => setConfirmDelete(true)}
          style={{
            width: 26, height: 26, borderRadius: '50%',
            background: 'transparent',
            border: `1px solid ${hov ? '#555' : 'transparent'}`,
            color: hov ? '#ff6b6b' : 'transparent',
            fontSize: 14, cursor: 'pointer', fontFamily: 'inherit',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.15s', flexShrink: 0,
          }}
          title="Remove this session"
        >
          ×
        </button>
      )}
    </div>
  )
}

// ── Main dashboard ────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const router = useRouter()
  const today = new Date()
  const todayWorkout = getWorkout(today.getDate())
  const [showAllSessions, setShowAllSessions] = useState(false)
  const [workoutLog, setWorkoutLog] = useState<any[]>([])
  const [streak, setStreak] = useState(0)
  const [weeklyCount, setWeeklyCount] = useState(0)
  const { user, isSignedIn } = useUser()

  const { session } = useSession()

  // Create a custom Supabase client that injects the Clerk session token into the request headers
  function createClerkSupabaseClient() {
    return createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      {
        async accessToken() {
          return session?.getToken() ?? null
        },
      },
    )
  }

  function countWorkoutsThisWeek(workoutLog: any[]) {
  if (!workoutLog.length) return 0;

  const today = new Date();
  const day = today.getDay(); // 0 = Sunday
  const diff = day === 0 ? -6 : 1 - day; // Monday offset
  const monday = new Date(today);
  monday.setDate(today.getDate() + diff);
  monday.setHours(0, 0, 0, 0);

  return workoutLog.filter((w) => new Date(w.completed_at) >= monday).length;
}

  // Create a `client` object for accessing Supabase data using the Clerk token
  const client = createClerkSupabaseClient()

  

  useEffect(() => {
  async function pastWorkouts() {
    const {data,error} = await client.from('workout_log').select()
    console.log(error)
    setWorkoutLog(data ?? [])
    setStreak(computeStreak(data ?? []))
    setWeeklyCount(countWorkoutsThisWeek(data ?? []))
  }
pastWorkouts()

  }, [])

//   const thisWeek = workoutLog.filter(key => {
//     const [y, m, d] = key.split('-').map(Number)
//     const date = new Date(y, m, d)
//     return (today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24) < 7
//   }).length

//   const savedFull = ARTICLES.filter(a => savedArticles.includes(a.slug))
//   const sortedLog = [...workoutLog].reverse()
//   const visibleLog = showAllSessions ? sortedLog : sortedLog.slice(0, 6)

  const stats = [
    { label: 'Current Streak',     value: streak,    icon: '🔥', accent: ORANGE },
    { label: 'Workouts This Week', value: weeklyCount,   icon: '⚡', accent: '#f2c94c' },
    { label: 'Total Workouts',     value: workoutLog.length,   icon: '✓',  accent: '#82d296' },
    // { label: 'Saved Articles',     value: 1 ,icon: '★',  accent: '#58a6ff' },
  ]

  if (!isSignedIn) return null

  return (
    <main className="dashboard-main" style={{ background: BG, minHeight: 'calc(100vh - 56px)' }}>
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <Lbl>Your Dashboard</Lbl>
          <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', letterSpacing: '0.02em', lineHeight: 0.95, color: TEXT }}>
            Welcome back, {user.firstName}
            <em style={{ fontFamily: 'var(--font-dm-serif)', fontStyle: 'italic', color: ORANGE }}>
              {/* {user.name.split(' ')[0]} */}
            </em>
          </h1>
          <p style={{ marginTop: 12, fontSize: 12.5, color: DIM }}>
            {today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <div className="dashboard-today-workout" style={{ background: 'rgba(232,82,26,0.08)', border: '1px solid rgba(232,82,26,0.25)' }}>
          <div style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: ORANGE, fontWeight: 700, marginBottom: 5 }}>
            Today&apos;s Workout
          </div>
          <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 18, color: TEXT, letterSpacing: '0.04em' }}>
            {todayWorkout.name}
          </div>
          <div style={{ fontSize: 10.5, color: MUTED, marginTop: 2 }}>
            {todayWorkout.duration} · {todayWorkout.level}
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="dashboard-stats-grid">
        {stats.map(s => (
          <div key={s.label} className="dashboard-stat-card" style={{ background: SURFACE, border: `1px solid ${BORDER}` }}>
            <div style={{ position: 'absolute', top: -10, right: -4, fontSize: 50, opacity: 0.07, pointerEvents: 'none' }}>{s.icon}</div>
            <div style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: DIM, fontWeight: 700, marginBottom: 10 }}>{s.label}</div>
            <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 34, color: s.accent, lineHeight: 1 }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="dashboard-content-grid">
        {/* Streak heatmap */}
        <div className="dashboard-panel" style={{ background: SURFACE, border: `1px solid ${BORDER}` }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }}>
            <div>
              <Lbl>Activity Log</Lbl>
              <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 20, letterSpacing: '0.04em', color: TEXT }}>
                Workout Streak
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 34, color: ORANGE, lineHeight: 1 }}>STREAK</div>
              <div style={{ fontSize: 9, color: DIM, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 2 }}>day streak</div>
            </div>
          </div>
          <MiniStreakGrid workoutLog={workoutLog} />
          <p style={{ marginTop: 16, fontSize: 11, color: DIM, lineHeight: 1.6 }}>
            {streak === 0
              ? "Complete today's workout to start your streak!"
              : streak < 3
              ? 'Good start! Keep it going for 3 days in a row.'
              : streak < 7
              ? "You're on a roll! Push toward a full week."
              : `You're unstoppable. ${streak} days and counting.`}
          </p>
        </div>

        {/* Recent sessions with remove */}
        <div className="dashboard-panel" style={{ background: SURFACE, border: `1px solid ${BORDER}` }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }}>
            <div>
              <Lbl>Workout History</Lbl>
              <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 20, letterSpacing: '0.04em', color: TEXT }}>
                Recent Sessions
              </div>
            </div>
            {3 > 0 && (
              <span style={{ fontSize: 9.5, color: DIM, letterSpacing: '0.05em' }}>
                {3} total
              </span>
            )}
          </div>

          {workoutLog.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '36px 0', color: DIM, fontSize: 12.5 }}>
              No workouts logged yet.<br />
              <span style={{ color: ORANGE, fontSize: 11 }}>Head to the calendar and log today&apos;s session →</span>
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {workoutLog.slice().reverse().map((workout, i) => (
                <PastWorkouts
                  key={i}
                  workoutTitle={workout.workout_name}
                  date={workout.completed_at}
                  type={workout.workout_type}
                  duration={`${workout.duration_minutes} min`}
                />
              ))}
                  
               </div>

              {3 > 6 && (
                <button
                  onClick={() => setShowAllSessions(s => !s)}
                  style={{
                    width: '100%', marginTop: 10, padding: '9px',
                    background: 'transparent', border: `1px solid ${BORDER}`,
                    color: DIM, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase',
                    cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = ORANGE; e.currentTarget.style.color = ORANGE }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.color = DIM }}
                >
                  {showAllSessions ? `Show Less` : `Show All ${3} Sessions`}
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Saved articles */}
      {/* <div className="dashboard-panel" style={{ background: SURFACE, border: `1px solid ${BORDER}`, marginTop: 2 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }}>
          <div>
            <Lbl>Reading List</Lbl>
            <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 20, letterSpacing: '0.04em', color: TEXT }}>
              Saved Articles
            </div>
          </div>
          {savedFull.length > 0 && (
            <Link href="/articles" style={{ fontSize: 10, color: ORANGE, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700, textDecoration: 'none' }}>
              Browse More →
            </Link>
          )}
        </div>

         {0 === 0 ? (
          <div style={{ textAlign: 'center', padding: '44px 0', color: DIM, fontSize: 12.5 }}>
            No saved articles yet.<br />
            <Link href="/articles" style={{ color: ORANGE, fontSize: 11, textDecoration: 'none' }}>Browse Articles and click ★ to save.</Link>
          </div>
        ) : (
          <div className="dashboard-articles-grid">
            {savedFull.map(a => {
              const [hovCard, setHovCard] = useState(false)
              return (
                <Link key={a.slug} href={`/articles/${a.slug}`} style={{ textDecoration: 'none' }}>
                  <div
                    onMouseEnter={() => setHovCard(true)}
                    onMouseLeave={() => setHovCard(false)}
                    style={{ background: BG, border: `1px solid ${hovCard ? ORANGE : BORDER}`, overflow: 'hidden', transition: 'border-color 0.2s' }}
                  >
                    <div style={{ height: 90, backgroundImage: `url('${a.image}')`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.45)', position: 'relative' }}>
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(10,10,10,0.8),transparent)' }} />
                    </div>
                    <div style={{ padding: '13px 15px' }}>
                      <div style={{ fontSize: 8, color: ORANGE, letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 5 }}>{a.tag}</div>
                      <div style={{ fontFamily: 'var(--font-dm-serif)', fontStyle: 'italic', fontSize: 12, color: TEXT, lineHeight: 1.35, marginBottom: 11 }}>{a.title}</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: 9.5, color: DIM }}>{a.readTime}</span>
                        <button
                          onClick={e => { e.preventDefault(); unsave(a.slug) }}
                          style={{ fontSize: 9.5, color: '#ff6b6b', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '0.08em' }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div> */}
    </main>
  )
}
