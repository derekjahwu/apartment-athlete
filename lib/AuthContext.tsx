'use client'

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react'
import type { User } from '@/lib/user'
import { todayKey } from '@/lib/user'

interface AuthContextValue {
  user: User | null
  workoutLog: string[]
  savedArticles: string[]
  authOpen: boolean
  login: (u: User) => void
  logout: () => void
  openAuth: () => void
  closeAuth: () => void
  logWorkout: () => void
  removeWorkout: (key: string) => void
  toggleSave: (slug: string) => void
  unsave: (slug: string) => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [workoutLog, setWorkoutLog] = useState<string[]>([])
  const [savedArticles, setSavedArticles] = useState<string[]>([])
  const [authOpen, setAuthOpen] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const u = localStorage.getItem('aa_user')
      const wl = localStorage.getItem('aa_workoutLog')
      const sa = localStorage.getItem('aa_savedArticles')
      if (u) setUser(JSON.parse(u))
      if (wl) setWorkoutLog(JSON.parse(wl))
      if (sa) setSavedArticles(JSON.parse(sa))
    } catch {}
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    if (user) localStorage.setItem('aa_user', JSON.stringify(user))
    else localStorage.removeItem('aa_user')
  }, [user, hydrated])

  useEffect(() => {
    if (!hydrated) return
    localStorage.setItem('aa_workoutLog', JSON.stringify(workoutLog))
  }, [workoutLog, hydrated])

  useEffect(() => {
    if (!hydrated) return
    localStorage.setItem('aa_savedArticles', JSON.stringify(savedArticles))
  }, [savedArticles, hydrated])

  const login = useCallback((u: User) => {
    setUser(u)
    setAuthOpen(false)
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem('aa_user')
  }, [])

  const openAuth = useCallback(() => setAuthOpen(true), [])
  const closeAuth = useCallback(() => setAuthOpen(false), [])

  const logWorkout = useCallback(() => {
    const key = todayKey()
    setWorkoutLog(prev => prev.includes(key) ? prev : [...prev, key])
  }, [])

  const removeWorkout = useCallback((key: string) => {
    setWorkoutLog(prev => prev.filter(k => k !== key))
  }, [])

  const toggleSave = useCallback((slug: string) => {
    setSavedArticles(prev =>
      prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]
    )
  }, [])

  const unsave = useCallback((slug: string) => {
    setSavedArticles(prev => prev.filter(s => s !== slug))
  }, [])

  if (!hydrated) return null

  return (
    <AuthContext.Provider value={{
      user, workoutLog, savedArticles, authOpen,
      login, logout, openAuth, closeAuth,
      logWorkout, removeWorkout, toggleSave, unsave,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
