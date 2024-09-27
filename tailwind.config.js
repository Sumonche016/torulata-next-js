/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      height: {
        "calc-mobile": "calc(80vh - 4rem)",
        "calc-desktop": "calc(80vh - 7rem)",
      },
      colors: {
        primary: "#81D742",
        textPrimary: "#333",
        dark: "#212529",
        cartColor: "#434343",
        borderPrimary: "#ededed",
        borderDark: "#c4cdd5",
        card: "#c4cdd5",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        card: "rgba(145, 158, 171, 0.25) 0px 6px 16px",
        medium:
          "rgba(145, 158, 171, 0.2) 0px 3px 1px -2px, rgba(145, 158, 171, 0.14) 0px 2px 2px 0px, rgba(145, 158, 171, 0.12) 0px 1px 5px 0px",
      },
    },
  },
  plugins: [],
};
