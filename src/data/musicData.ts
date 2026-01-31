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
    title: 'Canción Destacada',
    type: 'single',
    releaseDate: '2024-01-15',
    coverImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
    description: 'Una canción que captura la esencia del estilo musical de Yoseph Prieto.',
    spotifyUrl: 'https://open.spotify.com/track/example',
    youtubeUrl: 'https://www.youtube.com/watch?v=example',
    featured: true
  },
  {
    id: '2',
    title: 'Álbum Principal',
    type: 'album',
    releaseDate: '2023-06-20',
    coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800',
    description: 'Una colección de canciones que representan el mejor trabajo del artista.',
    spotifyUrl: 'https://open.spotify.com/album/example',
    youtubeUrl: 'https://www.youtube.com/playlist?list=example',
    featured: true
  },
  {
    id: '3',
    title: 'Nuevo Single',
    type: 'single',
    releaseDate: '2024-03-10',
    coverImage: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800',
    description: 'El último lanzamiento del artista, disponible en todas las plataformas.',
    spotifyUrl: 'https://open.spotify.com/track/example2',
    youtubeUrl: 'https://www.youtube.com/watch?v=example2',
    featured: false
  }
]
