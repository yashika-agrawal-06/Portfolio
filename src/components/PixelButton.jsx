import React from 'react'

const PixelButton = ({
  children,
  variant = 'green',
  size = 'md',
  onClick,
  disabled = false,
  className = '',
  'aria-label': ariaLabel,
  ...props
}) => {
  const variantClasses = {
    green: 'btn-green',
    gold: 'btn-gold',
    red: 'btn-red',
    cream: 'btn-cream'
  }

  const sizeClasses = {
    sm: 'btn-pixel-sm',
    md: 'btn-pixel-md',
    lg: 'btn-pixel-lg'
  }

  return (
    <button
      className={`btn-pixel ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

export default PixelButton