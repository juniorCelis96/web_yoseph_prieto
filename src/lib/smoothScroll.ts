export function smoothScrollToElement (elementId: string) {
  const element = document.getElementById(elementId)
  if (element) {
    const offset = 80 // Navbar height
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}

export function handleHashNavigation () {
  if (typeof window === 'undefined') return

  const hash = window.location.hash
  if (hash) {
    const elementId = hash.substring(1)
    setTimeout(() => {
      smoothScrollToElement(elementId)
    }, 100)
  }
}
