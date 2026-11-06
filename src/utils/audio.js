// Audio Manager - Singleton Module
// Lazy initialization on first user gesture
// Handles background music (theme.mp3 or generated chiptune) and sound effects
// Sound state is managed by the game store (zustand) as single source of truth

// Singleton state
let audioContext = null
let bgMusicGain = null
let sfxGain = null
let masterGain = null
let bgMusicOscillators = []
let isBgMusicPlaying = false
let soundEnabled = true // Default to true (unmuted) - audio starts on first user interaction
let initialized = false
let initPromise = null
let bgMusicElement = null // HTMLAudioElement for theme.mp3
let userGestureHandler = null
let visibilityHandler = null

// Default volumes
const DEFAULT_MUSIC_VOLUME = 0.3
const DEFAULT_SFX_VOLUME = 0.3

// Check for reduced motion preference
const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Initialize audio context - MUST be called after user gesture
async function ensureInitialized() {
  if (initialized) return
  if (initPromise) return initPromise

  initPromise = (async () => {
    try {
      const AudioContextCtor = window.AudioContext || window.webkitAudioContext
      audioContext = new AudioContextCtor()

      // Create master gain for mute/unmute
      masterGain = audioContext.createGain()
      masterGain.gain.value = soundEnabled ? 1 : 0
      masterGain.connect(audioContext.destination)

      // Create gain nodes for volume control
      bgMusicGain = audioContext.createGain()
      bgMusicGain.gain.value = DEFAULT_MUSIC_VOLUME
      bgMusicGain.connect(masterGain)

      sfxGain = audioContext.createGain()
      sfxGain.gain.value = DEFAULT_SFX_VOLUME
      sfxGain.connect(masterGain)

      // Resume context if suspended (autoplay policy)
      if (audioContext.state === 'suspended') {
        await audioContext.resume()
      }

      initialized = true

      // Set up visibility change handler after init
      setupVisibilityHandler()

      // If sound is enabled, start background music
      if (soundEnabled && !isBgMusicPlaying) {
        startBgMusic()
      }
    } catch (e) {
      console.warn('Audio: Failed to initialize audio context', e)
      initialized = false
    }
  })()

  return initPromise
}

// Set up visibility change handler to pause/resume on tab hidden
function setupVisibilityHandler() {
  if (visibilityHandler || typeof document === 'undefined') return

  visibilityHandler = () => {
    if (document.hidden) {
      // Tab is hidden - pause background music
      if (isBgMusicPlaying) {
        pauseBgMusicForHiddenTab()
      }
    } else {
      // Tab is visible - resume background music if sound is enabled
      if (soundEnabled && !isBgMusicPlaying) {
        ensureInitialized().then(() => {
          if (!isBgMusicPlaying) {
            startBgMusic()
          }
        })
      }
    }
  }

  document.addEventListener('visibilitychange', visibilityHandler)
}

// Pause background music when tab is hidden (but don't reset position for HTML audio)
function pauseBgMusicForHiddenTab() {
  if (bgMusicElement) {
    bgMusicElement.pause()
    isBgMusicPlaying = false
  } else {
    // For generated music, stop oscillators
    stopBgMusic()
  }
}

// Start background music - tries theme.mp3 first, falls back to generated chiptune
function startBgMusic() {
  if (!soundEnabled || isBgMusicPlaying || !audioContext) return

  // Try to load theme.mp3 from public/audio
  if (!bgMusicElement) {
    bgMusicElement = new Audio('/audio/theme.mp3')
    bgMusicElement.loop = true
    bgMusicElement.volume = DEFAULT_MUSIC_VOLUME

    const handleCanPlay = () => {
      isBgMusicPlaying = true
      bgMusicElement.play().catch(() => {
        // If file doesn't exist or fails, fall back to generated chiptune
        bgMusicElement.removeEventListener('canplaythrough', handleCanPlay)
        bgMusicElement.removeEventListener('error', handleError)
        playGeneratedBgMusic()
      })
    }

    const handleError = () => {
      bgMusicElement.removeEventListener('canplaythrough', handleCanPlay)
      bgMusicElement.removeEventListener('error', handleError)
      playGeneratedBgMusic()
    }

    bgMusicElement.addEventListener('canplaythrough', handleCanPlay, { once: true })
    bgMusicElement.addEventListener('error', handleError, { once: true })
    bgMusicElement.load()
  } else {
    // Already have element, just play
    isBgMusicPlaying = true
    bgMusicElement.currentTime = 0
    bgMusicElement.play().catch(() => {
      playGeneratedBgMusic()
    })
  }
}

// Stop background music completely
function stopBgMusic() {
  isBgMusicPlaying = false

  if (bgMusicElement) {
    bgMusicElement.pause()
    bgMusicElement.currentTime = 0
  }

  bgMusicOscillators.forEach(osc => {
    try {
      osc.stop()
      osc.disconnect()
    } catch (e) {}
  })
  bgMusicOscillators = []
}

// Generated chiptune background music (cheerful, NOT Mario theme)
// Uses C major pentatonic scale for a happy, upbeat feel
function playGeneratedBgMusic() {
  if (!audioContext || !bgMusicGain || isBgMusicPlaying) return

  isBgMusicPlaying = true
  const ctx = audioContext
  const now = ctx.currentTime

  // Original cheerful chiptune melody (NOT Nintendo Mario theme)
  // Notes: C4, D4, E4, G4, A4, C5, D5, E5 (C major pentatonic)
  const melody = [
    // Phrase 1: Bright opening
    { note: 261.63, duration: 0.25, type: 'square' },  // C4
    { note: 329.63, duration: 0.25, type: 'triangle' }, // E4
    { note: 392.00, duration: 0.25, type: 'square' },  // G4
    { note: 523.25, duration: 0.35, type: 'triangle' }, // C5
    { note: 0, duration: 0.15, type: 'square' },        // Rest

    // Phrase 2: Playful response
    { note: 392.00, duration: 0.25, type: 'square' },  // G4
    { note: 523.25, duration: 0.25, type: 'triangle' }, // C5
    { note: 659.25, duration: 0.25, type: 'square' },  // E5
    { note: 783.99, duration: 0.35, type: 'triangle' }, // G5
    { note: 0, duration: 0.2, type: 'square' },         // Rest

    // Phrase 3: Descending resolution
    { note: 659.25, duration: 0.25, type: 'square' },  // E5
    { note: 523.25, duration: 0.25, type: 'triangle' }, // C5
    { note: 392.00, duration: 0.25, type: 'square' },  // G4
    { note: 329.63, duration: 0.35, type: 'triangle' }, // E4
    { note: 261.63, duration: 0.5, type: 'square' },   // C4 (longer)
    { note: 0, duration: 0.4, type: 'square' },         // Rest

    // Phrase 4: Bouncy variation
    { note: 329.63, duration: 0.2, type: 'triangle' },  // E4
    { note: 392.00, duration: 0.2, type: 'square' },   // G4
    { note: 523.25, duration: 0.2, type: 'triangle' }, // C5
    { note: 392.00, duration: 0.2, type: 'square' },   // G4
    { note: 329.63, duration: 0.2, type: 'triangle' }, // E4
    { note: 261.63, duration: 0.4, type: 'square' },   // C4
    { note: 0, duration: 0.3, type: 'square' },        // Rest
  ]

  let time = now

  melody.forEach(({ note, duration, type }) => {
    if (note > 0) {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = type
      osc.frequency.setValueAtTime(note, time)

      // Chiptune envelope - quick attack, exponential decay
      gain.gain.setValueAtTime(0, time)
      gain.gain.linearRampToValueAtTime(0.25, time + 0.01)
      gain.gain.exponentialRampToValueAtTime(0.001, time + duration * 0.85)

      osc.connect(gain)
      gain.connect(bgMusicGain)
      osc.start(time)
      osc.stop(time + duration)
      bgMusicOscillators.push(osc)
    }
    time += duration
  })

  // Schedule next loop
  const loopDuration = melody.reduce((sum, n) => sum + n.duration, 0)
  setTimeout(() => {
    if (isBgMusicPlaying) {
      bgMusicOscillators = []
      playGeneratedBgMusic()
    }
  }, loopDuration * 1000)
}

// Play a sound effect
function playSfx(frequency, type = 'square', duration = 0.1, volume = 1.0) {
  if (!soundEnabled || !audioContext || !sfxGain) return

  try {
    const ctx = audioContext
    const now = ctx.currentTime

    // Resume context if suspended (e.g., after mute toggle)
    if (ctx.state === 'suspended') {
      ctx.resume()
    }

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = type
    osc.frequency.setValueAtTime(frequency, now)

    // SFX envelope
    gain.gain.setValueAtTime(0, now)
    gain.gain.linearRampToValueAtTime(volume * 0.3, now + 0.005)
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration)

    osc.connect(gain)
    gain.connect(sfxGain)
    osc.start(now)
    osc.stop(now + duration)
  } catch (e) {
    // Silently fail if audio context issues
  }
}

// Predefined sound effects
function playCoin() {
  playSfx(659.25, 'triangle', 0.1, 0.5)
  setTimeout(() => playSfx(880, 'triangle', 0.1, 0.5), 80)
}

function playJump() {
  playSfx(440, 'square', 0.1, 0.4)
}

function playWrongGuess() {
  playSfx(220, 'sawtooth', 0.2, 0.4)
  setTimeout(() => playSfx(180, 'sawtooth', 0.15, 0.3), 100)
}

function playCorrectGuess() {
  playSfx(523.25, 'square', 0.1)
  setTimeout(() => playSfx(659.25, 'square', 0.1), 100)
  setTimeout(() => playSfx(783.99, 'square', 0.1), 200)
  setTimeout(() => playSfx(1046.50, 'square', 0.3), 300)
}

function playClick() {
  playSfx(523.25, 'triangle', 0.08, 0.3)
}

function playBlockHit() {
  playSfx(440, 'square', 0.05, 0.4)
  setTimeout(() => playSfx(880, 'square', 0.05, 0.3), 30)
}

function playPowerup() {
  playSfx(523.25, 'triangle', 0.1)
  setTimeout(() => playSfx(659.25, 'triangle', 0.1), 80)
  setTimeout(() => playSfx(783.99, 'triangle', 0.15), 160)
}

function playError() {
  playSfx(220, 'sawtooth', 0.2, 0.4)
}

function playSuccess() {
  playSfx(523.25, 'square', 0.1)
  setTimeout(() => playSfx(659.25, 'square', 0.1), 100)
  setTimeout(() => playSfx(783.99, 'square', 0.1), 200)
  setTimeout(() => playSfx(1046.50, 'square', 0.3), 300)
}

// Toggle mute - sets master gain to 0 or 1, resumes context if needed
function toggleMute() {
  // If not initialized yet, initialize first (first user gesture)
  // On first interaction, apply current soundEnabled state (don't toggle yet)
  // so that tapping the sound button starts music if sound is enabled
  if (!initialized) {
    ensureInitialized().then(() => {
      // Apply current soundEnabled state (default: true) without toggling
      if (masterGain && audioContext) {
        masterGain.gain.setValueAtTime(soundEnabled ? 1 : 0, audioContext.currentTime)
      }

      // Start music if sound is enabled
      if (soundEnabled && !isBgMusicPlaying) {
        startBgMusic()
      }
    })
    return
  }

  // Normal toggle behavior after initialization
  soundEnabled = !soundEnabled

  // Apply mute/gain
  if (masterGain && audioContext) {
    masterGain.gain.setValueAtTime(soundEnabled ? 1 : 0, audioContext.currentTime)
  }

  // When unmuting, resume audio context if suspended
  if (soundEnabled && audioContext && audioContext.state === 'suspended') {
    audioContext.resume()
  }

  // If enabling and music not started, start it
  if (soundEnabled && !isBgMusicPlaying) {
    startBgMusic()
  } else if (!soundEnabled && isBgMusicPlaying) {
    stopBgMusic()
  }
}

function isMuted() {
  return !soundEnabled
}

// Set sound enabled state (used by game store)
function setSoundEnabled(enabled) {
  soundEnabled = enabled

  // If not initialized yet, the initial state will be applied in ensureInitialized()
  // when the user first interacts
  if (!initialized) {
    return
  }

  // Apply mute/gain
  if (masterGain && audioContext) {
    masterGain.gain.setValueAtTime(enabled ? 1 : 0, audioContext.currentTime)
  }

  if (enabled && !isBgMusicPlaying) {
    startBgMusic()
  } else if (!enabled && isBgMusicPlaying) {
    stopBgMusic()
  }
}

// Attach interaction listeners for auto-initialization on first click/keypress/touch
// This runs ONCE on the window with { once: true }
function attachInteractionListeners() {
  if (userGestureHandler || typeof window === 'undefined') return

  userGestureHandler = async () => {
    await ensureInitialized()

    // Start background music if sound is enabled
    if (soundEnabled && !isBgMusicPlaying) {
      startBgMusic()
    }

    // Remove listeners after first interaction
    document.removeEventListener('click', userGestureHandler, { once: true })
    document.removeEventListener('keydown', userGestureHandler, { once: true })
    document.removeEventListener('touchstart', userGestureHandler, { once: true })
    userGestureHandler = null
  }

  // Add listeners for user interaction (once: true means they auto-remove)
  document.addEventListener('click', userGestureHandler, { once: true, passive: true })
  document.addEventListener('keydown', userGestureHandler, { once: true, passive: true })
  document.addEventListener('touchstart', userGestureHandler, { once: true, passive: true })
}

// Clean up interaction listeners (for testing/cleanup)
function detachInteractionListeners() {
  if (userGestureHandler) {
    document.removeEventListener('click', userGestureHandler)
    document.removeEventListener('keydown', userGestureHandler)
    document.removeEventListener('touchstart', userGestureHandler)
    userGestureHandler = null
  }
  if (visibilityHandler) {
    document.removeEventListener('visibilitychange', visibilityHandler)
    visibilityHandler = null
  }
}

// DO NOT call this in React effect cleanup!
// The audio manager is a module-level singleton and should persist across component mounts
function destroy() {
  stopBgMusic()
  detachInteractionListeners()
  if (audioContext) {
    audioContext.close()
    audioContext = null
    bgMusicGain = null
    sfxGain = null
    masterGain = null
    initialized = false
    initPromise = null
  }
}

export const audio = {
  init: ensureInitialized,
  startBgMusic,
  stopBgMusic,
  toggleMute,
  isMuted,
  setSoundEnabled,
  attachInteractionListeners,
  detachInteractionListeners,
  destroy,
  // Sound effects
  playCoin,
  playJump,
  playWrongGuess,
  playCorrectGuess,
  playClick,
  playBlockHit,
  playPowerup,
  playError,
  playSuccess,
  // Getters
  get soundEnabled() { return soundEnabled },
  get isBgMusicPlaying() { return isBgMusicPlaying },
  get audioContext() { return audioContext },
}

export default audio