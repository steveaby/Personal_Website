/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: '#07090e',
        'dark-surface': 'rgba(14, 20, 33, 0.85)',
        'cyan-neon': '#00f3ff',
        'purple-neon': '#a855f7',
        'emerald-neon': '#10b981',
      },
      fontFamily: {
        main: ['Outfit', 'sans-serif'],
        heading: ['Space Grotesk', 'Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}
