'use client'
import { useParticleCanvas } from '@/hooks/useParticles'
import { useNimoriStore } from '@/store/nimoriStore'

export function ParticleBackground() {
  const { particlesEnabled } = useNimoriStore()
  const canvasRef = useParticleCanvas(particlesEnabled)

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}
