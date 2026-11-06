import React from 'react'

const PixelPanel = ({
  children,
  variant = 'default',
  className = '',
  ...props
}) => {
  const variantClasses = {
    default: 'pixel-box',
    sm: 'pixel-box-sm',
    lg: 'pixel-box-lg',
    retro: 'retro-box',
    'retro-sm': 'retro-box-sm'
  }

  return (
    <div
      className={`${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export default PixelPanel