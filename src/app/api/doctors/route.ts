import { NextRequest } from 'next/server'
import { connectDB } from '@/lib/db'
import Doctor from '@/models/Doctor'
import { apiError, apiSuccess } from '@/lib/auth'
import { DOCTOR_PAGE_SIZE } from '@/constants'

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || String(DOCTOR_PAGE_SIZE))
    const specialty = searchParams.get('specialty')
    const city = searchParams.get('city')
    const search = searchParams.get('search')
    const sort = searchParams.get('sort') || 'fullName'

    const filter: Record<string, unknown> = { isApproved: true }

    if (specialty && specialty !== 'all') filter.specialty = specialty
    if (city && city !== 'all') filter.city = city
    if (search) {
      filter.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { specialty: { $regex: search, $options: 'i' } },
      ]
    }

    const total = await Doctor.countDocuments(filter)
    const totalPages = Math.ceil(total / limit)
    const skip = (page - 1) * limit

    const doctors = await Doctor.find(filter)
      .populate('userId', 'name')
      .sort({ [sort]: 1 })
      .skip(skip)
      .limit(limit)
      .lean()

    return Response.json({
      success: true,
      data: doctors,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    })
  } catch (error) {
    console.error('Get doctors error:', error)
    return apiError('خطا در دریافت لیست پزشکان')
  }
}
