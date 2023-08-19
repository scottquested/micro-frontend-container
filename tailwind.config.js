/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './public/index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    '../micro-frontend-components/src/**/*.{js,ts,jsx,tsx}',
    '../micro-frontend-app-1/src/**/*.{js,ts,jsx,tsx}',
    '../micro-frontend-app-2/src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {}
  },
  plugins: []
};
