/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        shopora: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1', // Primary brand
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        brandSecondary: '#8b5cf6',
        brandSuccess: '#10b981',
        brandWarning: '#f59e0b',
        brandError: '#ef4444',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 10px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 10px 25px -5px rgba(99, 102, 241, 0.12), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
        'dark-card': '0 2px 10px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
}
