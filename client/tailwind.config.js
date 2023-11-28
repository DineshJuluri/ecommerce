/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#ff00ed",
          "secondary": "#00f090",
          "accent": "#00cdff",
          "neutral": "#0b0d12",
          "base-100": "#182f34",
          "info": "#008bd8",
          "success": "#00f7c3",
          "warning": "#ff5d00",
          "error": "#ff557b",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}

