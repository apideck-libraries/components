const deepMerge = require('deepmerge')

const apideckComponentsConfig = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f6f7fe',
          100: '#f2f3fd',
          200: '#e0e1fa',
          300: '#c9c8f4',
          400: '#aba4ea',
          500: '#9182de',
          600: '#775ad8',
          700: '#6434d5',
          800: '#5922b9',
          900: '#5a1aa8'
        }
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
}

const arrayMerge = (destinationArray, sourceArray) => {
  return destinationArray.concat(sourceArray).reduce((acc, cur) => {
    if (acc.includes(cur)) return acc
    return [...acc, cur]
  }, [])
}

// Takes a Tailwind configuration object and merges it with the current configuration
const tailwindConfigWrapper = (tailwindConfig) => {
  return deepMerge(apideckComponentsConfig, tailwindConfig, { arrayMerge })
}

module.exports = tailwindConfigWrapper
