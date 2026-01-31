import { Music } from 'lucide-react'

export default function Loading () {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="text-center">
        <Music className="w-16 h-16 text-primary-400 mx-auto mb-4 animate-pulse" />
        <p className="text-gray-400">Cargando...</p>
      </div>
    </div>
  )
}
