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

function NavLink({ href, children, active, onClick }: { href: string; children: React.ReactNode; active?: boolean; onClick?: () => void }) {
  const [hov, setHov] = useState(false)
  return (
    <Link
      href={href}
      onClick={onClick}
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
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 20) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    function onResize() { setIsMobile(window.innerWidth < 640) }
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false) }, [pathname])

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
    <>
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          height: 56,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: isMobile ? '0 20px' : '0 56px',
          background: scrolled ? 'rgba(10,10,10,0.96)' : BG,
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled || mobileOpen ? `1px solid ${BORDER}` : '1px solid transparent',
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

        {isMobile ? (
          <button
            onClick={() => setMobileOpen(o => !o)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 4,
              display: 'flex',
              flexDirection: 'column',
              gap: 5,
            }}
            aria-label="Toggle menu"
          >
            <span style={{ display: 'block', width: 22, height: 1.5, background: mobileOpen ? ORANGE : TEXT, transition: 'background 0.2s, transform 0.2s', transformOrigin: 'center', transform: mobileOpen ? 'translateY(6.5px) rotate(45deg)' : 'none' }} />
            <span style={{ display: 'block', width: 22, height: 1.5, background: mobileOpen ? 'transparent' : TEXT, transition: 'background 0.2s, opacity 0.2s' }} />
            <span style={{ display: 'block', width: 22, height: 1.5, background: mobileOpen ? ORANGE : TEXT, transition: 'background 0.2s, transform 0.2s', transformOrigin: 'center', transform: mobileOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none' }} />
          </button>
        ) : (
          <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
            <NavLink href="/#workouts" active={pathname === '/'}>Workouts</NavLink>
            {/* <NavLink href="/#training" active={false}>Training</NavLink> */}
            <NavLink href="/articles" active={pathname === '/articles'}>Articles</NavLink>

            {/* {user ? (
              <div data-user-menu style={{ position: 'relative' }}>
                ...
              </div>
            ) : (
              <div style={{ display: 'flex', gap: 8 }}>
                <OBtn outline small onClick={onOpenAuth}>Sign In</OBtn>
                <OBtn small onClick={onOpenAuth}>Join Free</OBtn>
              </div>
            )} */}
          </div>
        )}
      </nav>

      {/* Mobile menu drawer */}
      {isMobile && mobileOpen && (
        <div
          style={{
            position: 'sticky',
            top: 56,
            zIndex: 99,
            background: 'rgba(10,10,10,0.98)',
            backdropFilter: 'blur(12px)',
            borderBottom: `1px solid ${BORDER}`,
            display: 'flex',
            flexDirection: 'column',
            padding: '8px 0',
          }}
        >
          <MobileNavLink href="/#workouts" active={pathname === '/'} onClick={() => setMobileOpen(false)}>Workouts</MobileNavLink>
          <MobileNavLink href="/articles" active={pathname === '/articles'} onClick={() => setMobileOpen(false)}>Articles</MobileNavLink>
        </div>
      )}
    </>
  )
}

function MobileNavLink({ href, children, active, onClick }: { href: string; children: React.ReactNode; active?: boolean; onClick?: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      style={{
        display: 'block',
        padding: '14px 20px',
        fontSize: 10,
        color: active ? TEXT : MUTED,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        fontWeight: active ? 700 : 400,
        borderLeft: active ? `2px solid ${ORANGE}` : '2px solid transparent',
        textDecoration: 'none',
        transition: 'color 0.2s',
      }}
    >
      {children}
    </Link>
  )
}
