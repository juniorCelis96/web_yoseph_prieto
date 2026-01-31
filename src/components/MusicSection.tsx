'use client'

import Image from 'next/image'
import { Play, ExternalLink, Music } from 'lucide-react'
import { musicData, type MusicRelease } from '@/data/musicData'

export function MusicSection () {
  const featuredReleases = musicData.filter(m => m.featured)
  const allReleases = musicData

  return (
    <section id="musica" className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Música
            </h2>
            <div className="w-24 h-1 bg-primary-500 mx-auto mb-4" />
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Descubre los últimos lanzamientos y éxitos de Yoseph Prieto
            </p>
          </div>

          {/* Featured Releases */}
          {featuredReleases.length > 0 && (
            <div className="mb-16">
              <h3 className="text-2xl font-semibold text-white mb-8">Destacados</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredReleases.map((release) => (
                  <MusicCard key={release.id} release={release} featured />
                ))}
              </div>
            </div>
          )}

          {/* All Releases */}
          <div>
            <h3 className="text-2xl font-semibold text-white mb-8">Todos los Lanzamientos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allReleases.map((release) => (
                <MusicCard key={release.id} release={release} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function MusicCard ({ release, featured = false }: { release: MusicRelease, featured?: boolean }) {
  return (
    <div className="group relative bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden hover:bg-gray-800 transition-all duration-300 hover:scale-105 shadow-lg">
      <div className="relative aspect-square">
        <Image
          src={release.coverImage}
          alt={release.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex gap-4">
            {release.spotifyUrl && (
              <a
                href={release.spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary-600 hover:bg-primary-700 text-white p-3 rounded-full transition-all hover:scale-110"
                aria-label={`Escuchar ${release.title} en Spotify`}
              >
                <Music className="w-5 h-5" />
              </a>
            )}
            {release.youtubeUrl && (
              <a
                href={release.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full transition-all hover:scale-110"
                aria-label={`Ver ${release.title} en YouTube`}
              >
                <Play className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
        {featured && (
          <div className="absolute top-4 right-4 bg-primary-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Destacado
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-400 uppercase tracking-wider">
            {release.type === 'single' ? 'Single' : release.type === 'album' ? 'Álbum' : 'EP'}
          </span>
          <span className="text-xs text-gray-400">
            {new Date(release.releaseDate).toLocaleDateString('es-ES', { year: 'numeric', month: 'long' })}
          </span>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">{release.title}</h3>
        <p className="text-gray-400 text-sm line-clamp-2">{release.description}</p>
      </div>
    </div>
  )
}
