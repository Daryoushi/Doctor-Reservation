import { NextRequest } from 'next/server'
import { connectDB } from '@/lib/db'
import Doctor from '@/models/Doctor'
import Appointment from '@/models/Appointment'
import { requireRole, apiError } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const payload = await requireRole('doctor')
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const date = searchParams.get('date')
    const status = searchParams.get('status')

    await connectDB()

    const doctor = await Doctor.findOne({ userId: payload.userId })
    if (!doctor) return apiError('پزشک یافت نشد', 404)

    const filter: Record<string, unknown> = { doctorId: doctor._id }
    if (date) filter.date = date
    if (status) filter.status = status

    const total = await Appointment.countDocuments(filter)
    const appointments = await Appointment.find(filter)
      .populate('patientId', 'name mobile')
      .sort({ date: -1, startTime: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean()

    return Response.json({
      success: true,
      data: appointments,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Get doctor appointments error:', error)
    return apiError('خطا در دریافت نوبت‌ها')
  }
}
