'use client'

import React, { useEffect } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
} from 'framer-motion'

import { NimoriMascot } from '@/components/mascot/NimoriMascot'

import { useNimoriStore } from '@/store/nimoriStore'

import { MODULE_CONFIGS } from '@/lib/utils'

import type { Module } from '@/store/nimoriStore'

import type { EmotionType } from '@/types/emotion'

/* NUEVOS COMPONENTES ATMOSFÉRICOS */
import { AtmosphericLayers } from '@/components/sanctuary/AtmosphericLayers'
import { SanctuaryMascotPod } from '@/components/sanctuary/SanctuaryMascotPod'

const EMOTION_OPTIONS: {
  label: string
  value: EmotionType
  color: string
}[] = [
  { label: 'Calma', value: 'calma', color: '#4fc3f7' },
  { label: 'Alegría', value: 'alegria', color: '#ffd54f' },
  { label: 'Nostalgia', value: 'nostalgia', color: '#6b35c8' },
  { label: 'Protección', value: 'proteccion', color: '#26c6da' },
  { label: 'Contemplación', value: 'contemplacion', color: '#c4a0f5' },
]

const QUICK_MODULES: Module[] = [
  'escribe',
  'escucha',
  'respira',
  'dibuja',
  'recuerda',
]

export function SanctuaryModule() {
  const {
    setActiveModule,
    emotion,
    setEmotion,
    setNimoriMood,
    triggerNimoriAnimation,
  } = useNimoriStore()

  /* =========================================
     PARALLAX CINEMATOGRÁFICO
  ========================================= */

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = {
    damping: 60,
    stiffness: 90,
    mass: 1.2,
  }

  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX - window.innerWidth / 2
      const y = e.clientY - window.innerHeight / 2

      mouseX.set(x)
      mouseY.set(y)
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener(
        'mousemove',
        handleMouseMove
      )
    }
  }, [mouseX, mouseY])

  /* =========================================
     EMOTION HANDLER
  ========================================= */

  const handleEmotionSelect = (e: EmotionType) => {
    setEmotion(e)
    setNimoriMood(e)
    triggerNimoriAnimation()
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[100dvh] overflow-hidden px-4 md:px-8 gap-6 md:gap-8">

      {/* =========================================
          FONDO ATMOSFÉRICO VIVO
      ========================================= */}

      <AtmosphericLayers
        emotion={emotion}
        springX={springX}
        springY={springY}
      />

      {/* =========================================
          CONTENIDO PRINCIPAL
      ========================================= */}

      <div className="relative z-10 flex flex-col items-center justify-center w-full gap-8">

        {/* Greeting */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            ease: [0.23, 1, 0.32, 1],
          }}
        >
          <p className="font-mono text-xs tracking-[0.4em] text-nimori-lavender/40 mb-3 uppercase">
            Bienvenido a tu santuario
          </p>

          <h1 className="font-display text-6xl font-light text-glow text-nimori-lilac leading-tight">
            NIMORI
          </h1>

          <p className="mt-3 text-nimori-lavender/60 font-body text-sm">
            ¿Cómo te sientes hoy?
          </p>
        </motion.div>

        {/* =========================================
            MASCOTA CINEMATOGRÁFICA
        ========================================= */}

        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.2,
            ease: [0.23, 1, 0.32, 1],
            delay: 0.2,
          }}
        >
          <SanctuaryMascotPod
            emotion={emotion}
            springX={springX}
            springY={springY}
          >
           <NimoriMascot
  size={
    typeof window !== 'undefined' &&
    window.innerWidth < 768
      ? 160
      : 220
  }
  showAura
/>
          </SanctuaryMascotPod>
        </motion.div>

        {/* =========================================
            SELECTOR EMOCIONAL
        ========================================= */}

        <motion.div
          className="flex flex-wrap gap-2 justify-center max-w-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.5,
            duration: 0.8,
          }}
        >
          {EMOTION_OPTIONS.map((opt, i) => (
            <motion.button
              key={opt.value}
              onClick={() =>
                handleEmotionSelect(opt.value)
              }
              className="px-4 py-1.5 rounded-full text-xs font-body tracking-wide transition-all backdrop-blur-md"
              style={{
                background:
                  emotion === opt.value
                    ? `${opt.color}25`
                    : 'rgba(30,15,69,0.35)',

                border: `1px solid ${
                  emotion === opt.value
                    ? opt.color
                    : 'rgba(155,110,232,0.15)'
                }`,

                color:
                  emotion === opt.value
                    ? opt.color
                    : 'rgba(196,160,245,0.6)',

                boxShadow:
                  emotion === opt.value
                    ? `0 0 20px ${opt.color}40`
                    : 'none',
              }}
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.95,
              }}
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.6 + i * 0.07,
              }}
            >
              {opt.label}
            </motion.button>
          ))}
        </motion.div>

        {/* =========================================
            QUICK MODULES
        ========================================= */}

        <motion.div
          className="flex gap-3 flex-wrap justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.8,
            duration: 0.8,
          }}
        >
          {QUICK_MODULES.map((mod, i) => {
            const cfg = MODULE_CONFIGS[mod]

            return (
              <motion.button
                key={mod}
                onClick={() =>
                  setActiveModule(mod)
                }
                className="glass flex flex-col items-center gap-2 p-4 rounded-2xl w-20 backdrop-blur-md"

                style={{
                  borderColor: `${cfg.color}20`,
                }}

                whileHover={{
                  scale: 1.08,
                  boxShadow: `0 0 25px ${cfg.glow}`,
                  borderColor: `${cfg.color}50`,
                }}

                whileTap={{
                  scale: 0.95,
                }}

                initial={{
                  opacity: 0,
                  y: 20,
                }}

                animate={{
                  opacity: 1,
                  y: 0,
                }}

                transition={{
                  delay: 0.9 + i * 0.08,
                }}
              >
                <span
                  className="text-xl"
                  style={{
                    color: cfg.color,
                  }}
                >
                  {cfg.icon}
                </span>

                <span className="text-[10px] font-body text-nimori-lavender/50 tracking-wide">
                  {cfg.label}
                </span>
              </motion.button>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}