/** @type {import('tailwindcss').Config} */

const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        mont: ["var(--font-mont)", ...fontFamily.sans],
      },
      colors: {
        dark: "#1c2034",
        light: "#c7d8eb",
        primary: "#f02e65", // 240,86,199
        primaryDark: "#02e4cf", // 80,230,217#02e4cf
        pink: {
          50: "#ffe5ee",
          100: "#fabacc",
          200: "#f18fab",
          300: "#e96289",
          400: "#e23667",
          500: "#c91d4e",
          600: "#9d153c",
          700: "#710c2b",
          800: "#460519",
          900: "#1d0009",
        },
        blgr: {
          50: "#d9fdff",
          100: "#adf1ff",
          200: "#7fe7fb",
          300: "#50dcf8",
          400: "#24d2f5",
          500: "#0ab9db",
          600: "#0090ab",
          700: "#00677c",
          800: "#003f4c",
          900: "#00171c",
        },
      },
      animation: {
        "spin-slow": "spin 15s linear infinite",
      },
      backgroundImage: {
        circularLight:
          "repeating-radial-gradient(rgba(0,0,0,0.4) 2px,#c7d8eb 5px,#c7d8eb 100px)",

        circularDark:
          "repeating-radial-gradient(rgba(255,255,255,0.5) 2px,rgb(28, 32, 52) 8px,rgb(28, 32, 52) 100px)",

        circularLightLg:
          "repeating-radial-gradient(rgba(0,0,0,0.4) 2px,#c7d8eb 5px,#c7d8eb 80px)",

        circularDarkLg:
          "repeating-radial-gradient(rgba(255,255,255,0.5) 2px,rgb(28, 32, 52) 8px,rgb(28, 32, 52) 80px)",

        circularLightMd:
          "repeating-radial-gradient(rgba(0,0,0,0.4) 2px,#c7d8eb 5px,#c7d8eb 60px)",

        circularDarkMd:
          "repeating-radial-gradient(rgba(255,255,255,0.5) 2px,rgb(28, 32, 52) 8px,rgb(28, 32, 52) 60px)",

        circularLightSm:
          "repeating-radial-gradient(rgba(0,0,0,0.4) 2px,#c7d8eb 5px,#c7d8eb 40px)",

        circularDarkSm:
          "repeating-radial-gradient(rgba(255,255,255,0.5) 2px,rgb(28, 32, 52) 4px,rgb(28, 32, 52) 40px)",
      },
    },
    screens: {
      "2xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }

      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "767px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }

      xs: { max: "479px" },
      // => @media (max-width: 479px) { ... }
    },
  },
  plugins: [],
};
