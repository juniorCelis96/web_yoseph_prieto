'use client'

import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { Calendar, MapPin, Clock } from 'lucide-react'

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

export function EventsSection () {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const sectionRef = useRef<HTMLElement>(null)

  const fetchEvents = useCallback(async () => {
    try {
      const response = await fetch('/api/events')
      if (!response.ok) throw new Error('Failed to fetch events')
      const data = await response.json()
      // Filtrar solo eventos activos y próximos
      const upcomingEvents = data.filter((e: Event) => 
        e.status === 'upcoming' && (e.active === true || e.active === undefined)
      )
      // Ordenar en orden ascendente (próximos primero)
      upcomingEvents.sort((a: Event, b: Event) => {
        const dateA = new Date(a.date).getTime()
        const dateB = new Date(b.date).getTime()
        return dateA - dateB
      })
      setEvents(upcomingEvents)
    } catch (error) {
      console.error('Error fetching events:', error)
      setEvents([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchEvents()
  }, [fetchEvents])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
          }
        })
      },
      { threshold: 0.1, rootMargin: '50px' }
    )

    if (sectionRef.current) {
      const elements = sectionRef.current.querySelectorAll('.reveal')
      elements.forEach((el) => observer.observe(el))
    }

    return () => observer.disconnect()
  }, [events])

  // Memoizar si necesita scroll
  const needsScroll = useMemo(() => events.length > 2, [events.length])

  if (loading) {
    return (
      <section id="eventos" ref={sectionRef} className="py-12 sm:py-16 md:py-20 bg-navy relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <p className="text-sand font-body text-sm sm:text-base">Cargando eventos...</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (events.length === 0) {
    return (
      <section id="eventos" ref={sectionRef} className="py-12 sm:py-16 md:py-20 bg-navy relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center reveal">
              <h2 className="font-display text-gold text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
                Próximos Eventos
              </h2>
              <div className="separator-diagonal mx-auto w-32 sm:w-48 mb-6 sm:mb-8" />
              <div className="bg-navy border-2 border-gold rounded-lg p-6 sm:p-8 md:p-12 max-w-2xl mx-auto">
                <p className="font-display text-gold text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">
                  No hay eventos disponibles
                </p>
                <p className="font-body text-sand text-base sm:text-lg md:text-xl">
                  - Yoseph Prieto
                </p>
                <p className="font-display text-gold text-lg sm:text-xl md:text-2xl font-semibold mt-4 sm:mt-6">
                  &quot;Vamos Pa&apos; lante.&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="eventos" ref={sectionRef} className="py-12 sm:py-16 md:py-20 bg-navy relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 md:mb-16 reveal">
            <h2 className="font-display text-gold text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              Próximos Eventos
            </h2>
            <div className="separator-diagonal mx-auto w-32 sm:w-48" />
          </div>

          {/* Contenedor con scroll horizontal si es necesario */}
          <div className={`${needsScroll ? 'overflow-x-auto' : ''} custom-scrollbar pb-4`}>
            <div className={`flex ${needsScroll ? 'flex-row' : 'flex-col md:grid md:grid-cols-2'} gap-4 sm:gap-6 md:gap-8 ${needsScroll ? 'md:flex-row' : ''}`}>
              {events.map((event, index) => (
                <div key={event.id} className={`${needsScroll ? 'min-w-[280px] sm:min-w-[320px] md:min-w-[400px] flex-shrink-0' : 'w-full'}`}>
                  <EventCard
                    event={event}
                    index={index}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function EventCard ({ event, index }: { event: Event, index: number }) {
  const formattedDate = useMemo(() => {
    const eventDate = new Date(event.date)
    return eventDate.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }, [event.date])

  return (
    <div
      className="reveal bg-navy border-2 border-gold p-4 sm:p-5 md:p-6 hover:bg-navy/80 transition-all duration-300 glow-gold rounded-lg"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <h3 className="font-display text-gold text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">{event.title}</h3>
      <div className="space-y-2 sm:space-y-3 text-sand font-body text-sm sm:text-base">
        <div className="flex items-start sm:items-center space-x-2">
          <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gold flex-shrink-0 mt-0.5 sm:mt-0" />
          <span className="break-words">{formattedDate}</span>
        </div>
        {event.time && (
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-gold flex-shrink-0" />
            <span>{event.time}</span>
          </div>
        )}
        <div className="flex items-start sm:items-center space-x-2">
          <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gold flex-shrink-0 mt-0.5 sm:mt-0" />
          <span className="break-words">{event.venue}, {event.location}</span>
        </div>
      </div>
      {event.description && (
        <p className="text-white font-body mt-3 sm:mt-4 text-sm sm:text-base">{event.description}</p>
      )}
    </div>
  )
}
