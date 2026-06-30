'use client'

import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import BottomNav from '@/app/components/BottomNav'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const STATUS_MAP: Record<string, { label: string; color: string; bg: string }> = {
  confirmed: { label: 'تایید شده', color: '#22C55E', bg: '#F0FDF4' },
  pending: { label: 'در انتظار تایید', color: '#F59E0B', bg: '#FFFBEB' },
  cancelled: { label: 'لغو شده', color: '#EF4444', bg: '#FEF2F2' },
  completed: { label: 'انجام شده', color: '#6B7280', bg: '#F3F4F6' },
}

const DOCTORS_MAP: Record<string, { name: string; specialty: string; image: string }> = {
  '1': { name: 'دکتر زهرا وارسته', specialty: 'متخصص قلب و عروق', image: '/images/dr1.jpg' },
  '2': { name: 'دکتر علی راد', specialty: 'متخصص ریه', image: '/images/dr2.jpg' },
  '3': { name: 'دکتر بهنوش حسینی', specialty: 'جراح گوش حلق بینی', image: '/images/dr3.png' },
  '4': { name: 'دکتر یاشار پناهی', specialty: 'متخصص روانشناس بالینی', image: '/images/dr4.png' },
  '5': { name: 'دکتر زهرا سعادتی', specialty: 'متخصص گوش و حلق بینی', image: '/images/dr11.png' },
  '6': { name: 'دکتر علی وارسته', specialty: 'متخصص ارتوپدی', image: '/images/dr12.png' },
  '7': { name: 'دکتر بهنوش حسینی', specialty: 'متخصص گوش و حلق بینی', image: '/images/dr13.png' },
  '8': { name: 'دکتر ماهان گروسی', specialty: 'متخصص دندانپزشکی', image: '/images/dr14.png' },
}

interface AppointmentData {
  _id?: string
  doctorId?: { _id?: string; fullName?: string; specialty?: string; avatar?: string } | string
  date?: string
  startTime?: string
  status?: string
  trackingCode?: string
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<AppointmentData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState<'future' | 'past'>('future')

  function loadLocalAppointments() {
    try {
      const stored = JSON.parse(localStorage.getItem('appointments') || '[]')
      if (Array.isArray(stored) && stored.length > 0) {
        const mapped = stored.map((a: Record<string, unknown>) => ({
          doctorId: String(a.doctorId || '1'),
          date: String(a.date || 'نامشخص'),
          startTime: String(a.time || 'نامشخص'),
          trackingCode: String(a.trackingCode || '------'),
          status: 'confirmed',
        } as AppointmentData))
        setAppointments(mapped)
        return true
      }
    } catch { /* ignore */ }
    return false
  }

  useEffect(() => { fetchAppointments() }, [])

  async function fetchAppointments() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/appointments/my')
      if (res.status === 401) {
        const hasLocal = loadLocalAppointments()
        if (!hasLocal) setError('لطفاً ابتدا وارد حساب خود شوید.')
        setLoading(false)
        return
      }
      const data = await res.json()
      if (data.success && Array.isArray(data.data)) {
        setAppointments(data.data)
      } else {
        loadLocalAppointments()
      }
    } catch {
      const hasLocal = loadLocalAppointments()
      if (!hasLocal) setError('خطا در دریافت نوبت‌ها')
    } finally {
      setLoading(false)
    }
  }

  async function cancelAppointment(id: string) {
    if (!confirm('آیا از لغو این نوبت مطمئن هستید؟')) return
    try {
      const res = await fetch(`/api/appointments/${id}/cancel`, { method: 'POST' })
      const data = await res.json()
      if (data.success) {
        alert('نوبت با موفقیت لغو شد.')
        fetchAppointments()
      } else {
        alert(data.error || 'خطا در لغو نوبت')
      }
    } catch {
      alert('خطا در لغو نوبت')
    }
  }

  const filteredAppointments = appointments.filter((appt) => {
    if (activeTab === 'future') {
      return appt.status === 'pending' || appt.status === 'confirmed'
    }
    return appt.status === 'cancelled' || appt.status === 'completed'
  })

  const doctorInfo = (appt: AppointmentData) => {
    const doc = appt.doctorId
    if (doc && typeof doc === 'object') {
      return { name: doc.fullName || 'پزشک', specialty: doc.specialty || 'تخصص', image: doc.avatar || '' }
    }
    const id = typeof appt.doctorId === 'string' ? appt.doctorId : '1'
    return DOCTORS_MAP[id] || { name: 'پزشک', specialty: 'تخصص', image: '' }
  }

  return (
    <div className="bg-[#F9FAFB]" style={{ fontFamily: "'Vazirmatn', sans-serif", minHeight: '100vh' }}>
      <Header />

      <div className="max-w-[1000px] mx-auto px-4 sm:px-6" style={{ paddingTop: '120px', paddingBottom: 'calc(80px + 40px)' }}>
        <h2 className="text-[24px] font-medium text-[#262626] leading-[38px] text-right mb-8">نوبت‌های من</h2>

        {/* Tabs */}
        <div className="flex items-center gap-6 border-b border-[#E7E7E7] mb-6">
          <button onClick={() => setActiveTab('future')} className={`pb-3 text-[16px] font-medium leading-[25px] transition relative ${activeTab === 'future' ? 'text-[#4179F0]' : 'text-[#9CA3AF]'}`}>
            نوبت‌های آینده
            {activeTab === 'future' && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#4179F0] rounded-full" />}
          </button>
          <button onClick={() => setActiveTab('past')} className={`pb-3 text-[16px] font-medium leading-[25px] transition relative ${activeTab === 'past' ? 'text-[#4179F0]' : 'text-[#9CA3AF]'}`}>
            نوبت‌های گذشته
            {activeTab === 'past' && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#4179F0] rounded-full" />}
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-[#E7E7E7] rounded-[12px] p-6 bg-white animate-pulse">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-gray-200" />
                  <div className="flex-1 space-y-3">
                    <div className="h-5 bg-gray-200 rounded w-44" />
                    <div className="h-4 bg-gray-200 rounded w-28" />
                    <div className="h-4 bg-gray-200 rounded w-56" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="text-center py-12 border border-[#E7E7E7] rounded-[12px] bg-white">
            <div className="text-[48px] mb-4">⚠️</div>
            <p className="text-[16px] font-medium text-[#EF4444] mb-4">{error}</p>
            <button onClick={fetchAppointments} className="px-6 py-2.5 bg-[#4179F0] text-white rounded-[8px] text-[14px] font-medium hover:bg-[#3568D6] transition">
              تلاش مجدد
            </button>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && filteredAppointments.length === 0 && (
          <div className="text-center py-12 border border-[#E7E7E7] rounded-[12px] bg-white">
            <div className="text-[48px] mb-4">📋</div>
            <h3 className="text-[18px] font-bold text-[#262626] mb-2">نوبتی یافت نشد</h3>
            <p className="text-[14px] text-[#6B7280] mb-6">در حال حاضر هیچ نوبت {activeTab === 'future' ? 'آینده‌ای' : 'گذشته‌ای'} ندارید.</p>
            {activeTab === 'future' && (
              <Link href="/doctors" className="inline-block px-6 py-2.5 bg-[#4179F0] text-white rounded-[8px] text-[14px] font-medium hover:bg-[#3568D6] transition no-underline">
                رزرو نوبت جدید
              </Link>
            )}
          </div>
        )}

        {/* List */}
        {!loading && !error && filteredAppointments.length > 0 && (
          <div className="space-y-4">
            {filteredAppointments.map((appt, idx) => {
              const doc = doctorInfo(appt)
              const status = STATUS_MAP[appt.status || 'pending'] || STATUS_MAP.pending
              return (
                <div key={appt._id || idx} className="border border-[#E7E7E7] rounded-[12px] p-4 lg:p-6 bg-white hover:shadow-sm transition">
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-[#F0F5FE] flex items-center justify-center shrink-0 overflow-hidden">
                      {doc.image ? (
                        <img src={doc.image} alt={doc.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-[18px] lg:text-[24px] font-bold text-[#4179F0]">{doc.name.charAt(0)}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0 w-full">
                      <div className="flex flex-wrap justify-between items-start gap-2">
                        <div>
                          <h3 className="text-[16px] lg:text-[18px] font-bold text-[#262626]">{doc.name}</h3>
                          <p className="text-[13px] lg:text-[14px] text-[#6B7280] mt-0.5">{doc.specialty}</p>
                        </div>
                        <span className="text-[12px] font-medium px-3 py-1 rounded-full" style={{ color: status.color, backgroundColor: status.bg }}>
                          {status.label}
                        </span>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-[13px] lg:text-[14px] text-[#4F4F4F]">
                        <span>📅 تاریخ: <span className="font-medium text-[#262626]">{appt.date || 'نامشخص'}</span></span>
                        <span>⏰ ساعت: <span className="font-medium text-[#262626]">{appt.startTime || 'نامشخص'}</span></span>
                        <span>🔑 کد پیگیری: <span className="font-medium text-[#4179F0]">{appt.trackingCode || '------'}</span></span>
                      </div>
                      {(appt.status === 'pending' || appt.status === 'confirmed') && (
                        <div className="mt-4 flex justify-end">
                          <button onClick={() => cancelAppointment(appt._id!)} className="text-[14px] font-medium text-[#FE2A2A] hover:text-[#DC2626] transition bg-transparent border-none cursor-pointer">
                            لغو نوبت
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <Footer />
      <BottomNav />
    </div>
  )
}
