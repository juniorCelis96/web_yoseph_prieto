'use client'

import { MessageCircle } from 'lucide-react'
import { artistData } from '@/data/artistData'

export function WhatsAppButton () {
  const whatsappUrl = `https://wa.me/${artistData.contact.whatsapp.replace(/[^0-9]/g, '')}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
      <span className="sr-only">Contactar por WhatsApp</span>
    </a>
  )
}
