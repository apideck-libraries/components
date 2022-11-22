# Apideck Component Library

An open-source UI component library for the efficient development of beautiful React applications.

Go to [developers.apideck.com/components](https://developers.apideck.com/components) for the full documentation.

## Usage

Install the component library

```sh
yarn add @apideck/components
```

The styles are scoped to the `apideck` class name so add it to the top-level parent or body tag.

```tsx
import { ModalProvider, ToastProvider } from '@apideck/components'
import { AppProps } from 'next/app'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <div className="apideck">
      <ModalProvider>
        <ToastProvider>{children}</ToastProvider>
      </ModalProvider>
    </div>
  )
}

export default App
```

Use components inside your project:

```js
import { Button } from '@apideck/components'

const App = () => {
  return <Button variant="primary" size="large" text="Yo, world!" />
}

export default App
```

If you are NOT using Tailwind CSS in your project, make sure to include the styles in your project:

```js
import '@apideck/react-vault/dist/styles.css'
```

The components library is styled using [Tailwind CSS](https://tailwindcss.com/). If you were to use it in a project that also uses Tailwind CSS, you do not have to include the `styles.css` file but you should include the package path in the content path of the `tailwind.config.js`.

```js
// tailwind.config.js

module.exports = {
  content: ['./node_modules/@apideck/components/**/*.js'],
  ...
}
```

If want to overwrite the primary color you can add your custom colors to the `primary` color option inside your Tailwind configuration:

```js
// tailwind.config.js

module.exports = {
  content: ['./node_modules/@apideck/components/**/*.js'],
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
}
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
