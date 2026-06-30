import mongoose, { Schema, Document } from 'mongoose'
import { getModel } from '@/init-db'

export interface IDoctorScheduleDocument extends Document {
  doctorId: mongoose.Types.ObjectId
  dayOfWeek: number
  startTime: string
  endTime: string
  slotDuration: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const DoctorScheduleSchema = new Schema<IDoctorScheduleDocument>(
  {
    doctorId: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true, index: true },
    dayOfWeek: { type: Number, required: true, min: 0, max: 6 },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    slotDuration: { type: Number, default: 30 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
)

DoctorScheduleSchema.index({ doctorId: 1, dayOfWeek: 1 })

function getM(): any {
  if (mongoose.connection.readyState === 1) {
    return mongoose.models.DoctorSchedule || mongoose.model<IDoctorScheduleDocument>('DoctorSchedule', DoctorScheduleSchema)
  }
  return getModel('DoctorSchedule')
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
