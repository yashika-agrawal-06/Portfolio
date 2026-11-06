// Confetti Utility
// Creates pixel-art confetti using canvas + requestAnimationFrame (no React state in render loop)
// Respects prefers-reduced-motion

// Check for reduced motion preference
function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Generate confetti pieces
export function createConfettiPieces(count = 40) {
  const pieces = []
  const colors = ['#FFD447', '#69B9F7', '#55B84A', '#FFFFFF', '#FF6B6B', '#FFB347', '#87CEEB']
  const shapes = ['square', 'circle']

  for (let i = 0; i < count; i++) {
    pieces.push({
      id: `${Date.now()}-${i}-${Math.random().toString(36).substr(2, 9)}`,
      x: Math.random() * 100,
      y: -10 - Math.random() * 20,
      size: 6 + Math.random() * 10,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      fallSpeed: 0.5 + Math.random() * 1.5,
      sway: (Math.random() - 0.5) * 1.2,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 6,
    })
  }
  return pieces
}

// Generate burst particles (for celebration)
export function createParticles(count = 30, centerX = 50, centerY = 50) {
  const particles = []
  const colors = ['#FFD447', '#69B9F7', '#55B84A', '#FFFFFF', '#FF6B6B', '#FFB347']

  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5
    const speed = 0.5 + Math.random() * 2
    particles.push({
      id: `particle-${Date.now()}-${i}`,
      x: centerX,
      y: centerY,
      size: 4 + Math.random() * 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      angle,
      speed,
      life: 1,
    })
  }
  return particles
}

// Canvas-based confetti animation (no React state in animation loop)
// Returns a cleanup function to stop animation and remove canvas
export function animateConfettiCanvas(onComplete) {
  if (prefersReducedMotion()) {
    if (onComplete) onComplete()
    return () => {}
  }

  const canvas = document.createElement('canvas')
  canvas.style.position = 'fixed'
  canvas.style.top = '0'
  canvas.style.left = '0'
  canvas.style.width = '100vw'
  canvas.style.height = '100vh'
  canvas.style.pointerEvents = 'none'
  canvas.style.zIndex = '9999'
  canvas.style.display = 'block'
  document.body.appendChild(canvas)

  const ctx = canvas.getContext('2d')
  let animationId = null
  let startTime = null
  const duration = 3000 // 3 seconds

  // Set canvas resolution
  function resizeCanvas() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }
  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)

  // Initial pieces and particles
  let confettiPieces = createConfettiPieces(60)
  let particles = createParticles(40, 50, 50)

  function drawPiece(piece) {
    ctx.save()
    ctx.translate((piece.x / 100) * canvas.width, (piece.y / 100) * canvas.height)
    ctx.rotate((piece.rotation * Math.PI) / 180)
    ctx.fillStyle = piece.color
    if (piece.shape === 'circle') {
      ctx.beginPath()
      ctx.arc(0, 0, piece.size / 2, 0, Math.PI * 2)
      ctx.fill()
    } else {
      ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size)
    }
    ctx.restore()
  }

  function drawParticle(particle) {
    ctx.save()
    ctx.globalAlpha = particle.life
    ctx.translate((particle.x / 100) * canvas.width, (particle.y / 100) * canvas.height)
    ctx.fillStyle = particle.color
    ctx.beginPath()
    ctx.arc(0, 0, (particle.size / 2) * particle.life, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }

  function animate(timestamp) {
    if (!startTime) startTime = timestamp
    const elapsed = timestamp - startTime

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Animate confetti pieces (falling down)
    confettiPieces = confettiPieces
      .map(p => ({
        ...p,
        y: p.y + p.fallSpeed,
        x: p.x + p.sway + Math.sin(timestamp * 0.001 + p.id.charCodeAt(0)) * 0.5,
        rotation: p.rotation + p.rotationSpeed,
      }))
      .filter(p => p.y < 110)

    // Animate particles (bursting out)
    particles = particles
      .map(p => ({
        ...p,
        x: p.x + Math.cos(p.angle) * p.speed,
        y: p.y + Math.sin(p.angle) * p.speed,
        life: p.life - 0.02,
        size: p.size * 0.98,
      }))
      .filter(p => p.life > 0)

    // Draw all pieces
    confettiPieces.forEach(drawPiece)
    particles.forEach(drawParticle)

    // Continue if time not up and there are still particles
    if (elapsed < duration && (confettiPieces.length > 0 || particles.length > 0)) {
      animationId = requestAnimationFrame(animate)
    } else {
      // Animation complete
      cleanup()
      if (onComplete) onComplete()
    }
  }

  function cleanup() {
    if (animationId) {
      cancelAnimationFrame(animationId)
      animationId = null
    }
    window.removeEventListener('resize', resizeCanvas)
    if (canvas.parentNode) {
      canvas.parentNode.removeChild(canvas)
    }
  }

  animationId = requestAnimationFrame(animate)

  // Return cleanup function
  return cleanup
}

// Spawn confetti with optional callback
export function spawnConfetti(onComplete) {
  return animateConfettiCanvas(onComplete)
}

// Spawn particles burst with optional callback
export function spawnParticles(centerX, centerY, onComplete) {
  if (prefersReducedMotion()) {
    if (onComplete) onComplete()
    return () => {}
  }

  const canvas = document.createElement('canvas')
  canvas.style.position = 'fixed'
  canvas.style.top = '0'
  canvas.style.left = '0'
  canvas.style.width = '100vw'
  canvas.style.height = '100vh'
  canvas.style.pointerEvents = 'none'
  canvas.style.zIndex = '9999'
  canvas.style.display = 'block'
  document.body.appendChild(canvas)

  const ctx = canvas.getContext('2d')
  let animationId = null
  let startTime = null
  const duration = 2000 // 2 seconds for burst

  function resizeCanvas() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }
  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)

  let particles = createParticles(50, centerX, centerY)

  function drawParticle(particle) {
    ctx.save()
    ctx.globalAlpha = particle.life
    ctx.translate((particle.x / 100) * canvas.width, (particle.y / 100) * canvas.height)
    ctx.fillStyle = particle.color
    ctx.beginPath()
    ctx.arc(0, 0, (particle.size / 2) * particle.life, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }

  function animate(timestamp) {
    if (!startTime) startTime = timestamp
    const elapsed = timestamp - startTime

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    particles = particles
      .map(p => ({
        ...p,
        x: p.x + Math.cos(p.angle) * p.speed,
        y: p.y + Math.sin(p.angle) * p.speed,
        life: p.life - 0.025,
        size: p.size * 0.97,
      }))
      .filter(p => p.life > 0)

    particles.forEach(drawParticle)

    if (elapsed < duration && particles.length > 0) {
      animationId = requestAnimationFrame(animate)
    } else {
      cleanup()
      if (onComplete) onComplete()
    }
  }

  function cleanup() {
    if (animationId) {
      cancelAnimationFrame(animationId)
      animationId = null
    }
    window.removeEventListener('resize', resizeCanvas)
    if (canvas.parentNode) {
      canvas.parentNode.removeChild(canvas)
    }
  }

  animationId = requestAnimationFrame(animate)
  return cleanup
}

// CSS Keyframes for confetti (fallback / reference)
export const confettiKeyframes = `
@keyframes confetti-fall {
  0% {
    transform: translateY(-100vh) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(720deg);
    opacity: 0;
  }
}

@keyframes confetti-burst {
  0% {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: scale(0) rotate(360deg);
    opacity: 0;
  }
}

.confetti-piece {
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  will-change: transform, opacity;
  animation: confetti-fall 3s ease-in forwards;
}

.confetti-piece.circle {
  border-radius: 50%;
}

@media (prefers-reduced-motion: reduce) {
  .confetti-piece {
    animation: none;
    display: none;
  }
}
`

export default {
  createConfettiPieces,
  createParticles,
  animateConfettiCanvas,
  spawnConfetti,
  spawnParticles,
  confettiKeyframes,
  prefersReducedMotion,
}