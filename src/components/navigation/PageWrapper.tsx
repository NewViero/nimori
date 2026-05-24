"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface PageWrapperProps {
  children: React.ReactNode;
  id: string; // Identificador de la ruta o vista actual para gatillar la animación
}

// Curva Bézier de nivel cinematográfico (Cubic Bezier de desaceleración suave)
const cinematicEasing = [0.22, 1, 0.36, 1];

export const PageWrapper: React.FC<PageWrapperProps> = ({ children, id }) => {
  return (
    <motion.div
      key={id}
      initial={{ opacity: 0, y: 12, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
      transition={{
        duration: 0.85,
        ease: cinematicEasing,
      }}
      className="w-full h-full flex flex-col flex-1 overflow-y-auto overflow-x-hidden relative"
      style={{ backfaceVisibility: 'hidden' }} // Optimización de renderizado móvil
    >
      {/* Capa de iluminación ambiental integrada al flujo de renderizado */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
      {children}
    </motion.div>
  );
};