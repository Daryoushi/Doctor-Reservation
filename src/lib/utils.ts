import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs'

export function generateOtpCode(length: number = 5): string {
  let code = ''
  for (let i = 0; i < length; i++) {
    code += Math.floor(Math.random() * 10).toString()
  }
  return code
}

export function generateTrackingCode(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = uuidv4().substring(0, 6).toUpperCase()
  return `DR-${timestamp}-${random}`
}

export function generateTimeSlots(
  startTime: string,
  endTime: string,
  durationMinutes: number,
  bookedSlots: string[] = []
) {
  const slots: { time: string; isAvailable: boolean }[] = []
  const [startH, startM] = startTime.split(':').map(Number)
  const [endH, endM] = endTime.split(':').map(Number)

  let currentMinutes = startH * 60 + startM
  const endMinutes = endH * 60 + endM

  while (currentMinutes + durationMinutes <= endMinutes) {
    const h = Math.floor(currentMinutes / 60)
    const m = currentMinutes % 60
    const time = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`
    const isAvailable = !bookedSlots.includes(time)
    slots.push({ time, isAvailable })
    currentMinutes += durationMinutes
  }

  return slots
}

export function formatPrice(price: number): string {
  return price.toLocaleString('fa-IR') + ' تومان'
}

export function getDayOfWeek(dateString: string): number {
  const date = dayjs(dateString)
  return date.day()
}

export function generateDateRange(startDate: string, days: number): string[] {
  const dates: string[] = []
  const start = dayjs(startDate)
  for (let i = 0; i < days; i++) {
    dates.push(start.add(i, 'day').format('YYYY-MM-DD'))
  }
  return dates
}
