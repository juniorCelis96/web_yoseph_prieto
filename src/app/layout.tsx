import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { WhatsAppButton } from '@/components/WhatsAppButton'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap'
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://yosephprieto.com'),
  title: {
    default: 'Yoseph Prieto Oficial | Artista Musical',
    template: '%s | Yoseph Prieto Oficial'
  },
  description: 'Página oficial del artista musical Yoseph Prieto. Escucha su música, conoce su trayectoria y contáctalo para eventos y presentaciones.',
  keywords: ['Yoseph Prieto', 'música', 'artista', 'eventos', 'contrataciones', 'conciertos', 'música en vivo'],
  authors: [{ name: 'Yoseph Prieto' }],
  creator: 'Yoseph Prieto',
  publisher: 'Yoseph Prieto Oficial',
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  openGraph: {
    title: 'Yoseph Prieto Oficial | Artista Musical',
    description: 'Página oficial del artista musical Yoseph Prieto. Escucha su música, conoce su trayectoria y contáctalo para eventos y presentaciones.',
    url: 'https://yosephprieto.com',
    siteName: 'Yoseph Prieto Oficial',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200',
        width: 1200,
        height: 630,
        alt: 'Yoseph Prieto'
      }
    ],
    locale: 'es_ES',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yoseph Prieto Oficial | Artista Musical',
    description: 'Página oficial del artista musical Yoseph Prieto',
    images: ['https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  verification: {
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code'
  }
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${inter.variable} ${poppins.variable}`}>
      <body className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white antialiased">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}
