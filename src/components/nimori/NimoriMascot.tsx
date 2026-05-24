"use client";

import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { EmotionType, EMOTION_PRESETS } from '@/types/emotion';

interface NimoriMascotProps {
  emotion?: EmotionType;
  className?: string;
  children?: React.ReactNode; // Permite envolver el SVG/Avatar actual de NIMORI
}

export const NimoriMascot: React.FC<NimoriMascotProps> = ({
  emotion = 'calma',
  className = '',
  children
}) => {
  const currentEmotion = EMOTION_PRESETS[emotion];
  const [isBlinking, setIsBlinking] = useState(false);

  // 1. Seguimiento del Cursor Elástico (Física Amortiguada)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Configuraciones de resorte para movimiento premium tipo videojuego
  const springConfig = { damping: 40, stiffness: 120, mass: 1.5 };
  const elasticX = useSpring(mouseX, springConfig);
  const elasticY = useSpring(mouseY, springConfig);

  // Transformaciones sutiles para evitar deformación exagerada (Parallax de la mirada)
  const lookX = useTransform(elasticX, [-400, 400], [-12, 12]);
  const lookY = useTransform(elasticY, [-400, 400], [-8, 8]);
  const auraX = useTransform(elasticX, [-400, 400], [-20, 20]);
  const auraY = useTransform(elasticY, [-400, 400], [-15, 15]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calcular la posición relativa al centro de la pantalla
      const x = e.clientX - window.innerWidth / 2;
      const y = e.clientY - window.innerHeight / 2;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // 2. Ciclo de Parpadeo Estocástico (Aleatoriedad Natural)
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const triggerBlink = () => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 140); // Duración de un parpadeo real
      
      // Intervalo aleatorio entre 3.5 y 7 segundos para el siguiente parpadeo
      const nextInterval = 3500 + Math.random() * 3500;
      timeoutId = setTimeout(triggerBlink, nextInterval);
    };

    timeoutId = setTimeout(triggerBlink, 4000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      
      {/* Aura Dinámica Reactiva a la Emoción y al Cursor */}
      <motion.div
        style={{
          x: auraX,
          y: auraY,
          backgroundColor: currentEmotion.glowColor,
        }}
        animate={{
          scale: [1, 1.12, 1],
        }}
        transition={{
          duration: currentEmotion.breathingDuration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute w-64 h-64 rounded-full filter blur-[64px] pointer-events-none mix-blend-screen transition-colors duration-1000"
      />

      {/* Contenedor de Movimiento Orgánico (Respiración + Flotación + Hover) */}
      <motion.div
        style={{ x: lookX, y: lookY }}
        animate={{
          y: [0, -currentEmotion.floatingAmplitude, 0],
          scaleY: [1, currentEmotion.scaleRatio, 1],
          scaleX: [1, 1 / currentEmotion.scaleRatio, 1],
        }}
        whileHover={{ scale: 1.025 }}
        whileTap={{ scale: 0.98 }}
        transition={{
          y: {
            duration: currentEmotion.breathingDuration * 1.2,
            repeat: Infinity,
            ease: "easeInOut"
          },
          default: {
            duration: currentEmotion.breathingDuration,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
        className="relative z-10 cursor-pointer will-change-transform"
      >
        {children ? (
          /* Si pasas tu diseño actual como hijo, se monta aquí e interactúa */
          <div className="relative">
            {children}
            {/* Capa de expresión inyectada (Ojos controladores si se requiere sobreponer) */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              {/* Aquí se pueden mapear microexpresiones condicionales según prop 'emotion' */}
            </div>
          </div>
        ) : (
          /* Render Base en caso de que no tenga hijos asignados aún */
          <div className="w-44 h-44 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex flex-col items-center justify-center shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]">
            <div className="flex gap-7 mb-3">
              {/* Ojos con animación de parpadeo */}
              <motion.div 
                animate={{ scaleY: isBlinking ? 0.05 : 1 }}
                transition={{ duration: 0.05 }}
                className="w-3.5 h-3.5 bg-white/90 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"
              />
              <motion.div 
                animate={{ scaleY: isBlinking ? 0.05 : 1 }}
                transition={{ duration: 0.05 }}
                className="w-3.5 h-3.5 bg-white/90 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"
              />
            </div>
            
            {/* Boca Adaptativa al Estado de Ánimo */}
            <motion.div 
              animate={
                emotion === 'alegria' ? { scaleX: 1.2, y: 1 } :
                emotion === 'nostalgia' ? { rotate: 180, y: -2 } : { scaleX: 1, y: 0 }
              }
              className="w-5 h-2.5 border-b-2 border-white/70 rounded-b-full"
            />
          </div>
        )}
      </motion.div>
    </div>
  );
};