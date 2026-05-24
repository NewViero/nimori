"use client";
import React, { createContext, useContext, useState } from 'react';

type EmotionalTheme = 'Aurora' | 'Nocturno' | 'Bosque' | 'Nebulosa' | 'Océano';

interface ThemeContextProps {
  theme: EmotionalTheme;
  setTheme: (theme: EmotionalTheme) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<EmotionalTheme>('Nebulosa');

  // Mapeo de estilos ambientales cinemáticos
  const themeStyles = {
    Aurora: "from-[#081C15] via-[#1B4332] to-[#0d1b2a] [--glow:#40916c] [--particle:#52b788]",
    Nocturno: "from-[#0B0C10] via-[#1F2833] to-[#000000] [--glow:#66FCF1] [--particle:#45A29E]",
    Bosque: "from-[#111E15] via-[#2C3E35] to-[#1A2520] [--glow:#A3B18A] [--particle:#344E41]",
    Nebulosa: "from-[#0F0C20] via-[#15102A] to-[#06040A] [--glow:#8A2BE2] [--particle:#FF007F]",
    Océano: "from-[#03045E] via-[#023E8A] to-[#0077B6] [--glow:#00B4D8] [--particle:#90E0EF]",
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`transition-all duration-1000 bg-gradient-to-tr min-h-screen relative overflow-hidden ${themeStyles[theme]}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useEmotionalTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useEmotionalTheme debe usarse dentro de ThemeProvider");
  return context;
};