/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'montserrat': ['Monsterrat', 'sans-serif'],
      },
      colors: {
        'cd-pumpkin': '#EE7B30',
        'cd-cblue': '#8FC0A9',
        'cd-ruby': '#8B2635',
      }
    },
  },
  plugins: [],
}
