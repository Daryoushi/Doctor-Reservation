import { Smsir } from 'smsir-js'

const SMS_API_KEY = process.env.SMS_API_KEY
const SMS_LINE_NUMBER = process.env.SMS_LINE_NUMBER
const SMS_TEMPLATE_ID = 123456

let smsInstance: Smsir | null = null

function getSms(): Smsir | null {
  if (smsInstance) return smsInstance
  if (SMS_API_KEY) {
    smsInstance = new Smsir(SMS_API_KEY, Number(SMS_LINE_NUMBER || 0))
    return smsInstance
  }
  return null
}

export async function sendOtpSms(mobile: string, code: string): Promise<boolean> {
  const sms = getSms()
  if (!sms) {
    console.log(`[SMS Mock] To: ${mobile}, Code: ${code}`)
    return true
  }

  try {
    if (SMS_LINE_NUMBER && SMS_LINE_NUMBER !== 'your-sms-line-number') {
      const message = `کد تایید شما در سامانه رزرو نوبت پزشک: ${code}`
      await sms.SendBulk(message, [mobile], null, Number(SMS_LINE_NUMBER))
    } else {
      await sms.SendVerifyCode(mobile, SMS_TEMPLATE_ID, [
        { name: 'Code', value: code },
      ])
    }
    return true
  } catch (error) {
    console.error('SMS sending failed:', error)
    return false
  }
}
