'use client'
import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Navigation } from './Navigation'
import { ParticleBackground } from '@/components/ui/ParticleBackground'
import { useCursor } from '@/hooks/useCursor'
import { useNimoriStore } from '@/store/nimoriStore'
import { detectTimeOfDay } from '@/lib/utils'

interface Props {
  children: React.ReactNode
}

export function AppLayout({ children }: Props) {
  const { cursorRef, trailRef } = useCursor()
  const { setTimeOfDay, getEmotionGlow } = useNimoriStore()

  useEffect(() => {
    setTimeOfDay(detectTimeOfDay())
  }, [setTimeOfDay])

  const glow = getEmotionGlow()

  return (
    <div className="relative min-h-screen bg-nimori-void overflow-hidden">
      {/* Cursor */}
      <div ref={cursorRef} className="cursor" />
      <div ref={trailRef} className="cursor-trail" />

      {/* Particle canvas */}
      <ParticleBackground />

      {/* Deep background gradient */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: `
            radial-gradient(ellipse 60% 60% at 25% 40%, rgba(61,26,120,0.35) 0%, transparent 70%),
            radial-gradient(ellipse 50% 50% at 75% 65%, ${glow} 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 50% 10%, rgba(79,195,247,0.08) 0%, transparent 60%)
          `,
          transition: 'background 2s ease',
        }}
      />

      {/* Noise overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Navigation */}
      <Navigation />

      {/* Main content */}
      <main className="relative z-10 pl-16">
        <AnimatePresence mode="wait">
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}
