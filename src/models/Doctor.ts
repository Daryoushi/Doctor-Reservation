import mongoose, { Schema, Document } from 'mongoose'
import { getModel } from '@/init-db'

export interface IDoctorDocument extends Document {
  userId: mongoose.Types.ObjectId
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
  createdAt: Date
  updatedAt: Date
}

const DoctorSchema = new Schema<IDoctorDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    fullName: { type: String, required: true, trim: true },
    specialty: { type: String, required: true, trim: true },
    medicalSystemCode: { type: String, required: true, unique: true, trim: true },
    bio: { type: String, trim: true },
    avatar: { type: String, trim: true },
    city: { type: String, required: true, trim: true },
    clinicAddress: { type: String, required: true, trim: true },
    consultationFee: { type: Number, required: true, min: 0 },
    isApproved: { type: Boolean, default: false },
    averageRating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    experience: { type: Number },
  },
  { timestamps: true }
)

DoctorSchema.index({ city: 1, specialty: 1 })
DoctorSchema.index({ fullName: 'text', specialty: 'text' })

function getM(): any {
  if (mongoose.connection.readyState === 1) {
    return mongoose.models.Doctor || mongoose.model<IDoctorDocument>('Doctor', DoctorSchema)
  }
  return getModel('Doctor')
}

const _handler = {
  get(_target: any, prop: string | symbol) {
    const m = getM()
    const v = (m as any)[prop]
    if (typeof v === 'function') return (...args: any[]) => v.apply(m, args)
    return v
  },
}

export default new Proxy({}, _handler)
