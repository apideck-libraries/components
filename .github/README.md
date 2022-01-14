# React Component Library

Modern React UI library for fast development of web interfaces

## Commands

The library lives inside `/src`, and a [Parcel-based](https://parceljs.org) playground lives inside `/example`.

The recommended workflow is to run TSDX in one terminal:

```bash
yarn start
```

This builds to `/dist` and runs the project in watch mode so any edits you save inside `src` causes a rebuild to `/dist`.

Then run either Storybook or the example playground:

### Storybook

Run inside another terminal:

```bash
yarn storybook
```

This loads the stories from `./stories`.

> NOTE: Stories should reference the components as if using the library, similar to the example playground. This means importing from the root project directory. This has been aliased in the tsconfig and the storybook webpack config as a helper.

### Example

Then run the example inside another:

```bash
cd example
yarn
yarn start # or yarn start
```

The default example imports and live reloads whatever is in `/dist`, so if you are seeing an out of date component, make sure TSDX is running in watch mode like we recommend above. **No symlinking required**, we use [Parcel's aliasing](https://parceljs.org/module_resolution.html#aliases).

To do a one-off build, use `yarn build`.

To run tests, use `yarn test`.

## Configuration

Code quality is set up for you with `prettier`, `husky`, and `lint-staged`.

### TSDX

This project is bootstrapped with [TSDX](https://tsdx.io/).

### Tailwind

The utility-first CSS framework [Tailwind](https://tailwindcss.com/) is being used to style components.
Custom color schemes and configuration can be found in `tailwind.config.js`. You can run `yarn tailwind-config` to visualize the Tailwind CSS configuration file.

### Jest

Jest tests are set up to run with `yarn test`. We use Jest with `react-testing-library` for unit testing.

### Bundle analysis

Calculates the real cost of your library using [size-limit](https://github.com/ai/size-limit) with `yarn size` and visualize it with `yarn analyze`.

#### Setup Files

This is the folder structure:

```txt
/example
  index.html
  index.tsx
  package.json
  tsconfig.json
/src
  /components
    Button.tsx
    Card.tsx
    CheckBox.tsx
    Dropdown.tsx
    index.ts
    DateInput.tsx
    Modal.tsx
    Select.tsx
    TextArea.tsx
    TextInput.tsx
    Toast.tsx
  index.tsx
  /styles
    card.css
    tailwind.css
  /types
    dates.d.ts
  /utils
    index.ts
    useModal.tsx
    useOutsideClick.tsx
    usePrevious.tsx
    useToast.tsx
/tests
  Button.test.tsx
  ...
/stories
  Button.stories.tsx
  ...
/.storybook
  main.js
  preview.js
.gitignore
package.json
postcss.config.js
README.md
tailwind.config.js
tsconfig.json
tsdx.config.js
```

### Rollup

TSDX uses [Rollup](https://rollupjs.org) as a bundler and generates multiple rollup configs for various module formats and build settings. See [Optimizations](#optimizations) for details.

### TypeScript

`tsconfig.json` is set up to interpret `dom` and `esnext` types, as well as `react` for `jsx`. Adjust according to your needs.

## Continuous Integration

### GitHub Actions

Two actions are added by default:

- `main` which installs deps w/ cache, lints, tests, and builds on all pushes against a Node and OS matrix
- `size` which comments cost comparison of your library on every pull request using [size-limit](https://github.com/ai/size-limit)

## Optimizations

Please see the main `tsdx` [optimizations docs](https://github.com/palmerhq/tsdx#optimizations). In particular, know that you can take advantage of development-only optimizations:

```js
// ./types/index.d.ts
declare var __DEV__: boolean

// inside your code...
if (__DEV__) {
  console.log('foo')
}
```

You can also choose to install and use [invariant](https://github.com/palmerhq/tsdx#invariant) and [warning](https://github.com/palmerhq/tsdx#warning) functions.

## Module Formats

CJS, ESModules, and UMD module formats are supported.

The appropriate paths are configured in `package.json` and `dist/index.js` accordingly. Please report if any issues are found.

## Publishing to NPM

Using [np](https://github.com/sindresorhus/np) is recommended. Install globally and run the `np` command in your terminal to publish.
