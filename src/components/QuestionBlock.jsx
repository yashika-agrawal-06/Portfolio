import React from 'react'
import { useAudio } from '../hooks/useAudio'

const QuestionBlock = ({
  techName,
  isRevealed = false,
  isCorrect = false,
  onClick,
  disabled = false,
  'aria-label': ariaLabel
}) => {
  const { playClick } = useAudio()

  const handleClick = () => {
    if (!disabled && onClick) {
      playClick()
      onClick()
    }
  }

  if (isRevealed) {
    return (
      <div
        className="q-block revealed-hit rounded-xl flex items-center justify-center shadow-xl"
        style={{ width: '86px', height: '86px' }}
        role="button"
        aria-label={ariaLabel || `${techName} - Revealed`}
        aria-disabled={true}
      >
        <div className="flex flex-col items-center">
          {techName === 'AWS' && (
            <svg className="pixelated drop-shadow-sm" fill="none" height="28" viewBox="0 0 44 28" width="44" aria-hidden="true">
              <rect fill="#FF9900" height="6" width="18" x="12" y="0" />
              <rect fill="#FF9900" height="6" width="30" x="6" y="6" />
              <rect fill="#FF9900" height="10" width="42" x="0" y="12" />
              <rect fill="#FF9900" height="6" width="34" x="4" y="22" />
              <rect fill="#FFFFFF" height="2" width="18" x="12" y="18" />
              <rect fill="#FFFFFF" height="4" width="4" x="28" y="16" />
            </svg>
          )}
          {techName === 'Python' && (
            <svg className="pixelated drop-shadow-sm" fill="none" height="28" viewBox="0 0 44 28" width="44" aria-hidden="true">
              <rect fill="#3776AB" height="28" width="44" x="0" y="0" />
              <rect fill="#FFD43B" height="12" width="20" x="12" y="8" />
              <rect fill="#FFD43B" height="4" width="28" x="8" y="20" />
            </svg>
          )}
          {techName === 'Docker' && (
            <svg className="pixelated drop-shadow-sm" fill="none" height="28" viewBox="0 0 44 28" width="44" aria-hidden="true">
              <rect fill="#2496ED" height="28" width="44" x="0" y="0" />
              <rect fill="#FFFFFF" height="16" width="24" x="10" y="6" />
              <rect fill="#2496ED" height="4" width="16" x="14" y="10" />
              <rect fill="#FFFFFF" height="2" width="30" x="7" y="18" />
            </svg>
          )}
          {techName === 'React' && (
            <svg className="pixelated drop-shadow-sm" fill="none" height="28" viewBox="0 0 44 28" width="44" aria-hidden="true">
              <rect fill="#61DAFB" height="28" width="44" x="0" y="0" />
              <rect fill="#282C34" height="16" width="16" x="14" y="6" />
              <circle fill="#61DAFB" cx="22" cy="14" r="4" />
            </svg>
          )}
          {techName === 'Terraform' && (
            <svg className="pixelated drop-shadow-sm" fill="none" height="28" viewBox="0 0 44 28" width="44" aria-hidden="true">
              <rect fill="#7B42BC" height="28" width="44" x="0" y="0" />
              <rect fill="#FFFFFF" height="18" width="28" x="8" y="5" />
              <rect fill="#7B42BC" height="6" width="20" x="12" y="8" />
            </svg>
          )}
          {techName === 'Generative AI' && (
            <svg className="pixelated drop-shadow-sm" fill="none" height="28" viewBox="0 0 44 28" width="44" aria-hidden="true">
              <rect fill="#8B5CF6" height="28" width="44" x="0" y="0" />
              <rect fill="#FFFFFF" height="20" width="20" x="12" y="4" />
              <circle fill="#8B5CF6" cx="22" cy="14" r="3" />
            </svg>
          )}
          <span className="font-pixel text-[10px] text-[var(--border-dark)] tracking-tighter mt-1 font-bold">{techName}</span>
        </div>
      </div>
    )
  }

  return (
    <div
      className="q-block rounded-xl flex items-center justify-center shadow-lg transition-transform hover:-translate-y-1"
      style={{ width: '86px', height: '86px' }}
      onClick={handleClick}
      role="button"
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick() }}}
      aria-label={ariaLabel || `Mystery block - ${techName}`}
      aria-disabled={disabled}
    >
      <div className="bolt tl rounded-sm" aria-hidden="true" />
      <div className="bolt tr rounded-sm" aria-hidden="true" />
      <div className="bolt bl rounded-sm" aria-hidden="true" />
      <div className="bolt br rounded-sm" aria-hidden="true" />
      <span className="font-pixel text-4xl text-[#5B2700] font-extrabold question-glow select-none pointer-events-none">?</span>
    </div>
  )
}

export default QuestionBlock