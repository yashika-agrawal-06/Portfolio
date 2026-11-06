import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useGameStore } from '../hooks/useGameStore'
import { useAudio } from '../hooks/useAudio'
import PixelButton from '../components/PixelButton'
import PixelPanel from '../components/PixelPanel'

const NotFound = () => {
  const navigate = useNavigate()
  const { playClick } = useAudio()

  const handleBackToMap = () => {
    playClick()
    navigate('/world')
  }

  const handleBackToStart = () => {
    playClick()
    navigate('/')
  }

  return (
    <div className="min-h-screen flex flex-col justify-between relative selection:bg-yellow-300 selection:text-black">
      <main className="flex-1 flex items-center justify-center">
        <PixelPanel variant="retro" className="text-center p-8 max-w-md mx-4">
          <span className="text-8xl mb-4 block animate-bounce" aria-hidden="true">🚧</span>
          <h2 className="font-pixel text-3xl text-[var(--text)] mb-2">WORLD NOT FOUND</h2>
          <p className="font-[var(--font-body)] text-[var(--text-muted)] mb-6">
            The pipe you're looking for doesn't exist in this world.
            It may have been moved, removed, or never existed at all.
          </p>
          <div className="space-y-3">
            <PixelButton variant="green" size="lg" onClick={handleBackToMap}>
              🗺️ RETURN TO OVERWORLD MAP
            </PixelButton>
            <PixelButton variant="cream" size="lg" onClick={handleBackToStart}>
              🏠 BACK TO START SCREEN
            </PixelButton>
          </div>
        </PixelPanel>
      </main>

      <footer className="bg-[var(--cream)] border-t-4 border-[var(--border-dark)] px-4 py-4">
        <PixelPanel variant="default" className="max-w-7xl mx-auto p-4 text-center">
          <div className="font-pixel text-[10px] text-[var(--text-muted)] uppercase">404 - NOT FOUND</div>
        </PixelPanel>
      </footer>
    </div>
  )
}

export default NotFound