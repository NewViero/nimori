import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { Module } from '@/store/nimoriStore'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

export function detectTimeOfDay(): 'dawn' | 'day' | 'dusk' | 'night' {
  const h = new Date().getHours()
  if (h >= 5 && h < 9) return 'dawn'
  if (h >= 9 && h < 18) return 'day'
  if (h >= 18 && h < 21) return 'dusk'
  return 'night'
}

export { type Module }

export const MODULE_CONFIGS: Record<Module, { icon: string; label: string; color: string; glow: string }> = {
  sanctuary: { icon: '✦', label: 'Santuario', color: '#9b6ee8', glow: 'rgba(155,110,232,0.4)' },
  escribe:   { icon: '✍', label: 'Escribe',   color: '#c4a0f5', glow: 'rgba(196,160,245,0.4)' },
  dibuja:    { icon: '◈', label: 'Dibuja',    color: '#ff9ed8', glow: 'rgba(255,158,216,0.4)'  },
  escucha:   { icon: '◉', label: 'Escucha',   color: '#4fc3f7', glow: 'rgba(79,195,247,0.4)'  },
  siente:    { icon: '◎', label: 'Siente',    color: '#ff6eb4', glow: 'rgba(255,110,180,0.4)' },
  recuerda:  { icon: '⋆', label: 'Recuerda',  color: '#ffd54f', glow: 'rgba(255,213,79,0.4)'  },
  recrea:    { icon: '◇', label: 'Recrea',    color: '#ff8a65', glow: 'rgba(255,138,101,0.4)' },
  huellas:   { icon: '♡', label: 'Huellas',   color: '#f48fb1', glow: 'rgba(244,143,177,0.4)' },
  respira:   { icon: '○', label: 'Respira',   color: '#26c6da', glow: 'rgba(38,198,218,0.4)'  },
  companero: { icon: '✿', label: 'Compañero', color: '#ce93d8', glow: 'rgba(206,147,216,0.4)' },
}
