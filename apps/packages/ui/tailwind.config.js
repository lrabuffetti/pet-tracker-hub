/** @type {import('tailwindcss').Config} */
const nativewind = require('nativewind/preset')

module.exports = {
  presets: [nativewind],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "../../apps/web/**/*.{js,jsx,ts,tsx}",
    "../../apps/mobile/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
