/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#005384',
        teal: '#13A3B5',
        lime: '#A2FF59',
      },

      keyframes: {
        fadeSlideUp: {
          "0%": { opacity: 0, transform: "translateY(30px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        fadeSlideUp: "fadeSlideUp 0.8s ease-out",
      },
    },
  },
  plugins: [],
};
