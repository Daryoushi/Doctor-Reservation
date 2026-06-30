'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import BottomNav from '@/app/components/BottomNav'

const doctorsMap: Record<string, { name: string; specialty: string; image: string; address: string; about: string; contact: { instagram: string; phone: string; website: string } }> = {
  '1': { name: 'دکتر زهرا وارسته', specialty: 'متخصص قلب و عروق', image: '/images/dr1.jpg', address: 'تهران،ولیعصر، خیابان هفتم، پلاک ۴۰', about: 'دکتر زهرا وارسته متخصص قلب و عروق با بیش از ۱۵ سال سابقه درخشان در درمان بیماری‌های قلبی و عروقی. ایشان فارغ‌التحصیل دانشگاه علوم پزشکی تهران بوده و دوره‌های تخصصی خود را در بهترین مراکز درمانی کشور گذرانده‌اند.', contact: { instagram: 'dr_varasteh', phone: '۰۲۱-۱۲۳۴۵۶۷۸', website: 'drvarasteh.com' } },
  '2': { name: 'دکتر علی وارسته', specialty: 'متخصص ارتوپدی', image: '/images/dr2.jpg', address: 'تهران، خیابان فرشته، پلاک ۱۲', about: 'دکتر علی وارسته متخصص ارتوپدی و جراح استخوان و مفاصل با بیش از ۱۲ سال تجربه.', contact: { instagram: 'dr_ali_varasteh', phone: '۰۲۱-۲۳۴۵۶۷۸۹', website: 'dr-ali.com' } },
  '3': { name: 'دکتر بهنوش حسینی', specialty: 'جراح گوش و حلق و بینی', image: '/images/dr3.png', address: 'تهران،جردن،پلاک 9', about: 'دکتر بهنوش حسینی جراح متخصص گوش، حلق و بینی با سابقه درخشان.', contact: { instagram: 'dr_hoseini', phone: '۰۲۱-۳۴۵۶۷۸۹۰', website: 'drhoseini.com' } },
  '4': { name: 'دکتر علی راد', specialty: 'متخصص ریه', image: '/images/dr4.png', address: 'تهران،شریعتی،پلاک 17', about: 'دکتر علی راد متخصص بیماری‌های ریوی با تجربه بالا.', contact: { instagram: 'dr_rad', phone: '۰۲۱-۴۵۶۷۸۹۰۱', website: 'drrad.com' } },
  '5': { name: 'دکتر لعیا زنگنه', specialty: 'متخصص قلب و عروق', image: '/images/dr11.png', address: 'تهران ، ونک ،کوچه 12، پلاک25', about: 'دکتر لعیا زنگنه متخصص قلب و عروق.', contact: { instagram: 'dr_zangeneh', phone: '۰۲۱-۵۶۷۸۹۰۱۲', website: 'drzangeneh.com' } },
  '6': { name: 'دکتر یاشار پناهی', specialty: 'متخصص روانشناسی بالینی', image: '/images/dr12.png', address: 'تهران ، زعفرانیه،پلاک 19', about: 'دکتر یاشار پناهی روانشناس بالینی.', contact: { instagram: 'dr_panahi', phone: '۰۲۱-۶۷۸۹۰۱۲۳', website: 'drpanahi.com' } },
  '7': { name: 'دکتر زهرا سعادتی', specialty: 'متخصص گوش و حلق و بینی', image: '/images/dr13.png', address: 'تهران ،ولنجک،کوچه 17، پلاک 20', about: 'دکتر زهرا سعادتی متخصص گوش و حلق و بینی.', contact: { instagram: 'dr_saadati', phone: '۰۲۱-۷۸۹۰۱۲۳۴', website: 'drsaadati.com' } },
  '8': { name: 'دکتر ماهان گروسی', specialty: 'متخصص دندانپزشکی', image: '/images/dr14.png', address: 'تهران، میرداماد،پلاک 17', about: 'دکتر ماهان گروسی متخصص دندانپزشکی.', contact: { instagram: 'dr_garousi', phone: '۰۲۱-۸۹۰۱۲۳۴۵', website: 'drgarousi.com' } },
}

const monthNames = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند']
const dayNames = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج']

const times = [
  { label: '۰۹:۰۰', disabled: true },
  { label: '۰۹:۳۰', disabled: false },
  { label: '۱۰:۰۰', disabled: false },
  { label: '۱۰:۳۰', disabled: false },
  { label: '۱۱:۰۰', disabled: false },
  { label: '۱۱:۳۰', disabled: false },
  { label: '۱۲:۰۰', disabled: true },
  { label: '۱۲:۳۰', disabled: true },
  { label: '۱۳:۰۰', disabled: false },
  { label: '۱۳:۳۰', disabled: false },
  { label: '۱۴:۰۰', disabled: false },
  { label: '۱۴:۳۰', disabled: true },
  { label: '۱۵:۰۰', disabled: false },
  { label: '۱۵:۳۰', disabled: false },
  { label: '۱۶:۰۰', disabled: false },
  { label: '۱۶:۳۰', disabled: false },
  { label: '۱۷:۰۰', disabled: false },
  { label: '۱۷:۳۰', disabled: true },
]

const comments = [
  { name: 'سارا محمدی', date: '۲۵ دی ۱۴۰۴', rating: 4, text: 'بسیار پزشک متعهد و خوش برخوردی هستند. من از نتیجه ویزیت کاملاً راضی بودم.', avatar: '' },
  { name: 'احمد رضایی', date: '۲۰ دی ۱۴۰۴', rating: 5, text: 'دکتر بسیار عالی و با تجربه. تشخیص دقیق و درمان مناسب.', avatar: '' },
  { name: 'مریم احمدی', date: '۱۸ دی ۱۴۰۴', rating: 4, text: 'با حوصله به سوالات پاسخ می‌دهند و وقت کافی برای بیمار می‌گذارند.', avatar: '' },
]

export default function DoctorDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()

  const [doctorInfo, setDoctorInfo] = useState<(typeof doctorsMap)[string] | null>(null)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<number | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  const persianDate = new Intl.DateTimeFormat('fa-IR', { year: 'numeric', month: 'long' }).format(currentDate)

  useEffect(() => {
    const doc = doctorsMap[id] || doctorsMap['1']
    setDoctorInfo(doc)
  }, [id])

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const prevMonth = () => {
    const d = new Date(currentDate)
    d.setMonth(d.getMonth() - 1)
    setCurrentDate(d)
  }

  const nextMonth = () => {
    const d = new Date(currentDate)
    d.setMonth(d.getMonth() + 1)
    setCurrentDate(d)
  }

  const goToReferrer = () => {
    if (!selectedDate) { alert('لطفاً تاریخ را انتخاب کنید.'); return }
    if (!selectedTime) { alert('لطفاً ساعت را انتخاب کنید.'); return }
    const dateStr = `${selectedDate} ${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`
    router.push(`/referrer?doctor=${id}&date=${encodeURIComponent(dateStr)}&time=${selectedTime}`)
  }

  const weekDayOffset = (firstDay + 1) % 7

  return (
    <div className="bg-white" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>
      <Header />

      {/* Breadcrumb */}
      <section className="max-w-[1216px] mx-auto px-4 md:px-6 mt-4 md:mt-6 mb-3 md:mb-4">
        <div className="flex items-center gap-1 md:gap-2 text-xs md:text-sm text-[#888888]">
          <Link href="/" className="hover:text-[#4179F0]">صفحه اصلی</Link>
          <span>/</span>
          <Link href="/doctors" className="hover:text-[#4179F0]">لیست پزشکان</Link>
          <span>/</span>
          <span className="text-[#4179F0]">صفحه پزشک</span>
        </div>
      </section>

      {/* Main content */}
      <section className="max-w-[1216px] mx-auto px-4 md:px-6 mb-8 md:mb-16">
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
          {/* Calendar & Appointment - left side in RTL */}
          <div className="w-full lg:w-[392px] flex-shrink-0 order-1 lg:order-2">
            <div className="border border-[#E7E7E7] rounded-[12px] p-4 md:p-5">
              {/* Calendar */}
              <div className="mb-4 md:mb-6">
                {/* Month nav */}
                <div className="flex items-center justify-between mb-3 md:mb-4">
                  <button onClick={prevMonth} className="text-[#4179F0] p-1">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M12 6l-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <span className="font-bold text-xs md:text-sm text-[#262626]">{persianDate}</span>
                  <button onClick={nextMonth} className="text-[#4179F0] p-1">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M8 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>

                {/* Day headers */}
                <div className="flex mb-2">
                  {dayNames.map(d => (
                    <div key={d} className="flex-1 text-center text-[11px] md:text-xs text-[#3D3D3D] font-medium py-1.5 md:py-2 bg-[#F7F7F7] first:rounded-r-[25px] last:rounded-l-[25px]">{d}</div>
                  ))}
                </div>

                {/* Days grid */}
                <div className="bg-[#F7F7F7] rounded-[16px] p-1.5 md:p-2">
                  <div className="grid grid-cols-7 gap-0.5 md:gap-1 text-center">
                    {Array.from({ length: weekDayOffset }).map((_, i) => <div key={`empty-${i}`} />)}
                    {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
                      const today = new Date()
                      const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear()
                      const isSelected = day === selectedDate
                      return (
                        <button key={day} onClick={() => setSelectedDate(day)}
                          className={`text-xs md:text-sm py-1 md:py-1.5 rounded-[99px] transition ${isSelected ? 'bg-[#4179F0] text-white font-medium' : isToday ? 'text-[#4179F0] font-medium' : 'text-[#3D3D3D] hover:bg-[#4179F0]/10'}`}>
                          {day}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Time slots */}
              <div className="mb-4 md:mb-6">
                <label className="block text-xs md:text-sm font-medium text-[#3D3D3D] mb-2 md:mb-3">ساعت مورد نظر</label>
                <div className="grid grid-cols-3 gap-1.5 md:gap-2">
                  {times.map(t => {
                    const isSelectedTime = selectedTime === t.label
                    let btnStyle: React.CSSProperties = {}
                    if (t.disabled) {
                      btnStyle = { background: '#E7E7E7', color: '#888888', cursor: 'not-allowed' }
                    } else if (isSelectedTime) {
                      btnStyle = { background: '#4179F0', color: '#FFFFFF', border: '1px solid #4179F0', fontWeight: 600 }
                    } else {
                      btnStyle = { border: '1px solid #4179F0', color: '#4179F0' }
                    }
                    return (
                      <button key={t.label} disabled={t.disabled} onClick={() => !t.disabled && setSelectedTime(t.label)}
                        style={{ width: '100%', height: '34px', borderRadius: '8px', fontSize: '12px', fontFamily: "'Vazirmatn', sans-serif", transition: 'all 0.15s', ...btnStyle }}>
                        {t.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Continue */}
              <button onClick={goToReferrer} className="w-full bg-[#4179F0] text-white py-2.5 md:py-3 rounded-xl font-bold hover:bg-blue-700 transition text-sm md:text-base shadow-md">ادامه</button>
            </div>
          </div>

          {/* Doctor info - right side in RTL */}
          <div className="flex-1 min-w-0 order-2 lg:order-1">
            {doctorInfo && (
              <>
                {/* Doctor info card */}
                <div className="border border-[#E7E7E7] rounded-[12px] p-5 mb-5">
                  <div className="flex items-start gap-5">
                    <div className="w-[100px] h-[100px] rounded-[10px] overflow-hidden flex-shrink-0" style={{ background: 'radial-gradient(104.67% 151.25% at 49.83% 17.25%, #FFFFFF 0%, #C6C6C6 100%)' }}>
                      <img src={doctorInfo.image} alt={doctorInfo.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h1 className="text-lg font-medium text-black mb-1">{doctorInfo.name}</h1>
                      <p className="text-sm font-medium text-[#262626] mb-2">{doctorInfo.specialty}</p>
                      <div className="flex items-center gap-3 text-xs text-[#888888] mb-3">
                        <div className="flex items-center gap-1">
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M7 0C4.24 0 2 2.24 2 5c0 3.75 5 9 5 9s5-5.25 5-9c0-2.76-2.24-5-5-5z" fill="#888888"/>
                            <circle cx="7" cy="5" r="2" fill="white"/>
                          </svg>
                          <span>{doctorInfo.address}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          {[1,2,3,4,5].map(i => (
                            <svg key={i} width="14" height="14" viewBox="0 0 12 13" fill="none">
                              <path d="M6 0.5l1.545 3.5L11.5 4.5 8.5 7.5l.5 4.5L6 10 3 12l.5-4.5L.5 4.5l3.955-.5L6 .5z" fill={i <= 4 ? '#FFB800' : '#D3D5E4'} />
                            </svg>
                          ))}
                          <span className="text-sm text-[#FFB800] mr-1">۴.۹</span>
                          <span className="text-xs text-[#888888] mr-1">(۱۲۴ نظر)</span>
                        </div>
                        <span className="text-xs text-[#888888]">اولین نوبت در دسترس: فردا</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* About doctor */}
                <div className="border border-[#E7E7E7] rounded-[12px] p-5 mb-5">
                  <h3 className="text-base font-medium text-black mb-3">درباره دکتر</h3>
                  <div className="relative">
                    <p className="text-sm text-[#5D5D5D] leading-7">{doctorInfo.about}</p>
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent"></div>
                  </div>
                </div>

                {/* Contact info */}
                <div className="border border-[#E7E7E7] rounded-[12px] p-5 mb-5">
                  <h3 className="text-base font-medium text-black mb-4">راه های ارتباطی</h3>
                  <div className="flex flex-wrap gap-4">
                    <a href="#" className="flex items-center gap-2 text-sm text-[#5D5D5D] hover:text-[#4179F0] transition">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z"/>
                      </svg>
                      {doctorInfo.contact.instagram}
                    </a>
                    <a href={`tel:${doctorInfo.contact.phone}`} className="flex items-center gap-2 text-sm text-[#5D5D5D] hover:text-[#4179F0] transition">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                      </svg>
                      {doctorInfo.contact.phone}
                    </a>
                    <a href={`https://${doctorInfo.contact.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[#5D5D5D] hover:text-[#4179F0] transition">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
                      </svg>
                      {doctorInfo.contact.website}
                    </a>
                  </div>
                </div>

                {/* Comments */}
                <div className="border border-[#E7E7E7] rounded-[12px] p-5">
                  <h3 className="text-base font-medium text-black mb-4">نظرات</h3>
                  <div className="space-y-5">
                    {comments.map((c, i) => (
                      <div key={i} className={i > 0 ? 'pt-5 border-t border-[#F0F0F0]' : ''}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-[28px] h-[28px] rounded-full bg-[#F0F5FE] flex items-center justify-center text-xs text-[#4179F0] font-medium border border-[#F0F5FE]">
                              {c.name.charAt(0)}
                            </div>
                            <span className="text-sm font-medium text-black">{c.name}</span>
                          </div>
                          <span className="text-xs text-[#888888]">{c.date}</span>
                        </div>
                        <div className="flex mb-2">
                          {[1,2,3,4,5].map(s => (
                            <svg key={s} width="12" height="12" viewBox="0 0 12 13" fill="none">
                              <path d="M6 0.5l1.545 3.5L11.5 4.5 8.5 7.5l.5 4.5L6 10 3 12l.5-4.5L.5 4.5l3.955-.5L6 .5z" fill={s <= c.rating ? '#FFB800' : '#D3D5E4'} />
                            </svg>
                          ))}
                        </div>
                        <p className="text-sm text-[#5D5D5D] leading-6">{c.text}</p>
                      </div>
                    ))}
                  </div>
                  <button className="mt-4 w-full text-sm text-[#4179F0] border border-[#4179F0] rounded-lg py-2.5 hover:bg-blue-50 transition font-medium">
                    مشاهده دکتر
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <Footer />
      <BottomNav />
    </div>
  )
}
