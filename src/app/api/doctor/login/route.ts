import { connectDB } from '@/lib/db'
import User from '@/models/User'
import Otp from '@/models/Otp'
import { verifyOtpSchema } from '@/lib/validations'
import { signToken, setTokenCookie } from '@/lib/jwt'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = verifyOtpSchema.safeParse(body)
    if (!parsed.success) {
      return Response.json({ success: false, error: parsed.error.issues[0].message }, { status: 400 })
    }

    const { mobile, code } = parsed.data
    await connectDB()

    const otpRecord = await Otp.findOne({
      mobile,
      code,
      used: false,
      expiresAt: { $gt: new Date() },
    }).sort({ createdAt: -1 })

    if (!otpRecord) {
      return Response.json({ success: false, error: 'کد تایید نامعتبر یا منقضی شده است' }, { status: 400 })
    }

    otpRecord.used = true
    await otpRecord.save()

    const user = await User.findOne({ mobile })
    if (!user) {
      return Response.json({ success: false, error: 'کاربر یافت نشد' }, { status: 404 })
    }

    user.isVerified = true
    await user.save()

    const token = signToken({
      userId: user._id.toString(),
      mobile: user.mobile,
      role: user.role,
    })

    await setTokenCookie(token)

    return Response.json({
      success: true,
      data: {
        message: 'ورود موفقیت‌آمیز',
        user: { id: user._id, mobile: user.mobile, role: user.role },
      },
    })
  } catch (error) {
    console.error('Doctor login error:', error)
    return Response.json({ success: false, error: 'خطا در ورود' }, { status: 500 })
  }
}
