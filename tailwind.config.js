/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        netflix: {
          red: '#E50914',
          black: '#141414',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-in-delay': 'fadeIn 0.8s ease-out 0.3s forwards',
        'fade-in-delay-2': 'fadeIn 0.8s ease-out 0.6s forwards',
      },
    },
  },
  plugins: [],
};