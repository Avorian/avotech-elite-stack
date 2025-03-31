// tailwind.config.js
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte}',
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        'base-100': 'var(--bg-color)',
        'base-content': 'var(--text-color)',
        'accent': 'var(--accent-color)',
      },
    },
  },
  plugins: [],
}
