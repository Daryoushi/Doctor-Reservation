import { NextRequest } from 'next/server'
import { connectDB } from '@/lib/db'
import Appointment from '@/models/Appointment'
import { requireAuth, apiError } from '@/lib/auth'

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
    console.error('Get my appointments error:', error)
    return apiError('خطا در دریافت نوبت‌ها')
  }
}
