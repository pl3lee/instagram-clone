/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{html,jsx,tsx}",
    "./node_modules/@rewind-ui/core/dist/theme/styles/*.js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      blue: colors.blue,
      slate: colors.slate,
      red: colors.red,
      purple: colors.purple,
      green: colors.green,
      button1: "#2563eb",
      button2: "#e2e8f0",
      accentBlue: "#2563eb",
      linkBlue: "#3b82f6",
      borderGray: "#e2e8f0",
      backgroundGray: "#262626",
      hoverOverlay: "#1a1a1a",
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwind-scrollbar")({ nocompatible: true }),
    require("@tailwindcss/forms")({
      strategy: "class", // only generate classes
    }),
  ],
};
