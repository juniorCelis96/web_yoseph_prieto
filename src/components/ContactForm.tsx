'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Send, Mail, Phone, MessageSquare } from 'lucide-react'
import { artistData } from '@/data/artistData'

const contactSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(10, 'El teléfono debe tener al menos 10 dígitos'),
  eventType: z.string().min(1, 'Selecciona un tipo de evento'),
  eventDate: z.string().optional(),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres')
})

type ContactFormData = z.infer<typeof contactSchema>

export function ContactForm () {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  })

  const onSubmit = async (data: ContactFormData) => {
    // Here you would typically send the data to your backend/API
    console.log('Form data:', data)
    
    // For now, we'll create a mailto link or WhatsApp message
    const whatsappMessage = `Hola, soy ${data.name}. Me interesa contratar para: ${data.eventType}${data.eventDate ? ` el ${data.eventDate}` : ''}. ${data.message}`
    const whatsappUrl = `https://wa.me/${artistData.contact.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(whatsappMessage)}`
    
    window.open(whatsappUrl, '_blank')
    reset()
  }

  return (
    <section id="contacto" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Contacto
            </h2>
            <div className="w-24 h-1 bg-primary-500 mx-auto mb-4" />
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              ¿Interesado en contratar para tu evento? Contáctanos y te responderemos lo antes posible.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-6 bg-gray-800/50 rounded-lg backdrop-blur-sm">
              <Phone className="w-8 h-8 text-primary-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">Teléfono</h3>
              <a href={`tel:${artistData.contact.phone}`} className="text-gray-400 hover:text-white transition-colors">
                {artistData.contact.phone}
              </a>
            </div>
            <div className="text-center p-6 bg-gray-800/50 rounded-lg backdrop-blur-sm">
              <Mail className="w-8 h-8 text-primary-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">Email</h3>
              <a href={`mailto:${artistData.contact.email}`} className="text-gray-400 hover:text-white transition-colors">
                {artistData.contact.email}
              </a>
            </div>
            <div className="text-center p-6 bg-gray-800/50 rounded-lg backdrop-blur-sm">
              <MessageSquare className="w-8 h-8 text-primary-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">WhatsApp</h3>
              <a
                href={`https://wa.me/${artistData.contact.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Enviar Mensaje
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-white font-medium mb-2">
                  Nombre Completo *
                </label>
                <input
                  {...register('name')}
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Tu nombre"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-white font-medium mb-2">
                  Email *
                </label>
                <input
                  {...register('email')}
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="tu@email.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-white font-medium mb-2">
                  Teléfono *
                </label>
                <input
                  {...register('phone')}
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="+1234567890"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-400">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="eventType" className="block text-white font-medium mb-2">
                  Tipo de Evento *
                </label>
                <select
                  {...register('eventType')}
                  id="eventType"
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Selecciona un tipo</option>
                  <option value="concierto">Concierto</option>
                  <option value="fiesta-privada">Fiesta Privada</option>
                  <option value="evento-corporativo">Evento Corporativo</option>
                  <option value="festival">Festival</option>
                  <option value="boda">Boda</option>
                  <option value="otro">Otro</option>
                </select>
                {errors.eventType && (
                  <p className="mt-1 text-sm text-red-400">{errors.eventType.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="eventDate" className="block text-white font-medium mb-2">
                Fecha del Evento (Opcional)
              </label>
              <input
                {...register('eventDate')}
                type="date"
                id="eventDate"
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-white font-medium mb-2">
                Mensaje *
              </label>
              <textarea
                {...register('message')}
                id="message"
                rows={5}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                placeholder="Cuéntanos sobre tu evento..."
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
            >
              <Send className="w-5 h-5" />
              <span>{isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
