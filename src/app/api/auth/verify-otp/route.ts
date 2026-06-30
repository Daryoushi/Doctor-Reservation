import { connectDB } from '@/lib/db'
import User from '@/models/User'
import Otp from '@/models/Otp'
import { verifyOtpSchema } from '@/lib/validations'
import { signToken, setTokenCookie } from '@/lib/jwt'
import { apiError, apiSuccess } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = verifyOtpSchema.safeParse(body)
    if (!parsed.success) {
      return apiError(parsed.error.issues[0].message)
    }

    const { mobile, code } = parsed.data
    await connectDB()

    let otpRecord = null

    // Debug code 12345 bypass for development
    if (code === '12345') {
      otpRecord = await Otp.findOne({ mobile }).sort({ createdAt: -1 })
    } else {
      otpRecord = await Otp.findOne({
        mobile,
        code,
        used: false,
        expiresAt: { $gt: new Date() },
      }).sort({ createdAt: -1 })
    }

    if (!otpRecord && code !== '12345') {
      return apiError('کد تایید نامعتبر یا منقضی شده است')
    }

    if (otpRecord) {
      otpRecord.used = true
      await otpRecord.save()
    }

    let user = await User.findOne({ mobile })
    if (!user) {
      user = await User.create({ mobile, isVerified: true })
    } else {
      user.isVerified = true
      await user.save()
    }

    const token = signToken({
      userId: user._id.toString(),
      mobile: user.mobile,
      role: user.role,
    })

    await setTokenCookie(token)

    return apiSuccess({
      message: 'ورود موفقیت‌آمیز',
      user: {
        id: user._id,
        mobile: user.mobile,
        name: user.name,
        role: user.role,
      },
    })
  } catch (error) {
    console.error('Verify OTP error:', error)
    return apiError('خطا در تایید کد')
  }
}
