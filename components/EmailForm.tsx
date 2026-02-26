'use client'

import { useState } from 'react'

interface EmailFormProps {
  placeholder?: string
  buttonText?: string
  dark?: boolean
}

export default function EmailForm({
  placeholder = 'your@email.com',
  buttonText = 'Join Free →',
  dark = false,
}: EmailFormProps) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.includes('@')) {
      setSubmitted(true)
      setEmail('')
      setTimeout(() => setSubmitted(false), 3000)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', maxWidth: '420px' }}
    >
      <input
        type="email"
        value={submitted ? '' : email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={submitted ? 'Check your inbox!' : placeholder}
        style={{
          flex: 1,
          padding: '16px 20px',
          background: dark ? 'rgba(255,255,255,0.15)' : '#1f1f1f',
          border: `1px solid ${dark ? 'rgba(255,255,255,0.3)' : '#2a2a2a'}`,
          borderRight: 'none',
          color: '#f5f4f0',
          fontFamily: 'var(--font-dm-sans)',
          fontSize: '0.9rem',
          outline: 'none',
        }}
      />
      <button
        type="submit"
        style={{
          padding: '16px 28px',
          background: submitted ? '#1a1a1a' : dark ? '#0a0a0a' : '#e8521a',
          color: '#f5f4f0',
          fontFamily: 'var(--font-dm-sans)',
          fontSize: '0.8rem',
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          border: 'none',
          cursor: 'pointer',
          whiteSpace: 'nowrap',
          transition: 'background 0.2s',
        }}
      >
        {submitted ? "✓ You're in!" : buttonText}
      </button>
    </form>
  )
}
