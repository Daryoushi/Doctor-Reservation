'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '@/app/components/Header'
import Footer from '@/app/components/Footer'
import BottomNav from '@/app/components/BottomNav'

const doctorsData = [
  { id: 1, name: 'دکتر زهرا وارسته', specialty: 'متخصص قلب و عروق', image: '/images/dr1.jpg', address: 'تهران، ستارخان، خیابان هفتم، پلاک ۴۰', rating: 4, reviews: 105, firstSlot: 'دوشنبه ۲۴ دی', city: 'تهران', gender: 'زن', code: '۴۰۲۲۳', insurance: 'تامین اجتماعی', experience: 12, hasAvailableSlot: true, onlineVisit: true, inPersonBooking: true, province: 'تهران' },
  { id: 2, name: 'دکتر علی راد', specialty: 'متخصص ریه', image: '/images/dr2.jpg', address: 'تهران، هفت تیر، خیابان بهارشیراز، پلاک ۳۶', rating: 4, reviews: 105, firstSlot: 'دوشنبه ۲۴ دی', city: 'تهران', gender: 'مرد', code: '۵۹۳۰۲', insurance: 'سلامت', experience: 8, hasAvailableSlot: true, onlineVisit: false, inPersonBooking: true, province: 'تهران' },
  { id: 3, name: 'دکتر بهنوش حسینی', specialty: 'جراح گوش حلق بینی', image: '/images/dr3.png', address: 'تهران، پیروزی، خیابان کوکاکولا، کوچه احمدی ساختمان پزشکان شفا', rating: 4, reviews: 105, firstSlot: 'دوشنبه ۲۴ دی', city: 'تهران', gender: 'زن', code: '۹۰۳۵۶', insurance: 'تامین اجتماعی', experience: 15, hasAvailableSlot: false, onlineVisit: true, inPersonBooking: false, province: 'تهران' },
  { id: 4, name: 'دکتر یاشار پناهی', specialty: 'متخصص روانشناس بالینی', image: '/images/dr4.png', address: 'تهران، ونک، خیابان ملاصدرا، کوچه صائب تبریزی غربی', rating: 4, reviews: 105, firstSlot: 'دوشنبه ۲۴ دی', city: 'تهران', gender: 'مرد', code: '۹۴۰۲۳', insurance: 'خدمات درمانی', experience: 6, hasAvailableSlot: true, onlineVisit: true, inPersonBooking: true, province: 'تهران' },
  { id: 5, name: 'دکتر زهرا سعادتی', specialty: 'متخصص گوش و حلق و بینی', image: '/images/dr11.png', address: 'تهران، ستارخان، خیابان هفتم، پلاک ۴۰', rating: 4, reviews: 105, firstSlot: 'دوشنبه ۲۴ دی', city: 'تهران', gender: 'زن', code: '۴۰۲۲۳', insurance: 'نیروهای مسلح', experience: 3, hasAvailableSlot: false, onlineVisit: false, inPersonBooking: true, province: 'تهران' },
  { id: 6, name: 'دکتر علی وارسته', specialty: 'متخصص ارتوپدی', image: '/images/dr12.png', address: 'تهران، ستارخان، خیابان هفتم، پلاک ۴۰', rating: 4, reviews: 105, firstSlot: 'دوشنبه ۲۴ دی', city: 'تهران', gender: 'مرد', code: '۴۰۲۲۳', insurance: 'تامین اجتماعی', experience: 20, hasAvailableSlot: true, onlineVisit: false, inPersonBooking: false, province: 'تهران' },
]

const allSpecialties = ['عمومی', 'دندانپزشکی', 'قلب و عروق', 'ریه', 'گوش و حلق و بینی']
const allInsurance = ['تامین اجتماعی', 'سلامت', 'خدمات درمانی', 'نیروهای مسلح']
const experienceRanges = ['۱-۵ سال', '۵-۱۰ سال', '۱۰-۱۵ سال', '۱۵+ سال']
const provinceList = ['تهران', 'کرمان']
const citiesByProvince: Record<string, string[]> = {
  'تهران': ['تهران', 'ری', 'شمیرانات', 'اسلامشهر', 'شهریار'],
  'کرمان': ['کرمان', 'رفسنجان', 'سیرجان', 'بم', 'جیرفت'],
}
const appointmentStatusOptions = ['پزشکان دارای نوبت خالی', 'امکان ویزیت آنلاین', 'امکان رزرو حضوری']

export default function DoctorsPage() {
  const [searchText, setSearchText] = useState('')
  const [sort, setSort] = useState('default')
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([])
  const [selectedInsurance, setSelectedInsurance] = useState<string[]>([])
  const [selectedExperience, setSelectedExperience] = useState('')
  const [appointmentFilters, setAppointmentFilters] = useState<string[]>([])
  const [selectedProvince, setSelectedProvince] = useState('')
  const [selectedCities, setSelectedCities] = useState<string[]>([])
  const [selectedGender, setSelectedGender] = useState('')
  const [specialtyOpen, setSpecialtyOpen] = useState(false)
  const [insuranceOpen, setInsuranceOpen] = useState(false)
  const [experienceOpen, setExperienceOpen] = useState(false)
  const [provinceOpen, setProvinceOpen] = useState(false)
  const [cityOpen, setCityOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [filterMobileOpen, setFilterMobileOpen] = useState(false)
  const perPage = 6

  const filteredDoctors = doctorsData.filter(doc => {
    const text = searchText.trim().toLowerCase()
    if (text && !doc.name.toLowerCase().includes(text) && !doc.specialty.includes(text) && !doc.address.toLowerCase().includes(text)) return false
    if (selectedSpecialties.length && !selectedSpecialties.includes(doc.specialty)) return false
    if (selectedInsurance.length && !selectedInsurance.includes(doc.insurance)) return false
    if (selectedExperience) {
      const [min, max] = selectedExperience.replace('+', '').split('-').map(Number)
      if (max) {
        if (doc.experience < min || doc.experience > max) return false
      } else {
        if (doc.experience < min) return false
      }
    }
    if (appointmentFilters.length) {
      const matches = appointmentFilters.some(f => {
        if (f === 'پزشکان دارای نوبت خالی' && doc.hasAvailableSlot) return true
        if (f === 'امکان ویزیت آنلاین' && doc.onlineVisit) return true
        if (f === 'امکان رزرو حضوری' && doc.inPersonBooking) return true
        return false
      })
      if (!matches) return false
    }
    if (selectedProvince && doc.province !== selectedProvince) return false
    if (selectedCities.length && !selectedCities.includes(doc.city)) return false
    if (selectedGender && doc.gender !== selectedGender) return false
    return true
  }).sort((a, b) => {
    if (sort === 'name') return a.name.localeCompare(b.name)
    if (sort === 'rating') return b.rating - a.rating
    return 0
  })

  const totalPages = Math.ceil(filteredDoctors.length / perPage)
  const pageDoctors = filteredDoctors.slice((currentPage - 1) * perPage, currentPage * perPage)

  useEffect(() => { setCurrentPage(1) }, [searchText, sort, selectedSpecialties, selectedInsurance, selectedExperience, appointmentFilters, selectedProvince, selectedCities, selectedGender])

  const toggleSpecialty = (s: string) => {
    setSelectedSpecialties(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])
  }

  const toggleInsurance = (ins: string) => {
    setSelectedInsurance(prev => prev.includes(ins) ? prev.filter(x => x !== ins) : [...prev, ins])
  }

  const toggleAppointment = (val: string) => {
    setAppointmentFilters(prev => prev.includes(val) ? prev.filter(x => x !== val) : [...prev, val])
  }

  const availableCities = selectedProvince ? (citiesByProvince[selectedProvince] || []) : []

  const toggleCity = (c: string) => {
    setSelectedCities(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c])
  }

  return (
    <div className="bg-[#F9FAFB]" style={{ fontFamily: "'Vazirmatn', sans-serif", minHeight: '100vh' }}>
      <Header />

      <div className="max-w-[1216px] mx-auto flex flex-col lg:flex-row gap-[20px] lg:gap-[45px] px-4 lg:px-0" style={{ paddingTop: '24px', paddingBottom: 'calc(80px + 40px)' }}>
        {/* Filter toggle button - mobile only */}
        <button
          onClick={() => setFilterMobileOpen(!filterMobileOpen)}
          className="flex lg:hidden items-center justify-between w-full h-[48px] bg-white border border-[#E7E7E7] rounded-[8px] px-4 order-1"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className={`transition-transform ${filterMobileOpen ? 'rotate-180' : ''}`}>
            <path d="M5 7.5l5 5 5-5" stroke="#6D6D6D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-[14px] font-medium text-[#262626]">فیلترها</span>
        </button>

        {/* Filter Sidebar — collapsible on mobile */}
        <div className={`w-full lg:w-[289px] border border-[#E7E7E7] rounded-[8px] flex flex-col items-center p-4 gap-4 bg-white h-fit order-3 lg:order-none self-start ${filterMobileOpen || 'lg:flex hidden'}`}>
          {/* Title row — فیلترها on right, حذف تمامی فیلتر ها on left */}
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-2">
              <span className="text-[18px] font-medium text-black text-right">فیلترها</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M4 6h16M8 12h8m-5 6h2" stroke="#262626" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="flex justify-center items-center px-[8px] py-[8px] gap-[4px] bg-[#F0F5FE] rounded-[999px] cursor-pointer" onClick={() => { setSelectedSpecialties([]); setSelectedInsurance([]); setSelectedExperience(''); setAppointmentFilters([]); setSelectedProvince(''); setSelectedCities([]); setSelectedGender(''); }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M12 4L4 12M4 4l8 8" stroke="#4179F0" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span className="text-[13px] font-medium text-[#4179F0] text-center whitespace-nowrap">حذف تمامی فیلتر ها</span>
            </div>
          </div>

          {/* Search */}
          <div className="w-full border border-[#E7E7E7] rounded-[8px] flex items-center px-4 py-3 gap-2 h-[48px]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0">
              <circle cx="11" cy="11" r="7" stroke="#888888" strokeWidth="1.5" transform="matrix(-1,0,0,1,22,0)"/>
              <path d="M20 20l-3.5-3.5" stroke="#888888" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <input value={searchText} onChange={e => setSearchText(e.target.value)}
              className="w-full text-right text-[14px] font-medium text-[#6D6D6D] focus:outline-none bg-transparent"
              placeholder="جستجوی پزشک..." />
          </div>

          {/* Container for dropdowns */}
          <div className="w-full flex flex-col gap-4">
            {/* Divider */}
            <div className="border-t border-[#E7E7E7] w-full"></div>

            {/* Specialty Dropdown */}
            <div className="w-full">
              <div className="text-right text-[16px] font-medium text-[#262626]">تخصص ها</div>
              <div className="mt-2 border border-[#E7E7E7] rounded-[8px] flex items-center px-4 h-[48px] cursor-pointer" onClick={() => setSpecialtyOpen(!specialtyOpen)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={`transition-transform shrink-0 ${specialtyOpen ? 'rotate-180' : ''}`}>
                  <path d="M6 9l6 6 6-6" stroke="#6D6D6D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className={`flex-1 text-right text-[14px] font-normal ${selectedSpecialties.length ? 'text-[#262626]' : 'text-[#6D6D6D]'}`}>
                  {selectedSpecialties.length ? selectedSpecialties.join('، ') : 'تخصص مورد نظر را انتخاب کنید'}
                </span>
              </div>
              {specialtyOpen && (
                <div className="mt-1 border border-[#E7E7E7] rounded-[8px] bg-white p-3 flex flex-wrap gap-3">
                  {allSpecialties.map(s => (
                    <label key={s} className="flex items-center gap-2 cursor-pointer w-[calc(50%-6px)]">
                      <span className={`flex-1 text-right text-[14px] font-normal ${selectedSpecialties.includes(s) ? 'text-[#262626]' : 'text-[#6D6D6D]'}`}>{s}</span>
                      <div onClick={() => toggleSpecialty(s)}
                        className={`w-4 h-4 rounded flex items-center justify-center transition ${selectedSpecialties.includes(s) ? 'bg-[#4179F0]' : 'border border-[#D1D1D1] bg-white'}`}>
                        {selectedSpecialties.includes(s) && (
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2.5 6l2.5 2.5 5-5" stroke="#F0F5FE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="border-t border-[#E7E7E7] w-full"></div>

            {/* Insurance Dropdown */}
            <div className="w-full">
              <div className="text-right text-[16px] font-medium text-[#262626]">بیمه</div>
              <div className="mt-2 border border-[#E7E7E7] rounded-[8px] flex items-center px-4 h-[48px] cursor-pointer" onClick={() => setInsuranceOpen(!insuranceOpen)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={`transition-transform shrink-0 ${insuranceOpen ? 'rotate-180' : ''}`}>
                  <path d="M6 9l6 6 6-6" stroke="#6D6D6D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className={`flex-1 text-right text-[14px] font-normal ${selectedInsurance.length ? 'text-[#262626]' : 'text-[#6D6D6D]'}`}>
                  {selectedInsurance.length ? selectedInsurance.join('، ') : 'بیمه مورد نظر را انتخاب کنید'}
                </span>
              </div>
              {insuranceOpen && (
                <div className="mt-1 border border-[#E7E7E7] rounded-[8px] bg-white p-3 flex flex-col gap-2">
                  {allInsurance.map(ins => (
                    <label key={ins} className="flex items-center gap-2 cursor-pointer">
                      <span className={`flex-1 text-right text-[14px] font-normal ${selectedInsurance.includes(ins) ? 'text-[#262626]' : 'text-[#6D6D6D]'}`}>{ins}</span>
                      <div onClick={() => toggleInsurance(ins)}
                        className={`w-4 h-4 rounded flex items-center justify-center transition ${selectedInsurance.includes(ins) ? 'bg-[#4179F0]' : 'border border-[#D1D1D1] bg-white'}`}>
                        {selectedInsurance.includes(ins) && (
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2.5 6l2.5 2.5 5-5" stroke="#F0F5FE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="border-t border-[#E7E7E7] w-full"></div>

            {/* Experience Dropdown */}
            <div className="w-full">
              <div className="text-right text-[16px] font-medium text-[#262626]">تجربه کاری</div>
              <div className="mt-2 border border-[#E7E7E7] rounded-[8px] flex items-center px-4 h-[48px] cursor-pointer" onClick={() => setExperienceOpen(!experienceOpen)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={`transition-transform shrink-0 ${experienceOpen ? 'rotate-180' : ''}`}>
                  <path d="M6 9l6 6 6-6" stroke="#6D6D6D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className={`flex-1 text-right text-[14px] font-normal ${selectedExperience ? 'text-[#262626]' : 'text-[#6D6D6D]'}`}>
                  {selectedExperience || 'تجربه کاری مورد نظر را انتخاب کنید'}
                </span>
              </div>
              {experienceOpen && (
                <div className="mt-1 border border-[#E7E7E7] rounded-[8px] bg-white p-3 flex flex-col gap-2">
                  {experienceRanges.map(exp => (
                    <label key={exp} className="flex items-center gap-2 cursor-pointer">
                      <span className="flex-1 text-right text-[14px] font-normal text-[#6D6D6D]">{exp}</span>
                      <div onClick={() => setSelectedExperience(selectedExperience === exp ? '' : exp)}
                        className={`w-4 h-4 rounded-full flex items-center justify-center transition ${selectedExperience === exp ? 'border-2 border-[#4179F0]' : 'border border-[#D1D1D1] bg-white'}`}>
                        {selectedExperience === exp && (
                          <div className="w-2 h-2 rounded-full bg-[#4179F0]"/>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="border-t border-[#E7E7E7] w-full"></div>

            {/* Appointment Status — 3 checkboxes */}
            <div className="w-full">
              <div className="text-right text-[16px] font-medium text-[#262626] mb-3">وضعیت نوبت دهی</div>
              <div className="flex flex-col gap-3">
                {appointmentStatusOptions.map(opt => (
                  <label key={opt} className="flex items-center justify-between cursor-pointer">
                    <div onClick={() => toggleAppointment(opt)}
                      className={`w-4 h-4 rounded flex items-center justify-center transition ${appointmentFilters.includes(opt) ? 'bg-[#4179F0]' : 'border border-[#D1D1D1] bg-white'}`}>
                      {appointmentFilters.includes(opt) && (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2.5 6l2.5 2.5 5-5" stroke="#F0F5FE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                    <span className="text-[14px] font-normal text-[#6D6D6D] text-right flex-1">{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-[#E7E7E7] w-full"></div>

            {/* Province Dropdown */}
            <div className="w-full">
              <div className="text-right text-[16px] font-medium text-[#262626]">استان</div>
              <div className="mt-2 border border-[#E7E7E7] rounded-[8px] flex items-center px-4 h-[48px] cursor-pointer" onClick={() => setProvinceOpen(!provinceOpen)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={`transition-transform shrink-0 ${provinceOpen ? 'rotate-180' : ''}`}>
                  <path d="M6 9l6 6 6-6" stroke="#6D6D6D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className={`flex-1 text-right text-[14px] font-normal ${selectedProvince ? 'text-[#262626]' : 'text-[#6D6D6D]'}`}>
                  {selectedProvince || 'استان مورد نظر را انتخاب کنید'}
                </span>
              </div>
              {provinceOpen && (
                <div className="mt-1 border border-[#E7E7E7] rounded-[8px] bg-white p-3 flex flex-col gap-2">
                  {provinceList.map(p => (
                    <label key={p} className="flex items-center gap-2 cursor-pointer">
                      <span className={`flex-1 text-right text-[14px] font-normal ${selectedProvince === p ? 'text-[#262626]' : 'text-[#6D6D6D]'}`}>{p}</span>
                      <div onClick={() => { setSelectedProvince(selectedProvince === p ? '' : p); setSelectedCities([]); setProvinceOpen(false); }}
                        className={`w-4 h-4 rounded-full flex items-center justify-center transition ${selectedProvince === p ? 'border-2 border-[#4179F0]' : 'border border-[#D1D1D1] bg-white'}`}>
                        {selectedProvince === p && (
                          <div className="w-2 h-2 rounded-full bg-[#4179F0]"/>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* City Dropdown — shows cities of selected province */}
            <div className="w-full">
              <div className="text-right text-[16px] font-medium text-[#262626]">شهر</div>
              <div className="mt-2 border border-[#E7E7E7] rounded-[8px] flex items-center px-4 h-[48px] cursor-pointer" onClick={() => setCityOpen(!cityOpen)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={`transition-transform shrink-0 ${cityOpen ? 'rotate-180' : ''}`}>
                  <path d="M6 9l6 6 6-6" stroke="#6D6D6D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className={`flex-1 text-right text-[14px] font-normal ${selectedCities.length ? 'text-[#262626]' : 'text-[#6D6D6D]'}`}>
                  {selectedProvince ? (selectedCities.length ? selectedCities.join('، ') : 'شهر مورد نظر را انتخاب کنید') : 'ابتدا استان را انتخاب کنید'}
                </span>
              </div>
              {cityOpen && (
                <div className="mt-1 border border-[#E7E7E7] rounded-[8px] bg-white p-3 flex flex-col gap-2">
                  {!selectedProvince ? (
                    <span className="text-right text-[14px] font-normal text-[#6D6D6D]">ابتدا استان را انتخاب کنید</span>
                  ) : availableCities.length === 0 ? (
                    <span className="text-right text-[14px] font-normal text-[#6D6D6D]">هیچ شهری یافت نشد</span>
                  ) : (
                    availableCities.map(c => (
                      <label key={c} className="flex items-center gap-2 cursor-pointer">
                        <span className={`flex-1 text-right text-[14px] font-normal ${selectedCities.includes(c) ? 'text-[#262626]' : 'text-[#6D6D6D]'}`}>{c}</span>
                        <div onClick={() => toggleCity(c)}
                          className={`w-4 h-4 rounded flex items-center justify-center transition ${selectedCities.includes(c) ? 'bg-[#4179F0]' : 'border border-[#D1D1D1] bg-white'}`}>
                          {selectedCities.includes(c) && (
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path d="M2.5 6l2.5 2.5 5-5" stroke="#F0F5FE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </div>
                      </label>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="border-t border-[#E7E7E7] w-full"></div>

            {/* Gender */}
            <div className="w-full">
              <span className="text-right text-[16px] font-medium text-[#262626] block mb-3">جنسیت پزشک</span>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-[9px] cursor-pointer">
                  <span className="text-[14px] font-medium text-[#6D6D6D]">آقا</span>
                  <div onClick={() => setSelectedGender(selectedGender === 'مرد' ? '' : 'مرد')}
                    className={`w-4 h-4 rounded flex items-center justify-center transition ${selectedGender === 'مرد' ? 'bg-[#4179F0]' : 'border border-[#D1D1D1] bg-white'}`}>
                    {selectedGender === 'مرد' && (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2.5 6l2.5 2.5 5-5" stroke="#F0F5FE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                </label>
                <label className="flex items-center gap-[9px] cursor-pointer">
                  <span className="text-[14px] font-medium text-[#6D6D6D]">خانم</span>
                  <div onClick={() => setSelectedGender(selectedGender === 'زن' ? '' : 'زن')}
                    className={`w-4 h-4 rounded flex items-center justify-center transition ${selectedGender === 'زن' ? 'bg-[#4179F0]' : 'border border-[#D1D1D1] bg-white'}`}>
                    {selectedGender === 'زن' && (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2.5 6l2.5 2.5 5-5" stroke="#F0F5FE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                </label>
              </div>
            </div>
          </div>

          <button className="w-full h-[42px] bg-[#4179F0] rounded-[8px] flex items-center justify-center text-[14px] font-medium text-white hover:bg-[#3568D6] transition">اعمال فیلتر</button>
        </div>

        {/* Doctor Cards — second in DOM = visually left; order-1 on mobile = above filter */}
        <div className="flex-1 flex flex-col gap-4 order-2 lg:order-none">
          {/* Sort Bar — label first (right in RTL), buttons second (left in RTL) */}
          <div className="border border-[#E7E7E7] rounded-[12px] flex items-center justify-between px-[13px] py-[16px] h-[64px] bg-white">
            <div className="text-[14px] font-medium text-black whitespace-nowrap">مرتب سازی بر اساس:</div>
            <div className="flex items-center gap-[18px]">
              <button onClick={() => setSort('default')} className={`text-[12px] font-medium text-right transition ${sort === 'default' ? 'text-[#4179F0]' : 'text-[#5D5D5D]'}`}>نزدیک‌ترین نوبت آزاد</button>
              <button onClick={() => setSort('rating')} className={`text-[12px] font-medium text-right transition ${sort === 'rating' ? 'text-[#4179F0]' : 'text-[#5D5D5D]'}`}>محبوب‌ترین</button>
              <button onClick={() => setSort('name')} className={`text-[12px] font-medium text-right transition ${sort === 'name' ? 'text-[#4179F0]' : 'text-[#5D5D5D]'}`}>پیش فرض</button>
            </div>
          </div>

          {pageDoctors.map(doc => (
            <Link href={`/doctors/${doc.id}`} key={doc.id} className="border border-[#E7E7E7] rounded-[12px] flex flex-col p-5 lg:p-[20px_24px_24px] gap-4 bg-white hover:shadow-lg transition-all no-underline" style={{ minHeight: '330px' }}>
              {/* Pic + Info — photo first (right), info second (left) */}
              <div className="flex justify-between items-center border-b border-[#F0F0F0] pb-0" style={{ minHeight: '160px' }}>
                {/* Doctor Image — right side */}
                <div className="w-[120px] h-[120px] lg:w-[194px] lg:h-[160px] rounded-[8px] shrink-0 overflow-hidden" style={{ background: 'radial-gradient(104.67% 151.25% at 49.83% 17.25%, #FFFFFF 0%, #C6C6C6 100%)' }}>
                  <img src={doc.image} alt={doc.name} className="w-full h-full object-cover rounded-[8px]" />
                </div>

                {/* Info side — left side */}
                <div className="flex flex-col justify-between items-end p-2 gap-0 flex-1 h-full">
                  {/* License code */}
                  <div className="flex justify-center items-center gap-2">
                    <span className="text-[14px] lg:text-[16px] font-normal text-black text-right">کد نظام پزشکی: {doc.code}</span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="#4179F0"/>
                    </svg>
                  </div>

                  {/* Name + Specialty */}
                  <div className="w-full text-right">
                    <div className="text-[16px] lg:text-[18px] font-medium text-black leading-[28px]">{doc.name}</div>
                    <div className="text-[14px] lg:text-[16px] font-normal text-[#262626] leading-[25px]">{doc.specialty}</div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 w-full">
                    <div className="flex items-center gap-0">
                      {[1, 2, 3, 4].map(i => (
                        <svg key={i} width="12" height="13" viewBox="0 0 12 13" fill="none" className="mx-px">
                          <path d="M6 0.5L7.35 4.63L11.5 4.63L8.08 7.12L9.42 11.25L6 8.76L2.58 11.25L3.92 7.12L0.5 4.63L4.65 4.63L6 0.5Z" fill="#FFB800"/>
                        </svg>
                      ))}
                      <svg width="12" height="13" viewBox="0 0 12 13" fill="none" className="mx-px">
                        <path d="M6 0.5L7.35 4.63L11.5 4.63L8.08 7.12L9.42 11.25L6 8.76L2.58 11.25L3.92 7.12L0.5 4.63L4.65 4.63L6 0.5Z" fill="#E7E7E7"/>
                      </svg>
                    </div>
                    <span className="text-[12px] lg:text-[13px] font-normal text-[#FFB800] flex items-end leading-5">۴</span>
                    <span className="text-[11px] lg:text-[12px] font-normal text-[#888888] flex items-end leading-5">({doc.reviews} نظر)</span>
                  </div>
                </div>
              </div>

              {/* Location — icon on right of text */}
              <div className="flex justify-start items-center px-2 gap-4">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
                  <path d="M10 0C6.13 0 3 3.13 3 7c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" fill="#262626"/>
                </svg>
                <span className="text-[13px] lg:text-[14px] font-medium text-[#262626] text-right leading-[22px] truncate">{doc.address}</span>
              </div>

              {/* Appointment time — icon on right of text */}
              <div className="flex justify-start items-center px-2 gap-4">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
                  <circle cx="10" cy="10" r="7.5" stroke="#262626" strokeWidth="1.5" fill="none"/>
                  <path d="M10 5.5V10l3 3" stroke="#262626" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                </svg>
                <span className="text-[13px] lg:text-[14px] font-medium text-[#262626] text-right leading-[22px] whitespace-nowrap">اولین نوبت در دسترس:</span>
                <span className="text-[13px] lg:text-[14px] font-medium text-[#262626] text-right leading-[22px]">{doc.firstSlot}</span>
              </div>

              {/* Buttons */}
              <div className="flex justify-center items-center gap-[32px] lg:gap-[46px]">
                <div className="flex justify-center items-center px-[10px] py-[10px] gap-[6px] flex-1 h-[40px] bg-[#4179F0] rounded-[8px] hover:bg-[#3568D6] transition">
                  <span className="text-[14px] font-medium text-white text-right leading-[22px] whitespace-nowrap">رزرو نوبت</span>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M12 4l-6 6 6 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="flex justify-center items-center px-[10px] py-[10px] gap-[6px] flex-1 h-[40px] border border-[#E7E7E7] rounded-[8px] hover:bg-gray-50 transition">
                  <span className="text-[14px] font-medium text-[#888888] text-right leading-[22px] whitespace-nowrap">مشاهده پروفایل</span>
                </div>
              </div>
            </Link>
          ))}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center pt-4 pb-4">
              <div className="border border-[#E7E7E7] rounded-[8px] flex items-center p-[4px_12px] gap-[2px] h-[48px] bg-white">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button key={p} onClick={() => setCurrentPage(p)}
                    className={`w-[40px] h-[40px] rounded-[8px] flex items-center justify-center text-[14px] font-medium transition ${p === currentPage ? 'bg-[#F0F5FE] text-[#2B5AE5]' : 'text-[#6D6D6D] hover:bg-gray-50'}`}>{p}</button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
      <BottomNav />
    </div>
  )
}
