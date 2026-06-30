'use client'

import { useEffect, useState } from 'react'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import BottomNav from '@/app/components/BottomNav'
import Link from 'next/link'

const doctors: Record<string, { name: string; specialty: string; image: string; address: string; price: number }> = {
  '1': { name: 'دکتر زهرا وارسته', specialty: 'متخصص قلب و عروق', image: '/images/dr1.jpg', address: 'تهران، ولیعصر، خیابان هفتم، پلاک ۴۰', price: 200000 },
  '2': { name: 'دکتر علی وارسته', specialty: 'متخصص ارتوپدی', image: '/images/dr2.jpg', address: 'تهران، خیابان فرشته، پلاک ۱۲', price: 180000 },
  '3': { name: 'دکتر بهنوش حسینی', specialty: 'جراح گوش و حلق و بینی', image: '/images/dr3.png', address: 'تهران، جردن، پلاک ۹', price: 160000 },
  '4': { name: 'دکتر علی راد', specialty: 'متخصص ریه', image: '/images/dr4.png', address: 'تهران، شریعتی، پلاک ۱۷', price: 170000 },
  '5': { name: 'دکتر لعیا زنگنه', specialty: 'متخصص قلب و عروق', image: '/images/dr11.png', address: 'تهران، ونک، کوچه ۱۲، پلاک ۲۵', price: 190000 },
  '6': { name: 'دکتر یاشار پناهی', specialty: 'متخصص روانشناسی بالینی', image: '/images/dr12.png', address: 'تهران، زعفرانیه، پلاک ۱۹', price: 150000 },
  '7': { name: 'دکتر زهرا سعادتی', specialty: 'متخصص گوش و حلق و بینی', image: '/images/dr13.png', address: 'تهران، ولنجک، کوچه ۱۷، پلاک ۲۰', price: 165000 },
  '8': { name: 'دکتر ماهان گروسی', specialty: 'متخصص دندانپزشکی', image: '/images/dr14.png', address: 'تهران، میرداماد، پلاک ۱۷', price: 210000 },
}

export default function PaymentPage() {
  const [selectedBank, setSelectedBank] = useState('saman')
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [loading, setLoading] = useState(false)

  const isBrowser = typeof window !== 'undefined'
  const params = isBrowser ? new URLSearchParams(window.location.search) : new URLSearchParams()
  const doctorId = params.get('doctor') || '1'
  const doctor = doctors[doctorId] || doctors['1']
  const date = params.get('date') || '۲۴ دی ۱۴۰۴'
  const time = params.get('time') || '۱۱:۰۰'
  const referrer = params.get('referrer') === 'other' ? 'شخص دیگر' : 'خودم'
  const userName = isBrowser ? localStorage.getItem('userName') || 'کاربر' : 'کاربر'
  const userPhone = isBrowser ? localStorage.getItem('userPhone') || '۰۹۱۲۳۴۵۶۷۸۹' : '۰۹۱۲۳۴۵۶۷۸۹'
  const finalPrice = (doctor.price + 20000).toLocaleString()

  const handlePay = () => {
    if (!agreeTerms) { alert('لطفاً قوانین و مقررات را بپذیرید.'); return }
    if (confirm(`آیا از پرداخت مبلغ ${finalPrice} تومان مطمئن هستید؟`)) {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        const appointments = JSON.parse(localStorage.getItem('appointments') || '[]')
        appointments.push({
          doctorId: parseInt(doctorId), date, time,
          trackingCode: Math.floor(10000000 + Math.random() * 90000000).toString(),
          createdAt: new Date().toISOString(),
        })
        localStorage.setItem('appointments', JSON.stringify(appointments))
        window.location.href = '/success?doctor=' + doctorId + '&date=' + encodeURIComponent(date) + '&time=' + time + '&referrer=' + (referrer === 'شخص دیگر' ? 'other' : 'self')
      }, 2000)
    }
  }

  return (
    <div className="bg-white" style={{ fontFamily: 'Vazirmatn, sans-serif' }}>
      <Header />

      <section className="max-w-[1216px] mx-auto px-6 py-8">
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
          <div className="w-12 h-0.5 bg-[#4179F0]"></div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 bg-[#4179F0] text-white rounded-full flex items-center justify-center text-sm font-bold">۴</span>
            <span className="text-sm text-[#4179F0] font-medium">پرداخت</span>
          </div>
        </div>

        <h2 className="text-xl font-bold text-black mb-5">پرداخت و ثبت رزرو</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: payment details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Price breakdown */}
            <div className="border border-[#E7E7E7] rounded-[12px] p-6">
              <h3 className="text-base font-medium text-black mb-4">اطلاعات خرید</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-3 border-b border-[#F0F0F0]">
                  <span className="text-sm text-[#888888]">مبلغ ویزیت</span>
                  <span className="text-sm font-medium text-black">{doctor.price.toLocaleString()} تومان</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-[#F0F0F0]">
                  <span className="text-sm text-[#888888]">هزینه کارمزد</span>
                  <span className="text-sm font-medium text-black">۲۰,۰۰۰ تومان</span>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span className="text-base font-bold text-black">مبلغ نهایی</span>
                  <span className="text-lg font-bold text-[#4179F0]">{finalPrice} تومان</span>
                </div>
              </div>
            </div>

            {/* Bank selection (Figma: سامان / پارسیان) */}
            <div className="border border-[#E7E7E7] rounded-[12px] p-6">
              <h3 className="text-base font-medium text-black mb-4">درگاه پرداخت آنلاین</h3>
              <div className="flex gap-4">
                {[
                  { id: 'saman', label: 'بانک سامان', icon: '🏦' },
                  { id: 'parsian', label: 'بانک پارسیان', icon: '🏦' },
                ].map(bank => (
                  <button key={bank.id} onClick={() => setSelectedBank(bank.id)}
                    className={`flex-1 border rounded-[12px] p-4 text-center transition ${selectedBank === bank.id ? 'border-[#4179F0] bg-blue-50/30' : 'border-[#E7E7E7] hover:border-[#4179F0]'}`}>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedBank === bank.id ? 'border-[#4179F0]' : 'border-[#D3D5E4]'}`}>
                        {selectedBank === bank.id && <div className="w-2.5 h-2.5 rounded-full bg-[#4179F0]"></div>}
                      </div>
                      <span className="text-base">{bank.icon}</span>
                    </div>
                    <span className={`text-sm font-medium ${selectedBank === bank.id ? 'text-[#4179F0]' : 'text-[#5D5D5D]'}`}>{bank.label}</span>
                  </button>
                ))}
              </div>

              {/* Terms checkbox */}
              <div className="mt-4 flex items-start gap-2">
                <button onClick={() => setAgreeTerms(!agreeTerms)}
                  className={`w-5 h-5 border-2 rounded mt-0.5 flex items-center justify-center flex-shrink-0 transition ${agreeTerms ? 'bg-[#4179F0] border-[#4179F0]' : 'border-[#D3D5E4]'}`}>
                  {agreeTerms && <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </button>
                <span className="text-xs text-[#888888] leading-5">پرداخت به منزله پذیرش <a href="#" className="text-[#4179F0] hover:underline">شرایط و قوانین</a> است.</span>
              </div>

              {/* Caution badge */}
              <div className="mt-4 bg-orange-50 border border-orange-200 rounded-lg p-3 flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="7" stroke="#F97316" strokeWidth="1.5"/>
                  <path d="M8 5v3" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round"/>
                  <circle cx="8" cy="11" r="0.75" fill="#F97316"/>
                </svg>
                <span className="text-xs text-[#5D5D5D]">پس از پرداخت، نوبت شما ثبت و در پنل کاربری قابل مشاهده خواهد بود.</span>
              </div>
            </div>
          </div>

          {/* Right: doctor info + pay button */}
          <div className="space-y-6">
            <div className="border border-[#E7E7E7] rounded-[12px] p-5 lg:sticky lg:top-24">
              <div className="flex items-center gap-4 mb-4 pb-4 border-b border-[#F0F0F0]">
                <div className="w-[60px] h-[60px] rounded-[10px] overflow-hidden flex-shrink-0" style={{ background: 'radial-gradient(104.67% 151.25% at 49.83% 17.25%, #FFFFFF 0%, #C6C6C6 100%)' }}>
                  <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-black">{doctor.name}</h4>
                  <p className="text-gray-500 text-xs">{doctor.specialty}</p>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#888888]">آدرس مطب</span>
                  <span className="text-black text-left max-w-[180px]">{doctor.address}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#888888]">نوع نوبت</span>
                  <span className="text-green-600 font-medium">حضوری</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#888888]">زمان نوبت</span>
                  <span className="text-black">{date} - {time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#888888]">مراجعه کننده</span>
                  <span className="text-black">{referrer === 'شخص دیگر' ? 'شخص دیگر' : `${userName} (${userPhone})`}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-[#F0F0F0] space-y-2">
                {['امکان لغو نوبت', 'امکان بازگشت وجه', 'امکان ویرایش نوبت'].map(label => (
                  <div key={label} className="flex items-center gap-2 text-xs text-[#888888]">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <circle cx="7" cy="7" r="6" stroke="#22C55E" strokeWidth="1.5"/>
                      <path d="M4 7l2 2 3.5-4" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {label}
                  </div>
                ))}
              </div>

              <button onClick={handlePay} className="w-full mt-5 bg-[#4179F0] text-white py-3 rounded-xl font-bold hover:bg-[#3568D6] transition text-base shadow-md">
                پرداخت و ثبت نهایی
              </button>
            </div>
          </div>
        </div>
      </section>

      {loading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 text-center max-w-sm">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#4179F0] border-t-transparent mx-auto mb-4"></div>
            <h3 className="font-bold text-lg">در حال اتصال به درگاه پرداخت...</h3>
            <p className="text-gray-500 text-sm mt-2">لطفاً صبر کنید</p>
          </div>
        </div>
      )}

      <Footer />
      <BottomNav />
    </div>
  )
}

