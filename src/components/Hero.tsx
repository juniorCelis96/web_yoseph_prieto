'use client'

import { useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
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
                className="bg-transparent hover:bg-gold/20 backdrop-blur-sm text-gold hover:text-gold px-4 sm:px-6 md:px-5 py-2.5 sm:py-3 md:py-2.5 font-display text-sm sm:text-base md:text-sm font-semibold transition-all duration-300 border-2 border-gold rounded-md glow-gold text-center"
              >
                Escúchame en Spotify
              </a>
            )}
            <a
              href="https://www.youtube.com/@yosephprietooficial/videos"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent hover:bg-gold/20 backdrop-blur-sm text-gold hover:text-gold px-4 sm:px-6 md:px-5 py-2.5 sm:py-3 md:py-2.5 font-display text-sm sm:text-base md:text-sm font-semibold transition-all duration-300 border-2 border-gold rounded-md glow-gold text-center"
            >
              Escúchame en YouTube
            </a>
            <a
              href="/#contacto"
              onClick={handleContactClick}
              className="bg-transparent hover:bg-gold/20 backdrop-blur-sm text-gold hover:text-gold px-4 sm:px-6 md:px-5 py-2.5 sm:py-3 md:py-2.5 font-display text-sm sm:text-base md:text-sm font-semibold transition-all duration-300 border-2 border-gold rounded-md glow-gold text-center"
            >
              Contáctanos
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-gold/50 rounded-full flex justify-center backdrop-blur-sm">
          <div className="w-1 h-2 sm:h-3 bg-gold/50 rounded-full mt-1.5 sm:mt-2" />
        </div>
      </div>
    </section>
  )
}
