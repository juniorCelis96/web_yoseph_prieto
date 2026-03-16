'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const eventSchema = z.object({
  title: z.string().min(1, 'El título es requerido'),
  date: z.string().min(1, 'La fecha es requerida'),
  time: z.string().optional(),
  location: z.string().min(1, 'La ubicación es requerida'),
  venue: z.string().min(1, 'El lugar es requerido'),
  description: z.string().optional(),
  status: z.enum(['upcoming', 'past'], {
    required_error: 'El estado es requerido'
  }),
  active: z.union([z.boolean(), z.string()]).transform((val) => {
    if (typeof val === 'boolean') return val
    return val === 'true'
  }).default(true)
})

type EventFormData = z.infer<typeof eventSchema>

export default function NewEventPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      status: 'upcoming',
      active: true
    }
  })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login/24f901ff-e665-44d4-9d9f-28c8ee059501')
    }
  }, [status, router])

  const onSubmit = async (data: EventFormData) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...data
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create event')
      }

      router.push('/admin')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear evento')
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center px-4">
        <div className="text-gold font-display text-xl sm:text-2xl">Cargando...</div>
      </div>
    )
  }

  if (status === 'unauthenticated') {
    return null
  }

  return (
    <div className="min-h-screen bg-navy py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-gold hover:text-gold/80 font-display mb-3 sm:mb-4 transition-colors text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            Volver al Panel
          </Link>
          <h1 className="font-display text-gold text-3xl sm:text-4xl md:text-5xl font-bold">
            Nuevo Evento
          </h1>
        </div>

        <div className="bg-forest border-2 border-gold rounded-lg p-4 sm:p-6">
          {error && (
            <div className="bg-walnut/50 border border-red-500/50 text-red-200 px-3 sm:px-4 py-2.5 sm:py-3 rounded font-body mb-4 sm:mb-6 text-sm sm:text-base">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6">
            <div>
              <label htmlFor="title" className="block text-sand font-body mb-2 text-sm sm:text-base">
                Título *
              </label>
              <input
                id="title"
                {...register('title')}
                className="w-full bg-navy border-2 border-gold/50 rounded px-3 sm:px-4 py-2.5 sm:py-3 text-white font-body focus:outline-none focus:border-gold transition-colors text-sm sm:text-base"
              />
              {errors.title && (
                <p className="text-red-300 text-xs sm:text-sm mt-1 font-body">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label htmlFor="date" className="block text-sand font-body mb-2 text-sm sm:text-base">
                  Fecha *
                </label>
                <input
                  id="date"
                  type="date"
                  {...register('date')}
                  className="w-full bg-navy border-2 border-gold/50 rounded px-3 sm:px-4 py-2.5 sm:py-3 text-white font-body focus:outline-none focus:border-gold transition-colors text-sm sm:text-base"
                />
                {errors.date && (
                  <p className="text-red-300 text-xs sm:text-sm mt-1 font-body">
                    {errors.date.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="time" className="block text-sand font-body mb-2 text-sm sm:text-base">
                  Hora
                </label>
                <input
                  id="time"
                  type="time"
                  {...register('time')}
                  className="w-full bg-navy border-2 border-gold/50 rounded px-3 sm:px-4 py-2.5 sm:py-3 text-white font-body focus:outline-none focus:border-gold transition-colors text-sm sm:text-base"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label htmlFor="venue" className="block text-sand font-body mb-2 text-sm sm:text-base">
                  Lugar *
                </label>
                <input
                  id="venue"
                  {...register('venue')}
                  className="w-full bg-navy border-2 border-gold/50 rounded px-3 sm:px-4 py-2.5 sm:py-3 text-white font-body focus:outline-none focus:border-gold transition-colors text-sm sm:text-base"
                />
                {errors.venue && (
                  <p className="text-red-300 text-xs sm:text-sm mt-1 font-body">
                    {errors.venue.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="location" className="block text-sand font-body mb-2 text-sm sm:text-base">
                  Ubicación *
                </label>
                <input
                  id="location"
                  {...register('location')}
                  className="w-full bg-navy border-2 border-gold/50 rounded px-3 sm:px-4 py-2.5 sm:py-3 text-white font-body focus:outline-none focus:border-gold transition-colors text-sm sm:text-base"
                />
                {errors.location && (
                  <p className="text-red-300 text-xs sm:text-sm mt-1 font-body">
                    {errors.location.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sand font-body mb-2 text-sm sm:text-base">
                Descripción
              </label>
              <textarea
                id="description"
                {...register('description')}
                rows={4}
                className="w-full bg-navy border-2 border-gold/50 rounded px-3 sm:px-4 py-2.5 sm:py-3 text-white font-body focus:outline-none focus:border-gold transition-colors resize-none text-sm sm:text-base"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label htmlFor="status" className="block text-sand font-body mb-2 text-sm sm:text-base">
                  Estado *
                </label>
                <select
                  id="status"
                  {...register('status')}
                  className="w-full bg-navy border-2 border-gold/50 rounded px-3 sm:px-4 py-2.5 sm:py-3 text-white font-body focus:outline-none focus:border-gold transition-colors text-sm sm:text-base"
                >
                  <option value="upcoming">Próximo</option>
                  <option value="past">Pasado</option>
                </select>
                {errors.status && (
                  <p className="text-red-300 text-xs sm:text-sm mt-1 font-body">
                    {errors.status.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="active" className="block text-sand font-body mb-2 text-sm sm:text-base">
                  Estado de Visibilidad
                </label>
                <select
                  id="active"
                  {...register('active', { valueAsNumber: false })}
                  className="w-full bg-navy border-2 border-gold/50 rounded px-3 sm:px-4 py-2.5 sm:py-3 text-white font-body focus:outline-none focus:border-gold transition-colors text-sm sm:text-base"
                >
                  <option value="true">Activo (Visible en el sitio)</option>
                  <option value="false">Inactivo (Oculto)</option>
                </select>
                {errors.active && (
                  <p className="text-red-300 text-xs sm:text-sm mt-1 font-body">
                    {errors.active.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gold hover:bg-gold/90 text-navy font-display font-semibold px-4 sm:px-6 py-2.5 sm:py-3 rounded transition-all duration-300 inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                <Save className="w-4 h-4 sm:w-5 sm:h-5" />
                {loading ? 'Guardando...' : 'Guardar Evento'}
              </button>
              <Link
                href="/admin"
                className="flex-1 sm:flex-none bg-forest hover:bg-forest/80 text-sand border-2 border-gold font-display font-semibold px-4 sm:px-6 py-2.5 sm:py-3 rounded transition-all duration-300 inline-flex items-center justify-center text-sm sm:text-base"
              >
                Cancelar
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
