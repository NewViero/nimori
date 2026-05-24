'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNimoriStore } from '@/store/nimoriStore'

const EXPERIENCES = [
  { id: 'pulsar',  label: 'Pulsar Cósmico',   desc: 'Ritmo suave del universo',          color: '#9b6ee8' },
  { id: 'aurora',  label: 'Aurora Boreal',     desc: 'Ondas de color que calman',         color: '#4fc3f7' },
  { id: 'lluvia',  label: 'Lluvia de Luz',     desc: 'Partículas que caen suavemente',    color: '#c4a0f5' },
  { id: 'loto',    label: 'Flor de Loto',      desc: 'Apertura y expansión',              color: '#ff6eb4' },
  { id: 'nebula',  label: 'Nebulosa',          desc: 'Inmersión en el cosmos',            color: '#ff9ed8' },
  { id: 'ondas',   label: 'Ondas Concéntricas',desc: 'Calma que se expande desde ti',     color: '#26c6da' },
]

function PulsarEffect({ color }: { color: string }) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: 300, height: 300 }}>
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{ border: `1px solid ${color}`, width: 40 + i * 40, height: 40 + i * 40 }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.15, 0.6] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.35, ease: 'easeInOut' }}
        />
      ))}
      <motion.div
        className="rounded-full"
        style={{ width: 50, height: 50, background: color, boxShadow: `0 0 40px ${color}` }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

function AuroraEffect({ color }: { color: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl" style={{ width: 320, height: 200 }}>
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          style={{
            background: `linear-gradient(${180 + i * 20}deg, transparent 0%, ${color}${['15','20','18','12','10'][i]} 50%, transparent 100%)`,
            filter: 'blur(20px)',
          }}
          animate={{
            opacity: [0.3, 0.8, 0.3],
            scaleX: [1, 1.1, 0.95, 1],
            y: [0, -10 - i * 5, 0],
          }}
          transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
        />
      ))}
    </div>
  )
}

function OndasEffect({ color }: { color: string }) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: 300, height: 300 }}>
      {[...Array(7)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{ background: `${color}08`, border: `1px solid ${color}30` }}
          initial={{ width: 20, height: 20, opacity: 0.9 }}
          animate={{ width: 280, height: 280, opacity: 0 }}
          transition={{ duration: 4, repeat: Infinity, delay: i * 0.57, ease: 'easeOut' }}
        />
      ))}
      <div
        className="rounded-full"
        style={{ width: 24, height: 24, background: color, boxShadow: `0 0 20px ${color}` }}
      />
    </div>
  )
}

const EFFECT_COMPONENTS: Record<string, React.FC<{ color: string }>> = {
  pulsar: PulsarEffect,
  aurora: AuroraEffect,
  ondas: OndasEffect,
  lluvia: PulsarEffect,   // reuse with different color
  loto: OndasEffect,
  nebula: AuroraEffect,
}

export function SienteModule() {
  const { getEmotionColor } = useNimoriStore()
  const [active, setActive] = useState(EXPERIENCES[0])
  const EffectComponent = EFFECT_COMPONENTS[active.id]

  return (
    <div className="min-h-screen flex flex-col items-center px-8 py-12 max-w-2xl mx-auto gap-8">

      {/* Header */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="font-mono text-xs tracking-[0.4em] text-nimori-lavender/40 uppercase mb-2">
          Módulo · Siente
        </p>
        <h2 className="font-display text-4xl font-light text-glow" style={{ color: active.color }}>
          Experiencias Sensoriales
        </h2>
        <p className="mt-2 text-nimori-lavender/50 text-sm font-body">
          Permítete sentir sin analizar.
        </p>
      </motion.div>

      {/* Effect display */}
      <motion.div
        className="glass rounded-3xl flex items-center justify-center overflow-hidden"
        style={{
          width: '100%',
          maxWidth: 380,
          aspectRatio: '1',
          borderColor: `${active.color}20`,
          boxShadow: `0 0 60px ${active.color}15`,
        }}
        layout
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center w-full h-full"
          >
            <EffectComponent color={active.color} />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Experience selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full">
        {EXPERIENCES.map((exp, i) => (
          <motion.button
            key={exp.id}
            onClick={() => setActive(exp)}
            className="flex flex-col gap-1 p-3 rounded-xl text-left transition-all"
            style={{
              background: active.id === exp.id ? `${exp.color}15` : 'rgba(30,15,69,0.4)',
              border: `1px solid ${active.id === exp.id ? exp.color : 'rgba(155,110,232,0.12)'}`,
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.06 }}
          >
            <span className="text-sm font-body font-medium"
              style={{ color: active.id === exp.id ? exp.color : 'rgba(196,160,245,0.8)' }}>
              {exp.label}
            </span>
            <span className="text-[10px] text-nimori-lavender/30 font-body leading-tight">{exp.desc}</span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
