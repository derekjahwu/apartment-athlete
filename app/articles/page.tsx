import Navbar from '@/components/Navbar'
import ArticlesHero from '@/components/articles/ArticlesHero'
import ArticlesGrid from '@/components/articles/ArticlesGrid'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Articles & Reviews — ApartmentAthlete',
  description:
    'Home workout guides, bodyweight training tips, and honest home gym equipment reviews — everything you need to train smarter in any space.',
}

export default function ArticlesPage() {
  return (
    <main>
      <Navbar />
      <ArticlesHero />
      <ArticlesGrid />
      <Footer />
    </main>
  )
}
