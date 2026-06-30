'use client'

import { useEffect, useState } from 'react'

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const name = localStorage.getItem('userName')
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true'
    setIsLoggedIn(loggedIn)
    setUserName(name || '')
  }, [])

  async function logout() {
    if (confirm('آیا از خروج مطمئن هستید؟')) {
      localStorage.removeItem('isLoggedIn')
      localStorage.removeItem('userName')
      localStorage.removeItem('userPhone')
      localStorage.removeItem('userNationalCode')
      localStorage.removeItem('userBirthDate')
      try { await fetch('/api/auth/logout', { method: 'POST' }) } catch {}
      window.location.href = '/'
    }
  }

  const btnStyle: React.CSSProperties = {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px 10px 10px 8px',
    gap: '6px',
    minWidth: '120px',
    height: '40px',
    borderRadius: '8px',
    background: 'transparent',
    fontFamily: "'Vazirmatn', sans-serif",
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '22px',
    textAlign: 'right',
    color: '#4179F0',
    textDecoration: 'none',
    cursor: 'pointer',
  }

  return (
    <header
      style={{
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '12px 16px',
        gap: '8px',
        width: '100%',
        background: '#FFFFFF',
        borderBottom: '1px solid #E7E7E7',
        zIndex: 50,
        position: 'sticky' as const,
        top: 0,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px 0px',
          gap: '16px',
          width: '100%',
          maxWidth: '1216px',
          height: '64px',
        }}
      >
        {/* Hamburger - mobile only */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden flex items-center justify-center"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
          aria-label="منو"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M3 6h18M3 12h18M3 18h18" stroke="#262626" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {/* Logo */}
        <a href="/"
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: '0px 12px',
            gap: '16px',
            height: '48px',
            textDecoration: 'none',
          }}
        >
          <img src="/images/Logo.svg" alt="دکتر رزرو" style={{ height: '28px', width: 'auto' }} />
          <span
            style={{
              fontFamily: "'Vazirmatn', sans-serif",
              fontWeight: 700,
              fontSize: '24px',
              lineHeight: '110%',
              display: 'flex',
              alignItems: 'center',
              textAlign: 'center',
              color: '#000000',
            }}
          >
            دکتر رزرو
          </span>
        </a>

        {/* Nav - desktop */}
        <nav className="hidden lg:flex"
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: '0px 16px',
            gap: '48px',
            height: '25px',
          }}
        >
          <a href="/doctors"
            style={{
              fontFamily: "'Vazirmatn', sans-serif",
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '25px',
              textAlign: 'right',
              color: '#262626',
              textDecoration: 'none',
            }}
          >لیست پزشکان</a>
          <a href="/faq"
            style={{
              fontFamily: "'Vazirmatn', sans-serif",
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '25px',
              textAlign: 'right',
              color: '#262626',
              textDecoration: 'none',
            }}
          >سوالات متداول</a>
          <a href="/about"
            style={{
              fontFamily: "'Vazirmatn', sans-serif",
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '25px',
              textAlign: 'right',
              color: '#262626',
              textDecoration: 'none',
            }}
          >درباره ما</a>
          <a href="#footer"
            style={{
              fontFamily: "'Vazirmatn', sans-serif",
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '25px',
              textAlign: 'right',
              color: '#262626',
              textDecoration: 'none',
            }}
          >تماس با ما</a>
        </nav>

        {/* Auth - desktop */}
        <div className="hidden lg:flex">
          {!isLoggedIn ? (
            <a href="/auth/login" style={btnStyle} onClick={async (e) => { e.preventDefault(); try { await fetch('/api/auth/logout', { method: 'POST' }) } catch {}; window.location.href = '/auth/login'; }}>
              ورود / ثبت نام
            </a>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '12px' }}>
              <a href="/profile" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    background: '#DBEAFE',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#4179F0',
                    fontWeight: 700,
                    fontSize: '14px',
                  }}
                >
                  {userName.charAt(0) || 'ک'}
                </div>
                <span
                  style={{
                    fontFamily: "'Vazirmatn', sans-serif",
                    fontWeight: 500,
                    fontSize: '14px',
                    lineHeight: '22px',
                    textAlign: 'right',
                    color: '#374151',
                  }}
                >
                  {userName || 'کاربر'}
                </span>
              </a>
              <button onClick={logout}
                style={{
                  fontFamily: "'Vazirmatn', sans-serif",
                  fontWeight: 400,
                  fontSize: '12px',
                  lineHeight: '20px',
                  color: '#EF4444',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >خروج</button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden"
          style={{
            position: 'fixed',
            top: '80px',
            left: 0,
            right: 0,
            bottom: 0,
            background: '#FFFFFF',
            zIndex: 100,
            display: 'flex',
            flexDirection: 'column',
            padding: '24px 16px',
            gap: '8px',
          }}
        >
          <a href="/doctors" onClick={() => setMobileMenuOpen(false)}
            style={{ fontFamily: "'Vazirmatn', sans-serif", fontWeight: 500, fontSize: '18px', color: '#262626', textDecoration: 'none', padding: '16px 0', borderBottom: '1px solid #F0F0F0' }}>
            لیست پزشکان
          </a>
          <a href="/faq" onClick={() => setMobileMenuOpen(false)}
            style={{ fontFamily: "'Vazirmatn', sans-serif", fontWeight: 500, fontSize: '18px', color: '#262626', textDecoration: 'none', padding: '16px 0', borderBottom: '1px solid #F0F0F0' }}>
            سوالات متداول
          </a>
          <a href="/about" onClick={() => setMobileMenuOpen(false)}
            style={{ fontFamily: "'Vazirmatn', sans-serif", fontWeight: 500, fontSize: '18px', color: '#262626', textDecoration: 'none', padding: '16px 0', borderBottom: '1px solid #F0F0F0' }}>
            درباره ما
          </a>
          <a href="#footer" onClick={() => setMobileMenuOpen(false)}
            style={{ fontFamily: "'Vazirmatn', sans-serif", fontWeight: 500, fontSize: '18px', color: '#262626', textDecoration: 'none', padding: '16px 0', borderBottom: '1px solid #F0F0F0' }}>
            تماس با ما
          </a>
          <div style={{ marginTop: '24px' }}>
            {!isLoggedIn ? (
              <button onClick={async () => { setMobileMenuOpen(false); try { await fetch('/api/auth/logout', { method: 'POST' }) } catch {}; window.location.href = '/auth/login'; }}
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '48px', background: '#4179F0', borderRadius: '8px', color: '#FFFFFF', fontFamily: "'Vazirmatn', sans-serif", fontWeight: 500, fontSize: '16px', textDecoration: 'none', border: 'none', cursor: 'pointer' }}>
                ورود / ثبت نام
              </button>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button onClick={() => { setMobileMenuOpen(false); window.location.href = '/profile'; }}
                  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', textDecoration: 'none', padding: '16px 0', borderBottom: '1px solid #F0F0F0', background: 'none', border: 'none', cursor: 'pointer', width: '100%' }}>
                  <span style={{ fontFamily: "'Vazirmatn', sans-serif", fontWeight: 500, fontSize: '18px', color: '#262626' }}>
                    {userName || 'پروفایل'}
                  </span>
                </button>
                <button onClick={async () => { setMobileMenuOpen(false); localStorage.removeItem('isLoggedIn'); localStorage.removeItem('userName'); localStorage.removeItem('userPhone'); localStorage.removeItem('userNationalCode'); localStorage.removeItem('userBirthDate'); try { await fetch('/api/auth/logout', { method: 'POST' }) } catch {}; window.location.href = '/'; }}
                  style={{ fontFamily: "'Vazirmatn', sans-serif", fontWeight: 500, fontSize: '16px', color: '#EF4444', background: 'none', border: 'none', cursor: 'pointer', padding: '16px 0', textAlign: 'right' }}>
                  خروج
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
