// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte}',
    './public/index.html',
  ],
  safelist: [
    'nes-different-animate',
    'animate-nesGlitchPop',
    'fire-text',
    'pulse-border',
    'animate-riseFade',
    'animate-slowGlitch',
  ],
  theme: {
    extend: {
      fontFamily: {
        nes: ['"Press Start 2P"', 'cursive'],
        cyberpunk: ['Orbitron', 'sans-serif'],
        matrix: ['"Share Tech Mono"', 'monospace'],
      },
      keyframes: {
        nesGlitchPop: {
          '0%, 100%': {
            transform: 'scale(1)',
            color: 'white',
            'text-shadow': 'none',
          },
          '50%': {
            transform: 'scale(1.1) rotate(-1deg)',
            color: '#ff6f61',
            'text-shadow': `
              1px 1px 0 #000,
              -1px -1px 0 #000,
              2px 2px 4px red
            `,
          },
        },
        riseFade: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slowGlitch: {
          '0%, 100%': {
            transform: 'scale(1)',
            color: 'white',
            'text-shadow': 'none',
          },
          '50%': {
            transform: 'scale(1.1) rotate(-1deg)',
            color: '#ff6f61',
            'text-shadow': `
      1px 1px 0 #000,
      -1px -1px 0 #000,
      2px 2px 4px red
    `,
          },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        nesGlitchPop: 'nesGlitchPop 2s infinite ease-in-out',
        fadeIn: 'fadeIn 1.5s ease-in-out',
        float: 'float 3s ease-in-out infinite',
        pulse: 'pulse 2s infinite',
        bounce: 'bounce 2s infinite',
        riseFade: 'riseFade 1.2s ease-out both',
        slowGlitch: 'slowGlitch 5s infinite ease-in-out',
      },
    },
  },
  plugins: [],
};
