import { NextRequest } from 'next/server'
import { connectDB } from '@/lib/db'
import Doctor from '@/models/Doctor'
import DoctorSchedule from '@/models/DoctorSchedule'
import Appointment from '@/models/Appointment'
import { requireRole, apiError, apiSuccess } from '@/lib/auth'
import { generateDateRange, getDayOfWeek } from '@/lib/utils'

export async function GET(request: NextRequest) {
  try {
    const payload = await requireRole('doctor')
    const { searchParams } = new URL(request.url)
    const startDate = searchParams.get('startDate') || new Date().toISOString().split('T')[0]
    const days = parseInt(searchParams.get('days') || '14')

    await connectDB()

    const doctor = await Doctor.findOne({ userId: payload.userId })
    if (!doctor) return apiError('پزشک یافت نشد', 404)

    const schedules = await DoctorSchedule.find({ doctorId: doctor._id, isActive: true })
    const dates = generateDateRange(startDate, days)

    const availabilities = await Promise.all(
      dates.map(async (date) => {
        const dayOfWeek = getDayOfWeek(date)
        const daySchedules = schedules.filter((s: any) => s.dayOfWeek === dayOfWeek)

        if (!daySchedules.length) {
          return { date, dayOfWeek, isAvailable: false, slots: [] }
        }

        const bookedAppointments = await Appointment.find({
          doctorId: doctor._id,
          date,
          status: { $in: ['pending', 'paid'] },
        }).select('startTime')

        const bookedSlots = bookedAppointments.map((a: any) => a.startTime)

        const slots = daySchedules.flatMap((schedule: any) => {
          const slotsList: { time: string; isBooked: boolean }[] = []
          const [startH, startM] = schedule.startTime.split(':').map(Number)
          const [endH, endM] = schedule.endTime.split(':').map(Number)
          let current = startH * 60 + startM
          const end = endH * 60 + endM

          while (current + schedule.slotDuration <= end) {
            const h = Math.floor(current / 60)
            const m = current % 60
            const time = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`
            slotsList.push({ time, isBooked: bookedSlots.includes(time) })
            current += schedule.slotDuration
          }
          return slotsList
        })

        return { date, dayOfWeek, isAvailable: true, slots }
      })
    )

    return apiSuccess(availabilities)
  } catch (error) {
    console.error('Get availabilities error:', error)
    return apiError('خطا در دریافت زمان‌های موجود')
  }
}
