import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const publicPaths = [
  '/api/auth/send-otp',
  '/api/auth/verify-otp',
  '/api/doctors',
  '/_next',
  '/favicon.ico',
]

const authPages = ['/auth/login', '/auth/verify']

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('token')?.value

  const isPublicApi = publicPaths.some((p) => pathname.startsWith(p))
  const isApiRoute = pathname.startsWith('/api')
  const isStaticFile = pathname.startsWith('/_next') || pathname === '/favicon.ico'
  const isAuthPage = authPages.some((p) => pathname.startsWith(p))

  if (isStaticFile) return NextResponse.next()

  if (isApiRoute && !isPublicApi && !token) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    )
  }

  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  const protectedPages = ['/appointments', '/profile', '/payment', '/comment', '/referrer']
  const isProtectedPage = protectedPages.some((p) => pathname.startsWith(p))

  if (isProtectedPage && !token) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
