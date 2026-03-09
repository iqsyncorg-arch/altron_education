/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          900: '#7f1010',
          800: '#991b1b',
          700: '#b91c1c',
          600: '#c0392b',
          500: '#e74c3c',
          400: '#ef5350',
          300: '#f87171',
          200: '#fca5a5',
          100: '#fee2e2',
          50: '#fff5f5',
        },
        altron: {
          red: '#C0392B',
          redLight: '#E74C3C',
          dark: '#1a0505',
          darker: '#2d0a0a',
        },
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
