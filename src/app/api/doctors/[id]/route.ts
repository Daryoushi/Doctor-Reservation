import { connectDB } from '@/lib/db'
import Doctor from '@/models/Doctor'
import DoctorSchedule from '@/models/DoctorSchedule'
import { apiError, apiSuccess } from '@/lib/auth'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await connectDB()

    const doctor = await Doctor.findById(id)
      .populate('userId', 'name')
      .lean()

    if (!doctor) {
      return apiError('پزشک مورد نظر یافت نشد', 404)
    }

    const schedules = await DoctorSchedule.find({ doctorId: id, isActive: true }).lean()

    return apiSuccess({ ...doctor, schedules })
  } catch (error) {
    console.error('Get doctor error:', error)
    return apiError('خطا در دریافت اطلاعات پزشک')
  }
}
