export interface SocialMedia {
  id: string
  name: string
  url: string
  icon: string
  username?: string
}

export const socialMediaData: SocialMedia[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    url: 'https://www.instagram.com/yosephprietooficial/',
    icon: 'instagram',
    username: '@yosephprietooficial'
  },
  {
    id: 'facebook',
    name: 'Proyecto Yoseph Prieto',
    url: 'https://www.facebook.com/artistayosephprieto?locale=es_LA',
    icon: 'facebook',
    username: 'Yoseph Prieto Oficial'
  },
  {
    id: 'youtube',
    name: 'YouTube',
    url: 'https://www.youtube.com/@yosephprietooficial/videos',
    icon: 'youtube',
    username: 'Yoseph Prieto Oficial'
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    url: 'https://www.tiktok.com/@yosephprieto1',
    icon: 'music',
    username: '@yosephprieto1'
  },
  {
    id: 'spotify',
    name: 'Spotify',
    url: 'https://open.spotify.com/artist/yosephprieto',
    icon: 'music',
    username: 'Yoseph Prieto'
  },
  {
    id: 'soundcloud',
    name: 'SoundCloud',
    url: 'https://soundcloud.com/yosephprieto',
    icon: 'music',
    username: 'Yoseph Prieto'
  }
]
