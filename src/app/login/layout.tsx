'use client'

import { useEffect } from 'react'

export default function LoginLayout({
  children
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    document.body.classList.add('login-page')
    return () => {
      document.body.classList.remove('login-page')
    }
  }, [])

  return (
    <>
      <style jsx global>{`
        body.login-page nav,
        body.login-page > nav,
        body.login-page header nav {
          display: none !important;
        }
        body.login-page footer {
          display: none !important;
        }
        body.login-page a[href*="wa.me"],
        body.login-page button[aria-label*="WhatsApp"] {
          display: none !important;
        }
        body.login-page main {
          padding: 0 !important;
        }
      `}</style>
      {children}
    </>
  )
}
