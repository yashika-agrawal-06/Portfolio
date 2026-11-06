import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGameStore } from '../hooks/useGameStore'
import { useAudio } from '../hooks/useAudio'
import PixelButton from '../components/PixelButton'
import PixelPanel from '../components/PixelPanel'
import Coin from '../components/Coin'
import { getProjectBySlug } from '../content/projects'
import { links, getProjectLinks } from '../content/links'
import FooterNavigation from '../components/FooterNavigation'

// User-provided tech stacks (only these will be shown)
const PROJECT_TECH_STACKS = {
  educloudplatform: ['Django', 'AWS EC2', 'Terraform', 'AWS Systems Manager', 'CloudWatch'],
  pitchperfect: ['React', 'Vite', 'AWS Lambda', 'API Gateway', 'AI integrations'],
  aushdrishti: ['AWS', 'Lambda', 'API Gateway', 'medicine information APIs'],
  intentswitch: ['Python', 'Strands concepts', 'AI agent integrations']
}

const ProjectDetail = () => {
  const navigate = useNavigate()
  const { slug } = useParams()
  const { coins, addCoins, setCurrentScreen, soundEnabled, visitedLevels, clearedLevels, markLevelVisited, markLevelCleared } = useGameStore()
  const { playClick, playCoin, playPowerup } = useAudio()
  const [showContent, setShowContent] = useState(false)

  const project = getProjectBySlug(slug)
  const projectLinks = getProjectLinks(slug)
  const techStack = PROJECT_TECH_STACKS[slug] || []

  const handleExternalLink = (url) => {
    if (url) {
      playCoin()
      addCoins(2)
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  const handleMarkCleared = () => {
    playPowerup()
    addCoins(15)
    markLevelCleared(slug)
  }

  useEffect(() => {
    setCurrentScreen(`project-${slug}`)
    if (!visitedLevels[slug]) {
      markLevelVisited(slug)
    }
    setShowContent(true)
  }, [setCurrentScreen, markLevelVisited, slug, visitedLevels])

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col justify-between relative selection:bg-yellow-300 selection:text-black">
        <main className="flex-1 flex items-center justify-center">
          <PixelPanel variant="retro" className="text-center p-8">
            <span className="text-6xl mb-4 block" aria-hidden="true">🔍</span>
            <h2 className="font-pixel text-xl text-[var(--text)] mb-2">WORLD NOT FOUND</h2>
            <p className="font-[var(--font-body)] text-[var(--text-muted)] mb-4">The project "{slug}" doesn't exist in this world.</p>
            <PixelButton variant="green" onClick={() => navigate('/world')}>← Return to Map</PixelButton>
          </PixelPanel>
        </main>
      </div>
    )
  }

  const isCleared = clearedLevels[slug]
  const isVisited = visitedLevels[slug]

  return (
    <div className="min-h-screen flex flex-col justify-between relative selection:bg-yellow-300 selection:text-black">
      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6 relative flex flex-col justify-start items-center pt-8">
        <div className="w-full relative">
          {/* Background Scenery */}
          <div className="absolute inset-0 select-none opacity-30 -z-10" aria-hidden="true">
            <div className="flex justify-between items-center px-4 md:px-12 pt-2 pb-6">
              <div className="cloud-slow flex items-center">
                <svg className="pixelated" fill="none" height="42" viewBox="0 0 112 42" width="112">
                  <rect fill="#FFFFFF" height="12" width="48" x="24" y="0" />
                  <rect fill="#FFFFFF" height="12" width="76" x="12" y="12" />
                  <rect fill="#FFFFFF" height="12" width="104" x="0" y="24" />
                  <rect fill="#D8ECFD" height="6" width="96" x="8" y="36" />
                </svg>
              </div>
              <div className="hidden md:flex items-center">
                <svg className="pixelated" fill="none" height="34" viewBox="0 0 88 34" width="88">
                  <rect fill="#FFFFFF" height="10" width="36" x="20" y="0" />
                  <rect fill="#FFFFFF" height="10" width="60" x="8" y="10" />
                  <rect fill="#FFFFFF" height="10" width="80" x="0" y="20" />
                  <rect fill="#D8ECFD" height="4" width="74" x="6" y="30" />
                </svg>
              </div>
            </div>
          </div>

          {/* Project Content */}
          <div className="flex flex-col items-center px-2 md:px-6">
            {/* Project Header */}
            <div className="w-full max-w-5xl mb-6 animate-fade-in">
              <PixelPanel variant="retro" className="p-5">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 bg-white border-3 border-[var(--border-dark)] rounded-xl flex items-center justify-center text-4xl shadow-[4px_4px_0px_var(--border-dark)] ${!isVisited ? 'grayscale' : ''}`} aria-hidden="true">
                      {project.category === 'Cloud & DevOps' && '☁️'}
                      {project.category === 'AI & ML' && '🤖'}
                      {project.category === 'Frontend & Fullstack' && '⚛️'}
                      {project.category === 'Tools & Practices' && '🔧'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-pixel text-[10px] text-[var(--text-muted)] uppercase">{project.category}</span>
                        {isCleared && <span className="bg-[var(--gold)] text-[var(--border-dark)] border border-[var(--border-dark)] px-2 py-0.5 rounded font-pixel text-[8px] animate-pulse-gentle">CLEARED</span>}
                        {isVisited && !isCleared && <span className="bg-[var(--sky)] text-[var(--border-dark)] border border-[var(--border-dark)] px-2 py-0.5 rounded font-pixel text-[8px]">VISITED</span>}
                        {!isVisited && <span className="bg-[var(--brick)] text-white border border-[var(--border-dark)] px-2 py-0.5 rounded font-pixel text-[8px]">LOCKED</span>}
                        {project.featured && <span className="bg-[var(--brick)] text-white border border-[var(--border-dark)] px-2 py-0.5 rounded font-pixel text-[8px]">FEATURED</span>}
                        {project.status === 'Production' && <span className="bg-[var(--grass)] text-white border border-[var(--border-dark)] px-2 py-0.5 rounded font-pixel text-[8px]">LIVE</span>}
                        {project.status === 'Beta' && <span className="bg-[var(--gold)] text-[var(--border-dark)] border border-[var(--border-dark)] px-2 py-0.5 rounded font-pixel text-[8px]">BETA</span>}
                        {project.status === 'Pilot' && <span className="bg-[var(--sky)] text-[var(--border-dark)] border border-[var(--border-dark)] px-2 py-0.5 rounded font-pixel text-[8px]">PILOT</span>}
                        {project.status === 'Development' && <span className="bg-[var(--text-muted)] text-white border border-[var(--border-dark)] px-2 py-0.5 rounded font-pixel text-[8px]">DEV</span>}
                      </div>
                      <h1 className="font-pixel text-xl md:text-2xl text-[var(--text)]">{project.title}</h1>
                      <p className="font-[var(--font-body)] text-sm text-[var(--text-muted)] mt-1">{project.tagline}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Back to Map button - prominent */}
                    <PixelButton variant="green" size="sm" onClick={() => navigate('/world')}>
                      ← BACK TO MAP
                    </PixelButton>
                    {!isCleared && (
                      <PixelButton variant="green" size="sm" onClick={handleMarkCleared}>
                        ✅ MARK CLEARED
                      </PixelButton>
                    )}
                  </div>
                </div>
              </PixelPanel>
            </div>

            {/* Overview & Tech Stack - single panel, no tabs */}
            <div className="w-full max-w-5xl">
              {/* Overview */}
              <PixelPanel variant="retro" className="mb-4 animate-slide-up">
                <h3 className="font-pixel text-[11px] text-[var(--text)] mb-4 border-b-2 border-[var(--border-dark)] pb-2 flex items-center gap-2">
                  <span aria-hidden="true">📋</span> PROJECT OVERVIEW
                </h3>
                <p className="font-[var(--font-body)] text-base text-[var(--text)] leading-relaxed mb-4">{project.description}</p>
                <p className="font-[var(--font-body)] text-base text-[var(--text)] leading-relaxed">{project.longDescription}</p>
              </PixelPanel>

              {/* Tech Stack - using user-provided list only */}
              <PixelPanel variant="retro" className="mb-4 animate-slide-up" style={{ animationDelay: '100ms' }}>
                <h3 className="font-pixel text-[11px] text-[var(--text)] mb-4 border-b-2 border-[var(--border-dark)] pb-2 flex items-center gap-2">
                  <span aria-hidden="true">⚙️</span> TECHNOLOGY STACK
                </h3>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech, index) => (
                    <span key={index} className="px-3 py-1.5 bg-[var(--cream)] border-2 border-[var(--border-dark)] rounded-lg font-pixel text-[9px] text-[var(--text)] hover:bg-white hover:shadow-md transition-all">
                      {tech}
                    </span>
                  ))}
                </div>
              </PixelPanel>

              {/* Key Links panel removed - no GitHub links per requirements */}
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <FooterNavigation
        leftContent={
          <>
            <span className="text-xl" aria-hidden="true">📦</span>
            <div>
              <div className="font-pixel text-[10px] text-[var(--text-muted)] uppercase">PROJECT WORLD</div>
              <div className="font-[var(--font-body)] text-sm font-bold text-[var(--text)]">{project.shortTitle} • {project.category}</div>
            </div>
          </>
        }
      />
    </div>
  )
}

export default ProjectDetail