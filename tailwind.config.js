/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      colors: {
        nimori: {
          void: '#05030f',
          deep: '#0a0520',
          dusk: '#130a2e',
          nebula: '#1e0f45',
          violet: '#3d1a78',
          amethyst: '#6b35c8',
          lavender: '#9b6ee8',
          lilac: '#c4a0f5',
          rose: '#ff6eb4',
          bloom: '#ff9ed8',
          aqua: '#4fc3f7',
          teal: '#26c6da',
          gold: '#ffd54f',
          ember: '#ff8a65',
          mist: 'rgba(155,110,232,0.08)',
          glow: 'rgba(255,110,180,0.15)',
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'orbit': 'orbit 20s linear infinite',
        'drift': 'drift 15s ease-in-out infinite',
        'breathe': 'breathe 4s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'particles': 'particles 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-12px) rotate(1deg)' },
          '66%': { transform: 'translateY(-6px) rotate(-1deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', filter: 'blur(20px)' },
          '50%': { opacity: '1', filter: 'blur(30px)' },
        },
        orbit: {
          from: { transform: 'rotate(0deg) translateX(120px) rotate(0deg)' },
          to: { transform: 'rotate(360deg) translateX(120px) rotate(-360deg)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '25%': { transform: 'translate(10px, -15px) scale(1.05)' },
          '50%': { transform: 'translate(-8px, -25px) scale(0.98)' },
          '75%': { transform: 'translate(-15px, -10px) scale(1.02)' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.8' },
          '50%': { transform: 'scale(1.08)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        particles: {
          '0%': { transform: 'translate(0,0) scale(1)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '0.8' },
          '100%': { transform: 'translate(var(--tx,20px), var(--ty,-80px)) scale(0)', opacity: '0' },
        }
      },
      boxShadow: {
        'nimori': '0 0 30px rgba(107,53,200,0.3), 0 0 60px rgba(107,53,200,0.1)',
        'rose-glow': '0 0 30px rgba(255,110,180,0.4), 0 0 60px rgba(255,110,180,0.15)',
        'teal-glow': '0 0 30px rgba(79,195,247,0.3)',
        'inner-glow': 'inset 0 0 30px rgba(107,53,200,0.2)',
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
}
