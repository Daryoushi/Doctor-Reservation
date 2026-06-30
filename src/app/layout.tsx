import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'دکتر رزرو | سامانه نوبت‌دهی آنلاین',
  description: 'سامانه آنلاین رزرو نوبت پزشک',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-white">{children}</body>
    </html>
  )
}
