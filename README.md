# React Component Library

Modern React UI library for fast development of web interfaces

## Usage

Install the component library

```sh
yarn add @apideck/components
```

Add or update a `tailwind.config.js` file at the root of your project and wrap your custom Tailwind configuration with the config wrapper from the components library:

```js
const config = require('@apideck/components/tailwind-config')

module.exports = config({
  purge: [],
  theme: {
    extend: {}
  },
  variants: {},
  plugins: []
})
```

If you want to overwrite the primary colors of the components you can add your custom colors to the `primary` color prop inside your Tailwind configuration:

```
...
theme: {
  extend: {
    colors: {
      primary: {
        50:  '#faf6f9',
        100: '#fae7f7',
        200: '#f5c4f3',
        300: '#f39dee',
        400: '#f469e7',
        500: '#f53fe1',
        600: '#e909ef',
        700: '#c81ead',
        800: '#9c1a81',
        900: '#7c1762',
      }
    }
  }
}
...
```

Use components inside your project:

```js
import { Button } from '@apideck/components'

const App = () => {
  return <Button>Yo, world!</Button>
}

export default App
```

Current list of components:

- Button
- CheckBox
- DateInput
- Select
- TextArea
- TextInput

Please refer to the [GitHub README](https://github.com/apideck-io/components#readme) for full documentation.
