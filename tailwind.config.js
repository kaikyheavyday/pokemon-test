/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FFCB05",
        grey: "#666666",
        primaryLight: "#fff4e3",
        primaryText: "#FFAE33;",
      },
    },
  },
  plugins: [],
};
