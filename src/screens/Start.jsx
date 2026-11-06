import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameStore } from '../hooks/useGameStore'
import { useAudio } from '../hooks/useAudio'
import PixelButton from '../components/PixelButton'
import PixelPanel from '../components/PixelPanel'
import Coin from '../components/Coin'
import { links } from '../content/links'
import FooterNavigation from '../components/FooterNavigation'

const Start = () => {
  const navigate = useNavigate()
  const { coins, addCoins, setCurrentScreen, soundEnabled, toggleSound } = useGameStore()
  const { playClick, playCoin, playJump } = useAudio()
  const [showStartAnimation, setShowStartAnimation] = useState(true)

  useEffect(() => {
    setCurrentScreen('start')
    const timer = setTimeout(() => setShowStartAnimation(false), 500)
    return () => clearTimeout(timer)
  }, [setCurrentScreen])

  const handleStartAdventure = () => {
    playJump()
    addCoins(5)
    navigate('/guess')
  }

  const handleViewResume = () => {
    playCoin()
    addCoins(2)
    // Open actual resume PDF in new tab
    window.open(links.resume, '_blank', 'noopener,noreferrer')
  }

  const handleSoundToggle = () => {
    toggleSound()
  }

  return (
    <div className="min-h-screen flex flex-col justify-between relative selection:bg-yellow-300 selection:text-black">
      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6 relative flex flex-col justify-center items-center">
        <div className="w-full">
          {/* Background Scenery */}
          <div className="w-full relative select-none pb-4">
            <div className="flex justify-between items-center px-4 md:px-12 pt-2 pb-6 opacity-95">
              <div className="cloud-slow flex items-center">
                <svg className="pixelated" fill="none" height="42" viewBox="0 0 112 42" width="112" aria-hidden="true">
                  <rect fill="#FFFFFF" height="12" width="48" x="24" y="0" />
                  <rect fill="#FFFFFF" height="12" width="76" x="12" y="12" />
                  <rect fill="#FFFFFF" height="12" width="104" x="0" y="24" />
                  <rect fill="#D8ECFD" height="6" width="96" x="8" y="36" />
                </svg>
              </div>
              <div className="bg-white border-2 border-[var(--border-dark)] shadow-xl px-5 py-2 rounded-xl flex items-center gap-3">
                <span className="font-pixel text-[12px] text-[var(--text)] tracking-wider">WORLD 1-1</span>
                <span className="w-2 h-2 rounded-full bg-[var(--grass)] animate-pulse" aria-hidden="true" />
                <span className="font-pixel text-[11px] text-[var(--text)] uppercase">CLOUD TRIVIA STAGE</span>
              </div>
              <div className="cloud-fast hidden md:flex items-center">
                <svg className="pixelated" fill="none" height="34" viewBox="0 0 88 34" width="88" aria-hidden="true">
                  <rect fill="#FFFFFF" height="10" width="36" x="20" y="0" />
                  <rect fill="#FFFFFF" height="10" width="60" x="8" y="10" />
                  <rect fill="#FFFFFF" height="10" width="80" x="0" y="20" />
                  <rect fill="#D8ECFD" height="4" width="74" x="6" y="30" />
                </svg>
              </div>
            </div>
          </div>

          {/* Start Screen Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mt-4 px-2 md:px-6">
            {/* Left: Yashika & Speech Bubble */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-start z-20">
              <div className={`relative bg-white border-3 border-[var(--border-dark)] shadow-xl p-5 rounded-xl max-w-sm mb-5 ${showStartAnimation ? 'animate-fade-in' : ''}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-pixel text-[11px] text-[var(--text)]">★ YASHIKA SAYS</span>
                  <span className="bg-[var(--grass)] text-white px-2 py-0.5 rounded font-pixel text-[9px]">SPEAKER</span>
                </div>
                <p className="font-[var(--font-body)] text-base text-[var(--text)] font-semibold leading-relaxed m-0">
                  Welcome to my portfolio adventure! I'm Yashika, a Computer Science student at GLA University specializing in Cloud Infrastructure, DevOps & AI.
                </p>
                <div className="w-4 h-4 bg-white border-b-3 border-r-3 border-[var(--border-dark)] rotate-45 absolute -bottom-2.5 left-10 shadow-md" aria-hidden="true" />
              </div>

              <div className="flex flex-col items-center lg:ml-8">
                <div className="bounce-idle cursor-pointer" onClick={() => { playClick(); setTimeout(() => playClick(), 120); }} title="Cheer with Yashika!" role="button" tabIndex={0} aria-label="Yashika character">
                  <svg className="w-36 h-36 pixelated drop-shadow-xl" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                    <rect fill="#1C1412" height="4" width="10" x="7" y="1" />
                    <rect fill="#1C1412" height="6" width="14" x="5" y="3" />
                    <rect fill="#1C1412" height="12" width="3" x="4" y="6" />
                    <rect fill="#1C1412" height="12" width="3" x="17" y="6" />
                    <rect fill="#E8B490" height="9" width="10" x="7" y="5" />
                    <rect fill="#1C1412" height="2" width="3" x="8" y="4" />
                    <rect fill="#1C1412" height="2" width="3" x="13" y="4" />
                    <rect fill="#1C1412" height="1" width="2" x="8" y="7" />
                    <rect fill="#1C1412" height="1" width="2" x="14" y="7" />
                    <rect fill="#1C1412" height="2" width="2" x="8" y="8" />
                    <rect fill="#1C1412" height="2" width="2" x="14" y="8" />
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
                <div className="w-44 bg-white border-3 border-[var(--border-dark)] shadow-lg rounded-xl pt-2 pb-3 px-4 text-center mt-1">
                  <span className="font-pixel text-[11px] text-[var(--text)] block">YASHIKA</span>
                </div>
              </div>
            </div>

            {/* Right: Action Buttons */}
            <div className="lg:col-span-7 flex flex-col justify-center items-center w-full">
              <PixelPanel variant="default" className="w-full max-w-md p-8 text-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-24 h-24 bg-[var(--gold)] border-4 border-[var(--border-dark)] rounded-xl flex items-center justify-center shadow-[6px_6px_0px_var(--border-dark)]">
                    <span className="text-5xl" aria-hidden="true">🍄</span>
                  </div>
                  <h2 className="font-pixel text-lg md:text-xl text-[var(--text)] tracking-tight">
                    START YOUR ADVENTURE
                  </h2>
                  <p className="font-[var(--font-body)] text-sm text-[var(--text-muted)] leading-relaxed max-w-xs mx-auto">
                    Explore my cloud projects, AI experiments, and DevOps journey through an interactive Mario-style platformer portfolio.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs mx-auto mt-4">
                    <PixelButton
                      variant="green"
                      size="lg"
                      className="w-full sm:w-auto flex-1"
                      onClick={handleStartAdventure}
                    >
                      🚀 START ADVENTURE
                    </PixelButton>
                    <PixelButton
                      variant="gold"
                      size="lg"
                      className="w-full sm:w-auto flex-1"
                      onClick={handleViewResume}
                    >
                      📜 VIEW RESUME
                    </PixelButton>
                  </div>

                  {/* Skip game link */}
                  <div className="mt-4 text-center">
                    <a
                      href="/about"
                      className="font-[var(--font-body)] text-sm text-[var(--text-muted)] hover:text-[var(--brick)] underline transition-colors"
                      onClick={(e) => { e.preventDefault(); navigate('/about'); playClick(); }}
                    >
                      ← Skip game, view portfolio
                    </a>
                  </div>

                  <div className="flex items-center justify-center gap-4 mt-6 pt-4 border-t-2 border-slate-200">
                    <Coin count={coins} />
                    <span className="font-pixel text-[10px] text-[var(--text-muted)]">COINS COLLECTED</span>
                  </div>
                </div>
              </PixelPanel>

              {/* Feature Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 w-full max-w-2xl">
                <PixelPanel variant="sm" className="p-4 text-center">
                  <div className="text-3xl mb-2" aria-hidden="true">☁️</div>
                  <h3 className="font-pixel text-[10px] text-[var(--text)] mb-1">CLOUD & DEVOPS</h3>
                  <p className="font-[var(--font-body)] text-xs text-[var(--text-muted)]">AWS, Terraform, Docker, Kubernetes, CI/CD</p>
                </PixelPanel>
                <PixelPanel variant="sm" className="p-4 text-center">
                  <div className="text-3xl mb-2" aria-hidden="true">🤖</div>
                  <h3 className="font-pixel text-[10px] text-[var(--text)] mb-1">AI & ML</h3>
                  <p className="font-[var(--font-body)] text-xs text-[var(--text-muted)]">Generative AI, Agentic Systems, Python</p>
                </PixelPanel>
                <PixelPanel variant="sm" className="p-4 text-center">
                  <div className="text-3xl mb-2" aria-hidden="true">🎮</div>
                  <h3 className="font-pixel text-[10px] text-[var(--text)] mb-1">INTERACTIVE</h3>
                  <p className="font-[var(--font-body)] text-xs text-[var(--text-muted)]">Games, Demos, Live Projects</p>
                </PixelPanel>
              </div>
            </div>
          </div>

          {/* Bottom Navigation */}
          <FooterNavigation
            leftContent={
              <>
                <span className="text-xl" aria-hidden="true">🌀</span>
                <div>
                  <div className="font-pixel text-[10px] text-[var(--text-muted)] uppercase">WARP ZONE TERMINAL</div>
                  <div className="font-[var(--font-body)] text-sm font-bold text-[var(--text)]">Jump Between World Areas</div>
                </div>
              </>
            }
          />
        </div>
      </main>
    </div>
  )
}

export default Start