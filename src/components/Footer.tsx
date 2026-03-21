'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone } from 'lucide-react'
import { artistData } from '@/data/artistData'
import { Modal } from './ui/Modal'
import { PrivacyPolicyContent, TermsOfServiceContent } from './modals'
import { SocialLinks } from './SocialLinks'
import { Button } from './ui/Button'

export function Footer () {
  const [activeModal, setActiveModal] = useState<string | null>(null)

  const openPrivacyPolicy = () => setActiveModal('privacy')
  const openTermsOfService = () => setActiveModal('terms')
  const closeModal = () => setActiveModal(null)

  return (
    <>
      <footer className="bg-walnut border-t-2 border-gold/30 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Redes Sociales (Primer Column) */}
            <div className="hidden md:block">
              <h3 className="font-display text-gold font-semibold mb-4">Redes Sociales</h3>
              <SocialLinks showLabels variant="light" iconSize="w-5 h-5" />
            </div>

            {/* Quick Links (Segundo Column) */}
            <div>
              <h3 className="font-display text-gold font-semibold mb-4">Enlaces Rápidos</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/#biografia" className="text-sand hover:text-gold transition-colors font-body text-sm">
                    Biografía
                  </Link>
                </li>
                <li>
                  <Link href="/#musica" className="text-sand hover:text-gold transition-colors font-body text-sm">
                    Música
                  </Link>
                </li>
                <li>
                  <Link href="/#galeria" className="text-sand hover:text-gold transition-colors font-body text-sm">
                    Galería
                  </Link>
                </li>
                <li>
                  <Link href="/#contacto" className="text-sand hover:text-gold transition-colors font-body text-sm">
                    Contacto
                  </Link>
                </li>
              </ul>
              {/* Contact Info debajo de Enlaces Rápidos */}
              <div className="mt-6">
                <h3 className="font-display text-gold font-semibold mb-4">Contacto</h3>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-white shrink-0" />
                    <a
                      href="mailto:oficialyoseph.prieto@gmail.com"
                      className="text-white hover:text-white/80 transition-colors font-body text-sm break-all"
                    >
                      oficialyoseph.prieto@gmail.com
                    </a>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-white shrink-0" />
                    <a
                      href="tel:+573204852662"
                      className="text-white hover:text-white/80 transition-colors font-body text-sm"
                    >
                      +57 320 485 2662
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Brand Section (Tercer Column) */}
            <div className="space-y-4 flex flex-col items-center">
              <div className="flex items-center">
                <Link href="/" className="inline-block group">
                  <div className="relative h-20 w-48 transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(201,168,76,0.5)]">
                    <Image
                      src="/logo_yp_transparente.png"
                      alt="Yoseph Prieto Logo"
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                </Link>
              </div>
              <p className="text-sand font-body text-sm text-center">
                {artistData.tagline}
              </p>
              {/* Botones de Términos y Privacidad */}
              <div className="flex flex-col gap-2 pt-2 w-full max-w-xs">
                <Button
                  onClick={openPrivacyPolicy}
                  variant="outline"
                  size="sm"
                  className="text-xs sm:text-sm w-full"
                >
                  Política de Privacidad
                </Button>
                <Button
                  onClick={openTermsOfService}
                  variant="outline"
                  size="sm"
                  className="text-xs sm:text-sm w-full"
                >
                  Términos de Servicio
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gold/30">
            <div className="flex flex-col items-center text-center">
              <p className="text-sand font-body text-xs sm:text-sm">
                © 2026 Yoseph Prieto. Todos los derechos reservados • By: ✯ JACB.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Modales */}
      <Modal
        isOpen={activeModal === 'privacy'}
        onClose={closeModal}
        title="Política de Privacidad"
      >
        <PrivacyPolicyContent />
      </Modal>

      <Modal
        isOpen={activeModal === 'terms'}
        onClose={closeModal}
        title="Términos y Condiciones"
      >
        <TermsOfServiceContent />
      </Modal>
    </>
  )
}
