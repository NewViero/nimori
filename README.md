# NIMORI ✦
### _Un santuario emocional interactivo_

> Una experiencia sensorial viva. No una app convencional.

---

## 🌌 ¿Qué es NIMORI?

NIMORI es un ecosistema emocional digital — un universo inmersivo diseñado para acompañarte, calmarte, y ayudarte a conectar con tus emociones a través de experiencias sensoriales únicas.

---

## 🚀 Instalación

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar en desarrollo
npm run dev

# 3. Abrir en el navegador
# http://localhost:3000
```

---

## 📁 Estructura del Proyecto

```
nimori/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout Next.js
│   │   └── page.tsx            # Router de módulos
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppLayout.tsx   # Layout con cursor, partículas, fondo
│   │   │   └── Navigation.tsx  # Navegación lateral animada
│   │   ├── mascot/
│   │   │   └── NimoriMascot.tsx # Mascota SVG animada con emociones
│   │   ├── modules/
│   │   │   ├── SanctuaryModule.tsx  # Pantalla principal / santuario
│   │   │   ├── EscribeModule.tsx    # Diario emocional
│   │   │   ├── EscuchaModule.tsx    # Terapia sonora
│   │   │   ├── RespiraModule.tsx    # Técnicas de respiración
│   │   │   ├── SienteModule.tsx     # Experiencias sensoriales
│   │   │   └── PlaceholderModules.tsx # Dibuja, Recuerda, etc.
│   │   └── ui/
│   │       └── ParticleBackground.tsx # Canvas de partículas
│   ├── hooks/
│   │   ├── useCursor.ts         # Cursor personalizado suave
│   │   └── useParticles.ts      # Sistema de partículas canvas
│   ├── lib/
│   │   └── utils.ts             # Helpers y config de módulos
│   ├── store/
│   │   └── nimoriStore.ts       # Estado global (Zustand)
│   └── styles/
│       └── globals.css          # Variables CSS, animaciones, efectos
├── public/
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## 🎨 Módulos

| Módulo | Estado | Descripción |
|--------|--------|-------------|
| ✦ Santuario | ✅ Completo | Pantalla principal viva con selector emocional |
| ✍ Escribe | ✅ Completo | Diario emocional con prompts y tipos de entrada |
| ◉ Escucha | ✅ Completo | Terapia sonora con visualizador de ondas |
| ○ Respira | ✅ Completo | 4 técnicas de respiración guiada |
| ◎ Siente | ✅ Completo | 6 experiencias sensoriales visuales |
| ◈ Dibuja | 🚧 En desarrollo | Espacio artístico con acuarela viva |
| ⋆ Recuerda | 🚧 En desarrollo | Biblioteca emocional y constelaciones |
| ◇ Recrea | 🚧 En desarrollo | Historias y homenajes con IA |
| ♡ Huellas | 🚧 En desarrollo | Memoriales para mascotas |
| ✿ Compañero | 🚧 En desarrollo | Nimori como sistema vivo |

---

## 🧠 Estado Global (Zustand)

```typescript
// Acceder al store
import { useNimoriStore } from '@/store/nimoriStore'

const { emotion, setEmotion, nimoriMood, setNimoriMood } = useNimoriStore()
```

**Estado disponible:**
- `activeModule` — módulo activo
- `emotion` — emoción del usuario
- `nimoriMood` — estado emocional de la mascota
- `audioEnabled` — audio activado
- `particlesEnabled` — partículas activadas
- `timeOfDay` — momento del día (afecta visual)
- `getEmotionColor()` — color basado en emoción actual
- `getEmotionGlow()` — glow RGBA basado en emoción

---

## 🔮 Tecnologías

- **Next.js 14** + **TypeScript**
- **Framer Motion** — animaciones cinematográficas
- **Zustand** — estado global emocional
- **Tailwind CSS** — sistema de diseño personalizado
- **Canvas API** — sistema de partículas
- **SVG animado** — mascota Nimori

---

## 🎭 Paleta Emocional

```css
--void:      #05030f  /* Fondo profundo */
--amethyst:  #6b35c8  /* Primario violeta */
--lavender:  #9b6ee8  /* Lavanda */
--lilac:     #c4a0f5  /* Lila suave */
--rose:      #ff6eb4  /* Rosa neón */
--aqua:      #4fc3f7  /* Azul cristal */
--teal:      #26c6da  /* Verde-azul */
--gold:      #ffd54f  /* Dorado cálido */
```

---

## 💫 Próximos pasos

1. Integrar **Firebase/Supabase** para persistencia
2. Completar módulo **Dibuja** con Canvas API
3. Implementar **Three.js** en el Santuario
4. Sistema de **autenticación** suave
5. Módulo **Recrea** con API de IA
6. **PWA** para uso mobile como app nativa

---

_NIMORI — v0.1 · Hecho con amor y código_
