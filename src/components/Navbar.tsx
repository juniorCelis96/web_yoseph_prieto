'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, Instagram, Facebook, Youtube, MessageCircle } from 'lucide-react'
import { smoothScrollToElement } from '@/lib/smoothScroll'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/', label: 'Inicio', hash: '' },
    { href: '/#biografia', label: 'Biografía', hash: 'biografia' },
    { href: '/#musica', label: 'Música', hash: 'musica' },
    { href: '/#galeria', label: 'Galería', hash: 'galeria' },
    { href: '/#eventos', label: 'Eventos', hash: 'eventos' },
    { href: '/#contacto', label: 'Contacto', hash: 'contacto' }
  ]

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    if (isHome && hash) {
      e.preventDefault()
      smoothScrollToElement(hash)
      setIsOpen(false)
    }
  }

  return (
    <>
      {/* Backdrop blur para móvil - fuera del nav para mejor control de z-index */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-navy/90 backdrop-blur-md z-40" />
      )}
      
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-navy/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
          }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20 relative z-50">
            {/* Logo YP */}
            <Link href="/" className="flex items-center group py-2 relative z-50">
              <div className="relative h-12 w-28 md:h-16 md:w-36 transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(201,168,76,0.6)]">
                <Image
                  src="/logo_yp_transparente.png"
                  alt="Yoseph Prieto Logo"
                  fill
                  className="object-contain"
                  priority
                  unoptimized
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8 relative z-50">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.hash)}
                  className="text-sand hover:text-gold transition-colors font-body font-medium text-sm uppercase tracking-wide"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-gold p-2 relative z-[60]"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden relative z-50 pb-4 border-t border-gold/30 mt-4">
              <div className="flex flex-col space-y-4 pt-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.hash)}
                    className="text-sand hover:text-gold transition-colors font-body font-medium text-sm uppercase tracking-wide py-2 relative z-50"
                  >
                    {link.label}
                  </Link>
                ))}
                {/* Social Media Icons */}
                <div className="flex items-center justify-center flex-wrap gap-4 pt-4 border-t border-gold/30 mt-4">
                  <a
                    href="https://wa.me/573204852662"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-white/80 transition-colors"
                    aria-label="WhatsApp"
                  >
                    <MessageCircle className="w-6 h-6" />
                  </a>
                  <a
                    href="https://www.facebook.com/artistayosephprieto?locale=es_LA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-white/80 transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a
                    href="https://www.instagram.com/yosephprietooficial/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-white/80 transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a
                    href="https://www.tiktok.com/@yosephprieto1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex brightness-0 invert opacity-90 hover:opacity-100 transition-opacity"
                    aria-label="TikTok"
                  >
                    <Image src="/tik-tok.png" alt="" width={24} height={24} className="h-6 w-6 object-contain" unoptimized />
                  </a>
                  <a
                    href="https://open.spotify.com/artist/yosephprieto"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex"
                    aria-label="Spotify"
                  >
                    <Image src="/spotify.svg" alt="" width={24} height={24} className="h-6 w-6 object-contain" unoptimized />
                  </a>
                  <a
                    href="https://www.youtube.com/@yosephprietooficial/videos"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-white/80 transition-colors"
                    aria-label="YouTube"
                  >
                    <Youtube className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}
