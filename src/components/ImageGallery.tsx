'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

const galleryImages = [
  { id: '1', src: '/yp_gallery_1.jpeg', title: 'Presentación en Vivo' },
  { id: '2', src: '/yp_gallery_2.jpeg', title: 'En el Escenario' },
  { id: '3', src: '/yp_gallery_3.jpeg', title: 'Concierto' },
  { id: '4', src: '/yp_gallery_4.jpeg', title: 'Momentos Especiales' },
  { id: '7', src: '/yp_gallery_7.jpeg', title: 'En Acción' },
  { id: '8', src: '/yp_gallery_8.jpeg', title: 'En Vivo' },
  { id: '9', src: '/yp_gallery_9.jpeg', title: 'Presentación' },
  { id: '10', src: '/yp_gallery_10.jpeg', title: 'Concierto en Vivo' },
  { id: '11', src: '/yp_gallery_11.jpeg', title: 'Momentos Especiales' }
]

const CAROUSEL_INTERVAL = 4000 // Aumentado a 4 segundos para mejor UX

export function ImageGallery () {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Optimizar IntersectionObserver con useMemo
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

  // Función optimizada para resetear el intervalo
  const resetInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % galleryImages.length)
      }, CAROUSEL_INTERVAL)
    }
  }, [isPaused])

  // Carrusel automático optimizado
  useEffect(() => {
    if (!isPaused) {
      resetInterval()
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPaused, resetInterval])

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + galleryImages.length) % galleryImages.length)
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), CAROUSEL_INTERVAL)
  }, [])

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % galleryImages.length)
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), CAROUSEL_INTERVAL)
  }, [])

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), CAROUSEL_INTERVAL)
  }, [])

  const openLightbox = useCallback((index: number) => {
    setSelectedImage(index)
    setIsPaused(true)
  }, [])

  const closeLightbox = useCallback(() => {
    setSelectedImage(null)
    setIsPaused(false)
  }, [])

  // Memoizar la imagen actual para evitar re-renders innecesarios
  const currentImage = useMemo(() => galleryImages[currentIndex], [currentIndex])

  return (
    <>
      <section
        id="galeria"
        ref={sectionRef}
        className="py-12 sm:py-16 md:py-20 bg-forest relative"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Título */}
            <div className="text-center mb-10 sm:mb-12 md:mb-16 reveal">
              <h2 className="font-display text-gold text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
                Galería
              </h2>
              <div className="separator-diagonal mx-auto w-32 sm:w-48" />
            </div>

            {/* Carrusel */}
            <div className="reveal relative">
              {/* Imagen principal - Reducida de tamaño */}
              <div className="relative aspect-[3/2] md:aspect-[5/3] max-w-4xl mx-auto rounded-lg overflow-hidden border-2 border-gold bg-navy">
                <div className="relative w-full h-full">
                  <Image
                    src={currentImage.src}
                    alt={currentImage.title}
                    fill
                    className="object-cover object-[center_30%] cursor-pointer transition-opacity duration-300"
                    onClick={() => openLightbox(currentIndex)}
                    unoptimized
                    loading="eager"
                    priority={currentIndex === 0}
                  />
                  {/* Overlay con título */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-forest/90 via-forest/70 to-transparent p-4 sm:p-6">
                    <h3 className="font-display text-gold text-lg sm:text-xl md:text-2xl font-bold text-center">
                      {currentImage.title}
                    </h3>
                  </div>
                </div>

                {/* Botones de navegación */}
                <button
                  onClick={goToPrevious}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-navy/80 hover:bg-navy border-2 border-gold text-gold p-1.5 sm:p-2 rounded-full transition-all duration-300 hover:scale-110 z-10"
                  aria-label="Imagen anterior"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-6" />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-navy/80 hover:bg-navy border-2 border-gold text-gold p-1.5 sm:p-2 rounded-full transition-all duration-300 hover:scale-110 z-10"
                  aria-label="Siguiente imagen"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-6" />
                </button>
              </div>

              {/* Indicadores de puntos */}
              <div className="flex justify-center gap-2 mt-4 sm:mt-6">
                {galleryImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-2 sm:h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'bg-gold w-6 sm:w-8'
                        : 'bg-gold/30 hover:bg-gold/50 w-2 sm:w-3'
                    }`}
                    aria-label={`Ir a imagen ${index + 1}`}
                  />
                ))}
              </div>

              {/* Miniaturas */}
              <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-9 gap-2 mt-4 sm:mt-6">
                {galleryImages.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => goToSlide(index)}
                    className={`relative aspect-square rounded-md overflow-hidden border-2 transition-all duration-300 ${
                      index === currentIndex
                        ? 'border-gold scale-105'
                        : 'border-gold/30 hover:border-gold/60'
                    }`}
                  >
                    <Image
                      src={image.src}
                      alt={image.title}
                      fill
                      className="object-cover object-[center_30%]"
                      unoptimized
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 bg-walnut/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-3 sm:top-4 right-3 sm:right-4 text-gold hover:text-sand transition-colors z-10"
            aria-label="Cerrar"
          >
            <X className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>
          <div
            className="relative max-w-7xl max-h-[90vh] w-full h-full border-2 border-gold p-2 rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={galleryImages[selectedImage].src}
              alt={galleryImages[selectedImage].title}
              fill
              className="object-contain rounded-md"
              unoptimized
              priority
            />
            <div className="absolute bottom-0 left-0 right-0 bg-walnut/90 p-4 sm:p-6 border-t-2 border-gold rounded-b-lg">
              <h3 className="font-display text-gold text-lg sm:text-xl md:text-2xl font-bold mb-2">{galleryImages[selectedImage].title}</h3>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
