import { useEffect, useCallback, useState } from 'react'
import { audio } from '../utils/audio'
import { useGameStore } from './useGameStore'

/**
 * Unified Audio Hook
 * Uses the module-level singleton audio manager
 * Background music starts on first user interaction (autoplay policy)
 * Sound toggle persisted in localStorage via game store
 */
export const useAudio = () => {
  const { soundEnabled, setSoundEnabled } = useGameStore()
  const [isMuted, setIsMuted] = useState(!soundEnabled)

  // Sync with game store's soundEnabled
  useEffect(() => {
    setIsMuted(!soundEnabled)
    audio.setSoundEnabled(soundEnabled)
  }, [soundEnabled])

  // Attach interaction listeners for auto-initialization on first user gesture
  useEffect(() => {
    audio.attachInteractionListeners()
    return () => {
      // Don't detach - the singleton persists
    }
  }, [])

  // Expose audio functions
  const toggleMute = useCallback(() => {
    audio.toggleMute()
    setIsMuted(audio.isMuted())
    setSoundEnabled(audio.soundEnabled)
  }, [setSoundEnabled])

  return {
    // Music controls
    playBgMusic: audio.startBgMusic,
    stopBgMusic: audio.stopBgMusic,
    toggleMute,
    isMuted,
    // Sound effects
    playCoin: audio.playCoin,
    playJump: audio.playJump,
    playWrongGuess: audio.playWrongGuess,
    playCorrectGuess: audio.playCorrectGuess,
    playClick: audio.playClick,
    playBlockHit: audio.playBlockHit,
    playPowerup: audio.playPowerup,
    playError: audio.playError,
    playSuccess: audio.playSuccess,
    // For advanced usage
    audioManager: audio,
  }
}

export default useAudio