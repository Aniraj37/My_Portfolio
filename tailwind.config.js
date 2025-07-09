/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{js,jsx,ts,tsx}"];
export const mode = "jit";

export const theme = {
  extend: {
    colors: {
      primary: "#071307",
      secondary: "#f3fff3",
      tertiary: "#091d0a",
      "black-100": "#4a774d3b",
      "black-200": "#022f12",
      "white-100": "#f3f3f3",
    },
    boxShadow: {
      card: "0px 35px 120px -15px #211e35",
    },
    screens: {
      xs: "450px",
    },
    backgroundImage: {
      "hero-pattern": "url('/src/assets/herobg.png')",
    },
    keyframes: {
      scrollDot: {
        "0%, 100%": { transform: "translateY(0)" },
        "50%": { transform: "translateY(24px)" },
      },
    },
    animation: {
      scrollDot: "scrollDot 2s ease-in-out infinite",
    },
  },
};

export const plugins = [];
