/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: { 
        'Cinzel' : ['Cinzel', 'serif'],
        'Inter' : ['Inter', 'sans-serif'],
        'raleway' : ['Raleway', 'sans-serif'],
      }
    },
  },
  plugins: [],
} 