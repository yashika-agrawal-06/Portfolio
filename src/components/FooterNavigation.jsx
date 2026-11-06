import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import PixelButton from './PixelButton'
import PixelPanel from './PixelPanel'

// Journey order for context-aware navigation
const JOURNEY = [
  { path: '/', label: 'START', shortLabel: 'START' },
  { path: '/guess', label: 'MINIGAME', shortLabel: 'MINIGAME' },
  { path: '/unlocked', label: 'UNLOCKED', shortLabel: 'UNLOCKED' },
  { path: '/world', label: 'OVERWORLD MAP', shortLabel: 'WORLD MAP' },
  { path: '/about', label: 'ABOUT', shortLabel: 'ABOUT' },
  { path: '/skills', label: 'POWER-UPS', shortLabel: 'POWER-UPS' },
  { path: '/achievements', label: 'TROPHIES', shortLabel: 'TROPHIES' },
  { path: '/contact', label: 'CONTACT', shortLabel: 'CONTACT' }
]

// Get current journey index based on path
const getJourneyIndex = (pathname) => {
  // Handle project detail pages - they branch from WorldMap
  if (pathname.startsWith('/projects/')) {
    return 3 // WorldMap index
  }
  return JOURNEY.findIndex(j => j.path === pathname)
}

const FooterNavigation = ({ leftContent }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const currentIndex = getJourneyIndex(location.pathname)
  const isProjectDetail = location.pathname.startsWith('/projects/')
  const isInJourney = currentIndex !== -1

  // For project detail, previous is WorldMap
  const prevStep = isProjectDetail
    ? { path: '/world', label: '← OVERWORLD MAP' }
    : (currentIndex > 0 ? {
        path: JOURNEY[currentIndex - 1].path,
        label: `← ${JOURNEY[currentIndex - 1].shortLabel.toUpperCase()}`
      } : null)

  // Next steps - show up to 3 next steps in journey
  const nextSteps = []
  if (isProjectDetail) {
    // From project detail, next steps are the journey after WorldMap
    for (let i = 4; i < JOURNEY.length && nextSteps.length < 3; i++) {
      nextSteps.push(JOURNEY[i])
    }
  } else if (isInJourney && currentIndex < JOURNEY.length - 1) {
    for (let i = currentIndex + 1; i < JOURNEY.length && nextSteps.length < 3; i++) {
      nextSteps.push(JOURNEY[i])
    }
  }

  // Determine button variants
  const getPrevVariant = () => 'cream'
  const getNextVariant = (index) => {
    if (index === 0) return 'green'
    if (index === 1) return 'gold'
    return 'gold'
  }

  return (
    <footer className="bg-[var(--cream)] border-t-4 border-[var(--border-dark)] px-4 py-4">
      <PixelPanel variant="default" className="max-w-7xl mx-auto p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left Content - Screen-specific info */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {leftContent}
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 w-full md:w-auto">
          {/* Previous Button */}
          {prevStep && (
            <PixelButton
              variant={getPrevVariant()}
              size="sm"
              onClick={() => navigate(prevStep.path)}
            >
              {prevStep.label}
            </PixelButton>
          )}

          {/* Next Buttons */}
          {nextSteps.map((step, index) => (
            <PixelButton
              key={step.path}
              variant={getNextVariant(index)}
              size="sm"
              onClick={() => navigate(step.path)}
            >
              {step.shortLabel.toUpperCase()} →
            </PixelButton>
          ))}

          {/* Special case: Contact screen has START SCREEN as final next */}
          {location.pathname === '/contact' && !nextSteps.length && (
            <PixelButton
              variant="gold"
              size="sm"
              onClick={() => navigate('/')}
            >
              START SCREEN →
            </PixelButton>
          )}
        </div>
      </PixelPanel>
    </footer>
  )
}

export default FooterNavigation