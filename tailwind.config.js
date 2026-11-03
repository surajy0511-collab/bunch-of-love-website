/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#F8F5ED',
        ink: '#17120F',
        gold: { DEFAULT: '#B89A62', deep: '#8A6F3E', light: '#D4BC8C' },
        blush: '#E8C5CC',
        sage: '#A2A995',
        beige: '#EDE5D8',
        cream: '#FEFAEE',
      },
      fontFamily: {
        serif: ['"Bodoni Moda"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
