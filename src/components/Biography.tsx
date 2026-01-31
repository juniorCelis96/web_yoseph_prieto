import Image from 'next/image'
import { artistData } from '@/data/artistData'

export function Biography () {
  return (
    <section id="biografia" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Biografía
            </h2>
            <div className="w-24 h-1 bg-primary-500 mx-auto" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative aspect-square rounded-lg overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800"
                alt={artistData.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="space-y-6">
              <div className="prose prose-invert max-w-none">
                <p className="text-lg text-gray-300 leading-relaxed">
                  {artistData.longBio}
                </p>
              </div>

              {/* Highlights */}
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="text-center p-6 bg-gray-800/50 rounded-lg backdrop-blur-sm">
                  <div className="text-3xl font-bold text-primary-400 mb-2">10+</div>
                  <div className="text-gray-400 text-sm">Años de Experiencia</div>
                </div>
                <div className="text-center p-6 bg-gray-800/50 rounded-lg backdrop-blur-sm">
                  <div className="text-3xl font-bold text-primary-400 mb-2">100+</div>
                  <div className="text-gray-400 text-sm">Presentaciones</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
