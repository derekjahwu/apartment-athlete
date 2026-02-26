export type Category = 'all' | 'guides' | 'reviews' | 'nutrition' | 'programs'

export interface Article {
  slug: string
  category: Category
  tag: string
  title: string
  excerpt: string
  author: string
  date: string
  readTime: string
  image: string
  featured?: boolean
  rating?: number       // only for reviews (out of 5)
  reviewProduct?: string
}

export const ARTICLES: Article[] = [
  {
    slug: 'best-resistance-bands-2026',
    category: 'reviews',
    tag: 'Equipment Review',
    title: 'The 7 Best Resistance Bands for Home Workouts in 2026',
    excerpt: 'We tested 14 sets over 8 weeks. Here is exactly which bands are worth your money — and which ones snapped mid-squat.',
    author: 'Marcus Webb',
    date: 'Feb 20, 2026',
    readTime: '9 min read',
    image: 'https://images.unsplash.com/photo-1598289431512-b97b0917afba?w=800&q=80&fit=crop',
    featured: true,
    rating: 4.8,
    reviewProduct: 'Rogue Monster Bands',
  },
  {
    slug: 'push-up-progressions-guide',
    category: 'guides',
    tag: 'Training Guide',
    title: 'The Complete Push-Up Progression: From Zero to One-Arm',
    excerpt: 'A step-by-step system for building elite upper-body strength using only your bodyweight. No bench, no bars, no excuses.',
    author: 'Sarah Okafor',
    date: 'Feb 14, 2026',
    readTime: '12 min read',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80&fit=crop',
    featured: true,
  },
  {
    slug: 'adjustable-dumbbells-review',
    category: 'reviews',
    tag: 'Equipment Review',
    title: 'Bowflex vs Powerblock vs REP: Which Adjustable Dumbbells Win?',
    excerpt: 'Three top-selling adjustable dumbbell sets, stress-tested over 12 weeks of daily use in a 450 sq ft apartment.',
    author: 'Marcus Webb',
    date: 'Feb 8, 2026',
    readTime: '11 min read',
    image: 'https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?w=800&q=80&fit=crop',
    rating: 4.6,
    reviewProduct: 'Bowflex SelectTech 552',
  },
  {
    slug: 'silent-hiit-science',
    category: 'guides',
    tag: 'Science & Training',
    title: 'The Science Behind Low-Impact HIIT (And Why It Works)',
    excerpt: 'High-intensity training without the jumping. How to keep heart rate elevated, protect your joints, and not anger your downstairs neighbor.',
    author: 'Dr. Priya Nair',
    date: 'Jan 30, 2026',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&q=80&fit=crop',
  },
  {
    slug: '12-week-bodyweight-program',
    category: 'programs',
    tag: 'Full Program',
    title: 'The 12-Week Apartment Strength Program: No Equipment Required',
    excerpt: 'A periodized, evidence-based program built specifically for small spaces. Includes warm-ups, progressions, and deload weeks.',
    author: 'Sarah Okafor',
    date: 'Jan 22, 2026',
    readTime: '15 min read',
    image: 'https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=800&q=80&fit=crop',
    featured: true,
  },
  {
    slug: 'pull-up-bar-door-review',
    category: 'reviews',
    tag: 'Equipment Review',
    title: 'Door Pull-Up Bars Reviewed: 6 Options from $20 to $120',
    excerpt: 'Your door frame is untapped gym space. We tested every style — tension, mounted, freestanding — so you know what holds up.',
    author: 'Marcus Webb',
    date: 'Jan 15, 2026',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&q=80&fit=crop',
    rating: 4.4,
    reviewProduct: 'Iron Gym Total Upper Body',
  },
  {
    slug: 'protein-timing-home-athlete',
    category: 'nutrition',
    tag: 'Nutrition',
    title: 'Protein Timing for the Home Athlete: What Actually Matters',
    excerpt: 'The anabolic window is not what you think. Here is the evidence on when to eat protein — and what makes a real difference.',
    author: 'Dr. Priya Nair',
    date: 'Jan 9, 2026',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80&fit=crop',
  },
  {
    slug: 'yoga-mat-reviews-2026',
    category: 'reviews',
    tag: 'Equipment Review',
    title: 'Best Yoga & Exercise Mats for Home Workouts: 2026 Roundup',
    excerpt: 'Thickness, grip, durability, and apartment-friendliness — we ranked 8 mats across 200+ hours of floor-based training.',
    author: 'Marcus Webb',
    date: 'Dec 28, 2025',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80&fit=crop',
    rating: 4.7,
    reviewProduct: 'Manduka PRO',
  },
  {
    slug: 'mobility-routine-desk-workers',
    category: 'guides',
    tag: 'Mobility',
    title: 'The 15-Minute Mobility Routine Every Desk Worker Needs',
    excerpt: 'Sitting 8 hours a day wrecks your hips, thoracic spine, and shoulders. This daily sequence undoes the damage in 15 minutes flat.',
    author: 'Sarah Okafor',
    date: 'Dec 19, 2025',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80&fit=crop',
  },
]

export const CATEGORIES: { value: Category; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'guides', label: 'Guides' },
  { value: 'reviews', label: 'Reviews' },
  { value: 'programs', label: 'Programs' },
  { value: 'nutrition', label: 'Nutrition' },
]
