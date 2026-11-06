import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameStore } from '../hooks/useGameStore'
import { useAudio } from '../hooks/useAudio'
import PixelButton from './PixelButton'
import { links } from '../content/links'

const TopBar = () => {
  const navigate = useNavigate()
  const { coins, soundEnabled, setCurrentScreen, isPaused, togglePause } = useGameStore()
  const { toggleMute, isMuted } = useAudio()

  const handleMapClick = () => {
    setCurrentScreen('map')
    navigate('/world')
  }

  const handlePauseClick = () => {
    togglePause()
  }

  const handleQuickNav = (path) => {
    setCurrentScreen(path.replace('/', ''))
    navigate(path)
  }

  return (
    <header className="w-full bg-[var(--cream)] border-b-4 border-[var(--border-dark)] sticky top-0 z-50 shadow-[0_4px_0px_var(--border-dark)] px-4 py-1.5 flex items-center justify-between">
      <div className="flex items-center gap-2">
        {/* Player Badge */}
        <button
          className="flex items-center gap-2 px-2 py-1 bg-white border-2 border-[var(--border-dark)] rounded shadow-sm hover:bg-yellow-50 transition"
          onClick={() => handleQuickNav('/')}
          title="Start Screen"
          aria-label="Go to Start Screen"
        >
          <svg className="w-7 h-7 pixelated" fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <rect fill="#1C1412" height="4" width="10" x="7" y="1" />
            <rect fill="#1C1412" height="6" width="14" x="5" y="3" />
            <rect fill="#1C1412" height="11" width="3" x="4" y="6" />
            <rect fill="#1C1412" height="11" width="3" x="17" y="6" />
            <rect fill="#E8B490" height="9" width="10" x="7" y="5" />
            <rect fill="#1C1412" height="2" width="3" x="8" y="4" />
            <rect fill="#1C1412" height="2" width="3" x="13" y="4" />
            <rect fill="#1C1412" height="1" width="2" x="8" y="7" />
            <rect fill="#1C1412" height="1" width="2" x="14" y="7" />
            <rect fill="#1C1412" height="2" width="2" x="8" y="8" />
            <rect fill="#1C1412" height="2" width="2" x="14" y="8" />
            <rect fill="#FF8A80" height="1.5" width="6" x="9" y="11" />
            <rect fill="#E86A8D" height="1" width="4" x="10" y="12.5" />
            <rect fill="#1F2328" height="7" width="12" x="6" y="14" />
            <rect fill="#CBD5E1" height="7" width="1" x="11" y="14" />
            <rect fill="#FFFFFF" height="1" width="4" x="13" y="16" />
            <rect fill="#1F2328" height="4" width="3" x="4" y="15" />
            <rect fill="#E8B490" height="3" width="2" x="3" y="12" />
            <rect fill="#E8B490" height="2" width="1" x="3" y="11" />
            <rect fill="#111417" height="2" width="12" x="6" y="21" />
          </svg>
          <span className="font-pixel text-[11px] text-[var(--text)] font-bold hidden sm:inline">YASHIKA</span>
        </button>

        {/* Mobile Pause Button - shows beside logo on mobile, hidden on desktop */}
        <PixelButton
          variant="gold"
          size="sm"
          onClick={handlePauseClick}
          aria-label={isPaused ? 'Resume Game' : 'Pause Game'}
          className="md:hidden min-h-[40px] min-w-[40px] px-2"
        >
          <span className="" aria-hidden="true">{isPaused ? '▶' : '⏸'}</span>
          <span className="hidden sm:inline">{isPaused ? 'RESUME' : 'PAUSE'}</span>
        </PixelButton>

        {/* Quick Nav Buttons for Desktop */}
        <nav className="hidden md:flex items-center gap-1.5 ml-2" aria-label="Quick navigation">
          <PixelButton variant="cream" size="sm" onClick={() => handleQuickNav('/map')} aria-label="Go to Map">
            Map
          </PixelButton>
          <PixelButton variant="cream" size="sm" onClick={() => handleQuickNav('/guess')} aria-label="Go to Minigame">
            Minigame
          </PixelButton>
          <PixelButton variant="cream" size="sm" onClick={() => handleQuickNav('/about')} aria-label="Go to About">
            About
          </PixelButton>
          <PixelButton variant="cream" size="sm" onClick={() => handleQuickNav('/skills')} aria-label="Go to Power-Ups">
            Power-Ups
          </PixelButton>
          <PixelButton variant="cream" size="sm" onClick={() => handleQuickNav('/achievements')} aria-label="Go to Trophies">
            Trophies
          </PixelButton>
          <PixelButton variant="cream" size="sm" onClick={() => handleQuickNav('/contact')} aria-label="Go to Contact">
            Contact
          </PixelButton>
        </nav>
      </div>

      {/* HUD Right: Coin Counter, Sound Toggle, Resume, Map, Pause (desktop only) */}
      <div className="flex items-center gap-2">
        {/* Coin Counter */}
        <div className="flex items-center gap-1.5 bg-[var(--border-dark)] text-[var(--gold)] px-2.5 py-1 rounded border-2 border-[var(--gold)] shadow-inner font-pixel text-xs" role="status" aria-live="polite" aria-label={`Coins: ${coins}`}>
          <div className="w-4 h-4 bg-[var(--gold)] rounded-full border border-black coin-spin flex items-center justify-center text-[9px] text-[#8C5908] font-bold" aria-hidden="true">★</div>
          <span>×</span>
          <span className="font-bold text-amber-600">{coins.toString().padStart(2, '0')}</span>
        </div>

        {/* Sound Toggle */}
        <button
          className="p-1.5 bg-[var(--cream)] hover:bg-yellow-100 border-2 border-[var(--border-dark)] rounded shadow-sm transition min-h-[40px] min-w-[40px] flex items-center justify-center"
          onClick={toggleMute}
          title={isMuted ? 'Enable sound effects' : 'Mute sound effects'}
          aria-label={isMuted ? 'Enable sound effects' : 'Mute sound effects'}
          aria-pressed={!isMuted}
        >
          <span className="text-sm" aria-hidden="true">{isMuted ? '🔇' : '🔊'}</span>
          <span className="sr-only">{isMuted ? 'Sound off' : 'Sound on'}</span>
        </button>

        {/* Resume Button */}
        <a
          href={links.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-yellow-50 border-2 border-[var(--border-dark)] rounded shadow-sm transition text-[var(--text)] font-pixel text-[10px] min-h-[40px]"
          title="View Resume (opens in new tab)"
          aria-label="View Resume"
        >
          <span aria-hidden="true">📄</span> <span className="hidden sm:inline">RESUME</span>
        </a>

        {/* Map Button */}
        <PixelButton
          variant="green"
          size="sm"
          onClick={handleMapClick}
          aria-label="Open Level Map"
          className="min-h-[40px]"
        >
          <span className="mr-1" aria-hidden="true">🗺️</span> <span className="hidden sm:inline">MAP</span>
        </PixelButton>

        {/* Pause Button - Desktop only (hidden on mobile) */}
        <PixelButton
          variant="gold"
          size="sm"
          onClick={handlePauseClick}
          aria-label={isPaused ? 'Resume Game' : 'Pause Game'}
          className="hidden md:flex min-h-[40px]"
        >
          <span className="" aria-hidden="true">{isPaused ? '▶' : '⏸'}</span> {isPaused ? 'RESUME' : 'PAUSE'}
        </PixelButton>
      </div>
    </header>
  )
}

export default TopBar