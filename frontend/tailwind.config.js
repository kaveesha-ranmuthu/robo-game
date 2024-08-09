/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        dmsans: ['"DM Sans"', "sans-serif"],
      },
      colors: {
        "light-gray": "#EAEAEA",
        "dark-gray": "#333333",
        orange: "#e15b1d",
      },
    },
  },
  plugins: [],
};
