/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  prefix: "tw-",
  content: ["./views/**/*.ejs", "./public/js/views/**/*.js"],
  theme: {
    extend: {
      colors: {
        redLight: "#f3dad9",
        red1: "#e40013",
        red2: "#bb0013",
        milk: "#e2e4e8",
        dark: "#1a1c23",
      },
    },
  },
  plugins: [],
};
