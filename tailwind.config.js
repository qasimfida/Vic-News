/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        red: 'rgb(135, 14, 30)',
        yellow: 'rgb(251, 249, 201)',
        orange: 'rgb(224, 171, 116)',
        darkGrey: '#232323'
      },
    },
  },
  plugins: [],
}
