'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertCircle, Home } from 'lucide-react'

export default function Error ({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="text-center px-4 max-w-md">
        <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-6" />
        <h2 className="text-3xl font-semibold text-white mb-4">
          Algo salió mal
        </h2>
        <p className="text-gray-400 mb-8">
          {error.message || 'Ocurrió un error inesperado. Por favor, intenta nuevamente.'}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105"
          >
            Intentar de nuevo
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105"
          >
            <Home className="w-5 h-5" />
            <span>Volver al Inicio</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
