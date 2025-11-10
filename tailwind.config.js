/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  plugins: [],
  safelist: ['fa', 'fas', 'fa-solid', 'fa-check', 'fa-star', 'fab', 'fa-google-drive']
}
