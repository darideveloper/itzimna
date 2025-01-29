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
        'green': '#0c2110',
        'green-light': '#8bb138',
        'white': '#fefefe',
        'yellow': '#b79651',
        'black': '#010d04',
        'blue-light': '#7adcad',
      },
    },
  },
  plugins: [],
};
