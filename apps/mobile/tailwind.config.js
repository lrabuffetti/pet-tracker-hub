/** @type {import('tailwindcss').Config} */
const path = require("path");
const nativewind = require("nativewind/preset");

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "../..");

module.exports = {
  presets: [nativewind],
  content: [
    path.join(workspaceRoot, "apps/mobile/app/**/*.{js,jsx,ts,tsx}"),
    path.join(workspaceRoot, "apps/mobile/components/**/*.{js,jsx,ts,tsx}"),
    path.join(workspaceRoot, "apps/mobile/constants/**/*.{js,jsx,ts,tsx}"),
    path.join(workspaceRoot, "apps/packages/ui/src/**/*.{js,jsx,ts,tsx}"),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
