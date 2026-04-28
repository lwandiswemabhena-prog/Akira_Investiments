/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          turmeric: "#FFB800",
          paprika: "#E34A21",
          chili: "#B22222",
          cream: "#FFFDF5",
          charcoal: "#1A1A1A",
          gold: "#D4AF37",
        }
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'grain': "url('https://www.transparenttextures.com/patterns/stardust.png')",
      }
    },
  },
  plugins: [],
}
