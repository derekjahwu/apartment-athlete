# ApartmentAthlete

A full-stack fitness platform built with **Next.js 14 App Router** + TypeScript. Workout scheduling, streak tracking, saved articles, and OAuth-ready authentication — all designed for apartment-based athletes.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Inline styles + Tailwind CSS (utilities) |
| Fonts | Bebas Neue · DM Sans · DM Serif Display (next/font/google) |
| State | React Context + localStorage |
| Auth | Simulated (drop-in ready for NextAuth.js or Clerk) |

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
apartment-athlete/
├── app/
│   ├── layout.tsx          # Root layout — fonts, AuthProvider, AppShell
│   ├── page.tsx            # Home page
│   ├── articles/
│   │   └── page.tsx        # Articles & reviews listing
│   └── dashboard/
│       └── page.tsx        # User dashboard (auth-gated)
│
├── components/
│   ├── AppShell.tsx        # Navbar + global auth modal mount
│   ├── Navbar.tsx          # Sticky nav with user menu
│   ├── Footer.tsx          # Site footer
│   ├── auth/
│   │   └── AuthModal.tsx   # Sign in / Create account modal
│   ├── articles/
│   │   ├── ArticlesHero.tsx
│   │   └── ArticlesGrid.tsx  # Filterable, searchable article cards with save
│   ├── dashboard/
│   │   └── DashboardPage.tsx # Stats, streak heatmap, saved articles
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── HomeSections.tsx  # Ticker, Philosophy, Workouts, Guide, Testimonials, Newsletter
│   │   ├── HomePageClient.tsx
│   │   └── WorkoutCalendar.tsx # Interactive calendar with blur gate
│   └── ui/
│       └── primitives.tsx  # OBtn, TextInput, Lbl
│
├── lib/
│   ├── AuthContext.tsx     # Global auth state, openAuth(), workout log, saved articles
│   ├── articles.ts         # Article data + types
│   ├── constants.ts        # Design tokens (colors, spacing)
│   ├── user.ts             # User type, todayKey(), computeStreak()
│   └── workouts.ts         # Workout data, types, helpers
│
├── middleware.ts            # Route matcher (extend for real auth)
├── next.config.js
├── tailwind.config.ts
└── tsconfig.json
```

---

## Key Features

### Authentication
- **Email/password** form with validation
- **OAuth** buttons (Google, Apple, GitHub) — stubbed, ready for real providers
- Session persisted to `localStorage`
- Any component can trigger the modal via `useAuth().openAuth()` — no prop drilling

### Workout Calendar
- Full monthly calendar with per-day workout assignments
- **Blurred with overlay** for logged-out users
- Hover tooltips with exercise previews
- "Log This Workout" marks today complete and updates streak
- Color-coded by workout type (strength / hiit / cardio / mobility / recovery / rest)

### Streak Tracking
- `computeStreak()` counts consecutive logged days
- Dashboard heatmap shows last 6 weeks of activity
- Live streak counter displayed on the calendar when logged in

### Articles & Saves
- Filter by category (Guides / Reviews / Programs / Nutrition)
- Live search across title, excerpt, and tag
- ★ bookmark button on every card saves to dashboard reading list
- Saves persist across sessions via localStorage

### Dashboard (`/dashboard`)
- Redirects to home + opens auth modal if not logged in
- 4 stat cards: streak, weekly workouts, total workouts, saved count
- 6-week activity heatmap
- Recent workout session history
- Saved articles grid with remove button

---

## Adding Real Authentication

The auth system is designed for easy swap-in. Replace the `setTimeout` mock in `AuthModal.tsx` with a real provider:

### Option A — NextAuth.js
```bash
npm install next-auth
```
Update `AuthContext.tsx` to wrap with `SessionProvider` and use `signIn()` / `signOut()` / `useSession()`.

### Option B — Clerk
```bash
npm install @clerk/nextjs
```
Wrap layout with `<ClerkProvider>` and replace `AuthModal` with `<SignIn>` / `<SignUp>` components.

---

## Environment Variables

No env vars required for the current build. Add these when connecting a real backend:

```env
# NextAuth
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000

# OAuth providers
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_ID=
GITHUB_SECRET=
```

---

## Deployment

Works on Vercel out of the box:

```bash
npm run build   # verify zero build errors
vercel deploy
```

Images are served from Unsplash (already allowlisted in `next.config.js`). Add your own domain if you self-host assets.

---

## Design System

Colors and tokens live in `lib/constants.ts`:

```ts
ORANGE     = '#e8521a'   // Primary accent
BG         = '#0a0a0a'   // Page background
SURFACE    = '#141414'   // Card background
BORDER     = '#2a2a2a'   // Borders and dividers
TEXT       = '#f5f4f0'   // Primary text
MUTED      = '#888'      // Secondary text
DIM        = '#555'      // Tertiary text
```

Fonts configured via CSS variables in `globals.css`:
- `var(--font-bebas)` — display headings
- `var(--font-dm-serif)` — editorial italic accents
- `var(--font-dm-sans)` — body text
