"use client";

import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';
import { EMOTION_PRESETS, EmotionType } from '@/types/emotion';

interface AtmosphericLayersProps {
  emotion: EmotionType;
  springX: MotionValue<number>;
  springY: MotionValue<number>;
}

export const AtmosphericLayers: React.FC<AtmosphericLayersProps> = ({ emotion, springX, springY }) => {
  const currentEmotion = EMOTION_PRESETS[emotion] || EMOTION_PRESETS['calma'];

  // Parallax delicado e invertido para el fondo profundo
  const bgX = useTransform(springX, [-500, 500], [-15, 15]);
  const bgY = useTransform(springY, [-500, 500], [-15, 15]);

  // Parallax corregido para las capas de niebla y luces medias
  const fogX = useTransform(springX, [-500, 500], [8, -8]);
  const fogY = useTransform(springY, [-500, 500], [8, -8]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Capa 0: Gradiente Emocional de Fondo Profundo */}
      <motion.div
        style={{ x: bgX, y: bgY, willChange: "transform" }}
        className="absolute -inset-10 bg-gradient-to-tr from-[#0b0914] via-[#120e25] to-[#07050c] transition-colors duration-1000"
      />

      {/* Capa 1: Luces Ambientales Volumétricas Lentas (Niebla Luminosa) */}
      <motion.div
        style={{ x: fogX, y: fogY, willChange: "transform" }}
        className="absolute inset-0 mix-blend-screen overflow-hidden"
      >
        {/* Luz de Aurora Izquierda */}
        <motion.div
          animate={{
            x: [-100, 100, -100],
            y: [-50, 80, -50],
            scale: [1, 1.15, 1],
            opacity: [0.15, 0.3, 0.15]
          }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
          style={{ backgroundColor: currentEmotion.glowColor }}
          className="absolute -top-20 -left-20 w-[320px] h-[320px] md:w-[600px] md:h-[600px]rounded-full filter blur-[140px]"
        />

        {/* Luz de Nebulosa Derecha */}
        <motion.div
          animate={{
            x: [100, -80, 100],
            y: [100, -50, 100],
            scale: [1.2, 0.9, 1.2],
            opacity: [0.1, 0.25, 0.1]
          }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          style={{ backgroundColor: currentEmotion.glowColor }}
          className="absolute -bottom-40 -right-20 w-[380px] h-[380px] md:w-[700px] md:h-[700px] rounded-full filter blur-[160px] opacity-70"
        />
      </motion.div>

      {/* Partículas Ambientales Hiper-Sutiles Flotantes */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{
              y: ["105vh", "-5vh"],
              x: [
                `${Math.random() * 100}vw`,
                `${Math.random() * 100 + (Math.random() * 20 - 10)}vw`
              ],
              opacity: [0, 0.35, 0.35, 0],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 20 + Math.random() * 25,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 15
            }}
            style={{ backgroundColor: currentEmotion.glowColor }}
            className="absolute w-1 h-1 rounded-full filter blur-[0.5px] mix-blend-screen shadow-[0_0_8px_rgba(255,255,255,0.5)]"
          />
        ))}
      </div>

      {/* Capa de Cine Premium: Viñeta y Sombras Cinematográficas Perimetrales */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(4,3,8,0.65)_100%)] mix-blend-multiply pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#06040a]/80 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#06040a]/90 to-transparent pointer-events-none" />
    </div>
  );
};