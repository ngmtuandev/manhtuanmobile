/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts}", "./public/index.html"],
  theme: {
    extend: {
      backgroundColor: {
        bg_main: "rgb(255,0,29)",
        bg_secondary: "rgb(255,136,0)",
        bg_secondary2: "rgb(255,186,0)",
        bg_gray: "rgb(245,245,250)",
      },
    },
  },
  plugins: [],
};
