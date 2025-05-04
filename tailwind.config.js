/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        HomePage: "url('/src/assets/HomePage.svg')", // Corrected path
        CarHomePage: "url('/src/assets/car.svg')",
        CarBlack: "url('/src/assets/carblack.svg')",
        CarUser: "url('/src/assets/carUser.svg')",
        bengkelBg:"url('/src/assets/bengkelBackground.svg')",
      },
    },
  },
  plugins: [],
};
