'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { AlertCircle } from 'lucide-react'

const ADMIN_UUID = '24f901ff-e665-44d4-9d9f-28c8ee059501'

export default function LoginPage() {
  const params = useParams()
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const uuid = params?.uuid as string

  useEffect(() => {
    // Validar que el UUID en la URL coincida con el UUID fijo
    if (uuid !== ADMIN_UUID) {
      setError('Ruta de acceso inválida')
    }
  }, [uuid])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!email || !password) {
      setError('Email y contraseña son requeridos')
      return
    }

    setLoading(true)

    try {
      // Envía email, contraseña y UUID para validación
      const result = await signIn('credentials', {
        email,
        password,
        uuid: ADMIN_UUID,
        redirect: false
      })

      if (result?.error) {
        setError('Credenciales inválidas')
      } else if (result?.ok) {
        router.push('/admin')
      }
    } catch (err) {
      setError('Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  if (uuid !== ADMIN_UUID) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="bg-forest border-2 border-red-500/50 rounded-lg p-6 sm:p-8 shadow-lg">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-red-500/20 rounded-full mb-4">
                <AlertCircle className="w-6 h-6 sm:w-8 sm:h-8 text-red-400" />
              </div>
              <h1 className="font-display text-red-400 text-xl sm:text-2xl md:text-3xl font-bold mb-2">
                Acceso Denegado
              </h1>
              <p className="text-sand font-body text-sm sm:text-base">
                Ruta de acceso inválida
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-forest border-2 border-gold rounded-lg p-6 sm:p-8 shadow-lg">
          {/* Logo encima del formulario */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="relative h-20 w-44 sm:h-24 sm:w-56 md:h-32 md:w-72">
              <Image
                src="/logo_yp_transparente.png"
                alt="Yoseph Prieto Logo"
                fill
                className="object-contain"
                priority
                unoptimized
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            {error && (
              <div className="bg-walnut/50 border border-red-500/50 text-red-200 px-3 sm:px-4 py-2.5 sm:py-3 rounded font-body flex items-center gap-2 text-sm sm:text-base">
                <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sand font-body mb-2 text-sm sm:text-base">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-navy border-2 border-gold/50 rounded px-3 sm:px-4 py-2.5 sm:py-3 text-white font-body focus:outline-none focus:border-gold transition-colors text-sm sm:text-base"
                placeholder="Ingresa tu email"
                autoComplete="email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sand font-body mb-2 text-sm sm:text-base">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-navy border-2 border-gold/50 rounded px-3 sm:px-4 py-2.5 sm:py-3 text-white font-body focus:outline-none focus:border-gold transition-colors text-sm sm:text-base"
                placeholder="Ingresa tu contraseña"
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gold hover:bg-gold/90 text-navy font-display font-semibold py-2.5 sm:py-3 px-6 rounded transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              {loading ? 'Verificando...' : 'Iniciar Sesión'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
