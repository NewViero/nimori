"use client";

import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';
import { EMOTION_PRESETS, EmotionType } from '@/types/emotion';

interface SanctuaryMascotPodProps {
  emotion: EmotionType;
  springX: MotionValue<number>;
  springY: MotionValue<number>;
  children: React.ReactNode; // Recibe la mascota Nimori existente
}

export const SanctuaryMascotPod: React.FC<SanctuaryMascotPodProps> = ({
  emotion,
  springX,
  springY,
  children
}) => {
  const currentEmotion = EMOTION_PRESETS[emotion] || EMOTION_PRESETS['calma'];

  // Parallax directo de foco medio para la mascota
  const mascotX = useTransform(springX, [-500, 500], [-8, 8]);
  const mascotY = useTransform(springY, [-500, 500], [-6, 6]);

  return (
    className="relative flex items-center justify-center w-full min-h-[280px] md:min-h-[380px] z-10 select-none"
      
      {/* Halo Sagrado e Iluminación Reactiva detrás de NIMORI */}
      <motion.div
        style={{
          x: mascotX,
          y: mascotY,
          backgroundColor: currentEmotion.glowColor,
          willChange: "transform"
        }}
        animate={{
          scale: [1, 1.06, 0.97, 1.06, 1],
          opacity: [0.4, 0.55, 0.45, 0.55, 0.4]
        }}
        transition={{
          duration: currentEmotion.breathingDuration * 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute w-80 h-80 rounded-full filter blur-[56px] mix-blend-screen opacity-50 pointer-events-none transition-colors duration-1000"
      />

      {/* Anillo de Partículas Concéntricas o Aura Perimetral */}
      <motion.div
        style={{ x: mascotX, y: mascotY }}
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute w-72 h-72 rounded-full border border-white/[0.03] flex items-center justify-center pointer-events-none"
      >
        <div className="absolute w-full h-full rounded-full border border-dashed border-white/[0.015] animate-pulse" />
      </motion.div>

      {/* Contenedor de Respiración Coherente y Flotación Cinemática */}
      <motion.div
        style={{ x: mascotX, y: mascotY, willChange: "transform" }}
        animate={{
          y: [0, -currentEmotion.floatingAmplitude, 0],
        }}
        transition={{
          duration: currentEmotion.breathingDuration,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative z-10 flex flex-col items-center justify-center"
      >
        {/* Aquí renderizamos tu componente existente de NIMORI */}
        {children}

        {/* Sombra de suelo difusa reactiva a la altura de la flotación */}
        <motion.div
          animate={{
            scale: [1, 0.9, 1],
            opacity: [0.2, 0.1, 0.2]
          }}
          transition={{
            duration: currentEmotion.breathingDuration,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-24 h-2 bg-black/40 rounded-full filter blur-md mt-6 pointer-events-none"
        />
      </motion.div>
    </div>
  );
};