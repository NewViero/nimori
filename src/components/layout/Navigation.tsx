'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useNimoriStore, Module } from '@/store/nimoriStore'
import { MODULE_CONFIGS } from '@/lib/utils'
import { cn } from '@/lib/utils'

const NAV_MODULES: Module[] = [
  'sanctuary', 'escribe', 'dibuja', 'escucha', 'siente',
  'recuerda', 'recrea', 'huellas', 'respira', 'companero',
]

export function Navigation() {
  const { activeModule, setActiveModule } = useNimoriStore()
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.nav
      className="fixed left-0 top-0 h-full z-50 flex items-center"
      initial={{ x: -80 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
    >
      <motion.div
        className="glass relative flex flex-col items-center py-6 gap-1 rounded-r-2xl"
        style={{
          width: expanded ? 180 : 64,
          transition: 'width 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
        }}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
      >
        {/* Logo mark */}
        <div className="mb-4 px-3">
          <motion.div
            className="text-xs font-mono tracking-[0.3em] text-nimori-lavender/60 overflow-hidden"
            style={{ whiteSpace: 'nowrap' }}
          >
            {expanded ? 'NIMORI' : 'N'}
          </motion.div>
        </div>

        {NAV_MODULES.map((mod) => {
          const cfg = MODULE_CONFIGS[mod]
          const isActive = activeModule === mod
          return (
            <motion.button
              key={mod}
              onClick={() => setActiveModule(mod)}
              className={cn(
                'relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300',
                'text-sm font-body overflow-hidden',
                isActive
                  ? 'text-white'
                  : 'text-nimori-lavender/50 hover:text-nimori-lavender/80'
              )}
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Active bg */}
              {isActive && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-xl"
                  style={{
                    background: `linear-gradient(135deg, ${cfg.color}25, ${cfg.color}10)`,
                    borderLeft: `2px solid ${cfg.color}`,
                  }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}

              {/* Hover glow dot */}
              <motion.span
                className="relative z-10 text-base flex-shrink-0"
                style={{
                  filter: isActive ? `drop-shadow(0 0 6px ${cfg.color})` : 'none',
                  color: isActive ? cfg.color : undefined,
                }}
              >
                {cfg.icon}
              </motion.span>

              {/* Label */}
              <AnimatePresence>
                {expanded && (
                  <motion.span
                    className="relative z-10 text-xs tracking-wide font-body whitespace-nowrap"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                    {cfg.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          )
        })}

        {/* Bottom divider + settings */}
        <div className="mt-auto pt-4 px-3 w-full border-t border-nimori-lavender/10">
          <div className="text-[10px] font-mono text-nimori-lavender/20 text-center">
            {expanded ? 'v0.1' : '·'}
          </div>
        </div>
      </motion.div>
    </motion.nav>
  )
}
