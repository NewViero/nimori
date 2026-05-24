'use client'
import { useEffect, useRef } from 'react'
import { randomBetween } from '@/lib/utils'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  alpha: number
  life: number
  maxLife: number
}

const COLORS = ['#c4a0f5', '#ff6eb4', '#4fc3f7', '#ffd54f', '#9b6ee8', '#ff9ed8']

export function useParticleCanvas(enabled: boolean) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !enabled) return
    const ctx = canvas.getContext('2d')!

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const particles: Particle[] = []

    const spawn = () => {
      if (particles.length < 80) {
        const maxLife = randomBetween(120, 300)
        particles.push({
          x: randomBetween(0, canvas.width),
          y: randomBetween(canvas.height * 0.3, canvas.height),
          vx: randomBetween(-0.3, 0.3),
          vy: randomBetween(-0.8, -0.2),
          size: randomBetween(1, 3.5),
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          alpha: 0,
          life: 0,
          maxLife,
        })
      }
    }

    let frame = 0
    let raf: number

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      frame++
      if (frame % 4 === 0) spawn()

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.life++
        p.x += p.vx
        p.y += p.vy

        const t = p.life / p.maxLife
        p.alpha = t < 0.1 ? t * 10 : t > 0.8 ? (1 - t) * 5 : 1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.alpha * 0.6
        ctx.shadowBlur = 12
        ctx.shadowColor = p.color
        ctx.fill()
        ctx.globalAlpha = 1
        ctx.shadowBlur = 0

        if (p.life >= p.maxLife) particles.splice(i, 1)
      }

      raf = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(raf)
    }
  }, [enabled])

  return canvasRef
}
