import { z } from 'zod'

export const mobileSchema = z
  .string()
  .regex(/^09\d{9}$/, 'شماره موبایل باید ۱۱ رقم و با ۰۹ شروع شود')

export const otpSchema = z
  .string()
  .length(5, 'کد تایید باید ۵ رقم باشد')
  .regex(/^\d{5}$/, 'کد تایید باید فقط شامل اعداد باشد')

export const sendOtpSchema = z.object({
  mobile: mobileSchema,
})

export const verifyOtpSchema = z.object({
  mobile: mobileSchema,
  code: otpSchema,
})

export const doctorRegisterSchema = z.object({
  mobile: mobileSchema,
  fullName: z.string().min(2, 'نام باید حداقل ۲ حرف باشد'),
  specialty: z.string().min(1, 'تخصص الزامی است'),
  medicalSystemCode: z.string().min(1, 'کد نظام پزشکی الزامی است'),
  city: z.string().min(1, 'شهر الزامی است'),
  clinicAddress: z.string().min(5, 'آدرس باید حداقل ۵ حرف باشد'),
  consultationFee: z.number().min(0, 'هزینه ویزیت نمی‌تواند منفی باشد'),
  bio: z.string().optional(),
  experience: z.number().optional(),
})

export const doctorProfileSchema = z.object({
  fullName: z.string().min(2).optional(),
  specialty: z.string().min(1).optional(),
  bio: z.string().optional(),
  city: z.string().min(1).optional(),
  clinicAddress: z.string().min(5).optional(),
  consultationFee: z.number().min(0).optional(),
  experience: z.number().optional(),
})

export const scheduleSchema = z.object({
  dayOfWeek: z.number().min(0).max(6),
  startTime: z.string().regex(/^\d{2}:\d{2}$/, 'فرمت زمان نامعتبر'),
  endTime: z.string().regex(/^\d{2}:\d{2}$/, 'فرمت زمان نامعتبر'),
  slotDuration: z.number().min(15).max(120).optional(),
})

export const appointmentSchema = z.object({
  doctorId: z.string().min(1, 'شناسه پزشک الزامی است'),
  date: z.string().min(1, 'تاریخ الزامی است'),
  startTime: z.string().min(1, 'زمان شروع الزامی است'),
  endTime: z.string().min(1, 'زمان پایان الزامی است'),
})

export const profileUpdateSchema = z.object({
  name: z.string().min(2).optional(),
  nationalCode: z.string().regex(/^\d{10}$/, 'کد ملی باید ۱۰ رقم باشد').optional(),
})
