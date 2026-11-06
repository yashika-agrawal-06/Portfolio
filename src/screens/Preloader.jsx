import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameStore } from '../hooks/useGameStore'
import PixelButton from '../components/PixelButton'
import PixelPanel from '../components/PixelPanel'
import { useAudio } from '../hooks/useAudio'

const Preloader = () => {
  const navigate = useNavigate()
  const { coins, addCoins, setCurrentScreen, soundEnabled, setSoundEnabled, visitedScreens, markScreenVisited } = useGameStore()
  const { playCoin, playPowerup } = useAudio()
  const [progress, setProgress] = useState(35)
  const [statusIndex, setStatusIndex] = useState(0)
  const [isReady, setIsReady] = useState(false)
  const progressTimerRef = useRef(null)
  const heroOrbitRef = useRef(null)
  const mysteryBlockRef = useRef(null)
  const coinBurstContainerRef = useRef(null)

  const statusMessages = [
    "LOADING YASHIKA'S SUPER WORLD...",
    "SUMMONING AWS SERVERLESS CLUSTERS...",
    "CALIBRATING 2D ORBIT PHYSICS ENGINE...",
    "SPAWNING AUTONOMOUS AGENT AGENTS...",
    "PRESS START / AUTO-LAUNCHING..."
  ]

  const bumpMysteryBlock = () => {
    const block = mysteryBlockRef.current
    const container = coinBurstContainerRef.current

    if (!block || !container) return

    block.classList.remove('block-bump-active')
    void block.offsetWidth
    block.classList.add('block-bump-active')

    addCoins(1)
    playCoin()

    const coin = document.createElement('div')
    coin.className = 'absolute coin-pop flex flex-col items-center justify-center pointer-events-none z-40'
    coin.innerHTML = `
      <div class="w-8 h-8 rounded-full bg-[#FCB000] border-2 border-black flex items-center justify-center text-sm font-pixel text-[#5B2700] shadow-[2px_2px_0px_#000]">★</div>
      <div class="font-pixel text-[11px] text-[var(--border-dark)] font-extrabold score-float mt-1 bg-white/90 px-1 py-0.5 rounded border border-black shadow-xs">+100</div>
    `
    container.appendChild(coin)

    setTimeout(() => {
      coin.remove()
    }, 850)
  }

  const launchWorld = () => {
    setProgress(100)
    playPowerup()
    // Award completion coins only on first visit
    if (!visitedScreens.preloader) {
      markScreenVisited('preloader')
      addCoins(5)
    }
    setCurrentScreen('start')
    navigate('/')
  }

  const toggleAudio = () => {
    setSoundEnabled(!soundEnabled)
  }

  useEffect(() => {
    setCurrentScreen('preloader')

    // Progress bar simulation
    progressTimerRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev < 100) {
          const newProgress = Math.min(prev + Math.floor(Math.random() * 9) + 5, 100)
          const msgIndex = Math.min(Math.floor((newProgress / 100) * statusMessages.length), statusMessages.length - 1)
          setStatusIndex(msgIndex)

          if (newProgress === 100) {
            setIsReady(true)
            clearInterval(progressTimerRef.current)
          }
          return newProgress
        }
        return prev
      })
    }, 240)

    return () => {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current)
    }
  }, [setCurrentScreen, navigate, soundEnabled, setSoundEnabled])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault()
        launchWorld()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [launchWorld])

  return (
    <div className="flex flex-col min-h-screen selection:bg-yellow-300 selection:text-black relative overflow-x-hidden">
      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col items-center justify-between px-4 py-6 md:py-10 relative overflow-hidden select-none">
        {/* Drifting Clouds */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-6 left-10 cloud-drift-1 opacity-90">
            <svg className="w-32 h-16 pixelated drop-shadow-sm" fill="none" viewBox="0 0 112 56" aria-hidden="true">
              <rect fill="#FFFFFF" height="40" width="64" x="24" y="8" />
              <rect fill="#FFFFFF" height="24" width="96" x="8" y="24" />
              <rect fill="#FFFFFF" height="16" width="32" x="40" y="0" />
              <rect fill="#D6E6F5" height="4" width="80" x="16" y="44" />
            </svg>
          </div>
          <div className="absolute top-16 right-12 cloud-drift-2 opacity-85">
            <svg className="w-40 h-20 pixelated drop-shadow-sm" fill="none" viewBox="0 0 128 64" aria-hidden="true">
              <rect fill="#FFFFFF" height="44" width="72" x="28" y="12" />
              <rect fill="#FFFFFF" height="28" width="104" x="12" y="28" />
              <rect fill="#FFFFFF" height="16" width="36" x="48" y="0" />
              <rect fill="#D6E6F5" height="4" width="88" x="20" y="52" />
            </svg>
          </div>
          <div className="absolute top-44 left-1/4 cloud-drift-1 opacity-70">
            <svg className="w-24 h-12 pixelated drop-shadow-sm" fill="none" viewBox="0 0 80 40" aria-hidden="true">
              <rect fill="#FFFFFF" height="28" width="48" x="16" y="6" />
              <rect fill="#FFFFFF" height="18" width="68" x="6" y="16" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <div className="flex flex-col items-center text-center mt-2 z-10">
          <div className="inline-flex items-center gap-2 bg-white px-5 py-2 rounded-xl border-3 border-[var(--border-dark)] shadow-[4px_4px_0px_#000000]">
            <span className="w-3 h-3 bg-[var(--gold)] border border-black rounded-full animate-ping" aria-hidden="true" />
            <h1 className="font-pixel text-xs sm:text-base md:text-lg text-[var(--border-dark)] tracking-wider uppercase font-bold">
              ★ YASHIKA'S SUPER WORLD ★
            </h1>
            <span className="w-3 h-3 bg-[var(--grass)] border border-black rounded-full animate-pulse" aria-hidden="true" />
          </div>
          <p className="font-pixel text-[9px] sm:text-[10px] text-[var(--border-dark)] font-bold mt-2.5 bg-[#FFF3A7]/90 px-3 py-1 rounded border border-[var(--border-dark)] shadow-[2px_2px_0px_#000]">
            STAGE 1 // CLOUD & AI EXPEDITION
          </p>
        </div>

        {/* Center Stage */}
        <div className="relative w-full max-w-xl h-72 sm:h-80 flex flex-col items-center justify-center my-auto z-10">
          {/* Mystery Block */}
          <div className="relative z-30 mb-8 cursor-pointer group" ref={mysteryBlockRef} onClick={bumpMysteryBlock} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); bumpMysteryBlock() } }} tabIndex={0} role="button" aria-label="Hit the mystery block">
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-visible" ref={coinBurstContainerRef} />
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[var(--gold)] border-4 border-[var(--border-dark)] rounded-[4px] shadow-[6px_6px_0px_var(--border-dark)] relative flex items-center justify-center transition-transform hover:scale-105 active:scale-95 select-none" style={{ background: 'linear-gradient(135deg, #FFDE59 0%, #FCB000 50%, #F57C00 100%)' }}>
              <div className="absolute inset-1 border-t-2 border-l-2 border-[#FFF8B0] border-r-2 border-b-2 border-[#BD5800] pointer-events-none" />
              <div className="absolute top-2 left-2 w-2 h-2 bg-[#5B2700] rounded-xs shadow-[1px_1px_0px_#FFF8B0]" />
              <div className="absolute top-2 right-2 w-2 h-2 bg-[#5B2700] rounded-xs shadow-[1px_1px_0px_#FFF8B0]" />
              <div className="absolute bottom-2 left-2 w-2 h-2 bg-[#5B2700] rounded-xs shadow-[1px_1px_0px_#FFF8B0]" />
              <div className="absolute bottom-2 right-2 w-2 h-2 bg-[#5B2700] rounded-xs shadow-[1px_1px_0px_#FFF8B0]" />
              <span className="font-pixel text-3xl sm:text-4xl text-[#5B2700] font-extrabold question-glow select-none pointer-events-none">?</span>
            </div>
          </div>

          {/* Orbit Path */}
          <div className="relative w-72 sm:w-80 h-24 flex items-center justify-center">
            <div className="absolute bottom-0 w-64 h-6 bg-black/15 rounded-[100%] blur-[2px] pointer-events-none" />
            <div className="absolute z-20 cinematic-hero-orbit cursor-pointer" ref={heroOrbitRef} onClick={bumpMysteryBlock} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); bumpMysteryBlock() } }} tabIndex={0} role="button" aria-label="Yashika character">
              <svg className="w-16 h-24 sm:w-18 sm:h-26 pixelated drop-shadow-[0_8px_6px_rgba(0,0,0,0.35)]" fill="none" viewBox="0 0 32 48" aria-hidden="true">
                <rect fill="#140D0B" height="6" width="16" x="8" y="2" />
                <rect fill="#140D0B" height="8" width="20" x="6" y="6" />
                <rect fill="#140D0B" height="18" width="5" x="5" y="12" />
                <rect fill="#140D0B" height="18" width="5" x="22" y="12" />
                <rect fill="#140D0B" height="11" width="3" x="4" y="16" />
                <rect fill="#140D0B" height="11" width="3" x="25" y="16" />
                <rect fill="#E8B490" height="13" width="12" x="10" y="8" />
                <rect fill="#140D0B" height="3" width="3" x="11" y="13" />
                <rect fill="#140D0B" height="3" width="3" x="18" y="13" />
                <rect fill="#FFFFFF" height="1" width="1" x="11" y="13" />
                <rect fill="#FFFFFF" height="1" width="1" x="18" y="13" />
                <rect fill="#F8A5A5" height="2" width="2" x="9" y="16" />
                <rect fill="#F8A5A5" height="2" width="2" x="21" y="16" />
                <rect fill="#FF8FA3" height="2" width="5" x="13.5" y="18" />
                <rect fill="#181A1E" height="12" width="16" x="8" y="21" />
                <rect fill="#CBD5E1" height="11" width="2" x="15" y="21" />
                <rect fill="#FF9900" height="2" width="3" x="10" y="23" />
                <rect fill="#181A1E" height="8" width="3" x="6" y="22" />
                <rect fill="#181A1E" height="8" width="3" x="23" y="22" />
                <rect fill="#E8B490" height="3" width="3" x="6" y="30" />
                <rect fill="#E8B490" height="3" width="3" x="23" y="30" />
                <rect fill="#1E232A" height="9" width="5" x="10" y="33" />
                <rect fill="#1E232A" height="9" width="5" x="17" y="33" />
                <rect fill="#994D1C" height="4" width="7" x="8" y="42" />
                <rect fill="#994D1C" height="4" width="7" x="17" y="42" />
                <rect fill="#FFFFFF" height="1" width="7" x="8" y="45" />
                <rect fill="#FFFFFF" height="1" width="7" x="17" y="45" />
              </svg>
            </div>
          </div>

          {/* Platform */}
          <div className="w-72 sm:w-96 flex flex-col items-center mt-3 z-10">
            <div className="h-3 w-full bg-[var(--grass)] border-3 border-[var(--border-dark)] rounded-t-sm shadow-[3px_3px_0px_#000]" />
            <div className="h-6 w-full bg-[#994D1C] border-x-3 border-b-3 border-[var(--border-dark)] flex items-center justify-around px-2 shadow-[4px_4px_0px_#000]">
              <div className="h-3 w-12 bg-[#BD632B] rounded-xs border border-[var(--border-dark)]" />
              <div className="h-3 w-12 bg-[#BD632B] rounded-xs border border-[var(--border-dark)]" />
              <div className="h-3 w-12 bg-[#BD632B] rounded-xs border border-[var(--border-dark)]" />
            </div>
          </div>
        </div>

        {/* Bottom Preloader */}
        <div className="w-full max-w-xl flex flex-col items-center gap-3.5 z-20 pb-2">
          <PixelPanel variant="default" className="w-full p-4 sm:p-5 flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--grass)] animate-ping" aria-hidden="true" />
                <span className="font-pixel text-[10px] sm:text-xs text-[var(--border-dark)] font-bold" id="status-ticker">
                  {statusMessages[statusIndex]}
                </span>
              </div>
              <span className="font-pixel text-xs sm:text-sm text-[var(--border-dark)] font-bold" id="progress-percent">
                {progress}%
              </span>
            </div>
            <div className="w-full h-6 bg-[#f1f5f9] rounded-md border-2 border-[var(--border-dark)] p-1 flex items-center overflow-hidden">
              <div
                className="h-full bg-[var(--grass)] rounded transition-all duration-300 flex items-center justify-end pr-1 border border-[var(--border-dark)]"
                id="progress-bar-fill"
                style={{ width: `${progress}%` }}
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Loading progress"
              >
                <div className="w-2 h-full bg-white/70 animate-pulse" />
              </div>
            </div>
            <div className="flex items-center justify-between text-[10px] font-pixel text-slate-700 pt-1">
              <span className="text-[var(--border-dark)]">SYS: AWS SERVERLESS // BEDROCK READY</span>
              <span className="text-[var(--grass)] font-bold animate-pulse" id="launch-ready-hint">
                {isReady ? 'READY! ENTERING STAGE 1...' : 'AUTO-LAUNCHING...'}
              </span>
            </div>
          </PixelPanel>

          <PixelButton
            variant="gold"
            size="lg"
            className="w-full"
            onClick={launchWorld}
            disabled={!isReady}
          >
            <span>⚡</span>
            <span id="start-btn-label">{isReady ? 'PRESS START / ENTER' : 'LOADING...'}</span>
          </PixelButton>
        </div>
      </main>
    </div>
  )
}

export default Preloader