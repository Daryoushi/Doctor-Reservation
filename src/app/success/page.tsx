'use client'

export default function SuccessPage() {
  return (
    <div className="bg-white flex items-center justify-center min-h-screen" style={{ fontFamily: "'Vazirmatn', sans-serif" }}>
      <div className="bg-white rounded-[12px] border border-[#E7E7E7] w-[472px] max-w-[90vw] text-center shadow-xl" style={{ boxShadow: '0px 8px 32px 0px rgba(0,0,0,0.16)' }}>
        <div className="px-10 py-10">
          <div className="w-[58px] h-[58px] rounded-full bg-[#0B9D4E] flex items-center justify-center mx-auto mb-6">
            <svg width="24" height="18" viewBox="0 0 24 18" fill="none">
              <path d="M8 13.2L3.6 8.8L2 10.4L8 16.4L22 2.4L20.4 0.8L8 13.2Z" fill="white"/>
            </svg>
          </div>
          <h3 className="text-[16px] font-semibold text-[#262626] mb-2" style={{ lineHeight: '24px' }}>تراکنش موفق</h3>
          <p className="text-[14px] font-medium text-[#888888] mb-8" style={{ lineHeight: '21px' }}>نوبت شما با موفقیت رزرو شد</p>

          <div className="flex justify-center gap-4">
            <a
              href="/appointments"
              className="inline-flex items-center justify-center border border-[#4179F0] text-[#4179F0] w-[152px] h-[40px] rounded-[8px] font-medium text-[14px] hover:bg-[#F0F5FE] transition"
            >
              مشاهده نوبت ها
            </a>
            <a
              href="/"
              className="inline-flex items-center justify-center bg-[#4179F0] text-white w-[152px] h-[40px] rounded-[8px] font-medium text-[14px] hover:bg-[#3568D6] transition"
            >
              بازگشت به خانه
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
