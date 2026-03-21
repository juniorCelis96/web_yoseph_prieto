'use client'

import { useEffect, useRef, memo } from 'react'
import Image from 'next/image'
import { Play } from 'lucide-react'
import { musicData, type MusicRelease } from '@/data/musicData'

export function MusicSection () {
  const sectionRef = useRef<HTMLElement>(null)

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

  return (
    <section
      id="musica"
      ref={sectionRef}
      className="py-12 sm:py-16 md:py-20 bg-navy relative"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Título */}
          <div className="text-center mb-10 sm:mb-12 md:mb-16 reveal">
            <h2 className="font-display text-gold text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              Música
            </h2>
            <div className="separator-diagonal mx-auto w-32 sm:w-48" />
          </div>

          {/* Video oficial — El Esmeraldero (versión Norteña) */}
          <div className="reveal mb-10 sm:mb-12 md:mb-14 max-w-4xl mx-auto">
            <h3 className="font-display text-gold text-xl sm:text-2xl md:text-3xl font-bold text-center mb-3 sm:mb-4">
              El Esmeraldero — versión Norteña
            </h3>
            <p className="text-sand font-body text-sm sm:text-base text-center mb-4 sm:mb-5 max-w-2xl mx-auto">
              Video oficial en 4K del lanzamiento. Dale play y comparte el sonido popular de Boyacá.
            </p>
            <div className="relative w-full aspect-video rounded-lg overflow-hidden border-2 border-gold bg-navy shadow-lg">
              <iframe
                className="absolute inset-0 h-full w-full"
                src="https://www.youtube.com/embed/_dCfw52gv4E"
                title="El Esmeraldero - Yoseph Prieto Oficial (Video Oficial)"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>

          {/* Cards horizontales */}
          <div className="space-y-4 sm:space-y-6">
            {musicData.map((release, index) => (
              <MusicCard
                key={release.id}
                release={release}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const MusicCard = memo(function MusicCard ({ release, index }: { release: MusicRelease, index: number }) {
  return (
    <div className="reveal bg-navy border-2 border-gold p-4 sm:p-6 md:p-8 hover:bg-navy/80 transition-all duration-300 glow-gold group rounded-lg">
      <div className="flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8 items-center">
        {/* Imagen carátula */}
        <div className="flex-shrink-0">
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 border-2 border-gold rounded-lg overflow-hidden bg-navy group-hover:bg-gold/10 transition-colors">
            <Image
              src={release.coverImage}
              alt={release.title}
              fill
              className="object-cover rounded-md"
              unoptimized
              loading={index < 2 ? 'eager' : 'lazy'}
            />
          </div>
        </div>

        {/* Contenido */}
        <div className="flex-1 text-center md:text-left">
          <h3 className="font-display text-gold text-xl sm:text-2xl md:text-3xl font-bold mb-2">
            {release.title}
          </h3>
          <p className="text-sand font-body text-sm sm:text-base md:text-lg mb-3 sm:mb-4">
            {release.description}
          </p>
          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center md:justify-start">
            {release.spotifyUrl && (
              <a
                href={release.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gold hover:bg-forest text-navy hover:text-gold px-4 sm:px-6 py-2 font-display font-semibold transition-all duration-300 border-2 border-gold rounded-md text-sm sm:text-base"
              >
                <Play className="w-4 h-4" />
                <span>Escuchar en Spotify</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
})
