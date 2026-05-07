/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          green: '#4E7B38',
          red: '#D64545',
          brown: '#8B6E4E',
          yellow: '#FFD700',
        },
        light: {
          green: '#E8F5E4',
          red: '#FFE8E8',
          brown: '#F5F0EB',
        },
      },
    },
  },
  plugins: [],
}
