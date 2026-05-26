'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'

const ADSENSE_CLIENT =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? 'ca-pub-7925809856639350'

/** Rutas donde no se cargan anuncios (admin, login). */
function isExcludedPath (pathname: string | null): boolean {
  if (!pathname) return false
  return pathname.startsWith('/admin') || pathname.startsWith('/login')
}

export function AdSenseScript () {
  const pathname = usePathname()

  if (isExcludedPath(pathname)) return null

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  )
}
