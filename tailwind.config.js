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
  ],
  theme: {
    extend: {
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
      },
      animation: {
        nesGlitchPop: 'nesGlitchPop 2s infinite ease-in-out',
      },
    },
  },
  plugins: [],
};
