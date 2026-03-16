'use client'

import { useEffect } from 'react'
import { Hero } from '@/components/Hero'
import { Biography } from '@/components/Biography'
import { MusicSection } from '@/components/MusicSection'
import { ImageGallery } from '@/components/ImageGallery'
import { EventsSection } from '@/components/EventsSection'
import { ContactForm } from '@/components/ContactForm'
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
      <EventsSection />
      <ContactForm />
    </>
  )
}
