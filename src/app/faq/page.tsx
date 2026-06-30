'use client'

import { useState } from 'react'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import BottomNav from '@/app/components/BottomNav'

const faqItems = [
  { q: 'چگونه می‌توانم نوبت رزرو کنم؟', a: 'پس از پیدا کردن پزشک مورد نظر، بر روی دکمه "رزرو نوبت" کلیک کنید. سپس، تاریخ و ساعت مورد نظر خود را از تقویم پزشک انتخاب کنید و اطلاعات خود را وارد کنید. پس از تایید، نوبت شما ثبت خواهد شد و پیامک تایید برای شما ارسال می‌شود.' },
  { q: 'چگونه می‌توانم پزشک مورد نظرم را پیدا کنم؟', a: 'برای پیدا کردن پزشک مورد نظر خود می‌توانید از بخش جستجو در بالای صفحه استفاده کنید. نام پزشک، تخصص یا نام بیمارستان را وارد کنید تا نتایج مرتبط به شما نمایش داده شود. همچنین می‌توانید از فیلترهای تخصص، شهر و بیمه برای دقیق‌تر کردن جستجو استفاده کنید.' },
  { q: 'چگونه می‌توانم نوبت خود را لغو یا جابجا کنم؟', a: 'برای لغو یا جابجایی نوبت خود، وارد پنل کاربری شوید و از بخش "نوبت‌های من" گزینه مورد نظر را انتخاب کنید. امکان لغو نوبت تا ۲۴ ساعت قبل از زمان ویزیت وجود دارد.' },
  { q: 'آیا می‌توانم برای شخص دیگری نوبت رزرو کنم؟', a: 'بله، شما می‌توانید برای اعضای خانواده یا دوستان خود نوبت رزرو کنید. در مرحله ثبت اطلاعات، گزینه "رزرو برای شخص دیگر" را انتخاب کنید و اطلاعات کامل بیمار را وارد نمایید.' },
  { q: 'چگونه می‌توانم هزینه ویزیت را پرداخت کنم؟', a: 'شما می‌توانید هزینه ویزیت را به صورت آنلاین و از طریق درگاه پرداخت امن سایت پرداخت کنید. همچنین امکان پرداخت حضوری در مطب پزشک نیز وجود دارد.' },
  { q: 'چگونه می‌توانم نزدیک‌ترین پزشک به محل سکونت خود را پیدا کنم؟', a: 'در بخش جستجوی پزشک، می‌توانید شهر و منطقه مورد نظر خود را انتخاب کنید. همچنین با فعال کردن گزینه "نزدیک‌ترین پزشکان" لیست پزشکان بر اساس فاصله از موقعیت شما نمایش داده می‌شود.' },
  { q: 'آیا می‌توانم نسخه‌های الکترونیکی خود را از طریق وبسایت دریافت کنم؟', a: 'بله، پس از ویزیت آنلاین یا حضوری، نسخه الکترونیکی شما در پنل کاربری قابل مشاهده است. می‌توانید آن را دانلود کرده یا از طریق سیستم به داروخانه مورد نظر ارسال کنید.' },
]

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx)
  }

  return (
    <div className="bg-[#F9FAFB]" style={{ fontFamily: "'Vazirmatn', sans-serif", minHeight: '100vh' }}>
      <Header />

      <div className="max-w-[800px] mx-auto px-4" style={{ paddingTop: '80px', paddingBottom: 'calc(80px + 40px)' }}>
        <h2 className="text-[22px] md:text-[24px] font-medium text-[#262626] leading-[38px] text-right mb-2">سوالات متداول</h2>
        <p className="text-[16px] text-[#6B7280] text-right mb-8 leading-[25px]">پاسخ سوالات رایج شما در مورد رزرو نوبت آنلاین</p>

        <div className="border border-[#E7E7E7] rounded-[16px] bg-white overflow-hidden">
          {faqItems.map((item, idx) => (
            <div key={idx} className={`border-b border-[#F2F2F2] last:border-b-0 ${openIndex === idx ? 'bg-[#F9FAFB]' : ''}`}>
              <button onClick={() => toggle(idx)} className="flex items-center justify-between w-full p-5 text-right bg-transparent border-none cursor-pointer hover:bg-[#F9FAFB] transition">
                <span className="text-[16px] font-medium text-[#262626] leading-[25px] flex-1 text-right">{item.q}</span>
                <svg className={`w-5 h-5 shrink-0 transition-transform duration-300 mr-3 ${openIndex === idx ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="none">
                  <path d="M5 7.5l5 5 5-5" stroke="#5C5C5C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openIndex === idx ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="px-5 pb-5 text-[14px] font-normal text-[#5C5C5C] leading-[28px] text-right">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
      <BottomNav />
    </div>
  )
}
