'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Calendar, Plus, Edit, Trash2, LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'

interface Event {
  id: string
  title: string
  date: string
  time?: string
  location: string
  venue: string
  description?: string
  image?: string
  ticket_url?: string
  status: 'upcoming' | 'past'
  active?: boolean
}

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login/24f901ff-e665-44d4-9d9f-28c8ee059501')
    }
  }, [status, router])

  useEffect(() => {
    if (status === 'authenticated') {
      fetchEvents()
    }
  }, [status])

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events')
      if (!response.ok) throw new Error('Failed to fetch events')
      const data = await response.json()
      setEvents(data)
    } catch (err) {
      setError('Error al cargar eventos')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este evento?')) {
      return
    }

    try {
      const response = await fetch(`/api/events/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) throw new Error('Failed to delete event')
      
      setEvents(events.filter(e => e.id !== id))
    } catch (err) {
      alert('Error al eliminar evento')
      console.error(err)
    }
  }

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/' })
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center px-4">
        <div className="text-gold font-display text-2xl">Cargando...</div>
      </div>
    )
  }

  if (status === 'unauthenticated') {
    return null
  }

  return (
    <div className="min-h-screen bg-navy py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header móvil-friendly */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0 mb-6 sm:mb-8">
          <div>
            <h1 className="font-display text-gold text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
              Panel de Administración
            </h1>
            <p className="text-sand font-body text-sm sm:text-base">
              Gestiona los eventos de Yoseph Prieto
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            <Link
              href="/admin/events/new"
              className="bg-gold hover:bg-gold/90 text-navy font-display font-semibold px-4 sm:px-6 py-2.5 sm:py-3 rounded transition-all duration-300 inline-flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="whitespace-nowrap">Nuevo Evento</span>
            </Link>
            <button
              onClick={handleLogout}
              className="bg-forest hover:bg-forest/80 text-sand border-2 border-gold font-display font-semibold px-4 sm:px-6 py-2.5 sm:py-3 rounded transition-all duration-300 inline-flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="whitespace-nowrap">Salir</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-walnut/50 border border-red-500/50 text-red-200 px-4 py-3 rounded font-body mb-6">
            {error}
          </div>
        )}

        <div className="bg-forest border-2 border-gold rounded-lg p-4 sm:p-6">
          <h2 className="font-display text-gold text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
            <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
            Eventos ({events.length})
          </h2>

          {events.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <p className="text-sand font-body text-base sm:text-lg mb-4">
                No hay eventos registrados
              </p>
              <Link
                href="/admin/events/new"
                className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold/90 text-navy font-display font-semibold px-4 sm:px-6 py-2.5 sm:py-3 rounded transition-all duration-300 text-sm sm:text-base"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                Crear Primer Evento
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {events.map((event) => {
                const eventDate = new Date(event.date)
                const formattedDate = eventDate.toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })

                return (
                  <div
                    key={event.id}
                    className="bg-navy border-2 border-gold/50 rounded-lg p-4 sm:p-5 hover:border-gold transition-all duration-300"
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-3">
                      <h3 className="font-display text-gold text-lg sm:text-xl font-bold flex-1">
                        {event.title}
                      </h3>
                      <div className="flex flex-row sm:flex-col gap-2 sm:gap-1 items-start sm:items-end">
                        <span className={`px-2 py-1 rounded text-xs font-body whitespace-nowrap ${
                          event.status === 'upcoming'
                            ? 'bg-green-500/20 text-green-300'
                            : 'bg-gray-500/20 text-gray-300'
                        }`}>
                          {event.status === 'upcoming' ? 'Próximo' : 'Pasado'}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-body whitespace-nowrap ${
                          event.active === false
                            ? 'bg-red-500/20 text-red-300'
                            : 'bg-blue-500/20 text-blue-300'
                        }`}>
                          {event.active === false ? 'Inactivo' : 'Activo'}
                        </span>
                      </div>
                    </div>
                    <p className="text-sand font-body text-xs sm:text-sm mb-3 sm:mb-4">
                      {formattedDate} {event.time && `• ${event.time}`}
                    </p>
                    <p className="text-white font-body text-xs sm:text-sm mb-4">
                      {event.venue}, {event.location}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Link
                        href={`/admin/events/${event.id}`}
                        className="flex-1 bg-gold/20 hover:bg-gold/30 text-gold border border-gold font-display font-semibold px-3 sm:px-4 py-2 rounded transition-all duration-300 inline-flex items-center justify-center gap-2 text-sm"
                      >
                        <Edit className="w-4 h-4" />
                        Editar
                      </Link>
                      <button
                        onClick={() => handleDelete(event.id)}
                        className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/50 font-display font-semibold px-3 sm:px-4 py-2 rounded transition-all duration-300 inline-flex items-center justify-center gap-2 text-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                        Eliminar
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
