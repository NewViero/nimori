'use client'

import { AnimatePresence } from 'framer-motion'

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

import { PageWrapper } from '@/components/navigation/PageWrapper'

const MODULE_MAP = {
  sanctuary: SanctuaryModule,
  escribe: EscribeModule,
  dibuja: DibujaModule,
  escucha: EscuchaModule,
  siente: SienteModule,
  recuerda: RecuerdaModule,
  recrea: RecreaModule,
  huellas: HuellasModule,
  respira: RespiraModule,
  companero: CompaneroModule,
} as const

export default function HomePage() {
  const { activeModule } = useNimoriStore()

  const ActiveComponent = MODULE_MAP[activeModule]

  return (
    <AppLayout>
      <AnimatePresence mode="wait">

        <PageWrapper id={activeModule}>
          <ActiveComponent />
        </PageWrapper>

      </AnimatePresence>
    </AppLayout>
  )
}