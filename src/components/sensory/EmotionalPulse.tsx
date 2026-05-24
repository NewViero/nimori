"use client";

import React, { useEffect } from 'react';
import { motion, useAnimationControls } from 'framer-motion';

import { SensoryEmotion } from '@/types/sensory';
import { EMOTION_PRESETS } from '@/types/emotion';

export const EmotionalPulse: React.FC<{ emotion: SensoryEmotion }> = ({ emotion }) => {
  const controls = useAnimationControls();

  // Traducimos emociones del store → emociones visuales
  const emotionMap: Record<string, keyof typeof EMOTION_PRESETS> = {
    calm: 'calma',
    joy: 'alegria',
    love: 'proteccion',
    melancholy: 'nostalgia',
    wonder: 'contemplacion',
    peace: 'calma',
  };

  // Seguridad para evitar undefined
  const safeEmotion =
    emotionMap[emotion] || 'calma';

  // Preset visual seguro
  const preset = EMOTION_PRESETS[safeEmotion];

  useEffect(() => {
    controls.set({
      scale: 0,
      opacity: 0.7,
      filter: 'blur(4px)',
    });

    controls.start({
      scale: 2,
      opacity: 0,
      filter: 'blur(24px)',
      transition: {
        duration: 2.5,
        ease: [0.1, 0.8, 0.2, 1],
      },
    });
  }, [emotion, controls]);

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none z-0">
      <motion.div
        animate={controls}
        style={{
          border: `2px solid ${preset.glowColor}`,
          boxShadow: `
            inset 0 0 80px ${preset.glowColor},
            0 0 40px ${preset.glowColor}
          `,
        }}
        className="w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] rounded-full mix-blend-screen"
      />
    </div>
  );
};