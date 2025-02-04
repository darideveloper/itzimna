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
        'white': '#fefefe',
        'yellow': '#a27c3b',
        'black': '#010d04',
        'blue-light': '#7adcad',
        'grey': '#f5f5f5',
      },
    },
  },
  plugins: [],
};
