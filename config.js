const deepMerge = require('deepmerge')
const apideckConfig = {
  purge: ['./src/**/*.tsx'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        primary: {
          '50': '#f6f7fe',
          '100': '#f2f3fd',
          '200': '#e0e1fa',
          '300': '#c9c8f4',
          '400': '#aba4ea',
          '500': '#9182de',
          '600': '#775ad8',
          '700': '#6434d5',
          '800': '#5922b9',
          '900': '#5a1aa8'
        }
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require('@tailwindcss/forms')]
}

const arrayMergeFn = (destinationArray, sourceArray) => {
  return destinationArray.concat(sourceArray).reduce((acc, cur) => {
    if (acc.includes(cur)) return acc
    return [...acc, cur]
  }, [])
}

const wrapper = tailwindConfig => {
  return deepMerge(tailwindConfig, apideckConfig, { arrayMerge: arrayMergeFn })
}

module.exports = wrapper
