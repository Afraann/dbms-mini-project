// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // Adjust the path according to your project structure
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        beige: {
          50: '#FDF5E6',   // Very light
          100: '#F5F5DC',  
          200: '#EEE8AA',
          300: '#E5E5C0',  
          400: '#D8D897',
          500: '#CDCDB4'   // Neutral
        },
        brown: {
          400: '#A0522D',
          500: '#804020',
          600: '#8B4513',
          700: '#6B4423',
          800: '#55341A',  // Almost black
        },
      },      
    },
  plugins: [],
  }
}