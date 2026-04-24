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
  if (!workoutLog.length) return 0;

  const normalize = (d) => new Date(d).toDateString();
  const logSet = new Set(workoutLog.map((w) => normalize(w.completed_at)));

  let streak = 0;
  const today = new Date();

  for (let i = 0; i <= 365; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = normalize(d);
    if (logSet.has(key)) streak++;
    else if (i > 0) break;
  }

  return streak;
}