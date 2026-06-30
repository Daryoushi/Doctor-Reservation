'use client'

import { useEffect, useState } from 'react'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import BottomNav from '@/app/components/BottomNav'

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  useEffect(() => {
    const slider = document.getElementById('sliderMobile') as HTMLElement
    const nextBtn = document.getElementById('nextBtn') as HTMLElement
    const prevBtn = document.getElementById('prevBtn') as HTMLElement
    const cards = document.querySelectorAll('#sliderMobile > div')
    const totalCards = cards.length
    let currentIndex = 0
    const cardWidth = 304

    function updateSlider() {
      const maxIndex = totalCards - 1
      if (currentIndex > maxIndex) currentIndex = maxIndex
      if (currentIndex < 0) currentIndex = 0
      const moveX = currentIndex * cardWidth
      slider.style.transform = 'translateX(-' + moveX + 'px)'
      prevBtn.style.display = currentIndex === 0 ? 'none' : 'flex'
      nextBtn.style.display = currentIndex >= maxIndex ? 'none' : 'flex'
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        const maxIndex = totalCards - 1
        if (currentIndex < maxIndex) { currentIndex++; updateSlider() }
      })
    }
    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        if (currentIndex > 0) { currentIndex--; updateSlider() }
      })
    }
    updateSlider()

    window.addEventListener('resize', updateSlider)

    const sliderNew = document.getElementById('sliderNew') as HTMLElement
    const nextBtnNew = document.getElementById('nextBtnNew') as HTMLElement
    const prevBtnNew = document.getElementById('prevBtnNew') as HTMLElement
    const cardsNew = document.querySelectorAll('#sliderNew > div')
    const totalCardsNew = cardsNew.length
    let currentIndexNew = 0
    const cardWidthNew = 304

    function updateSliderNew() {
      const maxIndex = totalCardsNew - 1
      if (currentIndexNew > maxIndex) currentIndexNew = maxIndex
      if (currentIndexNew < 0) currentIndexNew = 0
      const moveX = currentIndexNew * cardWidthNew
      sliderNew.style.transform = 'translateX(-' + moveX + 'px)'
      prevBtnNew.style.display = currentIndexNew === 0 ? 'none' : 'flex'
      nextBtnNew.style.display = currentIndexNew >= maxIndex ? 'none' : 'flex'
    }

    if (nextBtnNew) {
      nextBtnNew.addEventListener('click', function () {
        const maxIndex = totalCardsNew - 1
        if (currentIndexNew < maxIndex) { currentIndexNew++; updateSliderNew() }
      })
    }
    if (prevBtnNew) {
      prevBtnNew.addEventListener('click', function () {
        if (currentIndexNew > 0) { currentIndexNew--; updateSliderNew() }
      })
    }
    updateSliderNew()
    window.addEventListener('resize', updateSliderNew)

    const sliderComments = document.getElementById('sliderComments') as HTMLElement
    const nextBtnComments = document.getElementById('nextBtnComments') as HTMLElement
    const prevBtnComments = document.getElementById('prevBtnComments') as HTMLElement
    const cardsComments = document.querySelectorAll('#sliderComments > div')
    const totalCardsComments = cardsComments.length
    let currentIndexComments = 0
    const cardWidthComments = 304

    function updateSliderComments() {
      const maxIndex = totalCardsComments - 1
      if (currentIndexComments > maxIndex) currentIndexComments = maxIndex
      if (currentIndexComments < 0) currentIndexComments = 0
      const moveX = currentIndexComments * cardWidthComments
      sliderComments.style.transform = 'translateX(-' + moveX + 'px)'
      prevBtnComments.style.display = currentIndexComments === 0 ? 'none' : 'flex'
      nextBtnComments.style.display = currentIndexComments >= maxIndex ? 'none' : 'flex'
    }

    if (nextBtnComments) {
      nextBtnComments.addEventListener('click', function () {
        const maxIndex = totalCardsComments - 1
        if (currentIndexComments < maxIndex) { currentIndexComments++; updateSliderComments() }
      })
    }
    if (prevBtnComments) {
      prevBtnComments.addEventListener('click', function () {
        if (currentIndexComments > 0) { currentIndexComments--; updateSliderComments() }
      })
    }
    updateSliderComments()
    window.addEventListener('resize', updateSliderComments)

    return () => {
      window.removeEventListener('resize', updateSlider)
      window.removeEventListener('resize', updateSliderNew)
      window.removeEventListener('resize', updateSliderComments)
    }
  }, [])

  return (
    <>
      <Header />

      <section className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-16 grid md:grid-cols-2 gap-6 md:gap-10 items-center">
        <div className="order-2 md:order-1">
          <h2 className="text-3xl md:text-5xl font-black mb-4 md:mb-6">سلامت شما، رسالت ما</h2>
          <p className="text-[#5D5D5D] text-[16px] md:text-[20px] leading-[28px] md:leading-[31px] font-normal mb-6 md:mb-8 max-w-[487px]" style={{ fontFamily: 'Vazirmatn' }}>
            بهترین پزشکان در دسترس شما،<br />نوبت‌دهی آنلاین مطمئن فقط با چند کلیک.
          </p>
          <div className="flex gap-3 md:gap-4 items-center">
            <a href="/doctors" className="flex items-center justify-center gap-2 w-[160px] md:w-[184px] min-w-[130px] md:min-w-[144px] h-12 md:h-14 bg-[#4179F0] rounded-lg text-white text-base md:text-lg font-medium overflow-hidden relative" style={{ padding: '10px 10px 10px 8px', fontFamily: 'Vazirmatn' }}>
              رزرو نوبت
              <div className="absolute w-6 h-[104px] top-1/2 -translate-y-1/2 -left-12 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.5) 46.5%, rgba(255,255,255,0.25) 100%)', transform: 'rotate(15deg)' }} />
            </a>
            <a href="/#contact" className="flex items-center justify-center gap-2 w-[140px] md:w-[160px] min-w-[120px] md:min-w-[144px] h-12 md:h-14 border-[1.5px] border-[#E7E7E7] rounded-lg text-[#888888] text-base md:text-lg font-medium" style={{ padding: '10px 10px 10px 8px', fontFamily: 'Vazirmatn', textDecoration: 'none' }}>
              پشتیبانی
            </a>
          </div>
        </div>
        <div className="order-1 md:order-2">
          <img src="/images/pic1.jpg" alt="تصویر پزشکان" className="rounded-2xl w-full" />
        </div>
      </section>

      <section className="max-w-[1216px] mx-auto px-4 md:px-6 mb-8 md:mb-12">
        <div className="flex flex-col md:grid md:grid-cols-3 gap-3 md:gap-4">
          <div className="flex flex-row items-center justify-end gap-3 h-auto md:h-[132px] bg-white border border-[#E7E7E7] rounded-[10px]" style={{ padding: '16px 20px' }}>
            <img src="/images/setting-04.jpg" alt="" className="w-7 h-7 md:w-8 md:h-8 shrink-0" />
            <div className="flex flex-col justify-center items-end gap-1">
              <span className="text-[14px] md:text-[18px] font-medium leading-5 md:leading-7 text-black">مدیریت و تغییر نوبت به راحتی</span>
              <span className="text-[11px] md:text-[13px] font-normal leading-4 md:leading-5 text-[#454545]">توانایی لغو،تغییر و مدیریت نوبت ها به راحتی</span>
            </div>
          </div>

          <div className="flex flex-row items-center justify-end gap-3 h-auto md:h-[132px] bg-white border border-[#E7E7E7] rounded-[10px]" style={{ padding: '16px 20px' }}>
            <img src="/images/comment-01.jpg" alt="" className="w-7 h-7 md:w-8 md:h-8 shrink-0" />
            <div className="flex flex-col justify-center items-end gap-1">
              <span className="text-[14px] md:text-[18px] font-medium leading-5 md:leading-7 text-black">اطمینان از انتخاب مجرب ترین پزشکان</span>
              <span className="text-[11px] md:text-[13px] font-normal leading-4 md:leading-5 text-[#454545]">بهترین پزشکان را با توجه به نظر کاربران انتخاب کنید</span>
            </div>
          </div>

          <div className="flex flex-row items-center justify-end gap-3 h-auto md:h-[132px] bg-white border border-[#E7E7E7] rounded-[10px]" style={{ padding: '16px 20px' }}>
            <img src="/images/clock-02.jpg" alt="" className="w-7 h-7 md:w-8 md:h-8 shrink-0" />
            <div className="flex flex-col justify-center items-end gap-1">
              <span className="text-[14px] md:text-[18px] font-medium leading-5 md:leading-7 text-black">دسترسی ۲۴ ساعته به پزشکان</span>
              <span className="text-[11px] md:text-[13px] font-normal leading-4 md:leading-5 text-[#454545]">در هر زمانی میتوانید نوبت خود را رزرو کنید</span>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-6 mb-8 md:mb-16">
        <div className="rounded-2xl md:rounded-3xl p-6 md:p-10 text-white text-center" style={{ backgroundImage: 'url(/images/searchbox.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#11111166', backgroundBlendMode: 'overlay' }}>
          <h3 className="text-xl md:text-4xl font-bold mb-3 md:mb-4">فقط یک جستجو با بهترین پزشکان فاصله دارید</h3>
          <p className="mb-4 md:mb-6 font-[Vazirmatn] text-sm md:text-base">در کمتر از 1 دقیقه نوبت خود را رزرو کنید</p>
          <div className="flex flex-col items-end gap-1 w-full max-w-full mx-auto">
            <div className="flex flex-row items-center gap-2 w-full h-12 md:h-14 bg-[#F0F0F0] rounded-xl md:rounded-2xl" style={{ padding: '6px 12px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="shrink-0 md:w-6 md:h-6" style={{ transform: 'scaleX(-1)' }}>
                <rect x="17.5" y="17.5" width="5" height="5" rx="2.5" stroke="#888888" strokeWidth="1.5" />
                <rect x="2" y="2" width="14" height="14" rx="7" stroke="#888888" strokeWidth="1.5" />
              </svg>
              <input className="flex-1 bg-transparent text-[12px] md:text-[14px] font-normal leading-[150%] text-right text-[#888888] outline-none border-none" style={{ fontFamily: 'Vazirmatn' }} placeholder="پزشک یا تخصص مورد نظر خود را جستجو کنید..." />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-6 mb-8 md:mb-16">
        <div className="flex items-center justify-between mb-4 md:mb-8">
          <h3 className="text-xl md:text-3xl font-bold">لیست تخصص ها</h3>
          <a href="/doctors"
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '10px 10px 10px 8px',
              gap: '6px',
              width: '120px',
              minWidth: '120px',
              height: '40px',
              borderRadius: '8px',
              fontFamily: "'Vazirmatn', sans-serif",
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '22px',
              textAlign: 'right',
              color: '#888888',
              textDecoration: 'none',
              boxSizing: 'border-box',
            }}
          >
            مشاهده همه
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M13 7L8 10L13 13" stroke="#888888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-7 gap-3 md:gap-4">
          <a href="/doctors" className="bg-white p-5 rounded-xl border text-center hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group block">
            <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-2 border-2 border-transparent group-hover:border-blue-500 transition">
              <img src="/images/heart.png" alt="قلب و عروق" className="w-full h-full object-cover" />
            </div>
            <span className="font-bold text-sm">قلب و عروق</span>
          </a>

          <a href="/doctors" className="bg-white p-5 rounded-xl border text-center hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group block">
            <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-2 border-2 border-transparent group-hover:border-blue-500 transition">
              <img src="/images/ortoped.png" alt="ارتوپدی" className="w-full h-full object-cover" />
            </div>
            <span className="font-bold text-sm">ارتوپدی</span>
          </a>

          <a href="/doctors" className="bg-white p-5 rounded-xl border text-center hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group block">
            <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-2 border-2 border-transparent group-hover:border-blue-500 transition">
              <img src="/images/brain.png" alt="مغز و اعصاب" className="w-full h-full object-cover" />
            </div>
            <span className="font-bold text-sm">مغز و اعصاب</span>
          </a>

          <a href="/doctors" className="bg-white p-5 rounded-xl border text-center hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group block">
            <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-2 border-2 border-transparent group-hover:border-blue-500 transition">
              <img src="/images/tanafosi.png" alt="تنفسی" className="w-full h-full object-cover" />
            </div>
            <span className="font-bold text-sm">دستگاه تنفسی</span>
          </a>

          <a href="/doctors" className="bg-white p-5 rounded-xl border text-center hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group block">
            <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-2 border-2 border-transparent group-hover:border-blue-500 transition">
              <img src="/images/eye.png" alt="چشم پزشکی" className="w-full h-full object-cover" />
            </div>
            <span className="font-bold text-sm">چشم پزشکی</span>
          </a>

          <a href="/doctors" className="bg-white p-5 rounded-xl border text-center hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group block">
            <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-2 border-2 border-transparent group-hover:border-blue-500 transition">
              <img src="/images/atfal.png" alt="اطفال" className="w-full h-full object-cover" />
            </div>
            <span className="font-bold text-sm">اطفال</span>
          </a>

          <a href="/doctors" className="bg-white p-5 rounded-xl border text-center hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group block">
            <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-2 border-2 border-transparent group-hover:border-blue-500 transition">
              <img src="/images/goosh.png" alt="گوش و حلق و بینی" className="w-full h-full object-cover" />
            </div>
            <span className="font-bold text-sm">گوش و حلق و بینی</span>
          </a>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-6 mb-8 md:mb-16">
        <div className="flex items-center justify-between mb-4 md:mb-8">
          <h3 className="text-[18px] md:text-[24px] font-medium leading-[28px] md:leading-[38px] text-black" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>محبوب‌ترین پزشکان <span className="hidden md:inline text-[18px] font-normal leading-[28px] text-black">(بر اساس تعداد نوبت‌های رزرو شده)</span></h3>
          <a href="/doctors"
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '10px 10px 10px 8px',
              gap: '6px',
              width: '120px',
              minWidth: '120px',
              height: '40px',
              borderRadius: '8px',
              fontFamily: "'Vazirmatn', sans-serif",
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '22px',
              textAlign: 'right',
              color: '#888888',
              textDecoration: 'none',
              boxSizing: 'border-box',
            }}
          >
            مشاهده همه
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M13 7L8 10L13 13" stroke="#888888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        <div className="hidden md:grid md:grid-cols-4 gap-6">
          <a href="/doctors/1" className="flex flex-col items-center bg-white border border-[#E7E7E7] rounded-[10px] overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1" style={{ width: '289px', textDecoration: 'none' }}>
            <div className="w-[289px] h-[200px]" style={{ background: 'radial-gradient(104.67% 151.25% at 49.83% 17.25%, #FFFFFF 0%, #C6C6C6 100%)' }}>
              <img src="/images/dr1.jpg" alt="دکتر زهرا وارسته" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col items-end gap-1 w-full px-5 py-4">
              <div className="flex flex-row justify-between items-center w-full">
                <span className="text-[16px] font-medium text-center text-black" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>دکتر زهرا وارسته</span>
                <div className="flex flex-row items-center gap-1">
                  <span className="text-[12px] font-normal text-[#888888]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>(۱۰۵ نظر)</span>
                  <div className="flex flex-row items-center">
                    <span className="text-[13px] text-[#FFB800]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>۴.۹</span>
                    <svg width="12" height="13" viewBox="0 0 12 13" fill="none">
                      <path d="M6 0.5l1.545 3.5L11.5 4.5 8.5 7.5l.5 4.5L6 10 3 12l.5-4.5L.5 4.5l3.955-.5L6 .5z" fill="#FFB800" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-between items-center w-full">
                <span className="text-[14px] font-normal text-[#6D6D6D]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>متخصص قلب و عروق</span>
                <div className="flex flex-row items-center gap-1">
                  <span className="text-[12px] font-normal text-[#6D6D6D]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>تهران</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <ellipse cx="8" cy="6.5" rx="2.5" ry="2.5" stroke="#6D6D6D" strokeWidth="1" />
                    <path d="M8 14.5c-3-2.5-5.5-5.5-5.5-8a5.5 5.5 0 1111 0c0 2.5-2.5 5.5-5.5 8z" stroke="#6D6D6D" strokeWidth="1" />
                    <ellipse cx="8" cy="13.5" rx="4" ry="1.5" stroke="#6D6D6D" strokeWidth="1" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="w-full px-4 pb-4">
              <div className="flex items-center justify-center px-[10px] py-[10px] w-full h-[42px] border border-[#4179F0] rounded-lg">
                <span className="text-[14px] font-medium text-[#4179F0]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>دریافت نوبت</span>
              </div>
            </div>
          </a>

          <a href="/doctors/2" className="flex flex-col items-center bg-white border border-[#E7E7E7] rounded-[10px] overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1" style={{ width: '289px', textDecoration: 'none' }}>
            <div className="w-[289px] h-[200px]" style={{ background: 'radial-gradient(104.67% 151.25% at 49.83% 17.25%, #FFFFFF 0%, #C6C6C6 100%)' }}>
              <img src="/images/dr2.jpg" alt="دکتر علی وارسته" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col items-end gap-1 w-full px-5 py-4">
              <div className="flex flex-row justify-between items-center w-full">
                <span className="text-[16px] font-medium text-center text-black" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>دکتر علی وارسته</span>
                <div className="flex flex-row items-center gap-1">
                  <span className="text-[12px] font-normal text-[#888888]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>(۹۸ نظر)</span>
                  <div className="flex flex-row items-center">
                    <span className="text-[13px] text-[#FFB800]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>۴.۸</span>
                    <svg width="12" height="13" viewBox="0 0 12 13" fill="none">
                      <path d="M6 0.5l1.545 3.5L11.5 4.5 8.5 7.5l.5 4.5L6 10 3 12l.5-4.5L.5 4.5l3.955-.5L6 .5z" fill="#FFB800" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-between items-center w-full">
                <span className="text-[14px] font-normal text-[#6D6D6D]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>متخصص قلب و عروق</span>
                <div className="flex flex-row items-center gap-1">
                  <span className="text-[12px] font-normal text-[#6D6D6D]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>تهران</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <ellipse cx="8" cy="6.5" rx="2.5" ry="2.5" stroke="#6D6D6D" strokeWidth="1" />
                    <path d="M8 14.5c-3-2.5-5.5-5.5-5.5-8a5.5 5.5 0 1111 0c0 2.5-2.5 5.5-5.5 8z" stroke="#6D6D6D" strokeWidth="1" />
                    <ellipse cx="8" cy="13.5" rx="4" ry="1.5" stroke="#6D6D6D" strokeWidth="1" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="w-full px-4 pb-4">
              <div className="flex items-center justify-center px-[10px] py-[10px] w-full h-[42px] border border-[#4179F0] rounded-lg">
                <span className="text-[14px] font-medium text-[#4179F0]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>دریافت نوبت</span>
              </div>
            </div>
          </a>

          <a href="/doctors/3" className="flex flex-col items-center bg-white border border-[#E7E7E7] rounded-[10px] overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1" style={{ width: '289px', textDecoration: 'none' }}>
            <div className="w-[289px] h-[200px]" style={{ background: 'radial-gradient(104.67% 151.25% at 49.83% 17.25%, #FFFFFF 0%, #C6C6C6 100%)' }}>
              <img src="/images/dr3.png" alt="دکتر بهنوش حسینی" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col items-end gap-1 w-full px-5 py-4">
              <div className="flex flex-row justify-between items-center w-full">
                <span className="text-[16px] font-medium text-center text-black" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>دکتر بهنوش حسینی</span>
                <div className="flex flex-row items-center gap-1">
                  <span className="text-[12px] font-normal text-[#888888]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>(۷۶ نظر)</span>
                  <div className="flex flex-row items-center">
                    <span className="text-[13px] text-[#FFB800]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>۴.۵</span>
                    <svg width="12" height="13" viewBox="0 0 12 13" fill="none">
                      <path d="M6 0.5l1.545 3.5L11.5 4.5 8.5 7.5l.5 4.5L6 10 3 12l.5-4.5L.5 4.5l3.955-.5L6 .5z" fill="#FFB800" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-between items-center w-full">
                <span className="text-[14px] font-normal text-[#6D6D6D]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>جراح گوش و حلق و بینی</span>
                <div className="flex flex-row items-center gap-1">
                  <span className="text-[12px] font-normal text-[#6D6D6D]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>تهران</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <ellipse cx="8" cy="6.5" rx="2.5" ry="2.5" stroke="#6D6D6D" strokeWidth="1" />
                    <path d="M8 14.5c-3-2.5-5.5-5.5-5.5-8a5.5 5.5 0 1111 0c0 2.5-2.5 5.5-5.5 8z" stroke="#6D6D6D" strokeWidth="1" />
                    <ellipse cx="8" cy="13.5" rx="4" ry="1.5" stroke="#6D6D6D" strokeWidth="1" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="w-full px-4 pb-4">
              <div className="flex items-center justify-center px-[10px] py-[10px] w-full h-[42px] border border-[#4179F0] rounded-lg">
                <span className="text-[14px] font-medium text-[#4179F0]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>دریافت نوبت</span>
              </div>
            </div>
          </a>

          <a href="/doctors/4" className="flex flex-col items-center bg-white border border-[#E7E7E7] rounded-[10px] overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1" style={{ width: '289px', textDecoration: 'none' }}>
            <div className="w-[289px] h-[200px]" style={{ background: 'radial-gradient(104.67% 151.25% at 49.83% 17.25%, #FFFFFF 0%, #C6C6C6 100%)' }}>
              <img src="/images/dr4.png" alt="دکتر علی راد" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col items-end gap-1 w-full px-5 py-4">
              <div className="flex flex-row justify-between items-center w-full">
                <span className="text-[16px] font-medium text-center text-black" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>دکتر علی راد</span>
                <div className="flex flex-row items-center gap-1">
                  <span className="text-[12px] font-normal text-[#888888]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>(۲۵۶ نظر)</span>
                  <div className="flex flex-row items-center">
                    <span className="text-[13px] text-[#FFB800]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>۵.۰</span>
                    <svg width="12" height="13" viewBox="0 0 12 13" fill="none">
                      <path d="M6 0.5l1.545 3.5L11.5 4.5 8.5 7.5l.5 4.5L6 10 3 12l.5-4.5L.5 4.5l3.955-.5L6 .5z" fill="#FFB800" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-between items-center w-full">
                <span className="text-[14px] font-normal text-[#6D6D6D]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>متخصص ریه</span>
                <div className="flex flex-row items-center gap-1">
                  <span className="text-[12px] font-normal text-[#6D6D6D]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>تهران</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <ellipse cx="8" cy="6.5" rx="2.5" ry="2.5" stroke="#6D6D6D" strokeWidth="1" />
                    <path d="M8 14.5c-3-2.5-5.5-5.5-5.5-8a5.5 5.5 0 1111 0c0 2.5-2.5 5.5-5.5 8z" stroke="#6D6D6D" strokeWidth="1" />
                    <ellipse cx="8" cy="13.5" rx="4" ry="1.5" stroke="#6D6D6D" strokeWidth="1" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="w-full px-4 pb-4">
              <div className="flex items-center justify-center px-[10px] py-[10px] w-full h-[42px] border border-[#4179F0] rounded-lg">
                <span className="text-[14px] font-medium text-[#4179F0]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>دریافت نوبت</span>
              </div>
            </div>
          </a>
        </div>

        <div className="block md:hidden relative overflow-hidden">
          <button id="nextBtn" className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 ml-1 transition hover:scale-110 border border-gray-200">
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>

          <button id="prevBtn" className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 mr-1 transition hover:scale-110 border border-gray-200" style={{ display: 'none' }}>
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>

          <div id="sliderMobile" className="flex gap-4 transition-transform duration-500 ease-in-out">
            <div className="min-w-[280px] flex flex-col items-center bg-white border border-[#E7E7E7] rounded-[10px] overflow-hidden flex-shrink-0">
              <div className="w-full h-[200px]" style={{ background: 'radial-gradient(104.67% 151.25% at 49.83% 17.25%, #FFFFFF 0%, #C6C6C6 100%)' }}>
                <img src="/images/dr1.jpg" alt="دکتر زهرا وارسته" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col items-end gap-1 w-full px-5 py-4">
                <div className="flex flex-row justify-between items-center w-full">
                  <span className="text-[16px] font-medium text-center text-black" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>دکتر زهرا وارسته</span>
                  <div className="flex flex-row items-center gap-1">
                    <span className="text-[12px] font-normal text-[#888888]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>(۱۰۵ نظر)</span>
                    <div className="flex flex-row items-center">
                      <span className="text-[13px] text-[#FFB800]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>۴.۹</span>
                      <svg width="12" height="13" viewBox="0 0 12 13" fill="none">
                        <path d="M6 0.5l1.545 3.5L11.5 4.5 8.5 7.5l.5 4.5L6 10 3 12l.5-4.5L.5 4.5l3.955-.5L6 .5z" fill="#FFB800" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row justify-between items-center w-full">
                  <span className="text-[14px] font-normal text-[#6D6D6D]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>متخصص قلب و عروق</span>
                  <div className="flex flex-row items-center gap-1">
                    <span className="text-[12px] font-normal text-[#6D6D6D]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>تهران</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <ellipse cx="8" cy="6.5" rx="2.5" ry="2.5" stroke="#6D6D6D" strokeWidth="1" />
                      <path d="M8 14.5c-3-2.5-5.5-5.5-5.5-8a5.5 5.5 0 1111 0c0 2.5-2.5 5.5-5.5 8z" stroke="#6D6D6D" strokeWidth="1" />
                      <ellipse cx="8" cy="13.5" rx="4" ry="1.5" stroke="#6D6D6D" strokeWidth="1" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="w-full px-4 pb-4">
                <a href="/doctors/1" className="flex items-center justify-center px-[10px] py-[10px] w-full h-[42px] border border-[#4179F0] rounded-lg" style={{ textDecoration: 'none' }}>
                  <span className="text-[14px] font-medium text-[#4179F0]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>دریافت نوبت</span>
                </a>
              </div>
            </div>

            <div className="min-w-[280px] flex flex-col items-center bg-white border border-[#E7E7E7] rounded-[10px] overflow-hidden flex-shrink-0">
              <div className="w-full h-[200px]" style={{ background: 'radial-gradient(104.67% 151.25% at 49.83% 17.25%, #FFFFFF 0%, #C6C6C6 100%)' }}>
                <img src="/images/dr2.jpg" alt="دکتر علی وارسته" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col items-end gap-1 w-full px-5 py-4">
                <div className="flex flex-row justify-between items-center w-full">
                  <span className="text-[16px] font-medium text-center text-black" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>دکتر علی وارسته</span>
                  <div className="flex flex-row items-center gap-1">
                    <span className="text-[12px] font-normal text-[#888888]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>(۹۸ نظر)</span>
                    <div className="flex flex-row items-center">
                      <span className="text-[13px] text-[#FFB800]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>۴.۸</span>
                      <svg width="12" height="13" viewBox="0 0 12 13" fill="none">
                        <path d="M6 0.5l1.545 3.5L11.5 4.5 8.5 7.5l.5 4.5L6 10 3 12l.5-4.5L.5 4.5l3.955-.5L6 .5z" fill="#FFB800" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row justify-between items-center w-full">
                  <span className="text-[14px] font-normal text-[#6D6D6D]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>متخصص قلب و عروق</span>
                  <div className="flex flex-row items-center gap-1">
                    <span className="text-[12px] font-normal text-[#6D6D6D]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>تهران</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <ellipse cx="8" cy="6.5" rx="2.5" ry="2.5" stroke="#6D6D6D" strokeWidth="1" />
                      <path d="M8 14.5c-3-2.5-5.5-5.5-5.5-8a5.5 5.5 0 1111 0c0 2.5-2.5 5.5-5.5 8z" stroke="#6D6D6D" strokeWidth="1" />
                      <ellipse cx="8" cy="13.5" rx="4" ry="1.5" stroke="#6D6D6D" strokeWidth="1" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="w-full px-4 pb-4">
                <a href="/doctors/2" className="flex items-center justify-center px-[10px] py-[10px] w-full h-[42px] border border-[#4179F0] rounded-lg" style={{ textDecoration: 'none' }}>
                  <span className="text-[14px] font-medium text-[#4179F0]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>دریافت نوبت</span>
                </a>
              </div>
            </div>

            <div className="min-w-[280px] flex flex-col items-center bg-white border border-[#E7E7E7] rounded-[10px] overflow-hidden flex-shrink-0">
              <div className="w-full h-[200px]" style={{ background: 'radial-gradient(104.67% 151.25% at 49.83% 17.25%, #FFFFFF 0%, #C6C6C6 100%)' }}>
                <img src="/images/dr3.png" alt="دکتر بهنوش حسینی" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col items-end gap-1 w-full px-5 py-4">
                <div className="flex flex-row justify-between items-center w-full">
                  <span className="text-[16px] font-medium text-center text-black" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>دکتر بهنوش حسینی</span>
                  <div className="flex flex-row items-center gap-1">
                    <span className="text-[12px] font-normal text-[#888888]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>(۷۶ نظر)</span>
                    <div className="flex flex-row items-center">
                      <span className="text-[13px] text-[#FFB800]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>۴.۵</span>
                      <svg width="12" height="13" viewBox="0 0 12 13" fill="none">
                        <path d="M6 0.5l1.545 3.5L11.5 4.5 8.5 7.5l.5 4.5L6 10 3 12l.5-4.5L.5 4.5l3.955-.5L6 .5z" fill="#FFB800" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row justify-between items-center w-full">
                  <span className="text-[14px] font-normal text-[#6D6D6D]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>جراح گوش و حلق و بینی</span>
                  <div className="flex flex-row items-center gap-1">
                    <span className="text-[12px] font-normal text-[#6D6D6D]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>تهران</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <ellipse cx="8" cy="6.5" rx="2.5" ry="2.5" stroke="#6D6D6D" strokeWidth="1" />
                      <path d="M8 14.5c-3-2.5-5.5-5.5-5.5-8a5.5 5.5 0 1111 0c0 2.5-2.5 5.5-5.5 8z" stroke="#6D6D6D" strokeWidth="1" />
                      <ellipse cx="8" cy="13.5" rx="4" ry="1.5" stroke="#6D6D6D" strokeWidth="1" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="w-full px-4 pb-4">
                <a href="/doctors/3" className="flex items-center justify-center px-[10px] py-[10px] w-full h-[42px] border border-[#4179F0] rounded-lg" style={{ textDecoration: 'none' }}>
                  <span className="text-[14px] font-medium text-[#4179F0]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>دریافت نوبت</span>
                </a>
              </div>
            </div>

            <div className="min-w-[280px] flex flex-col items-center bg-white border border-[#E7E7E7] rounded-[10px] overflow-hidden flex-shrink-0">
              <div className="w-full h-[200px]" style={{ background: 'radial-gradient(104.67% 151.25% at 49.83% 17.25%, #FFFFFF 0%, #C6C6C6 100%)' }}>
                <img src="/images/dr4.png" alt="دکتر علی راد" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col items-end gap-1 w-full px-5 py-4">
                <div className="flex flex-row justify-between items-center w-full">
                  <span className="text-[16px] font-medium text-center text-black" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>دکتر علی راد</span>
                  <div className="flex flex-row items-center gap-1">
                    <span className="text-[12px] font-normal text-[#888888]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>(۲۵۶ نظر)</span>
                    <div className="flex flex-row items-center">
                      <span className="text-[13px] text-[#FFB800]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>۵.۰</span>
                      <svg width="12" height="13" viewBox="0 0 12 13" fill="none">
                        <path d="M6 0.5l1.545 3.5L11.5 4.5 8.5 7.5l.5 4.5L6 10 3 12l.5-4.5L.5 4.5l3.955-.5L6 .5z" fill="#FFB800" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row justify-between items-center w-full">
                  <span className="text-[14px] font-normal text-[#6D6D6D]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>متخصص ریه</span>
                  <div className="flex flex-row items-center gap-1">
                    <span className="text-[12px] font-normal text-[#6D6D6D]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>تهران</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <ellipse cx="8" cy="6.5" rx="2.5" ry="2.5" stroke="#6D6D6D" strokeWidth="1" />
                      <path d="M8 14.5c-3-2.5-5.5-5.5-5.5-8a5.5 5.5 0 1111 0c0 2.5-2.5 5.5-5.5 8z" stroke="#6D6D6D" strokeWidth="1" />
                      <ellipse cx="8" cy="13.5" rx="4" ry="1.5" stroke="#6D6D6D" strokeWidth="1" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="w-full px-4 pb-4">
                <a href="/doctors/4" className="flex items-center justify-center px-[10px] py-[10px] w-full h-[42px] border border-[#4179F0] rounded-lg" style={{ textDecoration: 'none' }}>
                  <span className="text-[14px] font-medium text-[#4179F0]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>دریافت نوبت</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1216px] mx-auto px-4 md:px-6 mb-8 md:mb-16">
        <div className="bg-white border-[1.5px] border-[#E7E7E7] rounded-2xl overflow-hidden">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-[492px] shrink-0">
              <img src="/images/test salamat.png" alt="تست سلامت" className="w-full h-[200px] md:h-full object-cover" />
            </div>
            <div className="flex flex-col items-end p-6 md:p-10 md:pr-12">
              <h3 className="text-[22px] md:text-[32px] font-medium leading-[110%] md:leading-[100%] text-[#1D1D1D] text-right mb-3" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>همین حالا رایگان تست سلامت بگیرید!</h3>
              <p className="text-[14px] md:text-[18px] font-normal leading-6 md:leading-7 text-[#565656] text-right mb-6" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>در کمتر از دو دقیقه سلامت خود را ارزیابی کنید</p>
              <button onClick={() => alert('این بخش به زودی راه اندازی می‌شود.')} className="flex items-center justify-center w-full md:w-[200px] h-12 md:h-14 bg-[#4179F0] rounded-lg text-white text-base md:text-lg font-medium cursor-pointer" style={{ padding: '10px 10px 10px 8px', fontFamily: "'Vazirmatn', sans-serif" }}>
                شروع تست سلامت
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-6 mb-8 md:mb-16">
        <div className="flex justify-between items-center mb-4 md:mb-8">
          <h3 className="text-xl md:text-3xl font-bold">جدیدترین پزشکان</h3>
          <a href="/doctors"
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '10px 10px 10px 8px',
              gap: '6px',
              width: '120px',
              minWidth: '120px',
              height: '40px',
              borderRadius: '8px',
              fontFamily: "'Vazirmatn', sans-serif",
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '22px',
              textAlign: 'right',
              color: '#888888',
              textDecoration: 'none',
              boxSizing: 'border-box',
            }}
          >
            مشاهده همه
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M13 7L8 10L13 13" stroke="#888888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        <div className="hidden md:grid md:grid-cols-4 gap-6">
          <a href="/doctors/5" className="flex flex-col items-center bg-white border border-[#E7E7E7] rounded-[10px] overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1" style={{ width: '289px', textDecoration: 'none' }}>
            <div className="w-full h-[200px] relative" style={{ background: 'radial-gradient(104.67% 151.25% at 49.83% 17.25%, #FFFFFF 0%, #C6C6C6 100%)' }}>
              <img src="/images/dr11.png" alt="دکتر لعیا زنگنه" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col items-end gap-1 w-full px-5 py-4">
              <div className="flex flex-row justify-between items-center w-full">
                <span className="text-[16px] font-medium text-center text-black" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>دکتر لعیا زنگنه</span>
                <div className="flex flex-row items-center gap-1">
                  <span className="text-[12px] font-normal text-[#888888]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>(۴۲ نظر)</span>
                  <div className="flex flex-row items-center">
                    <span className="text-[13px] text-[#FFB800]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>۴.۶</span>
                    <svg width="12" height="13" viewBox="0 0 12 13" fill="none">
                      <path d="M6 0.5l1.545 3.5L11.5 4.5 8.5 7.5l.5 4.5L6 10 3 12l.5-4.5L.5 4.5l3.955-.5L6 .5z" fill="#FFB800" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-between items-center w-full">
                <span className="text-[14px] font-normal text-[#6D6D6D]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>متخصص قلب و عروق</span>
                <div className="flex flex-row items-center gap-1">
                  <span className="text-[12px] font-normal text-[#6D6D6D]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>تهران</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <ellipse cx="8" cy="6.5" rx="2.5" ry="2.5" stroke="#6D6D6D" strokeWidth="1" />
                    <path d="M8 14.5c-3-2.5-5.5-5.5-5.5-8a5.5 5.5 0 1111 0c0 2.5-2.5 5.5-5.5 8z" stroke="#6D6D6D" strokeWidth="1" />
                    <ellipse cx="8" cy="13.5" rx="4" ry="1.5" stroke="#6D6D6D" strokeWidth="1" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="w-full px-4 pb-4">
              <div className="flex items-center justify-center px-[10px] py-[10px] w-full h-[42px] border border-[#4179F0] rounded-lg">
                <span className="text-[14px] font-medium text-[#4179F0]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>دریافت نوبت</span>
              </div>
            </div>
          </a>

          <a href="/doctors/6" className="flex flex-col items-center bg-white border border-[#E7E7E7] rounded-[10px] overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1" style={{ width: '289px', textDecoration: 'none' }}>
            <div className="w-full h-[200px] relative" style={{ background: 'radial-gradient(104.67% 151.25% at 49.83% 17.25%, #FFFFFF 0%, #C6C6C6 100%)' }}>
              <img src="/images/dr12.png" alt="دکتر یاشار پناهی" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col items-end gap-1 w-full px-5 py-4">
              <div className="flex flex-row justify-between items-center w-full">
                <span className="text-[16px] font-medium text-center text-black" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>دکتر یاشار پناهی</span>
                <div className="flex flex-row items-center gap-1">
                  <span className="text-[12px] font-normal text-[#888888]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>(۱۸ نظر)</span>
                  <div className="flex flex-row items-center">
                    <span className="text-[13px] text-[#FFB800]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>۴.۹</span>
                    <svg width="12" height="13" viewBox="0 0 12 13" fill="none">
                      <path d="M6 0.5l1.545 3.5L11.5 4.5 8.5 7.5l.5 4.5L6 10 3 12l.5-4.5L.5 4.5l3.955-.5L6 .5z" fill="#FFB800" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-between items-center w-full">
                <span className="text-[14px] font-normal text-[#6D6D6D]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>متخصص روانشناسی بالینی</span>
                <div className="flex flex-row items-center gap-1">
                  <span className="text-[12px] font-normal text-[#6D6D6D]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>تهران</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <ellipse cx="8" cy="6.5" rx="2.5" ry="2.5" stroke="#6D6D6D" strokeWidth="1" />
                    <path d="M8 14.5c-3-2.5-5.5-5.5-5.5-8a5.5 5.5 0 1111 0c0 2.5-2.5 5.5-5.5 8z" stroke="#6D6D6D" strokeWidth="1" />
                    <ellipse cx="8" cy="13.5" rx="4" ry="1.5" stroke="#6D6D6D" strokeWidth="1" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="w-full px-4 pb-4">
              <div className="flex items-center justify-center px-[10px] py-[10px] w-full h-[42px] border border-[#4179F0] rounded-lg">
                <span className="text-[14px] font-medium text-[#4179F0]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>دریافت نوبت</span>
              </div>
            </div>
          </a>

          <a href="/doctors/7" className="flex flex-col items-center bg-white border border-[#E7E7E7] rounded-[10px] overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1" style={{ width: '289px', textDecoration: 'none' }}>
            <div className="w-full h-[200px] relative" style={{ background: 'radial-gradient(104.67% 151.25% at 49.83% 17.25%, #FFFFFF 0%, #C6C6C6 100%)' }}>
              <img src="/images/dr13.png" alt="دکتر زهرا سعادتی" className="w-full h-full object-cover" />

            </div>
            <div className="flex flex-col items-end gap-1 w-full px-5 py-4">
              <div className="flex flex-row justify-between items-center w-full">
                <span className="text-[16px] font-medium text-center text-black" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>دکتر زهرا سعادتی</span>
                <div className="flex flex-row items-center gap-1">
                  <span className="text-[12px] font-normal text-[#888888]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>(۳۵ نظر)</span>
                  <div className="flex flex-row items-center">
                    <span className="text-[13px] text-[#FFB800]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>۴.۴</span>
                    <svg width="12" height="13" viewBox="0 0 12 13" fill="none">
                      <path d="M6 0.5l1.545 3.5L11.5 4.5 8.5 7.5l.5 4.5L6 10 3 12l.5-4.5L.5 4.5l3.955-.5L6 .5z" fill="#FFB800" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-between items-center w-full">
                <span className="text-[14px] font-normal text-[#6D6D6D]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>متخصص گوش و حلق و بینی</span>
                <div className="flex flex-row items-center gap-1">
                  <span className="text-[12px] font-normal text-[#6D6D6D]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>تهران</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <ellipse cx="8" cy="6.5" rx="2.5" ry="2.5" stroke="#6D6D6D" strokeWidth="1" />
                    <path d="M8 14.5c-3-2.5-5.5-5.5-5.5-8a5.5 5.5 0 1111 0c0 2.5-2.5 5.5-5.5 8z" stroke="#6D6D6D" strokeWidth="1" />
                    <ellipse cx="8" cy="13.5" rx="4" ry="1.5" stroke="#6D6D6D" strokeWidth="1" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="w-full px-4 pb-4">
              <div className="flex items-center justify-center px-[10px] py-[10px] w-full h-[42px] border border-[#4179F0] rounded-lg">
                <span className="text-[14px] font-medium text-[#4179F0]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>دریافت نوبت</span>
              </div>
            </div>
          </a>

          <a href="/doctors/8" className="flex flex-col items-center bg-white border border-[#E7E7E7] rounded-[10px] overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1" style={{ width: '289px', textDecoration: 'none' }}>
            <div className="w-full h-[200px] relative" style={{ background: 'radial-gradient(104.67% 151.25% at 49.83% 17.25%, #FFFFFF 0%, #C6C6C6 100%)' }}>
              <img src="/images/dr14.png" alt="دکتر محمد سامی" className="w-full h-full object-cover" />

            </div>
            <div className="flex flex-col items-end gap-1 w-full px-5 py-4">
              <div className="flex flex-row justify-between items-center w-full">
                <span className="text-[16px] font-medium text-center text-black" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>دکتر محمد سامی</span>
                <div className="flex flex-row items-center gap-1">
                  <span className="text-[12px] font-normal text-[#888888]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>(۶۱ نظر)</span>
                  <div className="flex flex-row items-center">
                    <span className="text-[13px] text-[#FFB800]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>۵.۰</span>
                    <svg width="12" height="13" viewBox="0 0 12 13" fill="none">
                      <path d="M6 0.5l1.545 3.5L11.5 4.5 8.5 7.5l.5 4.5L6 10 3 12l.5-4.5L.5 4.5l3.955-.5L6 .5z" fill="#FFB800" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-between items-center w-full">
                <span className="text-[14px] font-normal text-[#6D6D6D]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>متخصص داخلی</span>
                <div className="flex flex-row items-center gap-1">
                  <span className="text-[12px] font-normal text-[#6D6D6D]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>تهران</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <ellipse cx="8" cy="6.5" rx="2.5" ry="2.5" stroke="#6D6D6D" strokeWidth="1" />
                    <path d="M8 14.5c-3-2.5-5.5-5.5-5.5-8a5.5 5.5 0 1111 0c0 2.5-2.5 5.5-5.5 8z" stroke="#6D6D6D" strokeWidth="1" />
                    <ellipse cx="8" cy="13.5" rx="4" ry="1.5" stroke="#6D6D6D" strokeWidth="1" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="w-full px-4 pb-4">
              <div className="flex items-center justify-center px-[10px] py-[10px] w-full h-[42px] border border-[#4179F0] rounded-lg">
                <span className="text-[14px] font-medium text-[#4179F0]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>دریافت نوبت</span>
              </div>
            </div>
          </a>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 mb-16">
        <div className="block md:hidden relative overflow-hidden" id="mobileSliderContainerNew">
          <button id="nextBtnNew" className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-blue-600 text-white shadow-lg rounded-full p-3 ml-1 transition hover:bg-blue-700 border border-blue-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>

          <button id="prevBtnNew" className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-blue-600 text-white shadow-lg rounded-full p-3 mr-1 transition hover:bg-blue-700 border border-blue-700" style={{ display: 'none' }}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>

          <div id="sliderNew" className="flex gap-4 transition-transform duration-500 ease-in-out" style={{ transform: 'translateX(0px)' }}>
            <div className="min-w-[280px] flex flex-col items-center bg-white border border-[#E7E7E7] rounded-[10px] overflow-hidden flex-shrink-0">
              <div className="w-full h-[200px] relative" style={{ background: 'radial-gradient(104.67% 151.25% at 49.83% 17.25%, #FFFFFF 0%, #C6C6C6 100%)' }}>
                <img src="/images/dr11.png" alt="دکتر لعیا زنگنه" className="w-full h-full object-cover" />
  
              </div>
              <div className="flex flex-col items-end gap-1 w-full px-5 py-4">
                <div className="flex flex-row justify-between items-center w-full">
                  <span className="text-[16px] font-medium text-center text-black" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>دکتر لعیا زنگنه</span>
                  <div className="flex flex-row items-center gap-1">
                    <span className="text-[12px] font-normal text-[#888888]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>(۴۲ نظر)</span>
                    <div className="flex flex-row items-center">
                      <span className="text-[13px] text-[#FFB800]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>۴.۶</span>
                      <svg width="12" height="13" viewBox="0 0 12 13" fill="none">
                        <path d="M6 0.5l1.545 3.5L11.5 4.5 8.5 7.5l.5 4.5L6 10 3 12l.5-4.5L.5 4.5l3.955-.5L6 .5z" fill="#FFB800" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row justify-between items-center w-full">
                  <span className="text-[14px] font-normal text-[#6D6D6D]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>متخصص قلب و عروق</span>
                  <div className="flex flex-row items-center gap-1">
                    <span className="text-[12px] font-normal text-[#6D6D6D]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>تهران</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <ellipse cx="8" cy="6.5" rx="2.5" ry="2.5" stroke="#6D6D6D" strokeWidth="1" />
                      <path d="M8 14.5c-3-2.5-5.5-5.5-5.5-8a5.5 5.5 0 1111 0c0 2.5-2.5 5.5-5.5 8z" stroke="#6D6D6D" strokeWidth="1" />
                      <ellipse cx="8" cy="13.5" rx="4" ry="1.5" stroke="#6D6D6D" strokeWidth="1" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="w-full px-4 pb-4">
                <a href="/doctors/5" className="flex items-center justify-center px-[10px] py-[10px] w-full h-[42px] border border-[#4179F0] rounded-lg" style={{ textDecoration: 'none' }}>
                  <span className="text-[14px] font-medium text-[#4179F0]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>دریافت نوبت</span>
                </a>
              </div>
            </div>

            <div className="min-w-[280px] flex flex-col items-center bg-white border border-[#E7E7E7] rounded-[10px] overflow-hidden flex-shrink-0">
              <div className="w-full h-[200px] relative" style={{ background: 'radial-gradient(104.67% 151.25% at 49.83% 17.25%, #FFFFFF 0%, #C6C6C6 100%)' }}>
                <img src="/images/dr12.png" alt="دکتر یاشار پناهی" className="w-full h-full object-cover" />
  
              </div>
              <div className="flex flex-col items-end gap-1 w-full px-5 py-4">
                <div className="flex flex-row justify-between items-center w-full">
                  <span className="text-[16px] font-medium text-center text-black" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>دکتر یاشار پناهی</span>
                  <div className="flex flex-row items-center gap-1">
                    <span className="text-[12px] font-normal text-[#888888]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>(۱۸ نظر)</span>
                    <div className="flex flex-row items-center">
                      <span className="text-[13px] text-[#FFB800]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>۴.۹</span>
                      <svg width="12" height="13" viewBox="0 0 12 13" fill="none">
                        <path d="M6 0.5l1.545 3.5L11.5 4.5 8.5 7.5l.5 4.5L6 10 3 12l.5-4.5L.5 4.5l3.955-.5L6 .5z" fill="#FFB800" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row justify-between items-center w-full">
                  <span className="text-[14px] font-normal text-[#6D6D6D]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>متخصص روانشناسی بالینی</span>
                  <div className="flex flex-row items-center gap-1">
                    <span className="text-[12px] font-normal text-[#6D6D6D]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>تهران</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <ellipse cx="8" cy="6.5" rx="2.5" ry="2.5" stroke="#6D6D6D" strokeWidth="1" />
                      <path d="M8 14.5c-3-2.5-5.5-5.5-5.5-8a5.5 5.5 0 1111 0c0 2.5-2.5 5.5-5.5 8z" stroke="#6D6D6D" strokeWidth="1" />
                      <ellipse cx="8" cy="13.5" rx="4" ry="1.5" stroke="#6D6D6D" strokeWidth="1" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="w-full px-4 pb-4">
                <a href="/doctors/6" className="flex items-center justify-center px-[10px] py-[10px] w-full h-[42px] border border-[#4179F0] rounded-lg" style={{ textDecoration: 'none' }}>
                  <span className="text-[14px] font-medium text-[#4179F0]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>دریافت نوبت</span>
                </a>
              </div>
            </div>

            <div className="min-w-[280px] flex flex-col items-center bg-white border border-[#E7E7E7] rounded-[10px] overflow-hidden flex-shrink-0">
              <div className="w-full h-[200px] relative" style={{ background: 'radial-gradient(104.67% 151.25% at 49.83% 17.25%, #FFFFFF 0%, #C6C6C6 100%)' }}>
                <img src="/images/dr13.png" alt="دکتر زهرا سعادتی" className="w-full h-full object-cover" />
  
              </div>
              <div className="flex flex-col items-end gap-1 w-full px-5 py-4">
                <div className="flex flex-row justify-between items-center w-full">
                  <span className="text-[16px] font-medium text-center text-black" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>دکتر زهرا سعادتی</span>
                  <div className="flex flex-row items-center gap-1">
                    <span className="text-[12px] font-normal text-[#888888]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>(۳۵ نظر)</span>
                    <div className="flex flex-row items-center">
                      <span className="text-[13px] text-[#FFB800]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>۴.۴</span>
                      <svg width="12" height="13" viewBox="0 0 12 13" fill="none">
                        <path d="M6 0.5l1.545 3.5L11.5 4.5 8.5 7.5l.5 4.5L6 10 3 12l.5-4.5L.5 4.5l3.955-.5L6 .5z" fill="#FFB800" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row justify-between items-center w-full">
                  <span className="text-[14px] font-normal text-[#6D6D6D]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>متخصص گوش و حلق و بینی</span>
                  <div className="flex flex-row items-center gap-1">
                    <span className="text-[12px] font-normal text-[#6D6D6D]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>تهران</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <ellipse cx="8" cy="6.5" rx="2.5" ry="2.5" stroke="#6D6D6D" strokeWidth="1" />
                      <path d="M8 14.5c-3-2.5-5.5-5.5-5.5-8a5.5 5.5 0 1111 0c0 2.5-2.5 5.5-5.5 8z" stroke="#6D6D6D" strokeWidth="1" />
                      <ellipse cx="8" cy="13.5" rx="4" ry="1.5" stroke="#6D6D6D" strokeWidth="1" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="w-full px-4 pb-4">
                <a href="/doctors/7" className="flex items-center justify-center px-[10px] py-[10px] w-full h-[42px] border border-[#4179F0] rounded-lg" style={{ textDecoration: 'none' }}>
                  <span className="text-[14px] font-medium text-[#4179F0]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>دریافت نوبت</span>
                </a>
              </div>
            </div>

            <div className="min-w-[280px] flex flex-col items-center bg-white border border-[#E7E7E7] rounded-[10px] overflow-hidden flex-shrink-0">
              <div className="w-full h-[200px] relative" style={{ background: 'radial-gradient(104.67% 151.25% at 49.83% 17.25%, #FFFFFF 0%, #C6C6C6 100%)' }}>
                <img src="/images/dr14.png" alt="دکتر ماهان گروسی" className="w-full h-full object-cover" />
  
              </div>
              <div className="flex flex-col items-end gap-1 w-full px-5 py-4">
                <div className="flex flex-row justify-between items-center w-full">
                  <span className="text-[16px] font-medium text-center text-black" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>دکتر ماهان گروسی</span>
                  <div className="flex flex-row items-center gap-1">
                    <span className="text-[12px] font-normal text-[#888888]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>(۵۶ نظر)</span>
                    <div className="flex flex-row items-center">
                      <span className="text-[13px] text-[#FFB800]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>۵.۰</span>
                      <svg width="12" height="13" viewBox="0 0 12 13" fill="none">
                        <path d="M6 0.5l1.545 3.5L11.5 4.5 8.5 7.5l.5 4.5L6 10 3 12l.5-4.5L.5 4.5l3.955-.5L6 .5z" fill="#FFB800" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row justify-between items-center w-full">
                  <span className="text-[14px] font-normal text-[#6D6D6D]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>متخصص دندانپزشکی</span>
                  <div className="flex flex-row items-center gap-1">
                    <span className="text-[12px] font-normal text-[#6D6D6D]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>تهران</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <ellipse cx="8" cy="6.5" rx="2.5" ry="2.5" stroke="#6D6D6D" strokeWidth="1" />
                      <path d="M8 14.5c-3-2.5-5.5-5.5-5.5-8a5.5 5.5 0 1111 0c0 2.5-2.5 5.5-5.5 8z" stroke="#6D6D6D" strokeWidth="1" />
                      <ellipse cx="8" cy="13.5" rx="4" ry="1.5" stroke="#6D6D6D" strokeWidth="1" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="w-full px-4 pb-4">
                <a href="/doctors/8" className="flex items-center justify-center px-[10px] py-[10px] w-full h-[42px] border border-[#4179F0] rounded-lg" style={{ textDecoration: 'none' }}>
                  <span className="text-[14px] font-medium text-[#4179F0]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>دریافت نوبت</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-6 mb-8 md:mb-16">
        <div className="flex justify-between items-center mb-4 md:mb-8">
          <div>
            <h3 className="text-xl md:text-3xl font-bold">نظرات کاربران</h3>
            <p className="text-gray-500 text-xs md:text-sm mt-1">تجربه دیگران از پزشکان</p>
          </div>
          <a href="#"
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '10px 10px 10px 8px',
              gap: '6px',
              width: '120px',
              minWidth: '120px',
              height: '40px',
              borderRadius: '8px',
              fontFamily: "'Vazirmatn', sans-serif",
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '22px',
              textAlign: 'right',
              color: '#888888',
              textDecoration: 'none',
              boxSizing: 'border-box',
            }}
          >
            مشاهده همه
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M13 7L8 10L13 13" stroke="#888888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        <div className="hidden md:grid md:grid-cols-3 gap-6">
          <div className="flex flex-col items-end bg-white border border-[#E7E7E7] rounded-xl" style={{ padding: '24px', gap: '16px', width: '394.67px' }}>
            <div className="flex flex-row w-full" style={{ gap: '8px', height: '39px' }}>
              <img src="/images/Avatar1.png" alt="" className="w-7 h-7 rounded-full object-cover shrink-0" style={{ border: '1px solid #F0F5FE' }} />
              <div className="flex flex-col flex-1 justify-center" style={{ gap: '2px' }}>
                <div className="flex flex-row justify-between items-center w-full" style={{ gap: '7px' }}>
                  <span className="text-[16px] font-[500] text-[#3D3D3D]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>رها مرادی</span>
                  <span className="text-[11px] font-[400] text-[#888888]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>۱۴۰۳/۱۰/۲۰</span>
                </div>
                <div className="flex flex-row items-center" style={{ gap: '0px' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#D3D5E4"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#FFB800"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#FFB800"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#FFB800"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#FFB800"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                </div>
              </div>
            </div>
            <p className="text-[13px] font-[400] text-[#3D3D3D] text-right w-full leading-5" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>دکتر عالی هستند و تشخیصشون درست در اولین معاینه بیماری را تشخیص دادند و با تجویز یک نسخه درمان کردند.</p>
            <div className="flex flex-row justify-between items-center w-full" style={{ gap: '4px', height: '24px' }}>
              <span className="text-[12px] font-[400] text-[#888888]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>درباره دکتر زهرا وارسته</span>
              <button className="flex items-center justify-center text-[12px] font-[500] text-[#4179F0]" style={{ padding: '8px', height: '32px', minWidth: '72px', width: '80px', borderRadius: '6px', border: 'none', background: 'transparent', fontFamily: "'Vazirmatn', sans-serif" }}>مشاهده دکتر</button>
            </div>
          </div>

          <div className="flex flex-col items-end bg-white border border-[#E7E7E7] rounded-xl" style={{ padding: '24px', gap: '16px', width: '394.67px' }}>
            <div className="flex flex-row w-full" style={{ gap: '8px', height: '39px' }}>
              <img src="/images/Avatar2.png" alt="" className="w-7 h-7 rounded-full object-cover shrink-0" style={{ border: '1px solid #F0F5FE' }} />
              <div className="flex flex-col flex-1 justify-center" style={{ gap: '2px' }}>
                <div className="flex flex-row justify-between items-center w-full" style={{ gap: '7px' }}>
                  <span className="text-[16px] font-[500] text-[#3D3D3D]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>میترا</span>
                  <span className="text-[11px] font-[400] text-[#888888]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>۱۴۰۳/۰۹/۱۵</span>
                </div>
                <div className="flex flex-row items-center" style={{ gap: '0px' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#D3D5E4"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#FFB800"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#FFB800"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#FFB800"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#FFB800"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                </div>
              </div>
            </div>
            <p className="text-[13px] font-[400] text-[#3D3D3D] text-right w-full leading-5" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>نوبت‌دهی آنلاین خیلی راحت بود. پزشک متخصص و با تجربه‌ای بود. حتماً دوباره از خدمات استفاده می‌کنم.</p>
            <div className="flex flex-row justify-between items-center w-full" style={{ gap: '4px', height: '24px' }}>
              <span className="text-[12px] font-[400] text-[#888888]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>درباره دکتر بهنوش حسینی</span>
              <button className="flex items-center justify-center text-[12px] font-[500] text-[#4179F0]" style={{ padding: '8px', height: '32px', minWidth: '72px', width: '80px', borderRadius: '6px', border: 'none', background: 'transparent', fontFamily: "'Vazirmatn', sans-serif" }}>مشاهده دکتر</button>
            </div>
          </div>

          <div className="flex flex-col items-end bg-white border border-[#E7E7E7] rounded-xl" style={{ padding: '24px', gap: '16px', width: '394.67px' }}>
            <div className="flex flex-row w-full" style={{ gap: '8px', height: '39px' }}>
              <img src="/images/Avatar3.png" alt="" className="w-7 h-7 rounded-full object-cover shrink-0" style={{ border: '1px solid #F0F5FE' }} />
              <div className="flex flex-col flex-1 justify-center" style={{ gap: '2px' }}>
                <div className="flex flex-row justify-between items-center w-full" style={{ gap: '7px' }}>
                  <span className="text-[16px] font-[500] text-[#3D3D3D]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>حسن احمدی</span>
                  <span className="text-[11px] font-[400] text-[#888888]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>۱۴۰۳/۰۸/۲۸</span>
                </div>
                <div className="flex flex-row items-center" style={{ gap: '0px' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#D3D5E4"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#FFB800"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#FFB800"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#FFB800"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#FFB800"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                </div>
              </div>
            </div>
            <p className="text-[13px] font-[400] text-[#3D3D3D] text-right w-full leading-5" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>واقعاً راضی بودم. از همان ابتدای ورود تا پایان ویزیت، همه چیز عالی بود. پزشک بسیار دلسوز و مهربان.</p>
            <div className="flex flex-row justify-between items-center w-full" style={{ gap: '4px', height: '24px' }}>
              <span className="text-[12px] font-[400] text-[#888888]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>درباره دکتر علی راد</span>
              <button className="flex items-center justify-center text-[12px] font-[500] text-[#4179F0]" style={{ padding: '8px', height: '32px', minWidth: '72px', width: '80px', borderRadius: '6px', border: 'none', background: 'transparent', fontFamily: "'Vazirmatn', sans-serif" }}>مشاهده دکتر</button>
            </div>
          </div>
        </div>

        <div className="block md:hidden relative overflow-hidden" id="mobileSliderComments">
          <button id="nextBtnComments" className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-blue-600 text-white shadow-lg rounded-full p-3 ml-1 transition hover:bg-blue-700 border border-blue-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>

          <button id="prevBtnComments" className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-blue-600 text-white shadow-lg rounded-full p-3 mr-1 transition hover:bg-blue-700 border border-blue-700" style={{ display: 'none' }}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>

          <div id="sliderComments" className="flex gap-4 transition-transform duration-500 ease-in-out" style={{ transform: 'translateX(0px)' }}>
            <div className="flex flex-col items-end bg-white border border-[#E7E7E7] rounded-xl flex-shrink-0" style={{ padding: '24px', gap: '16px', minWidth: '280px' }}>
              <div className="flex flex-row w-full" style={{ gap: '8px', height: '39px' }}>
                <img src="/images/Avatar1.png" alt="" className="w-7 h-7 rounded-full object-cover shrink-0" style={{ border: '1px solid #F0F5FE' }} />
                <div className="flex flex-col flex-1 justify-center" style={{ gap: '2px' }}>
                  <div className="flex flex-row justify-between items-center w-full" style={{ gap: '7px' }}>
                    <span className="text-[16px] font-[500] text-[#3D3D3D]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>رها مرادی</span>
                    <span className="text-[11px] font-[400] text-[#888888]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>۱۴۰۳/۱۰/۲۰</span>
                  </div>
                  <div className="flex flex-row items-center" style={{ gap: '0px' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#D3D5E4"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#FFB800"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#FFB800"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#FFB800"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#FFB800"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                  </div>
                </div>
              </div>
              <p className="text-[13px] font-[400] text-[#3D3D3D] text-right w-full leading-5" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>دکتر عالی هستند و تشخیصشون درست در اولین معاینه بیماری را تشخیص دادند و با تجویز یک نسخه درمان کردند.</p>
              <div className="flex flex-row justify-between items-center w-full" style={{ gap: '4px', height: '24px' }}>
                <span className="text-[12px] font-[400] text-[#888888]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>درباره دکتر زهرا وارسته</span>
                <button className="flex items-center justify-center text-[12px] font-[500] text-[#4179F0]" style={{ padding: '8px', height: '32px', minWidth: '72px', width: '80px', borderRadius: '6px', border: 'none', background: 'transparent', fontFamily: "'Vazirmatn', sans-serif" }}>مشاهده دکتر</button>
              </div>
            </div>

            <div className="flex flex-col items-end bg-white border border-[#E7E7E7] rounded-xl flex-shrink-0" style={{ padding: '24px', gap: '16px', minWidth: '280px' }}>
              <div className="flex flex-row w-full" style={{ gap: '8px', height: '39px' }}>
                <img src="/images/Avatar2.png" alt="" className="w-7 h-7 rounded-full object-cover shrink-0" style={{ border: '1px solid #F0F5FE' }} />
                <div className="flex flex-col flex-1 justify-center" style={{ gap: '2px' }}>
                  <div className="flex flex-row justify-between items-center w-full" style={{ gap: '7px' }}>
                    <span className="text-[16px] font-[500] text-[#3D3D3D]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>میترا</span>
                    <span className="text-[11px] font-[400] text-[#888888]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>۱۴۰۳/۰۹/۱۵</span>
                  </div>
                  <div className="flex flex-row items-center" style={{ gap: '0px' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#D3D5E4"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#FFB800"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#FFB800"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#FFB800"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#FFB800"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                  </div>
                </div>
              </div>
              <p className="text-[13px] font-[400] text-[#3D3D3D] text-right w-full leading-5" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>نوبت‌دهی آنلاین خیلی راحت بود. پزشک متخصص و با تجربه‌ای بود. حتماً دوباره از خدمات استفاده می‌کنم.</p>
              <div className="flex flex-row justify-between items-center w-full" style={{ gap: '4px', height: '24px' }}>
                <span className="text-[12px] font-[400] text-[#888888]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>درباره دکتر بهنوش حسینی</span>
                <button className="flex items-center justify-center text-[12px] font-[500] text-[#4179F0]" style={{ padding: '8px', height: '32px', minWidth: '72px', width: '80px', borderRadius: '6px', border: 'none', background: 'transparent', fontFamily: "'Vazirmatn', sans-serif" }}>مشاهده دکتر</button>
              </div>
            </div>

            <div className="flex flex-col items-end bg-white border border-[#E7E7E7] rounded-xl flex-shrink-0" style={{ padding: '24px', gap: '16px', minWidth: '280px' }}>
              <div className="flex flex-row w-full" style={{ gap: '8px', height: '39px' }}>
                <img src="/images/Avatar3.png" alt="" className="w-7 h-7 rounded-full object-cover shrink-0" style={{ border: '1px solid #F0F5FE' }} />
                <div className="flex flex-col flex-1 justify-center" style={{ gap: '2px' }}>
                  <div className="flex flex-row justify-between items-center w-full" style={{ gap: '7px' }}>
                    <span className="text-[16px] font-[500] text-[#3D3D3D]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>حسن احمدی</span>
                    <span className="text-[11px] font-[400] text-[#888888]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>۱۴۰۳/۰۸/۲۸</span>
                  </div>
                  <div className="flex flex-row items-center" style={{ gap: '0px' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#D3D5E4"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#FFB800"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#FFB800"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#FFB800"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#FFB800"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                  </div>
                </div>
              </div>
              <p className="text-[13px] font-[400] text-[#3D3D3D] text-right w-full leading-5" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>واقعاً راضی بودم. از همان ابتدای ورود تا پایان ویزیت، همه چیز عالی بود. پزشک بسیار دلسوز و مهربان.</p>
              <div className="flex flex-row justify-between items-center w-full" style={{ gap: '4px', height: '24px' }}>
                <span className="text-[12px] font-[400] text-[#888888]" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>درباره دکتر علی راد</span>
                <button className="flex items-center justify-center text-[12px] font-[500] text-[#4179F0]" style={{ padding: '8px', height: '32px', minWidth: '72px', width: '80px', borderRadius: '6px', border: 'none', background: 'transparent', fontFamily: "'Vazirmatn', sans-serif" }}>مشاهده دکتر</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="max-w-[1216px] mx-auto px-4 md:px-[112px] mb-8 md:mb-16" style={{ marginTop: '60px' }}>
        <h2 className="text-[24px] font-medium text-[#2E2E2E] leading-[38px] text-right mb-[32px]">سوالات متداول</h2>

        <div className="flex flex-row justify-end items-start p-[20px] gap-[40px] border-[1.5px] border-[#F0F0F0] rounded-[16px] bg-white">
          <div className="flex flex-col items-end w-full rounded-[16px] bg-white">
            {[
              { q: 'چگونه می‌توانم نوبت رزرو کنم؟', a: 'پس از پیدا کردن پزشک مورد نظر، بر روی دکمه "رزرو نوبت" کلیک کنید. سپس، تاریخ و ساعت مورد نظر خود را از تقویم پزشک انتخاب کنید و اطلاعات خود را وارد کنید. پس از تایید، نوبت شما ثبت خواهد شد و پیامک تایید برای شما ارسال می‌شود.' },
              { q: 'چگونه می‌توانم پزشک مورد نظرم را پیدا کنم؟', a: 'برای پیدا کردن پزشک مورد نظر خود می‌توانید از بخش جستجو در بالای صفحه استفاده کنید. نام پزشک، تخصص یا نام بیمارستان را وارد کنید تا نتایج مرتبط به شما نمایش داده شود. همچنین می‌توانید از فیلترهای تخصص، شهر و بیمه برای دقیق‌تر کردن جستجو استفاده کنید.' },
              { q: 'چگونه می‌توانم نوبت خود را لغو یا جابجا کنم؟', a: 'برای لغو یا جابجایی نوبت خود، وارد پنل کاربری شوید و از بخش "نوبت‌های من" گزینه مورد نظر را انتخاب کنید. امکان لغو نوبت تا ۲۴ ساعت قبل از زمان ویزیت وجود دارد.' },
              { q: 'آیا می‌توانم برای شخص دیگری نوبت رزرو کنم؟', a: 'بله، شما می‌توانید برای اعضای خانواده یا دوستان خود نوبت رزرو کنید. در مرحله ثبت اطلاعات، گزینه "رزرو برای شخص دیگر" را انتخاب کنید و اطلاعات کامل بیمار را وارد نمایید.' },
              { q: 'چگونه می‌توانم هزینه ویزیت را پرداخت کنم؟', a: 'شما می‌توانید هزینه ویزیت را به صورت آنلاین و از طریق درگاه پرداخت امن سایت پرداخت کنید. همچنین امکان پرداخت حضوری در مطب پزشک نیز وجود دارد.' },
              { q: 'چگونه می‌توانم نزدیک‌ترین پزشک به محل سکونت خود را پیدا کنم؟', a: 'در بخش جستجوی پزشک، می‌توانید شهر و منطقه مورد نظر خود را انتخاب کنید. همچنین با فعال کردن گزینه "نزدیک‌ترین پزشکان" لیست پزشکان بر اساس فاصله از موقعیت شما نمایش داده می‌شود.' },
              { q: 'آیا می‌توانم نسخه‌های الکترونیکی خود را از طریق وبسایت دریافت کنم؟', a: 'بله، پس از ویزیت آنلاین یا حضوری، نسخه الکترونیکی شما در پنل کاربری قابل مشاهده است. می‌توانید آن را دانلود کرده یا از طریق سیستم به داروخانه مورد نظر ارسال کنید.' },
            ].map((item, idx) => {
              const isOpen = openFaq === idx
              return (
              <div key={idx} className="flex flex-row justify-end items-start p-[24px_20px] gap-[12px] w-full border-b border-[#F2F2F2]">
                <div className="flex flex-col justify-center items-end gap-[12px] flex-1">
                  <div className="w-full text-[16px] font-medium text-black leading-[25px] text-right cursor-pointer select-none" onClick={() => setOpenFaq(isOpen ? null : idx)}>
                    {item.q}
                  </div>
                  <div className={`w-full text-[14px] font-normal text-[#5C5C5C] leading-[28px] text-right overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    {item.a}
                  </div>
                </div>
                <svg className="w-[20px] h-[20px] flex-shrink-0 transition-transform duration-300" viewBox="0 0 20 20" fill="none" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                  <path d="M5 7.5l5 5 5-5" stroke="#5C5C5C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 md:px-6 mb-8 md:mb-16">
        <div className="flex justify-between items-center mb-4 md:mb-8">
          <div>
            <h3 className="text-xl md:text-4xl font-bold">آخرین مقالات</h3>
            <p className="text-gray-500 text-xs md:text-sm mt-1">مطالب مفید و علمی در حوزه سلامت</p>
          </div>
          <a href="#"
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '10px 10px 10px 8px',
              gap: '6px',
              width: '120px',
              minWidth: '120px',
              height: '40px',
              borderRadius: '8px',
              fontFamily: "'Vazirmatn', sans-serif",
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '22px',
              textAlign: 'right',
              color: '#888888',
              textDecoration: 'none',
              boxSizing: 'border-box',
            }}
          >
            مشاهده همه
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M13 7L8 10L13 13" stroke="#888888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 group">
            <div className="relative overflow-hidden">
              <img src="/images/heart (2).png" alt="مشکلات قلبی" className="w-full h-52 object-cover group-hover:scale-105 transition duration-500" />
              <span className="absolute top-3 right-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full">پزشکی</span>
              <span className="absolute bottom-3 left-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full">📅 ۱۴۰۳/۰۸/۱۵</span>
            </div>
            <div className="p-5">
              <h4 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition line-clamp-2">نشانه هشدار دهنده مشکلات قلبی</h4>
              <p className="text-gray-500 text-sm mb-4 line-clamp-2">اگر این ۱۰ نشانه را داشتید حتماً به پزشک مراجعه کنید...</p>
              <a href="#" className="text-blue-600 font-medium text-sm hover:text-blue-800 transition flex items-center gap-1">
                ادامه مطلب
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </div>

          <div className="bg-white rounded-2xl border overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 group">
            <div className="relative overflow-hidden">
              <img src="/images/ghand.png" alt="دیابت" className="w-full h-52 object-cover group-hover:scale-105 transition duration-500" />
              <span className="absolute top-3 right-3 bg-green-600 text-white text-xs px-3 py-1 rounded-full">تغذیه</span>
              <span className="absolute bottom-3 left-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full">📅 ۱۴۰۳/۰۸/۱۰</span>
            </div>
            <div className="p-5">
              <h4 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition line-clamp-2">گام ساده برای پیشگیری از دیابت</h4>
              <p className="text-gray-500 text-sm mb-4 line-clamp-2">۵ گام ساده برای پیشگیری از دیابت نوع ۲...</p>
              <a href="#" className="text-blue-600 font-medium text-sm hover:text-blue-800 transition flex items-center gap-1">
                ادامه مطلب
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </div>

          <div className="bg-white rounded-2xl border overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 group">
            <div className="relative overflow-hidden">
              <img src="/images/doctor.png" alt="پزشک مناسب" className="w-full h-52 object-cover group-hover:scale-105 transition duration-500" />
              <span className="absolute top-3 right-3 bg-purple-600 text-white text-xs px-3 py-1 rounded-full">راهنما</span>
              <span className="absolute bottom-3 left-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full">📅 ۱۴۰۳/۰۸/۰۵</span>
            </div>
            <div className="p-5">
              <h4 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition line-clamp-2">چگونه بهترین دکتر را برای نیازهای خود پیدا کنیم؟</h4>
              <p className="text-gray-500 text-sm mb-4 line-clamp-2">رزرو بهترین دکتر نیازمند یک سری پیشنهادات است که باید بدانید...</p>
              <a href="#" className="text-blue-600 font-medium text-sm hover:text-blue-800 transition flex items-center gap-1">
                ادامه مطلب
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <BottomNav />
    </>
  )
}
