'use client'

import { useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { Mail, ChevronDown } from 'lucide-react'
import { artistData } from '@/data/artistData'
import { musicData } from '@/data/musicData'
import { smoothScrollToElement } from '@/lib/smoothScroll'

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)

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

    if (heroRef.current) {
      const elements = heroRef.current.querySelectorAll('.reveal')
      elements.forEach((el) => observer.observe(el))
    }

    return () => observer.disconnect()
  }, [])

  const featuredMusic = musicData.find(m => m.featured)

  const handleContactClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    smoothScrollToElement('contacto')
  }, [])

  const handleGalleryClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    smoothScrollToElement('galeria')
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-navy pt-16 md:pt-20"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/yp_silueta.jpeg"
          alt="Silueta Yoseph Prieto"
          fill
          className="object-cover object-[center_30%] md:object-[center_25%] opacity-50 md:opacity-90"
          priority
          unoptimized
        />
        {/* Gradients to blend image into the background */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy/40 via-transparent to-navy" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/60 to-transparent md:w-2/3" />
      </div>

      {/* Contenido */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-left max-w-6xl w-full">
        <div className="space-y-6 sm:space-y-8 max-w-3xl">
          {/* Nombre artístico en gold moderno */}
          <h1 className="reveal font-display text-transparent text-gradient-gold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-none drop-shadow-2xl">
            {artistData.name}
          </h1>

          {/* Subtítulo en sand */}
          <p className="reveal text-sand text-lg sm:text-xl md:text-2xl lg:text-3xl font-body font-light tracking-wide drop-shadow-md">
            {artistData.tagline}
          </p>

          {/* Separador diagonal alineado a la izquierda */}
          <div className="reveal separator-diagonal w-32 sm:w-48 md:w-64" style={{ margin: '2rem 0' }}></div>

          {/* CTA Botones */}
          <div className="reveal flex flex-col sm:flex-row gap-3 sm:gap-4 flex-wrap">
            {featuredMusic?.spotifyUrl && (
              <a
                href={featuredMusic.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-transparent hover:bg-white/10 backdrop-blur-sm text-white border-2 border-white rounded-2xl px-4 sm:px-6 md:px-5 py-2.5 sm:py-3 md:py-2.5 font-display text-sm sm:text-base md:text-sm font-semibold transition-all duration-300 text-center"
              >
                <Image src="/spotify.svg" alt="" width={22} height={22} className="h-5 w-5 shrink-0 object-contain" unoptimized />
                Escúchame en Spotify
              </a>
            )}
            <a
              href="https://www.youtube.com/@yosephprietooficial/videos"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-transparent hover:bg-white/10 backdrop-blur-sm text-white border-2 border-white rounded-2xl px-4 sm:px-6 md:px-5 py-2.5 sm:py-3 md:py-2.5 font-display text-sm sm:text-base md:text-sm font-semibold transition-all duration-300 text-center"
            >
              <Image src="/youtube.png" alt="" width={22} height={22} className="h-5 w-5 shrink-0 object-contain brightness-0 invert" unoptimized />
              Escúchame en YouTube
            </a>
            <a
              href="/#contacto"
              onClick={handleContactClick}
              className="inline-flex items-center justify-center gap-2 bg-transparent hover:bg-white/10 backdrop-blur-sm text-white border-2 border-white rounded-2xl px-4 sm:px-6 md:px-5 py-2.5 sm:py-3 md:py-2.5 font-display text-sm sm:text-base md:text-sm font-semibold transition-all duration-300 text-center"
            >
              <Mail className="h-5 w-5 shrink-0" aria-hidden />
              Contáctanos
            </a>
          </div>
        </div>
      </div>

      {/* Ver más → Galería (solo móvil) */}
      <div className="md:hidden absolute bottom-[5.25rem] left-1/2 -translate-x-1/2 z-10 w-full max-w-xs px-4 flex justify-center">
        <a
          href="/#galeria"
          onClick={handleGalleryClick}
          className="inline-flex items-center justify-center gap-2 bg-transparent hover:bg-white/10 backdrop-blur-sm text-white border-2 border-white rounded-2xl px-5 py-2.5 font-display text-sm font-semibold transition-all duration-300"
        >
          Ver más
          <ChevronDown className="h-5 w-5 shrink-0" strokeWidth={2.5} aria-hidden />
        </a>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/40 rounded-full flex justify-center backdrop-blur-sm">
          <div className="w-1 h-2 sm:h-3 bg-white/50 rounded-full mt-1.5 sm:mt-2" />
        </div>
      </div>
    </section>
  )
}
