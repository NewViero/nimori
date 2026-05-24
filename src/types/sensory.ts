export type SensoryEmotion = 'calma' | 'alegria' | 'nostalgia' | 'proteccion' | 'contemplacion';

export interface SensoryPreset {
  audioFrequencyRange: [number, number]; // Rango de hertz a escuchar (Low, High)
  pulseScale: number;
  pulseDuration: number;
  cursorGlow: string;
  audioFilterFrequency: number; // Hz para el filtro pasabajos (efecto subacuático)
}

export const SENSORY_PRESETS: Record<SensoryEmotion, SensoryPreset> = {
  calma: {
    audioFrequencyRange: [20, 150],
    pulseScale: 1.1,
    pulseDuration: 2.5,
    cursorGlow: 'rgba(64, 145, 108, 0.4)',
    audioFilterFrequency: 800,
  },
  alegria: {
    audioFrequencyRange: [200, 600],
    pulseScale: 1.25,
    pulseDuration: 1.5,
    cursorGlow: 'rgba(255, 183, 3, 0.5)',
    audioFilterFrequency: 2000,
  },
  nostalgia: {
    audioFrequencyRange: [100, 300],
    pulseScale: 1.05,
    pulseDuration: 4.0,
    cursorGlow: 'rgba(138, 43, 226, 0.3)',
    audioFilterFrequency: 600,
  },
  proteccion: {
    audioFrequencyRange: [40, 200],
    pulseScale: 1.15,
    pulseDuration: 2.0,
    cursorGlow: 'rgba(0, 180, 216, 0.5)',
    audioFilterFrequency: 1200,
  },
  contemplacion: {
    audioFrequencyRange: [20, 80],
    pulseScale: 1.02,
    pulseDuration: 5.0,
    cursorGlow: 'rgba(255, 255, 255, 0.25)',
    audioFilterFrequency: 500,
  },
};