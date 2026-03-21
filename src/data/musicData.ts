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
    description: 'Un himno popular que suena en ferias y veredas: ritmo pegajoso, letra que invita a cantar y a bailar con el alma de la música popular colombiana.',
    spotifyUrl: 'https://open.spotify.com/intl-es/track/2WbttTIdUGRwdwJBesgFpZ?si=6646776e4b0f4215',
    featured: true
  },
  {
    id: '2',
    title: 'El Esmeraldero',
    type: 'single',
    releaseDate: '2024-01-01',
    coverImage: '/yp_img_caratula_1_album.png',
    description: 'Historia cantada al estilo popular: trabajo, tierra y orgullo boyacense, con el sabor de la música que se escucha en la radio y en la plaza del pueblo.',
    spotifyUrl: 'https://open.spotify.com/intl-es/track/2HrsLURZb9thFUDA7UIfTD?si=71ed86e1c24348e9',
    featured: true
  },
  {
    id: '3',
    title: 'Lamento del Guaquero',
    type: 'single',
    releaseDate: '2024-01-01',
    coverImage: '/yp_img_caratula_1_album.png',
    description: 'Balada popular con sentimiento de campo: voz clara y melodía que llega al corazón, como las canciones que marcan generaciones en el folclor colombiano.',
    spotifyUrl: 'https://open.spotify.com/intl-es/track/20gH3DvkTCNsTWZleD52yw?si=f7069f03a2d84a83',
    featured: true
  }
]
