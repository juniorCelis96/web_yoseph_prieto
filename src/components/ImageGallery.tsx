'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

const galleryImages = [
  { id: '1', src: '/yp_gallery_1.jpeg' },
  { id: '2', src: '/yp_gallery_2.jpeg' },
  { id: '3', src: '/yp_gallery_3.jpeg' },
  { id: '4', src: '/yp_gallery_4.jpeg' },
  { id: '7', src: '/yp_gallery_7.jpeg' },
  { id: '8', src: '/yp_gallery_8.jpeg' },
  { id: '9', src: '/yp_gallery_9.jpeg' },
  { id: '10', src: '/yp_gallery_10.jpeg' },
  { id: '11', src: '/yp_gallery_11.jpeg' }
]

/** Cambio automático de slide cada 4 segundos */
const CAROUSEL_INTERVAL = 4000

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

  const goLightboxPrevious = useCallback(() => {
    setSelectedImage((i) => {
      if (i === null) return i
      return (i - 1 + galleryImages.length) % galleryImages.length
    })
  }, [])

  const goLightboxNext = useCallback(() => {
    setSelectedImage((i) => {
      if (i === null) return i
      return (i + 1) % galleryImages.length
    })
  }, [])

  // Bloquear scroll de fondo mientras el lightbox está abierto
  useEffect(() => {
    if (selectedImage === null) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [selectedImage])

  // Flechas del teclado en vista previa (← →, ciclo infinito)
  useEffect(() => {
    if (selectedImage === null) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        goLightboxPrevious()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        goLightboxNext()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [selectedImage, goLightboxPrevious, goLightboxNext])

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
                    alt={`Galería — imagen ${currentIndex + 1}`}
                    fill
                    className="object-cover object-[center_30%] cursor-pointer transition-opacity duration-300"
                    onClick={() => openLightbox(currentIndex)}
                    unoptimized
                    loading="eager"
                    priority={currentIndex === 0}
                  />
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
                      alt={`Miniatura galería ${index + 1}`}
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

      {/* Lightbox: portal a body para quedar por encima del navbar (main tiene z-10) */}
      {selectedImage !== null &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className="fixed inset-0 z-[10000] flex flex-col bg-walnut/97"
            style={{ height: '100dvh', maxHeight: '100dvh' }}
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Vista previa de imagen"
          >
            {/* Barra superior: Cerrar siempre visible, fuera del área de la imagen */}
            <div
              className="flex shrink-0 items-center justify-between gap-3 border-b border-gold/40 bg-walnut/95 px-3 py-3 sm:px-5 sm:py-4"
              style={{ paddingTop: 'max(0.75rem, env(safe-area-inset-top))' }}
              onClick={(e) => e.stopPropagation()}
            >
              <span className="font-display text-gold text-sm sm:text-base font-semibold truncate pr-2">
                Galería
              </span>
              <button
                type="button"
                onClick={closeLightbox}
                className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gold px-4 py-2.5 text-navy shadow-lg border-2 border-white font-display text-sm sm:text-base font-bold hover:bg-gold/90 active:scale-[0.98] transition-all"
                aria-label="Cerrar vista previa"
              >
                <X className="h-6 w-6 sm:h-7 sm:w-7 shrink-0" strokeWidth={2.5} />
                <span>Cerrar</span>
              </button>
            </div>

            {/* Imagen + flechas (ciclo: primera ← última, última → primera) */}
            <div
              className="relative min-h-0 flex-1 w-full p-2 sm:p-4"
              style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  goLightboxPrevious()
                }}
                className="absolute left-1 sm:left-3 top-1/2 z-[10001] -translate-y-1/2 rounded-full border-2 border-gold bg-navy/90 p-2 sm:p-3 text-gold shadow-lg transition-all hover:bg-navy hover:scale-110 active:scale-95"
                aria-label="Imagen anterior"
              >
                <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8" strokeWidth={2.5} />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  goLightboxNext()
                }}
                className="absolute right-1 sm:right-3 top-1/2 z-[10001] -translate-y-1/2 rounded-full border-2 border-gold bg-navy/90 p-2 sm:p-3 text-gold shadow-lg transition-all hover:bg-navy hover:scale-110 active:scale-95"
                aria-label="Siguiente imagen"
              >
                <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8" strokeWidth={2.5} />
              </button>

              <div className="relative h-full w-full max-w-[min(100%,96rem)] mx-auto rounded-lg border-2 border-gold/60 bg-navy/50 overflow-hidden">
                <Image
                  src={galleryImages[selectedImage].src}
                  alt={`Galería — imagen ampliada ${selectedImage + 1}`}
                  fill
                  sizes="100vw"
                  className="object-contain p-1"
                  unoptimized
                  priority
                />
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  )
}
