export const SPECIALTIES = [
  { id: '1', name: 'قلب و عروق', slug: 'cardiology', icon: '❤️' },
  { id: '2', name: 'داخلی', slug: 'internal', icon: '🩺' },
  { id: '3', name: 'اطفال', slug: 'pediatrics', icon: '👶' },
  { id: '4', name: 'زنان و زایمان', slug: 'gynecology', icon: '👩' },
  { id: '5', name: 'ارتوپدی', slug: 'orthopedics', icon: '🦴' },
  { id: '6', name: 'چشم پزشکی', slug: 'ophthalmology', icon: '👁️' },
  { id: '7', name: 'پوست و مو', slug: 'dermatology', icon: '🧴' },
  { id: '8', name: 'مغز و اعصاب', slug: 'neurology', icon: '🧠' },
  { id: '9', name: 'گوش و حلق و بینی', slug: 'ent', icon: '👂' },
  { id: '10', name: 'روانپزشکی', slug: 'psychiatry', icon: '💬' },
]

export const CITIES = [
  'تهران',
  'مشهد',
  'اصفهان',
  'شیراز',
  'تبریز',
  'کرج',
  'قم',
  'اهواز',
  'رشت',
  'کرمانشاه',
]

export const APPOINTMENT_STATUS_LABELS: Record<string, string> = {
  pending: 'در انتظار پرداخت',
  paid: 'پرداخت شده',
  cancelled: 'لغو شده',
  completed: 'انجام شده',
}

export const DAY_NAMES: Record<number, string> = {
  0: 'یکشنبه',
  1: 'دوشنبه',
  2: 'سه‌شنبه',
  3: 'چهارشنبه',
  4: 'پنجشنبه',
  5: 'جمعه',
  6: 'شنبه',
}

export const OTP_EXPIRY_MINUTES = 5
export const OTP_LENGTH = 5
export const SLOT_DURATION_DEFAULT = 30
export const APPOINTMENT_PAGE_SIZE = 10
export const DOCTOR_PAGE_SIZE = 12
