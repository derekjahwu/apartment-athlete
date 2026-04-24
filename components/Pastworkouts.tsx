import { MONTHS, ORANGE, SURFACE, BORDER, TEXT, MUTED, DIM, BG } from '@/lib/constants'

interface PastWorkoutProps {
  workoutTitle: string
  date: string
  type: string
  duration: string
}

export default function pastWorkouts({ workoutTitle, date, type, duration }: PastWorkoutProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "11px 14px",
        background: "rgba(255,107,107,0.06)",
        border: `1px solid ${"rgba(255,107,107,0.3)"}`,
        transition: "all 0.25s",
        opacity: 1,
        transform: "translateX(0)",
      }}
    >
      <div
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: ORANGE,
          flexShrink: 0,
        }}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, color: TEXT, fontWeight: 600 }}>{workoutTitle}</div>
        <div style={{ fontSize: 9.5, color: DIM }}>{duration} · {type}</div>
      </div>
      <div style={{ fontSize: 9.5, color: DIM, flexShrink: 0 }}>{date}</div>
    </div>
  );
}
