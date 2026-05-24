'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNimoriStore } from '@/store/nimoriStore'

type Phase = 'idle' | 'inhale' | 'hold' | 'exhale' | 'rest'

const TECHNIQUES = [
  { id: '4-7-8',   label: '4-7-8',     desc: 'Calma profunda',    inhale: 4, hold: 7, exhale: 8, rest: 0, color: '#4fc3f7' },
  { id: 'box',     label: 'Caja',       desc: 'Claridad mental',   inhale: 4, hold: 4, exhale: 4, rest: 4, color: '#9b6ee8' },
  { id: 'calm',    label: 'Calmante',   desc: 'Alivio de ansiedad',inhale: 4, hold: 1, exhale: 6, rest: 0, color: '#ff6eb4' },
  { id: 'simple',  label: 'Simple',     desc: 'Presencia plena',   inhale: 4, hold: 0, exhale: 4, rest: 0, color: '#ffd54f' },
]

const PHASE_LABELS: Record<Phase, string> = {
  idle: 'Toca para comenzar',
  inhale: 'Inhala...',
  hold: 'Sostén...',
  exhale: 'Exhala...',
  rest: 'Descansa...',
}

export function RespiraModule() {
  const { getEmotionColor } = useNimoriStore()
  const [technique, setTechnique] = useState(TECHNIQUES[0])
  const [phase, setPhase] = useState<Phase>('idle')
  const [progress, setProgress] = useState(0)
  const [cycles, setCycles] = useState(0)
  const [running, setRunning] = useState(false)
  const timerRef = useRef<NodeJS.Timeout>()
  const color = technique.color

  const stop = () => {
    setRunning(false)
    setPhase('idle')
    setProgress(0)
    clearTimeout(timerRef.current)
  }

  const start = () => {
    if (running) { stop(); return }
    setRunning(true)
    runPhase('inhale', 0)
  }

  const runPhase = (p: Phase, cycleCount: number) => {
    if (p === 'idle') return
    const t = technique
    const duration = {
      inhale: t.inhale,
      hold: t.hold,
      exhale: t.exhale,
      rest: t.rest,
      idle: 0,
    }[p]

    setPhase(p)
    setProgress(0)

    if (duration === 0) {
      // skip phase
      const next = nextPhase(p)
      if (next === 'inhale') setCycles((c) => c + 1)
      runPhase(next, cycleCount)
      return
    }

    const interval = 50
    let elapsed = 0
    const tick = () => {
      elapsed += interval
      setProgress(elapsed / (duration * 1000))
      if (elapsed < duration * 1000) {
        timerRef.current = setTimeout(tick, interval)
      } else {
        const next = nextPhase(p)
        if (next === 'inhale') setCycles((c) => c + 1)
        runPhase(next, cycleCount)
      }
    }
    timerRef.current = setTimeout(tick, interval)
  }

  const nextPhase = (p: Phase): Phase => {
    if (p === 'inhale') return 'hold'
    if (p === 'hold') return 'exhale'
    if (p === 'exhale') return 'rest'
    return 'inhale'
  }

  useEffect(() => () => clearTimeout(timerRef.current), [])

  const ringScale = {
    idle:   1,
    inhale: 1.35,
    hold:   1.35,
    exhale: 1,
    rest:   0.95,
  }[phase]

  return (
    <div className="min-h-screen flex flex-col items-center px-8 py-12 max-w-2xl mx-auto gap-8">

      {/* Header */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="font-mono text-xs tracking-[0.4em] text-nimori-lavender/40 uppercase mb-2">
          Módulo · Respira
        </p>
        <h2 className="font-display text-4xl font-light text-glow" style={{ color }}>
          Regulación Emocional
        </h2>
      </motion.div>

      {/* Technique selector */}
      <div className="flex gap-2 flex-wrap justify-center">
        {TECHNIQUES.map((t) => (
          <button
            key={t.id}
            onClick={() => { stop(); setTechnique(t) }}
            className="px-4 py-2 rounded-xl text-xs font-body transition-all"
            style={{
              background: technique.id === t.id ? `${t.color}20` : 'rgba(30,15,69,0.5)',
              border: `1px solid ${technique.id === t.id ? t.color : 'rgba(155,110,232,0.15)'}`,
              color: technique.id === t.id ? t.color : 'rgba(196,160,245,0.5)',
            }}
          >
            {t.label} · {t.desc}
          </button>
        ))}
      </div>

      {/* Breathing circle */}
      <motion.div
        className="relative flex items-center justify-center cursor-pointer select-none"
        style={{ width: 280, height: 280 }}
        onClick={start}
      >
        {/* Outer rings */}
        {[1.7, 1.4, 1.1].map((s, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 280 * (s / 1.7),
              height: 280 * (s / 1.7),
              border: `1px solid ${color}${['12', '20', '35'][i]}`,
            }}
            animate={{ scale: running ? [1, 1 + 0.03 * (i + 1), 1] : 1 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
          />
        ))}

        {/* Main breathing ring */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 200,
            height: 200,
            background: `radial-gradient(circle, ${color}20 0%, ${color}08 60%, transparent 100%)`,
            border: `2px solid ${color}60`,
            boxShadow: `0 0 40px ${color}30, inset 0 0 30px ${color}15`,
          }}
          animate={{ scale: ringScale }}
          transition={{
            duration: {
              inhale: technique.inhale,
              hold: 0.1,
              exhale: technique.exhale,
              rest: technique.rest || 0.1,
              idle: 0.5,
            }[phase],
            ease: phase === 'inhale' ? 'easeIn' : phase === 'exhale' ? 'easeOut' : 'linear',
          }}
        />

        {/* Progress arc overlay */}
        {running && phase !== 'idle' && (
          <svg className="absolute" width={200} height={200} style={{ transform: 'rotate(-90deg)' }}>
            <circle cx={100} cy={100} r={95} fill="none" stroke={`${color}20`} strokeWidth={2} />
            <circle
              cx={100} cy={100} r={95} fill="none" stroke={color} strokeWidth={2}
              strokeDasharray={`${2 * Math.PI * 95}`}
              strokeDashoffset={`${2 * Math.PI * 95 * (1 - progress)}`}
              strokeLinecap="round"
              style={{ filter: `drop-shadow(0 0 6px ${color})` }}
            />
          </svg>
        )}

        {/* Center text */}
        <div className="relative z-10 text-center pointer-events-none">
          <p className="font-display text-lg font-light" style={{ color }}>
            {PHASE_LABELS[phase]}
          </p>
          {running && phase !== 'idle' && (
            <p className="font-mono text-xs text-nimori-lavender/40 mt-1">
              ciclo {cycles + 1}
            </p>
          )}
        </div>
      </motion.div>

      {/* Timing display */}
      <div className="flex gap-6 text-center">
        {[
          { label: 'Inhala', val: technique.inhale },
          { label: 'Sostén', val: technique.hold },
          { label: 'Exhala', val: technique.exhale },
          ...(technique.rest ? [{ label: 'Descansa', val: technique.rest }] : []),
        ].map((t) => (
          <div key={t.label} className="flex flex-col gap-1">
            <span className="font-display text-2xl font-light" style={{ color }}>{t.val}s</span>
            <span className="text-[10px] font-mono text-nimori-lavender/30 uppercase tracking-widest">{t.label}</span>
          </div>
        ))}
      </div>

      {/* Cycles count */}
      {cycles > 0 && (
        <motion.p
          className="font-mono text-xs text-nimori-lavender/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {cycles} {cycles === 1 ? 'ciclo completado' : 'ciclos completados'}
        </motion.p>
      )}
    </div>
  )
}
