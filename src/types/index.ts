export type UserRole = 'patient' | 'doctor' | 'admin'

export type AppointmentStatus = 'pending' | 'paid' | 'cancelled' | 'completed'

export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6

export interface IUser {
  _id: string
  mobile: string
  name?: string
  nationalCode?: string
  role: UserRole
  isVerified: boolean
  createdAt: Date
  updatedAt: Date
}

export interface IDoctor {
  _id: string
  userId: string
  fullName: string
  specialty: string
  medicalSystemCode: string
  bio?: string
  avatar?: string
  city: string
  clinicAddress: string
  consultationFee: number
  isApproved: boolean
  averageRating?: number
  reviewCount?: number
  experience?: number
}

export interface IDoctorSchedule {
  _id: string
  doctorId: string
  dayOfWeek: DayOfWeek
  startTime: string
  endTime: string
  slotDuration: number
  isActive: boolean
}

export interface ITimeSlot {
  time: string
  isAvailable: boolean
}

export interface IAppointment {
  _id: string
  patientId: string
  doctorId: string | IDoctor
  date: string
  startTime: string
  endTime: string
  status: AppointmentStatus
  price: number
  trackingCode: string
  createdAt: Date
}

export interface IApiResponse<T = unknown> {
  success: boolean
  message?: string
  data?: T
  error?: string
}

export interface PaginatedResponse<T> extends IApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}
