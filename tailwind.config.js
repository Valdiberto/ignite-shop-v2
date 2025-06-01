/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],

  theme: {
    extend: {
      keyframes: {
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-out-right': {
          '0%': { opacity: '1', transform: 'translateX(0)' },
          '100%': { opacity: '0', transform: 'translateX(100%)' },
        },
      },
      animation: {
        'slide-in-right': 'slide-in-right 300ms ease-out forwards',
        'slide-out-right': 'slide-out-right 300ms ease-in forwards',
      },

      fontFamily: {
        roboto: ['var(--font-roboto)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
