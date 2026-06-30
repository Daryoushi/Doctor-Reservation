import mongoose, { Schema, Document } from 'mongoose'
import type { UserRole } from '@/types'
import { getModel } from '@/init-db'

export interface IUserDocument extends Document {
  mobile: string
  name?: string
  nationalCode?: string
  role: UserRole
  isVerified: boolean
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUserDocument>(
  {
    mobile: { type: String, required: true, unique: true, trim: true },
    name: { type: String, trim: true },
    nationalCode: { type: String, trim: true },
    role: { type: String, enum: ['patient', 'doctor', 'admin'], default: 'patient' },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
)

function getM(): any {
  if (mongoose.connection.readyState === 1) {
    return mongoose.models.User || mongoose.model<IUserDocument>('User', UserSchema)
  }
  return getModel('User')
}

const _handler = {
  get(_target: any, prop: string | symbol) {
    const m = getM()
    const v = (m as any)[prop]
    if (typeof v === 'function') return (...args: any[]) => v.apply(m, args)
    return v
  },
}

const _userModel = new Proxy({}, _handler)
export default _userModel
