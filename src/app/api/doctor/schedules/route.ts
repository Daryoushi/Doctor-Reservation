import { connectDB } from '@/lib/db'
import DoctorSchedule from '@/models/DoctorSchedule'
import Doctor from '@/models/Doctor'
import { requireRole, apiError, apiSuccess } from '@/lib/auth'

export async function GET() {
  try {
    const payload = await requireRole('doctor')
    await connectDB()

    const doctor = await Doctor.findOne({ userId: payload.userId })
    if (!doctor) return apiError('پزشک یافت نشد', 404)

    const schedules = await DoctorSchedule.find({ doctorId: doctor._id }).sort({ dayOfWeek: 1, startTime: 1 }).lean()

    return apiSuccess(schedules)
  } catch (error) {
    console.error('Get schedules error:', error)
    return apiError('خطا در دریافت زمان‌های کاری')
  }
}

export async function POST(request: Request) {
  try {
    const payload = await requireRole('doctor')
    const body = await request.json()
    const { dayOfWeek, startTime, endTime, slotDuration } = body

    if (dayOfWeek === undefined || !startTime || !endTime) {
      return apiError('روز هفته، زمان شروع و پایان الزامی است')
    }

    await connectDB()

    const doctor = await Doctor.findOne({ userId: payload.userId })
    if (!doctor) return apiError('پزشک یافت نشد', 404)

    const schedule = await DoctorSchedule.create({
      doctorId: doctor._id,
      dayOfWeek,
      startTime,
      endTime,
      slotDuration: slotDuration || 30,
    })

    return apiSuccess(schedule, 201)
  } catch (error) {
    console.error('Create schedule error:', error)
    return apiError('خطا در ثبت زمان کاری')
  }
}
