import { create } from 'zustand'

export type Emotion = 'calm' | 'joy' | 'melancholy' | 'love' | 'wonder' | 'peace' | 'neutral'
export type Module = 'sanctuary' | 'escribe' | 'dibuja' | 'escucha' | 'siente' | 'recuerda' | 'recrea' | 'huellas' | 'respira' | 'companero'

interface NimoriState {
  // Navigation
  activeModule: Module
  setActiveModule: (m: Module) => void

  // Emotional State
  emotion: Emotion
  setEmotion: (e: Emotion) => void
  emotionIntensity: number
  setEmotionIntensity: (v: number) => void

  // Nimori companion
  nimoriMood: Emotion
  nimoriAnimating: boolean
  setNimoriMood: (e: Emotion) => void
  triggerNimoriAnimation: () => void

  // Audio
  audioEnabled: boolean
  volume: number
  toggleAudio: () => void
  setVolume: (v: number) => void
  currentAmbient: string | null
  setCurrentAmbient: (s: string | null) => void

  // Visual
  particlesEnabled: boolean
  toggleParticles: () => void
  timeOfDay: 'dawn' | 'day' | 'dusk' | 'night'
  setTimeOfDay: (t: 'dawn' | 'day' | 'dusk' | 'night') => void

  // Theme colors based on emotion
  getEmotionColor: () => string
  getEmotionGlow: () => string
}

const EMOTION_COLORS: Record<Emotion, string> = {
  calm:      '#4fc3f7',
  joy:       '#ffd54f',
  melancholy:'#6b35c8',
  love:      '#ff6eb4',
  wonder:    '#c4a0f5',
  peace:     '#26c6da',
  neutral:   '#9b6ee8',
}

const EMOTION_GLOWS: Record<Emotion, string> = {
  calm:      'rgba(79,195,247,0.3)',
  joy:       'rgba(255,213,79,0.3)',
  melancholy:'rgba(107,53,200,0.4)',
  love:      'rgba(255,110,180,0.35)',
  wonder:    'rgba(196,160,245,0.35)',
  peace:     'rgba(38,198,218,0.3)',
  neutral:   'rgba(155,110,232,0.25)',
}

export const useNimoriStore = create<NimoriState>((set, get) => ({
  activeModule: 'sanctuary',
  setActiveModule: (m) => set({ activeModule: m }),

  emotion: 'neutral',
  setEmotion: (e) => set({ emotion: e }),
  emotionIntensity: 0.5,
  setEmotionIntensity: (v) => set({ emotionIntensity: v }),

  nimoriMood: 'neutral',
  nimoriAnimating: false,
  setNimoriMood: (e) => set({ nimoriMood: e }),
  triggerNimoriAnimation: () => {
    set({ nimoriAnimating: true })
    setTimeout(() => set({ nimoriAnimating: false }), 2000)
  },

  audioEnabled: false,
  volume: 0.5,
  toggleAudio: () => set((s) => ({ audioEnabled: !s.audioEnabled })),
  setVolume: (v) => set({ volume: v }),
  currentAmbient: null,
  setCurrentAmbient: (s) => set({ currentAmbient: s }),

  particlesEnabled: true,
  toggleParticles: () => set((s) => ({ particlesEnabled: !s.particlesEnabled })),

  timeOfDay: 'night',
  setTimeOfDay: (t) => set({ timeOfDay: t }),

  getEmotionColor: () => EMOTION_COLORS[get().emotion],
  getEmotionGlow: () => EMOTION_GLOWS[get().emotion],
}))
