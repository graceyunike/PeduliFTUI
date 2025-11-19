/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Kamu bisa mendaftarkan warna organisasimu disini supaya kodenya lebih rapi (opsional)
        primary: '#005384', 
        teal: '#13A3B5',
        lime: '#A2FF59',
      }
    },
  },
  plugins: [],
}