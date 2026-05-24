'use client'
import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNimoriStore } from '@/store/nimoriStore'

type EntryType = 'libre' | 'carta' | 'capsula'

const ENTRY_TYPES = [
  { id: 'libre',   label: 'Escritura Libre',  desc: 'Deja fluir tus pensamientos sin límites',    icon: '✦' },
  { id: 'carta',   label: 'Carta',            desc: 'Escribe a alguien o a tu yo del futuro',     icon: '✉' },
  { id: 'capsula', label: 'Cápsula Emocional', desc: 'Un momento preservado en el tiempo',        icon: '◈' },
] as const

const PROMPTS = [
  'Hoy me sentí...',
  'Lo que más me pesa es...',
  'Algo que me alegró fue...',
  'Quisiera decirle a alguien...',
  'Mi cuerpo hoy siente...',
  'Si pudiera cambiar algo...',
  'Un recuerdo que vuelve...',
]

export function EscribeModule() {
  const { emotion, getEmotionColor } = useNimoriStore()
  const [type, setType] = useState<EntryType>('libre')
  const [content, setContent] = useState('')
  const [saved, setSaved] = useState(false)
  const [wordCount, setWordCount] = useState(0)
  const textRef = useRef<HTMLTextAreaElement>(null)
  const color = getEmotionColor()

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
    setWordCount(e.target.value.trim().split(/\s+/).filter(Boolean).length)
  }

  const handleSave = () => {
    if (!content.trim()) return
    // In production: save to Supabase/Firebase
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const insertPrompt = (p: string) => {
    setContent((c) => c ? c + '\n\n' + p + ' ' : p + ' ')
    textRef.current?.focus()
  }

  return (
    <div className="min-h-screen flex flex-col px-8 py-12 max-w-3xl mx-auto gap-8">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <p className="font-mono text-xs tracking-[0.4em] text-nimori-lavender/40 uppercase mb-2">
          Módulo · Escribe
        </p>
        <h2 className="font-display text-4xl font-light text-glow" style={{ color }}>
          Tu Diario Emocional
        </h2>
        <p className="mt-2 text-nimori-lavender/50 text-sm font-body">
          Este espacio es solo tuyo. Escribe sin miedo.
        </p>
      </motion.div>

      {/* Entry type selector */}
      <motion.div
        className="flex gap-3 justify-center flex-wrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {ENTRY_TYPES.map((t) => (
          <button
            key={t.id}
            onClick={() => setType(t.id)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-body transition-all"
            style={{
              background: type === t.id ? `${color}20` : 'rgba(30,15,69,0.5)',
              border: `1px solid ${type === t.id ? color : 'rgba(155,110,232,0.15)'}`,
              color: type === t.id ? color : 'rgba(196,160,245,0.5)',
              boxShadow: type === t.id ? `0 0 15px ${color}30` : 'none',
            }}
          >
            <span>{t.icon}</span>
            <span>{t.label}</span>
          </button>
        ))}
      </motion.div>

      {/* Prompts */}
      <motion.div
        className="flex gap-2 flex-wrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <span className="text-xs text-nimori-lavender/30 font-mono self-center mr-1">sugerencias:</span>
        {PROMPTS.map((p) => (
          <button
            key={p}
            onClick={() => insertPrompt(p)}
            className="text-[11px] px-3 py-1 rounded-full font-body transition-all hover:opacity-100"
            style={{
              background: 'rgba(155,110,232,0.08)',
              border: '1px solid rgba(155,110,232,0.12)',
              color: 'rgba(196,160,245,0.45)',
            }}
          >
            {p}
          </button>
        ))}
      </motion.div>

      {/* Writing area */}
      <motion.div
        className="relative flex-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: 'rgba(10,5,32,0.7)',
            border: `1px solid ${color}20`,
            boxShadow: `0 0 40px ${color}08, inset 0 0 30px rgba(0,0,0,0.3)`,
          }}
        >
          {/* Ink glow */}
          <div
            className="absolute top-0 left-0 right-0 h-px opacity-40"
            style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
          />

          <textarea
            ref={textRef}
            value={content}
            onChange={handleChange}
            placeholder="Comienza a escribir... deja que las palabras fluyan como tinta en el agua."
            className="w-full min-h-[320px] bg-transparent p-6 text-nimori-lilac/90 font-body text-base leading-relaxed resize-none outline-none placeholder:text-nimori-lavender/20"
            style={{ caretColor: color }}
          />

          {/* Bottom bar */}
          <div className="flex items-center justify-between px-6 py-3 border-t border-nimori-lavender/8">
            <span className="text-xs font-mono text-nimori-lavender/25">
              {wordCount} palabras
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-nimori-lavender/25">
                {new Date().toLocaleDateString('es-MX', { day: 'numeric', month: 'long' })}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Save button */}
      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <AnimatePresence mode="wait">
          {saved ? (
            <motion.div
              key="saved"
              className="px-8 py-3 rounded-full font-body text-sm"
              style={{ background: `${color}20`, border: `1px solid ${color}50`, color }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              ✦ Guardado en tu memoria
            </motion.div>
          ) : (
            <motion.button
              key="save"
              onClick={handleSave}
              className="px-8 py-3 rounded-full font-body text-sm transition-all"
              style={{
                background: `linear-gradient(135deg, ${color}25, ${color}15)`,
                border: `1px solid ${color}40`,
                color,
              }}
              whileHover={{ scale: 1.05, boxShadow: `0 0 25px ${color}40` }}
              whileTap={{ scale: 0.95 }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              Guardar entrada
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
