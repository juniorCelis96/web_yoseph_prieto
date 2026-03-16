'use client'

import { useEffect, useRef, useMemo } from 'react'
import Image from 'next/image'
import { artistData } from '@/data/artistData'

export function Biography () {
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

  // Memoizar el split de la biografía para evitar recalcular
  const bioParagraphs = useMemo(() => artistData.longBio.split('\n\n'), [])

  return (
    <section
      id="biografia"
      ref={sectionRef}
      className="py-12 sm:py-16 md:py-20 bg-forest relative"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Título */}
          <div className="text-center mb-8 sm:mb-10 md:mb-12 reveal">
            <h2 className="font-display text-gold text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              Biografía
            </h2>
            <div className="separator-diagonal mx-auto w-32 sm:w-48" />
          </div>

          {/* Layout dos columnas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
            {/* Foto izquierda */}
            <div className="reveal relative aspect-[4/5] order-2 lg:order-1">
              <div className="relative w-full h-full border-2 border-gold p-2 rounded-lg">
                <Image
                  src="/yp_img_biografia.jpeg"
                  alt={artistData.name}
                  fill
                  className="object-cover object-[center_30%] rounded-md"
                  unoptimized
                  loading="lazy"
                />
              </div>
            </div>

            {/* Texto derecha */}
            <div className="reveal order-1 lg:order-2 space-y-4 sm:space-y-6">
              <div className="prose prose-invert max-w-none">
                <p className="text-white text-base sm:text-lg md:text-xl font-body leading-relaxed mb-3 sm:mb-4">
                  {bioParagraphs[0]}
                </p>
                <p className="text-sand text-sm sm:text-base md:text-lg font-body leading-relaxed mb-3 sm:mb-4">
                  {bioParagraphs[1]}
                </p>
                <p className="text-white text-base sm:text-lg md:text-xl font-body leading-relaxed">
                  {bioParagraphs[2]}
                </p>
              </div>

              {/* Información adicional */}
              <div className="pt-4 sm:pt-6 border-t border-gold/30">
                <p className="text-sand font-body text-xs sm:text-sm md:text-base">
                  <span className="text-gold font-semibold">Origen:</span> {artistData.location.city}, {artistData.location.department}
                </p>
                <p className="text-sand font-body text-xs sm:text-sm md:text-base mt-2">
                  <span className="text-gold font-semibold">Género:</span> Música Ranchera, Popular, Carranga
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
