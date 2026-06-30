import { NextRequest } from 'next/server'
import { connectDB } from '@/lib/db'
import Appointment from '@/models/Appointment'
import { requireAuth, apiError } from '@/lib/auth'

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const user = await requireAuth()
    await connectDB()

    const appointment = await Appointment.findById(id)
    if (!appointment) {
      return apiError('نوبت یافت نشد')
    }

    if (appointment.patientId.toString() !== user.userId) {
      return apiError('شما اجازه لغو این نوبت را ندارید')
    }

    if (appointment.status === 'cancelled') {
      return apiError('این نوبت قبلاً لغو شده است')
    }

    appointment.status = 'cancelled'
    await appointment.save()

    return Response.json({ success: true, message: 'نوبت با موفقیت لغو شد' })
  } catch (error) {
    console.error('Cancel appointment error:', error)
    return apiError('خطا در لغو نوبت')
  }
}
