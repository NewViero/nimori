"use client";

import React, { useEffect } from 'react';
import { SensoryProvider, useSensory } from '@/context/SensoryContext';
//import { OrganicCursor } from './OrganicCursor';
import { EmotionalPulse } from './EmotionalPulse';
import { SensoryEmotion } from '@/types/sensory';

interface SensoryOrchestratorProps {
  children: React.ReactNode;
  emotion: SensoryEmotion;
}

const CoreOrchestrator: React.FC<{ children: React.ReactNode; emotion: SensoryEmotion }> = ({ children, emotion }) => {
  const { initAudio } = useSensory();

  // Inicializa el contexto de audio en el primer click dentro del santuario
  useEffect(() => {
    const unlockAudio = () => {
      initAudio();
      window.removeEventListener('click', unlockAudio);
    };
    window.addEventListener('click', unlockAudio);
    return () => window.removeEventListener('click', unlockAudio);
  }, [initAudio]);

  return (
    <div className="relative w-full h-full min-h-screen overflow-hidden select-none">
      {/* Pulso de choque emocional de fondo */}
      <EmotionalPulse emotion={emotion} />
      
      {/* Contenido íntegro de la aplicación */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>

      {/* Puntero orgánico interactivo de alta jerarquía */}
     {/* <OrganicCursor emotion={emotion} /> */}
    </div>
  );
};

export const SensoryOrchestrator: React.FC<SensoryOrchestratorProps> = ({ children, emotion }) => {
  return (
    <SensoryProvider>
      <CoreOrchestrator emotion={emotion}>
        {children}
      </CoreOrchestrator>
    </SensoryProvider>
  );
};