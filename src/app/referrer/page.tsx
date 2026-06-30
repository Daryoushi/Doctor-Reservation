'use client'

import { useEffect, useState } from 'react'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import BottomNav from '@/app/components/BottomNav'
import Link from 'next/link'

const doctors: Record<string, { name: string; specialty: string; image: string; address: string }> = {
  '1': { name: 'دکتر زهرا وارسته', specialty: 'متخصص قلب و عروق', image: '/images/dr1.jpg', address: 'تهران، ولیعصر، خیابان هفتم، پلاک ۴۰' },
  '2': { name: 'دکتر علی وارسته', specialty: 'متخصص ارتوپدی', image: '/images/dr2.jpg', address: 'تهران، خیابان فرشته، پلاک ۱۲' },
  '3': { name: 'دکتر بهنوش حسینی', specialty: 'جراح گوش و حلق و بینی', image: '/images/dr3.png', address: 'تهران، جردن، پلاک ۹' },
  '4': { name: 'دکتر علی راد', specialty: 'متخصص ریه', image: '/images/dr4.png', address: 'تهران، شریعتی، پلاک ۱۷' },
  '5': { name: 'دکتر لعیا زنگنه', specialty: 'متخصص قلب و عروق', image: '/images/dr11.png', address: 'تهران، ونک، کوچه ۱۲، پلاک ۲۵' },
  '6': { name: 'دکتر یاشار پناهی', specialty: 'متخصص روانشناسی بالینی', image: '/images/dr12.png', address: 'تهران، زعفرانیه، پلاک ۱۹' },
  '7': { name: 'دکتر زهرا سعادتی', specialty: 'متخصص گوش و حلق و بینی', image: '/images/dr13.png', address: 'تهران، ولنجک، کوچه ۱۷، پلاک ۲۰' },
  '8': { name: 'دکتر ماهان گروسی', specialty: 'متخصص دندانپزشکی', image: '/images/dr14.png', address: 'تهران، میرداماد، پلاک ۱۷' },
}

export default function ReferrerPage() {
  const [referrerType, setReferrerType] = useState('self')
  const [formData, setFormData] = useState({ fullName: '', phone: '', nationalCode: '', birthDate: '' })

  const isBrowser = typeof window !== 'undefined'
  const params = isBrowser ? new URLSearchParams(window.location.search) : new URLSearchParams()
  const doctorId = params.get('doctor') || '1'
  const doctor = doctors[doctorId] || doctors['1']
  const date = params.get('date') || '۲۴ دی ۱۴۰۴'
  const time = params.get('time') || '۱۱:۰۰'
  const userName = isBrowser ? localStorage.getItem('userName') || 'کاربر' : 'کاربر'
  const userPhone = isBrowser ? localStorage.getItem('userPhone') || '۰۹۱۲۳۴۵۶۷۸۹' : '۰۹۱۲۳۴۵۶۷۸۹'

  const goToPayment = () => {
    if (referrerType === 'other') {
      if (!formData.fullName.trim() || !formData.phone.trim()) {
        alert('لطفاً اطلاعات بیمار را وارد کنید.')
        return
      }
    }
    window.location.href = '/payment?doctor=' + doctorId + '&date=' + encodeURIComponent(date) + '&time=' + time + '&referrer=' + referrerType
  }

  return (
    <div className="bg-white" style={{ fontFamily: 'Vazirmatn, sans-serif' }}>
      <Header />

      <section className="max-w-3xl mx-auto px-6 py-8">
        {/* Step indicator */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 bg-[#4179F0] text-white rounded-full flex items-center justify-center text-sm font-bold">۱</span>
            <span className="text-sm text-[#4179F0] font-medium">پزشک</span>
          </div>
          <div className="w-12 h-0.5 bg-[#4179F0]"></div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 bg-[#4179F0] text-white rounded-full flex items-center justify-center text-sm font-bold">۲</span>
            <span className="text-sm text-[#4179F0] font-medium">تاریخ و ساعت</span>
          </div>
          <div className="w-12 h-0.5 bg-[#4179F0]"></div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 bg-[#4179F0] text-white rounded-full flex items-center justify-center text-sm font-bold">۳</span>
            <span className="text-sm text-[#4179F0] font-medium">مراجع</span>
          </div>
          <div className="w-12 h-0.5 bg-gray-300"></div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center text-sm font-bold">۴</span>
            <span className="text-sm text-gray-400">تایید</span>
          </div>
        </div>

        <h2 className="text-xl font-bold text-black mb-5">انتخاب مراجع</h2>

        {/* Doctor info + date/time */}
        <div className="border border-[#E7E7E7] rounded-[12px] p-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-[60px] h-[60px] rounded-[10px] overflow-hidden flex-shrink-0" style={{ background: 'radial-gradient(104.67% 151.25% at 49.83% 17.25%, #FFFFFF 0%, #C6C6C6 100%)' }}>
              <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-black">{doctor.name}</h3>
              <p className="text-gray-500 text-sm">{doctor.specialty}</p>
              <p className="text-gray-400 text-xs">{doctor.address}</p>
            </div>
            <div className="text-left text-xs text-gray-500 flex-shrink-0">
              <div>📅 {date}</div>
              <div>⏰ {time}</div>
            </div>
          </div>
        </div>

        {/* Referrer selection */}
        <div className="border border-[#E7E7E7] rounded-[12px] p-6">
          <h3 className="text-base font-medium text-black mb-1">مراجعه کننده</h3>
          <p className="text-sm text-[#888888] mb-5">برای چه کسی نوبت میگیرید؟</p>

          {/* Self */}
          <div
            onClick={() => setReferrerType('self')}
            className={`border rounded-[12px] p-4 mb-3 cursor-pointer transition ${referrerType === 'self' ? 'border-[#4179F0] bg-blue-50/30' : 'border-[#E7E7E7] hover:border-[#4179F0]'}`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${referrerType === 'self' ? 'border-[#4179F0]' : 'border-[#D3D5E4]'}`}>
                {referrerType === 'self' && <div className="w-2.5 h-2.5 rounded-full bg-[#4179F0]"></div>}
              </div>
              <div>
                <h4 className="font-bold text-sm text-black">{userName} (خودم)</h4>
                <p className="text-gray-400 text-xs">{userPhone}</p>
              </div>
            </div>
          </div>

          {/* Other person */}
          <div
            onClick={() => setReferrerType('other')}
            className={`border rounded-[12px] p-4 cursor-pointer transition ${referrerType === 'other' ? 'border-[#4179F0] bg-blue-50/30' : 'border-[#E7E7E7] hover:border-[#4179F0]'}`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${referrerType === 'other' ? 'border-[#4179F0]' : 'border-[#D3D5E4]'}`}>
                {referrerType === 'other' && <div className="w-2.5 h-2.5 rounded-full bg-[#4179F0]"></div>}
              </div>
              <div>
                <h4 className="font-bold text-sm text-black">دریافت نوبت برای شخص دیگر</h4>
                <p className="text-gray-400 text-xs">اطلاعات بیمار را وارد کنید</p>
              </div>
            </div>
          </div>

          {/* Other person form */}
          {referrerType === 'other' && (
            <div className="mt-5 pt-5 border-t border-[#E7E7E7]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#3D3D3D] mb-1">نام و نام خانوادگی</label>
                  <input type="text" value={formData.fullName} onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full border border-[#E7E7E7] rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4179F0]/30 focus:border-[#4179F0]" placeholder="نام بیمار" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#3D3D3D] mb-1">شماره تماس</label>
                  <input type="text" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full border border-[#E7E7E7] rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4179F0]/30 focus:border-[#4179F0]" placeholder="۰۹۱۲XXX" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#3D3D3D] mb-1">کد ملی</label>
                  <input type="text" value={formData.nationalCode} onChange={e => setFormData({ ...formData, nationalCode: e.target.value })}
                    className="w-full border border-[#E7E7E7] rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4179F0]/30 focus:border-[#4179F0]" placeholder="۱۲۳۴۵۶۷۸۹۰" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#3D3D3D] mb-1">تاریخ تولد</label>
                  <input type="text" value={formData.birthDate} onChange={e => setFormData({ ...formData, birthDate: e.target.value })}
                    className="w-full border border-[#E7E7E7] rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#4179F0]/30 focus:border-[#4179F0]" placeholder="۱۳۷۰/۰۱/۰۱" />
                </div>
              </div>
            </div>
          )}

          <button onClick={goToPayment} className="w-full bg-[#4179F0] text-white py-3.5 rounded-xl font-bold hover:bg-[#3568D6] transition text-base shadow-md mt-5">
            ادامه
          </button>
        </div>
      </section>

      <Footer />
      <BottomNav />
    </div>
  )
}

