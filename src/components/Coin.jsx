import React from 'react'

const Coin = ({
  count = 0,
  className = '',
  animate = false,
  onAnimationEnd
}) => {
  return (
    <div className={`flex items-center gap-2 ${className}`} role="status" aria-live="polite">
      <div className={`w-6 h-6 bg-[var(--gold)] rounded-full border-2 border-black flex items-center justify-center text-xs font-pixel text-[#8C5908] font-bold ${animate ? 'coin-spin' : ''}`}
           onAnimationEnd={onAnimationEnd}
           aria-hidden="true">
        ★
      </div>
      <span className="font-pixel text-xs font-bold text-[var(--text)]">
        ×{count}
      </span>
    </div>
  )
}

export default Coin