'use client'

import { useState, useEffect, useRef } from 'react'
import { Send, Mail, Phone, MessageSquare, Loader2 } from 'lucide-react'
import { Button } from './ui/Button'
import { Input } from './ui/Input'
import { Textarea } from './ui/Textarea'
import { SocialLinks } from './SocialLinks'
import { cn } from '@/lib/utils'

interface FormData {
  name: string
  email: string
  phone: string
  eventType: string
  eventDate: string
  message: string
}

interface FormErrors {
  name: string
  email: string
  phone: string
  eventType: string
  message: string
}

export function ContactForm () {
  const sectionRef = useRef<HTMLElement>(null)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    message: ''
  })
  const [showError, setShowError] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<FormErrors>({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    message: ''
  })

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
  }, [])

  useEffect(() => {
    if (showSuccess || showError) {
      const timer = setTimeout(() => {
        setShowSuccess(false)
        setShowError(false)
        setMessage('')
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [showSuccess, showError])

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      name: '',
      email: '',
      phone: '',
      eventType: '',
      message: ''
    }
    let isValid = true

    // Validar nombre
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres'
      isValid = false
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = 'El formato del email no es válido'
      isValid = false
    }

    // Validar teléfono
    if (!formData.phone.trim() || formData.phone.trim().length < 10) {
      newErrors.phone = 'El teléfono debe tener al menos 10 dígitos'
      isValid = false
    }

    // Validar tipo de evento
    if (!formData.eventType.trim()) {
      newErrors.eventType = 'Selecciona un tipo de evento'
      isValid = false
    }

    // Validar mensaje
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = 'El mensaje debe tener al menos 10 caracteres'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    // Limpiar error del campo al escribir
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()

    if (!validateForm()) {
      setShowError(true)
      setMessage('Por favor corrige los errores en el formulario')
      return
    }

    setIsSubmitting(true)
    setShowError(false)
    setShowSuccess(false)

    try {
      // Construir el mensaje completo con todos los datos
      const fullMessage = `Teléfono: ${formData.phone}\nTipo de Evento: ${formData.eventType}${formData.eventDate ? `\nFecha del Evento: ${formData.eventDate}` : ''}\n\nMensaje:\n${formData.message}`

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: fullMessage
        })
      })

      const result = await response.json()

      if (response.ok && result.success === true) {
        setShowSuccess(true)
        setMessage(result.message || '¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.')
        setFormData({
          name: '',
          email: '',
          phone: '',
          eventType: '',
          eventDate: '',
          message: ''
        })
        setErrors({
          name: '',
          email: '',
          phone: '',
          eventType: '',
          message: ''
        })
      } else {
        setShowError(true)
        setMessage(result.message || 'Error al enviar el mensaje. Por favor inténtalo de nuevo.')
      }
    } catch (error) {
      setShowError(true)
      if (error instanceof Error && error.message.includes('fetch')) {
        setMessage('Error de conexión. Verifica tu conexión a internet e inténtalo de nuevo.')
      } else {
        setMessage('Error al enviar el mensaje. Por favor contacta por WhatsApp.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="contacto"
      ref={sectionRef}
      className="py-12 sm:py-16 md:py-20 bg-walnut relative"
      style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-18c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23C9A84C\' fill-opacity=\'0.03\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")'
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Título */}
          <div className="text-center mb-8 sm:mb-10 md:mb-12 reveal">
            <h2 className="font-display text-gold text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              Contacto
            </h2>
            <div className="separator-diagonal mx-auto w-32 sm:w-48" />
          </div>

          {/* Layout: Formulario a la izquierda, Info de contacto a la derecha (desktop) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 reveal items-stretch">
            {/* Formulario */}
            <form onSubmit={handleSubmit} noValidate className="bg-walnut/50 border-2 border-gold p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-5 md:space-y-6 rounded-lg flex flex-col">
              {/* Alertas */}
              {showSuccess && (
                <div className="bg-green-500/20 border-2 border-green-500 text-green-300 px-4 py-3 rounded-md text-sm font-body transition-all duration-300">
                  {message}
                </div>
              )}
              {showError && (
                <div className="bg-red-500/20 border-2 border-red-500 text-red-300 px-4 py-3 rounded-md text-sm font-body transition-all duration-300">
                  {message}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* Campo Nombre */}
                <div>
                  <label htmlFor="name" className="block text-sand font-body font-medium mb-2 text-sm sm:text-base">
                    Nombre Completo *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Tu nombre"
                    className={cn(
                      errors.name && 'border-red-500 focus-visible:ring-red-500'
                    )}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs sm:text-sm text-red-400 font-body">{errors.name}</p>
                  )}
                </div>

                {/* Campo Email */}
                <div>
                  <label htmlFor="email" className="block text-sand font-body font-medium mb-2 text-sm sm:text-base">
                    Correo Electrónico *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="tu@email.com"
                    className={cn(
                      errors.email && 'border-red-500 focus-visible:ring-red-500'
                    )}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs sm:text-sm text-red-400 font-body">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* Campo Teléfono */}
                <div>
                  <label htmlFor="phone" className="block text-sand font-body font-medium mb-2 text-sm sm:text-base">
                    Teléfono *
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+57 300 123 4567"
                    className={cn(
                      errors.phone && 'border-red-500 focus-visible:ring-red-500'
                    )}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs sm:text-sm text-red-400 font-body">{errors.phone}</p>
                  )}
                </div>

                {/* Campo Tipo de Evento */}
                <div>
                  <label htmlFor="eventType" className="block text-sand font-body font-medium mb-2 text-sm sm:text-base">
                    Tipo de Evento *
                  </label>
                  <select
                    id="eventType"
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleInputChange}
                    className={cn(
                      'w-full h-10 rounded-md border-2 bg-walnut px-3 py-2 text-sm text-white font-body focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                      errors.eventType ? 'border-red-500 focus-visible:ring-red-500' : 'border-gold focus-visible:ring-gold'
                    )}
                  >
                    <option value="">Selecciona un tipo</option>
                    <option value="fiesta">Fiesta</option>
                    <option value="feria">Feria</option>
                    <option value="festival">Festival</option>
                    <option value="evento-privado">Evento Privado</option>
                    <option value="otro">Otro</option>
                  </select>
                  {errors.eventType && (
                    <p className="mt-1 text-xs sm:text-sm text-red-400 font-body">{errors.eventType}</p>
                  )}
                </div>
              </div>

              {/* Campo Fecha del Evento */}
              <div>
                <label htmlFor="eventDate" className="block text-sand font-body font-medium mb-2 text-sm sm:text-base">
                  Fecha del Evento (Opcional)
                </label>
                <Input
                  id="eventDate"
                  name="eventDate"
                  type="date"
                  value={formData.eventDate}
                  onChange={handleInputChange}
                />
              </div>

              {/* Campo Mensaje */}
              <div>
                <label htmlFor="message" className="block text-sand font-body font-medium mb-2 text-sm sm:text-base">
                  Mensaje *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Cuéntanos sobre tu evento..."
                  rows={5}
                  className={cn(
                    errors.message && 'border-red-500 focus-visible:ring-red-500'
                  )}
                />
                {errors.message && (
                  <p className="mt-1 text-xs sm:text-sm text-red-400 font-body">{errors.message}</p>
                )}
              </div>

              {/* Botón de envío */}
              <div className="mt-auto pt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full"
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Enviando mensaje...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Enviar Mensaje
                    </>
                  )}
                </Button>
              </div>
            </form>

            {/* Información de Contacto (Tarjeta derecha en desktop) */}
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-walnut/50 border-2 border-gold/30 p-4 sm:p-6 md:p-8 rounded-lg h-full flex flex-col">
                <h3 className="font-display text-gold text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
                  Información de Contacto
                </h3>
                <div className="space-y-4 flex-1">
                  <div className="flex items-start space-x-3">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-display text-gold font-medium mb-1 text-sm sm:text-base">Email</h4>
                      <a
                        href="mailto:oficialyoseph.prieto@gmail.com"
                        className="text-white hover:text-white/80 transition-colors font-body text-sm sm:text-base break-all"
                      >
                        oficialyoseph.prieto@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-display text-gold font-medium mb-1 text-sm sm:text-base">Teléfono</h4>
                      <a
                        href="tel:+573204852662"
                        className="text-white hover:text-white/80 transition-colors font-body text-sm sm:text-base"
                      >
                        +57 320 485 2662
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-white mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-display text-gold font-medium mb-1 text-sm sm:text-base">WhatsApp</h4>
                      <a
                        href="https://wa.me/573204852662"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-white/80 transition-colors font-body text-sm sm:text-base"
                      >
                        Enviar Mensaje
                      </a>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/20 mt-4">
                    <h4 className="font-display text-gold font-medium mb-3 text-sm sm:text-base">Redes Sociales</h4>
                    <SocialLinks showLabels variant="light" iconSize="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
