'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Play, Music, Calendar } from 'lucide-react'
import { artistData } from '@/data/artistData'
import { musicData } from '@/data/musicData'
import { SocialLinks } from './SocialLinks'

export function Hero () {
  const featuredMusic = musicData.find(m => m.featured)

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1920"
          alt={artistData.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Artist Name */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-4 animate-fade-in">
            {artistData.name}
          </h1>

          {/* Tagline */}
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-200 font-light mb-8">
            {artistData.tagline}
          </p>

          {/* Social Links */}
          <div className="flex justify-center mb-8">
            <SocialLinks iconSize="w-8 h-8" />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {featuredMusic && (
              <a
                href={featuredMusic.youtubeUrl || featuredMusic.spotifyUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 flex items-center space-x-2 shadow-lg"
              >
                <Play className="w-5 h-5" />
                <span>Escuchar Música</span>
              </a>
            )}
            <Link
              href="/#eventos"
              className="group bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 flex items-center space-x-2 border border-white/20"
            >
              <Calendar className="w-5 h-5" />
              <span>Próximos Eventos</span>
            </Link>
            <Link
              href="/#contacto"
              className="group bg-accent-600 hover:bg-accent-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 flex items-center space-x-2 shadow-lg"
            >
              <span>Contratar</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2" />
        </div>
      </div>
    </section>
  )
}
