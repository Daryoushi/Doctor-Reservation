import mongoose, { Schema, Document } from 'mongoose'
import { getModel } from '@/init-db'

export interface IAppointmentDocument extends Document {
  doctorId: mongoose.Types.ObjectId
  userId: mongoose.Types.ObjectId
  date: string
  startTime: string
  endTime: string
  status: 'pending' | 'paid' | 'cancelled' | 'completed'
  trackingCode: string
  amount: number
  createdAt: Date
  updatedAt: Date
}

const AppointmentSchema = new Schema<IAppointmentDocument>(
  {
    doctorId: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    status: { type: String, enum: ['pending', 'paid', 'cancelled', 'completed'], default: 'pending' },
    trackingCode: { type: String, required: true, unique: true },
    amount: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
)

AppointmentSchema.index({ doctorId: 1, date: 1 })

function getM(): any {
  if (mongoose.connection.readyState === 1) {
    return mongoose.models.Appointment || mongoose.model<IAppointmentDocument>('Appointment', AppointmentSchema)
  }
  return getModel('Appointment')
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
