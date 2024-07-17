/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        danger: '#E26D5C',
        confirmation: '#1848FF',
        background_white: '#FDFFFC',
        primary: {
          light: '#F8F8F8',
          DEFAULT: '#E2E2E2',
          dark: '#FFD074'
        },
        tram_green: '#359861',
        bus_blue: '#0086CE'
      }
    },
  },
  plugins: [],
}

