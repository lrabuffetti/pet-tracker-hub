/** @type {import('tailwindcss').Config} */
const path = require('path')
const nativewind = require('nativewind/preset')

const workspaceRoot = path.resolve(__dirname, '../../..')

module.exports = {
  presets: [nativewind],
  content: [
    path.join(__dirname, 'src/**/*.{js,jsx,ts,tsx}'),
    path.join(workspaceRoot, 'apps/mobile/app/**/*.{js,jsx,ts,tsx}'),
    path.join(workspaceRoot, 'apps/mobile/components/**/*.{js,jsx,ts,tsx}'),
    path.join(workspaceRoot, 'apps/mobile/constants/**/*.{js,jsx,ts,tsx}'),
    path.join(workspaceRoot, 'apps/web/app/**/*.{js,jsx,ts,tsx}'),
    path.join(workspaceRoot, 'apps/web/components/**/*.{js,jsx,ts,tsx}'),
    path.join(workspaceRoot, 'apps/web/src/**/*.{js,jsx,ts,tsx}'),
    path.join(workspaceRoot, 'apps/web/services/**/*.{js,jsx,ts,tsx}'),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
