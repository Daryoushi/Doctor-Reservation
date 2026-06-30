import { NextRequest } from 'next/server'
import { connectDB } from '@/lib/db'
import Doctor from '@/models/Doctor'
import DoctorSchedule from '@/models/DoctorSchedule'
import Appointment from '@/models/Appointment'
import { apiError, apiSuccess } from '@/lib/auth'
import { generateTimeSlots, getDayOfWeek } from '@/lib/utils'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date')

    if (!date) {
      return apiError('تاریخ الزامی است')
    }

    await connectDB()

    const doctor = await Doctor.findById(id)
    if (!doctor) {
      return apiError('پزشک یافت نشد', 404)
    }

    const dayOfWeek = getDayOfWeek(date)
    const schedules = await DoctorSchedule.find({
      doctorId: id,
      dayOfWeek,
      isActive: true,
    })

    if (!schedules.length) {
      return apiSuccess([])
    }

    const bookedAppointments = await Appointment.find({
      doctorId: id,
      date,
      status: { $in: ['pending', 'paid'] },
    }).select('startTime')

    const bookedSlots = bookedAppointments.map((a: any) => a.startTime)

    const allSlots = schedules.flatMap((schedule: any) =>
      generateTimeSlots(
        schedule.startTime,
        schedule.endTime,
        schedule.slotDuration,
        bookedSlots
      )
    )

    return apiSuccess(allSlots)
  } catch (error) {
    console.error('Get slots error:', error)
    return apiError('خطا در دریافت زمان‌های موجود')
  }
}
