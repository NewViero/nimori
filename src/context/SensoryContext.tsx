"use client";

import React, { createContext, useContext, useEffect, useRef } from 'react';
import { useMotionValue, motionValue, MotionValue } from 'framer-motion';

interface SensoryContextType {
  audioAmplitude: MotionValue<number>;
  globalBreathing: MotionValue<number>;
  initAudio: () => void;
}

const SensoryContext = createContext<SensoryContextType | undefined>(undefined);

export const SensoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioAmplitude = useMotionValue(0);
  const globalBreathing = useMotionValue(0);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);

  // 1. Ciclo de Respiración Biológica Global Sincronizada (Tempo de 4 segundos)
  useEffect(() => {
    let startTime = performance.now();
    let animationFrameId: number;

    const updateBreathing = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      // Ondulación matemática perfecta entre 0 y 1 simulando inhalación/exhalación
      const breathingValue = (Math.sin((elapsed * Math.PI) / 2) + 1) / 2;
      globalBreathing.set(breathingValue);
      animationFrameId = requestAnimationFrame(updateBreathing);
    };

    animationFrameId = requestAnimationFrame(updateBreathing);
    return () => cancelAnimationFrame(animationFrameId);
  }, [globalBreathing]);

  // 2. Inicialización Segura del Analizador de Audio (Gatillado por interacción)
  const initAudio = async () => {
    if (audioContextRef.current) return;

    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const audioContext = new AudioContextClass();
      
      // Captura el stream del micrófono o el audio interno del santuario de forma abstracta
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      const source = audioContext.createMediaStreamSource(stream);
      
      // Filtro pasabajos cinematográfico (Efecto NieR/Gris)
      const lowpassFilter = audioContext.createBiquadFilter();
      lowpassFilter.type = 'lowpass';
      lowpassFilter.frequency.setValueAtTime(1000, audioContext.currentTime);

      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 64;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      source.connect(lowpassFilter);
      lowpassFilter.connect(analyser);

      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      dataArrayRef.current = dataArray;

      // Lazo de análisis de audio optimizado por hardware
      const analyze = () => {
        if (!analyserRef.current || !dataArrayRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArrayRef.current);
        
        // Calcular volumen promedio mapeado entre 0 y 1
        let total = 0;
        for (let i = 0; i < dataArrayRef.current.length; i++) {
          total += dataArrayRef.current[i];
        }
        const average = total / dataArrayRef.current.length / 255;
        
        // Aplicar amortiguación suave para evitar picos rígidos
        audioAmplitude.set(audioAmplitude.get() * 0.7 + average * 0.3);
        requestAnimationFrame(analyze);
      };
      
      analyze();
    } catch (err) {
      console.warn("Audio reactivo operando en modo simulación (Permiso denegado/Mobile safe).");
      // Simulación orgánica basada en ruido si no hay micrófono
      const simulateAudio = () => {
        const noise = Math.abs(Math.sin(performance.now() * 0.005) * Math.cos(performance.now() * 0.002));
        audioAmplitude.set(noise * 0.15);
        requestAnimationFrame(simulateAudio);
      };
      simulateAudio();
    }
  };

  return (
    <SensoryContext.Provider value={{ audioAmplitude, globalBreathing, initAudio }}>
      {children}
    </SensoryContext.Provider>
  );
};

export const useSensory = () => {
  const context = useContext(SensoryContext);
  if (!context) throw new Error("useSensory debe usarse dentro de SensoryProvider");
  return context;
};