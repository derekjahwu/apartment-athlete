import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Ticker from '@/components/Ticker'
import Philosophy from '@/components/Philosophy'
import Workouts from '@/components/Workouts'
import WorkoutCalendar from '@/components/WorkoutCalendar'
import FeaturedGuide from '@/components/FeaturedGuide'
import Testimonials from '@/components/Testimonials'
import NewsletterStrip from '@/components/NewsletterStrip'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Ticker />
      <Philosophy />
      <Workouts />
      <WorkoutCalendar />
      <FeaturedGuide />
      <Testimonials />
      <NewsletterStrip />
      <Footer />
    </main>
  )
}
