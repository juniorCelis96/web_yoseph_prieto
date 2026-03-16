export interface MusicRelease {
  id: string
  title: string
  type: 'single' | 'album' | 'ep'
  releaseDate: string
  coverImage: string
  description: string
  spotifyUrl?: string
  youtubeUrl?: string
  soundcloudUrl?: string
  appleMusicUrl?: string
  featured: boolean
}

export const musicData: MusicRelease[] = [
  {
    id: '1',
    title: 'Llegó el Cantante',
    type: 'single',
    releaseDate: '2024-01-01',
    coverImage: '/yp_img_caratula_1_album.png',
    description: 'Canción festiva que celebra la llegada del artista, con ritmos alegres de música ranchera y carranga.',
    spotifyUrl: 'https://open.spotify.com/intl-es/track/2WbttTIdUGRwdwJBesgFpZ?si=6646776e4b0f4215',
    featured: true
  },
  {
    id: '2',
    title: 'El Esmeraldero',
    type: 'single',
    releaseDate: '2024-01-01',
    coverImage: '/yp_img_caratula_1_album.png',
    description: 'Una canción que narra la vida y el trabajo de los esmeralderos del occidente de Boyacá, con ritmos auténticos de carranga.',
    spotifyUrl: 'https://open.spotify.com/intl-es/track/2HrsLURZb9thFUDA7UIfTD?si=71ed86e1c24348e9',
    featured: true
  },
  {
    id: '3',
    title: 'Lamento del Guaquero',
    type: 'single',
    releaseDate: '2024-01-01',
    coverImage: '/yp_img_caratula_1_album.png',
    description: 'Melodía profunda que expresa el sentir del guaquero, con arreglos tradicionales que honran la música popular colombiana.',
    spotifyUrl: 'https://open.spotify.com/intl-es/track/20gH3DvkTCNsTWZleD52yw?si=f7069f03a2d84a83',
    featured: true
  }
]
