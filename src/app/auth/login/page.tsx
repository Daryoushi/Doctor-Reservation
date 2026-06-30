'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function LoginPage() {
  const [loading, setLoading] = useState(false)

  async function sendCode(e: React.FormEvent) {
    e.preventDefault()
    const phoneInput = document.getElementById('phoneInput') as HTMLInputElement
    const raw = phoneInput?.value.trim().replace(/[^0-9]/g, '') || ''
    let phone = raw
    if (phone.length === 10 && !phone.startsWith('09')) phone = '09' + phone
    if (!/^09\d{9}$/.test(phone)) {
      alert('لطفاً شماره موبایل ۱۱ رقمی معتبر (مثال: ۰۹۱۲۳۴۵۶۷۸۹) وارد کنید.')
      return
    }

    setLoading(true)
    localStorage.setItem('userPhone', phone)

    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile: phone }),
      })
      const data = await res.json()
      if (data.success) {
        const params = new URLSearchParams({ mobile: phone })
        if (data.debugCode) params.set('code', data.debugCode)
        window.location.href = '/auth/verify?' + params.toString()
      } else {
        alert(data.error || 'خطا در ارسال کد')
      }
    } catch {
      window.location.href = '/auth/verify?mobile=' + phone
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative w-full min-h-screen bg-white overflow-hidden flex flex-col items-center justify-center" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>
      {/* Back button - mobile */}
      <a href="/" className="absolute top-4 right-4 z-10 lg:hidden flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition" style={{ textDecoration: 'none' }}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ transform: 'rotate(180deg)' }}>
          <path d="M12 4l-6 6 6 6" stroke="#262626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>

      {/* Decorative images - desktop only */}
      <div className="hidden lg:block absolute w-[700px] h-[493px] left-[235px] top-[-94px] opacity-[0.08] rotate-[-149.12deg] pointer-events-none">
        <Image
          src="/images/login/unsplash_IJ0KiXl4uys.svg"
          alt=""
          width={700}
          height={493}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="hidden lg:block absolute left-[152px] top-[220px] w-[145px] h-[522px] opacity-80"
        style={{ filter: 'drop-shadow(4px 4px 12.2px rgba(65, 121, 240, 0.3))' }}
      >
        <Image
          src="/images/login/Frame 1361017039.svg"
          alt=""
          width={145}
          height={522}
          className="w-full h-full rounded-[12px] object-cover"
        />
      </div>

      <div className="hidden lg:block absolute left-[335px] top-[161px] w-[144px] h-[521px] opacity-80"
        style={{ filter: 'drop-shadow(4px 4px 12.2px rgba(65, 121, 240, 0.3))' }}
      >
        <Image
          src="/images/login/Frame 1361017038.svg"
          alt=""
          width={144}
          height={521}
          className="w-full h-full rounded-[12px] object-cover"
        />
      </div>

      <div className="hidden lg:block absolute left-[517px] top-[264px] w-[145px] h-[521px] opacity-80"
        style={{ filter: 'drop-shadow(4px 4px 12.2px rgba(65, 121, 240, 0.3))' }}
      >
        <Image
          src="/images/login/Frame 1361017037.svg"
          alt=""
          width={145}
          height={521}
          className="w-full h-full rounded-[12px] object-cover"
        />
      </div>

      <div
        className="w-full lg:w-[730px] lg:absolute lg:right-0 lg:top-0 lg:h-full flex flex-col justify-center items-center"
        style={{
          padding: '40px 24px',
          gap: '32px',
          filter: 'drop-shadow(0px 6px 32px rgba(0, 0, 0, 0.05))',
          borderRadius: '8px 0 0 8px',
        }}
      >
        <div className="w-full max-w-[410px] flex flex-col items-center gap-6">
          <div className="w-[62px] h-[56.69px] relative">
            <Image src="/images/Logo.svg" alt="دکتر رزرو" width={62} height={56.69} className="w-full h-full" />
          </div>
          <h2 className="text-[18px] md:text-[20px] font-medium text-[#262626] text-center leading-[120%]">به دکتر رزرو خوش آمدید</h2>
          <p className="text-[14px] md:text-[16px] font-medium text-[#5D5D5D] text-center leading-[25px]">برای ادامه شماره موبایل خود را وارد نمایید.</p>
        </div>

        <form onSubmit={sendCode} className="w-full max-w-[410px]">
          <div className="flex flex-col items-start gap-2 mb-6">
            <label className="text-[14px] md:text-[16px] font-medium text-[#4F4F4F]">شماره موبایل</label>
            <div className="relative w-full">
              <input
                type="tel"
                id="phoneInput"
                className="w-full h-[48px] px-4 border border-[#D1D1D1] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#4179F0]/30 focus:border-[#4179F0] transition text-[16px] font-medium text-left text-[#262626] bg-white placeholder:text-left"
                placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                maxLength={11}
                defaultValue=""
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full md:w-[176px] h-[49px] bg-[#4179F0] text-white rounded-[8px] font-medium text-[16px] hover:bg-[#3568D6] transition shadow-md mx-auto block disabled:opacity-60"
          >
            {loading ? 'در حال ارسال...' : 'ورود'}
          </button>
        </form>
      </div>
    </div>
  )
}
