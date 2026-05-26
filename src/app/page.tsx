'use client'

import { useEffect } from 'react'
import { Hero } from '@/components/Hero'
import { Biography } from '@/components/Biography'
import { MusicSection } from '@/components/MusicSection'
import { ImageGallery } from '@/components/ImageGallery'
import { EventsSection } from '@/components/EventsSection'
import { ContactForm } from '@/components/ContactForm'
import { AdSense } from '@/components/AdSense'
import { handleHashNavigation } from '@/lib/smoothScroll'

export default function Home () {
  useEffect(() => {
    handleHashNavigation()
    
    // Handle hash changes
    const handleHashChange = () => {
      handleHashNavigation()
    }
    
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  return (
    <>
      <Hero />
      <Biography />
      <MusicSection />
      <ImageGallery />
      <div className="container mx-auto max-w-4xl px-4 py-6 sm:py-8">
        <AdSense className="overflow-hidden rounded-lg border border-gold/20 bg-navy/40 p-2" />
      </div>
      <EventsSection />
      <ContactForm />
    </>
  )
}
