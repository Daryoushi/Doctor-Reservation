import { connectDB } from '@/lib/db'
import Doctor from '@/models/Doctor'
import { requireRole, apiError, apiSuccess } from '@/lib/auth'

export async function GET() {
  try {
    const payload = await requireRole('doctor')
    await connectDB()

    const doctor = await Doctor.findOne({ userId: payload.userId }).populate('userId', 'name mobile').lean()
    if (!doctor) return apiError('پزشک یافت نشد', 404)

    return apiSuccess(doctor)
  } catch (error) {
    console.error('Get doctor profile error:', error)
    return apiError('خطا در دریافت پروفایل')
  }
}

export async function PATCH(request: Request) {
  try {
    const payload = await requireRole('doctor')
    const body = await request.json()
    await connectDB()

    const doctor = await Doctor.findOneAndUpdate(
      { userId: payload.userId },
      { $set: body },
      { new: true, runValidators: true }
    ).lean()

    if (!doctor) return apiError('پزشک یافت نشد', 404)

    return apiSuccess(doctor)
  } catch (error) {
    console.error('Update doctor profile error:', error)
    return apiError('خطا در بروزرسانی پروفایل')
  }
}
