import { connectDB } from '@/lib/db'
import User from '@/models/User'
import Otp from '@/models/Otp'
import Doctor from '@/models/Doctor'
import { signToken, setTokenCookie } from '@/lib/jwt'
import { generateOtpCode } from '@/lib/utils'
import { sendOtpSms } from '@/lib/sms'
import { OTP_EXPIRY_MINUTES, OTP_LENGTH } from '@/constants'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { mobile, fullName, specialty, medicalSystemCode, city, clinicAddress, consultationFee, bio, experience } = body

    if (!mobile || !fullName || !specialty || !medicalSystemCode || !city || !clinicAddress || consultationFee === undefined) {
      return Response.json(
        { success: false, error: 'تمام فیلدهای اجباری را پر کنید' },
        { status: 400 }
      )
    }

    await connectDB()

    let user = await User.findOne({ mobile })
    if (user && user.role === 'doctor') {
      return Response.json(
        { success: false, error: 'این شماره قبلاً به عنوان پزشک ثبت شده است' },
        { status: 400 }
      )
    }

    const existingDoctor = await Doctor.findOne({ medicalSystemCode })
    if (existingDoctor) {
      return Response.json(
        { success: false, error: 'این کد نظام پزشکی قبلاً ثبت شده است' },
        { status: 400 }
      )
    }

    if (!user) {
      user = await User.create({ mobile, role: 'doctor', isVerified: false })
    } else {
      user.role = 'doctor'
      await user.save()
    }

    await Doctor.create({
      userId: user._id,
      fullName,
      specialty,
      medicalSystemCode,
      city,
      clinicAddress,
      consultationFee,
      bio,
      experience,
    })

    const code = generateOtpCode(OTP_LENGTH)
    const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000)
    await Otp.create({ mobile, code, expiresAt })
    await sendOtpSms(mobile, code)

    return Response.json(
      {
        success: true,
        data: {
          message: 'ثبت‌نام با موفقیت انجام شد. کد تایید ارسال شد.',
          ...(process.env.NODE_ENV === 'development' && { debugCode: code }),
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Doctor register error:', error)
    return Response.json(
      { success: false, error: 'خطا در ثبت‌نام پزشک' },
      { status: 500 }
    )
  }
}
