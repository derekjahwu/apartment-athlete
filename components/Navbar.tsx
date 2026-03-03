'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/lib/AuthContext'
import { ORANGE, BORDER, TEXT, MUTED, DIM, BG } from '@/lib/constants'
import { OBtn } from '@/components/ui/primitives'

interface NavbarProps {
  onOpenAuth: () => void
}

function NavLink({ href, children, active }: { href: string; children: React.ReactNode; active?: boolean }) {
  const [hov, setHov] = useState(false)
  return (
    <Link
      href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontSize: 9.5,
        color: hov || active ? TEXT : MUTED,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        cursor: 'pointer',
        transition: 'color 0.2s',
        fontWeight: active ? 700 : 400,
        borderBottom: active ? `1px solid ${ORANGE}` : '1px solid transparent',
        paddingBottom: 2,
        textDecoration: 'none',
      }}
    >
      {children}
    </Link>
  )
}

export default function Navbar({ onOpenAuth }: NavbarProps) {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 20) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!menuOpen) return
    function onClickOut(e: MouseEvent) {
      const target = e.target as HTMLElement
      if (!target.closest('[data-user-menu]')) setMenuOpen(false)
    }
    document.addEventListener('mousedown', onClickOut)
    return () => document.removeEventListener('mousedown', onClickOut)
  }, [menuOpen])

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        height: 56,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 56px',
        background: scrolled ? 'rgba(10,10,10,0.96)' : BG,
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? `1px solid ${BORDER}` : '1px solid transparent',
        transition: 'all 0.3s',
      }}
    >
      <Link
        href="/"
        style={{
          fontFamily: 'var(--font-bebas)',
          fontSize: 20,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          color: TEXT,
          textDecoration: 'none',
        }}
      >
        Apartment<span style={{ color: ORANGE }}>Athlete</span>
      </Link>

      <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
        <NavLink href="/#workouts" active={pathname === '/'}>Workouts</NavLink>
        <NavLink href="/#training" active={false}>Training</NavLink>
        <NavLink href="/articles" active={pathname === '/articles'}>Articles</NavLink>

        {user ? (
          <div data-user-menu style={{ position: 'relative' }}>
            <div
              onClick={() => setMenuOpen(m => !m)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                cursor: 'pointer',
                padding: '4px 10px',
                border: `1px solid ${menuOpen ? ORANGE : BORDER}`,
                transition: 'border-color 0.2s',
              }}
            >
              <div
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: '50%',
                  background: 'rgba(232,82,26,0.2)',
                  border: `1px solid ${ORANGE}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-bebas)',
                  fontSize: 11,
                  color: ORANGE,
                  flexShrink: 0,
                }}
              >
                {user.avatar}
              </div>
              <span style={{ fontSize: 10, color: TEXT, fontWeight: 600, letterSpacing: '0.05em' }}>
                {user.name.split(' ')[0]}
              </span>
              <span style={{ fontSize: 8, color: DIM }}>▾</span>
            </div>

            {menuOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  right: 0,
                  width: 188,
                  background: '#1a1a1a',
                  border: `1px solid ${BORDER}`,
                  zIndex: 200,
                  animation: 'fadeUp 0.15s ease',
                }}
              >
                <DropItem href="/dashboard" onClick={() => setMenuOpen(false)}>⬛ Dashboard</DropItem>
                <DropItem href="/dashboard" onClick={() => setMenuOpen(false)}>★ Saved Articles</DropItem>
                <DropItem
                  onClick={() => { logout(); setMenuOpen(false) }}
                  color="#ff6b6b"
                  hoverColor="#ff4444"
                >
                  ↩ Sign Out
                </DropItem>
              </div>
            )}
          </div>
        ) : (
          <div style={{ display: 'flex', gap: 8 }}>
            <OBtn outline small onClick={onOpenAuth}>Sign In</OBtn>
            <OBtn small onClick={onOpenAuth}>Join Free</OBtn>
          </div>
        )}
      </div>
    </nav>
  )
}

function DropItem({
  children,
  href,
  onClick,
  color = MUTED,
  hoverColor = TEXT,
}: {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  color?: string
  hoverColor?: string
}) {
  const [hov, setHov] = useState(false)
  const style: React.CSSProperties = {
    display: 'block',
    padding: '12px 16px',
    fontSize: 11,
    color: hov ? hoverColor : color,
    cursor: 'pointer',
    borderBottom: `1px solid ${BORDER}`,
    letterSpacing: '0.06em',
    transition: 'color 0.15s',
    textDecoration: 'none',
  }
  if (href) {
    return (
      <Link href={href} onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={style}>
        {children}
      </Link>
    )
  }
  return (
    <div onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={style}>
      {children}
    </div>
  )
}
