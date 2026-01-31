import Link from 'next/link'
import { Home, Music } from 'lucide-react'

export default function NotFound () {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="text-center px-4">
        <Music className="w-24 h-24 text-primary-400 mx-auto mb-6 animate-pulse" />
        <h1 className="text-6xl md:text-8xl font-display font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-300 mb-4">
          Página no encontrada
        </h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>
        <Link
          href="/"
          className="inline-flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105"
        >
          <Home className="w-5 h-5" />
          <span>Volver al Inicio</span>
        </Link>
      </div>
    </div>
  )
}
