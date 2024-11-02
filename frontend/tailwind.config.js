/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "green-gradient": "linear-gradient(180deg, #D3FFE7, #EFFFF6)",
      },
      backgroundColor: {
        "main-gray": "#F8FAFF",
        "main-purple": "#5932EA",
      },
      colors: {
        "light-gray": "#9197B3",
      },
    },
  },
  plugins: [],
};
