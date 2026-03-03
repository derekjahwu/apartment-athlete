export interface User {
  name: string
  email: string
  avatar: string
}

export function todayKey(): string {
  const d = new Date()
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
}

export function computeStreak(workoutLog: string[]): number {
  if (!workoutLog.length) return 0
  const logSet = new Set(workoutLog)
  let streak = 0
  const today = new Date()
  for (let i = 0; i <= 365; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
    if (logSet.has(key)) streak++
    else if (i > 0) break
  }
  return streak
}
