/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'index.html', 
    "./client/**/*.{html,js,ts,jsx,tsx}"
  ],
  
  theme: {
    extend: {
      backgroundImage: {
        'hero': "url('background.jpeg')",
      },
  }
  },
  plugins: [],
}