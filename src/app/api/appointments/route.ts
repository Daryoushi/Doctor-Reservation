import { NextRequest } from 'next/server'
import { connectDB } from '@/lib/db'
import Appointment from '@/models/Appointment'
import Doctor from '@/models/Doctor'
import { requireAuth, apiError, apiSuccess } from '@/lib/auth'
import { appointmentSchema } from '@/lib/validations'
import { generateTrackingCode, formatPrice } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth()
    if (user.role !== 'patient') {
      return apiError('فقط بیماران می‌توانند نوبت رزرو کنند', 403)
    }

    const body = await request.json()
    const parsed = appointmentSchema.safeParse(body)
    if (!parsed.success) {
      return apiError(parsed.error.issues[0].message)
    }

    const { doctorId, date, startTime, endTime } = parsed.data
    await connectDB()

    const doctor = await Doctor.findById(doctorId)
    if (!doctor) {
      return apiError('پزشک یافت نشد', 404)
    }

    const existing = await Appointment.findOne({
      doctorId,
      date,
      startTime,
      status: { $in: ['pending', 'paid'] },
    })

    if (existing) {
      return apiError('این زمان قبلاً رزرو شده است')
    }

    const appointment = await Appointment.create({
      patientId: user.userId,
      doctorId,
      date,
      startTime,
      endTime,
      price: doctor.consultationFee,
      trackingCode: generateTrackingCode(),
    })

    return apiSuccess(
      {
        ...appointment.toObject(),
        priceFormatted: formatPrice(doctor.consultationFee),
      },
      201
    )
  } catch (error) {
    console.error('Create appointment error:', error)
    return apiError('خطا در ثبت نوبت')
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth()
    await connectDB()

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')

    const filter: Record<string, unknown> = { patientId: user.userId }
    if (status) filter.status = status

    const total = await Appointment.countDocuments(filter)
    const appointments = await Appointment.find(filter)
      .populate({
        path: 'doctorId',
        select: 'fullName specialty city clinicAddress consultationFee avatar',
      })
      .sort({ createdAt: -1 })
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
    console.error('Get appointments error:', error)
    return apiError('خطا در دریافت نوبت‌ها')
  }
}
