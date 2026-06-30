'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

const NAV_ITEMS = [
  {
    label: 'خانه',
    href: '/',
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M3 9.5L12 3L21 9.5V20C21 20.5 20.5 21 20 21H4C3.5 21 3 20.5 3 20V9.5Z" stroke={active ? '#4179F0' : '#9CA3AF'} strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M9 21V12H15V21" stroke={active ? '#4179F0' : '#9CA3AF'} strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'پزشکان',
    href: '/doctors',
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="4" stroke={active ? '#4179F0' : '#9CA3AF'} strokeWidth="1.5" />
        <path d="M4 21C4 17 8 14 12 14C16 14 20 17 20 21" stroke={active ? '#4179F0' : '#9CA3AF'} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'نوبت‌ها',
    href: '/appointments',
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="18" rx="2" stroke={active ? '#4179F0' : '#9CA3AF'} strokeWidth="1.5" />
        <path d="M8 2V6" stroke={active ? '#4179F0' : '#9CA3AF'} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M16 2V6" stroke={active ? '#4179F0' : '#9CA3AF'} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M3 10H21" stroke={active ? '#4179F0' : '#9CA3AF'} strokeWidth="1.5" />
        <path d="M9 14H10" stroke={active ? '#4179F0' : '#9CA3AF'} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M14 14H15" stroke={active ? '#4179F0' : '#9CA3AF'} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'پروفایل',
    href: '/profile',
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="4" stroke={active ? '#4179F0' : '#9CA3AF'} strokeWidth="1.5" />
        <path d="M20 21C20 17 16 14 12 14C8 14 4 17 4 21" stroke={active ? '#4179F0' : '#9CA3AF'} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E7E7E7] z-50 lg:hidden">
      <div className="flex items-center justify-around h-16">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center gap-0.5 min-w-[64px] h-full no-underline"
            >
              {item.icon(active)}
              <span
                className="text-[10px] leading-[14px] font-medium"
                style={{ color: active ? '#4179F0' : '#9CA3AF' }}
              >
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
