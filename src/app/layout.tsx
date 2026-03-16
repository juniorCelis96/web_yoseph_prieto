import type { Metadata } from 'next'
import { Cormorant_Garamond, Lora } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { CustomCursor } from '@/components/CustomCursor'
import { Providers } from '@/components/Providers'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap'
})

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-lora',
  display: 'swap'
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://yosephprieto.com'),
  title: {
    default: 'YOSEPH PRIETO | Voz del Occidente de Boyacá',
    template: '%s | YOSEPH PRIETO'
  },
  description: 'Yoseph Prieto, cantante colombiano de música ranchera, popular y carranga, oriundo de Otanche, Boyacá. Escucha su música auténtica del occidente boyacense.',
  keywords: ['Yoseph Prieto', 'música ranchera', 'carranga', 'música popular colombiana', 'Otanche Boyacá', 'música tradicional', 'occidente de Boyacá'],
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
    <html lang="es" className={`${cormorant.variable} ${lora.variable}`}>
      <body className="min-h-screen bg-navy text-white antialiased relative">
        <Providers>
          <CustomCursor />
          <Navbar />
          <main className="flex-1 relative z-10">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
        </Providers>
      </body>
    </html>
  )
}
