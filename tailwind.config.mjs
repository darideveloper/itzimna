/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'green': '#2e4f34',
        'green-light': '#8bb138',
        'green-dark': '#0c2110',
        'green-dark-10': '#0c211010',
        'white': '#fefefe',
        'yellow': '#a27c3b',
        'black': '#010d04',
        'blue-light': '#7adcad',
        'grey': '#f5f5f5',
      },
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'nav': '950px',
      'lg': '1200px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [],
};
