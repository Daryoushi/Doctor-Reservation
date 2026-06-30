import mongoose, { Schema, Document } from 'mongoose'
import { getModel } from '@/init-db'

export interface IOtpDocument extends Document {
  mobile: string
  code: string
  expiresAt: Date
  used: boolean
  createdAt: Date
}

const OtpSchema = new Schema<IOtpDocument>(
  {
    mobile: { type: String, required: true, index: true },
    code: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    used: { type: Boolean, default: false },
  },
  { timestamps: true }
)

OtpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

function getM(): any {
  if (mongoose.connection.readyState === 1) {
    return mongoose.models.Otp || mongoose.model<IOtpDocument>('Otp', OtpSchema)
  }
  return getModel('Otp')
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
