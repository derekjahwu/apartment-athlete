'use client'

import { useAuth } from '@/lib/AuthContext'
import Navbar from '@/components/Navbar'
import AuthModal from '@/components/auth/AuthModal'

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { authOpen, openAuth, closeAuth } = useAuth()

  return (
    <>
      {authOpen && <AuthModal onClose={closeAuth} />}
      <Navbar onOpenAuth={openAuth} />
      {children}
    </>
  )
}
