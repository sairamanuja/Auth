/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Path to all your components
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui'], // Add your sans-serif font here
      },
      colors: {
        customPurple: '#2c2638', // Custom purple color
        ct: '#362f44',            // Custom color ct
        pt: '#8339c2',            // Custom color pt
        cc: '#8c3cd1',            // Custom color cc
      },
    },
  },
  plugins: [],
};
