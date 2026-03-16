import { Instagram, Facebook, Youtube, Music2 } from 'lucide-react'
import { socialMediaData } from '@/data/socialMediaData'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  tiktok: Music2,
  spotify: Music2,
  soundcloud: Music2
}

interface SocialLinksProps {
  className?: string
  iconSize?: string
  showLabels?: boolean
}

export function SocialLinks ({ className = '', iconSize = 'w-6 h-6', showLabels = false }: SocialLinksProps) {
  if (showLabels) {
    return (
      <div className={`space-y-3 ${className}`}>
        {socialMediaData
          .filter(social => social.id !== 'soundcloud')
          .map((social) => {
            const Icon = iconMap[social.icon] || Music2
            
            // Formato especial para TikTok y Spotify
            let displayText = social.username || social.name
            if (social.id === 'tiktok') {
              displayText = `TikTok: ${social.username || social.name}`
            } else if (social.id === 'spotify') {
              displayText = `Spotify: ${social.username || social.name}`
            }
            
            return (
              <div key={social.id} className="flex items-center space-x-3">
                <Icon className={`${iconSize} text-gold flex-shrink-0`} />
                <div className="flex-1 min-w-0">
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sand hover:text-gold transition-colors font-body text-sm sm:text-base block truncate"
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
        return (
          <a
            key={social.id}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sand hover:text-gold transition-colors"
            aria-label={social.name}
          >
            <Icon className={iconSize} />
            <span className="sr-only">{social.name}</span>
          </a>
        )
      })}
    </div>
  )
}
