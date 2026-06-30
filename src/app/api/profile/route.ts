import { connectDB } from '@/lib/db'
import User from '@/models/User'
import { requireAuth, apiError, apiSuccess } from '@/lib/auth'
import { profileUpdateSchema } from '@/lib/validations'

export async function GET() {
  try {
    const payload = await requireAuth()
    await connectDB()

    const user = await User.findById(payload.userId).select('-__v')
    if (!user) return apiError('User not found', 404)

    return apiSuccess(user)
  } catch (error) {
    console.error('Get profile error:', error)
    return apiError('خطا در دریافت پروفایل')
  }
}

export async function PATCH(request: Request) {
  try {
    const payload = await requireAuth()
    const body = await request.json()
    const parsed = profileUpdateSchema.safeParse(body)

    if (!parsed.success) {
      return apiError(parsed.error.issues[0].message)
    }

    await connectDB()

    const user = await User.findByIdAndUpdate(payload.userId, parsed.data, {
      new: true,
      select: '-__v',
    })

    if (!user) return apiError('User not found', 404)

    return apiSuccess(user)
  } catch (error) {
    console.error('Update profile error:', error)
    return apiError('خطا در بروزرسانی پروفایل')
  }
}
