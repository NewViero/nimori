export type EmotionType = 'calma' | 'alegria' | 'nostalgia' | 'proteccion' | 'contemplacion';

export interface EmotionConfig {
  glowColor: string;
  particleSpeed: number;
  breathingDuration: number; // En segundos
  floatingAmplitude: number; // Pixeles de oscilación
  scaleRatio: number;        // Escala base de respiración
}

export const EMOTION_PRESETS: Record<EmotionType, EmotionConfig> = {
  calma: {
    glowColor: 'rgba(64, 145, 108, 0.25)',
    particleSpeed: 25,
    breathingDuration: 5,
    floatingAmplitude: 6,
    scaleRatio: 1.015,
  },
  alegria: {
    glowColor: 'rgba(255, 183, 3, 0.3)',
    particleSpeed: 12,
    breathingDuration: 3.2,
    floatingAmplitude: 10,
    scaleRatio: 1.03,
  },
  nostalgia: {
    glowColor: 'rgba(138, 43, 226, 0.2)',
    particleSpeed: 35,
    breathingDuration: 6.5,
    floatingAmplitude: 4,
    scaleRatio: 1.01,
  },
  proteccion: {
    glowColor: 'rgba(0, 180, 216, 0.35)',
    particleSpeed: 20,
    breathingDuration: 4.5,
    floatingAmplitude: 5,
    scaleRatio: 1.02,
  },
  contemplacion: {
    glowColor: 'rgba(240, 243, 244, 0.15)',
    particleSpeed: 45,
    breathingDuration: 8,
    floatingAmplitude: 3,
    scaleRatio: 1.008,
  },
};