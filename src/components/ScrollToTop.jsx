import React from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = () => {
  const { pathname, hash } = useLocation()

  React.useEffect(() => {
    // If there's a hash (anchor link), let the browser handle smooth scrolling
    if (hash) {
      return
    }

    // Scroll to top on route change
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash])

  return null
}

export default ScrollToTop