/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        'bold-red': '#DC143C',
        'ink-black': '#1a1a1a',
        'paper-white': '#faf9f6',
      },
    },
  },
  plugins: [],
}
