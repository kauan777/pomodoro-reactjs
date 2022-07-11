
/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  darkMode: 'class',
  content: [
      './src/**/*.tsx', './index.html'
    ],
    theme: {
      extend: {
        keyframes: {
          wiggle: {
            '0%': { transform: 'scale(0.9)', opacity: '0' },
            '100%': { transform: 'scale(1)', opacity: '1' },
          },
        },
        fontFamily: {
            sans: 'Poppins, sans-serif'
        },
        colors: {
          gray: {
            100: '#E1E1E6',
            200: '#C4C4CC',
            300: '#8D8D99',
            500: '#323238',
            600: '#272727',
            700: '#121214',
            900: '#09090A'
          }
        },
      },
    },
    plugins: [],
  }
  