"use client";
import { motion } from 'framer-motion';
import { useEmotionalTheme } from '@/context/ThemeContext';

export const AmbientBackground = () => {
  const { theme } = useEmotionalTheme();

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Nebulosa Dinámica con Glow Cinematográfico */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[var(--glow)] opacity-20 filter blur-[120px]"
      />
      
      {/* Sistema de Partículas Flotantes Suaves */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-[var(--particle)] opacity-40 shadow-xl"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 40 - 20, 0],
            opacity: [0.2, 0.7, 0.2],
          }}
          transition={{
            duration: 10 + Math.random() * 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
};