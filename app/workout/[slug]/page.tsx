import { notFound } from 'next/navigation'
import { WORKOUTS } from '@/lib/workouts'
import WorkoutModeClient from '@/components/workout/WorkoutModeClient'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return WORKOUTS.map(w => ({
    slug: w.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
  }))
}

export async function generateMetadata({ params }: Props) {
  const workout = WORKOUTS.find(
    w => w.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === params.slug
  )
  if (!workout) return {}
  return {
    title: `${workout.name} — ApartmentAthlete Workout Mode`,
    description: `${workout.exercises.length} exercises · ${workout.duration} · ${workout.level}`,
  }
}

export default function WorkoutPage({ params }: Props) {
  const workout = WORKOUTS.find(
    w => w.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === params.slug
  )
  if (!workout) notFound()
  return <WorkoutModeClient workout={workout} />
}
