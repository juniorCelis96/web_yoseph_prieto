export interface GalleryItem {
  id: string
  type: 'image' | 'video'
  url: string
  thumbnail?: string
  title: string
  description?: string
  category?: string
}

export const galleryData: GalleryItem[] = [
  {
    id: '1',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200',
    thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
    title: 'En el Estudio',
    description: 'Grabando nueva música',
    category: 'studio'
  },
  {
    id: '2',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200',
    thumbnail: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400',
    title: 'Concierto en Vivo',
    description: 'Presentación en vivo',
    category: 'live'
  },
  {
    id: '3',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    title: 'Video Musical',
    description: 'Último video oficial',
    category: 'music-video'
  },
  {
    id: '4',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1200',
    thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400',
    title: 'Behind the Scenes',
    description: 'Detrás de cámaras',
    category: 'behind-scenes'
  },
  {
    id: '5',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1200',
    thumbnail: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400',
    title: 'Festival',
    description: 'Presentación en festival',
    category: 'live'
  },
  {
    id: '6',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=example',
    thumbnail: 'https://i.ytimg.com/vi/example/maxresdefault.jpg',
    title: 'Acústico',
    description: 'Versión acústica',
    category: 'acoustic'
  }
]
