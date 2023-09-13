/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class', '[class="dark"]'],
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  prefix: 'tw-',
  theme: {
    extend: {}
  },
  plugins: []
}
