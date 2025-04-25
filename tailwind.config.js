/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // Add this line to disable dark mode variants
  theme: {
    extend: {
      colors: {
        'green': '#39DB4A',
        'red' : '#FF6868',
        'secondary' :'#555',
        'primaryBG' : '#FCFCFC'
      },
     
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"], // Force daisyUI to use only light theme
    darkTheme: "light", // Set the dark theme to light as well
  }
}
