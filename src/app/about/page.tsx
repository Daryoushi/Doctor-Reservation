'use client'

import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import BottomNav from '@/app/components/BottomNav'

const benefits = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="13.33" stroke="#000" strokeWidth="1.5" fill="none"/>
        <path d="M10.67 16l3.33 3.33 7.33-7.33" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>
    ),
    title: 'مدیریت هوشمند',
    desc: 'مدیریت هوشمند زمان و نوبت‌ها',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="2.67" y="3.33" width="26.67" height="24" rx="3" stroke="#000" strokeWidth="1.5" fill="none"/>
        <path d="M10.67 16l4 4 8-8" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>
    ),
    title: 'رزرو نوبت با اطمینان',
    desc: 'رزرو نوبت با اطمینان و اعتماد کامل',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="13.33" stroke="#000" strokeWidth="1.5" fill="none" transform="matrix(-1,0,0,1,32,0)"/>
        <path d="M16 10.67V16l4 4" stroke="#000" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      </svg>
    ),
    title: 'دسترسی ۲۴ ساعته',
    desc: 'دسترسی به پزشکان در هر ساعت از شبانه‌روز',
  },
]

const contactCards = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" transform="matrix(-1,0,0,1,24,0)">
        <rect x="5" y="2" width="14" height="20" rx="3" stroke="#3D3D3D" strokeWidth="1.5" fill="none"/>
        <line x1="11" y1="19" x2="13" y2="19" stroke="#3D3D3D" strokeWidth="1.5"/>
        <line x1="9" y1="2" x2="15" y2="2" stroke="#3D3D3D" strokeWidth="1.5"/>
      </svg>
    ),
    numbers: ['۰۹۱۲ ۳۴۵ ۶۷۸۹', '۰۲۱-۷۷ ۴۲۵۸۶۷'],
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="5" y="2" width="14" height="20" rx="3" stroke="#3D3D3D" strokeWidth="1.5" fill="none"/>
        <line x1="11" y1="19" x2="13" y2="19" stroke="#3D3D3D" strokeWidth="1.5"/>
        <line x1="9" y1="2" x2="15" y2="2" stroke="#3D3D3D" strokeWidth="1.5"/>
      </svg>
    ),
    numbers: ['info@doctorrezoo.com', '۰۹۱۲ ۳۴۵ ۶۷۹۰'],
  },
]

const achievements = [
  { number: '۵۰+', label: 'پزشک متخصص' },
  { number: '۱۵۰۰۰+', label: 'نوبت موفق' },
  { number: '۸۰۰۰+', label: 'کاربر فعال' },
  { number: '۹۸%', label: 'رضایت کاربران' },
  { number: '۴.۸', label: 'امتیاز کاربران' },
]

const teamMembers = [
  { name: 'Abalfazl Daryoushi', role: 'Developer', image: '/images/team1.jpg' },
  { name: 'Mohamad Reza Abiri', role: 'UI/UX Designer', image: '/images/team2.jpg' },
  { name: 'Mehdi Zarei', role: 'UI/UX Designer', image: '/images/team3.jpg' },
  { name: 'Zahra Moradian', role: 'UI/UX Designer', image: '/images/team4.jpg' },
  { name: 'Majid Borhani', role: 'UI/UX Designer', image: '/images/team5.jpg' },
  { name: 'Reza Sherafat', role: 'UI/UX Designer', image: '/images/team6.jpg' },
]

function TeamCard({ name, role, image }: { name: string; role: string; image: string }) {
  return (
    <div className="w-full md:w-[308px] bg-white border border-[#E7E7E7] rounded-[20px] p-4 flex flex-col items-center gap-5">
      <div className="w-full md:w-[276px] h-[200px] md:h-[277px] rounded-[16px] bg-gradient-to-br from-[#DBD7D2] to-[#EADFEF] flex items-center justify-center text-[32px] md:text-[40px] text-[#4179F0] font-bold">
        {name.split(' ').map(w => w[0]).join('')}
      </div>
      <div className="w-full flex flex-col items-start">
        <div className="text-[22px] md:text-[26px] font-bold text-black leading-[31px]" style={{ fontFamily: "'Sofia Sans', sans-serif" }}>{name}</div>
        <div className="text-[16px] md:text-[18px] font-medium text-[#5D5D5D] leading-[22px]" style={{ fontFamily: "'Sofia Sans', sans-serif" }}>{role}</div>
      </div>
    </div>
  )
}

export default function AboutPage() {
  return (
    <div className="bg-[#FCFCFC]" style={{ fontFamily: "'Vazirmatn', sans-serif", minHeight: '100vh' }}>
      <Header />

      {/* Hero Section */}
      <section className="max-w-[1216px] mx-auto px-4" style={{ paddingTop: '24px' }}>
        <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-[43px]">
          <img src="/Frame%201361017071.svg" alt="دکتر رزرو" className="w-full lg:w-auto max-w-[696px]" />
          <div className="flex flex-col items-end gap-[17px] w-full lg:w-[352px]">
            <h1 className="text-[20px] md:text-[24px] font-bold text-black leading-[150%] text-right w-full">درباره دکتر رزرو</h1>
            <h2 className="text-[18px] md:text-[20px] font-bold text-black leading-[150%] text-right w-full">نوبت‌دهی سریع و هوشمند برای پزشکان و بیماران</h2>
            <p className="text-[15px] md:text-[18px] font-normal text-black leading-[150%] text-justify w-full">
              دکتر رزرو یک پلتفرم مدرن و کاربرپسند برای مدیریت نوبت‌دهی پزشکان و بیماران است. ما با ارائه یک سیستم هوشمند، به پزشکان کمک می‌کنیم تا زمان‌های خود را بهتر مدیریت کنند و به بیماران این امکان را می‌دهیم که بدون اتلاف وقت، نوبت خود را به‌صورت آنلاین رزرو کنند.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-[1216px] mx-auto px-4" style={{ paddingTop: '64px' }}>
        <h2 className="text-[20px] md:text-[24px] font-bold text-black leading-[150%] text-right mb-4 md:mb-6">چرا دکتر رزرو؟</h2>
        <div className="flex flex-col lg:flex-row items-center gap-3 md:gap-4">
          {benefits.map((b, i) => (
            <div key={i} className="w-full lg:w-[394.67px] bg-white border border-[#E7E7E7] rounded-[10px] flex flex-row justify-end items-center p-4 md:p-10 gap-3">
              {b.icon}
              <div className="flex flex-col justify-center items-end gap-1">
                <div className="text-[16px] md:text-[18px] font-medium text-black leading-[28px] text-right">{b.title}</div>
                <div className="text-[12px] md:text-[13px] font-normal text-[#454545] leading-[20px] text-right">{b.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Info */}
      <section className="max-w-[1216px] mx-auto px-4" style={{ paddingTop: '64px' }}>
        <h2 className="text-[20px] md:text-[24px] font-bold text-black leading-[150%] text-right mb-4 md:mb-6">اطلاعات تماس</h2>
        <div className="flex flex-col lg:flex-row items-center gap-3 md:gap-4">
          {contactCards.map((card, i) => (
            <div key={i} className="w-full lg:w-[600px] bg-white border border-[#E7E7E7] rounded-[10px] flex flex-row justify-end items-center p-4 md:p-10 gap-3">
              <div className="flex flex-row justify-between items-center w-full">
                <div className="text-[16px] md:text-[18px] font-medium text-black leading-[28px] text-right whitespace-nowrap">
                  {i === 0 ? 'شماره تماس' : 'ایمیل و موبایل'}
                </div>
                <div className="flex flex-row justify-end items-center gap-2">
                  {card.icon}
                  <div className="flex flex-col items-end">
                    {card.numbers.map((num, j) => (
                      <div key={j} className="text-[14px] md:text-[18px] font-medium text-black leading-[28px] text-right">{num}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Technology */}
      <section className="max-w-[1146px] mx-auto px-4 flex flex-col lg:flex-row items-center gap-8 md:gap-[146px]" style={{ paddingTop: '64px' }}>
        <div className="order-2 lg:order-1">
          <img src="/Frame%201361017074.svg" alt="تکنولوژی در خدمت سلامت" className="w-full max-w-[300px] md:max-w-[400px]" />
        </div>
        <div className="flex flex-col items-end gap-[31px] w-full lg:w-[502px] order-1 lg:order-2">
          <h2 className="text-[20px] md:text-[24px] font-bold text-black leading-[150%] text-right w-full">تکنولوژی در خدمت سلامت</h2>
          <p className="text-[15px] md:text-[18px] font-normal text-black leading-[150%] text-justify w-full">
            ما با استفاده از فناوری‌های روز، فرایند نوبت‌دهی پزشکی را به سطحی جدید ارتقا داده‌ایم. دکتر رزرو با بهره‌گیری از الگوریتم‌های هوشمند، سیستم یادآوری خودکار و داده‌های ایمن‌شده، بستری مطمئن و سریع برای دریافت خدمات پزشکی فراهم کرده است. طراحی کاربرپسند و دسترسی آسان به اطلاعات، باعث شده تا بیماران بدون پیچیدگی‌های اضافی و در کمترین زمان، نوبت موردنظر خود را رزرو کنند. همچنین، پزشکان می‌توانند با مدیریت دقیق‌تر زمان‌های خود، بهره‌وری بیشتری داشته باشند. با دکتر رزرو، نوبت‌دهی دیگر یک چالش نیست، بلکه تجربه‌ای راحت، سریع و بدون دغدغه است.
          </p>
        </div>
      </section>

      {/* Achievements */}
      <section className="max-w-[1197px] mx-auto px-4" style={{ paddingTop: '64px' }}>
        <h2 className="text-[20px] md:text-[24px] font-bold text-black leading-[150%] text-right mb-4 md:mb-6">افتخارات و دستاوردهای ما</h2>
        <div className="grid grid-cols-2 md:flex md:flex-wrap items-center justify-center gap-4 md:gap-7">
          {achievements.map((a, i) => (
            <div key={i} className="w-full md:w-[217px] bg-white border border-[#E7E7E7] rounded-[10px] flex flex-col justify-center items-center p-6 md:p-10 gap-3">
              <div className="text-[18px] md:text-[20px] font-bold text-black leading-[120%] text-center">{a.number}</div>
              <div className="text-[14px] md:text-[18px] font-medium text-[#5D5D5D] leading-[28px] text-center">{a.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="max-w-[1119px] mx-auto px-4" style={{ paddingTop: '64px', paddingBottom: '80px' }}>
        <h2 className="text-[20px] md:text-[24px] font-bold text-black leading-[150%] text-center mb-8 md:mb-[59px]">تیم ما</h2>
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
          {teamMembers.map((m, i) => (
            <TeamCard key={i} {...m} />
          ))}
        </div>
      </section>

      <Footer />
      <BottomNav />
    </div>
  )
}
