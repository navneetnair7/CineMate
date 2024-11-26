/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",       // Include your root HTML file
    "./src/**/*.{js,jsx,ts,tsx}", // Include all JavaScript and JSX/TSX files
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
}

