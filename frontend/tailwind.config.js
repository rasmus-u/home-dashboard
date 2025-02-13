/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontSize: {
        '10xl': '10rem'
      },
      colors: {
        danger: '#E26D5C',
        confirmation: '#1848FF',
        background: {
          DEFAULT: '#080C17',
          light: '#24304B'
        },
        widgets: '#0F172B',
        secondary: '#06D7E3',
        primary: '#FFFFFF',
        tram_green: '#359861',
        bus_blue: '#0086CE',
        metro_red: '#C33818',
        alepa_yellow: '#FFD074',
        rain: '#5BC1F8'
      }
    },
  },
  plugins: [],
}

