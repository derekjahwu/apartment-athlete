'use client'

import { useAuth } from '@/lib/AuthContext'
import Hero from '@/components/home/Hero'
import { Ticker, Philosophy, Workouts, FeaturedGuide, Testimonials, Newsletter } from '@/components/home/HomeSections'
import WorkoutCalendar from '@/components/home/WorkoutCalendar'
import Footer from '@/components/Footer'

export default function HomePageClient() {
  const { openAuth } = useAuth()

  return (
    <>
      <Hero onOpenAuth={openAuth} />
      <Ticker />
      <Philosophy />
      <Workouts />
      <WorkoutCalendar onOpenAuth={openAuth} />
      <FeaturedGuide />
      <Testimonials />
      <Newsletter />
      <Footer />
    </>
  )
}
