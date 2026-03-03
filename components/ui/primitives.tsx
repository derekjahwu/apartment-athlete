'use client'

import { useState, ButtonHTMLAttributes, InputHTMLAttributes } from 'react'
import { ORANGE, ORANGE_HOV, BORDER, DIM } from '@/lib/constants'

interface OBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  outline?: boolean
  small?: boolean
}

export function OBtn({ children, outline = false, small = false, style, ...props }: OBtnProps) {
  const [hov, setHov] = useState(false)
  return (
    <button
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: small ? '7px 14px' : '11px 22px',
        background: outline ? 'transparent' : hov ? ORANGE_HOV : ORANGE,
        color: outline ? (hov ? ORANGE : DIM) : '#fff',
        border: outline ? `1px solid ${hov ? ORANGE : BORDER}` : 'none',
        fontSize: small ? 9 : 10,
        fontWeight: 700,
        letterSpacing: '0.12em',
        textTransform: 'uppercase' as const,
        cursor: 'pointer',
        transition: 'all 0.2s',
        fontFamily: 'inherit',
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  )
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function TextInput({ style, ...props }: InputProps) {
  const [focused, setFocused] = useState(false)
  return (
    <input
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        width: '100%',
        padding: '11px 14px',
        background: '#1a1a1a',
        border: `1px solid ${focused ? ORANGE : BORDER}`,
        color: '#f5f4f0',
        fontSize: 12.5,
        outline: 'none',
        fontFamily: 'inherit',
        transition: 'border-color 0.2s',
        ...style,
      }}
      {...props}
    />
  )
}

export function Lbl({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div
      style={{
        fontSize: 9,
        letterSpacing: '0.28em',
        textTransform: 'uppercase',
        color: ORANGE,
        fontWeight: 700,
        marginBottom: 8,
        ...style,
      }}
    >
      {children}
    </div>
  )
}
