/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0a0a0a',
        'dark-surface': '#111111',
        'dark-card': '#1a1a1a',
        'dark-hover': '#222222',
        'dark-border': 'rgba(255, 255, 255, 0.1)',
      },
      fontFamily: {
        sans: ['Orbitron', 'sans-serif'],
        display: ['Bruno Ace SC', 'Orbitron', 'sans-serif'],
      },
      backgroundImage: {
        'dark-gradient': 'linear-gradient(to bottom right, #0a0a0a, #1a1a1a)',
      },
    },
  },
  plugins: [],
}
