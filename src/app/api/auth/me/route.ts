import { connectDB } from '@/lib/db'
import User from '@/models/User'
import { getCurrentUser, apiError, apiSuccess } from '@/lib/auth'

export async function GET() {
  try {
    const payload = await getCurrentUser()
    if (!payload) {
      return apiError('Unauthorized', 401)
    }

    await connectDB()
    const user = await User.findById(payload.userId).select('-__v')

    if (!user) {
      return apiError('User not found', 404)
    }

    return apiSuccess({
      id: user._id,
      mobile: user.mobile,
      name: user.name,
      nationalCode: user.nationalCode,
      role: user.role,
      isVerified: user.isVerified,
    })
  } catch (error) {
    console.error('Get current user error:', error)
    return apiError('Internal server error', 500)
  }
}
