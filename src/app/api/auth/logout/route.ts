import { removeTokenCookie } from '@/lib/jwt'
import { apiSuccess } from '@/lib/auth'

export async function POST() {
  await removeTokenCookie()
  return apiSuccess({ message: 'خروج موفقیت‌آمیز' })
}
