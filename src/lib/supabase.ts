import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Helper function to validate if a URL is valid
function isValidUrl(url: string | undefined): boolean {
  if (!url) return false
  // Check if it's a placeholder value
  if (url.includes('your-') || url.includes('placeholder') || url === '') {
    return false
  }
  // Check if it's a valid HTTP/HTTPS URL
  try {
    const parsedUrl = new URL(url)
    return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:'
  } catch {
    return false
  }
}

// Client-side Supabase client (opcional)
export const supabase = 
  supabaseUrl && 
  supabaseAnonKey && 
  isValidUrl(supabaseUrl) && 
  supabaseAnonKey.length > 20 // Basic validation for JWT token
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null

// Server-side Supabase client for admin operations
export function createServerClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  
  if (!supabaseUrl || !serviceRoleKey || !isValidUrl(supabaseUrl) || serviceRoleKey.length < 20) {
    // Retornar null si no está configurado - las APIs manejarán esto
    return null
  }
  
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}
