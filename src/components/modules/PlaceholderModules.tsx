'use client'
import { motion } from 'framer-motion'
import { useNimoriStore } from '@/store/nimoriStore'
import { MODULE_CONFIGS, type Module } from '@/lib/utils'

interface PlaceholderProps {
  moduleId: Module
  tagline: string
  comingSoon?: string[]
}

export function PlaceholderModule({ moduleId, tagline, comingSoon = [] }: PlaceholderProps) {
  const { getEmotionColor } = useNimoriStore()
  const cfg = MODULE_CONFIGS[moduleId]
  const color = cfg.color

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-8 py-12 gap-8 text-center max-w-xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        className="relative"
      >
        {/* Glow */}
        <div
          className="absolute inset-0 rounded-full blur-3xl"
          style={{ background: `${color}20`, transform: 'scale(1.5)' }}
        />
        <span className="relative text-7xl" style={{ filter: `drop-shadow(0 0 20px ${color})` }}>
          {cfg.icon}
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <p className="font-mono text-xs tracking-[0.4em] text-nimori-lavender/40 uppercase mb-2">
          Módulo
        </p>
        <h2 className="font-display text-5xl font-light text-glow mb-3" style={{ color }}>
          {cfg.label}
        </h2>
        <p className="text-nimori-lavender/50 text-sm font-body leading-relaxed max-w-sm">
          {tagline}
        </p>
      </motion.div>

      {comingSoon.length > 0 && (
        <motion.div
          className="glass rounded-2xl p-6 max-w-sm w-full"
          style={{ borderColor: `${color}20` }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <p className="font-mono text-[10px] tracking-widest text-nimori-lavender/30 uppercase mb-4">
            Próximamente
          </p>
          <div className="flex flex-col gap-2">
            {comingSoon.map((feat, i) => (
              <motion.div
                key={feat}
                className="flex items-center gap-2 text-sm text-nimori-lavender/60 font-body"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.07 }}
              >
                <span style={{ color, fontSize: 8 }}>◆</span>
                {feat}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      <motion.div
        className="px-4 py-1.5 rounded-full text-xs font-mono"
        style={{
          background: `${color}10`,
          border: `1px solid ${color}25`,
          color: `${color}80`,
        }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
        initial={{ opacity: 0 }}
      >
        En desarrollo · NIMORI v0.1
      </motion.div>
    </div>
  )
}

// Individual module exports
export function DibujaModule() {
  return (
    <PlaceholderModule
      moduleId="dibuja"
      tagline="Un espacio para crear con el corazón. Pintura digital con texturas orgánicas y pinceles emocionales."
      comingSoon={[
        'Acuarela viva con física de agua',
        'Pinceles dinámicos sensibles a la presión',
        'Capas de texturas orgánicas',
        'Exportar como recuerdo visual',
        'Paletas generadas por tu estado emocional',
      ]}
    />
  )
}

export function RecuerdaModule() {
  return (
    <PlaceholderModule
      moduleId="recuerda"
      tagline="Tu biblioteca emocional. Cada momento preservado como una constelación en el tiempo."
      comingSoon={[
        'Línea del tiempo emocional',
        'Constelaciones de recuerdos',
        'Jardín emocional interactivo',
        'Álbum de entradas y creaciones',
        'Análisis de patrones emocionales',
      ]}
    />
  )
}

export function RecreaModule() {
  return (
    <PlaceholderModule
      moduleId="recrea"
      tagline="Donde la IA te ayuda a transformar emociones en historias, escenas y homenajes visuales únicos."
      comingSoon={[
        'Generador de historias emocionales',
        'Storyboard animado personalizado',
        'Videos de homenaje con IA',
        'Escenas caricaturescas de recuerdos',
        'Narración emotiva con voz',
      ]}
    />
  )
}

export function HuellasModule() {
  return (
    <PlaceholderModule
      moduleId="huellas"
      tagline="Un santuario especial para honrar a quienes amamos con todo el corazón, incluidas nuestras mascotas."
      comingSoon={[
        'Memoriales interactivos personalizados',
        'Álbum de recuerdos con tu mascota',
        'Carta de despedida guiada',
        'Jardín memorial virtual',
        'Constelación dedicada especial',
      ]}
    />
  )
}

export function CompaneroModule() {
  return (
    <PlaceholderModule
      moduleId="companero"
      tagline="Nimori como compañero vivo. Un sistema emocional que aprende, reacciona y crece contigo."
      comingSoon={[
        'Estados emocionales dinámicos de Nimori',
        'Respuestas contextuales personalizadas',
        'Animaciones reactivas avanzadas',
        'Rituales diarios con Nimori',
        'Voz suave y calmante',
      ]}
    />
  )
}
