'use client'

import { useEffect, useRef } from 'react'
import { galleryData } from '@/data/galleryData'

export function VideoGallery () {
  const videos = galleryData.filter(item => item.type === 'video')
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
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      const elements = sectionRef.current.querySelectorAll('.reveal')
      elements.forEach((el) => observer.observe(el))
    }

    return () => observer.disconnect()
  }, [])

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)?.[1]
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url
  }

  if (videos.length === 0) return null

  return (
    <section className="py-20 bg-navy relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 reveal">
            <h2 className="font-display text-gold text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Videos
            </h2>
            <div className="separator-diagonal mx-auto w-48" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {videos.map((video, index) => (
              <div
                key={video.id}
                className="reveal border-2 border-gold p-2 bg-navy glow-gold hover:bg-navy/80 transition-all duration-300 rounded-lg"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative aspect-video">
                  <iframe
                    src={getYouTubeEmbedUrl(video.url)}
                    title={video.title}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="mt-4 p-4 bg-walnut/30 border-t-2 border-gold/30">
                  <h3 className="font-display text-gold text-xl font-bold mb-1">{video.title}</h3>
                  {video.description && (
                    <p className="text-sand font-body text-sm">{video.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
