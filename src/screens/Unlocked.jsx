import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameStore } from '../hooks/useGameStore'
import { useAudio } from '../hooks/useAudio'
import { spawnConfetti, spawnParticles } from '../utils/confetti'
import PixelButton from '../components/PixelButton'
import PixelPanel from '../components/PixelPanel'
import Coin from '../components/Coin'
import { FAVORITE_TECH } from '../config/gameConfig'
import FooterNavigation from '../components/FooterNavigation'

const Unlocked = () => {
  const navigate = useNavigate()
  const { coins, addCoins, setCurrentScreen, soundEnabled, favoriteTechGuessed, visitedScreens, markScreenVisited } = useGameStore()
  const { playCorrectGuess } = useAudio()
  const confettiSpawned = useRef(false)

  useEffect(() => {
    setCurrentScreen('unlocked')
    playCorrectGuess()
    // Award coins only on first visit
    if (!visitedScreens.unlocked) {
      markScreenVisited('unlocked')
    }
    confettiSpawned.current = true

    // Spawn confetti and particles once using canvas animation
    spawnConfetti()
    spawnParticles(50, 50)

    // No interval needed - canvas animation runs for ~3 seconds then cleans up
    return () => {
      confettiSpawned.current = false
    }
  }, [setCurrentScreen, markScreenVisited, visitedScreens])

  const handleContinue = () => {
    navigate('/world')
  }

  return (
    <div className="min-h-screen flex flex-col justify-between relative selection:bg-yellow-300 selection:text-black overflow-hidden">
      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6 relative flex flex-col justify-center items-center">
        <div className="w-full relative flex flex-col justify-center items-center min-h-[calc(100vh-200px)]">
          {/* Background Scenery */}
          <div className="absolute inset-0 select-none opacity-30" aria-hidden="true">
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

          {/* Victory Animation */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Crown & Star Burst */}
            <div className="relative mb-4" aria-hidden="true">
              <div className="flex justify-center gap-2 mb-2">
                {[0, 1, 2, 3, 4].map(i => (
                  <div
                    key={i}
                    className="w-3 h-3 rounded-full bg-[var(--gold)] animate-bounce"
                    style={{ animationDelay: `${i * 100}ms` }}
                  />
                ))}
              </div>
              <div className="w-28 h-28 bg-[var(--gold)] border-4 border-[var(--border-dark)] rounded-full flex items-center justify-center shadow-[6px_6px_0px_var(--border-dark)] animate-pulse-gentle">
                <span className="text-5xl font-bold text-[var(--border-dark)]">★</span>
              </div>
            </div>

            {/* Main Victory Message */}
            <div className="text-center mb-6 animate-fade-in">
              <div className="font-pixel text-2xl md:text-3xl text-[var(--grass)] mb-2 tracking-wider">LEVEL CLEARED!</div>
              <div className="font-pixel text-xl md:text-2xl text-[var(--text)] mb-2">WORLD 1-1 COMPLETE</div>
              <div className="bg-white border-3 border-[var(--border-dark)] shadow-xl px-6 py-4 rounded-2xl inline-block max-w-md">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <span className="text-4xl" aria-hidden="true">🏆</span>
                  <span className="font-pixel text-lg text-[var(--text)]">MYSTERY SOLVED!</span>
                </div>
                <div className="bg-[var(--cream)] border-2 border-[var(--border-dark)] rounded-xl p-3">
                  <p className="font-[var(--font-body)] text-base text-[var(--text)] font-semibold m-0">
                    <span className="font-pixel text-[var(--brick)]">FAVORITE TECH:</span> <span className="font-bold text-[var(--sky)]">{FAVORITE_TECH}</span>
                  </p>
                  <p className="font-[var(--font-body)] text-sm text-[var(--text-muted)] mt-1 m-0">
                    AWS Certified AI Practitioner · OCI Multicloud Architect · Serverless & Zero-Trust Specialist
                  </p>
                </div>
              </div>
            </div>

            {/* Rewards */}
            <div className="flex flex-wrap justify-center gap-4 mb-8 animate-slide-up">
              <PixelPanel variant="lg" className="px-6 py-4 text-center min-w-[180px]">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-2xl" aria-hidden="true">💰</span>
                  <span className="font-pixel text-[12px] text-[var(--text)]">BONUS COINS</span>
                </div>
                <div className="font-pixel text-3xl text-[var(--gold)] text-shadow-gold">+30</div>
              </PixelPanel>
              <PixelPanel variant="lg" className="px-6 py-4 text-center min-w-[180px]">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-2xl" aria-hidden="true">🗺️</span>
                  <span className="font-pixel text-[12px] text-[var(--text)]">UNLOCKED</span>
                </div>
                <div className="font-pixel text-2xl text-[var(--grass)]">OVERWORLD MAP</div>
              </PixelPanel>
              <PixelPanel variant="lg" className="px-6 py-4 text-center min-w-[180px]">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-2xl" aria-hidden="true">🎮</span>
                  <span className="font-pixel text-[12px] text-[var(--text)]">NEW POWER-UPS</span>
                </div>
                <div className="font-pixel text-2xl text-[var(--sky)]">SKILLS AVAILABLE</div>
              </PixelPanel>
            </div>

            {/* Continue Button */}
            <div className="flex flex-col sm:flex-row gap-4">
              <PixelButton
                variant="green"
                size="xl"
                onClick={handleContinue}
                className="min-w-[280px]"
              >
                <span className="mr-2" aria-hidden="true">🗺️</span>
                ENTER OVERWORLD MAP
              </PixelButton>
              <PixelButton
                variant="gold"
                size="lg"
                onClick={() => navigate('/skills')}
                className="min-w-[200px]"
              >
                <span className="mr-2" aria-hidden="true">⚡</span>
                VIEW POWER-UPS
              </PixelButton>
            </div>

            {/* Fun Facts */}
            <div className="mt-10 w-full max-w-2xl">
              <PixelPanel variant="retro" className="p-5">
                <h3 className="font-pixel text-[11px] text-[var(--text)] mb-4 text-center border-b-2 border-[var(--border-dark)] pb-3">
                  🎉 DID YOU KNOW?
                </h3>
                <div className="space-y-2 text-sm font-[var(--font-body)] text-[var(--text)]">
                  <p>• Yashika holds <strong>AWS Certified AI Practitioner</strong> & <strong>OCI Multicloud Architect Professional</strong></p>
                  <p>• She builds <strong>serverless architectures</strong> with Lambda, API Gateway & DynamoDB</p>
                  <p>• <strong>Terraform & CDK</strong> are her go-to for Infrastructure as Code</p>
                  <p>• Exploring <strong>Generative AI & Agentic Systems</strong> for cloud automation</p>
                </div>
              </PixelPanel>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <FooterNavigation
        leftContent={
          <>
            <span className="text-xl" aria-hidden="true">⭐</span>
            <div>
              <div className="font-pixel text-[10px] text-[var(--text-muted)] uppercase">LEVEL COMPLETE</div>
              <div className="font-[var(--font-body)] text-sm font-bold text-[var(--grass)]">World 1-1 ✓ | World 1-2 Unlocked</div>
            </div>
          </>
        }
      />
    </div>
  )
}

export default Unlocked