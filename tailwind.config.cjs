export default {
  content: [
    "./index.html",
    "./src//*.{js,ts,jsx,tsx,cjs}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#550ee0',
        secondary: '#f433ab',
        tertiary: '#ff6b2b',
        background: '#000000', // Black background color
        text: '#ffffff', // White text color
        // Add more colors as needed
      },
      fontFamily: {
        rubik: ['Rubik', 'sans-serif'],
        // Add more font families as needed
      },
    },
  },
  plugins: [],
}