import { initDB } from '@/init-db'

export async function connectDB() {
  await initDB()
  return true
}
