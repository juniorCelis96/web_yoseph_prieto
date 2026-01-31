import Link from 'next/link'
import { Music, Mail, Phone } from 'lucide-react'
import { artistData } from '@/data/artistData'
import { socialMediaData } from '@/data/socialMediaData'
import { SocialLinks } from './SocialLinks'
import { ShareButtons } from './ShareButtons'

export function Footer () {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Music className="w-6 h-6 text-primary-400" />
              <span className="text-xl font-display font-bold text-white">Yoseph Prieto</span>
            </div>
            <p className="text-gray-400 text-sm">
              {artistData.tagline}
            </p>
            <SocialLinks />
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/#biografia" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Biografía
                </Link>
              </li>
              <li>
                <Link href="/#musica" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Música
                </Link>
              </li>
              <li>
                <Link href="/#galeria" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Galería
                </Link>
              </li>
              <li>
                <Link href="/#eventos" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Eventos
                </Link>
              </li>
              <li>
                <Link href="/#contacto" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-primary-400" />
                <a
                  href={`mailto:${artistData.contact.email}`}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  {artistData.contact.email}
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-primary-400" />
                <a
                  href={`tel:${artistData.contact.phone}`}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  {artistData.contact.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} {artistData.fullName}. Todos los derechos reservados.
            </p>
            <ShareButtons />
          </div>
        </div>
      </div>
    </footer>
  )
}
