/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink:  '#111111',
        mute: '#6b7280',
        line: '#e5e7eb', // divider
      },
      borderRadius: {
        lg: '10px',
      },
      boxShadow: {
        card: '0 8px 24px rgba(0,0,0,0.06)',
      },
      fontFamily: {
        serif: ['var(--font-playfair)'],
        sans:  ['var(--font-inter)'],
      },
    },
  },
  plugins: [],
}
