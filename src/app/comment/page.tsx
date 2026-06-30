'use client'

import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import BottomNav from '@/app/components/BottomNav'
import { useRef, useState } from 'react'

const doctors: Record<string, { name: string; specialty: string; image: string; code: string }> = {
  1: { name: 'دکتر زهرا وارسته', specialty: 'متخصص قلب و عروق', image: '/images/dr1.jpg', code: '۴۰۲۲۳' },
  2: { name: 'دکتر علی وارسته', specialty: 'متخصص ارتوپدی', image: '/images/dr2.jpg', code: '۴۰۲۲۳' },
  3: { name: 'دکتر بهنوش حسینی', specialty: 'جراح گوش و حلق و بینی', image: '/images/dr3.png', code: '۴۰۲۲۳' },
  4: { name: 'دکتر علی راد', specialty: 'متخصص ریه', image: '/images/dr4.png', code: '۴۰۲۲۳' },
  5: { name: 'دکتر لعیا زنگنه', specialty: 'متخصص قلب و عروق', image: '/images/dr11.png', code: '۴۰۲۲۳' },
  6: { name: 'دکتر یاشار پناهی', specialty: 'متخصص روانشناسی بالینی', image: '/images/dr12.png', code: '۴۰۲۲۳' },
  7: { name: 'دکتر زهرا سعادتی', specialty: 'متخصص گوش و حلق و بینی', image: '/images/dr13.png', code: '۴۰۲۲۳' },
  8: { name: 'دکتر ماهان گروسی', specialty: 'متخصص دندانپزشکی', image: '/images/dr14.png', code: '۴۰۲۲۳' },
}

export default function CommentPage() {
  const [selectedRating, setSelectedRating] = useState(0)
  const [successVisible, setSuccessVisible] = useState(false)
  const [thumbSelected, setThumbSelected] = useState<'up' | 'down' | null>(null)
  const [agreeRules, setAgreeRules] = useState(false)

  const commentTextRef = useRef<HTMLTextAreaElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  const doctorId = typeof window !== 'undefined'
    ? new URLSearchParams(window.location.search).get('doctor') || '1'
    : '1'
  const doctor = doctors[doctorId] || doctors['1']

  function submitComment() {
    const comment = commentTextRef.current?.value.trim() || ''

    if (selectedRating === 0) { alert('لطفاً به نوبت خود امتیاز دهید.'); return }
    if (comment.length < 5) { alert('لطفاً نظر خود را با حداقل ۵ کاراکتر وارد کنید.'); commentTextRef.current?.focus(); return }
    if (!agreeRules) { alert('لطفاً با قوانین ثبت نظر موافقت کنید.'); return }

    const comments = JSON.parse(localStorage.getItem('doctorComments') || '{}')
    if (!comments[doctorId]) comments[doctorId] = []
    comments[doctorId].push({ rating: selectedRating, recommend: thumbSelected === 'up' ? 'پیشنهاد میکنم' : thumbSelected === 'down' ? 'پیشنهاد نمیکنم' : '', comment, date: new Date().toLocaleDateString('fa-IR') })
    localStorage.setItem('doctorComments', JSON.stringify(comments))
    setSuccessVisible(true)
  }

  return (
    <div className="bg-white min-h-screen" style={{ fontFamily: 'Vazirmatn, sans-serif' }}>
      <Header />

      <div className="max-w-[808px] mx-auto flex flex-col gap-[24px] px-4 py-8">
        <div className="flex items-center justify-end gap-[8px] w-full h-[24px]">
          <span className="text-[20px] font-bold text-[#3D3D3D] text-right leading-[24px]">ثبت نظر</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#3D3D3D" strokeWidth="1.5" fill="none"/>
            <path d="M10 8l4 4-4 4" stroke="#3D3D3D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <div className="border border-[#E7E7E7] rounded-[12px] flex flex-col items-end px-[24px] pb-[8px] gap-[16px]">
          <div className="flex justify-between items-start w-full border-b border-[#F0F0F0] h-[117px]">
            <div className="flex justify-between items-start p-[17px_8px] gap-[86px] flex-1 h-full">
              <div className="flex justify-center items-center gap-[8px] w-[179px] h-[25px] pt-2">
                <span className="text-[16px] font-normal text-black text-right">کد نظام پزشکی: {doctor.code}</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="#4179F0"/>
                </svg>
              </div>
              <div className="flex flex-col items-end gap-[8px] flex-1">
                <span className="text-[18px] font-medium text-black text-right leading-[28px]">{doctor.name}</span>
                <span className="text-[16px] font-medium text-[#262626] text-right leading-[25px]">{doctor.specialty}</span>
              </div>
            </div>
            <div className="w-[142px] h-[117px] rounded-[8px] flex-shrink-0" style={{ background: 'radial-gradient(104.67% 151.25% at 49.83% 17.25%, #FFFFFF 0%, #C6C6C6 100%)' }}>
              <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover rounded-[8px]" />
            </div>
          </div>

          <div className="flex items-center justify-between px-[8px] gap-[16px] w-full h-[32px]">
            <div className="flex items-center gap-[2px] px-[2px]">
              {[1,2,3,4,5].map(v => (
                <button key={v} onClick={() => setSelectedRating(v)} className="p-0">
                  <svg width="20.98" height="20" viewBox="0 0 21 20" fill="none">
                    <path d="M10.5 0L12.86 6.9L20.29 7.41L14.47 12.12L16.35 19.32L10.5 15.34L4.65 19.32L6.53 12.12L0.71 7.41L8.14 6.9L10.5 0Z" fill={v <= selectedRating ? '#FFB800' : '#D1D1D1'}/>
                  </svg>
                </button>
              ))}
            </div>
            <span className="text-[13px] font-normal text-black text-right">امتیاز شما به نوبت گرفته شده:</span>
          </div>

          <div className="flex items-start gap-[20px] w-full h-[40px]">
            <button onClick={() => setThumbSelected('down')} 
              className={`flex items-center justify-center gap-[6px] px-[10px] py-[10px] w-[370px] h-[40px] min-w-[120px] rounded-[8px] transition ${thumbSelected === 'down' ? 'bg-[#4179F0] text-white border-none' : 'border border-[#E7E7E7] text-[#888888]'}`}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="2.5" y="8" width="3" height="10" rx="1" fill="currentColor"/>
                <path d="M5.5 8l4-5.5C10 2 10.5 2 10.5 2.5V7h6c.5 0 .9.4.8.9l-1.5 8c-.1.6-.6 1.1-1.2 1.1H5.5V8z" fill="currentColor"/>
              </svg>
              <span className="text-[14px] font-medium text-right leading-[22px]">پیشنهاد نمی‌کنم</span>
            </button>
            <button onClick={() => setThumbSelected('up')}
              className={`flex items-center justify-center gap-[6px] px-[10px] py-[10px] w-[370px] h-[40px] min-w-[120px] rounded-[8px] transition ${thumbSelected === 'up' ? 'bg-[#4179F0] text-white border-none' : 'border border-[#E7E7E7] text-[#888888]'}`}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="2.5" y="5" width="3" height="10" rx="1" fill="currentColor"/>
                <path d="M5.5 5L9.5 0C10 0 10.5 0 10.5.5V6h6c.5 0 .9.4.8.9l-1.5 8c-.1.6-.6 1.1-1.2 1.1H5.5V5z" fill="currentColor"/>
              </svg>
              <span className="text-[14px] font-medium text-right leading-[22px]">پیشنهاد میکنم</span>
            </button>
          </div>

          <div className="flex flex-col items-end gap-[4px] w-full">
            <div className="flex flex-col items-end gap-[8px] w-full">
              <span className="text-[14px] font-medium text-[#4F4F4F] text-right leading-[21px]">توضیحات (اختیاری)</span>
              <textarea ref={commentTextRef}
                className="w-full h-[144px] min-h-[144px] border border-[#E7E7E7] rounded-[8px] p-[16px] text-right text-[14px] font-normal text-[#B0B0B0] bg-white resize-none focus:outline-none focus:ring-2 focus:ring-[#4179F0]/30 focus:border-[#4179F0]"
                placeholder="نظر خود را بنویسید..."
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-[24px] w-full h-[40px]">
          <button
            onClick={submitComment}
            className="flex items-center justify-center gap-[6px] px-[10px] py-[10px] w-[390px] h-[40px] min-w-[120px] bg-[#4179F0] rounded-[8px] text-[14px] font-medium text-white"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12 5l-6 6 6 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>ثبت نظر</span>
          </button>
          <div className="flex items-center justify-end gap-[8px] w-[394px]">
            <span className="text-[13px] font-normal text-[#3D3D3D] text-right underline">متن نمونه است</span>
            <button onClick={() => setAgreeRules(!agreeRules)}
              className={`w-[16px] h-[16px] rounded-[4px] flex items-center justify-center transition ${agreeRules ? 'bg-[#4179F0]' : 'border border-[#D1D1D1] bg-white'}`}>
              {agreeRules && (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 6l2.5 2.5 5-5" stroke="#F0F5FE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {successVisible && (
        <div ref={overlayRef} className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
          onClick={(e) => { if (e.target === overlayRef.current) setSuccessVisible(false) }}>
          <div className="bg-white rounded-[8px] w-[472px] border border-[#E7E7E7] flex flex-col items-center justify-center p-[24px] gap-[16px]">
            <div className="relative w-[73px] h-[73px]">
              <div className="absolute inset-0 bg-[#0B9D4E] opacity-[0.08] rounded-[16px]" />
              <div className="absolute inset-[24.12%] bg-[#0B9D4E] rounded-[999px] flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M8 13.2L3.6 8.8L2 10.4L8 16.4L22 2.4L20.4 0.8L8 13.2Z" fill="white"/>
                </svg>
              </div>
            </div>
            <div className="flex flex-col items-center gap-[16px] w-full">
              <div className="flex flex-col items-center gap-[9px] w-full">
                <div className="flex flex-col items-center gap-[8px] w-full">
                  <span className="text-[16px] font-bold text-black text-right">نظر شما ثبت شد</span>
                  <span className="text-[16px] font-normal text-[#525252] text-center">نظر شما پس از تایید در سایت نمایش داده می‌شود</span>
                </div>
              </div>
              <button onClick={() => window.location.href = '/'}
                className="flex items-center justify-center gap-[6px] px-[10px] py-[10px] w-full h-[40px] bg-[#4179F0] rounded-[8px] text-[14px] font-medium text-white">
                بازگشت به خانه
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
      <BottomNav />
    </div>
  )
}

