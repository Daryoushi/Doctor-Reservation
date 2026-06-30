import { getTokenFromCookies, verifyToken, removeTokenCookie } from './jwt'
import type { JwtPayload } from './jwt'

export async function getCurrentUser(): Promise<JwtPayload | null> {
  try {
    const token = await getTokenFromCookies()
    if (!token) return null
    return verifyToken(token)
  } catch {
    return null
  }
}

export async function requireAuth(): Promise<JwtPayload> {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error('Unauthorized')
  }
  return user
}

export async function requireRole(role: string): Promise<JwtPayload> {
  const user = await requireAuth()
  if (user.role !== role) {
    throw new Error('Forbidden')
  }
  return user
}

export function apiError(message: string, status: number = 400) {
  return Response.json({ success: false, error: message }, { status })
}

export function apiSuccess<T>(data: T, status: number = 200) {
  return Response.json({ success: true, data }, { status })
}
