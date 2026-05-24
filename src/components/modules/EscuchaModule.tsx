'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNimoriStore } from '@/store/nimoriStore'

const SOUNDSCAPES = [
  { id: 'rain',    label: 'Lluvia',    icon: '🌧',  color: '#4fc3f7', desc: 'Gotas suaves sobre el cristal' },
  { id: 'forest',  label: 'Bosque',    icon: '🌿',  color: '#66bb6a', desc: 'Árboles y viento entre hojas'   },
  { id: 'ocean',   label: 'Océano',    icon: '🌊',  color: '#26c6da', desc: 'Olas que abrazan la orilla'     },
  { id: 'cosmos',  label: 'Cosmos',    icon: '✦',   color: '#9b6ee8', desc: 'Silencio vibrante del universo' },
  { id: 'fire',    label: 'Fuego',     icon: '🔥',  color: '#ff8a65', desc: 'Crepitar de llamas cálidas'     },
  { id: 'wind',    label: 'Viento',    icon: '◎',   color: '#b0bec5', desc: 'Brisa entre campos abiertos'    },
  { id: 'freq528', label: '528 Hz',    icon: '◈',   color: '#ffd54f', desc: 'Frecuencia de transformación'   },
  { id: 'freq432', label: '432 Hz',    icon: '◇',   color: '#ce93d8', desc: 'Armonía del universo'           },
]

function SoundWaveVisualizer({ active, color }: { active: boolean; color: string }) {
  const bars = Array.from({ length: 32 })
  return (
    <div className="flex items-center justify-center gap-0.5 h-20">
      {bars.map((_, i) => (
        <motion.div
          key={i}
          className="rounded-full"
          style={{ width: 3, background: color, opacity: 0.8 }}
          animate={active ? {
            height: [6, 20 + Math.sin(i * 0.5) * 30, 6],
            opacity: [0.4, 0.9, 0.4],
          } : { height: 4, opacity: 0.2 }}
          transition={{
            duration: 0.8 + (i % 5) * 0.15,
            repeat: Infinity,
            delay: i * 0.04,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

export function EscuchaModule() {
  const { getEmotionColor, setCurrentAmbient, currentAmbient } = useNimoriStore()
  const [selected, setSelected] = useState<string | null>(null)
  const [playing, setPlaying] = useState(false)
  const [volume, setVolume] = useState(0.6)
  const color = getEmotionColor()

  const selectedSound = SOUNDSCAPES.find((s) => s.id === selected)

  const handleSelect = (id: string) => {
    if (selected === id) {
      setPlaying(!playing)
    } else {
      setSelected(id)
      setPlaying(true)
      setCurrentAmbient(id)
    }
  }

  return (
    <div className="min-h-screen flex flex-col px-8 py-12 max-w-3xl mx-auto gap-8">

      {/* Header */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="font-mono text-xs tracking-[0.4em] text-nimori-lavender/40 uppercase mb-2">
          Módulo · Escucha
        </p>
        <h2 className="font-display text-4xl font-light text-glow" style={{ color }}>
          Terapia Sonora
        </h2>
        <p className="mt-2 text-nimori-lavender/50 text-sm font-body">
          Deja que el sonido te envuelva y te lleve a otro lugar.
        </p>
      </motion.div>

      {/* Visualizer */}
      <motion.div
        className="glass rounded-2xl p-6 flex flex-col items-center gap-4"
        style={{ borderColor: `${selectedSound?.color ?? color}20` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <SoundWaveVisualizer
          active={playing && !!selected}
          color={selectedSound?.color ?? color}
        />

        {selectedSound ? (
          <div className="text-center">
            <p className="font-display text-2xl font-light" style={{ color: selectedSound.color }}>
              {selectedSound.label}
            </p>
            <p className="text-xs text-nimori-lavender/40 mt-1 font-body">{selectedSound.desc}</p>
          </div>
        ) : (
          <p className="text-nimori-lavender/30 text-sm font-body">Selecciona un paisaje sonoro</p>
        )}

        {/* Volume */}
        <div className="flex items-center gap-3 w-full max-w-xs">
          <span className="text-xs text-nimori-lavender/30 font-mono">vol</span>
          <input
            type="range" min={0} max={1} step={0.01}
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="flex-1 h-1 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, ${selectedSound?.color ?? color} ${volume * 100}%, rgba(155,110,232,0.2) ${volume * 100}%)`,
            }}
          />
          <span className="text-xs text-nimori-lavender/30 font-mono w-8 text-right">
            {Math.round(volume * 100)}
          </span>
        </div>
      </motion.div>

      {/* Sound grid */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-4 gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {SOUNDSCAPES.map((s, i) => {
          const isActive = selected === s.id
          return (
            <motion.button
              key={s.id}
              onClick={() => handleSelect(s.id)}
              className="relative flex flex-col items-center gap-2 p-4 rounded-2xl overflow-hidden transition-all"
              style={{
                background: isActive ? `${s.color}15` : 'rgba(30,15,69,0.4)',
                border: `1px solid ${isActive ? s.color : 'rgba(155,110,232,0.12)'}`,
                boxShadow: isActive ? `0 0 20px ${s.color}30` : 'none',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 + i * 0.05 }}
            >
              <span className="text-2xl">{s.icon}</span>
              <span className="text-xs font-body" style={{ color: isActive ? s.color : 'rgba(196,160,245,0.6)' }}>
                {s.label}
              </span>
              {isActive && playing && (
                <motion.div
                  className="absolute bottom-1 flex gap-0.5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {[0,1,2].map((j) => (
                    <motion.div
                      key={j}
                      className="w-0.5 rounded-full"
                      style={{ background: s.color }}
                      animate={{ height: [3, 10, 3] }}
                      transition={{ duration: 0.5, repeat: Infinity, delay: j * 0.15 }}
                    />
                  ))}
                </motion.div>
              )}
            </motion.button>
          )
        })}
      </motion.div>

    </div>
  )
}
