import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameStore } from '../hooks/useGameStore'
import { useAudio } from '../hooks/useAudio'
import PixelButton from '../components/PixelButton'
import PixelPanel from '../components/PixelPanel'
import { projects, getProjectBySlug } from '../content/projects'
import FooterNavigation from '../components/FooterNavigation'

// User-provided data for hover cards
const PIPE_CARD_DATA = {
  educloudplatform: {
    shortTitle: 'EduCloud',
    description: 'Serverless EdTech platform serving 10,000+ students with 99.9% uptime on AWS',
    tech: ['Django', 'AWS EC2', 'Terraform', 'AWS Systems Manager', 'CloudWatch']
  },
  pitchperfect: {
    shortTitle: 'PitchPerfect',
    description: 'AI-powered presentation coach with real-time speech analysis using Bedrock',
    tech: ['React', 'Vite', 'AWS Lambda', 'API Gateway', 'AI integrations']
  },
  aushdrishti: {
    shortTitle: 'AushDrishti',
    description: 'Blockchain-anchored pharmaceutical supply chain tracking across 3 states',
    tech: ['AWS', 'Lambda', 'API Gateway', 'medicine information APIs']
  },
  intentswitch: {
    shortTitle: 'IntentSwitch',
    description: 'Intent-based network automation compiler supporting 5 vendors with 99.1% drift detection',
    tech: ['Python', 'Strands concepts', 'AI agent integrations']
  }
}

const WorldMap = () => {
  const navigate = useNavigate()
  const { coins, addCoins, setCurrentScreen, soundEnabled, visitedLevels, clearedLevels, visitedScreens, markScreenVisited } = useGameStore()
  const { playClick, playJump, playCoin } = useAudio()
  const [showContent, setShowContent] = useState(false)
  const [hoveredPipe, setHoveredPipe] = useState(null)
  const [touchActivePipe, setTouchActivePipe] = useState(null)
  const [particles, setParticles] = useState([])
  const [viewportWidth, setViewportWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024)
  const pipeRefs = useRef({})

  // Track viewport width for responsive card positioning
  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handlePipeClick = (slug) => {
    const project = getProjectBySlug(slug)
    if (!project) return

    playJump()
    addCoins(5)

    if (!visitedLevels[slug]) {
      addCoins(10)
    }

    navigate(`/projects/${slug}`)
  }

  const handlePipeHover = (slug) => {
    setHoveredPipe(slug)
    if (slug) playClick()
  }

  const handlePipeTouch = (slug) => {
    playClick()
    if (touchActivePipe === slug) {
      // Second tap - navigate
      handlePipeClick(slug)
      setTouchActivePipe(null)
    } else {
      // First tap - show card
      setTouchActivePipe(slug)
      setHoveredPipe(slug)
    }
  }

  // Attach non-passive touch listeners to pipe elements
  useEffect(() => {
    Object.entries(pipeRefs.current).forEach(([slug, ref]) => {
      const element = ref.current
      if (element) {
        const handler = (e) => {
          e.preventDefault()
          handlePipeTouch(slug)
        }
        element.addEventListener('touchstart', handler, { passive: false })
        return () => element.removeEventListener('touchstart', handler)
      }
    })
  }, [touchActivePipe, handlePipeTouch])

  const pipePositions = [
    { slug: 'educloudplatform', x: '15%', bottom: '22%', label: 'WORLD 1-1' },
    { slug: 'pitchperfect', x: '35%', bottom: '50%', label: 'WORLD 1-2' },
    { slug: 'aushdrishti', x: '60%', bottom: '30%', label: 'WORLD 1-3' },
    { slug: 'intentswitch', x: '82%', bottom: '55%', label: 'WORLD 1-4' }
  ]

  useEffect(() => {
    setCurrentScreen('map')
    if (!visitedScreens.map) {
      markScreenVisited('map')
      addCoins(10)
    }
    setShowContent(true)

    const interval = setInterval(() => {
      setParticles(prev => [...prev.slice(-20), {
        id: Date.now(),
        x: Math.random() * 100,
        y: 100,
        size: 2 + Math.random() * 4,
        color: ['#FFD447', '#69B9F7', '#55B84A', '#FFFFFF'][Math.floor(Math.random() * 4)],
        speed: 0.5 + Math.random() * 1,
        sway: (Math.random() - 0.5) * 0.3
      }])
    }, 800)

    return () => clearInterval(interval)
  }, [setCurrentScreen, addCoins, markScreenVisited, visitedScreens])

  useEffect(() => {
    const animate = () => {
      setParticles(prev => prev.map(p => ({
        ...p,
        y: p.y - p.speed,
        x: p.x + p.sway
      })).filter(p => p.y > -10))
      requestAnimationFrame(animate)
    }
    animate()
  }, [])

  // Calculate hover card position to avoid going off-screen and character overlap
  const getCardPosition = (pipeX) => {
    const xPercent = parseInt(pipeX) || 50
    // If pipe is on right half, show card to the left
    const isRightSide = xPercent > 50
    // On mobile (< 768px), always flip cards toward center to avoid off-screen
    const isMobile = viewportWidth < 768
    // Character is at left-8 (approx 32px from left), so pipes near left edge should flip right
    const isNearCharacter = xPercent < 25 // Pipes in left 25% - avoid character overlap
    const effectiveRightSide = isMobile ? false : (isRightSide || isNearCharacter)
    return {
      horizontal: effectiveRightSide ? 'right-full mr-4' : 'left-full ml-4',
      transform: effectiveRightSide ? 'translateY(-50%) translateX(0)' : 'translateY(-50%) translateX(0)',
      align: effectiveRightSide ? 'right' : 'left'
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-between relative selection:bg-yellow-300 selection:text-black overflow-hidden">
      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6 relative flex flex-col justify-center items-center">
        <div className="w-full relative flex-1">
          {/* Background - Sky & Clouds */}
          <div className="absolute inset-0 bg-[var(--sky)] select-none -z-20" aria-hidden="true">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
              <div className="cloud-slow absolute top-10 left-10" style={{ animationDuration: '40s' }}>
                <svg className="pixelated" fill="none" height="60" viewBox="0 0 160 60" width="160">
                  <rect fill="#FFFFFF" height="16" width="64" x="32" y="0" />
                  <rect fill="#FFFFFF" height="16" width="104" x="16" y="16" />
                  <rect fill="#FFFFFF" height="16" width="144" x="0" y="32" />
                  <rect fill="#D8ECFD" height="8" width="132" x="12" y="48" />
                </svg>
              </div>
              <div className="cloud-fast absolute top-20 right-20" style={{ animationDuration: '25s' }}>
                <svg className="pixelated" fill="none" height="48" viewBox="0 0 120 48" width="120">
                  <rect fill="#FFFFFF" height="12" width="48" x="24" y="0" />
                  <rect fill="#FFFFFF" height="12" width="84" x="12" y="12" />
                  <rect fill="#FFFFFF" height="12" width="108" x="0" y="24" />
                  <rect fill="#D8ECFD" height="6" width="96" x="8" y="36" />
                </svg>
              </div>
              <div className="cloud-slow absolute top-30 left-1/2 -translate-x-1/2" style={{ animationDuration: '35s', animationDelay: '-10s' }}>
                <svg className="pixelated" fill="none" height="40" viewBox="0 0 100 40" width="100">
                  <rect fill="#FFFFFF" height="10" width="40" x="20" y="0" />
                  <rect fill="#FFFFFF" height="10" width="70" x="10" y="10" />
                  <rect fill="#FFFFFF" height="10" width="90" x="0" y="20" />
                  <rect fill="#D8ECFD" height="5" width="80" x="8" y="30" />
                </svg>
              </div>
            </div>
          </div>

          {/* Ambient Particles */}
          <div className="absolute inset-0 pointer-events-none -z-10" aria-hidden="true">
            {particles.map(p => (
              <div
                key={p.id}
                className="absolute rounded-full"
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  backgroundColor: p.color,
                  opacity: 0.6
                }}
              />
            ))}
          </div>

          {/* Ground Layer */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-[var(--grass)] border-t-4 border-[var(--border-dark)] -z-5 relative" aria-hidden="true">
            <div className="absolute bottom-8 left-0 right-0 h-8 bg-[#4a9e3f]" />
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-[#3d8a32]" />
            {[...Array(20)].map((_, i) => (
              <div key={i} className="absolute bottom-8" style={{ left: `${i * 5}%` }}>
                <svg className="pixelated text-[#3d8a32]" width="16" height="12" viewBox="0 0 16 12">
                  <path d="M8 12 L4 4 L12 4 Z" fill="currentColor" />
                  <path d="M6 10 L3 3 L9 3 Z" fill="currentColor" opacity="0.7" />
                </svg>
              </div>
            ))}
          </div>

          {/* Yashika Character */}
          <div className="absolute bottom-32 left-8 z-20 bounce-idle" onClick={() => { playClick(); setTimeout(() => playClick(), 120); }} role="button" tabIndex={0} aria-label="Yashika character">
            <svg className="w-20 h-20 pixelated drop-shadow-xl" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <rect fill="#1C1412" height="4" width="10" x="7" y="1" />
              <rect fill="#1C1412" height="6" width="14" x="5" y="3" />
              <rect fill="#1C1412" height="12" width="3" x="4" y="6" />
              <rect fill="#1C1412" height="12" width="3" x="17" y="6" />
              <rect fill="#E8B490" height="9" width="10" x="7" y="5" />
              <rect fill="#1C1412" height="2" width="3" x="8" y="4" />
              <rect fill="#1C1412" height="2" width="3" x="13" y="4" />
              <rect fill="#1C1412" height="1" width="2" x="8" y="7" />
              <rect fill="#1C1412" height="1" width="2" x="14" y="7" />
              <rect fill="#FFFFFF" height="1" width="1" x="9" y="8" />
              <rect fill="#FFFFFF" height="1" width="1" x="15" y="8" />
              <rect fill="#FF8A80" height="1" width="2" x="7" y="10" />
              <rect fill="#FF8A80" height="1" width="2" x="15" y="10" />
              <rect fill="#FF8FA3" height="1.5" width="6" x="9" y="11" />
              <rect fill="#E86A8D" height="1" width="4" x="10" y="12.5" />
              <rect fill="#1F2328" height="7" width="12" x="6" y="14" />
              <rect fill="#CBD5E1" height="7" width="1" x="11" y="14" />
              <rect fill="#FF9900" height="1.5" width="4" x="13" y="16" />
              <rect fill="#1F2328" height="4" width="3" x="4" y="15" />
              <rect fill="#E8B490" height="3" width="2.5" x="3" y="12" />
              <rect fill="#E8B490" height="2" width="1.5" x="3" y="11" />
              <rect fill="#1F2328" height="4" width="2.5" x="17" y="15" />
              <rect fill="#E8B490" height="2" width="2" x="17" y="18" />
              <rect fill="#111417" height="1.5" width="12" x="6" y="21" />
              <rect fill="#1A365D" height="1.5" width="4" x="7" y="22.5" />
              <rect fill="#1A365D" height="1.5" width="4" x="13" y="22.5" />
            </svg>
          </div>

          {/* Project Pipes - All green and clickable by default */}
          <div className="absolute inset-0 z-10" role="application" aria-label="Project levels">
            {pipePositions.map((pipe, index) => {
              const project = getProjectBySlug(pipe.slug)
              const isVisited = visitedLevels[pipe.slug]
              const isCleared = clearedLevels[pipe.slug]
              const isHovered = hoveredPipe === pipe.slug || touchActivePipe === pipe.slug
              const cardData = PIPE_CARD_DATA[pipe.slug]

              const categoryColors = {
                'Cloud & DevOps': { primary: '#69B9F7', dark: '#1A365D', light: '#D8ECFD' },
                'AI & ML': { primary: '#8B5CF6', dark: '#3B0B8E', light: '#EDE9FE' },
                'Frontend & Fullstack': { primary: '#55B84A', dark: '#1A3D12', light: '#DCFCE7' },
                'Tools & Practices': { primary: '#A55EEA', dark: '#4A1E8A', light: '#F5F0FF' }
              }
              const colors = categoryColors[project?.category] || categoryColors['Cloud & DevOps']
              const cardPos = getCardPosition(pipe.x)

              return (
                <div
                  key={pipe.slug}
                  ref={(el) => { pipeRefs.current[pipe.slug] = el }}
                  className="absolute cursor-pointer transition-all duration-300"
                  style={{
                    left: pipe.x,
                    bottom: pipe.bottom,
                    transform: isHovered ? 'scale(1.1) translateY(-8px)' : 'translateY(0)',
                    zIndex: isHovered ? 30 : 10
                  }}
                  onMouseEnter={() => handlePipeHover(pipe.slug)}
                  onMouseLeave={() => { handlePipeHover(null); setTouchActivePipe(null); }}
                  onClick={() => handlePipeClick(pipe.slug)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handlePipeClick(pipe.slug) } }}
                  role="button"
                  tabIndex={0}
                  aria-label={`${project?.title || pipe.slug} - ${pipe.label} - ${isCleared ? 'Cleared' : isVisited ? 'Visited' : 'Available'}`}
                >
                  {/* Pipe Structure - Always green, no grayscale */}
                  <div className="relative">
                    {/* Pipe Top */}
                    <div className="relative w-20 h-14">
                      <svg className="w-full h-full pixelated" viewBox="0 0 32 22" fill="none">
                        <rect x="2" y="0" width="28" height="6" fill="#2E7D32" stroke="#1B5E20" strokeWidth="2" />
                        <rect x="0" y="6" width="32" height="4" fill="#388E3C" stroke="#1B5E20" strokeWidth="2" />
                        <rect x="4" y="10" width="24" height="12" fill="#4CAF50" stroke="#1B5E20" strokeWidth="2" />
                        <rect x="6" y="12" width="4" height="8" fill="#66BB6A" opacity="0.5" />
                        <rect x="16" y="12" width="2" height="8" fill="#1B5E20" />
                      </svg>

                      {/* Status indicator - only show star for cleared, check for visited, nothing for available */}
                      {isCleared && (
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-5 h-5 bg-[var(--gold)] border-2 border-[var(--border-dark)] rounded-full flex items-center justify-center text-[10px] font-bold animate-bounce" aria-hidden="true">★</div>
                      )}
                      {isVisited && !isCleared && (
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-5 h-5 bg-[var(--sky)] border-2 border-[var(--border-dark)] rounded-full flex items-center justify-center text-[10px] font-bold" aria-hidden="true">✓</div>
                      )}
                    </div>

                    {/* Pipe Body */}
                    <div className="w-16 h-32">
                      <svg className="w-full h-full pixelated" viewBox="0 0 16 32" fill="none">
                        <rect x="2" y="0" width="12" height="32" fill="#4CAF50" stroke="#1B5E20" strokeWidth="2" />
                        <rect x="4" y="2" width="4" height="28" fill="#66BB6A" opacity="0.3" />
                        <rect x="10" y="2" width="2" height="28" fill="#1B5E20" />
                      </svg>
                    </div>

                    {/* Pipe Bottom */}
                    <div className="w-20 h-6">
                      <svg className="w-full h-full pixelated" viewBox="0 0 32 10" fill="none">
                        <rect x="0" y="0" width="32" height="10" fill="#388E3C" stroke="#1B5E20" strokeWidth="2" />
                        <rect x="4" y="2" width="24" height="6" fill="#2E7D32" />
                      </svg>
                    </div>
                  </div>

                  {/* Pipe Label */}
                  <div className={`absolute bottom-[-3rem] left-1/2 -translate-x-1/2 w-32 text-center ${isHovered ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200 pointer-events-none`}>
                    <div className="bg-white border-2 border-[var(--border-dark)] shadow-lg px-2 py-1 rounded text-xs font-pixel text-[var(--text)] whitespace-nowrap">
                      {pipe.label}
                    </div>
                    <div className="w-2 h-2 bg-[var(--border-dark)] mx-auto -mt-1 rotate-45" aria-hidden="true" />
                  </div>

                  {/* Hover/Touch Card - Shows project data with high z-index and edge flipping */}
                  {(isHovered || touchActivePipe === pipe.slug) && project && cardData && (
                    <div
                      className={`absolute top-1/2 -translate-y-1/2 w-72 pixel-box p-3 z-50 animate-fade-in ${cardPos.horizontal}`}
                      role="tooltip"
                      style={{
                        backgroundColor: colors.light,
                        borderColor: colors.primary,
                        transform: `translateY(-50%) ${cardPos.horizontal.includes('right') ? 'translateX(100%)' : 'translateX(-100%)'}`
                      }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl" aria-hidden="true">{project.category === 'Cloud & DevOps' ? '☁️' : project.category === 'AI & ML' ? '🤖' : project.category === 'Frontend & Fullstack' ? '⚛️' : '🔧'}</span>
                        <h4 className="font-pixel text-[11px]" style={{ color: colors.dark }}>{cardData.shortTitle}</h4>
                      </div>
                      <p className="font-[var(--font-body)] text-xs mb-2" style={{ color: colors.dark }}>{cardData.description}</p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {cardData.tech.map((tech, i) => (
                          <span key={i} className="px-1.5 py-0.5 rounded font-pixel text-[7px]" style={{ backgroundColor: colors.primary, color: '#fff', borderColor: colors.dark }}>
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 text-[9px] font-pixel" style={{ color: colors.dark }}>
                        <span className="bg-[var(--gold)] px-1.5 py-0.5 rounded" style={{ color: '#1F2328' }}>
                          {isCleared ? 'CLEARED' : isVisited ? 'VISITED' : 'AVAILABLE'}
                        </span>
                        <PixelButton variant="gold" size="xs" onClick={() => handlePipeClick(pipe.slug)} className="h-auto px-2 py-0.5">
                          ENTER
                        </PixelButton>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Yashika Character (re-rendered for proper layering) */}
        </div>
      </main>

      {/* Bottom Navigation */}
      <FooterNavigation
        leftContent={
          <>
            <span className="text-xl" aria-hidden="true">🗺️</span>
            <div className="min-w-0">
              <div className="font-pixel text-[10px] text-[var(--text-muted)] uppercase truncate">WORLD MAP</div>
              <div className="font-[var(--font-body)] text-sm font-bold text-[var(--text)] truncate">4 Project Worlds Available</div>
            </div>
            {/* Map Info Strip */}
            <div className="hidden md:flex items-center gap-4 px-3 py-2 bg-white border-2 border-[var(--border-dark)] rounded-lg shadow-sm ml-4 max-w-md">
              <span className="font-pixel text-[9px] text-[var(--text)] flex items-center gap-1">
                <span aria-hidden="true">🏁</span> Cleared: {projects.filter(p => clearedLevels[p.slug]).length}/{projects.length}
              </span>
              <span className="font-pixel text-[9px] text-[var(--text-muted)] flex items-center gap-1">
                <span aria-hidden="true">👣</span> Visited: {projects.filter(p => visitedLevels[p.slug]).length}/{projects.length}
              </span>
            </div>
          </>
        }
      />
    </div>
  )
}

export default WorldMap