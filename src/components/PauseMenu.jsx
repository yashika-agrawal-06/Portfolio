import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameStore } from '../hooks/useGameStore'
import PixelButton from './PixelButton'
import { links } from '../content/links'

const PauseMenu = () => {
  const navigate = useNavigate()
  const { isPaused, setPaused, soundEnabled, toggleSound, resetGame } = useGameStore()

  const handleResume = () => {
    setPaused(false)
  }

  const handleResetProgress = () => {
    if (window.confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      resetGame()
      setPaused(false)
      // Reload to fully reset state
      window.location.reload()
    }
  }

  // Handle Escape key to resume
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isPaused) {
        handleResume()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isPaused])

  // Don't render anything when not paused
  if (!isPaused) return null

  return (
    <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="pause-title">
      <div className="pixel-box rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl animate-fade-in">
        <div className="w-12 h-12 bg-[var(--gold)] border-3 border-black rounded-full mx-auto flex items-center justify-center text-2xl font-pixel mb-3 shadow-[2px_2px_0px_var(--border-dark)]">
          ⏸
        </div>
        <h2 id="pause-title" className="font-pixel text-xl text-[var(--text)] mb-1">GAME PAUSED</h2>
        <p className="text-xs text-[#555] mb-5">Take a breather, review credentials or hop between worlds.</p>
        <div className="flex flex-col gap-2.5">
          <PixelButton
            variant="green"
            size="sm"
            onClick={handleResume}
          >
            ▶ RESUME ADVENTURE
          </PixelButton>
          <a
            href={links.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pixel btn-gold text-xs py-2.5 rounded font-bold"
          >
            📜 VIEW RESUME
          </a>
          <PixelButton
            variant="cream"
            size="sm"
            onClick={() => {
              setPaused(false)
              navigate('/map')
            }}
          >
            🗺️ BACK TO MAP
          </PixelButton>
          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pixel btn-cream text-xs py-2.5 rounded font-bold"
          >
            🐙 GITHUB
          </a>
          <a
            href={links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pixel btn-cream text-xs py-2.5 rounded font-bold"
          >
            💼 LINKEDIN
          </a>
          <PixelButton
            variant="gold"
            size="sm"
            onClick={() => {
              setPaused(false)
              navigate('/contact')
            }}
          >
            📮 CONTACT YASHIKA
          </PixelButton>
          <PixelButton
            variant="red"
            size="sm"
            onClick={handleResetProgress}
          >
            🔄 RESET PROGRESS
          </PixelButton>
        </div>
      </div>
    </div>
  )
}

export default PauseMenu