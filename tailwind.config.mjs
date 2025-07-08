/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  darkMode: "data-theme=dark", 
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark"],
  },
}