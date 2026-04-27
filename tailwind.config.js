/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans:  ['"STIX Two Text"', 'Georgia', 'serif'],
        serif: ['"STIX Two Text"', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
