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

interface SocialLinksProps {
  className?: string
  iconSize?: string
}

export function SocialLinks ({ className, iconSize = 'w-6 h-6' }: SocialLinksProps) {
  return (
    <div className={cn('flex items-center space-x-4', className)}>
      {socialMediaData.map((social) => {
        const Icon = iconMap[social.icon] || Music2
        return (
          <a
            key={social.id}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-primary-400 transition-colors"
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
