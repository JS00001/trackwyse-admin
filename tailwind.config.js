/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#393E40",
          200: "#25292A"
        },
        gray: {
          100: "#f9fafb",
          200: "#DBDBDB",
          300: "#CCCCCC",
          400: "#8B9396"
        }
      },
      borderRadius: {
        "md": "0.25rem"
      }
    },
  },
  plugins: [],
}