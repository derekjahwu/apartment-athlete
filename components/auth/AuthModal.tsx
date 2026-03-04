'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/AuthContext'
import { OBtn, TextInput } from '@/components/ui/primitives'
import { ORANGE, SURFACE, BORDER, DIM, TEXT } from '@/lib/constants'
import {
  ClerkProvider,
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
} from '@clerk/nextjs'
import { Sign } from 'crypto'

interface AuthModalProps {
  onClose: () => void
}

const OAUTH_PROVIDERS = [
  { name: 'Google', color: '#4285F4', icon: 'G' },
  { name: 'Apple',  color: '#f5f4f0', icon: '' },
  { name: 'GitHub', color: '#6e40c9', icon: '⌥' },
]

export default function AuthModal({ onClose }: AuthModalProps) {
  const { login } = useAuth()
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleSubmit() {
    setError('')
    if (!email.includes('@')) { setError('Please enter a valid email.'); return }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return }
    if (mode === 'signup' && !name.trim()) { setError('Please enter your name.'); return }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      login({
        name: mode === 'signup' ? name : email.split('@')[0],
        email,
        avatar: (mode === 'signup' ? name : email)[0].toUpperCase(),
      })
      // login() calls closeAuth internally via AuthContext
    }, 900)
  }

  function handleOAuth(providerName: string) {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      login({
        name: `${providerName} User`,
        email: `user@${providerName.toLowerCase()}.com`,
        avatar: providerName[0],
      })
    }, 700)
  }

  function switchMode(m: 'login' | 'signup') {
    setMode(m)
    setError('')
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.82)', backdropFilter: 'blur(6px)' }}
      />

      <div style={{
        position: 'relative',
        width: 420,
        background: SURFACE,
        border: `1px solid ${BORDER}`,
        padding: '40px 40px 36px',
        animation: 'fadeUp 0.25s ease',
      }}>
        {/* Close */}
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: 16, right: 18, background: 'none', border: 'none', color: DIM, fontSize: 20, cursor: 'pointer', lineHeight: 1 }}
        >
          ×
        </button>

        {/* Logo */}
        <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 17, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 28, color: TEXT }}>
          Apartment<span style={{ color: ORANGE }}>Athlete</span>
        </div>

        {/* Tab switcher */}
        <div style={{ display: 'flex', marginBottom: 28, borderBottom: `1px solid ${BORDER}` }}>
          {(['login', 'signup'] as const).map(m => (
            <button
              key={m}
              onClick={() => switchMode(m)}
              style={{
                flex: 1,
                padding: '10px 0',
                background: 'none',
                border: 'none',
                borderBottom: `2px solid ${mode === m ? ORANGE : 'transparent'}`,
                color: mode === m ? TEXT : DIM,
                fontSize: 10.5,
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontFamily: 'inherit',
                marginBottom: -1,
              }}
            >
              {m === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          ))}
        </div>

        {/* OAuth */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
           {OAUTH_PROVIDERS.map(p => (
            <button
              key={p.name}
              onClick={() => handleOAuth(p.name)}
              onMouseEnter={e => { (e.currentTarget.style.borderColor = p.color) }}
              onMouseLeave={e => { (e.currentTarget.style.borderColor = BORDER) }}
              style={{
                flex: 1,
                padding: '10px 8px',
                background: '#1f1f1f',
                border: `1px solid ${BORDER}`,
                color: p.color,
                fontSize: 11.5,
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'border-color 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                fontFamily: 'inherit',
              }}
            >
              <span style={{ fontSize: 14, lineHeight: 1 }}>{p.icon}</span>
              {p.name}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <div style={{ flex: 1, height: 1, background: BORDER }} />
          <span style={{ fontSize: 9, color: DIM, letterSpacing: '0.1em' }}>OR CONTINUE WITH EMAIL</span>
          <div style={{ flex: 1, height: 1, background: BORDER }} />
        </div>

        {/* Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {mode === 'signup' && (
            <TextInput
              placeholder="Full name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          )}
          <TextInput
            type="email"
            placeholder="Email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <TextInput
            type="password"
            placeholder="Password (min. 6 characters)"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          />

          {error && (
            <div style={{ fontSize: 11, color: '#ff6b6b', padding: '9px 13px', background: 'rgba(255,107,107,0.08)', border: '1px solid rgba(255,107,107,0.25)' }}>
              {error}
            </div>
          )}

          <OBtn
            onClick={handleSubmit}
            disabled={loading}
            style={{ width: '100%', marginTop: 4, padding: '13px', fontSize: 10.5 }}
          >
            {loading ? 'Just a moment...' : mode === 'login' ? 'Sign In →' : 'Create Account →'}
          </OBtn>
        </div>

        <p style={{ marginTop: 20, fontSize: 10, color: DIM, textAlign: 'center', lineHeight: 1.55 }}>
          {mode === 'login' ? 'No account yet? ' : 'Already have an account? '}
          <span
            onClick={() => switchMode(mode === 'login' ? 'signup' : 'login')}
            style={{ color: ORANGE, cursor: 'pointer', fontWeight: 700 }}
          >
            {mode === 'login' ? 'Sign up free' : 'Sign in'}
          </span>
        </p>

        <p style={{ marginTop: 14, fontSize: 9.5, color: '#3a3a3a', textAlign: 'center' }}>
          By continuing you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
      
    </div>
  )
}
