import Image from 'next/image'
import { Calendar, MapPin, Clock, ExternalLink } from 'lucide-react'
import { eventsData, type Event } from '@/data/eventsData'

export function EventsSection () {
  const upcomingEvents = eventsData.filter(e => e.status === 'upcoming')
  const pastEvents = eventsData.filter(e => e.status === 'past')

  return (
    <section id="eventos" className="py-20 bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Eventos
            </h2>
            <div className="w-24 h-1 bg-primary-500 mx-auto mb-4" />
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Próximas presentaciones y eventos pasados
            </p>
          </div>

          {/* Upcoming Events */}
          {upcomingEvents.length > 0 && (
            <div className="mb-16">
              <h3 className="text-2xl font-semibold text-white mb-8">Próximos Eventos</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {upcomingEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          )}

          {/* Past Events */}
          {pastEvents.length > 0 && (
            <div>
              <h3 className="text-2xl font-semibold text-white mb-8">Eventos Pasados</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastEvents.map((event) => (
                  <EventCard key={event.id} event={event} past />
                ))}
              </div>
            </div>
          )}

          {eventsData.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No hay eventos programados en este momento.</p>
              <p className="text-gray-500 mt-2">¡Mantente al tanto para futuras presentaciones!</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function EventCard ({ event, past = false }: { event: Event, past?: boolean }) {
  const eventDate = new Date(event.date)
  const formattedDate = eventDate.toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className={`group bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden hover:bg-gray-800 transition-all duration-300 ${past ? 'hover:scale-105' : 'hover:scale-105'} shadow-lg`}>
      {event.image && (
        <div className="relative h-48">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover"
          />
          {!past && (
            <div className="absolute top-4 right-4 bg-primary-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Próximamente
            </div>
          )}
        </div>
      )}
      <div className="p-6">
        <h3 className="text-2xl font-semibold text-white mb-4">{event.title}</h3>
        <div className="space-y-3 text-gray-300">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-primary-400" />
            <span>{formattedDate}</span>
          </div>
          {event.time && (
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-primary-400" />
              <span>{event.time}</span>
            </div>
          )}
          <div className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-primary-400" />
            <span>{event.venue}, {event.location}</span>
          </div>
        </div>
        {event.description && (
          <p className="text-gray-400 mt-4">{event.description}</p>
        )}
        {event.ticketUrl && !past && (
          <a
            href={event.ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105"
          >
            <span>Comprar Entradas</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  )
}
