'use client'

// import { useAuth } from '@/lib/AuthContext'
import Hero from '@/components/home/Hero'
import { Ticker, Philosophy, Workouts, FeaturedGuide, Testimonials, Newsletter } from '@/components/home/HomeSections'
import WorkoutCalendar from '@/components/home/WorkoutCalendar'
import Footer from '@/components/Footer'
import { useAuth } from '@clerk/nextjs'

export default function HomePageClient() {

  return (
    <>
      <Hero />
      <Ticker />
      <Philosophy />
      <Workouts />
      <WorkoutCalendar />
      <FeaturedGuide />
      <Testimonials />
      <Newsletter />
      <Footer />
    </>
  )
}
