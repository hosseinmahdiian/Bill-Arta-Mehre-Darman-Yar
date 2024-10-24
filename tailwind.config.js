/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        IRANSans: "IRANSans",
        IRANSans_Black: "IRANSans_Black",
        IRANSans_Bold: "IRANSans_Bold",
        IRANSans_Light: "IRANSans_Light",
        IRANSans_Medium: "IRANSans_Medium",
        IRANSans_UltraLight: "IRANSans_UltraLight",
        IRANSans_FaNum: "IRANSansFaNum",
      },
      screens: {
        es: "370px",
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("child", "& > *");
      addVariant("child-hover", "& > *:hover");
    },
  ],
};
