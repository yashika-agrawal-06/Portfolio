import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameStore } from '../hooks/useGameStore'
import { useAudio } from '../hooks/useAudio'
import PixelButton from '../components/PixelButton'
import PixelPanel from '../components/PixelPanel'
import QuestionBlock from '../components/QuestionBlock'
import Coin from '../components/Coin'
import { FAVORITE_TECH, CORRECT_POSITION, OTHER_TECH, TECH_OPTIONS, HINTS } from '../config/gameConfig'
import FooterNavigation from '../components/FooterNavigation'

const Guess = () => {
  const navigate = useNavigate()
  const { coins, addCoins, setCurrentScreen, soundEnabled, favoriteTechGuessed, setFavoriteTechGuessed } = useGameStore()
  const { playCorrectGuess, playWrongGuess, playCoin, playClick } = useAudio()
  const [gameStatus, setGameStatus] = useState('Click any mystery block to test your tech intuition!')
  const [statusType, setStatusType] = useState('info')
  const [hintCount, setHintCount] = useState(0)
  const [revealedBlocks, setRevealedBlocks] = useState({})
  const [correctRevealed, setCorrectRevealed] = useState(false)

  const handleTechGuess = (techName) => {
    if (revealedBlocks[techName]) return

    addCoins(1)
    const newRevealed = { ...revealedBlocks, [techName]: true }
    setRevealedBlocks(newRevealed)

    // Compare using same string constant (trim and lowercase both sides)
    const clickedValue = techName.trim().toLowerCase()
    const targetValue = FAVORITE_TECH.trim().toLowerCase()
    console.log('[Guess] Clicked:', clickedValue, '| Target:', targetValue)
    const isCorrect = clickedValue === targetValue

    if (isCorrect) {
      playCorrectGuess()

      addCoins(10)
      setCorrectRevealed(true)
      setFavoriteTechGuessed(techName)
      setGameStatus('YES, YOU GUESSED IT! Voila! You unlocked the next level!')
      setStatusType('success')

      setTimeout(() => {
        navigate('/unlocked')
      }, 1500)
    } else {
      playWrongGuess()
      setGameStatus('Oops, not quite! Try another block.')
      setStatusType('error')
      setTimeout(() => {
        setGameStatus('Click any mystery block to test your tech intuition!')
        setStatusType('info')
      }, 3000)
    }
  }

  const revealHint = () => {
    addCoins(1)
    playCoin()
    const hintMsg = HINTS[hintCount % HINTS.length]
    setHintCount(hintCount + 1)
    setGameStatus(`💡 ${hintMsg}`)
    setStatusType('hint')
  }

  useEffect(() => {
    setCurrentScreen('guess')
  }, [setCurrentScreen])

  // Use TECH_OPTIONS from config (fixed order: Python, Docker, AWS, React, Terraform, Generative AI)
  const techOptions = TECH_OPTIONS

  return (
    <div className="min-h-screen flex flex-col justify-between relative selection:bg-yellow-300 selection:text-black">
      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6 relative flex flex-col justify-center items-center">
        <div className="flex flex-col w-full relative">
          {/* Confetti Layer */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-30" id="confetti-container" aria-hidden="true" />

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
                <span className="w-3 h-3 rounded-full bg-[var(--gold)] animate-bounce" aria-hidden="true" />
                <span className="font-pixel text-[11px] text-[var(--text)] tracking-wider">6 MYSTERY TECH BLOCKS</span>
                <span className="w-3 h-3 rounded-full bg-[var(--grass)] animate-pulse" aria-hidden="true" />
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

          {/* Game Area */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mt-4 px-2 md:px-6">
            {/* Left: Yashika & Speech Bubble */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-start z-20">
              <div className="relative bg-white border-3 border-[var(--border-dark)] shadow-xl p-5 rounded-xl max-w-sm mb-5 animate-fade-in">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-pixel text-[11px] text-[var(--text)]">★ YASHIKA SAYS</span>
                  <span className="bg-[var(--grass)] text-white px-2 py-0.5 rounded font-pixel text-[9px]">SPEAKER</span>
                </div>
                <p className="font-[var(--font-body)] text-base text-[var(--text)] font-semibold leading-relaxed m-0">
                  Can you guess my absolute favorite technology?
                </p>
                <div className="mt-3 p-3 bg-[var(--cream)] border border-[var(--border-dark)] rounded-lg">
                  <p className="font-[var(--font-body)] text-sm text-[var(--text)] m-0">
                    <strong className="font-pixel text-[10px] text-[var(--brick)]">CLUE:</strong> It powers millions of global cloud builders, uses orange smiles, and underpins modern serverless architectures!
                  </p>
                </div>
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

            {/* Right: Question Blocks */}
            <div className="lg:col-span-8 flex flex-col justify-end w-full">
              <div className="flex justify-between items-center mb-4 px-2">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[var(--gold)] shadow-sm" aria-hidden="true" />
                  <span className="font-pixel text-[10px] text-[var(--text)] uppercase tracking-wide">6 MYSTERY TECH BLOCKS</span>
                </div>
                <span className="font-pixel text-[9px] text-[var(--text-muted)] bg-[var(--cream)] border border-[var(--border-dark)] px-3 py-1 rounded-full">SELECT TO REVEAL</span>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4 w-full">
                {techOptions.map((tech, index) => (
                  <div key={tech} className="flex flex-col items-center">
                    <QuestionBlock
                      techName={tech}
                      isRevealed={revealedBlocks[tech] || false}
                      isCorrect={tech === FAVORITE_TECH && correctRevealed}
                      onClick={() => handleTechGuess(tech)}
                      disabled={revealedBlocks[tech] || correctRevealed}
                      aria-label={`Mystery block ${index + 1}: ${revealedBlocks[tech] ? `Revealed - ${tech}` : 'Unknown technology'}`}
                    />
                    <span className="font-pixel text-[9px] text-[var(--text-muted)] mt-2 text-center">
                      {revealedBlocks[tech] ? tech : `???`}
                    </span>
                  </div>
                ))}
              </div>

              <div className="w-full mt-6 rounded-xl bg-white border-3 border-[var(--border-dark)] shadow-xl p-3 flex flex-col relative overflow-hidden">
                <div className="h-3 w-full bg-[var(--grass)] rounded-t-lg -mt-3 -mx-3 mb-2" />
                <div className="flex justify-between items-center px-2 py-1">
                  <span className="font-pixel text-[10px] text-[var(--text)] font-bold">STAGE SURFACE: 16-BIT RETRO ARCHITECTURE</span>
                </div>
              </div>
            </div>
          </div>

          {/* Victory Banner */}
          {correctRevealed && (
            <div className="w-full mt-6 bg-white border-3 border-[var(--border-dark)] shadow-2xl rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden animate-fade-in">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[var(--gold)] text-[var(--border-dark)] border-2 border-[var(--border-dark)] flex items-center justify-center shadow-lg text-2xl font-bold shrink-0" aria-hidden="true">★</div>
                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-pixel text-[11px] text-[var(--grass)] tracking-wide">CORRECT! YOU UNLOCKED THE NEXT LEVEL!</span>
                    <span className="bg-[var(--sky)] text-[var(--border-dark)] border border-[var(--border-dark)] px-2.5 py-0.5 rounded-full font-pixel text-[9px] font-bold">+10 COINS</span>
                  </div>
                  <p className="font-[var(--font-body)] text-sm text-[var(--text)] font-semibold m-0 max-w-2xl">
                    {FAVORITE_TECH === 'REPLACE_ME'
                      ? `Configure FAVORITE_TECH in src/config/gameConfig.js!`
                      : `${FAVORITE_TECH} is Yashika's core playground! As an AWS Certified AI Practitioner, she designs automated compute pipelines, serverless Lambda backends, and zero-trust cloud architectures.`}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0 w-full md:w-auto justify-end">
                <PixelButton variant="gold" size="md" onClick={revealHint}>
                  <span aria-hidden="true">💡</span> HINT (-0 COINS)
                </PixelButton>
                <PixelButton variant="green" size="lg" onClick={() => navigate('/world')}>
                  <span aria-hidden="true">🗺️</span> ENTER NEXT LEVEL (OVERWORLD MAP)
                </PixelButton>
              </div>
            </div>
          )}

          {/* Status Panel */}
          <div className={`w-full mt-4 bg-white border-2 border-[var(--border-dark)] shadow-sm rounded-xl px-5 py-3 flex items-center justify-between transition-colors duration-300 ${
            statusType === 'error' ? 'bg-red-50' :
            statusType === 'success' ? 'bg-green-50' :
            statusType === 'hint' ? 'bg-yellow-50' : ''
          }`} id="game-status-panel" role="status" aria-live="polite">
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${
                statusType === 'success' ? 'bg-green-500' :
                statusType === 'error' ? 'bg-red-500' :
                statusType === 'hint' ? 'bg-yellow-500' : 'bg-[var(--grass)]'
              } animate-ping`} aria-hidden="true" />
              <span className="font-[var(--font-body)] text-sm text-[var(--text)] font-semibold" id="game-status-text">
                {gameStatus}
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <FooterNavigation
        leftContent={
          <>
            <span className="text-xl" aria-hidden="true">🧩</span>
            <div>
              <div className="font-pixel text-[10px] text-[var(--text-muted)] uppercase">MINIGAME STAGE</div>
              <div className="font-[var(--font-body)] text-sm font-bold text-[var(--text)]">Guess Yashika's Favorite Tech</div>
            </div>
          </>
        }
      />
    </div>
  )
}

export default Guess