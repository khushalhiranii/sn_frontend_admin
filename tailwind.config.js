module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#fff",
        "foundation-white-normal-hover": "#e6e6e6",
        "foundation-red-normal": "#aa0542",
        mediumvioletred: {
          "100": "#d12b69",
          "200": "rgba(209, 43, 105, 0.09)",
        },
        black1: "#000",
        gray: {
          "100": "#111",
          "200": "rgba(0, 0, 0, 0.05)",
        },
        "off-white": "#f5f5f5",
        black: "#3c3a36",
        "foundation-blue-normal": "#0166e4",
        darkslategray: {
          "100": "rgba(60, 58, 54, 0.05)",
          "200": "rgba(60, 58, 54, 0)",
        },
        royalblue: "rgba(1, 102, 228, 0.05)",
        dodgerblue: "rgba(38, 140, 255, 0.05)",
      },
      spacing: {},
      fontFamily: {
        roboto: "Roboto",
        inter: "Inter",
      },
    },
    fontSize: {
      base: "1rem",
      sm: "0.875rem",
      lg: "1.125rem",
      "5xl": "1.5rem",
      inherit: "inherit",
    },
    screens: {
      mq850: {
        raw: "screen and (max-width: 850px)",
      },
      mq675: {
        raw: "screen and (max-width: 675px)",
      },
      mq450: {
        raw: "screen and (max-width: 450px)",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
};