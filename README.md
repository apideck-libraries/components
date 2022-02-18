# React Component Library

An open-source UI component library for efficient development of beautiful React applications.

Go to [developers.apideck.com/components](https://developers.apideck.com/components) for the full documentation.

## Usage

Install the component library

```sh
yarn add @apideck/components
```

Use components inside your project:

```js
import { Button } from '@apideck/components'

const App = () => {
  return <Button variant="primary" size="large" text="Yo, world!" />
}

export default App
```

If you install this library in a project that uses Tailwind CSS and want to overwrite the primary color you can add your custom colors to the `primary` color option inside your Tailwind configuration:

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

### Components

- [Button](https://developers.apideck.com/components/button)
- [Card](https://developers.apideck.com/components/card)
- [CheckBox](https://developers.apideck.com/components/checkbox)
- [DateInput](https://developers.apideck.com/components/dateinput)
- [Dropdown](https://developers.apideck.com/components/dropdown)
- [Modal](https://developers.apideck.com/components/modal)
- [Select](https://developers.apideck.com/components/select)
- [TextArea](https://developers.apideck.com/components/textarea)
- [TextInput](https://developers.apideck.com/components/textinput)
- [Toast](https://developers.apideck.com/components/toast)
- [Toggle](https://developers.apideck.com/components/toggle)
- [Tooltip](https://developers.apideck.com/components/tooltip)

### Utils

- `useModal` and `ModalProvider`
- `useToast` and `ToastProvider`
- `useOutsideClick`
- `usePrevious`
- `useDebounce`

Please refer to the [Apideck docs](https://developers.apideck.com/components) for the full documentation.
