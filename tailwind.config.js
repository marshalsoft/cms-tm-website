/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0A1F18',
        leaf: '#3CB371',
        sun: '#FBC02D',
        paper: '#faf9f5',
        sand: '#ECE7DA'
      },
      fontFamily: {
        sans: ['Urbanist', 'system-ui', 'sans-serif'],
        display: ['MuseoModerno', 'Urbanist', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        soft: '0 30px 80px -40px rgba(10,31,24,0.45)'
      }
    }
  },
  plugins: []
};
