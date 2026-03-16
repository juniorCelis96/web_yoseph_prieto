import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { createServerClient } from './supabase'

// En producción NextAuth exige un secret para firmar cookies/JWT
const secret = process.env.NEXTAUTH_SECRET
if (process.env.NODE_ENV === 'production' && !secret) {
  console.error(
    '[next-auth] NEXTAUTH_SECRET no está definido en producción. ' +
    'Añade la variable NEXTAUTH_SECRET en tu plataforma (ej. Vercel → Settings → Environment Variables). ' +
    'Genera uno con: openssl rand -base64 32'
  )
}

export const authOptions: NextAuthOptions = {
  secret: secret || undefined,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Contraseña', type: 'password' },
        uuid: { label: 'UUID', type: 'text' }
      },
      async authorize(credentials) {
        const adminUuid = process.env.ADMIN_UUID
        const adminEmail = process.env.ADMIN_EMAIL
        
        // Validar que el UUID en la URL sea correcto
        if (!adminUuid || credentials?.uuid !== adminUuid) {
          return null
        }
        
        // Validar que el email coincida con el admin email configurado
        if (!adminEmail || credentials?.email !== adminEmail) {
          return null
        }
        
        // Validar que tengamos las credenciales necesarias
        if (!credentials?.email || !credentials?.password) {
          return null
        }
        
        // Crear cliente de Supabase para autenticación
        const supabase = createServerClient()
        
        if (!supabase) {
          throw new Error('Supabase no está configurado correctamente')
        }
        
        // Autenticar con Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password
        })
        
        if (authError || !authData.user) {
          return null
        }
        
        // Verificar que el usuario tenga el rol de admin en metadata
        const userMetadata = authData.user.user_metadata
        const isAdmin = userMetadata?.role === 'admin' || credentials.email === adminEmail
        
        if (!isAdmin) {
          return null
        }
        
        return {
          id: authData.user.id,
          name: authData.user.user_metadata?.name || 'Admin',
          email: authData.user.email || credentials.email
        }
      }
    })
  ],
  pages: {
    signIn: '/login/24f901ff-e665-44d4-9d9f-28c8ee059501'
  },
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.email = token.email as string
      }
      return session
    }
  }
}
