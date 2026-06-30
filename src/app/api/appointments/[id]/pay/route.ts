import { connectDB } from '@/lib/db'
import Appointment from '@/models/Appointment'
import { requireAuth, apiError, apiSuccess } from '@/lib/auth'

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireAuth()
    const { id } = await params
    await connectDB()

    const appointment = await Appointment.findOne({
      _id: id,
      patientId: user.userId,
      status: 'pending',
    })

    if (!appointment) {
      return apiError('نوبت یافت نشد یا قبلاً پرداخت شده است', 404)
    }

    appointment.status = 'paid'
    await appointment.save()

    return apiSuccess({
      message: 'پرداخت با موفقیت انجام شد',
      trackingCode: appointment.trackingCode,
    })
  } catch (error) {
    console.error('Pay appointment error:', error)
    return apiError('خطا در پرداخت')
  }
}
