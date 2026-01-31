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
    url: 'https://instagram.com/yosephprieto',
    icon: 'instagram',
    username: '@yosephprieto'
  },
  {
    id: 'facebook',
    name: 'Facebook',
    url: 'https://facebook.com/yosephprieto',
    icon: 'facebook',
    username: 'Yoseph Prieto Oficial'
  },
  {
    id: 'youtube',
    name: 'YouTube',
    url: 'https://youtube.com/@yosephprieto',
    icon: 'youtube',
    username: 'Yoseph Prieto'
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    url: 'https://tiktok.com/@yosephprieto',
    icon: 'music',
    username: '@yosephprieto'
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
