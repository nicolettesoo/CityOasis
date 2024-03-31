/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  './client/components/App.jsx', 'index.html', './client/components/Map.jsx'],
  theme: {
    extend: {
      backgroundImage: {
        'hero': "url('background.jpeg')",
      },
  }
  },
  plugins: [],
}