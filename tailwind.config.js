export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class", 
  theme: {
    extend: {
      colors: {
        primary: "#050816",
        secondary: "#aaa6c3",
        tertiary: "#151030",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
        space: {
          primary: "#60c565",
          light: "#8AE27E",
          dark: "#3D7A35",
          bg: "#121214",
          secondary: "#1E1F22",
          surface: "#2C2F33",
          textPrimary: "#E0E0E0",
          textSecondary: "#A0A0A0",
          error: "#FF5E57",
        },
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
    },
  },
  plugins: [],
};
