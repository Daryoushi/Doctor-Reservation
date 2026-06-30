'use client'

export default function Footer() {
  return (
    <footer
      id="footer"
      className="bg-white w-full"
      style={{
        padding: '40px 16px 32px',
        borderRadius: '32px 32px 0px 0px',
      }}
    >
      <div className="max-w-[1200px] mx-auto flex flex-col gap-[24px] md:gap-[27px]">
        {/* Main sections - stack on mobile */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-4">
          {/* مشترک شوید */}
          <div
            className="flex flex-col justify-center items-end p-4 md:p-6 gap-3 w-full md:w-[370.79px] order-1"
            style={{
              background: 'rgba(32, 60, 134, 0.03)',
              borderRadius: '12px',
            }}
          >
            <span className="text-[14px] md:text-[16px] font-normal text-[#0A142F] leading-[28px] text-right w-full">
              با عضویت در خبرنامه از جدیدترین خدمات آگاه شوید
            </span>
            <div className="relative w-full max-w-[306.79px]">
              <input
                type="email"
                placeholder="ایمیل خود را وارد کنید"
                className="w-full h-[43px] bg-white border border-[#E7E8F2] rounded-[6px] text-right pr-3 pl-14 text-[13px] md:text-[14px] font-normal text-[#0A142F] opacity-60 outline-none"
                style={{ fontFamily: "'Vazirmatn', sans-serif" }}
              />
              <button
                className="absolute left-0 top-0 h-full flex items-center justify-center"
                style={{
                  width: '73px',
                  background: '#4179F0',
                  borderRadius: '6px',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M19 12H5M11 18l-6-6 6-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <span
              className="text-[12px] md:text-[14px] font-normal leading-[28px] text-right opacity-60 w-full"
              style={{ color: '#4F4F4F', fontFamily: "'Vazirmatn', sans-serif" }}
            >
              با دکتر رزرو، نوبت‌دهی سریع و هوشمند را تجربه کنید.
            </span>
          </div>

          {/* Links row */}
          <div className="flex flex-row justify-between md:justify-end items-start gap-8 md:gap-16 w-full md:w-auto order-2">
            {/* لینک‌های سریع */}
            <div className="flex flex-col gap-[5px]">
              <span className="text-[14px] md:text-[16px] font-bold text-[#3D3D3D] leading-[25px]">لینک‌های سریع</span>
              <a href="/" className="text-[12px] font-normal text-[#3D3D3D] opacity-50 leading-[19px] text-right no-underline hover:opacity-100 transition">صفحه اصلی</a>
              <a href="/doctors" className="text-[12px] font-normal text-[#3D3D3D] opacity-50 leading-[19px] text-right no-underline hover:opacity-100 transition">لیست پزشکان</a>
              <a href="/faq" className="text-[12px] font-normal text-[#3D3D3D] opacity-50 leading-[19px] text-right no-underline hover:opacity-100 transition">سوالات متداول</a>
              <a href="/about" className="text-[12px] font-normal text-[#3D3D3D] opacity-50 leading-[19px] text-right no-underline hover:opacity-100 transition">درباره ما</a>
              <a href="#footer" className="text-[12px] font-normal text-[#3D3D3D] opacity-50 leading-[19px] text-right no-underline hover:opacity-100 transition">تماس با ما</a>
            </div>

            {/* اطلاعات حقوقی */}
            <div className="flex flex-col justify-center items-end gap-2">
              <span className="text-[14px] md:text-[15px] font-bold text-[#3D3D3D] leading-[23px] text-right w-full">اطلاعات حقوقی</span>
              <span className="text-[12px] font-normal text-[#3D3D3D] opacity-50 leading-[19px] w-full">درباره ما</span>
              <span className="text-[12px] font-normal text-[#3D3D3D] opacity-50 leading-[19px] text-right w-full">فرصت‌های شغلی</span>
              <span className="text-[12px] font-normal text-[#3D3D3D] opacity-50 leading-[19px] text-right w-full">حریم خصوصی</span>
              <span className="text-[12px] font-normal text-[#3D3D3D] opacity-50 leading-[19px] text-right w-full">شرایط استفاده</span>
            </div>

            {/* اطلاعات تماس */}
            <div className="flex flex-col items-center gap-[5px]">
              <span className="text-[14px] md:text-[15px] font-bold text-[#3D3D3D] leading-[23px] self-stretch">اطلاعات تماس</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" transform="matrix(-1,0,0,1,0,0)">
                <rect x="5" y="2" width="14" height="20" rx="3" stroke="#3D3D3D" strokeWidth="1.5" fill="none" />
                <line x1="11" y1="19" x2="13" y2="19" stroke="#3D3D3D" strokeWidth="1.5" />
                <line x1="9" y1="2" x2="15" y2="2" stroke="#3D3D3D" strokeWidth="1.5" />
              </svg>
              <span className="text-[12px] font-normal text-center text-[#3D3D3D] opacity-50 leading-[19px] self-stretch">۰۹۱۲ ۳۴۵ ۶۷۸۹</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" transform="matrix(-1,0,0,1,0,0)">
                <rect x="5" y="2" width="14" height="20" rx="3" stroke="#3D3D3D" strokeWidth="1.5" fill="none" />
                <line x1="11" y1="19" x2="13" y2="19" stroke="#3D3D3D" strokeWidth="1.5" />
                <line x1="9" y1="2" x2="15" y2="2" stroke="#3D3D3D" strokeWidth="1.5" />
              </svg>
              <span className="text-[12px] font-normal text-center text-[#3D3D3D] opacity-50 leading-[19px] self-stretch">۰۲۱-۷۷ ۴۲۵۸۶۷</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            width: '100%',
            height: '3px',
            background: '#0A142F',
            opacity: 0.06,
            border: '1px solid #0A142F',
          }}
        />

        {/* Bottom: Logo (right) + Social icons (left) */}
        <div className="flex flex-row justify-between items-center w-full">
          {/* Social icons */}
          <div className="flex flex-row items-center gap-2 md:gap-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="cursor-pointer">
              <rect x="2" y="2" width="20" height="20" rx="4" stroke="#141B34" strokeWidth="1.5" fill="none" />
              <path d="M7 10v7M7 7.5v.01M11 17v-4.5c0-1 .8-1.8 1.8-1.8s1.8.8 1.8 1.8V17" stroke="#141B34" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M7 10h4v7H7z" fill="none" />
              <circle cx="7.5" cy="7.5" r="1.5" fill="#141B34" />
            </svg>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="cursor-pointer">
              <path d="M21 5L2 12.5l7 1.5L18 8l-5.5 6.5 4 3L21 5z" stroke="#141B34" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
            </svg>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="cursor-pointer">
              <rect x="2" y="2" width="20" height="20" rx="5" stroke="#141B34" strokeWidth="1.5" fill="none" />
              <circle cx="12" cy="12" r="5" stroke="#141B34" strokeWidth="1.5" fill="none" />
              <circle cx="17.5" cy="6.5" r="1.5" fill="#141B34" />
            </svg>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="cursor-pointer">
              <path d="M21 11.5C21 6.81 17.19 3 12.5 3S4 6.81 4 11.5c0 2.76 1.28 5.26 3.3 6.88l-.83 2.54 2.9-1.54c.96.29 1.98.44 3.03.44 4.69 0 8.5-3.81 8.5-8.5z" stroke="#141B34" strokeWidth="1.5" fill="none" />
            </svg>
          </div>

          {/* Logo */}
          <div className="flex flex-row items-center gap-2 md:gap-4">
            <span className="text-[18px] md:text-[24px] font-bold text-black leading-[110%] flex items-center text-center" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>
              <img src="/images/Logo.svg" alt="دکتر رزرو" className="w-[24px] md:w-[30.62px] h-[22px] md:h-[28px]" />
              دکتر رزرو
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
