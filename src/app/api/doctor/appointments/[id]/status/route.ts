import { connectDB } from '@/lib/db'
import Doctor from '@/models/Doctor'
import Appointment from '@/models/Appointment'
import { requireRole, apiError, apiSuccess } from '@/lib/auth'

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const payload = await requireRole('doctor')
    const { id } = await params
    const body = await request.json()
    const { status } = body

    if (!['pending', 'paid', 'cancelled', 'completed'].includes(status)) {
      return apiError('وضعیت نامعتبر است')
    }

    await connectDB()

    const doctor = await Doctor.findOne({ userId: payload.userId })
    if (!doctor) return apiError('پزشک یافت نشد', 404)

    const appointment = await Appointment.findOneAndUpdate(
      { _id: id, doctorId: doctor._id },
      { status },
      { new: true }
    ).populate('patientId', 'name mobile')

    if (!appointment) return apiError('نوبت یافت نشد', 404)

    return apiSuccess(appointment)
  } catch (error) {
    console.error('Update appointment status error:', error)
    return apiError('خطا در بروزرسانی وضعیت نوبت')
  }
}
