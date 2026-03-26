// Full article content — rich structured data for rendered article pages

export interface ArticleSection {
  type: 'intro' | 'h2' | 'h3' | 'body' | 'callout' | 'exercise-table' | 'progression-block' | 'tip-box' | 'image' | 'quote' | 'divider'
  content?: string
  label?: string        // for callout / tip-box labels
  accent?: string       // color override
  exercises?: ExerciseRow[]
  progressions?: ProgressionLevel[]
  src?: string          // for image
  alt?: string
  cite?: string         // for quote attribution
}

export interface ExerciseRow {
  name: string
  sets: string
  reps: string
  rest: string
  cue: string
}

export interface ProgressionLevel {
  level: number
  name: string
  description: string
  targetReps: string
  indicator: string   // when you're ready to progress
}

export interface FullArticle {
  slug: string

}

export const FULL_ARTICLES: Record<string, FullArticle> = {
  'how-to-turn-your-apartment-into-a-gym' : {
    slug: 'how-to-turn-your-apartment-into-a-gym'
  },
  'the-truth-about-bodyweight-training' : {
    slug: 'the-truth-about-bodyweight-training'
  },
  'the-20-minute-apartment-workout' : {
    slug: 'the-20-minute-apartment-workout'
  },
  'progressive-overload-without-weights' : {
    slug: 'progressive-overload-without-weights'
  },
  'how-to-stay-consistent-when-motivation-dies' : {
    slug: 'how-to-stay-consistent-when-motivation-dies'
  },
  'the-mental-benefits-of-consistent-home-workouts' : {
    slug: 'the-mental-benefits-of-consistent-home-workouts'
  }
}
