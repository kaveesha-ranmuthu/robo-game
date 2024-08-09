import { transform } from "typescript";

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
      keyframes: {
        fade: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        fade: "fade 1.5s ease-in-out",
      },
    },
  },
  plugins: [],
};
