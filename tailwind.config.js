/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'salt-yellow': '#F9C526',
        'salt-black': '#000000',
        'salt-white': '#FFFFFF',
        'gorn-pink': '#f946b2',
        'gorn-cyan': '#01f2f3',
        'gorn-cream': '#fcf6d2',
      },
    },
  },
  plugins: [],
}

