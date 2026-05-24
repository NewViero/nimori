"use client";

import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useSensory } from '@/context/SensoryContext';
import { SENSORY_PRESETS, SensoryEmotion } from '@/types/sensory';

export const OrganicCursor: React.FC<{ emotion: SensoryEmotion }> = ({ emotion }) => {
  const { audioAmplitude } = useSensory();
  const preset = SENSORY_PRESETS[emotion];

  // Coordenadas base del puntero reales
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Sistema de física de amortiguación elástica avanzada (Fricción / Inercia cinematográfica)
  const springConfig = { damping: 35, stiffness: 250, mass: 0.6 };
  const trailConfig = { damping: 45, stiffness: 120, mass: 1.2 };

  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);
  
  // Estela secundaria para el efecto etéreo de partículas continuas
  const trailX = useSpring(cursorX, trailConfig);
  const trailY = useSpring(cursorY, trailConfig);

  // Escala reactiva combinada: Se expande según el volumen del entorno de audio
  const cursorScale = useTransform(audioAmplitude, [0, 1], [1, 1.8]);

  const isMagnetic = useRef<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const moveCursor = (e: MouseEvent) => {
      let targetX = e.clientX;
      let targetY = e.clientY;

      // Delegación de Eventos Inteligente para el Magnetismo
      const target = e.target as HTMLElement;
      const magneticElement = target.closest('[data-magnetic="true"]');

      if (magneticElement) {
        const rect = magneticElement.getBoundingClientRect();
        // Epicentro del elemento magnético
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Atracción del 60% hacia el centro, permitiendo control humano (Física elástica)
        targetX = centerX + (e.clientX - centerX) * 0.4;
        targetY = centerY + (e.clientY - centerY) * 0.4;
        isMagnetic.current = true;
      } else {
        isMagnetic.current = false;
      }

      cursorX.set(targetX);
      cursorY.set(targetY);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden md:block">
      {/* 1. Estela de Luz de Fondo (Efecto Aura Difusa) */}
      <motion.div
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
          backgroundColor: preset.cursorGlow,
          willChange: 'transform'
        }}
        className="absolute w-12 h-12 rounded-full filter blur-xl opacity-60 mix-blend-screen"
      />

      {/* 2. Núcleo Lumínico Principal */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          scale: cursorScale,
          borderColor: preset.cursorGlow,
          willChange: 'transform'
        }}
        className="absolute w-4 h-4 rounded-full border border-white/60 bg-white/20 backdrop-blur-[1px] flex items-center justify-center transition-colors duration-700"
      >
        {/* Punto Focal */}
        <div className="w-1 h-1 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,1)]" />
      </motion.div>
    </div>
  );
};