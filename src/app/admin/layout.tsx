'use client'

import { useEffect } from 'react'

export default function AdminLayout({
  children
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    document.body.classList.add('admin-page')
    return () => {
      document.body.classList.remove('admin-page')
    }
  }, [])

  return (
    <>
      <style jsx global>{`
        body.admin-page nav,
        body.admin-page footer,
        body.admin-page a[href*="wa.me"] {
          display: none !important;
        }
        body.admin-page main {
          padding: 0 !important;
        }
      `}</style>
      {children}
    </>
  )
}
