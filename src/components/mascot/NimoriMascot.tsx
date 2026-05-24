'use client'
import { motion, useAnimation } from 'framer-motion'
import { useEffect } from 'react'
import { useNimoriStore, Emotion } from '@/store/nimoriStore'

const MOOD_EYES: Record<Emotion, { cy: number; rx: number; ry: number; blink?: boolean }> = {
  neutral:   { cy: 0,    rx: 5,   ry: 6   },
  calm:      { cy: 1,    rx: 5,   ry: 5   },
  joy:       { cy: -1,   rx: 6,   ry: 7   },
  love:      { cy: 0,    rx: 5,   ry: 6   },
  melancholy:{ cy: 2,    rx: 4,   ry: 4   },
  wonder:    { cy: -2,   rx: 7,   ry: 8   },
  peace:     { cy: 1,    rx: 5,   ry: 3   },
}

const MOOD_COLORS: Record<Emotion, string> = {
  neutral:   '#c4a0f5',
  calm:      '#4fc3f7',
  joy:       '#ffd54f',
  love:      '#ff6eb4',
  melancholy:'#6b35c8',
  wonder:    '#ff9ed8',
  peace:     '#26c6da',
}

interface Props {
  size?: number
  showAura?: boolean
}

export function NimoriMascot({ size = 200, showAura = true }: Props) {
  const { nimoriMood, nimoriAnimating, setNimoriMood } = useNimoriStore()
  const controls = useAnimation()
  const color = MOOD_COLORS[nimoriMood]
  const eyes = MOOD_EYES[nimoriMood]

  useEffect(() => {
    if (nimoriAnimating) {
      controls.start({
        scale: [1, 1.15, 0.95, 1.1, 1],
        rotate: [0, -5, 5, -3, 0],
        transition: { duration: 0.8, ease: 'easeInOut' },
      })
    }
  }, [nimoriAnimating, controls])

  return (
    <motion.div
      className="relative inline-flex items-center justify-center select-none"
      animate={controls}
      style={{ width: size, height: size }}
    >
      {/* Aura rings */}
      {showAura && (
        <>
          {[1.8, 1.5, 1.2].map((scale, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: size * scale,
                height: size * scale,
                background: `radial-gradient(circle, ${color}22 0%, transparent 70%)`,
                border: `1px solid ${color}18`,
              }}
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.5,
              }}
            />
          ))}
        </>
      )}

      {/* Main SVG body */}
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <defs>
          <radialGradient id="body-grad" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor={color} stopOpacity="0.9" />
            <stop offset="60%" stopColor="#3d1a78" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#130a2e" stopOpacity="1" />
          </radialGradient>
          <radialGradient id="glow-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={color} stopOpacity="0.4" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="inner-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* Outer glow */}
        <circle cx="100" cy="105" r="75" fill="url(#glow-grad)" />

        {/* Body */}
        <motion.ellipse
          cx="100" cy="110" rx="55" ry="62"
          fill="url(#body-grad)"
          filter="url(#glow)"
          animate={{ ry: [62, 64, 62] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Body shimmer */}
        <ellipse cx="80" cy="85" rx="18" ry="22"
          fill="white" opacity="0.06" transform="rotate(-20, 80, 85)" />

        {/* Ears */}
        <motion.ellipse
          cx="58" cy="58" rx="14" ry="20"
          fill={color} opacity="0.7"
          filter="url(#inner-glow)"
          transform="rotate(-25, 58, 58)"
          animate={{ rotate: [-25, -28, -25] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.ellipse
          cx="142" cy="58" rx="14" ry="20"
          fill={color} opacity="0.7"
          filter="url(#inner-glow)"
          transform="rotate(25, 142, 58)"
          animate={{ rotate: [25, 28, 25] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Inner ears */}
        <ellipse cx="58" cy="60" rx="7" ry="12" fill={color} opacity="0.9"
          transform="rotate(-25, 58, 60)" />
        <ellipse cx="142" cy="60" rx="7" ry="12" fill={color} opacity="0.9"
          transform="rotate(25, 142, 60)" />

        {/* Eyes */}
        <motion.ellipse
          cx="82" cy={100 + eyes.cy} rx={eyes.rx} ry={eyes.ry}
          fill={color} filter="url(#glow)"
          animate={{ ry: [eyes.ry, 0.5, eyes.ry] }}
          transition={{
            duration: 0.15,
            repeat: Infinity,
            repeatDelay: 4 + Math.random() * 2,
            ease: 'easeInOut',
          }}
        />
        <motion.ellipse
          cx="118" cy={100 + eyes.cy} rx={eyes.rx} ry={eyes.ry}
          fill={color} filter="url(#glow)"
          animate={{ ry: [eyes.ry, 0.5, eyes.ry] }}
          transition={{
            duration: 0.15,
            repeat: Infinity,
            repeatDelay: 4 + Math.random() * 2,
            ease: 'easeInOut',
            delay: 0.05,
          }}
        />

        {/* Eye shine */}
        <circle cx="86" cy={97 + eyes.cy} r="1.5" fill="white" opacity="0.9" />
        <circle cx="122" cy={97 + eyes.cy} r="1.5" fill="white" opacity="0.9" />

        {/* Mouth / expression based on mood */}
        {nimoriMood === 'joy' && (
          <path d="M88 116 Q100 126 112 116" stroke={color} strokeWidth="2.5"
            strokeLinecap="round" fill="none" />
        )}
        {nimoriMood === 'love' && (
          <path d="M90 116 Q100 128 110 116" stroke={color} strokeWidth="2.5"
            strokeLinecap="round" fill="none" />
        )}
        {nimoriMood === 'melancholy' && (
          <path d="M90 122 Q100 114 110 122" stroke={color} strokeWidth="2"
            strokeLinecap="round" fill="none" />
        )}
        {(nimoriMood === 'neutral' || nimoriMood === 'calm' || nimoriMood === 'peace') && (
          <path d="M90 118 Q100 124 110 118" stroke={color} strokeWidth="2"
            strokeLinecap="round" fill="none" />
        )}
        {nimoriMood === 'wonder' && (
          <circle cx="100" cy="120" r="4" stroke={color} strokeWidth="2" fill="none" />
        )}

        {/* Floating orbs */}
        <motion.circle
          cx="140" cy="90" r="5"
          fill={color} opacity="0.6"
          animate={{ cx: [140, 148, 143, 140], cy: [90, 84, 96, 90] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          filter="url(#glow)"
        />
        <motion.circle
          cx="60" cy="95" r="3.5"
          fill={color} opacity="0.5"
          animate={{ cx: [60, 54, 58, 60], cy: [95, 90, 100, 95] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          filter="url(#glow)"
        />

        {/* Tail */}
        <motion.path
          d="M100 168 Q120 180 130 172 Q140 164 125 158 Q115 154 105 162"
          fill={color} opacity="0.5"
          animate={{ d: [
            "M100 168 Q120 180 130 172 Q140 164 125 158 Q115 154 105 162",
            "M100 168 Q122 182 132 174 Q142 166 127 160 Q117 156 107 164",
            "M100 168 Q120 180 130 172 Q140 164 125 158 Q115 154 105 162",
          ]}}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.svg>

      {/* Sparkles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 4 + i * 1.5,
            height: 4 + i * 1.5,
            background: color,
            boxShadow: `0 0 8px ${color}`,
          }}
          animate={{
            x: [0, Math.cos(i * 72 * Math.PI / 180) * 70],
            y: [0, Math.sin(i * 72 * Math.PI / 180) * 70],
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: i * 0.5,
            ease: 'easeOut',
          }}
        />
      ))}
    </motion.div>
  )
}
