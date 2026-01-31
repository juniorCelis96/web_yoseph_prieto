export interface Event {
  id: string
  title: string
  date: string
  time?: string
  location: string
  venue: string
  description: string
  image?: string
  ticketUrl?: string
  status: 'upcoming' | 'past'
}

export const eventsData: Event[] = [
  {
    id: '1',
    title: 'Concierto en Vivo',
    date: '2025-02-15',
    time: '20:00',
    location: 'Ciudad Principal',
    venue: 'Teatro Municipal',
    description: 'Una noche especial con Yoseph Prieto y su banda. No te lo pierdas.',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800',
    ticketUrl: 'https://example.com/tickets',
    status: 'upcoming'
  },
  {
    id: '2',
    title: 'Festival de Música',
    date: '2025-03-20',
    time: '18:00',
    location: 'Parque Central',
    venue: 'Escenario Principal',
    description: 'Participación en el festival más importante de la ciudad.',
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800',
    status: 'upcoming'
  },
  {
    id: '3',
    title: 'Presentación Especial',
    date: '2024-12-10',
    time: '21:00',
    location: 'Club Nocturno',
    venue: 'Sala VIP',
    description: 'Una noche inolvidable con música en vivo.',
    status: 'past'
  }
]
