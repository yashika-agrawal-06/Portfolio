import React, { useEffect } from 'react'

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  className = '',
  size = 'md',
  showCloseButton = true
}) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-xl',
    xl: 'max-w-2xl',
    full: 'max-w-[90vw]'
  }

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose}
    >
      <div
        className={`modal-content ${sizeClasses[size]} ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {showCloseButton && (
          <button
            className="absolute top-3 right-3 font-pixel text-sm bg-[var(--red)] text-white w-8 h-8 rounded border-2 border-black flex items-center justify-center hover:scale-105 transition-transform"
            onClick={onClose}
            aria-label="Close modal"
          >
            ✕
          </button>
        )}
        {title && (
          <h2 id="modal-title" className="font-pixel text-lg text-[var(--text)] mb-4 px-4">
            {title}
          </h2>
        )}
        <div className="px-4 pb-4">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal