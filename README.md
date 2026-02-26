# ApartmentAthlete — Next.js

A production-ready Next.js 14 landing page for ApartmentAthlete.

## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** (for config/utilities)
- **Google Fonts** via `next/font` (Bebas Neue, DM Sans, DM Serif Display)
- **next/image** for optimized images

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
apartment-athlete/
├── app/
│   ├── layout.tsx        # Root layout with fonts + metadata
│   ├── page.tsx          # Main page (composes all sections)
│   └── globals.css       # Global styles + animations
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Ticker.tsx
│   ├── Philosophy.tsx
│   ├── Workouts.tsx
│   ├── FeaturedGuide.tsx
│   ├── Testimonials.tsx
│   ├── NewsletterStrip.tsx
│   ├── EmailForm.tsx     # Reusable form with submit state
│   └── Footer.tsx
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Build for Production

```bash
npm run build
npm start
```
# apartment-athlete
