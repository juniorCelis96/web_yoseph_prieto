'use client'

import Image from 'next/image'

export function WhatsAppButton () {
  const whatsappUrl = 'https://wa.me/573204852662'

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-gold hover:bg-forest rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border-2 border-gold glow-gold"
      aria-label="Contactar por WhatsApp"
    >
      <div className="relative w-10 h-10">
        <Image
          src="/wapp-logo.png"
          alt="WhatsApp"
          fill
          className="object-contain"
          unoptimized
        />
      </div>
      <span className="sr-only">Contactar por WhatsApp</span>
    </a>
  )
}
