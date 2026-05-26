'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    adsbygoogle: Record<string, unknown>[]
  }
}

const ADSENSE_CLIENT =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? 'ca-pub-7925809856639350'

type AdSenseProps = {
  /** ID de unidad desde AdSense → Anuncios → Por unidad. Si no hay slot, no se renderiza. */
  adSlot?: string
  adFormat?: string
  fullWidthResponsive?: boolean
  className?: string
}

export function AdSense ({
  adSlot = process.env.NEXT_PUBLIC_ADSENSE_SLOT,
  adFormat = 'auto',
  fullWidthResponsive = true,
  className
}: AdSenseProps) {
  useEffect(() => {
    if (!adSlot) return
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (error) {
      console.error('[AdSense]', error)
    }
  }, [adSlot])

  if (!adSlot) return null

  return (
    <div className={className} aria-hidden="false">
      <ins
        className="adsbygoogle block min-h-[90px] w-full"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive ? 'true' : 'false'}
      />
    </div>
  )
}
