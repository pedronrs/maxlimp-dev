/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,css}"],
  theme: {
    extend: {
      boxShadow: {
        "custom-light": "0 2px 10px rgba(0, 0, 0, 0.1)",
        "custom-dark": "0 4px 20px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};
