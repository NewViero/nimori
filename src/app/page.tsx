'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { useNimoriStore } from '@/store/nimoriStore'
import { AppLayout } from '@/components/layout/AppLayout'
import { SanctuaryModule } from '@/components/modules/SanctuaryModule'
import { EscribeModule } from '@/components/modules/EscribeModule'
import { EscuchaModule } from '@/components/modules/EscuchaModule'
import { RespiraModule } from '@/components/modules/RespiraModule'
import { SienteModule } from '@/components/modules/SienteModule'
import {
  DibujaModule,
  RecuerdaModule,
  RecreaModule,
  HuellasModule,
  CompaneroModule,
} from '@/components/modules/PlaceholderModules'

const MODULE_MAP = {
  sanctuary: SanctuaryModule,
  escribe:   EscribeModule,
  dibuja:    DibujaModule,
  escucha:   EscuchaModule,
  siente:    SienteModule,
  recuerda:  RecuerdaModule,
  recrea:    RecreaModule,
  huellas:   HuellasModule,
  respira:   RespiraModule,
  companero: CompaneroModule,
} as const

export default function HomePage() {
  const { activeModule } = useNimoriStore()
  const ActiveComponent = MODULE_MAP[activeModule]

  return (
    <AppLayout>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeModule}
          initial={{ opacity: 0, y: 24, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -16, filter: 'blur(4px)' }}
          transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
        >
          <ActiveComponent />
        </motion.div>
      </AnimatePresence>
    </AppLayout>
  )
}
