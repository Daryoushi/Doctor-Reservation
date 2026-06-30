import { connectDB } from '@/lib/db'
import DoctorSchedule from '@/models/DoctorSchedule'
import Doctor from '@/models/Doctor'
import { requireRole, apiError, apiSuccess } from '@/lib/auth'

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const payload = await requireRole('doctor')
    const { id } = await params
    const body = await request.json()

    await connectDB()

    const doctor = await Doctor.findOne({ userId: payload.userId })
    if (!doctor) return apiError('پزشک یافت نشد', 404)

    const schedule = await DoctorSchedule.findOneAndUpdate(
      { _id: id, doctorId: doctor._id },
      { $set: body },
      { new: true, runValidators: true }
    )

    if (!schedule) return apiError('زمان کاری یافت نشد', 404)

    return apiSuccess(schedule)
  } catch (error) {
    console.error('Update schedule error:', error)
    return apiError('خطا در بروزرسانی زمان کاری')
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const payload = await requireRole('doctor')
    const { id } = await params

    await connectDB()

    const doctor = await Doctor.findOne({ userId: payload.userId })
    if (!doctor) return apiError('پزشک یافت نشد', 404)

    const schedule = await DoctorSchedule.findOneAndDelete({ _id: id, doctorId: doctor._id })
    if (!schedule) return apiError('زمان کاری یافت نشد', 404)

    return apiSuccess({ message: 'زمان کاری حذف شد' })
  } catch (error) {
    console.error('Delete schedule error:', error)
    return apiError('خطا در حذف زمان کاری')
  }
}
