/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        krishi: {
          dark: '#051d14',
          card: '#0a2e22',
          emerald: '#10b981',
          gold: '#f59e0b',
          saffron: '#d97706',
          leaf: '#059669',
          accent: '#34d399',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
