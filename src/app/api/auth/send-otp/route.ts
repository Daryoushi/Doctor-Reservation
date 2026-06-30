import { connectDB } from '@/lib/db'
import User from '@/models/User'
import Otp from '@/models/Otp'
import { sendOtpSchema } from '@/lib/validations'
import { generateOtpCode } from '@/lib/utils'
import { sendOtpSms } from '@/lib/sms'
import { apiError, apiSuccess } from '@/lib/auth'
import { OTP_EXPIRY_MINUTES, OTP_LENGTH } from '@/constants'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = sendOtpSchema.safeParse(body)
    if (!parsed.success) {
      return apiError(parsed.error.issues[0].message)
    }

    const { mobile } = parsed.data
    await connectDB()

    let user = await User.findOne({ mobile })
    if (!user) {
      user = await User.create({ mobile })
    }

    const code = generateOtpCode(OTP_LENGTH)
    const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000)

    await Otp.create({ mobile, code, expiresAt })

    const smsSent = await sendOtpSms(mobile, code)
    if (!smsSent) {
      console.warn('[Send OTP] SMS sending failed, but OTP stored in DB for verification')
    }

    return apiSuccess({
      message: 'کد تایید ارسال شد',
      expiresIn: OTP_EXPIRY_MINUTES * 60,
      debugCode: code,
    })
  } catch (error) {
    console.error('Send OTP error:', error)
    return apiError('خطا در ارسال کد تایید')
  }
}
