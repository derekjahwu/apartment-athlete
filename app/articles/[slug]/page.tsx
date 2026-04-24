import { notFound } from 'next/navigation'
import { ARTICLES } from '@/lib/articles'
import ArticlePageClient from '@/components/articles/ArticlePageClient'
import Footer from '@/components/Footer'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return ARTICLES.filter(a => a.content).map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const article = ARTICLES.find(a => a.slug === slug)
  if (!article) return {}
  return {
    title: `${article.title} — ApartmentAthlete`,
    description: article.excerpt,
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = ARTICLES.find(a => a.slug === slug)
  if (!article || !article.content) notFound()

  const related = ARTICLES
    .filter(a => a.slug !== article.slug && a.category === article.category)
    .slice(0, 3)

  return (
    <>
      <ArticlePageClient article={article} related={related} />
      <Footer />
    </>
  )
}
