/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      spacing: {
        97: "97px",
      },
      fontFamily: {
        jakartaLight: ["JakartaLight", "cursive"],
        jakartaBold: ["JakartaBold", "cursive"],
        jakartaSemi: ["JakartaSemiBold", "cursive"],
      },
      colors: {
        mainPurple: "#635FC7",
        lightPurple: "#635FC71A",
        mainPurpleHover: "#A8A4FF",
        lightPurpleHover: "rgba(99, 95, 199, 0.25)",
        mainRed: "#EA5555",
        mainRedHover: "#FF9898",
        lightGrey: "#F4F7FD",
        mediumGrey: "#828FA3",
        tintedMediumGrey: "rgba(130, 143, 163, 0.25)",
        shadePurple: "rgba(99, 95, 199, 0.1)",
        darkGrey: "#2B2C37",
        darkAsh: "#979797",
        veryDarkGrey: "#20212C",
        darkLines: "#3E3F4E",
      },
      boxShadow: {
        card: "0 4px 6px 0 rgba(54,78,126,0.1015)",
      },
      gridTemplateColumns: {
        autoRepeat: "repeat(auto-fit, minmax(280px, 1fr))",
      },
      screens: {
        mobile: "320px",
        tablet: "481px",
        laptop: "789px",
      },
    },
  },
  plugins: [],
};
