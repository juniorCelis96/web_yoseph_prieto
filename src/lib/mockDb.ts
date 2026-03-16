// Mock database para desarrollo cuando Supabase no está configurado
// Los datos se pierden al reiniciar el servidor

interface Event {
  id: string
  title: string
  date: string
  time?: string | null
  location: string
  venue: string
  description?: string | null
  status: 'upcoming' | 'past'
  active: boolean
  created_at?: string
  updated_at?: string
}

// Almacenamiento en memoria
let events: Event[] = []

export const mockDb = {
  // Obtener todos los eventos
  getAllEvents: async (): Promise<Event[]> => {
    return [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  },

  // Obtener evento por ID
  getEventById: async (id: string): Promise<Event | null> => {
    return events.find(e => e.id === id) || null
  },

  // Crear evento
  createEvent: async (eventData: Omit<Event, 'id' | 'created_at' | 'updated_at'>): Promise<Event> => {
    const newEvent: Event = {
      ...eventData,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    events.push(newEvent)
    return newEvent
  },

  // Actualizar evento
  updateEvent: async (id: string, eventData: Partial<Event>): Promise<Event | null> => {
    const index = events.findIndex(e => e.id === id)
    if (index === -1) return null

    events[index] = {
      ...events[index],
      ...eventData,
      updated_at: new Date().toISOString()
    }
    return events[index]
  },

  // Eliminar evento
  deleteEvent: async (id: string): Promise<boolean> => {
    const index = events.findIndex(e => e.id === id)
    if (index === -1) return false
    events.splice(index, 1)
    return true
  }
}
