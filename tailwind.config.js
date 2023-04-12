/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['Nunito Sans', 'sans-serif']
    },
    colors: {
      light: {
        elements: '#FFFFFF',
        background: '#FAFAFA',
        text: '#111517',
        input: '#858585'
      },
      dark: {
        elements: '#2B3945',
        background: '#202C37',
        text: '#FFFFFF'
      },
      elements: {
        light: '#FFFFFF',
        dark: '#2B3945'
      },
      background: {
        light: '#FAFAFA',
        dark: '#202C37'
      },
      text: {
        light: '#111517',
        dark: '#FFFFFF'
      }
    },
    extend: {},
  },
  plugins: [],
}

