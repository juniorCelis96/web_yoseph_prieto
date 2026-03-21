'use client'

import Image from 'next/image'
import { Instagram, Facebook, Youtube, Music2 } from 'lucide-react'
import { socialMediaData } from '@/data/socialMediaData'
import { cn } from '@/lib/utils'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  tiktok: Music2,
  spotify: Music2,
  soundcloud: Music2
}

function BrandIcon ({
  id,
  iconSize,
  light
}: {
  id: string
  iconSize: string
  light: boolean
}) {
  if (id === 'tiktok') {
    return (
      <Image
        src="/tik-tok.png"
        alt=""
        width={24}
        height={24}
        className={cn('shrink-0 object-contain', iconSize, light && 'brightness-0 invert')}
        unoptimized
      />
    )
  }
  if (id === 'spotify') {
    return (
      <Image
        src="/spotify.svg"
        alt=""
        width={24}
        height={24}
        className={cn('shrink-0 object-contain', iconSize)}
        unoptimized
      />
    )
  }
  return null
}

interface SocialLinksProps {
  className?: string
  iconSize?: string
  showLabels?: boolean
  /** Texto e íconos blancos (footer / contacto) */
  variant?: 'default' | 'light'
}

export function SocialLinks ({
  className = '',
  iconSize = 'w-6 h-6',
  showLabels = false,
  variant = 'default'
}: SocialLinksProps) {
  const light = variant === 'light'
  const iconTone = light ? 'text-white' : 'text-gold'
  const linkClass = light
    ? 'text-white hover:text-white/80 transition-colors font-body text-sm sm:text-base block truncate'
    : 'text-sand hover:text-gold transition-colors font-body text-sm sm:text-base block truncate'
  const rowIconTone = light ? 'text-white' : 'text-sand hover:text-gold'

  if (showLabels) {
    return (
      <div className={`space-y-3 ${className}`}>
        {socialMediaData
          .filter(social => social.id !== 'soundcloud')
          .map((social) => {
            const Icon = iconMap[social.icon] || Music2
            let displayText = social.username || social.name
            if (social.id === 'tiktok') {
              displayText = `TikTok: ${social.username || social.name}`
            } else if (social.id === 'spotify') {
              displayText = `Spotify: ${social.username || social.name}`
            }

            const custom = social.id === 'tiktok' || social.id === 'spotify'

            return (
              <div key={social.id} className="flex items-center space-x-3">
                {custom ? (
                  <BrandIcon id={social.id} iconSize={iconSize} light={light} />
                ) : (
                  <Icon className={cn(iconSize, iconTone, 'flex-shrink-0')} />
                )}
                <div className="flex-1 min-w-0">
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                    title={social.username || social.name}
                  >
                    {displayText}
                  </a>
                </div>
              </div>
            )
          })}
      </div>
    )
  }

  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      {socialMediaData.map((social) => {
        const Icon = iconMap[social.icon] || Music2
        const custom = social.id === 'tiktok' || social.id === 'spotify'
        return (
          <a
            key={social.id}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={rowIconTone + ' transition-colors'}
            aria-label={social.name}
          >
            {custom ? (
              <BrandIcon id={social.id} iconSize={iconSize} light={light} />
            ) : (
              <Icon className={iconSize} />
            )}
            <span className="sr-only">{social.name}</span>
          </a>
        )
      })}
    </div>
  )
}
