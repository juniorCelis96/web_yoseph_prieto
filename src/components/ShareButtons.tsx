'use client'

import { Share2, Facebook, Twitter, Linkedin, Link as LinkIcon } from 'lucide-react'
import { useState, useEffect } from 'react'

interface ShareButtonsProps {
  url?: string
  title?: string
  description?: string
}

export function ShareButtons ({ url, title = 'Yoseph Prieto Oficial', description = 'Página oficial del artista musical Yoseph Prieto' }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  const [shareUrl, setShareUrl] = useState(url || '')

  useEffect(() => {
    // Only set URL on client side after hydration
    if (!url && typeof window !== 'undefined') {
      setShareUrl(window.location.href)
    }
  }, [url])

  const encodedUrl = encodeURIComponent(shareUrl)
  const encodedTitle = encodeURIComponent(title)
  const encodedDescription = encodeURIComponent(description)

  const shareLinks = {
    facebook: shareUrl ? `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` : '#',
    twitter: shareUrl ? `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}` : '#',
    linkedin: shareUrl ? `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` : '#'
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  // Don't render links until we have a URL (prevents hydration mismatch)
  if (!shareUrl) {
    return null
  }

  return (
    <div className="flex items-center space-x-4">
      <span className="text-gray-400 text-sm">Compartir:</span>
      <div className="flex items-center space-x-2">
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-blue-500 transition-colors"
          aria-label="Compartir en Facebook"
        >
          <Facebook className="w-5 h-5" />
        </a>
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-blue-400 transition-colors"
          aria-label="Compartir en Twitter"
        >
          <Twitter className="w-5 h-5" />
        </a>
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-blue-600 transition-colors"
          aria-label="Compartir en LinkedIn"
        >
          <Linkedin className="w-5 h-5" />
        </a>
        <button
          onClick={copyToClipboard}
          className="text-gray-400 hover:text-white transition-colors"
          aria-label="Copiar enlace"
        >
          <LinkIcon className="w-5 h-5" />
        </button>
      </div>
      {copied && (
        <span className="text-sm text-green-400">¡Enlace copiado!</span>
      )}
    </div>
  )
}
