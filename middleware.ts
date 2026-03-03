import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Note: Real auth guard would verify a JWT/session cookie here.
// Since we're using localStorage (client-side only), the dashboard
// page itself handles the redirect via DashboardPage's useAuth check.
// This middleware is a placeholder for when a real auth backend is added.

export function middleware(request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*'],
}
