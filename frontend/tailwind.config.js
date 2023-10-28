/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'accent': '#5D5FE6',
        'primary': '#ECF0FB',
        'secondary': '#EFF0F5',
        'bg-primary': '#F8F7FD',
        'bg-secondary': '#FFFFFF',

        'accent-dark': '#5D5FE6',
        'primary-dark': '#2A2A28',
        'secondary-dark': '#404081',
        'bg-primary-dark': '#0A0A0A',
        'bg-secondary-dark': '#29292B',
        'tag-dark': '#4C4749',
        'secondary-icon-dark': '#5D5DE0'
      }
    },
  },
  plugins: [],
}
