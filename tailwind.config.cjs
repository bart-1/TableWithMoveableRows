/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkmode: false,
  theme: {
    extend: {
      colors: {
        darksky: {
          max: "#121825",
          mid: "#14203E",
          min: "#142064",
        },
        led: {
          orange: {
            on: "#FE5800",
            off: "#992F00",
          },
          green: {
            on: "#00F500",
            off: "#004500",
          },
          blue: {
            on: "#0095FF",
            off: "#0000C3",
          },
          red: {
            on: "#FF0032",
            off: "#C50000",
          },
        },
      },
      maxHeight: {
        "80vh": "80vh",
      },
      fontSize: {
        xxs: ["10px", "12px"],
      },
      gridTemplateRows: {
        8: "repeat(8, minmax(0, 1fr))",
      },
    },
  },
  plugins: [],
};
