import type { Metadata } from 'next'
import { Bebas_Neue, DM_Sans, DM_Serif_Display } from 'next/font/google'
import { AuthProvider } from '@/lib/AuthContext'
import AppShell from '@/components/AppShell'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
})

const dmSans = DM_Sans({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const dmSerifDisplay = DM_Serif_Display({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-dm-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'ApartmentAthlete — No Gym. No Excuses.',
  description:
    'Elite-level workouts designed for 300 sq ft or 3,000. We turn your living room into a performance lab — no equipment required, zero fluff.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${bebasNeue.variable} ${dmSans.variable} ${dmSerifDisplay.variable}`}>
        <AuthProvider>
          <ClerkProvider>
          <AppShell>{children}</AppShell>
          </ClerkProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
